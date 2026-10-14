import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';

// Read-only review of the local build. WhatsApp is intercepted, never sent.
const origin = process.env.REVIEW_ORIGIN || 'http://127.0.0.1:3000';
const out = 'docs/screenshots/conversion-review-2026-10-13';
const only = process.argv.find(arg => arg.startsWith('--only='))?.slice(7).split(',');
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const results = { origin, date: '2026-10-13', checks: {}, pages: [], errors: [] };
const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
desktop.on('pageerror', e => results.errors.push(e.message));
const go = async (page, route) => {
  const response = await page.goto(`${origin}${route}`, { waitUntil: 'networkidle', timeout: 90000 });
  await page.evaluate(() => document.fonts.ready);
  return response?.status();
};
const capture = async (page, name, route) => {
  const status = await go(page, route);
  // Load images below the fold before full-page capture, then return to the top.
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 700) {
    await page.evaluate(y => window.scrollTo(0, y), y);
    await page.waitForTimeout(80);
  }
  await page.waitForFunction(() => [...document.images].every(img => img.complete), { timeout: 15000 });
  await page.evaluate(() => window.scrollTo(0, 0));
  if (route === '/india') {
    await page.locator('section[aria-roledescription="carousel"]').hover();
    await page.getByRole('button', { name: 'Go to slide 1:', exact: false }).click();
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(550);
  await page.screenshot({ path: `${out}/${name}-fold.png` });
  await page.screenshot({ path: `${out}/${name}-full.png`, fullPage: true });
  results.pages.push(await page.evaluate(({ name, status }) => ({
    name, status, url: location.href, width: innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    h1: document.querySelector('h1')?.textContent,
    headings: [...document.querySelectorAll('main h2')].map(x => x.textContent),
    firstMainEnquiry: [...document.querySelectorAll('main a[href*="/contact?"]')].map(a => ({
      text: a.textContent.trim(), href: a.getAttribute('href'),
      top: Math.round(a.getBoundingClientRect().top + scrollY)
    }))[0] || null
  }), { name, status }));
};
try {
  if (process.argv.includes('--capture-only')) {
    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const small = await browser.newPage({ viewport: { width: 320, height: 740 }, isMobile: true, hasTouch: true });
    for (const [name, route] of [['home', '/india'], ['contact', '/india/contact'], ['airport', '/india/services/airport-transfers'], ['fleet', '/india/fleet']]) {
      if (!only || only.includes(`${name}-desktop`)) await capture(desktop, `${name}-desktop`, route);
      if (!only || only.includes(`${name}-mobile`)) await capture(mobile, `${name}-mobile`, route);
    }
    if (!only || only.includes('home-small-mobile')) await capture(small, 'home-small-mobile', '/india');
    if (!only || only.includes('contact-small-mobile')) await capture(small, 'contact-small-mobile', '/india/contact');
    if (!only) results.checks.fleetTariffs = await desktop.getByText(/₹/).allTextContents();
  } else {
  await desktop.goto(origin, { waitUntil: 'networkidle', timeout: 90000 });
  results.checks.rootRedirect = new URL(desktop.url()).pathname;
  await capture(desktop, 'home-desktop', '/india');
  results.checks.homeEnquiryTargetCount = await desktop.locator('#contact').count();
  results.checks.homeServiceButtons = [];
  const buttons = desktop.locator('#services').getByRole('button', { name: 'Discuss', exact: true });
  for (let i = 0; i < await buttons.count(); i++) {
    const button = buttons.nth(i);
    await button.scrollIntoViewIfNeeded();
    const before = await desktop.evaluate(() => ({ url: location.href, scrollY }));
    await button.click();
    await desktop.waitForTimeout(450);
    const after = await desktop.evaluate(() => ({ url: location.href, scrollY }));
    results.checks.homeServiceButtons.push({ mode: 'By Operations', index: i, before, after });
  }
  const all6Button = desktop.locator('#services').getByRole('button', { name: 'All 6 Services' });
  if (await all6Button.count() > 0) {
    await all6Button.click();
    const gridButtons = desktop.locator('#services').getByRole('button', { name: 'Enquire', exact: true });
    for (let i = 0; i < await gridButtons.count(); i++) {
      await gridButtons.nth(i).scrollIntoViewIfNeeded();
      const before = await desktop.evaluate(() => ({ url: location.href, scrollY }));
      await gridButtons.nth(i).click();
      await desktop.waitForTimeout(450);
      const after = await desktop.evaluate(() => ({ url: location.href, scrollY }));
      results.checks.homeServiceButtons.push({ mode: 'All 6 Services', index: i, before, after });
    }
  } else {
    const serviceLinks = desktop.locator('#services a[href*="/india/contact?service="]');
    results.checks.homeServiceLinks = [];
    for (let i = 0; i < await serviceLinks.count(); i++) {
      const link = serviceLinks.nth(i);
      results.checks.homeServiceLinks.push({
        text: await link.innerText(),
        href: await link.getAttribute('href')
      });
    }
  }
  await go(desktop, '/india');
  await desktop.locator('#fleet').getByRole('tab', { name: 'Luxury', exact: false }).click();
  await desktop.locator('#fleet').getByRole('link', { name: 'Enquire About' }).click();
  await desktop.waitForURL('**/india/contact?category=**');
  results.checks.luxuryCategoryHandoff = {
    url: desktop.url(), service: await desktop.getByLabel('Service Needed').inputValue(),
    category: await desktop.getByText('Preferred Category:', { exact: false }).innerText()
  };
  await capture(desktop, 'contact-desktop', '/india/contact?service=airport-transfers&city=Mumbai');
  results.checks.serviceAndCityPrefill = {
    service: await desktop.getByLabel('Service Needed').inputValue(),
    city: await desktop.getByLabel('City or Region').inputValue()
  };
  await desktop.evaluate(() => {
    window.__reviewOpened = [];
    window.open = (...args) => { window.__reviewOpened.push(args); return null; };
  });
  await desktop.getByRole('button', { name: 'Continue on WhatsApp' }).click();
  results.checks.emptyForm = await desktop.evaluate(() => ({
    opened: window.__reviewOpened.length,
    focusedId: document.activeElement.id,
    errors: [...document.querySelectorAll('[role="alert"]')].map(x => x.textContent)
  }));
  await desktop.getByLabel('Your Name').fill('Review Test');
  await desktop.getByLabel('Journey or Schedule Details').fill('Review only: airport pickup on 20 October, 2 passengers, 2 bags.');
  await desktop.getByRole('button', { name: 'Continue on WhatsApp' }).click();
  results.checks.whatsappDraft = await desktop.evaluate(() => window.__reviewOpened);
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  mobile.on('pageerror', e => results.errors.push(e.message));
  await capture(mobile, 'home-mobile', '/india');
  await capture(mobile, 'contact-mobile', '/india/contact');
  await capture(mobile, 'airport-mobile', '/india/services/airport-transfers');
  await capture(desktop, 'airport-desktop', '/india/services/airport-transfers');
  const small = await browser.newPage({ viewport: { width: 320, height: 740 }, isMobile: true, hasTouch: true });
  await capture(small, 'home-small-mobile', '/india');
  await capture(small, 'contact-small-mobile', '/india/contact');
  const reduced = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  await go(reduced, '/india');
  const carousel = reduced.locator('section[aria-roledescription="carousel"]');
  await carousel.getByRole('link', { name: 'Explore Service' }).focus();
  const titleBefore = await carousel.locator('h1').innerText();
  const hrefBefore = await carousel.getByRole('link', { name: 'Explore Service' }).getAttribute('href');
  await reduced.waitForTimeout(2200);
  results.checks.reducedMotionWhileFocused = {
    titleBefore, titleAfter: await carousel.locator('h1').innerText(),
    hrefBefore, hrefAfter: await carousel.getByRole('link', { name: 'Explore Service' }).getAttribute('href'),
    pauseButtonCount: await carousel.getByRole('button', { name: /pause|stop/i }).count(),
    controls: await carousel.locator('button').evaluateAll(nodes => nodes.map(n => ({
      label: n.getAttribute('aria-label'), width: n.getBoundingClientRect().width, height: n.getBoundingClientRect().height
    })))
  };
  }
} catch (error) {
  results.scriptError = String(error.stack || error);
  process.exitCode = 1;
} finally {
  const resultName = only ? 'screenshot-recheck' : process.argv.includes('--capture-only') ? 'screenshot-metrics' : 'results';
  await writeFile(`${out}/${resultName}.json`, JSON.stringify(results, null, 2));
  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}
