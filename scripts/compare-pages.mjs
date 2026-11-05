import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({ channel: "chrome" });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log("=== AUDITING /india ===");
  await page.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  const indiaSections = await page.$$eval("header, main > section, main > div, footer", (els) =>
    els.map((el) => ({
      tag: el.tagName,
      id: el.id,
      classes: el.className.split(" ").slice(0, 3).join(" "),
      textPreview: el.innerText.slice(0, 80).replace(/\s+/g, " "),
    }))
  );
  console.log("India elements count:", indiaSections.length);
  indiaSections.forEach((s, idx) => console.log(`[India ${idx}] id="${s.id}" text="${s.textPreview}"`));

  console.log("\n=== AUDITING /uae ===");
  await page.goto("http://localhost:3000/uae", { waitUntil: "networkidle" });
  const uaeSections = await page.$$eval("header, main > section, main > div, footer", (els) =>
    els.map((el) => ({
      tag: el.tagName,
      id: el.id,
      classes: el.className.split(" ").slice(0, 3).join(" "),
      textPreview: el.innerText.slice(0, 80).replace(/\s+/g, " "),
    }))
  );
  console.log("UAE elements count:", uaeSections.length);
  uaeSections.forEach((s, idx) => console.log(`[UAE ${idx}] id="${s.id}" text="${s.textPreview}"`));

  await browser.close();
}

run().catch(console.error);
