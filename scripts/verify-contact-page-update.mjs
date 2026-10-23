import { chromium } from "playwright";
import http from "http";

function checkServerReady(port = 3005) {
  return new Promise((resolve) => {
    const req = http.get(`http://127.0.0.1:${port}/india/contact`, (res) => {
      resolve(res.statusCode === 200);
    });
    req.on("error", () => resolve(false));
    req.setTimeout(1500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function run() {
  const isReady = await checkServerReady(3005);
  if (!isReady) {
    console.log("Server not running on port 3005.");
    return;
  }

  const browser = await chromium.launch({ headless: true, channel: "chrome" });
  
  // Desktop
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await desktopContext.newPage();
  await page.goto("http://127.0.0.1:3005/india/contact", { waitUntil: "networkidle" });

  const hasRegionalOffices = await page.evaluate(() => {
    return document.body.innerText.includes("Our Operating Office Locations") ||
           document.body.innerText.includes("Regional Offices");
  });
  console.log("Has Regional Offices text:", hasRegionalOffices);

  const hasEmailForm = await page.evaluate(() => {
    const form = document.querySelector('form[aria-label="Direct Email Contact Form"]');
    return !!form;
  });
  console.log("Has Direct Email Form:", hasEmailForm);

  await page.screenshot({ path: "docs/screenshots/contact-page-new-desktop.png", fullPage: true });

  // Mobile
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto("http://127.0.0.1:3005/india/contact", { waitUntil: "networkidle" });
  await mobilePage.screenshot({ path: "docs/screenshots/contact-page-new-mobile.png", fullPage: true });

  await browser.close();
  console.log("Screenshots captured successfully.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
