import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({ channel: "msedge" });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log("Navigating to http://localhost:3000/india...");
  await page.goto("http://localhost:3000/india", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1000);

  const heroSection = page.locator("section").first();
  await heroSection.waitFor({ state: "visible" });

  console.log("Capturing Option 2 Desktop...");
  await page.screenshot({
    path: "docs/screenshots/hero-option2-cinematic-desktop.png",
    clip: await heroSection.boundingBox(),
  });
  console.log("Saved: docs/screenshots/hero-option2-cinematic-desktop.png");

  // Mobile viewport (390px)
  const mobilePage = await context.newPage();
  await mobilePage.setViewportSize({ width: 390, height: 844 });
  await mobilePage.goto("http://localhost:3000/india", { waitUntil: "domcontentloaded" });
  await mobilePage.waitForTimeout(1000);
  const mobileHero = mobilePage.locator("section").first();
  await mobilePage.screenshot({
    path: "docs/screenshots/hero-option2-cinematic-mobile.png",
    clip: await mobileHero.boundingBox(),
  });
  console.log("Saved: docs/screenshots/hero-option2-cinematic-mobile.png");

  await browser.close();
  console.log("Option 2 screenshots captured successfully!");
}

main().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});
