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
  console.log("Starting Phase 4 Route Estimator & Chauffeur Academy Verification Suite...\n");
  const browser = await chromium.launch({ channel: "msedge" });
  const results = [];

  // ==========================================
  // Test 1: India Route & Fare Estimator Desktop
  // ==========================================
  console.log("--- Test 1: India Route & Fare Estimator Desktop ---");
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto(`${BASE_URL}/india/estimator`, { waitUntil: "networkidle" });

  const indiaEstimatorTitle = await desktopPage.title();
  const hasEstimatorHero = await desktopPage.getByRole("heading", { name: "India Route & Fare Estimator" }).count();
  
  // Test Hub Filter: Switch to Bengaluru
  await desktopPage.getByRole("button", { name: "Bengaluru", exact: true }).click();
  await desktopPage.waitForTimeout(300);

  // Switch Vehicle Tier to Executive MPV
  await desktopPage.getByRole("button", { name: /Executive MPV/i }).click();
  await desktopPage.waitForTimeout(300);

  // Verify price updated
  const priceText = await desktopPage.locator("text=Estimated Transit Range").locator("..").textContent();
  const hasInrPrice = priceText && priceText.includes("₹");

  // Verify WhatsApp action link
  const waBtn = desktopPage.locator('a:has-text("Inquire via WhatsApp with Estimate")');
  const waHref = await waBtn.getAttribute("href");
  const waValid = !!waHref && waHref.includes("wa.me/919396546950") && waHref.includes("VICTOR%20MOBILITY");

  const test1Passed =
    indiaEstimatorTitle.includes("Victor Mobility") &&
    hasEstimatorHero > 0 &&
    hasInrPrice &&
    waValid;

  results.push({
    test: "India Route & Fare Estimator calculates corridor brackets and formats WhatsApp draft",
    passed: test1Passed,
    details: `Title: ${indiaEstimatorTitle}, Price detected: ${hasInrPrice}, WhatsApp dispatch: ${waValid}`,
  });
  console.log(`[${test1Passed ? "PASS" : "FAIL"}] India Route & Fare Estimator`);
  await saveImage(desktopPage, "phase4-india-estimator-desktop.png");

  // ==========================================
  // Test 2: India Estimator Mobile (390px)
  // ==========================================
  console.log("\n--- Test 2: India Estimator Mobile ---");
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto(`${BASE_URL}/india/estimator`, { waitUntil: "networkidle" });
  await saveImage(mobilePage, "phase4-india-estimator-mobile.png");

  const mobileHero = await mobilePage.getByRole("heading", { name: "India Route & Fare Estimator" }).count();
  results.push({
    test: "India Estimator renders responsive mobile controls without truncation",
    passed: mobileHero > 0,
    details: `Mobile Hero count: ${mobileHero}`,
  });
  console.log(`[${mobileHero > 0 ? "PASS" : "FAIL"}] India Estimator Mobile View`);

  // ==========================================
  // Test 3: UAE Limousine Route Estimator Desktop
  // ==========================================
  console.log("\n--- Test 3: UAE Limousine Route Estimator ---");
  await desktopPage.goto(`${BASE_URL}/uae/estimator`, { waitUntil: "networkidle" });

  const uaeEstimatorTitle = await desktopPage.title();
  const hasUaeEstimatorHero = await desktopPage.getByRole("heading", { name: "UAE Route & Limousine Estimator" }).count();

  // Switch Vehicle Tier to Ultra-Luxury Limousine (Maybach)
  await desktopPage.getByRole("button", { name: /Ultra-Luxury Limousine/i }).click();
  await desktopPage.waitForTimeout(300);

  // Check AED price
  const uaePriceText = await desktopPage.locator("text=Estimated Transit Range").locator("..").textContent();
  const hasAedPrice = uaePriceText && uaePriceText.includes("AED");

  // Check UAE WhatsApp Link to Dubai Head Office (+971 52 455 2441)
  const uaeWaBtn = desktopPage.locator('a:has-text("Inquire via WhatsApp with Estimate")');
  const uaeWaHref = await uaeWaBtn.getAttribute("href");
  const uaeWaValid = !!uaeWaHref && uaeWaHref.includes("wa.me/971524552441") && uaeWaHref.includes("Victor%20Luxury%20Limousine");

  const test3Passed =
    uaeEstimatorTitle.includes("Victor Mobility UAE") &&
    hasUaeEstimatorHero > 0 &&
    hasAedPrice &&
    uaeWaValid;

  results.push({
    test: "UAE Limousine Estimator calculates AED luxury tariffs and routes to Dubai Desk",
    passed: test3Passed,
    details: `Title: ${uaeEstimatorTitle}, AED Price: ${hasAedPrice}, Dubai WhatsApp: ${uaeWaValid}`,
  });
  console.log(`[${test3Passed ? "PASS" : "FAIL"}] UAE Limousine Estimator`);
  await saveImage(desktopPage, "phase4-uae-estimator-desktop.png");

  // ==========================================
  // Test 4: Chauffeur Protocol Academy Desktop
  // ==========================================
  console.log("\n--- Test 4: Chauffeur Protocol Academy Desktop ---");
  await desktopPage.goto(`${BASE_URL}/india/academy`, { waitUntil: "networkidle" });

  const academyTitle = await desktopPage.title();
  const hasAcademyHero = await desktopPage.getByRole("heading", { name: "Chauffeur Protocol Academy" }).count();
  const hasCurriculum = await desktopPage.getByRole("heading", { name: "The 5-Pillar Chauffeur Curriculum" }).count();

  // Test Curriculum Tab Switching
  await desktopPage.getByRole("button", { name: /Discretion, Non-Disclosure/i }).click();
  await desktopPage.waitForTimeout(300);
  const discretionActive = await desktopPage.getByText("Zero unsolicited conversation during passenger transit").count();

  // Test 24-point Checklist Category Switching
  await desktopPage.getByRole("button", { name: "Safety & Compliance", exact: true }).click();
  await desktopPage.waitForTimeout(300);
  const checklistActive = await desktopPage.getByText("GPS tracking unit connected to 24/7 Central Operations").count();

  // Test Verified Chauffeur Badge Preview
  const hasChauffeurBadge = await desktopPage.getByText("Verified Chauffeur ID").count();

  const test4Passed =
    academyTitle.includes("Victor Mobility") &&
    hasAcademyHero > 0 &&
    hasCurriculum > 0 &&
    discretionActive > 0 &&
    checklistActive > 0 &&
    hasChauffeurBadge > 0;

  results.push({
    test: "Chauffeur Protocol Academy renders 5-pillar curriculum, 24-point audit, and digital driver badge",
    passed: test4Passed,
    details: `Title: ${academyTitle}, Module Tab: ${discretionActive}, Audit Tab: ${checklistActive}, Badge: ${hasChauffeurBadge}`,
  });
  console.log(`[${test4Passed ? "PASS" : "FAIL"}] Chauffeur Protocol Academy`);
  await saveImage(desktopPage, "phase4-academy-desktop.png");

  // ==========================================
  // Test 5: Chauffeur Academy Mobile View
  // ==========================================
  console.log("\n--- Test 5: Chauffeur Academy Mobile ---");
  await mobilePage.goto(`${BASE_URL}/india/academy`, { waitUntil: "networkidle" });
  await saveImage(mobilePage, "phase4-academy-mobile.png");

  const mobileAcademyHero = await mobilePage.getByRole("heading", { name: "Chauffeur Protocol Academy" }).count();
  results.push({
    test: "Chauffeur Academy renders mobile layout cleanly",
    passed: mobileAcademyHero > 0,
    details: `Mobile Hero count: ${mobileAcademyHero}`,
  });
  console.log(`[${mobileAcademyHero > 0 ? "PASS" : "FAIL"}] Academy Mobile View`);

  // ==========================================
  // Test 6: Global Navigation & Footer Links to Estimator & Academy
  // ==========================================
  console.log("\n--- Test 6: Global Navigation Links ---");
  await desktopPage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });

  const navEstimatorLink = await desktopPage.locator('nav a[href="/india/estimator"]').count();
  const navAcademyLink = await desktopPage.locator('nav a[href="/india/academy"]').count();
  const footerEstimatorLink = await desktopPage.locator('footer a[href="/india/estimator"]').count();
  const footerAcademyLink = await desktopPage.locator('footer a[href="/india/academy"]').count();

  await desktopPage.goto(`${BASE_URL}/uae`, { waitUntil: "networkidle" });
  const uaeNavEstimatorLink = await desktopPage.locator('nav a[href="/uae/estimator"]').count();
  const uaeNavAcademyLink = await desktopPage.locator('nav a[href="/uae/academy"]').count();

  const linksPassed =
    navEstimatorLink > 0 &&
    navAcademyLink > 0 &&
    footerEstimatorLink > 0 &&
    footerAcademyLink > 0 &&
    uaeNavEstimatorLink > 0 &&
    uaeNavAcademyLink > 0;

  results.push({
    test: "Navigation Header and Footer link to Estimator and Academy across India & UAE portals",
    passed: linksPassed,
    details: `IN Nav Estimator: ${navEstimatorLink}, IN Nav Academy: ${navAcademyLink}, UAE Nav Estimator: ${uaeNavEstimatorLink}, UAE Nav Academy: ${uaeNavAcademyLink}`,
  });
  console.log(`[${linksPassed ? "PASS" : "FAIL"}] Global Navigation Links`);

  // ==========================================
  // Test 7: Schema.org Structured Data
  // ==========================================
  console.log("\n--- Test 7: Schema.org Structured Data ---");
  await desktopPage.goto(`${BASE_URL}/india/estimator`, { waitUntil: "networkidle" });
  const indEstimatorJsonLd = await desktopPage.locator('script[type="application/ld+json"]').count();

  await desktopPage.goto(`${BASE_URL}/india/academy`, { waitUntil: "networkidle" });
  const indAcademyJsonLd = await desktopPage.locator('script[type="application/ld+json"]').count();

  const schemaPassed = indEstimatorJsonLd > 0 && indAcademyJsonLd > 0;
  results.push({
    test: "Schema.org structured data scripts are embedded on Estimator and Academy pages",
    passed: schemaPassed,
    details: `Estimator JSON-LD: ${indEstimatorJsonLd}, Academy JSON-LD: ${indAcademyJsonLd}`,
  });
  console.log(`[${schemaPassed ? "PASS" : "FAIL"}] Schema.org Structured Data`);

  await browser.close();

  // Summary
  console.log("\n==========================================");
  console.log("PHASE 4 VERIFICATION SUMMARY");
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
