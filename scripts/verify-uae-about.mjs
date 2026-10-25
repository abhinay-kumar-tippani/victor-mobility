import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const base = process.env.BASE_URL || 'http://127.0.0.1:3000';
const read = async name => JSON.parse(await fs.readFile(new URL(`../src/content/${name}.json`, import.meta.url), 'utf8'));
const [india, uae, journey] = await Promise.all([read('india'), read('uae'), read('journey')]);
const output = fileURLToPath(new URL('../docs/screenshots/', import.meta.url));
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const errors = [];
let uaeHeadings = [];

async function scrollTo(page, selector) {
  await page.locator(selector).evaluate(el => window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 112, behavior: 'instant' }));
  await page.waitForTimeout(450);
}

try {
  for (const [width, locale] of [[1440, 'en'], [1024, 'en'], [768, 'en'], [390, 'en'], [320, 'en'], [1440, 'ar'], [390, 'ar']]) {
    const page = await browser.newPage({ viewport: { width, height: width >= 1024 ? 1000 : 844 } });
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(locale => localStorage.setItem('victor_locale_uae', locale), locale);
    const response = await page.goto(`${base}/uae/about`, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    await page.evaluate(() => document.fonts.ready);
    const main = page.locator('main');
    if (width === 1440 && locale === 'en') uaeHeadings = await main.locator('h2').allTextContents();
    const text = await main.innerText();
    for (const expected of [uae.aboutPage.leadershipTitle, uae.founder.name, uae.founder.bio, india.contact.name, uae.aboutPage.commercialDescription, uae.aboutPage.brandsTitle, uae.aboutPage.brandsNote, journey.title, '2,000+ Executive Cars', '500+ Luxury Coaches', 'DXB Airport Staging', 'Dubai Operating Office', 'Frequently Asked Questions', uae.aboutPage.contactTitle]) {
      assert.ok(text.includes(expected), `${width}px ${locale} missing ${expected}`);
    }
    for (const faq of uae.faqs) assert.ok(text.includes(faq.question) && text.includes(faq.answer));
    assert.equal(await main.locator('a[href^="/india"]').count(), 0, 'UAE enquiry links must stay in UAE');
    assert.equal(await page.locator('#top-brands-carried li').count(), india.topBrandsCarried.brands.length);
    const leader = page.locator('#commercial-leadership');
    assert.equal(await leader.locator(`a[href="${india.contact.phoneHref}"]`).count(), 1);
    const whatsapp = await leader.getByRole('link', { name: uae.aboutPage.commercialWhatsappLabel }).getAttribute('href');
    assert.ok(whatsapp.startsWith(`https://wa.me/${india.contact.whatsappDigits}?text=`));
    assert.equal(new URL(whatsapp).searchParams.get('text'), uae.aboutPage.commercialWhatsappMessage);
    assert.ok((await main.getByRole('link', { name: uae.aboutPage.contactAction, exact: true }).getAttribute('href')) === '/uae/contact');
    for (const office of uae.offices.filter(office => office.published)) {
      const map = page.getByRole('link', { name: `Open ${office.city} office in Google Maps (new tab)`, exact: true });
      assert.equal(new URL(await map.getAttribute('href')).searchParams.get('query'), office.address);
      assert.ok(await page.getByRole('link', { name: `Get directions to ${office.city} office (new tab)`, exact: true }).count());
    }
    const items = page.locator('#journey ol > li');
    assert.equal(await items.count(), 12);
    for (const [index, milestone] of journey.milestones.entries()) {
      const value = await items.nth(index).innerText();
      for (const expected of [milestone.date, milestone.title, milestone.description]) assert.ok(value.includes(expected));
    }
    const alignment = await page.locator('[data-slot="timeline"]').evaluate(el => {
      const rail = el.firstElementChild.getBoundingClientRect();
      const nodes = [...el.querySelectorAll('ol > li > span[aria-hidden]')].map(el => el.getBoundingClientRect());
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        x: Math.max(...nodes.map(node => Math.abs(node.left + node.width / 2 - rail.left - rail.width / 2))),
        start: Math.abs(rail.top - nodes[0].top - nodes[0].height / 2),
        end: Math.abs(rail.bottom - nodes.at(-1).top - nodes.at(-1).height / 2),
      };
    });
    assert.equal(alignment.overflow, 0, `${width}px ${locale} page overflow`);
    assert.ok(alignment.x < 1 && alignment.start < 1 && alignment.end < 1, `${width}px ${locale} timeline geometry`);
    assert.equal(await page.locator('html').getAttribute('dir'), locale === 'ar' ? 'rtl' : 'ltr');
    assert.equal(await page.locator('#journey nav a').first().locator('span[dir="ltr"]').innerText(), journey.chapters[0].years);
    const rangeFits = await page.locator('#journey div[dir="ltr"]').evaluate(el => {
      const bounds = el.getBoundingClientRect();
      return [...el.querySelectorAll(':scope > span')].every(span => {
        const box = span.getBoundingClientRect();
        return box.left >= bounds.left - 1 && box.right <= bounds.right + 1;
      });
    });
    assert.ok(rangeFits, 'Date range must fit in both text directions');

    // Load every portrait/logo before taking truthful screenshots with the existing floating controls.
    await page.locator('#commercial-leadership').scrollIntoViewIfNeeded();
    await page.locator('#top-brands-carried').scrollIntoViewIfNeeded();
    await page.locator('main > section').last().scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.querySelectorAll('main img')].every(img => img.complete && img.naturalWidth > 0));
    if ((width === 1440 || width === 390) && locale === 'en') {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForTimeout(200);
      await page.screenshot({ path: `${output}uae-about-updated-${width}.png`, fullPage: true });
      await page.locator('#commercial-leadership').screenshot({ path: `${output}uae-about-leadership-${width}.png` });
      await page.locator('main > section').last().screenshot({ path: `${output}uae-about-contact-${width}.png` });
      await scrollTo(page, '#journey');
      await page.screenshot({ path: `${output}uae-about-journey-${width}.png` });
    }
    if (width === 390 && locale === 'ar') {
      await scrollTo(page, '#journey');
      await page.screenshot({ path: `${output}uae-about-journey-rtl-390.png` });
    }
    await scrollTo(page, '#journey');
    const initial = await page.locator('[data-slot="timeline"] > div > div').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m22);
    await page.getByRole('navigation', { name: 'Journey chapters' }).getByRole('link').last().focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => location.hash === '#journey-milestone-8');
    await page.waitForTimeout(900);
    const targetTop = await items.nth(7).evaluate(el => el.getBoundingClientRect().top);
    assert.ok(targetTop >= 100 && targetTop < 160, 'Chapter anchor must clear header');
    const later = await page.locator('[data-slot="timeline"] > div > div').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m22);
    assert.ok(later > initial + 0.2, 'Scroll trace must advance');
    console.log(`PASS UAE ${width}px ${locale}: section parity, content, contacts, map links, geometry, images, keyboard and scroll progress`);
    await page.close();
  }

  const reduced = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  await reduced.goto(`${base}/uae/about`, { waitUntil: 'networkidle' });
  assert.equal(await reduced.locator('[data-slot="timeline"] > div > div').evaluate(el => getComputedStyle(el).transform), 'matrix(1, 0, 0, 1, 0, 0)');
  await reduced.close();
  const staticPage = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 320, height: 844 } });
  await staticPage.goto(`${base}/uae/about`, { waitUntil: 'load' });
  assert.equal(await staticPage.locator('#journey article:visible').count(), 12);
  assert.equal(await staticPage.locator('#commercial-leadership:visible').count(), 1);
  assert.equal(await staticPage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), 0);
  await staticPage.close();

  const regression = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await regression.goto(`${base}/india/about`, { waitUntil: 'networkidle' });
  assert.equal(await regression.locator('#journey ol > li').count(), 12);
  assert.equal(await regression.locator('#top-brands-title').innerText(), india.topBrandsCarried.title);
  assert.equal(await regression.locator('#top-brands-carried p').count(), 0);
  const regionalHeadings = {
    [india.topBrandsCarried.title]: uae.aboutPage.brandsTitle,
    'Established India Operating Network': 'Dubai Operating Office',
  };
  const missingSections = (await regression.locator('main h2').allTextContents())
    .map(title => title.trim())
    .filter(title => !uaeHeadings.map(value => value.trim()).includes(regionalHeadings[title] || title));
  assert.deepEqual(missingSections, [], 'Every visible India About section must have a UAE counterpart');
  await regression.close();
  assert.deepEqual(errors, []);
  console.log('PASS reduced motion, no-JavaScript content, India brand/timeline regression, and zero runtime errors');
} finally {
  await browser.close();
}
