import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const targetUrl = "http://localhost:3000/india";
const outputDirs = [
  path.resolve("docs/screenshots"),
  "C:/Users/tippa/.gemini/antigravity/brain/6bcbc0c9-63bc-40e5-84e8-1703d532d8fa",
];

for (const dir of outputDirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function main() {
  console.log("Starting verification and screenshot capture...");
  const browser = await chromium.launch({ channel: "msedge" });
  const testResults = [];

  // ==========================================
  // Test 1: Desktop Experience & Verifications
  // ==========================================
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });
  const page = await desktopContext.newPage();
  await page.goto(targetUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  // 1. Verify Brand Colors
  const warmWhiteBg = await page.$eval("#employee-transport", (el) =>
    window.getComputedStyle(el).backgroundColor
  );
  console.log("Employee transport background color:", warmWhiteBg);
  testResults.push({
    test: "Brand warm-white background color applied",
    expected: "rgb(246, 245, 242)",
    actual: warmWhiteBg,
    passed: warmWhiteBg === "rgb(246, 245, 242)",
  });

  // 2. Verify Disabled Content is NOT published
  const isoInAbout = await page.$eval("#about", (el) =>
    el.textContent.includes("ISO 9001:2015")
  );
  const isoInFooter = await page.$eval("footer", (el) =>
    el.textContent.includes("ISO 9001:2015")
  );
  testResults.push({
    test: "ISO claim hidden in About when iso.enabled: false",
    passed: !isoInAbout,
  });
  testResults.push({
    test: "ISO claim removed from Footer when iso.enabled: false",
    passed: !isoInFooter,
  });

  const dzireInFleet = await page.$eval("#fleet", (el) =>
    el.textContent.includes("Swift Dzire")
  );
  testResults.push({
    test: "Brochure models hidden when fleetModelDisplayDefault: false",
    passed: !dzireInFleet,
  });

  // 3. Verify Enquiry Navigation & Selection Passing
  console.log("Testing enquiry navigation from Services...");
  const serviceLink = await page.locator("text=Discuss Bus & Shuttle Transport");
  await serviceLink.click();
  await page.waitForTimeout(600);

  const selectedService = await page.$eval(
    "#contact select",
    (el) => el.value
  );
  testResults.push({
    test: "Service selection passed to Enquiry form",
    expected: "Bus & Shuttle Transport",
    actual: selectedService,
    passed: selectedService === "Bus & Shuttle Transport",
  });

  console.log("Testing enquiry navigation from Cities...");
  const puneLink = await page.locator("text=Enquire for Pune routes");
  await puneLink.click();
  await page.waitForTimeout(600);

  const selectedCity = await page.$eval(
    "#contact select:nth-of-type(1)", // second select is city
    (el) => {
      const selects = document.querySelectorAll("#contact select");
      return selects[1]?.value;
    }
  );
  testResults.push({
    test: "City selection passed to Enquiry form",
    expected: "Pune",
    actual: selectedCity,
    passed: selectedCity === "Pune",
  });

  // 4. Capture Desktop Screenshots
  console.log("Capturing Desktop Screenshots...");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outputDirs[0], "desktop-hero.png") });
  await page.screenshot({ path: path.join(outputDirs[0], "desktop-full.png"), fullPage: true });

  await desktopContext.close();

  // ==========================================
  // Test 2: Mobile Experience & Verifications (390px)
  // ==========================================
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(targetUrl, { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(500);

  // 5. Test Mobile Menu Focus Trap & Background Inertness
  console.log("Testing Mobile menu accessibility...");
  const menuButton = mobilePage.locator("button[aria-label='Open navigation menu']");
  await menuButton.click();
  await mobilePage.waitForTimeout(300);

  const isMainInert = await mobilePage.$eval("#main-content", (el) =>
    el.hasAttribute("inert")
  );
  testResults.push({
    test: "Background main content inert while mobile menu is open",
    passed: isMainInert,
  });

  // Capture Mobile Menu Open Screenshot
  await mobilePage.screenshot({ path: path.join(outputDirs[0], "mobile-menu.png") });

  // Test Escape Key dismissal and trigger focus restoration
  await mobilePage.keyboard.press("Escape");
  await mobilePage.waitForTimeout(300);

  const isMainInertAfterClose = await mobilePage.$eval("#main-content", (el) =>
    el.hasAttribute("inert")
  );
  const isMenuTriggerFocused = await mobilePage.evaluate(() => {
    return document.activeElement?.getAttribute("aria-controls") === "mobile-navigation-drawer";
  });
  testResults.push({
    test: "Background inert removed on mobile menu close",
    passed: !isMainInertAfterClose,
  });
  testResults.push({
    test: "Focus restored to hamburger button after Escape dismissal",
    passed: isMenuTriggerFocused,
  });

  // Capture Mobile Hero
  await mobilePage.evaluate(() => window.scrollTo(0, 0));
  await mobilePage.waitForTimeout(300);
  await mobilePage.screenshot({ path: path.join(outputDirs[0], "mobile-hero.png") });

  // 6. Capture Mobile Fleet Section (to verify text contrast and dark backdrop)
  console.log("Capturing Mobile Fleet section...");
  const fleetSection = mobilePage.locator("#fleet");
  await fleetSection.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(400);
  await fleetSection.screenshot({ path: path.join(outputDirs[0], "mobile-fleet.png") });

  // 7. Capture Mobile Lower Sections (Network, About, Enquiry, Footer)
  console.log("Capturing Mobile Lower sections...");
  const networkSection = mobilePage.locator("#network");
  await networkSection.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(400);
  await mobilePage.screenshot({ path: path.join(outputDirs[0], "mobile-lower.png") });

  // 8. Capture clean Full Mobile Page
  console.log("Capturing clean full Mobile page...");
  await mobilePage.evaluate(() => window.scrollTo(0, 0));
  await mobilePage.waitForTimeout(300);
  await mobilePage.screenshot({ path: path.join(outputDirs[0], "mobile-full.png"), fullPage: true });

  await mobileContext.close();
  await browser.close();

  // Copy all screenshots to artifact directory
  const files = [
    "desktop-hero.png",
    "desktop-full.png",
    "mobile-hero.png",
    "mobile-menu.png",
    "mobile-fleet.png",
    "mobile-lower.png",
    "mobile-full.png",
  ];
  for (const f of files) {
    const src = path.join(outputDirs[0], f);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(outputDirs[1], f));
    }
  }

  console.log("\n==========================================");
  console.log("TEST VERIFICATION SUMMARY:");
  console.log("==========================================");
  let allPassed = true;
  for (const res of testResults) {
    console.log(`${res.passed ? "✔ PASS" : "✖ FAIL"}: ${res.test}`);
    if (!res.passed) allPassed = false;
  }
  console.log("==========================================");
  if (!allPassed) {
    throw new Error("One or more automated verification tests failed.");
  }
}

main().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
