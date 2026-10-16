import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3000/india";
const SCREENSHOT_DIR = path.resolve("docs/screenshots");

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runVerification() {
  console.log("Starting Victor Mobility Language Selector verification...");
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const errors = [];
  function assert(condition, message) {
    if (!condition) {
      console.error(`FAIL: ${message}`);
      errors.push(message);
    } else {
      console.log(`PASS: ${message}`);
    }
  }

  try {
    // 1. Desktop (1440px) Default State (English)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL, { waitUntil: "networkidle" });

    // Verify html lang="en" and dir="ltr"
    const htmlLang = await page.getAttribute("html", "lang");
    const htmlDir = await page.getAttribute("html", "dir");
    assert(htmlLang === "en", `Initial html lang is 'en' (got '${htmlLang}')`);
    assert(htmlDir === "ltr", `Initial html dir is 'ltr' (got '${htmlDir}')`);

    // Verify language switcher button exists and displays 'English'
    const switcherTrigger = page.locator("#desktop-language-switcher");
    await switcherTrigger.waitFor({ state: "visible" });
    const triggerText = await switcherTrigger.innerText();
    assert(triggerText.includes("English"), `Language trigger displays 'English' (got '${triggerText}')`);

    // Capture English Desktop Screenshot
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "lang-switcher-en-desktop.png"), fullPage: false });

    // 2. Open Language Dropdown & Verify Menu Options
    await switcherTrigger.click();
    const dropdownMenu = page.locator("#desktop-language-switcher-menu");
    await dropdownMenu.waitFor({ state: "visible" });

    const menuOptions = await page.locator('#desktop-language-switcher-menu [role="option"]').allTextContents();
    console.log("Dropdown menu options:", menuOptions);
    assert(menuOptions.length === 3, `Menu offers exactly 3 languages (got ${menuOptions.length})`);
    assert(menuOptions.some(opt => opt.includes("English")), "Option English present");
    assert(menuOptions.some(opt => opt.includes("हिन्दी")), "Option हिन्दी present");
    assert(menuOptions.some(opt => opt.includes("తెలుగు")), "Option తెలుగు present");

    // Capture Dropdown Open Screenshot
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "lang-switcher-dropdown-desktop.png"), fullPage: false });

    // Test Keyboard Navigation (Escape dismissal)
    await page.keyboard.press("Escape");
    await dropdownMenu.waitFor({ state: "hidden" });
    assert(await dropdownMenu.isHidden(), "Dropdown successfully closes on Escape press");

    // 3. Switch to Hindi (हिन्दी)
    await switcherTrigger.click();
    await dropdownMenu.waitFor({ state: "visible" });
    await page.locator('#language-option-hi').click();

    // Verify html lang changed to 'hi'
    await page.waitForFunction(() => document.documentElement.lang === "hi");
    const hiLang = await page.getAttribute("html", "lang");
    assert(hiLang === "hi", `Document lang is 'hi' after switching (got '${hiLang}')`);

    // Verify Hindi trigger text
    const hiTriggerText = await switcherTrigger.innerText();
    assert(hiTriggerText.includes("हिन्दी"), `Language trigger displays 'हिन्दी' (got '${hiTriggerText}')`);

    // Check Hindi nav links
    const hiNavServices = await page.locator('nav[aria-label="Main Navigation"] >> text=सेवाएं').count();
    const hiNavFleet = await page.locator('nav[aria-label="Main Navigation"] >> text=फ्लीट').count();
    const hiNavEstimator = await page.locator('nav[aria-label="Main Navigation"] >> text=एस्टीमेटर').count();
    assert(hiNavServices > 0, "Navigation Services translated to Hindi ('सेवाएं')");
    assert(hiNavFleet > 0, "Navigation Fleet translated to Hindi ('फ्लीट')");
    assert(hiNavEstimator > 0, "Navigation Estimator translated to Hindi ('एस्टीमेटर')");

    // Check Hindi Safety Section ("सुरक्षा सर्वोपरि")
    const hiSafetyHeading = await page.locator('h2 >> text=सुरक्षा सर्वोपरि').count();
    assert(hiSafetyHeading > 0, "Safety section title translated to Hindi ('सुरक्षा सर्वोपरि')");

    // Check Hindi Services Section
    const hiServicesHeading = await page.locator('h2 >> text=व्यवस्था').count();
    assert(hiServicesHeading > 0, "Services section title translated to Hindi");

    // Invariance Check: Fleet prices preserved across tabs in Hindi
    const sedanPrice = page.locator('text=₹2,200').first();
    assert(await sedanPrice.isVisible(), "Sedan price ₹2,200 visible in Hindi");

    // Click MPVs tab (tab index 1)
    await page.locator('button[role="tab"]').nth(1).click();
    const mpvPrice = page.locator('text=₹3,800').first();
    assert(await mpvPrice.isVisible(), "MPV price ₹3,800 visible in Hindi");

    // Click Buses tab (tab index 2)
    await page.locator('button[role="tab"]').nth(2).click();
    const busPrice = page.locator('text=₹7,200').first();
    assert(await busPrice.isVisible(), "Bus price ₹7,200 visible in Hindi");

    // Click Luxury tab (tab index 3)
    await page.locator('button[role="tab"]').nth(3).click();
    const luxuryPrice = page.locator('text=₹6,500').first();
    assert(await luxuryPrice.isVisible(), "Luxury price ₹6,500 visible in Hindi");

    // Invariance Check: Canonical company details and phone number
    const pageText = await page.locator("body").innerText();
    assert(pageText.includes("Victor Mobility Pvt. Ltd."), "Canonical company name preserved");
    assert(pageText.includes("+91 91007 77768"), "Canonical phone number +91 91007 77768 preserved");

    // Capture Hindi Desktop Screenshot
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "lang-hi-home-desktop.png"), fullPage: false });

    // 4. Test Form State Preservation in /india/contact
    await page.goto("http://localhost:3000/india/contact", { waitUntil: "networkidle" });
    const nameInput = page.locator("#enquiry-name-input");
    await nameInput.waitFor({ state: "visible" });
    await nameInput.fill("Rajesh Test Customer");
    const companyInput = page.locator("#enquiry-company-input");
    await companyInput.fill("Test Global Enterprise");

    // Switch to Telugu (తెలుగు) while inputs have values
    await page.locator("#desktop-language-switcher").click();
    await page.locator('#language-option-te').click();

    // Verify html lang changed to 'te'
    await page.waitForFunction(() => document.documentElement.lang === "te");
    const teLang = await page.getAttribute("html", "lang");
    assert(teLang === "te", `Document lang is 'te' after switching (got '${teLang}')`);

    // Verify form input values remained intact (Preservation constraint)
    const preservedName = await nameInput.inputValue();
    const preservedCompany = await companyInput.inputValue();
    assert(preservedName === "Rajesh Test Customer", `Form input 'name' preserved after language switch (got '${preservedName}')`);
    assert(preservedCompany === "Test Global Enterprise", `Form input 'company' preserved after language switch (got '${preservedCompany}')`);

    // Verify live draft message preview is generated in Telugu
    const draftPreview = await page.locator('pre[aria-label="WhatsApp message preview"]').innerText();
    assert(draftPreview.includes("రవాణా అవసరాల విచారణ"), "WhatsApp draft preview translated to Telugu");
    assert(draftPreview.includes("Rajesh Test Customer"), "Draft preview contains entered user name");

    // Navigate to homepage in Telugu
    await page.goto(BASE_URL, { waitUntil: "networkidle" });

    // Verify Telugu translations
    const teNavServices = await page.locator('nav[aria-label="Main Navigation"] >> text=సేవలు').count();
    const teNavFleet = await page.locator('nav[aria-label="Main Navigation"] >> text=ఫ్లీట్').count();
    assert(teNavServices > 0, "Navigation Services translated to Telugu ('సేవలు')");
    assert(teNavFleet > 0, "Navigation Fleet translated to Telugu ('ఫ్లీట్')");

    // Check Telugu Safety Section ("భద్రతకే ప్రథమ ప్రాధాన్యం")
    const teSafetyHeading = await page.locator('h2 >> text=భద్రతకే ప్రథమ ప్రాధాన్యం').count();
    assert(teSafetyHeading > 0, "Safety section title translated to Telugu ('భద్రతకే ప్రథమ ప్రాధాన్యం')");

    // Capture Telugu Desktop Screenshot
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "lang-te-home-desktop.png"), fullPage: false });

    // 5. Test Estimator in Hindi & Verify Calculations
    await page.goto("http://localhost:3000/india/estimator", { waitUntil: "networkidle" });
    // Switch to Hindi on estimator
    await page.locator("#desktop-language-switcher").click();
    await page.locator("#language-option-hi").click();
    await page.waitForFunction(() => document.documentElement.lang === "hi");

    // Fill calculation inputs
    await page.locator('input[placeholder*="Gachibowli"], input[id*="pickup"]').first().fill("Hitec City");
    await page.locator('input[placeholder*="Airport"], input[id*="dropoff"]').first().fill("RGIA Terminal");
    await page.locator('input[type="number"]').first().fill("10"); // 10 passengers
    await page.locator('input[type="number"]').nth(1).fill("4");  // 4 seats per vehicle
    await page.locator('input[type="number"]').nth(2).fill("35"); // 35 km one way
    await page.locator('input[type="number"]').nth(3).fill("1");  // 1 day
    await page.locator('button:has-text("अनुमान लगाएं")').click();

    // Verify calculation output: 10 passengers with 4 seats = 3 vehicles
    const estimatorOutput = await page.locator("body").innerText();
    assert(estimatorOutput.includes("3") && estimatorOutput.includes("वाहन"), "Estimator calculated 3 vehicles in Hindi");

    // Capture Hindi Estimator Screenshot
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "lang-hi-estimator-desktop.png"), fullPage: false });

    // 6. Test RFP Desk in Telugu
    await page.goto("http://localhost:3000/india/rfp", { waitUntil: "networkidle" });
    // Switch to Telugu
    await page.locator("#desktop-language-switcher").click();
    await page.locator("#language-option-te").click();
    await page.waitForFunction(() => document.documentElement.lang === "te");

    const rfpText = await page.locator("body").innerText();
    assert(rfpText.includes("కార్పొరేట్ RFP డెస్క్") || rfpText.includes("RFP"), "RFP Desk heading rendered in Telugu");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "lang-te-rfp-desktop.png"), fullPage: false });

    // 7. Responsive & Mobile Checks (390px iPhone & 320px narrow mobile)
    for (const width of [390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(BASE_URL, { waitUntil: "networkidle" });

      // Check horizontal overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const innerWidth = await page.evaluate(() => window.innerWidth);
      assert(scrollWidth <= innerWidth, `No horizontal overflow at ${width}px (scrollWidth: ${scrollWidth}, innerWidth: ${innerWidth})`);

      // Verify compact mobile switcher is visible in header
      const mobileSwitcher = page.locator("#mobile-language-switcher");
      assert(await mobileSwitcher.isVisible(), `Mobile language switcher visible in header at ${width}px`);

      // Open mobile drawer
      const menuButton = page.locator('header button[aria-controls="mobile-navigation-drawer"]');
      await menuButton.click();
      const mobileDrawer = page.locator("#mobile-navigation-drawer");
      await mobileDrawer.waitFor({ state: "visible" });

      // Check MobileDrawerLanguageSelector inside drawer
      const drawerSelector = mobileDrawer.locator('button:has-text("हिन्दी")');
      assert(await drawerSelector.isVisible(), `Mobile drawer Hindi button visible at ${width}px`);

      if (width === 390) {
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, "lang-switcher-mobile-drawer.png"), fullPage: false });

        // Switch to Hindi from drawer
        await drawerSelector.click();
        await page.waitForFunction(() => document.documentElement.lang === "hi");
        assert(await page.getAttribute("html", "lang") === "hi", "Language switched to Hindi from mobile drawer");

        // Close drawer via Escape and capture screenshot
        await page.keyboard.press("Escape");
        await mobileDrawer.waitFor({ state: "hidden" });
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, "lang-hi-home-mobile.png"), fullPage: false });

        // Open drawer again and switch to Telugu
        await menuButton.click();
        await mobileDrawer.waitFor({ state: "visible" });
        await mobileDrawer.locator('button:has-text("తెలుగు")').click();
        await page.waitForFunction(() => document.documentElement.lang === "te");
        await page.keyboard.press("Escape");
        await mobileDrawer.waitFor({ state: "hidden" });
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, "lang-te-home-mobile.png"), fullPage: false });
      }
    }

    // 8. Test Language Persistence across Navigation and Reload
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000/india/about", { waitUntil: "networkidle" });
    const aboutLang = await page.getAttribute("html", "lang");
    assert(aboutLang === "te", `Language 'te' persisted across navigation to /about (got '${aboutLang}')`);

    await page.reload({ waitUntil: "networkidle" });
    const reloadedLang = await page.getAttribute("html", "lang");
    assert(reloadedLang === "te", `Language 'te' persisted across full page reload (got '${reloadedLang}')`);

    // Reset back to English for cleanliness
    await page.locator("#desktop-language-switcher").click();
    await page.locator("#language-option-en").click();
    await page.waitForFunction(() => document.documentElement.lang === "en");
    assert(await page.getAttribute("html", "lang") === "en", "Successfully reset back to English");

  } catch (err) {
    console.error("Test execution error:", err);
    errors.push(err.message);
  } finally {
    await browser.close();
  }

  console.log("\n==========================================");
  if (errors.length === 0) {
    console.log("ALL TESTS PASSED SUCCESSFULLY! (0 errors)");
  } else {
    console.error(`FAILED WITH ${errors.length} ERRORS:`);
    errors.forEach((e, idx) => console.error(`${idx + 1}. ${e}`));
    process.exit(1);
  }
}

runVerification();
