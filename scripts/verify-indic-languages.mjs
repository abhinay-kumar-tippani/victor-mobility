import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3000/india";
const SCREENSHOT_DIR = path.resolve("docs/screenshots");

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runVerification() {
  console.log("🚀 Starting Comprehensive Indic Languages Verification (kn, ta, ma)...");
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
    // ----------------------------------------------------
    // TEST 1: Language Selector Options and Exact Order
    // ----------------------------------------------------
    console.log("\n--- TEST 1: Language Selector Options & Order ---");
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL, { waitUntil: "networkidle" });

    const switcherTrigger = page.locator("#desktop-language-switcher");
    await switcherTrigger.waitFor({ state: "visible" });
    await switcherTrigger.click();

    const dropdownMenu = page.locator("#desktop-language-switcher-menu");
    await dropdownMenu.waitFor({ state: "visible" });

    const options = await page.locator('#desktop-language-switcher-menu [role="option"]').all();
    assert(options.length === 6, `Selector contains exactly 6 options (got ${options.length})`);

    const expectedLocales = [
      { code: "en", native: "English" },
      { code: "hi", native: "हिन्दी" },
      { code: "te", native: "తెలుగు" },
      { code: "kn", native: "ಕನ್ನಡ" },
      { code: "ta", native: "தமிழ்" },
      { code: "ma", native: "മലയാളം" },
    ];

    for (let i = 0; i < expectedLocales.length; i++) {
      const optText = await options[i].innerText();
      const exp = expectedLocales[i];
      assert(
        optText.includes(exp.native),
        `Option ${i + 1} has native name '${exp.native}' (got '${optText.replace(/\n/g, " ")}')`
      );
    }

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "lang-selector-all-options.png"),
      fullPage: false,
    });

    // Test Escape to close
    await page.keyboard.press("Escape");
    await dropdownMenu.waitFor({ state: "hidden" });
    assert(await dropdownMenu.isHidden(), "Desktop dropdown closes on Escape");

    // ----------------------------------------------------
    // TEST 2: Kannada (kn) Validation Across Site
    // ----------------------------------------------------
    console.log("\n--- TEST 2: Kannada (kn) Verification ---");
    await switcherTrigger.click();
    await page.locator("#language-option-kn").click();
    await page.waitForFunction(() => document.documentElement.lang === "kn");

    const knLang = await page.getAttribute("html", "lang");
    const knDir = await page.getAttribute("html", "dir");
    assert(knLang === "kn", `Document lang is 'kn' (got '${knLang}')`);
    assert(knDir === "ltr", `Document dir is 'ltr' (got '${knDir}')`);

    // Verify Kannada trigger text
    const knTrigger = await switcherTrigger.innerText();
    assert(knTrigger.includes("ಕನ್ನಡ"), `Trigger displays 'ಕನ್ನಡ' (got '${knTrigger}')`);

    // Verify Nav translated
    const knNavServices = await page.locator('nav[aria-label="Main Navigation"] >> text=ಸೇವೆಗಳು').count();
    const knNavFleet = await page.locator('nav[aria-label="Main Navigation"] >> text=ಫ್ಲೀಟ್').count();
    const knNavEstimator = await page.locator('nav[aria-label="Main Navigation"] >> text=ಎಸ್ಟಿಮೇಟರ್').count();
    assert(knNavServices > 0, "Navbar Services in Kannada ('ಸೇವೆಗಳು')");
    assert(knNavFleet > 0, "Navbar Fleet in Kannada ('ಫ್ಲೀಟ್')");
    assert(knNavEstimator > 0, "Navbar Estimator in Kannada ('ಎಸ್ಟಿಮೇಟರ್')");

    // Verify Hero & Tagline
    const pageContentKn = await page.content();
    assert(pageContentKn.includes("On Time Every Time."), "Tagline 'On Time Every Time.' strictly preserved in Kannada view");
    assert(pageContentKn.includes("ಉದ್ಯೋಗಿ ಸಾರಿಗೆ"), "Hero employee transportation in Kannada ('ಉದ್ಯೋಗಿ ಸಾರಿಗೆ')");

    // Verify Safety section in Kannada
    assert(pageContentKn.includes("ಸುರಕ್ಷತೆಗೆ ಮೊದಲ ಆದ್ಯತೆ"), "Safety section heading in Kannada ('ಸುರಕ್ಷತೆಗೆ ಮೊದಲ ಆದ್ಯತೆ')");

    // Capture Kannada desktop screenshot
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "lang-kn-desktop.png"),
      fullPage: false,
    });

    // ----------------------------------------------------
    // TEST 3: Tamil (ta) Validation Across Site
    // ----------------------------------------------------
    console.log("\n--- TEST 3: Tamil (ta) Verification ---");
    await switcherTrigger.click();
    await page.locator("#language-option-ta").click();
    await page.waitForFunction(() => document.documentElement.lang === "ta");

    const taLang = await page.getAttribute("html", "lang");
    const taDir = await page.getAttribute("html", "dir");
    assert(taLang === "ta", `Document lang is 'ta' (got '${taLang}')`);
    assert(taDir === "ltr", `Document dir is 'ltr' (got '${taDir}')`);

    const taTrigger = await switcherTrigger.innerText();
    assert(taTrigger.includes("தமிழ்"), `Trigger displays 'தமிழ்' (got '${taTrigger}')`);

    const taNavServices = await page.locator('nav[aria-label="Main Navigation"] >> text=சேவைகள்').count();
    const taNavFleet = await page.locator('nav[aria-label="Main Navigation"] >> text=வாகனங்கள்').count();
    assert(taNavServices > 0, "Navbar Services in Tamil ('சேவைகள்')");
    assert(taNavFleet > 0, "Navbar Fleet in Tamil ('வாகனங்கள்')");

    const pageContentTa = await page.content();
    assert(pageContentTa.includes("On Time Every Time."), "Tagline 'On Time Every Time.' strictly preserved in Tamil view");
    assert(pageContentTa.includes("பணியாளர் போக்குவரத்து"), "Hero employee transportation in Tamil ('பணியாளர் போக்குவரத்து')");
    assert(pageContentTa.includes("பாதுகாப்பே முதன்மையான முன்னுரிமை"), "Safety section heading in Tamil ('பாதுகாப்பே முதன்மையான முன்னுரிமை')");

    // Capture Tamil desktop screenshot
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "lang-ta-desktop.png"),
      fullPage: false,
    });

    // ----------------------------------------------------
    // TEST 4: Malayalam (ma) Validation Across Site
    // ----------------------------------------------------
    console.log("\n--- TEST 4: Malayalam (ma) Verification ---");
    await switcherTrigger.click();
    await page.locator("#language-option-ma").click();
    await page.waitForFunction(() => document.documentElement.lang === "ma");

    const maLang = await page.getAttribute("html", "lang");
    const maDir = await page.getAttribute("html", "dir");
    assert(maLang === "ma", `Document lang is 'ma' (got '${maLang}')`);
    assert(maDir === "ltr", `Document dir is 'ltr' (got '${maDir}')`);

    const maTrigger = await switcherTrigger.innerText();
    assert(maTrigger.includes("മലയാളം"), `Trigger displays 'മലയാളം' (got '${maTrigger}')`);

    const maNavServices = await page.locator('nav[aria-label="Main Navigation"] >> text=സേവനങ്ങൾ').count();
    const maNavFleet = await page.locator('nav[aria-label="Main Navigation"] >> text=ഫ്ലീറ്റ്').count();
    assert(maNavServices > 0, "Navbar Services in Malayalam ('സേവനങ്ങൾ')");
    assert(maNavFleet > 0, "Navbar Fleet in Malayalam ('ഫ്ലീറ്റ്')");

    const pageContentMa = await page.content();
    assert(pageContentMa.includes("On Time Every Time."), "Tagline 'On Time Every Time.' strictly preserved in Malayalam view");
    assert(pageContentMa.includes("ജീവനക്കാരുടെ ഗതാഗതം"), "Hero employee transportation in Malayalam ('ജീവനക്കാരുടെ ഗതാഗതം')");
    assert(pageContentMa.includes("സുരക്ഷയ്ക്കാണ് പ്രഥമ പരിഗണന"), "Safety section heading in Malayalam ('സുരക്ഷയ്ക്കാണ് പ്രഥമ പരിഗണന')");

    // Capture Malayalam desktop screenshot
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "lang-ma-desktop.png"),
      fullPage: false,
    });

    // ----------------------------------------------------
    // TEST 5: State Preservation on Language Switch
    // ----------------------------------------------------
    console.log("\n--- TEST 5: Form & Interaction State Preservation ---");
    // Test on /india/contact
    await page.goto("http://localhost:3000/india/contact", { waitUntil: "networkidle" });
    const nameInput = page.locator("#enquiry-name-input");
    await nameInput.waitFor({ state: "visible" });
    await nameInput.fill("Ananya Sharma");
    const companyInput = page.locator("#enquiry-company-input");
    await companyInput.fill("Wipro Technologies");

    // Switch from Malayalam to Kannada
    await page.locator("#desktop-language-switcher").click();
    await page.locator("#language-option-kn").click();
    await page.waitForFunction(() => document.documentElement.lang === "kn");

    const preservedNameKn = await nameInput.inputValue();
    const preservedCompanyKn = await companyInput.inputValue();
    assert(preservedNameKn === "Ananya Sharma", `Contact form name preserved after kn switch ('${preservedNameKn}')`);
    assert(preservedCompanyKn === "Wipro Technologies", `Contact form company preserved after kn switch ('${preservedCompanyKn}')`);

    // Verify WhatsApp draft preview reflects Kannada
    const draftPreviewKn = await page.locator('pre[aria-label="WhatsApp message preview"]').innerText();
    assert(draftPreviewKn.includes("Ananya Sharma"), "WhatsApp draft contains entered user name");
    assert(draftPreviewKn.includes("ಸಾರಿಗೆ ಅಗತ್ಯ ವಿಚಾರಣೆ"), "WhatsApp draft header translated to Kannada ('ಸಾರಿಗೆ ಅಗತ್ಯ ವಿಚಾರಣೆ')");

    // Switch to Tamil
    await page.locator("#desktop-language-switcher").click();
    await page.locator("#language-option-ta").click();
    await page.waitForFunction(() => document.documentElement.lang === "ta");

    const preservedNameTa = await nameInput.inputValue();
    assert(preservedNameTa === "Ananya Sharma", "Contact form name preserved after ta switch");
    const draftPreviewTa = await page.locator('pre[aria-label="WhatsApp message preview"]').innerText();
    assert(draftPreviewTa.includes("போக்குவரத்து தேவை விசாரணை"), "WhatsApp draft header translated to Tamil ('போக்குவரத்து தேவை விசாரணை')");

    // Switch to Malayalam
    await page.locator("#desktop-language-switcher").click();
    await page.locator("#language-option-ma").click();
    await page.waitForFunction(() => document.documentElement.lang === "ma");

    const preservedNameMa = await nameInput.inputValue();
    assert(preservedNameMa === "Ananya Sharma", "Contact form name preserved after ma switch");
    const draftPreviewMa = await page.locator('pre[aria-label="WhatsApp message preview"]').innerText();
    assert(draftPreviewMa.includes("ഗതാഗത ആവശ്യ വിവരങ്ങൾ"), "WhatsApp draft header translated to Malayalam ('ഗതാഗത ആവശ്യ വിവരങ്ങൾ')");

    // ----------------------------------------------------
    // TEST 6: Other Routes (Services, Fleet, Estimator, RFP, FAQ)
    // ----------------------------------------------------
    console.log("\n--- TEST 6: Route Traversal with Indic Languages ---");

    // Check Fleet page in Kannada
    await page.goto("http://localhost:3000/india/fleet", { waitUntil: "networkidle" });
    await page.locator("#desktop-language-switcher").click();
    await page.locator("#language-option-kn").click();
    await page.waitForFunction(() => document.documentElement.lang === "kn");

    const fleetTextKn = await page.locator("body").innerText();
    assert(fleetTextKn.includes("ಸೆಡಾನ್") || fleetTextKn.includes("ಫ್ಲೀಟ್"), "Fleet page has Kannada category names");
    assert(fleetTextKn.includes("Swift Dzire") || fleetTextKn.includes("Innova Crysta"), "Vehicle models preserved verbatim");
    assert(fleetTextKn.includes("₹2,200"), "Fleet sample price ₹2,200 preserved");

    // Check Estimator page in Tamil
    await page.goto("http://localhost:3000/india/estimator", { waitUntil: "networkidle" });
    await page.locator("#desktop-language-switcher").click();
    await page.locator("#language-option-ta").click();
    await page.waitForFunction(() => document.documentElement.lang === "ta");

    const estimatorTextTa = await page.locator("body").innerText();
    assert(estimatorTextTa.includes("மதிப்பீடு") || estimatorTextTa.includes("பயணத்தை திட்டமிடுங்கள்"), "Estimator page rendered in Tamil");

    // Check RFP page in Malayalam
    await page.goto("http://localhost:3000/india/rfp", { waitUntil: "networkidle" });
    await page.locator("#desktop-language-switcher").click();
    await page.locator("#language-option-ma").click();
    await page.waitForFunction(() => document.documentElement.lang === "ma");

    const rfpTextMa = await page.locator("body").innerText();
    assert(rfpTextMa.includes("കോർപ്പറേറ്റ് RFP ഡെസ്ക്") || rfpTextMa.includes("ടെൻഡർ"), "RFP Desk rendered in Malayalam");

    // ----------------------------------------------------
    // TEST 7: UAE Isolation & Independence
    // ----------------------------------------------------
    console.log("\n--- TEST 7: UAE Isolation & Independence ---");
    await page.goto("http://localhost:3000/uae", { waitUntil: "networkidle" });
    const uaeSwitcher = page.locator("#desktop-language-switcher");
    await uaeSwitcher.waitFor({ state: "visible" });
    await uaeSwitcher.click();

    const uaeOptions = await page.locator('#desktop-language-switcher-menu [role="option"]').allTextContents();
    console.log("UAE Dropdown options:", uaeOptions);
    assert(uaeOptions.length === 2, `UAE offers strictly 2 languages (got ${uaeOptions.length})`);
    assert(uaeOptions.some(o => o.includes("English")), "UAE has English");
    assert(uaeOptions.some(o => o.includes("العربية")), "UAE has Arabic");
    assert(!uaeOptions.some(o => o.includes("ಕನ್ನಡ")), "UAE does NOT contain Kannada");
    assert(!uaeOptions.some(o => o.includes("தமிழ்")), "UAE does NOT contain Tamil");
    assert(!uaeOptions.some(o => o.includes("മലയാളം")), "UAE does NOT contain Malayalam");

    // Switch to Arabic in UAE to verify RTL works
    await page.locator("#language-option-ar").click();
    await page.waitForFunction(() => document.documentElement.lang === "ar");
    const uaeDir = await page.getAttribute("html", "dir");
    assert(uaeDir === "rtl", `UAE Arabic document dir is 'rtl' (got '${uaeDir}')`);

    // Navigate back to India - verify India retains its separate language preference!
    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    const backToIndiaLang = await page.getAttribute("html", "lang");
    const backToIndiaDir = await page.getAttribute("html", "dir");
    console.log(`Returned to /india, document lang is '${backToIndiaLang}', dir is '${backToIndiaDir}'`);
    assert(backToIndiaLang !== "ar", "India did NOT inherit Arabic from UAE");
    assert(backToIndiaDir === "ltr", "India dir remains 'ltr'");

    // ----------------------------------------------------
    // TEST 8: Mobile Drawer & Responsive Layout (390px, 320px)
    // ----------------------------------------------------
    console.log("\n--- TEST 8: Mobile Drawer & Responsive Layout ---");
    for (const width of [768, 390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(BASE_URL, { waitUntil: "networkidle" });

      // Check horizontal overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const innerWidth = await page.evaluate(() => window.innerWidth);
      assert(scrollWidth <= innerWidth, `No horizontal overflow at ${width}px (scrollWidth: ${scrollWidth}, innerWidth: ${innerWidth})`);

      // Open mobile navigation drawer
      const menuBtn = page.locator('header button[aria-controls="mobile-navigation-drawer"]');
      await menuBtn.click();
      const mobileDrawer = page.locator("#mobile-navigation-drawer");
      await mobileDrawer.waitFor({ state: "visible" });

      // Verify all 6 languages are present in drawer grid
      const drawerLangs = ["English", "हिन्दी", "తెలుగు", "ಕನ್ನಡ", "தமிழ்", "മലയാളം"];
      for (const dl of drawerLangs) {
        const btn = mobileDrawer.locator(`button:has-text("${dl}")`);
        assert(await btn.isVisible(), `Mobile drawer button for '${dl}' visible at ${width}px`);
      }

      if (width === 390) {
        // Screenshot of the 2-row 3-column drawer grid
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, "lang-mobile-drawer-grid.png"),
          fullPage: false,
        });

        // Switch to Kannada from drawer
        await mobileDrawer.locator('button:has-text("ಕನ್ನಡ")').click();
        await page.waitForFunction(() => document.documentElement.lang === "kn");
        await page.keyboard.press("Escape");
        await mobileDrawer.waitFor({ state: "hidden" });

        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, "lang-kn-mobile.png"),
          fullPage: false,
        });

        // Open drawer again and switch to Tamil
        await menuBtn.click();
        await mobileDrawer.waitFor({ state: "visible" });
        await mobileDrawer.locator('button:has-text("தமிழ்")').click();
        await page.waitForFunction(() => document.documentElement.lang === "ta");
        await page.keyboard.press("Escape");
        await mobileDrawer.waitFor({ state: "hidden" });

        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, "lang-ta-mobile.png"),
          fullPage: false,
        });

        // Open drawer again and switch to Malayalam
        await menuBtn.click();
        await mobileDrawer.waitFor({ state: "visible" });
        await mobileDrawer.locator('button:has-text("മലയാളം")').click();
        await page.waitForFunction(() => document.documentElement.lang === "ma");
        await page.keyboard.press("Escape");
        await mobileDrawer.waitFor({ state: "hidden" });

        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, "lang-ma-mobile.png"),
          fullPage: false,
        });
      }
    }

    // ----------------------------------------------------
    // TEST 9: Persistence Across Reload and Navigation
    // ----------------------------------------------------
    console.log("\n--- TEST 9: Persistence Across Reload & Navigation ---");
    // We are currently in Malayalam ('ma')
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000/india/about", { waitUntil: "networkidle" });
    const aboutLangMa = await page.getAttribute("html", "lang");
    assert(aboutLangMa === "ma", `Malayalam persisted navigating to /india/about (got '${aboutLangMa}')`);

    await page.reload({ waitUntil: "networkidle" });
    const reloadedLangMa = await page.getAttribute("html", "lang");
    assert(reloadedLangMa === "ma", `Malayalam persisted across hard reload (got '${reloadedLangMa}')`);

    // Reset back to English
    await page.locator("#desktop-language-switcher").click();
    await page.locator("#language-option-en").click();
    await page.waitForFunction(() => document.documentElement.lang === "en");
    assert(await page.getAttribute("html", "lang") === "en", "Reset back to English cleanly");

  } catch (err) {
    console.error("Test execution error:", err);
    errors.push(err.message);
  } finally {
    await browser.close();
  }

  console.log("\n==========================================");
  if (errors.length === 0) {
    console.log("🏆 ALL INDIC LANGUAGE TESTS PASSED! (0 errors)");
  } else {
    console.error(`💥 FAILED WITH ${errors.length} ERRORS:`);
    errors.forEach((e, idx) => console.error(`${idx + 1}. ${e}`));
    process.exit(1);
  }
}

runVerification();
