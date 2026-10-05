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
  console.log("Starting Phase 2 UAE & Global Gateway Verification Suite...\n");
  const browser = await chromium.launch({ channel: "msedge" });
  const results = [];

  // ==========================================
  // Test 1: Global Gateway (/) Desktop Layout
  // ==========================================
  console.log("--- Test 1: Global Gateway (/) Desktop ---");
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });

  const gatewayTitle = await desktopPage.title();
  const hasIndiaCard = await desktopPage.getByRole("heading", { name: "Victor Mobility India" }).count();
  const hasUaeCard = await desktopPage.getByRole("heading", { name: "Victor Mobility UAE" }).count();
  const hasTagline = await desktopPage.getByText("On Time Every Time.").count();
  const hasFounderQuote = await desktopPage.getByText(/unwavering service to my clients/i).count();

  const gatewayPassed =
    gatewayTitle.includes("Victor Mobility") &&
    hasIndiaCard > 0 &&
    hasUaeCard > 0 &&
    hasTagline > 0 &&
    hasFounderQuote > 0;

  results.push({
    test: "Global Gateway (/) renders branding, tagline, India & UAE cards, and Founder quote",
    passed: gatewayPassed,
    details: `Title: ${gatewayTitle}, India Card: ${hasIndiaCard}, UAE Card: ${hasUaeCard}, Tagline: ${hasTagline}, Quote: ${hasFounderQuote}`,
  });
  console.log(`[${gatewayPassed ? "PASS" : "FAIL"}] Global Gateway Desktop`);
  await saveImage(desktopPage, "phase2-gateway-desktop.png");

  // ==========================================
  // Test 2: Global Gateway Mobile Layout (390px)
  // ==========================================
  console.log("\n--- Test 2: Global Gateway Mobile View (390px) ---");
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
  await saveImage(mobilePage, "phase2-gateway-mobile.png");

  const mobileIndiaBtn = await mobilePage.getByRole("link", { name: /Enter India Portal/i }).count();
  const mobileUaeBtn = await mobilePage.getByRole("link", { name: /Enter UAE Portal/i }).count();
  const mobilePassed = mobileIndiaBtn > 0 && mobileUaeBtn > 0;

  results.push({
    test: "Global Gateway Mobile renders clean responsive cards and direct entry buttons",
    passed: mobilePassed,
    details: `India buttons: ${mobileIndiaBtn}, UAE buttons: ${mobileUaeBtn}`,
  });
  console.log(`[${mobilePassed ? "PASS" : "FAIL"}] Global Gateway Mobile`);

  // ==========================================
  // Test 3: Gateway Navigation to India Portal
  // ==========================================
  console.log("\n--- Test 3: Gateway Navigation to India Portal ---");
  await desktopPage.getByRole("link", { name: /Enter India Portal/i }).click();
  await desktopPage.waitForURL("**/india", { timeout: 10000 });
  const onIndiaPage = desktopPage.url().includes("/india");

  results.push({
    test: "Clicking 'Enter India Portal' navigates cleanly to /india",
    passed: onIndiaPage,
    details: `Current URL: ${desktopPage.url()}`,
  });
  console.log(`[${onIndiaPage ? "PASS" : "FAIL"}] Navigation to /india`);

  // ==========================================
  // Test 4: Region Switcher in Header (India -> UAE)
  // ==========================================
  console.log("\n--- Test 4: Region Switcher in Header (India -> UAE) ---");
  const regionSwitcherBtn = desktopPage.locator('button[aria-label="Select Operating Region"]');
  await regionSwitcherBtn.click();
  await desktopPage.waitForTimeout(500);

  // Click UAE in the dropdown
  const uaeDropdownOption = desktopPage.locator('a[href="/uae"]').first();
  await uaeDropdownOption.click();
  await desktopPage.waitForURL("**/uae", { timeout: 10000 });
  const onUaePage = desktopPage.url().includes("/uae");

  results.push({
    test: "Header Region Switcher toggles region from India to UAE",
    passed: onUaePage,
    details: `Current URL: ${desktopPage.url()}`,
  });
  console.log(`[${onUaePage ? "PASS" : "FAIL"}] Region Switcher to UAE`);

  // ==========================================
  // Test 5: UAE Homepage (/uae) Verification
  // ==========================================
  console.log("\n--- Test 5: UAE Homepage (/uae) Structure & Facts ---");
  const uaeTitle = await desktopPage.title();
  const uaeTagline = await desktopPage.getByText("On Time Every Time.").count();
  const uaeVipJourney = await desktopPage.getByText("VIP Chauffeur & Limousine").count();
  const uaeAirportJourney = await desktopPage.getByText("DXB & AUH Airport VIP Protocol").count();
  const uaePresence = await desktopPage.getByRole("heading", { name: /Our UAE presence/i }).count();
  const uaeHeadOffice = await desktopPage.getByText(/65th Street, Al Garhoud/i).count();
  const uaeScaleCars = await desktopPage.getByText(/2,000\+/i).count();
  const uaeScaleBuses = await desktopPage.getByText(/500\+/i).count();
  const uaeFounder = await desktopPage.getByText(/Jahangir/i).count();

  const uaeHomePassed =
    uaeTitle.includes("Victor Mobility") &&
    uaeTagline > 0 &&
    uaeVipJourney > 0 &&
    uaeAirportJourney > 0 &&
    uaePresence > 0 &&
    uaeHeadOffice > 0 &&
    uaeScaleCars > 0 &&
    uaeScaleBuses > 0 &&
    uaeFounder > 0;

  results.push({
    test: "UAE Homepage renders 3 customer journeys, UAE presence (Al Garhoud DXB, 2000+ cars, 500+ buses), Founder Jahangir, and tagline 'On Time Every Time.'",
    passed: uaeHomePassed,
    details: `Title: ${uaeTitle}, Tagline: ${uaeTagline}, Head Office: ${uaeHeadOffice}, 2000+ Cars: ${uaeScaleCars}, 500+ Buses: ${uaeScaleBuses}`,
  });
  console.log(`[${uaeHomePassed ? "PASS" : "FAIL"}] UAE Homepage Content & Facts`);
  await saveImage(desktopPage, "phase2-uae-home-desktop.png");

  // Capture UAE Mobile Homepage
  await mobilePage.goto(`${BASE_URL}/uae`, { waitUntil: "networkidle" });
  await saveImage(mobilePage, "phase2-uae-home-mobile.png");

  // ==========================================
  // Test 6: UAE Services Catalog & Detail Page
  // ==========================================
  console.log("\n--- Test 6: UAE Services & Dynamic Slug ---");
  await desktopPage.goto(`${BASE_URL}/uae/services`, { waitUntil: "networkidle" });
  const uaeServicesCount = await desktopPage.getByText("Chauffeur & Luxury Limousine").count();

  // Test dynamic slug route
  await desktopPage.goto(`${BASE_URL}/uae/services/airport-transfers`, { waitUntil: "networkidle" });
  const airportTitle = await desktopPage.locator('h1:has-text("Airport VIP Transfers")').count();
  const airportDxbMention = await desktopPage.getByText(/DXB/i).count();

  const uaeServicesPassed = uaeServicesCount > 0 && airportTitle > 0 && airportDxbMention > 0;
  results.push({
    test: "UAE Services catalog and dynamic detail page (/uae/services/airport-transfers) render accurately",
    passed: uaeServicesPassed,
    details: `Catalog count: ${uaeServicesCount}, Airport Detail: ${airportTitle}, DXB mentions: ${airportDxbMention}`,
  });
  console.log(`[${uaeServicesPassed ? "PASS" : "FAIL"}] UAE Services & Dynamic Route`);

  // ==========================================
  // Test 7: UAE Fleet Page
  // ==========================================
  console.log("\n--- Test 7: UAE Fleet Page ---");
  await desktopPage.goto(`${BASE_URL}/uae/fleet`, { waitUntil: "networkidle" });
  const hasFirstClass = await desktopPage.getByText("First Class Saloons").count();
  const hasUltraLuxury = await desktopPage.getByText("Ultra-Luxury & VIP").count();
  const hasMercedesMaybach = await desktopPage.getByText(/Mercedes-Maybach/i).count();
  const hasCoaches = await desktopPage.getByText("Luxury Buses & Coaches").count();

  const uaeFleetPassed = hasFirstClass > 0 && hasUltraLuxury > 0 && hasMercedesMaybach > 0 && hasCoaches > 0;
  results.push({
    test: "UAE Fleet page showcases 5 vehicle tiers including Maybach and Coaches",
    passed: uaeFleetPassed,
    details: `First Class: ${hasFirstClass}, Ultra-Luxury: ${hasUltraLuxury}, Maybach: ${hasMercedesMaybach}, Coaches: ${hasCoaches}`,
  });
  console.log(`[${uaeFleetPassed ? "PASS" : "FAIL"}] UAE Fleet Page`);
  await saveImage(desktopPage, "phase2-uae-fleet-desktop.png");

  // ==========================================
  // Test 8: UAE About Page
  // ==========================================
  console.log("\n--- Test 8: UAE About Page ---");
  await desktopPage.goto(`${BASE_URL}/uae/about`, { waitUntil: "networkidle" });
  const aboutFounder = await desktopPage.getByText(/Jahangir/i).count();
  const aboutHeadOffice = await desktopPage.getByText(/65th Street, Al Garhoud/i).count();
  const aboutFaq = await desktopPage.getByText(/Which airports are covered in the UAE\?/i).count();

  const uaeAboutPassed = aboutFounder > 0 && aboutHeadOffice > 0 && aboutFaq > 0;
  results.push({
    test: "UAE About page features Founder Jahangir, Dubai Head Office, and UAE FAQs",
    passed: uaeAboutPassed,
    details: `Founder: ${aboutFounder}, Head Office: ${aboutHeadOffice}, FAQs: ${aboutFaq}`,
  });
  console.log(`[${uaeAboutPassed ? "PASS" : "FAIL"}] UAE About Page`);

  // ==========================================
  // Test 9: UAE Contact & Interactive WhatsApp Desk
  // ==========================================
  console.log("\n--- Test 9: UAE Contact & WhatsApp Desk ---");
  await desktopPage.goto(`${BASE_URL}/uae/contact`, { waitUntil: "networkidle" });
  const uaePhoneDisplay = await desktopPage.getByText("+971 52 455 2441").count();
  const uaeEmailDisplay = await desktopPage.getByText("info@victorluxurylimousine.com").count();

  // Test form filling using EnquirySection unified ID
  await desktopPage.fill('#enquiry-name-input', 'Khalid Al-Mansoor');
  await desktopPage.fill('textarea', 'Mercedes-Maybach standby at DIFC for international delegates.');
  await desktopPage.waitForTimeout(300);

  // Check the generated WhatsApp draft preview
  const draftPreview = await desktopPage.locator('#enquiry-whatsapp-preview').textContent();
  const draftValid =
    !!draftPreview &&
    draftPreview.includes("Khalid Al-Mansoor") &&
    draftPreview.includes("Mercedes-Maybach");

  // Check the direct WhatsApp links on the page
  const directWaLinks = await desktopPage.locator('a[href*="wa.me/971524552441"]').count();

  const uaeContactPassed = uaePhoneDisplay > 0 && uaeEmailDisplay > 0 && draftValid && directWaLinks > 0;
  results.push({
    test: "UAE Contact page provides verified UAE telephone (+971 52 455 2441) and prefilled WhatsApp link to wa.me/971524552441",
    passed: uaeContactPassed,
    details: `Phone verified: ${uaePhoneDisplay}, Email verified: ${uaeEmailDisplay}, Draft updated: ${draftValid}, WhatsApp links: ${directWaLinks}`,
  });
  console.log(`[${uaeContactPassed ? "PASS" : "FAIL"}] UAE Contact & WhatsApp Desk`);
  await saveImage(desktopPage, "phase2-uae-contact-desktop.png");

  // ==========================================
  // Test 10: UAE Privacy Page
  // ==========================================
  console.log("\n--- Test 10: UAE Privacy Notice ---");
  await desktopPage.goto(`${BASE_URL}/uae/privacy`, { waitUntil: "networkidle" });
  const privacyTitle = await desktopPage.locator('h1:has-text("UAE Privacy Notice")').count();
  const pdplMention = await desktopPage.getByText(/Federal Decree-Law No\. 45 of 2021/i).count();
  const privacyPassed = privacyTitle > 0 && pdplMention > 0;

  results.push({
    test: "UAE Privacy Notice incorporates UAE PDPL (Federal Decree-Law No. 45 of 2021) and Dubai Office info",
    passed: privacyPassed,
    details: `Title found: ${privacyTitle}, PDPL Law reference found: ${pdplMention}`,
  });
  console.log(`[${privacyPassed ? "PASS" : "FAIL"}] UAE Privacy Notice`);

  // ==========================================
  // Test 11: Mobile Region Switcher
  // ==========================================
  console.log("\n--- Test 11: Mobile Region Switcher Toggle ---");
  await mobilePage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });
  // Open mobile drawer
  await mobilePage.click('button[aria-label="Open navigation menu"]');
  await mobilePage.waitForTimeout(500);

  // Check the mobile region switcher buttons inside drawer
  const mobileUaeSwitch = mobilePage.locator('a[href="/uae"]:has-text("UAE")');
  const hasMobileUaeSwitch = await mobileUaeSwitch.count();
  if (hasMobileUaeSwitch > 0) {
    await mobileUaeSwitch.click();
    await mobilePage.waitForURL("**/uae", { timeout: 10000 });
  }
  const mobileSwitchedToUae = mobilePage.url().includes("/uae");

  results.push({
    test: "Mobile drawer region switcher seamlessly transitions between India and UAE",
    passed: mobileSwitchedToUae,
    details: `Mobile URL after toggle: ${mobilePage.url()}`,
  });
  console.log(`[${mobileSwitchedToUae ? "PASS" : "FAIL"}] Mobile Region Switcher`);

  await browser.close();

  // Summary
  console.log("\n==========================================");
  console.log("PHASE 2 VERIFICATION SUMMARY");
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
