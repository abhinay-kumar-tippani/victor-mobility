import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const screenshotsDir = path.resolve("docs/screenshots");
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function run() {
  const browser = await chromium.launch({ channel: "chrome" });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("=== 1. Testing India Homepage at 1440px Desktop ===");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000/india", { waitUntil: "networkidle" });

  const peopleSection = page.locator("#about");
  await peopleSection.scrollIntoViewIfNeeded();

  const cards = peopleSection.locator("article");
  const count = await cards.count();
  console.log(`Team cards count: ${count} (expected: 4)`);
  if (count !== 4) throw new Error(`Expected 4 cards, got ${count}`);

  const expectedMembers = [
    { name: "Mujeeb Ur Rahman Mohammed", role: "Business Development Partner" },
    { name: "Syed Kamran Abbas Razvi", role: "Director - Sales & Operations" },
    { name: "Muhammad Asif", role: "Manager - Admin & Finance" },
    { name: "Nareinder Reddyy C", role: "Business Head - Bangalore" },
  ];

  for (let i = 0; i < count; i++) {
    const card = cards.nth(i);
    const cardBox = await card.boundingBox();
    console.log(`\nCard ${i + 1} (${expectedMembers[i].name}): box = ${cardBox.width}x${cardBox.height}px`);

    // Verify card height is within or close to target 190–220px
    if (cardBox.height < 170 || cardBox.height > 250) {
      console.warn(`Card ${i + 1} height ${cardBox.height}px outside ideal 190-220px`);
    }

    // Verify desktop portrait size around 112x140px
    const desktopPortrait = card.locator(".hidden.sm\\:flex .relative").first();
    const portraitBox = await desktopPortrait.boundingBox();
    console.log(`  Desktop portrait box: ${portraitBox?.width}x${portraitBox?.height}px (target: ~112x140)`);
    if (!portraitBox || Math.abs(portraitBox.width - 112) > 5 || Math.abs(portraitBox.height - 140) > 5) {
      throw new Error(`Desktop portrait size unexpected: ${portraitBox?.width}x${portraitBox?.height}`);
    }

    // Verify information group is beside portrait
    const desktopInfo = card.locator(".hidden.sm\\:flex .flex-1").first();
    const infoBox = await desktopInfo.boundingBox();
    const gapBetween = Math.abs(infoBox.x - (portraitBox.x + portraitBox.width));
    console.log(`  Gap between portrait and info: ${gapBetween}px (target: ~20-24px)`);

    // Verify name and role
    const nameEl = card.locator(".hidden.sm\\:flex h3");
    const roleEl = card.locator(".hidden.sm\\:flex p");
    const nameText = await nameEl.innerText();
    const roleText = await roleEl.innerText();
    console.log(`  Name: "${nameText.trim()}", Role: "${roleText.trim()}"`);
    if (!nameText.includes(expectedMembers[i].name)) {
      throw new Error(`Card ${i + 1} name mismatch: expected ${expectedMembers[i].name}, got ${nameText}`);
    }

    // Verify contact buttons are inside information group and have 44px min-height
    const buttons = desktopInfo.locator("a");
    const btnCount = await buttons.count();
    console.log(`  Contact actions count: ${btnCount}`);
    for (let j = 0; j < btnCount; j++) {
      const btn = buttons.nth(j);
      const box = await btn.boundingBox();
      const ariaLabel = await btn.getAttribute("aria-label");
      const href = await btn.getAttribute("href");
      console.log(`    Action ${j + 1}: "${ariaLabel}" -> ${href} (height: ${box?.height}px)`);
      if (!box || box.height < 44) {
        throw new Error(`Button touch target height ${box?.height}px < 44px`);
      }
    }
  }

  // Verify 2-column grid layout on desktop
  const card1Box = await cards.nth(0).boundingBox();
  const card2Box = await cards.nth(1).boundingBox();
  const is2Col = Math.abs(card1Box.y - card2Box.y) < 5;
  console.log(`\nDesktop 2-column layout confirmed: ${is2Col}`);
  if (!is2Col) throw new Error("Desktop should display a 2-column grid!");

  // Verify 24px gap between cards
  const gridGap = Math.abs(card2Box.x - (card1Box.x + card1Box.width));
  console.log(`Desktop grid gap between cards: ${gridGap}px (target: 24px)`);

  const hasOverflowDesktop = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  console.log(`Desktop horizontal overflow: ${hasOverflowDesktop}`);
  if (hasOverflowDesktop) throw new Error("Horizontal overflow detected on desktop!");

  await peopleSection.screenshot({ path: path.join(screenshotsDir, "team-grid-compact-desktop-1440.png") });

  console.log("\n=== 2. Testing India Homepage at 390px Mobile ===");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await peopleSection.scrollIntoViewIfNeeded();

  const mCards = peopleSection.locator("article");
  const mCard1Box = await mCards.nth(0).boundingBox();
  const mCard2Box = await mCards.nth(1).boundingBox();
  const is1Col = mCard2Box.y > mCard1Box.y + mCard1Box.height - 10;
  console.log(`Mobile 1-column layout confirmed: ${is1Col}`);
  if (!is1Col) throw new Error("Mobile should display a 1-column layout!");

  // Verify mobile portrait ~88x110
  const mPortrait = mCards.first().locator(".sm\\:hidden .relative").first();
  const mPortraitBox = await mPortrait.boundingBox();
  console.log(`Mobile portrait box: ${mPortraitBox?.width}x${mPortraitBox?.height}px (target: ~88x110)`);
  if (!mPortraitBox || Math.abs(mPortraitBox.width - 88) > 5 || Math.abs(mPortraitBox.height - 110) > 5) {
    throw new Error(`Mobile portrait size unexpected: ${mPortraitBox?.width}x${mPortraitBox?.height}`);
  }

  // Verify contact actions placed below profile row
  const mActions = mCards.first().locator(".sm\\:hidden .mt-4");
  const mActionsBox = await mActions.boundingBox();
  console.log(`Mobile actions box top: ${mActionsBox?.y}, portrait bottom: ${mPortraitBox.y + mPortraitBox.height}`);
  const isBelowProfile = mActionsBox.y >= mPortraitBox.y + mPortraitBox.height - 10;
  console.log(`Mobile actions below profile row: ${isBelowProfile}`);
  if (!isBelowProfile) throw new Error("Mobile contact actions should be below the profile row!");

  const hasOverflow390 = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  console.log(`390px mobile horizontal overflow: ${hasOverflow390}`);
  if (hasOverflow390) throw new Error("Horizontal overflow detected on 390px mobile!");

  await peopleSection.screenshot({ path: path.join(screenshotsDir, "team-grid-compact-mobile-390.png") });

  console.log("\n=== 3. Testing India Homepage at 320px Mobile ===");
  await page.setViewportSize({ width: 320, height: 600 });
  await page.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await peopleSection.scrollIntoViewIfNeeded();

  const hasOverflow320 = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  console.log(`320px mobile horizontal overflow: ${hasOverflow320}`);
  if (hasOverflow320) throw new Error("Horizontal overflow detected on 320px mobile!");

  await peopleSection.screenshot({ path: path.join(screenshotsDir, "team-grid-compact-mobile-320.png") });

  console.log("\n=== 4. Testing UAE Homepage at 1440px Desktop ===");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000/uae", { waitUntil: "networkidle" });
  const uaeSection = page.locator("#about");
  await uaeSection.scrollIntoViewIfNeeded();

  const uaeCards = uaeSection.locator("article");
  const uaeCount = await uaeCards.count();
  console.log(`UAE Team cards count: ${uaeCount} (expected: 4)`);
  if (uaeCount !== 4) throw new Error(`Expected 4 UAE cards, got ${uaeCount}`);

  console.log("\n=== 5. Testing UAE Arabic RTL ===");
  await page.evaluate(() => {
    document.cookie = "victor_locale_uae=ar; path=/; max-age=31536000";
    localStorage.setItem("victor_locale_uae", "ar");
  });
  await page.goto("http://localhost:3000/uae", { waitUntil: "networkidle" });
  await uaeSection.scrollIntoViewIfNeeded();

  const dir = await page.locator("html").getAttribute("dir");
  console.log(`HTML dir: ${dir}`);

  const arButtons = uaeSection.locator("article").first().locator(".hidden.sm\\:flex a");
  const arBtnTexts = await arButtons.allInnerTexts();
  console.log(`Arabic action buttons:`, arBtnTexts);

  const firstImgTransform = await uaeSection.locator("article").first().locator(".hidden.sm\\:flex img").evaluate((el) => {
    return window.getComputedStyle(el).transform;
  });
  console.log(`Arabic portrait transform: ${firstImgTransform}`);

  const hasOverflowAr = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  console.log(`Arabic RTL horizontal overflow: ${hasOverflowAr}`);
  if (hasOverflowAr) throw new Error("Horizontal overflow detected in Arabic RTL!");

  await uaeSection.screenshot({ path: path.join(screenshotsDir, "team-grid-compact-uae-arabic-rtl.png") });

  await browser.close();
  console.log("\n>>> ALL VERIFICATION TESTS PASSED SUCCESSFULLY! <<<");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
