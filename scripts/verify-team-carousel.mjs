import { chromium } from "playwright";

const browser = await chromium.launch({ channel: "msedge", headless: true });
const previewUrl = process.env.TEAM_PREVIEW_URL || "http://localhost:3000";
try {
  for (const route of ["india", "uae"]) {
    for (const viewport of [{ name: "desktop", width: 1440, height: 1200 }, { name: "mobile", width: 390, height: 844 }]) {
      const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, reducedMotion: "reduce" });
      const page = await context.newPage();
      await page.goto(`${previewUrl}/${route}`, { waitUntil: "domcontentloaded" });
      const team = page.locator('[aria-roledescription="carousel"][aria-label="Meet the team"]');
      await page.waitForLoadState("networkidle");
      await team.getByText("Mujeeb Ur Rahman Mohammed").waitFor();
      await page.waitForFunction(() => {
        const rect = document.querySelector("section#about")?.getBoundingClientRect();
        return rect && rect.width > 0 && rect.height > 0;
      });
      await page.waitForTimeout(1500);
      if (await page.getByText("Operations Coordination Desk", { exact: true }).count()) throw new Error(`${route}: old desk card remains`);
      if (await team.locator('a[href="tel:+919100777768"]').count() !== 1) throw new Error(`${route}: Mujeeb phone link missing`);
      if (await team.locator('a[href^="https://wa.me/919396546950"]').count() !== 1) throw new Error(`${route}: Mujeeb WhatsApp link missing`);
      await team.getByText("mujeeb@example.com").waitFor();
      if (await team.locator('a[href^="mailto:"]').count()) throw new Error(`${route}: sample email became active`);
      await page.evaluate(() => document.querySelector("section#about")?.scrollIntoView({ block: "start" }));
      await page.waitForFunction(() => [...document.querySelectorAll("section#about img")].every((image) => image.complete && image.naturalWidth > 0));
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          await page.locator("section#about").screenshot({ path: `docs/screenshots/team-${route}-${viewport.name}.png`, timeout: 15000 });
          break;
        } catch (error) {
          if (attempt === 2) throw error;
          await page.waitForTimeout(1000);
        }
      }
      await team.getByRole("button", { name: "Next profile" }).click();
      await team.getByText("Team member 02").waitFor();
      await team.getByText("team02@example.com").waitFor();
      if (await team.locator('a[href^="tel:"], a[href^="https://wa.me/"], a[href^="mailto:"]').count()) throw new Error(`${route}: sample contact became active`);
      if (!(await team.getByText("Illustrative profile", { exact: true }).count())) throw new Error(`${route}: placeholder disclosure missing`);
      if (route === "india" && viewport.name === "desktop") {
        await page.locator("section#about").screenshot({ path: "docs/screenshots/team-india-placeholder.png" });
      }
      for (let slide = 3; slide <= 4; slide++) {
        await team.getByRole("button", { name: "Next profile" }).click();
        await team.getByText(`Team member 0${slide}`).waitFor();
      }
      await team.getByRole("button", { name: "Next profile" }).click();
      await team.getByText("Mujeeb Ur Rahman Mohammed").waitFor();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 1) throw new Error(`${route} ${viewport.name}: ${overflow}px horizontal overflow`);
      console.log(`${route} ${viewport.name}: four slides, desk removed, no overflow`);
      await context.close();
    }
  }
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  await context.addInitScript(() => localStorage.setItem("victor_locale_uae", "ar"));
  const page = await context.newPage();
  await page.goto(`${previewUrl}/uae`, { waitUntil: "networkidle" });
  const team = page.locator('[aria-roledescription="carousel"][aria-label="تعرّف على الفريق"]');
  await team.getByRole("button", { name: "الملف التالي" }).click();
  await team.getByText("عضو الفريق 02").waitFor();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 1) throw new Error(`uae Arabic mobile: ${overflow}px horizontal overflow`);
  console.log("uae Arabic mobile: slide navigation and RTL layout passed");
  await context.close();
} finally {
  await browser.close();
}
