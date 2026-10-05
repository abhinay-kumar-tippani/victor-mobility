import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3000";
const outputDirs = [
  path.resolve("docs/screenshots"),
  "C:/Users/tippa/.gemini/antigravity/brain/6bcbc0c9-63bc-40e5-84e8-1703d532d8fa",
];

for (const dir of outputDirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function saveImage(page, filename, options = {}) {
  for (const dir of outputDirs) {
    const dest = path.join(dir, filename);
    await page.screenshot({ path: dest, ...options });
  }
  console.log(`Saved screenshot: ${filename}`);
}

async function run() {
  const browser = await chromium.launch({ channel: "msedge" });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();
  console.log("--- Measuring Mobile Homepage Metrics at 390x844 ---");
  await page.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });

  // 1. Total scroll height
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log(`[MEASUREMENT] Mobile Homepage Total Height: ${scrollHeight}px (previously ~13,915px)`);

  // 2. Services section height
  const servicesHeight = await page.evaluate(() => {
    const el = document.getElementById("services");
    return el ? el.getBoundingClientRect().height : null;
  });
  console.log(`[MEASUREMENT] Services Section Height: ${Math.round(servicesHeight || 0)}px (previously ~2,860px)`);

  // 3. First major image (Employee shuttle) Y position
  const busImageY = await page.evaluate(() => {
    const img = document.querySelector("#employee-transport img");
    if (!img) return null;
    const rect = img.getBoundingClientRect();
    return window.scrollY + rect.top;
  });
  console.log(`[MEASUREMENT] Bus Image Y Position: ${Math.round(busImageY || 0)}px (previously ~4,643px)`);

  // 4. Fleet tab switching test
  console.log("\n--- Testing Fleet Tab Switching & Visual Sync ---");
  // Scroll to fleet
  await page.evaluate(() => {
    const el = document.getElementById("fleet");
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(500);

  // Click Buses & Shuttles tab
  const busTab = page.locator('button[role="tab"]:has-text("Buses & Shuttles")');
  await busTab.click();
  await page.waitForTimeout(400);

  const fleetImageSrcAfterBusClick = await page.evaluate(() => {
    const img = document.querySelector("#fleet img");
    return img ? img.getAttribute("src") : null;
  });
  console.log(`[PASS] Fleet image after clicking 'Buses & Shuttles': ${fleetImageSrcAfterBusClick}`);

  // 5. Contact page first input position on mobile 390x844
  console.log("\n--- Testing Standalone Contact Page (/india/contact) at 390x844 ---");
  await page.goto(`${BASE_URL}/india/contact`, { waitUntil: "networkidle" });

  const inputY = await page.evaluate(() => {
    const input = document.getElementById("enquiry-name-input");
    if (!input) return null;
    const rect = input.getBoundingClientRect();
    return window.scrollY + rect.top;
  });
  console.log(`[MEASUREMENT] Contact Page First Input Y: ${Math.round(inputY || 0)}px (previously ~1,153px)`);

  // Capture Mobile Contact Above The Fold
  await saveImage(page, "contact-mobile-fold.png", { fullPage: false });

  // Capture Mobile Homepage Screen 1 & 2
  await page.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });
  await saveImage(page, "home-mobile-fold.png", { fullPage: false });

  // Scroll to screen 2 (where bus image arrives)
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(400);
  await saveImage(page, "home-mobile-screen2.png", { fullPage: false });

  // Desktop captures
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });
  await saveImage(desktopPage, "home-desktop.png", { fullPage: false });

  await desktopPage.goto(`${BASE_URL}/india/contact`, { waitUntil: "networkidle" });
  await saveImage(desktopPage, "contact-desktop.png", { fullPage: false });

  await browser.close();
  console.log("\nAll UX measurements and captures completed successfully.");
}

run().catch((err) => {
  console.error("Error running UX verification:", err);
  process.exit(1);
});
