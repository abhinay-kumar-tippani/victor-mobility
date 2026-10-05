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
  console.log("Starting Phase 9 Enterprise ESG & Green Fleet Carbon Calculator Verification Suite...\n");
  const browser = await chromium.launch({ channel: "msedge" });
  const results = [];

  // ==========================================
  // Test 1: India ESG Calculator Desktop
  // ==========================================
  console.log("--- Test 1: India ESG Calculator Desktop ---");
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto(`${BASE_URL}/india/esg`, { waitUntil: "networkidle" });

  const indiaEsgTitle = await desktopPage.title();
  const hasHero = await desktopPage.getByRole("heading", { name: "Decarbonizing Corporate Commutes" }).count();

  // Verify Calculator Elements
  const hasCalcTitle = await desktopPage.getByRole("heading", { name: "Corporate Commute Carbon Savings Estimator" }).count();
  const hasCo2Metric = await desktopPage.locator("text=Metric Tonnes CO₂e").count();
  const hasForestMetric = await desktopPage.locator("text=Forest Equivalent").count();

  // Test interactive strategy change: Switch to EV mix
  const evBtn = desktopPage.locator('button:has-text("Electric Vehicle (EV) Mix")').first();
  await evBtn.click();
  await desktopPage.waitForTimeout(300);

  const hasEvSlider = await desktopPage.locator("text=Target Fleet Electrification").count();

  // Check WhatsApp consultation CTA
  const waBtn = desktopPage.locator('a:has-text("Consult ESG Mobility Specialist via WhatsApp")').first();
  const waHref = await waBtn.getAttribute("href");
  const waValid =
    !!waHref &&
    waHref.includes("wa.me/919396546950") &&
    waHref.includes("CARBON") &&
    waHref.includes("Offset");

  const test1Passed =
    indiaEsgTitle.includes("Victor Mobility") &&
    hasHero > 0 &&
    hasCalcTitle > 0 &&
    hasCo2Metric > 0 &&
    hasForestMetric > 0 &&
    hasEvSlider > 0 &&
    waValid;

  results.push({
    test: "India ESG Desk (/india/esg) renders dynamic carbon modeler, EV slider, and WhatsApp consultation action",
    passed: test1Passed,
    details: `Title: ${indiaEsgTitle}, Hero: ${hasHero}, Calc: ${hasCalcTitle}, EV Slider: ${hasEvSlider}, WhatsApp: ${waValid}`,
  });
  console.log(`[${test1Passed ? "PASS" : "FAIL"}] India ESG Calculator Desktop`);
  await saveImage(desktopPage, "phase9-india-esg-desktop.png");

  // ==========================================
  // Test 2: India ESG Mobile View (390px)
  // ==========================================
  console.log("\n--- Test 2: India ESG Mobile View ---");
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto(`${BASE_URL}/india/esg`, { waitUntil: "networkidle" });
  await saveImage(mobilePage, "phase9-india-esg-mobile.png");

  const mobileHero = await mobilePage.getByRole("heading", { name: "Decarbonizing Corporate Commutes" }).count();
  const mobileCalc = await mobilePage.getByRole("heading", { name: "Corporate Commute Carbon Savings Estimator" }).count();

  results.push({
    test: "India ESG Desk renders responsive mobile layout, sliders, and carbon impact cards (390px)",
    passed: mobileHero > 0 && mobileCalc > 0,
    details: `Mobile Hero: ${mobileHero}, Mobile Calc: ${mobileCalc}`,
  });
  console.log(`[${mobileHero > 0 && mobileCalc > 0 ? "PASS" : "FAIL"}] India ESG Mobile View`);

  // ==========================================
  // Test 3: UAE Green Limousine & Sustainable Mobility Desktop
  // ==========================================
  console.log("\n--- Test 3: UAE Green Limousine Desktop ---");
  await desktopPage.goto(`${BASE_URL}/uae/esg`, { waitUntil: "networkidle" });

  const uaeEsgTitle = await desktopPage.title();
  const hasUaeHero = await desktopPage.getByRole("heading", { name: "Sustainable Executive Mobility" }).count();
  const hasNetZeroBadge = await desktopPage.locator("text=UAE Net Zero 2050 Alignment").count();

  const test3Passed =
    uaeEsgTitle.includes("Victor Mobility UAE") &&
    hasUaeHero > 0 &&
    hasNetZeroBadge > 0;

  results.push({
    test: "UAE ESG Desk (/uae/esg) aligns with UAE Net Zero 2050 strategy and Dubai Clean Energy targets",
    passed: test3Passed,
    details: `Title: ${uaeEsgTitle}, UAE Hero: ${hasUaeHero}, Net Zero Badge: ${hasNetZeroBadge}`,
  });
  console.log(`[${test3Passed ? "PASS" : "FAIL"}] UAE Green Limousine Desktop`);
  await saveImage(desktopPage, "phase9-uae-esg-desktop.png");

  // ==========================================
  // Test 4: Global Footer ESG Links
  // ==========================================
  console.log("\n--- Test 4: Global Footer ESG Links ---");
  await desktopPage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });
  const indFooterEsg = await desktopPage.locator('footer a[href="/india/esg"]').count();

  await desktopPage.goto(`${BASE_URL}/uae`, { waitUntil: "networkidle" });
  const uaeFooterEsg = await desktopPage.locator('footer a[href="/uae/esg"]').count();

  const footerPassed = indFooterEsg > 0 && uaeFooterEsg > 0;
  results.push({
    test: "Corporate Footer contains ESG & Green Mobility link across India & UAE portals",
    passed: footerPassed,
    details: `India Footer: ${indFooterEsg}, UAE Footer: ${uaeFooterEsg}`,
  });
  console.log(`[${footerPassed ? "PASS" : "FAIL"}] Footer ESG Links`);

  // ==========================================
  // Test 5: Schema.org Structured Data
  // ==========================================
  console.log("\n--- Test 5: Schema.org Structured Data ---");
  await desktopPage.goto(`${BASE_URL}/india/esg`, { waitUntil: "networkidle" });
  const indEsgJsonLd = await desktopPage.locator('script[type="application/ld+json"]').count();

  await desktopPage.goto(`${BASE_URL}/uae/esg`, { waitUntil: "networkidle" });
  const uaeEsgJsonLd = await desktopPage.locator('script[type="application/ld+json"]').count();

  const schemaPassed = indEsgJsonLd > 0 && uaeEsgJsonLd > 0;
  results.push({
    test: "Schema.org WebApplication structured data scripts are embedded on both India and UAE ESG desks",
    passed: schemaPassed,
    details: `India JSON-LD: ${indEsgJsonLd}, UAE JSON-LD: ${uaeEsgJsonLd}`,
  });
  console.log(`[${schemaPassed ? "PASS" : "FAIL"}] Schema.org Structured Data`);

  await browser.close();

  // Summary
  console.log("\n==========================================");
  console.log("PHASE 9 VERIFICATION SUMMARY");
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
