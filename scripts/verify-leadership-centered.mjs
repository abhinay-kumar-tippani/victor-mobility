import { chromium } from "playwright";

async function run() {
  console.log("Launching Edge for leadership centered verification...");
  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  const routes = ["/india", "/uae"];

  for (const route of routes) {
    console.log(`\n========================================`);
    console.log(`Verifying route: ${route}`);
    console.log(`========================================`);

    // Desktop 1440px
    const pageDesk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pageDesk.goto(`http://localhost:3000${route}`, { waitUntil: "domcontentloaded", timeout: 15000 });
    await pageDesk.waitForTimeout(1000);

    const aboutSection = await pageDesk.$("#about");
    if (!aboutSection) {
      throw new Error(`FAIL: Could not find #about section on ${route}`);
    }

    // 1. Verify Jahangir details are NOT in #about
    const aboutText = await aboutSection.innerText();
    if (aboutText.includes("Founder & Visionary") || aboutText.includes("Jahangir") || aboutText.includes("I am committed to providing unwavering service")) {
      throw new Error(`FAIL: Jahangir details still found in #about on ${route}`);
    } else {
      console.log(`PASS: Jahangir details completely removed from #about on ${route}`);
    }

    // 2. Verify Core Team Members card is present and centered
    const carousel = await aboutSection.$('div[aria-roledescription="carousel"]');
    if (!carousel) {
      throw new Error(`FAIL: Core Team Members carousel not found in #about on ${route}`);
    }

    const box = await carousel.boundingBox();
    console.log(`Core team card bounding box on desktop:`, box);
    const cardCenter = box.x + box.width / 2;
    const viewportCenter = 1440 / 2;
    const diff = Math.abs(cardCenter - viewportCenter);
    console.log(`Center difference: ${diff}px (cardCenter: ${cardCenter}, viewportCenter: ${viewportCenter})`);

    if (diff > 10) {
      throw new Error(`FAIL: Core team card is not centered on desktop: diff is ${diff}px`);
    } else {
      console.log(`PASS: Core team card is perfectly centered (within ${diff.toFixed(1)}px of viewport center)`);
    }

    // 3. Verify zero horizontal overflow on desktop
    const deskOverflow = await pageDesk.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    if (deskOverflow) {
      throw new Error(`FAIL: Desktop horizontal scroll overflow on ${route}`);
    }
    console.log(`PASS: Zero desktop horizontal scroll overflow on ${route}`);

    // Screenshot desktop
    const cleanRoute = route.replace(/\//g, "-").replace(/^-/, "");
    await aboutSection.screenshot({ path: `docs/screenshots/leadership-centered-${cleanRoute}-desktop.png` });
    console.log(`Saved screenshot: docs/screenshots/leadership-centered-${cleanRoute}-desktop.png`);
    await pageDesk.close();

    // Mobile 390px
    const pageMob = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await pageMob.goto(`http://localhost:3000${route}`, { waitUntil: "domcontentloaded", timeout: 15000 });
    await pageMob.waitForTimeout(1000);

    const aboutSectionMob = await pageMob.$("#about");
    const mobOverflow = await pageMob.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    if (mobOverflow) {
      throw new Error(`FAIL: Mobile horizontal scroll overflow on ${route}`);
    }
    console.log(`PASS: Zero mobile horizontal scroll overflow on ${route}`);

    await aboutSectionMob.screenshot({ path: `docs/screenshots/leadership-centered-${cleanRoute}-mobile.png` });
    console.log(`Saved screenshot: docs/screenshots/leadership-centered-${cleanRoute}-mobile.png`);
    await pageMob.close();
  }

  await browser.close();
  console.log("\nALL LEADERSHIP VERIFICATIONS PASSED SUCCESSFULLY!");
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
