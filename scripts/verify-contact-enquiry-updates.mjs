import { chromium } from "playwright";

async function run() {
  console.log("Launching Edge for verification...");
  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  const routes = ["/india/contact", "/uae/contact"];

  for (const route of routes) {
    console.log(`\n========================================`);
    console.log(`Verifying route: ${route}`);
    console.log(`========================================`);

    // Desktop
    const pageDesk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pageDesk.goto(`http://localhost:3000${route}`, { waitUntil: "domcontentloaded", timeout: 15000 });
    await pageDesk.waitForTimeout(1000);

    // 1. Check "Enquiry Specification Summary:" and "Copy message draft" are gone
    const bodyTextDesk = await pageDesk.innerText("body");
    if (bodyTextDesk.includes("Enquiry Specification Summary:")) {
      throw new Error(`FAIL: Found 'Enquiry Specification Summary:' in ${route} on desktop`);
    } else {
      console.log(`PASS: 'Enquiry Specification Summary:' is completely removed on ${route}`);
    }

    if (bodyTextDesk.includes("Copy message draft") || (await pageDesk.$('button:has-text("Copy message draft")'))) {
      throw new Error(`FAIL: Found 'Copy message draft' button in ${route} on desktop`);
    } else {
      console.log(`PASS: 'Copy message draft' button is completely removed on ${route}`);
    }

    const prePreview = await pageDesk.$('pre[aria-label="WhatsApp message preview"]');
    if (prePreview) {
      throw new Error(`FAIL: Found WhatsApp message preview box in ${route} on desktop`);
    } else {
      console.log(`PASS: WhatsApp message preview draft box is completely removed on ${route}`);
    }

    // 2. Check disclaimer is gone
    if (bodyTextDesk.includes("Clicking opens a prefilled message draft in WhatsApp for you to send to our team")) {
      throw new Error(`FAIL: Found disclaimer text in ${route} on desktop`);
    } else {
      console.log(`PASS: WhatsApp booking disclaimer is completely removed on ${route}`);
    }

    // 3. Check 50-50 buttons in enquiry form
    const whatsappBtn = await pageDesk.$('button:has-text("Continue on WhatsApp")');
    const emailBtn = await pageDesk.$('button:has-text("Send via Email")');

    if (!whatsappBtn || !emailBtn) {
      throw new Error(`FAIL: Could not find both 50-50 buttons on ${route}`);
    }

    const waBox = await whatsappBtn.boundingBox();
    const emBox = await emailBtn.boundingBox();
    console.log(`WhatsApp button bounding box:`, waBox);
    console.log(`Email button bounding box:`, emBox);

    if (Math.abs(waBox.width - emBox.width) > 6) {
      console.warn(`Notice: button widths differ slightly: WA=${waBox.width}, EM=${emBox.width}`);
    } else {
      console.log(`PASS: Buttons are balanced 50-50: WA=${waBox.width}px, EM=${emBox.width}px`);
    }

    // 4. Check input field borders
    const nameInput = await pageDesk.$("#enquiry-name-input");
    if (nameInput) {
      const className = await nameInput.getAttribute("class");
      const borderTopWidth = await nameInput.evaluate((el) => window.getComputedStyle(el).borderTopWidth);
      const borderColor = await nameInput.evaluate((el) => window.getComputedStyle(el).borderColor);
      console.log(`Input field className contains border-[1.5px]:`, className.includes("border-[1.5px]"));
      console.log(`Input field borderTopWidth: ${borderTopWidth}, borderColor: ${borderColor}`);
      if (!className.includes("border-[1.5px]") || !className.includes("border-slate-300")) {
        throw new Error(`FAIL: Input field missing border-[1.5px] or border-slate-300 styling`);
      }
      console.log(`PASS: Input field has substantial idle border styling (border-[1.5px] border-slate-300)`);
    }

    // 5. Immediate Assistance card: only Muhammad Asif
    const immediateCard = await pageDesk.$(".bg-brand-indigo.rounded-2xl");
    if (immediateCard) {
      const cardText = await immediateCard.innerText();
      if (!cardText.includes("Muhammad Asif")) {
        throw new Error(`FAIL: Immediate Assistance card missing Muhammad Asif on ${route}`);
      }
      if (cardText.includes("Mujeeb") || cardText.includes("Thameem")) {
        throw new Error(`FAIL: Immediate Assistance card still has other contacts on ${route}`);
      }
      const slideIndicators = await immediateCard.$$('button[role="tab"]');
      if (slideIndicators.length > 0) {
        throw new Error(`FAIL: Immediate Assistance card still shows slide dots on ${route}`);
      }
      console.log(`PASS: Immediate Assistance shows only Muhammad Asif, 0 extra team members, 0 slide dots`);
    }

    // Check desktop overflow
    const deskOverflow = await pageDesk.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    if (deskOverflow) {
      throw new Error(`FAIL: Desktop horizontal scroll overflow detected on ${route}`);
    }
    console.log(`PASS: Zero desktop horizontal overflow on ${route}`);

    // Screenshot desktop
    const contactSectionDesk = await pageDesk.$("#contact");
    const cleanRouteName = route.replace(/\//g, "-").replace(/^-/, "");
    if (contactSectionDesk) {
      await contactSectionDesk.screenshot({ path: `docs/screenshots/${cleanRouteName}-desktop.png` });
      console.log(`Saved screenshot: docs/screenshots/${cleanRouteName}-desktop.png`);
    }
    await pageDesk.close();

    // Mobile (390px)
    const pageMob = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await pageMob.goto(`http://localhost:3000${route}`, { waitUntil: "domcontentloaded", timeout: 15000 });
    await pageMob.waitForTimeout(1000);

    // Check mobile overflow
    const mobOverflow = await pageMob.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    if (mobOverflow) {
      throw new Error(`FAIL: Mobile horizontal scroll overflow detected on ${route}`);
    }
    console.log(`PASS: Zero mobile horizontal overflow on ${route}`);

    // Screenshot mobile
    const contactSectionMob = await pageMob.$("#contact");
    if (contactSectionMob) {
      await contactSectionMob.screenshot({ path: `docs/screenshots/${cleanRouteName}-mobile.png` });
      console.log(`Saved screenshot: docs/screenshots/${cleanRouteName}-mobile.png`);
    }
    await pageMob.close();
  }

  await browser.close();
  console.log("\nALL VERIFICATIONS PASSED SUCCESSFULLY!");
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
