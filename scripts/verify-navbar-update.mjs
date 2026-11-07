import { chromium } from "playwright";
import http from "http";
import next from "next";

async function runNavbarVerification() {
  console.log("=== Starting Navbar Update Verification ===");

  const app = next({ dev: false, dir: process.cwd() });
  const handle = app.getRequestHandler();
  await app.prepare();

  const server = http.createServer((req, res) => handle(req, res));
  await new Promise((resolve) => server.listen(3003, resolve));
  console.log("Next.js production server listening on http://localhost:3003");

  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  let failed = false;
  function assert(condition, message) {
    if (!condition) {
      console.error(`❌ FAIL: ${message}`);
      failed = true;
    } else {
      console.log(`✅ PASS: ${message}`);
    }
  }

  try {
    // 1. Desktop Nav Order & Visibility at 1440px, 1280px, and 1024px
    for (const width of [1440, 1280, 1024]) {
      console.log(`\n--- Testing Desktop Navbar at ${width}px ---`);
      await page.setViewportSize({ width, height: 800 });
      await page.goto("http://localhost:3003/india", { waitUntil: "networkidle" });

      const hasHOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      assert(!hasHOverflow, `No horizontal page overflow at ${width}px`);

      // Verify desktop nav items text & order
      const navLinks = page.locator("header nav[aria-label='Main Navigation'] a");
      const count = await navLinks.count();
      assert(count === 7, `Expected 7 desktop nav items, found ${count}`);

      const texts = [];
      for (let i = 0; i < count; i++) {
        texts.push((await navLinks.nth(i).textContent()).trim());
      }
      console.log(`Nav items at ${width}px:`, texts);

      assert(texts[0] === "Home", "Item 1 is Home");
      assert(texts[1] === "Services", "Item 2 is Services");
      assert(texts[2] === "Fleet", "Item 3 is Fleet");
      assert(texts[3] === "About", "Item 4 is About");
      assert(texts[4] === "Achievements", "Item 5 is Achievements (directly after About)");
      assert(texts[5] === "Driver Training", "Item 6 is Driver Training (directly after Achievements)");
      assert(texts[6] === "Contact", "Item 7 is Contact");
    }

    // 2. Active States & Direct Navigation on Desktop
    console.log("\n--- Testing Navigation and Active States ---");
    await page.setViewportSize({ width: 1440, height: 800 });
    await page.goto("http://localhost:3003/india", { waitUntil: "networkidle" });

    // Click Achievements
    await page.locator("header nav[aria-label='Main Navigation'] a:has-text('Achievements')").click();
    await page.waitForURL("**/india/achievements");
    assert(page.url().includes("/india/achievements"), "Navigating to Achievements from navbar succeeds");

    const achActive = await page.locator("header nav[aria-label='Main Navigation'] a:has-text('Achievements')").getAttribute("aria-current");
    assert(achActive === "page", "Achievements link has aria-current='page' when active");

    // Click Driver Training
    await page.locator("header nav[aria-label='Main Navigation'] a:has-text('Driver Training')").click();
    await page.waitForURL("**/india/driver-training");
    assert(page.url().includes("/india/driver-training"), "Navigating to Driver Training from navbar succeeds");

    const dtActive = await page.locator("header nav[aria-label='Main Navigation'] a:has-text('Driver Training')").getAttribute("aria-current");
    assert(dtActive === "page", "Driver Training link has aria-current='page' when active");

    // 3. Mobile Navigation Drawer (390px and 320px)
    for (const width of [390, 320]) {
      console.log(`\n--- Testing Mobile Drawer at ${width}px ---`);
      await page.setViewportSize({ width, height: 800 });
      await page.goto("http://localhost:3003/india", { waitUntil: "networkidle" });

      // Open drawer
      const menuBtn = page.locator("button[aria-controls='mobile-navigation-drawer']");
      await menuBtn.click();
      await page.waitForTimeout(300);

      const drawer = page.locator("#mobile-navigation-drawer");
      assert(await drawer.isVisible(), `Mobile drawer opens at ${width}px`);

      // Verify mobile nav items
      const mobileAch = drawer.locator("a:has-text('Achievements')");
      const mobileDt = drawer.locator("a:has-text('Driver Training')");
      assert(await mobileAch.isVisible(), `Mobile drawer contains 'Achievements' at ${width}px`);
      assert(await mobileDt.isVisible(), `Mobile drawer contains 'Driver Training' at ${width}px`);

      // Test mobile navigation
      await mobileAch.click();
      await page.waitForURL("**/india/achievements");
      assert(page.url().includes("/india/achievements"), `Mobile click on Achievements navigates properly at ${width}px`);
    }

    // 4. UAE Navbar Isolation
    console.log("\n--- Testing UAE Navbar Isolation ---");
    await page.setViewportSize({ width: 1440, height: 800 });
    await page.goto("http://localhost:3003/uae", { waitUntil: "networkidle" });

    const uaeNavLinks = page.locator("header nav[aria-label='Main Navigation'] a");
    const uaeCount = await uaeNavLinks.count();
    assert(uaeCount === 5, `UAE navbar has 5 items (Home, Services, Fleet, About, Contact), found ${uaeCount}`);

    const uaeTexts = [];
    for (let i = 0; i < uaeCount; i++) {
      uaeTexts.push((await uaeNavLinks.nth(i).textContent()).trim());
    }
    assert(!uaeTexts.includes("Achievements"), "UAE desktop nav does NOT include Achievements");
    assert(!uaeTexts.includes("Driver Training"), "UAE desktop nav does NOT include Driver Training");

  } finally {
    await browser.close();
    server.close();
  }

  if (failed) {
    console.error("\n❌ Navbar verification finished with ERRORS.");
    process.exit(1);
  } else {
    console.log("\n🎉 ALL NAVBAR VERIFICATION CHECKS PASSED PERFECTLY!");
  }
}

runNavbarVerification().catch((err) => {
  console.error("Verification crashed:", err);
  process.exit(1);
});
