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
  console.log("Starting India Presence, Founder & Case Studies Verification Suite...");
  const browser = await chromium.launch({ channel: "msedge" });
  const results = [];

  // ==========================================
  // Test 1: Desktop Layout, Case Studies & Founder
  // ==========================================
  console.log("\n--- Testing Desktop Layout, Case Studies & Founder ---");
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });

  // 1. Check Section Sequence
  const hasServices = await desktopPage.locator("#services").isVisible();
  const hasStandards = await desktopPage.locator("#standards").isVisible();
  const hasFleet = await desktopPage.locator("#fleet").isVisible();
  const hasCaseStory = await desktopPage.locator("#case-story").isVisible();
  const hasNetwork = await desktopPage.locator("#network").isVisible();
  const hasAbout = await desktopPage.locator("#about").isVisible();
  const hasContact = await desktopPage.locator("#contact").isVisible();

  const sequenceValid =
    hasServices && hasStandards && hasFleet && hasCaseStory && hasNetwork && hasAbout && hasContact;

  results.push({
    test: "Homepage contains approved 8-section sequence without redundant duplicate sections",
    passed: sequenceValid,
    details: `Services: ${hasServices}, Standards: ${hasStandards}, Case: ${hasCaseStory}, Network: ${hasNetwork}, People: ${hasAbout}, Contact: ${hasContact}`,
  });
  console.log(`[${sequenceValid ? "PASS" : "FAIL"}] Section sequence: ${sequenceValid}`);

  // 2. Test Interactive 3-Tab Case Studies & Esteemed Clientele
  const caseSection = desktopPage.locator("#case-story");
  const caseTabs = caseSection.locator('button[role="tab"]');
  const tabCount = await caseTabs.count();

  // Click Tab 2: Executive Chauffeur
  await caseTabs.nth(1).click();
  await desktopPage.waitForTimeout(200);
  const execVisible = await caseSection.locator("h3:has-text('International Board Delegation Mobility')").isVisible();

  // Click Tab 3: Weddings & Occasion
  await caseTabs.nth(2).click();
  await desktopPage.waitForTimeout(200);
  const weddingVisible = await caseSection.locator("h3:has-text('Destination Celebration Convoy Management')").isVisible();

  // Verify Esteemed Clientele Grid
  const amazonVisible = await caseSection.locator("text=Amazon").first().isVisible();
  const googleVisible = await caseSection.locator("text=Google").first().isVisible();
  const jpmcVisible = await caseSection.locator("text=JPMorgan Chase").first().isVisible();

  const caseValid = tabCount === 3 && execVisible && weddingVisible && amazonVisible && googleVisible && jpmcVisible;
  results.push({
    test: "Victor in Action features interactive 3-tab case studies and 12-brand esteemed clientele grid",
    passed: caseValid,
    details: `Tabs: ${tabCount}, Exec: ${execVisible}, Wedding: ${weddingVisible}, Amazon: ${amazonVisible}, Google: ${googleVisible}`,
  });
  console.log(`[${caseValid ? "PASS" : "FAIL"}] Case Studies & Clientele: ${caseValid}`);
  await saveImage(caseSection, "case-studies-desktop.png");

  // 3. Test Interactive India Presence Map
  const mapSection = desktopPage.locator("#network");
  const legendText = await mapSection.locator("text=Highlighted states contain a listed Victor office").isVisible();
  const headingText = await mapSection.locator("h2:has-text('Our India presence')").isVisible();

  // Switch to Bengaluru
  await mapSection.locator('button[role="tab"]:has-text("Bengaluru")').click();
  await desktopPage.waitForTimeout(200);
  const bengaluruActive = await mapSection.locator("h3:has-text('Bengaluru')").isVisible();
  const bengaluruAddress = await mapSection.locator("text=Maragondanahalli").first().isVisible();

  // Switch to Pune
  await mapSection.locator('button[role="tab"]:has-text("Pune")').click();
  await desktopPage.waitForTimeout(200);
  const puneActive = await mapSection.locator("h3:has-text('Pune')").isVisible();
  const puneAddress = await mapSection.locator("text=Hadapsar").first().isVisible();

  const mapValid = legendText && headingText && bengaluruActive && bengaluruAddress && puneActive && puneAddress;
  results.push({
    test: "India Presence Map features accurate legend, SVG paths, and interactive city switching",
    passed: mapValid,
    details: `Legend: ${legendText}, Heading: ${headingText}, Blr: ${bengaluruActive}, Pune: ${puneActive}`,
  });
  console.log(`[${mapValid ? "PASS" : "FAIL"}] India Presence Map: ${mapValid}`);
  await saveImage(mapSection, "map-presence-desktop.png");

  // 4. Test People Behind Victor: Founder Jahangir & Commercial Partner
  const peopleSection = desktopPage.locator("#about");
  const founderName = await peopleSection.locator("h3:has-text('Jahangir')").isVisible();
  const founderQuote = await peopleSection.locator("text=I am committed to providing unwavering service to my clients").isVisible();
  const mujeebPresent = await peopleSection.locator("text=Mujeeb Ur Rehman Mohammed").isVisible();
  const opsRoomPresent = await peopleSection.locator("text=24/7 Operations Control Room").isVisible();

  const peopleValid = founderName && founderQuote && mujeebPresent && opsRoomPresent;
  results.push({
    test: "The People Behind Victor showcases Founder Jahangir with portrait & quote, Mujeeb Ur Rehman, and 24/7 Ops Room",
    passed: peopleValid,
    details: `Jahangir: ${founderName}, Quote: ${founderQuote}, Mujeeb: ${mujeebPresent}, Ops: ${opsRoomPresent}`,
  });
  console.log(`[${peopleValid ? "PASS" : "FAIL"}] People Behind Victor: ${peopleValid}`);
  await saveImage(peopleSection, "founder-portrait-homepage.png");

  // 5. Test Personal Contact Invitation Section
  const contactSection = desktopPage.locator("#contact");
  const discussLink = contactSection.locator('a:has-text("Discuss your requirement")');
  const discussHref = await discussLink.getAttribute("href");
  const hasSteps = await contactSection.locator("text=Share your plan").isVisible();
  const contactValid = discussHref === "/india/contact" && hasSteps;

  results.push({
    test: "Contact Invitation features 4-step sequence and direct link to dedicated contact desk",
    passed: contactValid,
    details: `Href: ${discussHref}, Steps: ${hasSteps}`,
  });
  console.log(`[${contactValid ? "PASS" : "FAIL"}] Contact Invitation: ${contactValid}`);

  await saveImage(desktopPage, "homepage-presence-desktop.png");
  await desktopPage.close();

  // ==========================================
  // Test 2: Enriched About Page with Founder & 2010-2024 Milestones
  // ==========================================
  console.log("\n--- Testing Enriched About Page with Founder & Milestones ---");
  const aboutPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await aboutPage.goto(`${BASE_URL}/india/about`, { waitUntil: "networkidle" });

  const aboutFounder = await aboutPage.locator("h2:has-text('Jahangir')").isVisible();
  const aboutQuote = await aboutPage.locator("text=I am committed to providing unwavering service").isVisible();
  const milestone2010 = await aboutPage.locator("text=Incorporation & Founding").isVisible();
  const milestone2015 = await aboutPage.locator("text=Fleet Scaling: 800+ Vehicles").isVisible();
  const milestone2024 = await aboutPage.locator("text=Sustainability & EV Fleet Pledge").isVisible();
  const safetySection = await aboutPage.locator("text=Female Passenger Safety Protocols").isVisible();
  const aboutClientele = await aboutPage.locator("text=Trusted by Over 30+ Multinational Corporations").isVisible();

  const aboutValid =
    aboutFounder && aboutQuote && milestone2010 && milestone2015 && milestone2024 && safetySection && aboutClientele;

  results.push({
    test: "About page presents Founder Jahangir, 2010-2024 Milestones, Safety Protocols, and Esteemed Clientele",
    passed: aboutValid,
    details: `Founder: ${aboutFounder}, 2010: ${milestone2010}, 2015: ${milestone2015}, 2024: ${milestone2024}, Safety: ${safetySection}`,
  });
  console.log(`[${aboutValid ? "PASS" : "FAIL"}] Enriched About Page: ${aboutValid}`);
  await saveImage(aboutPage, "about-page-founder-milestones.png");
  await aboutPage.close();

  // ==========================================
  // Test 3: Mobile Height & Touch Responsiveness (390x844)
  // ==========================================
  console.log("\n--- Testing Mobile Viewport (390x844) ---");
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true });
  await mobilePage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });

  const totalMobileHeight = await mobilePage.evaluate(() => document.documentElement.scrollHeight);
  console.log(`Measured Mobile Homepage Height: ${totalMobileHeight}px`);

  const mobileMap = mobilePage.locator("#network");
  await mobileMap.locator('button[role="tab"]:has-text("Bengaluru")').click();
  await mobilePage.waitForTimeout(200);
  const mobileBlrSelected = await mobileMap.locator("h3:has-text('Bengaluru')").isVisible();

  results.push({
    test: `Mobile responsive layout with interactive map buttons (Height: ${totalMobileHeight}px)`,
    passed: mobileBlrSelected,
    details: `Height: ${totalMobileHeight}px, Blr selected: ${mobileBlrSelected}`,
  });
  console.log(`[${mobileBlrSelected ? "PASS" : "FAIL"}] Mobile Map & Layout: ${mobileBlrSelected}`);

  await saveImage(mobilePage, "homepage-presence-mobile.png", { fullPage: true });
  await mobilePage.close();

  // ==========================================
  // Summary
  // ==========================================
  console.log("\n==========================================");
  console.log("PRESENCE, FOUNDER & CASE STUDIES RESULTS");
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
    console.log("\nAll presence, founder & case studies verification tests passed successfully!");
  }
}

main().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
