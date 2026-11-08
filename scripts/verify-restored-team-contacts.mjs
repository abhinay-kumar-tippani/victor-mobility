import assert from "node:assert/strict";
import fs from "node:fs";
import { chromium } from "playwright";

const data = JSON.parse(fs.readFileSync("src/content/india.json", "utf8"));
assert.equal(data.contact.name, "Muhammad Asif", "General enquiry contact should stay independent from team profiles");
assert.equal(data.contact.phoneHref, "tel:+919100777768");
assert.equal(data.contact.printedEmail, "asif@victorluxurylimousine.com");
const expectedNames = ["Syed Kamran Abbas Razvi", "Nareinder Reddyy C", "Mujeeb Ur Rahman Mohammed", "Muhammad Asif"];
const baseUrl = process.env.CONTACT_PREVIEW_URL || "http://127.0.0.1:3035";
const browser = await chromium.launch({ channel: "msedge", headless: true });

async function checkChannels(container, phone, digits, email) {
  assert.ok(await container.locator(`a[href="${phone}"]:visible`).count(), `Missing phone ${phone}`);
  assert.ok(await container.locator(`a[href^="https://wa.me/${digits}?"]:visible`).count(), `Missing WhatsApp ${digits}`);
  assert.ok(await container.locator(`a[href="mailto:${email}"]:visible`).count(), `Missing email ${email}`);
}

try {
  for (const viewport of [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 },
    { name: "small-mobile", width: 320, height: 700 },
  ]) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, reducedMotion: "reduce" });
    const page = await context.newPage();
    for (const region of ["india", "uae"]) {
      await page.goto(`${baseUrl}/${region}`, { waitUntil: "networkidle" });
      const team = page.locator("#about");
      const cards = team.locator("article");
      assert.equal(await cards.count(), 4);
      assert.deepEqual(await cards.locator("h3:visible").allTextContents(), expectedNames);
      const mujeeb = cards.nth(2);
      await checkChannels(mujeeb, "tel:+919515850808", "919515850808", "mujeeburrahman@victorluxurylimousine.com");
      assert.match(await mujeeb.innerText(), /Business Development Partner/);
      assert.ok(await mujeeb.locator('img[src="/images/india/leadership-mujeeb.jpg"]:visible').count());
      await checkChannels(cards.nth(3), "tel:+919100777768", "919100777768", "asif@victorluxurylimousine.com");

      if (region === "india") {
        const desk = page.locator("#contact");
        assert.deepEqual(await desk.locator("h3").allTextContents(), ["Mohammed Thameem Ahmed", "Muhammad Asif"]);
        const thameem = desk.locator("div.group.relative").filter({ has: page.getByRole("heading", { name: "Mohammed Thameem Ahmed", exact: true }) });
        assert.equal(await thameem.count(), 1);
        await checkChannels(thameem, "tel:+919515950808", "919515950808", "thameem@victorluxurylimousine.com");
        assert.ok(await thameem.locator('img[src="/images/team/thameem-ahmed.png"]').count());
        if (viewport.name !== "small-mobile") {
          await page.evaluate(() => document.querySelectorAll("header[class*='sticky'], [class*='fixed'][class*='z-40']").forEach(el => el.style.setProperty("opacity", "0", "important")));
          await team.scrollIntoViewIfNeeded();
          await page.waitForFunction(() => [...document.querySelectorAll("#about img")].filter(img => img.getBoundingClientRect().height > 0).every(img => img.complete && img.naturalWidth > 0));
          await team.screenshot({ path: `docs/screenshots/restored-team-india-${viewport.name}.png` });
          await desk.scrollIntoViewIfNeeded();
          await page.waitForFunction(() => [...document.querySelectorAll("#contact img")].filter(img => img.getBoundingClientRect().height > 0).every(img => img.complete && img.naturalWidth > 0));
          await desk.screenshot({ path: `docs/screenshots/restored-247-india-${viewport.name}.png` });
        }
      }
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${region} ${viewport.name}: horizontal overflow`);

      await page.goto(`${baseUrl}/${region}/about`, { waitUntil: "networkidle" });
      const about = page.locator("#commercial-leadership");
      await about.getByRole("button", { name: "Show Mujeeb Ur Rahman Mohammed", exact: true }).click();
      assert.equal(await about.locator("h3").innerText(), "Mujeeb Ur Rahman Mohammed");
      assert.equal(await about.getByRole("button", { name: "Show Muhammad Asif", exact: true }).count(), 1);
      await checkChannels(about, "tel:+919515850808", "919515850808", "mujeeburrahman@victorluxurylimousine.com");
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${region}/about ${viewport.name}: horizontal overflow`);
      console.log(`${region} ${viewport.name}: correct team order, unique contacts, Mujeeb channels, About profile${region === "india" ? ", Thameem 24/7 channels" : ""}, and width passed`);
    }
    await context.close();
  }
} finally {
  await browser.close();
}
