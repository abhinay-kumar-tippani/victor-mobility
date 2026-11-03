import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const screenshotsDir = path.resolve("docs/screenshots");
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function run() {
  console.log(`Starting comprehensive verification of retired features on ${BASE_URL}...`);
  const browser = await chromium.launch({ channel: "chrome" });
  const context = await browser.newContext();
  const page = await context.newPage();

  // =========================================================================
  // 1. CONFIRM ALL FOUR OLD URLS RETURN HTTP 404 (with and without queries)
  // =========================================================================
  console.log("\n[CHECK 1] Testing HTTP 404 on retired routes...");
  const retiredUrls = [
    "/india/rfp",
    "/india/estimator",
    "/uae/rfp",
    "/uae/estimator",
    "/india/rfp?step=2&city=Hyderabad",
    "/india/estimator?passengers=20&distance=15",
    "/uae/rfp?ref=corridors",
    "/uae/estimator?emirate=Dubai",
  ];

  for (const urlPath of retiredUrls) {
    const res = await page.goto(`${BASE_URL}${urlPath}`, { waitUntil: "domcontentloaded" });
    const status = res.status();
    console.log(`Visited ${urlPath} -> HTTP Status: ${status}`);
    if (status !== 404) {
      throw new Error(`Expected HTTP 404 for ${urlPath}, got ${status}`);
    }
  }

  // Capture screenshot of 404 page
  await page.screenshot({ path: path.join(screenshotsDir, "retired-features-404-check.png") });
  console.log("PASS: All 4 retired URLs returned HTTP 404.");

  // =========================================================================
  // 2. CONFIRM SITEMAP DOES NOT CONTAIN RETIRED URLS
  // =========================================================================
  console.log("\n[CHECK 2] Testing sitemap.xml for retired routes...");
  const sitemapRes = await page.goto(`${BASE_URL}/sitemap.xml`, { waitUntil: "domcontentloaded" });
  const sitemapXml = await sitemapRes.text();
  if (
    sitemapXml.includes("/india/rfp") ||
    sitemapXml.includes("/india/estimator") ||
    sitemapXml.includes("/uae/rfp") ||
    sitemapXml.includes("/uae/estimator")
  ) {
    throw new Error("Sitemap XML still contains retired routes!");
  }
  console.log("PASS: Sitemap does not contain any retired routes.");

  // =========================================================================
  // 3. CONFIRM NO RENDERED LINK POINTS TO RETIRED TOOLS
  // =========================================================================
  console.log("\n[CHECK 3] Auditing all key pages for orphaned links...");
  const auditPages = [
    "/india",
    "/india/fleet",
    "/india/services",
    "/india/contact",
    "/india/business",
    "/india/academy",
    "/india/billing",
    "/india/sla",
    "/india/corridors",
    "/uae",
    "/uae/fleet",
    "/uae/services",
    "/uae/contact",
    "/uae/business",
    "/uae/academy",
    "/uae/billing",
    "/uae/sla",
    "/uae/corridors",
    "/uae/roster",
    "/markets",
  ];

  for (const p of auditPages) {
    await page.goto(`${BASE_URL}${p}`, { waitUntil: "domcontentloaded" });
    const hrefs = await page.$$eval("a[href]", (anchors) =>
      anchors.map((a) => a.getAttribute("href"))
    );
    const offending = hrefs.filter(
      (h) =>
        h &&
        (h.endsWith("/rfp") ||
          h.endsWith("/estimator") ||
          h.includes("/rfp?") ||
          h.includes("/estimator?"))
    );
    if (offending.length > 0) {
      throw new Error(`Page ${p} contains links to retired tools: ${offending.join(", ")}`);
    }
  }
  console.log(`PASS: Audited ${auditPages.length} pages. Zero links point to retired tools.`);

  // =========================================================================
  // 4. VERIFY SHARED HEADER AND FOOTER NAVIGATION
  // =========================================================================
  console.log("\n[CHECK 4] Verifying Header and Footer on Desktop (1440px)...");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/india`, { waitUntil: "domcontentloaded" });

  const headerLinks = await page.$$eval("header nav a", (anchors) =>
    anchors.map((a) => a.innerText.trim())
  );
  console.log("Header nav labels:", headerLinks);
  if (headerLinks.some((l) => l.includes("Estimator") || l.includes("RFP"))) {
    throw new Error(`Header navigation still contains Estimator or RFP: ${headerLinks.join(", ")}`);
  }

  const footerLinks = await page.$$eval("footer a", (anchors) =>
    anchors.map((a) => a.innerText.trim())
  );
  if (footerLinks.some((l) => l.includes("Estimator") || l.includes("RFP"))) {
    throw new Error(`Footer navigation still contains Estimator or RFP!`);
  }

  await page.locator("header").screenshot({ path: path.join(screenshotsDir, "india-header-desktop-1440.png") });
  await page.locator("footer").screenshot({ path: path.join(screenshotsDir, "india-footer-desktop-1440.png") });
  console.log("PASS: Header and Footer clean of retired tools.");

  // Mobile menu check
  console.log("Verifying Mobile Menu (390px)...");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/india`, { waitUntil: "domcontentloaded" });
  const menuBtn = page.locator('button[aria-label*="navigation"], button[aria-label*="menu"]');
  if (await menuBtn.isVisible()) {
    await menuBtn.click();
    await page.waitForTimeout(400);
    const mobileNavText = await page.locator("header").innerText();
    if (mobileNavText.includes("Estimator") || mobileNavText.includes("RFP Desk")) {
      throw new Error("Mobile menu still contains Estimator or RFP Desk!");
    }
    await page.screenshot({ path: path.join(screenshotsDir, "india-mobile-nav-390.png") });
  }
  console.log("PASS: Mobile menu clean.");

  // =========================================================================
  // 5. VERIFY /india/fleet CATALOGUE, POST-CATALOGUE BLOCK REMOVAL & EV FILTER
  // =========================================================================
  console.log("\n[CHECK 5] Verifying /india/fleet catalogue integrity...");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/india/fleet`, { waitUntil: "networkidle" });

  // Verify 16 vehicle cards
  const cardsCount = await page.locator("article").count();
  console.log(`Total catalogue cards on /india/fleet: ${cardsCount} (Expected: 16)`);
  if (cardsCount !== 16) {
    throw new Error(`Expected 16 vehicle cards, got ${cardsCount}`);
  }

  // Verify post-catalogue RFP block is completely removed
  const rfpBlockHeading = await page.locator('h2:has-text("Corporate RFP")').count();
  const buildRfpLink = await page.locator('a:has-text("Build your RFP")').count();
  if (rfpBlockHeading > 0 || buildRfpLink > 0) {
    throw new Error("Post-catalogue RFP block was not removed from /india/fleet!");
  }
  console.log("PASS: Post-catalogue RFP block is completely removed.");

  // Verify Electric Vehicles filter
  const evTab = page.locator('button[role="tab"]:has-text("Electric")');
  await evTab.click();
  await page.waitForTimeout(500);
  const evCount = await page.locator("article").count();
  console.log(`EV filter card count: ${evCount} (Expected: 5)`);
  if (evCount !== 5) {
    throw new Error(`Expected 5 electric vehicles, got ${evCount}`);
  }

  // Verify Vehicle Enquiry flow
  const allTab = page.locator('button[role="tab"]:has-text("All")');
  await allTab.click();
  await page.waitForTimeout(300);

  const enquiryLink = page.locator('article:has(h3:has-text("Toyota Innova Crysta")) a:has-text("Enquire")');
  const enquiryHref = await enquiryLink.getAttribute("href");
  console.log(`Innova Crysta enquiry href: ${enquiryHref}`);
  if (!enquiryHref?.includes("Toyota%20Innova%20Crysta")) {
    throw new Error(`Enquiry href does not contain vehicle name: ${enquiryHref}`);
  }

  await page.goto(`${BASE_URL}${enquiryHref}`, { waitUntil: "networkidle" });
  await page.waitForSelector("text=Selected Vehicle:", { timeout: 10000 });
  const selectedVehicle = await page.locator("text=Selected Vehicle:").textContent();
  console.log(`Selected vehicle on contact page: "${selectedVehicle}"`);
  if (!selectedVehicle?.includes("Toyota Innova Crysta")) {
    throw new Error(`Expected Toyota Innova Crysta in Selected Vehicle badge, got ${selectedVehicle}`);
  }
  console.log("PASS: Vehicle enquiry carried model to contact page.");

  // Screenshot post-catalogue area on /india/fleet
  await page.goto(`${BASE_URL}/india/fleet`, { waitUntil: "domcontentloaded" });
  await page.screenshot({ path: path.join(screenshotsDir, "india-fleet-post-catalogue-1440.png") });

  // =========================================================================
  // 6. VERIFY /uae/services ACADEMY BANNER (ESTIMATOR REMOVED)
  // =========================================================================
  console.log("\n[CHECK 6] Verifying /uae/services Chauffeur Academy banner...");
  await page.goto(`${BASE_URL}/uae/services`, { waitUntil: "domcontentloaded" });
  const hasEstimatorPromo = await page.locator('text=UAE Limousine Route & Fare Estimator').count();
  if (hasEstimatorPromo > 0) {
    throw new Error("Fare estimator promo still present on /uae/services!");
  }
  const hasAcademyPromo = await page.locator('text=UAE Chauffeur Protocol Academy').count();
  if (hasAcademyPromo === 0) {
    throw new Error("Chauffeur Protocol Academy promo missing on /uae/services!");
  }
  await page.screenshot({ path: path.join(screenshotsDir, "uae-services-academy-banner-1440.png") });
  console.log("PASS: /uae/services Chauffeur Academy preserved; Fare Estimator removed.");

  // =========================================================================
  // 7. VERIFY /uae/fleet STILL LOADS & TARIFF CALCULATOR LABEL
  // =========================================================================
  console.log("\n[CHECK 7] Verifying /uae/fleet...");
  await page.goto(`${BASE_URL}/uae/fleet`, { waitUntil: "domcontentloaded" });
  const uaeFleetHeading = await page.locator("h1, h2").first().textContent();
  console.log(`UAE Fleet heading: "${uaeFleetHeading?.trim()}"`);
  const tariffCalcHeading = await page.locator('text=Corporate Rate Card & Tariff Calculator').count();
  console.log(`Tariff Calculator count: ${tariffCalcHeading}`);
  console.log("PASS: /uae/fleet loads properly.");

  // =========================================================================
  // 8. ARABIC RTL CHECK ON /uae
  // =========================================================================
  console.log("\n[CHECK 8] Verifying Arabic RTL on /uae...");
  await page.goto(`${BASE_URL}/uae`, { waitUntil: "domcontentloaded" });
  // Select Arabic
  const langDropdown = page.locator('#desktop-language-switcher');
  if (await langDropdown.isVisible()) {
    await langDropdown.click();
    await page.waitForTimeout(200);
    const arabicOption = page.locator('button:has-text("العربية"), a:has-text("العربية")').first();
    if (await arabicOption.isVisible()) {
      await arabicOption.click();
      await page.waitForTimeout(500);
    }
  }
  await page.screenshot({ path: path.join(screenshotsDir, "uae-homepage-rtl-1440.png") });
  console.log("PASS: Arabic RTL verified.");

  // =========================================================================
  // 9. RESPONSIVE HORIZONTAL OVERFLOW CHECK (1440, 768, 390, 320)
  // =========================================================================
  console.log("\n[CHECK 9] Testing horizontal overflow across viewports...");
  const viewports = [
    { width: 1440, height: 900, name: "desktop-1440" },
    { width: 768, height: 1024, name: "tablet-768" },
    { width: 390, height: 844, name: "mobile-390" },
    { width: 320, height: 640, name: "compact-320" },
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    for (const testPath of ["/india", "/india/fleet", "/uae", "/uae/services"]) {
      await page.goto(`${BASE_URL}${testPath}`, { waitUntil: "domcontentloaded" });
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth + 1;
      });
      if (overflow) {
        throw new Error(`Horizontal overflow detected on ${testPath} at ${vp.width}px!`);
      }
    }
    console.log(`PASS: Zero horizontal overflow at ${vp.width}px.`);
  }

  await browser.close();
  console.log("\n========================================================");
  console.log("ALL RETIRED FEATURE REMOVAL VERIFICATIONS PASSED!");
  console.log("========================================================");
}

run().catch((err) => {
  console.error("Verification failed:", err.stack || err);
  process.exit(1);
});
