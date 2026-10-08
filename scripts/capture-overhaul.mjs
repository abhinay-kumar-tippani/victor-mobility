import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3000";
const outputDirs = [
  path.resolve("docs/screenshots/overhaul"),
  "C:/Users/tippa/.gemini/antigravity/brain/342f908c-f56d-40c6-bb00-a2bea1e209b5",
];

for (const dir of outputDirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function capture() {
  const browser = await chromium.launch({ channel: "msedge" });

  const targets = [
    { url: "/india", prefix: "india" },
    { url: "/uae", prefix: "uae" }
  ];

  for (const t of targets) {
    // Desktop Full Page & Hero
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(`${BASE_URL}${t.url}`, { waitUntil: "networkidle" });
    await desktopPage.waitForTimeout(1000);

    for (const dir of outputDirs) {
      await desktopPage.screenshot({ path: path.join(dir, `${t.prefix}-desktop-full.png`), fullPage: true });
      await desktopPage.screenshot({ path: path.join(dir, `${t.prefix}-desktop-hero.png`) });
    }
    console.log(`Captured desktop screenshots for ${t.url}`);
    await desktopContext.close();

    // Mobile Full Page & Hero
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 1,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`${BASE_URL}${t.url}`, { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(1000);

    for (const dir of outputDirs) {
      await mobilePage.screenshot({ path: path.join(dir, `${t.prefix}-mobile-full.png`), fullPage: true });
      await mobilePage.screenshot({ path: path.join(dir, `${t.prefix}-mobile-hero.png`) });
    }
    console.log(`Captured mobile screenshots for ${t.url}`);
    await mobileContext.close();
  }

  await browser.close();
  console.log("All screenshots captured successfully.");
}

capture().catch((e) => {
  console.error("Screenshot error:", e);
  process.exit(1);
});
