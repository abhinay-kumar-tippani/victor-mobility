## 2026-10-22T17:45:28Z
You are a Worker agent (teamwork_preview_worker).
Your working directory is: d:\victor website\.agents\teamwork\worker_m3
Read d:\victor website\.agents\teamwork\ORIGINAL_REQUEST.md and d:\victor website\AGENTS.md before starting work.
Also read:
- d:\victor website\.agents\teamwork\PROJECT.md
- d:\victor website\.agents\teamwork\TEST_READY.md
- d:\victor website\.agents\teamwork\explorer_survey_2\report.md and handoff.md (UAE findings)
- d:\victor website\.agents\teamwork\explorer_survey_3\report.md and handoff.md (Imagery findings)

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your exclusive write ownership:
- public/images/fleet/
- docs/fleet-image-sources.md
- src/content/uae.json
- src/content/fleet-specifications.json
- src/app/uae/fleet/page.tsx
- src/app/uae/page.tsx

Your task is to implement Milestone 3 (Licensed Reference Imagery & Attribution + UAE Fleet Pruning):
1. Licensed Fleet Imagery & Attribution (R3):
   - Ensure public/images/fleet/ exists and contains clean, proportional 3/4 exterior model reference images for all 10 vehicles:
     swift-dzire.webp, hyundai-aura.webp, tata-tigor-ev.webp, tata-nexon-ev.webp, mg-zs-ev.webp, mahindra-marazzo.webp, ertiga-cng.webp, innova-crysta.webp, kia-carens-clavis-ev.webp, force-urbania.webp.
     Ensure dedicated EV styling for Tigor EV, Nexon EV, MG ZS EV, and Carens Clavis EV.
   - Create docs/fleet-image-sources.md with complete provenance documentation:
     For every one of the 10 vehicles, log Source URL, Author/Organization, License terms (Wikimedia Commons / Manufacturer Press / CC BY), and attribution text.
   - Ensure the discreet shared caption is present: "Images show vehicle models; actual assigned vehicles may vary."
2. Regional Scope & UAE Fleet Pruning (R4):
   - In src/content/uae.json:
     - Set price: null across all items in fleetPresentation.items.
     - Ensure priceDisplay is "Request a quote" / "طلب عرض أسعار", packageLabel is "Confirmed on enquiry", and sharedNote is "Vehicle allocation and pricing are confirmed for your location, dates and requirements."
   - In src/content/fleet-specifications.json:
     - Prune all numeric tariffs from rateCard blocks in the UAE section.
   - In src/app/uae/fleet/page.tsx and src/app/uae/page.tsx:
     - Ensure zero India vehicle models appear on UAE routes.
     - Preserve UAE RTL layout (dir="rtl"), English and Arabic localization, and independently approved UAE brochure content.
3. Verification:
   - node scripts/verify-fleet-modernization.mjs --tier=1 (verify F5 and F6 pass)
   - npm run type-check
   - npm run lint
   Ensure all pass with zero errors.

Write your report to d:\victor website\.agents\teamwork\worker_m3\report.md and handoff to d:\victor website\.agents\teamwork\worker_m3\handoff.md.
Send a message to orchestrator parent (conversation ID: 6b49676e-9eb3-4a24-b81e-24558c3bbf1b) when done.
