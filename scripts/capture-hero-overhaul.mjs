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

  // 1. Capture Desktop Sedans Tab
  console.log("Capturing Sedans tab...");
  await page.screenshot({
    path: "docs/screenshots/hero-desktop-sedans.png",
    clip: await heroSection.boundingBox(),
  });
  console.log("Saved: docs/screenshots/hero-desktop-sedans.png");

  // 2. Click Innova & MPVs tab
  console.log("Clicking Innova & MPVs tab...");
  await page.getByRole("button", { name: "Innova & MPVs" }).click();
  await page.waitForTimeout(400);
  await page.screenshot({
    path: "docs/screenshots/hero-desktop-mpvs.png",
    clip: await heroSection.boundingBox(),
  });
  console.log("Saved: docs/screenshots/hero-desktop-mpvs.png");

  // 3. Click Buses & Coaches tab
  console.log("Clicking Buses & Coaches tab...");
  await page.getByRole("button", { name: "Buses & Coaches" }).click();
  await page.waitForTimeout(400);
  await page.screenshot({
    path: "docs/screenshots/hero-desktop-buses.png",
    clip: await heroSection.boundingBox(),
  });
  console.log("Saved: docs/screenshots/hero-desktop-buses.png");

  // 4. Click Luxury VIP tab
  console.log("Clicking Luxury VIP tab...");
  await page.getByRole("button", { name: "Luxury VIP" }).click();
  await page.waitForTimeout(400);
  await page.screenshot({
    path: "docs/screenshots/hero-desktop-luxury.png",
    clip: await heroSection.boundingBox(),
  });
  console.log("Saved: docs/screenshots/hero-desktop-luxury.png");

  // 5. Mobile viewport (390px)
  const mobilePage = await context.newPage();
  await mobilePage.setViewportSize({ width: 390, height: 844 });
  await mobilePage.goto("http://localhost:3000/india", { waitUntil: "domcontentloaded" });
  await mobilePage.waitForTimeout(1000);
  const mobileHero = mobilePage.locator("section").first();
  await mobilePage.screenshot({
    path: "docs/screenshots/hero-mobile.png",
    clip: await mobileHero.boundingBox(),
  });
  console.log("Saved: docs/screenshots/hero-mobile.png");

  await browser.close();
  console.log("Hero screenshots capture complete!");
}

main().catch((err) => {
  console.error("Hero capture error:", err);
  process.exit(1);
});
