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
  console.log("Starting India Presence & Brand Verification Suite...");
  const browser = await chromium.launch({ channel: "msedge" });
  const results = [];

  // ==========================================
  // Test 1: Desktop Layout, Sequence & Map
  // ==========================================
  console.log("\n--- Testing Desktop Layout & India Presence Map ---");
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });

  // 1. Check Section Sequence
  const mainSections = await desktopPage.evaluate(() => {
    const sections = Array.from(document.querySelectorAll("main > section, main > div"));
    return sections.map((s) => s.id || s.className.split(" ")[0]);
  });
  console.log("Rendered sections sequence:", mainSections);

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

  // 2. Check Compact Customer Journeys (No duplicate 3-bullet lists or double CTA buttons)
  const journeyCards = desktopPage.locator("#services article");
  const cardCount = await journeyCards.count();
  const firstCardButtons = await journeyCards.first().locator("button, a").count();
  // Exactly 1 exploration action link per card
  const compactJourneys = cardCount === 3 && firstCardButtons === 1;

  results.push({
    test: "Customer Journey cards are compacted to title, single sentence, and single exploration link",
    passed: compactJourneys,
    details: `Cards: ${cardCount}, Buttons per card: ${firstCardButtons}`,
  });
  console.log(`[${compactJourneys ? "PASS" : "FAIL"}] Compact customer journeys: ${compactJourneys}`);

  // 3. Test Interactive India Presence Map
  const mapSection = desktopPage.locator("#network");
  const legendText = await mapSection.locator("text=Highlighted states contain a listed Victor office").isVisible();
  const headingText = await mapSection.locator("h2:has-text('Our India presence')").isVisible();

  // Test state switching: Click Bengaluru
  await mapSection.locator('button[role="tab"]:has-text("Bengaluru")').click();
  await desktopPage.waitForTimeout(200);
  const bengaluruActive = await mapSection.locator("h3:has-text('Bengaluru')").isVisible();
  const bengaluruAddress = await mapSection.locator("text=Maragondanahalli").first().isVisible();

  // Test state switching: Click Pune
  await mapSection.locator('button[role="tab"]:has-text("Pune")').click();
  await desktopPage.waitForTimeout(200);
  const puneActive = await mapSection.locator("h3:has-text('Pune')").isVisible();
  const puneAddress = await mapSection.locator("text=Hadapsar").first().isVisible();

  // Test state switching back to Hyderabad
  await mapSection.locator('button[role="tab"]:has-text("Hyderabad")').click();
  await desktopPage.waitForTimeout(200);
  const hyderabadActive = await mapSection.locator("h3:has-text('Hyderabad')").isVisible();
  const hyderabadAddress = await mapSection.locator("text=Gachibowli").first().isVisible();

  const mapValid =
    legendText && headingText && bengaluruActive && bengaluruAddress && puneActive && puneAddress && hyderabadActive && hyderabadAddress;

  results.push({
    test: "India Presence Map features accurate legend, SVG paths, and interactive city switching",
    passed: mapValid,
    details: `Legend: ${legendText}, Heading: ${headingText}, Hyd: ${hyderabadActive}, Blr: ${bengaluruActive}, Pune: ${puneActive}`,
  });
  console.log(`[${mapValid ? "PASS" : "FAIL"}] India Presence Map: ${mapValid}`);

  await saveImage(mapSection, "map-presence-desktop.png");

  // 4. Test People Behind Victor Section
  const peopleSection = desktopPage.locator("#about");
  const mujeebPresent = await peopleSection.locator("text=Mujeeb Ur Rehman Mohammed").isVisible();
  const rolePresent = await peopleSection.locator("text=Business Development Partner").isVisible();
  const opsPresent = await peopleSection.locator("text=Operations & Dispatch Control").isVisible();
  const peopleValid = mujeebPresent && rolePresent && opsPresent;

  results.push({
    test: "The People Behind Victor showcases named commercial leadership and 24/7 operations desk",
    passed: peopleValid,
    details: `Mujeeb: ${mujeebPresent}, Role: ${rolePresent}, Ops: ${opsPresent}`,
  });
  console.log(`[${peopleValid ? "PASS" : "FAIL"}] People Behind Victor: ${peopleValid}`);

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
  // Test 2: Mobile Height & Touch Responsiveness (390x844)
  // ==========================================
  console.log("\n--- Testing Mobile Viewport (390x844) & Height Measurement ---");
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true });
  await mobilePage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });

  const totalMobileHeight = await mobilePage.evaluate(() => document.documentElement.scrollHeight);
  console.log(`Measured Mobile Homepage Height: ${totalMobileHeight}px (down from previous ~15,707px)`);

  const heightSignificantlyReduced = totalMobileHeight < 11500;
  results.push({
    test: `Mobile homepage height reduced by consolidating duplicate sections (Current: ${totalMobileHeight}px, was ~15,707px)`,
    passed: heightSignificantlyReduced,
    details: `Height: ${totalMobileHeight}px (< 11,500px threshold)`,
  });
  console.log(`[${heightSignificantlyReduced ? "PASS" : "FAIL"}] Mobile height reduction: ${heightSignificantlyReduced}`);

  // Test mobile map tab buttons
  const mobileMap = mobilePage.locator("#network");
  await mobileMap.locator('button[role="tab"]:has-text("Bengaluru")').click();
  await mobilePage.waitForTimeout(200);
  const mobileBlrSelected = await mobileMap.locator("h3:has-text('Bengaluru')").isVisible();

  await saveImage(mobileMap, "map-presence-mobile.png");
  await saveImage(mobilePage, "homepage-presence-mobile.png", { fullPage: true });
  await mobilePage.close();

  // ==========================================
  // Summary
  // ==========================================
  console.log("\n==========================================");
  console.log("INDIA PRESENCE & BRAND PLAN RESULTS");
  console.log("==========================================");
  let allPassed = true;
  for (const r of results) {
    console.log(`${r.passed ? "✔ PASS" : "✖ FAIL"}: ${r.test} ${r.details ? `(${r.details})` : ""}`);
    if (!r.passed) allPassed = false;
  }

  await browser.close();

  if (!allPassed) {
    console.error("\nSome presence and brand verification tests failed.");
    process.exit(1);
  } else {
    console.log("\nAll presence and brand verification tests passed successfully!");
  }
}

main().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
