import { chromium } from "playwright";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

async function run() {
  console.log("Starting verification of Footer Operating Hubs...");

  // Start production server on port 3006
  const server = spawn("npx", ["next", "start", "-p", "3006"], {
    stdio: "inherit",
    shell: true,
  });

  // Wait for server to be up
  let connected = false;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch("http://localhost:3006/india");
      if (res.ok) {
        connected = true;
        break;
      }
    } catch (e) {
      // wait
    }
    await new Promise((r) => setTimeout(r, 1000));
  }

  if (!connected) {
    console.error("Failed to connect to http://localhost:3006");
    server.kill();
    process.exit(1);
  }

  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext();

  const screenshotDir = path.resolve("docs/screenshots");
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  try {
    // 1. Verify India Footer Desktop
    const desktopPage = await context.newPage();
    await desktopPage.setViewportSize({ width: 1440, height: 900 });
    await desktopPage.goto("http://localhost:3006/india", { waitUntil: "networkidle" });

    const footer = desktopPage.locator("footer");
    await footer.scrollIntoViewIfNeeded();

    const expectedCities = [
      "Hyderabad",
      "Bengaluru",
      "Pune",
      "Mumbai",
      "Chennai",
      "Delhi",
      "Noida",
      "Gurgaon",
      "Ahmedabad",
      "Kolkata",
    ];

    const footerText = await footer.innerText();

    console.log("\n--- Checking 10 Cities in India Footer ---");
    let missingCities = [];
    for (const city of expectedCities) {
      if (footerText.includes(city)) {
        console.log(`✓ City found: ${city}`);
      } else {
        console.error(`✗ Missing city: ${city}`);
        missingCities.push(city);
      }
    }

    if (missingCities.length > 0) {
      throw new Error(`Missing cities in India footer: ${missingCities.join(", ")}`);
    }

    console.log("\n--- Checking Absence of 'Branch Office' Text ---");
    const hasBranchOffice = /branch\s+office/i.test(footerText);
    if (hasBranchOffice) {
      throw new Error("Found 'Branch Office' text in footer! Must be removed.");
    }
    console.log("✓ 'Branch Office' text is completely removed from footer!");

    console.log("\n--- Checking Hyderabad Head Office designation ---");
    const hasHeadOffice = footerText.includes("Hyderabad") && /head\s+office/i.test(footerText);
    if (!hasHeadOffice) {
      throw new Error("Hyderabad does not have Head Office label!");
    }
    console.log("✓ Hyderabad correctly designated as Head Office!");

    // Capture desktop footer screenshot
    await footer.screenshot({ path: path.join(screenshotDir, "footer-hubs-desktop.png") });
    console.log("✓ Saved desktop footer screenshot to docs/screenshots/footer-hubs-desktop.png");

    // 2. Mobile Verification
    console.log("\n--- Checking Mobile Viewport (390px) ---");
    const mobilePage = await context.newPage();
    await mobilePage.setViewportSize({ width: 390, height: 844 });
    await mobilePage.goto("http://localhost:3006/india", { waitUntil: "networkidle" });

    const mobileFooter = mobilePage.locator("footer");
    await mobileFooter.scrollIntoViewIfNeeded();

    // Check horizontal scroll
    const scrollWidth = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await mobilePage.evaluate(() => document.documentElement.clientWidth);
    console.log(`Mobile scrollWidth: ${scrollWidth}, clientWidth: ${clientWidth}`);
    if (scrollWidth > clientWidth) {
      throw new Error(`Horizontal overflow detected on mobile: ${scrollWidth} > ${clientWidth}`);
    }
    console.log("✓ Zero horizontal overflow on 390px mobile viewport!");

    await mobileFooter.screenshot({ path: path.join(screenshotDir, "footer-hubs-mobile.png") });
    console.log("✓ Saved mobile footer screenshot to docs/screenshots/footer-hubs-mobile.png");

    // 3. UAE Footer Verification
    console.log("\n--- Checking UAE Footer ---");
    await desktopPage.goto("http://localhost:3006/uae", { waitUntil: "networkidle" });
    const uaeFooter = desktopPage.locator("footer");
    await uaeFooter.scrollIntoViewIfNeeded();
    const uaeFooterText = await uaeFooter.innerText();

    if (!uaeFooterText.includes("Dubai")) {
      throw new Error("UAE footer missing Dubai!");
    }
    console.log("✓ UAE footer preserves Dubai office correctly!");

    console.log("\n==========================================");
    console.log("ALL FOOTER OPERATING HUBS TESTS PASSED! ✓");
    console.log("==========================================");
  } finally {
    await browser.close();
    server.kill();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
