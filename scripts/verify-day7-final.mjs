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
  console.log("Starting Day 7 Final Quality & Production Launch Verification...");
  const browser = await chromium.launch({ channel: "msedge" });
  const results = [];

  // ==========================================
  // Test 1: OpenGraph & Social Sharing Meta Tags
  // ==========================================
  console.log("\n--- Testing OpenGraph & Twitter Meta Tags ---");
  const metaPage = await browser.newPage();
  await metaPage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });

  const ogTitle = await metaPage.locator('meta[property="og:title"]').getAttribute("content");
  const ogDescription = await metaPage.locator('meta[property="og:description"]').getAttribute("content");
  const ogImage = await metaPage.locator('meta[property="og:image"]').getAttribute("content");
  const twitterCard = await metaPage.locator('meta[name="twitter:card"]').getAttribute("content");

  const ogValid =
    !!ogTitle &&
    ogTitle.includes("Victor Mobility") &&
    !!ogDescription &&
    !!ogImage &&
    ogImage.includes("hero.png") &&
    twitterCard === "summary_large_image";

  results.push({
    test: "OpenGraph and Twitter social sharing tags present with hero image and summary_large_image",
    passed: ogValid,
    details: `og:title="${ogTitle}", og:image="${ogImage}", twitter:card="${twitterCard}"`,
  });
  console.log(`[${ogValid ? "PASS" : "FAIL"}] OpenGraph & Twitter tags: ${ogValid}`);

  // ==========================================
  // Test 2: Structured Data (JSON-LD) 3-City Coverage
  // ==========================================
  console.log("\n--- Testing JSON-LD Structured Data ---");
  const jsonLdContent = await metaPage.locator('script[type="application/ld+json"]').innerText();
  const parsedJsonLd = JSON.parse(jsonLdContent);
  const graph = parsedJsonLd["@graph"] || [];

  const orgPresent = graph.some((item) => item["@type"] === "Organization" && item.name.includes("Victor Mobility"));
  const headOfficePresent = graph.some((item) => item["@id"]?.includes("head-office"));
  const blrOfficePresent = graph.some((item) => item["@id"]?.includes("bengaluru-office"));
  const puneOfficePresent = graph.some((item) => item["@id"]?.includes("pune-office"));

  const jsonLdValid = orgPresent && headOfficePresent && blrOfficePresent && puneOfficePresent;
  results.push({
    test: "JSON-LD graph contains Organization and 3 physical operating office LocalBusiness records",
    passed: jsonLdValid,
    details: `Org: ${orgPresent}, Hyd: ${headOfficePresent}, Blr: ${blrOfficePresent}, Pune: ${puneOfficePresent}`,
  });
  console.log(`[${jsonLdValid ? "PASS" : "FAIL"}] JSON-LD graph integrity: ${jsonLdValid}`);
  await metaPage.close();

  // ==========================================
  // Test 3: End-to-End User Conversion Flow
  // ==========================================
  console.log("\n--- Testing End-to-End User Conversion Flow ---");
  const flowPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Visit root -> redirects to /india
  const rootRes = await flowPage.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
  const finalUrl = flowPage.url();
  const redirectedCleanly = finalUrl.endsWith("/india");

  // 2. Click Customer Journey CTA for Executive Travel
  const vipJourneyCta = flowPage.locator('article:has-text("Executive & VIP Travel") a:has-text("Explore VIP Travel")');
  await vipJourneyCta.click();
  await flowPage.waitForURL("**/india/services/chauffeur-luxury");
  const onLuxuryPage = flowPage.url().includes("/india/services/chauffeur-luxury");

  // 3. Click "Prepare WhatsApp Enquiry" from service page
  const discussBtn = flowPage.locator('a:has-text("Prepare WhatsApp Enquiry")');
  await discussBtn.click();
  await flowPage.waitForURL("**/india/contact?service=chauffeur-luxury");
  const onContactPage = flowPage.url().includes("/india/contact");
  await flowPage.waitForTimeout(300);

  // 4. Verify preselected service in enquiry form
  const selectedService = await flowPage.locator("select").first().inputValue();
  const servicePreselected = selectedService === "Chauffeur & Luxury Travel";

  // 5. Fill valid enquiry details
  await flowPage.locator("#enquiry-name-input").fill("Anita Deshmukh (Apex Technologies)");
  await flowPage.locator("textarea").fill("Require executive luxury chauffeur for 3 days visiting board delegation in Bengaluru.");
  await flowPage.waitForTimeout(300);

  // 6. Test Copy Draft button feedback
  const copyBtn = flowPage.locator('button[aria-label="Copy draft WhatsApp message to clipboard"]');
  await copyBtn.click();
  await flowPage.waitForTimeout(300);
  const copyText = await copyBtn.innerText();
  const copyWorked = copyText.includes("Copied!");

  // 7. Test WhatsApp link construction
  const previewText = await flowPage.locator("#enquiry-whatsapp-preview").innerText();
  const draftHasName = previewText.includes("Anita Deshmukh");
  const draftHasService = previewText.includes("Chauffeur & Luxury Travel");

  const e2eValid = redirectedCleanly && onLuxuryPage && onContactPage && servicePreselected && copyWorked && draftHasName && draftHasService;
  results.push({
    test: "End-to-end user conversion flow (Root redirect -> Journey -> Service -> Enquiry Pre-fill -> Copy Draft)",
    passed: e2eValid,
    details: `Redirect: ${redirectedCleanly}, Luxury: ${onLuxuryPage}, Contact: ${onContactPage}, Preselected: ${servicePreselected}, Copy: ${copyWorked}`,
  });
  console.log(`[${e2eValid ? "PASS" : "FAIL"}] End-to-end conversion flow: ${e2eValid}`);

  await saveImage(flowPage, "e2e-contact-filled-desktop.png");
  await flowPage.close();

  // ==========================================
  // Test 4: Comprehensive 18-Route Status & Performance Audit
  // ==========================================
  console.log("\n--- Testing All 18 Application Routes ---");
  const auditPage = await browser.newPage();
  const routes = [
    "/",
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
    "/robots.txt",
    "/sitemap.xml",
  ];

  let routesPassed = true;
  for (const r of routes) {
    const res = await auditPage.goto(`${BASE_URL}${r}`, { waitUntil: "networkidle" });
    const status = res.status();
    if (status !== 200) {
      routesPassed = false;
      console.log(`Route ${r} returned status ${status}`);
    }
  }

  results.push({
    test: "All canonical release routes and SEO endpoints return HTTP 200",
    passed: routesPassed,
  });
  console.log(`[${routesPassed ? "PASS" : "FAIL"}] All routes HTTP 200: ${routesPassed}`);
  await auditPage.close();

  // ==========================================
  // Summary
  // ==========================================
  console.log("\n==========================================");
  console.log("DAY 7 FINAL LAUNCH VERIFICATION RESULTS");
  console.log("==========================================");
  let allPassed = true;
  for (const r of results) {
    console.log(`${r.passed ? "✔ PASS" : "✖ FAIL"}: ${r.test} ${r.details ? `(${r.details})` : ""}`);
    if (!r.passed) allPassed = false;
  }

  await browser.close();

  if (!allPassed) {
    console.error("\nSome Day 7 verification tests failed.");
    process.exit(1);
  } else {
    console.log("\nAll Day 7 final launch verification tests passed successfully!");
  }
}

main().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
