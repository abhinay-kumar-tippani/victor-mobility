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
    console.log("Server ready! Launching Playwright verification for Simple Victor logo fix...");

    const browser = await chromium.launch({ channel: "msedge" });

    // ----------------------------------------------------
    // Test 1: Desktop (1440px)
    // ----------------------------------------------------
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto("http://localhost:3000/sociallinks", { waitUntil: "networkidle" });

    // 1. Verify Simple Victor Logo in Header
    const desktopLogo = page.locator("header img[alt='Victor']").first();
    const logoSrc = await desktopLogo.getAttribute("src");
    console.log("Desktop Header Logo src:", logoSrc);
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

    // 3. Verify Hero Section Typography and Heading Wordmark Positioning
    const heroHeading = page.locator("h1");
    const heroHeadingText = await heroHeading.innerText();
    console.log("Hero heading text:", heroHeadingText);
    if (!heroHeadingText.includes("Connect with")) {
      throw new Error(`Expected heading text to include 'Connect with', got '${heroHeadingText}'`);
    }

    const headingLogo = page.locator("h1 img[alt='Victor']");
    const headingLogoVisible = await headingLogo.isVisible();
    const headingLogoSrc = await headingLogo.getAttribute("src");
    console.log("Heading logo visible:", headingLogoVisible, "src:", headingLogoSrc);
    if (!headingLogoVisible || !headingLogoSrc?.includes("victor-simple")) {
      throw new Error(`Expected Simple Victor logo in heading, got ${headingLogoSrc}`);
    }

    // Check that "Connect with" and logo are on the EXACT SAME horizontal line on desktop
    const headingTextRect = await page.locator("h1 span").first().boundingBox();
    const headingLogoRect = await headingLogo.boundingBox();
    console.log("Desktop Heading Text bbox:", headingTextRect);
    console.log("Desktop Heading Logo bbox:", headingLogoRect);

    // Verify logo is immediately to the RIGHT of "Connect with"
    if (headingLogoRect.x <= headingTextRect.x + headingTextRect.width * 0.7) {
      throw new Error("Heading logo is NOT positioned immediately to the right of 'Connect with'!");
    }

    // Verify logo is on the SAME vertical band (not placed on a separate line below)
    const yDiff = Math.abs(headingTextRect.y - headingLogoRect.y);
    console.log(`Desktop vertical alignment delta: ${yDiff.toFixed(2)}px`);
    if (yDiff > 16) {
      throw new Error(`Heading logo is on a different line! Delta: ${yDiff}px`);
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
    if (!heroImgSrc || (!heroImgSrc.includes("hero-vehicle") && !heroImgSrc.includes("hero-art"))) {
      throw new Error(`Expected hero vehicle image, got ${heroImgSrc}`);
    }

    // 5. Verify the 5 Social Media Cards on Desktop (Website, LinkedIn, Facebook, Instagram, WhatsApp)
    const expectedSocialCards = [
      { name: "Website", href: "https://victormobility.in/" },
      { name: "LinkedIn", href: "https://www.linkedin.com/company/victormobility" },
      { name: "Facebook", href: "https://www.facebook.com/victormobility.in" },
      { name: "Instagram", href: "https://www.instagram.com/victormobility.in" },
      { name: "WhatsApp", href: "https://wa.me/919100777768" },
    ];

    const desktopCards = page.locator("section[aria-label='Official Social Media Channels'] .hidden.lg\\:grid a");
    const desktopCardCount = await desktopCards.count();
    console.log(`Found ${desktopCardCount} desktop social cards`);
    if (desktopCardCount !== 5) {
      throw new Error(`Expected 5 social cards on desktop, found ${desktopCardCount}`);
    }

    for (let i = 0; i < 5; i++) {
      const card = desktopCards.nth(i);
      const text = (await card.innerText()).trim();
      const href = await card.getAttribute("href");
      console.log(`Desktop Card ${i + 1}: ${expectedSocialCards[i].name} -> href=${href}`);
      if (!href?.includes(expectedSocialCards[i].href.replace("https://", ""))) {
        throw new Error(`Card ${i + 1} (${expectedSocialCards[i].name}) href incorrect: ${href}`);
      }
    }

    // 6. Footer verification
    const footerText = await page.locator("footer").innerText();
    console.log("Footer text:", footerText);
    if (!footerText.includes("Victor Mobility Pvt. Ltd.") || !footerText.includes("On Time Every Time.")) {
      throw new Error("Footer text missing required elements");
    }

    await page.screenshot({ path: "docs/screenshots/sociallinks-new-1440.png" });
    console.log("Saved docs/screenshots/sociallinks-new-1440.png");

    // ----------------------------------------------------
    // Test 2: Tablet (768px)
    // ----------------------------------------------------
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload({ waitUntil: "networkidle" });
    const tabletHeadingTextRect = await page.locator("h1 span").first().boundingBox();
    const tabletHeadingLogoRect = await page.locator("h1 img[alt='Victor']").boundingBox();
    const tabletYDiff = Math.abs(tabletHeadingTextRect.y - tabletHeadingLogoRect.y);
    console.log(`Tablet 768px vertical alignment delta: ${tabletYDiff.toFixed(2)}px`);
    if (tabletYDiff > 16) {
      throw new Error(`Tablet heading logo is on a different line! Delta: ${tabletYDiff}px`);
    }
    await page.screenshot({ path: "docs/screenshots/sociallinks-new-768.png" });
    console.log("Saved docs/screenshots/sociallinks-new-768.png");

    // ----------------------------------------------------
    // Test 3: Mobile (390px)
    // ----------------------------------------------------
    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload({ waitUntil: "networkidle" });

    const scrollWidth390 = await page.evaluate(() => document.documentElement.scrollWidth);
    console.log(`Mobile 390px scrollWidth: ${scrollWidth390}`);
    if (scrollWidth390 > 390) {
      throw new Error(`Mobile 390px horizontal overflow detected! scrollWidth=${scrollWidth390}`);
    }

    const mobileHeadingTextRect = await page.locator("h1 span").first().boundingBox();
    const mobileHeadingLogoRect = await page.locator("h1 img[alt='Victor']").boundingBox();
    console.log("Mobile 390px Heading Text bbox:", mobileHeadingTextRect);
    console.log("Mobile 390px Heading Logo bbox:", mobileHeadingLogoRect);

    // Verify logo is on the SAME line on mobile
    const mobileYDiff = Math.abs(mobileHeadingTextRect.y - mobileHeadingLogoRect.y);
    console.log(`Mobile 390px vertical alignment delta: ${mobileYDiff.toFixed(2)}px`);
    if (mobileYDiff > 14) {
      throw new Error(`Mobile heading logo is on a different line! Delta: ${mobileYDiff}px`);
    }

    // Verify logo is immediately to the RIGHT of "Connect with"
    if (mobileHeadingLogoRect.x <= mobileHeadingTextRect.x + mobileHeadingTextRect.width * 0.7) {
      throw new Error("Mobile heading logo is NOT positioned immediately to the right of 'Connect with'!");
    }

    const mobileCards = page.locator("section[aria-label='Official Social Media Channels'] .lg\\:hidden a");
    const mobileCardCount = await mobileCards.count();
    console.log(`Found ${mobileCardCount} mobile stacked cards`);
    if (mobileCardCount !== 5) {
      throw new Error(`Expected 5 mobile cards, found ${mobileCardCount}`);
    }

    await page.screenshot({ path: "docs/screenshots/sociallinks-new-390.png" });
    console.log("Saved docs/screenshots/sociallinks-new-390.png");

    // ----------------------------------------------------
    // Test 4: Small Mobile (320px)
    // ----------------------------------------------------
    await page.setViewportSize({ width: 320, height: 568 });
    await page.reload({ waitUntil: "networkidle" });

    const scrollWidth320 = await page.evaluate(() => document.documentElement.scrollWidth);
    console.log(`Mobile 320px scrollWidth: ${scrollWidth320}`);
    if (scrollWidth320 > 320) {
      throw new Error(`Mobile 320px horizontal overflow detected! scrollWidth=${scrollWidth320}`);
    }

    const smallMobileHeadingTextRect = await page.locator("h1 span").first().boundingBox();
    const smallMobileHeadingLogoRect = await page.locator("h1 img[alt='Victor']").boundingBox();
    const smallMobileYDiff = Math.abs(smallMobileHeadingTextRect.y - smallMobileHeadingLogoRect.y);
    console.log(`Mobile 320px vertical alignment delta: ${smallMobileYDiff.toFixed(2)}px`);
    if (smallMobileYDiff > 14) {
      throw new Error(`Small mobile heading logo is on a different line! Delta: ${smallMobileYDiff}px`);
    }

    await page.screenshot({ path: "docs/screenshots/sociallinks-new-320.png" });
    console.log("Saved docs/screenshots/sociallinks-new-320.png");

    await browser.close();
    console.log("ALL LOGO POSITIONING AND PAGE VERIFICATION TESTS PASSED FLAWLESSLY!");
  } finally {
    console.log("Stopping server...");
    server.kill();
  }
}

main().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
