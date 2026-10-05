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

async function verifyPhase15() {
  console.log('🚀 Starting Phase 15 Playwright Verification: Tech Park & Commercial Corridor Navigator...\n');

  const browser = await chromium.launch({ channel: 'msedge' });
  const context = await browser.newContext();
  const page = await context.newPage();

  let passedTests = 0;
  let totalTests = 5;

  try {
    // ----------------------------------------------------
    // Test 1: India Corridors Page Load & Schema Validation
    // ----------------------------------------------------
    console.log('--- Test 1: India Corridors Page Load & Schema Validation ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/india/corridors`, { waitUntil: 'networkidle', timeout: 15000 });

    const titleText = await page.locator('h1').textContent();
    console.log(`Page H1 Title: "${titleText}"`);
    if (!titleText || !titleText.includes('Corridor')) {
      throw new Error(`Expected Corridor in H1 title, received: ${titleText}`);
    }

    // Verify Schema.org JSON-LD
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const hasServiceJsonLd = jsonLdScripts.some((s) => s.includes('Tech Park & Commercial Corridor Transit Navigator'));
    if (!hasServiceJsonLd) {
      throw new Error('Schema.org Service JSON-LD not found for Tech Park Corridors');
    }

    // Verify City Tabs
    const hasHyderabad = await page.locator('button:has-text("Hyderabad")').isVisible();
    const hasBengaluru = await page.locator('button:has-text("Bengaluru")').isVisible();
    const hasPune = await page.locator('button:has-text("Pune")').isVisible();
    if (!hasHyderabad || !hasBengaluru || !hasPune) {
      throw new Error('City selection tabs missing for India corridors');
    }

    console.log('✅ Test 1 Passed: India Corridors page loaded with Schema.org JSON-LD and city tabs.');
    passedTests++;

    // ----------------------------------------------------
    // Test 2: City Switching & Hub Explorer
    // ----------------------------------------------------
    console.log('--- Test 2: City Switching & Hub Explorer ---');
    // Check initial Hyderabad hubs in Planner
    const hasHitecCity = await page.locator('h3:has-text("Hitec City & Madhapur IT Corridor")').isVisible();
    if (!hasHitecCity) {
      throw new Error('Hitec City corridor card not visible');
    }

    // Switch to Bengaluru in Planner
    await page.click('button:has-text("Bengaluru")');
    await page.waitForTimeout(400);

    const hasWhitefield = await page.locator('h3:has-text("Whitefield IT Export Corridor")').isVisible();
    if (!hasWhitefield) {
      throw new Error('Bengaluru corridor hub (Whitefield) not displayed after city switch');
    }

    // Switch to Explorer Tab
    await page.click('button:has-text("Tech Park Transit Profiles")');
    await page.waitForTimeout(400);

    const hasORR = await page.locator('text=Outer Ring Road (ORR) Technology Belt').first().isVisible();
    const hasManyata = await page.locator('text=Manyata Embassy Business Park').first().isVisible();
    if (!hasORR || !hasManyata) {
      throw new Error('Bengaluru corridor hubs (ORR / Manyata) not displayed in Explorer tab');
    }

    console.log('✅ Test 2 Passed: City switching to Bengaluru and Explorer profiles verified.');
    passedTests++;

    // ----------------------------------------------------
    // Test 3: Fleet Mix Calculator & Shift Protocol Blueprint
    // ----------------------------------------------------
    console.log('--- Test 3: Fleet Mix Calculator & Shift Protocol Blueprint ---');
    // Switch back to Planner Tab
    await page.click('button:has-text("Corridor Commute Planner")');
    await page.waitForTimeout(400);

    // Check presence of Headcount slider / input
    const slider = page.locator('input[type="range"]');
    if (await slider.isVisible()) {
      await slider.fill('400');
      await page.waitForTimeout(300);
    }

    // Check fleet calculation display
    const hasCoachCount = await page.locator('text=44-Seater Coaches').isVisible();
    const hasStandby = await page.locator('text=Standby Buffer').isVisible();
    if (!hasCoachCount || !hasStandby) {
      throw new Error('Calculated fleet composition cards not found');
    }

    // Verify WhatsApp Corridor Route Study link
    const waLink = await page.locator('a[href*="wa.me"]').first().getAttribute('href');
    if (!waLink || !waLink.includes('wa.me')) {
      throw new Error('WhatsApp study dispatch link missing or malformed');
    }

    // Save Desktop Screenshot
    await saveImage(page, 'phase15-india-corridors-desktop.png', { fullPage: true });
    console.log('✅ Test 3 Passed: Fleet mix calculator verified and desktop screenshot captured.');
    passedTests++;

    // ----------------------------------------------------
    // Test 4: UAE Commercial Corridors & Free Zones
    // ----------------------------------------------------
    console.log('--- Test 4: UAE Commercial Corridors & Free Zones ---');
    await page.goto(`${BASE_URL}/uae/corridors`, { waitUntil: 'networkidle', timeout: 15000 });

    const uaeTitle = await page.locator('h1').textContent();
    console.log(`UAE Page H1: "${uaeTitle}"`);
    if (!uaeTitle || !uaeTitle.includes('UAE Commercial Corridor')) {
      throw new Error(`Expected UAE Commercial Corridor H1 title, received: ${uaeTitle}`);
    }

    const hasDifc = await page.locator('h3:has-text("DIFC & Downtown Dubai Commercial Precinct")').isVisible();
    const hasDicOption = await page.locator('option:has-text("Dubai Internet City")').count() > 0;
    if (!hasDifc || !hasDicOption) {
      throw new Error('UAE hubs (DIFC / DIC) not rendered on UAE corridors page');
    }

    // Save UAE Desktop Screenshot
    await saveImage(page, 'phase15-uae-corridors-desktop.png', { fullPage: true });
    console.log('✅ Test 4 Passed: UAE Commercial Corridors desk loaded and screenshot captured.');
    passedTests++;

    // ----------------------------------------------------
    // Test 5: Mobile Viewport & Responsiveness
    // ----------------------------------------------------
    console.log('--- Test 5: Mobile Viewport & Responsiveness ---');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/india/corridors`, { waitUntil: 'networkidle', timeout: 15000 });

    const mobileH1 = await page.locator('h1').first().isVisible();
    if (!mobileH1) {
      throw new Error('H1 title not visible on mobile viewport');
    }

    // Save Mobile Screenshot
    await saveImage(page, 'phase15-india-corridors-mobile.png', { fullPage: true });
    console.log('✅ Test 5 Passed: Mobile responsiveness verified and screenshot captured.');
    passedTests++;

    console.log(`\n🎉 All ${passedTests}/${totalTests} Phase 15 verification tests PASSED successfully!`);
  } catch (error) {
    console.error('❌ Playwright Verification Error:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

verifyPhase15();
