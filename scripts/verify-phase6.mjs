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
  console.log("Starting Phase 6 PWA, Emergency Quick-Dial & Security Headers Verification Suite...\n");
  const browser = await chromium.launch({ channel: "msedge" });
  const results = [];

  // ==========================================
  // Test 1: PWA Web App Manifest (/manifest.json)
  // ==========================================
  console.log("--- Test 1: PWA Web App Manifest ---");
  const manifestRes = await fetch(`${BASE_URL}/manifest.json`);
  const manifestStatus = manifestRes.status;
  const manifestData = await manifestRes.json();

  const manifestValid =
    manifestStatus === 200 &&
    manifestData.name.includes("Victor Mobility") &&
    manifestData.short_name === "Victor Mobility" &&
    manifestData.theme_color === "#0A1128" &&
    manifestData.icons &&
    manifestData.icons.length >= 2 &&
    manifestData.shortcuts &&
    manifestData.shortcuts.length >= 3;

  results.push({
    test: "PWA Web App Manifest (/manifest.json) serves valid JSON schema with icons and shortcuts",
    passed: manifestValid,
    details: `Status: ${manifestStatus}, Name: ${manifestData.name}, Shortcuts: ${manifestData.shortcuts?.length}`,
  });
  console.log(`[${manifestValid ? "PASS" : "FAIL"}] PWA Web App Manifest`);

  // ==========================================
  // Test 2: Production Edge Security Headers
  // ==========================================
  console.log("\n--- Test 2: Production Edge Security Headers ---");
  const homeRes = await fetch(`${BASE_URL}/india`);
  const headers = homeRes.headers;

  const hsts = headers.get("strict-transport-security");
  const xfo = headers.get("x-frame-options");
  const xcto = headers.get("x-content-type-options");
  const rp = headers.get("referrer-policy");

  const headersValid = !!hsts && !!xfo && !!xcto && !!rp;
  results.push({
    test: "Next.js production responses include enterprise security headers (HSTS, X-Frame-Options, nosniff, Referrer-Policy)",
    passed: headersValid,
    details: `HSTS: ${hsts}, X-Frame: ${xfo}, X-Content-Type: ${xcto}, Referrer: ${rp}`,
  });
  console.log(`[${headersValid ? "PASS" : "FAIL"}] Security Headers`);

  // ==========================================
  // Test 3: India 24/7 Operations & Emergency Desk Desktop
  // ==========================================
  console.log("\n--- Test 3: India Emergency Quick-Dial Desktop ---");
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto(`${BASE_URL}/india/emergency`, { waitUntil: "networkidle" });

  const indiaEmergencyTitle = await desktopPage.title();
  const hasEmergencyHero = await desktopPage.getByRole("heading", { name: "Operations & Emergency Quick-Dial" }).count();
  
  // Verify direct phone dial link
  const phoneBtn = desktopPage.locator('a[href="tel:+919100777768"]').first();
  const phoneText = await phoneBtn.textContent();
  const phoneValid = phoneText && phoneText.includes("+91 91007 77768");

  // Verify Hot-Swap WhatsApp brief generator
  await desktopPage.fill('input[placeholder*="TS 09 UB 4821"]', 'TS 09 UB 9999');
  await desktopPage.fill('input[placeholder*="Gachibowli Flyover"]', 'Hitec City Mindspace Circle');
  await desktopPage.waitForTimeout(200);

  const hotSwapBtn = desktopPage.locator('a:has-text("Dispatch via WhatsApp")');
  const hotSwapHref = await hotSwapBtn.getAttribute("href");
  const hotSwapValid =
    !!hotSwapHref &&
    hotSwapHref.includes("wa.me/919396546950") &&
    hotSwapHref.includes("TS%2009%20UB%209999") &&
    hotSwapHref.includes("Mindspace");

  const test3Passed =
    indiaEmergencyTitle.includes("Victor Mobility") &&
    hasEmergencyHero > 0 &&
    phoneValid &&
    hotSwapValid;

  results.push({
    test: "India Operations & Emergency Desk (/india/emergency) links to +91 91007 77768 and formats hot-swap alert",
    passed: test3Passed,
    details: `Title: ${indiaEmergencyTitle}, Phone: ${phoneValid}, HotSwap WhatsApp: ${hotSwapValid}`,
  });
  console.log(`[${test3Passed ? "PASS" : "FAIL"}] India Emergency Desk`);
  await saveImage(desktopPage, "phase6-india-emergency-desktop.png");

  // ==========================================
  // Test 4: India Emergency Desk Mobile View (390px)
  // ==========================================
  console.log("\n--- Test 4: India Emergency Mobile View ---");
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto(`${BASE_URL}/india/emergency`, { waitUntil: "networkidle" });
  await saveImage(mobilePage, "phase6-india-emergency-mobile.png");

  const mobileHero = await mobilePage.getByRole("heading", { name: "Operations & Emergency Quick-Dial" }).count();
  results.push({
    test: "India Emergency Desk renders responsive mobile one-tap dial layout",
    passed: mobileHero > 0,
    details: `Mobile Hero count: ${mobileHero}`,
  });
  console.log(`[${mobileHero > 0 ? "PASS" : "FAIL"}] India Emergency Mobile View`);

  // ==========================================
  // Test 5: UAE 24/7 Limousine Dispatch Desk Desktop
  // ==========================================
  console.log("\n--- Test 5: UAE Limousine Dispatch Desk ---");
  await desktopPage.goto(`${BASE_URL}/uae/emergency`, { waitUntil: "networkidle" });

  const uaeEmergencyTitle = await desktopPage.title();
  const hasUaeEmergencyHero = await desktopPage.getByRole("heading", { name: "UAE 24/7 Limousine Dispatch Desk" }).count();

  // Verify UAE direct phone link to Dubai Desk (+971 52 455 2441)
  const uaePhoneBtn = desktopPage.locator('a[href="tel:+971524552441"]').first();
  const uaePhoneText = await uaePhoneBtn.textContent();
  const uaePhoneValid = uaePhoneText && uaePhoneText.includes("+971 52 455 2441");

  const test5Passed =
    uaeEmergencyTitle.includes("Victor Mobility UAE") &&
    hasUaeEmergencyHero > 0 &&
    uaePhoneValid;

  results.push({
    test: "UAE Limousine Dispatch Desk (/uae/emergency) connects to Dubai Al Garhoud desk (+971 52 455 2441)",
    passed: test5Passed,
    details: `Title: ${uaeEmergencyTitle}, Dubai Phone: ${uaePhoneValid}`,
  });
  console.log(`[${test5Passed ? "PASS" : "FAIL"}] UAE Emergency Desk`);
  await saveImage(desktopPage, "phase6-uae-emergency-desktop.png");

  // ==========================================
  // Test 6: Global Footer 24/7 Operations Desk Links
  // ==========================================
  console.log("\n--- Test 6: Global Footer Links ---");
  await desktopPage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });
  const indFooterEmergency = await desktopPage.locator('footer a[href="/india/emergency"]').count();

  await desktopPage.goto(`${BASE_URL}/uae`, { waitUntil: "networkidle" });
  const uaeFooterEmergency = await desktopPage.locator('footer a[href="/uae/emergency"]').count();

  const footerPassed = indFooterEmergency > 0 && uaeFooterEmergency > 0;
  results.push({
    test: "Corporate Footer contains 24/7 Operations Desk link across India & UAE portals",
    passed: footerPassed,
    details: `India Footer: ${indFooterEmergency}, UAE Footer: ${uaeFooterEmergency}`,
  });
  console.log(`[${footerPassed ? "PASS" : "FAIL"}] Footer Emergency Links`);

  // ==========================================
  // Test 7: Schema.org Structured Data
  // ==========================================
  console.log("\n--- Test 7: Schema.org Structured Data ---");
  await desktopPage.goto(`${BASE_URL}/india/emergency`, { waitUntil: "networkidle" });
  const indEmergencyJsonLd = await desktopPage.locator('script[type="application/ld+json"]').count();

  await desktopPage.goto(`${BASE_URL}/uae/emergency`, { waitUntil: "networkidle" });
  const uaeEmergencyJsonLd = await desktopPage.locator('script[type="application/ld+json"]').count();

  const schemaPassed = indEmergencyJsonLd > 0 && uaeEmergencyJsonLd > 0;
  results.push({
    test: "Schema.org ContactPage structured data scripts are embedded on both India and UAE emergency desks",
    passed: schemaPassed,
    details: `India JSON-LD: ${indEmergencyJsonLd}, UAE JSON-LD: ${uaeEmergencyJsonLd}`,
  });
  console.log(`[${schemaPassed ? "PASS" : "FAIL"}] Schema.org Structured Data`);

  await browser.close();

  // Summary
  console.log("\n==========================================");
  console.log("PHASE 6 VERIFICATION SUMMARY");
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
