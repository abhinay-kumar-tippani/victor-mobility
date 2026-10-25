import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const base = process.env.BASE_URL || "http://127.0.0.1:3005";
const output = fileURLToPath(new URL("../docs/screenshots/", import.meta.url));

const browser = await chromium.launch({ channel: "msedge", headless: true });
const errors = [];

try {
  // Test both viewports
  for (const [width, locale] of [
    [1440, "en"],
    [390, "en"],
    [390, "ar"],
  ]) {
    const page = await browser.newPage({
      viewport: { width, height: width >= 1024 ? 900 : 844 },
    });
    page.on("pageerror", (err) => errors.push(err.message));
    if (locale !== "en") {
      await page.addInitScript((l) => localStorage.setItem("victor_locale_uae", l), locale);
    }

    const res = await page.goto(`${base}/uae`, { waitUntil: "networkidle" });
    assert.equal(res.status(), 200, `/uae status at ${width}px ${locale}`);
    await page.evaluate(() => document.fonts.ready);

    const main = page.locator("main");
    const mainText = await main.innerText();

    // 1. Hero Check (English only)
    if (locale === "en") {
      assert.ok(
        mainText.includes("Chauffeur & Luxury Limousine") || mainText.includes("First Class Limousine"),
        "UAE Hero must contain first-class luxury limousine headline"
      );
      assert.ok(
        !mainText.includes("Punctual daily employee commutes and dedicated tech campus"),
        "UAE Hero must NOT contain Indian campus commute subtitle"
      );
    }

    // 2. Stats Section Check (English)
    if (locale === "en") {
      assert.ok(
        mainText.includes("Logistics & Fleet") || mainText.includes("Established in"),
        "UAE stats established label"
      );
      assert.ok(
        mainText.includes("UAE Head Office") || mainText.includes("Dubai (DXB)"),
        "UAE stats office label must be Dubai / UAE Head Office"
      );
      assert.ok(!mainText.includes("India offices"), "UAE stats must NOT say India offices");
    }

    // 3. Fleet Section Check
    const fleetSection = page.locator("#fleet");
    assert.equal(await fleetSection.count(), 1, "Fleet section exists");
    
    // Check 5 Filter Tabs
    const tabs = fleetSection.locator('div[role="tablist"] button[role="tab"]');
    assert.equal(await tabs.count(), 5, "5 filter tabs present in UAE fleet");

    // Check 10 Vehicle Cards
    const cards = fleetSection.locator('article');
    assert.equal(await cards.count(), 10, "10 UAE fleet vehicle cards present");

    // Check specific UAE vehicles in English
    if (locale === "en") {
      const fleetText = await fleetSection.innerText();
      for (const vehicleName of [
        "Mercedes-Benz S-Class",
        "BMW 7 Series",
        "Mercedes-Maybach S-Class",
        "Cadillac Escalade",
        "GMC Yukon Denali",
        "Mercedes-Benz V-Class",
        "22-Seater VIP Coach",
        "44-Seater Luxury Bus",
        "Executive Electric Limousine",
        "Electric VIP Shuttle",
      ]) {
        assert.ok(fleetText.includes(vehicleName), `UAE fleet must contain ${vehicleName}`);
      }
    }

    // 4. Services Section Check
    const servicesSection = page.locator("#services");
    assert.equal(await servicesSection.count(), 1, "Services section exists");
    const serviceCards = servicesSection.locator('[data-testid^="service-card-"]');
    assert.equal(await serviceCards.count(), 6, "6 UAE service cards present");

    // Check sequential numbering 01 to 06
    for (let i = 0; i < 6; i++) {
      const cardNum = String(i + 1).padStart(2, "0");
      const cardText = await serviceCards.nth(i).innerText();
      assert.ok(cardText.includes(cardNum), `Service card ${i} must have number ${cardNum}`);
    }

    // 5. Presence Section & OfficeMapLinks Check
    const presenceSection = page.locator("#network");
    assert.equal(await presenceSection.count(), 1, "Presence section exists");
    const mapLinks = presenceSection.locator('a[href*="google.com/maps"]');
    assert.ok((await mapLinks.count()) >= 1, "Dubai office in UAE presence has Google Maps link");

    // 6. Partner Section Check
    const partnerSection = page.locator("#partners");
    assert.equal(await partnerSection.count(), 1, "Partner section exists");
    if (locale === "en") {
      const partnerText = await partnerSection.innerText();
      assert.ok(
        partnerText.includes("operating Emirate") || partnerText.includes("Victor Mobility UAE"),
        "Partner section must have UAE copy"
      );
    }

    // 7. Horizontal Overflow Check
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    assert.equal(overflow, 0, `Zero horizontal overflow at ${width}px ${locale}`);

    // Capture truthful screenshots
    if (locale === "en") {
      await page.screenshot({
        path: `${output}uae-homepage-${width}.png`,
        fullPage: true,
      });
      await fleetSection.screenshot({
        path: `${output}uae-homepage-fleet-${width}.png`,
      });
      await servicesSection.screenshot({
        path: `${output}uae-homepage-services-${width}.png`,
      });
    } else {
      await page.screenshot({
        path: `${output}uae-homepage-arabic-${width}.png`,
        fullPage: true,
      });
      await fleetSection.screenshot({
        path: `${output}uae-homepage-fleet-arabic-${width}.png`,
      });
    }

    console.log(`PASS: /uae at ${width}px (${locale}) verified successfully`);
    await page.close();
  }

  // 8. Test EV Deep Link on UAE: /uae#electric
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`${base}/uae#electric`, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    const activeTab = page.locator('#fleet button[role="tab"][aria-selected="true"]');
    const tabText = await activeTab.innerText();
    assert.ok(
      tabText.includes("Electric Vehicles") || tabText.includes("Electric"),
      "UAE deep link #electric must activate Electric Vehicles tab"
    );

    // Only electric cards shown
    const visibleCards = page.locator('#fleet article');
    assert.equal(await visibleCards.count(), 2, "Only 2 electric vehicles visible on #electric tab");

    await page.screenshot({
      path: `${output}uae-homepage-electric-deeplink-1440.png`,
    });
    console.log("PASS: /uae#electric deep linking verified successfully");
    await page.close();
  }

  // 9. Verify /india still passes completely
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const res = await page.goto(`${base}/india`, { waitUntil: "networkidle" });
    assert.equal(res.status(), 200, "/india status");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    assert.equal(overflow, 0, "Zero overflow on /india");
    await page.screenshot({
      path: `${output}india-homepage-1440.png`,
      fullPage: true,
    });
    console.log("PASS: /india at 1440px verified successfully");
    await page.close();
  }
} finally {
  await browser.close();
}

assert.equal(errors.length, 0, `Page errors encountered: ${errors.join(", ")}`);
console.log("ALL TESTS PASSED WITH 0 ERRORS!");
