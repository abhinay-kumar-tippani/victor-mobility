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

async function verifyPhase17() {
  console.log('🚀 Starting Phase 17 Playwright Verification: Fleet Safety, IoT Telematics & Audit Desk...\n');

  const browser = await chromium.launch({ channel: 'msedge' });
  const context = await browser.newContext();
  const page = await context.newPage();

  let passedTests = 0;
  let totalTests = 5;

  try {
    // ----------------------------------------------------
    // Test 1: India Safety Page Load & Schema Validation
    // ----------------------------------------------------
    console.log('--- Test 1: India Safety Page Load & Schema Validation ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/india/safety`, { waitUntil: 'networkidle', timeout: 15000 });

    const titleText = await page.locator('h1').textContent();
    console.log(`Page H1 Title: "${titleText}"`);
    if (!titleText || !titleText.includes('Fleet Safety')) {
      throw new Error(`Expected Fleet Safety in H1 title, received: ${titleText}`);
    }

    // Verify Schema.org JSON-LD
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const hasServiceJsonLd = jsonLdScripts.some((s) => s.includes('Corporate Transportation Fleet Safety & IoT Telematics Audit Services'));
    if (!hasServiceJsonLd) {
      throw new Error('Schema.org Service JSON-LD not found for Fleet Safety');
    }

    // Verify key metrics
    const hasAis140 = await page.locator('text=AIS-140').first().isVisible();
    const hasFifty = await page.locator('text=50-Point').first().isVisible();
    if (!hasAis140 || !hasFifty) {
      throw new Error('Key safety metrics (AIS-140 / 50-Point) not displayed');
    }

    console.log('✅ Test 1 Passed: India Safety page loaded with Schema.org JSON-LD and metrics.');
    passedTests++;

    // ----------------------------------------------------
    // Test 2: 50-Point Pre-Trip Audit Category Switching
    // ----------------------------------------------------
    console.log('--- Test 2: 50-Point Pre-Trip Audit Category Switching ---');
    // Initial Mechanical checks
    const hasTyre = await page.locator('h4:has-text("Tyre Tread Depth")').isVisible();
    if (!hasTyre) {
      throw new Error('Initial Tyre Tread Depth check item not found');
    }

    // Switch to AIS-140 IoT & Security Hardware
    await page.click('button:has-text("AIS-140 IoT & Security Hardware")');
    await page.waitForTimeout(400);

    const hasGps = await page.locator('h4:has-text("AIS-140 GPS Telematics Unit")').isVisible();
    const hasSos = await page.locator('h4:has-text("Emergency Panic SOS Buttons")').isVisible();
    if (!hasGps || !hasSos) {
      throw new Error('AIS-140 IoT hardware checks not visible after category switch');
    }

    // Switch to Cabin Sanitization & Chauffeur Fitness
    await page.click('button:has-text("Cabin Sanitization & Chauffeur Fitness")');
    await page.waitForTimeout(400);

    const hasBreathalyzer = await page.locator('h4:has-text("Pre-Shift Alcohol Breathalyzer")').isVisible();
    if (!hasBreathalyzer) {
      throw new Error('Pre-Shift Alcohol Breathalyzer check not visible after switch');
    }

    console.log('✅ Test 2 Passed: 50-point audit category switching verified.');
    passedTests++;

    // ----------------------------------------------------
    // Test 3: IoT Hardware Stack & WhatsApp Inquiry
    // ----------------------------------------------------
    console.log('--- Test 3: IoT Hardware Stack & WhatsApp Inquiry ---');
    // Switch to Hardware Tab
    await page.click('button:has-text("IoT Hardware Stack")');
    await page.waitForTimeout(400);

    const hasAisH3 = await page.locator('h3:has-text("AIS-140 Certified GPS Tracker")').isVisible();
    const hasSpeedH3 = await page.locator('h3:has-text("Electronic Speed Governor Unit")').isVisible();
    if (!hasAisH3 || !hasSpeedH3) {
      throw new Error('IoT hardware items (AIS-140 Tracker / Speed Governor) not found');
    }

    // Switch to Women Safety Tab
    await page.click('button:has-text("Women Night Protocol")');
    await page.waitForTimeout(400);

    const hasWomenTitle = await page.locator('h2:has-text("Women Passenger Night Transit Protocol")').isVisible();
    if (!hasWomenTitle) {
      throw new Error('Women Passenger Night Transit Protocol section not visible');
    }

    // Check WhatsApp inquiry link
    await page.click('button:has-text("50-Point Pre-Trip Audit")');
    await page.waitForTimeout(300);

    const waLink = await page.locator('a[href*="wa.me"]').first().getAttribute('href');
    if (!waLink || !waLink.includes('wa.me')) {
      throw new Error('WhatsApp safety audit inquiry link missing or malformed');
    }

    // Save Desktop Screenshot
    await saveImage(page, 'phase17-india-safety-desktop.png', { fullPage: true });
    console.log('✅ Test 3 Passed: IoT hardware stack, women night protocol, and desktop screenshot verified.');
    passedTests++;

    // ----------------------------------------------------
    // Test 4: UAE Limousine Safety Desk
    // ----------------------------------------------------
    console.log('--- Test 4: UAE Limousine Safety Desk ---');
    await page.goto(`${BASE_URL}/uae/safety`, { waitUntil: 'networkidle', timeout: 15000 });

    const uaeTitle = await page.locator('h1').textContent();
    console.log(`UAE Page H1: "${uaeTitle}"`);
    if (!uaeTitle || !uaeTitle.includes('UAE Executive Fleet Safety')) {
      throw new Error(`Expected UAE Executive Fleet Safety H1 title, received: ${uaeTitle}`);
    }

    const hasRta = await page.locator('text=RTA Linked').first().isVisible();
    if (!hasRta) {
      throw new Error('UAE RTA Linked metric not rendered');
    }

    // Save UAE Desktop Screenshot
    await saveImage(page, 'phase17-uae-safety-desktop.png', { fullPage: true });
    console.log('✅ Test 4 Passed: UAE Limousine safety desk loaded and screenshot captured.');
    passedTests++;

    // ----------------------------------------------------
    // Test 5: Mobile Viewport & Responsiveness
    // ----------------------------------------------------
    console.log('--- Test 5: Mobile Viewport & Responsiveness ---');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/india/safety`, { waitUntil: 'networkidle', timeout: 15000 });

    const mobileH1 = await page.locator('h1').first().isVisible();
    if (!mobileH1) {
      throw new Error('H1 title not visible on mobile viewport');
    }

    // Save Mobile Screenshot
    await saveImage(page, 'phase17-india-safety-mobile.png', { fullPage: true });
    console.log('✅ Test 5 Passed: Mobile responsiveness verified and screenshot captured.');
    passedTests++;

    console.log(`\n🎉 All ${passedTests}/${totalTests} Phase 17 verification tests PASSED successfully!`);
  } catch (error) {
    console.error('❌ Playwright Verification Error:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

verifyPhase17();
