import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";

const PORT = 3066;
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
    // -------------------------------------------------------------
    // 1. Desktop Verification at 1536 x 960 (Image 2 Target)
    // -------------------------------------------------------------
    console.log("\n--- 1. Desktop Layout Verification (1536 x 960) ---");
    const desktopPage = await context.newPage({ viewport: { width: 1536, height: 960 } });
    const resMujeeb = await desktopPage.goto(`${BASE_URL}/team/mujeeb`, { waitUntil: "networkidle" });
    record("Desktop profile /team/mujeeb returns 200", resMujeeb.status() === 200);

    // Verify Header
    const headerCompany = await desktopPage.textContent("header");
    record("Header contains Victor Mobility Pvt. Ltd.", headerCompany?.includes("Victor Mobility Pvt. Ltd."));
    const shareBtn = await desktopPage.textContent('header button:has-text("Share Profile")');
    record("Header contains Share Profile action", !!shareBtn);

    // Verify Left Profile Panel
    const leftPanel = desktopPage.locator("aside");
    const leftName = await leftPanel.textContent("h1");
    record("Left panel contains Mujeeb Ur Rahman Mohammed in serif heading", leftName?.includes("Mujeeb Ur Rahman Mohammed"));
    const leftDesig = await leftPanel.textContent("p");
    record("Left panel contains designation", leftDesig?.includes("Business Development"));
    const leftLocation = await leftPanel.textContent('div:has-text("Hyderabad, India")');
    record("Left panel displays Hyderabad, India", !!leftLocation);

    // Verify Right Panel Primary Actions
    const saveContactBtn = desktopPage.locator('a:has-text("Save Contact"):visible');
    record("Save Contact button exists and links to contact.vcf", (await saveContactBtn.getAttribute("href"))?.includes("contact.vcf"));

    const showQrBtn = desktopPage.locator('button:has-text("Show QR Code"):visible');
    record("Show QR Code button exists", await showQrBtn.isVisible());

    // Verify Contact Section
    const contactHeading = await desktopPage.locator('h2:has-text("Contact"):visible').textContent();
    record("Contact heading is present", !!contactHeading);
    const copyDetailsBtn = desktopPage.locator('button:has-text("Copy details"):visible');
    record("Copy details button is present", await copyDetailsBtn.isVisible());

    // Verify Contact Rows
    const callRow = desktopPage.locator('a[aria-label*="Call"]:visible');
    record("Call row contains +91 95158 50808", (await callRow.textContent())?.includes("95158 50808"));

    const whatsappRow = desktopPage.locator('a[aria-label*="WhatsApp"]:visible');
    record("WhatsApp row contains +91 95158 50808", (await whatsappRow.textContent())?.includes("95158 50808"));

    const emailRow = desktopPage.locator('a[aria-label*="Email"]:visible');
    record("Email row contains mujeeburrahman@victorluxurylimousine.com", (await emailRow.textContent())?.includes("mujeeburrahman@victorluxurylimousine.com"));

    // Verify Social Profiles
    const socialHeading = await desktopPage.locator('h2:has-text("Social profiles"):visible').textContent();
    record("Social profiles heading is present", !!socialHeading);
    const instagramBtn = desktopPage.locator('a[aria-label*="Instagram"]:visible');
    record("Instagram button is present", await instagramBtn.isVisible());
    const facebookBtn = desktopPage.locator('a[aria-label*="Facebook"]:visible');
    record("Facebook button is present", await facebookBtn.isVisible());
    const linkedinBtn = desktopPage.locator('a[aria-label*="LinkedIn"]:visible');
    record("LinkedIn button is present", await linkedinBtn.isVisible());

    // Verify Profile URL
    const profileUrlText = await desktopPage.locator('button[title*="profile link"]:visible').textContent();
    record("Profile URL displays victormobility.in/team/mujeeb", profileUrlText?.includes("victormobility.in/team/mujeeb"));

    // Test Show QR Code Modal on Desktop
    await showQrBtn.first().click();
    await desktopPage.waitForSelector('div[role="dialog"]');
    record("QR Code modal opens upon clicking Show QR Code", await desktopPage.isVisible('div[role="dialog"]'));
    // Close modal
    await desktopPage.keyboard.press("Escape");
    await desktopPage.waitForTimeout(300);

    // Capture Desktop Screenshot (1536 x 960)
    const desktopScreenshotPath = path.join(screenshotsDir, "team-redesign-desktop-1536.png");
    await desktopPage.screenshot({ path: desktopScreenshotPath, fullPage: true });
    console.log(`Saved Desktop Screenshot: ${desktopScreenshotPath}`);
    await desktopPage.close();

    // -------------------------------------------------------------
    // 2. Mobile Verification at 390 x 844 (Image 3 Target)
    // -------------------------------------------------------------
    console.log("\n--- 2. Mobile Layout Verification (390 x 844) ---");
    const mobilePage = await context.newPage({ viewport: { width: 390, height: 844 } });
    await mobilePage.goto(`${BASE_URL}/team/mujeeb`, { waitUntil: "networkidle" });

    // Verify Mobile Hero Composition
    const heroName = await mobilePage.locator("h1:visible").textContent();
    record("Mobile hero contains Mujeeb Ur Rahman Mohammed", heroName?.includes("Mujeeb Ur Rahman Mohammed"));

    const mobileBody = await mobilePage.textContent("body");
    record("Mobile hero contains Victor Mobility Pvt. Ltd.", mobileBody?.includes("Victor Mobility Pvt. Ltd."));
    record("Mobile hero displays Hyderabad, India", mobileBody?.includes("Hyderabad, India"));

    // Verify Mobile Buttons and Stacked Rows
    record("Mobile Save Contact button visible", await mobilePage.locator('a:has-text("Save Contact"):visible').isVisible());
    record("Mobile Show QR Code button visible", await mobilePage.locator('button:has-text("Show QR Code"):visible').isVisible());
    record("Mobile Call row visible", await mobilePage.locator('a[aria-label*="Call"]:visible').isVisible());
    record("Mobile WhatsApp row visible", await mobilePage.locator('a[aria-label*="WhatsApp"]:visible').isVisible());
    record("Mobile Email row visible", await mobilePage.locator('a[aria-label*="Email"]:visible').isVisible());

    // Capture Mobile Screenshot (390 x 844)
    const mobileScreenshotPath = path.join(screenshotsDir, "team-redesign-mobile-390.png");
    await mobilePage.screenshot({ path: mobileScreenshotPath, fullPage: true });
    console.log(`Saved Mobile Screenshot: ${mobileScreenshotPath}`);
    await mobilePage.close();

    // -------------------------------------------------------------
    // 3. Small Mobile Verification at 320 x 700
    // -------------------------------------------------------------
    console.log("\n--- 3. Small Mobile Layout Verification (320 x 700) ---");
    const smallMobilePage = await context.newPage({ viewport: { width: 320, height: 700 } });
    await smallMobilePage.goto(`${BASE_URL}/team/mujeeb`, { waitUntil: "networkidle" });

    // Verify no horizontal overflow
    const hasHorizontalOverflow = await smallMobilePage.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    record("Small mobile (320px) has no horizontal overflow", !hasHorizontalOverflow);

    const smallScreenshotPath = path.join(screenshotsDir, "team-redesign-mobile-320.png");
    await smallMobilePage.screenshot({ path: smallScreenshotPath, fullPage: true });
    console.log(`Saved Small Mobile Screenshot: ${smallScreenshotPath}`);
    await smallMobilePage.close();

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
