import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log("Navigating to http://localhost:3000/india ...");
  await page.goto("http://localhost:3000/india", { waitUntil: "networkidle" });

  const outDir = "C:/Users/tippa/.gemini/antigravity/brain/02031919-07fc-4611-8699-08f8bd92511b";

  // 1. Capture Hero Slide 0: Employee Transportation with new height & subheading
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${outDir}/hero_viewport_desktop_employee.png` });
  console.log("Captured hero_viewport_desktop_employee.png");

  // 2. Click the 4th dot (Chauffeur & Luxury Travel)
  const dots = page.locator('button[aria-label*="Go to slide"]');
  console.log("Found dots count:", await dots.count());
  await dots.nth(3).click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/hero_viewport_desktop_chauffeur.png` });
  console.log("Captured hero_viewport_desktop_chauffeur.png");

  // 3. Click the 3rd dot (Airport Transfers)
  await dots.nth(2).click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/hero_viewport_desktop_airport.png` });
  console.log("Captured hero_viewport_desktop_airport.png");

  // 4. Test Mobile viewport
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 }
  });
  await mobilePage.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: `${outDir}/hero_viewport_mobile.png` });
  console.log("Captured hero_viewport_mobile.png");

  await browser.close();
  console.log("All viewport screenshots captured successfully!");
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
