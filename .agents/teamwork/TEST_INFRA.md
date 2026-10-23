# E2E Test Infra: Victor Mobility Fleet Modernization

## Test Philosophy
- Opaque-box, requirement-driven. Derived from ORIGINAL_REQUEST.md.
- Methodology: Category-Partition + BVA + Pairwise + Workload Testing.

## Feature Inventory
| # | Feature | Source (requirement) | Tier 1 | Tier 2 | Tier 3 |
|---|---------|---------------------|:------:|:------:|:------:|
| 1 | 10 Manager-Approved Vehicles in SOT | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ |
| 2 | Removal of Fabricated Pricing & Sample Rates | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ |
| 3 | Filter Tabs & Exact Counts (All 10, Sedan 5, SUV 4, 12 Seater 1, EV 4) | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| 4 | EV Deep Linking (/india/fleet#electric) | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| 5 | Licensed Reference Imagery & Attribution | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ |
| 6 | Regional Scope & UAE Fleet Pruning | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ |
| 7 | Vehicle Enquiry Pre-fill | ORIGINAL_REQUEST §R5 | 5 | 5 | ✓ |
| 8 | Multi-Language Localization & Invariant Model Names | ORIGINAL_REQUEST §R5 | 5 | 5 | ✓ |
| 9 | Quality Gates (type-check, lint, build, screenshots) | ORIGINAL_REQUEST §R5 | 5 | 5 | ✓ |

## Test Architecture
- Test runner: Automated Node / Playwright test harness (`scripts/verify-fleet-modernization.mjs`).
- Test execution: Evaluates static content integrity, DOM structure, client routing, URL hash handling, query parameter pre-fill, localization dictionaries, and visual screenshots.
- Screenshots: Desktop (1440x900) and Mobile (390x844) written to `docs/screenshots/`.

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Corporate Mobility Buyer browsing /india/fleet and filtering by EV | F1, F3, F4, F5 | Medium |
| 2 | Executive enquired on Nexon EV -> prefilled WhatsApp contact | F3, F4, F7, F8 | High |
| 3 | UAE regional visitor browsing /uae/fleet in Arabic (RTL) | F5, F6, F8 | High |
| 4 | Event organizer selecting Urbania 12 Seater | F1, F3, F7 | Medium |
| 5 | Multi-language switcher between EN, HI, TE maintaining Latin model names | F1, F3, F8 | High |

## Coverage Thresholds
- Tier 1: ≥5 per feature (≥45 test assertions)
- Tier 2: ≥5 per feature for boundaries/negative inputs (≥45 test assertions)
- Tier 3: pairwise combinations of major feature pairs (≥9 test cases)
- Tier 4: ≥5 realistic end-to-end application scenarios
