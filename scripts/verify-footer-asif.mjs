import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const SCREENSHOTS_DIR = "d:/victor website/docs/screenshots";
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

async function run() {
  console.log(`=== STARTING FOOTER ASIF CONTACT VERIFICATION ON ${BASE_URL} ===`);
  const browser = await chromium.launch({ channel: "msedge", headless: true });

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`${BASE_URL}/india`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(1000);

    const footer = page.locator("footer").first();
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const footerText = await footer.innerText();

    // 1. Check Mujeeb's info
    console.log("\n--- Checking Mujeeb's info in Footer ---");
    if (!footerText.includes("Mujeeb Ur Rahman Mohammed")) {
      throw new Error("FAIL: Mujeeb Ur Rahman Mohammed not found in Footer!");
    }
    const mujeebPhone = footer.locator('a[href="tel:+919515850808"]');
    const mujeebWa = footer.locator('a[href*="wa.me/919515850808"]');
    const mujeebMail = footer.locator('a[href="mailto:mujeeburrahman@victorluxurylimousine.com"]');

    if ((await mujeebPhone.count()) === 0) throw new Error("FAIL: Mujeeb phone link missing in Footer!");
    if ((await mujeebWa.count()) === 0) throw new Error("FAIL: Mujeeb WhatsApp link missing in Footer!");
    if ((await mujeebMail.count()) === 0) throw new Error("FAIL: Mujeeb Email link missing in Footer!");
    console.log("PASS: Mujeeb's name, phone (+91 95158 50808), WhatsApp, and email verified in Footer.");

    // 2. Check Asif's info
    console.log("\n--- Checking Asif's info in Footer ---");
    if (!footerText.includes("Muhammad Asif")) {
      throw new Error("FAIL: Muhammad Asif not found in Footer!");
    }
    const asifPhone = footer.locator('a[href="tel:+919100777768"]');
    const asifWa = footer.locator('a[href*="wa.me/919100777768"]');
    const asifMail = footer.locator('a[href="mailto:asif@victorluxurylimousine.com"]');

    if ((await asifPhone.count()) === 0) throw new Error("FAIL: Asif phone link missing in Footer!");
    if ((await asifWa.count()) === 0) throw new Error("FAIL: Asif WhatsApp link missing in Footer!");
    if ((await asifMail.count()) === 0) throw new Error("FAIL: Asif Email link missing in Footer!");
    console.log("PASS: Asif's name, phone (+91 9100 77 77 68), WhatsApp, and email verified in Footer.");

    // 3. Verify ordering: Mujeeb appears before Asif in text content
    const mujeebIndex = footerText.indexOf("Mujeeb Ur Rahman Mohammed");
    const asifIndex = footerText.indexOf("Muhammad Asif");
    if (mujeebIndex === -1 || asifIndex === -1 || asifIndex < mujeebIndex) {
      throw new Error(`FAIL: Ordering invalid! Mujeeb index: ${mujeebIndex}, Asif index: ${asifIndex}. Asif must be below Mujeeb.`);
    }
    console.log(`PASS: Ordering verified. Mujeeb (pos ${mujeebIndex}) appears above Asif (pos ${asifIndex}).`);

    // Capture desktop screenshot
    const shotDesktop = path.join(SCREENSHOTS_DIR, "footer-asif-below-mujeeb-desktop.png");
    await footer.screenshot({ path: shotDesktop });
    console.log(`Saved screenshot: ${shotDesktop}`);

    // Mobile Viewport (390px)
    console.log("\n--- Checking Mobile Viewport (390px) on /india ---");
    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobilePage.goto(`${BASE_URL}/india`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await mobilePage.waitForTimeout(500);

    const scrollWidth = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await mobilePage.evaluate(() => document.documentElement.clientWidth);
    if (scrollWidth > clientWidth) {
      throw new Error(`FAIL: Mobile horizontal overflow detected! ${scrollWidth} > ${clientWidth}`);
    }
    console.log(`PASS: Zero horizontal overflow on mobile (${scrollWidth} <= ${clientWidth}).`);

    const mobileFooter = mobilePage.locator("footer").first();
    await mobileFooter.scrollIntoViewIfNeeded();
    const shotMobile = path.join(SCREENSHOTS_DIR, "footer-asif-below-mujeeb-mobile.png");
    await mobileFooter.screenshot({ path: shotMobile });
    console.log(`Saved screenshot: ${shotMobile}`);

    console.log("\n=== ALL FOOTER ASIF CONTACT TESTS PASSED WITH 100% SUCCESS ===");
  } catch (err) {
    console.error("Test execution error:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
