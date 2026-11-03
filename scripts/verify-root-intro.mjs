import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const screenshotsDir = path.resolve("docs/screenshots");
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function run() {
  console.log(`Starting verification on ${BASE_URL}...`);
  const browser = await chromium.launch({ channel: "chrome" });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Test viewports
  const viewports = [
    { name: "desktop-1440", width: 1440, height: 900, screenshot: "root-desktop-1440.png" },
    { name: "tablet-768", width: 768, height: 1024, screenshot: "root-tablet-768.png" },
    { name: "mobile-390", width: 390, height: 844, screenshot: "root-mobile-390.png" },
    { name: "compact-320", width: 320, height: 640, screenshot: "root-compact-320.png" },
  ];

  // 1. Verify header is absent on /
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
  const rootHeaderCount = await page.locator("header").count();
  console.log(`[Check 1] Header tag count on /: ${rootHeaderCount} (Expected: 0)`);
  if (rootHeaderCount !== 0) {
    throw new Error(`Expected 0 <header> tags on /, found ${rootHeaderCount}`);
  }

  // 2. Verify header is preserved on /india and /uae
  await page.goto(`${BASE_URL}/india`, { waitUntil: "networkidle" });
  const indiaHeaderCount = await page.locator("header").count();
  console.log(`[Check 2] Header tag count on /india: ${indiaHeaderCount} (Expected: 1)`);
  if (indiaHeaderCount < 1) {
    throw new Error(`Header missing on /india`);
  }

  await page.goto(`${BASE_URL}/uae`, { waitUntil: "networkidle" });
  const uaeHeaderCount = await page.locator("header").count();
  console.log(`[Check 2b] Header tag count on /uae: ${uaeHeaderCount} (Expected: 1)`);
  if (uaeHeaderCount < 1) {
    throw new Error(`Header missing on /uae`);
  }

  // Return to /
  for (const vp of viewports) {
    console.log(`\n--- Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });

    // Check horizontal overflow
    const overflow = await page.evaluate(() => {
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      return {
        docWidth,
        winWidth,
        hasOverflow: docWidth > winWidth + 1, // allow 1px subpixel tolerance
      };
    });
    console.log(`Horizontal overflow: docWidth=${overflow.docWidth}, winWidth=${overflow.winWidth}, hasOverflow=${overflow.hasOverflow}`);
    if (overflow.hasOverflow) {
      throw new Error(`Horizontal overflow detected at ${vp.width}px! docWidth=${overflow.docWidth}`);
    }

    // Inspect elements
    const metrics = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      const eyebrow = document.querySelector("h1")?.previousElementSibling;
      const desc = document.querySelector("h1")?.nextElementSibling;
      const logoSvg = document.querySelector('svg[aria-label*="Victor Mobility"]');
      const logoDiv = logoSvg ? logoSvg.closest("div") : null;
      const nav = document.querySelector("nav");

      const h1Rect = h1?.getBoundingClientRect();
      const eyebrowRect = eyebrow?.getBoundingClientRect();
      const descRect = desc?.getBoundingClientRect();
      const logoRect = logoDiv?.getBoundingClientRect();
      const navRect = nav?.getBoundingClientRect();

      const h1Style = h1 ? window.getComputedStyle(h1) : null;
      const eyebrowStyle = eyebrow ? window.getComputedStyle(eyebrow) : null;

      return {
        h1Text: h1?.textContent?.trim(),
        h1FontSize: h1Style?.fontSize,
        h1LineHeight: h1Style?.lineHeight,
        eyebrowText: eyebrow?.textContent?.trim(),
        eyebrowFontSize: eyebrowStyle?.fontSize,
        logoWidth: logoRect?.width,
        logoHeight: logoRect?.height,
        logoX: logoRect?.x,
        h1X: h1Rect?.x,
        logoY: logoRect?.y,
        eyebrowY: eyebrowRect?.y,
        h1Y: h1Rect?.y,
        descY: descRect?.y,
        navY: navRect?.y,
        windowWidth: window.innerWidth,
      };
    });

    console.log(`Headline: "${metrics.h1Text}", fontSize: ${metrics.h1FontSize}`);
    console.log(`Eyebrow: "${metrics.eyebrowText}", fontSize: ${metrics.eyebrowFontSize}`);
    console.log(`Logo: width=${metrics.logoWidth?.toFixed(1)}px, height=${metrics.logoHeight?.toFixed(1)}px, x=${metrics.logoX?.toFixed(1)}px, y=${metrics.logoY?.toFixed(1)}px`);
    console.log(`Y positions: logoY=${metrics.logoY?.toFixed(1)}, eyebrowY=${metrics.eyebrowY?.toFixed(1)}, h1Y=${metrics.h1Y?.toFixed(1)}, descY=${metrics.descY?.toFixed(1)}, navY=${metrics.navY?.toFixed(1)}`);

    // Verify Desktop specifics
    if (vp.width === 1440) {
      console.log(`[Desktop Check] Checking 65/35 split & logo on right:`);
      // Text should be on left (h1X < logoX)
      if (metrics.h1X >= metrics.logoX) {
        throw new Error(`Desktop expected text on left and logo on right, but h1X=${metrics.h1X} >= logoX=${metrics.logoX}`);
      }
      // Logo width should be approximately 300-340px
      if (metrics.logoWidth < 290 || metrics.logoWidth > 350) {
        throw new Error(`Desktop logo width expected 300-340px, got ${metrics.logoWidth}`);
      }
      // Headline font size should be approximately 42px
      const fsNum = parseFloat(metrics.h1FontSize);
      if (fsNum < 40 || fsNum > 44) {
        throw new Error(`Desktop headline fontSize expected ~42px, got ${metrics.h1FontSize}`);
      }
      console.log(`Desktop checks PASSED!`);
    }

    // Verify Mobile specifics (390px)
    if (vp.width === 390) {
      console.log(`[Mobile Check] Checking stack order: Logo -> Eyebrow -> H1 -> Desc -> Nav`);
      if (!(metrics.logoY < metrics.eyebrowY && metrics.eyebrowY < metrics.h1Y && metrics.h1Y < metrics.descY && metrics.descY < metrics.navY)) {
        throw new Error(`Mobile stack order mismatch! logoY=${metrics.logoY}, eyebrowY=${metrics.eyebrowY}, h1Y=${metrics.h1Y}, descY=${metrics.descY}, navY=${metrics.navY}`);
      }
      // Check logo centered
      const leftMargin = metrics.logoX;
      const rightMargin = vp.width - (metrics.logoX + metrics.logoWidth);
      console.log(`Mobile logo centering: leftMargin=${leftMargin.toFixed(1)}, rightMargin=${rightMargin.toFixed(1)}`);
      if (Math.abs(leftMargin - rightMargin) > 2) {
        throw new Error(`Mobile logo not centered! leftMargin=${leftMargin}, rightMargin=${rightMargin}`);
      }
      // Check logo width: approximately 200-220px
      if (metrics.logoWidth < 195 || metrics.logoWidth > 225) {
        throw new Error(`Mobile logo width expected 200-220px, got ${metrics.logoWidth}`);
      }
      // Headline size: 30-32px
      const fsNum = parseFloat(metrics.h1FontSize);
      if (fsNum < 29 || fsNum > 33) {
        throw new Error(`Mobile headline fontSize expected 30-32px, got ${metrics.h1FontSize}`);
      }
      console.log(`Mobile checks PASSED!`);
    }

    // Capture screenshot
    const screenshotPath = path.join(screenshotsDir, vp.screenshot);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`Saved screenshot: ${screenshotPath}`);
  }

  await browser.close();
  console.log("\nALL VERIFICATIONS PASSED SUCCESSFULLY!");
}

run().catch(err => {
  console.error("Verification failed:", err);
  process.exit(1);
});
