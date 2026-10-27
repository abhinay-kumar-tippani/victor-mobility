import { chromium } from "playwright";

const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  for (const viewport of [
    { name: "desktop", width: 1440, height: 1200 },
    { name: "mobile", width: 390, height: 844 },
  ]) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);

    const contactSection = page.locator("section#contact");
    await contactSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Verify Asif email link
    if ((await contactSection.locator('a[href="mailto:asif@victorluxurylimousine.com"]').count()) !== 1) {
      throw new Error("Asif email link missing or incorrect");
    }

    // Verify Thameem email link
    if ((await contactSection.locator('a[href="mailto:thameem@victorluxurylimousine.com"]').count()) !== 1) {
      throw new Error("Thameem email link missing or incorrect");
    }

    // Verify no landline link
    if ((await contactSection.locator('a[href^="tel:+9140"]').count()) !== 0) {
      throw new Error("Old landline link remains");
    }

    await contactSection.screenshot({
      path: `docs/screenshots/desk-india-${viewport.name}.png`,
    });
    console.log(`✓ india ${viewport.name} desk screenshot saved`);
    await context.close();
  }
} finally {
  await browser.close();
}
