import { chromium } from "playwright";
import path from "path";

const screenshotsDir = path.resolve("docs/screenshots");

async function capture() {
  const browser = await chromium.launch({ channel: "chrome" });

  // 1. Desktop 1440
  const page1440 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page1440.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await page1440.locator("header").first().screenshot({ path: path.join(screenshotsDir, "navbar-fixed-1440.png") });
  await page1440.screenshot({ path: path.join(screenshotsDir, "navbar-fixed-page-1440.png"), clip: { x: 0, y: 0, width: 1440, height: 250 } });

  // 2. Tablet 1024
  const page1024 = await browser.newPage({ viewport: { width: 1024, height: 800 } });
  await page1024.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await page1024.locator("header").first().screenshot({ path: path.join(screenshotsDir, "navbar-fixed-1024.png") });

  // 3. Tablet 768
  const page768 = await browser.newPage({ viewport: { width: 768, height: 800 } });
  await page768.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await page768.locator("header").first().screenshot({ path: path.join(screenshotsDir, "navbar-fixed-768.png") });

  // 4. Mobile 390
  const page390 = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await page390.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await page390.locator("header").first().screenshot({ path: path.join(screenshotsDir, "navbar-fixed-390.png") });

  // 5. Mobile Drawer Open
  await page390.click("button[aria-controls='mobile-navigation-drawer']");
  await page390.waitForTimeout(300);
  await page390.screenshot({ path: path.join(screenshotsDir, "navbar-fixed-drawer-390.png") });

  // 6. UAE Arabic 1440
  const pageUae = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageUae.goto("http://localhost:3000/uae", { waitUntil: "networkidle" });
  await pageUae.click("#desktop-language-switcher");
  await pageUae.waitForTimeout(200);
  await pageUae.click('li[role="option"]:has-text("العربية")');
  await pageUae.waitForTimeout(500);
  await pageUae.locator("header").first().screenshot({ path: path.join(screenshotsDir, "navbar-fixed-arabic-1440.png") });

  await browser.close();
  console.log("All fixed navbar screenshots saved successfully!");
}

capture();
