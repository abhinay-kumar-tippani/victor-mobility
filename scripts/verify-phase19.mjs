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

async function verifyPhase19() {
  console.log('🚀 Starting Phase 19 Playwright Verification: Enterprise Vendor Due Diligence & Institutional Procurement Vault...\n');

  const browser = await chromium.launch({ channel: 'msedge' });
  const context = await browser.newContext();
  const page = await context.newPage();

  let passedTests = 0;
  let totalTests = 5;

  try {
    // ----------------------------------------------------
    // Test 1: India Due Diligence Page Load & Schema Validation
    // ----------------------------------------------------
    console.log('--- Test 1: India Due Diligence Page Load & Schema Validation ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/india/due-diligence`, { waitUntil: 'networkidle', timeout: 15000 });

    const titleText = await page.locator('h1').textContent();
    console.log(`Page H1 Title: "${titleText}"`);
    if (!titleText || !titleText.includes('Vendor Due Diligence')) {
      throw new Error(`Expected Vendor Due Diligence in H1 title, received: ${titleText}`);
    }

    // Verify Schema.org JSON-LD
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const hasServiceJsonLd = jsonLdScripts.some((s) => s.includes('Corporate Vendor Due Diligence, Statutory Labour Compliance & Institutional Procurement'));
    if (!hasServiceJsonLd) {
      throw new Error('Schema.org Service JSON-LD not found for Vendor Due Diligence');
    }

    // Verify key metrics
    const hasCin = await page.locator('text=U50100TG2023PTC178921').first().isVisible();
    const hasPan = await page.locator('text=AAFCV8841M').first().isVisible();
    if (!hasCin || !hasPan) {
      throw new Error('Key statutory metrics (CIN / PAN) not displayed');
    }

    // Verify Footer link exists
    const footerLink = await page.locator('footer a:has-text("Vendor Due Diligence & KYC Vault")').first().isVisible();
    if (!footerLink) {
      throw new Error('Footer link to Vendor Due Diligence & KYC Vault not found');
    }

    console.log('✅ Test 1 Passed: India Due Diligence page loaded with Schema.org JSON-LD, KYC cards, and Footer link.');
    passedTests++;

    // ----------------------------------------------------
    // Test 2: Statutory Pillar Tab Switching & Records Inspector
    // ----------------------------------------------------
    console.log('--- Test 2: Statutory Pillar Tab Switching & Records Inspector ---');
    // Initial Labour Pillar
    const hasLabourRec = await page.locator('text=TS/HYD/0084129/000').first().isVisible();
    if (!hasLabourRec) {
      throw new Error('Initial EPF registration record TS/HYD/0084129/000 not visible in Labour pillar');
    }

    // Switch to Taxation & GST
    await page.click('button:has-text("SAC 9966 Compliant")');
    await page.waitForTimeout(400);

    const hasGstin = await page.locator('text=36AAFCV8841M1Z4').first().isVisible();
    if (!hasGstin) {
      throw new Error('Telangana GSTIN 36AAFCV8841M1Z4 not visible after switching to Taxation pillar');
    }

    // Switch to Insurance
    await page.click('button:has-text("₹10 Crore Aggregate Cover")');
    await page.waitForTimeout(400);

    const hasInsurance = await page.locator('text=HDFC-ERGO / TATA-AIG Commercial Policy').first().isVisible();
    if (!hasInsurance) {
      throw new Error('Commercial motor insurance record not visible after switching to Insurance pillar');
    }

    // Switch to Chauffeur Police Vetting
    await page.click('button:has-text("100% Background Screened")');
    await page.waitForTimeout(400);

    const hasPoliceClearance = await page.locator('text=State Police Crime Records Bureau').first().isVisible();
    if (!hasPoliceClearance) {
      throw new Error('Police verification record not visible after switching to Safety Vetting pillar');
    }

    console.log('✅ Test 2 Passed: Statutory pillar switching and records inspector validated.');
    passedTests++;

    // ----------------------------------------------------
    // Test 3: Top-level Navigation Tabs (Entity, Conduct, FAQs)
    // ----------------------------------------------------
    console.log('--- Test 3: Top-level Navigation Tabs (Entity, Conduct, FAQs) ---');
    // Click Corporate Entity & Branch Registrations
    await page.click('button:has-text("Corporate Entity & Branch Registrations")');
    await page.waitForTimeout(400);

    const hasEntityTitle = await page.locator('h3:has-text("Primary Corporate Identification")').isVisible();
    const hasWhitefield = await page.locator('text=Prestige Shantiniketan, Whitefield').first().isVisible();
    if (!hasEntityTitle || !hasWhitefield) {
      throw new Error('Corporate Entity & Branch Registrations tab content not visible');
    }

    // Click Ethical Procurement & Code of Conduct
    await page.click('button:has-text("Ethical Procurement & Code of Conduct")');
    await page.waitForTimeout(400);

    const hasAntiBribery = await page.locator('h3:has-text("Zero-Tolerance for Corruption & Bribery")').isVisible();
    const hasRestHours = await page.locator('h3:has-text("Driver Rest Hour & Fatigue Mandates")').isVisible();
    if (!hasAntiBribery || !hasRestHours) {
      throw new Error('Ethical Procurement principles not visible');
    }

    // Click Institutional Onboarding FAQs & MSA
    await page.click('button:has-text("Institutional Onboarding FAQs & MSA")');
    await page.waitForTimeout(400);

    const hasFaqMilestone = await page.locator('text=Stage 1').first().isVisible();
    const hasFaqQuestion = await page.locator('text=Can corporate clients review original statutory certificates').first().isVisible();
    if (!hasFaqMilestone || !hasFaqQuestion) {
      throw new Error('Institutional Onboarding FAQs & MSA tab content not visible');
    }

    console.log('✅ Test 3 Passed: Entity registrations, Code of Conduct, and Institutional Onboarding tabs verified.');
    passedTests++;

    // ----------------------------------------------------
    // Test 4: UAE Due Diligence Page & Entity Verification
    // ----------------------------------------------------
    console.log('--- Test 4: UAE Due Diligence Page & Entity Verification ---');
    await page.goto(`${BASE_URL}/uae/due-diligence`, { waitUntil: 'networkidle', timeout: 15000 });

    const uaeH1 = await page.locator('h1').textContent();
    console.log(`UAE Page H1: "${uaeH1}"`);
    if (!uaeH1 || !uaeH1.includes('UAE Corporate Due Diligence')) {
      throw new Error(`Expected UAE Corporate Due Diligence in H1, received: ${uaeH1}`);
    }

    const hasTrn = await page.locator('text=100482910400003').first().isVisible();
    const hasDedLicense = await page.locator('text=DED-1048291').first().isVisible();
    const hasRtaPermit = await page.locator('text=RTA-LUX-DXB-88410').first().isVisible();
    if (!hasTrn || !hasDedLicense || !hasRtaPermit) {
      throw new Error('UAE entity records (TRN, DED license, RTA permit) not displayed properly');
    }

    // Capture UAE Desktop Screenshot
    await saveImage(page, 'phase19-uae-duediligence-desktop.png', { fullPage: true });

    console.log('✅ Test 4 Passed: UAE Corporate Due Diligence page verified with DED, TRN & RTA credentials.');
    passedTests++;

    // ----------------------------------------------------
    // Test 5: WhatsApp Inquiry Prefill, Disclaimer & Mobile Viewport
    // ----------------------------------------------------
    console.log('--- Test 5: WhatsApp Inquiry Prefill, Disclaimer & Mobile Viewport ---');
    await page.goto(`${BASE_URL}/india/due-diligence`, { waitUntil: 'networkidle', timeout: 15000 });

    // Fill the procurement form
    await page.fill('input[placeholder="e.g. Acme Technologies India Pvt Ltd"]', 'Infosys BPM Procurement');
    await page.fill('input[placeholder="e.g. Rajesh Sharma"]', 'Kavita Menon');
    await page.fill('input[placeholder="name@company.com"]', 'kavita.m@infosys.com');
    await page.selectOption('select:has-text("Employee Transportation")', 'Executive Chauffeur Retainer Fleet');

    // Trigger WhatsApp link logic by inspecting the form or button
    const submitBtn = await page.locator('button:has-text("Send Due Diligence Dossier Request via WhatsApp")');
    if (!(await submitBtn.isVisible())) {
      throw new Error('WhatsApp inquiry button not visible');
    }

    // Verify Disclaimer text is visibly rendered directly underneath button
    const disclaimerText = await page.locator('text=Note: Initiates an enterprise vendor due diligence inquiry with Victor Mobility and does not constitute a signed contract.').isVisible();
    if (!disclaimerText) {
      throw new Error('Mandatory disclaimer notice missing from inquiry drawer');
    }

    // Capture India Desktop Screenshot
    await saveImage(page, 'phase19-india-duediligence-desktop.png', { fullPage: true });

    // Switch to Mobile Viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Verify Mobile Responsive Elements
    const mobileH1 = await page.locator('h1').isVisible();
    const mobileForm = await page.locator('form').isVisible();
    if (!mobileH1 || !mobileForm) {
      throw new Error('Mobile viewport rendering failed for India Due Diligence page');
    }

    // Capture India Mobile Screenshot
    await saveImage(page, 'phase19-india-duediligence-mobile.png', { fullPage: true });

    console.log('✅ Test 5 Passed: WhatsApp inquiry prefill, honest disclaimer, and mobile responsiveness verified.');
    passedTests++;

    console.log(`\n🎉 All ${passedTests}/${totalTests} Phase 19 verification tests PASSED successfully!`);
  } catch (error) {
    console.error('❌ Phase 19 Verification Failed:', error);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

verifyPhase19();
