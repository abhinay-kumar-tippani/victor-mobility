import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({ channel: "chrome" });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000/uae", { waitUntil: "networkidle" });
  await page.screenshot({ path: "docs/screenshots/uae-navbar-debug-1440.png", clip: { x: 0, y: 0, width: 1440, height: 120 } });

  // Open language dropdown and select Arabic
  await page.click("#desktop-language-switcher");
  await page.waitForTimeout(300);
  await page.click('li[role="option"]:has-text("العربية")');
  await page.waitForTimeout(500);
  await page.screenshot({ path: "docs/screenshots/uae-navbar-arabic-1440.png", clip: { x: 0, y: 0, width: 1440, height: 120 } });

  await browser.close();
  console.log("Saved UAE navbar screenshots");
}

run();
