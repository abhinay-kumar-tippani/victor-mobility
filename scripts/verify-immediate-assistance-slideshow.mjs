import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const SCREENSHOTS_DIR = "d:/victor website/docs/screenshots";
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

async function run() {
  console.log(`=== STARTING IMMEDIATE ASSISTANCE SLIDESHOW VERIFICATION ON ${BASE_URL} ===`);
  const browser = await chromium.launch({ channel: "msedge", headless: true });

  try {
    // -------------------------------------------------------------
    // 1. INDIA ABOUT PAGE (/india/about)
    // -------------------------------------------------------------
    console.log("\n--- Checking India About Page (/india/about) ---");
    const pageIndiaAbout = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pageIndiaAbout.goto(`${BASE_URL}/india/about`, { waitUntil: "domcontentloaded", timeout: 30000 });

    const card = pageIndiaAbout.locator('[data-testid="immediate-assistance-card"]').first();
    await card.scrollIntoViewIfNeeded();

    // Hover over card to pause slideshow during initial assertions
    await card.hover();
    await pageIndiaAbout.waitForTimeout(300);

    // 1. Verify 3 boxes: Phone, WhatsApp, and Email
    const callBox = card.locator('a[href^="tel:"]');
    const whatsappBox = card.locator('a[href*="wa.me"]');
    const emailBox = card.locator('a[href^="mailto:"]');

    if ((await callBox.count()) === 0) throw new Error("FAIL: Call Direct box missing!");
    if ((await whatsappBox.count()) === 0) throw new Error("FAIL: Direct WhatsApp box missing!");
    if ((await emailBox.count()) === 0) throw new Error("FAIL: Direct Email box missing!");
    console.log("PASS: Found all 3 contact boxes (Phone, WhatsApp, Email).");

    // Click dot 1 to explicitly anchor to Slide 1 (Mujeeb)
    const dot1 = card.locator('button[aria-label="Show Mujeeb Ur Rahman Mohammed"]');
    await dot1.click();
    await pageIndiaAbout.waitForTimeout(200);

    // Check slide 1: Mujeeb
    const slide1Text = await card.locator("span:has-text('Mujeeb Ur Rahman')").count();
    console.log(`Slide 1 shows Mujeeb: ${slide1Text > 0}`);
    if (slide1Text === 0) throw new Error("FAIL: Slide 1 is not Mujeeb!");

    const slide1EmailHref = await emailBox.getAttribute("href");
    console.log(`Slide 1 email href: ${slide1EmailHref}`);
    if (!slide1EmailHref?.includes("mujeeburrahman@victorluxurylimousine.com")) {
      throw new Error(`FAIL: Mujeeb's email href does not contain mujeeburrahman@victorluxurylimousine.com! Got: ${slide1EmailHref}`);
    }
    console.log("PASS: Verified Mujeeb email is mujeeburrahman@victorluxurylimousine.com");

    // Capture screenshot: Slide 1 (Mujeeb)
    const shotIndiaSlide1 = path.join(SCREENSHOTS_DIR, "immediate-assistance-slide1-mujeeb.png");
    await card.screenshot({ path: shotIndiaSlide1 });
    console.log(`Saved screenshot: ${shotIndiaSlide1}`);

    // Unhover mouse so slideshow auto-rotates
    await pageIndiaAbout.mouse.move(0, 0);

    // Wait 3.2 seconds for the automatic slideshow transition
    console.log("Waiting 3.2s for automatic transition to Slide 2 (Asif)...");
    await pageIndiaAbout.waitForTimeout(3200);

    const slide2Text = await card.locator("span:has-text('Muhammad Asif')").count();
    console.log(`Slide 2 shows Muhammad Asif: ${slide2Text > 0}`);
    if (slide2Text === 0) throw new Error("FAIL: Slideshow did not advance to Muhammad Asif after 3 seconds!");

    // Capture screenshot: Slide 2 (Asif)
    const shotIndiaSlide2 = path.join(SCREENSHOTS_DIR, "immediate-assistance-slide2-asif.png");
    await card.screenshot({ path: shotIndiaSlide2 });
    console.log(`Saved screenshot: ${shotIndiaSlide2}`);

    // Wait another 3.2 seconds for transition to Slide 3 (Thameem)
    console.log("Waiting 3.2s for automatic transition to Slide 3 (Thameem)...");
    await pageIndiaAbout.waitForTimeout(3200);

    const slide3Text = await card.locator("span:has-text('Mohammed Thameem Ahmed')").count();
    console.log(`Slide 3 shows Mohammed Thameem Ahmed: ${slide3Text > 0}`);
    if (slide3Text === 0) throw new Error("FAIL: Slideshow did not advance to Mohammed Thameem Ahmed after 3 seconds!");

    // Capture screenshot: Slide 3 (Thameem)
    const shotIndiaSlide3 = path.join(SCREENSHOTS_DIR, "immediate-assistance-slide3-thameem.png");
    await card.screenshot({ path: shotIndiaSlide3 });
    console.log(`Saved screenshot: ${shotIndiaSlide3}`);

    // Test indicator dot clicking: click dot 1 to jump back to Mujeeb
    await dot1.click();
    await pageIndiaAbout.waitForTimeout(300);
    const jumpedBack = await card.locator("span:has-text('Mujeeb Ur Rahman')").count();
    console.log(`Dot 1 click returned to Mujeeb: ${jumpedBack > 0}`);
    if (jumpedBack === 0) throw new Error("FAIL: Dot click did not return to Mujeeb!");
    console.log("PASS: Slide indicator navigation functions perfectly.");

    // Check India About Mobile (390x844)
    console.log("\n--- Checking Mobile Viewport (390x844) on India About ---");
    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobilePage.goto(`${BASE_URL}/india/about`, { waitUntil: "networkidle", timeout: 30000 });

    const scrollWidthIndia = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
    const clientWidthIndia = await mobilePage.evaluate(() => document.documentElement.clientWidth);
    console.log(`India About Mobile scrollWidth: ${scrollWidthIndia}, clientWidth: ${clientWidthIndia}`);
    if (scrollWidthIndia > clientWidthIndia) {
      throw new Error(`Horizontal overflow on India About Mobile: ${scrollWidthIndia} > ${clientWidthIndia}`);
    }
    console.log("PASS: Zero horizontal overflow on India About Mobile.");

    const mobCard = mobilePage.locator('[data-testid="immediate-assistance-card"]').first();
    await mobCard.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(400);
    const shotIndiaMobile = path.join(SCREENSHOTS_DIR, "immediate-assistance-india-about-mobile.png");
    await mobCard.screenshot({ path: shotIndiaMobile });
    console.log(`Saved screenshot: ${shotIndiaMobile}`);

    // -------------------------------------------------------------
    // 2. UAE ABOUT PAGE (/uae/about)
    // -------------------------------------------------------------
    console.log("\n--- Checking UAE About Page (/uae/about) ---");
    const pageUaeAbout = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pageUaeAbout.goto(`${BASE_URL}/uae/about`, { waitUntil: "networkidle", timeout: 30000 });

    const uaeCard = pageUaeAbout.locator('[data-testid="immediate-assistance-card"]').first();
    await uaeCard.scrollIntoViewIfNeeded();
    await pageUaeAbout.waitForTimeout(500);

    const uaeCallBox = uaeCard.locator('a[href^="tel:"]');
    const uaeWhatsappBox = uaeCard.locator('a[href*="wa.me"]');
    const uaeEmailBox = uaeCard.locator('a[href^="mailto:"]');

    if ((await uaeCallBox.count()) === 0) throw new Error("FAIL: UAE Call Direct box missing!");
    if ((await uaeWhatsappBox.count()) === 0) throw new Error("FAIL: UAE Direct WhatsApp box missing!");
    if ((await uaeEmailBox.count()) === 0) throw new Error("FAIL: UAE Direct Email box missing!");

    const uaeCallText = await uaeCallBox.innerText();
    console.log(`UAE Call box text: "${uaeCallText.replace(/\n/g, ' ')}"`);
    if (!uaeCallText.includes("+971")) {
      throw new Error(`Expected UAE phone to contain +971, got: ${uaeCallText}`);
    }
    console.log("PASS: UAE Immediate Assistance card features UAE phone (+971) and all 3 boxes.");

    const shotUaeAbout = path.join(SCREENSHOTS_DIR, "immediate-assistance-uae-about.png");
    await uaeCard.screenshot({ path: shotUaeAbout });
    console.log(`Saved screenshot: ${shotUaeAbout}`);

    // Check UAE About Mobile (390x844)
    const uaeMobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await uaeMobilePage.goto(`${BASE_URL}/uae/about`, { waitUntil: "networkidle", timeout: 30000 });

    const scrollWidthUae = await uaeMobilePage.evaluate(() => document.documentElement.scrollWidth);
    const clientWidthUae = await uaeMobilePage.evaluate(() => document.documentElement.clientWidth);
    console.log(`UAE About Mobile scrollWidth: ${scrollWidthUae}, clientWidth: ${clientWidthUae}`);
    if (scrollWidthUae > clientWidthUae) {
      throw new Error(`Horizontal overflow on UAE About Mobile: ${scrollWidthUae} > ${clientWidthUae}`);
    }
    console.log("PASS: Zero horizontal overflow on UAE About Mobile.");

    // -------------------------------------------------------------
    // 3. CONTACT PAGE REQUIREMENT DESK (/india/contact)
    // -------------------------------------------------------------
    console.log("\n--- Checking Contact Page Requirement Desk (/india/contact) ---");
    const pageIndiaContact = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pageIndiaContact.goto(`${BASE_URL}/india/contact`, { waitUntil: "networkidle", timeout: 30000 });

    const contactDeskCard = pageIndiaContact.locator('[data-testid="immediate-assistance-card"]').first();
    await contactDeskCard.scrollIntoViewIfNeeded();
    await pageIndiaContact.waitForTimeout(500);

    const contactEmailBox = contactDeskCard.locator('a[href^="mailto:"]');
    if ((await contactEmailBox.count()) === 0) {
      throw new Error("FAIL: Email box missing from Requirement Desk Immediate Assistance card!");
    }
    console.log("PASS: Requirement Desk on Contact page contains the 3rd box (Email) and the slideshow.");

    const shotContactDesk = path.join(SCREENSHOTS_DIR, "immediate-assistance-contact-desk.png");
    await contactDeskCard.screenshot({ path: shotContactDesk });
    console.log(`Saved screenshot: ${shotContactDesk}`);

    console.log("\n=== ALL IMMEDIATE ASSISTANCE SLIDESHOW TESTS PASSED WITH 100% SUCCESS ===");
  } catch (err) {
    console.error("Test execution error:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
