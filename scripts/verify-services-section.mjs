import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const SCREENSHOTS_DIR = "d:/victor website/docs/screenshots";
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function run() {
  console.log("=== STARTING SERVICES SECTION DIRECT BACKGROUND VERIFICATION ===");
  const browser = await chromium.launch({ channel: "msedge", headless: true });

  // 1. Desktop Verification (1440x900)
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000/india", { waitUntil: "networkidle" });

  const section = page.locator("#services");
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const headingText = await section.locator("h2").innerText();
  console.log(`Heading: "${headingText}"`);

  const services = [
    "Employee Transportation",
    "Bus & Shuttle Transport",
    "Event Transportation",
    "Airport Transfers",
    "Chauffeur & Luxury Travel",
    "Rent-A-Car"
  ];

  for (const s of services) {
    const card = section.locator(`text=${s}`);
    const count = await card.count();
    console.log(`Service "${s}" found: ${count > 0}`);
  }

  // Capture Section with direct backgrounds
  const restPath = path.join(SCREENSHOTS_DIR, "services-direct-bg-desktop.png");
  await section.screenshot({ path: restPath });
  console.log(`Saved: ${restPath}`);

  // Capture Card 1 directly
  const card1 = section.locator('[data-testid="service-card-employee-transportation"]');
  const card1Path = path.join(SCREENSHOTS_DIR, "services-direct-bg-card1.png");
  await card1.screenshot({ path: card1Path });
  console.log(`Saved: ${card1Path}`);

  // Hover on Card 1 to test micro-interaction
  await card1.hover();
  await page.waitForTimeout(400);

  const hover1Path = path.join(SCREENSHOTS_DIR, "services-direct-bg-card1-hover.png");
  await card1.screenshot({ path: hover1Path });
  console.log(`Saved: ${hover1Path}`);

  // 2. Mobile Verification (390x844)
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  const mobileSection = mobilePage.locator("#services");
  await mobileSection.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(500);

  const mobileScrollWidth = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
  const mobileInnerWidth = await mobilePage.evaluate(() => window.innerWidth);
  console.log(`Mobile (390px) scrollWidth: ${mobileScrollWidth}px, innerWidth: ${mobileInnerWidth}px`);
  if (mobileScrollWidth > mobileInnerWidth) {
    throw new Error(`Horizontal overflow detected at 390px! scrollWidth: ${mobileScrollWidth}`);
  }

  const mobilePath = path.join(SCREENSHOTS_DIR, "services-direct-bg-mobile.png");
  await mobileSection.screenshot({ path: mobilePath });
  console.log(`Saved: ${mobilePath}`);

  // 3. Small Mobile Verification (320x640)
  const smallMobilePage = await browser.newPage({ viewport: { width: 320, height: 640 } });
  await smallMobilePage.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  const smallMobileSection = smallMobilePage.locator("#services");
  await smallMobileSection.scrollIntoViewIfNeeded();
  await smallMobilePage.waitForTimeout(500);

  const smallScrollWidth = await smallMobilePage.evaluate(() => document.documentElement.scrollWidth);
  const smallInnerWidth = await smallMobilePage.evaluate(() => window.innerWidth);
  console.log(`Small Mobile (320px) scrollWidth: ${smallScrollWidth}px, innerWidth: ${smallInnerWidth}px`);
  if (smallScrollWidth > smallInnerWidth) {
    throw new Error(`Horizontal overflow detected at 320px! scrollWidth: ${smallScrollWidth}`);
  }

  await browser.close();
  console.log(">>> ALL SERVICES DIRECT BACKGROUND VERIFICATIONS COMPLETED SUCCESSFULLY! <<<");
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
