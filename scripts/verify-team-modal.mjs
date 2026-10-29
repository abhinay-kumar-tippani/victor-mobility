import { chromium } from "playwright";

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

try {
  await page.goto("http://127.0.0.1:3024/india", { waitUntil: "networkidle" });
  const contactSection = page.locator("#contact");
  await contactSection.scrollIntoViewIfNeeded();

  // Test Asif modal
  const asifBtn = contactSection.locator('button[aria-label*="Muhammad Asif"]').first();
  await asifBtn.click();
  const dialog = page.locator('div[role="dialog"]');
  await dialog.waitFor({ state: "visible" });
  const asifImg = dialog.locator('img[src*="muhammad-asif"]');
  await asifImg.waitFor({ state: "visible" });
  console.log("PASS: Asif portrait dialog visible with high-res image");
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });
  console.log("PASS: Dialog closed on Escape");

  // Test Thameem modal
  const thameemBtn = contactSection.locator('button[aria-label*="Mohammed Thameem"]').first();
  await thameemBtn.click();
  await dialog.waitFor({ state: "visible" });
  const thameemImg = dialog.locator('img[src*="thameem-ahmed"]');
  await thameemImg.waitFor({ state: "visible" });
  console.log("PASS: Thameem portrait dialog visible with high-res image");
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });
  console.log("PASS: Dialog closed on Escape");

  console.log("ALL TESTS PASSED SUCCESSFULLY!");
} finally {
  await browser.close();
}
