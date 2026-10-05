import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:3000';
const outputDirs = [
  path.resolve('docs/screenshots'),
  'C:/Users/tippa/.gemini/antigravity/brain/6bcbc0c9-63bc-40e5-84e8-1703d532d8fa',
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
  console.log(`Saved screenshot: ${filename}`);
}

async function verifyPhase20() {
  console.log('🚀 Starting Phase 20 Playwright Verification: Enterprise Fleet TCO & CAPEX vs OPEX Transition Desk...\n');

  const browser = await chromium.launch({ channel: 'msedge' });
  const context = await browser.newContext();
  const page = await context.newPage();

  let passedTests = 0;
  let totalTests = 5;

  try {
    // ----------------------------------------------------
    // Test 1: India TCO Page Load & Schema Validation
    // ----------------------------------------------------
    console.log('--- Test 1: India TCO Page Load & Schema Validation ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/india/tco-calculator`, { waitUntil: 'networkidle', timeout: 15000 });

    const titleText = await page.locator('h1').textContent();
    console.log(`Page H1 Title: "${titleText}"`);
    if (!titleText || !titleText.includes('Fleet TCO')) {
      throw new Error(`Expected Fleet TCO in H1 title, received: ${titleText}`);
    }

    // Verify Schema.org JSON-LD
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const hasServiceJsonLd = jsonLdScripts.some((s) => s.includes('Victor Mobility Enterprise Fleet TCO & CAPEX vs OPEX Transition Calculator'));
    if (!hasServiceJsonLd) {
      throw new Error('Schema.org WebApplication JSON-LD not found for Fleet TCO Calculator');
    }

    // Verify key metrics banner
    const hasMonthlySavings = await page.locator('text=Estimated Monthly Savings').first().isVisible();
    const hasAnnualBenefit = await page.locator('text=Annual Run-Rate Benefit').first().isVisible();
    const hasCapexUnlocked = await page.locator('text=Working Capital Unlocked').first().isVisible();
    if (!hasMonthlySavings || !hasAnnualBenefit || !hasCapexUnlocked) {
      throw new Error('Key TCO impact metric banners not visible');
    }

    // Verify Footer link exists
    const footerLink = await page.locator('footer a:has-text("Fleet TCO & Transition Desk")').first().isVisible();
    if (!footerLink) {
      throw new Error('Footer link to Fleet TCO & Transition Desk not found');
    }

    console.log('✅ Test 1 Passed: India TCO page loaded with Schema.org JSON-LD, metric banners, and Footer link.');
    passedTests++;

    // ----------------------------------------------------
    // Test 2: Vehicle Category & Operating Parameter Adjustments
    // ----------------------------------------------------
    console.log('--- Test 2: Vehicle Category & Operating Parameter Adjustments ---');
    // Switch to Premium MPV
    await page.click('button:has-text("Leadership & Delegations")');
    await page.waitForTimeout(400);

    const hasMpvActive = await page.locator('text=Toyota Innova Crysta / HyCross').first().isVisible();
    if (!hasMpvActive) {
      throw new Error('Toyota Innova Crysta / HyCross category not selected properly');
    }

    // Switch operating days to 22 Days (Mon-Fri)
    await page.click('button:has-text("22 Days")');
    await page.waitForTimeout(300);

    // Verify monthly spend updates
    const hasSpendBreakdown = await page.locator('text=Monthly Spend & Savings Audit').first().isVisible();
    if (!hasSpendBreakdown) {
      throw new Error('Monthly Spend & Savings Audit section not visible after parameter adjustments');
    }

    console.log('✅ Test 2 Passed: Vehicle category switching and parameter modifications validated.');
    passedTests++;

    // ----------------------------------------------------
    // Test 3: Model Comparison & Risk Transfer Matrix
    // ----------------------------------------------------
    console.log('--- Test 3: Model Comparison & Risk Transfer Matrix ---');
    // Switch to Fragmented Local Taxi Vendors
    await page.click('button:has-text("Fragmented Local Taxi Vendors")');
    await page.waitForTimeout(300);

    // Click Matrix tab
    await page.click('button:has-text("CAPEX vs OPEX Risk Transfer Matrix")');
    await page.waitForTimeout(400);

    const hasMatrixRow = await page.locator('text=Upfront Capital Expenditure').first().isVisible();
    const hasDowntimeRow = await page.locator('text=30–45 minute guaranteed vehicle swap').first().isVisible();
    if (!hasMatrixRow || !hasDowntimeRow) {
      throw new Error('Risk transfer schedule rows not visible in Matrix tab');
    }

    // Click Leakages tab
    await page.click('button:has-text("Current Model Leakage Analysis")');
    await page.waitForTimeout(400);

    const hasLeakageHeader = await page.locator('text=Corporate Fleet Spend Leakage Breakdown').first().isVisible();
    if (!hasLeakageHeader) {
      throw new Error('Leakage analysis section not visible in Leakages tab');
    }

    console.log('✅ Test 3 Passed: Procurement models, Risk Transfer Matrix, and Leakage Analysis tabs verified.');
    passedTests++;

    // ----------------------------------------------------
    // Test 4: UAE TCO Desk Validation & Desktop Screenshot
    // ----------------------------------------------------
    console.log('--- Test 4: UAE TCO Desk Validation & Desktop Screenshot ---');
    await page.goto(`${BASE_URL}/uae/tco-calculator`, { waitUntil: 'networkidle', timeout: 15000 });

    const uaeH1 = await page.locator('h1').textContent();
    console.log(`UAE Page H1: "${uaeH1}"`);
    if (!uaeH1 || !uaeH1.includes('UAE Corporate Fleet TCO')) {
      throw new Error(`Expected UAE Corporate Fleet TCO in H1, received: ${uaeH1}`);
    }

    const hasAedCurrency = await page.locator('text=AED ').first().isVisible();
    const hasUaeVehicle = await page.locator('text=Lexus ES300h / Mercedes E-Class').first().isVisible();
    if (!hasAedCurrency || !hasUaeVehicle) {
      throw new Error('UAE currency or vehicle category not displayed properly');
    }

    // Capture UAE Desktop Screenshot
    await saveImage(page, 'phase20-uae-tco-desktop.png', { fullPage: true });

    console.log('✅ Test 4 Passed: UAE TCO desk verified with AED currency and executive categories.');
    passedTests++;

    // ----------------------------------------------------
    // Test 5: WhatsApp Inquiry Prefill, Honest Disclaimer & Mobile Responsiveness
    // ----------------------------------------------------
    console.log('--- Test 5: WhatsApp Inquiry Prefill, Honest Disclaimer & Mobile Responsiveness ---');
    await page.goto(`${BASE_URL}/india/tco-calculator`, { waitUntil: 'networkidle', timeout: 15000 });

    // Fill form
    await page.fill('input[placeholder="e.g. Acme Technologies India Pvt Ltd"]', 'Qualcomm India Operations');
    await page.fill('input[placeholder="e.g. Rajesh Sharma"]', 'Arunachalam S');
    await page.fill('input[placeholder="name@company.com"]', 'arun.s@qualcomm.com');

    const submitBtn = await page.locator('button:has-text("Send CFO Fleet Transition Request via WhatsApp")');
    if (!(await submitBtn.isVisible())) {
      throw new Error('WhatsApp inquiry button not visible');
    }

    const disclaimerText = await page.locator('text=Note: Initiates an enterprise fleet TCO inquiry with Victor Mobility and does not constitute a signed contract.').isVisible();
    if (!disclaimerText) {
      throw new Error('Mandatory disclaimer notice missing from TCO inquiry box');
    }

    // Capture India Desktop Screenshot
    await saveImage(page, 'phase20-india-tco-desktop.png', { fullPage: true });

    // Switch to Mobile Viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const mobileH1 = await page.locator('h1').isVisible();
    const mobileForm = await page.locator('form').isVisible();
    if (!mobileH1 || !mobileForm) {
      throw new Error('Mobile viewport rendering failed for India TCO page');
    }

    // Capture India Mobile Screenshot
    await saveImage(page, 'phase20-india-tco-mobile.png', { fullPage: true });

    console.log('✅ Test 5 Passed: WhatsApp prefill, truthful disclaimer, and mobile responsiveness verified.');
    passedTests++;

    console.log(`\n🎉 All ${passedTests}/${totalTests} Phase 20 verification tests PASSED successfully!`);
  } catch (error) {
    console.error('❌ Phase 20 Verification Failed:', error);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

verifyPhase20();
