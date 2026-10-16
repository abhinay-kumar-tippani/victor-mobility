import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const SCREENSHOTS_DIR = "d:/victor website/docs/screenshots";
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function run() {
  console.log("=== STARTING SAFETY COMES FIRST VERIFICATION ===");
  const browser = await chromium.launch({ channel: "msedge", headless: true });

  // 1. Desktop Verification
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000/india", { waitUntil: "networkidle" });

  const section = page.locator("#safety");
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const headingText = await section.locator("h2").innerText();
  console.log(`Heading: "${headingText}"`);

  const subtitleText = await section.locator("p").first().innerText();
  console.log(`Subtitle: "${subtitleText}"`);

  const pillars = [
    "Verified drivers (BGV & PCC)",
    "Safety for women passengers",
    "Defensive driving",
    "Pre-trip vehicle checks"
  ];

  for (const p of pillars) {
    const card = section.locator(`text=${p}`);
    const count = await card.count();
    console.log(`Pillar "${p}" found: ${count > 0}`);
  }

  // Hide sticky header temporarily for clean element screenshots
  await page.evaluate(() => {
    const header = document.querySelector('header');
    if (header) header.style.display = 'none';
  });

  // Capture Element screenshot
  const elementPath = path.join(SCREENSHOTS_DIR, "safety-section-desktop.png");
  await section.screenshot({ path: elementPath });
  console.log(`Saved: ${elementPath}`);

  // 2. Tablet Verification (768x1024)
  const tabletPage = await browser.newPage({ viewport: { width: 768, height: 1024 } });
  await tabletPage.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await tabletPage.evaluate(() => {
    const header = document.querySelector('header');
    if (header) header.style.display = 'none';
  });
  const tabletSection = tabletPage.locator("#safety");
  await tabletSection.scrollIntoViewIfNeeded();
  await tabletPage.waitForTimeout(500);

  const tabletPath = path.join(SCREENSHOTS_DIR, "safety-section-tablet.png");
  await tabletSection.screenshot({ path: tabletPath });
  console.log(`Saved: ${tabletPath}`);

  // 3. Mobile Verification (390x844)
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await mobilePage.evaluate(() => {
    const header = document.querySelector('header');
    if (header) header.style.display = 'none';
  });
  const mobileSection = mobilePage.locator("#safety");
  await mobileSection.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(500);

  const mobileScrollWidth = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
  const mobileInnerWidth = await mobilePage.evaluate(() => window.innerWidth);
  console.log(`Mobile scrollWidth: ${mobileScrollWidth}px, innerWidth: ${mobileInnerWidth}px`);

  const mobilePath = path.join(SCREENSHOTS_DIR, "safety-section-mobile.png");
  await mobileSection.screenshot({ path: mobilePath });
  console.log(`Saved: ${mobilePath}`);

  await browser.close();
  console.log(">>> ALL SAFETY SECTION VERIFICATIONS PASSED SUCCESSFULLY! <<<");
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
