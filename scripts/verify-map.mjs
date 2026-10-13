import { chromium } from "playwright";
import fs from "fs";

async function main() {
  const browser = await chromium.launch({ channel: "msedge" });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  console.log("Navigating to http://localhost:3000/india...");
  await page.goto("http://localhost:3000/india", { waitUntil: "domcontentloaded" });

  const networkSection = page.locator("#network");
  await networkSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  console.log("Locating India Presence Map...");
  const svg = page.locator("#network svg[viewBox='0 0 500 510']");
  await svg.waitFor({ state: "visible" });
  const svgBox = await svg.boundingBox();
  console.log("SVG Bounding Box:", svgBox);

  const tooltip = page.locator("[data-testid='map-tooltip']");

  // 1. Hover over Telangana (Center ~ 195.1, 316.3 in SVG)
  const telanganaX = svgBox.x + svgBox.width * (195.1 / 500);
  const telanganaY = svgBox.y + svgBox.height * (316.3 / 510);
  console.log(`Hovering over Telangana at (${telanganaX}, ${telanganaY})...`);
  await page.mouse.move(telanganaX, telanganaY);
  await page.waitForTimeout(400);

  if (await tooltip.isVisible()) {
    const text = await tooltip.innerText();
    console.log("✓ Tooltip over Telangana:\n" + text);
  } else {
    console.warn("✗ Tooltip not visible over Telangana!");
  }

  await page.screenshot({
    path: "docs/screenshots/map-telangana-hover.png",
  });
  console.log("Saved docs/screenshots/map-telangana-hover.png");

  // 2. Move mouse across Telangana to demonstrate cursor following
  console.log("Moving cursor across Telangana...");
  await page.mouse.move(telanganaX + 20, telanganaY - 15);
  await page.waitForTimeout(300);
  await page.screenshot({
    path: "docs/screenshots/map-telangana-moving-cursor.png",
  });
  console.log("Saved docs/screenshots/map-telangana-moving-cursor.png");

  // 3. Hover over Maharashtra (Pune is ~ 118.6, 306.5)
  const maharashtraX = svgBox.x + svgBox.width * (125.0 / 500);
  const maharashtraY = svgBox.y + svgBox.height * (300.0 / 510);
  console.log(`Hovering over Maharashtra at (${maharashtraX}, ${maharashtraY})...`);
  await page.mouse.move(maharashtraX, maharashtraY);
  await page.waitForTimeout(400);

  if (await tooltip.isVisible()) {
    const text = await tooltip.innerText();
    console.log("✓ Tooltip over Maharashtra:\n" + text);
  }
  await page.screenshot({
    path: "docs/screenshots/map-maharashtra-hover.png",
  });
  console.log("Saved docs/screenshots/map-maharashtra-hover.png");

  // 4. Hover over Karnataka (Bangalore is 171.3, 390.8)
  const karnatakaX = svgBox.x + svgBox.width * (165.0 / 500);
  const karnatakaY = svgBox.y + svgBox.height * (380.0 / 510);
  console.log(`Hovering over Karnataka at (${karnatakaX}, ${karnatakaY})...`);
  await page.mouse.move(karnatakaX, karnatakaY);
  await page.waitForTimeout(400);

  if (await tooltip.isVisible()) {
    const text = await tooltip.innerText();
    console.log("✓ Tooltip over Karnataka:\n" + text);
  }
  await page.screenshot({
    path: "docs/screenshots/map-karnataka-hover.png",
  });
  console.log("Saved docs/screenshots/map-karnataka-hover.png");

  // 5. Hover over West Bengal (Kolkata is 323.1, 244.9)
  const bengalX = svgBox.x + svgBox.width * (320.0 / 500);
  const bengalY = svgBox.y + svgBox.height * (240.0 / 510);
  console.log(`Hovering over West Bengal at (${bengalX}, ${bengalY})...`);
  await page.mouse.move(bengalX, bengalY);
  await page.waitForTimeout(400);
  if (await tooltip.isVisible()) {
    console.log("✓ Tooltip over West Bengal:\n" + (await tooltip.innerText()));
  }

  // 6. Capture full section (desktop)
  const sectionBox = await networkSection.boundingBox();
  await page.screenshot({
    path: "docs/screenshots/map-section-desktop.png",
    clip: sectionBox,
  });
  console.log("Saved docs/screenshots/map-section-desktop.png");

  // 7. Mobile Viewport (390px)
  console.log("Switching to mobile viewport (390px)...");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  const mobileSection = page.locator("#network");
  await mobileSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  const mobileBox = await mobileSection.boundingBox();
  await page.screenshot({
    path: "docs/screenshots/map-section-mobile.png",
    clip: mobileBox,
  });
  console.log("Saved docs/screenshots/map-section-mobile.png");

  await browser.close();
  console.log("All map verifications and screenshots completed successfully!");
}

main().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
