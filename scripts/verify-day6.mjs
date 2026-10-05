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
  console.log("Starting Day 6 Verification Suite: Authentic Story, Wedding Logistics & Executive Standards...");
  const browser = await chromium.launch({ channel: "msedge" });
  const results = [];

  // ==========================================
  // Test 1: Enriched About Page (/india/about)
  // ==========================================
  console.log("\n--- Testing Enriched About Page ---");
  const aboutPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const aboutRes = await aboutPage.goto(`${BASE_URL}/india/about`, { waitUntil: "networkidle" });
  const aboutStatusValid = aboutRes.status() === 200;

  // Check Founding Story & Philosophy
  const aboutHeading = await aboutPage.locator("h1").innerText();
  const hasPhilosophy = aboutHeading.includes("Punctual mobility built on trust and accountability");

  // Check Leadership Card
  const leadershipName = await aboutPage.locator("h3:has-text('Mujeeb Ur Rehman Mohammed')").isVisible();
  const leadershipRole = await aboutPage.locator("text=Business Development Partner").first().isVisible();
  const directPhoneLink = await aboutPage.locator('a[href="tel:+919100777768"]').first().isVisible();
  const directWhatsappLink = await aboutPage.locator('a[href*="9396546950"]').first().isVisible();
  const leadershipValid = leadershipName && leadershipRole && directPhoneLink && directWhatsappLink;

  // Check 4 Operational Commitments
  const commitment1 = await aboutPage.locator("text=Precision Scheduling & Timing Rigour").isVisible();
  const commitment2 = await aboutPage.locator("text=Driver Dignity & Verified Vetting").isVisible();
  const commitment3 = await aboutPage.locator("text=Cabin Cleanliness & Pre-Dispatch Checks").isVisible();
  const commitment4 = await aboutPage.locator("text=Transparent Commercial Governance").isVisible();
  const commitmentsValid = commitment1 && commitment2 && commitment3 && commitment4;

  // Check 3 Customer Dimensions
  const audience1 = await aboutPage.locator("text=Executive & VIP Hospitality").isVisible();
  const audience2 = await aboutPage.locator("text=Weddings & Private Occasions").isVisible();
  const audience3 = await aboutPage.locator("text=Corporate Workforce Commutes").isVisible();
  const audiencesValid = audience1 && audience2 && audience3;

  // Check 3 Established Offices
  const officeHyd = await aboutPage.locator("h3:has-text('Hyderabad')").isVisible();
  const officeBlr = await aboutPage.locator("h3:has-text('Bengaluru')").isVisible();
  const officePnq = await aboutPage.locator("h3:has-text('Pune')").isVisible();
  const officesValid = officeHyd && officeBlr && officePnq;

  const aboutTotalPassed = aboutStatusValid && hasPhilosophy && leadershipValid && commitmentsValid && audiencesValid && officesValid;
  results.push({
    test: "About page presents authentic founding vision, leadership responsibility, 4 commitments, 3 dimensions, and 3 offices",
    passed: aboutTotalPassed,
    details: `Status: ${aboutStatusValid}, Leadership: ${leadershipValid}, Commitments: ${commitmentsValid}, Audiences: ${audiencesValid}`,
  });
  console.log(`[${aboutTotalPassed ? "PASS" : "FAIL"}] Enriched About page: ${aboutTotalPassed}`);

  // Save desktop & mobile About screenshots
  await saveImage(aboutPage, "about-day6-desktop.png");

  const mobileAboutPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobileAboutPage.goto(`${BASE_URL}/india/about`, { waitUntil: "networkidle" });
  await saveImage(mobileAboutPage, "about-day6-mobile.png");
  await mobileAboutPage.close();

  // ==========================================
  // Test 2: Event & Wedding Logistics (/india/services/event-transportation)
  // ==========================================
  console.log("\n--- Testing Wedding & Event Transport Page ---");
  const eventPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await eventPage.goto(`${BASE_URL}/india/services/event-transportation`, { waitUntil: "networkidle" });

  const eventBadge = await eventPage.locator("span:has-text('Weddings, Galas & Summits')").isVisible();
  const eventScenario = await eventPage.locator("text=Wedding & Occasion Logistics Coordination").isVisible();
  const coupleConvoys = await eventPage.locator("text=Couple & VIP Convoys").isVisible();
  const guestShuttles = await eventPage.locator("text=Guest Shuttles & Loop Transit").isVisible();
  const overrunHandling = await eventPage.locator("text=Ceremony Overrun Handling").isVisible();
  const multiDayAnswer = await eventPage.locator("text=Can we arrange multi-day wedding transportation?").isVisible();

  const eventPagePassed = eventBadge && eventScenario && coupleConvoys && guestShuttles && overrunHandling && multiDayAnswer;
  results.push({
    test: "Event Transportation features dedicated Wedding & Occasion logistics workflow and practical Q&A",
    passed: eventPagePassed,
    details: `Scenario: ${eventScenario}, Couple: ${coupleConvoys}, Shuttles: ${guestShuttles}, Multi-Day: ${multiDayAnswer}`,
  });
  console.log(`[${eventPagePassed ? "PASS" : "FAIL"}] Wedding & Event detail page: ${eventPagePassed}`);

  await saveImage(eventPage, "service-event-day6-desktop.png");

  const mobileEventPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobileEventPage.goto(`${BASE_URL}/india/services/event-transportation`, { waitUntil: "networkidle" });
  await saveImage(mobileEventPage, "service-event-day6-mobile.png");
  await mobileEventPage.close();

  // ==========================================
  // Test 3: Executive & VIP Chauffeur Page (/india/services/chauffeur-luxury)
  // ==========================================
  console.log("\n--- Testing Chauffeur & Luxury Service Page ---");
  const luxuryPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await luxuryPage.goto(`${BASE_URL}/india/services/chauffeur-luxury`, { waitUntil: "networkidle" });

  const luxuryScenario = await luxuryPage.locator("text=Executive Chauffeur Protocol").isVisible();
  const flightTracking = await luxuryPage.locator("text=Flight Tracking & Terminal Greeting").isVisible();
  const cabinReadiness = await luxuryPage.locator("text=Executive Cabin Readiness").isVisible();
  const routeDiscretion = await luxuryPage.locator("text=Route Discretion & Privacy").isVisible();
  const luggageQuestion = await luxuryPage.locator("text=How much luggage can an executive sedan accommodate?").isVisible();
  const airportWaitingQuestion = await luxuryPage.locator("text=What waiting time is included for airport pickups?").isVisible();

  const luxuryPagePassed = luxuryScenario && flightTracking && cabinReadiness && routeDiscretion && luggageQuestion && airportWaitingQuestion;
  results.push({
    test: "Chauffeur Luxury page features Executive Chauffeur Protocol scenario and luggage/waiting Q&A",
    passed: luxuryPagePassed,
    details: `Scenario: ${luxuryScenario}, FlightTracking: ${flightTracking}, Cabin: ${cabinReadiness}, Luggage: ${luggageQuestion}`,
  });
  console.log(`[${luxuryPagePassed ? "PASS" : "FAIL"}] Luxury service detail page: ${luxuryPagePassed}`);

  await saveImage(luxuryPage, "service-luxury-day6-desktop.png");

  const mobileLuxuryPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobileLuxuryPage.goto(`${BASE_URL}/india/services/chauffeur-luxury`, { waitUntil: "networkidle" });
  await saveImage(mobileLuxuryPage, "service-luxury-day6-mobile.png");
  await mobileLuxuryPage.close();

  // ==========================================
  // Test 4: Corporate Employee Commute (/india/services/employee-transportation)
  // ==========================================
  console.log("\n--- Testing Employee Transportation Page ---");
  const employeePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await employeePage.goto(`${BASE_URL}/india/services/employee-transportation`, { waitUntil: "networkidle" });

  const employeeScenario = await employeePage.locator("text=Workplace Commute Architecture").isVisible();
  const corridorAnalysis = await employeePage.locator("text=Corridor & Cluster Analysis").isVisible();
  const shiftSync = await employeePage.locator("text=Shift Roster Synchronization").first().isVisible();
  const preTripAudits = await employeePage.locator("text=Pre-Trip Vehicle Audits").isVisible();
  const fleetConfigQuestion = await employeePage.locator("text=What vehicle categories are deployed for workforce transit?").isVisible();

  const employeePagePassed = employeeScenario && corridorAnalysis && shiftSync && preTripAudits && fleetConfigQuestion;
  results.push({
    test: "Employee Transportation features Workplace Commute Architecture scenario and fleet/shift Q&A",
    passed: employeePagePassed,
    details: `Scenario: ${employeeScenario}, Corridor: ${corridorAnalysis}, ShiftSync: ${shiftSync}, Audits: ${preTripAudits}`,
  });
  console.log(`[${employeePagePassed ? "PASS" : "FAIL"}] Employee transport detail page: ${employeePagePassed}`);

  await saveImage(employeePage, "service-employee-day6-desktop.png");

  const mobileEmployeePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobileEmployeePage.goto(`${BASE_URL}/india/services/employee-transportation`, { waitUntil: "networkidle" });
  await saveImage(mobileEmployeePage, "service-employee-day6-mobile.png");
  await mobileEmployeePage.close();

  // ==========================================
  // Test 5: Homepage Link to About Page
  // ==========================================
  console.log("\n--- Testing Homepage Link to About Page ---");
  const homePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await homePage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });

  const aboutSectionLink = homePage.locator('a[href="/india/about"]:has-text("Read our full company story")');
  const linkVisible = await aboutSectionLink.isVisible();
  results.push({
    test: "Homepage About section links directly to the full company story and leadership standards",
    passed: linkVisible,
  });
  console.log(`[${linkVisible ? "PASS" : "FAIL"}] Homepage About story link: ${linkVisible}`);

  // ==========================================
  // Summary
  // ==========================================
  console.log("\n==========================================");
  console.log("DAY 6 VERIFICATION SUITE RESULTS");
  console.log("==========================================");
  let allPassed = true;
  for (const r of results) {
    console.log(`${r.passed ? "✔ PASS" : "✖ FAIL"}: ${r.test} ${r.details ? `(${r.details})` : ""}`);
    if (!r.passed) allPassed = false;
  }

  await browser.close();

  if (!allPassed) {
    console.error("\nSome Day 6 verification tests failed.");
    process.exit(1);
  } else {
    console.log("\nAll Day 6 verification tests passed successfully!");
  }
}

main().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
