import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const baseUrl = "http://localhost:3000";
  const routes = ["/india/about", "/uae/about"];

  for (const route of routes) {
    console.log(`\n=== Testing ${route} ===`);

    // 1. Desktop Test (1440x900)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });

    const heading = page.locator("h2", { hasText: "Leading with Vision" });
    await heading.waitFor({ state: "visible", timeout: 10000 });

    const text = (await heading.innerText()).trim();
    console.log(`Headline text: "${text}"`);
    if (!text.includes("Leading with Vision. Moving Forward with Trust.")) {
      throw new Error(`Expected text 'Leading with Vision. Moving Forward with Trust.' but got: ${text}`);
    }

    const box = await heading.boundingBox();
    console.log(`Desktop Box dimensions: width=${box?.width}px, height=${box?.height}px`);

    // Height of a single line at 36px font with line-height ~1.1-1.25 is approx 36-48px.
    // If it wrapped to 2 lines, height would be >= 70px.
    if (box && box.height > 60) {
      throw new Error(`Expected headline to be a single line (height <= 60px), but got ${box.height}px (indicates wrapped text)!`);
    } else {
      console.log(`✓ Headline is confirmed ON A SINGLE LINE on Desktop (height: ${box?.height}px)`);
    }

    // Capture desktop screenshot of the section
    const prefix = route.replace(/\//g, "-").replace(/^-/, "");
    await page.screenshot({
      path: `docs/screenshots/${prefix}-single-line-desktop.png`,
      fullPage: false,
      clip: {
        x: Math.max(0, (box?.x || 0) - 40),
        y: Math.max(0, (box?.y || 0) - 60),
        width: Math.min(1440, (box?.width || 1000) + 80),
        height: 250,
      },
    });
    console.log(`Saved desktop screenshot: docs/screenshots/${prefix}-single-line-desktop.png`);

    // 2. Mobile Test (390x844) - Ensure no horizontal overflow
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });

    const mobileHeading = page.locator("h2", { hasText: "Leading with Vision" });
    const mobileBox = await mobileHeading.boundingBox();
    console.log(`Mobile Box dimensions: width=${mobileBox?.width}px, height=${mobileBox?.height}px`);

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    console.log(`Mobile scrollWidth vs clientWidth overflow: ${hasHorizontalOverflow}`);
    if (hasHorizontalOverflow) {
      throw new Error(`Horizontal overflow detected on mobile for ${route}!`);
    } else {
      console.log(`✓ No horizontal overflow on Mobile (390px)`);
    }

    await page.screenshot({
      path: `docs/screenshots/${prefix}-single-line-mobile.png`,
      fullPage: false,
      clip: {
        x: 0,
        y: Math.max(0, (mobileBox?.y || 0) - 40),
        width: 390,
        height: 250,
      },
    });
    console.log(`Saved mobile screenshot: docs/screenshots/${prefix}-single-line-mobile.png`);
  }

  await browser.close();
  console.log("\nAll tests passed successfully!");
}

main().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
