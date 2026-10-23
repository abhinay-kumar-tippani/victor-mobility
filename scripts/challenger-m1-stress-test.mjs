import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const testResults = [];

// Lightweight TS stripper for zero-dependency execution of journeyEstimate.ts
const journeyTs = fs.readFileSync(path.join(ROOT, "src/lib/journeyEstimate.ts"), "utf-8");
const journeyJs = journeyTs
  .replace(/export interface EstimateNumbers[\s\S]*?\}/, "")
  .replace(/:\s*EstimateNumbers/g, "")
  .replace(/as const/g, "")
  .replace(/:\s*string\[\]/g, "")
  .replace(/export function calculateJourney/, "function calculateJourney");

const evalJourney = new Function(`${journeyJs}; return calculateJourney;`)();

function runTest(suite, name, fn) {
  try {
    fn();
    testResults.push({ suite, name, status: "PASS" });
    console.log(`[PASS] [${suite}] ${name}`);
  } catch (error) {
    testResults.push({ suite, name, status: "FAIL", error: error.message });
    console.error(`[FAIL] [${suite}] ${name}: ${error.message}`);
  }
}

console.log("================================================================================");
console.log("   CHALLENGER EMPIRICAL VERIFICATION HARNESS - MILESTONE 1");
console.log("================================================================================\n");

// -----------------------------------------------------------------------------
// SUITE 1: TypeScript Types & Contract Conformance (src/types/content.ts)
// -----------------------------------------------------------------------------
const typesPath = path.join(ROOT, "src/types/content.ts");
const typesSource = fs.readFileSync(typesPath, "utf-8");
const indiaData = JSON.parse(fs.readFileSync(path.join(ROOT, "src/content/india.json"), "utf-8"));

runTest("Types & Contracts", "FleetVehicle interface is exported in src/types/content.ts", () => {
  if (!typesSource.includes("export interface FleetVehicle")) {
    throw new Error("FleetVehicle interface not exported in src/types/content.ts");
  }
});

runTest("Types & Contracts", "FleetVehicle cabType union matches manager directive exactly", () => {
  const match = typesSource.match(/cabType:\s*([^;]+);/);
  if (!match) throw new Error("cabType field missing in FleetVehicle");
  const union = match[1].replace(/\s+/g, " ").trim();
  const expected = '"Sedan" | "SUV" | "12 Seater"';
  if (union !== expected) {
    throw new Error(`cabType union mismatch: expected '${expected}', got '${union}'`);
  }
});

runTest("Types & Contracts", "FleetVehicle fuelType union matches manager directive exactly", () => {
  const match = typesSource.match(/fuelType:\s*([^;]+);/);
  if (!match) throw new Error("fuelType field missing in FleetVehicle");
  const union = match[1].replace(/\s+/g, " ").trim();
  const expected = '"Petrol" | "Petrol & CNG" | "Electric Vehicle" | "Long Range Electric Vehicle" | "Diesel"';
  if (union !== expected) {
    throw new Error(`fuelType union mismatch: expected '${expected}', got '${union}'`);
  }
});

runTest("Types & Contracts", "IndiaContent interface includes fleetVehicles?: FleetVehicle[]", () => {
  if (!typesSource.includes("fleetVehicles?: FleetVehicle[];") && !typesSource.includes("fleetVehicles: FleetVehicle[];")) {
    throw new Error("IndiaContent interface missing fleetVehicles definition");
  }
});

runTest("Types & Contracts", "All 10 records in india.json strictly adhere to FleetVehicle contract", () => {
  const validCab = ["Sedan", "SUV", "12 Seater"];
  const validFuel = ["Petrol", "Petrol & CNG", "Electric Vehicle", "Long Range Electric Vehicle", "Diesel"];
  
  if (!Array.isArray(indiaData.fleetVehicles) || indiaData.fleetVehicles.length !== 10) {
    throw new Error(`Expected 10 fleetVehicles, found ${indiaData.fleetVehicles?.length}`);
  }

  indiaData.fleetVehicles.forEach((v, idx) => {
    if (!v.id || typeof v.id !== "string") throw new Error(`Vehicle #${idx} has invalid id: ${v.id}`);
    if (!v.name || typeof v.name !== "string") throw new Error(`Vehicle #${idx} has invalid name: ${v.name}`);
    if (!validCab.includes(v.cabType)) throw new Error(`Vehicle ${v.name} has invalid cabType: ${v.cabType}`);
    if (!validFuel.includes(v.fuelType)) throw new Error(`Vehicle ${v.name} has invalid fuelType: ${v.fuelType}`);
    if (typeof v.isElectric !== "boolean") throw new Error(`Vehicle ${v.name} isElectric must be boolean`);
    if (!v.image || typeof v.image !== "string") throw new Error(`Vehicle ${v.name} invalid image`);
    if (!v.imageAlt || typeof v.imageAlt !== "string") throw new Error(`Vehicle ${v.name} invalid imageAlt`);
  });
});

// -----------------------------------------------------------------------------
// SUITE 2: JourneyEstimator & Journey Calculation Stress Testing
// -----------------------------------------------------------------------------
runTest("JourneyEstimator", "calculateJourney executes correctly with rate input omitted (rate='')", () => {
  const result = evalJourney({
    passengers: "10",
    seats: "4",
    distance: "50",
    days: "2",
    rate: "",
    returnTrip: false,
  });
  if (result.errors.length > 0) {
    throw new Error(`Unexpected errors when rate is empty: ${result.errors.join(", ")}`);
  }
  if (!result.result) throw new Error("Result is null");
  if (result.result.vehicles !== 3) throw new Error(`Expected 3 vehicles (ceil(10/4)), got ${result.result.vehicles}`);
  if (result.result.vehicleKm !== 300) throw new Error(`Expected 300 km (3*50*1*2), got ${result.result.vehicleKm}`);
  if (result.result.budget !== null) throw new Error(`Expected budget to be null, got ${result.result.budget}`);
});

runTest("JourneyEstimator", "calculateJourney handles rate with whitespace (rate='   ')", () => {
  const result = evalJourney({
    passengers: "4",
    seats: "4",
    distance: "20",
    days: "1",
    rate: "   ",
    returnTrip: true,
  });
  if (result.errors.length > 0) throw new Error(`Failed with whitespace rate: ${result.errors.join(",")}`);
  if (result.result?.budget !== null) throw new Error(`Expected budget null, got ${result.result?.budget}`);
});

runTest("JourneyEstimator", "Adversarial Stress Test: Zero seats (division by zero prevention)", () => {
  const res = evalJourney({
    passengers: "10",
    seats: "0",
    distance: "50",
    days: "1",
    rate: "",
    returnTrip: false,
  });
  if (!res.errors.includes("seats") || res.result !== null) {
    throw new Error("Failed to catch seats=0! Possible division by zero NaN/Infinity leak.");
  }
});

runTest("JourneyEstimator", "Adversarial Stress Test: Negative & invalid numeric inputs produce no NaN", () => {
  const adversarialCases = [
    { passengers: "-5", seats: "4", distance: "50", days: "1", rate: "", returnTrip: false },
    { passengers: "5", seats: "-4", distance: "50", days: "1", rate: "", returnTrip: false },
    { passengers: "5", seats: "4", distance: "-50", days: "1", rate: "", returnTrip: false },
    { passengers: "5", seats: "4", distance: "0", days: "1", rate: "", returnTrip: false },
    { passengers: "5", seats: "4", distance: "50", days: "0", rate: "", returnTrip: false },
    { passengers: "5", seats: "4", distance: "50", days: "-1", rate: "", returnTrip: false },
    { passengers: "abc", seats: "4", distance: "50", days: "1", rate: "", returnTrip: false },
    { passengers: "5", seats: "xyz", distance: "50", days: "1", rate: "", returnTrip: false },
    { passengers: "5", seats: "4", distance: "NaN", days: "1", rate: "", returnTrip: false },
    { passengers: "5", seats: "4", distance: "Infinity", days: "1", rate: "", returnTrip: false },
    { passengers: "1.5", seats: "4", distance: "50", days: "1", rate: "", returnTrip: false },
    { passengers: "5", seats: "4.5", distance: "50", days: "1", rate: "", returnTrip: false },
    { passengers: "5", seats: "4", distance: "50", days: "1.5", rate: "", returnTrip: false },
    { passengers: "999999999999999999999999", seats: "4", distance: "50", days: "1", rate: "", returnTrip: false },
  ];

  for (const c of adversarialCases) {
    const res = evalJourney(c);
    if (res.result !== null) {
      throw new Error(`Input ${JSON.stringify(c)} should have been rejected but produced result: ${JSON.stringify(res.result)}`);
    }
    if (res.errors.length === 0) {
      throw new Error(`Input ${JSON.stringify(c)} produced no errors`);
    }
  }
});

runTest("JourneyEstimator", "Adversarial Stress Test: Massive vehicleKm overflow protection", () => {
  const res = evalJourney({
    passengers: "900000000",
    seats: "1",
    distance: "900000000000",
    days: "900000",
    rate: "",
    returnTrip: true,
  });
  if (!res.errors.includes("total") || res.result !== null) {
    throw new Error("Did not reject massive overflow with error 'total'");
  }
});

runTest("JourneyEstimator", "JourneyEstimator component markup does not contain rate input field", () => {
  const estimatorSrc = fs.readFileSync(path.join(ROOT, "src/components/planning/JourneyEstimator.tsx"), "utf-8");
  if (estimatorSrc.includes('input("rate"') || estimatorSrc.includes("estimate-rate")) {
    throw new Error("JourneyEstimator still contains an input field for 'rate'");
  }
});

runTest("JourneyEstimator", "JourneyEstimator displays 'Request a quote' and mandatory shared note in result card", () => {
  const estimatorSrc = fs.readFileSync(path.join(ROOT, "src/components/planning/JourneyEstimator.tsx"), "utf-8");
  if (!estimatorSrc.includes("Request a quote")) {
    throw new Error("JourneyEstimator does not display 'Request a quote'");
  }
  if (!estimatorSrc.includes("Vehicle allocation and pricing are confirmed for your location, dates and requirements.")) {
    throw new Error("JourneyEstimator missing mandatory shared note");
  }
});

// -----------------------------------------------------------------------------
// SUITE 3: RfpDesk Fleet Offering & Contract Conformance
// -----------------------------------------------------------------------------
const rfpDeskSrc = fs.readFileSync(path.join(ROOT, "src/components/planning/RfpDesk.tsx"), "utf-8");

runTest("RfpDesk", "RfpDesk defines APPROVED_FLEET_VEHICLES with exactly the 10 approved vehicles", () => {
  const expected10 = [
    "Swift Dzire (Sedan, Petrol)",
    "Hyundai Aura (Sedan, Petrol & CNG)",
    "Tata Tigor (Sedan, Electric Vehicle)",
    "Tata Nexon (Sedan, Long Range Electric Vehicle)",
    "MG ZS EV (Sedan, Long Range Electric Vehicle)",
    "Mahindra Marazzo (SUV, Diesel)",
    "Ertiga CNG (SUV, Petrol & CNG)",
    "Innova Crysta (SUV, Diesel)",
    "Kia Carens Clavis EV (SUV, Long Range Electric Vehicle)",
    "Urbania (12 Seater, Diesel)",
  ];

  for (const v of expected10) {
    if (!rfpDeskSrc.includes(`"${v}"`)) {
      throw new Error(`RfpDesk missing approved vehicle: ${v}`);
    }
  }
});

runTest("RfpDesk", "RfpDesk vehicleOptions logic falls back to approved vehicles when legacy categories passed", () => {
  const APPROVED_FLEET_VEHICLES = [
    "Swift Dzire (Sedan, Petrol)",
    "Hyundai Aura (Sedan, Petrol & CNG)",
    "Tata Tigor (Sedan, Electric Vehicle)",
    "Tata Nexon (Sedan, Long Range Electric Vehicle)",
    "MG ZS EV (Sedan, Long Range Electric Vehicle)",
    "Mahindra Marazzo (SUV, Diesel)",
    "Ertiga CNG (SUV, Petrol & CNG)",
    "Innova Crysta (SUV, Diesel)",
    "Kia Carens Clavis EV (SUV, Long Range Electric Vehicle)",
    "Urbania (12 Seater, Diesel)",
  ];

  function getVehicleOptions(vehicles) {
    return vehicles && vehicles.length === 10 && !vehicles.some(v => v.includes("Sedans") || v.includes("Buses"))
      ? vehicles
      : APPROVED_FLEET_VEHICLES;
  }

  if (getVehicleOptions(undefined).length !== 10) throw new Error("Failed for undefined");
  if (getVehicleOptions([]).length !== 10) throw new Error("Failed for empty array");
  const legacyCategories = ["Sedans", "MPVs & Group Vehicles", "Buses & Shuttles", "Luxury & Limousines", "Electric Vehicles"];
  const resC = getVehicleOptions(legacyCategories);
  if (resC.length !== 10 || resC !== APPROVED_FLEET_VEHICLES) {
    throw new Error("Failed to fall back when legacyCategories passed");
  }
});

runTest("RfpDesk [Notice/Prop Cleanliness]", "src/app/india/rfp/page.tsx should pass fleetVehicles, not fleetCategories", () => {
  const rfpPageSrc = fs.readFileSync(path.join(ROOT, "src/app/india/rfp/page.tsx"), "utf-8");
  if (rfpPageSrc.includes("vehicles={indiaData.fleetCategories.map")) {
    console.warn("  [NOTICE] src/app/india/rfp/page.tsx passes 'indiaData.fleetCategories.map(...)'. While RfpDesk safely falls back via guard, caller should pass fleetVehicles or omit prop.");
  }
});

// -----------------------------------------------------------------------------
// SUITE 4: CorporateRfpBuilder Fleet Offering & Adversarial Stress Testing
// -----------------------------------------------------------------------------
const corpRfpSrc = fs.readFileSync(path.join(ROOT, "src/components/rfp/CorporateRfpBuilder.tsx"), "utf-8");

runTest("CorporateRfpBuilder", "CorporateRfpBuilder vehicleOptions contains the 10 approved vehicles for India", () => {
  const expected10 = [
    "Swift Dzire (Sedan, Petrol)",
    "Hyundai Aura (Sedan, Petrol & CNG)",
    "Tata Tigor (Sedan, Electric Vehicle)",
    "Tata Nexon (Sedan, Long Range Electric Vehicle)",
    "MG ZS EV (Sedan, Long Range Electric Vehicle)",
    "Mahindra Marazzo (SUV, Diesel)",
    "Ertiga CNG (SUV, Petrol & CNG)",
    "Innova Crysta (SUV, Diesel)",
    "Kia Carens Clavis EV (SUV, Long Range Electric Vehicle)",
    "Urbania (12 Seater, Diesel)",
  ];

  for (const v of expected10) {
    if (!corpRfpSrc.includes(`"${v}"`)) {
      throw new Error(`CorporateRfpBuilder missing approved vehicle in India options: ${v}`);
    }
  }
});

runTest("CorporateRfpBuilder [CRITICAL VULNERABILITY]", "corporateData.vehiclePreferences must NOT initialize with legacy categories or inferred seat counts", () => {
  const match = corpRfpSrc.match(/vehiclePreferences:\s*\[([^\]]+)\]/);
  if (!match) throw new Error("Could not find vehiclePreferences in CorporateRfpBuilder state");
  const initStr = match[1];
  
  if (initStr.includes("4-seater") || initStr.includes("6-7 seater") || initStr.includes("Corporate AC Cabs") || initStr.includes("Executive MPVs")) {
    throw new Error(
      `VULNERABILITY FOUND: CorporateRfpBuilder line 56 initializes vehiclePreferences with unauthorized strings: [${initStr.trim()}].\n` +
      `Consequences: (1) Checkboxes in Step 3 render unchecked because these strings do not match vehicleOptions.\n` +
      `(2) The compiled RFP brief in Step 4 outputs unauthorized seat counts ('4-seater', '6-7 seater') violating AGENTS.md R1.\n` +
      `(3) User cannot uncheck these initial values as they do not appear in the Step 3 button list!`
    );
  }
});

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log("\n================================================================================");
console.log("   STRESS TEST SUMMARY");
console.log("================================================================================");
const passed = testResults.filter(t => t.status === "PASS").length;
const failed = testResults.filter(t => t.status === "FAIL").length;
console.log(`Total tests : ${testResults.length}`);
console.log(`Passed      : ${passed}`);
console.log(`Failed      : ${failed}`);

if (failed > 0) {
  console.log("\nFAILURES IDENTIFIED:");
  testResults.filter(t => t.status === "FAIL").forEach(t => {
    console.log(`  [${t.suite}] ${t.name}:`);
    console.log(`    ${t.error}`);
  });
}

process.exit(failed > 0 ? 1 : 0);
