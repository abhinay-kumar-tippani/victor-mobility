# Milestone 1 Implementation Report: Approved Fleet Integration & Pricing Removal

**Agent**: Worker (`teamwork_preview_worker`)  
**Date**: 2026-10-22  
**Working Directory**: `d:\victor website\.agents\teamwork\worker_m1`  
**Target Milestone**: Milestone 1 (Authoritative Fleet Dataset SOT & Pricing Removal)

---

## 1. Executive Summary

Milestone 1 has been implemented in complete compliance with `ORIGINAL_REQUEST.md`, `AGENTS.md`, and `SCOPE.md`:
1. **TypeScript Contract**: Defined the `FleetVehicle` interface in `src/types/content.ts` with exact cab type, fuel type unions, and attributes.
2. **Single Source of Truth**: Authored `fleetVehicles` in `src/content/india.json` containing exactly the 10 manager-approved vehicles in supplied sequence, preserving manager classifications verbatim (Nexon and MG ZS EV as Sedan; Marazzo, Ertiga, Innova, Carens Clavis as SUV; Urbania as 12 Seater). No inferred seat counts (except Urbania's approved 12 Seater).
3. **Complete Pricing Sanitization**:
   - In `src/content/india.json`, removed all fabricated numbers (`2200`, `3800`, `7200`, `6500`), removed `pricingSource`, set `price: null` across all presentation items, configured `priceDisplay: "Request a quote"`, and attached the mandatory shared note: `"Vehicle allocation and pricing are confirmed for your location, dates and requirements."`
   - In `src/content/rate-card.json` and `src/content/corridors.json`, pruned all obsolete sample models (`Toyota Etios`, `Toyota Camry`, `Tempo Traveller/Traveler`) and replaced fabricated rate calculations with enquiry-led quote guidance.
   - In `src/components/planning/JourneyEstimator.tsx`, removed the planning rate input and arithmetic budget calculation, displayed `"Request a quote"` with the shared note, and updated the enquiry draft to guide users to a formal quote.
   - In `src/components/planning/RfpDesk.tsx` and `src/components/rfp/CorporateRfpBuilder.tsx`, replaced legacy fleet options with the 10 manager-approved vehicles.
4. **Verification**: Executed `npm run type-check`, `npm run lint`, and automated programmatic integrity validation; all passed with zero errors or warnings.

---

## 2. File-by-File Changes

### 2.1 `src/types/content.ts`
- Added the `FleetVehicle` interface:
  ```typescript
  export interface FleetVehicle {
    id: string;
    name: string;
    cabType: "Sedan" | "SUV" | "12 Seater";
    fuelType: "Petrol" | "Petrol & CNG" | "Electric Vehicle" | "Long Range Electric Vehicle" | "Diesel";
    isElectric: boolean;
    image: string;
    imageAlt: string;
    description?: string;
  }
  ```
- Extended `IndiaContent` interface with `fleetVehicles?: FleetVehicle[];`.

### 2.2 `src/content/india.json`
- Authored the authoritative `fleetVehicles` collection with exactly 10 manager-approved records:
  1. `Swift Dzire` (id: `swift-dzire`, cabType: `Sedan`, fuelType: `Petrol`, isElectric: `false`, image: `/images/fleet/swift-dzire.webp`, imageAlt: `Swift Dzire sedan`)
  2. `Hyundai Aura` (id: `hyundai-aura`, cabType: `Sedan`, fuelType: `Petrol & CNG`, isElectric: `false`, image: `/images/fleet/hyundai-aura.webp`, imageAlt: `Hyundai Aura sedan`)
  3. `Tata Tigor` (id: `tata-tigor`, cabType: `Sedan`, fuelType: `Electric Vehicle`, isElectric: `true`, image: `/images/fleet/tata-tigor-ev.webp`, imageAlt: `Tata Tigor EV sedan`)
  4. `Tata Nexon` (id: `tata-nexon`, cabType: `Sedan`, fuelType: `Long Range Electric Vehicle`, isElectric: `true`, image: `/images/fleet/tata-nexon-ev.webp`, imageAlt: `Tata Nexon EV sedan`)
  5. `MG ZS EV` (id: `mg-zs-ev`, cabType: `Sedan`, fuelType: `Long Range Electric Vehicle`, isElectric: `true`, image: `/images/fleet/mg-zs-ev.webp`, imageAlt: `MG ZS EV sedan`)
  6. `Mahindra Marazzo` (id: `mahindra-marazzo`, cabType: `SUV`, fuelType: `Diesel`, isElectric: `false`, image: `/images/fleet/mahindra-marazzo.webp`, imageAlt: `Mahindra Marazzo SUV`)
  7. `Ertiga CNG` (id: `ertiga-cng`, cabType: `SUV`, fuelType: `Petrol & CNG`, isElectric: `false`, image: `/images/fleet/ertiga-cng.webp`, imageAlt: `Ertiga CNG SUV`)
  8. `Innova Crysta` (id: `innova-crysta`, cabType: `SUV`, fuelType: `Diesel`, isElectric: `false`, image: `/images/fleet/innova-crysta.webp`, imageAlt: `Innova Crysta SUV`)
  9. `Kia Carens Clavis EV` (id: `kia-carens-clavis-ev`, cabType: `SUV`, fuelType: `Long Range Electric Vehicle`, isElectric: `true`, image: `/images/fleet/kia-carens-clavis-ev.webp`, imageAlt: `Kia Carens Clavis EV SUV`)
  10. `Urbania` (id: `urbania`, cabType: `12 Seater`, fuelType: `Diesel`, isElectric: `false`, image: `/images/fleet/force-urbania.webp`, imageAlt: `Urbania 12 Seater`)
- Sanitized `fleetPresentation`:
  - `priceLabel`: `"Pricing"`
  - `priceDisplay`: `"Request a quote"`
  - `priceNote`: `"Vehicle allocation and pricing are confirmed for your location, dates and requirements."`
  - `sharedNote`: `"Vehicle allocation and pricing are confirmed for your location, dates and requirements."`
  - `packageLabel`: `"Confirmed on enquiry"`
  - `items`: Set `price: null` for all 5 presentation items (`sedans`, `mpvs`, `buses`, `luxury`, `electric`).
  - Removed `pricingSource` entirely.
- Updated `fleetNote`: Set to `"Vehicle allocation and pricing are confirmed for your location, dates and requirements."`.
- Sanitized `planningTools.home.estimator` and `planningTools.estimator` copy strings to remove budget calculation claims and emphasize quote requests.

### 2.3 `src/content/rate-card.json`
- Pruned obsolete models:
  - Replaced `Toyota Etios` with `Swift Dzire / Hyundai Aura / Tata Tigor`.
  - Replaced `Toyota Camry / Mercedes E-Class` with `Tata Nexon / MG ZS EV / Kia Carens Clavis EV`.
  - Replaced `Luxury Tempo Traveller` with `Urbania (12 Seater)`.
- Replaced fabricated tariff figures across all categories with quote guidance:
  - `halfDay`: `"Quote on request (4h / 40 km)"`
  - `fullDay`: `"Quote on request (8h / 80 km)"`
  - `extendedDay`: `"Quote on request (12h / 120 km)"`
  - `extraKm`: `"Confirmed on enquiry"`
  - `extraHour`: `"Confirmed on enquiry"`
  - `monthlyRetainer`: `"Quote on request"`
  - `outstationPerKm`: `"Confirmed on enquiry"`
  - `driverBata`: `"Confirmed on enquiry"`
- Added shared note into `india.description` and updated FAQ 1 to clearly state that all corporate tariffs are configured on request.

### 2.4 `src/content/corridors.json`
- In `india`:
  - Set `note`: `"Vehicle allocation and pricing are confirmed for your location, dates and requirements. Final commercial billing depends on exact toll tariffs, GST (5% with ITC/RCM options), and customized shift roster agreements."`
  - In `vehicleTiers`: Pruned `Toyota Etios`, `Toyota Camry`, and `Tempo Traveler`. Replaced with approved models (`Swift Dzire / Hyundai Aura / Tata Tigor`, `Tata Nexon / MG ZS EV`, `Innova Crysta / Mahindra Marazzo / Ertiga CNG / Kia Carens Clavis EV`, `Urbania (12 Seater)`). Replaced hourly retainers with `"Quote on request (8h / 80km)"`.
  - In `corridors` (all 7 corridors): Set `basePrice: null` and replaced all `priceRange` maps with `"Quote on request"`.

### 2.5 `src/components/planning/JourneyEstimator.tsx`
- Removed `rate` input field from state, form markup, and validation.
- Kept genuine vehicle and distance calculation:
  `vehicles = Math.ceil(passengers / seats)`
  `vehicleKm = vehicles * distance * legs * days`
- Removed numerical budget calculation from displayed result card; replaced with:
  - Header: `"Estimated pricing"`
  - Value: `"Request a quote"`
  - Footnote: `"Vehicle allocation and pricing are confirmed for your location, dates and requirements."`
- Updated draft message generator to output:
  `"Pricing: Formal quote on request (Vehicle allocation and pricing are confirmed for your location, dates and requirements)"`.

### 2.6 `src/components/planning/RfpDesk.tsx`
- Added `APPROVED_FLEET_VEHICLES` constant matching the 10 approved vehicles.
- Updated component logic so that if legacy category strings are passed via props, `RfpDesk` automatically falls back to rendering the 10 approved vehicles with cab type and fuel labels.

### 2.7 `src/components/rfp/CorporateRfpBuilder.tsx`
- Replaced legacy India vehicle options array with the exact 10 approved vehicles:
  ```typescript
  [
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
  ]
  ```

---

## 3. Verification Commands & Results

1. **Type Check**:
   ```powershell
   npm run type-check
   ```
   **Result**: Exit code 0, 0 errors.

2. **Lint**:
   ```powershell
   npm run lint
   ```
   **Result**: Exit code 0, "✔ No ESLint warnings or errors".

3. **Programmatic Data & Category Verification**:
   Executed node verification script against `india.json`, `rate-card.json`, and `corridors.json`:
   - Total vehicles: 10
   - Sedans: 5 (Swift Dzire, Hyundai Aura, Tata Tigor, Tata Nexon, MG ZS EV)
   - SUVs: 4 (Mahindra Marazzo, Ertiga CNG, Innova Crysta, Kia Carens Clavis EV)
   - 12 Seater: 1 (Urbania)
   - Cross-category Electric: 4 (Tata Tigor, Tata Nexon, MG ZS EV, Kia Carens Clavis EV)
   - `fleetPresentation.items` prices: All 5 are `null`
   - Fabricated numbers (`2200|3800|7200|6500`) in `india.json`: 0 occurrences
   - Obsolete models (`Etios|Camry|Tempo Traveller|Tempo Traveler`) in content: 0 occurrences
   - Corridors `basePrice`: All `null`, `priceRange`: `"Quote on request"`

Milestone 1 is complete and ready for Milestone 2 (`IndiaFleetSection.tsx` refactoring and `#electric` deep linking).
