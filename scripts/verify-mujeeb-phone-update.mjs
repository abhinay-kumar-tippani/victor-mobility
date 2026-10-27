import { chromium } from "playwright";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

async function run() {
  console.log("Starting verification: Mujeeb Ur Rahman Mohammed phone and WhatsApp updated to +91 95158 50808...");

  const port = 3010;
  const server = spawn("npx", ["next", "start", "-p", String(port)], {
    stdio: "inherit",
    shell: true,
  });

  let connected = false;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://localhost:${port}/india`);
      if (res.ok) {
        connected = true;
        break;
      }
    } catch (e) {
      // wait
    }
    await new Promise((r) => setTimeout(r, 1000));
  }

  if (!connected) {
    console.error(`Failed to connect to http://localhost:${port}`);
    server.kill();
    process.exit(1);
  }

  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext();

  const screenshotDir = path.resolve("docs/screenshots");
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  try {
    const page = await context.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. Verify /india Homepage
    console.log("\n--- Checking /india Homepage ---");
    await page.goto(`http://localhost:${port}/india`, { waitUntil: "networkidle" });

    // Check Footer Contact Desk
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();

    const footerPhone = footer.locator('a[href="tel:+919515850808"]');
    if ((await footerPhone.count()) === 0) {
      throw new Error("FAIL: Footer phone link tel:+919515850808 missing on /india!");
    }
    console.log("✓ Footer phone link tel:+919515850808 verified on /india");

    const footerWa = footer.locator('a[href*="wa.me/919515850808"]');
    if ((await footerWa.count()) === 0) {
      throw new Error("FAIL: Footer WhatsApp link wa.me/919515850808 missing on /india!");
    }
    console.log("✓ Footer WhatsApp link wa.me/919515850808 verified on /india");

    // Check Core Key Contacts Card on Homepage (Slide 1: Mujeeb)
    const card = page.locator('#about [aria-roledescription="carousel"]');
    await card.scrollIntoViewIfNeeded();

    const cardPhone = card.locator('a[href="tel:+919515850808"]');
    if ((await cardPhone.count()) === 0) {
      throw new Error("FAIL: Core Key Contacts phone link tel:+919515850808 missing on /india!");
    }
    console.log("✓ Core Key Contacts phone link tel:+919515850808 verified on /india");

    const cardWa = card.locator('a[href^="https://wa.me/919515850808"]');
    if ((await cardWa.count()) === 0) {
      throw new Error("FAIL: Core Key Contacts WhatsApp link wa.me/919515850808 missing on /india!");
    }
    console.log("✓ Core Key Contacts WhatsApp link wa.me/919515850808 verified on /india");

    await card.screenshot({ path: path.join(screenshotDir, "mujeeb-card-india-desktop.png") });
    console.log("✓ Saved desktop card screenshot: docs/screenshots/mujeeb-card-india-desktop.png");

    // 2. Verify /india/about Page
    console.log("\n--- Checking /india/about Page ---");
    await page.goto(`http://localhost:${port}/india/about`, { waitUntil: "networkidle" });
    const aboutCarousel = page.locator("#commercial-leadership");
    await aboutCarousel.scrollIntoViewIfNeeded();

    const aboutPhone = aboutCarousel.locator('a[href="tel:+919515850808"]');
    if ((await aboutPhone.count()) === 0) {
      throw new Error("FAIL: About page carousel phone link tel:+919515850808 missing on /india/about!");
    }
    console.log("✓ About page carousel phone link tel:+919515850808 verified on /india/about");

    const aboutWa = aboutCarousel.locator('a[href^="https://wa.me/919515850808"]');
    if ((await aboutWa.count()) === 0) {
      throw new Error("FAIL: About page carousel WhatsApp link wa.me/919515850808 missing on /india/about!");
    }
    console.log("✓ About page carousel WhatsApp link wa.me/919515850808 verified on /india/about");

    await aboutCarousel.screenshot({ path: path.join(screenshotDir, "mujeeb-carousel-about-desktop.png") });
    console.log("✓ Saved about carousel screenshot: docs/screenshots/mujeeb-carousel-about-desktop.png");

    // 3. Verify /uae Homepage
    console.log("\n--- Checking /uae Homepage ---");
    await page.goto(`http://localhost:${port}/uae`, { waitUntil: "networkidle" });
    const uaeCard = page.locator('#about [aria-roledescription="carousel"]');
    await uaeCard.scrollIntoViewIfNeeded();

    const uaeCardPhone = uaeCard.locator('a[href="tel:+919515850808"]');
    if ((await uaeCardPhone.count()) === 0) {
      throw new Error("FAIL: Core Key Contacts phone link missing on /uae!");
    }
    console.log("✓ Core Key Contacts phone link tel:+919515850808 verified on /uae");

    const uaeCardWa = uaeCard.locator('a[href^="https://wa.me/919515850808"]');
    if ((await uaeCardWa.count()) === 0) {
      throw new Error("FAIL: Core Key Contacts WhatsApp link missing on /uae!");
    }
    console.log("✓ Core Key Contacts WhatsApp link wa.me/919515850808 verified on /uae");

    // 4. Mobile Viewport (390px)
    console.log("\n--- Checking Mobile Viewport (390px) ---");
    const mobilePage = await context.newPage();
    await mobilePage.setViewportSize({ width: 390, height: 844 });
    await mobilePage.goto(`http://localhost:${port}/india`, { waitUntil: "networkidle" });

    const scrollWidth = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await mobilePage.evaluate(() => document.documentElement.clientWidth);
    console.log(`Mobile scrollWidth: ${scrollWidth}, clientWidth: ${clientWidth}`);
    if (scrollWidth > clientWidth) {
      throw new Error(`Horizontal overflow on mobile: ${scrollWidth} > ${clientWidth}`);
    }
    console.log("✓ Zero horizontal overflow on 390px mobile viewport!");

    const mobileCard = mobilePage.locator('#about [aria-roledescription="carousel"]');
    await mobileCard.scrollIntoViewIfNeeded();
    await mobileCard.screenshot({ path: path.join(screenshotDir, "mujeeb-card-india-mobile.png") });
    console.log("✓ Saved mobile card screenshot: docs/screenshots/mujeeb-card-india-mobile.png");

    console.log("\n========================================================");
    console.log("ALL MUJEEB PHONE & WHATSAPP NUMBER CHECKS PASSED! ✓");
    console.log("========================================================");
  } finally {
    await browser.close();
    server.kill();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
