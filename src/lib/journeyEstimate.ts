export interface EstimateNumbers {
  passengers: string;
  seats: string;
  distance: string;
  days: string;
  rate: string;
  returnTrip: boolean;
}

export function calculateJourney(input: EstimateNumbers) {
  const errors: string[] = [];
  for (const key of ["passengers", "seats", "days"] as const) {
    if (!/^\d+$/.test(input[key]) || !Number.isSafeInteger(Number(input[key])) || Number(input[key]) <= 0) errors.push(key);
  }
  for (const key of ["distance", "rate"] as const) {
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
