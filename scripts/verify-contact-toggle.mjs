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
  console.log(`=== STARTING CONTACT DESK TOGGLE VERIFICATION ON ${BASE_URL} ===`);
  const browser = await chromium.launch({ channel: "msedge", headless: true });

  try {
    // -------------------------------------------------------------
    // 1. INDIA CONTACT PAGE (/india/contact)
    // -------------------------------------------------------------
    console.log("\n--- Checking India Contact Desk (/india/contact) ---");
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`${BASE_URL}/india/contact`, { waitUntil: "networkidle", timeout: 30000 });

    // Verify the separate bottom email-enquiry section is completely removed
    const bottomEmailSection = page.locator("#email-enquiry");
    const bottomEmailCount = await bottomEmailSection.count();
    console.log(`Separate bottom email enquiry section present: ${bottomEmailCount > 0}`);
    if (bottomEmailCount > 0) {
      throw new Error("FAIL: The separate bottom email enquiry section should be removed!");
    }
    console.log("PASS: Separate bottom email enquiry section has been cleanly removed.");

    // Verify presence of toggle tabs in the Requirement Desk
    const tabWhatsapp = page.locator("#tab-whatsapp");
    const tabEmail = page.locator("#tab-email");
    if ((await tabWhatsapp.count()) === 0 || (await tabEmail.count()) === 0) {
      throw new Error("FAIL: Toggle buttons #tab-whatsapp and #tab-email not found!");
    }
    console.log("PASS: Found WhatsApp and Email toggle tabs in Requirement Desk.");

    // Default state: WhatsApp is active
    let isWhatsappSelected = await tabWhatsapp.getAttribute("aria-selected");
    console.log(`Default tab WhatsApp selected: ${isWhatsappSelected === "true"}`);

    // Verify WhatsApp submit button
    const whatsappBtn = page.locator('button[type="submit"]:has-text("Continue on WhatsApp")');
    if ((await whatsappBtn.count()) === 0) {
      throw new Error("FAIL: 'Continue on WhatsApp' button not found in WhatsApp mode!");
    }
    console.log("PASS: 'Continue on WhatsApp' button present in default WhatsApp mode.");

    // Capture screenshot of India Contact in WhatsApp mode
    const shotIndiaWhatsapp = path.join(SCREENSHOTS_DIR, "contact-india-desk-whatsapp.png");
    await page.screenshot({ path: shotIndiaWhatsapp, fullPage: false });
    console.log(`Saved screenshot: ${shotIndiaWhatsapp}`);

    // Click Email Tab
    console.log("\n--- Switching to Email mode on India Desk ---");
    await tabEmail.click();
    await page.waitForTimeout(300);

    const isEmailSelected = await tabEmail.getAttribute("aria-selected");
    console.log(`Email tab selected: ${isEmailSelected === "true"}`);

    // Verify Email mode fields: Phone, Email Address, Response pledge, Submit button
    const phoneInput = page.locator("#enquiry-phone-input");
    const emailInput = page.locator("#enquiry-email-input");
    const emailBtn = page.locator('button[type="submit"]:has-text("Send Email Enquiry")');
    const pledge = page.locator('text="We usually respond within 24 hours"');

    if ((await phoneInput.count()) === 0) throw new Error("FAIL: Phone input missing in Email mode!");
    if ((await emailInput.count()) === 0) throw new Error("FAIL: Email input missing in Email mode!");
    if ((await emailBtn.count()) === 0) throw new Error("FAIL: 'Send Email Enquiry' button missing in Email mode!");
    if ((await pledge.count()) === 0) throw new Error("FAIL: 'We usually respond within 24 hours' pledge missing!");
    console.log("PASS: All Email mode fields and commitments are properly displayed.");

    // Capture screenshot of India Contact in Email mode
    const shotIndiaEmail = path.join(SCREENSHOTS_DIR, "contact-india-desk-email.png");
    await page.screenshot({ path: shotIndiaEmail, fullPage: false });
    console.log(`Saved screenshot: ${shotIndiaEmail}`);

    // Fill the email form and submit to test end-to-end
    console.log("\n--- Testing Email Submission on India Desk ---");
    await page.fill("#enquiry-name-input", "Rajesh Sharma");
    await page.fill("#enquiry-phone-input", "+91 98765 43210");
    await page.fill("#enquiry-email-input", "rajesh.sharma@enterprise.in");
    await page.fill("#enquiry-company-input", "Infosys Technologies");
    await page.fill("#enquiry-requirement-input", "Need 4 executive sedans for airport transfers from RGIA to HITEC City.");

    await emailBtn.click();
    await page.waitForTimeout(1500);

    // Verify Success Screen
    const successHeading = page.locator(
      'text="Thank you for contacting Victor Mobility. We have received your enquiry, and a member of our team will get in touch with you soon."'
    );
    if ((await successHeading.count()) === 0) {
      throw new Error("FAIL: Confirmation message not displayed after email submission!");
    }
    console.log("PASS: Confirmation heading displayed successfully.");

    const successPledge = page.locator(
      'div:has-text("We usually respond within 24 hours")'
    );
    if ((await successPledge.count()) === 0) {
      throw new Error("FAIL: 24-hour pledge not displayed on success card!");
    }
    console.log("PASS: 24-hour pledge displayed on success card.");

    // Capture screenshot of India Contact Email Success State
    const shotIndiaSuccess = path.join(SCREENSHOTS_DIR, "contact-india-desk-success.png");
    await page.screenshot({ path: shotIndiaSuccess, fullPage: false });
    console.log(`Saved screenshot: ${shotIndiaSuccess}`);

    // Test "Send another enquiry →" reset button
    const resetBtn = page.locator('button:has-text("Send another enquiry →")');
    await resetBtn.click();
    await page.waitForTimeout(300);
    if ((await page.locator("#enquiry-name-input").count()) === 0) {
      throw new Error("FAIL: Form did not reset after clicking 'Send another enquiry'!");
    }
    console.log("PASS: 'Send another enquiry →' successfully resets back to the form.");

    // Check Mobile Viewport (390x844) for India Contact
    console.log("\n--- Checking Mobile Viewport (390x844) on India Contact ---");
    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobilePage.goto(`${BASE_URL}/india/contact`, { waitUntil: "networkidle", timeout: 30000 });

    const scrollWidthIndia = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
    const clientWidthIndia = await mobilePage.evaluate(() => document.documentElement.clientWidth);
    console.log(`India Mobile scrollWidth: ${scrollWidthIndia}, clientWidth: ${clientWidthIndia}`);
    if (scrollWidthIndia > clientWidthIndia) {
      throw new Error(`Horizontal overflow on India Contact Mobile: ${scrollWidthIndia} > ${clientWidthIndia}`);
    }
    console.log("PASS: Zero horizontal overflow on India Contact Mobile.");

    const shotIndiaMobile = path.join(SCREENSHOTS_DIR, "contact-india-mobile-390.png");
    await mobilePage.screenshot({ path: shotIndiaMobile, fullPage: false });
    console.log(`Saved screenshot: ${shotIndiaMobile}`);

    // -------------------------------------------------------------
    // 2. UAE CONTACT PAGE (/uae/contact)
    // -------------------------------------------------------------
    console.log("\n--- Checking UAE Contact Desk (/uae/contact) ---");
    const uaePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await uaePage.goto(`${BASE_URL}/uae/contact`, { waitUntil: "networkidle", timeout: 30000 });

    const uaeTabWhatsapp = uaePage.locator("#tab-whatsapp");
    const uaeTabEmail = uaePage.locator("#tab-email");
    if ((await uaeTabWhatsapp.count()) === 0 || (await uaeTabEmail.count()) === 0) {
      throw new Error("FAIL: UAE Contact Desk missing WhatsApp / Email toggle tabs!");
    }
    console.log("PASS: UAE Contact Desk has WhatsApp and Email toggle tabs.");

    // Switch to Email tab on UAE
    await uaeTabEmail.click();
    await uaePage.waitForTimeout(300);

    const uaePhoneInput = uaePage.locator("#enquiry-phone-input");
    const uaePlaceholder = await uaePhoneInput.getAttribute("placeholder");
    console.log(`UAE Phone input placeholder: "${uaePlaceholder}"`);
    if (!uaePlaceholder.includes("+971")) {
      throw new Error(`Expected UAE phone placeholder to include +971, got: ${uaePlaceholder}`);
    }
    console.log("PASS: UAE phone placeholder correctly defaults to Dubai desk prefix (+971).");

    const shotUaeEmail = path.join(SCREENSHOTS_DIR, "contact-uae-desk-email.png");
    await uaePage.screenshot({ path: shotUaeEmail, fullPage: false });
    console.log(`Saved screenshot: ${shotUaeEmail}`);

    // Check UAE Mobile Viewport (390x844)
    const uaeMobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await uaeMobilePage.goto(`${BASE_URL}/uae/contact`, { waitUntil: "networkidle", timeout: 30000 });

    const scrollWidthUae = await uaeMobilePage.evaluate(() => document.documentElement.scrollWidth);
    const clientWidthUae = await uaeMobilePage.evaluate(() => document.documentElement.clientWidth);
    console.log(`UAE Mobile scrollWidth: ${scrollWidthUae}, clientWidth: ${clientWidthUae}`);
    if (scrollWidthUae > clientWidthUae) {
      throw new Error(`Horizontal overflow on UAE Contact Mobile: ${scrollWidthUae} > ${clientWidthUae}`);
    }
    console.log("PASS: Zero horizontal overflow on UAE Contact Mobile.");

    console.log("\n=== ALL CONTACT TOGGLE TESTS PASSED WITH 100% SUCCESS ===");
  } catch (err) {
    console.error("Test execution error:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
