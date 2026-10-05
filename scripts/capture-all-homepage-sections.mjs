import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3000";
const outputDirs = [
  path.resolve("docs/screenshots"),
  "C:/Users/tippa/.gemini/antigravity/brain/6bcbc0c9-63bc-40e5-84e8-1703d532d8fa",
];

async function saveImage(page, filename, options = {}) {
  for (const dir of outputDirs) {
    const dest = path.join(dir, filename);
    await page.screenshot({ path: dest, ...options });
  }
  console.log(`Saved screenshot: ${filename}`);
}

async function capture() {
  const browser = await chromium.launch({ channel: "msedge" });

  // 1. Desktop Section Captures
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });

  const sections = [
    { id: "services", filename: "section-services-desktop.png" },
    { id: "employee-transport", filename: "section-employee-transport-desktop.png" },
    { id: "fleet", filename: "section-fleet-desktop.png" },
    { id: "cities", filename: "section-cities-desktop.png" },
    { id: "contact", filename: "section-contact-desktop.png" },
  ];

  for (const sec of sections) {
    const el = await desktopPage.$(`#${sec.id}`);
    if (el) {
      for (const dir of outputDirs) {
        await el.screenshot({ path: path.join(dir, sec.filename) });
      }
      console.log(`Saved: ${sec.filename}`);
    }
  }

  // 2. Full Page Mobile Capture
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });

  await saveImage(mobilePage, "home-mobile-full.png", { fullPage: true });

  for (const sec of sections) {
    const el = await mobilePage.$(`#${sec.id}`);
    if (el) {
      const mobFilename = sec.filename.replace("-desktop.png", "-mobile.png");
      for (const dir of outputDirs) {
        await el.screenshot({ path: path.join(dir, mobFilename) });
      }
      console.log(`Saved: ${mobFilename}`);
    }
  }

  await browser.close();
  console.log("All section captures completed successfully.");
}

capture().catch((e) => {
  console.error("Error capturing sections:", e);
  process.exit(1);
});
