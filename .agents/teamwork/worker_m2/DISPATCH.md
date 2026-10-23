## 2026-10-22T16:59:34Z
You are a Worker agent (teamwork_preview_worker).
Your working directory is: d:\victor website\.agents\teamwork\worker_m2
Read d:\victor website\.agents\teamwork\ORIGINAL_REQUEST.md and d:\victor website\AGENTS.md before starting work.
Also read:
- d:\victor website\.agents\teamwork\PROJECT.md
- d:\victor website\.agents\teamwork\TEST_READY.md
- d:\victor website\.agents\teamwork\worker_m1\handoff.md
- d:\victor website\.agents\teamwork\worker_m1_fix\handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your exclusive write ownership:
- src/components/fleet/IndiaFleetSection.tsx
- src/app/india/fleet/page.tsx
- src/app/india/page.tsx
- src/components/home/FleetSection.tsx

Your task is to implement Milestone 2 (Fleet Page Categorization Grid & EV Deep Linking):
1. In src/components/fleet/IndiaFleetSection.tsx:
   - Accept vehicles prop `vehicles?: FleetVehicle[]` (deriving from indiaData.fleetVehicles).
   - Implement the 5 filter tabs with exact vehicle counts:
     - All Vehicles (all 10 vehicles in exact manager sequence)
     - Sedan (5 vehicles: Swift Dzire, Hyundai Aura, Tata Tigor, Tata Nexon, MG ZS EV)
     - SUV (4 vehicles: Mahindra Marazzo, Ertiga CNG, Innova Crysta, Kia Carens Clavis EV)
     - 12 Seater (1 vehicle: Urbania)
     - Electric Vehicles (4 cross-category vehicles: Tata Tigor, Tata Nexon, MG ZS EV, Kia Carens Clavis EV)
   - Render an interactive responsive card grid derived from the active tab.
   - On each card, display:
     - Image (using Next.js Image component with vehicle.image and vehicle.imageAlt)
     - Model name verbatim (e.g. "Swift Dzire", "Tata Tigor", "Tata Nexon", "MG ZS EV", "Kia Carens Clavis EV", "Urbania")
     - Cab type badge (Sedan, SUV, 12 Seater)
     - Fuel badge (Petrol, Petrol & CNG, Electric Vehicle, Long Range Electric Vehicle, Diesel)
     - "Request a quote" price display
     - CTA button "Enquire about this vehicle" linking to:
       `${effectiveBasePath}/contact?vehicle=${encodeURIComponent(vehicle.name)}&category=${encodeURIComponent(vehicle.cabType)}`
     - Shared allocation disclaimer: "Vehicle allocation and pricing are confirmed for your location, dates and requirements."
     - Model reference caption: "Images show vehicle models; actual assigned vehicles may vary."
   - Deep Linking via #electric:
     - Listen to window.location.hash on mount and on hashchange.
     - When hash is #electric, automatically activate the Electric Vehicles filter tab and scroll to the section.
     - When user clicks the Electric Vehicles tab, sync window.location.hash with #electric cleanly.
   - WCAG & UX:
     - Accessible ARIA tablist markup (role="tablist", role="tab", aria-selected, aria-controls).
     - Keyboard navigation (Arrow keys, Enter, Space).
     - Responsive grid (1 col mobile, 2 col tablet, 3-4 col desktop).
2. In src/app/india/fleet/page.tsx:
   - Pass vehicles={indiaData.fleetVehicles} to <IndiaFleetSection ... standalone={true} />.
3. In src/app/india/page.tsx and src/components/home/FleetSection.tsx:
   - Ensure homepage preview integrates with the 10-vehicle dataset cleanly.
4. Run verification checks:
   - npm run type-check
   - npm run lint
   - node scripts/verify-fleet-modernization.mjs --tier=1
   Ensure type-check and lint pass with 0 errors.

Write your report to d:\victor website\.agents\teamwork\worker_m2\report.md and handoff to d:\victor website\.agents\teamwork\worker_m2\handoff.md.
Send a message to orchestrator parent (conversation ID: 6b49676e-9eb3-4a24-b81e-24558c3bbf1b) when done.
