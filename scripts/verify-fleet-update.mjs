import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const screenshotsDir = path.resolve("docs/screenshots");
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function run() {
  console.log(`Starting fleet verification on ${BASE_URL}...`);
  const browser = await chromium.launch({ channel: "chrome" });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 1. Visit /india/fleet
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/india/fleet`, { waitUntil: "networkidle" });

  // Verify total cards count in "All Vehicles" tab
  const allCards = page.locator("article");
  const cardCount = await allCards.count();
  console.log(`[Check 1] Total vehicle cards rendered: ${cardCount} (Expected: 16)`);
  if (cardCount !== 16) {
    throw new Error(`Expected 16 vehicle cards, got ${cardCount}`);
  }

  // Verify each expected vehicle is present
  const expectedNames = [
    "Swift Dzire",
    "Hyundai Aura",
    "Tata Tigor",
    "Tata Nexon",
    "MG ZS EV",
    "Mahindra Marazzo",
    "Ertiga CNG",
    "Toyota Innova Crysta",
    "Kia Carens Clavis EV",
    "Urbania (12 Seater)",
    "MG Windsor EV",
    "Force Urbania (16 Seater)",
    "Tata Marcopolo (40 Seater Bus)",
    "SML (22 Seater Bus)",
    "Toyota Rumion",
    "Toyota Urban Cruiser Hyryder",
  ];

  const renderedTitles = await page.locator("article h3").allTextContents();
  console.log(`Rendered titles:`, renderedTitles);

  for (const exp of expectedNames) {
    const found = renderedTitles.some((t) => t.includes(exp) || exp.includes(t));
    if (!found) {
      throw new Error(`Expected vehicle "${exp}" not found in rendered titles!`);
    }
  }
  console.log(`[Check 2] All 16 expected vehicle models verified in catalogue!`);

  // Verify section caption
  const footnoteText = await page.locator("section#fleet").textContent();
  if (!footnoteText?.includes("Vehicle illustrations are for reference; the assigned vehicle may differ.")) {
    throw new Error(`Section caption "Vehicle illustrations are for reference; the assigned vehicle may differ." missing!`);
  }
  console.log(`[Check 3] Section caption verified!`);

  // Wait for client-side hydration in dev mode
  await page.waitForTimeout(1500);

  // 2. Test Filter Tabs
  // Tab: Group Transport & Buses
  console.log(`Testing Group Transport filter...`);
  const groupTab = page.locator('button[role="tab"]:has-text("Group Transport")');
  await groupTab.click();
  await page.waitForFunction(() => document.querySelectorAll('article').length === 4, { timeout: 5000 }).catch(async () => {
    await groupTab.click();
    await page.waitForFunction(() => document.querySelectorAll('article').length === 4, { timeout: 5000 });
  });

  const groupCards = await page.locator("article").allTextContents();
  console.log(`Group transport cards count: ${groupCards.length} (Expected: 4)`);
  if (groupCards.length !== 4) {
    throw new Error(`Expected 4 group transport cards, got ${groupCards.length}`);
  }
  const groupTitles = await page.locator("article h3").allTextContents();
  console.log(`Group titles:`, groupTitles);
  if (!groupTitles.some((t) => t.includes("Urbania (12 Seater)"))) throw new Error("12-seater missing in Group Transport");
  if (!groupTitles.some((t) => t.includes("Force Urbania (16 Seater)"))) throw new Error("16-seater missing in Group Transport");
  if (!groupTitles.some((t) => t.includes("Tata Marcopolo"))) throw new Error("Marcopolo missing in Group Transport");
  if (!groupTitles.some((t) => t.includes("SML"))) throw new Error("SML missing in Group Transport");

  await page.screenshot({ path: path.join(screenshotsDir, "india-fleet-group-transport-1440.png") });

  // Tab: Electric Vehicles
  console.log(`Testing Electric Vehicles filter...`);
  const evTab = page.locator('button[role="tab"]:has-text("Electric")');
  await evTab.click();
  await page.waitForFunction(() => document.querySelectorAll('article').length === 5, { timeout: 5000 }).catch(async () => {
    await evTab.click();
    await page.waitForFunction(() => document.querySelectorAll('article').length === 5, { timeout: 5000 });
  });

  const evCards = await page.locator("article").allTextContents();
  console.log(`Electric vehicles count: ${evCards.length} (Expected: 5)`);
  if (evCards.length !== 5) {
    throw new Error(`Expected 5 electric vehicles, got ${evCards.length}`);
  }
  const evTitles = await page.locator("article h3").allTextContents();
  console.log(`EV titles:`, evTitles);
  if (!evTitles.some((t) => t.includes("MG Windsor EV"))) throw new Error("MG Windsor EV missing in EV filter!");

  await page.screenshot({ path: path.join(screenshotsDir, "india-fleet-electric-1440.png") });

  // Switch back to All
  const allTab = page.locator('button[role="tab"]:has-text("All")');
  await allTab.click();
  await page.waitForFunction(() => document.querySelectorAll('article').length === 16, { timeout: 5000 });
  await page.screenshot({ path: path.join(screenshotsDir, "india-fleet-catalogue-1440.png") });

  // 3. Test Deep Linking #electric
  console.log(`Testing deep link #electric...`);
  await page.goto(`${BASE_URL}/india/fleet#electric`, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  const activeEvTab = await page.locator('button[role="tab"][aria-selected="true"]').textContent();
  console.log(`Active tab on #electric: "${activeEvTab?.trim()}" (Expected Electric)`);
  if (!activeEvTab?.includes("Electric")) {
    throw new Error(`Expected Electric tab to be selected on #electric, got "${activeEvTab}"`);
  }

  // 4. Test Enquiry Links for both Urbanias
  console.log(`Testing Enquiry pre-fill for Urbania 12-seater...`);
  await page.goto(`${BASE_URL}/india/fleet`, { waitUntil: "networkidle" });
  const urbania12Link = page.locator('article:has(h3:has-text("Urbania (12 Seater)")) a:has-text("Enquire")');
  const href12 = await urbania12Link.getAttribute("href");
  console.log(`Urbania 12 enquiry href: ${href12}`);
  if (!href12?.includes("Urbania%20(12%20Seater)") || !href12?.includes("12%20Seater")) {
    throw new Error(`Urbania 12 enquiry href invalid: ${href12}`);
  }

  await page.goto(`${BASE_URL}${href12}`, { waitUntil: "networkidle" });
  await page.waitForSelector("text=Selected Vehicle:", { timeout: 15000 });
  const selectedVehicleText12 = await page.locator("text=Selected Vehicle:").textContent();
  console.log(`Selected vehicle badge (12-seater): "${selectedVehicleText12}"`);
  if (!selectedVehicleText12?.includes("12 Seater")) {
    throw new Error(`Expected 12 Seater in selected vehicle badge, got: ${selectedVehicleText12}`);
  }
  await page.screenshot({ path: path.join(screenshotsDir, "india-enquiry-urbania-12.png") });

  console.log(`Testing Enquiry pre-fill for Force Urbania 16-seater...`);
  await page.goto(`${BASE_URL}/india/fleet`, { waitUntil: "networkidle" });
  const urbania16Link = page.locator('article:has(h3:has-text("Force Urbania (16 Seater)")) a:has-text("Enquire")');
  const href16 = await urbania16Link.getAttribute("href");
  console.log(`Urbania 16 enquiry href: ${href16}`);
  if (!href16?.includes("Force%20Urbania%20(16%20Seater)") || !href16?.includes("16%20Seater")) {
    throw new Error(`Urbania 16 enquiry href invalid: ${href16}`);
  }

  await page.goto(`${BASE_URL}${href16}`, { waitUntil: "networkidle" });
  await page.waitForSelector("text=Selected Vehicle:", { timeout: 15000 });
  const selectedVehicleText16 = await page.locator("text=Selected Vehicle:").textContent();
  console.log(`Selected vehicle badge (16-seater): "${selectedVehicleText16}"`);
  if (!selectedVehicleText16?.includes("16 Seater")) {
    throw new Error(`Expected 16 Seater in selected vehicle badge, got: ${selectedVehicleText16}`);
  }
  await page.screenshot({ path: path.join(screenshotsDir, "india-enquiry-urbania-16.png") });

  // 5. Test India Homepage Fleet Preview
  console.log(`Testing India Homepage Fleet Preview...`);
  await page.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });
  const previewCards = page.locator("#fleet article");
  const previewCount = await previewCards.count();
  console.log(`India homepage preview card count: ${previewCount} (Expected: 4)`);
  if (previewCount !== 4) {
    throw new Error(`Expected 4 preview cards on India homepage, got ${previewCount}`);
  }
  const viewFullFleetBtn = page.locator('#fleet a:has-text("View full fleet")');
  const fleetBtnHref = await viewFullFleetBtn.getAttribute("href");
  console.log(`Homepage "View full fleet" href: ${fleetBtnHref} (Expected: /india/fleet)`);
  if (fleetBtnHref !== "/india/fleet") {
    throw new Error(`Expected href="/india/fleet", got "${fleetBtnHref}"`);
  }

  // 6. Test UAE Isolation
  console.log(`Testing UAE inventory isolation...`);
  await page.goto(`${BASE_URL}/uae/fleet`, { waitUntil: "networkidle" });
  const uaeText = await page.content();
  if (uaeText.includes("Tata Marcopolo") || uaeText.includes("Force Urbania")) {
    throw new Error("India vehicles leaked into UAE fleet!");
  }
  console.log(`UAE isolation verified!`);

  // 7. Responsive & Horizontal Overflow Checks
  const viewports = [
    { width: 1440, height: 900, name: "desktop-1440" },
    { width: 768, height: 1024, name: "tablet-768" },
    { width: 390, height: 844, name: "mobile-390" },
    { width: 320, height: 640, name: "compact-320" },
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(`${BASE_URL}/india/fleet`, { waitUntil: "networkidle" });
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth + 1;
    });
    console.log(`Viewport ${vp.name} (${vp.width}px) overflow: ${overflow}`);
    if (overflow) {
      throw new Error(`Horizontal overflow detected at ${vp.width}px!`);
    }
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: path.join(screenshotsDir, "india-fleet-mobile-390.png") });

  await browser.close();
  console.log(`\nALL FLEET VERIFICATIONS PASSED SUCCESSFULLY!`);
}

run().catch((err) => {
  console.error("Verification failed:", err.stack || err);
  process.exit(1);
});
