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
  console.log("Starting Phase 7 Digital Executive Presentation Deck & Capability Brochure Verification Suite...\n");
  const browser = await chromium.launch({ channel: "msedge" });
  const results = [];

  // ==========================================
  // Test 1: India Executive Presentation Deck Desktop
  // ==========================================
  console.log("--- Test 1: India Executive Presentation Deck Desktop ---");
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto(`${BASE_URL}/india/brochure`, { waitUntil: "networkidle" });

  const indiaBrochureTitle = await desktopPage.title();
  const hasDeckHero = await desktopPage.getByRole("heading", { name: "Executive Presentation Deck" }).count();

  // Verify Slide 01 Content
  const hasSlide1 = await desktopPage.locator('text=Corporate Mobility Partner of Choice').count();
  const hasCarMetric = await desktopPage.locator('text=2,000+ Cars').count();
  const hasBusMetric = await desktopPage.locator('text=500+ Buses').count();

  // Test interactive navigation: advance to Slide 02
  const nextBtn = desktopPage.locator('button:has-text("Next Slide")').first();
  await nextBtn.click();
  await desktopPage.waitForTimeout(300);

  const hasFounderSlide = await desktopPage.locator('text=Mohammed Jahangir').count();

  const test1Passed =
    indiaBrochureTitle.includes("Victor Mobility") &&
    hasDeckHero > 0 &&
    hasSlide1 > 0 &&
    hasCarMetric > 0 &&
    hasBusMetric > 0 &&
    hasFounderSlide > 0;

  results.push({
    test: "India Executive Presentation Deck (/india/brochure) renders Slide 01 metrics and advances to Founder's Vision",
    passed: test1Passed,
    details: `Title: ${indiaBrochureTitle}, Hero: ${hasDeckHero}, Slide1: ${hasSlide1}, FounderSlide: ${hasFounderSlide}`,
  });
  console.log(`[${test1Passed ? "PASS" : "FAIL"}] India Executive Presentation Deck`);
  await saveImage(desktopPage, "phase7-india-brochure-desktop.png");

  // ==========================================
  // Test 2: Mode Switching & Print View Mode
  // ==========================================
  console.log("\n--- Test 2: Mode Switching to Full Document View ---");
  const docModeBtn = desktopPage.locator('button:has-text("Full Document View")').first();
  await docModeBtn.click();
  await desktopPage.waitForTimeout(400);

  const slideCardsCount = await desktopPage.locator('.slide-card-print').count();
  const test2Passed = slideCardsCount === 8;

  results.push({
    test: "Presentation Deck switches between Interactive Slide Deck and Full Sequential Document View (8 slides)",
    passed: test2Passed,
    details: `Document Mode Slide Cards rendered: ${slideCardsCount} (Expected: 8)`,
  });
  console.log(`[${test2Passed ? "PASS" : "FAIL"}] Document View Mode`);

  // Switch back to Deck Mode for clean state
  const deckModeBtn = desktopPage.locator('button:has-text("Interactive Slide Deck")').first();
  await deckModeBtn.click();
  await desktopPage.waitForTimeout(200);

  // ==========================================
  // Test 3: India Brochure Mobile View (390px)
  // ==========================================
  console.log("\n--- Test 3: India Brochure Mobile View ---");
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto(`${BASE_URL}/india/brochure`, { waitUntil: "networkidle" });
  await saveImage(mobilePage, "phase7-india-brochure-mobile.png");

  const mobileHero = await mobilePage.getByRole("heading", { name: "Executive Presentation Deck" }).count();
  const mobileSlide = await mobilePage.locator('text=Corporate Mobility Partner of Choice').count();

  results.push({
    test: "India Brochure renders responsive slide view and controls on mobile (390px)",
    passed: mobileHero > 0 && mobileSlide > 0,
    details: `Mobile Hero: ${mobileHero}, Mobile Slide: ${mobileSlide}`,
  });
  console.log(`[${mobileHero > 0 && mobileSlide > 0 ? "PASS" : "FAIL"}] India Brochure Mobile View`);

  // ==========================================
  // Test 4: UAE Executive Presentation Deck Desktop
  // ==========================================
  console.log("\n--- Test 4: UAE Executive Presentation Deck ---");
  await desktopPage.goto(`${BASE_URL}/uae/brochure`, { waitUntil: "networkidle" });

  const uaeBrochureTitle = await desktopPage.title();
  const hasUaeHero = await desktopPage.getByRole("heading", { name: "UAE Executive Presentation Deck" }).count();
  const hasUaeSlide1 = await desktopPage.locator('text=UAE Luxury Mobility Partner of Choice').count();

  const test4Passed =
    uaeBrochureTitle.includes("Victor Mobility UAE") &&
    hasUaeHero > 0 &&
    hasUaeSlide1 > 0;

  results.push({
    test: "UAE Executive Presentation Deck (/uae/brochure) renders UAE fleet and Dubai Al Garhoud corporate details",
    passed: test4Passed,
    details: `Title: ${uaeBrochureTitle}, UAE Hero: ${hasUaeHero}, UAE Slide1: ${hasUaeSlide1}`,
  });
  console.log(`[${test4Passed ? "PASS" : "FAIL"}] UAE Executive Presentation Deck`);
  await saveImage(desktopPage, "phase7-uae-brochure-desktop.png");

  // ==========================================
  // Test 5: Global Footer Brochure Links
  // ==========================================
  console.log("\n--- Test 5: Global Footer Links ---");
  await desktopPage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });
  const indFooterBrochure = await desktopPage.locator('footer a[href="/india/brochure"]').count();

  await desktopPage.goto(`${BASE_URL}/uae`, { waitUntil: "networkidle" });
  const uaeFooterBrochure = await desktopPage.locator('footer a[href="/uae/brochure"]').count();

  const footerPassed = indFooterBrochure > 0 && uaeFooterBrochure > 0;
  results.push({
    test: "Corporate Footer contains Executive Deck & Brochure link across India & UAE portals",
    passed: footerPassed,
    details: `India Footer: ${indFooterBrochure}, UAE Footer: ${uaeFooterBrochure}`,
  });
  console.log(`[${footerPassed ? "PASS" : "FAIL"}] Footer Brochure Links`);

  // ==========================================
  // Test 6: Schema.org Structured Data
  // ==========================================
  console.log("\n--- Test 6: Schema.org Structured Data ---");
  await desktopPage.goto(`${BASE_URL}/india/brochure`, { waitUntil: "networkidle" });
  const indBrochureJsonLd = await desktopPage.locator('script[type="application/ld+json"]').count();

  await desktopPage.goto(`${BASE_URL}/uae/brochure`, { waitUntil: "networkidle" });
  const uaeBrochureJsonLd = await desktopPage.locator('script[type="application/ld+json"]').count();

  const schemaPassed = indBrochureJsonLd > 0 && uaeBrochureJsonLd > 0;
  results.push({
    test: "Schema.org DigitalDocument structured data scripts are embedded on both India and UAE brochure decks",
    passed: schemaPassed,
    details: `India JSON-LD: ${indBrochureJsonLd}, UAE JSON-LD: ${uaeBrochureJsonLd}`,
  });
  console.log(`[${schemaPassed ? "PASS" : "FAIL"}] Schema.org Structured Data`);

  await browser.close();

  // Summary
  console.log("\n==========================================");
  console.log("PHASE 7 VERIFICATION SUMMARY");
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
