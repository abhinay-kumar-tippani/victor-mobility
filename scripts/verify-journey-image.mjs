import { chromium } from "playwright";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

async function run() {
  console.log("Starting verification of Journey of Victor updated image...");

  const port = 3009;
  const server = spawn("npx", ["next", "start", "-p", String(port)], {
    stdio: "inherit",
    shell: true,
  });

  // Wait for server to become responsive
  let connected = false;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://localhost:${port}/india`);
      if (res.ok) {
        connected = true;
        break;
      }
    } catch (e) {
      // wait
    }
    await new Promise((r) => setTimeout(r, 1000));
  }

  if (!connected) {
    console.error(`Failed to connect to http://localhost:${port}`);
    server.kill();
    process.exit(1);
  }

  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const context = await browser.newContext();

  const screenshotDir = path.resolve("docs/screenshots");
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  try {
    const page = await context.newPage();

    // ==========================================
    // 1. INDIA DESKTOP (1440x900)
    // ==========================================
    console.log("\n--- Testing India Homepage Journey Section (1440px) ---");
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`http://localhost:${port}/india`, { waitUntil: "networkidle" });

    const journeySection = page.locator("#journey");
    await journeySection.scrollIntoViewIfNeeded();

    // Verify image is visible
    const journeyImg = journeySection.locator("img[src*='victor-mobility-journey.jpg']");
    await journeyImg.waitFor({ state: "visible", timeout: 10000 });
    console.log("✓ Journey of Victor image is visible with src containing 'victor-mobility-journey.jpg'!");

    // Wait for image to fully load
    await journeyImg.evaluate(async (img) => {
      if (img.complete && img.naturalWidth > 0) return true;
      await new Promise((resolve, reject) => {
        img.addEventListener("load", () => resolve(true));
        img.addEventListener("error", () => reject(new Error("Image failed to load")));
        setTimeout(() => resolve(true), 5000);
      });
    });

    const naturalDimensions = await journeyImg.evaluate((img) => ({
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete,
    }));
    console.log(`Image natural dimensions: ${naturalDimensions.naturalWidth}x${naturalDimensions.naturalHeight}, complete: ${naturalDimensions.complete}`);
    if (naturalDimensions.naturalWidth === 0) {
      throw new Error("Journey image failed to load properly!");
    }
    console.log("✓ Journey image loaded successfully without errors!");

    // Capture desktop journey section screenshot
    await journeySection.screenshot({ path: path.join(screenshotDir, "india-journey-section-desktop.png") });
    console.log("✓ Saved docs/screenshots/india-journey-section-desktop.png");

    // Click to open modal viewer
    const zoomButton = journeySection.locator("button[aria-label*='Journey of Victor image']");
    await zoomButton.click();

    const dialog = page.locator("div[role='dialog']");
    await dialog.waitFor({ state: "visible", timeout: 5000 });
    console.log("✓ Full-size modal viewer opened successfully!");

    // Capture dialog screenshot
    await page.screenshot({ path: path.join(screenshotDir, "journey-modal-viewer-desktop.png") });
    console.log("✓ Saved docs/screenshots/journey-modal-viewer-desktop.png");

    // Close dialog
    const closeButton = dialog.locator("button[aria-label*='Close']").first();
    await closeButton.click();
    await dialog.waitFor({ state: "hidden", timeout: 5000 });
    console.log("✓ Modal viewer closed successfully!");

    // ==========================================
    // 2. INDIA MOBILE (390x844)
    // ==========================================
    console.log("\n--- Testing India Journey Section on Mobile (390px) ---");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`http://localhost:${port}/india`, { waitUntil: "networkidle" });

    const mobileJourney = page.locator("#journey");
    await mobileJourney.scrollIntoViewIfNeeded();

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    console.log(`India Mobile scrollWidth: ${scrollWidth}, clientWidth: ${clientWidth}`);
    if (scrollWidth > clientWidth) {
      throw new Error("Horizontal overflow detected on India mobile!");
    }
    console.log("✓ Zero horizontal overflow on India mobile (390px)!");

    await mobileJourney.screenshot({ path: path.join(screenshotDir, "india-journey-section-mobile.png") });
    console.log("✓ Saved docs/screenshots/india-journey-section-mobile.png");

    // ==========================================
    // 3. UAE DESKTOP (1440x900)
    // ==========================================
    console.log("\n--- Testing UAE Homepage Journey Section (1440px) ---");
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`http://localhost:${port}/uae`, { waitUntil: "networkidle" });

    const uaeJourney = page.locator("#journey");
    await uaeJourney.scrollIntoViewIfNeeded();

    const uaeImg = uaeJourney.locator("img[src*='victor-mobility-journey.jpg']");
    await uaeImg.waitFor({ state: "visible", timeout: 10000 });
    console.log("✓ UAE Journey image verified!");

    await uaeJourney.screenshot({ path: path.join(screenshotDir, "uae-journey-section-desktop.png") });
    console.log("✓ Saved docs/screenshots/uae-journey-section-desktop.png");

    console.log("\n========================================================");
    console.log("ALL JOURNEY OF VICTOR IMAGE TESTS PASSED! ✓✓✓");
    console.log("========================================================");
  } finally {
    await browser.close();
    server.kill();
  }
}

run().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});
