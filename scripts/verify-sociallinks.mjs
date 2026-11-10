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
    console.log("Server ready! Launching Playwright verification...");

    const browser = await chromium.launch({ channel: "msedge" });

    // ----------------------------------------------------
    // Test 1: Desktop (1440px)
    // ----------------------------------------------------
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto("http://localhost:3000/sociallinks", { waitUntil: "networkidle" });

    // Verify masthead logo alignment
    const logo = page.locator("header svg").first();
    const logoBox = await logo.boundingBox();
    console.log("Masthead Logo bounding box:", logoBox);

    // Verify Heading
    const heading = await page.locator("h1").innerText();
    console.log("Heading text:", heading);
    if (!heading.includes("Connect with Victor")) {
      throw new Error(`Expected heading 'Connect with Victor', got '${heading}'`);
    }

    // Verify all 4 destinations in exact DOM & keyboard order
    const expectedDestinations = [
      { id: "website", label: "Visit Victor’s website", href: "https://victormobility.in" },
      { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/victormobility" },
      { id: "facebook", label: "Facebook", href: "https://www.facebook.com/victormobility.in" },
      { id: "instagram", label: "Instagram", href: "https://www.instagram.com/victormobility.in" },
    ];

    // Left Website Card
    const websiteCard = page.locator("a[aria-label='Visit Victor’s website']").first();
    const websiteHref = await websiteCard.getAttribute("href");
    const websiteTarget = await websiteCard.getAttribute("target");
    const websiteText = await websiteCard.innerText();
    const websiteImg = page.locator("a[aria-label='Visit Victor’s website'] img").first();
    const imgSrc = await websiteImg.getAttribute("src");
    const websiteBox = await websiteCard.boundingBox();

    console.log("Website Card:", { href: websiteHref, target: websiteTarget, text: websiteText.trim(), imgSrc, height: websiteBox?.height });

    if (websiteHref !== expectedDestinations[0].href) {
      throw new Error(`Website card href mismatch: expected ${expectedDestinations[0].href}, got ${websiteHref}`);
    }
    if (websiteTarget === "_blank") {
      throw new Error(`Website card must not open in new tab (no target="_blank")`);
    }
    if (!websiteText.includes("Visit Victor’s website")) {
      throw new Error(`Website card text must include 'Visit Victor’s website'`);
    }
    if (!imgSrc || !imgSrc.includes("luxury-fleet-lineup")) {
      throw new Error(`Website card image must use luxury-fleet-lineup.jpg, got ${imgSrc}`);
    }

    // Social Links Panel (Right Column)
    const socialLinks = page.locator("nav[aria-label='Victor Mobility Social Profiles'] a");
    const socialCount = await socialLinks.count();
    console.log(`Found ${socialCount} social links in panel`);
    if (socialCount !== 3) {
      throw new Error(`Expected 3 social links, found ${socialCount}`);
    }

    const socialNav = page.locator("nav[aria-label='Victor Mobility Social Profiles']").first();
    const socialNavBox = await socialNav.boundingBox();

    for (let i = 0; i < socialCount; i++) {
      const link = socialLinks.nth(i);
      const text = (await link.innerText()).trim();
      const href = await link.getAttribute("href");
      const target = await link.getAttribute("target");
      const box = await link.boundingBox();

      console.log(`Social Row ${i + 1}: label="${text}", href="${href}", height=${box?.height}px`);

      if (!text.includes(expectedDestinations[i + 1].label)) {
        throw new Error(`Social row ${i + 1} mismatch: expected to contain "${expectedDestinations[i + 1].label}", got "${text}"`);
      }
      if (href !== expectedDestinations[i + 1].href) {
        throw new Error(`Social row ${i + 1} href mismatch: expected "${expectedDestinations[i + 1].href}", got "${href}"`);
      }
      if (target === "_blank") {
        throw new Error(`Social row ${i + 1} has target="_blank"; expected same-tab direct navigation`);
      }
      if (!box || box.height < 52) {
        throw new Error(`Social row ${i + 1} height is ${box?.height}px; expected at least 52px`);
      }
    }

    // Verify Height Alignment: bottom of social panel and bottom of photo card
    console.log("Desktop Alignment Check:", {
      websiteBottom: (websiteBox?.y ?? 0) + (websiteBox?.height ?? 0),
      socialBottom: (socialNavBox?.y ?? 0) + (socialNavBox?.height ?? 0),
    });

    // Test Keyboard Tab Navigation Sequence: 1 -> 2 -> 3 -> 4
    console.log("Verifying Keyboard Tab sequence...");
    await page.keyboard.press("Tab"); // Skip link
    await page.keyboard.press("Tab"); // 1: Website Card
    let activeHref = await page.evaluate(() => document.activeElement?.getAttribute("href"));
    console.log("Tab 1 Active:", activeHref);
    if (activeHref !== expectedDestinations[0].href) {
      throw new Error(`Tab 1 expected ${expectedDestinations[0].href}, got ${activeHref}`);
    }

    await page.keyboard.press("Tab"); // 2: LinkedIn
    activeHref = await page.evaluate(() => document.activeElement?.getAttribute("href"));
    console.log("Tab 2 Active:", activeHref);
    if (activeHref !== expectedDestinations[1].href) {
      throw new Error(`Tab 2 expected ${expectedDestinations[1].href}, got ${activeHref}`);
    }

    await page.keyboard.press("Tab"); // 3: Facebook
    activeHref = await page.evaluate(() => document.activeElement?.getAttribute("href"));
    console.log("Tab 3 Active:", activeHref);
    if (activeHref !== expectedDestinations[2].href) {
      throw new Error(`Tab 3 expected ${expectedDestinations[2].href}, got ${activeHref}`);
    }

    await page.keyboard.press("Tab"); // 4: Instagram
    activeHref = await page.evaluate(() => document.activeElement?.getAttribute("href"));
    console.log("Tab 4 Active:", activeHref);
    if (activeHref !== expectedDestinations[3].href) {
      throw new Error(`Tab 4 expected ${expectedDestinations[3].href}, got ${activeHref}`);
    }

    // Capture Desktop Screenshot
    await page.screenshot({ path: "docs/screenshots/sociallinks-redesign-1440.png", fullPage: true });
    console.log("Saved docs/screenshots/sociallinks-redesign-1440.png");

    // ----------------------------------------------------
    // Test 2: Mobile 390px
    // ----------------------------------------------------
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:3000/sociallinks", { waitUntil: "networkidle" });

    const scrollWidth390 = await page.evaluate(() => document.documentElement.scrollWidth);
    console.log("Mobile 390px scrollWidth:", scrollWidth390);
    if (scrollWidth390 > 390) {
      throw new Error(`Horizontal overflow on 390px! scrollWidth=${scrollWidth390}`);
    }

    // Verify shallow crop height on mobile
    const mobileCardBox = await page.locator("a[aria-label='Visit Victor’s website']").first().boundingBox();
    console.log("Mobile 390px Card Height:", mobileCardBox?.height);
    if (!mobileCardBox || mobileCardBox.height > 270) {
      throw new Error(`Mobile card height is ${mobileCardBox?.height}px, should be shallow landscape`);
    }

    await page.screenshot({ path: "docs/screenshots/sociallinks-redesign-390.png", fullPage: true });
    console.log("Saved docs/screenshots/sociallinks-redesign-390.png");

    // ----------------------------------------------------
    // Test 3: Ultra-Compact Mobile 320px
    // ----------------------------------------------------
    await page.setViewportSize({ width: 320, height: 600 });
    await page.goto("http://localhost:3000/sociallinks", { waitUntil: "networkidle" });

    const scrollWidth320 = await page.evaluate(() => document.documentElement.scrollWidth);
    console.log("Mobile 320px scrollWidth:", scrollWidth320);
    if (scrollWidth320 > 320) {
      throw new Error(`Horizontal overflow on 320px! scrollWidth=${scrollWidth320}`);
    }

    // Verify all 3 social rows are >= 52px on 320px
    const rows320 = page.locator("nav[aria-label='Victor Mobility Social Profiles'] a");
    for (let i = 0; i < 3; i++) {
      const box = await rows320.nth(i).boundingBox();
      if (!box || box.height < 52) {
        throw new Error(`Row ${i + 1} at 320px is ${box?.height}px, must be >= 52px`);
      }
    }

    await page.screenshot({ path: "docs/screenshots/sociallinks-redesign-320.png", fullPage: true });
    console.log("Saved docs/screenshots/sociallinks-redesign-320.png");

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
