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
  console.log("Starting Phase 5 Corporate Client Portal & Telematics Verification Suite...\n");
  const browser = await chromium.launch({ channel: "msedge" });
  const results = [];

  // ==========================================
  // Test 1: India Corporate Client Portal Desktop
  // ==========================================
  console.log("--- Test 1: India Corporate Client Portal Desktop ---");
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto(`${BASE_URL}/india/portal`, { waitUntil: "networkidle" });

  const indiaPortalTitle = await desktopPage.title();
  const hasPortalHero = await desktopPage.getByRole("heading", { name: "Corporate Client Portal & Telematics" }).count();
  const hasClientName = await desktopPage.getByText("Amazon Development Centre India").count();
  const hasManager = await desktopPage.getByText("Mujeeb Ur Rehman Mohammed").count();

  // Test Shift Roster Tab (Switch to Night Escort Shift)
  await desktopPage.getByRole("button", { name: /Night Graveyard Roster/i }).click();
  await desktopPage.waitForTimeout(300);
  const hasNightEscort = await desktopPage.getByText("Verified Security Guard Onboard").count();

  // Test WhatsApp Roster Adjustment Link
  const waBtn = desktopPage.locator('a:has-text("Request Roster Adjustment")');
  const waHref = await waBtn.getAttribute("href");
  const waValid = !!waHref && waHref.includes("wa.me/919396546950") && waHref.includes("Amazon%20Development");

  // Test Tab 2: Monthly SLA Scorecard
  await desktopPage.getByRole("button", { name: /Monthly SLA Scorecard/i }).click();
  await desktopPage.waitForTimeout(300);
  const hasSlaOnTime = await desktopPage.getByText("99.4%").count();
  const hasSlaBgv = await desktopPage.getByText("100% Police & BGV Verification").count();

  // Test Tab 3: Billing & Invoicing Reconciler
  await desktopPage.getByRole("button", { name: /Billing & Invoicing Reconciler/i }).click();
  await desktopPage.waitForTimeout(300);
  const hasBillingTable = await desktopPage.getByText("VM-INV-2026-09-HYD42").count();
  const hasNetTotal = await desktopPage.getByText("₹30,59,070").count();

  const test1Passed =
    indiaPortalTitle.includes("Victor Mobility") &&
    hasPortalHero > 0 &&
    hasClientName > 0 &&
    hasManager > 0 &&
    hasNightEscort > 0 &&
    waValid &&
    hasSlaOnTime > 0 &&
    hasSlaBgv > 0 &&
    hasBillingTable > 0 &&
    hasNetTotal > 0;

  results.push({
    test: "India Corporate Client Portal (/india/portal) renders live shift rosters, telemetry, SLA scorecard, and billing table",
    passed: test1Passed,
    details: `Title: ${indiaPortalTitle}, Night Escort: ${hasNightEscort}, WhatsApp Roster: ${waValid}, SLA 99.4%: ${hasSlaOnTime}, Billing: ${hasNetTotal}`,
  });
  console.log(`[${test1Passed ? "PASS" : "FAIL"}] India Corporate Client Portal`);

  // Switch back to rosters for screenshot
  await desktopPage.getByRole("button", { name: /Live Shift Rosters/i }).click();
  await desktopPage.waitForTimeout(200);
  await saveImage(desktopPage, "phase5-india-portal-desktop.png");

  // ==========================================
  // Test 2: India Portal Mobile (390px)
  // ==========================================
  console.log("\n--- Test 2: India Portal Mobile ---");
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto(`${BASE_URL}/india/portal`, { waitUntil: "networkidle" });
  await saveImage(mobilePage, "phase5-india-portal-mobile.png");

  const mobileHero = await mobilePage.getByRole("heading", { name: "Corporate Client Portal & Telematics" }).count();
  results.push({
    test: "India Corporate Portal renders responsive mobile telematics layout",
    passed: mobileHero > 0,
    details: `Mobile Hero count: ${mobileHero}`,
  });
  console.log(`[${mobileHero > 0 ? "PASS" : "FAIL"}] India Portal Mobile View`);

  // ==========================================
  // Test 3: UAE Corporate Client Portal Desktop
  // ==========================================
  console.log("\n--- Test 3: UAE Corporate Client Portal ---");
  await desktopPage.goto(`${BASE_URL}/uae/portal`, { waitUntil: "networkidle" });

  const uaePortalTitle = await desktopPage.title();
  const hasUaePortalHero = await desktopPage.getByRole("heading", { name: "UAE Corporate Client Portal" }).count();
  const hasUaeClient = await desktopPage.getByText("Emirates Global Investment Group").count();
  const hasMaybach = await desktopPage.getByText("Mercedes-Maybach S-Class").count();

  // Test UAE Billing & VAT
  await desktopPage.getByRole("button", { name: /Billing & Invoicing Reconciler/i }).click();
  await desktopPage.waitForTimeout(300);
  const hasVat = await desktopPage.getByText("UAE VAT (5% Statutory Rate)").count();
  const hasAedTotal = await desktopPage.getByText("AED 194,250").count();

  const test3Passed =
    uaePortalTitle.includes("Victor Mobility UAE") &&
    hasUaePortalHero > 0 &&
    hasUaeClient > 0 &&
    hasMaybach > 0 &&
    hasVat > 0 &&
    hasAedTotal > 0;

  results.push({
    test: "UAE Corporate Client Portal (/uae/portal) renders Dubai delegation fleet telemetry and VAT statements",
    passed: test3Passed,
    details: `Title: ${uaePortalTitle}, Client: ${hasUaeClient}, Maybach: ${hasMaybach}, VAT Total: ${hasAedTotal}`,
  });
  console.log(`[${test3Passed ? "PASS" : "FAIL"}] UAE Corporate Client Portal`);

  // Switch back to rosters for screenshot
  await desktopPage.getByRole("button", { name: /Live Shift Rosters/i }).click();
  await desktopPage.waitForTimeout(200);
  await saveImage(desktopPage, "phase5-uae-portal-desktop.png");

  // ==========================================
  // Test 4: Global Footer Portal Links
  // ==========================================
  console.log("\n--- Test 4: Global Footer Links ---");
  await desktopPage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });
  const indFooterPortal = await desktopPage.locator('footer a[href="/india/portal"]').count();

  await desktopPage.goto(`${BASE_URL}/uae`, { waitUntil: "networkidle" });
  const uaeFooterPortal = await desktopPage.locator('footer a[href="/uae/portal"]').count();

  const footerLinksPassed = indFooterPortal > 0 && uaeFooterPortal > 0;
  results.push({
    test: "Corporate Footer contains Client Telematics Portal link across India & UAE portals",
    passed: footerLinksPassed,
    details: `India Footer: ${indFooterPortal}, UAE Footer: ${uaeFooterPortal}`,
  });
  console.log(`[${footerLinksPassed ? "PASS" : "FAIL"}] Footer Portal Links`);

  // ==========================================
  // Test 5: Schema.org WebApplication Structured Data
  // ==========================================
  console.log("\n--- Test 5: Schema.org Structured Data ---");
  await desktopPage.goto(`${BASE_URL}/india/portal`, { waitUntil: "networkidle" });
  const indPortalJsonLd = await desktopPage.locator('script[type="application/ld+json"]').count();

  await desktopPage.goto(`${BASE_URL}/uae/portal`, { waitUntil: "networkidle" });
  const uaePortalJsonLd = await desktopPage.locator('script[type="application/ld+json"]').count();

  const schemaPassed = indPortalJsonLd > 0 && uaePortalJsonLd > 0;
  results.push({
    test: "Schema.org structured data scripts are embedded on both India and UAE portal pages",
    passed: schemaPassed,
    details: `India Portal JSON-LD: ${indPortalJsonLd}, UAE Portal JSON-LD: ${uaePortalJsonLd}`,
  });
  console.log(`[${schemaPassed ? "PASS" : "FAIL"}] Schema.org Structured Data`);

  await browser.close();

  // Summary
  console.log("\n==========================================");
  console.log("PHASE 5 VERIFICATION SUMMARY");
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
