import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3000";

async function run() {
  console.log("Connecting to " + BASE_URL + "/india...");
  const browser = await chromium.launch({ channel: "msedge" });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });

  // Verify DOM order of sections
  const sectionIds = await page.evaluate(() => {
    const main = document.querySelector("main");
    if (!main) return [];
    const sections = main.querySelectorAll("section");
    return Array.from(sections).map((s) => s.id || s.getAttribute("aria-label") || "unnamed");
  });
  console.log("Sections in DOM order:", sectionIds);

  const networkIdx = sectionIds.indexOf("network");
  const servicesIdx = sectionIds.indexOf("services");
  const aboutIdx = sectionIds.indexOf("about");

  console.log(`Indices -> network: ${networkIdx}, services: ${servicesIdx}, about: ${aboutIdx}`);

  if (servicesIdx === -1) throw new Error("services section not found!");
  if (aboutIdx === -1) throw new Error("about (leadership) section not found!");
  if (servicesIdx !== aboutIdx - 1) {
    throw new Error(`Expected services (${servicesIdx}) to be immediately before about (${aboutIdx})`);
  }
  console.log("SUCCESS: Services section is located immediately above Leadership & Accountability (#about)!");

  // Verify Workforce Commute Feature is completely removed
  const servicesText = await page.locator("#services").innerText();
  if (servicesText.includes("Workforce Commute Feature")) {
    throw new Error("Workforce Commute Feature still found in #services!");
  }
  if (!servicesText.includes("What do you need to arrange?")) {
    throw new Error('"What do you need to arrange?" not found in #services!');
  }
  console.log('SUCCESS: "Workforce Commute Feature" is completely removed and "What do you need to arrange?" is intact.');

  // Save Screenshots
  const outDir = path.resolve("docs/screenshots");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Scroll to Services section and screenshot desktop
  const servicesEl = page.locator("#services");
  await servicesEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, "services-reorder-desktop.png") });
  console.log("Saved docs/screenshots/services-reorder-desktop.png");

  // Also capture full view showing boundary between Network -> Services -> Leadership
  const aboutEl = page.locator("#about");
  await aboutEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, "leadership-context-desktop.png") });
  console.log("Saved docs/screenshots/leadership-context-desktop.png");

  // Mobile view
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });
  const mobileServicesEl = mobilePage.locator("#services");
  await mobileServicesEl.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({ path: path.join(outDir, "services-reorder-mobile.png") });
  console.log("Saved docs/screenshots/services-reorder-mobile.png");

  await browser.close();
  console.log("ALL VERIFICATIONS COMPLETED SUCCESSFULLY!");
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
