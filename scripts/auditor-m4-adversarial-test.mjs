import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

let failures = 0;
function assert(name, condition, details = "") {
  if (condition) {
    console.log(`[PASS] ${name}`);
  } else {
    console.error(`[FAIL] ${name}: ${details}`);
    failures++;
  }
}

console.log("=== AUDITOR M4 ADVERSARIAL INTEGRITY VERIFICATION ===\n");

// 1. SOT Urbania seating capacity & 1-9 seating nullity
const indiaJson = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, "src/content/india.json"), "utf-8"));
const vehicles = indiaJson.fleetVehicles;
assert("SOT count is 10", vehicles && vehicles.length === 10);
assert("Urbania has 12 Seater seatingCapacity", vehicles[9].name === "Urbania" && vehicles[9].seatingCapacity === "12 Seater");
for (let i = 0; i < 9; i++) {
  assert(`Vehicle ${vehicles[i].name} seatingCapacity is undefined/null`, !vehicles[i].seatingCapacity);
}

// 2. Transliteration Check in i18n
const hiText = fs.readFileSync(path.join(ROOT_DIR, "src/i18n/dictionaries/hi.ts"), "utf-8");
const teText = fs.readFileSync(path.join(ROOT_DIR, "src/i18n/dictionaries/te.ts"), "utf-8");
const arText = fs.readFileSync(path.join(ROOT_DIR, "src/i18n/dictionaries/ar.ts"), "utf-8");

const forbiddenTransliterations = [
  "स्विफ्ट", "डिजायर", "टिगोर", "क्रिस्टा", "मराजो", "अर्बनिया", "नेक्सॉन", "ऑरा",
  "స్విఫ్ట్", "డిజైర్", "టిగోర్", "క్రిస్టా", "మరాజో", "అర్బనియా", "నెక్సాన్", "ఆరా",
  "سويفت", "ديزاير", "تيجور", "كريستا", "أوربانيا"
];

for (const term of forbiddenTransliterations) {
  assert(`No '${term}' in hi.ts`, !hiText.includes(term));
  assert(`No '${term}' in te.ts`, !teText.includes(term));
  assert(`No '${term}' in ar.ts`, !arText.includes(term));
}

// 3. Invariant Latin vehicle names in hi/te/ar
const requiredLatinNames = ["Swift Dzire", "Tata Tigor", "Innova Crysta", "Mahindra Marazzo", "Force Urbania"];
for (const name of requiredLatinNames) {
  assert(`Latin '${name}' present in hi.ts`, hiText.includes(name));
  assert(`Latin '${name}' present in te.ts`, teText.includes(name));
  assert(`Latin '${name}' present in ar.ts`, arText.includes(name));
}

// 4. Honest WhatsApp Behavior in EnquirySection
const enquirySection = fs.readFileSync(path.join(ROOT_DIR, "src/components/home/EnquirySection.tsx"), "utf-8");
assert("No simulated booking confirmed in EnquirySection", !enquirySection.includes("Booking Confirmed"));
assert("No fake booking ID in EnquirySection", !enquirySection.includes("Booking #"));
assert("EnquirySection includes whatsappExplainer", enquirySection.includes("whatsappExplainer"));
assert("EnquirySection parses vehicle searchParam", enquirySection.includes('params.get("vehicle")'));
assert("EnquirySection passes vehicle to draft builder", enquirySection.includes("vehicle: selectedVehicle"));

// 5. WhatsApp Message Builder Unit Tests
import("../src/lib/enquiryMessage.js").catch(async () => {
  // If ts-node / esm import of TS file needs transpiled check, do AST/file check:
  const msgCode = fs.readFileSync(path.join(ROOT_DIR, "src/lib/enquiryMessage.ts"), "utf-8");
  assert("enquiryMessage.ts formats *Vehicle Requested:* for en", msgCode.includes("*Vehicle Requested:*"));
  assert("enquiryMessage.ts formats *المركبة المطلوبة:* for ar", msgCode.includes("*المركبة المطلوبة:*"));
  assert("enquiryMessage.ts formats *अनुरोधित वाहन:* for hi", msgCode.includes("*अनुरोधित वाहन:*"));
  assert("enquiryMessage.ts formats *అభ్యర్థించిన వాహనం:* for te", msgCode.includes("*అభ్యర్థించిన వాహనం:*"));
  assert("enquiryMessage.ts trims vehicle string", msgCode.includes("draft.vehicle.trim()"));
});

// 6. Brand Tagline
const brandJson = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, "src/content/brand.json"), "utf-8"));
assert("Brand tagline is strictly 'On Time Every Time.'", brandJson.tagline === "On Time Every Time.");

console.log(`\nAudit completed with ${failures} failures.`);
if (failures > 0) process.exit(1);
