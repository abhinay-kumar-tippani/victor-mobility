import { chromium } from "playwright";

const baseUrl = process.env.JOURNEY_PREVIEW_URL || "http://127.0.0.1:3024";
const browser = await chromium.launch({ channel: "msedge", headless: true });

try {
  for (const region of ["india", "uae"]) {
    for (const viewport of [
      { name: "desktop", width: 1440, height: 900 },
      { name: "mobile", width: 390, height: 844 },
      { name: "small-mobile", width: 320, height: 700 },
    ]) {
      const reducedMotion = viewport.name === "desktop" ? "no-preference" : "reduce";
      const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, reducedMotion });
      const page = await context.newPage();
      await page.goto(`${baseUrl}/${region}/about`, { waitUntil: "networkidle" });
      const section = page.locator("#journey");
      const timeline = section.locator('[data-slot="timeline"]');
      await timeline.waitFor({ state: "visible" });
      if (await timeline.locator("ol > li").count() !== 13) throw new Error(`${region}: expected 13 milestones`);
      if (await section.locator("img").count()) throw new Error(`${region}: infographic still replaces the About timeline`);
      const last = timeline.locator("ol > li").last();
      if (!(await last.innerText()).includes("Advancing Sustainable Mobility")) throw new Error(`${region}: missing 2025 milestone`);
      for (const link of await section.getByRole("navigation", { name: "Journey chapters" }).getByRole("link").all()) {
        const href = await link.getAttribute("href");
        if (!href || await section.locator(href).count() !== 1) throw new Error(`${region}: broken chapter target ${href}`);
      }
      if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw new Error(`${region} ${viewport.name}: horizontal overflow`);

      await page.evaluate(() => {
        document.querySelectorAll("header[class*='sticky'], [class*='fixed'][class*='z-40']").forEach((element) => element.style.setProperty("opacity", "0", "important"));
        const section = document.querySelector("#journey");
        window.scrollTo({ top: section.getBoundingClientRect().top + scrollY, behavior: "instant" });
      });
      const progress = timeline.locator(':scope > [aria-hidden="true"] > div');
      const initialProgress = await progress.evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m22);
      if (viewport.name !== "small-mobile") {
        await page.screenshot({ path: `docs/screenshots/journey-restored-about-${region}-${viewport.name}.png` });
      }

      const chapter = section.getByRole("navigation", { name: "Journey chapters" }).getByRole("link").last();
      await chapter.focus();
      await page.keyboard.press("Enter");
      await page.waitForFunction(() => location.hash === "#journey-milestone-8");
      await last.scrollIntoViewIfNeeded();
      if (reducedMotion === "no-preference") {
        await page.waitForFunction((initial) => {
          const progress = document.querySelector('[data-slot="timeline"] > [aria-hidden="true"] > div');
          return new DOMMatrixReadOnly(getComputedStyle(progress).transform).m22 > initial + 0.5;
        }, initialProgress);
      } else {
        const scale = await progress.evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m22);
        if (scale !== 1) throw new Error(`${region}: reduced-motion timeline should be fully visible`);
      }
      console.log(`${region}/about ${viewport.name}: 13 milestones, chapter keyboard navigation, scroll progress, reduced motion and width passed`);
      await context.close();
    }
  }
} finally {
  await browser.close();
}
