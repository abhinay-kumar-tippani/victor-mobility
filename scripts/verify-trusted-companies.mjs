import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function verify() {
  const screenshotsDir = "d:/victor website/docs/screenshots";
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch({ channel: "msedge", headless: true });

  console.log("=== 1. DESKTOP VERIFICATION (1440x900) ===");
  const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await desktopCtx.newPage();

  await page.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // Verify section exists
  const section = page.locator('section#clients');
  await section.waitFor({ state: "visible" });
  await section.scrollIntoViewIfNeeded();

  // Verify heading
  const heading = await page.locator('#clients h2').innerText();
  console.log(`Heading: "${heading}"`);
  if (!heading.includes("Companies We Work With")) {
    throw new Error(`Unexpected heading: ${heading}`);
  }

  // Verify 3 slider rows
  const sliders = section.locator('div[class*="slider-"]');
  const sliderCount = await sliders.count();
  console.log(`Slider rows found: ${sliderCount} (expected 3)`);
  if (sliderCount !== 3) {
    throw new Error(`Expected 3 slider rows, found ${sliderCount}`);
  }

  // Verify direction classes:
  const class1 = await sliders.nth(0).getAttribute("class");
  const class2 = await sliders.nth(1).getAttribute("class");
  const class3 = await sliders.nth(2).getAttribute("class");
  console.log(`Row 1 class: ${class1}`);
  console.log(`Row 2 class: ${class2}`);
  console.log(`Row 3 class: ${class3}`);

  if (!class1.includes("slider-ltr")) throw new Error("Row 1 must be Left-to-Right");
  if (!class2.includes("slider-rtl")) throw new Error("Row 2 must be Right-to-Left");
  if (!class3.includes("slider-ltr")) throw new Error("Row 3 must be Left-to-Right");

  // Verify all 12 companies are represented via aria-label
  const companyNames = [
    "Amazon", "Synechron", "Teleperformance", "OTIS", "JPMorgan Chase",
    "TATA Docomo", "Oracle", "Wipro", "Google", "Godrej Properties",
    "HDFC Bank", "Synchrony Financial"
  ];

  for (const name of companyNames) {
    const elCount = await section.locator(`div[aria-label*="${name}"]`).count();
    console.log(`Company "${name}" tile occurrences: ${elCount}`);
    if (elCount === 0) {
      throw new Error(`Company "${name}" tile not found in section!`);
    }
  }

  // Take desktop screenshots
  const elementScreenshot = path.join(screenshotsDir, "companies-element.png");
  await section.screenshot({ path: elementScreenshot });
  console.log(`Saved: ${elementScreenshot}`);

  const desktopScreenshot = path.join(screenshotsDir, "companies-desktop.png");
  await page.screenshot({ path: desktopScreenshot, fullPage: false });
  console.log(`Saved: ${desktopScreenshot}`);

  await desktopCtx.close();

  console.log("\n=== 2. TABLET VERIFICATION (768x1024) ===");
  const tabletCtx = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const tabletPage = await tabletCtx.newPage();
  await tabletPage.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await tabletPage.waitForTimeout(500);

  const tabletSection = tabletPage.locator('section#clients');
  await tabletSection.scrollIntoViewIfNeeded();

  const tabletScreenshot = path.join(screenshotsDir, "companies-tablet.png");
  await tabletSection.screenshot({ path: tabletScreenshot });
  console.log(`Saved: ${tabletScreenshot}`);
  await tabletCtx.close();

  console.log("\n=== 3. MOBILE VERIFICATION (390x844) ===");
  const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(500);

  const mobileSection = mobilePage.locator('section#clients');
  await mobileSection.scrollIntoViewIfNeeded();

  const bodyWidth = await mobilePage.evaluate(() => document.body.scrollWidth);
  const viewportWidth = await mobilePage.evaluate(() => window.innerWidth);
  console.log(`Mobile scrollWidth: ${bodyWidth}px, innerWidth: ${viewportWidth}px`);
  if (bodyWidth > viewportWidth) {
    throw new Error(`Horizontal overflow detected! bodyWidth ${bodyWidth} > viewport ${viewportWidth}`);
  }

  const mobileScreenshot = path.join(screenshotsDir, "companies-mobile.png");
  await mobileSection.screenshot({ path: mobileScreenshot });
  console.log(`Saved: ${mobileScreenshot}`);
  await mobileCtx.close();

  await browser.close();
  console.log("\n>>> ALL TRUSTED COMPANIES VERIFICATIONS PASSED SUCCESSFULLY! <<<");
}

verify().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
