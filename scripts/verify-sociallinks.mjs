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
    console.log("Server ready! Launching browser tests...");

    const browser = await chromium.launch({ channel: "msedge" });

    // Test 1: Desktop 1440px
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto("http://localhost:3000/sociallinks", { waitUntil: "networkidle" });

    // Heading check
    const heading = await page.locator("h1").innerText();
    console.log("Page Heading:", heading);
    if (!heading.includes("Connect with Victor Mobility")) {
      throw new Error(`Unexpected heading: ${heading}`);
    }

    // Check the 4 links in exact order
    const expectedLinks = [
      { label: "Visit Victor’s website", href: "https://victormobility.in" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/victormobility" },
      { label: "Facebook", href: "https://www.facebook.com/victormobility.in" },
      { label: "Instagram", href: "https://www.instagram.com/victormobility.in" },
    ];

    const linkLocators = page.locator("nav[aria-label='Victor Mobility Destinations'] a");
    const count = await linkLocators.count();
    console.log(`Found ${count} destination links`);
    if (count !== 4) {
      throw new Error(`Expected exactly 4 links, found ${count}`);
    }

    for (let i = 0; i < count; i++) {
      const link = linkLocators.nth(i);
      const text = (await link.innerText()).trim();
      const href = await link.getAttribute("href");
      const target = await link.getAttribute("target");
      const box = await link.boundingBox();

      console.log(`Link ${i + 1}: text="${text}", href="${href}", target="${target}", height=${box?.height}px`);

      if (!text.includes(expectedLinks[i].label)) {
        throw new Error(`Link ${i + 1} label mismatch! Expected to contain "${expectedLinks[i].label}", got "${text}"`);
      }
      if (href !== expectedLinks[i].href) {
        throw new Error(`Link ${i + 1} href mismatch! Expected "${expectedLinks[i].href}", got "${href}"`);
      }
      if (target === "_blank") {
        throw new Error(`Link ${i + 1} has target="_blank", expected direct navigation in same tab`);
      }
      if (!box || box.height < 56) {
        throw new Error(`Link ${i + 1} height is ${box?.height}px, expected at least 56px`);
      }
    }

    // Check keyboard navigation
    console.log("Testing keyboard Tab navigation...");
    await page.keyboard.press("Tab"); // Skip link
    await page.keyboard.press("Tab"); // 1st link
    let focusedHref = await page.evaluate(() => document.activeElement?.getAttribute("href"));
    console.log("Tab 1 focused:", focusedHref);
    if (focusedHref !== "https://victormobility.in") {
      throw new Error(`Expected 1st link focused on tab, got ${focusedHref}`);
    }

    await page.keyboard.press("Tab"); // 2nd link
    focusedHref = await page.evaluate(() => document.activeElement?.getAttribute("href"));
    if (focusedHref !== "https://www.linkedin.com/company/victormobility") {
      throw new Error(`Expected 2nd link focused on tab, got ${focusedHref}`);
    }

    // Screenshot Desktop
    await page.screenshot({ path: "docs/screenshots/sociallinks-desktop-1440.png", fullPage: true });
    console.log("Saved docs/screenshots/sociallinks-desktop-1440.png");

    // Test 2: Mobile 390px
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:3000/sociallinks", { waitUntil: "networkidle" });
    const scrollWidth390 = await page.evaluate(() => document.documentElement.scrollWidth);
    console.log("Mobile 390px scrollWidth:", scrollWidth390);
    if (scrollWidth390 > 390) {
      throw new Error(`Horizontal overflow on 390px! scrollWidth=${scrollWidth390}`);
    }
    await page.screenshot({ path: "docs/screenshots/sociallinks-mobile-390.png", fullPage: true });
    console.log("Saved docs/screenshots/sociallinks-mobile-390.png");

    // Test 3: Ultra-compact Mobile 320px
    await page.setViewportSize({ width: 320, height: 600 });
    await page.goto("http://localhost:3000/sociallinks", { waitUntil: "networkidle" });
    const scrollWidth320 = await page.evaluate(() => document.documentElement.scrollWidth);
    console.log("Mobile 320px scrollWidth:", scrollWidth320);
    if (scrollWidth320 > 320) {
      throw new Error(`Horizontal overflow on 320px! scrollWidth=${scrollWidth320}`);
    }
    await page.screenshot({ path: "docs/screenshots/sociallinks-mobile-320.png", fullPage: true });
    console.log("Saved docs/screenshots/sociallinks-mobile-320.png");

    console.log("ALL /sociallinks TESTS PASSED PERFECTLY!");
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
