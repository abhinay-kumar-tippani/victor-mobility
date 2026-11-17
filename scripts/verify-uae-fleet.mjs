import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const screenshotsDir = path.resolve("docs/screenshots");
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function run() {
  console.log("Launching Chromium...");
  const browser = await chromium.launch({ channel: "chrome" });

  try {
    // ==========================================
    // 1. UAE FLEET DESKTOP (1440px)
    // ==========================================
    console.log("\n=== 1. Testing UAE Fleet Page at 1440px Desktop ===");
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto("http://localhost:3000/uae/fleet", { waitUntil: "networkidle" });

    // Verify 6 vehicle cards
    const vehicleCards = page.locator("#fleet article");
    const count = await vehicleCards.count();
    console.log(`Found ${count} vehicle cards`);
    if (count !== 6) {
      throw new Error(`Expected exactly 6 vehicle cards, got ${count}`);
    }

    const expectedVehicles = [
      "BYD Han",
      "EXEED VX",
      "Honda Accord",
      "Lexus ES",
      "Tesla Model Y",
      "Toyota Highlander"
    ];

    for (let i = 0; i < 6; i++) {
      const card = vehicleCards.nth(i);
      const title = await card.locator("h3").innerText();
      console.log(`Card ${i + 1}: ${title}`);
      if (title.trim() !== expectedVehicles[i]) {
        throw new Error(`Card ${i + 1} expected "${expectedVehicles[i]}", got "${title}"`);
      }

      // Check FleetPhoto expand button
      const expandBtn = card.locator("button[aria-haspopup='dialog']");
      if ((await expandBtn.count()) !== 1) {
        throw new Error(`Card ${title} missing FleetPhoto expand button`);
      }

      // Check Enquiry button
      const enquireLink = card.locator("a[href*='/uae/contact']");
      if ((await enquireLink.count()) !== 1) {
        throw new Error(`Card ${title} missing Enquiry link to /uae/contact`);
      }
      const linkText = await enquireLink.innerText();
      console.log(`  Enquiry link: "${linkText.trim()}" -> ${await enquireLink.getAttribute("href")}`);
    }

    // Verify two-column grid class
    const gridContainer = page.locator("#fleet [role='tabpanel'] > div");
    const gridClass = await gridContainer.getAttribute("class");
    console.log("Grid container class:", gridClass);
    if (!gridClass?.includes("md:grid-cols-2")) {
      throw new Error(`Expected 2-column grid class (md:grid-cols-2), got: ${gridClass}`);
    }

    // Capture desktop full page screenshot
    await page.screenshot({
      path: path.join(screenshotsDir, "uae-fleet-desktop-1440.png"),
      fullPage: true
    });
    console.log("Saved uae-fleet-desktop-1440.png");

    // Test expanding modal on first card (BYD Han)
    console.log("\nTesting FleetPhoto dialog modal on BYD Han...");
    await vehicleCards.nth(0).locator("button[aria-haspopup='dialog']").click();
    await page.waitForTimeout(500);

    const dialog = vehicleCards.nth(0).locator("dialog");
    const isModalOpen = await dialog.evaluate(el => el.open);
    console.log("Modal dialog open:", isModalOpen);
    if (!isModalOpen) {
      throw new Error("Modal dialog did not open on click");
    }

    // Verify details images inside modal (door and plate)
    const detailImages = dialog.locator("img");
    const detailCount = await detailImages.count();
    console.log(`Found ${detailCount} images in modal dialog`);
    if (detailCount < 3) {
      throw new Error(`Expected at least 3 images in modal (hero + 2 details), found ${detailCount}`);
    }

    await page.screenshot({
      path: path.join(screenshotsDir, "uae-fleet-modal-desktop.png")
    });
    console.log("Saved uae-fleet-modal-desktop.png");

    // Close modal
    await dialog.locator("button[aria-label*='Close'], button[aria-label*='close']").click();
    await page.waitForTimeout(300);

    // ==========================================
    // 2. UAE FLEET MOBILE (390px)
    // ==========================================
    console.log("\n=== 2. Testing UAE Fleet Page at 390px Mobile ===");
    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobilePage.goto("http://localhost:3000/uae/fleet", { waitUntil: "networkidle" });

    // Check horizontal overflow
    const hasOverflow = await mobilePage.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    console.log("Mobile horizontal overflow:", hasOverflow);
    if (hasOverflow) throw new Error("Mobile page has horizontal overflow!");

    await mobilePage.screenshot({
      path: path.join(screenshotsDir, "uae-fleet-mobile-390.png"),
      fullPage: true
    });
    console.log("Saved uae-fleet-mobile-390.png");

    // ==========================================
    // 3. INDIA FLEET VERIFICATION (1440px)
    // ==========================================
    console.log("\n=== 3. Verifying India Fleet Page remains unchanged ===");
    const indiaPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await indiaPage.goto("http://localhost:3000/india/fleet", { waitUntil: "networkidle" });

    const indiaCards = indiaPage.locator("#fleet article");
    const indiaCount = await indiaCards.count();
    console.log(`India fleet card count: ${indiaCount}`);
    if (indiaCount < 10) {
      throw new Error(`India fleet should have its original vehicles, got ${indiaCount}`);
    }

    await indiaPage.screenshot({
      path: path.join(screenshotsDir, "india-fleet-desktop-1440.png"),
      fullPage: true
    });
    console.log("Saved india-fleet-desktop-1440.png");

    console.log("\n ALL AUTOMATED VERIFICATIONS PASSED SUCCESSFULLY!");
  } finally {
    await browser.close();
  }
}

run().catch(err => {
  console.error("Verification failed:", err);
  process.exit(1);
});
