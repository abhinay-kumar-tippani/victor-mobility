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

async function verifyPhase14() {
  console.log('🚀 Starting Phase 14 Playwright Verification: Corporate Billing & Duty Slip Desk...\n');

  const browser = await chromium.launch({ channel: 'msedge' });
  const context = await browser.newContext();
  const page = await context.newPage();

  let passedTests = 0;
  let totalTests = 5;

  try {
    // ----------------------------------------------------
    // Test 1: India Billing Desk Page Load & Metrics
    // ----------------------------------------------------
    console.log('--- Test 1: India Billing Desk Page Load & Metrics ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/india/billing`, { waitUntil: 'networkidle', timeout: 15000 });

    const titleText = await page.locator('h1').textContent();
    console.log(`Page H1 Title: "${titleText}"`);
    if (!titleText || !titleText.includes('Corporate Billing')) {
      throw new Error(`Expected Corporate Billing H1 title, received: ${titleText}`);
    }

    // Verify SAC 9966 Badge
    const hasSac = await page.locator('span:has-text("SAC 9966")').first().isVisible();
    if (!hasSac) {
      throw new Error('SAC 9966 compliance badge not found');
    }

    // Verify Schema.org JSON-LD
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const hasServiceJsonLd = jsonLdScripts.some((s) => s.includes('Corporate Transportation Billing & Input Tax Credit Services'));
    if (!hasServiceJsonLd) {
      throw new Error('Schema.org Service JSON-LD not found for Corporate Billing');
    }
    console.log('✅ Test 1 Passed: India Billing page loaded with SAC 9966 and JSON-LD.');
    passedTests++;

    // ----------------------------------------------------
    // Test 2: Digital Duty Slip Inspector & Chip Switching
    // ----------------------------------------------------
    console.log('--- Test 2: Digital Duty Slip Inspector & Chip Switching ---');
    // Verify Initial Duty Slip VIC-DS-8841
    const hasSlip1 = await page.locator('h3:has-text("Duty Slip: VIC-DS-8841")').isVisible();
    const hasDeloitte = await page.locator('text=Deloitte Global Services').isVisible();
    if (!hasSlip1 || !hasDeloitte) {
      throw new Error('Initial sample duty slip VIC-DS-8841 (Deloitte) not displayed');
    }

    // Click on Second Sample Slip (Campus Commute)
    await page.click('button:has-text("VIC-DS-9102")');
    await page.waitForTimeout(300);

    const hasSlip2 = await page.locator('h3:has-text("Duty Slip: VIC-DS-9102")').isVisible();
    const hasAmazon = await page.locator('text=Amazon Development Centre India').isVisible();
    if (!hasSlip2 || !hasAmazon) {
      throw new Error('Switching to sample duty slip VIC-DS-9102 (Amazon) failed');
    }

    // Check Print button presence
    const printBtn = await page.locator('button:has-text("Print Duty Slip")').first().isVisible();
    if (!printBtn) {
      throw new Error('Print Duty Slip button not visible');
    }
    console.log('✅ Test 2 Passed: Digital Duty Slip Inspector and sample switching verified.');
    passedTests++;

    // ----------------------------------------------------
    // Test 3: GST / VAT & ITC Reconciler
    // ----------------------------------------------------
    console.log('--- Test 3: GST / VAT & ITC Reconciler ---');
    // Click on Calculator Tab
    await page.click('button:has-text("GST / VAT & ITC Reconciler")');
    await page.waitForTimeout(500);

    const hasCalcHeader = await page.locator('h2:has-text("Enterprise GST / VAT & Input Tax Credit Reconciler")').isVisible();
    if (!hasCalcHeader) {
      throw new Error('Calculator tab did not activate');
    }

    // Check WhatsApp corporate account link
    const waLink = await page.locator('a:has-text("Open Corporate Account on WhatsApp")').first().getAttribute('href');
    console.log(`WhatsApp Link: ${waLink ? waLink.slice(0, 60) + '...' : 'null'}`);
    if (!waLink || !waLink.includes('wa.me') || !waLink.includes('Corporate%20Billing')) {
      throw new Error('WhatsApp corporate billing inquiry link missing or invalid');
    }
    console.log('✅ Test 3 Passed: GST / VAT & ITC Reconciler and WhatsApp link verified.');
    passedTests++;

    // ----------------------------------------------------
    // Test 4: UAE Corporate Billing Desk & FTA VAT
    // ----------------------------------------------------
    console.log('--- Test 4: UAE Corporate Billing Desk & FTA VAT ---');
    await page.goto(`${BASE_URL}/uae/billing`, { waitUntil: 'networkidle', timeout: 15000 });

    const uaeTitle = await page.locator('h1').textContent();
    console.log(`UAE H1: "${uaeTitle}"`);
    if (!uaeTitle || !uaeTitle.includes('UAE Corporate Billing')) {
      throw new Error(`Expected UAE Corporate Billing H1, received: ${uaeTitle}`);
    }

    // Verify UAE duty slip (Standard Chartered / Mercedes S-Class)
    const hasUaeSlip = await page.locator('h3:has-text("Duty Slip: VIC-DXB-7721")').isVisible();
    const hasStdChartered = await page.locator('text=Standard Chartered Bank UAE').isVisible();
    if (!hasUaeSlip || !hasStdChartered) {
      throw new Error('UAE sample duty slip VIC-DXB-7721 not displayed');
    }

    // Verify Footer link
    const footerLink = await page.locator('footer a:has-text("Corporate Billing & Invoicing")').isVisible();
    if (!footerLink) {
      throw new Error('Footer does not contain Corporate Billing & Invoicing link');
    }

    // Save UAE Desktop Screenshot
    await saveImage(page, 'phase14-uae-billing-desktop.png', { fullPage: true });
    console.log('✅ Test 4 Passed: UAE Corporate Billing Desk & FTA VAT verified.');
    passedTests++;

    // ----------------------------------------------------
    // Test 5: Mobile View (390px) & India Desktop Screenshot
    // ----------------------------------------------------
    console.log('--- Test 5: Mobile View (390px) & India Desktop Screenshot ---');
    // India Desktop Screenshot
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/india/billing`, { waitUntil: 'networkidle', timeout: 15000 });
    await saveImage(page, 'phase14-india-billing-desktop.png', { fullPage: true });

    // Mobile Viewport (iPhone 14: 390 x 844)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/india/billing`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(500);

    await saveImage(page, 'phase14-india-billing-mobile.png', { fullPage: true });
    console.log('✅ Test 5 Passed: Mobile view & Desktop screenshots verified.');
    passedTests++;

    console.log(`\n🎉 PHASE 14 VERIFICATION COMPLETE: ${passedTests}/${totalTests} TESTS PASSED!`);
  } catch (error) {
    console.error('❌ Phase 14 Verification Failed:', error);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

verifyPhase14();
