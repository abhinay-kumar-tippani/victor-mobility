import { chromium } from "playwright";

async function testNavbar() {
  const browser = await chromium.launch({ channel: "chrome" });
  const context = await browser.newContext();
  const page = await context.newPage();

  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push(`[Console Error] ${msg.text()}`);
    }
  });
  page.on("pageerror", (err) => {
    errors.push(`[Page Error] ${err.message}`);
  });

  const testUrls = [
    "/india",
    "/india/services",
    "/india/fleet",
    "/india/about",
    "/india/contact",
    "/uae",
    "/uae/services",
    "/uae/fleet",
    "/uae/about",
    "/uae/contact",
  ];

  console.log("=== Testing Navbar Across All Core Pages ===");
  for (const u of testUrls) {
    const res = await page.goto(`http://localhost:3000${u}`, { waitUntil: "networkidle" });
    console.log(`Page: ${u} -> HTTP ${res.status()}`);
    
    // Check header exists
    const headerCount = await page.locator("header").count();
    if (headerCount !== 1) {
      errors.push(`Header count is ${headerCount} on ${u}`);
    }

    // Check all links in header
    const navLinks = await page.$$eval("header a", (anchors) =>
      anchors.map((a) => ({ text: a.textContent.trim(), href: a.getAttribute("href") }))
    );

    for (const link of navLinks) {
      if (!link.href || link.href === "#" || link.href === "") {
        errors.push(`Empty href in navbar on ${u}: ${JSON.stringify(link)}`);
      }
    }
  }

  console.log("\n=== Checking Mobile Drawer Interaction ===");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://localhost:3000/india", { waitUntil: "networkidle" });

  const hamburger = page.locator("button[aria-controls='mobile-navigation-drawer']");
  await hamburger.click();
  await page.waitForTimeout(300);

  const drawerVisible = await page.locator("#mobile-navigation-drawer").isVisible();
  console.log("Mobile drawer visible after click:", drawerVisible);

  // Check drawer links
  const drawerLinks = await page.$$eval("#mobile-navigation-drawer a", (anchors) =>
    anchors.map((a) => ({ text: a.textContent.trim(), href: a.getAttribute("href") }))
  );
  console.log("Drawer links:", drawerLinks);

  console.log("\n=== Errors Encountered ===");
  console.log(errors.length > 0 ? errors : "No errors found!");

  await browser.close();
}

testNavbar();
