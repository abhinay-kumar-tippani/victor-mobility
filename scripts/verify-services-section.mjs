import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const SCREENSHOTS_DIR = "d:/victor website/docs/screenshots";
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function run() {
  console.log("=== STARTING SERVICES SECTION VERIFICATION ===");
  const browser = await chromium.launch({ channel: "msedge", headless: true });

  // 1. Desktop Verification
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000/india", { waitUntil: "networkidle" });

  const section = page.locator("#services");
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const headingText = await section.locator("h2").innerText();
  console.log(`Heading: "${headingText}"`);

  const services = [
    "Employee Transportation",
    "Bus & Shuttle Transport",
    "Event Transportation",
    "Airport Transfers",
    "Chauffeur & Luxury Travel",
    "Rent-A-Car"
  ];

  for (const s of services) {
    const card = section.locator(`text=${s}`);
    const count = await card.count();
    console.log(`Service "${s}" found: ${count > 0}`);
  }

  // Capture Section at rest
  const restPath = path.join(SCREENSHOTS_DIR, "services-section-rest.png");
  await section.screenshot({ path: restPath });
  console.log(`Saved: ${restPath}`);

  // Hover on Card 1 (Employee Transportation)
  const card1 = section.locator('[data-testid="service-card-employee-transportation"]');
  await card1.hover();
  await page.waitForTimeout(600); // Allow 500ms CSS fade-in to complete

  const hover1Path = path.join(SCREENSHOTS_DIR, "services-card1-hover.png");
  await card1.screenshot({ path: hover1Path });
  console.log(`Saved: ${hover1Path}`);

  const sectionHover1Path = path.join(SCREENSHOTS_DIR, "services-section-hover-employee.png");
  await section.screenshot({ path: sectionHover1Path });
  console.log(`Saved: ${sectionHover1Path}`);

  // Hover on Card 5 (Chauffeur & Luxury Travel)
  const card5 = section.locator('[data-testid="service-card-chauffeur-luxury"]');
  await card5.hover();
  await page.waitForTimeout(600);

  const hover5Path = path.join(SCREENSHOTS_DIR, "services-card5-hover.png");
  await card5.screenshot({ path: hover5Path });
  console.log(`Saved: ${hover5Path}`);

  // Desktop full page screenshot around services
  const desktopPath = path.join(SCREENSHOTS_DIR, "services-desktop.png");
  await page.screenshot({ path: desktopPath });
  console.log(`Saved: ${desktopPath}`);

  // 2. Mobile Verification (390x844)
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  const mobileSection = mobilePage.locator("#services");
  await mobileSection.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(500);

  const mobileScrollWidth = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
  const mobileInnerWidth = await mobilePage.evaluate(() => window.innerWidth);
  console.log(`Mobile scrollWidth: ${mobileScrollWidth}px, innerWidth: ${mobileInnerWidth}px`);

  const mobilePath = path.join(SCREENSHOTS_DIR, "services-mobile.png");
  await mobilePage.screenshot({ path: mobilePath });
  console.log(`Saved: ${mobilePath}`);

  await browser.close();
  console.log(">>> ALL SERVICES VERIFICATIONS COMPLETED SUCCESSFULLY! <<<");
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
