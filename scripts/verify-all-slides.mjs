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

  // Slide 1: Bus & Shuttle
  const busTab = page.getByRole("button", { name: /Bus & Shuttle/i });
  await busTab.click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/hero_slide_bus.png` });
  console.log("Captured bus slide");

  // Slide 4: Event Travel
  const eventTab = page.getByRole("button", { name: /Event Travel/i });
  await eventTab.click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/hero_slide_event.png` });
  console.log("Captured event slide");

  // Slide 5: Rent-A-Car
  const rentTab = page.getByRole("button", { name: /Rent-A-Car/i });
  await rentTab.click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/hero_slide_rent.png` });
  console.log("Captured rent slide");

  await browser.close();
  console.log("Captured all remaining slides successfully!");
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
