import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3000/india";
const SCREENSHOT_DIR = path.resolve("docs/screenshots");

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runVerification() {
  console.log("🚀 Starting Comprehensive Indic Languages Verification (kn, ta, ma, mr)...");
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
    await page.waitForTimeout(1000);

    const switcherTrigger = page.locator("#desktop-language-switcher");
    await switcherTrigger.waitFor({ state: "visible" });
    await switcherTrigger.click();

    const dropdownMenu = page.locator("#desktop-language-switcher-menu");
    await dropdownMenu.waitFor({ state: "visible" });

    const options = await page.locator('#desktop-language-switcher-menu [role="option"]').all();
    assert(options.length === 7, `Selector contains exactly 7 options (got ${options.length})`);

    const expectedLocales = [
      { code: "en", native: "English" },
      { code: "hi", native: "हिन्दी" },
      { code: "te", native: "తెలుగు" },
      { code: "kn", native: "ಕನ್ನಡ" },
      { code: "ta", native: "தமிழ்" },
      { code: "ma", native: "മലയാളം" },
      { code: "mr", native: "मराठी" },
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

    const knTrigger = await switcherTrigger.innerText();
    assert(knTrigger.includes("ಕನ್ನಡ"), `Trigger displays 'ಕನ್ನಡ' (got '${knTrigger}')`);

    const pageContentKn = await page.content();
    assert(pageContentKn.includes("On Time Every Time."), "Tagline 'On Time Every Time.' strictly preserved in Kannada view");
    assert(pageContentKn.includes("ಉದ್ಯೋಗಿ ಸಾರಿಗೆ"), "Hero employee transportation in Kannada ('ಉದ್ಯೋಗಿ ಸಾರಿಗೆ')");
    assert(pageContentKn.includes("ಸುರಕ್ಷತೆ ನಮ್ಮ ಮೊದಲ ಆದ್ಯತೆ"), "Safety section heading in Kannada ('ಸುರಕ್ಷತೆ ನಮ್ಮ ಮೊದಲ ಆದ್ಯತೆ')");

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

    const pageContentTa = await page.content();
    assert(pageContentTa.includes("On Time Every Time."), "Tagline 'On Time Every Time.' strictly preserved in Tamil view");
    assert(pageContentTa.includes("பணியாளர் போக்குவரத்து"), "Hero employee transportation in Tamil ('பணியாளர் போக்குவரத்து')");
    assert(pageContentTa.includes("பாதுகாப்பிற்கு முதலிடம்"), "Safety section heading in Tamil ('பாதுகாப்பிற்கு முதலிடம்')");

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

    const pageContentMa = await page.content();
    assert(pageContentMa.includes("On Time Every Time."), "Tagline 'On Time Every Time.' strictly preserved in Malayalam view");
    assert(pageContentMa.includes("ജീവനക്കാരുടെ ഗതാഗതം"), "Hero employee transportation in Malayalam ('ജീവനക്കാരുടെ ഗതാഗതം')");
    assert(pageContentMa.includes("സുരക്ഷയ്ക്ക് പ്രഥമ പരിഗണന"), "Safety section heading in Malayalam ('സുരക്ഷയ്ക്ക് പ്രഥമ പരിഗണന')");

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "lang-ma-desktop.png"),
      fullPage: false,
    });

    // ----------------------------------------------------
    // TEST 5: Marathi (mr) Validation Across Site
    // ----------------------------------------------------
    console.log("\n--- TEST 5: Marathi (mr) Verification ---");
    await switcherTrigger.click();
    await page.locator("#language-option-mr").click();
    await page.waitForFunction(() => document.documentElement.lang === "mr");

    const mrLang = await page.getAttribute("html", "lang");
    const mrDir = await page.getAttribute("html", "dir");
    assert(mrLang === "mr", `Document lang is 'mr' (got '${mrLang}')`);
    assert(mrDir === "ltr", `Document dir is 'ltr' (got '${mrDir}')`);

    const mrTrigger = await switcherTrigger.innerText();
    assert(mrTrigger.includes("मराठी"), `Trigger displays 'मराठी' (got '${mrTrigger}')`);

    // Verify Nav translated in Marathi
    const mrNavServices = await page.locator('nav[aria-label="Main Navigation"] >> text=सेवा').count();
    const mrNavFleet = await page.locator('nav[aria-label="Main Navigation"] >> text=फ्लीट').count();
    const mrNavEstimator = await page.locator('nav[aria-label="Main Navigation"] >> text=अंदाजबिंदू').count();
    assert(mrNavServices > 0, "Navbar Services in Marathi ('सेवा')");
    assert(mrNavFleet > 0, "Navbar Fleet in Marathi ('फ्लीट')");
    assert(mrNavEstimator > 0, "Navbar Estimator in Marathi ('अंदाजबिंदू')");

    // Verify Hero & Tagline
    const pageContentMr = await page.content();
    assert(pageContentMr.includes("On Time Every Time."), "Tagline 'On Time Every Time.' strictly preserved in Marathi view");
    assert(pageContentMr.includes("कर्मचारी वाहतूक"), "Hero employee transportation in Marathi ('कर्मचारी वाहतूक')");
    assert(pageContentMr.includes("सुरक्षेला सर्वोच्च प्राधान्य"), "Safety section heading in Marathi ('सुरक्षेला सर्वोच्च प्राधान्य')");

    // Capture Marathi desktop screenshot
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "lang-mr-desktop.png"),
      fullPage: false,
    });

    // ----------------------------------------------------
    // TEST 6: State Preservation on Language Switch
    // ----------------------------------------------------
    console.log("\n--- TEST 6: Form & Interaction State Preservation ---");
    await page.goto("http://localhost:3000/india/contact", { waitUntil: "networkidle" });
    const nameInput = page.locator("#enquiry-name-input");
    await nameInput.waitFor({ state: "visible" });
    await nameInput.fill("Ananya Sharma");
    const companyInput = page.locator("#enquiry-company-input");
    await companyInput.fill("Wipro Technologies");

    // Switch from current to Marathi
    await page.locator("#desktop-language-switcher").click();
    await page.locator("#language-option-mr").click();
    await page.waitForFunction(() => document.documentElement.lang === "mr");

    const preservedNameMr = await nameInput.inputValue();
    const preservedCompanyMr = await companyInput.inputValue();
    assert(preservedNameMr === "Ananya Sharma", `Contact form name preserved after mr switch ('${preservedNameMr}')`);
    assert(preservedCompanyMr === "Wipro Technologies", `Contact form company preserved after mr switch ('${preservedCompanyMr}')`);

    const draftPreviewMr = await page.locator('pre[aria-label="WhatsApp message preview"]').innerText();
    assert(draftPreviewMr.includes("Ananya Sharma"), "WhatsApp draft contains entered user name");
    assert(draftPreviewMr.includes("वाहतूक आवश्यकता चौकशी"), "WhatsApp draft header translated to Marathi ('वाहतूक आवश्यकता चौकशी')");

    // ----------------------------------------------------
    // TEST 7: Other Routes in Marathi
    // ----------------------------------------------------
    console.log("\n--- TEST 7: Route Traversal with Marathi ---");

    // Check Fleet page in Marathi
    await page.goto("http://localhost:3000/india/fleet", { waitUntil: "networkidle" });
    await page.locator("#desktop-language-switcher").click();
    await page.locator("#language-option-mr").click();
    await page.waitForFunction(() => document.documentElement.lang === "mr");

    const fleetTextMr = await page.locator("body").innerText();
    assert(fleetTextMr.includes("Swift Dzire") && fleetTextMr.includes("Innova Crysta"), "Vehicle models preserved verbatim on fleet page in Marathi");
    assert(fleetTextMr.includes("कोटेशन विनंती करा") || fleetTextMr.includes("चौकशी करा"), "Fleet CTA rendered in Marathi");

    // Check Estimator page in Marathi
    await page.goto("http://localhost:3000/india/estimator", { waitUntil: "networkidle" });
    await page.locator("#desktop-language-switcher").click();
    await page.locator("#language-option-mr").click();
    await page.waitForFunction(() => document.documentElement.lang === "mr");

    const estimatorTextMr = await page.locator("body").innerText();
    assert(estimatorTextMr.includes("अंदाज") || estimatorTextMr.includes("प्रवासाची योजना"), "Estimator page rendered in Marathi");

    // Check RFP page in Marathi
    await page.goto("http://localhost:3000/india/rfp", { waitUntil: "networkidle" });
    await page.locator("#desktop-language-switcher").click();
    await page.locator("#language-option-mr").click();
    await page.waitForFunction(() => document.documentElement.lang === "mr");

    const rfpTextMr = await page.locator("body").innerText();
    assert(rfpTextMr.includes("कॉर्पोरेट RFP डेस्क") || rfpTextMr.includes("निविदा"), "RFP Desk rendered in Marathi");

    // ----------------------------------------------------
    // TEST 8: UAE Isolation & Independence
    // ----------------------------------------------------
    console.log("\n--- TEST 8: UAE Isolation & Independence ---");
    await page.goto("http://localhost:3000/uae", { waitUntil: "networkidle" });
    const uaeSwitcher = page.locator("#desktop-language-switcher");
    await uaeSwitcher.waitFor({ state: "visible" });
    await uaeSwitcher.click();

    const uaeOptions = await page.locator('#desktop-language-switcher-menu [role="option"]').allTextContents();
    console.log("UAE Dropdown options:", uaeOptions);
    assert(uaeOptions.length === 2, `UAE offers strictly 2 languages (got ${uaeOptions.length})`);
    assert(uaeOptions.some(o => o.includes("English")), "UAE has English");
    assert(uaeOptions.some(o => o.includes("العربية")), "UAE has Arabic");
    assert(!uaeOptions.some(o => o.includes("मराठी")), "UAE does NOT contain Marathi");
    assert(!uaeOptions.some(o => o.includes("ಕನ್ನಡ")), "UAE does NOT contain Kannada");

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
    // TEST 9: Mobile Drawer & Responsive Layout (768px, 390px, 320px)
    // ----------------------------------------------------
    console.log("\n--- TEST 9: Mobile Drawer & Responsive Layout ---");
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

      // Verify all 7 languages are present in drawer grid
      const drawerLangs = ["English", "हिन्दी", "తెలుగు", "ಕನ್ನಡ", "தமிழ்", "മലയാളം", "मराठी"];
      for (const dl of drawerLangs) {
        const btn = mobileDrawer.locator(`button:has-text("${dl}")`);
        assert(await btn.isVisible(), `Mobile drawer button for '${dl}' visible at ${width}px`);
      }

      if (width !== 390) {
        await page.keyboard.press("Escape");
        await mobileDrawer.waitFor({ state: "hidden" });
      }

      if (width === 390) {
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, "lang-mobile-drawer-grid.png"),
          fullPage: false,
        });

        // Switch to Marathi from drawer
        await mobileDrawer.locator('button:has-text("मराठी")').click();
        await page.waitForFunction(() => document.documentElement.lang === "mr");
        await page.keyboard.press("Escape");
        await mobileDrawer.waitFor({ state: "hidden" });

        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, "lang-mr-mobile.png"),
          fullPage: false,
        });
      }
    }

    // ----------------------------------------------------
    // TEST 10: Persistence Across Reload and Navigation
    // ----------------------------------------------------
    console.log("\n--- TEST 10: Persistence Across Reload & Navigation ---");
    // We are currently in Marathi ('mr')
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000/india/about", { waitUntil: "networkidle" });
    const aboutLangMr = await page.getAttribute("html", "lang");
    assert(aboutLangMr === "mr", `Marathi persisted navigating to /india/about (got '${aboutLangMr}')`);

    await page.reload({ waitUntil: "networkidle" });
    const reloadedLangMr = await page.getAttribute("html", "lang");
    assert(reloadedLangMr === "mr", `Marathi persisted across hard reload (got '${reloadedLangMr}')`);

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
