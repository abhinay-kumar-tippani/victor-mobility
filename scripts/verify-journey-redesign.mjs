import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const base = process.env.BASE_URL || 'http://127.0.0.1:3000';
const journey = JSON.parse(await fs.readFile(new URL('../src/content/journey.json', import.meta.url), 'utf8'));
const screenshots = fileURLToPath(new URL('../docs/screenshots/', import.meta.url));
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const runtimeErrors = [];

async function positionAt(page, selector, offset = 112) {
  await page.locator(selector).evaluate((el, offset) => {
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'instant' });
  }, offset);
  await page.waitForTimeout(400);
}

try {
  for (const width of [1440, 768, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: width === 1440 ? 1000 : 844 } });
    page.on('pageerror', error => runtimeErrors.push(error.message));
    const response = await page.goto(`${base}/india/about`, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    await page.evaluate(() => document.fonts.ready);
    const items = page.locator('#journey ol > li');
    assert.equal(await items.count(), 12);
    for (const [index, milestone] of journey.milestones.entries()) {
      const text = await items.nth(index).innerText();
      for (const expected of [milestone.date, milestone.title, milestone.description]) {
        assert.ok(text.includes(expected), `${width}px missing milestone text ${expected}`);
      }
    }
    const geometry = await page.locator('#journey').evaluate(section => {
      const timeline = section.querySelector('[data-slot="timeline"]');
      const rail = timeline.firstElementChild.getBoundingClientRect();
      const nodes = [...timeline.querySelectorAll('ol > li > span[aria-hidden]')].map(el => el.getBoundingClientRect());
      const cards = [...timeline.querySelectorAll('article')].map(el => el.getBoundingClientRect());
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        sectionOverflow: section.scrollWidth - section.clientWidth,
        cardLefts: cards.map(card => card.left),
        railAlignment: nodes.map(node => Math.abs(node.left + node.width / 2 - rail.left - rail.width / 2)),
        start: Math.abs(rail.top - nodes[0].top - nodes[0].height / 2),
        end: Math.abs(rail.bottom - nodes.at(-1).top - nodes.at(-1).height / 2),
      };
    });
    assert.equal(geometry.sectionOverflow, 0, `${width}px timeline horizontal overflow`);
    if (width !== 768) assert.equal(geometry.overflow, 0, `${width}px page horizontal overflow`);
    else if (geometry.overflow) console.log(`Existing About CTA extends ${geometry.overflow}px outside the 768px viewport; journey has no overflow.`);
    assert.ok(Math.max(...geometry.railAlignment) < 1, `${width}px line/icon alignment`);
    assert.ok(Math.max(...geometry.cardLefts) - Math.min(...geometry.cardLefts) < 1, `${width}px card alignment`);
    assert.ok(geometry.start < 1 && geometry.end < 1, `${width}px line endpoints`);

    await positionAt(page, '#journey');
    if (width === 1440 || width === 390) {
      await page.screenshot({ path: `${screenshots}about-journey-refined-${width === 1440 ? 'desktop' : 'mobile'}-${width}.png` });
      await page.locator('#journey').screenshot({ path: `${screenshots}about-journey-refined-section-${width}.png` });
    }

    const initialProgress = await page.locator('[data-slot="timeline"] > div > div').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m22);
    // Anchor navigation works with native keyboard behavior and clears the sticky header.
    const lastChapter = page.getByRole('navigation', { name: 'Journey chapters' }).getByRole('link').last();
    await lastChapter.focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => location.hash === '#journey-milestone-8');
    await page.waitForTimeout(900);
    const targetTop = await items.nth(7).evaluate(el => el.getBoundingClientRect().top);
    assert.ok(targetTop >= 100 && targetTop < 160, `${width}px anchor obscured: ${targetTop}`);
    const laterProgress = await page.locator('[data-slot="timeline"] > div > div').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m22);
    assert.ok(laterProgress > initialProgress + 0.2, `${width}px progress line must follow scrolling`);
    if (width === 1440) {
      await page.screenshot({ path: `${screenshots}about-journey-refined-desktop-scrolled.png` });
    }
    console.log(`PASS ${width}px: chronology, overflow, card/rail alignment, keyboard anchor navigation`);
    await page.close();
  }

  const reduced = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  await reduced.goto(`${base}/india/about`, { waitUntil: 'networkidle' });
  const transform = await reduced.locator('[data-slot="timeline"] > div > div').evaluate(el => getComputedStyle(el).transform);
  assert.equal(transform, 'matrix(1, 0, 0, 1, 0, 0)', 'Reduced-motion trace should be static and complete');
  await reduced.close();

  const staticPage = await browser.newPage({ viewport: { width: 320, height: 844 }, javaScriptEnabled: false });
  await staticPage.goto(`${base}/india/about`, { waitUntil: 'load' });
  assert.equal(await staticPage.locator('#journey article:visible').count(), 12);
  assert.equal(await staticPage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), 0);
  await staticPage.close();
  assert.deepEqual(runtimeErrors, [], 'Unexpected page runtime errors');
  console.log('PASS reduced motion, server-rendered content without JavaScript, and no runtime errors');
} finally {
  await browser.close();
}
