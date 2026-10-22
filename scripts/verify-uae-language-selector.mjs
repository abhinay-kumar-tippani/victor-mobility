import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3000";
const SCREENSHOT_DIR = path.resolve("docs/screenshots");

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  console.log("=== Starting Victor Mobility UAE Language Selector Verification ===\n");
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const failures = [];
  function assert(condition, message) {
    if (!condition) {
      console.error(`❌ FAIL: ${message}`);
      failures.push(message);
    } else {
      console.log(`✅ PASS: ${message}`);
    }
  }

  try {
    // -------------------------------------------------------------------------
    // TEST 1: UAE Desktop (1440px) Default State & Language Dropdown Options
    // -------------------------------------------------------------------------
    console.log("\n--- TEST 1: UAE Desktop (1440px) ---");
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/uae`, { waitUntil: "networkidle" });

    // Check lang and dir defaults
    const uaeHtmlLang = await page.getAttribute("html", "lang");
    const uaeHtmlDir = await page.getAttribute("html", "dir");
    assert(uaeHtmlLang === "en", `UAE initial lang is 'en' (got '${uaeHtmlLang}')`);
    assert(uaeHtmlDir === "ltr", `UAE initial dir is 'ltr' (got '${uaeHtmlDir}')`);

    // Check switcher trigger text
    const switcherTrigger = page.locator("#desktop-language-switcher");
    await switcherTrigger.waitFor({ state: "visible" });
    const triggerText = await switcherTrigger.innerText();
    assert(triggerText.includes("English"), `Switcher displays 'English' (got '${triggerText}')`);

    // Open dropdown
    await switcherTrigger.click();
    const dropdownMenu = page.locator("#desktop-language-switcher-menu");
    await dropdownMenu.waitFor({ state: "visible" });

    // Verify exactly 2 options: English and العربية; NO Hindi, NO Telugu
    const menuOptions = await page.locator('#desktop-language-switcher-menu [role="option"]').allTextContents();
    console.log("UAE Dropdown options:", menuOptions);
    assert(menuOptions.length === 2, `UAE dropdown offers exactly 2 options (got ${menuOptions.length})`);
    assert(menuOptions.some(o => o.includes("English")), "UAE dropdown has English");
    assert(menuOptions.some(o => o.includes("العربية")), "UAE dropdown has العربية");
    assert(!menuOptions.some(o => o.includes("हिन्दी")), "UAE dropdown does NOT have Hindi");
    assert(!menuOptions.some(o => o.includes("తెలుగు")), "UAE dropdown does NOT have Telugu");

    // Screenshot of dropdown open on UAE
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "uae-desktop-dropdown.png") });

    // Dismiss dropdown with Escape key
    await page.keyboard.press("Escape");
    await dropdownMenu.waitFor({ state: "hidden" });
    assert(true, "Dropdown dismissed with Escape key");

    // -------------------------------------------------------------------------
    // TEST 2: India Desktop (1440px) Dropdown Options (Must Retain 3 Languages)
    // -------------------------------------------------------------------------
    console.log("\n--- TEST 2: India Desktop (1440px) Dropdown ---");
    await page.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });
    const indiaTrigger = page.locator("#desktop-language-switcher");
    await indiaTrigger.click();
    const indiaDropdown = page.locator("#desktop-language-switcher-menu");
    await indiaDropdown.waitFor({ state: "visible" });

    const indiaOptions = await page.locator('#desktop-language-switcher-menu [role="option"]').allTextContents();
    console.log("India Dropdown options:", indiaOptions);
    assert(indiaOptions.length === 3, `India dropdown offers exactly 3 options (got ${indiaOptions.length})`);
    assert(indiaOptions.some(o => o.includes("English")), "India has English");
    assert(indiaOptions.some(o => o.includes("हिन्दी")), "India has Hindi");
    assert(indiaOptions.some(o => o.includes("తెలుగు")), "India has Telugu");
    assert(!indiaOptions.some(o => o.includes("العربية")), "India dropdown does NOT have Arabic");

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "india-desktop-dropdown.png") });
    await page.keyboard.press("Escape");

    // -------------------------------------------------------------------------
    // TEST 3: Root (/) Country Selector Homepage Unchanged
    // -------------------------------------------------------------------------
    console.log("\n--- TEST 3: Root (/) Country Selection Homepage ---");
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    const rootTitle = await page.title();
    assert(rootTitle.includes("Victor Mobility"), `Root title present (${rootTitle})`);
    const indiaLink = page.locator('a[href="/india"]').first();
    const uaeLink = page.locator('a[href="/uae"]').first();
    assert(await indiaLink.isVisible(), "Root has India gateway link");
    assert(await uaeLink.isVisible(), "Root has UAE gateway link");

    // -------------------------------------------------------------------------
    // TEST 4: Regional Preference Independence
    // -------------------------------------------------------------------------
    console.log("\n--- TEST 4: Separate Regional Preferences ---");
    // On India, set language to Telugu
    await page.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });
    await page.locator("#desktop-language-switcher").click();
    await page.locator('#language-option-te, #desktop-language-switcher-menu [role="option"]:has-text("తెలుగు")').click();
    await page.waitForTimeout(300);

    const indiaLangAfter = await page.getAttribute("html", "lang");
    assert(indiaLangAfter === "te", `India language is set to 'te' (got '${indiaLangAfter}')`);

    // Now navigate to UAE - it must NOT be Telugu! It should be English by default.
    await page.goto(`${BASE_URL}/uae`, { waitUntil: "networkidle" });
    const uaeLangCheck = await page.getAttribute("html", "lang");
    assert(uaeLangCheck === "en", `UAE remains 'en' when India is 'te' (got '${uaeLangCheck}')`);

    // Switch UAE to Arabic
    await page.locator("#desktop-language-switcher").click();
    await page.locator('#language-option-ar, #desktop-language-switcher-menu [role="option"]:has-text("العربية")').click();
    await page.waitForTimeout(500);

    const uaeLangAr = await page.getAttribute("html", "lang");
    const uaeDirAr = await page.getAttribute("html", "dir");
    assert(uaeLangAr === "ar", `UAE language updated to 'ar' (got '${uaeLangAr}')`);
    assert(uaeDirAr === "rtl", `UAE layout direction updated to 'rtl' (got '${uaeDirAr}')`);

    // Check that India remains Telugu when navigating back
    await page.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });
    const indiaLangCheck2 = await page.getAttribute("html", "lang");
    assert(indiaLangCheck2 === "te", `India still remembers 'te' independently (got '${indiaLangCheck2}')`);

    // Return UAE and verify it remembers Arabic
    await page.goto(`${BASE_URL}/uae`, { waitUntil: "networkidle" });
    const uaeLangCheck2 = await page.getAttribute("html", "lang");
    const uaeDirCheck2 = await page.getAttribute("html", "dir");
    assert(uaeLangCheck2 === "ar", `UAE remembers 'ar' across navigation (got '${uaeLangCheck2}')`);
    assert(uaeDirCheck2 === "rtl", `UAE retains 'rtl' direction (got '${uaeDirCheck2}')`);

    // -------------------------------------------------------------------------
    // TEST 5: Arabic UAE Page Content & RTL Integrity
    // -------------------------------------------------------------------------
    console.log("\n--- TEST 5: UAE Arabic Content & RTL Layout ---");
    // Verify Arabic translations across key sections
    const navText = await page.locator("header nav").innerText();
    assert(navText.includes("الأسطول") || navText.includes("الخدمات"), `Nav translated to Arabic`);

    const heroTitle = await page.locator("#main-content h1").innerText();
    console.log("Arabic Hero title:", heroTitle);
    assert(heroTitle.length > 5, `Hero headline rendered in Arabic`);

    // Tagline in footer or brand: must preserve exact English tagline "On Time Every Time."
    const bodyText = await page.locator("body").innerText();
    assert(bodyText.includes("On Time Every Time."), `Exact English tagline 'On Time Every Time.' preserved in Arabic layout`);

    // Check phone number has LTR isolation
    const phoneElement = page.locator('a[href^="tel:"]').first();
    const phoneSpanDir = await phoneElement.locator('[dir="ltr"]').count();
    assert(phoneSpanDir > 0, `Phone link contains dir="ltr" text container`);

    // Capture UAE Arabic Desktop Screenshot
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "uae-desktop-ar-1440.png"), fullPage: false });

    // Switch back to English to capture UAE English Desktop Screenshot
    await page.locator("#desktop-language-switcher").click();
    await page.locator('#language-option-en, #desktop-language-switcher-menu [role="option"]:has-text("English")').click();
    await page.waitForTimeout(500);
    assert((await page.getAttribute("html", "dir")) === "ltr", "Switched back to LTR English");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "uae-desktop-en-1440.png"), fullPage: false });

    // -------------------------------------------------------------------------
    // TEST 6: Mobile Drawer (390px) English & Arabic
    // -------------------------------------------------------------------------
    console.log("\n--- TEST 6: Mobile Drawer (390px) ---");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/uae`, { waitUntil: "networkidle" });

    // Open mobile menu
    const menuButton = page.locator('button[aria-controls="mobile-navigation-drawer"]');
    await menuButton.click();
    await page.waitForTimeout(400);

    // Verify mobile drawer selector has exactly 2 options: English & العربية
    const drawerSelector = page.locator("#mobile-navigation-drawer");
    await drawerSelector.waitFor({ state: "visible" });
    const mobileButtons = await drawerSelector.locator(".grid button").allTextContents();
    console.log("Mobile language buttons:", mobileButtons);
    assert(mobileButtons.length === 2, `Mobile drawer offers exactly 2 languages (got ${mobileButtons.length})`);
    assert(mobileButtons.some(b => b.includes("English")), "Mobile has English");
    assert(mobileButtons.some(b => b.includes("العربية")), "Mobile has العربية");
    assert(!mobileButtons.some(b => b.includes("हिन्दी")), "Mobile does NOT have Hindi");
    assert(!mobileButtons.some(b => b.includes("తెలుగు")), "Mobile does NOT have Telugu");

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "uae-mobile-drawer.png") });

    // Click العربية in mobile drawer
    await drawerSelector.locator('button:has-text("العربية")').click();
    await page.waitForTimeout(500);

    const mobileLangAr = await page.getAttribute("html", "lang");
    const mobileDirAr = await page.getAttribute("html", "dir");
    assert(mobileLangAr === "ar", `Mobile switched to 'ar'`);
    assert(mobileDirAr === "rtl", `Mobile switched to 'rtl'`);

    // Capture Arabic mobile screenshot
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "uae-mobile-ar-390.png") });

    // Switch back to English on mobile
    const isDrawerOpen = await page.locator('#mobile-navigation-drawer').isVisible();
    if (!isDrawerOpen) {
      await page.locator('button[aria-controls="mobile-navigation-drawer"]').click();
      await page.waitForTimeout(400);
    }
    await page.locator('#mobile-navigation-drawer button:has-text("English")').click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "uae-mobile-en-390.png") });

    // -------------------------------------------------------------------------
    // TEST 7: Responsive Viewport Overflow Check (320px, 390px, 768px, 1440px)
    // -------------------------------------------------------------------------
    console.log("\n--- TEST 7: Viewport Horizontal Overflow Check ---");
    const viewports = [
      { name: "320px (Narrow Mobile)", width: 320, height: 600 },
      { name: "390px (Standard Mobile)", width: 390, height: 844 },
      { name: "768px (Tablet)", width: 768, height: 1024 },
      { name: "1440px (Desktop)", width: 1440, height: 900 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      // Check English LTR
      await page.goto(`${BASE_URL}/uae`, { waitUntil: "networkidle" });
      const enOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth <= window.innerWidth + 1;
      });
      assert(enOverflow, `No horizontal overflow at ${vp.name} in English`);

      // Switch to Arabic RTL and check
      await page.evaluate(() => {
        localStorage.setItem("victor_locale_uae", "ar");
        document.cookie = "victor_locale_uae=ar; path=/; max-age=31536000; SameSite=Lax";
      });
      await page.goto(`${BASE_URL}/uae`, { waitUntil: "networkidle" });
      const arOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth <= window.innerWidth + 1;
      });
      assert(arOverflow, `No horizontal overflow at ${vp.name} in Arabic (RTL)`);
    }

    // -------------------------------------------------------------------------
    // TEST 8: Form State Retention on Language Switch
    // -------------------------------------------------------------------------
    console.log("\n--- TEST 8: Form State Retention ---");
    await page.setViewportSize({ width: 1440, height: 900 });
    // Switch to English first
    await page.evaluate(() => {
      localStorage.setItem("victor_locale_uae", "en");
      document.cookie = "victor_locale_uae=en; path=/; max-age=31536000; SameSite=Lax";
    });
    await page.goto(`${BASE_URL}/uae/contact`, { waitUntil: "networkidle" });

    // Fill form fields
    const testName = "Sheikh Mansoor";
    const testCompany = "Dubai Holding";
    const testRequirement = "5 VIP Mercedes S-Class needed for DIFC summit delegation arrivals";

    await page.locator("#enquiry-name-input").fill(testName);
    await page.locator("#enquiry-company-input").fill(testCompany);
    await page.locator("#enquiry-requirement-input").fill(testRequirement);

    // Switch to Arabic via language switcher
    await page.locator("#desktop-language-switcher").click();
    await page.locator('#language-option-ar, #desktop-language-switcher-menu [role="option"]:has-text("العربية")').click();
    await page.waitForTimeout(500);

    // Check that form input values are preserved!
    const nameVal = await page.locator("#enquiry-name-input").inputValue();
    const compVal = await page.locator("#enquiry-company-input").inputValue();
    const reqVal = await page.locator("#enquiry-requirement-input").inputValue();

    assert(nameVal === testName, `Full name preserved on language switch (expected '${testName}', got '${nameVal}')`);
    assert(compVal === testCompany, `Company preserved on language switch (expected '${testCompany}', got '${compVal}')`);
    assert(reqVal === testRequirement, `Requirement preserved on language switch (expected '${testRequirement}', got '${reqVal}')`);

    // Take screenshot of preserved form in Arabic
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "uae-contact-ar-preserved.png") });

  } catch (err) {
    console.error("Unexpected test error:", err);
    failures.push(`Unexpected error: ${err.message}`);
  } finally {
    await browser.close();
  }

  console.log("\n=== Test Results Summary ===");
  if (failures.length === 0) {
    console.log("🎉 ALL VERIFICATION TESTS PASSED SUCCESSFULLY! (0 failures)");
    process.exit(0);
  } else {
    console.error(`💥 ${failures.length} TEST(S) FAILED:`);
    failures.forEach((f, idx) => console.error(`  ${idx + 1}. ${f}`));
    process.exit(1);
  }
}

run();
