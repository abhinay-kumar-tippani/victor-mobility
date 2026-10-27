import { chromium } from "playwright";

const baseUrl = process.env.ABOUT_PREVIEW_URL || "http://127.0.0.1:3021";
const browser = await chromium.launch({ channel: "msedge", headless: true });

try {
  for (const region of ["india", "uae"]) {
    for (const viewport of [{ name: "desktop", width: 1440, height: 900 }, { name: "mobile", width: 390, height: 844 }]) {
      const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, reducedMotion: "reduce" });
      const page = await context.newPage();
      await page.goto(`${baseUrl}/${region}/about`, { waitUntil: "domcontentloaded", timeout: 60000 });
      const carousel = page.locator("#commercial-leadership");
      await carousel.waitFor({ state: "visible", timeout: 60000 });
      await page.waitForFunction(() => (document.querySelector("#commercial-leadership")?.getBoundingClientRect().width || 0) > 0, undefined, { timeout: 15000 });
      let sizes;
      for (let attempt = 0; attempt < 12; attempt++) {
        sizes = await carousel.evaluate((element) => {
          const founder = element.previousElementSibling;
          if (!founder) throw new Error("Founder card missing before employee slideshow");
          const team = element.getBoundingClientRect();
          const founderBounds = founder.getBoundingClientRect();
          return { teamWidth: team.width, teamHeight: team.height, founderWidth: founderBounds.width, founderHeight: founderBounds.height };
        });
        if (sizes.teamWidth > 0 && sizes.founderWidth > 0) break;
        await page.waitForTimeout(250);
      }
      if (!sizes || sizes.teamWidth === 0 || sizes.founderWidth === 0) throw new Error(`${region} ${viewport.name}: cards did not finish layout`);
      if (sizes.teamWidth >= sizes.founderWidth - 10) throw new Error(`${region} ${viewport.name}: employee card is not narrower than founder card ${JSON.stringify(sizes)}`);
      if (await carousel.getByRole("button", { name: /^Show / }).count() !== 4) throw new Error(`${region} ${viewport.name}: expected current four-person team`);
      await carousel.scrollIntoViewIfNeeded();
      await page.evaluate(() => {
        document.querySelectorAll("header, [class*='fixed'][class*='z-40'], nextjs-portal").forEach((element) => element.style.setProperty("opacity", "0", "important"));
      });
      await carousel.screenshot({ path: `docs/screenshots/about-team-compact-${region}-${viewport.name}.png` });
      console.log(`${region} ${viewport.name}: team ${Math.round(sizes.teamWidth)}×${Math.round(sizes.teamHeight)}, founder ${Math.round(sizes.founderWidth)}×${Math.round(sizes.founderHeight)}`);
      await context.close();
    }
  }
} finally {
  await browser.close();
}
