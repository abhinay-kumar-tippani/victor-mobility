# Milestone 1 Adversarial Challenge Report

**Agent**: Challenger (`teamwork_preview_challenger`)  
**Target**: Milestone 1 (Authoritative Fleet Dataset SOT & Pricing Sanitization)  
**Date**: 2026-10-22  
**Working Directory**: `d:\victor website\.agents\teamwork\challenger_m1_1`  
**Verdict**: **APPROVE** (Low Residual Risk)

---

## 1. Challenge Summary

**Overall risk assessment**: **LOW**

Milestone 1 implementation submitted by Worker M1 successfully satisfies all interface contracts, data integrity requirements, and pricing removal mandates specified in `ORIGINAL_REQUEST.md`, `AGENTS.md`, and `PROJECT.md`.

An automated, standalone verification oracle (`scripts/verify-milestone1-adversarial.mjs`) was written and executed directly against the workspace. All 26 empirical assertions passed. TypeScript type checking (`tsc --noEmit`) and ESLint (`next lint`) both passed with zero errors and zero warnings.

Three minor adversarial findings were discovered and documented below for downstream milestone teams (M2 and M4) to address during page rendering and localization.

---

## 2. Challenges & Findings

### [Low] Challenge 1: Residual Inferred Seat Counts in `CorporateRfpBuilder.tsx` Default State
- **Assumption challenged**: All RFP and customer-facing components across the repository initialize with sanitized fleet states.
- **Attack scenario**: `src/components/rfp/CorporateRfpBuilder.tsx` line 56 initializes `vehiclePreferences` with:
  `["Corporate AC Cabs (4-seater)", "Executive MPVs (6-7 seater)"]`.
  If a user proceeds through the RFP builder without toggling vehicles, the compiled RFP brief (Step 4) emits `"4-seater"` and `"6-7 seater"`. Furthermore, in Step 3, none of the 10 manager-approved vehicle buttons appear checked initially because their strings do not match these legacy values.
- **Blast radius**: Currently, `CorporateRfpBuilder` is only mounted on `/uae/rfp/page.tsx`. Active India RFP is served by `RfpDesk.tsx` (which is fully sanitized). Blast radius in India is currently zero, but could leak if `CorporateRfpBuilder` is reused for India.
- **Mitigation**: In Milestone 4, sanitize `CorporateRfpBuilder.tsx` line 56 to default to an empty array `[]` or approved vehicle names.

### [Low] Challenge 2: Obsolete Vehicle Name in English Localization Dictionary
- **Assumption challenged**: Obsolete vehicle strings (`Tempo Traveller`) are removed across all source files.
- **Attack scenario**: `src/i18n/dictionaries/en.ts` line 222 retains:
  `models: "Tempo Traveller, 22-seater and 44-seater executive coaches"`.
- **Blast radius**: When `IndiaFleetSection.tsx` or other components render the `buses` category description from the dictionary, `Tempo Traveller` could be displayed.
- **Mitigation**: Milestone 4 is explicitly tasked with i18n localization (`src/i18n/dictionaries/`). Milestone 4 must replace this with `Urbania (12 Seater)` and approved coach terminology.

### [Low] Challenge 3: Property Type Mismatch in `src/app/india/rfp/page.tsx`
- **Assumption challenged**: Page shells supply the exact 10 fleet vehicles to child components.
- **Attack scenario**: `src/app/india/rfp/page.tsx` line 12 passes:
  `vehicles={indiaData.fleetCategories.map(category => category.name)}`.
  This passes 5 category names rather than the 10 approved vehicles.
- **Blast radius**: Worker M1 wrote defensive fallback logic in `RfpDesk.tsx` lines 37–40 that detects this mismatch and automatically defaults to `APPROVED_FLEET_VEHICLES`. Thus, the user still sees the correct 10 vehicles.
- **Mitigation**: Clean up `src/app/india/rfp/page.tsx` to pass `indiaData.fleetVehicles.map(v => `${v.name} (${v.cabType}, ${v.fuelType})`)` or omit the prop.

---

## 3. Empirical Stress Test Results

Executed via: `node scripts/verify-milestone1-adversarial.mjs`  
All 26 checks evaluated synchronously against current workspace files.

| # | Test Assertion | Expected | Actual | Status |
|---|----------------|----------|--------|--------|
| 1 | `india.json` JSON validity | Valid JSON object | Parsed successfully (1,003 lines) | **PASS** |
| 2 | `rate-card.json` JSON validity | Valid JSON object | Parsed successfully (314 lines) | **PASS** |
| 3 | `corridors.json` JSON validity | Valid JSON object | Parsed successfully (337 lines) | **PASS** |
| 4 | `fleetVehicles` existence & length | Exactly 10 items | `length === 10` | **PASS** |
| 5 | `fleetVehicles` canonical order & names | Swift Dzire, Hyundai Aura, Tata Tigor, Tata Nexon, MG ZS EV, Mahindra Marazzo, Ertiga CNG, Innova Crysta, Kia Carens Clavis EV, Urbania | Exact match at indices 0–9 | **PASS** |
| 6 | `fleetVehicles` cabType & fuelType | Verbatim manager classifications | All 10 conform strictly | **PASS** |
| 7 | Category distribution: Sedan | Exactly 5 | 5 (Dzire, Aura, Tigor, Nexon, MG ZS EV) | **PASS** |
| 8 | Category distribution: SUV | Exactly 4 | 4 (Marazzo, Ertiga CNG, Crysta, Carens Clavis EV) | **PASS** |
| 9 | Category distribution: 12 Seater | Exactly 1 | 1 (Urbania) | **PASS** |
| 10 | Cross-category Electric vehicles | Exactly 4 | 4 (Tigor, Nexon, MG ZS EV, Carens Clavis EV) | **PASS** |
| 11 | Complete category partition | Sum of Sedan + SUV + 12 Seater = 10 | 5 + 4 + 1 = 10 (no orphan records) | **PASS** |
| 12 | Vehicle ID uniqueness & format | Unique non-empty kebab-case strings | 10 distinct valid IDs | **PASS** |
| 13 | Image paths & alts | Non-empty strings under `/images/fleet/` | All 10 present and valid | **PASS** |
| 14 | Seat count sanitization (vehicles 1–9) | Zero inferred seat counts | 0 occurrences on items 1–9 | **PASS** |
| 15 | Urbania seat count approval | Approved `12 Seater` | `cabType === "12 Seater"` | **PASS** |
| 16 | Zero legacy prices in `india.json` | 0 occurrences of 2200, 3800, 7200, 6500 | 0 occurrences | **PASS** |
| 17 | `fleetPresentation.items` prices | All prices `null` | 5/5 items have `price: null` | **PASS** |
| 18 | `fleetPresentation` pricingSource | Removed | Property absent | **PASS** |
| 19 | Corridors `basePrice` sanitization | All `basePrice: null` across 7 corridors | 7/7 corridors `basePrice: null` | **PASS** |
| 20 | Corridors `priceRange` values | `"Quote on request"` across all tiers | All tier entries `"Quote on request"` | **PASS** |
| 21 | Rate Card numeric price purge | 0 numeric tariff figures in active categories | All rates converted to quote guidance | **PASS** |
| 22 | Obsolete models in active content | 0 occurrences of Etios, Camry, Tempo Traveller | 0 occurrences across active India content | **PASS** |
| 23 | Obsolete models in planning components | 0 occurrences in JourneyEstimator, RfpDesk | 0 occurrences | **PASS** |
| 24 | Verbatim shared note in `india.json` | Verbatim text in priceNote, sharedNote, fleetNote | Verbatim match in all 3 locations | **PASS** |
| 25 | Verbatim shared note in rate-card & corridors | Verbatim text in rate-card and corridors notes | Verbatim match in both files | **PASS** |
| 26 | Verbatim shared note in `JourneyEstimator.tsx` | Verbatim text in component footnote and draft | Present and verbatim | **PASS** |

---

## 4. Compiler & Linter Verification

1. **TypeScript Type Check**:
   - Command: `npm run type-check` (`tsc --noEmit`)
   - Exit code: `0`
   - Diagnostic output: `0 errors`
2. **ESLint Code Quality Gate**:
   - Command: `npm run lint` (`next lint`)
   - Exit code: `0`
   - Diagnostic output: `✔ No ESLint warnings or errors`

---

## 5. Unchallenged Areas

- **Milestone 2 Scope**: The interactive 10-vehicle grid and `#electric` hash deep linking in `IndiaFleetSection.tsx` were not evaluated as Milestone 1 is strictly data SOT and price sanitization.
- **Milestone 3 Scope**: Physical image binary asset existence under `public/images/fleet/` and licensing documentation in `docs/fleet-image-sources.md`.
- **Milestone 4 Scope**: Multi-language localization in `src/i18n/` and Playwright end-to-end browser flows.

---

## 6. Verdict

**APPROVE**  
Milestone 1 is verified, stable, type-safe, and ready for Milestone 2 implementation.
