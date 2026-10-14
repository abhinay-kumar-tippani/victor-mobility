import { chromium } from "playwright";
import fs from "fs";

async function run() {
  const artifactDir = "C:/Users/tippa/.gemini/antigravity/brain/269dda76-a151-412b-89c5-4bc3e37ac68e";
  const docsDir = "d:/victor website/docs/screenshots";

  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log("Navigating to http://localhost:3000/india ...");
  await page.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const heroSection = page.locator('section[aria-label="Victor Mobility Services Showcase"]');
  const heroBox = await heroSection.boundingBox();

  // 1. Capture Slide 0: Employee Transportation
  await page.screenshot({ path: `${artifactDir}/hero_slide_employee_luxury.png`, clip: heroBox });
  console.log("Captured hero_slide_employee_luxury.png");

  // 2. Click Slide 4: Event Transportation (The slide the user uploaded!)
  const dots = heroSection.locator('button[aria-label*="Go to slide"]');
  console.log("Found dots count:", await dots.count());
  await dots.nth(4).click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${artifactDir}/hero_slide_event_transportation_luxury.png`, clip: heroBox });
  await page.screenshot({ path: `${docsDir}/hero-desktop.png`, clip: heroBox });
  console.log("Captured hero_slide_event_transportation_luxury.png");

  // 3. Click Slide 3: Chauffeur & Luxury
  await dots.nth(3).click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${artifactDir}/hero_slide_chauffeur_luxury.png`, clip: heroBox });
  console.log("Captured hero_slide_chauffeur_luxury.png");

  // 4. Mobile Viewport
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1000);
  const mobileHero = mobilePage.locator('section[aria-label="Victor Mobility Services Showcase"]');
  const mobileHeroBox = await mobileHero.boundingBox();
  await mobilePage.screenshot({ path: `${artifactDir}/hero_mobile_luxury.png`, clip: mobileHeroBox });
  await mobilePage.screenshot({ path: `${docsDir}/hero-mobile.png`, clip: mobileHeroBox });
  console.log("Captured hero_mobile_luxury.png");

  await browser.close();
  console.log("All screenshots captured successfully!");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
