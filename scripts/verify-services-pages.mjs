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
  console.log(`=== STARTING SERVICES PAGES VERIFICATION ON ${BASE_URL} ===`);
  const browser = await chromium.launch({ channel: "msedge", headless: true });

  try {
    // 1. India Services Desktop (1440x900)
    console.log("\n--- Checking India Services Desktop (1440x900) ---");
    const pageIndia = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pageIndia.goto(`${BASE_URL}/india/services`, { waitUntil: "networkidle", timeout: 30000 });
    
    // Check cards count
    const indiaCards = pageIndia.locator('article[data-testid^="service-card-"]');
    const indiaCardCount = await indiaCards.count();
    console.log(`India service cards found: ${indiaCardCount}`);
    if (indiaCardCount !== 6) {
      throw new Error(`Expected 6 India service cards, found ${indiaCardCount}`);
    }

    // Verify all cards have an img element
    for (let i = 0; i < indiaCardCount; i++) {
      const card = indiaCards.nth(i);
      const testId = await card.getAttribute("data-testid");
      const img = card.locator('img');
      const imgCount = await img.count();
      const title = await card.locator('h2').innerText();
      console.log(`  Card [${testId}]: "${title}" - Background img present: ${imgCount > 0}`);
      if (imgCount === 0) {
        throw new Error(`Missing background image on card ${testId}`);
      }
    }
    
    // Take full page screenshot
    const indiaDesktopPath = path.join(SCREENSHOTS_DIR, "services-india-desktop-1440.png");
    await pageIndia.screenshot({ path: indiaDesktopPath, fullPage: true });
    console.log(`Saved: ${indiaDesktopPath}`);

    // 2. India Services Mobile (390x844)
    console.log("\n--- Checking India Services Mobile (390x844) ---");
    const pageIndiaMob = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await pageIndiaMob.goto(`${BASE_URL}/india/services`, { waitUntil: "networkidle", timeout: 30000 });
    
    // Check horizontal overflow
    const scrollWidthIndia = await pageIndiaMob.evaluate(() => document.documentElement.scrollWidth);
    const clientWidthIndia = await pageIndiaMob.evaluate(() => document.documentElement.clientWidth);
    console.log(`India Mobile scrollWidth: ${scrollWidthIndia}, clientWidth: ${clientWidthIndia}`);
    if (scrollWidthIndia > clientWidthIndia) {
      throw new Error(`Horizontal overflow detected on India Mobile: ${scrollWidthIndia} > ${clientWidthIndia}`);
    } else {
      console.log("PASS: No horizontal overflow on India Mobile.");
    }
    
    const indiaMobilePath = path.join(SCREENSHOTS_DIR, "services-india-mobile-390.png");
    await pageIndiaMob.screenshot({ path: indiaMobilePath, fullPage: true });
    console.log(`Saved: ${indiaMobilePath}`);

    // 3. UAE Services Desktop (1440x900)
    console.log("\n--- Checking UAE Services Desktop (1440x900) ---");
    const pageUae = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pageUae.goto(`${BASE_URL}/uae/services`, { waitUntil: "networkidle", timeout: 30000 });
    
    const uaeCards = pageUae.locator('article[data-testid^="service-card-"]');
    const uaeCardCount = await uaeCards.count();
    console.log(`UAE service cards found: ${uaeCardCount}`);
    if (uaeCardCount !== 6) {
      throw new Error(`Expected 6 UAE service cards, found ${uaeCardCount}`);
    }

    for (let i = 0; i < uaeCardCount; i++) {
      const card = uaeCards.nth(i);
      const testId = await card.getAttribute("data-testid");
      const img = card.locator('img');
      const imgCount = await img.count();
      const title = await card.locator('h2').innerText();
      console.log(`  Card [${testId}]: "${title}" - Background img present: ${imgCount > 0}`);
      if (imgCount === 0) {
        throw new Error(`Missing background image on card ${testId}`);
      }
    }
    
    const uaeDesktopPath = path.join(SCREENSHOTS_DIR, "services-uae-desktop-1440.png");
    await pageUae.screenshot({ path: uaeDesktopPath, fullPage: true });
    console.log(`Saved: ${uaeDesktopPath}`);

    // 4. UAE Services Mobile (390x844)
    console.log("\n--- Checking UAE Services Mobile (390x844) ---");
    const pageUaeMob = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await pageUaeMob.goto(`${BASE_URL}/uae/services`, { waitUntil: "networkidle", timeout: 30000 });
    
    const scrollWidthUae = await pageUaeMob.evaluate(() => document.documentElement.scrollWidth);
    const clientWidthUae = await pageUaeMob.evaluate(() => document.documentElement.clientWidth);
    console.log(`UAE Mobile scrollWidth: ${scrollWidthUae}, clientWidth: ${clientWidthUae}`);
    if (scrollWidthUae > clientWidthUae) {
      throw new Error(`Horizontal overflow detected on UAE Mobile: ${scrollWidthUae} > ${clientWidthUae}`);
    } else {
      console.log("PASS: No horizontal overflow on UAE Mobile.");
    }
    
    const uaeMobilePath = path.join(SCREENSHOTS_DIR, "services-uae-mobile-390.png");
    await pageUaeMob.screenshot({ path: uaeMobilePath, fullPage: true });
    console.log(`Saved: ${uaeMobilePath}`);

    console.log("\n=== ALL SCREENSHOTS AND CHECKS COMPLETED SUCCESSFULLY ===");
  } catch (err) {
    console.error("Error during verification:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
