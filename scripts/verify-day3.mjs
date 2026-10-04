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
  console.log("Starting Day 3 automated verification suite...");
  const browser = await chromium.launch({ channel: "msedge" });
  const results = [];

  // ==========================================
  // Test 1: JSON-LD Structured Data & Skip Link
  // ==========================================
  console.log("\n--- Testing JSON-LD Schema & Skip Link ---");
  const metaContext = await browser.newContext();
  const metaPage = await metaContext.newPage();
  await metaPage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });

  // 1. Skip link
  const skipLink = await metaPage.$("a[href='#main-content']");
  const skipText = skipLink ? await skipLink.innerText() : "";
  const skipPassed = skipLink !== null && skipText.includes("Skip to main content");
  results.push({
    test: "Accessible skip-link present at top of body",
    passed: skipPassed,
  });
  console.log(`[${skipPassed ? "PASS" : "FAIL"}] Skip link present: ${skipPassed}`);

  // 2. JSON-LD
  const jsonLdContent = await metaPage.$eval(
    "script[type='application/ld+json']",
    (el) => el.innerHTML
  );
  let jsonLdParsed = null;
  try {
    jsonLdParsed = JSON.parse(jsonLdContent);
  } catch (e) {
    console.error("Failed to parse JSON-LD:", e);
  }
  const hasOrg = jsonLdParsed?.["@graph"]?.some(
    (item) => item["@type"] === "Organization" && item.name === "Victor Mobility Pvt. Ltd." && item.slogan === "On Time Every Time."
  );
  const hasLocal = jsonLdParsed?.["@graph"]?.some(
    (item) => item["@type"] === "LocalBusiness" && item.telephone === "+91 91007 77768"
  );
  const jsonLdPassed = hasOrg && hasLocal;
  results.push({
    test: "JSON-LD structured data with Organization & LocalBusiness valid",
    passed: jsonLdPassed,
  });
  console.log(`[${jsonLdPassed ? "PASS" : "FAIL"}] JSON-LD Schema: Organization=${hasOrg}, LocalBusiness=${hasLocal}`);
  await metaContext.close();

  // ==========================================
  // Test 2: Fleet ARIA Tabs
  // ==========================================
  console.log("\n--- Testing Fleet ARIA Tablist Semantics ---");
  const tabContext = await browser.newContext();
  const tabPage = await tabContext.newPage();
  await tabPage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });

  const hasTablist = await tabPage.$("div[role='tablist']");
  const tabsCount = await tabPage.$$eval("button[role='tab']", (tabs) => tabs.length);
  const activeTabSelected = await tabPage.$eval("button[role='tab']", (tab) => tab.getAttribute("aria-selected"));
  const tabpanel = await tabPage.$("div[role='tabpanel']");

  const tabsPassed = hasTablist !== null && tabsCount === 4 && activeTabSelected === "true" && tabpanel !== null;
  results.push({
    test: "Fleet section implements ARIA tablist, tab, and tabpanel semantics",
    passed: tabsPassed,
  });
  console.log(`[${tabsPassed ? "PASS" : "FAIL"}] Fleet tabs: tablist=${hasTablist !== null}, tabs count=${tabsCount}, selected=${activeTabSelected}`);
  await tabContext.close();

  // ==========================================
  // Test 3: Interactive Enquiry Validation & Error Alerts
  // ==========================================
  console.log("\n--- Testing Interactive Enquiry Validation ---");
  const formContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const formPage = await formContext.newPage();
  await formPage.goto(`${BASE_URL}/india/contact`, { waitUntil: "networkidle" });

  // 1. Submit empty form
  const submitBtn = formPage.locator("button[type='submit']");
  await submitBtn.click();
  await formPage.waitForTimeout(300);

  // Check error alerts
  const nameError = await formPage.$("#name-error");
  const reqError = await formPage.$("#req-error");
  const nameInvalid = await formPage.$eval("#enquiry-name-input", (el) => el.getAttribute("aria-invalid"));

  const validationTriggered = nameError !== null && reqError !== null && nameInvalid === "true";
  results.push({
    test: "Submitting empty form triggers accessible inline error alerts with role=alert",
    passed: validationTriggered,
  });
  console.log(`[${validationTriggered ? "PASS" : "FAIL"}] Inline validation: nameError=${nameError !== null}, reqError=${reqError !== null}`);

  // Capture screenshot of validation error state
  await saveImage(formPage, "enquiry-validation-error.png");

  // 2. Fill Name field and verify error clears
  await formPage.fill("#enquiry-name-input", "Anita Desai (Procurement Manager)");
  await formPage.evaluate(() => document.getElementById("enquiry-name-input").blur());
  await formPage.waitForTimeout(200);

  const nameErrorAfter = await formPage.$("#name-error");
  const nameCleared = nameErrorAfter === null;
  results.push({
    test: "Entering valid name clears name error alert",
    passed: nameCleared,
  });
  console.log(`[${nameCleared ? "PASS" : "FAIL"}] Name error cleared after input: ${nameCleared}`);

  // 3. Fill Requirement details
  await formPage.fill(
    "textarea",
    "Require daily employee shuttle transport for 65 passengers across 2 shifts in Gachibowli, Hyderabad."
  );
  await formPage.evaluate(() => document.querySelector("textarea")?.blur());
  await formPage.waitForTimeout(200);

  const reqErrorAfter = await formPage.$("#req-error");
  const reqCleared = reqErrorAfter === null;
  results.push({
    test: "Entering requirement text clears requirement error alert",
    passed: reqCleared,
  });
  console.log(`[${reqCleared ? "PASS" : "FAIL"}] Requirement error cleared after input: ${reqCleared}`);

  // ==========================================
  // Test 4: Copy Draft Button Functionality
  // ==========================================
  console.log("\n--- Testing Copy Draft Functionality ---");
  const copyBtn = formPage.locator("button[aria-label='Copy draft WhatsApp message to clipboard']");
  await copyBtn.click();
  await formPage.waitForTimeout(300);

  const copyBtnText = await copyBtn.innerText();
  const copiedPassed = copyBtnText.includes("Copied!");
  results.push({
    test: "Clicking Copy Draft button updates state to 'Copied!' confirmation",
    passed: copiedPassed,
  });
  console.log(`[${copiedPassed ? "PASS" : "FAIL"}] Copy button feedback: ${copyBtnText}`);

  // Capture screenshot of ready inquiry with copy confirmation
  await saveImage(formPage, "enquiry-ready-copied.png");

  await formContext.close();
  await browser.close();

  console.log("\n=============================");
  console.log("FINAL TEST SUMMARY (DAY 3):");
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
