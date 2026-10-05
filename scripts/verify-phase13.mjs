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

async function verifyPhase13() {
  console.log('🚀 Starting Phase 13 Playwright Verification: Airport VIP Protocol Desk...\n');

  const browser = await chromium.launch({ channel: 'msedge' });
  const context = await browser.newContext();
  const page = await context.newPage();

  let passedTests = 0;
  let totalTests = 5;

  try {
    // ----------------------------------------------------
    // Test 1: India Airport Protocol Page Load & Standards
    // ----------------------------------------------------
    console.log('--- Test 1: India Airport Protocol Page Load & Standards ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/india/protocol`, { waitUntil: 'networkidle', timeout: 15000 });

    const titleText = await page.locator('h1').textContent();
    console.log(`Page H1 Title: "${titleText}"`);
    if (!titleText || !titleText.includes('VIP Airport Concierge')) {
      throw new Error(`Expected Airport Protocol H1 title, received: ${titleText}`);
    }

    // Verify Schema.org JSON-LD
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const hasServiceJsonLd = jsonLdScripts.some((s) => s.includes('Executive Airport Transportation & Flight Greeting Protocol'));
    if (!hasServiceJsonLd) {
      throw new Error('Schema.org Service JSON-LD not found for Airport Protocol');
    }
    console.log('✅ Test 1 Passed: India Airport Protocol page loaded and JSON-LD verified.');
    passedTests++;

    // ----------------------------------------------------
    // Test 2: Protocol Configurator & Placard Preview
    // ----------------------------------------------------
    console.log('--- Test 2: Protocol Configurator & Placard Preview ---');
    // Input custom guest name
    const guestInput = page.locator('input[placeholder="e.g. Mr. David Sterling"]');
    await guestInput.fill('His Excellency Dr. Thorne');

    // Input custom organization
    const orgInput = page.locator('input[placeholder="e.g. Deloitte Global, Microsoft Executive Desk"]');
    await orgInput.fill('Global Energy Delegation');

    await page.waitForTimeout(300);

    // Verify Live Tablet Placard updated
    const placardGuestName = await page.locator('h3:has-text("His Excellency Dr. Thorne")').isVisible();
    const placardOrg = await page.locator('p:has-text("Global Energy Delegation")').isVisible();

    if (!placardGuestName || !placardOrg) {
      throw new Error('Digital tablet placard mockup did not reactively update with input guest name and organization');
    }

    // Verify WhatsApp inquiry link formatting
    const waLink = await page.locator('a:has-text("Dispatch Protocol Brief on WhatsApp")').getAttribute('href');
    console.log(`WhatsApp Link: ${waLink ? waLink.slice(0, 60) + '...' : 'null'}`);
    if (!waLink || !waLink.includes('wa.me') || !waLink.includes('His%20Excellency%20Dr.%20Thorne')) {
      throw new Error('WhatsApp inquiry link does not contain configured guest name');
    }

    // Verify Print button
    const printBtn = await page.locator('button:has-text("Print Flight Protocol Blueprint")').isVisible();
    if (!printBtn) {
      throw new Error('Print Flight Protocol Blueprint button not visible');
    }
    console.log('✅ Test 2 Passed: Protocol Configurator, Placard Preview, and WhatsApp link verified.');
    passedTests++;

    // ----------------------------------------------------
    // Test 3: Terminal Staging & Pickup Bays Guide
    // ----------------------------------------------------
    console.log('--- Test 3: Terminal Staging & Pickup Bays Guide ---');
    // Click Terminal Staging Tab
    await page.click('button:has-text("Terminal Staging & Pickup Bays")');
    await page.waitForTimeout(500);

    const hasHyd = await page.locator('h3:has-text("Rajiv Gandhi International Airport (RGIA)")').isVisible();
    const hasBlr = await page.locator('h3:has-text("Kempegowda International Airport (KIA)")').isVisible();
    const hasPnq = await page.locator('h3:has-text("Pune International Airport (PNQ)")').isVisible();

    if (!hasHyd || !hasBlr || !hasPnq) {
      throw new Error('Terminal staging guide missing one or more India airport hubs (HYD, BLR, PNQ)');
    }

    // Check specific pickup bay mention
    const hasAeromall = await page.locator('text=Aeromall Dedicated Commercial Staging Bay').isVisible();
    if (!hasAeromall) {
      throw new Error('RGIA Aeromall pickup bay not found in terminal guide');
    }
    console.log('✅ Test 3 Passed: Terminal Staging & Pickup Bays verified across all hubs.');
    passedTests++;

    // ----------------------------------------------------
    // Test 4: UAE Airport Protocol Desk & FBO Aviation
    // ----------------------------------------------------
    console.log('--- Test 4: UAE Airport Protocol Desk & FBO Aviation ---');
    await page.goto(`${BASE_URL}/uae/protocol`, { waitUntil: 'networkidle', timeout: 15000 });

    const uaeTitle = await page.locator('h1').textContent();
    console.log(`UAE H1: "${uaeTitle}"`);
    if (!uaeTitle || !uaeTitle.includes('UAE Airport VIP Concierge')) {
      throw new Error(`Expected UAE Airport Protocol H1, received: ${uaeTitle}`);
    }

    // Check Footer link
    const footerLink = await page.locator('footer a:has-text("Airport VIP Protocol Desk")').isVisible();
    if (!footerLink) {
      throw new Error('Footer does not contain Airport VIP Protocol Desk link');
    }

    // Save UAE Desktop Screenshot
    await saveImage(page, 'phase13-uae-protocol-desktop.png', { fullPage: true });
    console.log('✅ Test 4 Passed: UAE Airport Protocol Desk & FBO Aviation verified.');
    passedTests++;

    // ----------------------------------------------------
    // Test 5: Mobile View (390px) & India Desktop Screenshot
    // ----------------------------------------------------
    console.log('--- Test 5: Mobile View (390px) & India Desktop Screenshot ---');
    // India Desktop Screenshot
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/india/protocol`, { waitUntil: 'networkidle', timeout: 15000 });
    await saveImage(page, 'phase13-india-protocol-desktop.png', { fullPage: true });

    // Mobile Viewport (iPhone 14: 390 x 844)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/india/protocol`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(500);

    await saveImage(page, 'phase13-india-protocol-mobile.png', { fullPage: true });
    console.log('✅ Test 5 Passed: Mobile view & Desktop screenshots verified.');
    passedTests++;

    console.log(`\n🎉 PHASE 13 VERIFICATION COMPLETE: ${passedTests}/${totalTests} TESTS PASSED!`);
  } catch (error) {
    console.error('❌ Phase 13 Verification Failed:', error);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

verifyPhase13();
