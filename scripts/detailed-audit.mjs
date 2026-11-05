import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const screenshotsDir = path.resolve("docs/screenshots");
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function run() {
  const browser = await chromium.launch({ channel: "chrome" });

  // 1. Desktop Audit (1440px)
  console.log("=== DESKTOP AUDIT (1440px) ===");
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Check India
  await page.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(screenshotsDir, "audit-india-desktop.png"), fullPage: true });

  // Check UAE
  await page.goto("http://localhost:3000/uae", { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(screenshotsDir, "audit-uae-desktop.png"), fullPage: true });

  // Compare Header
  console.log("\n--- HEADER AUDIT ---");
  const indiaHeader = await page.goto("http://localhost:3000/india").then(() => page.locator("header").first());
  const indiaNavLinks = await indiaHeader.locator("nav a").evaluateAll((els) =>
    els.map((el) => ({ text: el.innerText.trim(), href: el.getAttribute("href"), classes: el.className }))
  );
  console.log("India Header Nav Links:", indiaNavLinks);

  await page.goto("http://localhost:3000/uae", { waitUntil: "networkidle" });
  const uaeHeader = page.locator("header").first();
  const uaeNavLinks = await uaeHeader.locator("nav a").evaluateAll((els) =>
    els.map((el) => ({ text: el.innerText.trim(), href: el.getAttribute("href"), classes: el.className }))
  );
  console.log("UAE Header Nav Links:", uaeNavLinks);

  // Check all links on UAE page to ensure none link to /india or retired routes
  console.log("\n--- CHECKING ALL LINKS ON /uae ---");
  const allUaeLinks = await page.$$eval("a[href]", (els) =>
    els.map((el) => ({
      text: el.innerText.trim().replace(/\s+/g, " "),
      href: el.getAttribute("href"),
    }))
  );
  console.log(`Total links on /uae: ${allUaeLinks.length}`);
  const badLinks = allUaeLinks.filter(
    (l) =>
      l.href &&
      !l.href.startsWith("#") &&
      !l.href.startsWith("tel:") &&
      !l.href.startsWith("mailto:") &&
      !l.href.startsWith("https://wa.me") &&
      !l.href.startsWith("http") &&
      !l.href.startsWith("/uae") &&
      l.href !== "/"
  );
  console.log("Any links outside /uae or /?", badLinks);

  const retiredLinks = allUaeLinks.filter(
    (l) => l.href && (l.href.includes("rfp") || l.href.includes("estimator"))
  );
  console.log("Any links to retired features (rfp/estimator)?", retiredLinks);

  // Compare Hero
  console.log("\n--- HERO AUDIT ---");
  const uaeHero = page.locator("main > div, main > section").first();
  const uaeHeroButtons = await uaeHero.locator("a").evaluateAll((els) =>
    els.map((el) => ({ text: el.innerText.trim(), href: el.getAttribute("href") }))
  );
  console.log("UAE Hero Buttons:", uaeHeroButtons);

  // Compare Services Section
  console.log("\n--- SERVICES SECTION AUDIT ---");
  const servicesSection = page.locator("#services");
  const serviceCards = await servicesSection.locator("a[href], article").evaluateAll((els) =>
    els.map((el) => ({ text: el.innerText.trim().slice(0, 50), href: el.getAttribute("href") }))
  );
  console.log(`UAE Services Cards count: ${serviceCards.length}`);
  serviceCards.forEach((c, idx) => console.log(`  [Service ${idx}] text="${c.text}" href="${c.href}"`));

  // Compare Leadership & Accountability
  console.log("\n--- LEADERSHIP & ACCOUNTABILITY AUDIT ---");
  const peopleSection = page.locator("#about");
  const teamCards = peopleSection.locator("article");
  const teamCount = await teamCards.count();
  console.log(`UAE Team Cards count: ${teamCount}`);
  for (let i = 0; i < teamCount; i++) {
    const card = teamCards.nth(i);
    const box = await card.boundingBox();
    const name = await card.locator("h3").first().innerText();
    const role = await card.locator("p").first().innerText();
    const actions = await card.locator("a").evaluateAll((els) =>
      els.map((el) => ({ label: el.getAttribute("aria-label"), href: el.getAttribute("href") }))
    );
    console.log(`  [Card ${i + 1}] ${name.trim()} (${role.trim()}) - Box: ${box.width}x${box.height}px`);
    actions.forEach((a) => console.log(`    Action: ${a.label} -> ${a.href}`));
  }

  // Compare Footer
  console.log("\n--- FOOTER AUDIT ---");
  const footer = page.locator("footer");
  const footerLinks = await footer.locator("a").evaluateAll((els) =>
    els.map((el) => ({ text: el.innerText.trim(), href: el.getAttribute("href") }))
  );
  console.log(`UAE Footer links count: ${footerLinks.length}`);
  const outsideUaeInFooter = footerLinks.filter(
    (l) => l.href && l.href.startsWith("/india")
  );
  console.log("Footer links pointing to /india:", outsideUaeInFooter);

  // 2. Mobile Audit (390px)
  console.log("\n=== MOBILE AUDIT (390px) ===");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://localhost:3000/uae", { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(screenshotsDir, "audit-uae-mobile-390.png"), fullPage: true });

  const hasMobileOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  console.log(`390px mobile horizontal overflow: ${hasMobileOverflow}`);

  // 3. Arabic RTL Audit
  console.log("\n=== ARABIC RTL AUDIT ===");
  await page.evaluate(() => {
    document.cookie = "victor_locale_uae=ar; path=/; max-age=31536000";
    localStorage.setItem("victor_locale_uae", "ar");
  });
  await page.goto("http://localhost:3000/uae", { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(screenshotsDir, "audit-uae-arabic-desktop.png"), fullPage: true });

  const hasArOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  console.log(`Arabic RTL horizontal overflow: ${hasArOverflow}`);

  await browser.close();
  console.log("\n>>> AUDIT SCRIPT FINISHED <<<");
}

run().catch(console.error);
