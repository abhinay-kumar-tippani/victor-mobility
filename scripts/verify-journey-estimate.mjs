import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

const source = readFileSync(new URL("../src/lib/journeyEstimate.ts", import.meta.url), "utf8");
const exports = {};
new Function("exports", ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText)(exports);
const calculate = exports.calculateJourney;
const base = { passengers: "11", seats: "4", distance: "30", days: "2", rate: "20", returnTrip: true };
assert.deepEqual(calculate(base).result, { vehicles: 3, legs: 2, vehicleKm: 360, budget: 7200 });
assert.deepEqual(calculate({ ...base, returnTrip: false, rate: "" }).result, { vehicles: 3, legs: 1, vehicleKm: 180, budget: null });
assert.equal(calculate({ ...base, passengers: "8" }).result.vehicles, 2);
assert.equal(calculate({ ...base, distance: ".5", rate: ".5" }).result.budget, 3);
for (const key of ["passengers", "seats", "days"]) {
  for (const value of ["", "0", "-1", "1.5", "Infinity", "9007199254740992"]) {
    assert.ok(calculate({ ...base, [key]: value }).errors.includes(key), `${key} must reject ${value}`);
  }
}
for (const key of ["distance", "rate"]) {
  for (const value of ["0", "-1", "Infinity", "NaN", "2e3"]) assert.ok(calculate({ ...base, [key]: value }).errors.includes(key));
}
assert.ok(calculate({ ...base, distance: "" }).errors.includes("distance"));
assert.ok(calculate({ ...base, distance: "9999999999999999" }).errors.includes("total"));
console.log("34 journey estimate assertions passed.");
