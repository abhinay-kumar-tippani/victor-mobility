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
  console.log("Starting Day 5 Customer Journeys & Luxury Leadership Verification...");
  const browser = await chromium.launch({ channel: "msedge" });
  const results = [];

  // ==========================================
  // Test 1: Customer Journeys on Homepage
  // ==========================================
  console.log("\n--- Testing Customer Journeys Section ---");
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });

  const journeysSection = page.locator("#customer-journeys");
  const journeysCount = await journeysSection.locator("article").count();
  const journeysPassed = journeysCount === 3;
  results.push({
    test: "Customer Journeys section presents 3 distinct customer pathways",
    passed: journeysPassed,
    details: `Found ${journeysCount} journey cards`,
  });
  console.log(`[${journeysPassed ? "PASS" : "FAIL"}] Journey cards count: ${journeysCount}`);

  // Check journey titles
  const textContent = await journeysSection.innerText();
  const hasExecutive = textContent.includes("Executive & VIP Travel");
  const hasWeddings = textContent.includes("Weddings & Private Occasions");
  const hasEmployee = textContent.includes("Corporate Employee Transport");
  const titlesPassed = hasExecutive && hasWeddings && hasEmployee;
  results.push({
    test: "All 3 target customer segments clearly identified with distinct value props",
    passed: titlesPassed,
  });
  console.log(`[${titlesPassed ? "PASS" : "FAIL"}] 3 Target segments present: ${titlesPassed}`);

  // Screenshot Customer Journeys Desktop
  await journeysSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await saveImage(journeysSection, "customer-journeys-desktop.png");

  // ==========================================
  // Test 2: W3C ARIA Tab Navigation in Fleet Section
  // ==========================================
  console.log("\n--- Testing Fleet Tabs W3C ARIA Keyboard Navigation ---");
  const fleetSection = page.locator("#fleet");
  await fleetSection.scrollIntoViewIfNeeded();

  // Find first tab button (Sedans)
  const sedansTab = fleetSection.locator('button[role="tab"]').nth(0);
  await sedansTab.focus();

  // Press ArrowRight -> moves to index 1: MPVs
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(200);
  let activeTabAttr = await fleetSection.locator('button[role="tab"][aria-selected="true"]').innerText();
  let mpvFocused = activeTabAttr.includes("MPV");

  // Press ArrowRight -> moves to index 2: Buses & Shuttles
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(200);
  activeTabAttr = await fleetSection.locator('button[role="tab"][aria-selected="true"]').innerText();
  let busesFocused = activeTabAttr.includes("Bus");

  // Press ArrowRight -> moves to index 3: Luxury & Limousines
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(200);
  activeTabAttr = await fleetSection.locator('button[role="tab"][aria-selected="true"]').innerText();
  let luxuryFocused = activeTabAttr.includes("Luxury");

  // Press Home key -> should switch back to Sedans (first tab)
  await page.keyboard.press("Home");
  await page.waitForTimeout(200);
  activeTabAttr = await fleetSection.locator('button[role="tab"][aria-selected="true"]').innerText();
  let homeWorked = activeTabAttr.includes("Sedan");

  // Press End key -> should switch to Luxury (last tab)
  await page.keyboard.press("End");
  await page.waitForTimeout(200);
  activeTabAttr = await fleetSection.locator('button[role="tab"][aria-selected="true"]').innerText();
  let endWorked = activeTabAttr.includes("Luxury");

  const tabA11yPassed = mpvFocused && busesFocused && luxuryFocused && homeWorked && endWorked;
  results.push({
    test: "Fleet tablist implements W3C ARIA arrow/home/end keyboard navigation",
    passed: tabA11yPassed,
    details: `MPV: ${mpvFocused}, Buses: ${busesFocused}, Luxury: ${luxuryFocused}, Home: ${homeWorked}, End: ${endWorked}`,
  });
  console.log(`[${tabA11yPassed ? "PASS" : "FAIL"}] Tab keyboard navigation: ${tabA11yPassed}`);

  // ==========================================
  // Test 3: Fleet CTA to Enquiry Dynamic Selection Bug Fix
  // ==========================================
  console.log("\n--- Testing Fleet CTA to Enquiry Selection ---");
  // Select Luxury Tab
  const luxuryTab = fleetSection.locator('button[role="tab"]').filter({ hasText: "Luxury" });
  await luxuryTab.click();
  await page.waitForTimeout(300);

  // Click CTA "Enquire About Luxury & Limousines" (button element)
  const luxuryCta = fleetSection.locator('button:has-text("Enquire About Luxury & Limousines")');
  await luxuryCta.click();
  await page.waitForTimeout(600);

  // Verify URL hash or form state
  const enquirySection = page.locator("#contact");
  const selectedServiceVal = await enquirySection.locator("select").nth(0).inputValue();
  const categoryBadge = enquirySection.locator('text=Preferred Category: Luxury & Limousines');
  const badgeVisible = await categoryBadge.isVisible();

  // Check what service value was selected in the dropdown
  const serviceMatchesLuxury = selectedServiceVal === "Chauffeur & Luxury Travel";
  const fleetCtaPassed = serviceMatchesLuxury && badgeVisible;

  results.push({
    test: "Fleet CTA selects matching service ('Chauffeur & Luxury Travel') and preferred category badge",
    passed: fleetCtaPassed,
    details: `Selected service: '${selectedServiceVal}', Badge visible: ${badgeVisible}`,
  });
  console.log(`[${fleetCtaPassed ? "PASS" : "FAIL"}] Fleet CTA correctly targets Luxury Travel: ${fleetCtaPassed}`);

  // Test WhatsApp preview draft content
  const previewText = await enquirySection.locator("#enquiry-whatsapp-preview").innerText();
  const previewHasCategory = previewText.includes("Vehicle Category:* Luxury & Limousines");
  const previewHasService = previewText.includes("Service:* Chauffeur & Luxury Travel");
  const previewHasNoInternalDisclaimer = !previewText.includes("simulated") && !previewText.includes("automatic billing");
  const previewPassed = previewHasCategory && previewHasService && previewHasNoInternalDisclaimer;

  results.push({
    test: "WhatsApp draft preview incorporates preferred category and service without internal disclaimers",
    passed: previewPassed,
  });
  console.log(`[${previewPassed ? "PASS" : "FAIL"}] WhatsApp preview accuracy: ${previewPassed}`);

  // Save screenshot of enquiry with luxury category badge
  await saveImage(enquirySection, "enquiry-day5-desktop.png");

  // Save screenshot of fleet section
  await fleetSection.scrollIntoViewIfNeeded();
  await saveImage(fleetSection, "fleet-day5-desktop.png");

  // ==========================================
  // Test 4: Mobile Experience & Full Page
  // ==========================================
  console.log("\n--- Testing Mobile Viewport (390x844) ---");
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
  });
  await mobilePage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });

  const mobileJourneys = mobilePage.locator("#customer-journeys");
  await mobileJourneys.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(300);
  await saveImage(mobileJourneys, "customer-journeys-mobile.png");

  const mobileFleet = mobilePage.locator("#fleet");
  await mobileFleet.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(300);
  await saveImage(mobileFleet, "fleet-day5-mobile.png");

  const mobileContact = mobilePage.locator("#contact");
  await mobileContact.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(300);
  await saveImage(mobileContact, "enquiry-day5-mobile.png");

  // Mobile full page screenshot
  await saveImage(mobilePage, "home-day5-mobile-full.png", { fullPage: true });

  // ==========================================
  // Test 5: Service Detail Pages (Luxury & VIP)
  // ==========================================
  console.log("\n--- Testing Chauffeur & Luxury Service Page ---");
  const luxuryPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await luxuryPage.goto(`${BASE_URL}/india/services/chauffeur-luxury`, { waitUntil: "networkidle" });

  // Check badge and standards
  const pageHeading = await luxuryPage.locator("h1").innerText();
  const badgeText = await luxuryPage.locator("span:has-text('Executive & VIP Travel')").isVisible();
  const standardsVisible = await luxuryPage.locator("text=Service Standards").isVisible();
  const pricingNotice = await luxuryPage.locator("text=Transparent Quotation Process").isVisible();
  const complementarySolutions = await luxuryPage.locator("text=Complementary Solutions").isVisible();

  // Check vehicle image is present
  const heroImage = luxuryPage.locator('img[alt*="Executive luxury cabin"]');
  const imageVisible = await heroImage.isVisible();

  const luxuryPagePassed = badgeText && standardsVisible && pricingNotice && complementarySolutions && imageVisible;
  results.push({
    test: "Chauffeur Luxury page features tailored Executive badge, editorial image, standards, and smart pairing",
    passed: luxuryPagePassed,
    details: `Badge: ${badgeText}, Standards: ${standardsVisible}, QuotationNotice: ${pricingNotice}, Complementary: ${complementarySolutions}, Image: ${imageVisible}`,
  });
  console.log(`[${luxuryPagePassed ? "PASS" : "FAIL"}] Luxury service page details: ${luxuryPagePassed}`);

  await saveImage(luxuryPage, "service-luxury-desktop.png");

  // Mobile luxury service page
  const mobileLuxuryPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobileLuxuryPage.goto(`${BASE_URL}/india/services/chauffeur-luxury`, { waitUntil: "networkidle" });
  await saveImage(mobileLuxuryPage, "service-luxury-mobile.png");

  // ==========================================
  // Summary
  // ==========================================
  console.log("\n==========================================");
  console.log("DAY 5 VERIFICATION SUITE RESULTS");
  console.log("==========================================");
  let allPassed = true;
  for (const r of results) {
    console.log(`${r.passed ? "✔ PASS" : "✖ FAIL"}: ${r.test} ${r.details ? `(${r.details})` : ""}`);
    if (!r.passed) allPassed = false;
  }

  await browser.close();

  if (!allPassed) {
    console.error("\nSome verification tests failed.");
    process.exit(1);
  } else {
    console.log("\nAll Day 5 verification tests passed successfully!");
  }
}

main().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
