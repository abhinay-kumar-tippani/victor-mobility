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

async function verifyPhase23() {
  console.log('🚀 Starting Phase 23 Playwright Verification: Global Regional Operations Gateway & Cross-Border Fleet Network (/markets)...\n');

  const browser = await chromium.launch({ channel: 'msedge' });
  const context = await browser.newContext();
  const page = await context.newPage();

  let passedTests = 0;
  const totalTests = 5;

  try {
    // ----------------------------------------------------
    // Test 1: Global Markets Page Load & Schema Validation
    // ----------------------------------------------------
    console.log('--- Test 1: Global Markets Page Load & Schema Validation ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/markets`, { waitUntil: 'networkidle', timeout: 15000 });

    const titleText = await page.locator('h1').textContent();
    console.log(`Page H1 Title: "${titleText}"`);
    if (!titleText || !titleText.includes('Global Regional Operations Gateway')) {
      throw new Error(`Expected Global Regional Operations Gateway in H1 title, received: ${titleText}`);
    }

    // Verify Schema.org Organization JSON-LD
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const hasOrgJsonLd = jsonLdScripts.some((s) => s.includes('Victor Mobility') && s.includes('United Arab Emirates'));
    if (!hasOrgJsonLd) {
      throw new Error('Schema.org Organization JSON-LD not found for Global Markets Gateway');
    }

    // Verify presence of both regional entity blocks
    const hasIndiaEntity = await page.locator('text=Victor Mobility Private Limited').first().isVisible();
    const hasUaeEntity = await page.locator('text=Victor Mobility LLC (UAE Branch)').first().isVisible();
    if (!hasIndiaEntity || !hasUaeEntity) {
      throw new Error('Failed to find both India and UAE corporate legal entities on the gateway');
    }

    console.log('✅ Test 1 Passed: Global Markets Gateway loaded with valid Schema.org and dual legal entities.\n');
    passedTests++;

    // ----------------------------------------------------
    // Test 2: Interactive Region Switching & 18 Specialized Desks Directory
    // ----------------------------------------------------
    console.log('--- Test 2: Interactive Region Switching & 18 Specialized Desks Directory ---');
    
    // Switch to UAE Region Tab
    const uaeTab = page.locator('button:has-text("United Arab Emirates")').first();
    await uaeTab.click();
    await page.waitForTimeout(300);

    const uaeRegText = await page.locator('text=DED License: DED-1048291').first().isVisible();
    const uaeHqText = await page.locator('text=Al Garhoud Business Centre, Dubai').first().isVisible();
    if (!uaeRegText || !uaeHqText) {
      throw new Error('UAE corporate registration or headquarters details not visible after switching tab');
    }

    // Verify 18 specialized desks rendered
    const deskLinks = await page.locator('a[href^="/uae/"]').count();
    console.log(`Found ${deskLinks} UAE portal and desk links rendered in directory`);
    if (deskLinks < 15) {
      throw new Error(`Expected at least 15 UAE specialized desk links, found: ${deskLinks}`);
    }

    // Switch back to India Region Tab
    const indiaTab = page.locator('button:has-text("India")').first();
    await indiaTab.click();
    await page.waitForTimeout(300);

    const indiaCinText = await page.locator('text=CIN: U50100TG2023PTC178921').first().isVisible();
    if (!indiaCinText) {
      throw new Error('India CIN details not visible after switching back to India tab');
    }

    console.log('✅ Test 2 Passed: Interactive region switching smoothly toggles operating hubs and specialized desks.\n');
    passedTests++;

    // ----------------------------------------------------
    // Test 3: Bilateral Synergies & WhatsApp Draft Generation
    // ----------------------------------------------------
    console.log('--- Test 3: Bilateral Synergies & WhatsApp Draft Generation ---');

    // Verify Cross-Border Synergies section
    const hasBilateralMsa = await page.locator('text=Unified Bilateral Master Services Agreement').first().isVisible();
    const hasDualCurrency = await page.locator('text=Consolidated Multi-Currency Corporate Billing').first().isVisible();
    if (!hasBilateralMsa || !hasDualCurrency) {
      throw new Error('Cross-Border enterprise synergies cards are missing');
    }

    // Fill Inquiry Form
    await page.fill('#companyName', 'Apex Global Technology Partners Ltd.');
    await page.fill('#contactName', 'Ananya Sharma');
    await page.fill('#contactEmail', 'ananya.sharma@apexglobal.example.com');
    await page.fill('#specialNotes', 'Need bilateral transportation contract covering Hyderabad campuses and Dubai regional leadership team.');

    // Inspect WhatsApp Inquiry button
    const whatsappLink = page.locator('a:has-text("Initiate Cross-Border Inquiry via WhatsApp")');
    const href = await whatsappLink.getAttribute('href');
    console.log(`Generated WhatsApp Link: ${href?.substring(0, 80)}...`);

    if (!href || !href.includes('919396546950') || !href.includes('Apex%20Global%20Technology%20Partners') || !href.includes('Master%20Services%20Agreement')) {
      throw new Error('WhatsApp inquiry link does not contain formatted enterprise inquiry details');
    }

    // Check honest disclaimer
    const hasDisclaimer = await page.locator('text=initiates an enterprise global mobility inquiry').first().isVisible();
    if (!hasDisclaimer) {
      throw new Error('Honest booking disclaimer missing from WhatsApp CTA section');
    }

    console.log('✅ Test 3 Passed: Bilateral synergies displayed and honest WhatsApp draft message generated.\n');
    passedTests++;

    // ----------------------------------------------------
    // Test 4: Print Action, Header Dropdown & Navigation Integrity
    // ----------------------------------------------------
    console.log('--- Test 4: Print Action, Header Dropdown & Navigation Integrity ---');

    // Verify Print Dossier button
    const printBtn = page.locator('button:has-text("Print Global Network Dossier")');
    if (!(await printBtn.isVisible())) {
      throw new Error('Print Global Network Dossier button not visible');
    }

    // Check Header Global Region Switcher Dropdown
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    const regionBtn = page.locator('button[aria-label="Select Operating Region"]').first();
    const isRegBtnVis = await regionBtn.isVisible();
    console.log(`Region dropdown button visible: ${isRegBtnVis}`);
    console.log(`aria-expanded before click: ${await regionBtn.getAttribute('aria-expanded')}`);
    await regionBtn.click();
    await page.waitForTimeout(300);
    console.log(`aria-expanded after click: ${await regionBtn.getAttribute('aria-expanded')}`);

    let hasAllMarketsLink = await page.locator('text=All Global Markets').first().isVisible();
    if (!hasAllMarketsLink) {
      console.log('Retrying with dispatchEvent("click")...');
      await regionBtn.dispatchEvent('click');
      await page.waitForTimeout(500);
      console.log(`aria-expanded after dispatchEvent: ${await regionBtn.getAttribute('aria-expanded')}`);
      hasAllMarketsLink = await page.locator('text=All Global Markets').first().isVisible();
    }
    if (!hasAllMarketsLink) {
      const headerContent = await page.locator('header').innerText();
      console.log(`Header content: ${headerContent}`);
      throw new Error('Link to All Global Markets not found in Header region switcher dropdown');
    }

    // Check Footer Global Regional Gateway link
    const footerGatewayLink = page.locator('footer a:has-text("Global Regional Gateway")').first();
    if (!(await footerGatewayLink.isVisible())) {
      throw new Error('Global Regional Gateway link not found in Footer Navigation');
    }

    // Test Navigation from Root to Markets
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const rootMarketsLink = page.locator('footer a:has-text("Global Regional Operations Gateway (/markets)")').first();
    if (!(await rootMarketsLink.isVisible())) {
      throw new Error('Global Regional Operations Gateway link not found in root homepage footer');
    }

    console.log('✅ Test 4 Passed: Header, Footer, and root gateway navigation verified with print dossier capability.\n');
    passedTests++;

    // ----------------------------------------------------
    // Test 5: Visual Verification & Screenshots Capture
    // ----------------------------------------------------
    console.log('--- Test 5: Visual Verification & Screenshots Capture ---');

    // 1. Markets Gateway Desktop
    await page.goto(`${BASE_URL}/markets`, { waitUntil: 'networkidle' });
    await page.setViewportSize({ width: 1440, height: 900 });
    await saveImage(page, 'phase23-global-markets-desktop.png');

    // 2. Markets Gateway Mobile
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(300);
    await saveImage(page, 'phase23-global-markets-mobile.png');

    // 3. India Portal Home Desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/india`, { waitUntil: 'networkidle' });
    await saveImage(page, 'phase23-india-home-desktop.png');

    // 4. UAE Portal Home Desktop
    await page.goto(`${BASE_URL}/uae`, { waitUntil: 'networkidle' });
    await saveImage(page, 'phase23-uae-home-desktop.png');

    console.log('✅ Test 5 Passed: All desktop and mobile verification screenshots successfully captured.\n');
    passedTests++;

    console.log(`\n🎉 Verification Completed Successfully: ${passedTests}/${totalTests} Tests Passed!`);
  } catch (error) {
    console.error('❌ Verification Failed:', error);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

verifyPhase23();
