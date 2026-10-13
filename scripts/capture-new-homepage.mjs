import { chromium } from "playwright";
import path from "path";
import fs from "fs";

const port = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${port}`;
const outDir = path.resolve("docs/screenshots");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function capture() {
  console.log(`Connecting to ${BASE_URL}/india ...`);
  const browser = await chromium.launch({ channel: "msedge" });

  // 1. Desktop 1440px Capture
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });

  await desktopPage.screenshot({
    path: path.join(outDir, "homepage-clean-desktop-full.png"),
    fullPage: true,
  });
  console.log("Saved: homepage-clean-desktop-full.png");

  // Specific section screenshots
  const sections = [
    { selector: "header", name: "header-desktop.png" },
    { selector: "#services", name: "services-clean-desktop.png" },
    { selector: "#fleet", name: "fleet-clean-desktop.png" },
    { selector: "#standards", name: "standards-clean-desktop.png" },
    { selector: "#network", name: "network-clean-desktop.png" },
    { selector: "#about", name: "people-clean-desktop.png" },
    { selector: "#contact-invitation", name: "contact-clean-desktop.png" },
    { selector: "footer", name: "footer-clean-desktop.png" },
  ];

  for (const sec of sections) {
    const el = await desktopPage.$(sec.selector);
    if (el) {
      await el.screenshot({ path: path.join(outDir, sec.name) });
      console.log(`Saved: ${sec.name}`);
    }
  }

  // 2. Mobile 390px Capture
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });

  await mobilePage.screenshot({
    path: path.join(outDir, "homepage-clean-mobile-full.png"),
    fullPage: true,
  });
  console.log("Saved: homepage-clean-mobile-full.png");

  await browser.close();
  console.log("All screenshots captured successfully.");
}

capture().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});
