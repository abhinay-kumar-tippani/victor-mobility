import { chromium } from "playwright";

const baseUrl = process.env.JOURNEY_PREVIEW_URL || "http://127.0.0.1:3024";
const imagePath = "/images/journey/victor-mobility-journey-2025.png";
const browser = await chromium.launch({ channel: "msedge", headless: true });

try {
  for (const region of ["india", "uae"]) {
    for (const route of [region, `${region}/about`]) {
      for (const viewport of [{ name: "desktop", width: 1440, height: 900 }, { name: "mobile", width: 390, height: 844 }, { name: "small-mobile", width: 320, height: 700 }]) {
        const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, reducedMotion: "reduce" });
        const page = await context.newPage();
        await page.goto(`${baseUrl}/${route}`, { waitUntil: "networkidle" });
        const section = page.locator("#journey");
        await section.waitFor({ state: "visible" });
        const image = section.locator(`img[src="${imagePath}"]`);
        await image.waitFor({ state: "visible" });
        await image.scrollIntoViewIfNeeded();
        await page.waitForFunction((path) => {
          const image = document.querySelector(`#journey img[src="${path}"]`);
          return image instanceof HTMLImageElement && image.complete && image.naturalWidth === 1254;
        }, imagePath);

        if (await section.locator('[data-slot="timeline"], [data-timeline-milestone]').count()) throw new Error(`${route}: old timeline remains`);
        if (await section.locator(`a[href="${imagePath}"]`).count() < 2) throw new Error(`${route}: missing full-size image actions`);
        const layout = await section.evaluate((element) => {
          const heading = element.querySelector("#journey-heading")?.getBoundingClientRect();
          const image = element.querySelector("figure img")?.getBoundingClientRect();
          const section = element.getBoundingClientRect();
          return { heading: heading && { left: heading.left, right: heading.right, top: heading.top, bottom: heading.bottom }, image: image && { left: image.left, right: image.right, top: image.top, bottom: image.bottom }, height: section.height };
        });
        if (!layout.heading || !layout.image) throw new Error(`${route}: missing visible text or image`);
        if (viewport.name === "desktop") {
          if (layout.heading.right >= layout.image.left || layout.heading.top >= layout.image.bottom) throw new Error(`${route}: expected text on left and image on right`);
          if (layout.height > 850) throw new Error(`${route}: journey section too tall for desktop (${Math.round(layout.height)}px)`);
        } else if (layout.heading.bottom >= layout.image.top) throw new Error(`${route}: image should follow text on mobile`);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        if (overflow > 1) throw new Error(`${route} ${viewport.name}: ${overflow}px horizontal overflow`);

        if (viewport.name !== "small-mobile") {
          await section.scrollIntoViewIfNeeded();
          await page.evaluate(() => {
            document.querySelectorAll("header[class*='sticky'], [class*='fixed'][class*='z-40']").forEach((element) => element.style.setProperty("opacity", "0", "important"));
          });
          const pageName = route.includes("about") ? "about" : "home";
          await section.screenshot({ path: `docs/screenshots/journey-artwork-${region}-${pageName}-${viewport.name}.png` });
        }

        const transcript = section.locator("details");
        await transcript.locator("summary").click();
        if (await transcript.locator("ol > li").count() !== 13) throw new Error(`${route}: text version should contain thirteen milestones`);
        if (!(await transcript.locator("ol > li").last().innerText()).includes("Advancing Sustainable Mobility")) throw new Error(`${route}: 2025 milestone missing from text version`);
        console.log(`${route} ${viewport.name}: supplied image, full-size links, text version and width passed`);
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
}
