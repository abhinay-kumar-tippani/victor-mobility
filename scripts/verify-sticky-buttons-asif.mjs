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
  console.log(`=== STARTING STICKY BUTTONS ASIF VERIFICATION ON ${BASE_URL} ===`);
  const browser = await chromium.launch({ channel: "msedge", headless: true });

  try {
    for (const route of ["india", "uae"]) {
      console.log(`\n--- Checking Route: /${route} ---`);
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`${BASE_URL}/${route}`, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForTimeout(1000);

      const rail = page.locator('[data-testid="sticky-contact-rail"]').first();
      await rail.waitFor({ state: "visible", timeout: 10000 });

      // Check all 3 buttons
      const phoneBtn = rail.locator('a[href^="tel:"]');
      const whatsappBtn = rail.locator('a[href*="wa.me"]');
      const emailBtn = rail.locator('a[href^="mailto:"]');

      if ((await phoneBtn.count()) !== 1) throw new Error(`${route}: Phone button missing!`);
      if ((await whatsappBtn.count()) !== 1) throw new Error(`${route}: WhatsApp button missing!`);
      if ((await emailBtn.count()) !== 1) throw new Error(`${route}: Email button missing!`);

      const phoneHref = await phoneBtn.getAttribute("href");
      const whatsappHref = await whatsappBtn.getAttribute("href");
      const emailHref = await emailBtn.getAttribute("href");

      console.log(`${route} Phone Href: ${phoneHref}`);
      console.log(`${route} WhatsApp Href: ${whatsappHref}`);
      console.log(`${route} Email Href: ${emailHref}`);

      if (phoneHref !== "tel:+919100777768") {
        throw new Error(`${route}: Expected phone tel:+919100777768, got ${phoneHref}`);
      }
      if (!whatsappHref?.includes("919100777768")) {
        throw new Error(`${route}: Expected whatsapp containing 919100777768, got ${whatsappHref}`);
      }
      if (!emailHref?.includes("asif@victorluxurylimousine.com")) {
        throw new Error(`${route}: Expected email containing asif@victorluxurylimousine.com, got ${emailHref}`);
      }

      console.log(`PASS: All 3 sticky buttons on /${route} point directly to Muhammad Asif.`);

      // Capture screenshot
      const shotPath = path.join(SCREENSHOTS_DIR, `sticky-buttons-asif-${route}-desktop.png`);
      await rail.screenshot({ path: shotPath });
      console.log(`Saved screenshot: ${shotPath}`);

      // Mobile check (390px)
      const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await mobilePage.goto(`${BASE_URL}/${route}`, { waitUntil: "domcontentloaded", timeout: 30000 });
      await mobilePage.waitForTimeout(500);

      const scrollWidth = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await mobilePage.evaluate(() => document.documentElement.clientWidth);
      if (scrollWidth > clientWidth) {
        throw new Error(`${route} Mobile: horizontal overflow detected (${scrollWidth} > ${clientWidth})`);
      }
      console.log(`PASS: Zero horizontal overflow on /${route} mobile.`);

      const mobileRail = mobilePage.locator('[data-testid="sticky-contact-rail"]').first();
      await mobileRail.waitFor({ state: "visible", timeout: 10000 });
      const mobileShotPath = path.join(SCREENSHOTS_DIR, `sticky-buttons-asif-${route}-mobile.png`);
      await mobileRail.screenshot({ path: mobileShotPath });
      console.log(`Saved screenshot: ${mobileShotPath}`);

      await page.close();
      await mobilePage.close();
    }

    console.log("\n=== ALL STICKY BUTTON ASIF CONTACT VERIFICATIONS PASSED WITH 100% SUCCESS ===");
  } catch (err) {
    console.error("Test execution error:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
