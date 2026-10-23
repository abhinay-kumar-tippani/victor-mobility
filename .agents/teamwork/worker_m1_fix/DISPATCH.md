## 2026-10-22T16:46:51Z
You are a Worker agent (teamwork_preview_worker).
Your working directory is: d:\victor website\.agents\teamwork\worker_m1_fix
Read d:\victor website\.agents\teamwork\ORIGINAL_REQUEST.md and d:\victor website\AGENTS.md before starting work.
Also read:
- d:\victor website\.agents\teamwork\challenger_m1_2\handoff.md
- d:\victor website\.agents\teamwork\reviewer_m1_1\handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your exclusive write ownership:
- src/components/rfp/CorporateRfpBuilder.tsx
- src/app/india/rfp/page.tsx
- src/components/ratecard/EnterpriseRateCardDesk.tsx

Your task is to fix the issues identified in Milestone 1 Gate Check:
1. In src/components/rfp/CorporateRfpBuilder.tsx:
   At line 56, change initial state `vehiclePreferences: ["Corporate AC Cabs (4-seater)", "Executive MPVs (6-7 seater)"]` to `vehiclePreferences: []`.
   Ensure no legacy categories or inferred seat counts ("4-seater", "6-7 seater") are hardcoded or output into generated RFP briefs.
2. In src/app/india/rfp/page.tsx:
   At line 12, change `vehicles={indiaData.fleetCategories.map(category => category.name)}` to `vehicles={indiaData.fleetVehicles?.map(v => `${v.name} (${v.cabType}, ${v.fuelType})`)}`.
3. In src/components/ratecard/EnterpriseRateCardDesk.tsx:
   Sanitize the secondary calculator tab. Remove fabricated monthly retainers (58000, 96000, 185000, etc.) and calculations. Display "Request a quote" for custom corporate allocations and attach the shared note: "Vehicle allocation and pricing are confirmed for your location, dates and requirements."
4. Execute verification commands using run_command:
   - node scripts/challenger-m1-stress-test.mjs (verify 17/17 pass)
   - node scripts/verify-milestone1-adversarial.mjs (verify 26/26 pass)
   - npm run type-check
   - npm run lint
   Ensure all pass with zero errors.

Write your report to d:\victor website\.agents\teamwork\worker_m1_fix\report.md and handoff to d:\victor website\.agents\teamwork\worker_m1_fix\handoff.md.
Send a message to orchestrator parent (conversation ID: 6b49676e-9eb3-4a24-b81e-24558c3bbf1b) when done.
