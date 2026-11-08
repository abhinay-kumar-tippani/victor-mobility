import assert from "node:assert/strict";
import fs from "node:fs";
import { chromium } from "playwright";

const { seasonalGreeting: greeting } = JSON.parse(fs.readFileSync("src/content/india.json", "utf8"));
const startsAt = Date.parse(greeting.startsAt);
const expiresAt = Date.parse(greeting.expiresAt);
assert.equal(expiresAt - startsAt, 24 * 60 * 60 * 1000, "Greeting must have one 24-hour window");
const baseUrl = process.env.DIWALI_PREVIEW_URL || "http://127.0.0.1:3036";
const browser = await chromium.launch({ channel: "msedge", headless: true });

try {
  for (const width of [1440, 390, 320]) {
    const context = await browser.newContext({ viewport: { width, height: width === 1440 ? 900 : 844 }, reducedMotion: "no-preference" });
    const page = await context.newPage();
    await page.clock.install({ time: new Date(startsAt + 60_000) });
    await page.goto(`${baseUrl}/india`, { waitUntil: "networkidle" });
    const banner = page.getByRole("complementary", { name: "Festive greeting" });
    await banner.waitFor({ state: "visible" });
    const headerBox = await page.locator("header").boundingBox();
    const bannerBox = await banner.boundingBox();
    assert.ok(Math.abs(bannerBox.y - headerBox.y - headerBox.height) <= 1, "Greeting should sit directly below the navbar");
    assert.match(await banner.textContent(), /🪔Happy Diwali🪔/);
    assert.equal(await banner.locator(".sr-only").textContent(), "Happy Diwali");
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px overflow`);

    const track = banner.locator("[data-greeting-track]");
    const before = await track.evaluate(el => getComputedStyle(el).transform);
    await page.waitForTimeout(250);
    assert.notEqual(await track.evaluate(el => getComputedStyle(el).transform), before, "Greeting should slide");
    await banner.getByRole("button", { name: "Pause Diwali greeting" }).click();
    assert.equal(await track.evaluate(el => getComputedStyle(el).animationPlayState), "paused");
    await banner.getByRole("button", { name: "Resume Diwali greeting" }).click();
    assert.equal(await track.evaluate(el => getComputedStyle(el).animationPlayState), "running");
    if (width !== 320) {
      await page.waitForFunction(() => [...document.images].filter(img => { const box = img.getBoundingClientRect(); return box.height > 0 && box.top < innerHeight && box.bottom > 0; }).every(img => img.complete && img.naturalWidth > 0));
      await page.screenshot({ path: `docs/screenshots/diwali-banner-${width === 1440 ? "desktop" : "mobile"}.png`, animations: "disabled" });
    }
    console.log(`${width}px: navbar placement, diyas, sliding, pause/resume and width passed`);
    await context.close();
  }

  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.clock.install({ time: new Date(startsAt + 60_000) });
  for (const route of ["/india/services", "/india/contact", "/india/about", "/uae"]) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    const banner = page.locator("[data-seasonal-greeting]");
    await banner.waitFor({ state: "visible" });
    assert.equal(await banner.locator("[data-greeting-track]").isVisible(), false);
    assert.equal(await banner.locator("[data-greeting-static]").isVisible(), true);
    assert.equal(await banner.getByRole("button").count(), 0, "Static greeting does not need a pause control");
  }

  await page.clock.setSystemTime(new Date(startsAt - 60_000));
  await page.goto(`${baseUrl}/india/privacy`, { waitUntil: "networkidle" });
  assert.equal(await page.locator("[data-seasonal-greeting]").count(), 0, "No greeting before its start");
  await page.clock.fastForward(61_000);
  await page.locator("[data-seasonal-greeting]").waitFor({ state: "visible" });
  const now = await page.evaluate(() => Date.now());
  await page.clock.fastForward(expiresAt - now - 1000);
  assert.equal(await page.locator("[data-seasonal-greeting]").count(), 1, "Greeting remains until the deadline");
  await page.clock.fastForward(1100);
  await page.locator("[data-seasonal-greeting]").waitFor({ state: "detached" });
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(await page.locator("[data-seasonal-greeting]").count(), 0, "Reloading after expiry must not restart the 24 hours");
  const geometry = await page.evaluate(() => ({ headerBottom: document.querySelector("header").getBoundingClientRect().bottom, mainTop: document.querySelector("main").getBoundingClientRect().top }));
  assert.ok(Math.abs(geometry.headerBottom - geometry.mainTop) <= 1, "Expiry must not leave an empty strip");

  const freshPage = await context.newPage();
  await freshPage.clock.install({ time: new Date(expiresAt + 1000) });
  await freshPage.goto(`${baseUrl}/india`, { waitUntil: "networkidle" });
  assert.equal(await freshPage.locator("[data-seasonal-greeting]").count(), 0, "New visitors must also see no expired greeting");
  console.log("Shared routes, reduced motion, scheduled start, live 24-hour expiry, repeat/new visits and collapsed spacing passed");
  await context.close();
} finally {
  await browser.close();
}
