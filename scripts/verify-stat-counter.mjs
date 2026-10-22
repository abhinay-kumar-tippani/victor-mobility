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
  await page.waitForTimeout(500);

  // Check section exists
  const statSection = page.locator('section[aria-label="Key Performance Statistics"]');
  await statSection.waitFor({ state: "visible" });

  // Scroll section into view to trigger counter animation
  await statSection.scrollIntoViewIfNeeded();
  console.log("Section scrolled into view. Waiting for counter animation (2500ms)...");
  await page.waitForTimeout(2500);

  // Check the 6 counters
  const statGroups = statSection.locator('div[role="group"]');
  const count = await statGroups.count();
  console.log(`Found ${count} stat items (expected 6)`);
  if (count !== 6) {
    throw new Error(`Expected 6 stat items, but found ${count}`);
  }

  const expectedStats = [
    { value: "2010", label: "Established in Hyderabad", full: "2010 Established in Hyderabad" },
    { value: "15+", label: "Years of industry leadership", full: "15+ Years of industry leadership" },
    { value: "1,500+", label: "Vehicles managed", full: "1,500+ Vehicles managed" },
    { value: "30+", label: "Multinational clients", full: "30+ Multinational clients" },
    { value: "10", label: "India offices", full: "10 India offices" },
    { value: "6", label: "Transport services", full: "6 Transport services" },
  ];

  for (let i = 0; i < 6; i++) {
    const item = statGroups.nth(i);
    const ariaLabel = await item.getAttribute("aria-label");
    const textContent = await item.innerText();
    const cleanText = textContent.replace(/\s+/g, " ").trim();
    console.log(`Item ${i + 1}: [aria-label="${ariaLabel}"] [text="${cleanText}"]`);

    if (!cleanText.includes(expectedStats[i].value)) {
      throw new Error(`Item ${i + 1} did not reach expected value ${expectedStats[i].value}! Found: "${cleanText}"`);
    }
  }

  // Take desktop screenshots
  const desktopFullScreenshot = path.join(screenshotsDir, "stat-counter-desktop.png");
  await page.screenshot({ path: desktopFullScreenshot, fullPage: false });
  console.log(`Saved: ${desktopFullScreenshot}`);

  const elementScreenshot = path.join(screenshotsDir, "stat-counter-element.png");
  await statSection.screenshot({ path: elementScreenshot });
  console.log(`Saved: ${elementScreenshot}`);

  await desktopCtx.close();

  console.log("\n=== 2. TABLET VERIFICATION (768x1024) ===");
  const tabletCtx = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const tabletPage = await tabletCtx.newPage();
  await tabletPage.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await tabletPage.waitForTimeout(500);

  const tabletStatSection = tabletPage.locator('section[aria-label="Key Performance Statistics"]');
  await tabletStatSection.scrollIntoViewIfNeeded();
  await tabletPage.waitForTimeout(2500);

  const tabletScreenshot = path.join(screenshotsDir, "stat-counter-tablet.png");
  await tabletStatSection.screenshot({ path: tabletScreenshot });
  console.log(`Saved: ${tabletScreenshot}`);
  await tabletCtx.close();

  console.log("\n=== 3. MOBILE VERIFICATION (390x844) ===");
  const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(500);

  const mobileStatSection = mobilePage.locator('section[aria-label="Key Performance Statistics"]');
  await mobileStatSection.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(2500);

  // Check no horizontal overflow
  const bodyWidth = await mobilePage.evaluate(() => document.body.scrollWidth);
  const viewportWidth = await mobilePage.evaluate(() => window.innerWidth);
  console.log(`Mobile scrollWidth: ${bodyWidth}px, innerWidth: ${viewportWidth}px`);
  if (bodyWidth > viewportWidth) {
    throw new Error(`Horizontal overflow detected! bodyWidth ${bodyWidth} > viewport ${viewportWidth}`);
  }

  const mobileScreenshot = path.join(screenshotsDir, "stat-counter-mobile.png");
  await mobileStatSection.screenshot({ path: mobileScreenshot });
  console.log(`Saved: ${mobileScreenshot}`);
  await mobileCtx.close();

  await browser.close();
  console.log("\n>>> ALL VERIFICATION CHECKS PASSED SUCCESSFULLY! <<<");
}

verify().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
