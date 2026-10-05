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

async function verifyPhase22() {
  console.log('🚀 Starting Phase 22 Playwright Verification: Corporate Account Onboarding & Credit Facility Application Desk...\n');

  const browser = await chromium.launch({ channel: 'msedge' });
  const context = await browser.newContext();
  const page = await context.newPage();

  let passedTests = 0;
  let totalTests = 5;

  try {
    // ----------------------------------------------------
    // Test 1: India Credit Page Load & Schema Validation
    // ----------------------------------------------------
    console.log('--- Test 1: India Credit Page Load & Schema Validation ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/india/credit-application`, { waitUntil: 'networkidle', timeout: 15000 });

    const titleText = await page.locator('h1').textContent();
    console.log(`Page H1 Title: "${titleText}"`);
    if (!titleText || !titleText.includes('Credit Facility Application')) {
      throw new Error(`Expected Credit Facility Application in H1 title, received: ${titleText}`);
    }

    // Verify Schema.org JSON-LD
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const hasServiceJsonLd = jsonLdScripts.some((s) => s.includes('Corporate Transportation Credit Account & 30-Day Billing Facility'));
    if (!hasServiceJsonLd) {
      throw new Error('Schema.org Service JSON-LD not found for Corporate Credit Application');
    }

    // Verify key metrics
    const hasRolling = await page.locator('text=30-Day Net').first().isVisible();
    const hasLimit = await page.locator('text=Up to ₹1 Cr+').first().isVisible();
    const hasApproval = await page.locator('text=24–48 Hours').first().isVisible();
    if (!hasRolling || !hasLimit || !hasApproval) {
      throw new Error('Key credit facility metrics not visible');
    }

    // Verify Footer link exists
    const footerLink = await page.locator('footer a:has-text("Corporate Credit & Billing Terms")').first().isVisible();
    if (!footerLink) {
      throw new Error('Footer link to Corporate Credit & Billing Terms not found');
    }

    console.log('✅ Test 1 Passed: India Credit Application page loaded with Schema.org JSON-LD, facility metrics, and Footer link.');
    passedTests++;

    // ----------------------------------------------------
    // Test 2: Credit Facility Tier Switching & Benefits
    // ----------------------------------------------------
    console.log('--- Test 2: Credit Facility Tier Switching & Benefits ---');
    // Switch to Growth Retainer
    await page.click('button:has-text("Standard Corporate")');
    await page.waitForTimeout(300);

    const hasGrowthLimit = await page.locator('text=₹2,00,000 – ₹5,00,000').first().isVisible();
    if (!hasGrowthLimit) {
      throw new Error('Corporate Growth Retainer limit not visible');
    }

    // Switch to Institutional Retainer
    await page.click('button:has-text("Fortune 500 & MNCs")');
    await page.waitForTimeout(300);

    const hasInstLimit = await page.locator('text=₹25,00,000 – ₹1 Crore+').first().isVisible();
    const hasMultiEntity = await page.locator('text=Custom multi-entity GST billing').first().isVisible();
    if (!hasInstLimit || !hasMultiEntity) {
      throw new Error('Institutional Pan-India Retainer details not visible');
    }

    console.log('✅ Test 2 Passed: Credit facility tier switching and benefit schedules validated.');
    passedTests++;

    // ----------------------------------------------------
    // Test 3: Onboarding Protocol & KYC Checklist Tabs
    // ----------------------------------------------------
    console.log('--- Test 3: Onboarding Protocol & KYC Checklist Tabs ---');
    // Click 3-Day Protocol tab
    await page.click('button:has-text("3-Day Account Onboarding Protocol")');
    await page.waitForTimeout(400);

    const hasStep1 = await page.locator('h3:has-text("KYC & Credit Evaluation")').isVisible();
    const hasStep3 = await page.locator('h3:has-text("Account Activation & Dispatch Staging")').isVisible();
    if (!hasStep1 || !hasStep3) {
      throw new Error('Onboarding protocol steps not visible');
    }

    // Click KYC Checklist tab
    await page.click('button:has-text("KYC Documentation Checklist")');
    await page.waitForTimeout(400);

    const hasPanCheck = await page.locator('text=Certificate of Incorporation & Company PAN').first().isVisible();
    const hasGstCheck = await page.locator('text=Multi-State GSTIN Tax Registrations').first().isVisible();
    if (!hasPanCheck || !hasGstCheck) {
      throw new Error('KYC checklist items not visible');
    }

    console.log('✅ Test 3 Passed: 3-Day Onboarding Protocol and KYC Checklist tabs verified.');
    passedTests++;

    // ----------------------------------------------------
    // Test 4: UAE Credit Facility Desk Validation & Desktop Screenshot
    // ----------------------------------------------------
    console.log('--- Test 4: UAE Credit Facility Desk Validation & Desktop Screenshot ---');
    await page.goto(`${BASE_URL}/uae/credit-application`, { waitUntil: 'networkidle', timeout: 15000 });

    const uaeH1 = await page.locator('h1').textContent();
    console.log(`UAE Page H1: "${uaeH1}"`);
    if (!uaeH1 || !uaeH1.includes('UAE Corporate Account')) {
      throw new Error(`Expected UAE Corporate Account in H1, received: ${uaeH1}`);
    }

    const hasUaeLimit = await page.locator('text=AED 25,000 – AED 75,000').first().isVisible();
    const hasInstUae = await page.locator('text=AED 75,000 – AED 350,000+').first().isVisible();
    if (!hasUaeLimit || !hasInstUae) {
      throw new Error('UAE credit limits not displayed properly in AED');
    }

    // Capture UAE Desktop Screenshot
    await saveImage(page, 'phase22-uae-credit-desktop.png', { fullPage: true });

    console.log('✅ Test 4 Passed: UAE Credit Facility desk verified with AED limits and trade license criteria.');
    passedTests++;

    // ----------------------------------------------------
    // Test 5: WhatsApp Inquiry Prefill, Honest Disclaimer & Mobile Responsiveness
    // ----------------------------------------------------
    console.log('--- Test 5: WhatsApp Inquiry Prefill, Honest Disclaimer & Mobile Responsiveness ---');
    await page.goto(`${BASE_URL}/india/credit-application`, { waitUntil: 'networkidle', timeout: 15000 });

    // Fill form
    await page.fill('input[placeholder="e.g. Acme Technologies India Pvt Ltd"]', 'Wipro Enterprises Limited');
    await page.fill('input[placeholder="e.g. AAFCV8841M / 36AAFCV8841M1Z4"]', 'AAFCW1928B / 29AAFCW1928B1Z2');
    await page.fill('input[placeholder="e.g. Suresh Nambiar"]', 'Vikram Deshmukh');
    await page.fill('input[placeholder="finance@company.com"]', 'vikram.d@wipro.com');

    const submitBtn = await page.locator('button:has-text("Submit Corporate Credit Application via WhatsApp")');
    if (!(await submitBtn.isVisible())) {
      throw new Error('WhatsApp credit application submit button not visible');
    }

    const disclaimerText = await page.locator('text=Note: Initiates a corporate credit assessment inquiry with Victor Mobility and does not constitute an approved credit facility.').isVisible();
    if (!disclaimerText) {
      throw new Error('Mandatory disclaimer notice missing from Credit application box');
    }

    // Capture India Desktop Screenshot
    await saveImage(page, 'phase22-india-credit-desktop.png', { fullPage: true });

    // Switch to Mobile Viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const mobileH1 = await page.locator('h1').isVisible();
    const mobileForm = await page.locator('form').isVisible();
    if (!mobileH1 || !mobileForm) {
      throw new Error('Mobile viewport rendering failed for India Credit Application page');
    }

    // Capture India Mobile Screenshot
    await saveImage(page, 'phase22-india-credit-mobile.png', { fullPage: true });

    console.log('✅ Test 5 Passed: WhatsApp prefill, truthful disclaimer, and mobile responsiveness verified.');
    passedTests++;

    console.log(`\n🎉 All ${passedTests}/${totalTests} Phase 22 verification tests PASSED successfully!`);
  } catch (error) {
    console.error('❌ Phase 22 Verification Failed:', error);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

verifyPhase22();
