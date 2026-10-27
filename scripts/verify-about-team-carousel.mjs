import { chromium } from "playwright";

const baseUrl = process.env.ABOUT_PREVIEW_URL || "http://127.0.0.1:3015";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const team = [
  { name: "Mujeeb Ur Rahman Mohammed", phone: "tel:+919100777768", whatsapp: "919396546950", email: null },
  { name: "Syed Kamran Abbas Razvi", phone: "tel:+918074160584", whatsapp: "918074160584", email: "syedkamran@victorluxurylimousine.com" },
  { name: "Muhammad Asif", phone: "tel:+919100777768", whatsapp: "919100777768", email: "asif@victorluxurylimousine.com" },
  { name: "Mohammed Thameem Ahmed", phone: "tel:+919515950808", whatsapp: "919515950808", email: "thameem@victorluxurylimousine.com" },
  { name: "Nareinder Reddyy C", phone: "tel:+914023000023", whatsapp: "919900004172", email: "nreddy@jvictorgroup.com" },
];

try {
  for (const region of ["india", "uae"]) {
    for (const viewport of [{ name: "desktop", width: 1440, height: 1100 }, { name: "mobile", width: 390, height: 844 }, { name: "small-mobile", width: 320, height: 700 }]) {
      const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, reducedMotion: "reduce" });
      const page = await context.newPage();
      await page.goto(`${baseUrl}/${region}/about`, { waitUntil: "networkidle" });
      const carousel = page.locator("#commercial-leadership");
      await carousel.waitFor({ state: "visible" });
      if (await carousel.getByRole("button", { name: /^Show / }).count() !== 5) throw new Error(`${region} ${viewport.name}: expected five profiles`);
      for (const person of team) {
        await carousel.getByRole("button", { name: `Show ${person.name}` }).click();
        await carousel.getByRole("heading", { name: person.name }).waitFor();
        await carousel.locator(`a[href="${person.phone}"]`).waitFor();
        await carousel.locator(`a[href^="https://wa.me/${person.whatsapp}"]`).waitFor();
        if (person.email) await carousel.locator(`a[href="mailto:${person.email}"]`).waitFor();
        else if (await carousel.locator('a[href^="mailto:"]').count()) throw new Error(`${region}: unconfigured Mujeeb email is active`);
      }
      await carousel.getByRole("button", { name: `Show ${team[0].name}` }).click();
      await page.evaluate(() => document.querySelector("#commercial-leadership")?.scrollIntoView({ block: "start" }));
      await page.waitForFunction(() => [...document.querySelectorAll("#commercial-leadership img")].every((image) => image.complete && image.naturalWidth > 0));
      if (viewport.name !== "small-mobile") {
        await page.evaluate(() => {
          document.querySelectorAll("header, [class*='fixed'][class*='z-40']").forEach((element) => {
            element.style.setProperty("opacity", "0", "important");
          });
        });
        await carousel.screenshot({ path: `docs/screenshots/about-team-${region}-${viewport.name}.png` });
      }
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 1) throw new Error(`${region} ${viewport.name}: ${overflow}px horizontal overflow`);
      await carousel.getByRole("button", { name: "Next employee" }).focus();
      await page.keyboard.press("ArrowRight");
      await carousel.getByRole("heading", { name: team[1].name }).waitFor();
      if (await carousel.getByRole("button", { name: "Pause slideshow" }).count()) throw new Error(`${region}: reduced-motion view should not auto-play`);
      console.log(`${region} ${viewport.name}: five profiles, contacts, keyboard, reduced motion and width passed`);
      await context.close();
    }
  }
} finally {
  await browser.close();
}
