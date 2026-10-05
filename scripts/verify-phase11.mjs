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
  console.log("Starting Phase 11 Chauffeur Credential & Safety Badge Verification Desk Verification Suite...\n");
  const browser = await chromium.launch({ channel: "msedge" });
  const results = [];

  // ==========================================
  // Test 1: India Chauffeur Verification Desktop
  // ==========================================
  console.log("--- Test 1: India Chauffeur Verification Desktop ---");
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto(`${BASE_URL}/india/academy/verify`, { waitUntil: "networkidle" });

  const indiaVerifyTitle = await desktopPage.title();
  const hasHero = await desktopPage.getByRole("heading", { name: "Chauffeur Badge Verification" }).count();

  // Verify Initial Badge VIC-HYD-4821
  const hasRameshwar = await desktopPage.locator("text=Rameshwar K.").count();
  const hasPoliceTelangana = await desktopPage.locator("text=Telangana State Police CCTNS Verification").count();
  const hasSobriety = await desktopPage.locator("text=0.00% BAC (Zero-Tolerance Protocol)").count();
  const hasWomenSafety = await desktopPage.locator("text=Certified Night Escort Driver").count();

  // Test dynamic chip click: VIC-BLR-1092
  const blrChip = desktopPage.locator('button:has-text("VIC-BLR-1092")').first();
  await blrChip.click();
  await desktopPage.waitForTimeout(300);

  const hasSiddharth = await desktopPage.locator("text=Siddharth N.").count();
  const hasPoliceKarnataka = await desktopPage.locator("text=Karnataka State Police Criminal Verification").count();

  // Check WhatsApp audit request link
  const waBtn = desktopPage.locator('a:has-text("Request Signed Audit File via WhatsApp")').first();
  const waHref = await waBtn.getAttribute("href");
  const waValid =
    !!waHref &&
    waHref.includes("wa.me/919396546950") &&
    waHref.includes("CHAUFFEUR") &&
    waHref.includes("VIC-BLR-1092");

  const test1Passed =
    indiaVerifyTitle.includes("Victor Mobility") &&
    hasHero > 0 &&
    hasRameshwar > 0 &&
    hasPoliceTelangana > 0 &&
    hasSobriety > 0 &&
    hasWomenSafety > 0 &&
    hasSiddharth > 0 &&
    hasPoliceKarnataka > 0 &&
    waValid;

  results.push({
    test: "India Chauffeur Verification Desk (/india/academy/verify) authenticates driver police clearances, sobriety logs, and WhatsApp audit requests",
    passed: test1Passed,
    details: `Title: ${indiaVerifyTitle}, Hero: ${hasHero}, Rameshwar: ${hasRameshwar}, Siddharth: ${hasSiddharth}, WhatsApp: ${waValid}`,
  });
  console.log(`[${test1Passed ? "PASS" : "FAIL"}] India Chauffeur Verification Desktop`);
  await saveImage(desktopPage, "phase11-india-verify-desktop.png");

  // ==========================================
  // Test 2: India Chauffeur Verification Mobile View (390px)
  // ==========================================
  console.log("\n--- Test 2: India Verification Mobile View ---");
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto(`${BASE_URL}/india/academy/verify`, { waitUntil: "networkidle" });
  await saveImage(mobilePage, "phase11-india-verify-mobile.png");

  const mobileHero = await mobilePage.getByRole("heading", { name: "Chauffeur Badge Verification" }).count();
  const mobileCard = await mobilePage.locator("text=Verified Active Chauffeur").count();

  results.push({
    test: "India Chauffeur Verification Desk renders responsive mobile layout, sample badge chips, and security audit cards (390px)",
    passed: mobileHero > 0 && mobileCard > 0,
    details: `Mobile Hero: ${mobileHero}, Mobile Card: ${mobileCard}`,
  });
  console.log(`[${mobileHero > 0 && mobileCard > 0 ? "PASS" : "FAIL"}] India Verification Mobile View`);

  // ==========================================
  // Test 3: UAE RTA Chauffeur Verification Desktop
  // ==========================================
  console.log("\n--- Test 3: UAE RTA Chauffeur Verification Desktop ---");
  await desktopPage.goto(`${BASE_URL}/uae/academy/verify`, { waitUntil: "networkidle" });

  const uaeVerifyTitle = await desktopPage.title();
  const hasUaeHero = await desktopPage.getByRole("heading", { name: "RTA Chauffeur Verification" }).count();
  const hasTariq = await desktopPage.locator("text=Tariq A.").count();
  const hasDubaiPolice = await desktopPage.locator("text=Dubai Police Good Conduct Clearance").count();

  const test3Passed =
    uaeVerifyTitle.includes("Victor Mobility UAE") &&
    hasUaeHero > 0 &&
    hasTariq > 0 &&
    hasDubaiPolice > 0;

  results.push({
    test: "UAE Chauffeur Verification Desk (/uae/academy/verify) authenticates RTA permits and Dubai Police good conduct records",
    passed: test3Passed,
    details: `Title: ${uaeVerifyTitle}, UAE Hero: ${hasUaeHero}, Tariq: ${hasTariq}, Dubai Police: ${hasDubaiPolice}`,
  });
  console.log(`[${test3Passed ? "PASS" : "FAIL"}] UAE RTA Chauffeur Verification Desktop`);
  await saveImage(desktopPage, "phase11-uae-verify-desktop.png");

  // ==========================================
  // Test 4: Global Footer & Academy Navigation Links
  // ==========================================
  console.log("\n--- Test 4: Footer & Academy Verification Links ---");
  await desktopPage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });
  const indFooterVerify = await desktopPage.locator('footer a[href="/india/academy/verify"]').count();

  await desktopPage.goto(`${BASE_URL}/uae`, { waitUntil: "networkidle" });
  const uaeFooterVerify = await desktopPage.locator('footer a[href="/uae/academy/verify"]').count();

  await desktopPage.goto(`${BASE_URL}/india/academy`, { waitUntil: "networkidle" });
  const indAcademyVerifyBtn = await desktopPage.locator('a[href="/india/academy/verify"]').count();

  const navPassed = indFooterVerify > 0 && uaeFooterVerify > 0 && indAcademyVerifyBtn > 0;
  results.push({
    test: "Chauffeur Verification Desk is linked across Global Footers and Chauffeur Academy CTA sections",
    passed: navPassed,
    details: `India Footer: ${indFooterVerify}, UAE Footer: ${uaeFooterVerify}, Academy Page CTA: ${indAcademyVerifyBtn}`,
  });
  console.log(`[${navPassed ? "PASS" : "FAIL"}] Navigation Verification Links`);

  // ==========================================
  // Test 5: Schema.org Structured Data
  // ==========================================
  console.log("\n--- Test 5: Schema.org Structured Data ---");
  await desktopPage.goto(`${BASE_URL}/india/academy/verify`, { waitUntil: "networkidle" });
  const indVerifyJsonLd = await desktopPage.locator('script[type="application/ld+json"]').count();

  await desktopPage.goto(`${BASE_URL}/uae/academy/verify`, { waitUntil: "networkidle" });
  const uaeVerifyJsonLd = await desktopPage.locator('script[type="application/ld+json"]').count();

  const schemaPassed = indVerifyJsonLd > 0 && uaeVerifyJsonLd > 0;
  results.push({
    test: "Schema.org WebApplication structured data scripts are embedded on both India and UAE verification desks",
    passed: schemaPassed,
    details: `India JSON-LD: ${indVerifyJsonLd}, UAE JSON-LD: ${uaeVerifyJsonLd}`,
  });
  console.log(`[${schemaPassed ? "PASS" : "FAIL"}] Schema.org Structured Data`);

  await browser.close();

  // Summary
  console.log("\n==========================================");
  console.log("PHASE 11 VERIFICATION SUMMARY");
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
