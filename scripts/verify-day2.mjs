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
  console.log("Starting Day 2 automated verification suite & screenshot capture...");
  const browser = await chromium.launch({ channel: "msedge" });
  const results = [];

  // ==========================================
  // Test 1: Route Integrity & HTTP Status Codes
  // ==========================================
  console.log("\n--- Testing Route Integrity & 404 Guard ---");
  const testContext = await browser.newContext();
  const testPage = await testContext.newPage();

  const routesToTest = [
    { path: "/", expectedStatus: 200, name: "Root Redirect -> /india" },
    { path: "/india", expectedStatus: 200, name: "India Homepage" },
    { path: "/india/services", expectedStatus: 200, name: "Services Overview" },
    { path: "/india/services/employee-transportation", expectedStatus: 200, name: "Service Detail: Employee Transportation" },
    { path: "/india/services/bus-shuttle-transport", expectedStatus: 200, name: "Service Detail: Bus & Shuttle" },
    { path: "/india/services/event-transportation", expectedStatus: 200, name: "Service Detail: Event Transportation" },
    { path: "/india/services/airport-transfers", expectedStatus: 200, name: "Service Detail: Airport Transfers" },
    { path: "/india/services/chauffeur-luxury", expectedStatus: 200, name: "Service Detail: Chauffeur & Luxury" },
    { path: "/india/services/rent-a-car", expectedStatus: 200, name: "Service Detail: Rent-A-Car" },
    { path: "/india/fleet", expectedStatus: 200, name: "Fleet Categories Page" },
    { path: "/india/about", expectedStatus: 200, name: "About Us Page" },
    { path: "/india/contact", expectedStatus: 200, name: "Contact & Requirement Desk" },
    { path: "/india/privacy", expectedStatus: 200, name: "Privacy Notice Page" },
    { path: "/india/services/non-existent-service", expectedStatus: 404, name: "Invalid Service Slug returns 404" },
  ];

  for (const route of routesToTest) {
    const res = await testPage.goto(`${BASE_URL}${route.path}`, { waitUntil: "networkidle" });
    const status = res ? res.status() : 0;
    const passed = status === route.expectedStatus;
    results.push({ test: `Route ${route.path} status (${route.name})`, expected: route.expectedStatus, actual: status, passed });
    console.log(`[${passed ? "PASS" : "FAIL"}] ${route.name}: got ${status}, expected ${route.expectedStatus}`);
  }
  await testContext.close();

  // ==========================================
  // Test 2: Codex Finding 1 - Breakpoint Resize Scroll Lock Cleanup
  // ==========================================
  console.log("\n--- Testing Codex Finding 1: Breakpoint Resize Cleanup ---");
  const resizeContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const resizePage = await resizeContext.newPage();
  await resizePage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });

  const hamburger = resizePage.locator("button[aria-controls='mobile-navigation-drawer']");
  await hamburger.click();
  await resizePage.waitForTimeout(300);

  const mainIsInert = await resizePage.$eval("#main-content", (el) => el.hasAttribute("inert"));
  const bodyOverflowHidden = await resizePage.$eval("body", (el) => el.style.overflow === "hidden");
  console.log(`Menu open: main inert = ${mainIsInert}, body overflow hidden = ${bodyOverflowHidden}`);

  // Now resize to desktop (1200px)
  await resizePage.setViewportSize({ width: 1200, height: 800 });
  await resizePage.waitForTimeout(400);

  const mainIsInertAfterResize = await resizePage.$eval("#main-content", (el) => el.hasAttribute("inert"));
  const bodyOverflowAfterResize = await resizePage.$eval("body", (el) => el.style.overflow);
  const resizePassed = !mainIsInertAfterResize && bodyOverflowAfterResize !== "hidden";
  results.push({
    test: "Codex Finding 1: Menu auto-closes and removes inert/overflow lock on resize >= 1024px",
    passed: resizePassed,
    details: `Inert: ${mainIsInertAfterResize}, overflow: ${bodyOverflowAfterResize}`,
  });
  console.log(`[${resizePassed ? "PASS" : "FAIL"}] Resize cleanup: main inert = ${mainIsInertAfterResize}, body overflow = ${bodyOverflowAfterResize}`);
  await resizeContext.close();

  // ==========================================
  // Test 3: Codex Finding 2 - Label Association for Name Field
  // ==========================================
  console.log("\n--- Testing Codex Finding 2: Label Association ---");
  const labelContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const labelPage = await labelContext.newPage();
  await labelPage.goto(`${BASE_URL}/india/contact`, { waitUntil: "networkidle" });

  const labelFor = await labelPage.$eval("label[for='enquiry-name-input']", (el) => el.getAttribute("for"));
  const inputId = await labelPage.$eval("#enquiry-name-input", (el) => el.id);
  // Click the label directly
  await labelPage.click("label[for='enquiry-name-input']");
  await labelPage.waitForTimeout(100);
  const activeId = await labelPage.evaluate(() => document.activeElement?.id);

  const labelPassed = labelFor === "enquiry-name-input" && inputId === "enquiry-name-input" && activeId === "enquiry-name-input";
  results.push({
    test: "Codex Finding 2: Clicking label focuses #enquiry-name-input",
    expected: "enquiry-name-input",
    actual: activeId,
    passed: labelPassed,
  });
  console.log(`[${labelPassed ? "PASS" : "FAIL"}] Label click focuses: ${activeId}`);
  await labelContext.close();

  // ==========================================
  // Test 4: Codex Finding 4 & 5 - Internal Draft Labels Removed
  // ==========================================
  console.log("\n--- Testing Codex Finding 4 & 5: Internal draft labels removed ---");
  const contentContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const contentPage = await contentContext.newPage();
  await contentPage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });

  const pageText = await contentPage.$eval("body", (el) => el.innerText.toLowerCase());
  const hasCategoryId = pageText.includes("category id:");
  const hasBrochurePage10 = pageText.includes("brochure page 10 baseline");
  const hasBrochureVerified = pageText.includes("brochure verified");
  const hasRegionalDepots = pageText.includes("regional depots");
  const hasOperatingCities = pageText.includes("operating cities");

  const markersCleaned = !hasCategoryId && !hasBrochurePage10 && !hasBrochureVerified && !hasRegionalDepots && hasOperatingCities;
  results.push({
    test: "Codex Finding 4 & 5: Internal draft labels removed and Operating Cities verified",
    passed: markersCleaned,
  });
  console.log(`[${markersCleaned ? "PASS" : "FAIL"}] Draft labels absent: Category ID=${hasCategoryId}, Page 10=${hasBrochurePage10}, Verified=${hasBrochureVerified}, Regional Depots=${hasRegionalDepots}, Operating Cities=${hasOperatingCities}`);
  await contentContext.close();

  // ==========================================
  // Test 5: Capture Desktop & Mobile Screenshots for All Pages
  // ==========================================
  console.log("\n--- Capturing Screenshots for Day 2 Pages ---");

  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
  });

  const pagesToCapture = [
    { url: "/india", name: "home" },
    { url: "/india/services", name: "services" },
    { url: "/india/services/employee-transportation", name: "service-detail" },
    { url: "/india/fleet", name: "fleet" },
    { url: "/india/about", name: "about" },
    { url: "/india/contact", name: "contact" },
    { url: "/india/privacy", name: "privacy" },
  ];

  for (const item of pagesToCapture) {
    // Desktop Viewport Screenshot
    const dPage = await desktop.newPage();
    await dPage.goto(`${BASE_URL}${item.url}`, { waitUntil: "networkidle" });
    await dPage.waitForTimeout(300);
    await saveImage(dPage, `${item.name}-desktop.png`);
    await dPage.close();

    // Mobile Viewport Screenshot
    const mPage = await mobile.newPage();
    await mPage.goto(`${BASE_URL}${item.url}`, { waitUntil: "networkidle" });
    await mPage.waitForTimeout(300);
    await saveImage(mPage, `${item.name}-mobile.png`);
    await mPage.close();
  }

  await desktop.close();
  await mobile.close();
  await browser.close();

  console.log("\n=============================");
  console.log("FINAL TEST SUMMARY:");
  let allPassed = true;
  for (const r of results) {
    if (!r.passed) allPassed = false;
    console.log(`${r.passed ? "✔ PASS" : "✖ FAIL"}: ${r.test}`);
  }
  console.log(`\nOverall Result: ${allPassed ? "ALL TESTS PASSED" : "SOME TESTS FAILED"}`);
  return allPassed ? 0 : 1;
}

main().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
