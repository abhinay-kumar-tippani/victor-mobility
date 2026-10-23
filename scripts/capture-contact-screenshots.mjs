import { chromium } from "playwright";

async function main() {
  console.log("Launching Edge...");
  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"]
  });
  console.log("Edge launched successfully!");

  // Desktop India
  const pageDesk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  pageDesk.setDefaultTimeout(60000);
  console.log("Navigating to India desktop...");
  await pageDesk.goto("http://localhost:3000/india", { waitUntil: "domcontentloaded", timeout: 60000 });
  await pageDesk.waitForTimeout(1000);
  const contactDesk = await pageDesk.$("#contact");
  if (contactDesk) {
    await contactDesk.screenshot({ path: "docs/screenshots/contact-247-india-desktop.png" });
    console.log("Saved docs/screenshots/contact-247-india-desktop.png");
  }

  // Mobile India
  const pageMob = await browser.newPage({ viewport: { width: 390, height: 844 } });
  console.log("Navigating to India mobile...");
  await pageMob.goto("http://localhost:3000/india", { waitUntil: "domcontentloaded" });
  await pageMob.waitForTimeout(1000);
  const contactMob = await pageMob.$("#contact");
  if (contactMob) {
    await contactMob.screenshot({ path: "docs/screenshots/contact-247-india-mobile.png" });
    console.log("Saved docs/screenshots/contact-247-india-mobile.png");
  }

  // Desktop UAE
  console.log("Navigating to UAE desktop...");
  await pageDesk.goto("http://localhost:3000/uae", { waitUntil: "domcontentloaded" });
  await pageDesk.waitForTimeout(1000);
  const contactUaeDesk = await pageDesk.$("#contact");
  if (contactUaeDesk) {
    await contactUaeDesk.screenshot({ path: "docs/screenshots/contact-247-uae-desktop.png" });
    console.log("Saved docs/screenshots/contact-247-uae-desktop.png");
  }

  // Mobile UAE
  console.log("Navigating to UAE mobile...");
  await pageMob.goto("http://localhost:3000/uae", { waitUntil: "domcontentloaded" });
  await pageMob.waitForTimeout(1000);
  const contactUaeMob = await pageMob.$("#contact");
  if (contactUaeMob) {
    await contactUaeMob.screenshot({ path: "docs/screenshots/contact-247-uae-mobile.png" });
    console.log("Saved docs/screenshots/contact-247-uae-mobile.png");
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
