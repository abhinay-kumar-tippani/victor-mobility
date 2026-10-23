// Forensic Auditor - Adversarial Stress Test for Milestone 2
import assert from "node:assert";
import fs from "node:fs";

console.log("=== AUDITOR ADVERSARIAL STRESS TEST: MILESTONE 2 ===");

// 1. Inspect IndiaFleetSection source code for prohibited patterns
const src = fs.readFileSync("src/components/fleet/IndiaFleetSection.tsx", "utf8");

// A. Check for hardcoded test flags or mocked passes
const prohibitedPatterns = [
  /mockTest/i,
  /fakePass/i,
  /isTestRunner/i,
  /__test_override__/i,
  /return\s+true;\s*\/\/\s*bypass/i,
  /booking confirmed/i,
  /congratulations.*booked/i,
  /booking id:\s*#/i
];

for (const pattern of prohibitedPatterns) {
  assert(!pattern.test(src), `Prohibited pattern matched: ${pattern}`);
}
console.log("✔ PASS: Zero prohibited fake test patterns or fake booking strings in IndiaFleetSection.tsx");

// B. Check for genuine Next.js Image component usage
assert(src.includes('import Image from "next/image"'), "Must import Next.js Image");
assert(src.includes('<Image'), "Must render <Image component");
assert(src.includes('fill'), "Must use fill prop on vehicle image");
console.log("✔ PASS: Genuine Next.js Image component used with fill prop");

// C. Check responsive grid layout classes
assert(src.includes("grid-cols-1"), "Must support 1 column on mobile");
assert(src.includes("sm:grid-cols-2"), "Must support 2 columns on small screens");
assert(src.includes("lg:grid-cols-3"), "Must support 3 columns on large screens");
assert(src.includes("xl:grid-cols-4"), "Must support 4 columns on extra large screens");
console.log("✔ PASS: Genuine responsive CSS grid with 1 -> 2 -> 3 -> 4 column progression");

// D. Check hash deep linking logic
assert(src.includes("window.location.hash.toLowerCase()"), "Must check lowercase hash");
assert(src.includes("addEventListener(\"hashchange\"") || src.includes("addEventListener('hashchange'"), "Must listen to hashchange");
assert(src.includes("removeEventListener(\"hashchange\"") || src.includes("removeEventListener('hashchange'"), "Must clean up hashchange listener");
assert(src.includes("replaceState"), "Must synchronize URL state via replaceState");
console.log("✔ PASS: Robust hash deep linking with event listener and cleanup");

// E. Check prefill query parameters
assert(src.includes("encodeURIComponent(vehicle.name)"), "Must encode vehicle name in CTA");
assert(src.includes("encodeURIComponent(vehicle.cabType)"), "Must encode cab type in CTA");
console.log("✔ PASS: Proper URL encoding for vehicle and category query params");

// F. Verify mathematical partition against india.json
const indiaData = JSON.parse(fs.readFileSync("src/content/india.json", "utf8"));
const vehicles = indiaData.fleetVehicles;
assert(Array.isArray(vehicles), "fleetVehicles must be an array");
assert(vehicles.length === 10, "Must have exactly 10 vehicles");

const sedans = vehicles.filter(v => v.cabType === "Sedan");
const suvs = vehicles.filter(v => v.cabType === "SUV");
const twelves = vehicles.filter(v => v.cabType === "12 Seater");
const evs = vehicles.filter(v => Boolean(v.isElectric));

assert(sedans.length === 5, `Expected 5 sedans, got ${sedans.length}`);
assert(suvs.length === 4, `Expected 4 suvs, got ${suvs.length}`);
assert(twelves.length === 1, `Expected 1 twelve-seater, got ${twelves.length}`);
assert(evs.length === 4, `Expected 4 evs, got ${evs.length}`);
assert(sedans.length + suvs.length + twelves.length === vehicles.length, "Partition sum must equal 10");

// Check EV cross-category composition
const evSedans = evs.filter(v => v.cabType === "Sedan");
const evSuvs = evs.filter(v => v.cabType === "SUV");
assert(evSedans.length === 3, "EVs must contain 3 sedans (Tigor, Nexon, MG ZS EV)");
assert(evSuvs.length === 1, "EVs must contain 1 SUV (Kia Carens Clavis EV)");
console.log("✔ PASS: Mathematical partition and cross-category EV composition verified");

// G. Check disclaimer and quote pricing
for (const v of vehicles) {
  assert(!v.price, `Vehicle ${v.name} must not have numeric price`);
}
assert(src.includes("Request a quote"), "Card must state 'Request a quote'");
assert(src.includes("Vehicle allocation and pricing are confirmed for your location, dates and requirements."), "Mandatory allocation disclaimer missing");
assert(src.includes("Images show vehicle models; actual assigned vehicles may vary."), "Mandatory model-reference caption missing");
console.log("✔ PASS: Zero numeric prices, quote CTA present, mandatory captions present");

console.log("=== ALL ADVERSARIAL CHECKS PASSED EMPIRICALLY ===");
