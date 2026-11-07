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
  console.log("Starting Next.js server on port 3000...");
  const server = spawn("npx.cmd", ["next", "start", "-p", "3000"], {
    stdio: "inherit",
    shell: true,
  });

  try {
    await waitForServer("http://localhost:3000/india");
    console.log("Server ready!");

    const browser = await chromium.launch({ channel: "msedge" });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    // Check India navbar
    await page.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
    const indiaNavPhone = await page.locator("header a[href^='tel:']").first();
    const indiaHref = await indiaNavPhone.getAttribute("href");
    const indiaText = await indiaNavPhone.innerText();
    console.log("India Navbar Phone:", { href: indiaHref, text: indiaText.trim() });

    if (indiaHref !== "tel:+919100777768" || !indiaText.includes("+91 91007 77768")) {
      throw new Error(`India Navbar phone mismatch! Expected tel:+919100777768 and +91 91007 77768, got href=${indiaHref}, text=${indiaText}`);
    }

    // Capture navbar screenshot
    const header = await page.locator("header").first();
    await header.screenshot({ path: "docs/screenshots/navbar-phone-india-desktop.png" });
    console.log("Saved docs/screenshots/navbar-phone-india-desktop.png");

    // Check Mobile
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
    const mobileCallBtn = await page.locator("header a[aria-label*='Call']").first();
    const mobileHref = await mobileCallBtn.getAttribute("href");
    const mobileLabel = await mobileCallBtn.getAttribute("aria-label");
    console.log("India Mobile Navbar Call Button:", { href: mobileHref, ariaLabel: mobileLabel });

    if (mobileHref !== "tel:+919100777768" || !mobileLabel?.includes("+91 91007 77768")) {
      throw new Error(`India Mobile Navbar mismatch! Got href=${mobileHref}, label=${mobileLabel}`);
    }

    // Open drawer and check
    const menuBtn = page.locator("header button[aria-controls='mobile-navigation-drawer']");
    await menuBtn.click();
    await page.waitForTimeout(300);
    const drawerCallBtn = page.locator("#mobile-navigation-drawer a[href^='tel:']").first();
    const drawerHref = await drawerCallBtn.getAttribute("href");
    const drawerText = await drawerCallBtn.innerText();
    console.log("India Drawer Call Button:", { href: drawerHref, text: drawerText.trim() });

    if (drawerHref !== "tel:+919100777768" || !drawerText.includes("+91 91007 77768")) {
      throw new Error(`India Drawer phone mismatch! Got href=${drawerHref}, text=${drawerText}`);
    }
    await page.screenshot({ path: "docs/screenshots/navbar-phone-india-mobile.png" });
    console.log("Saved docs/screenshots/navbar-phone-india-mobile.png");

    // Check UAE navbar (desktop)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000/uae", { waitUntil: "networkidle" });
    const uaeNavPhone = await page.locator("header a[href^='tel:']").first();
    const uaeHref = await uaeNavPhone.getAttribute("href");
    const uaeText = await uaeNavPhone.innerText();
    console.log("UAE Navbar Phone:", { href: uaeHref, text: uaeText.trim() });

    console.log("ALL NAVBAR PHONE CHECKS PASSED PERFECTLY!");
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
