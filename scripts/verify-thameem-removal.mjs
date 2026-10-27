import { chromium } from "playwright";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

async function run() {
  console.log("Starting verification of Mohammed Thameem Ahmed removal from Meet the Team & About, and preservation in 24/7 Live Operations Desk...");

  const port = 3008;
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

    // Meet the team section
    const carouselContainer = page.locator('#about [aria-roledescription="carousel"]');
    await carouselContainer.scrollIntoViewIfNeeded();

    const slideButtons = carouselContainer.locator('button[aria-label^="Show profile"]');
    const slideCount = await slideButtons.count();
    console.log(`/india Meet the Team slides count: ${slideCount}`);
    if (slideCount !== 4) {
      throw new Error(`FAIL: Expected 4 slides in /india Meet the Team, found ${slideCount}`);
    }

    const seenNames = [];
    for (let i = 0; i < slideCount; i++) {
      await slideButtons.nth(i).click();
      const currentName = await carouselContainer.locator("h4").innerText();
      seenNames.push(currentName.trim());
    }

    console.log("Team members in /india Meet the Team:", seenNames);
    if (seenNames.some((n) => n.includes("Thameem"))) {
      throw new Error("FAIL: Mohammed Thameem Ahmed found in /india Meet the Team carousel!");
    }
    console.log("✓ Mohammed Thameem Ahmed is NOT in /india Meet the Team carousel");

    // 24/7 Live Operations Desk
    console.log("\n--- Checking /india 24/7 Live Operations Desk ---");
    const deskSection = page.locator("#contact");
    await deskSection.scrollIntoViewIfNeeded();
    const deskText = await deskSection.innerText();

    if (!deskText.includes("Mohammed Thameem Ahmed")) {
      throw new Error("FAIL: Mohammed Thameem Ahmed missing from 24/7 Live Operations Desk!");
    }
    console.log("✓ Mohammed Thameem Ahmed is present in 24/7 Live Operations Desk!");

    if (!deskText.includes("Head of Operations")) {
      throw new Error("FAIL: Head of Operations designation missing!");
    }
    console.log("✓ Head of Operations designation present!");

    const thameemEmailLink = deskSection.locator('a[href="mailto:thameem@victorluxurylimousine.com"]');
    if ((await thameemEmailLink.count()) === 0) {
      throw new Error("FAIL: Thameem mailto link missing in 24/7 Live Operations Desk!");
    }
    console.log("✓ Thameem mailto link present: thameem@victorluxurylimousine.com");

    const thameemPhoneLink = deskSection.locator('a[href="tel:+919515950808"]');
    if ((await thameemPhoneLink.count()) === 0) {
      throw new Error("FAIL: Thameem tel link missing in 24/7 Live Operations Desk!");
    }
    console.log("✓ Thameem phone link present: +91 95159 50808");

    await deskSection.screenshot({ path: path.join(screenshotDir, "desk-thameem-desktop.png") });
    console.log("✓ Saved 24/7 Live Operations Desk screenshot to docs/screenshots/desk-thameem-desktop.png");

    // 2. Verify /uae Homepage
    console.log("\n--- Checking /uae Homepage ---");
    await page.goto(`http://localhost:${port}/uae`, { waitUntil: "networkidle" });
    const uaeCarousel = page.locator('#about [aria-roledescription="carousel"]');
    await uaeCarousel.scrollIntoViewIfNeeded();
    const uaeSlideButtons = uaeCarousel.locator('button[aria-label^="Show profile"]');
    const uaeSlideCount = await uaeSlideButtons.count();
    console.log(`/uae Meet the Team slides count: ${uaeSlideCount}`);
    if (uaeSlideCount !== 4) {
      throw new Error(`FAIL: Expected 4 slides in /uae Meet the Team, found ${uaeSlideCount}`);
    }

    const uaeSeenNames = [];
    for (let i = 0; i < uaeSlideCount; i++) {
      await uaeSlideButtons.nth(i).click();
      const currentName = await uaeCarousel.locator("h4").innerText();
      uaeSeenNames.push(currentName.trim());
    }
    console.log("Team members in /uae Meet the Team:", uaeSeenNames);
    if (uaeSeenNames.some((n) => n.includes("Thameem"))) {
      throw new Error("FAIL: Mohammed Thameem Ahmed found in /uae Meet the Team carousel!");
    }
    console.log("✓ Mohammed Thameem Ahmed is NOT in /uae Meet the Team carousel");

    // 3. Verify /india/about Page
    console.log("\n--- Checking /india/about Page ---");
    await page.goto(`http://localhost:${port}/india/about`, { waitUntil: "networkidle" });
    const indiaAboutCarousel = page.locator("#commercial-leadership");
    await indiaAboutCarousel.scrollIntoViewIfNeeded();

    const indiaAboutButtons = indiaAboutCarousel.getByRole("button", { name: /^Show / });
    const indiaAboutCount = await indiaAboutButtons.count();
    console.log(`/india/about team profiles count: ${indiaAboutCount}`);
    if (indiaAboutCount !== 4) {
      throw new Error(`FAIL: Expected 4 team profiles in /india/about carousel, found ${indiaAboutCount}`);
    }

    const aboutSeenNames = [];
    for (let i = 0; i < indiaAboutCount; i++) {
      await indiaAboutButtons.nth(i).click();
      const currentName = await indiaAboutCarousel.locator("h3").innerText();
      aboutSeenNames.push(currentName.trim());
    }
    console.log("Team members in /india/about:", aboutSeenNames);
    if (aboutSeenNames.some((n) => n.includes("Thameem"))) {
      throw new Error("FAIL: Mohammed Thameem Ahmed found in /india/about team carousel!");
    }
    console.log("✓ Mohammed Thameem Ahmed is NOT in /india/about team carousel");

    await indiaAboutCarousel.screenshot({ path: path.join(screenshotDir, "about-team-india-4profiles.png") });
    console.log("✓ Saved /india/about screenshot to docs/screenshots/about-team-india-4profiles.png");

    // 4. Verify /uae/about Page
    console.log("\n--- Checking /uae/about Page ---");
    await page.goto(`http://localhost:${port}/uae/about`, { waitUntil: "networkidle" });
    const uaeAboutCarousel = page.locator("#commercial-leadership");
    await uaeAboutCarousel.scrollIntoViewIfNeeded();

    const uaeAboutButtons = uaeAboutCarousel.getByRole("button", { name: /^Show / });
    const uaeAboutCount = await uaeAboutButtons.count();
    console.log(`/uae/about team profiles count: ${uaeAboutCount}`);
    if (uaeAboutCount !== 4) {
      throw new Error(`FAIL: Expected 4 team profiles in /uae/about carousel, found ${uaeAboutCount}`);
    }

    const uaeAboutSeenNames = [];
    for (let i = 0; i < uaeAboutCount; i++) {
      await uaeAboutButtons.nth(i).click();
      const currentName = await uaeAboutCarousel.locator("h3").innerText();
      uaeAboutSeenNames.push(currentName.trim());
    }
    console.log("Team members in /uae/about:", uaeAboutSeenNames);
    if (uaeAboutSeenNames.some((n) => n.includes("Thameem"))) {
      throw new Error("FAIL: Mohammed Thameem Ahmed found in /uae/about team carousel!");
    }
    console.log("✓ Mohammed Thameem Ahmed is NOT in /uae/about team carousel");

    // 5. Mobile Viewport (390px)
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

    const mobileDesk = mobilePage.locator("#contact");
    await mobileDesk.scrollIntoViewIfNeeded();
    await mobileDesk.screenshot({ path: path.join(screenshotDir, "desk-thameem-mobile.png") });
    console.log("✓ Saved mobile 24/7 desk screenshot to docs/screenshots/desk-thameem-mobile.png");

    console.log("\n========================================================");
    console.log("ALL VERIFICATION CHECKS PASSED SUCCESSFULLY! ✓");
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
