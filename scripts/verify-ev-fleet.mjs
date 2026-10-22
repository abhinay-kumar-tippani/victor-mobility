import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3000";
const outputDirs = [
  path.resolve("docs/screenshots"),
  "C:/Users/tippa/.gemini/antigravity/brain/4dc47aec-b39a-4cec-946e-5a86c9fe4d30",
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
  console.log(`[PASS] Saved screenshot: ${filename}`);
}

async function main() {
  console.log("=== STARTING VICTOR MOBILITY EV FLEET VERIFICATION SUITE ===\n");
  const browser = await chromium.launch({ channel: "msedge" });
  let passed = true;

  try {
    // -------------------------------------------------------------
    // Test 1: India Fleet Page EV Category & Interactive Tabs
    // -------------------------------------------------------------
    console.log("--- 1. Testing India Fleet (/india/fleet) ---");
    const pageDesktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pageDesktop.goto(`${BASE_URL}/india/fleet`, { waitUntil: "domcontentloaded" });
    await pageDesktop.waitForSelector('#fleet');

    // Verify initial tab is Sedans
    const sedansTab = pageDesktop.locator('button[role="tab"]:has-text("Sedans")');
    const evTab = pageDesktop.locator('button[role="tab"]:has-text("Electric Vehicles")');
    if ((await evTab.count()) === 0) {
      console.error("[FAIL] Electric Vehicles tab not found on /india/fleet");
      passed = false;
    } else {
      console.log("[PASS] Electric Vehicles tab found on /india/fleet");
    }

    // Click EV tab
    await evTab.click();
    await pageDesktop.waitForTimeout(300);

    // Verify EV Panel contents
    const panel = pageDesktop.locator('#fleet-panel-electric');
    const panelText = await panel.textContent();

    const checks = [
      { name: "Category title", ok: panelText.includes("Electric Vehicles") },
      { name: "Short introduction", ok: panelText.includes("Explore electric travel for employee commutes") },
      { name: "Journey requirements row", ok: panelText.includes("Journey requirements") && panelText.includes("Route, timings and travel frequency.") },
      { name: "Passenger requirements row", ok: panelText.includes("Passenger requirements") && panelText.includes("Number of travellers and luggage.") },
      { name: "Vehicle allocation row", ok: panelText.includes("Vehicle allocation") && panelText.includes("Confirmed during the enquiry.") },
      { name: "Pricing label", ok: panelText.includes("Request a quote") },
      { name: "Primary CTA", ok: panelText.includes("Enquire about electric vehicles") },
      { name: "Availability note", ok: panelText.includes("Vehicle options, pricing and route suitability are confirmed by our team.") },
      { name: "Illustrative caption", ok: panelText.includes("Vehicle imagery is illustrative.") },
    ];

    for (const c of checks) {
      if (c.ok) {
        console.log(`[PASS] India EV panel: ${c.name}`);
      } else {
        console.error(`[FAIL] India EV panel missing: ${c.name}`);
        passed = false;
      }
    }

    // Check CTA link destination
    const ctaLink = panel.locator('a:has-text("Enquire about electric vehicles")');
    const ctaHref = await ctaLink.getAttribute("href");
    console.log(`[INFO] India EV CTA href: ${ctaHref}`);
    if (ctaHref && ctaHref.includes("/india/contact?category=Electric%20Vehicles")) {
      console.log("[PASS] India EV CTA links to /india/contact with category=Electric%20Vehicles");
    } else {
      console.error("[FAIL] India EV CTA has unexpected href:", ctaHref);
      passed = false;
    }

    // Capture desktop India fleet screenshot
    await saveImage(pageDesktop, "ev-india-fleet-desktop.png");

    // Click another category tab to verify existing categories still work
    await sedansTab.click();
    await pageDesktop.waitForTimeout(250);
    const sedansPanelText = await pageDesktop.locator('[role="tabpanel"]').textContent();
    if (sedansPanelText.includes("Sedans") && sedansPanelText.includes("Swift Dzire")) {
      console.log("[PASS] Existing categories (Sedans) still functional on /india/fleet");
    } else {
      console.error("[FAIL] Switching back to Sedans failed");
      passed = false;
    }

    // -------------------------------------------------------------
    // Test 2: Direct hash link /india/fleet#electric
    // -------------------------------------------------------------
    console.log("\n--- 2. Testing Direct Hash Link (/india/fleet#electric) ---");
    const pageHash = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pageHash.goto(`${BASE_URL}/india/fleet#electric`, { waitUntil: "domcontentloaded" });
    await pageHash.waitForTimeout(400);

    const hashPanelText = await pageHash.locator('#fleet-panel-electric').textContent();
    if (hashPanelText.includes("Electric Vehicles") && hashPanelText.includes("Explore electric travel")) {
      console.log("[PASS] Direct #electric link selects EV category automatically on /india/fleet");
    } else {
      console.error("[FAIL] Direct #electric link did not select EV category on /india/fleet");
      passed = false;
    }

    // Verify element is not hidden beneath sticky header
    const box = await pageHash.locator('#fleet-panel-electric').boundingBox();
    if (box && box.y >= 60) {
      console.log(`[PASS] EV panel is positioned at y=${box.y}px, visible beneath sticky header (header height ~72px)`);
    } else {
      console.warn(`[WARN] EV panel bounding y=${box?.y}`);
    }
    await pageHash.close();

    // -------------------------------------------------------------
    // Test 3: Enquiry prefill flow (/india/contact?category=Electric%20Vehicles)
    // -------------------------------------------------------------
    console.log("\n--- 3. Testing Enquiry Prefill Flow ---");
    const pageContact = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pageContact.goto(`${BASE_URL}/india/contact?category=Electric%20Vehicles`, { waitUntil: "domcontentloaded" });
    await pageContact.waitForTimeout(400);

    const preferredCategoryPill = pageContact.locator('strong:has-text("Electric Vehicles")');
    if ((await preferredCategoryPill.count()) > 0) {
      console.log("[PASS] Contact form displays 'Preferred Category: Electric Vehicles' badge");
    } else {
      console.error("[FAIL] Contact form did not display Preferred Category badge");
      passed = false;
    }

    // Fill in required contact info and inspect draft
    await pageContact.locator('#enquiry-name-input').fill("Rajesh Sharma");
    await pageContact.locator('#enquiry-requirement-input').fill("Daily shift shuttle for IT workforce from Gachibowli.");
    await pageContact.waitForTimeout(200);

    const draftText = await pageContact.locator('pre').textContent();
    if (draftText && draftText.includes("*Vehicle Category:* Electric Vehicles")) {
      console.log("[PASS] WhatsApp draft contains *Vehicle Category:* Electric Vehicles");
    } else {
      console.error("[FAIL] WhatsApp draft missing vehicle category:", draftText);
      passed = false;
    }

    await saveImage(pageContact, "ev-contact-prefill.png");
    await pageContact.close();

    // -------------------------------------------------------------
    // Test 4: UAE Fleet Page EV Category & Interactive Showcase
    // -------------------------------------------------------------
    console.log("\n--- 4. Testing UAE Fleet (/uae/fleet) ---");
    const pageUae = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pageUae.goto(`${BASE_URL}/uae/fleet`, { waitUntil: "domcontentloaded" });
    await pageUae.waitForSelector('#fleet-showcase-tabs');

    const uaeEvTab = pageUae.locator('button:has-text("Electric Vehicles")');
    if ((await uaeEvTab.count()) === 0) {
      console.error("[FAIL] Electric Vehicles tab not found on /uae/fleet");
      passed = false;
    } else {
      console.log("[PASS] Electric Vehicles tab found on /uae/fleet");
    }

    await uaeEvTab.click();
    await pageUae.waitForTimeout(300);

    const uaeEvCard = pageUae.locator('#fleet-panel-electric');
    const uaeCardText = await uaeEvCard.textContent();

    const uaeChecks = [
      { name: "Title", ok: uaeCardText.includes("Electric Vehicles") },
      { name: "Introduction", ok: uaeCardText.includes("Explore electric travel for employee commutes") },
      { name: "Journey requirements row", ok: uaeCardText.includes("Journey requirements") && uaeCardText.includes("Route, timings and travel frequency.") },
      { name: "Passenger requirements row", ok: uaeCardText.includes("Passenger requirements") && uaeCardText.includes("Number of travellers and luggage.") },
      { name: "Vehicle allocation row", ok: uaeCardText.includes("Vehicle allocation") && uaeCardText.includes("Confirmed during the enquiry.") },
      { name: "Pricing label", ok: uaeCardText.includes("Request a quote") },
      { name: "Primary CTA", ok: uaeCardText.includes("Enquire about electric vehicles") },
      { name: "Availability note", ok: uaeCardText.includes("Vehicle options, pricing and route suitability are confirmed by our team.") },
    ];

    for (const c of uaeChecks) {
      if (c.ok) {
        console.log(`[PASS] UAE EV showcase: ${c.name}`);
      } else {
        console.error(`[FAIL] UAE EV showcase missing: ${c.name}`);
        passed = false;
      }
    }

    const uaeCtaLink = uaeEvCard.locator('a:has-text("Enquire about electric vehicles")');
    const uaeCtaHref = await uaeCtaLink.getAttribute("href");
    console.log(`[INFO] UAE EV CTA href: ${uaeCtaHref}`);
    if (uaeCtaHref && uaeCtaHref.includes("/uae/contact?category=Electric%20Vehicles")) {
      console.log("[PASS] UAE EV CTA stays within /uae and includes category=Electric%20Vehicles");
    } else {
      console.error("[FAIL] UAE EV CTA href unexpected:", uaeCtaHref);
      passed = false;
    }

    await saveImage(pageUae, "ev-uae-fleet-desktop.png");

    // -------------------------------------------------------------
    // Test 5: Direct hash link /uae/fleet#electric
    // -------------------------------------------------------------
    console.log("\n--- 5. Testing Direct Hash Link (/uae/fleet#electric) ---");
    const pageUaeHash = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pageUaeHash.goto(`${BASE_URL}/uae/fleet#electric`, { waitUntil: "domcontentloaded" });
    await pageUaeHash.waitForSelector('#fleet-panel-electric');
    await pageUaeHash.waitForTimeout(400);

    const uaeHashText = await pageUaeHash.locator('#fleet-panel-electric').textContent();
    if (uaeHashText.includes("Electric Vehicles")) {
      console.log("[PASS] Direct /uae/fleet#electric selects EV category");
    } else {
      console.error("[FAIL] Direct /uae/fleet#electric failed");
      passed = false;
    }
    await pageUaeHash.close();

    // -------------------------------------------------------------
    // Test 6: Localization & Arabic RTL Support
    // -------------------------------------------------------------
    console.log("\n--- 6. Testing Localization & Arabic RTL ---");
    const pageAr = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    // Pre-set UAE Arabic locale in localStorage & cookie for reliable initial hydration
    await pageAr.addInitScript(() => {
      localStorage.setItem("victor_locale_uae", "ar");
      document.cookie = "victor_locale_uae=ar; path=/";
    });
    await pageAr.goto(`${BASE_URL}/uae/fleet#electric`, { waitUntil: "domcontentloaded" });
    await pageAr.waitForSelector('#fleet-panel-electric');
    await pageAr.waitForTimeout(400);

    // Verify RTL attribute on HTML
    const dir = await pageAr.getAttribute("html", "dir");
    console.log(`[INFO] Document dir: ${dir}`);
    if (dir === "rtl") {
      console.log("[PASS] HTML dir='rtl' set correctly for Arabic");
    } else {
      console.error("[FAIL] HTML dir was not rtl, got:", dir);
      passed = false;
    }

    // Verify Arabic EV Category translation
    const arPanel = pageAr.locator('#fleet-panel-electric');
    const arText = await arPanel.textContent();
    if (arText.includes("المركبات الكهربائية") && arText.includes("استكشف التنقل الكهربائي") && arText.includes("متطلبات الرحلة")) {
      console.log("[PASS] Arabic translations render correctly in EV panel");
    } else {
      console.error("[FAIL] Arabic translations missing from EV panel:", arText);
      passed = false;
    }

    await saveImage(pageAr, "ev-uae-arabic-rtl.png");
    await pageAr.close();

    // -------------------------------------------------------------
    // Test 7: Mobile & Tablet Responsiveness (1440, 768, 390, 320)
    // -------------------------------------------------------------
    console.log("\n--- 7. Testing Responsiveness & Overflow ---");
    const viewports = [
      { name: "tablet", width: 768, height: 1024 },
      { name: "mobile-390", width: 390, height: 844 },
      { name: "mobile-320", width: 320, height: 640 },
    ];

    for (const vp of viewports) {
      const pageVp = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await pageVp.goto(`${BASE_URL}/india/fleet#electric`, { waitUntil: "domcontentloaded" });
      await pageVp.waitForTimeout(400);

      const hasOverflow = await pageVp.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      if (!hasOverflow) {
        console.log(`[PASS] No horizontal overflow at ${vp.width}px (${vp.name})`);
      } else {
        console.error(`[FAIL] Horizontal overflow detected at ${vp.width}px (${vp.name})`);
        passed = false;
      }

      if (vp.name === "mobile-390") {
        await saveImage(pageVp, "ev-india-fleet-mobile.png");
      }
      await pageVp.close();

      // Check UAE fleet mobile
      const pageUaeMobile = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await pageUaeMobile.goto(`${BASE_URL}/uae/fleet#electric`, { waitUntil: "domcontentloaded" });
      await pageUaeMobile.waitForTimeout(400);

      const uaeOverflow = await pageUaeMobile.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      if (!uaeOverflow) {
        console.log(`[PASS] UAE fleet no horizontal overflow at ${vp.width}px (${vp.name})`);
      } else {
        console.error(`[FAIL] UAE fleet horizontal overflow detected at ${vp.width}px (${vp.name})`);
        passed = false;
      }

      if (vp.name === "mobile-390") {
        await saveImage(pageUaeMobile, "ev-uae-fleet-mobile.png");
      }
      await pageUaeMobile.close();
    }

    console.log("\n=======================================================");
    if (passed) {
      console.log("=== ALL EV FLEET VERIFICATION CHECKS PASSED (100%) ===");
    } else {
      console.log("=== SOME VERIFICATION CHECKS FAILED ===");
    }
    console.log("=======================================================\n");
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("Verification suite threw an error:", err);
  process.exit(1);
});
