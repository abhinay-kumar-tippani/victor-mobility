# Scope: E2E Testing Track (Tiers 1-4) & Test Harness

## Architecture
- Opaque-box, requirement-driven test suite based on `ORIGINAL_REQUEST.md`.
- Test harness script: `scripts/verify-fleet-modernization.mjs` (or Playwright test suite).
- Output signal: `d:\victor website\.agents\teamwork\TEST_READY.md`.

## Feature Inventory Coverage
| # | Feature | Requirements |
|---|---------|--------------|
| 1 | Single Source of Truth | 10 manager-approved vehicles in supplied order |
| 2 | Price Removal | No fabricated pricing, rates, or totals; "Request a quote" & shared note present |
| 3 | Categorization | 5 tabs with exact counts: All (10), Sedan (5), SUV (4), 12 Seater (1), EV (4) |
| 4 | Deep Linking | `/india/fleet#electric` loads with EV filter active |
| 5 | Image Integrity & Attribution | Verified images matching fuel type, `docs/fleet-image-sources.md`, shared caption |
| 6 | UAE Isolation & Pruning | Zero India vehicles on `/uae`, pruned sample rates/models, RTL & Arabic preserved |
| 7 | Vehicle Pre-fill | "Enquire about this vehicle" prefills vehicle in form & WhatsApp draft |
| 8 | Localization | Translation across EN, HI, TE, AR with invariant Latin vehicle model names |
| 9 | Quality Gates | `type-check`, `lint`, `build` succeed, screenshots in `docs/screenshots/` |

## Test Case Design (Tiers 1-4)
- Tier 1: Feature Coverage (≥5 per feature, ≥45 tests)
- Tier 2: Boundary & Corner Cases (≥5 per feature, ≥45 tests)
- Tier 3: Cross-Feature Combinations (≥9 tests)
- Tier 4: Real-World Scenarios (≥5 application-level tests)

## Deliverables
1. Automated test script `scripts/verify-fleet-modernization.mjs`.
2. `TEST_READY.md` summarizing the test harness, runner command, and coverage checklist.
