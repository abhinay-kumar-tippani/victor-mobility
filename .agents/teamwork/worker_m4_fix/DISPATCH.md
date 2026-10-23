## 2026-10-22T19:30:00Z
Task: Fix unwired fleet localization in `src/components/fleet/IndiaFleetSection.tsx` per Reviewer 1 REQUEST_CHANGES.

Read:
- d:\victor website\.agents\teamwork\reviewer_m4_1\handoff.md
- d:\victor website\.agents\teamwork\ORIGINAL_REQUEST.md
- d:\victor website\AGENTS.md
- d:\victor website\.agents\teamwork\PROJECT.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your exclusive write ownership:
- src/components/fleet/IndiaFleetSection.tsx

Task Instructions:
In `src/components/fleet/IndiaFleetSection.tsx`:
1. Use `fleetDict` from `const { dict } = useLanguage(); const fleetDict = dict.fleet;` (or provide safe fallbacks).
2. Wire the 5 filter tabs to use localized labels:
   - "all": `fleetDict?.filterTabs?.all || "All Vehicles"`
   - "sedan": `fleetDict?.filterTabs?.sedan || "Sedan"`
   - "suv": `fleetDict?.filterTabs?.suv || "SUV"`
   - "12-seater": `fleetDict?.filterTabs?.twelveSeater || "12 Seater"`
   - "electric": `fleetDict?.filterTabs?.electric || "Electric Vehicles"`
3. Map `vehicle.fuelType` on each card to localized fuel badges:
   - "Petrol": `fleetDict?.fuelBadges?.petrol || "Petrol"`
   - "Petrol & CNG": `fleetDict?.fuelBadges?.petrolCng || "Petrol & CNG"`
   - "Electric Vehicle": `fleetDict?.fuelBadges?.electricVehicle || "Electric Vehicle"`
   - "Long Range Electric Vehicle": `fleetDict?.fuelBadges?.longRangeElectricVehicle || "Long Range Electric Vehicle"`
   - "Diesel": `fleetDict?.fuelBadges?.diesel || "Diesel"`
4. Replace hardcoded "Request a quote" on card and modal with:
   `fleetDict?.requestQuote || "Request a quote"`
5. Replace hardcoded "Enquire about this vehicle" CTA button with:
   `fleetDict?.enquireVehicle || "Enquire about this vehicle"`
6. Replace hardcoded "Vehicle allocation and pricing are confirmed for your location, dates and requirements." with:
   `fleetDict?.sharedNote || "Vehicle allocation and pricing are confirmed for your location, dates and requirements."`
7. Ensure model names remain strictly invariant verbatim (`vehicle.name`).
8. Run quality checks:
   - `npm run type-check`
   - `npm run lint`
   - `node scripts/verify-fleet-modernization.mjs`
   Ensure all pass with zero errors.

Write report to d:\victor website\.agents\teamwork\worker_m4_fix\report.md and handoff to d:\victor website\.agents\teamwork\worker_m4_fix\handoff.md.
Send message to orchestrator parent (conversation ID: 6b49676e-9eb3-4a24-b81e-24558c3bbf1b) when done.
