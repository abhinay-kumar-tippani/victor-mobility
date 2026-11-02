import { chromium } from "playwright";
import fs from "node:fs";

const baseUrl = process.env.EYEBROW_PREVIEW_URL || "http://127.0.0.1:3034";
const manifest = JSON.parse(fs.readFileSync(".next/prerender-manifest.json", "utf8"));
const requested = process.argv.slice(2);
const routes = Object.keys(manifest.routes).filter((route) => !route.includes(".") && route !== "/_not-found" && (!requested.length || requested.includes(route)));
const browser = await chromium.launch({ channel: "msedge", headless: true });
const results = [];
const failures = [];

try {
  for (const viewport of [
    { name: "desktop", width: 1440, height: 900 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "mobile", width: 390, height: 844 },
    { name: "small-mobile", width: 320, height: 700 },
  ]) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, reducedMotion: "reduce" });
    const page = await context.newPage();
    for (const route of routes) {
      await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);
      const report = await page.evaluate(() => {
        const pairs = [...document.querySelectorAll(".section-eyebrow")].filter((eyebrow) => eyebrow.getBoundingClientRect().height > 0).map((eyebrow) => {
          let parent = eyebrow.parentElement;
          let title;
          while (parent && parent !== document.body && !title) {
            title = [...parent.querySelectorAll("h1,h2,h3,h4")].find((heading) => (eyebrow.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING) && heading.getBoundingClientRect().height > 0);
            parent = parent.parentElement;
          }
          const eyebrowSize = parseFloat(getComputedStyle(eyebrow).fontSize);
          const titleSize = title && parseFloat(getComputedStyle(title).fontSize);
          return { eyebrow: eyebrow.textContent.trim().replace(/\s+/g, " ").slice(0, 90), title: title?.textContent.trim().replace(/\s+/g, " ").slice(0, 90), eyebrowSize, titleSize, ratio: titleSize ? eyebrowSize / titleSize : null };
        });
        const overflow = document.documentElement.scrollWidth - innerWidth;
        const overflowSources = overflow > 0 ? [...document.querySelectorAll("main *")].filter((el) => el.getBoundingClientRect().right > innerWidth + 1).slice(0, 6).map((el) => ({ tag: el.tagName, class: String(el.className).slice(0, 160), text: el.textContent.trim().slice(0, 70) })) : [];
        return { pairs, overflow, overflowSources };
      });
      const errors = report.pairs.filter((pair) => pair.ratio === null || pair.eyebrowSize < 11 || pair.eyebrowSize > 16 || pair.ratio >= .65);
      results.push({ route, viewport: viewport.name, ...report });
      if (errors.length || report.overflow > 1) failures.push({ route, viewport: viewport.name, errors, overflow: report.overflow, overflowSources: report.overflowSources });

      if (["/", "/india", "/uae", "/india/about"].includes(route) && ["desktop", "mobile"].includes(viewport.name)) {
        await page.waitForFunction(() => [...document.images].filter((img) => { const box = img.getBoundingClientRect(); return box.height > 0 && box.top < innerHeight && box.bottom > 0; }).every((img) => img.complete && img.naturalWidth > 0));
        const label = route === "/" ? "root" : route.slice(1).replaceAll("/", "-");
        if (route === "/") await page.screenshot({ path: `docs/screenshots/eyebrow-${label}-${viewport.name}.png` });
        else {
          const target = route.endsWith("about") ? page.locator("#journey") : page.locator("#services");
          if (await target.count()) {
            await target.scrollIntoViewIfNeeded();
            await page.evaluate(() => document.querySelectorAll("header[class*='sticky'], [class*='fixed'][class*='z-40']").forEach((el) => el.style.setProperty("opacity", "0", "important")));
            await target.screenshot({ path: `docs/screenshots/eyebrow-${label}-${viewport.name}.png` });
          }
        }
      }
    }
    console.log(`${viewport.name}: checked ${routes.length} routes`);
    await context.close();
  }
} finally {
  await browser.close();
}
const reportPath = "docs/inspection/eyebrow-scale.json";
if (requested.length && fs.existsSync(reportPath)) {
  const previous = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  const remainingResults = previous.results.filter((result) => !requested.includes(result.route));
  const remainingFailures = previous.failures.filter((result) => !requested.includes(result.route));
  fs.writeFileSync(reportPath, JSON.stringify({ results: [...remainingResults, ...results], failures: [...remainingFailures, ...failures] }, null, 2) + "\n");
} else fs.writeFileSync(reportPath, JSON.stringify({ results, failures }, null, 2) + "\n");
if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exitCode = 1;
} else console.log(`Passed: ${results.length} route/viewport checks; eyebrows stay within the 11–16px editorial scale and remain subordinate to titles.`);
