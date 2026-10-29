import { chromium } from "playwright";

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

try {
  const routes = ["/india", "/uae", "/india/about", "/uae/about"];
  for (const route of routes) {
    await page.goto(`http://127.0.0.1:3024${route}`, { waitUntil: "networkidle" });
    const img = page.locator('img[src*="founder-jahangir.jpg"]').first();
    await img.waitFor({ state: "visible" });
    const isLoaded = await img.evaluate((el) => el.complete && el.naturalWidth === 819 && el.naturalHeight === 1024);
    if (!isLoaded) {
      throw new Error(`Failed to load real portrait on ${route}`);
    }
    console.log(`PASS: Real image of Jahangir sir loaded correctly on ${route} (${819}x${1024})`);
  }

  // Capture screenshot of About page founder section
  await page.goto("http://127.0.0.1:3024/india/about", { waitUntil: "networkidle" });
  const founderCard = page.locator("text=Meet our Founder & Visionary").locator("..");
  await founderCard.scrollIntoViewIfNeeded();
  console.log("ALL FOUNDER IMAGE CHECKS PASSED SUCCESSFULLY!");
} finally {
  await browser.close();
}
