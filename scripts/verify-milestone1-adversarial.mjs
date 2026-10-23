/**
 * Adversarial Verification Oracle for Milestone 1:
 * Authoritative Fleet Dataset Replacement & Pricing Sanitization
 */

import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();

const EXPECTED_VEHICLES = [
  { name: "Swift Dzire", cabType: "Sedan", fuelType: "Petrol", isElectric: false },
  { name: "Hyundai Aura", cabType: "Sedan", fuelType: "Petrol & CNG", isElectric: false },
  { name: "Tata Tigor", cabType: "Sedan", fuelType: "Electric Vehicle", isElectric: true },
  { name: "Tata Nexon", cabType: "Sedan", fuelType: "Long Range Electric Vehicle", isElectric: true },
  { name: "MG ZS EV", cabType: "Sedan", fuelType: "Long Range Electric Vehicle", isElectric: true },
  { name: "Mahindra Marazzo", cabType: "SUV", fuelType: "Diesel", isElectric: false },
  { name: "Ertiga CNG", cabType: "SUV", fuelType: "Petrol & CNG", isElectric: false },
  { name: "Innova Crysta", cabType: "SUV", fuelType: "Diesel", isElectric: false },
  { name: "Kia Carens Clavis EV", cabType: "SUV", fuelType: "Long Range Electric Vehicle", isElectric: true },
  { name: "Urbania", cabType: "12 Seater", fuelType: "Diesel", isElectric: false },
];

const MANDATORY_SHARED_NOTE = "Vehicle allocation and pricing are confirmed for your location, dates and requirements.";
const LEGACY_PRICES = ["2200", "3800", "7200", "6500"];
const OBSOLETE_VEHICLE_PATTERNS = [
  /\bEtios\b/i,
  /\bToyota Etios\b/i,
  /\bCamry\b/i,
  /\bToyota Camry\b/i,
  /\bTempo Traveller\b/i,
  /\bTempo Traveler\b/i,
];

const results = [];

function test(name, fn) {
  try {
    fn();
    results.push({ name, passed: true });
    console.log(`  [PASS] ${name}`);
  } catch (err) {
    results.push({ name, passed: false, error: err.message });
    console.error(`  [FAIL] ${name}: ${err.message}`);
  }
}

console.log("=================================================================");
console.log("  MILENSTONE 1 ADVERSARIAL VERIFICATION ORACLE");
console.log("=================================================================\n");

// 1. JSON Validity
console.log("--- Section 1: JSON Validity ---");
let indiaJson = null;
let rateCardJson = null;
let corridorsJson = null;
let indiaRaw = "";
let rateCardRaw = "";
let corridorsRaw = "";

test("india.json must exist and be valid JSON", () => {
  const filePath = path.join(ROOT_DIR, "src/content/india.json");
  indiaRaw = fs.readFileSync(filePath, "utf-8");
  indiaJson = JSON.parse(indiaRaw);
  if (!indiaJson || typeof indiaJson !== "object") throw new Error("Parsed india.json is not an object");
});

test("rate-card.json must exist and be valid JSON", () => {
  const filePath = path.join(ROOT_DIR, "src/content/rate-card.json");
  rateCardRaw = fs.readFileSync(filePath, "utf-8");
  rateCardJson = JSON.parse(rateCardRaw);
  if (!rateCardJson || typeof rateCardJson !== "object") throw new Error("Parsed rate-card.json is not an object");
});

test("corridors.json must exist and be valid JSON", () => {
  const filePath = path.join(ROOT_DIR, "src/content/corridors.json");
  corridorsRaw = fs.readFileSync(filePath, "utf-8");
  corridorsJson = JSON.parse(corridorsRaw);
  if (!corridorsJson || typeof corridorsJson !== "object") throw new Error("Parsed corridors.json is not an object");
});

// 2. fleetVehicles Array Integrity
console.log("\n--- Section 2: Fleet Vehicles Array Integrity ---");
test("fleetVehicles must exist and be an array of exactly 10 items", () => {
  if (!Array.isArray(indiaJson.fleetVehicles)) {
    throw new Error("india.fleetVehicles is not an array");
  }
  if (indiaJson.fleetVehicles.length !== 10) {
    throw new Error(`Expected exactly 10 fleetVehicles, but found ${indiaJson.fleetVehicles.length}`);
  }
});

test("fleetVehicles exact order and names must match manager-approved list", () => {
  const actualNames = indiaJson.fleetVehicles.map((v) => v.name);
  const expectedNames = EXPECTED_VEHICLES.map((v) => v.name);
  for (let i = 0; i < 10; i++) {
    if (actualNames[i] !== expectedNames[i]) {
      throw new Error(`At index ${i}: expected name "${expectedNames[i]}", got "${actualNames[i]}"`);
    }
  }
});

test("fleetVehicles cabType and fuelType must strictly match manager directive", () => {
  for (let i = 0; i < 10; i++) {
    const actual = indiaJson.fleetVehicles[i];
    const expected = EXPECTED_VEHICLES[i];
    if (actual.cabType !== expected.cabType) {
      throw new Error(`Vehicle ${actual.name}: expected cabType "${expected.cabType}", got "${actual.cabType}"`);
    }
    if (actual.fuelType !== expected.fuelType) {
      throw new Error(`Vehicle ${actual.name}: expected fuelType "${expected.fuelType}", got "${actual.fuelType}"`);
    }
    if (actual.isElectric !== expected.isElectric) {
      throw new Error(`Vehicle ${actual.name}: expected isElectric ${expected.isElectric}, got ${actual.isElectric}`);
    }
  }
});

test("Category distribution counts must evaluate to Sedan: 5, SUV: 4, 12 Seater: 1, Electric: 4", () => {
  const sedans = indiaJson.fleetVehicles.filter((v) => v.cabType === "Sedan");
  const suvs = indiaJson.fleetVehicles.filter((v) => v.cabType === "SUV");
  const twelveSeaters = indiaJson.fleetVehicles.filter((v) => v.cabType === "12 Seater");
  const electrics = indiaJson.fleetVehicles.filter((v) => v.isElectric === true);

  if (sedans.length !== 5) throw new Error(`Expected 5 Sedans, found ${sedans.length}`);
  if (suvs.length !== 4) throw new Error(`Expected 4 SUVs, found ${suvs.length}`);
  if (twelveSeaters.length !== 1) throw new Error(`Expected 1 12 Seater, found ${twelveSeaters.length}`);
  if (electrics.length !== 4) throw new Error(`Expected 4 Electric vehicles, found ${electrics.length}`);
});

test("Every fleetVehicle must have valid id, non-empty image, and imageAlt", () => {
  const ids = new Set();
  for (const v of indiaJson.fleetVehicles) {
    if (!v.id || typeof v.id !== "string") throw new Error(`Vehicle ${v.name} missing valid id`);
    if (ids.has(v.id)) throw new Error(`Duplicate vehicle id: ${v.id}`);
    ids.add(v.id);
    if (!v.image || typeof v.image !== "string" || !v.image.startsWith("/images/fleet/")) {
      throw new Error(`Vehicle ${v.name} has invalid image path: ${v.image}`);
    }
    if (!v.imageAlt || typeof v.imageAlt !== "string") {
      throw new Error(`Vehicle ${v.name} missing imageAlt`);
    }
  }
});

test("No inferred seat counts on vehicles 1 to 9 (only Urbania 12 Seater authorized)", () => {
  const seatRegex = /\b(\d+)\s*(?:-| )?(?:seater|seats|seat|person|passengers)\b/i;
  for (let i = 0; i < 9; i++) {
    const v = indiaJson.fleetVehicles[i];
    const textToCheck = `${v.name} ${v.cabType} ${v.fuelType} ${v.description || ""}`;
    const match = textToCheck.match(seatRegex);
    if (match) {
      throw new Error(`Vehicle ${v.name} contains unauthorized inferred seat count: "${match[0]}"`);
    }
  }
  // Check Urbania has 12 Seater cabType
  if (indiaJson.fleetVehicles[9].cabType !== "12 Seater") {
    throw new Error(`Urbania expected cabType "12 Seater", got "${indiaJson.fleetVehicles[9].cabType}"`);
  }
});

// 3. Pricing Sanitization
console.log("\n--- Section 3: Pricing Sanitization & Zero Legacy Pricing ---");
test("Zero occurrences of legacy pricing values (2200, 3800, 7200, 6500) in india.json", () => {
  for (const price of LEGACY_PRICES) {
    const regex = new RegExp(`(?<!\\d)${price}(?!\\d)`, "g");
    const matches = indiaRaw.match(regex);
    if (matches && matches.length > 0) {
      throw new Error(`Found ${matches.length} occurrences of legacy price ${price} in india.json`);
    }
  }
});

test("fleetPresentation.items must all have price: null", () => {
  const items = indiaJson.fleetPresentation?.items;
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("fleetPresentation.items is missing or empty");
  }
  for (const item of items) {
    if (item.price !== null) {
      throw new Error(`Item ${item.id} has non-null price: ${item.price}`);
    }
  }
});

test("fleetPresentation must not contain pricingSource", () => {
  if ("pricingSource" in indiaJson.fleetPresentation) {
    throw new Error("fleetPresentation still contains obsolete property 'pricingSource'");
  }
});

test("corridors.json india.corridors must all have basePrice: null and Quote on request", () => {
  const corridors = corridorsJson.india?.corridors;
  if (!Array.isArray(corridors) || corridors.length === 0) {
    throw new Error("corridors.json india.corridors is missing or empty");
  }
  for (const cor of corridors) {
    if (cor.basePrice !== null) {
      throw new Error(`Corridor ${cor.id} has non-null basePrice: ${cor.basePrice}`);
    }
    for (const [tier, priceVal] of Object.entries(cor.priceRange || {})) {
      if (priceVal !== "Quote on request") {
        throw new Error(`Corridor ${cor.id} tier ${tier} priceRange is not "Quote on request": "${priceVal}"`);
      }
    }
  }
});

test("rate-card.json india.categories must have quote guidance instead of numeric prices", () => {
  const categories = rateCardJson.india?.categories;
  if (!Array.isArray(categories) || categories.length === 0) {
    throw new Error("rate-card.json india.categories is missing or empty");
  }
  for (const cat of categories) {
    for (const [slab, rateVal] of Object.entries(cat.rates || {})) {
      if (typeof rateVal !== "string") {
        throw new Error(`Category ${cat.id} slab ${slab} is not a string: ${rateVal}`);
      }
      // Must not contain currency symbol ₹ or standalone price digits not part of package limits (like 120 km or 4h)
      if (/₹|\b(?:rs|inr)\b/i.test(rateVal)) {
        throw new Error(`Category ${cat.id} slab ${slab} contains currency symbol: "${rateVal}"`);
      }
      // Check if value is pure numeric or looks like a monetary price
      const strippedOfLimits = rateVal.replace(/\b\d+\s*(?:km|h|hr|hrs|hours)\b/gi, "");
      if (/\b\d{3,}\b/.test(strippedOfLimits)) {
        throw new Error(`Category ${cat.id} slab ${slab} contains numeric price: "${rateVal}"`);
      }
    }
  }
});

// 4. Obsolete Vehicle Removal
console.log("\n--- Section 4: Obsolete Vehicles Purge Across Active India Routes ---");
test("Zero occurrences of obsolete models (Etios, Camry, Tempo Traveller) across active India content", () => {
  const filesToScan = [
    { name: "src/content/india.json", raw: indiaRaw },
    { name: "src/content/rate-card.json", raw: rateCardRaw },
    { name: "src/content/corridors.json", raw: corridorsRaw },
  ];

  for (const file of filesToScan) {
    for (const pattern of OBSOLETE_VEHICLE_PATTERNS) {
      if (pattern.test(file.raw)) {
        throw new Error(`File ${file.name} contains obsolete vehicle matching ${pattern}`);
      }
    }
  }
});

test("Zero occurrences of obsolete models in planning components", () => {
  const componentPaths = [
    "src/components/planning/JourneyEstimator.tsx",
    "src/components/planning/RfpDesk.tsx",
    "src/components/rfp/CorporateRfpBuilder.tsx",
  ];

  for (const relPath of componentPaths) {
    const fullPath = path.join(ROOT_DIR, relPath);
    if (!fs.existsSync(fullPath)) continue;
    const content = fs.readFileSync(fullPath, "utf-8");
    for (const pattern of OBSOLETE_VEHICLE_PATTERNS) {
      if (pattern.test(content)) {
        throw new Error(`Component ${relPath} contains obsolete vehicle matching ${pattern}`);
      }
    }
  }
});

// 5. Mandatory Shared Note Verbatim Check
console.log("\n--- Section 5: Mandatory Shared Note Verbatim Presence ---");
test("Mandatory shared note must appear verbatim in india.json fleetPresentation.priceNote", () => {
  if (indiaJson.fleetPresentation?.priceNote !== MANDATORY_SHARED_NOTE) {
    throw new Error(`fleetPresentation.priceNote is not verbatim:\nExpected: "${MANDATORY_SHARED_NOTE}"\nActual: "${indiaJson.fleetPresentation?.priceNote}"`);
  }
});

test("Mandatory shared note must appear verbatim in india.json fleetPresentation.sharedNote", () => {
  if (indiaJson.fleetPresentation?.sharedNote !== MANDATORY_SHARED_NOTE) {
    throw new Error(`fleetPresentation.sharedNote is not verbatim:\nExpected: "${MANDATORY_SHARED_NOTE}"\nActual: "${indiaJson.fleetPresentation?.sharedNote}"`);
  }
});

test("Mandatory shared note must appear verbatim in india.json fleetNote", () => {
  if (indiaJson.fleetNote !== MANDATORY_SHARED_NOTE) {
    throw new Error(`india.fleetNote is not verbatim:\nExpected: "${MANDATORY_SHARED_NOTE}"\nActual: "${indiaJson.fleetNote}"`);
  }
});

test("Mandatory shared note must appear verbatim in rate-card.json india.description", () => {
  if (!rateCardJson.india?.description?.includes(MANDATORY_SHARED_NOTE)) {
    throw new Error(`rate-card.json india.description does not contain mandatory shared note verbatim`);
  }
});

test("Mandatory shared note must appear verbatim in corridors.json india.note", () => {
  if (!corridorsJson.india?.note?.includes(MANDATORY_SHARED_NOTE)) {
    throw new Error(`corridors.json india.note does not contain mandatory shared note verbatim`);
  }
});

test("Mandatory shared note must appear in JourneyEstimator.tsx", () => {
  const estimatorPath = path.join(ROOT_DIR, "src/components/planning/JourneyEstimator.tsx");
  const content = fs.readFileSync(estimatorPath, "utf-8");
  if (!content.includes(MANDATORY_SHARED_NOTE)) {
    throw new Error(`JourneyEstimator.tsx does not contain mandatory shared note verbatim`);
  }
});

// 6. Adversarial Edge Case & Schema Checks
console.log("\n--- Section 6: Adversarial Edge Cases & Interface Conformance ---");
test("Sedan filter returns exactly 5 vehicles (including Tigor, Nexon, MG ZS EV)", () => {
  const sedans = indiaJson.fleetVehicles.filter((v) => v.cabType === "Sedan");
  const sedanNames = sedans.map((v) => v.name);
  if (!sedanNames.includes("Tata Tigor")) throw new Error("Tata Tigor missing from Sedans");
  if (!sedanNames.includes("Tata Nexon")) throw new Error("Tata Nexon missing from Sedans");
  if (!sedanNames.includes("MG ZS EV")) throw new Error("MG ZS EV missing from Sedans");
  if (sedans.length !== 5) throw new Error(`Sedan count is ${sedans.length}, expected 5`);
});

test("Electric filter returns exactly 4 vehicles across categories", () => {
  const evs = indiaJson.fleetVehicles.filter((v) => v.isElectric);
  const evNames = evs.map((v) => v.name);
  const expectedEvNames = ["Tata Tigor", "Tata Nexon", "MG ZS EV", "Kia Carens Clavis EV"];
  for (const name of expectedEvNames) {
    if (!evNames.includes(name)) throw new Error(`EV filter missing expected vehicle "${name}"`);
  }
  if (evs.length !== 4) throw new Error(`EV count is ${evs.length}, expected 4`);
});

test("SUV filter returns exactly 4 vehicles (including Kia Carens Clavis EV)", () => {
  const suvs = indiaJson.fleetVehicles.filter((v) => v.cabType === "SUV");
  const suvNames = suvs.map((v) => v.name);
  if (!suvNames.includes("Kia Carens Clavis EV")) throw new Error("Kia Carens Clavis EV missing from SUVs");
  if (suvs.length !== 4) throw new Error(`SUV count is ${suvs.length}, expected 4`);
});

test("Total union of category counts equals total fleet count (no orphan vehicles)", () => {
  const sedans = indiaJson.fleetVehicles.filter((v) => v.cabType === "Sedan").length;
  const suvs = indiaJson.fleetVehicles.filter((v) => v.cabType === "SUV").length;
  const twelve = indiaJson.fleetVehicles.filter((v) => v.cabType === "12 Seater").length;
  if (sedans + suvs + twelve !== 10) {
    throw new Error(`Category sum (${sedans + suvs + twelve}) does not equal 10`);
  }
});

// Summary
console.log("\n=================================================================");
console.log("  TEST SUMMARY");
console.log("=================================================================");
const passedCount = results.filter((r) => r.passed).length;
const failedCount = results.filter((r) => !r.passed).length;
console.log(`Total Tests : ${results.length}`);
console.log(`Passed      : ${passedCount}`);
console.log(`Failed      : ${failedCount}`);

if (failedCount > 0) {
  console.log("\nFAILED TESTS:");
  for (const r of results.filter((r) => !r.passed)) {
    console.log(`  - ${r.name}: ${r.error}`);
  }
  process.exit(1);
} else {
  console.log("\nALL VERIFICATION CHECKS PASSED EMPIRICALLY!");
  process.exit(0);
}
