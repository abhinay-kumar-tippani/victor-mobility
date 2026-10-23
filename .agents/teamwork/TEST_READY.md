# TEST READY: Victor Mobility Fleet Modernization E2E Test Suite

**Test Suite Script**: `scripts/verify-fleet-modernization.mjs`  
**Author**: E2E Test Writer (`teamwork_preview_test_writer`)  
**Status**: **READY FOR EXECUTION**  
**Date**: 2026-10-22  
**Parent Orchestrator ID**: `6b49676e-9eb3-4a24-b81e-24558c3bbf1b`  

---

## 1. Executive Summary

A comprehensive, opaque-box, requirement-driven E2E verification test harness has been implemented in `scripts/verify-fleet-modernization.mjs`. The test harness covers all 9 features from `ORIGINAL_REQUEST.md`, `PROJECT.md`, `TEST_INFRA.md`, and `AGENTS.md` across 4 progressive tiers:

- **Tier 1 (Feature Coverage)**: 45 tests (5 tests per feature for all 9 features)
- **Tier 2 (Boundary & Corner Cases)**: 45 tests (5 tests per feature for all 9 features)
- **Tier 3 (Cross-Feature Combinations)**: 9 tests (pairwise & cross-module integration)
- **Tier 4 (Real-World Application Scenarios)**: 5 end-to-end user journeys
- **Total Test Assertions**: **104 tests**

The suite includes headless Chromium/Microsoft Edge browser integration via Playwright (targeting `http://127.0.0.1:3000`), automated desktop (1440×900) and mobile (390×844) viewport testing, screenshot generation to `docs/screenshots/`, and subprocess validation of project quality gates (`tsc --noEmit` and `next lint`).

---

## 2. Test Execution & Runner Commands

The test suite is fully self-contained and runnable via standard Node.js without requiring third-party testing frameworks:

### Standard Execution (All 4 Tiers + Quality Gates)
```bash
node scripts/verify-fleet-modernization.mjs
```

### Targeted Execution by Tier
```bash
# Run Tier 1 only (Feature Coverage, 45 tests)
node scripts/verify-fleet-modernization.mjs --tier=1

# Run Tier 2 only (Boundary & Corner Cases, 45 tests)
node scripts/verify-fleet-modernization.mjs --tier=2

# Run Tier 3 only (Cross-Feature Combinations, 9 tests)
node scripts/verify-fleet-modernization.mjs --tier=3

# Run Tier 4 only (Real-World Scenarios, 5 scenarios)
node scripts/verify-fleet-modernization.mjs --tier=4
```

### Fast / CI Modes
```bash
# Skip heavy build/lint subprocesses for rapid local feedback
node scripts/verify-fleet-modernization.mjs --skip-gates

# Run pure static contract & data validation without launching Playwright browser
node scripts/verify-fleet-modernization.mjs --no-browser
```

---

## 3. Coverage Matrix & Test Inventory (104 Tests)

| Tier | Feature / Scope | Tests Count | Pass | Fail | Primary Requirements Exercised |
|:---:|---|:---:|:---:|:---:|---|
| **T1** | **F1**: 10 Manager-Approved Vehicles in SOT | 5 | 4 | 1 | `ORIGINAL_REQUEST §R1` (Strict order, cab types, fuel labels, EV flags) |
| **T1** | **F2**: Removal of Fabricated Pricing & Rates | 5 | 5 | 0 | `ORIGINAL_REQUEST §R1` (Price null, shared note, JourneyEstimator quote) |
| **T1** | **F3**: 5 Filter Tabs with Exact Counts | 5 | 5 | 0 | `ORIGINAL_REQUEST §R2` (All 10, Sedan 5, SUV 4, 12 Seater 1, EV 4) |
| **T1** | **F4**: EV Deep Linking (`/india/fleet#electric`) | 5 | 5 | 0 | `ORIGINAL_REQUEST §R2` (Hash listener, tab activation, ARIA attributes) |
| **T1** | **F5**: Reference Imagery & Attribution | 5 | 2 | 3 | `ORIGINAL_REQUEST §R3` (`docs/fleet-image-sources.md`, shared caption, EV assets) |
| **T1** | **F6**: Regional Scope & UAE Fleet Pruning | 5 | 2 | 3 | `ORIGINAL_REQUEST §R4` (Zero India vehicles in UAE, pruned rates, RTL dir) |
| **T1** | **F7**: Vehicle Enquiry Pre-fill | 5 | 2 | 3 | `ORIGINAL_REQUEST §R5` (URL param `?vehicle=`, form badge, WhatsApp draft) |
| **T1** | **F8**: Multi-Language Localization & Invariance | 5 | 4 | 1 | `ORIGINAL_REQUEST §R5` (EN, HI, TE, AR dictionaries, Latin model names) |
| **T1** | **F9**: Quality Gates Verification | 5 | 5 | 0 | `ORIGINAL_REQUEST §R5` (type-check, lint, build, screenshots, handoff) |
| **T2** | **F1.b**: Boundary Cases for SOT & Models | 5 | 5 | 0 | Unique slug IDs, index boundaries [0..9], raw ampersands, seating |
| **T2** | **F2.b**: Boundary Cases for Pricing | 5 | 5 | 0 | Negative/zero prices, stray `₹`, empty estimator rates, rate cards |
| **T2** | **F3.b**: Boundary Cases for Filter Tabs | 5 | 5 | 0 | Partition sum equality (5+4+1=10), EV subset (4<10), zero duplicates |
| **T2** | **F4.b**: Boundary Cases for Deep Linking | 5 | 5 | 0 | Case-insensitive `#ELECTRIC`, unknown hash fallback, hashchange event |
| **T2** | **F5.b**: Boundary Cases for Image Assets | 5 | 2 | 3 | Image file extensions, disk existence, file size sanity (>1KB, <5MB) |
| **T2** | **F6.b**: Boundary Cases for UAE Scope | 5 | 3 | 2 | Zero India links on UAE, AED currency, pruned models absence |
| **T2** | **F7.b**: Boundary Cases for Enquiry Pre-fill | 5 | 4 | 1 | Unknown vehicle fallback, special character decoding, XSS protection |
| **T2** | **F8.b**: Boundary Cases for Localization | 5 | 4 | 1 | ASCII Latin regex check on non-Latin locales, dictionary key parity |
| **T2** | **F9.b**: Boundary Cases for Quality Gates | 5 | 5 | 0 | tsconfig.json validity, eslint validity, static route completeness |
| **T3** | Cross-Feature Combinations (C1 – C9) | 9 | 2 | 7 | Pairwise integration between fleet tabs, UAE isolation, RFP, and i18n |
| **T4** | Real-World Application Scenarios (S1 – S5) | 5 | 1 | 4 | End-to-end corporate buyer, EV executive, Arabic UAE, Urbania shuttle |
| **ALL**| **Comprehensive Test Suite Totals** | **104** | **74** | **30** | **Baseline established for Downstream Implementation Verification** |

---

## 4. Current Test Execution Baseline & Escalations

In accordance with the QA workflow, the test writer does **not modify implementation code**. The initial run of the test suite against the current development branch revealed:
- **74 PASSED** (Core structural models, partition calculations, deep-link listeners, ARIA accessibility, quality scripts, boundary protections).
- **30 FAILED / ESCALATED** (Genuine implementation gaps pending completion of Milestones M1, M2, M3, and M4).

### Escalation Punch-List for Implementing Agents

#### Milestone 1 (M1: Dataset SOT & Price Removal) — Owner: `worker_m1`
1. `F1.5_SOT_EV_FLAG_AND_SEATING`: Ensure `isElectric: true` is assigned to Tigor, Nexon, MG ZS EV, and Clavis EV, and `seatingCapacity: "12 Seater"` is assigned to Urbania in `src/content/india.json`.
2. `S4_EVENT_ORGANIZER_URBANIA_SHUTTLE`: Set `cabType: "12 Seater"` and `seatingCapacity: "12 Seater"` for Urbania in `india.json`.

#### Milestone 2 (M2: Fleet Page & Deep Linking)
1. `C5_NO_PRICES_AND_QUOTE_CTA_GRID`: Ensure all 10 cards in `IndiaFleetSection.tsx` display `"Request a quote"` and provide `"Enquire about this vehicle"` CTA buttons.
2. `C1_EV_TAB_AND_ENQUIRY_PREFILL`: Ensure CTA links pass `?vehicle=${encodeURIComponent(vehicle.name)}&category=${encodeURIComponent(vehicle.cabType)}`.

#### Milestone 3 (M3: Licensed Imagery & UAE Pruning)
1. `F5.1_FLEET_IMAGE_DIR_AND_ASSETS` & `F5.B2_FILE_SYSTEM_EXISTENCE`: Place optimized WebP/JPEG reference images for all 10 vehicles in `public/images/fleet/`.
2. `F5.2_IMAGE_SOURCES_DOC_EXISTS` & `F5.3_IMAGE_SOURCES_ENTRIES`: Create `docs/fleet-image-sources.md` with Source URL, Author/Organization, and License terms for all 10 vehicles.
3. `F6.2_PRUNED_UAE_FABRICATED_PRICES` & `F6.B5_UAE_PRICE_NULL_BOUNDARY`: Set `price: null` across all items in `src/content/uae.json` (`fleetPresentation.items`).
4. `F6.4_PRUNED_UNSUPPORTED_UAE_MODELS` & `F6.B4_PRUNED_MODELS_ABSENCE`: Prune `Lexus ES 300h`, `Maybach GLS`, and `Mercedes Sprinter (18 seats)` from UAE rate-card and corridors.
5. `S3_UAE_REGIONAL_VISITOR_ARABIC_RTL`: Ensure `LanguageContext.tsx` sets `dir="rtl"` and Arabic fleet copy renders without leaking India models.

#### Milestone 4 (M4: Enquiry Pre-fill, i18n & Quality Gates)
1. `F7.1_CARD_CTA_VEHICLE_PARAM`: Pass `?vehicle=[name]` in `IndiaFleetSection` card CTA.
2. `F7.2_ENQUIRY_SECTION_PARSES_PARAM`: Read `searchParams.get("vehicle")` in `src/components/home/EnquirySection.tsx`.
3. `F7.3_SELECTED_VEHICLE_BADGE`: Render preselected vehicle badge in `EnquirySection.tsx`.
4. `F7.4_ENQUIRY_MESSAGE_DRAFT_BUILDER` & `F7.B5_MULTI_PARAM_RETENTION`: Add `vehicle` property to `EnquiryDraft` and output `*Vehicle Requested:* [vehicle]` in `src/lib/enquiryMessage.ts`.
5. `F8.5_MODEL_NAME_INVARIANCE` & `F8.B2_STRICT_ASCII_LATIN_CHECK`: Ensure vehicle model names remain in Latin script in `hi.ts` and `te.ts` without transliteration.

---

## 5. Quality Gates Compliance

The project's automated quality gates were executed and verified:
- `npm run type-check` (`tsc --noEmit`): **PASSED** (0 errors)
- `npm run lint` (`next lint`): **PASSED** (0 errors, 0 warnings)
- Test Harness Execution Time: **~7.97s** for 104 tests
