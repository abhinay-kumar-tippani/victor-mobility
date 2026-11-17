import { spawn } from "child_process";
import { chromium } from "playwright";
import http from "http";

function waitForServer(url, timeout = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      http.get(url, (res) => {
        if (res.statusCode === 200 || res.statusCode === 307 || res.statusCode === 308) {
          resolve();
        } else {
          setTimeout(check, 500);
        }
      }).on("error", () => {
        if (Date.now() - start > timeout) {
          reject(new Error("Timeout waiting for server"));
        } else {
          setTimeout(check, 500);
        }
      });
    };
    check();
  });
}

async function main() {
  console.log("Starting Next.js production server on port 3000...");
  const server = spawn("npx.cmd", ["next", "start", "-p", "3000"], {
    stdio: "inherit",
    shell: true,
  });

  try {
    await waitForServer("http://localhost:3000/sociallinks");
    console.log("Server ready! Launching Playwright verification for redesign...");

    const browser = await chromium.launch({ channel: "msedge" });

    // ----------------------------------------------------
    // Test 1: Desktop (1440px)
    // ----------------------------------------------------
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto("http://localhost:3000/sociallinks", { waitUntil: "networkidle" });

    // 1. Verify Simple Victor Logo
    const desktopLogo = page.locator("header img[alt='Victor']").first();
    const logoSrc = await desktopLogo.getAttribute("src");
    console.log("Desktop Logo src:", logoSrc);
    if (!logoSrc || !logoSrc.includes("victor-simple")) {
      throw new Error(`Expected Simple Victor logo (victor-simple.png), got ${logoSrc}`);
    }

    // 2. Verify Header Company Name & Website Link
    const headerCompany = await page.locator("header").first().innerText();
    console.log("Header text:", headerCompany);
    if (!headerCompany.includes("Victor Mobility Pvt. Ltd.")) {
      throw new Error("Header missing 'Victor Mobility Pvt. Ltd.'");
    }
    const headerLink = await page.locator("header a").first().getAttribute("href");
    console.log("Header logo href:", headerLink);
    if (!headerLink || !headerLink.includes("victormobility.in")) {
      throw new Error(`Expected header link to victormobility.in, got ${headerLink}`);
    }

    // 3. Verify Hero Section Typography
    const heroHeading = await page.locator("h1").innerText();
    console.log("Hero heading:", heroHeading);
    if (!heroHeading.includes("Connect with Victor")) {
      throw new Error(`Expected heading 'Connect with Victor', got '${heroHeading}'`);
    }

    const officialChannels = await page.locator("text=OFFICIAL CHANNELS").isVisible();
    if (!officialChannels) {
      throw new Error("Missing 'OFFICIAL CHANNELS' label");
    }

    const taglineVisible = await page.locator("text=On Time Every Time.").first().isVisible();
    if (!taglineVisible) {
      throw new Error("Missing 'On Time Every Time.' tagline");
    }

    // 4. Verify Hero Vehicle Image
    const heroImg = page.locator("section img[alt*='Victor Mobility premium fleet vehicle']").first();
    const heroImgSrc = await heroImg.getAttribute("src");
    console.log("Hero vehicle image src:", heroImgSrc);
    if (!heroImgSrc || !heroImgSrc.includes("hero-art")) {
      throw new Error(`Expected hero vehicle image, got ${heroImgSrc}`);
    }

    // 5. Verify the 4 Social Media Cards on Desktop (LinkedIn, Facebook, Instagram, WhatsApp)
    const expectedSocialCards = [
      { name: "LinkedIn", href: "https://www.linkedin.com/company/victormobility" },
      { name: "Facebook", href: "https://www.facebook.com/victormobility.in" },
      { name: "Instagram", href: "https://www.instagram.com/victormobility.in" },
      { name: "WhatsApp", href: "https://wa.me/919100777768" },
    ];

    const desktopCards = page.locator("section[aria-label='Official Social Media Channels'] .hidden.lg\\:grid a");
    const desktopCardCount = await desktopCards.count();
    console.log(`Found ${desktopCardCount} desktop social cards`);
    if (desktopCardCount !== 4) {
      throw new Error(`Expected 4 social cards on desktop, found ${desktopCardCount}`);
    }

    for (let i = 0; i < 4; i++) {
      const card = desktopCards.nth(i);
      const text = (await card.innerText()).trim();
      const href = await card.getAttribute("href");
      console.log(`Desktop Card ${i + 1}: ${expectedSocialCards[i].name} -> href=${href}`);

      if (!text.includes(expectedSocialCards[i].name)) {
        throw new Error(`Card ${i + 1} missing name '${expectedSocialCards[i].name}'`);
      }
      if (href !== expectedSocialCards[i].href) {
        throw new Error(`Card ${i + 1} href mismatch: expected ${expectedSocialCards[i].href}, got ${href}`);
      }
    }

    // 6. Verify Footer
    const footerText = await page.locator("footer").innerText();
    console.log("Footer text:", footerText);
    if (!footerText.includes("Victor Mobility Pvt. Ltd.") || !footerText.includes("On Time Every Time.")) {
      throw new Error("Footer missing required brand identity");
    }

    const fleetSilhouettes = page.locator("footer img[alt*='Victor Mobility Fleet']").first();
    const silhouettesVisible = await fleetSilhouettes.isVisible();
    console.log("Footer fleet silhouettes visible on desktop:", silhouettesVisible);
    if (!silhouettesVisible) {
      throw new Error("Footer fleet silhouettes must be visible on desktop");
    }

    // Capture Desktop Screenshot
    await page.screenshot({ path: "docs/screenshots/sociallinks-new-1440.png", fullPage: true });
    console.log("Saved docs/screenshots/sociallinks-new-1440.png");

    // ----------------------------------------------------
    // Test 2: Tablet (768px)
    // ----------------------------------------------------
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("http://localhost:3000/sociallinks", { waitUntil: "networkidle" });
    const scrollWidth768 = await page.evaluate(() => document.documentElement.scrollWidth);
    if (scrollWidth768 > 768) {
      throw new Error(`Horizontal overflow on 768px! scrollWidth=${scrollWidth768}`);
    }
    await page.screenshot({ path: "docs/screenshots/sociallinks-new-768.png", fullPage: true });
    console.log("Saved docs/screenshots/sociallinks-new-768.png");

    // ----------------------------------------------------
    // Test 3: Mobile (390px)
    // ----------------------------------------------------
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:3000/sociallinks", { waitUntil: "networkidle" });

    const scrollWidth390 = await page.evaluate(() => document.documentElement.scrollWidth);
    console.log("Mobile 390px scrollWidth:", scrollWidth390);
    if (scrollWidth390 > 390) {
      throw new Error(`Horizontal overflow on 390px! scrollWidth=${scrollWidth390}`);
    }

    // Check stacked mobile cards count
    const mobileCards = page.locator("section[aria-label='Official Social Media Channels'] .lg\\:hidden a");
    const mobileCardCount = await mobileCards.count();
    console.log(`Found ${mobileCardCount} mobile stacked cards`);
    if (mobileCardCount !== 4) {
      throw new Error(`Expected 4 stacked cards on mobile, found ${mobileCardCount}`);
    }

    for (let i = 0; i < 4; i++) {
      const card = mobileCards.nth(i);
      const box = await card.boundingBox();
      if (!box || box.height < 52) {
        throw new Error(`Mobile card ${i + 1} height is ${box?.height}px; expected >= 52px`);
      }
    }

    await page.screenshot({ path: "docs/screenshots/sociallinks-new-390.png", fullPage: true });
    console.log("Saved docs/screenshots/sociallinks-new-390.png");

    // ----------------------------------------------------
    // Test 4: Ultra-compact Mobile (320px)
    // ----------------------------------------------------
    await page.setViewportSize({ width: 320, height: 600 });
    await page.goto("http://localhost:3000/sociallinks", { waitUntil: "networkidle" });

    const scrollWidth320 = await page.evaluate(() => document.documentElement.scrollWidth);
    console.log("Mobile 320px scrollWidth:", scrollWidth320);
    if (scrollWidth320 > 320) {
      throw new Error(`Horizontal overflow on 320px! scrollWidth=${scrollWidth320}`);
    }

    await page.screenshot({ path: "docs/screenshots/sociallinks-new-320.png", fullPage: true });
    console.log("Saved docs/screenshots/sociallinks-new-320.png");

    console.log("ALL REDESIGN VERIFICATION TESTS PASSED FLAWLESSLY!");
    await browser.close();
  } finally {
    console.log("Stopping server...");
    spawn("taskkill", ["/pid", server.pid.toString(), "/f", "/t"], { shell: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
