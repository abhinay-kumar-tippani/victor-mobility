import { chromium } from "playwright";
import http from "node:http";

const previewUrl = process.env.TEAM_PREVIEW_URL || "http://localhost:3000";

// Check if dev server is running
async function isServerRunning() {
  return new Promise((resolve) => {
    const req = http.get(previewUrl, () => resolve(true));
    req.on("error", () => resolve(false));
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

const running = await isServerRunning();
if (!running) {
  console.log(`Server not running at ${previewUrl}. Please start next server before running screenshot verification.`);
  process.exit(0);
}

const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  for (const route of ["india", "uae"]) {
    for (const viewport of [
      { name: "desktop", width: 1440, height: 1200 },
      { name: "mobile", width: 390, height: 844 },
    ]) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      await page.goto(`${previewUrl}/${route}`, { waitUntil: "domcontentloaded" });
      const team = page.locator('#about [aria-roledescription="carousel"]');
      await page.waitForLoadState("networkidle");

      // Slide 1: Mujeeb
      await team.getByText("Mujeeb Ur Rahman Mohammed").waitFor();
      if ((await team.locator('a[href="tel:+919515850808"]').count()) !== 1) {
        throw new Error(`${route}: Mujeeb phone link missing`);
      }
      if ((await team.locator('a[href^="https://wa.me/919515850808"]').count()) !== 1) {
        throw new Error(`${route}: Mujeeb WhatsApp link missing`);
      }

      await page.evaluate(() => document.querySelector("section#about")?.scrollIntoView({ block: "start" }));
      await page.waitForFunction(() =>
        [...document.querySelectorAll("section#about img")].every(
          (image) => image.complete && image.naturalWidth > 0
        )
      );

      // Slide 2: Syed Kamran Abbas Razvi
      await team.getByRole("button", { name: "Next profile" }).click();
      await team.getByText("Syed Kamran Abbas Razvi").waitFor();
      await team.getByText("Director Sales & Operations").waitFor();
      if ((await team.locator('a[href="tel:+918074160584"]').count()) !== 1) {
        throw new Error(`${route}: Kamran phone link missing`);
      }
      if ((await team.locator('a[href^="https://wa.me/918074160584"]').count()) !== 1) {
        throw new Error(`${route}: Kamran WhatsApp link missing`);
      }
      if ((await team.locator('a[href="tel:+914023000023"]').count()) !== 1) {
        throw new Error(`${route}: Kamran desk phone link missing`);
      }

      // Screenshot slide 2 (Kamran)
      await page.locator("section#about").screenshot({
        path: `docs/screenshots/team-${route}-kamran-${viewport.name}.png`,
      });

      // Slide 3: Muhammad Asif
      await team.getByRole("button", { name: "Next profile" }).click();
      await team.getByText("Muhammad Asif").waitFor();
      await team.getByText("Manager - Admin & Finance").waitFor();
      if ((await team.locator('a[href="tel:+919100777768"]').count()) !== 1) {
        throw new Error(`${route}: Asif phone link missing`);
      }
      if ((await team.locator('a[href^="https://wa.me/919100777768"]').count()) !== 1) {
        throw new Error(`${route}: Asif WhatsApp link missing`);
      }
      if ((await team.locator('a[href="tel:+914023000023"]').count()) !== 1) {
        throw new Error(`${route}: Asif desk phone link missing`);
      }

      // Screenshot slide 3 (Asif)
      await page.locator("section#about").screenshot({
        path: `docs/screenshots/team-${route}-asif-${viewport.name}.png`,
      });

      // Loop back to Slide 1
      await team.getByRole("button", { name: "Next profile" }).click();
      await team.getByText("Mujeeb Ur Rahman Mohammed").waitFor();

      // Check overflow
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      if (overflow > 1) {
        throw new Error(`${route} ${viewport.name}: ${overflow}px horizontal overflow`);
      }
      console.log(`✓ ${route} ${viewport.name}: 3 authentic profiles verified, 0 overflow`);
      await context.close();
    }
  }
} finally {
  await browser.close();
}
