# Milestone 1 Adversarial Challenge & Verification Report

**Agent**: Challenger (`teamwork_preview_challenger`)  
**Target Milestone**: Milestone 1 (Authoritative Fleet Dataset SOT & Pricing Removal)  
**Date**: 2026-10-22  
**Working Directory**: `d:\victor website\.agents\teamwork\challenger_m1_2`  

---

## Challenge Summary

**Overall risk assessment**: **HIGH**  
**Final Verdict**: **REJECT**  

Milestone 1 implements several key objectives with high technical quality: TypeScript definitions are well-typed, `fleetVehicles` in `src/content/india.json` contains the exact 10 approved vehicles, `JourneyEstimator` reliably prevents NaN calculations and eliminates numerical pricing, and `RfpDesk` renders the 10 approved vehicles.

However, an adversarial audit revealed a **critical contract and specification violation in `CorporateRfpBuilder.tsx`** that was claimed to be updated for Milestone 1 in Worker M1 Report (§2.7), but contains a defect that directly outputs obsolete legacy vehicle strings with inferred seat counts (`"4-seater"` and `"6-7 seater"`) in the generated customer tender document. Additionally, `src/app/india/rfp/page.tsx` contains an uncleaned prop invocation.

Milestone 1 must be **REJECTED** until these two items are corrected.

---

## Challenges

### [Critical] Challenge 1: `CorporateRfpBuilder.tsx` Leaks Unauthorized Vehicle Strings and Inferred Seat Counts into Generated RFPs

- **Assumption challenged**: Worker report §2.7 claims: *"In `src/components/rfp/CorporateRfpBuilder.tsx`, replaced legacy fleet options with the 10 manager-approved vehicles."*
- **Attack scenario**:
  1. Inspect `src/components/rfp/CorporateRfpBuilder.tsx` lines 46–65:
     ```typescript
     const [corporateData, setCorporateData] = useState({
       // ...
       vehiclePreferences: ["Corporate AC Cabs (4-seater)", "Executive MPVs (6-7 seater)"],
       // ...
     });
     ```
  2. While `vehicleOptions` (lines 110–121) was updated to list the 10 approved vehicles, the initial state of `vehiclePreferences` (line 56) was left with legacy sample strings: `["Corporate AC Cabs (4-seater)", "Executive MPVs (6-7 seater)"]`.
  3. When an enterprise user opens the RFP builder:
     - In Step 3 (Fleet Mix), the component checks `corporateData.vehiclePreferences.includes(veh)`. Because neither `"Corporate AC Cabs (4-seater)"` nor `"Executive MPVs (6-7 seater)"` matches any of the 10 approved vehicle strings in `vehicleOptions`, **all 10 vehicle buttons appear unchecked** on the screen.
     - Crucially, because these legacy strings are not rendered in the button list, **the user has no way to uncheck or remove them**!
     - Even if the user selects one or more approved vehicles (e.g. `Tata Tigor (Sedan, Electric Vehicle)`), the legacy strings remain in `vehiclePreferences`.
  4. In Step 4 (`generateRfpDocument`, lines 193–195):
     ```typescript
     `3. DESIRED FLEET CONFIGURATION`,
     ...(corporateData.vehiclePreferences.length > 0
       ? corporateData.vehiclePreferences.map((v) => `   - ${v}`)
       : [`   - Standard Corporate Allocation`]),
     ```
     The output tender brief displayed in the preview, copied to clipboard, and dispatched via WhatsApp or email outputs:
     ```
     3. DESIRED FLEET CONFIGURATION
        - Corporate AC Cabs (4-seater)
        - Executive MPVs (6-7 seater)
        - Tata Tigor (Sedan, Electric Vehicle)
     ```
- **Blast radius**:
  - Directly violates `ORIGINAL_REQUEST.md` (R1): *"Preserve supplied vehicle names, fuel labels, and cab-type classifications exactly as stated without reclassification or inferred seat counts (except Urbania's approved 12 Seater)."*
  - Directly violates Acceptance Criteria: *"No old sample vehicle names, invented seat counts (except Urbania), or fabricated numeric prices appear anywhere in active India routes or estimators."*
  - Leaks into user-facing WhatsApp draft messages and email tender briefs.
- **Mitigation**:
  In `src/components/rfp/CorporateRfpBuilder.tsx` line 56, initialize `vehiclePreferences` to an empty array:
  ```typescript
  vehiclePreferences: [],
  ```
  or default to the first approved vehicle:
  ```typescript
  vehiclePreferences: region === "uae" ? [] : ["Swift Dzire (Sedan, Petrol)"],
  ```

---

### [Medium] Challenge 2: Interface Mismatch in `src/app/india/rfp/page.tsx` Passing `fleetCategories` to `vehicles` Prop

- **Assumption challenged**: The 10 approved vehicles are passed through single-source-of-truth component props without relying on fallback workarounds.
- **Attack scenario**:
  Inspect `src/app/india/rfp/page.tsx` line 12:
  ```tsx
  <RfpDesk
    copy={indiaData.planningTools.rfp}
    actions={indiaData.planningTools.actions}
    cities={indiaData.cities.filter(city => city.published).map(city => city.name)}
    services={indiaData.services.filter(service => service.published).map(service => service.title)}
    vehicles={indiaData.fleetCategories.map(category => category.name)}
    whatsappBaseUrl={indiaData.contact.whatsappBaseUrl}
    companyName={indiaData.companyName}
  />
  ```
  `vehicles` is passed as `indiaData.fleetCategories.map(...)`, which evaluates to `["Sedans", "MPVs & Group Vehicles", "Buses & Shuttles", "Luxury & Limousines", "Electric Vehicles"]` (5 broad categories, not vehicles).
  `RfpDesk.tsx` lines 37–40 only renders the 10 approved vehicles because Worker M1 added a guard:
  ```typescript
  const vehicleOptions =
    vehicles && vehicles.length === 10 && !vehicles.some(v => v.includes("Sedans") || v.includes("Buses"))
      ? vehicles
      : APPROVED_FLEET_VEHICLES;
  ```
  Because the guard caught `v.includes("Sedans")`, it discarded the prop and fell back to `APPROVED_FLEET_VEHICLES`.
- **Blast radius**:
  While the UI currently renders the 10 approved vehicles due to the fallback guard, passing `fleetCategories` to `vehicles` is an uncleaned prop that obscures the true single source of truth (`fleetVehicles`). If the category names ever change or another caller passes an array of 10 items without `"Sedans"`, the fallback breaks.
- **Mitigation**:
  In `src/app/india/rfp/page.tsx` line 12, omit the `vehicles` prop (relying on `RfpDesk`'s default `APPROVED_FLEET_VEHICLES`) or pass:
  ```tsx
  vehicles={indiaData.fleetVehicles?.map(v => `${v.name} (${v.cabType}, ${v.fuelType})`)}
  ```

---

### [Low / Operational] Challenge 3: Cold Build Dependency on External Google Fonts

- **Assumption challenged**: `npm run build` succeeds offline without network access.
- **Attack scenario**:
  Running `npm run build` from a clean `.next` state in an isolated or offline build environment triggers:
  `NextFontError: Failed to fetch 'IBM Plex Sans Arabic' from Google Fonts`
  `NextFontError: Failed to fetch 'Manrope' from Google Fonts`
  Because Next.js attempts to download fonts at build time.
- **Blast radius**:
  Build succeeds when `.next/cache` contains pre-fetched fonts or when network is available (as demonstrated by 74/74 static pages compiling successfully in warm runs), but cold CI/CD pipelines without internet will fail.
- **Mitigation**:
  For future milestones or production deployments, self-host font files under `public/fonts/` or configure local fallback font definitions.

---

## Stress Test Results

Executed via automated test harness `scripts/challenger-m1-stress-test.mjs`:

| # | Suite | Scenario | Expected Behavior | Actual Behavior | Result |
|---|-------|----------|-------------------|-----------------|--------|
| 1 | Types & Contracts | `FleetVehicle` interface exported | Exported in `src/types/content.ts` | Exported verbatim | **PASS** |
| 2 | Types & Contracts | `FleetVehicle.cabType` union | `"Sedan" \| "SUV" \| "12 Seater"` | Matches exactly | **PASS** |
| 3 | Types & Contracts | `FleetVehicle.fuelType` union | `"Petrol" \| "Petrol & CNG" \| "Electric Vehicle" \| "Long Range Electric Vehicle" \| "Diesel"` | Matches exactly | **PASS** |
| 4 | Types & Contracts | `IndiaContent` interface extension | `fleetVehicles?: FleetVehicle[]` | Present | **PASS** |
| 5 | Types & Contracts | `india.json` 10 vehicles contract conformance | Strict conformance of all 10 records | All 10 valid, no extra or missing fields | **PASS** |
| 6 | JourneyEstimator | Missing rate input (`rate: ""`) | Accepts empty rate, calculates vehicles & km, sets budget: null | vehicles: 3, vehicleKm: 300, budget: null | **PASS** |
| 7 | JourneyEstimator | Whitespace rate input (`rate: "   "`) | Handles whitespace without throwing | vehicles: 1, vehicleKm: 40, budget: null | **PASS** |
| 8 | JourneyEstimator | Division by zero stress (`seats: "0"`) | Rejects with `"seats"` error, result: null | Rejected with `"seats"`, no NaN/Infinity | **PASS** |
| 9 | JourneyEstimator | Negative/Non-numeric fuzzing (14 cases) | Rejects all invalid inputs, zero NaN generation | 14 of 14 cases rejected with error keys | **PASS** |
| 10 | JourneyEstimator | Integer overflow protection (`vehicleKm > MAX_SAFE_INTEGER`) | Rejects with `"total"` error, result: null | Rejected with `"total"`, result: null | **PASS** |
| 11 | JourneyEstimator | Rate input field removal in JSX | No input for `rate` in DOM markup | Zero occurrences of rate input | **PASS** |
| 12 | JourneyEstimator | Quote guidance and shared note in JSX | Displays "Request a quote" & shared note | Both strings present verbatim | **PASS** |
| 13 | RfpDesk | Approved vehicles constant | Exactly 10 approved vehicles | Exactly 10 vehicles present | **PASS** |
| 14 | RfpDesk | Fallback guard logic on legacy categories | Falls back to 10 approved vehicles | Evaluates to 10 approved vehicles | **PASS** |
| 15 | RfpDesk | Prop wiring in `india/rfp/page.tsx` | Prop passes approved vehicles | Passes `fleetCategories` (relies on guard) | **NOTICE** |
| 16 | CorporateRfpBuilder | Vehicle options in India mode | Displays 10 approved vehicles | 10 approved vehicles in `vehicleOptions` | **PASS** |
| 17 | CorporateRfpBuilder | Initial state `vehiclePreferences` | Clean or empty approved vehicle state | **`["Corporate AC Cabs (4-seater)", "Executive MPVs (6-7 seater)"]`** | **FAIL** |

**Total Tests**: 17  
**Passed**: 16  
**Failed**: 1 (Critical Contract Violation)

---

## Unchallenged Areas

- **Interactive browser clicks via Playwright**:
  End-to-end automated UI automation script in Playwright was deferred because local headless browser execution requires external font resolution during live server sessions. Component logic, static rendering, and state machines were instead verified directly via runtime node evaluation and JSX AST analysis.

---

## Recommendation & Action Items for Worker

1. **Fix `src/components/rfp/CorporateRfpBuilder.tsx` line 56**:
   Change:
   ```typescript
   vehiclePreferences: ["Corporate AC Cabs (4-seater)", "Executive MPVs (6-7 seater)"],
   ```
   To:
   ```typescript
   vehiclePreferences: [],
   ```
2. **Clean up `src/app/india/rfp/page.tsx` line 12**:
   Change:
   ```tsx
   vehicles={indiaData.fleetCategories.map(category => category.name)}
   ```
   To:
   ```tsx
   vehicles={indiaData.fleetVehicles?.map(v => `${v.name} (${v.cabType}, ${v.fuelType})`)}
   ```
   (or simply remove the `vehicles` prop so `RfpDesk` defaults cleanly).

Upon completing these two rapid modifications, Milestone 1 will be fully compliant and ready for approval.
