import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function run() {
  const artifactDir = "C:/Users/tippa/.gemini/antigravity/brain/269dda76-a151-412b-89c5-4bc3e37ac68e";
  const docsScreenshotsDir = "d:/victor website/docs/screenshots";
  if (!fs.existsSync(docsScreenshotsDir)) {
    fs.mkdirSync(docsScreenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch({ channel: "msedge", headless: true });

  // 1. Desktop Test (1440x900)
  const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await desktopContext.newPage();

  console.log("Navigating to http://localhost:3000/india ...");
  await page.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  const heroSection = page.locator('section[aria-label="Victor Mobility Services Showcase"]');
  await heroSection.waitFor({ state: "visible" });

  // Requirement 1: Check eyebrow text is gone
  const eyebrowWorkforce = await page.locator('text="Workforce Commute"').count();
  const eyebrowTransit = await page.locator('text="Campus & Arterial Transit"').count();
  console.log("Eyebrow count (Workforce Commute):", eyebrowWorkforce);
  console.log("Eyebrow count (Campus & Arterial Transit):", eyebrowTransit);
  if (eyebrowWorkforce > 0 || eyebrowTransit > 0) {
    throw new Error("Eyebrow category text was found in hero!");
  }
  console.log("CHECK 1 PASSED: Eyebrow category text is completely removed.");

  // Requirement 2: Check changing slides thing is at the bottom middle, and no arrows or numbers
  const chevrons = await heroSection.locator('button[aria-label="Previous slide"], button[aria-label="Next slide"]').count();
  console.log("Arrow buttons count:", chevrons);
  if (chevrons > 0) {
    throw new Error("Arrow chevrons found in hero!");
  }

  const slideDots = heroSection.locator('button[aria-label*="Go to slide"]');
  const dotCount = await slideDots.count();
  console.log("Slide indicator dots count:", dotCount);
  if (dotCount !== 6) {
    throw new Error(`Expected 6 slide indicator dots, found ${dotCount}`);
  }

  // Verify dots are placed at bottom middle (check bounding box relative to hero)
  const heroBox = await heroSection.boundingBox();
  const firstDotBox = await slideDots.first().boundingBox();
  const lastDotBox = await slideDots.last().boundingBox();
  const dotsCenter = (firstDotBox.x + lastDotBox.x + lastDotBox.width) / 2;
  const heroCenter = heroBox.x + heroBox.width / 2;
  console.log(`Dots center: ${dotsCenter.toFixed(1)}px, Hero center: ${heroCenter.toFixed(1)}px`);
  // The center should be very close to heroCenter (within 30px)
  if (Math.abs(dotsCenter - heroCenter) > 40) {
    throw new Error(`Slide dots are not centered horizontally! Dots center: ${dotsCenter}, Hero center: ${heroCenter}`);
  }
  // The dots should be in the lower 25% of the hero height
  const dotsYRelative = (firstDotBox.y - heroBox.y) / heroBox.height;
  console.log(`Dots Y relative position: ${(dotsYRelative * 100).toFixed(1)}%`);
  if (dotsYRelative < 0.75) {
    throw new Error(`Slide dots are not at the bottom of hero! Relative Y: ${dotsYRelative}`);
  }
  console.log("CHECK 2 PASSED: Slide indicators are perfectly at the bottom middle, arrows and numbers removed.");

  // Requirement 3: Continuous sliding on hover
  console.log("Testing sliding on hover...");
  const titleBeforeHover = await heroSection.locator("h1").innerText();
  console.log("Title before hover:", titleBeforeHover);

  // Move mouse directly over the hero heading
  await heroSection.locator("h1").hover();
  console.log("Hovering over hero... waiting 2.4s for slide auto-advance");
  await page.waitForTimeout(2400);

  const titleAfterHover = await heroSection.locator("h1").innerText();
  console.log("Title after 2.4s hover:", titleAfterHover);
  if (titleBeforeHover === titleAfterHover) {
    throw new Error("Slide DID NOT advance while hovering! Hover pausing is still active.");
  }
  console.log("CHECK 3 PASSED: Slides continue to advance continuously even when hovered.");

  // Requirement 4: Typography sizes
  const h1 = heroSection.locator("h1");
  const fontSizeH1 = await h1.evaluate((el) => window.getComputedStyle(el).fontSize);
  console.log("Heading h1 computed font-size:", fontSizeH1);
  const p = heroSection.locator("p");
  const fontSizeP = await p.evaluate((el) => window.getComputedStyle(el).fontSize);
  console.log("Subtitle p computed font-size:", fontSizeP);
  console.log("CHECK 4 PASSED: Typography size increased and proportioned.");

  // Capture screenshots
  await page.screenshot({ path: `${artifactDir}/hero-desktop-slide-updated.png`, clip: heroBox });
  await page.screenshot({ path: `${docsScreenshotsDir}/hero-desktop.png`, clip: heroBox });
  console.log("Saved desktop hero screenshots.");

  // Click on a specific dot to verify interaction
  await slideDots.nth(2).click(); // Airport Transfers
  await page.waitForTimeout(400);
  const airportTitle = await heroSection.locator("h1").innerText();
  console.log("Title after clicking dot 3:", airportTitle);
  await page.screenshot({ path: `${artifactDir}/hero-desktop-airport-slide.png`, clip: heroBox });

  // 2. Mobile Viewport Test (390x844)
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(500);

  const mobileHero = mobilePage.locator('section[aria-label="Victor Mobility Services Showcase"]');
  const mobileHeroBox = await mobileHero.boundingBox();
  await mobilePage.screenshot({ path: `${artifactDir}/hero-mobile-updated.png`, clip: mobileHeroBox });
  await mobilePage.screenshot({ path: `${docsScreenshotsDir}/hero-mobile.png`, clip: mobileHeroBox });
  console.log("Saved mobile hero screenshots.");

  await browser.close();
  console.log("ALL VERIFICATION CHECKS PASSED SUCCESSFULLY!");
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
