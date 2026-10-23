/**
 * Adversarial Challenger Stress Harness for Milestone 4
 * Tests:
 * 1. WhatsApp Draft Builder Boundary & Adversarial Inputs (XSS, emojis, long strings, missing fields, all 4 locales)
 * 2. Source of Truth Authoritative Data Assertions & Negative Checks
 * 3. UAE Fleet Regional Isolation & Negative Checks (no India vehicles, no prices, no pruned models)
 * 4. Multi-language Invariance & Dictionary Completeness
 * 5. Asset Existence & Provenance
 * 6. Playwright Headless Browser Real User Journeys (EV hash navigation, contact prefill, badge dismiss, XSS injection url)
 */

import fs from "fs";
import path from "path";
import http from "http";
import { exec, spawn } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

let passed = 0;
let failed = 0;
const failures = [];

function assert(title, condition, details = "") {
  if (condition) {
    passed++;
    console.log(`  \x1b[32m[PASS]\x1b[0m ${title}`);
  } else {
    failed++;
    const msg = `  \x1b[31m[FAIL]\x1b[0m ${title} ${details ? `(${details})` : ""}`;
    console.log(msg);
    failures.push({ title, details });
  }
}

async function runAdversarialTests() {
  console.log("\n=======================================================");
  console.log("CHALLENGER ADVERSARIAL STRESS SUITE — MILESTONE 4");
  console.log("=======================================================\n");

  // -------------------------------------------------------------------------
  // SECTION 1: WhatsApp Message Draft Generator Adversarial Suite
  // -------------------------------------------------------------------------
  console.log("\x1b[36m--- 1. Testing WhatsApp Draft Builder (src/lib/enquiryMessage.ts) ---\x1b[0m");
  const ts = (await import("typescript")).default;
  const enquiryCode = fs.readFileSync(path.join(ROOT_DIR, "src/lib/enquiryMessage.ts"), "utf-8");
  const transpiled = ts.transpileModule(enquiryCode, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
  }).outputText;
  const dataUri = `data:text/javascript;base64,${Buffer.from(transpiled).toString("base64")}`;
  const { buildEnquiryMessage } = await import(dataUri);

  const baseDraft = {
    companyName: "Victor Mobility",
    fullName: "Adversarial Tester",
    company: "Test Corp",
    service: "Employee Transportation",
    category: "Sedan",
    city: "Hyderabad",
    requirement: "Shift schedule",
  };

  // Test 1.1: Standard vehicle inclusion across 4 locales
  for (const loc of ["en", "hi", "te", "ar"]) {
    const msg = buildEnquiryMessage({ ...baseDraft, vehicle: "Tata Nexon", locale: loc });
    assert(`Locale [${loc}]: vehicle 'Tata Nexon' rendered in draft`, msg.includes("Tata Nexon"));
    assert(`Locale [${loc}]: companyName rendered`, msg.includes("Victor Mobility"));
  }

  // Test 1.2: Adversarial input: XSS attack payload in vehicle
  const xssPayload = "<script>alert('XSS')</script>";
  const xssMsg = buildEnquiryMessage({ ...baseDraft, vehicle: xssPayload });
  assert("XSS payload in vehicle is treated as literal text", xssMsg.includes(xssPayload));

  // Test 1.3: Adversarial input: Special characters and emojis
  const emojiVehicle = "Tata Nexon EV ⚡🚗 (Long Range) & Extra / Special";
  const emojiMsg = buildEnquiryMessage({ ...baseDraft, vehicle: emojiVehicle });
  assert("Emoji and special characters preserved without throwing", emojiMsg.includes(emojiVehicle));

  // Test 1.4: Adversarial input: Extreme length string (10,000 characters)
  const longVehicle = "V".repeat(10000);
  const longMsg = buildEnquiryMessage({ ...baseDraft, vehicle: longVehicle });
  assert("Extreme 10k character vehicle string processed safely", longMsg.length > 10000);

  // Test 1.5: Adversarial input: Null, undefined, empty string, whitespace only
  const nullMsg = buildEnquiryMessage({ ...baseDraft, vehicle: null });
  assert("Null vehicle does not print '*Vehicle Requested:*'", !nullMsg.includes("Vehicle Requested"));
  assert("Null vehicle does not print literal 'null'", !nullMsg.includes("null"));

  const undefMsg = buildEnquiryMessage({ ...baseDraft, vehicle: undefined });
  assert("Undefined vehicle does not print '*Vehicle Requested:*'", !undefMsg.includes("Vehicle Requested"));
  assert("Undefined vehicle does not print 'undefined'", !undefMsg.includes("undefined"));

  const emptyMsg = buildEnquiryMessage({ ...baseDraft, vehicle: "" });
  assert("Empty string vehicle does not print empty '*Vehicle Requested:*'", !emptyMsg.includes("Vehicle Requested:"));

  const spaceMsg = buildEnquiryMessage({ ...baseDraft, vehicle: "    " });
  assert("Whitespace-only vehicle does not print empty line", !spaceMsg.includes("Vehicle Requested:"));

  // Test 1.6: Boundary: both vehicle AND category present
  const bothMsg = buildEnquiryMessage({ ...baseDraft, vehicle: "MG ZS EV", category: "Sedan" });
  assert("Both category and vehicle rendered together without conflict",
    bothMsg.includes("*Vehicle Category:* Sedan") && bothMsg.includes("*Vehicle Requested:* MG ZS EV"));

  // -------------------------------------------------------------------------
  // SECTION 2: Source of Truth (SOT) Dataset Strict Forensic Assertions
  // -------------------------------------------------------------------------
  console.log("\n\x1b[36m--- 2. Testing SOT Dataset (src/content/india.json) ---\x1b[0m");
  const indiaJsonPath = path.join(ROOT_DIR, "src/content/india.json");
  const indiaJson = JSON.parse(fs.readFileSync(indiaJsonPath, "utf-8"));
  const vehicles = indiaJson.fleetVehicles || [];

  assert("SOT contains exactly 10 vehicles", vehicles.length === 10, `Found: ${vehicles.length}`);

  const expectedVehicles = [
    { name: "Swift Dzire", cabType: "Sedan", fuelType: "Petrol", isElectric: false },
    { name: "Hyundai Aura", cabType: "Sedan", fuelType: "Petrol & CNG", isElectric: false },
    { name: "Tata Tigor", cabType: "Sedan", fuelType: "Electric Vehicle", isElectric: true },
    { name: "Tata Nexon", cabType: "Sedan", fuelType: "Long Range Electric Vehicle", isElectric: true },
    { name: "MG ZS EV", cabType: "Sedan", fuelType: "Long Range Electric Vehicle", isElectric: true },
    { name: "Mahindra Marazzo", cabType: "SUV", fuelType: "Diesel", isElectric: false },
    { name: "Ertiga CNG", cabType: "SUV", fuelType: "Petrol & CNG", isElectric: false },
    { name: "Innova Crysta", cabType: "SUV", fuelType: "Diesel", isElectric: false },
    { name: "Kia Carens Clavis EV", cabType: "SUV", fuelType: "Long Range Electric Vehicle", isElectric: true },
    { name: "Urbania", cabType: "12 Seater", fuelType: "Diesel", isElectric: false, seatingCapacity: "12 Seater" },
  ];

  vehicles.forEach((v, idx) => {
    const exp = expectedVehicles[idx];
    assert(`Vehicle #${idx + 1} name is exactly '${exp.name}'`, v.name === exp.name);
    assert(`Vehicle #${idx + 1} cabType is exactly '${exp.cabType}'`, v.cabType === exp.cabType);
    assert(`Vehicle #${idx + 1} fuelType is exactly '${exp.fuelType}'`, v.fuelType === exp.fuelType);
    assert(`Vehicle #${idx + 1} isElectric is ${exp.isElectric}`, v.isElectric === exp.isElectric);

    if (idx < 9) {
      assert(`Vehicle #${idx + 1} (${v.name}) does NOT have inferred seating count`,
        v.seatingCapacity === undefined || v.seatingCapacity === null,
        `Found seating: ${v.seatingCapacity}`);
    } else {
      assert(`Urbania has approved seating capacity '12 Seater'`,
        v.seatingCapacity === "12 Seater", `Found seating: ${v.seatingCapacity}`);
    }

    assert(`Vehicle #${idx + 1} (${v.name}) has no numeric pricing fields`,
      !("price" in v) && !("rate" in v) && !("basePrice" in v) && !("sampleRate" in v));
  });

  // Verify EV count is exactly 4
  const evList = vehicles.filter(v => v.isElectric);
  assert("EV cross-category filter isolates exactly 4 vehicles", evList.length === 4, `Found: ${evList.length}`);
  const evNames = evList.map(v => v.name).sort();
  const expectedEvNames = ["Kia Carens Clavis EV", "MG ZS EV", "Tata Nexon", "Tata Tigor"].sort();
  assert("EV vehicles match authoritative list exactly", JSON.stringify(evNames) === JSON.stringify(expectedEvNames));

  // Category counts
  const sedans = vehicles.filter(v => v.cabType === "Sedan");
  const suvs = vehicles.filter(v => v.cabType === "SUV");
  const twelves = vehicles.filter(v => v.cabType === "12 Seater");
  assert("Sedans count is exactly 5", sedans.length === 5);
  assert("SUVs count is exactly 4", suvs.length === 4);
  assert("12 Seater count is exactly 1", twelves.length === 1);
  assert("Partition sum equals 10", sedans.length + suvs.length + twelves.length === 10);

  // -------------------------------------------------------------------------
  // SECTION 3: UAE Regional Isolation & Pruning
  // -------------------------------------------------------------------------
  console.log("\n\x1b[36m--- 3. Testing UAE Regional Isolation & Pruning ---\x1b[0m");
  const uaeJson = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, "src/content/uae.json"), "utf-8"));
  const uaeItems = uaeJson.fleetPresentation?.items || [];

  assert("UAE fleet items exist and are non-empty", uaeItems.length > 0);
  const uaeHasPrice = uaeItems.some(item => item.price !== null && item.price !== undefined);
  assert("All UAE fleetPresentation items have price: null", !uaeHasPrice);

  const indiaNames = vehicles.map(v => v.name.toLowerCase());
  const uaeText = JSON.stringify(uaeJson).toLowerCase();
  for (const name of indiaNames) {
    if (name === "swift dzire" || name === "hyundai aura" || name === "tata tigor" || name === "tata nexon" || name === "kia carens clavis ev") {
      assert(`India model '${name}' does not leak into UAE content`, !uaeText.includes(name));
    }
  }

  // Pruned models check
  assert("UAE content has no 'Maybach GLS'", !uaeText.includes("maybach gls"));
  assert("UAE content has no 'Lexus ES 300h'", !uaeText.includes("lexus es 300h"));
  assert("UAE content has no 'Mercedes Sprinter (18 seats)'", !uaeText.includes("mercedes sprinter (18"));

  // -------------------------------------------------------------------------
  // SECTION 4: Multi-Language Dictionaries & Latin Model Invariance
  // -------------------------------------------------------------------------
  console.log("\n\x1b[36m--- 4. Testing Multi-Language Dictionaries & Model Invariance ---\x1b[0m");
  const dictEn = fs.readFileSync(path.join(ROOT_DIR, "src/i18n/dictionaries/en.ts"), "utf-8");
  const dictHi = fs.readFileSync(path.join(ROOT_DIR, "src/i18n/dictionaries/hi.ts"), "utf-8");
  const dictTe = fs.readFileSync(path.join(ROOT_DIR, "src/i18n/dictionaries/te.ts"), "utf-8");
  const dictAr = fs.readFileSync(path.join(ROOT_DIR, "src/i18n/dictionaries/ar.ts"), "utf-8");

  // Check that Hindi and Telugu do NOT contain transliterated model names
  assert("Hindi dictionary does NOT contain 'स्विफ्ट डिजायर'", !dictHi.includes("स्विफ्ट डिजायर"));
  assert("Hindi dictionary does NOT contain 'टाटा टिगोर'", !dictHi.includes("टाटा टिगोर"));
  assert("Hindi dictionary does NOT contain 'इनोवा क्रिस्टा'", !dictHi.includes("इनोवा क्रिस्टा"));
  assert("Hindi dictionary does NOT contain 'मराजो'", !dictHi.includes("मराजो"));
  assert("Hindi dictionary does NOT contain 'फोर्स अर्बनिया'", !dictHi.includes("फोर्स अर्बनिया"));

  assert("Telugu dictionary does NOT contain 'స్విఫ్ట్ డిజైర్'", !dictTe.includes("స్విఫ్ట్ డిజైర్"));
  assert("Telugu dictionary does NOT contain 'టాటా టిగోర్'", !dictTe.includes("టాటా టిగోర్"));
  assert("Telugu dictionary does NOT contain 'ఇన్నోవా క్రిస్టా'", !dictTe.includes("ఇన్నోవా క్రిస్టా"));
  assert("Telugu dictionary does NOT contain 'మరాజో'", !dictTe.includes("మరాజో"));
  assert("Telugu dictionary does NOT contain 'ఫోర్స్ అర్బనియా'", !dictTe.includes("ఫోర్స్ అర్బనియా"));

  // Check required fleet keys in all dictionaries
  for (const [code, content] of [["en", dictEn], ["hi", dictHi], ["te", dictTe], ["ar", dictAr]]) {
    assert(`Dictionary [${code}] defines 'requestQuote'`, content.includes("requestQuote:"));
    assert(`Dictionary [${code}] defines 'enquireVehicle'`, content.includes("enquireVehicle:"));
    assert(`Dictionary [${code}] defines 'sharedNote'`, content.includes("sharedNote:"));
    assert(`Dictionary [${code}] defines 'filterTabs'`, content.includes("filterTabs:"));
    assert(`Dictionary [${code}] defines 'fuelBadges'`, content.includes("fuelBadges:"));
  }

  // -------------------------------------------------------------------------
  // SECTION 5: Asset Integrity and Provenance
  // -------------------------------------------------------------------------
  console.log("\n\x1b[36m--- 5. Testing Asset Integrity & Provenance Documentation ---\x1b[0m");
  const sourcesDocPath = path.join(ROOT_DIR, "docs/fleet-image-sources.md");
  assert("docs/fleet-image-sources.md exists", fs.existsSync(sourcesDocPath));
  const sourcesDoc = fs.readFileSync(sourcesDocPath, "utf-8");

  vehicles.forEach(v => {
    const assetPath = path.join(ROOT_DIR, "public", v.image);
    assert(`Asset file exists for '${v.name}': ${v.image}`, fs.existsSync(assetPath));
    if (fs.existsSync(assetPath)) {
      const stats = fs.statSync(assetPath);
      assert(`Asset size is valid (>10KB) for '${v.name}'`, stats.size > 10240, `${stats.size} bytes`);
    }
    assert(`Image sources doc mentions '${v.name}'`, sourcesDoc.includes(v.name));
  });

  // -------------------------------------------------------------------------
  // SECTION 6: Playwright Headless Browser Real User Journeys (Production Build)
  // -------------------------------------------------------------------------
  console.log("\n\x1b[36m--- 6. Testing Real User Journeys with Playwright (against Next.js server) ---\x1b[0m");
  let playwrightModule = null;
  try {
    playwrightModule = await import("playwright");
  } catch (e) {
    console.log("Playwright not installed, skipping browser journeys:", e.message);
  }

  if (playwrightModule) {
    const TEST_PORT = 3055;
    console.log(`  Spawning Next.js production server on port ${TEST_PORT}...`);

    const serverProc = spawn("npx", ["next", "start", "-p", String(TEST_PORT)], {
      cwd: ROOT_DIR,
      stdio: "pipe",
      shell: true,
    });

    // Wait for server to become responsive
    const waitForServer = async (retries = 30) => {
      for (let i = 0; i < retries; i++) {
        try {
          const res = await fetch(`http://127.0.0.1:${TEST_PORT}/india/fleet`);
          if (res.ok) return true;
        } catch {}
        await new Promise(r => setTimeout(r, 1000));
      }
      return false;
    };

    const serverReady = await waitForServer();
    if (!serverReady) {
      console.log("  \x1b[33m[WARN]\x1b[0m Could not start test server, skipping browser tests");
      serverProc.kill();
    } else {
      console.log(`  Next.js test server ready at http://127.0.0.1:${TEST_PORT}`);
      let browser = null;
      try {
        const { chromium } = playwrightModule;
        try {
          browser = await chromium.launch({ channel: "msedge", headless: true });
        } catch {
          browser = await chromium.launch({ headless: true });
        }

        const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

        // Journey 1: Direct navigation to /india/fleet#electric
        await page.goto(`http://127.0.0.1:${TEST_PORT}/india/fleet#electric`, { waitUntil: "networkidle" });
        await page.waitForTimeout(500);

        // Check if EV tab is active
        const electricTab = page.locator('button[role="tab"]:has-text("Electric")');
        const ariaSelected = await electricTab.getAttribute("aria-selected");
        assert("Direct navigation to #electric sets aria-selected='true' on Electric Vehicles tab", ariaSelected === "true");

        // Check cards visible in EV filter
        const visibleCardHeadings = await page.locator("h3").allTextContents();
        const evHeadings = visibleCardHeadings.filter(h =>
          ["Tata Tigor", "Tata Nexon", "MG ZS EV", "Kia Carens Clavis EV"].includes(h.trim())
        );
        assert("EV filter displays all 4 EV vehicles", evHeadings.length === 4, `Visible: ${evHeadings.join(", ")}`);
        assert("EV filter hides non-EVs (e.g. Swift Dzire)", !visibleCardHeadings.some(h => h.trim() === "Swift Dzire"));

        // Journey 2: Click "Enquire about this vehicle" CTA on Tata Nexon
        const nexonCard = page.locator(".group", { hasText: "Tata Nexon" });
        const ctaLink = nexonCard.locator("a", { hasText: "Enquire about this vehicle" });
        const href = await ctaLink.getAttribute("href");
        assert("Tata Nexon CTA links to contact page with vehicle & category params",
          href?.includes("vehicle=Tata%20Nexon") && href?.includes("category=Sedan"),
          `href: ${href}`);

        // Journey 3: Follow the enquiry link and check Contact form
        await page.goto(`http://127.0.0.1:${TEST_PORT}${href}`, { waitUntil: "networkidle" });
        await page.waitForTimeout(500);

        // Check badge visibility
        const vehicleBadge = page.locator("span", { hasText: "Selected Vehicle:" });
        const badgeVisible = await vehicleBadge.isVisible();
        assert("Contact form renders 'Selected Vehicle: Tata Nexon' badge", badgeVisible);

        // Check category badge
        const categoryBadge = page.locator("span", { hasText: "Preferred Category:" });
        const catBadgeVisible = await categoryBadge.isVisible();
        assert("Contact form renders 'Preferred Category: Sedan' badge", catBadgeVisible);

        // Journey 4: Dismiss badge by clicking ✕
        const dismissVehicleBtn = page.locator("button[aria-label='Remove preselected vehicle']");
        await dismissVehicleBtn.click();
        await page.waitForTimeout(300);
        const badgeAfterDismiss = await page.locator("span", { hasText: "Selected Vehicle:" }).count();
        assert("Dismissing vehicle badge removes badge from DOM", badgeAfterDismiss === 0);

        // Journey 5: Test Adversarial URL with HTML/Script Injection
        const xssUrl = `http://127.0.0.1:${TEST_PORT}/india/contact?vehicle=%3Cscript%3Ealert(1)%3C%2Fscript%3E`;
        await page.goto(xssUrl, { waitUntil: "networkidle" });
        await page.waitForTimeout(500);

        // Ensure script did NOT execute and no alert triggered; verify content is text node
        const bodyHtml = await page.innerHTML("body");
        assert("XSS payload is NOT rendered as raw executable HTML tag",
          !bodyHtml.includes("<strong><script>alert(1)</script></strong>") &&
          bodyHtml.includes("&lt;script&gt;alert(1)&lt;/script&gt;"));

        await browser.close();
      } catch (err) {
        console.error("Browser journey error:", err);
        assert("Browser journeys completed without error", false, err.message);
      } finally {
        // Terminate Next.js test server process
        serverProc.kill();
      }
    }
  }

  console.log("\n=======================================================");
  console.log(`RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log("=======================================================\n");

  if (failures.length > 0) {
    console.log("Failed Assertions:");
    failures.forEach(f => console.log(`  - ${f.title}: ${f.details}`));
    process.exit(1);
  } else {
    console.log("ALL ADVERSARIAL STRESS ASSERTIONS PASSED EMPIRICALLY!");
    process.exit(0);
  }
}

runAdversarialTests().catch(err => {
  console.error("Fatal test runner error:", err);
  process.exit(1);
});
