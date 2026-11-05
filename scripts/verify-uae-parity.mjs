import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const screenshotsDir = path.resolve("docs/screenshots");
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function run() {
  const browser = await chromium.launch({ channel: "chrome" });

  // ==========================================
  // 1. INDIA DESKTOP (1440px)
  // ==========================================
  console.log("=== 1. Testing India Homepage at 1440px Desktop ===");
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000/india", { waitUntil: "networkidle" });

  // Verify Sticky rail on India
  const indiaRail = page.locator("[data-testid='sticky-contact-rail']");
  const indiaRailLinks = await indiaRail.locator("a").evaluateAll((els) =>
    els.map((el) => ({ href: el.getAttribute("href"), label: el.getAttribute("aria-label") }))
  );
  console.log("India Sticky Rail Links:", indiaRailLinks);
  if (!indiaRailLinks[0].href.includes("9100777768")) {
    throw new Error("India sticky rail should point to Muhammad Asif");
  }

  // Verify India team cards
  const indiaTeamCards = page.locator("#about article");
  if ((await indiaTeamCards.count()) !== 4) {
    throw new Error("Expected 4 India team cards");
  }
  const indiaHasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  console.log("India desktop horizontal overflow:", indiaHasOverflow);
  if (indiaHasOverflow) throw new Error("India desktop has horizontal overflow!");

  // ==========================================
  // 2. UAE DESKTOP (1440px)
  // ==========================================
  console.log("\n=== 2. Testing UAE Homepage at 1440px Desktop ===");
  await page.goto("http://localhost:3000/uae", { waitUntil: "networkidle" });

  // Check Sticky rail on UAE: MUST use UAE Operations Desk details
  const uaeRail = page.locator("[data-testid='sticky-contact-rail']");
  const uaeRailLinks = await uaeRail.locator("a").evaluateAll((els) =>
    els.map((el) => ({ href: el.getAttribute("href"), label: el.getAttribute("aria-label") }))
  );
  console.log("UAE Sticky Rail Links:", uaeRailLinks);
  if (!uaeRailLinks[0].href.includes("971524552441")) {
    throw new Error(`UAE sticky rail phone must use UAE number (+971 52 455 2441), got: ${uaeRailLinks[0].href}`);
  }
  if (!uaeRailLinks[1].href.includes("971524552441")) {
    throw new Error(`UAE sticky rail WhatsApp must use UAE number (971524552441), got: ${uaeRailLinks[1].href}`);
  }
  if (!uaeRailLinks[2].href.includes("info@victorluxurylimousine.com")) {
    throw new Error(`UAE sticky rail email must use UAE email, got: ${uaeRailLinks[2].href}`);
  }

  // Check Leadership & Accountability on UAE
  const uaePeopleSection = page.locator("#about");
  const uaeTeamCards = uaePeopleSection.locator("article");
  const uaeTeamCount = await uaeTeamCards.count();
  console.log(`UAE Team Cards count: ${uaeTeamCount}`);
  if (uaeTeamCount !== 4) throw new Error("Expected 4 UAE team cards");

  for (let i = 0; i < uaeTeamCount; i++) {
    const card = uaeTeamCards.nth(i);
    const box = await card.boundingBox();
    const name = await card.locator(".hidden.sm\\:flex h3").innerText();
    const role = await card.locator(".hidden.sm\\:flex p").first().innerText();
    const pBox = await card.locator(".hidden.sm\\:flex .relative").first().boundingBox();
    console.log(`  [Card ${i + 1}] ${name.trim()} (${role.trim()}) - card: ${box.width}x${box.height}px, portrait: ${pBox.width}x${pBox.height}px`);
    if (Math.abs(pBox.width - 112) > 5 || Math.abs(pBox.height - 140) > 5) {
      throw new Error(`UAE portrait dimensions unexpected: ${pBox.width}x${pBox.height}`);
    }
    if (box.height < 170 || box.height > 250) {
      console.warn(`Card ${i + 1} height ${box.height}px outside ideal 190-220px`);
    }
  }

  // Check story link on UAE
  const uaeStoryLink = uaePeopleSection.locator("a[href$='/about']");
  const uaeStoryHref = await uaeStoryLink.getAttribute("href");
  console.log("UAE story link:", uaeStoryHref);
  if (!uaeStoryHref.includes("/uae/about")) {
    throw new Error("UAE story link should point to /uae/about");
  }

  // Check Fleet Preview on UAE
  console.log("\n--- Checking UAE Fleet Preview ---");
  const uaeFleetSection = page.locator("#fleet");
  await uaeFleetSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  const fleetArticles = uaeFleetSection.locator("article");
  const fleetCount = await fleetArticles.count();
  console.log(`UAE Fleet cards count: ${fleetCount}`);
  if (fleetCount !== 4) throw new Error(`Expected 4 UAE fleet cards, got ${fleetCount}`);

  const expectedUaeVehicles = [
    "Mercedes-Benz S-Class",
    "Cadillac Escalade",
    "Mercedes-Benz V-Class",
    "22-Seater VIP Coach",
  ];
  for (let i = 0; i < fleetCount; i++) {
    const card = fleetArticles.nth(i);
    const title = await card.locator("h3").innerText();
    const img = card.locator("img");
    const naturalWidth = await img.evaluate((el) => el.naturalWidth);
    console.log(`  [Vehicle ${i + 1}] ${title.trim()} - image naturalWidth: ${naturalWidth}`);
    if (!title.includes(expectedUaeVehicles[i])) {
      throw new Error(`Vehicle ${i + 1} mismatch: expected ${expectedUaeVehicles[i]}, got ${title}`);
    }
    if (naturalWidth === 0) {
      throw new Error(`Vehicle ${i + 1} image failed to load!`);
    }
  }

  const uaeFleetCta = uaeFleetSection.locator("div.mt-10 a, div.mt-14 a");
  const uaeFleetCtaHref = await uaeFleetCta.getAttribute("href");
  console.log("UAE Fleet CTA:", await uaeFleetCta.innerText(), uaeFleetCtaHref);
  if (uaeFleetCtaHref !== "/uae/fleet") {
    throw new Error(`UAE Fleet CTA must point to /uae/fleet, got: ${uaeFleetCtaHref}`);
  }

  // Check all links on UAE
  const allUaeLinks = await page.$$eval("a[href]", (els) =>
    els.map((el) => el.getAttribute("href"))
  );
  const invalidLinks = allUaeLinks.filter(
    (h) =>
      h &&
      !h.startsWith("#") &&
      !h.startsWith("tel:") &&
      !h.startsWith("mailto:") &&
      !h.startsWith("https://wa.me") &&
      !h.startsWith("http") &&
      !h.startsWith("/uae") &&
      !h.startsWith("/maps") &&
      h !== "/"
  );
  console.log("Invalid links on /uae:", invalidLinks);
  if (invalidLinks.length > 0) {
    throw new Error(`Found links on /uae outside /uae: ${JSON.stringify(invalidLinks)}`);
  }

  const uaeHasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  console.log("UAE desktop horizontal overflow:", uaeHasOverflow);
  if (uaeHasOverflow) throw new Error("UAE desktop has horizontal overflow!");

  await page.screenshot({ path: path.join(screenshotsDir, "uae-parity-desktop-1440.png") });

  // ==========================================
  // 3. UAE MOBILE (390px & 320px)
  // ==========================================
  console.log("\n=== 3. Testing UAE Homepage at 390px & 320px Mobile ===");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://localhost:3000/uae", { waitUntil: "networkidle" });

  const mUaeHasOverflow390 = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  console.log("390px mobile horizontal overflow:", mUaeHasOverflow390);
  if (mUaeHasOverflow390) throw new Error("390px mobile has horizontal overflow!");

  await page.setViewportSize({ width: 320, height: 600 });
  await page.goto("http://localhost:3000/uae", { waitUntil: "networkidle" });

  const mUaeHasOverflow320 = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  console.log("320px mobile horizontal overflow:", mUaeHasOverflow320);
  if (mUaeHasOverflow320) throw new Error("320px mobile has horizontal overflow!");

  await page.screenshot({ path: path.join(screenshotsDir, "uae-parity-mobile-390.png") });

  // ==========================================
  // 4. UAE ARABIC RTL
  // ==========================================
  console.log("\n=== 4. Testing UAE Arabic RTL ===");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => {
    document.cookie = "victor_locale_uae=ar; path=/; max-age=31536000";
    localStorage.setItem("victor_locale_uae", "ar");
  });
  await page.goto("http://localhost:3000/uae", { waitUntil: "networkidle" });

  const dir = await page.locator("html").getAttribute("dir");
  console.log("HTML dir attribute:", dir);
  if (dir !== "rtl") throw new Error("Expected dir='rtl' for Arabic");

  const arHasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  console.log("Arabic RTL horizontal overflow:", arHasOverflow);
  if (arHasOverflow) throw new Error("Arabic RTL has horizontal overflow!");

  await page.screenshot({ path: path.join(screenshotsDir, "uae-parity-arabic-rtl.png") });

  await browser.close();
  console.log("\n>>> ALL VERIFICATION CHECKS PASSED CLEANLY! <<<");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
