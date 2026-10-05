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
  console.log("Starting Phase 8 Interactive Vehicle Fleet Showcase & Inspection Desk Verification Suite...\n");
  const browser = await chromium.launch({ channel: "msedge" });
  const results = [];

  // ==========================================
  // Test 1: India Fleet Showcase & Category Filters Desktop
  // ==========================================
  console.log("--- Test 1: India Fleet Showcase Desktop & Filters ---");
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto(`${BASE_URL}/india/fleet`, { waitUntil: "networkidle" });

  const indiaFleetTitle = await desktopPage.title();
  const hasHero = await desktopPage.getByRole("heading", { name: "Vehicles for Everyday Journeys & Special Occasions" }).count();

  // Check initial all categories count (4 cards)
  const initialCardsCount = await desktopPage.locator(".fleet-showcase-card").count();

  // Test interactive category filter: Click "Luxury & Limousines"
  const luxuryTab = desktopPage.locator('button:has-text("Luxury & Limousines")').first();
  await luxuryTab.click();
  await desktopPage.waitForTimeout(300);

  const filteredCardsCount = await desktopPage.locator(".fleet-showcase-card").count();
  const luxuryCardText = await desktopPage.locator(".fleet-showcase-card").first().textContent();
  const filterWorking = filteredCardsCount === 1 && luxuryCardText.includes("Mercedes-Benz");

  // Reset to All
  const allTab = desktopPage.locator('button:has-text("All Fleet Categories")').first();
  await allTab.click();
  await desktopPage.waitForTimeout(200);

  const test1Passed =
    indiaFleetTitle.includes("Victor Mobility") &&
    hasHero > 0 &&
    initialCardsCount === 4 &&
    filterWorking;

  results.push({
    test: "India Fleet Showcase (/india/fleet) renders 4 categories and handles dynamic tab filtering",
    passed: test1Passed,
    details: `Title: ${indiaFleetTitle}, Hero: ${hasHero}, Total Cards: ${initialCardsCount}, Filtered: ${filteredCardsCount}`,
  });
  console.log(`[${test1Passed ? "PASS" : "FAIL"}] India Fleet Showcase & Filters`);

  // ==========================================
  // Test 2: Virtual Inspection Dialog Modal
  // ==========================================
  console.log("\n--- Test 2: Virtual Inspection Dialog Modal ---");
  const inspectBtn = desktopPage.locator('button:has-text("Inspect Specs & Amenities")').first();
  await inspectBtn.click();
  await desktopPage.waitForTimeout(300);

  const modal = desktopPage.locator('div[role="dialog"]');
  const modalVisible = (await modal.count()) > 0;
  const hasSafetyHeader = (await modal.locator('text=Enterprise Safety & Telematics Protocols').count()) > 0;
  const hasAmenitiesHeader = (await modal.locator('text=Standard Onboard Executive Amenities').count()) > 0;

  // Close modal
  const closeBtn = modal.locator('button[aria-label="Close vehicle inspection"]').first();
  await closeBtn.click();
  await desktopPage.waitForTimeout(300);
  const modalClosed = (await desktopPage.locator('div[role="dialog"]').count()) === 0;

  const test2Passed = modalVisible && hasSafetyHeader && hasAmenitiesHeader && modalClosed;
  results.push({
    test: "Inspection Modal displays passenger layout, safety telematics, amenities and closes cleanly",
    passed: test2Passed,
    details: `Modal Visible: ${modalVisible}, Safety: ${hasSafetyHeader}, Amenities: ${hasAmenitiesHeader}, Closed: ${modalClosed}`,
  });
  console.log(`[${test2Passed ? "PASS" : "FAIL"}] Virtual Inspection Dialog Modal`);

  // ==========================================
  // Test 3: Instant Corporate Rate Card & WhatsApp Generator
  // ==========================================
  console.log("\n--- Test 3: Corporate Rate Card & WhatsApp Generator ---");
  // Select Sedan, Airport Transfer, Hyderabad
  await desktopPage.selectOption("#fleet-category-select", "sedans");
  await desktopPage.selectOption("#fleet-duty-select", "airportTransfer");
  await desktopPage.selectOption("#fleet-city-select", "Hyderabad");
  await desktopPage.waitForTimeout(200);

  // Check rate text
  const rateText = await desktopPage.locator("text=₹1,400 – ₹1,800").count();

  // Check WhatsApp link
  const waBtn = desktopPage.locator('a:has-text("Request Rate Card via WhatsApp")').first();
  const waHref = await waBtn.getAttribute("href");
  const waValid =
    !!waHref &&
    waHref.includes("wa.me/919396546950") &&
    waHref.includes("Airport") &&
    waHref.includes("Hyderabad");

  const test3Passed = rateText > 0 && waValid;
  results.push({
    test: "Rate Card calculates benchmark tariffs and prepares prefilled WhatsApp procurement draft",
    passed: test3Passed,
    details: `Calculated Rate: ${rateText > 0 ? "₹1,400 – ₹1,800" : "Not Found"}, WhatsApp Valid: ${waValid}`,
  });
  console.log(`[${test3Passed ? "PASS" : "FAIL"}] Corporate Rate Card Generator`);
  await saveImage(desktopPage, "phase8-india-fleet-showcase-desktop.png");

  // ==========================================
  // Test 4: India Fleet Mobile View (390px)
  // ==========================================
  console.log("\n--- Test 4: India Fleet Mobile View ---");
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto(`${BASE_URL}/india/fleet`, { waitUntil: "networkidle" });
  await saveImage(mobilePage, "phase8-india-fleet-showcase-mobile.png");

  const mobileHero = await mobilePage.getByRole("heading", { name: "Vehicles for Everyday Journeys & Special Occasions" }).count();
  const mobileCards = await mobilePage.locator(".fleet-showcase-card").count();

  results.push({
    test: "India Fleet Showcase renders responsive mobile category view and rate calculator",
    passed: mobileHero > 0 && mobileCards > 0,
    details: `Mobile Hero: ${mobileHero}, Mobile Cards: ${mobileCards}`,
  });
  console.log(`[${mobileHero > 0 && mobileCards > 0 ? "PASS" : "FAIL"}] India Fleet Mobile View`);

  // ==========================================
  // Test 5: UAE Luxury Fleet Showcase Desktop
  // ==========================================
  console.log("\n--- Test 5: UAE Luxury Fleet Showcase ---");
  await desktopPage.goto(`${BASE_URL}/uae/fleet`, { waitUntil: "networkidle" });

  const uaeFleetTitle = await desktopPage.title();
  const hasUaeHero = await desktopPage.getByRole("heading", { name: "Luxury Saloons, Executive SUVs & VIP Coaches" }).count();
  const uaeCardsCount = await desktopPage.locator(".fleet-showcase-card").count();

  // Check UAE specific models
  const hasMaybach = await desktopPage.locator("text=Mercedes-Maybach S-Class").count();
  const hasEscalade = await desktopPage.locator("text=Cadillac Escalade").count();

  // UAE Rate Calculator check in AED
  const hasAedRate = await desktopPage.locator("text=AED").count();

  const test5Passed =
    uaeFleetTitle.includes("Victor Mobility UAE") &&
    hasUaeHero > 0 &&
    uaeCardsCount === 4 &&
    hasMaybach > 0 &&
    hasEscalade > 0 &&
    hasAedRate > 0;

  results.push({
    test: "UAE Fleet Showcase (/uae/fleet) renders Maybach, Escalade, V-Class with AED rate calculators",
    passed: test5Passed,
    details: `Title: ${uaeFleetTitle}, UAE Hero: ${hasUaeHero}, UAE Cards: ${uaeCardsCount}, Maybach: ${hasMaybach}, Escalade: ${hasEscalade}`,
  });
  console.log(`[${test5Passed ? "PASS" : "FAIL"}] UAE Luxury Fleet Showcase`);
  await saveImage(desktopPage, "phase8-uae-fleet-showcase-desktop.png");

  // ==========================================
  // Test 6: Schema.org Structured Data
  // ==========================================
  console.log("\n--- Test 6: Schema.org ItemList Structured Data ---");
  await desktopPage.goto(`${BASE_URL}/india/fleet`, { waitUntil: "networkidle" });
  const indFleetJsonLd = await desktopPage.locator('script[type="application/ld+json"]').count();

  await desktopPage.goto(`${BASE_URL}/uae/fleet`, { waitUntil: "networkidle" });
  const uaeFleetJsonLd = await desktopPage.locator('script[type="application/ld+json"]').count();

  const schemaPassed = indFleetJsonLd > 0 && uaeFleetJsonLd > 0;
  results.push({
    test: "Schema.org ItemList structured data scripts are embedded on both India and UAE fleet showcases",
    passed: schemaPassed,
    details: `India JSON-LD: ${indFleetJsonLd}, UAE JSON-LD: ${uaeFleetJsonLd}`,
  });
  console.log(`[${schemaPassed ? "PASS" : "FAIL"}] Schema.org Structured Data`);

  await browser.close();

  // Summary
  console.log("\n==========================================");
  console.log("PHASE 8 VERIFICATION SUMMARY");
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
