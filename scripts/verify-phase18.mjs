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

async function verifyPhase18() {
  console.log('🚀 Starting Phase 18 Playwright Verification: Employee Shift Roster & Route Optimization Desk...\n');

  const browser = await chromium.launch({ channel: 'msedge' });
  const context = await browser.newContext();
  const page = await context.newPage();

  let passedTests = 0;
  let totalTests = 5;

  try {
    // ----------------------------------------------------
    // Test 1: India Roster Page Load & Schema Validation
    // ----------------------------------------------------
    console.log('--- Test 1: India Roster Page Load & Schema Validation ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/india/roster`, { waitUntil: 'networkidle', timeout: 15000 });

    const titleText = await page.locator('h1').textContent();
    console.log(`Page H1 Title: "${titleText}"`);
    if (!titleText || !titleText.includes('Roster')) {
      throw new Error(`Expected Roster in H1 title, received: ${titleText}`);
    }

    // Verify Schema.org JSON-LD
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const hasServiceJsonLd = jsonLdScripts.some((s) => s.includes('Corporate Employee Transportation Shift Roster & Route Optimization Services'));
    if (!hasServiceJsonLd) {
      throw new Error('Schema.org Service JSON-LD not found for Employee Shift Roster');
    }

    // Verify key metrics
    const hasPunctuality = await page.locator('text=99.4%').first().isVisible();
    const hasWindow = await page.locator('text=45 Mins').first().isVisible();
    if (!hasPunctuality || !hasWindow) {
      throw new Error('Key roster operational metrics (99.4% / 45 Mins) not displayed');
    }

    console.log('✅ Test 1 Passed: India Roster page loaded with Schema.org JSON-LD and metrics.');
    passedTests++;

    // ----------------------------------------------------
    // Test 2: Live Roster Manifest Switching & Nodal Stop Sequence
    // ----------------------------------------------------
    console.log('--- Test 2: Live Roster Manifest Switching & Nodal Stop Sequence ---');
    // Initial Hyderabad manifest
    const hasHydManifest = await page.locator('h3:has-text("VIC-ROST-HYD-041")').isVisible();
    const hasJntu = await page.locator('text=JNTU Metro Station Gate 2').first().isVisible();
    if (!hasHydManifest || !hasJntu) {
      throw new Error('Initial Hyderabad shift manifest VIC-ROST-HYD-041 not rendered properly');
    }

    // Switch to Bengaluru Manifest
    await page.click('button:has-text("VIC-ROST-BLR-108")');
    await page.waitForTimeout(400);

    const hasBlrManifest = await page.locator('h3:has-text("VIC-ROST-BLR-108")').isVisible();
    const hasSilkBoard = await page.locator('text=Silk Board Junction Bus Bay').first().isVisible();
    if (!hasBlrManifest || !hasSilkBoard) {
      throw new Error('Bengaluru shift manifest VIC-ROST-BLR-108 not active after switch');
    }

    // Switch to Pune Manifest
    await page.click('button:has-text("VIC-ROST-PUN-072")');
    await page.waitForTimeout(400);

    const hasPunManifest = await page.locator('h3:has-text("VIC-ROST-PUN-072")').isVisible();
    const hasHandshake = await page.locator('text=Visual Handshake').first().isVisible();
    if (!hasPunManifest || !hasHandshake) {
      throw new Error('Pune night shift manifest with Visual Handshake not active after switch');
    }

    console.log('✅ Test 2 Passed: Shift manifest switching and nodal stop sequences verified.');
    passedTests++;

    // ----------------------------------------------------
    // Test 3: Shift Commute Models & Route Optimization Rules
    // ----------------------------------------------------
    console.log('--- Test 3: Shift Commute Models & Route Optimization Rules ---');
    // Switch to Shift Models tab
    await page.click('button:has-text("Shift Commute Models")');
    await page.waitForTimeout(400);

    const hasGeneralShift = await page.locator('h3:has-text("General Corporate Day Shift")').isVisible();
    const hasGraveyard = await page.locator('h3:has-text("24/7 Night Graveyard & Cloud Support")').isVisible();
    if (!hasGeneralShift || !hasGraveyard) {
      throw new Error('Shift commute models not found');
    }

    // Switch to Optimization Rules tab
    await page.click('button:has-text("Nodal Optimization Rules")');
    await page.waitForTimeout(400);

    const hasRule45 = await page.locator('h3:has-text("45-Minute Travel Window SLA")').isVisible();
    const hasCostReduction = await page.locator('text=35% Cost Reduction').first().isVisible();
    if (!hasRule45 || !hasCostReduction) {
      throw new Error('Route optimization rules and cost comparison not found');
    }

    // Switch back to Manifest Tab for WhatsApp check & screenshot
    await page.click('button:has-text("Live Roster Manifests")');
    await page.waitForTimeout(300);

    const waLink = await page.locator('a[href*="wa.me"]').first().getAttribute('href');
    if (!waLink || !waLink.includes('wa.me')) {
      throw new Error('WhatsApp route optimization inquiry link missing or malformed');
    }

    // Save Desktop Screenshot
    await saveImage(page, 'phase18-india-roster-desktop.png', { fullPage: true });
    console.log('✅ Test 3 Passed: Shift commute models, optimization rules, and desktop screenshot verified.');
    passedTests++;

    // ----------------------------------------------------
    // Test 4: UAE Executive Logistics & Shift Roster Desk
    // ----------------------------------------------------
    console.log('--- Test 4: UAE Executive Logistics & Shift Roster Desk ---');
    await page.goto(`${BASE_URL}/uae/roster`, { waitUntil: 'networkidle', timeout: 15000 });

    const uaeTitle = await page.locator('h1').textContent();
    console.log(`UAE Page H1: "${uaeTitle}"`);
    if (!uaeTitle || !uaeTitle.includes('UAE Executive Shift Roster')) {
      throw new Error(`Expected UAE Executive Shift Roster H1 title, received: ${uaeTitle}`);
    }

    const hasDxbManifest = await page.locator('h3:has-text("VIC-ROST-DXB-203")').isVisible();
    const hasTecom = await page.locator('text=TECOM Commercial Staging Bay').first().isVisible();
    if (!hasDxbManifest || !hasTecom) {
      throw new Error('UAE Free Zone roster manifest not rendered properly');
    }

    // Save UAE Desktop Screenshot
    await saveImage(page, 'phase18-uae-roster-desktop.png', { fullPage: true });
    console.log('✅ Test 4 Passed: UAE Executive shift roster desk loaded and screenshot captured.');
    passedTests++;

    // ----------------------------------------------------
    // Test 5: Mobile Viewport & Responsiveness
    // ----------------------------------------------------
    console.log('--- Test 5: Mobile Viewport & Responsiveness ---');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/india/roster`, { waitUntil: 'networkidle', timeout: 15000 });

    const mobileH1 = await page.locator('h1').first().isVisible();
    if (!mobileH1) {
      throw new Error('H1 title not visible on mobile viewport');
    }

    // Save Mobile Screenshot
    await saveImage(page, 'phase18-india-roster-mobile.png', { fullPage: true });
    console.log('✅ Test 5 Passed: Mobile responsiveness verified and screenshot captured.');
    passedTests++;

    console.log(`\n🎉 All ${passedTests}/${totalTests} Phase 18 verification tests PASSED successfully!`);
  } catch (error) {
    console.error('❌ Playwright Verification Error:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

verifyPhase18();
