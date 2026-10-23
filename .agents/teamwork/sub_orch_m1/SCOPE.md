# Scope: Milestone 1 - Authoritative Fleet Dataset Replacement, Single Source of Truth & Price Removal

## Architecture
- Single source of truth for India fleet in `src/content/india.json` (`fleetVehicles`).
- TypeScript definitions in `src/types/content.ts` (`FleetVehicle`).
- Complete pruning of fabricated rates and sample vehicle models from `corridors.json`, `rate-card.json`, `JourneyEstimator.tsx`, `RfpDesk.tsx`, and `CorporateRfpBuilder.tsx`.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Authoritative Single Source of Truth | 10 manager-approved vehicles in `src/content/india.json` (`fleetVehicles`) with exact names, fuel labels, and cab types | M1 | ORIGINAL_REQUEST §R1 |
| 2 | Removal of Fabricated Pricing & Sample Rates | Replace numeric pricing with "Request a quote" and shared note across India routes and estimators | M1 | ORIGINAL_REQUEST §R1 |

## Requirements & Rules
1. Define `fleetVehicles` in `src/content/india.json` containing exactly 10 manager-approved vehicles in supplied order:
   1. Swift Dzire (Sedan, Petrol)
   2. Hyundai Aura (Sedan, Petrol & CNG)
   3. Tata Tigor (Sedan, Electric Vehicle)
   4. Tata Nexon (Sedan, Long Range Electric Vehicle)
   5. MG ZS EV (Sedan, Long Range Electric Vehicle)
   6. Mahindra Marazzo (SUV, Diesel)
   7. Ertiga CNG (SUV, Petrol & CNG)
   8. Innova Crysta (SUV, Diesel)
   9. Kia Carens Clavis EV (SUV, Long Range Electric Vehicle)
   10. Urbania (12 Seater, Diesel)
2. Preserve supplied names, fuel labels, and cab types exactly without reclassification (Nexon & MG ZS EV as Sedan; Marazzo, Ertiga, Innova, Carens Clavis as SUV; Urbania as 12 Seater).
3. No inferred seat counts (except Urbania's approved 12 Seater).
4. Remove all obsolete sample records (Etios, Camry, Tempo Traveller, old bus entries, etc.).
5. Remove all fabricated pricing, sample rates, and journey calculation totals from `india.json` (`price: null`), `rate-card.json`, `corridors.json`, and `JourneyEstimator.tsx`. Replace with "Request a quote" and the shared note: "Vehicle allocation and pricing are confirmed for your location, dates and requirements."
6. Update `src/types/content.ts` with `FleetVehicle` type.
7. Prior Explorer findings to consult: `d:\victor website\.agents\teamwork\explorer_survey_1\report.md` and `handoff.md`.
8. Verification: `npm run type-check` and `npm run lint` must pass with zero errors.
