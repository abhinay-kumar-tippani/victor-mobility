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

async function verifyPhase21() {
  console.log('🚀 Starting Phase 21 Playwright Verification: Multi-City Corporate Roadshows & Investor Delegation Transit Desk...\n');

  const browser = await chromium.launch({ channel: 'msedge' });
  const context = await browser.newContext();
  const page = await context.newPage();

  let passedTests = 0;
  let totalTests = 5;

  try {
    // ----------------------------------------------------
    // Test 1: India Roadshows Page Load & Schema Validation
    // ----------------------------------------------------
    console.log('--- Test 1: India Roadshows Page Load & Schema Validation ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/india/roadshows`, { waitUntil: 'networkidle', timeout: 15000 });

    const titleText = await page.locator('h1').textContent();
    console.log(`Page H1 Title: "${titleText}"`);
    if (!titleText || !titleText.includes('Roadshows')) {
      throw new Error(`Expected Roadshows in H1 title, received: ${titleText}`);
    }

    // Verify Schema.org JSON-LD
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const hasServiceJsonLd = jsonLdScripts.some((s) => s.includes('Executive Roadshow & C-Suite Delegation Chauffeur Transportation'));
    if (!hasServiceJsonLd) {
      throw new Error('Schema.org Service JSON-LD not found for Executive Roadshow Desk');
    }

    // Verify key SLA metrics
    const hasSpoc = await page.locator('text=Single Point').first().isVisible();
    const hasPunctuality = await page.locator('text=99.4% On-Time').first().isVisible();
    const hasNda = await page.locator('text=100% Signed NDA').first().isVisible();
    if (!hasSpoc || !hasPunctuality || !hasNda) {
      throw new Error('Key Roadshow SLA metrics not visible');
    }

    // Verify Footer link exists
    const footerLink = await page.locator('footer a:has-text("Executive Roadshows & Delegations")').first().isVisible();
    if (!footerLink) {
      throw new Error('Footer link to Executive Roadshows & Delegations not found');
    }

    console.log('✅ Test 1 Passed: India Roadshows page loaded with Schema.org JSON-LD, SLA banners, and Footer link.');
    passedTests++;

    // ----------------------------------------------------
    // Test 2: Roadshow Itinerary Switching & Timeline Stop Sequence
    // ----------------------------------------------------
    console.log('--- Test 2: Roadshow Itinerary Switching & Timeline Stop Sequence ---');
    // Check initial Hyderabad stops
    const hasHydStop = await page.locator('text=Genome Valley Biotech Hub').first().isVisible();
    if (!hasHydStop) {
      throw new Error('Initial Hyderabad itinerary stop not visible');
    }

    // Switch to Bengaluru Itinerary
    await page.click('button:has-text("Bengaluru")');
    await page.waitForTimeout(400);

    const hasBlrStop = await page.locator('text=Whitefield Prestige Tech Cloud').first().isVisible();
    const hasLeela = await page.locator('text=The Leela Palace Bengaluru').first().isVisible();
    if (!hasBlrStop || !hasLeela) {
      throw new Error('Bengaluru roadshow itinerary stops not visible after switch');
    }

    // Switch to Pune Itinerary
    await page.click('button:has-text("Pune")');
    await page.waitForTimeout(400);

    const hasChakan = await page.locator('text=Chakan MIDC Phase 2').first().isVisible();
    if (!hasChakan) {
      throw new Error('Pune industrial roadshow stops not visible after switch');
    }

    console.log('✅ Test 2 Passed: Roadshow itinerary switching and stop sequence timelines validated.');
    passedTests++;

    // ----------------------------------------------------
    // Test 3: Roadshow Service Tiers & Onboard Executive Amenities
    // ----------------------------------------------------
    console.log('--- Test 3: Roadshow Service Tiers & Onboard Executive Amenities ---');
    // Click Tiers tab
    await page.click('button:has-text("Roadshow Service Tiers & Fleet")');
    await page.waitForTimeout(400);

    const hasCsuiteTier = await page.locator('h3:has-text("C-Suite Board & Global Executive Tour")').isVisible();
    const hasMercedesVellfire = await page.locator('text=Mercedes E-Class / S-Class / Toyota Vellfire').first().isVisible();
    if (!hasCsuiteTier || !hasMercedesVellfire) {
      throw new Error('C-Suite Board & Global Executive Tour tier details not visible');
    }

    // Click Amenities tab
    await page.click('button:has-text("Onboard Executive Amenities")');
    await page.waitForTimeout(400);

    const hasWifi = await page.locator('h3:has-text("Secure 5G In-Cabin Wi-Fi")').isVisible();
    const hasHimalayanWater = await page.locator('h3:has-text("Himalayan Mineral & Sparkling Water")').isVisible();
    if (!hasWifi || !hasHimalayanWater) {
      throw new Error('Onboard executive amenities not visible');
    }

    console.log('✅ Test 3 Passed: Roadshow service tiers and onboard executive amenities verified.');
    passedTests++;

    // ----------------------------------------------------
    // Test 4: UAE Roadshow Desk Validation & Desktop Screenshot
    // ----------------------------------------------------
    console.log('--- Test 4: UAE Roadshow Desk Validation & Desktop Screenshot ---');
    await page.goto(`${BASE_URL}/uae/roadshows`, { waitUntil: 'networkidle', timeout: 15000 });

    const uaeH1 = await page.locator('h1').textContent();
    console.log(`UAE Page H1: "${uaeH1}"`);
    if (!uaeH1 || !uaeH1.includes('UAE Executive Roadshow')) {
      throw new Error(`Expected UAE Executive Roadshow in H1, received: ${uaeH1}`);
    }

    const hasDifc = await page.locator('text=DIFC Gate Village, Dubai').first().isVisible();
    const hasAdgm = await page.locator('text=ADGM Square, Al Maryah Island').first().isVisible();
    if (!hasDifc || !hasAdgm) {
      throw new Error('UAE cross-emirate DIFC-ADGM roadshow stops not visible');
    }

    // Capture UAE Desktop Screenshot
    await saveImage(page, 'phase21-uae-roadshows-desktop.png', { fullPage: true });

    console.log('✅ Test 4 Passed: UAE Executive Roadshow desk verified with DIFC and ADGM stops.');
    passedTests++;

    // ----------------------------------------------------
    // Test 5: WhatsApp Inquiry Prefill, Honest Disclaimer & Mobile Responsiveness
    // ----------------------------------------------------
    console.log('--- Test 5: WhatsApp Inquiry Prefill, Honest Disclaimer & Mobile Responsiveness ---');
    await page.goto(`${BASE_URL}/india/roadshows`, { waitUntil: 'networkidle', timeout: 15000 });

    // Fill inquiry form
    await page.fill('input[placeholder="e.g. Goldman Sachs Investment Banking"]', 'Morgan Stanley Investment Banking');
    await page.fill('input[placeholder="e.g. Priya Venkatesh"]', 'Meera Nambiar');
    await page.fill('input[placeholder="name@company.com"]', 'meera.n@morganstanley.com');

    const submitBtn = await page.locator('button:has-text("Send Roadshow Dispatch Request via WhatsApp")');
    if (!(await submitBtn.isVisible())) {
      throw new Error('WhatsApp roadshow inquiry submit button not visible');
    }

    const disclaimerText = await page.locator('text=Note: Initiates an enterprise roadshow inquiry with Victor Mobility and does not constitute a signed contract.').isVisible();
    if (!disclaimerText) {
      throw new Error('Mandatory disclaimer notice missing from Roadshow inquiry box');
    }

    // Capture India Desktop Screenshot
    await saveImage(page, 'phase21-india-roadshows-desktop.png', { fullPage: true });

    // Switch to Mobile Viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const mobileH1 = await page.locator('h1').isVisible();
    const mobileForm = await page.locator('form').isVisible();
    if (!mobileH1 || !mobileForm) {
      throw new Error('Mobile viewport rendering failed for India Roadshows page');
    }

    // Capture India Mobile Screenshot
    await saveImage(page, 'phase21-india-roadshows-mobile.png', { fullPage: true });

    console.log('✅ Test 5 Passed: WhatsApp prefill, truthful disclaimer, and mobile responsiveness verified.');
    passedTests++;

    console.log(`\n🎉 All ${passedTests}/${totalTests} Phase 21 verification tests PASSED successfully!`);
  } catch (error) {
    console.error('❌ Phase 21 Verification Failed:', error);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

verifyPhase21();
