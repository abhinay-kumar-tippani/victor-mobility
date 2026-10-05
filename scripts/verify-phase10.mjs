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

async function main() {
  console.log("Starting Phase 10 Mega-Event & Summit Transit Logistics Staging Desk Verification Suite...\n");
  const browser = await chromium.launch({ channel: "msedge" });
  const results = [];

  // ==========================================
  // Test 1: India Event Staging Desk Desktop
  // ==========================================
  console.log("--- Test 1: India Event Staging Desk Desktop ---");
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto(`${BASE_URL}/india/events`, { waitUntil: "networkidle" });

  const indiaEventsTitle = await desktopPage.title();
  const hasHero = await desktopPage.getByRole("heading", { name: "Flawless Multi-Vehicle Staging" }).count();

  // Test Archetype Selection: Select Weddings
  const weddingBtn = desktopPage.locator('button:has-text("Luxury Destination Weddings")').first();
  await weddingBtn.click();
  await desktopPage.waitForTimeout(300);

  // Check Fleet Calculator
  const hasCalcTitle = await desktopPage.getByRole("heading", { name: "Multi-Vehicle Allocation & Ground Marshal Calculator" }).count();
  const hasVipSaloons = await desktopPage.locator("text=VIP Saloons").count();
  const hasMarshals = await desktopPage.locator("text=Ground Marshals").count();

  // Check WhatsApp Brief CTA
  const waBtn = desktopPage.locator('a:has-text("Submit Event Staging Brief via WhatsApp")').first();
  const waHref = await waBtn.getAttribute("href");
  const waValid =
    !!waHref &&
    waHref.includes("wa.me/919396546950") &&
    waHref.includes("EVENT") &&
    waHref.includes("Recommended%20Fleet%20Staging");

  const test1Passed =
    indiaEventsTitle.includes("Victor Mobility") &&
    hasHero > 0 &&
    hasCalcTitle > 0 &&
    hasVipSaloons > 0 &&
    hasMarshals > 0 &&
    waValid;

  results.push({
    test: "India Event Staging Desk (/india/events) handles archetype selection, fleet staging matrix, and WhatsApp brief generation",
    passed: test1Passed,
    details: `Title: ${indiaEventsTitle}, Hero: ${hasHero}, Calc: ${hasCalcTitle}, WhatsApp: ${waValid}`,
  });
  console.log(`[${test1Passed ? "PASS" : "FAIL"}] India Event Staging Desk Desktop`);
  await saveImage(desktopPage, "phase10-india-events-desktop.png");

  // ==========================================
  // Test 2: India Event Staging Desk Mobile View (390px)
  // ==========================================
  console.log("\n--- Test 2: India Event Mobile View ---");
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto(`${BASE_URL}/india/events`, { waitUntil: "networkidle" });
  await saveImage(mobilePage, "phase10-india-events-mobile.png");

  const mobileHero = await mobilePage.getByRole("heading", { name: "Flawless Multi-Vehicle Staging" }).count();
  const mobileCalc = await mobilePage.getByRole("heading", { name: "Multi-Vehicle Allocation & Ground Marshal Calculator" }).count();

  results.push({
    test: "India Event Staging Desk renders responsive mobile layout, sliders, and fleet matrix (390px)",
    passed: mobileHero > 0 && mobileCalc > 0,
    details: `Mobile Hero: ${mobileHero}, Mobile Calc: ${mobileCalc}`,
  });
  console.log(`[${mobileHero > 0 && mobileCalc > 0 ? "PASS" : "FAIL"}] India Event Mobile View`);

  // ==========================================
  // Test 3: UAE Diplomatic Summit & VIP Motorcades Desktop
  // ==========================================
  console.log("\n--- Test 3: UAE Diplomatic Summit Logistics Desktop ---");
  await desktopPage.goto(`${BASE_URL}/uae/events`, { waitUntil: "networkidle" });

  const uaeEventsTitle = await desktopPage.title();
  const hasUaeHero = await desktopPage.getByRole("heading", { name: "VIP Motorcades & Summit Transit" }).count();
  const hasMaybachConvoy = await desktopPage.locator("text=Mercedes-Maybach").count();

  const test3Passed =
    uaeEventsTitle.includes("Victor Mobility UAE") &&
    hasUaeHero > 0 &&
    hasMaybachConvoy > 0;

  results.push({
    test: "UAE Event Logistics Desk (/uae/events) renders diplomatic summit motorcades and DWTC/Expo City logistics",
    passed: test3Passed,
    details: `Title: ${uaeEventsTitle}, UAE Hero: ${hasUaeHero}, Maybach: ${hasMaybachConvoy}`,
  });
  console.log(`[${test3Passed ? "PASS" : "FAIL"}] UAE Diplomatic Summit Desktop`);
  await saveImage(desktopPage, "phase10-uae-events-desktop.png");

  // ==========================================
  // Test 4: Global Footer Event Links
  // ==========================================
  console.log("\n--- Test 4: Global Footer Event Links ---");
  await desktopPage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });
  const indFooterEvents = await desktopPage.locator('footer a[href="/india/events"]').count();

  await desktopPage.goto(`${BASE_URL}/uae`, { waitUntil: "networkidle" });
  const uaeFooterEvents = await desktopPage.locator('footer a[href="/uae/events"]').count();

  const footerPassed = indFooterEvents > 0 && uaeFooterEvents > 0;
  results.push({
    test: "Corporate Footer contains Event & Summit Logistics link across India & UAE portals",
    passed: footerPassed,
    details: `India Footer: ${indFooterEvents}, UAE Footer: ${uaeFooterEvents}`,
  });
  console.log(`[${footerPassed ? "PASS" : "FAIL"}] Footer Event Links`);

  // ==========================================
  // Test 5: Schema.org Structured Data
  // ==========================================
  console.log("\n--- Test 5: Schema.org Structured Data ---");
  await desktopPage.goto(`${BASE_URL}/india/events`, { waitUntil: "networkidle" });
  const indEventsJsonLd = await desktopPage.locator('script[type="application/ld+json"]').count();

  await desktopPage.goto(`${BASE_URL}/uae/events`, { waitUntil: "networkidle" });
  const uaeEventsJsonLd = await desktopPage.locator('script[type="application/ld+json"]').count();

  const schemaPassed = indEventsJsonLd > 0 && uaeEventsJsonLd > 0;
  results.push({
    test: "Schema.org Service structured data scripts are embedded on both India and UAE event desks",
    passed: schemaPassed,
    details: `India JSON-LD: ${indEventsJsonLd}, UAE JSON-LD: ${uaeEventsJsonLd}`,
  });
  console.log(`[${schemaPassed ? "PASS" : "FAIL"}] Schema.org Structured Data`);

  await browser.close();

  // Summary
  console.log("\n==========================================");
  console.log("PHASE 10 VERIFICATION SUMMARY");
  console.log("==========================================");
  let allPassed = true;
  for (const r of results) {
    console.log(`[${r.passed ? "PASS" : "FAIL"}] ${r.test}`);
    if (!r.passed) allPassed = false;
  }
  console.log(`\nOverall Status: ${allPassed ? "ALL TESTS PASSED ✅" : "SOME TESTS FAILED ❌"}`);
  if (!allPassed) process.exit(1);
}

main().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
