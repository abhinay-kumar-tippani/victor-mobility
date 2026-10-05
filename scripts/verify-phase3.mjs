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
  console.log("Starting Phase 3 Enterprise RFP & Corridor Matrix Verification Suite...\n");
  const browser = await chromium.launch({ channel: "msedge" });
  const results = [];

  // ==========================================
  // Test 1: India RFP Portal (/india/rfp) Desktop
  // ==========================================
  console.log("--- Test 1: India RFP Portal Desktop ---");
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto(`${BASE_URL}/india/rfp`, { waitUntil: "networkidle" });

  const indiaRfpTitle = await desktopPage.title();
  const hasRfpHero = await desktopPage.getByRole("heading", { name: "Corporate Mobility RFP Desk" }).count();
  const hasTrustGrid = await desktopPage.getByText("100% BGV & Police Verified").count();

  // Test Multi-Step RFP Form Step 1
  await desktopPage.fill('#rfp-company-name', 'Amazon Development Centre India');
  await desktopPage.fill('#rfp-contact-person', 'Anita Desai');
  await desktopPage.fill('#rfp-email', 'anita.desai@amazon.com');
  await desktopPage.fill('#rfp-phone', '+91 98765 43210');
  await desktopPage.selectOption('#rfp-city', 'Hyderabad');

  // Step 1 -> Step 2
  await desktopPage.getByRole("button", { name: /Continue to Next Step/i }).click();
  await desktopPage.waitForTimeout(300);

  const onStep2 = await desktopPage.getByText("2. Operational Scope & Shift Roster").count();

  // Step 2 selections
  await desktopPage.selectOption('#rfp-commuters', '500 – 1,500 Commuters / Day');
  await desktopPage.selectOption('#rfp-shifts', '3 Shifts (24/7 Round-the-Clock IT/BPO Operations)');
  await desktopPage.fill('#rfp-notes', 'Dedicated shift routes from Kondapur, Miyapur, and Uppal to Financial District campus.');

  // Step 2 -> Step 3
  await desktopPage.getByRole("button", { name: /Continue to Next Step/i }).click();
  await desktopPage.waitForTimeout(300);

  const onStep3 = await desktopPage.getByText("3. Desired Fleet Mix & Compliance Standards").count();

  // Step 3 -> Step 4
  await desktopPage.getByRole("button", { name: /Continue to Next Step/i }).click();
  await desktopPage.waitForTimeout(300);

  const onStep4 = await desktopPage.getByText("4. Review & Dispatch Enterprise RFP").count();

  // Check generated RFP Document
  const rfpBrief = await desktopPage.locator('#rfp-preview-document').textContent();
  const rfpValid =
    !!rfpBrief &&
    rfpBrief.includes("Amazon Development Centre India") &&
    rfpBrief.includes("Anita Desai") &&
    rfpBrief.includes("Hyderabad") &&
    rfpBrief.includes("500 – 1,500 Commuters / Day");

  // Check WhatsApp dispatch CTA
  const waBtn = desktopPage.locator('a:has-text("Dispatch RFP via WhatsApp")');
  const waHref = await waBtn.getAttribute("href");
  const waLinkValid = !!waHref && waHref.includes("wa.me") && waHref.includes("Amazon%20Development%20Centre");

  const test1Passed =
    indiaRfpTitle.includes("Victor Mobility") &&
    hasRfpHero > 0 &&
    hasTrustGrid > 0 &&
    onStep2 > 0 &&
    onStep3 > 0 &&
    onStep4 > 0 &&
    rfpValid &&
    waLinkValid;

  results.push({
    test: "India Corporate RFP Portal (/india/rfp) validates 4-step tender builder and compiles formal brief",
    passed: test1Passed,
    details: `Title: ${indiaRfpTitle}, Brief verified: ${rfpValid}, WhatsApp dispatch: ${waLinkValid}`,
  });
  console.log(`[${test1Passed ? "PASS" : "FAIL"}] India Corporate RFP Portal`);
  await saveImage(desktopPage, "phase3-india-rfp-desktop.png");

  // ==========================================
  // Test 2: India RFP Portal Mobile (390px)
  // ==========================================
  console.log("\n--- Test 2: India RFP Portal Mobile ---");
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto(`${BASE_URL}/india/rfp`, { waitUntil: "networkidle" });
  await saveImage(mobilePage, "phase3-india-rfp-mobile.png");

  const mobileHero = await mobilePage.getByRole("heading", { name: "Corporate Mobility RFP Desk" }).count();
  results.push({
    test: "India RFP Portal renders clean responsive mobile layout",
    passed: mobileHero > 0,
    details: `Mobile Hero count: ${mobileHero}`,
  });
  console.log(`[${mobileHero > 0 ? "PASS" : "FAIL"}] India RFP Mobile View`);

  // ==========================================
  // Test 3: UAE RFP Portal (/uae/rfp)
  // ==========================================
  console.log("\n--- Test 3: UAE RFP Portal ---");
  await desktopPage.goto(`${BASE_URL}/uae/rfp`, { waitUntil: "networkidle" });

  const uaeRfpTitle = await desktopPage.title();
  const hasUaeRfpHero = await desktopPage.getByRole("heading", { name: "UAE Enterprise RFP Desk" }).count();
  const hasUaeScale = await desktopPage.getByText("2,000+ Cars & 500+ Buses").count();

  // Test form filling for UAE
  await desktopPage.fill('#rfp-company-name', 'Emirates Global Investment Group');
  await desktopPage.fill('#rfp-contact-person', 'Omar Al-Hassan');
  await desktopPage.fill('#rfp-email', 'omar.alhassan@emiratesgroup.ae');
  await desktopPage.fill('#rfp-phone', '+971 50 987 6543');
  await desktopPage.selectOption('#rfp-city', 'Dubai');

  await desktopPage.getByRole("button", { name: /Continue to Next Step/i }).click();
  await desktopPage.waitForTimeout(300);

  // Step 2 -> Step 3 -> Step 4
  await desktopPage.getByRole("button", { name: /Continue to Next Step/i }).click();
  await desktopPage.waitForTimeout(300);
  await desktopPage.getByRole("button", { name: /Continue to Next Step/i }).click();
  await desktopPage.waitForTimeout(300);

  const uaeRfpBrief = await desktopPage.locator('#rfp-preview-document').textContent();
  const uaeRfpValid =
    !!uaeRfpBrief &&
    uaeRfpBrief.includes("Emirates Global Investment Group") &&
    uaeRfpBrief.includes("Omar Al-Hassan") &&
    uaeRfpBrief.includes("Dubai (UAE)");

  const uaeWaBtn = desktopPage.locator('a:has-text("Dispatch RFP via WhatsApp")');
  const uaeWaHref = await uaeWaBtn.getAttribute("href");
  const uaeWaValid = !!uaeWaHref && uaeWaHref.includes("wa.me/971524552441") && uaeWaHref.includes("Emirates%20Global");

  const test3Passed =
    uaeRfpTitle.includes("Victor Mobility UAE") &&
    hasUaeRfpHero > 0 &&
    hasUaeScale > 0 &&
    uaeRfpValid &&
    uaeWaValid;

  results.push({
    test: "UAE Corporate RFP Portal (/uae/rfp) routes to Dubai Head Office desk (+971 52 455 2441) with structured brief",
    passed: test3Passed,
    details: `Title: ${uaeRfpTitle}, Brief: ${uaeRfpValid}, WhatsApp UAE Desk: ${uaeWaValid}`,
  });
  console.log(`[${test3Passed ? "PASS" : "FAIL"}] UAE Corporate RFP Portal`);
  await saveImage(desktopPage, "phase3-uae-rfp-desktop.png");

  // ==========================================
  // Test 4: Strategic Corridor Matrix on Services Pages
  // ==========================================
  console.log("\n--- Test 4: Strategic Corridor Matrix ---");
  await desktopPage.goto(`${BASE_URL}/india/services`, { waitUntil: "networkidle" });
  const hasIndiaMatrix = await desktopPage.getByRole("heading", { name: /Key Indian Tech Parks & Transit Corridors/i }).count();
  const hasHydHub = await desktopPage.getByRole("tab", { name: /Hyderabad Hub/i }).count();
  const hasBlrHub = await desktopPage.getByRole("tab", { name: /Bengaluru Hub/i }).count();
  const hasPuneHub = await desktopPage.getByRole("tab", { name: /Pune Hub/i }).count();

  // Test tab switching
  await desktopPage.getByRole("tab", { name: /Bengaluru Hub/i }).click();
  await desktopPage.waitForTimeout(300);
  const hasWhitefield = await desktopPage.getByText("Whitefield (ITPB & EPIP Zone)").count();

  await desktopPage.goto(`${BASE_URL}/uae/services`, { waitUntil: "networkidle" });
  const hasUaeMatrix = await desktopPage.getByRole("heading", { name: /Key UAE Commercial Corridors & Hubs/i }).count();
  const hasDubaiHub = await desktopPage.getByRole("tab", { name: /Dubai Network/i }).count();

  const matrixPassed =
    hasIndiaMatrix > 0 &&
    hasHydHub > 0 &&
    hasBlrHub > 0 &&
    hasPuneHub > 0 &&
    hasWhitefield > 0 &&
    hasUaeMatrix > 0 &&
    hasDubaiHub > 0;

  results.push({
    test: "Strategic Corridor Matrix is interactively accessible across both India and UAE Services pages",
    passed: matrixPassed,
    details: `India Matrix: ${hasIndiaMatrix}, Bengaluru Tab: ${hasWhitefield}, UAE Matrix: ${hasUaeMatrix}`,
  });
  console.log(`[${matrixPassed ? "PASS" : "FAIL"}] Strategic Corridor Matrix`);

  // ==========================================
  // Test 5: Navigation & Footer Links to RFP Desk
  // ==========================================
  console.log("\n--- Test 5: Navigation & Footer Links ---");
  await desktopPage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });
  const headerRfpLink = await desktopPage.locator('nav a[href="/india/rfp"]').count();
  const footerRfpLink = await desktopPage.locator('footer a[href="/india/rfp"]').count();

  await desktopPage.goto(`${BASE_URL}/uae`, { waitUntil: "networkidle" });
  const uaeHeaderRfpLink = await desktopPage.locator('nav a[href="/uae/rfp"]').count();
  const uaeFooterRfpLink = await desktopPage.locator('footer a[href="/uae/rfp"]').count();

  const linksPassed =
    headerRfpLink > 0 &&
    footerRfpLink > 0 &&
    uaeHeaderRfpLink > 0 &&
    uaeFooterRfpLink > 0;

  results.push({
    test: "Corporate RFP Desk links are cleanly placed in Header and Footer across both India and UAE portals",
    passed: linksPassed,
    details: `India Nav: ${headerRfpLink}, India Footer: ${footerRfpLink}, UAE Nav: ${uaeHeaderRfpLink}, UAE Footer: ${uaeFooterRfpLink}`,
  });
  console.log(`[${linksPassed ? "PASS" : "FAIL"}] Navigation & Footer RFP Links`);

  // ==========================================
  // Test 6: Schema.org Structured Data
  // ==========================================
  console.log("\n--- Test 6: Schema.org Structured Data ---");
  await desktopPage.goto(`${BASE_URL}/india/rfp`, { waitUntil: "networkidle" });
  const indiaJsonLdCount = await desktopPage.locator('script[type="application/ld+json"]').count();

  await desktopPage.goto(`${BASE_URL}/uae/rfp`, { waitUntil: "networkidle" });
  const uaeJsonLdCount = await desktopPage.locator('script[type="application/ld+json"]').count();

  const schemaPassed = indiaJsonLdCount > 0 && uaeJsonLdCount > 0;
  results.push({
    test: "Schema.org structured data scripts are embedded on both India and UAE RFP portals",
    passed: schemaPassed,
    details: `India JSON-LD scripts: ${indiaJsonLdCount}, UAE JSON-LD scripts: ${uaeJsonLdCount}`,
  });
  console.log(`[${schemaPassed ? "PASS" : "FAIL"}] Schema.org Structured Data`);

  await browser.close();

  // Summary
  console.log("\n==========================================");
  console.log("PHASE 3 VERIFICATION SUMMARY");
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
