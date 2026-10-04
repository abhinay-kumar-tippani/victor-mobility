import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const targetUrl = "http://localhost:3000/india";
const outputDirs = [
  path.resolve("docs/screenshots"),
  "C:/Users/tippa/.gemini/antigravity/brain/6bcbc0c9-63bc-40e5-84e8-1703d532d8fa",
];

async function main() {
  const browser = await chromium.launch({ channel: "msedge" });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto(targetUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  // Disable smooth scroll so Playwright fullPage stitcher does not glitch
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.scrollBehavior = "auto";
  });

  // Capture individual mobile section screenshots for bulletproof evidence
  // 1. Mobile Hero
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(outputDirs[0], "mobile-hero.png") });

  // 2. Mobile Services
  const servicesEl = page.locator("#services");
  await servicesEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await servicesEl.screenshot({ path: path.join(outputDirs[0], "mobile-services.png") });

  // 3. Mobile Employee Transport
  const employeeEl = page.locator("#employee-transport");
  await employeeEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await employeeEl.screenshot({ path: path.join(outputDirs[0], "mobile-employee.png") });

  // 4. Mobile Fleet
  const fleetEl = page.locator("#fleet");
  await fleetEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await fleetEl.screenshot({ path: path.join(outputDirs[0], "mobile-fleet.png") });

  // 5. Mobile Network (Cities)
  const networkEl = page.locator("#network");
  await networkEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await networkEl.screenshot({ path: path.join(outputDirs[0], "mobile-network.png") });

  // 6. Mobile About
  const aboutEl = page.locator("#about");
  await aboutEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await aboutEl.screenshot({ path: path.join(outputDirs[0], "mobile-about.png") });

  // 7. Mobile Enquiry
  const contactEl = page.locator("#contact");
  await contactEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await contactEl.screenshot({ path: path.join(outputDirs[0], "mobile-contact.png") });

  // 8. Mobile Footer
  const footerEl = page.locator("footer");
  await footerEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await footerEl.screenshot({ path: path.join(outputDirs[0], "mobile-footer.png") });

  // 9. Mobile Lower combined (Network through Footer)
  await page.evaluate(() => {
    const el = document.getElementById("network");
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outputDirs[0], "mobile-lower.png") });

  // 10. Clean full page without repetition
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({
    path: path.join(outputDirs[0], "mobile-full.png"),
    fullPage: true,
  });

  await browser.close();

  // Copy all files to artifacts directory
  const filesToCopy = fs.readdirSync(outputDirs[0]);
  for (const f of filesToCopy) {
    if (f.endsWith(".png")) {
      fs.copyFileSync(path.join(outputDirs[0], f), path.join(outputDirs[1], f));
    }
  }
  console.log("All mobile section screenshots captured successfully!");
}

main().catch(console.error);
