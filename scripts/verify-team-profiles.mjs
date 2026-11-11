import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";

const PORT = 3055;
const BASE_URL = `http://localhost:${PORT}`;

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status < 500) return true;
    } catch {
      // wait
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server failed to respond at ${url} within ${timeoutMs}ms`);
}

async function main() {
  console.log(`Starting 'next start -p ${PORT}'...`);
  const nextProcess = spawn("cmd.exe", ["/c", "npx", "next", "start", "-p", String(PORT)], {
    stdio: "inherit",
  });

  const cleanup = () => {
    try {
      process.kill(-nextProcess.pid);
    } catch {
      nextProcess.kill();
    }
  };

  process.on("exit", cleanup);
  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);

  await waitForServer(`${BASE_URL}/india`);
  console.log(`Next.js server is up at ${BASE_URL}`);

  let browser;
  try {
    browser = await chromium.launch({ channel: "msedge", headless: true });
  } catch {
    browser = await chromium.launch({ headless: true });
  }

  const context = await browser.newContext();
  const screenshotsDir = path.join(process.cwd(), "docs", "screenshots");
  await fs.mkdir(screenshotsDir, { recursive: true });

  const passedTests = [];
  const failedTests = [];

  function record(name, condition, errorMsg = "") {
    if (condition) {
      console.log(`  [PASS] ${name}`);
      passedTests.push(name);
    } else {
      console.error(`  [FAIL] ${name} ${errorMsg}`);
      failedTests.push({ name, errorMsg });
    }
  }

  try {
    // 1. Profile /team/mujeeb on Desktop (1440px)
    console.log("\n--- Checking /team/mujeeb on Desktop (1440px) ---");
    const pageDesktop = await context.newPage({ viewport: { width: 1440, height: 900 } });
    const responseMujeeb = await pageDesktop.goto(`${BASE_URL}/team/mujeeb`, { waitUntil: "networkidle" });
    record("Profile /team/mujeeb returns 200", responseMujeeb.status() === 200);

    const titleText = await pageDesktop.textContent("h1");
    record("H1 displays Mujeeb Ur Rahman Mohammed", titleText?.includes("Mujeeb Ur Rahman Mohammed"));

    const roleText = await pageDesktop.textContent("article");
    record("Role displays Business Development Partner", roleText?.includes("Business Development Partner"));

    // Check Save Contact link
    const saveContactHref = await pageDesktop.getAttribute('a:has-text("Save Contact")', "href");
    record("Save Contact links to /team/mujeeb/contact.vcf", saveContactHref?.includes("/team/mujeeb/contact.vcf"));

    // Check WhatsApp link
    const whatsappHref = await pageDesktop.getAttribute('a[aria-label*="WhatsApp"]', "href");
    record("WhatsApp link contains 9515850808", whatsappHref?.includes("9515850808"));

    // Check QR Modal
    await pageDesktop.click('button:has-text("View QR Code")');
    await pageDesktop.waitForSelector('div[role="dialog"]');
    const qrModalVisible = await pageDesktop.isVisible('div[role="dialog"]');
    record("QR Code modal opens on click", qrModalVisible);

    const desktopScreenshotPath = path.join(screenshotsDir, "team-profile-mujeeb-desktop.png");
    await pageDesktop.screenshot({ path: desktopScreenshotPath, fullPage: true });
    console.log(`Saved screenshot: ${desktopScreenshotPath}`);
    await pageDesktop.close();

    // 2. Profile /team/mujeeb on Mobile (390px)
    console.log("\n--- Checking /team/mujeeb on Mobile (390px) ---");
    const pageMobile = await context.newPage({ viewport: { width: 390, height: 844 } });
    await pageMobile.goto(`${BASE_URL}/team/mujeeb`, { waitUntil: "networkidle" });

    const mobileScreenshotPath = path.join(screenshotsDir, "team-profile-mujeeb-mobile.png");
    await pageMobile.screenshot({ path: mobileScreenshotPath, fullPage: true });
    console.log(`Saved screenshot: ${mobileScreenshotPath}`);
    await pageMobile.close();

    // 3. Historical Alias Redirect (/team/mujeeb-ur-rahman -> /team/mujeeb)
    console.log("\n--- Checking Historical Alias Redirect ---");
    const aliasPage = await context.newPage();
    await aliasPage.goto(`${BASE_URL}/team/mujeeb-ur-rahman`, { waitUntil: "networkidle" });
    record("Alias /team/mujeeb-ur-rahman resolves to /team/mujeeb", aliasPage.url().endsWith("/team/mujeeb"));
    await aliasPage.close();

    // 4. Test 404 for Unknown Slug
    console.log("\n--- Checking 404 for Unknown Slug ---");
    const notFoundPage = await context.newPage();
    const notFoundResponse = await notFoundPage.goto(`${BASE_URL}/team/non-existent-person-slug`, { waitUntil: "networkidle" });
    record("Unknown slug returns 404", notFoundResponse.status() === 404);
    await notFoundPage.close();

    // 5. Test vCard Download Endpoint
    console.log("\n--- Checking vCard Endpoint (/team/mujeeb/contact.vcf) ---");
    const vcfRes = await fetch(`${BASE_URL}/team/mujeeb/contact.vcf`);
    record("vCard response is 200", vcfRes.status === 200);
    const contentType = vcfRes.headers.get("content-type");
    record("vCard content-type is text/vcard", contentType?.includes("text/vcard"));
    const vcfText = await vcfRes.text();
    record("vCard contains VERSION:4.0", vcfText.includes("VERSION:4.0"));
    record("vCard contains FN:Mujeeb Ur Rahman Mohammed", vcfText.includes("FN:Mujeeb Ur Rahman Mohammed"));
    record("vCard contains ORG:Victor Mobility", vcfText.includes("ORG:Victor Mobility Pvt. Ltd."));
    record("vCard ends with CRLF line endings", vcfText.includes("\r\nEND:VCARD\r\n"));

    // 6. Test QR Code Endpoints
    console.log("\n--- Checking QR Code Endpoints ---");
    const qrPngRes = await fetch(`${BASE_URL}/team/mujeeb/qr?format=png`);
    record("QR PNG status is 200", qrPngRes.status === 200);
    record("QR PNG header is image/png", qrPngRes.headers.get("content-type")?.includes("image/png"));

    const qrSvgRes = await fetch(`${BASE_URL}/team/mujeeb/qr?format=svg`);
    record("QR SVG status is 200", qrSvgRes.status === 200);
    record("QR SVG header is image/svg+xml", qrSvgRes.headers.get("content-type")?.includes("image/svg+xml"));

    // 7. Test Admin Directory (/team/admin)
    console.log("\n--- Checking Admin Directory (/team/admin) ---");
    const adminPage = await context.newPage({ viewport: { width: 1440, height: 900 } });
    const adminRes = await adminPage.goto(`${BASE_URL}/team/admin`, { waitUntil: "networkidle" });
    record("Admin directory returns 200", adminRes.status() === 200);

    const adminContent = await adminPage.textContent("body");
    record("Admin lists Syed Kamran Abbas Razvi", adminContent?.includes("Syed Kamran Abbas Razvi"));
    record("Admin lists Nareinder Reddyy C", adminContent?.includes("Nareinder Reddyy C"));
    record("Admin lists Mujeeb Ur Rahman Mohammed", adminContent?.includes("Mujeeb Ur Rahman Mohammed"));
    record("Admin lists Muhammad Asif", adminContent?.includes("Muhammad Asif"));
    record("Admin lists Mohammed Thameem Ahmed", adminContent?.includes("Mohammed Thameem Ahmed"));
    record("Admin lists Mohammed Jahangir", adminContent?.includes("Mohammed Jahangir"));

    const adminScreenshotPath = path.join(screenshotsDir, "team-admin-desktop.png");
    await adminPage.screenshot({ path: adminScreenshotPath, fullPage: true });
    console.log(`Saved screenshot: ${adminScreenshotPath}`);
    await adminPage.close();

    // 8. Test Homepage & About Page Team Links
    console.log("\n--- Checking Homepage & About Team Carousel ---");
    const homePage = await context.newPage({ viewport: { width: 1440, height: 900 } });
    await homePage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });
    const homeQrLink = await homePage.getAttribute('a[href*="/team/kamran-razvi"]', "href");
    record("Homepage Team section has link to /team/kamran-razvi", !!homeQrLink);
    await homePage.close();

    const aboutPage = await context.newPage({ viewport: { width: 1440, height: 900 } });
    await aboutPage.goto(`${BASE_URL}/india/about`, { waitUntil: "networkidle" });
    const aboutQrLink = await aboutPage.getAttribute('a[href*="/team/"]', "href");
    record("About page Team section has link to /team/ profile", !!aboutQrLink);
    await aboutPage.close();

  } catch (err) {
    console.error("Test execution error:", err);
    failedTests.push({ name: "Global Exception", errorMsg: err.message });
  } finally {
    if (browser) await browser.close();
    cleanup();
  }

  console.log("\n=================================");
  console.log(`Tests Passed: ${passedTests.length}`);
  console.log(`Tests Failed: ${failedTests.length}`);
  console.log("=================================");

  if (failedTests.length > 0) {
    console.error("Failed test details:", failedTests);
    process.exit(1);
  } else {
    console.log("ALL VERIFICATION CHECKS PASSED PERFECTLY!");
    process.exit(0);
  }
}

main();
