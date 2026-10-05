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

async function verifyPhase12() {
  console.log('🚀 Starting Phase 12 Playwright Verification: Enterprise SLA & Compliance Desk...\n');

  const browser = await chromium.launch({ channel: 'msedge' });
  const context = await browser.newContext();
  const page = await context.newPage();

  let passedTests = 0;
  let totalTests = 5;

  try {
    // ----------------------------------------------------
    // Test 1: India SLA Desk Page Load & Core Pillars
    // ----------------------------------------------------
    console.log('--- Test 1: India SLA Desk Page Load & Core Pillars ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/india/sla`, { waitUntil: 'networkidle', timeout: 15000 });

    const titleText = await page.locator('h1').textContent();
    console.log(`Page H1 Title: "${titleText}"`);
    if (!titleText || !titleText.includes('Service Level Agreement')) {
      throw new Error(`Expected SLA H1 title, received: ${titleText}`);
    }

    // Verify 5 core pillars
    const pillarsCount = await page.locator('text=Buffer Protocol:').count();
    console.log(`Found ${pillarsCount} Core SLA Pillars`);
    if (pillarsCount < 5) {
      throw new Error(`Expected at least 5 core SLA pillars, found ${pillarsCount}`);
    }

    // Check JSON-LD
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const hasServiceJsonLd = jsonLdScripts.some((s) => s.includes('Corporate Transportation & Fleet Logistics SLA'));
    if (!hasServiceJsonLd) {
      throw new Error(`Schema.org Service JSON-LD not found in scripts: ${JSON.stringify(jsonLdScripts)}`);
    }
    console.log('✅ Test 1 Passed: India SLA Desk and 5 pillars verified.');
    passedTests++;

    // ----------------------------------------------------
    // Test 2: Interactive SLA & Fleet Calculator
    // ----------------------------------------------------
    console.log('--- Test 2: Interactive SLA & Fleet Calculator ---');
    // Click on Calculator Tab
    await page.click('button:has-text("Interactive SLA & Fleet Calculator")');
    await page.waitForTimeout(500);

    const calcHeader = await page.locator('h2:has-text("Interactive Enterprise SLA & Fleet Matrix")').isVisible();
    if (!calcHeader) {
      throw new Error('Calculator tab did not activate properly');
    }

    // Select Employee Commute Tier
    await page.click('button:has-text("Enterprise Employee Commute")');
    await page.waitForTimeout(300);

    // Verify Blueprint updated
    const activeTierName = await page.locator('h3:has-text("Enterprise Employee Commute")').isVisible();
    if (!activeTierName) {
      throw new Error('Service tier switch failed');
    }

    // Verify WhatsApp inquiry link
    const waLink = await page.locator('a:has-text("Discuss SLA on WhatsApp")').getAttribute('href');
    console.log(`WhatsApp Link: ${waLink ? waLink.slice(0, 60) + '...' : 'null'}`);
    if (!waLink || !waLink.includes('wa.me') || !waLink.includes('Enterprise%20Employee%20Commute')) {
      throw new Error('WhatsApp inquiry link does not contain configured SLA parameters');
    }

    // Check print button presence
    const printBtn = await page.locator('button:has-text("Print Calculated SLA Dossier")').isVisible();
    if (!printBtn) {
      throw new Error('Print SLA Dossier button not visible');
    }
    console.log('✅ Test 2 Passed: Interactive SLA Calculator & WhatsApp link verified.');
    passedTests++;

    // ----------------------------------------------------
    // Test 3: Escalation Matrix & Statutory Compliance Vault
    // ----------------------------------------------------
    console.log('--- Test 3: Escalation Matrix & Statutory Compliance Vault ---');
    // Click Escalation Tab
    await page.click('button:has-text("Escalation Matrix")');
    await page.waitForTimeout(500);

    const escalationLevels = await page.locator('text=Communication Channel').count();
    console.log(`Found ${escalationLevels} Escalation Hierarchy Levels`);
    if (escalationLevels < 4) {
      throw new Error(`Expected 4 escalation levels, found ${escalationLevels}`);
    }

    // Click Statutory Compliance Tab
    await page.click('button:has-text("Statutory Compliance Vault")');
    await page.waitForTimeout(500);

    const complianceCards = await page.locator('h3:has-text("Corporate Incorporation & Tax")').isVisible();
    const insuranceCards = await page.locator('h3:has-text("Comprehensive Insurance & Liability")').isVisible();
    if (!complianceCards || !insuranceCards) {
      throw new Error('Statutory compliance vault sections not found');
    }
    console.log('✅ Test 3 Passed: Escalation Matrix and Compliance Vault verified.');
    passedTests++;

    // ----------------------------------------------------
    // Test 4: UAE SLA Page Load & RTA Framework
    // ----------------------------------------------------
    console.log('--- Test 4: UAE SLA Page Load & RTA Framework ---');
    await page.goto(`${BASE_URL}/uae/sla`, { waitUntil: 'networkidle', timeout: 15000 });

    const uaeTitle = await page.locator('h1').textContent();
    console.log(`UAE H1: "${uaeTitle}"`);
    if (!uaeTitle || !uaeTitle.includes('UAE Corporate SLA')) {
      throw new Error(`Expected UAE Corporate SLA H1, received: ${uaeTitle}`);
    }

    // Verify UAE specific metrics (e.g. 99.6%)
    const uaeOnTime = await page.locator('span:has-text("99.6%")').first().isVisible();
    if (!uaeOnTime) {
      throw new Error('UAE 99.6% On-Time Protocol Guarantee not found');
    }

    // Verify Footer link
    const footerSlaLink = await page.locator('footer a:has-text("Enterprise SLA & Compliance")').isVisible();
    if (!footerSlaLink) {
      throw new Error('Footer does not contain Enterprise SLA & Compliance link');
    }

    // Capture UAE Desktop Screenshot
    await saveImage(page, 'phase12-uae-sla-desktop.png', { fullPage: true });

    console.log('✅ Test 4 Passed: UAE SLA Page & RTA Framework verified.');
    passedTests++;

    // ----------------------------------------------------
    // Test 5: Mobile View (390px) & India Desktop Screenshot
    // ----------------------------------------------------
    console.log('--- Test 5: Mobile View (390px) & India Desktop Screenshot ---');
    // India Desktop Screenshot
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/india/sla`, { waitUntil: 'networkidle', timeout: 15000 });
    await saveImage(page, 'phase12-india-sla-desktop.png', { fullPage: true });

    // Mobile Viewport (iPhone 14: 390 x 844)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/india/sla`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(500);

    await saveImage(page, 'phase12-india-sla-mobile.png', { fullPage: true });

    console.log('✅ Test 5 Passed: Mobile view & Desktop screenshots verified.');
    passedTests++;

    console.log(`\n🎉 PHASE 12 VERIFICATION COMPLETE: ${passedTests}/${totalTests} TESTS PASSED!`);
  } catch (error) {
    console.error('❌ Phase 12 Verification Failed:', error);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

verifyPhase12();
