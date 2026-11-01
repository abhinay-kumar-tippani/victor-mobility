import { chromium } from 'playwright';
import fs from 'node:fs';
const base = process.env.BRAND_BASE_URL || 'http://127.0.0.1:3000';
const allLocales = process.argv.includes('--all-locales');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const routes = [...new Set(['/', '/markets', ...Object.keys(JSON.parse(fs.readFileSync('.next/prerender-manifest.json')).routes).filter(r => /^\/(india|uae)(\/|$)/.test(r))])];
const queue = routes.flatMap(route => (allLocales ? (route.startsWith('/india') ? ['en','hi','te','kn','ta','ma','mr'] : route.startsWith('/uae') ? ['en','ar'] : ['en']) : ['en']).map(locale => ({route,locale})));
const results = [];
await Promise.all(Array.from({ length: 4 }, async () => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  while (queue.length) {
    const { route, locale } = queue.shift();
    await page.evaluate(locale => { localStorage.setItem('victor_locale_india',locale); localStorage.setItem('victor_locale_uae',locale); }, locale);
    const response = await page.goto(base + route, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(250);
    const audit = await page.evaluate(() => {
      const missed = [], protectedNames = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        const value = node.textContent;
        if (!/\bvictor\b/i.test(value) || node.parentElement.closest('script,style,svg,.sr-only')) continue;
        const parent = node.parentElement;
        const context = parent.closest('p,h1,h2,h3,h4,h5,h6,li,td,th,pre') || parent;
        const whole = context.textContent;
        // Protect names even when their words are in separate inline elements.
        const company = /\bvictor[\s.,]*mobility[\s.,]*pvt[\s.,]*ltd\b\.?/gi;
        const names = [...whole.matchAll(company)].map(m => m[0]);
        const stripped = value.replace(company, '').replace(/https?:\/\/\S+|[\w.+-]+@[\w.-]+\.[a-z]+/gi, '');
        if (names.length) protectedNames.push(...names);
        if (/\bvictor\b/i.test(stripped) && !(names.length && value.trim().toLowerCase() === 'victor')) {
          missed.push({ text: value.trim(), tag: parent.tagName, context: parent.outerHTML.slice(0,450) });
        }
      }
      return { missed, protectedNames, lang: document.documentElement.lang, logos: document.querySelectorAll('.victor-wordmark').length, overflow: document.documentElement.scrollWidth > innerWidth + 1 };
    });
    results.push({route,locale,status:response.status(),...audit,errors:errors.splice(0)});
  }
  await context.close();
}));
fs.mkdirSync('docs/inspection',{recursive:true});
fs.writeFileSync('docs/inspection/inline-brand-audit.json', JSON.stringify(results,null,2));
const failures = results.filter(r=>r.missed.length || r.errors.length || r.status!==200 || r.locale!==r.lang);
console.log(JSON.stringify({ pages:results.length, missed:results.reduce((n,r)=>n+r.missed.length,0), failures:failures.map(r=>({route:r.route,locale:r.locale,missed:r.missed,errors:r.errors})), overflow:results.filter(r=>r.overflow).map(r=>r.route) },null,2));
await browser.close();
if(failures.length) process.exitCode=1;
