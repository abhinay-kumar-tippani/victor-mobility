import { chromium } from "playwright";

async function verifyLocations() {
  console.log("🚀 Verifying Tamil Nadu, West Bengal, and Delhi Locations & Google Maps...");
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const errors = [];
  function assert(condition, message) {
    if (!condition) {
      console.error(`❌ FAIL: ${message}`);
      errors.push(message);
    } else {
      console.log(`✅ PASS: ${message}`);
    }
  }

  try {
    // 1. Check Homepage (/india) Presence Map
    console.log("\n--- Checking /india Presence Map ---");
    await page.goto("http://localhost:3000/india", { waitUntil: "networkidle" });

    // Select Chennai
    const chennaiBtn = page.locator('button:has-text("Chennai")');
    await chennaiBtn.click();
    await page.waitForTimeout(300);
    const chennaiAddress = page.locator('address:has-text("RMZ Millenia Business Park")');
    assert(await chennaiAddress.isVisible(), "Chennai address (RMZ Millenia) displayed in Presence Map");
    const chennaiGMap = page.locator('a[aria-label^="Open Chennai office in Google Maps"]');
    assert(await chennaiGMap.isVisible(), "Chennai Google Maps button visible in Presence Map");
    const chennaiGMapHref = await chennaiGMap.getAttribute("href");
    assert(chennaiGMapHref && chennaiGMapHref.includes("google.com/maps"), `Chennai Google Maps link valid: ${chennaiGMapHref}`);

    // Select Kolkata
    const kolkataBtn = page.locator('button:has-text("Kolkata")');
    await kolkataBtn.click();
    await page.waitForTimeout(300);
    const kolkataAddress = page.locator('address:has-text("Techno Polis IT Park")');
    assert(await kolkataAddress.isVisible(), "Kolkata address (Techno Polis) displayed in Presence Map");
    const kolkataGMap = page.locator('a[aria-label^="Open Kolkata office in Google Maps"]');
    assert(await kolkataGMap.isVisible(), "Kolkata Google Maps button visible in Presence Map");
    const kolkataGMapHref = await kolkataGMap.getAttribute("href");
    assert(kolkataGMapHref && kolkataGMapHref.includes("google.com/maps"), `Kolkata Google Maps link valid: ${kolkataGMapHref}`);

    // Select Delhi
    const delhiBtn = page.locator('button:has-text("Delhi")');
    await delhiBtn.click();
    await page.waitForTimeout(300);
    const delhiAddress = page.locator('address:has-text("Innov8 Okhla")');
    assert(await delhiAddress.isVisible(), "Delhi address (Innov8 Okhla) displayed in Presence Map");
    const delhiGMap = page.locator('a[aria-label^="Open Delhi office in Google Maps"]');
    assert(await delhiGMap.isVisible(), "Delhi Google Maps button visible in Presence Map");
    const delhiGMapHref = await delhiGMap.getAttribute("href");
    assert(delhiGMapHref && delhiGMapHref.includes("google.com/maps"), `Delhi Google Maps link valid: ${delhiGMapHref}`);

    // 2. Check About Page (/india/about)
    console.log("\n--- Checking /india/about Network Section ---");
    await page.goto("http://localhost:3000/india/about", { waitUntil: "networkidle" });
    const aboutContent = await page.content();
    assert(aboutContent.includes("RMZ Millenia Business Park"), "About page contains Chennai RMZ Millenia");
    assert(aboutContent.includes("Techno Polis IT Park"), "About page contains Kolkata Techno Polis");
    assert(aboutContent.includes("Innov8 Okhla"), "About page contains Delhi Innov8 Okhla");

    // 3. Check Contact Page (/india/contact)
    console.log("\n--- Checking /india/contact Offices Section ---");
    await page.goto("http://localhost:3000/india/contact", { waitUntil: "networkidle" });
    const contactOffices = page.locator("#offices");
    assert(await contactOffices.isVisible(), "Offices section rendered on /india/contact");
    const contactContent = await contactOffices.innerText();
    assert(contactContent.includes("Chennai") && contactContent.includes("RMZ Millenia"), "Contact page lists Chennai RMZ Millenia");
    assert(contactContent.includes("Kolkata") && contactContent.includes("Techno Polis"), "Contact page lists Kolkata Techno Polis");
    assert(contactContent.includes("Delhi") && contactContent.includes("Innov8 Okhla"), "Contact page lists Delhi Innov8 Okhla");

    // 4. Viewport Overflow Check (no horizontal scrollbar)
    console.log("\n--- Checking Responsive Layouts (1440px, 768px, 390px, 320px) ---");
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ["/india", "/india/about", "/india/contact"]) {
        await page.goto(`http://localhost:3000${path}`, { waitUntil: "networkidle" });
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const innerWidth = await page.evaluate(() => window.innerWidth);
        assert(scrollWidth <= innerWidth, `No overflow on ${path} at ${width}px (scroll: ${scrollWidth}, inner: ${innerWidth})`);
      }
    }

  } catch (err) {
    console.error("Test execution error:", err);
    errors.push(err.message);
  } finally {
    await browser.close();
  }

  if (errors.length === 0) {
    console.log("\n🎉 ALL LOCATION & GOOGLE MAPS VERIFICATIONS PASSED!");
  } else {
    console.error(`\n💥 FAILED WITH ${errors.length} ERRORS`);
    process.exit(1);
  }
}

verifyLocations();
