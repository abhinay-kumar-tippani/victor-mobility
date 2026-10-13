const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function runAudit() {
  const outputDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch({ channel: 'msedge' });
  
  const routes = [
    { name: 'home', url: 'http://localhost:3002/india' },
    { name: 'services-list', url: 'http://localhost:3002/india/services' },
    { name: 'service-detail', url: 'http://localhost:3002/india/services/employee-transportation' },
    { name: 'fleet', url: 'http://localhost:3002/india/fleet' },
    { name: 'about', url: 'http://localhost:3002/india/about' },
    { name: 'contact', url: 'http://localhost:3002/india/contact' },
    { name: 'privacy', url: 'http://localhost:3002/india/privacy' },
  ];

  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'mobile', width: 390, height: 844 }
  ];

  const auditReport = [];

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1
    });

    const page = await context.newPage();
    const consoleLogs = [];
    page.on('console', msg => consoleLogs.push({ type: msg.type(), text: msg.text() }));
    page.on('pageerror', err => consoleLogs.push({ type: 'pageerror', text: err.message }));

    for (const route of routes) {
      console.log(`Auditing ${route.name} (${vp.name})...`);
      try {
        const resp = await page.goto(route.url, { waitUntil: 'networkidle', timeout: 15000 });
        const status = resp ? resp.status() : 'no-response';

        // Check horizontal overflow
        const overflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });

        // Screenshot full page
        const screenshotPath = path.join(outputDir, `${route.name}-${vp.name}-full.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });

        // Screenshot viewport above the fold
        const foldPath = path.join(outputDir, `${route.name}-${vp.name}-fold.png`);
        await page.screenshot({ path: foldPath, fullPage: false });

        auditReport.push({
          route: route.name,
          url: route.url,
          viewport: vp.name,
          status,
          hasHorizontalOverflow: overflow,
          consoleLogs: [...consoleLogs]
        });
      } catch (err) {
        console.error(`Error on ${route.name}:`, err.message);
        auditReport.push({
          route: route.name,
          url: route.url,
          viewport: vp.name,
          error: err.message
        });
      }
    }

    await context.close();
  }

  await browser.close();

  fs.writeFileSync(
    path.join(__dirname, 'audit-results.json'),
    JSON.stringify(auditReport, null, 2)
  );
  console.log('Audit completed successfully. Results saved to docs/inspection/');
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
