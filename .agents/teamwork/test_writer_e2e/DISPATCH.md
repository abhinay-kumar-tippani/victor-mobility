## 2026-10-22T14:03:13Z
[Message] timestamp=2026-10-22T14:03:13Z sender=6b49676e-9eb3-4a24-b81e-24558c3bbf1b priority=MESSAGE_PRIORITY_HIGH content=You are an E2E Test Writer agent (teamwork_preview_test_writer).
Your working directory is: d:\victor website\.agents\teamwork\test_writer_e2e
Read d:\victor website\.agents\teamwork\ORIGINAL_REQUEST.md and d:\victor website\AGENTS.md before starting work.
Also read:
- d:\victor website\.agents\teamwork\PROJECT.md
- d:\victor website\.agents\teamwork\TEST_INFRA.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All test cases and assertions must be genuine and independently derived from ORIGINAL_REQUEST.md and specifications. DO NOT create dummy tests that trivially pass.

Your exclusive write ownership:
- scripts/verify-fleet-modernization.mjs
- d:\victor website\.agents\teamwork\TEST_READY.md

Your task is to implement the E2E Testing Track (Tiers 1-4):
1. Create scripts/verify-fleet-modernization.mjs as a comprehensive automated test script runnable via `node scripts/verify-fleet-modernization.mjs`.
   Implement tests across the 4 tiers covering all 9 features:
   - Tier 1: Feature Coverage (≥5 tests per feature)
     - F1: 10 manager-approved vehicles in SOT in exact order, names, fuel labels, cab types
     - F2: Zero fabricated prices or sample rates across active India routes/files; shared note present
     - F3: 5 filter tabs with exact counts (All 10, Sedan 5, SUV 4, 12 Seater 1, EV 4)
     - F4: /india/fleet#electric hash activates EV filter
     - F5: Reference images present in public/images/fleet/, docs/fleet-image-sources.md present, shared caption present
     - F6: Zero India vehicles on /uae routes, pruned sample rates, RTL dir attribute present
     - F7: "Enquire about this vehicle" opens enquiry flow with vehicle param prefilled in form & WhatsApp draft
     - F8: i18n dictionaries contain translations for tabs, fuels, buttons, notes; model names strictly Latin
     - F9: Quality gates pass (type-check, lint, build)
   - Tier 2: Boundary & Corner Cases (≥5 tests per feature)
     - Direct URL hash navigation, case sensitivity, unknown vehicle fallback, zero duplicate cards
   - Tier 3: Cross-Feature Combinations (≥9 tests)
     - EV tab + Enquiry prefill; UAE route + Arabic RTL; 12 Seater + RFP selection
   - Tier 4: Real-World Scenarios (≥5 realistic application scenarios)
     - Corporate mobility buyer scenario, EV executive scenario, UAE regional enquiry scenario, Urbania shuttle scenario, Multi-language switcher scenario.
2. When the test script is ready, write d:\victor website\.agents\teamwork\TEST_READY.md summarizing test counts, runner command, and coverage checklist.
3. Send a message to orchestrator parent (conversation ID: 6b49676e-9eb3-4a24-b81e-24558c3bbf1b) when done.
