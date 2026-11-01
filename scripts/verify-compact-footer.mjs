import { chromium } from "playwright";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

async function run() {
  console.log("Starting verification of Compact Footer without Mujeeb on India & UAE pages...");

  const port = 3008;
  const server = spawn("npx", ["next", "start", "-p", String(port)], {
    stdio: "inherit",
    shell: true,
  });

  // Wait for server to become responsive
  let connected = false;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://localhost:${port}/india`);
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
    console.error(`Failed to connect to http://localhost:${port}`);
    server.kill();
    process.exit(1);
  }

  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const context = await browser.newContext();

  const screenshotDir = path.resolve("docs/screenshots");
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  try {
    const page = await context.newPage();

    // ==========================================
    // 1. INDIA DESKTOP (1440x900)
    // ==========================================
    console.log("\n--- Testing India Footer on Desktop (1440px) ---");
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`http://localhost:${port}/india`, { waitUntil: "networkidle" });

    const indiaFooter = page.locator("footer");
    await indiaFooter.scrollIntoViewIfNeeded();

    const indiaFooterText = await indiaFooter.innerText();
    const indiaBox = await indiaFooter.boundingBox();

    console.log(`India Desktop Footer Height: ${indiaBox?.height}px`);

    // Verify Mujeeb is NOT in the footer
    if (indiaFooterText.includes("Mujeeb")) {
      throw new Error("FAILED: 'Mujeeb' was found in India footer! Must be removed.");
    }
    console.log("✓ 'Mujeeb' is completely absent from India footer!");

    // Verify Muhammad Asif is in the contact desk
    if (!indiaFooterText.includes("Muhammad Asif")) {
      throw new Error("FAILED: 'Muhammad Asif' is missing from India contact desk!");
    }
    if (!indiaFooterText.includes("+91 9100 77 77 68")) {
      throw new Error("FAILED: Muhammad Asif phone number missing from India footer!");
    }
    if (!indiaFooterText.includes("asif@victorluxurylimousine.com")) {
      throw new Error("FAILED: Muhammad Asif email missing from India footer!");
    }
    console.log("✓ Muhammad Asif is correctly featured in India Direct Contact Desk!");

    // Verify 10 cities and absence of "Branch Office"
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
    for (const city of expectedCities) {
      if (!indiaFooterText.includes(city)) {
        throw new Error(`Missing city in India footer: ${city}`);
      }
    }
    if (/branch\s+office/i.test(indiaFooterText)) {
      throw new Error("Found 'Branch Office' in footer!");
    }
    if (!indiaFooterText.includes("Head Office")) {
      throw new Error("Hyderabad Head Office label missing!");
    }
    console.log("✓ All 10 Operating Hubs present without 'Branch Office' label!");

    // Verify footer height reduction (previous height was >450px, new height should be <= 360px)
    if (indiaBox && indiaBox.height > 360) {
      throw new Error(`India footer height ${indiaBox.height}px is too tall! Expected <= 360px.`);
    }
    console.log(`✓ India footer size is verified compact (${indiaBox?.height}px <= 360px)!`);

    await indiaFooter.screenshot({ path: path.join(screenshotDir, "india-footer-compact-desktop.png") });
    console.log("✓ Saved docs/screenshots/india-footer-compact-desktop.png");

    // ==========================================
    // 2. INDIA MOBILE (390x844)
    // ==========================================
    console.log("\n--- Testing India Footer on Mobile (390px) ---");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`http://localhost:${port}/india`, { waitUntil: "networkidle" });

    const indiaMobileFooter = page.locator("footer");
    await indiaMobileFooter.scrollIntoViewIfNeeded();

    const indiaScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const indiaClientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    console.log(`India Mobile scrollWidth: ${indiaScrollWidth}, clientWidth: ${indiaClientWidth}`);
    if (indiaScrollWidth > indiaClientWidth) {
      throw new Error("Horizontal overflow detected on India mobile!");
    }
    console.log("✓ Zero horizontal overflow on India mobile (390px)!");

    await indiaMobileFooter.screenshot({ path: path.join(screenshotDir, "india-footer-compact-mobile.png") });
    console.log("✓ Saved docs/screenshots/india-footer-compact-mobile.png");

    // ==========================================
    // 3. UAE DESKTOP (1440x900)
    // ==========================================
    console.log("\n--- Testing UAE Footer on Desktop (1440px) ---");
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`http://localhost:${port}/uae`, { waitUntil: "networkidle" });

    const uaeFooter = page.locator("footer");
    await uaeFooter.scrollIntoViewIfNeeded();

    const uaeFooterText = await uaeFooter.innerText();
    const uaeBox = await uaeFooter.boundingBox();

    console.log(`UAE Desktop Footer Height: ${uaeBox?.height}px`);

    // Verify Mujeeb is NOT in the UAE footer
    if (uaeFooterText.includes("Mujeeb")) {
      throw new Error("FAILED: 'Mujeeb' was found in UAE footer! Must be removed.");
    }
    console.log("✓ 'Mujeeb' is completely absent from UAE footer!");

    // Verify UAE Operations & Reservation Desk
    if (!uaeFooterText.includes("UAE Operations & Reservation Desk") && !uaeFooterText.includes("Operations & Reservation Desk")) {
      throw new Error("FAILED: UAE Operations & Reservation Desk missing from UAE footer!");
    }
    if (!uaeFooterText.includes("+971 52 455 2441")) {
      throw new Error("FAILED: UAE phone number missing from UAE footer!");
    }
    if (!uaeFooterText.includes("Dubai")) {
      throw new Error("FAILED: Dubai missing from UAE footer hubs!");
    }
    console.log("✓ UAE Operations Desk and Dubai Hub verified in UAE footer!");

    // Verify UAE footer height reduction
    if (uaeBox && uaeBox.height > 360) {
      throw new Error(`UAE footer height ${uaeBox.height}px is too tall! Expected <= 360px.`);
    }
    console.log(`✓ UAE footer size is verified compact (${uaeBox?.height}px <= 360px)!`);

    await uaeFooter.screenshot({ path: path.join(screenshotDir, "uae-footer-compact-desktop.png") });
    console.log("✓ Saved docs/screenshots/uae-footer-compact-desktop.png");

    // ==========================================
    // 4. UAE MOBILE (390x844)
    // ==========================================
    console.log("\n--- Testing UAE Footer on Mobile (390px) ---");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`http://localhost:${port}/uae`, { waitUntil: "networkidle" });

    const uaeMobileFooter = page.locator("footer");
    await uaeMobileFooter.scrollIntoViewIfNeeded();

    const uaeScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const uaeClientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    console.log(`UAE Mobile scrollWidth: ${uaeScrollWidth}, clientWidth: ${uaeClientWidth}`);
    if (uaeScrollWidth > uaeClientWidth) {
      throw new Error("Horizontal overflow detected on UAE mobile!");
    }
    console.log("✓ Zero horizontal overflow on UAE mobile (390px)!");

    await uaeMobileFooter.screenshot({ path: path.join(screenshotDir, "uae-footer-compact-mobile.png") });
    console.log("✓ Saved docs/screenshots/uae-footer-compact-mobile.png");

    console.log("\n========================================================");
    console.log("ALL COMPACT FOOTER TESTS PASSED SUCCESSFULLY! ✓✓✓");
    console.log("========================================================");
  } finally {
    await browser.close();
    server.kill();
  }
}

run().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});
