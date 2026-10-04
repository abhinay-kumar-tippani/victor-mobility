import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const targetUrl = "http://localhost:3000/india";
const outputDirs = [
  path.resolve("docs/screenshots"),
  "C:/Users/tippa/.gemini/antigravity/brain/6bcbc0c9-63bc-40e5-84e8-1703d532d8fa",
];

for (const dir of outputDirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function getBrowser() {
  try {
    return await chromium.launch();
  } catch (e1) {
    console.log("Default chromium failed, trying msedge channel...");
    try {
      return await chromium.launch({ channel: "msedge" });
    } catch (e2) {
      console.log("msedge failed, trying chrome channel...");
      return await chromium.launch({ channel: "chrome" });
    }
  }
}

async function main() {
  console.log("Launching browser for screenshots...");
  const browser = await getBrowser();

  // Desktop 1440 x 900
  console.log("Capturing Desktop screenshots (1440px)...");
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto(targetUrl, { waitUntil: "networkidle" });
  await desktopPage.waitForTimeout(1000);

  const desktopViewportPath = path.join(outputDirs[0], "desktop-hero.png");
  await desktopPage.screenshot({ path: desktopViewportPath });

  const desktopFullPath = path.join(outputDirs[0], "desktop-full.png");
  await desktopPage.screenshot({ path: desktopFullPath, fullPage: true });

  // Mobile 390 x 844
  console.log("Capturing Mobile screenshots (390px)...");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(targetUrl, { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1000);

  const mobileViewportPath = path.join(outputDirs[0], "mobile-hero.png");
  await mobilePage.screenshot({ path: mobileViewportPath });

  const mobileFullPath = path.join(outputDirs[0], "mobile-full.png");
  await mobilePage.screenshot({ path: mobileFullPath, fullPage: true });

  // Also capture mobile menu opened
  console.log("Capturing Mobile menu open screenshot...");
  const menuButton = mobilePage.locator("button[aria-label='Open navigation menu']");
  if (await menuButton.count() > 0) {
    await menuButton.click();
    await mobilePage.waitForTimeout(300);
    const mobileMenuPath = path.join(outputDirs[0], "mobile-menu.png");
    await mobilePage.screenshot({ path: mobileMenuPath });
  }

  await browser.close();

  // Copy files to artifact dir
  const filesToCopy = [
    "desktop-hero.png",
    "desktop-full.png",
    "mobile-hero.png",
    "mobile-full.png",
    "mobile-menu.png",
  ];

  for (const file of filesToCopy) {
    const src = path.join(outputDirs[0], file);
    if (fs.existsSync(src)) {
      const dest = path.join(outputDirs[1], file);
      fs.copyFileSync(src, dest);
      console.log(`Copied ${file} to artifacts directory`);
    }
  }

  console.log("All screenshots captured and saved successfully!");
}

main().catch((err) => {
  console.error("Error capturing screenshots:", err);
  process.exit(1);
});
