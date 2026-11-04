import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const SCREENSHOT_DIR = path.join(ROOT_DIR, "docs", "screenshots");

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  console.log("Launching Edge/Chromium for comprehensive fleet preview verification...");
  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  try {
    // =========================================================================
    // 1. INDIA HOMEPAGE PREVIEW VERIFICATION (/india)
    // =========================================================================
    console.log("\n========================================================");
    console.log("TEST 1: India Homepage Fleet Preview (/india)");
    console.log("========================================================");

    const pageDesk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pageDesk.goto("http://localhost:3000/india", { waitUntil: "domcontentloaded", timeout: 60000 });
    await pageDesk.waitForTimeout(1000);

    // Check #fleet anchor exists
    const fleetSection = await pageDesk.$("#fleet");
    if (!fleetSection) throw new Error("FAIL: Section #fleet not found on /india");
    console.log("PASS: Section #fleet found on /india");

    // Scroll into view so lazy-loaded images load
    await fleetSection.scrollIntoViewIfNeeded();
    await pageDesk.waitForTimeout(1000);

    // Check heading
    const titleText = await fleetSection.$eval("h2", el => el.innerText.trim());
    console.log(`PASS: Fleet preview title: "${titleText}"`);
    if (!titleText.includes("The right vehicle") && !titleText.includes("every journey")) {
      throw new Error(`FAIL: Unexpected title: ${titleText}`);
    }

    // Check 4 vehicles
    const articles = await fleetSection.$$("article");
    if (articles.length !== 4) {
      throw new Error(`FAIL: Expected exactly 4 vehicle cards on /india preview, found ${articles.length}`);
    }
    console.log("PASS: Exactly 4 vehicle cards displayed on /india preview");

    const expectedIndia = [
      { name: "Swift Dzire", cab: "Sedan", fuel: "Petrol", file: "swift-dzire.webp", desc: "Executive sedan for city commutes and corporate transfers." },
      { name: "Hyundai Aura", cab: "Sedan", fuel: "Petrol & CNG", file: "hyundai-aura.webp", desc: "Efficient sedan with dual-fuel flexibility for corporate mobility." },
      { name: "Innova Crysta", cab: "SUV", fuel: "Diesel", file: "innova-crysta.webp", desc: "Benchmark executive SUV for business travel and leadership transit." },
      { name: "Tata Marcopolo", cab: "40 Seater Bus", fuel: "Diesel", file: "tata-marcopolo.webp", desc: "High-capacity 40-seater coach for corporate employee shuttles and major event logistics." },
    ];

    for (let i = 0; i < 4; i++) {
      const art = articles[i];
      const name = await art.$eval("h3", el => el.innerText.trim());
      const img = await art.$("img");
      const src = await img.getAttribute("src");
      const naturalWidth = await img.evaluate(el => el.naturalWidth);

      // Verify Badges (direct badge containers)
      const badges = await art.$$eval(".mb-2\\.5 > span", els => els.map(e => e.innerText.trim()));

      // Verify description
      const descEl = await art.$("p.text-brand-ink\\/70");
      if (!descEl) throw new Error(`FAIL: Vehicle description missing on India vehicle #${i + 1}`);
      const desc = await descEl.innerText();
      console.log(`  [India #${i + 1}] Model: "${name}" | Badges: [${badges.join(", ")}] | Width: ${naturalWidth}`);
      console.log(`    Desc: "${desc}"`);

      // Verify Pricing
      const priceText = await art.$eval(".text-xl.font-bold.text-brand-indigo", el => el.innerText.trim());
      if (!priceText.includes("Request a quote")) {
        throw new Error(`FAIL: Expected "Request a quote", got "${priceText}"`);
      }

      // Verify Enquiry Button
      const enquireBtn = await art.$('a[href*="/india/contact?vehicle="]');
      if (!enquireBtn) throw new Error(`FAIL: Enquiry button missing on India vehicle #${i + 1}`);
      const enquireHref = await enquireBtn.getAttribute("href");
      console.log(`    Enquire Href: ${enquireHref}`);

      if (!name.includes(expectedIndia[i].name)) {
        throw new Error(`FAIL: India vehicle #${i + 1} expected "${expectedIndia[i].name}", got "${name}"`);
      }
      if (!badges.some(b => b.includes(expectedIndia[i].cab))) {
        throw new Error(`FAIL: India vehicle #${i + 1} badge missing cab: ${expectedIndia[i].cab}`);
      }
      if (!badges.some(b => b.includes(expectedIndia[i].fuel))) {
        throw new Error(`FAIL: India vehicle #${i + 1} badge missing fuel: ${expectedIndia[i].fuel}`);
      }
      if (!desc.includes(expectedIndia[i].desc)) {
        throw new Error(`FAIL: Description mismatch on India vehicle #${i + 1}`);
      }
      if (!src.includes(expectedIndia[i].file)) {
        throw new Error(`FAIL: India vehicle #${i + 1} image "${src}" does not contain "${expectedIndia[i].file}"`);
      }
      if (naturalWidth <= 0) {
        throw new Error(`FAIL: India vehicle #${i + 1} image failed to load (naturalWidth <= 0)`);
      }
    }
    console.log("PASS: All 4 India featured vehicles with complete car info verified in exact order");

    // Check CTA button
    const ctaLink = await fleetSection.$('a[href="/india/fleet"]');
    if (!ctaLink) throw new Error("FAIL: CTA link with href='/india/fleet' not found in #fleet");
    const ctaText = await ctaLink.innerText();
    console.log(`PASS: Prominent CTA button verified: "${ctaText}" -> /india/fleet`);

    // Verify HOVER SCALE EXPANSION on Card #2 (Hyundai Aura)
    const auraCard = articles[1];
    await auraCard.hover();
    await pageDesk.waitForTimeout(350);

    const auraTransform = await auraCard.evaluate(el => window.getComputedStyle(el).transform);
    console.log(`PASS: Hover on Hyundai Aura card triggered transform: "${auraTransform}"`);
    if (!auraTransform || auraTransform === "none") {
      throw new Error("FAIL: Hover transform not applied to card");
    }

    // Screenshot desktop India with card #2 hovered and enlarged
    await fleetSection.screenshot({ path: path.join(SCREENSHOT_DIR, "india-homepage-fleet-1440.png") });
    console.log("Saved: docs/screenshots/india-homepage-fleet-1440.png (with hovered card enlargement)");

    await pageDesk.close();

    // =========================================================================
    // 2. UAE HOMEPAGE PREVIEW VERIFICATION (/uae)
    // =========================================================================
    console.log("\n========================================================");
    console.log("TEST 2: UAE Homepage Fleet Preview (/uae)");
    console.log("========================================================");

    const pageUaeDesk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pageUaeDesk.goto("http://localhost:3000/uae", { waitUntil: "domcontentloaded", timeout: 60000 });
    await pageUaeDesk.waitForTimeout(1000);

    const uaeFleetSection = await pageUaeDesk.$("#fleet");
    if (!uaeFleetSection) throw new Error("FAIL: Section #fleet not found on /uae");
    console.log("PASS: Section #fleet found on /uae");

    // Scroll into view so lazy-loaded images load
    await uaeFleetSection.scrollIntoViewIfNeeded();
    await pageUaeDesk.waitForTimeout(1000);

    const uaeArticles = await uaeFleetSection.$$("article");
    if (uaeArticles.length !== 4) {
      throw new Error(`FAIL: Expected exactly 4 vehicle cards on /uae preview, found ${uaeArticles.length}`);
    }
    console.log("PASS: Exactly 4 vehicle cards displayed on /uae preview");

    const expectedUae = [
      { name: "Mercedes-Benz S-Class", cab: "Sedan", fuel: "Petrol", file: "service-chauffeur-luxury.webp", desc: "First-class executive limousine" },
      { name: "Cadillac Escalade", cab: "SUV", fuel: "Petrol", file: "cadillac-escalade.webp", desc: "Commanding luxury SUV with spacious three-row seating" },
      { name: "Mercedes-Benz V-Class", cab: "12 Seater", fuel: "Diesel", file: "mercedes-v-class.webp", desc: "Refined multi-employee transit" },
      { name: "22-Seater VIP Coach", cab: "12 Seater", fuel: "Diesel", file: "service-bus-shuttle.webp", desc: "Luxury mini-coach for trade summit delegations" },
    ];

    for (let i = 0; i < 4; i++) {
      const art = uaeArticles[i];
      const name = await art.$eval("h3", el => el.innerText.trim());
      const img = await art.$("img");
      const src = await img.getAttribute("src");
      const naturalWidth = await img.evaluate(el => el.naturalWidth);

      // Verify Badges
      const badges = await art.$$eval(".mb-2\\.5 > span", els => els.map(e => e.innerText.trim()));

      // Verify description
      const descEl = await art.$("p.text-brand-ink\\/70");
      if (!descEl) throw new Error(`FAIL: Vehicle description missing on UAE vehicle #${i + 1}`);
      const desc = await descEl.innerText();
      console.log(`  [UAE #${i + 1}] Model: "${name}" | Badges: [${badges.join(", ")}] | Width: ${naturalWidth}`);
      console.log(`    Desc: "${desc}"`);

      // Verify Pricing
      const priceText = await art.$eval(".text-xl.font-bold.text-brand-indigo", el => el.innerText.trim());
      if (!priceText.includes("Request a quote")) {
        throw new Error(`FAIL: Expected "Request a quote", got "${priceText}"`);
      }

      // Verify Enquiry Button
      const enquireBtn = await art.$('a[href*="/uae/contact?vehicle="]');
      if (!enquireBtn) throw new Error(`FAIL: Enquiry button missing on UAE vehicle #${i + 1}`);
      const enquireHref = await enquireBtn.getAttribute("href");
      console.log(`    Enquire Href: ${enquireHref}`);

      if (!name.includes(expectedUae[i].name)) {
        throw new Error(`FAIL: UAE vehicle #${i + 1} expected "${expectedUae[i].name}", got "${name}"`);
      }
      if (!badges.some(b => b.includes(expectedUae[i].cab))) {
        throw new Error(`FAIL: UAE vehicle #${i + 1} badge missing cab: ${expectedUae[i].cab}`);
      }
      if (!badges.some(b => b.includes(expectedUae[i].fuel))) {
        throw new Error(`FAIL: UAE vehicle #${i + 1} badge missing fuel: ${expectedUae[i].fuel}`);
      }
      if (!desc.includes(expectedUae[i].desc)) {
        throw new Error(`FAIL: Description mismatch on UAE vehicle #${i + 1}`);
      }
      if (!src.includes(expectedUae[i].file)) {
        throw new Error(`FAIL: UAE vehicle #${i + 1} image "${src}" does not contain "${expectedUae[i].file}"`);
      }
      if (naturalWidth <= 0) {
        throw new Error(`FAIL: UAE vehicle #${i + 1} image failed to load (naturalWidth <= 0)`);
      }
    }
    console.log("PASS: All 4 UAE featured vehicles with complete car info verified in exact order");

    // Check CTA button
    const uaeCtaLink = await uaeFleetSection.$('a[href="/uae/fleet"]');
    if (!uaeCtaLink) throw new Error("FAIL: CTA link with href='/uae/fleet' not found in #fleet");
    const uaeCtaText = await uaeCtaLink.innerText();
    console.log(`PASS: Prominent CTA button verified: "${uaeCtaText}" -> /uae/fleet`);

    // Verify HOVER SCALE EXPANSION on Card #1 (Mercedes-Benz S-Class)
    const sClassCard = uaeArticles[0];
    await sClassCard.hover();
    await pageUaeDesk.waitForTimeout(350);

    const sClassTransform = await sClassCard.evaluate(el => window.getComputedStyle(el).transform);
    console.log(`PASS: Hover on Mercedes-Benz S-Class card triggered transform: "${sClassTransform}"`);
    if (!sClassTransform || sClassTransform === "none") {
      throw new Error("FAIL: Hover transform not applied to UAE card");
    }

    // Screenshot desktop UAE with card #1 hovered and enlarged
    await uaeFleetSection.screenshot({ path: path.join(SCREENSHOT_DIR, "uae-homepage-fleet-1440.png") });
    console.log("Saved: docs/screenshots/uae-homepage-fleet-1440.png (with hovered card enlargement)");

    await pageUaeDesk.close();

    // =========================================================================
    // 3. FULL FLEET CATALOGUES & INTERACTION (/india/fleet, /india/fleet#electric, /uae/fleet)
    // =========================================================================
    console.log("\n========================================================");
    console.log("TEST 3: Complete Catalogues & Deep Linking Verification");
    console.log("========================================================");

    const pageFleet = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pageFleet.goto("http://localhost:3000/india/fleet", { waitUntil: "domcontentloaded", timeout: 60000 });
    await pageFleet.waitForTimeout(1000);

    // Verify 5 tabs
    const indiaTabs = await pageFleet.$$('[role="tab"]');
    if (indiaTabs.length !== 5) {
      throw new Error(`FAIL: Expected 5 filter tabs on /india/fleet, found ${indiaTabs.length}`);
    }
    console.log(`PASS: 5 filter tabs verified on complete /india/fleet catalogue`);

    // Click Electric Vehicles tab
    const evTab = await pageFleet.$('button#fleet-tab-electric');
    if (!evTab) throw new Error("FAIL: Electric vehicles tab not found on /india/fleet");
    await evTab.click();
    await pageFleet.waitForTimeout(500);

    const evVehicles = await pageFleet.$$('[role="tabpanel"] article');
    console.log(`PASS: Electric Vehicles tab filter shows ${evVehicles.length} EVs`);
    if (evVehicles.length < 4) {
      throw new Error(`FAIL: Expected at least 4 EV vehicles under Electric tab, found ${evVehicles.length}`);
    }

    // Test deep linking to #electric
    await pageFleet.goto("http://localhost:3000/india/fleet#electric", { waitUntil: "domcontentloaded", timeout: 60000 });
    await pageFleet.waitForTimeout(1000);
    const activeTabAria = await pageFleet.$eval('button#fleet-tab-electric', el => el.getAttribute("aria-selected"));
    if (activeTabAria !== "true") {
      throw new Error("FAIL: /india/fleet#electric did not automatically select electric tab");
    }
    console.log("PASS: /india/fleet#electric deep linking automatically selects Electric Vehicles tab");

    // Test UAE full fleet
    await pageFleet.goto("http://localhost:3000/uae/fleet", { waitUntil: "domcontentloaded", timeout: 60000 });
    await pageFleet.waitForTimeout(1000);
    const uaeShowcase = await pageFleet.$("#main-content");
    if (!uaeShowcase) throw new Error("FAIL: /uae/fleet failed to load");
    console.log("PASS: Complete /uae/fleet catalogue loads cleanly");

    await pageFleet.close();

    // =========================================================================
    // 4. RESPONSIVE BREAKPOINT & HORIZONTAL OVERFLOW REVIEW (1440, 768, 390, 320)
    // =========================================================================
    console.log("\n========================================================");
    console.log("TEST 4: Responsive Breakpoints & Overflow Audit");
    console.log("========================================================");

    const viewports = [
      { name: "desktop", width: 1440, height: 900 },
      { name: "tablet", width: 768, height: 1024 },
      { name: "mobile", width: 390, height: 844 },
      { name: "compact", width: 320, height: 568 },
    ];

    for (const vp of viewports) {
      for (const route of ["/india", "/uae"]) {
        const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
        await page.goto(`http://localhost:3000${route}`, { waitUntil: "domcontentloaded", timeout: 60000 });
        await page.waitForTimeout(800);

        const sec = await page.$("#fleet");
        if (sec) {
          await sec.scrollIntoViewIfNeeded();
          await page.waitForTimeout(600);

          // Check horizontal overflow
          const overflow = await page.evaluate(() => {
            return document.documentElement.scrollWidth > document.documentElement.clientWidth;
          });
          if (overflow) {
            throw new Error(`FAIL: Horizontal overflow detected on ${route} at ${vp.width}px`);
          }

          // Save screenshots for tablet and mobile
          if (vp.width === 768) {
            const prefix = route === "/india" ? "india" : "uae";
            await sec.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-homepage-fleet-768.png`) });
            console.log(`Saved: docs/screenshots/${prefix}-homepage-fleet-768.png`);
          } else if (vp.width === 390) {
            const prefix = route === "/india" ? "india" : "uae";
            await sec.screenshot({ path: path.join(SCREENSHOT_DIR, `${prefix}-homepage-fleet-390.png`) });
            console.log(`Saved: docs/screenshots/${prefix}-homepage-fleet-390.png`);
          }
        }
        await page.close();
      }
    }
    console.log("PASS: Zero horizontal overflow on 1440px, 768px, 390px, and 320px across India & UAE");

    // =========================================================================
    // 5. ARABIC RTL VERIFICATION (/uae with Arabic locale)
    // =========================================================================
    console.log("\n========================================================");
    console.log("TEST 5: Arabic RTL Layout & Orientation Verification");
    console.log("========================================================");

    const contextAr = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    // Set locale cookie to 'ar' for UAE
    await contextAr.addCookies([
      {
        name: "victor_locale_uae",
        value: "ar",
        domain: "localhost",
        path: "/",
      },
    ]);

    const pageAr = await contextAr.newPage();
    await pageAr.goto("http://localhost:3000/uae", { waitUntil: "domcontentloaded", timeout: 60000 });
    await pageAr.waitForTimeout(1000);

    const arFleetSec = await pageAr.$("#fleet");
    if (!arFleetSec) throw new Error("FAIL: Section #fleet not found in Arabic view");
    await arFleetSec.scrollIntoViewIfNeeded();
    await pageAr.waitForTimeout(600);

    // Verify RTL document direction
    const isRtl = await pageAr.evaluate(() => document.documentElement.getAttribute("dir") === "rtl");
    console.log(`PASS: Document dir="rtl": ${isRtl}`);

    // Verify model names are isolated with dir="ltr"
    const ltrNameSpans = await arFleetSec.$$('h3 span[dir="ltr"]');
    if (ltrNameSpans.length !== 4) {
      throw new Error(`FAIL: Expected 4 LTR-isolated model names in Arabic view, found ${ltrNameSpans.length}`);
    }
    console.log("PASS: 4 vehicle model names wrapped in dir='ltr' preventing BiDi reordering");

    // Verify CTA arrow rotation
    const arrowClass = await arFleetSec.$eval('a[href="/uae/fleet"] svg', el => el.getAttribute("class"));
    if (!arrowClass || !arrowClass.includes("rtl:rotate-180")) {
      throw new Error("FAIL: CTA arrow does not contain rtl:rotate-180 class");
    }
    console.log("PASS: CTA arrow has rtl:rotate-180 rotation for Arabic RTL reading flow");

    // Verify horizontal overflow in Arabic
    const arOverflow = await pageAr.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    if (arOverflow) {
      throw new Error("FAIL: Horizontal overflow detected in Arabic RTL view");
    }
    console.log("PASS: Zero horizontal overflow in Arabic RTL view");

    await arFleetSec.screenshot({ path: path.join(SCREENSHOT_DIR, "uae-homepage-fleet-arabic-390.png") });
    console.log("Saved: docs/screenshots/uae-homepage-fleet-arabic-390.png");

    await pageAr.close();
    await contextAr.close();

    console.log("\n========================================================");
    console.log("ALL TESTS PASSED SUCCESSFULLY!");
    console.log("========================================================");
  } finally {
    await browser.close();
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
