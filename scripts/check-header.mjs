import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto("http://localhost:3000/india", { waitUntil: "networkidle" });

  const buttons = await page.locator("button").all();
  console.log(`Found ${buttons.length} buttons on page.`);
  for (let i = 0; i < buttons.length; i++) {
    const b = buttons[i];
    const text = (await b.textContent()).trim();
    const aria = await b.getAttribute("aria-label");
    const box = await b.boundingBox();
    console.log(`Button #${i}: text="${text}" aria="${aria}" box=`, box);
  }

  const menuBtn = page.locator("header button[aria-label*='navigation menu']");
  console.log("Menu button count in header:", await menuBtn.count());
  if (await menuBtn.count() > 0) {
    const box = await menuBtn.boundingBox();
    console.log("Header menu button box:", box);
    await menuBtn.click();
    console.log("Clicked! Drawer visible:", await page.locator("#mobile-navigation-drawer").isVisible());
  }

  await browser.close();
}

run().catch(console.error);
