import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const indiaData = JSON.parse(fs.readFileSync(path.join(ROOT, "src/content/india.json"), "utf-8"));
const fleetSectionCode = fs.readFileSync(path.join(ROOT, "src/components/fleet/IndiaFleetSection.tsx"), "utf-8");

console.log("================================================================================");
console.log("   CHALLENGER EMPIRICAL VERIFICATION HARNESS - MILESTONE 2");
console.log("================================================================================\n");

let passed = 0;
let failed = 0;

function assertTest(name, condition, details = "") {
  if (condition) {
    passed++;
    console.log(`[PASS] ${name}`);
  } else {
    failed++;
    console.error(`[FAIL] ${name} - Details: ${details}`);
  }
}

// -----------------------------------------------------------------------------
// 1. PARTITION MATH & INVARIANTS ORACLE
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 1: Categorization Counts & Partition Properties ---");

const vehicles = indiaData.fleetVehicles || [];

assertTest("Total vehicles count is exactly 10", vehicles.length === 10, `Got ${vehicles.length}`);

const sedans = vehicles.filter(v => v.cabType === "Sedan");
const suvs = vehicles.filter(v => v.cabType === "SUV");
const twelveSeaters = vehicles.filter(v => v.cabType === "12 Seater");
const electrics = vehicles.filter(v => Boolean(v.isElectric));

assertTest("Sedan category count is exactly 5", sedans.length === 5, `Got ${sedans.length}`);
assertTest("SUV category count is exactly 4", suvs.length === 4, `Got ${suvs.length}`);
assertTest("12 Seater category count is exactly 1", twelveSeaters.length === 1, `Got ${twelveSeaters.length}`);
assertTest("Electric Vehicles category count is exactly 4", electrics.length === 4, `Got ${electrics.length}`);

// Disjoint partition equality
const sumCategories = sedans.length + suvs.length + twelveSeaters.length;
assertTest(
  "Disjoint partition equality: Sedan (5) + SUV (4) + 12 Seater (1) === 10",
  sumCategories === 10 && sumCategories === vehicles.length,
  `Sum is ${sumCategories}`
);

// Verify no overlap between the 3 cabType partitions
const sedanIds = new Set(sedans.map(v => v.id));
const suvIds = new Set(suvs.map(v => v.id));
const twelveIds = new Set(twelveSeaters.map(v => v.id));

const sedanSuvOverlap = sedans.filter(v => suvIds.has(v.id));
const sedanTwelveOverlap = sedans.filter(v => twelveIds.has(v.id));
const suvTwelveOverlap = suvs.filter(v => twelveIds.has(v.id));

assertTest(
  "Cab types form strictly disjoint partitions (no cross-contamination)",
  sedanSuvOverlap.length === 0 && sedanTwelveOverlap.length === 0 && suvTwelveOverlap.length === 0,
  `Overlaps: Sedan/SUV=${sedanSuvOverlap.length}, Sedan/12=${sedanTwelveOverlap.length}, SUV/12=${suvTwelveOverlap.length}`
);

// Verify Electric is a non-disjoint cross-category filter across Sedan and SUV
const evSedans = electrics.filter(v => v.cabType === "Sedan");
const evSuvs = electrics.filter(v => v.cabType === "SUV");
const evTwelve = electrics.filter(v => v.cabType === "12 Seater");

assertTest(
  "EV tab contains exactly 3 Sedans and 1 SUV, and 0 12 Seater vehicles",
  evSedans.length === 3 && evSuvs.length === 1 && evTwelve.length === 0,
  `Got ${evSedans.length} Sedans, ${evSuvs.length} SUVs, ${evTwelve.length} 12 Seaters`
);

const expectedEvNames = ["Tata Tigor", "Tata Nexon", "MG ZS EV", "Kia Carens Clavis EV"];
const actualEvNames = electrics.map(v => v.name);
const evNamesMatch = expectedEvNames.every(n => actualEvNames.includes(n)) && actualEvNames.length === 4;
assertTest(
  "EV tab contains exactly the 4 manager-approved EV models",
  evNamesMatch,
  `Expected ${expectedEvNames.join(", ")}, got ${actualEvNames.join(", ")}`
);

// Strict sequence test
const expectedManagerSequence = [
  "Swift Dzire",
  "Hyundai Aura",
  "Tata Tigor",
  "Tata Nexon",
  "MG ZS EV",
  "Mahindra Marazzo",
  "Ertiga CNG",
  "Innova Crysta",
  "Kia Carens Clavis EV",
  "Urbania",
];
const actualSequence = vehicles.map(v => v.name);
const sequenceMatch = expectedManagerSequence.every((name, i) => actualSequence[i] === name);
assertTest(
  "All Vehicles renders vehicles in strict manager sequence (Swift Dzire to Urbania)",
  sequenceMatch,
  `Sequence mismatch: ${JSON.stringify(actualSequence)}`
);

// -----------------------------------------------------------------------------
// 2. ADVERSARIAL HASH DEEP LINKING BEHAVIOR
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 2: Adversarial Hash Deep Linking Simulation ---");

// Let's simulate the exact logic from IndiaFleetSection.tsx:
class SimulatedFleetSection {
  constructor(initialHash = "") {
    this.hash = initialHash;
    this.activeTab = "all";
    this.historyState = initialHash ? initialHash : "/india/fleet";
    this.applyHash();
  }

  // Exact function from IndiaFleetSection.tsx lines 83-102
  applyHash() {
    const hash = this.hash.toLowerCase();
    if (hash === '#electric' || hash === "#electric-vehicles") {
      this.activeTab = "electric";
    }
  }

  // Exact function from IndiaFleetSection.tsx lines 110-119
  handleTabChange(tabId) {
    this.activeTab = tabId;
    if (tabId === "electric") {
      this.historyState = "#electric";
      this.hash = "#electric";
    } else if (this.hash === "#electric") {
      this.historyState = "/india/fleet";
      this.hash = "";
    }
  }

  // Simulating user changing hash in browser
  simulateHashChange(newHash) {
    this.hash = newHash;
    this.applyHash();
  }
}

// Case 1: Initial mount with #electric
const sim1 = new SimulatedFleetSection("#electric");
assertTest("Initial mount with #electric activates 'electric' tab", sim1.activeTab === "electric");

// Case 2: Initial mount with #ELECTRIC (uppercase)
const sim2 = new SimulatedFleetSection("#ELECTRIC");
assertTest("Initial mount with uppercase #ELECTRIC activates 'electric' tab", sim2.activeTab === "electric");

// Case 3: Initial mount with #Electric (mixed case)
const sim3 = new SimulatedFleetSection("#Electric");
assertTest("Initial mount with mixed-case #Electric activates 'electric' tab", sim3.activeTab === "electric");

// Case 4: Initial mount with #electric-vehicles
const sim4 = new SimulatedFleetSection("#electric-vehicles");
assertTest("Initial mount with #electric-vehicles activates 'electric' tab", sim4.activeTab === "electric");

// Case 5: Initial mount with #unknown hash
const sim5 = new SimulatedFleetSection("#unknown");
assertTest("Initial mount with unknown hash (#unknown) falls back safely to 'all'", sim5.activeTab === "all");

// Case 6: Initial mount with empty hash
const sim6 = new SimulatedFleetSection("");
assertTest("Initial mount with empty hash falls back to 'all'", sim6.activeTab === "all");

// Case 7: Initial mount with #sedan (unsupported deep link)
const sim7 = new SimulatedFleetSection("#sedan");
assertTest("Initial mount with unsupported hash (#sedan) falls back safely to 'all'", sim7.activeTab === "all");

// Case 8: Switching tab to 'sedan' when current hash is #electric
const sim8 = new SimulatedFleetSection("#electric");
sim8.handleTabChange("sedan");
assertTest("Clicking 'sedan' tab changes activeTab to 'sedan'", sim8.activeTab === "sedan");
assertTest("Clicking away from #electric cleans history state to pathname", sim8.historyState === "/india/fleet" && sim8.hash === "");

// Edge Case 9: Adversarial test - Arriving with uppercase #ELECTRIC and clicking another tab
const sim9 = new SimulatedFleetSection("#ELECTRIC");
assertTest("Sim9 activeTab is electric", sim9.activeTab === "electric");
// Notice sim9.hash is "#ELECTRIC".
// When user clicks 'sedan':
sim9.handleTabChange("sedan");
const cleanedUpperHash = (sim9.historyState === "/india/fleet");
assertTest(
  "ADVERSARIAL EDGE CASE: Switching away from uppercase #ELECTRIC cleans history state",
  cleanedUpperHash,
  `History state was '${sim9.historyState}', hash was '${sim9.hash}'. Note: in line 115, 'this.hash === "#electric"' is case-sensitive, so '#ELECTRIC' !== '#electric'!`
);

// Edge Case 10: Adversarial test - Browser Back button: hash changes from #electric to "" via hashchange
const sim10 = new SimulatedFleetSection("#electric");
assertTest("Sim10 initial tab is electric", sim10.activeTab === "electric");
// User presses browser back button, triggering hashchange event with hash = ""
sim10.simulateHashChange("");
const resetOnHashChange = (sim10.activeTab === "all");
assertTest(
  "ADVERSARIAL EDGE CASE: Browser back button clearing hash resets activeTab to 'all'",
  resetOnHashChange,
  `activeTab stayed '${sim10.activeTab}' because applyHash() does not have an else branch to reset activeTab on empty hash!`
);

// -----------------------------------------------------------------------------
// 3. CODE & COMPONENT STATIC ORACLES
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 3: Component Implementation & Accessibility Oracles ---");

assertTest(
  "IndiaFleetSection includes role='tablist'",
  fleetSectionCode.includes('role="tablist"')
);

assertTest(
  "IndiaFleetSection includes role='tab'",
  fleetSectionCode.includes('role="tab"')
);

assertTest(
  "IndiaFleetSection includes aria-selected",
  fleetSectionCode.includes('aria-selected')
);

assertTest(
  "IndiaFleetSection includes role='tabpanel'",
  fleetSectionCode.includes('role="tabpanel"')
);

assertTest(
  "IndiaFleetSection includes keyboard navigation for tabs (ArrowRight, ArrowLeft, Home, End)",
  fleetSectionCode.includes("ArrowRight") &&
  fleetSectionCode.includes("ArrowLeft") &&
  fleetSectionCode.includes("Home") &&
  fleetSectionCode.includes("End")
);

assertTest(
  "IndiaFleetSection includes 'Request a quote'",
  fleetSectionCode.includes("Request a quote")
);

assertTest(
  "IndiaFleetSection card CTA contains ?vehicle= and &category=",
  fleetSectionCode.includes("?vehicle=") && fleetSectionCode.includes("&category=")
);

assertTest(
  "IndiaFleetSection card CTA uses encodeURIComponent",
  fleetSectionCode.includes("encodeURIComponent(vehicle.name)") &&
  fleetSectionCode.includes("encodeURIComponent(vehicle.cabType)")
);

assertTest(
  "IndiaFleetSection displays mandatory image reference caption",
  fleetSectionCode.includes("Images show vehicle models; actual assigned vehicles may vary.")
);

assertTest(
  "IndiaFleetSection displays mandatory allocation disclaimer",
  fleetSectionCode.includes("Vehicle allocation and pricing are confirmed for your location, dates and requirements.")
);

console.log("\n================================================================================");
console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
console.log("================================================================================\n");
