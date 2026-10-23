## 2026-10-22T18:45:00Z
Task: Implement Milestone 4 (Enquiry Form Pre-fill, Multi-Language Localization, 104/104 E2E Test Suite Pass, Documentation & Screenshots)
Read:
- d:\victor website\.agents\teamwork\ORIGINAL_REQUEST.md
- d:\victor website\AGENTS.md
- d:\victor website\.agents\teamwork\PROJECT.md
- d:\victor website\.agents\teamwork\TEST_READY.md
- d:\victor website\.agents\teamwork\orchestrator_1\handoff.md
- d:\victor website\.agents\teamwork\worker_m3\handoff.md
- d:\victor website\scripts\verify-fleet-modernization.mjs

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your exclusive write ownership:
- src/content/india.json (add seatingCapacity: "12 Seater" to Urbania)
- src/components/home/EnquirySection.tsx
- src/lib/enquiryMessage.ts
- src/i18n/types.ts
- src/i18n/dictionaries/en.ts
- src/i18n/dictionaries/hi.ts
- src/i18n/dictionaries/te.ts
- src/i18n/dictionaries/ar.ts
- docs/handoff.md
- docs/screenshots/ (screenshot capture)

Task requirements:
1. In src/content/india.json:
   - For Urbania under fleetVehicles, ensure "seatingCapacity": "12 Seater" is present.
2. In src/components/home/EnquirySection.tsx:
   - Read searchParams.get("vehicle") on mount/param change.
   - When vehicle param is present, store it in state (e.g. selectedVehicle) and display a badge/indicator showing the preselected vehicle.
   - Ensure the vehicle value is passed to buildEnquiryMessage in the submit/WhatsApp action.
3. In src/lib/enquiryMessage.ts:
   - Add optional field `vehicle?: string | null` to `EnquiryDraft`.
   - When `draft.vehicle` is present, format line `*Vehicle Requested:* ${draft.vehicle}` in the English draft and appropriate localized drafts.
4. In src/i18n/:
   - In src/i18n/types.ts: Define keys for fleet filter tabs, fuel badges, buttons ('Request a quote', 'Enquire about this vehicle'), and shared allocation notes.
   - In src/i18n/dictionaries/en.ts, hi.ts, te.ts, ar.ts: Provide full translations for these keys.
   - CRITICAL REQUIREMENT: Vehicle model names MUST remain invariant Latin text in all languages (e.g. 'Swift Dzire', 'Tata Tigor', 'MG ZS EV', etc.). Remove any transliterated names in hi.ts and te.ts.
5. Verification & Quality Gates:
   - Run `node scripts/verify-fleet-modernization.mjs` (must pass 104/104 tests).
   - Run `npm run type-check` (must exit 0 with 0 errors).
   - Run `npm run lint` (must exit 0 with 0 errors/warnings).
   - Run `npm run build` (must compile cleanly).
6. Capture desktop (1440x900) and mobile (390x844) screenshots into docs/screenshots/:
   - Desktop and mobile view of /india/fleet (All vehicles)
   - Desktop and mobile view of /india/fleet#electric (EV tab active)
   - Desktop and mobile view of /india/contact with prefilled vehicle
7. Update docs/handoff.md:
   - Complete implementation summary, test logs, screenshot links, and handoff instructions per AGENTS.md.

Write your report to d:\victor website\.agents\teamwork\worker_m4\report.md and handoff to d:\victor website\.agents\teamwork\worker_m4\handoff.md.
Send message to orchestrator parent (conversation ID: 6b49676e-9eb3-4a24-b81e-24558c3bbf1b) when done.
