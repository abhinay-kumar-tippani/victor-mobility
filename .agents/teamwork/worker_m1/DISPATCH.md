## 2026-10-22T14:03:13Z
You are a Worker agent (teamwork_preview_worker).
Your working directory is: d:\victor website\.agents\teamwork\worker_m1
Read d:\victor website\.agents\teamwork\ORIGINAL_REQUEST.md and d:\victor website\AGENTS.md before starting work.
Also read:
- d:\victor website\.agents\teamwork\PROJECT.md
- d:\victor website\.agents\teamwork\sub_orch_m1\SCOPE.md
- d:\victor website\.agents\teamwork\explorer_survey_1\report.md
- d:\victor website\.agents\teamwork\explorer_survey_1\handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your exclusive write ownership:
- src/types/content.ts
- src/content/india.json
- src/content/rate-card.json
- src/content/corridors.json
- src/components/planning/JourneyEstimator.tsx
- src/components/planning/RfpDesk.tsx
- src/components/rfp/CorporateRfpBuilder.tsx

Your task is to implement Milestone 1:
1. Define the TypeScript interface FleetVehicle in src/types/content.ts:
   id, name, cabType ("Sedan" | "SUV" | "12 Seater"), fuelType ("Petrol" | "Petrol & CNG" | "Electric Vehicle" | "Long Range Electric Vehicle" | "Diesel"), isElectric: boolean, image: string, imageAlt: string, description?: string.
2. Author the single source of truth in src/content/india.json under fleetVehicles with exactly the 10 manager-approved vehicles in supplied order:
   1. Swift Dzire (Sedan, Petrol, isElectric: false, image: "/images/fleet/swift-dzire.webp", imageAlt: "Swift Dzire sedan")
   2. Hyundai Aura (Sedan, Petrol & CNG, isElectric: false, image: "/images/fleet/hyundai-aura.webp", imageAlt: "Hyundai Aura sedan")
   3. Tata Tigor (Sedan, Electric Vehicle, isElectric: true, image: "/images/fleet/tata-tigor-ev.webp", imageAlt: "Tata Tigor EV sedan")
   4. Tata Nexon (Sedan, Long Range Electric Vehicle, isElectric: true, image: "/images/fleet/tata-nexon-ev.webp", imageAlt: "Tata Nexon EV sedan")
   5. MG ZS EV (Sedan, Long Range Electric Vehicle, isElectric: true, image: "/images/fleet/mg-zs-ev.webp", imageAlt: "MG ZS EV sedan")
   6. Mahindra Marazzo (SUV, Diesel, isElectric: false, image: "/images/fleet/mahindra-marazzo.webp", imageAlt: "Mahindra Marazzo SUV")
   7. Ertiga CNG (SUV, Petrol & CNG, isElectric: false, image: "/images/fleet/ertiga-cng.webp", imageAlt: "Ertiga CNG SUV")
   8. Innova Crysta (SUV, Diesel, isElectric: false, image: "/images/fleet/innova-crysta.webp", imageAlt: "Innova Crysta SUV")
   9. Kia Carens Clavis EV (SUV, Long Range Electric Vehicle, isElectric: true, image: "/images/fleet/kia-carens-clavis-ev.webp", imageAlt: "Kia Carens Clavis EV SUV")
   10. Urbania (12 Seater, Diesel, isElectric: false, image: "/images/fleet/force-urbania.webp", imageAlt: "Urbania 12 Seater")
   Note: Preserving manager classifications verbatim (Nexon and MG ZS EV as Sedan; Marazzo, Ertiga, Innova, Carens Clavis as SUV; Urbania as 12 Seater). No inferred seat counts (except Urbania's approved 12 Seater).
3. Remove all fabricated pricing, sample rates, and journey calculation totals:
   - In src/content/india.json, remove fabricated numbers (2200, 3800, 7200, 6500) and set price: null on fleet presentation items.
   - Display "Request a quote" on cards and ensure the shared note is present: "Vehicle allocation and pricing are confirmed for your location, dates and requirements."
   - In src/content/rate-card.json and corridors.json, prune obsolete sample models (Etios, Camry, Tempo Traveller) and replace fabricated rate calculations with enquiry-led quote guidance.
   - In src/components/planning/JourneyEstimator.tsx, remove budget calculation from user rates; guide users to request a formal quote.
   - In src/components/planning/RfpDesk.tsx and src/components/rfp/CorporateRfpBuilder.tsx, replace legacy fleet options with the approved vehicles.
4. Execute verification commands using run_command:
   - npm run type-check
   - npm run lint
   Ensure both pass with zero errors.
