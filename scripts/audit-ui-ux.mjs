import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3000";
const AUDIT_DIR = path.resolve("docs/screenshots/audit");
const ARTIFACT_DIR = "C:/Users/tippa/.gemini/antigravity/brain/b4ff2805-9bf2-4ee9-bf61-4cfff6c86b48";

if (!fs.existsSync(AUDIT_DIR)) {
  fs.mkdirSync(AUDIT_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: "small-mobile-320", width: 320, height: 568 },
  { name: "mobile-375", width: 375, height: 667 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "mobile-430", width: 430, height: 932 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "tablet-1024", width: 1024, height: 768 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "large-desktop-1920", width: 1920, height: 1080 },
];

const PAGES_TO_AUDIT = [
  { name: "india-home", path: "/india" },
  { name: "india-contact", path: "/india/contact" },
  { name: "india-services", path: "/india/services" },
  { name: "india-service-employee", path: "/india/services/employee-transportation" },
  { name: "india-fleet", path: "/india/fleet" },
  { name: "india-about", path: "/india/about" },
  { name: "india-rfp", path: "/india/rfp" },
  { name: "india-estimator", path: "/india/estimator" },
  { name: "markets", path: "/markets" },
  { name: "root", path: "/" },
];

async function runAudit() {
  console.log("Starting Comprehensive UI/UX Audit across breakpoints...");
  const browser = await chromium.launch({ channel: "msedge" });
  const findings = [];

  // Warmup step
  console.log("Warming up Next.js dev server compilation...");
  const warmupContext = await browser.newContext();
  const warmupPage = await warmupContext.newPage();
  try {
    await warmupPage.goto(`${BASE_URL}/india`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await warmupPage.waitForTimeout(2000);
    console.log("Warmup complete for /india!");
  } catch (e) {
    console.warn("Warmup note:", e.message);
  }
  await warmupContext.close();

  for (const vp of VIEWPORTS) {
    console.log(`\n=== Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ===`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    for (const pg of PAGES_TO_AUDIT) {
      const url = `${BASE_URL}${pg.path}`;
      try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForTimeout(800);

        // 1. Check Horizontal Overflow & Elements causing it
        const overflowData = await page.evaluate(() => {
          const docWidth = document.documentElement.scrollWidth;
          const winWidth = window.innerWidth;
          const bodyWidth = document.body.scrollWidth;
          const isOverflowing = docWidth > winWidth + 1 || bodyWidth > winWidth + 1;
          
          const overflowingElements = [];
          if (isOverflowing) {
            const allElements = document.querySelectorAll("*");
            for (const el of allElements) {
              const rect = el.getBoundingClientRect();
              if (rect.right > winWidth + 2) {
                overflowingElements.push({
                  tag: el.tagName.toLowerCase(),
                  className: (el.className || "").toString().slice(0, 120),
                  id: el.id,
                  right: Math.round(rect.right),
                  width: Math.round(rect.width),
                  text: (el.textContent || "").trim().slice(0, 50),
                });
                if (overflowingElements.length >= 6) break;
              }
            }
          }

          // Check Touch Targets for mobile/tablet (<44px)
          const smallTouchTargets = [];
          if (window.innerWidth <= 768) {
            const interactive = document.querySelectorAll("button, a, input, select, textarea");
            for (const el of interactive) {
              const rect = el.getBoundingClientRect();
              // Only visible elements
              if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
                const isInline = window.getComputedStyle(el).display === "inline";
                if (!isInline && !el.closest("p")) {
                  smallTouchTargets.push({
                    tag: el.tagName.toLowerCase(),
                    text: (el.textContent || "").trim().slice(0, 30),
                    className: (el.className || "").toString().slice(0, 80),
                    width: Math.round(rect.width),
                    height: Math.round(rect.height),
                  });
                  if (smallTouchTargets.length >= 6) break;
                }
              }
            }
          }

          // Check for text lines with excessive character width or tiny text
          const typographyIssues = [];
          const headings = document.querySelectorAll("h1, h2, h3, p");
          for (const el of headings) {
            const style = window.getComputedStyle(el);
            const fontSize = parseFloat(style.fontSize);
            const lineHeight = parseFloat(style.lineHeight);
            if (el.tagName.toLowerCase() === "p" && fontSize < 12) {
              typographyIssues.push({
                type: "TINY_BODY_TEXT",
                text: el.textContent.slice(0, 40),
                fontSize,
              });
            }
            if (lineHeight && fontSize && lineHeight < fontSize * 1.15) {
              typographyIssues.push({
                type: "CRAMPED_LINE_HEIGHT",
                tag: el.tagName.toLowerCase(),
                text: el.textContent.slice(0, 40),
                lineHeight,
                fontSize,
              });
            }
          }

          return {
            docWidth,
            winWidth,
            bodyWidth,
            isOverflowing,
            overflowingElements,
            smallTouchTargets,
            typographyIssues: typographyIssues.slice(0, 4),
          };
        });

        if (overflowData.isOverflowing) {
          findings.push({
            viewport: vp.name,
            page: pg.path,
            issueType: "HORIZONTAL_OVERFLOW",
            details: `docWidth: ${overflowData.docWidth}px vs winWidth: ${overflowData.winWidth}px`,
            elements: overflowData.overflowingElements,
          });
          console.warn(`[OVERFLOW] ${pg.name} @ ${vp.name}: ${overflowData.docWidth}px > ${overflowData.winWidth}px`);
        }

        if (overflowData.smallTouchTargets && overflowData.smallTouchTargets.length > 0) {
          findings.push({
            viewport: vp.name,
            page: pg.path,
            issueType: "SMALL_TOUCH_TARGETS",
            details: overflowData.smallTouchTargets,
          });
        }

        if (overflowData.typographyIssues && overflowData.typographyIssues.length > 0) {
          findings.push({
            viewport: vp.name,
            page: pg.path,
            issueType: "TYPOGRAPHY",
            details: overflowData.typographyIssues,
          });
        }

        // Capture screenshot for key viewports
        if (["small-mobile-320", "mobile-390", "tablet-768", "desktop-1440"].includes(vp.name)) {
          const filename = `${pg.name}-${vp.name}.png`;
          const filepath = path.join(AUDIT_DIR, filename);
          await page.screenshot({ path: filepath, fullPage: true });
          if (fs.existsSync(ARTIFACT_DIR)) {
            await page.screenshot({ path: path.join(ARTIFACT_DIR, filename), fullPage: true });
          }
        }
      } catch (err) {
        console.error(`Error auditing ${pg.name} @ ${vp.name}:`, err.message);
      }
    }
    await context.close();
  }

  // Mobile menu interaction test
  console.log("\n=== Testing Mobile Menu Navigation & Focus Trapping ===");
  const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mPage = await mobileCtx.newPage();
  await mPage.goto(`${BASE_URL}/india`, { waitUntil: "domcontentloaded" });
  await mPage.waitForTimeout(1000);

  const menuButton = mPage.locator('button[aria-label*="navigation menu"]');
  const isMenuVis = await menuButton.isVisible();
  console.log(`Mobile menu button visible: ${isMenuVis}`);
  if (isMenuVis) {
    await menuButton.click();
    await mPage.waitForTimeout(400);
    const drawer = mPage.locator("#mobile-navigation-drawer");
    const isDrawerVis = await drawer.isVisible();
    console.log(`Mobile drawer opened: ${isDrawerVis}`);

    await mPage.screenshot({ path: path.join(AUDIT_DIR, "mobile-drawer-open-390.png") });
    if (fs.existsSync(ARTIFACT_DIR)) {
      await mPage.screenshot({ path: path.join(ARTIFACT_DIR, "mobile-drawer-open-390.png") });
    }
  }
  await mobileCtx.close();

  await browser.close();

  // Save findings JSON
  fs.writeFileSync(
    path.join(AUDIT_DIR, "audit-findings.json"),
    JSON.stringify(findings, null, 2)
  );
  console.log(`\nAudit completed! Total findings logged: ${findings.length}`);
}

runAudit().catch(console.error);
