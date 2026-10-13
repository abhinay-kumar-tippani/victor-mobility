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

  // 1. Desktop Slide 0: Employee Transportation
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${outDir}/hero_slide_0_employee.png` });
  console.log("Captured slide 0 (Employee Commute)");

  // 2. Click Airport Transfers tab
  const airportTab = page.getByRole("button", { name: /Airport Transfers/i });
  await airportTab.click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/hero_slide_airport.png` });
  console.log("Captured airport slide");

  // 3. Click Chauffeur & VIP tab
  const chauffeurTab = page.getByRole("button", { name: /Chauffeur/i });
  await chauffeurTab.click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/hero_slide_chauffeur.png` });
  console.log("Captured chauffeur slide");

  // 4. Test clicking 'Explore Chauffeur & Luxury Travel'
  const exploreLink = page.getByRole("link", { name: /Explore Chauffeur/i });
  console.log("Found explore link with href:", await exploreLink.getAttribute("href"));
  await exploreLink.click();
  await page.waitForURL("**/india/services/chauffeur-luxury");
  console.log("Navigated successfully to:", page.url());

  // 5. Mobile Viewport Test on /india
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 }
  });
  await mobilePage.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: `${outDir}/hero_mobile_slide_0.png` });
  console.log("Captured mobile hero slide 0");

  await browser.close();
  console.log("All verifications passed!");
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
