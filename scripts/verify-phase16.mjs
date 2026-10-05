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

async function verifyPhase16() {
  console.log('🚀 Starting Phase 16 Playwright Verification: Enterprise Rate Card & Retainer Desk...\n');

  const browser = await chromium.launch({ channel: 'msedge' });
  const context = await browser.newContext();
  const page = await context.newPage();

  let passedTests = 0;
  let totalTests = 5;

  try {
    // ----------------------------------------------------
    // Test 1: India Rate Card Page Load & Schema Validation
    // ----------------------------------------------------
    console.log('--- Test 1: India Rate Card Page Load & Schema Validation ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/india/rate-card`, { waitUntil: 'networkidle', timeout: 15000 });

    const titleText = await page.locator('h1').textContent();
    console.log(`Page H1 Title: "${titleText}"`);
    if (!titleText || !titleText.includes('Rate Card')) {
      throw new Error(`Expected Rate Card in H1 title, received: ${titleText}`);
    }

    // Verify Schema.org JSON-LD
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const hasServiceJsonLd = jsonLdScripts.some((s) => s.includes('Corporate Ground Transportation Rate Card & Retainer Services'));
    if (!hasServiceJsonLd) {
      throw new Error('Schema.org Service JSON-LD not found for Rate Card');
    }

    // Verify key metrics
    const hasCredit = await page.locator('text=30-Day Net').first().isVisible();
    const hasRebate = await page.locator('text=Up to 15%').first().isVisible();
    if (!hasCredit || !hasRebate) {
      throw new Error('Key commercial metrics (30-Day Net / 15% Rebate) not displayed');
    }

    console.log('✅ Test 1 Passed: India Rate Card loaded with Schema.org JSON-LD and metrics.');
    passedTests++;

    // ----------------------------------------------------
    // Test 2: Category Switching & Standard Tariff Slabs
    // ----------------------------------------------------
    console.log('--- Test 2: Category Switching & Standard Tariff Slabs ---');
    // Initial Executive Sedan tariffs
    const hasSedanH3 = await page.locator('h3:has-text("Executive Sedan")').isVisible();
    const hasSedanDzire = await page.locator('text=Maruti Suzuki Dzire').first().isVisible();
    if (!hasSedanH3 || !hasSedanDzire) {
      throw new Error('Initial Executive Sedan category card not found');
    }

    // Switch to Corporate MPV
    await page.click('button:has-text("Corporate MPV")');
    await page.waitForTimeout(400);

    const hasMpvH3 = await page.locator('h3:has-text("Corporate MPV")').isVisible();
    const hasInnova = await page.locator('text=Toyota Innova Crysta').first().isVisible();
    if (!hasMpvH3 || !hasInnova) {
      throw new Error('Corporate MPV category not active after click');
    }

    // Switch to High-Capacity Commuter Coach
    await page.click('button:has-text("High-Capacity Commuter Coach")');
    await page.waitForTimeout(400);

    const hasCoachH3 = await page.locator('h3:has-text("High-Capacity Commuter Coach")').first().isVisible();
    if (!hasCoachH3) {
      throw new Error('High-Capacity Commuter Coach category not active after click');
    }

    console.log('✅ Test 2 Passed: Category switching between Sedans, MPVs, and Coaches verified.');
    passedTests++;

    // ----------------------------------------------------
    // Test 3: Volume Rebate & Retainer Sizing Calculator
    // ----------------------------------------------------
    console.log('--- Test 3: Volume Rebate & Retainer Sizing Calculator ---');
    // Switch to Calculator Tab
    await page.click('button:has-text("Volume Rebate Calculator")');
    await page.waitForTimeout(400);

    // Adjust fleet slider to 8 vehicles
    const slider = page.locator('input[type="range"]');
    if (await slider.isVisible()) {
      await slider.fill('8');
      await page.waitForTimeout(300);
    }

    // Verify calculation card
    const hasRebateBadge = await page.locator('text=8% Rebate Unlocked').isVisible();
    const hasTierLabel = await page.locator('text=Tier 2: Enterprise Fleet Growth').isVisible();
    if (!hasRebateBadge || !hasTierLabel) {
      throw new Error('Tier 2 volume rebate calculation not triggered for 8 vehicles');
    }

    // Verify WhatsApp rate inquiry link
    const waLink = await page.locator('a[href*="wa.me"]').first().getAttribute('href');
    if (!waLink || !waLink.includes('wa.me')) {
      throw new Error('WhatsApp rate inquiry link missing or malformed');
    }

    // Save Desktop Screenshot
    await saveImage(page, 'phase16-india-ratecard-desktop.png', { fullPage: true });
    console.log('✅ Test 3 Passed: Volume rebate calculator verified and desktop screenshot captured.');
    passedTests++;

    // ----------------------------------------------------
    // Test 4: UAE Limousine & Commercial Rate Card
    // ----------------------------------------------------
    console.log('--- Test 4: UAE Limousine & Commercial Rate Card ---');
    await page.goto(`${BASE_URL}/uae/rate-card`, { waitUntil: 'networkidle', timeout: 15000 });

    const uaeTitle = await page.locator('h1').textContent();
    console.log(`UAE Page H1: "${uaeTitle}"`);
    if (!uaeTitle || !uaeTitle.includes('UAE Executive Limousine')) {
      throw new Error(`Expected UAE Executive Limousine H1 title, received: ${uaeTitle}`);
    }

    const hasFirstClass = await page.locator('h3:has-text("First Class Saloon")').isVisible();
    const hasAedMonthly = await page.locator('text=AED 24,000').isVisible();
    if (!hasFirstClass || !hasAedMonthly) {
      throw new Error('UAE First Class Saloon tariffs not rendered properly');
    }

    // Save UAE Desktop Screenshot
    await saveImage(page, 'phase16-uae-ratecard-desktop.png', { fullPage: true });
    console.log('✅ Test 4 Passed: UAE Limousine rate card desk loaded and screenshot captured.');
    passedTests++;

    // ----------------------------------------------------
    // Test 5: Mobile Viewport & Responsiveness
    // ----------------------------------------------------
    console.log('--- Test 5: Mobile Viewport & Responsiveness ---');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/india/rate-card`, { waitUntil: 'networkidle', timeout: 15000 });

    const mobileH1 = await page.locator('h1').first().isVisible();
    if (!mobileH1) {
      throw new Error('H1 title not visible on mobile viewport');
    }

    // Save Mobile Screenshot
    await saveImage(page, 'phase16-india-ratecard-mobile.png', { fullPage: true });
    console.log('✅ Test 5 Passed: Mobile responsiveness verified and screenshot captured.');
    passedTests++;

    console.log(`\n🎉 All ${passedTests}/${totalTests} Phase 16 verification tests PASSED successfully!`);
  } catch (error) {
    console.error('❌ Playwright Verification Error:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

verifyPhase16();
