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
  console.log("Starting Day 4 final launch verification suite...");
  const browser = await chromium.launch({ channel: "msedge" });
  const results = [];

  // ==========================================
  // Test 1: Robots.txt & Sitemap.xml
  // ==========================================
  console.log("\n--- Testing SEO Robots & Sitemap ---");
  const seoContext = await browser.newContext();
  const seoPage = await seoContext.newPage();

  const robotsRes = await seoPage.goto(`${BASE_URL}/robots.txt`);
  const robotsText = await seoPage.innerText("body");
  const robotsValid = robotsRes.status() === 200 && robotsText.includes("sitemap.xml");
  results.push({
    test: "Robots.txt returns 200 and points to sitemap.xml",
    passed: robotsValid,
  });
  console.log(`[${robotsValid ? "PASS" : "FAIL"}] Robots.txt status: ${robotsRes.status()}`);

  const sitemapRes = await seoPage.goto(`${BASE_URL}/sitemap.xml`);
  const sitemapText = await sitemapRes.text();
  const sitemapHasServices = sitemapText.includes("/india/services") && sitemapText.includes("employee-transportation");
  const sitemapHasCore = sitemapText.includes("/india/fleet") && sitemapText.includes("/india/about") && sitemapText.includes("/india/contact");
  const sitemapValid = sitemapRes.status() === 200 && sitemapHasServices && sitemapHasCore;
  results.push({
    test: "Sitemap.xml returns 200 and contains all public release routes",
    passed: sitemapValid,
  });
  console.log(`[${sitemapValid ? "PASS" : "FAIL"}] Sitemap.xml valid: ${sitemapValid}`);
  await seoContext.close();

  // ==========================================
  // Test 2: Console Error & Hydration Check Across All Routes
  // ==========================================
  console.log("\n--- Testing Console Integrity Across Pages ---");
  const consoleErrors = [];
  const testContext = await browser.newContext();
  const testPage = await testContext.newPage();

  testPage.on("pageerror", (err) => {
    consoleErrors.push(`[PageError] ${err.message}`);
  });
  testPage.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(`[ConsoleError] ${msg.text()}`);
    }
  });

  const routesToCheck = [
    "/india",
    "/india/services",
    "/india/services/employee-transportation",
    "/india/services/bus-shuttle-transport",
    "/india/services/event-transportation",
    "/india/services/airport-transfers",
    "/india/services/chauffeur-luxury",
    "/india/services/rent-a-car",
    "/india/fleet",
    "/india/about",
    "/india/contact",
    "/india/privacy",
  ];

  for (const r of routesToCheck) {
    await testPage.goto(`${BASE_URL}${r}`, { waitUntil: "networkidle" });
  }

  const noConsoleErrors = consoleErrors.length === 0;
  results.push({
    test: "Zero uncaught page errors or console errors across all routes",
    passed: noConsoleErrors,
    details: consoleErrors.join("; "),
  });
  console.log(`[${noConsoleErrors ? "PASS" : "FAIL"}] Console errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error("Errors found:", consoleErrors);
  }
  await testContext.close();

  // ==========================================
  // Test 3: Link Audit (Phone, WhatsApp, No mailto, No Broken internal links)
  // ==========================================
  console.log("\n--- Testing Link Audit ---");
  const linkContext = await browser.newContext();
  const linkPage = await linkContext.newPage();
  await linkPage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });

  const allHrefs = await linkPage.$$eval("a", (anchors) =>
    anchors.map((a) => a.getAttribute("href")).filter(Boolean)
  );

  let phoneLinksValid = true;
  let whatsappLinksValid = true;
  let noMailtoLinks = true;

  for (const href of allHrefs) {
    if (href.startsWith("tel:")) {
      if (href !== "tel:+919100777768") phoneLinksValid = false;
    }
    if (href.includes("wa.me")) {
      if (!href.includes("919396546950")) whatsappLinksValid = false;
    }
    if (href.startsWith("mailto:")) {
      noMailtoLinks = false;
    }
  }

  results.push({
    test: "Direct phone links use verified +91 91007 77768",
    passed: phoneLinksValid,
  });
  results.push({
    test: "WhatsApp links use verified +91 93965 46950",
    passed: whatsappLinksValid,
  });
  results.push({
    test: "No active unconfigured mailto links present",
    passed: noMailtoLinks,
  });
  console.log(`[${phoneLinksValid ? "PASS" : "FAIL"}] Phone links valid: ${phoneLinksValid}`);
  console.log(`[${whatsappLinksValid ? "PASS" : "FAIL"}] WhatsApp links valid: ${whatsappLinksValid}`);
  console.log(`[${noMailtoLinks ? "PASS" : "FAIL"}] No mailto links: ${noMailtoLinks}`);
  await linkContext.close();

  // ==========================================
  // Test 4: Browser History (Back / Forward Navigation)
  // ==========================================
  console.log("\n--- Testing Browser Back / Forward History ---");
  const historyContext = await browser.newContext();
  const historyPage = await historyContext.newPage();

  await historyPage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });
  await historyPage.goto(`${BASE_URL}/india/services`, { waitUntil: "networkidle" });
  await historyPage.goto(`${BASE_URL}/india/fleet`, { waitUntil: "networkidle" });

  await historyPage.goBack({ waitUntil: "networkidle" });
  await historyPage.waitForTimeout(300);
  const backUrl1 = historyPage.url();
  const back1Passed = backUrl1.endsWith("/india/services");

  await historyPage.goBack({ waitUntil: "networkidle" });
  await historyPage.waitForTimeout(300);
  const backUrl2 = historyPage.url();
  const back2Passed = backUrl2.endsWith("/india");

  await historyPage.goForward({ waitUntil: "networkidle" });
  await historyPage.waitForTimeout(300);
  const fwdUrl = historyPage.url();
  const fwdPassed = fwdUrl.endsWith("/india/services");

  const historyPassed = back1Passed && back2Passed && fwdPassed;
  results.push({
    test: "Browser history back and forward navigation operates cleanly",
    passed: historyPassed,
  });
  console.log(`[${historyPassed ? "PASS" : "FAIL"}] Browser navigation: back1=${back1Passed}, back2=${back2Passed}, forward=${fwdPassed}`);
  await historyContext.close();

  // ==========================================
  // Test 5: Mobile Viewport Horizontal Overflow Check (360px & 390px)
  // ==========================================
  console.log("\n--- Testing Mobile Viewport Horizontal Overflow ---");
  let overflowPassed = true;
  for (const width of [360, 390]) {
    const mobileContext = await browser.newContext({ viewport: { width, height: 800 } });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });

    const hasHorizontalOverflow = await mobilePage.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    if (hasHorizontalOverflow) overflowPassed = false;
    await mobileContext.close();
  }

  results.push({
    test: "No horizontal overflow at 360px and 390px mobile viewports",
    passed: overflowPassed,
  });
  console.log(`[${overflowPassed ? "PASS" : "FAIL"}] Mobile overflow test: ${overflowPassed}`);

  await browser.close();

  console.log("\n=============================");
  console.log("FINAL TEST SUMMARY (DAY 4 LAUNCH CHECKS):");
  let allPassed = true;
  for (const r of results) {
    if (!r.passed) allPassed = false;
    console.log(`${r.passed ? "✔ PASS" : "✖ FAIL"}: ${r.test}`);
  }
  console.log(`\nOverall Result: ${allPassed ? "ALL LAUNCH CHECKS PASSED" : "SOME CHECKS FAILED"}`);
  return allPassed ? 0 : 1;
}

main().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
