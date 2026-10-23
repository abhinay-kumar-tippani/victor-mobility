// Direct test of journeyEstimate calculation logic under adversarial inputs
function calculateJourney(input) {
  const errors = [];
  for (const key of ["passengers", "seats", "days"]) {
    if (!/^\d+$/.test(input[key]) || !Number.isSafeInteger(Number(input[key])) || Number(input[key]) <= 0) errors.push(key);
  }
  for (const key of ["distance", "rate"]) {
    if (key === "rate" && !input.rate.trim()) continue;
    if (!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(input[key]) || !Number.isFinite(Number(input[key])) || Number(input[key]) <= 0) errors.push(key);
  }
  if (errors.length) return { errors, result: null };
  const vehicles = Math.ceil(Number(input.passengers) / Number(input.seats));
  const legs = input.returnTrip ? 2 : 1;
  const vehicleKm = vehicles * Number(input.distance) * legs * Number(input.days);
  const budget = input.rate.trim() ? vehicleKm * Number(input.rate) : null;
  if (!Number.isFinite(vehicleKm) || vehicleKm > Number.MAX_SAFE_INTEGER || (budget !== null && (!Number.isFinite(budget) || budget > Number.MAX_SAFE_INTEGER))) return { errors: ["total"], result: null };
  return { errors, result: { vehicles, legs, vehicleKm, budget } };
}

// Adversarial Test Cases
console.log("Running adversarial tests...");

// 1. All empty strings
const t1 = calculateJourney({ passengers: '', seats: '', distance: '', days: '', rate: '', returnTrip: false });
if (t1.result !== null) throw new Error("T1 result should be null");
if (!t1.errors.includes("passengers") || !t1.errors.includes("seats") || !t1.errors.includes("distance") || !t1.errors.includes("days")) {
  throw new Error("T1 missing field errors");
}

// 2. Zero / Negative
const t2 = calculateJourney({ passengers: '0', seats: '-1', distance: '0.00', days: '0', rate: '', returnTrip: false });
if (t2.result !== null) throw new Error("T2 result should be null");

// 3. Floating point passengers
const t3 = calculateJourney({ passengers: '4.5', seats: '4', distance: '50', days: '1', rate: '', returnTrip: false });
if (t3.result !== null || !t3.errors.includes("passengers")) throw new Error("T3 decimal passengers should fail");

// 4. Division by zero safety
const t4 = calculateJourney({ passengers: '10', seats: '0', distance: '50', days: '1', rate: '', returnTrip: false });
if (t4.result !== null || !t4.errors.includes("seats")) throw new Error("T4 zero seats should fail");

// 5. Huge number / overflow safety
const t5 = calculateJourney({ passengers: '999999999999999999', seats: '1', distance: '999999999999999999', days: '999999999999999999', rate: '', returnTrip: true });
if (t5.result !== null) throw new Error("T5 overflow should be caught");

// 6. Valid calculation with rate = ""
const t6 = calculateJourney({ passengers: '10', seats: '4', distance: '25.5', days: '2', rate: '', returnTrip: true });
if (t6.result === null) throw new Error("T6 should succeed");
if (t6.result.vehicles !== 3) throw new Error("T6 vehicles wrong: " + t6.result.vehicles);
if (t6.result.legs !== 2) throw new Error("T6 legs wrong: " + t6.result.legs);
if (t6.result.vehicleKm !== 3 * 25.5 * 2 * 2) throw new Error("T6 vehicleKm wrong: " + t6.result.vehicleKm);
if (t6.result.budget !== null) throw new Error("T6 budget should be null");

console.log("ALL 6 ADVERSARIAL TESTS PASSED SUCCESSFULLY!");
