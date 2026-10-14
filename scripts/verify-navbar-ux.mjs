import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const artifactDir = "C:/Users/tippa/.gemini/antigravity/brain/96355ba5-f687-4614-920e-6878f8155758";
const docsScreenshotDir = path.resolve("docs/screenshots");

if (!fs.existsSync(artifactDir)) {
  fs.mkdirSync(artifactDir, { recursive: true });
}
if (!fs.existsSync(docsScreenshotDir)) {
  fs.mkdirSync(docsScreenshotDir, { recursive: true });
}

async function verify() {
  const browser = await chromium.launch({ channel: "msedge" });

  // 1. Desktop 1440x900 - Home Page
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await desktopPage.waitForTimeout(500);

  // Take screenshot of header on Home
  const header = desktopPage.locator("header");
  await header.screenshot({ path: path.join(docsScreenshotDir, "navbar-home-active.png") });

  // Hover over "Services" button
  const servicesLink = desktopPage.locator("nav a:has-text('Services')");
  await servicesLink.hover();
  await desktopPage.waitForTimeout(300);
  await header.screenshot({ path: path.join(docsScreenshotDir, "navbar-services-hover.png") });

  // Click on "Services" button and wait for navigation
  await servicesLink.click();
  await desktopPage.waitForURL("**/india/services", { timeout: 20000 });
  await desktopPage.waitForTimeout(600);
  await header.screenshot({ path: path.join(docsScreenshotDir, "navbar-services-active.png") });

  // Click on "Fleet" button and wait for navigation
  const fleetLink = desktopPage.locator("nav a:has-text('Fleet')");
  await fleetLink.click();
  await desktopPage.waitForURL("**/india/fleet", { timeout: 20000 });
  await desktopPage.waitForTimeout(600);
  await header.screenshot({ path: path.join(docsScreenshotDir, "navbar-fleet-active.png") });

  // Click back to "Home" button
  const homeLink = desktopPage.locator("nav a:has-text('Home')");
  await homeLink.click();
  await desktopPage.waitForURL("**/india", { timeout: 20000 });
  await desktopPage.waitForTimeout(600);

  // Measure navbar styling details
  const metrics = await desktopPage.evaluate(() => {
    const navLinks = Array.from(document.querySelectorAll("header nav a"));
    return navLinks.map(link => {
      const style = window.getComputedStyle(link);
      const rect = link.getBoundingClientRect();
      return {
        text: link.textContent?.trim(),
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        color: style.color,
        backgroundColor: style.backgroundColor,
        borderRadius: style.borderRadius,
        padding: `${style.paddingTop} ${style.paddingRight} ${style.paddingBottom} ${style.paddingLeft}`,
        width: rect.width,
        height: rect.height,
      };
    });
  });

  console.log("Desktop Nav Links Metrics:", JSON.stringify(metrics, null, 2));

  // 2. Mobile 390x844
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await mobilePage.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(500);

  const menuButton = mobilePage.locator("button[aria-label='Open navigation menu']");
  if (await menuButton.count() > 0) {
    await menuButton.click();
    await mobilePage.waitForTimeout(400);
    const drawerVisible = await mobilePage.locator("#mobile-navigation-drawer").isVisible();
    console.log("Mobile drawer visible:", drawerVisible);
    await mobilePage.screenshot({ path: path.join(docsScreenshotDir, "navbar-mobile-drawer.png") });
  }

  await browser.close();

  // Copy screenshots to artifactDir
  const shots = [
    "navbar-home-active.png",
    "navbar-services-hover.png",
    "navbar-services-active.png",
    "navbar-fleet-active.png",
    "navbar-mobile-drawer.png",
  ];

  for (const s of shots) {
    const src = path.join(docsScreenshotDir, s);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(artifactDir, s));
      console.log(`Copied ${s} to artifacts directory`);
    }
  }

  console.log("Navbar UX Verification completed successfully!");
}

verify().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});
