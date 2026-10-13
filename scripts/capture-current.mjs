import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  
  // Desktop
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await desktopPage.waitForTimeout(600);
  await desktopPage.screenshot({ path: "C:/Users/tippa/.gemini/antigravity/brain/48b7741c-a40c-4ede-ac00-356e4bf82ffd/page_desktop.png" });

  // Mobile
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: "C:/Users/tippa/.gemini/antigravity/brain/48b7741c-a40c-4ede-ac00-356e4bf82ffd/page_mobile.png" });

  await browser.close();
  console.log("Captured full viewport pages!");
}

run().catch(console.error);
