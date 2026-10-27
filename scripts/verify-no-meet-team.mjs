import { chromium } from "playwright";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

async function run() {
  console.log("Starting verification: Remove 'Meet the team' text from Core Key Contacts card on /india and /uae...");

  const port = 3009;
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

    // 1. Verify /india
    console.log("\n--- Checking /india Homepage ---");
    await page.goto(`http://localhost:${port}/india`, { waitUntil: "networkidle" });

    const indiaCard = page.locator('#about [aria-roledescription="carousel"]');
    await indiaCard.scrollIntoViewIfNeeded();

    const indiaCardText = await indiaCard.innerText();

    if (/meet the team/i.test(indiaCardText)) {
      throw new Error("FAIL: 'Meet the team' text found in Core Key Contacts card on /india!");
    }
    console.log("✓ 'Meet the team' text is completely removed from /india Core Key Contacts card!");

    if (!/core key contacts/i.test(indiaCardText)) {
      throw new Error("FAIL: 'Core Key Contacts' badge missing from /india card!");
    }
    console.log("✓ 'Core Key Contacts' header badge is cleanly present!");

    // Take screenshot of the People Section
    const indiaPeopleSection = page.locator("#about");
    await indiaPeopleSection.screenshot({ path: path.join(screenshotDir, "core-contacts-india-desktop.png") });
    console.log("✓ Saved desktop screenshot: docs/screenshots/core-contacts-india-desktop.png");

    // 2. Verify /uae
    console.log("\n--- Checking /uae Homepage ---");
    await page.goto(`http://localhost:${port}/uae`, { waitUntil: "networkidle" });

    const uaeCard = page.locator('#about [aria-roledescription="carousel"]');
    await uaeCard.scrollIntoViewIfNeeded();

    const uaeCardText = await uaeCard.innerText();

    if (/meet the team/i.test(uaeCardText)) {
      throw new Error("FAIL: 'Meet the team' text found in Core Key Contacts card on /uae!");
    }
    console.log("✓ 'Meet the team' text is completely removed from /uae Core Key Contacts card!");

    const uaePeopleSection = page.locator("#about");
    await uaePeopleSection.screenshot({ path: path.join(screenshotDir, "core-contacts-uae-desktop.png") });
    console.log("✓ Saved desktop screenshot: docs/screenshots/core-contacts-uae-desktop.png");

    // 3. Mobile Viewport (390px)
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

    const mobilePeople = mobilePage.locator("#about");
    await mobilePeople.scrollIntoViewIfNeeded();
    await mobilePeople.screenshot({ path: path.join(screenshotDir, "core-contacts-india-mobile.png") });
    console.log("✓ Saved mobile screenshot: docs/screenshots/core-contacts-india-mobile.png");

    console.log("\n========================================================");
    console.log("ALL 'MEET THE TEAM' REMOVAL CHECKS PASSED SUCCESSFULLY! ✓");
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
