import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const artifactDir = "C:/Users/tippa/.gemini/antigravity/brain/e70cbcab-bcf4-4836-8d95-fdaa9ef9b57f";
const docsScreenshotDir = path.resolve("docs/screenshots");

if (!fs.existsSync(artifactDir)) {
  fs.mkdirSync(artifactDir, { recursive: true });
}
if (!fs.existsSync(docsScreenshotDir)) {
  fs.mkdirSync(docsScreenshotDir, { recursive: true });
}

async function verify() {
  const browser = await chromium.launch({ channel: "msedge" });
  
  // 1. Desktop 1440x900
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await desktopPage.waitForTimeout(500);

  const desktopData = await desktopPage.evaluate(() => {
    const header = document.querySelector("header");
    const headerInner = header?.querySelector(".flex.items-center.justify-between");
    const logoLink = header?.querySelector('a[aria-label="Victor Mobility - Home"]');
    const logoSvg = logoLink?.querySelector("svg");
    const logoDiv = logoLink?.querySelector("div");
    const nav = header?.querySelector("nav");
    const ctas = header?.querySelector(".shrink-0");

    return {
      headerTotalHeight: header?.offsetHeight,
      headerInnerHeight: headerInner?.getBoundingClientRect().height,
      logoLinkRect: logoLink?.getBoundingClientRect(),
      logoDivRect: logoDiv?.getBoundingClientRect(),
      logoSvgRect: logoSvg?.getBoundingClientRect(),
      navRect: nav?.getBoundingClientRect(),
      ctasRect: ctas?.getBoundingClientRect(),
    };
  });

  console.log("Desktop Measurements:\n", JSON.stringify(desktopData, null, 2));

  // Screenshot header
  const header = desktopPage.locator("header");
  const desktopHeaderShot = path.join(docsScreenshotDir, "navbar-fix-desktop-header.png");
  await header.screenshot({ path: desktopHeaderShot });

  // Screenshot top fold
  const desktopFoldShot = path.join(docsScreenshotDir, "navbar-fix-desktop-fold.png");
  await desktopPage.screenshot({ path: desktopFoldShot, clip: { x: 0, y: 0, width: 1440, height: 800 } });

  // 2. Mobile 390x844
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await mobilePage.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(500);

  const mobileData = await mobilePage.evaluate(() => {
    const header = document.querySelector("header");
    const headerInner = header?.querySelector(".flex.items-center.justify-between");
    const logoLink = header?.querySelector('a[aria-label="Victor Mobility - Home"]');
    const logoSvg = logoLink?.querySelector("svg");
    const logoDiv = logoLink?.querySelector("div");

    return {
      headerTotalHeight: header?.offsetHeight,
      headerInnerHeight: headerInner?.getBoundingClientRect().height,
      logoLinkRect: logoLink?.getBoundingClientRect(),
      logoDivRect: logoDiv?.getBoundingClientRect(),
      logoSvgRect: logoSvg?.getBoundingClientRect(),
    };
  });

  console.log("Mobile Measurements:\n", JSON.stringify(mobileData, null, 2));

  const mobileHeader = mobilePage.locator("header");
  const mobileHeaderShot = path.join(docsScreenshotDir, "navbar-fix-mobile-header.png");
  await mobileHeader.screenshot({ path: mobileHeaderShot });

  const mobileFoldShot = path.join(docsScreenshotDir, "navbar-fix-mobile-fold.png");
  await mobilePage.screenshot({ path: mobileFoldShot, clip: { x: 0, y: 0, width: 390, height: 800 } });

  // Test mobile menu drawer
  const menuButton = mobilePage.locator("button[aria-label='Open navigation menu']");
  if (await menuButton.count() > 0) {
    await menuButton.click();
    await mobilePage.waitForTimeout(300);
    const drawerVisible = await mobilePage.locator("#mobile-navigation-drawer").isVisible();
    console.log("Mobile drawer visible after click:", drawerVisible);
    const mobileDrawerShot = path.join(docsScreenshotDir, "navbar-fix-mobile-drawer.png");
    await mobilePage.screenshot({ path: mobileDrawerShot });
  }

  await browser.close();

  // Copy screenshots to artifactDir
  const shots = [
    "navbar-fix-desktop-header.png",
    "navbar-fix-desktop-fold.png",
    "navbar-fix-mobile-header.png",
    "navbar-fix-mobile-fold.png",
    "navbar-fix-mobile-drawer.png",
  ];

  for (const s of shots) {
    const src = path.join(docsScreenshotDir, s);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(artifactDir, s));
      console.log(`Copied ${s} to artifacts directory`);
    }
  }

  console.log("Verification finished successfully!");
}

verify().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});
