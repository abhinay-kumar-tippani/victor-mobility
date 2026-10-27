import { chromium } from "playwright";

const baseUrl = process.env.JOURNEY_PREVIEW_URL || "http://127.0.0.1:3017";
const browser = await chromium.launch({ channel: "msedge", headless: true });

try {
  for (const region of ["india", "uae"]) {
    for (const viewport of [{ name: "desktop", width: 1440, height: 900 }, { name: "mobile", width: 390, height: 844 }]) {
      const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, reducedMotion: "reduce" });
      const page = await context.newPage();
      await page.goto(`${baseUrl}/${region}`, { waitUntil: "networkidle" });
      const section = page.locator("#journey");
      const timeline = section.getByRole("region", { name: /company milestones/i });
      await timeline.waitFor({ state: "visible" });

      if (await timeline.locator("li").count() !== 12) throw new Error(`${region} ${viewport.name}: expected twelve milestones`);
      if (!(await timeline.locator('li[aria-current="step"]').textContent())?.includes("The Beginning")) throw new Error(`${region} ${viewport.name}: timeline should begin at milestone one`);
      if (await section.locator('img[src*="victor-journey-map"]').count()) throw new Error(`${region}: static roadmap image remains`);
      const dimensions = await timeline.evaluate((element) => ({ client: element.clientHeight, scroll: element.scrollHeight }));
      if (dimensions.scroll <= dimensions.client) throw new Error(`${region} ${viewport.name}: timeline does not scroll`);
      const overflow = await section.evaluate((element) => element.scrollWidth - element.clientWidth);
      if (overflow > 1) {
        const causes = await section.evaluate((element) => [...element.querySelectorAll("*")]
          .filter((child) => child.getBoundingClientRect().right > element.getBoundingClientRect().right + 1)
          .slice(0, 8)
          .map((child) => ({ tag: child.tagName, className: child.className, text: child.textContent?.slice(0, 50) })));
        throw new Error(`${region} ${viewport.name}: ${overflow}px section overflow ${JSON.stringify(causes)}`);
      }

      await section.scrollIntoViewIfNeeded();
      await page.evaluate(() => {
        document.querySelectorAll("header, [class*='fixed'][class*='z-40']").forEach((element) => {
          element.style.setProperty("opacity", "0", "important");
        });
      });
      await section.screenshot({ path: `docs/screenshots/journey-timeline-${region}-${viewport.name}.png` });

      await timeline.focus();
      await page.keyboard.press("End");
      await page.waitForFunction(() => document.querySelector("#journey [role='region']")?.scrollTop > 0);
      await timeline.evaluate((element) => { element.scrollTop = element.scrollHeight; });
      await page.waitForFunction(() => document.querySelector("#journey li[aria-current='step']")?.textContent?.includes("UAE Operations"));
      if (viewport.name === "desktop") await section.screenshot({ path: `docs/screenshots/journey-timeline-${region}-scrolled.png` });

      const pageScrollBefore = await page.evaluate(() => window.scrollY);
      await timeline.hover();
      await page.mouse.wheel(0, 650);
      await page.waitForFunction((previous) => window.scrollY > previous, pageScrollBefore);

      console.log(`${region} ${viewport.name}: twelve milestones, scroll progress, keyboard access, page scrolling and fit passed`);
      await context.close();
    }
  }
} finally {
  await browser.close();
}
