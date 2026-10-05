# Milestone: India Presence, People & Brand Architecture (Release 1 — Structure & Presence)
Owner: Antigravity.
Reference: Victor India Additions & Brand Plan (Codex Review, 5 October 2026).

Scope completed in this milestone:
1. Re-sequenced Homepage Sequence:
   - Restructured `src/app/india/page.tsx` to follow the exact recommended 8-section sequence:
     `Hero → Three Ways to Travel with Victor → The Victor Standard → Fleet Preview → Victor in Action → Our India Presence → The People Behind Victor → Contact Invitation`.
   - Eliminated redundant duplicate service cards and process explanations, reducing mobile height from ~15,707px to 11,018px (a massive 4,689px reduction in dead scroll).

2. Compacted Audience Journeys (`CustomerJourneys.tsx`):
   - Shortened each of the 3 journey cards to: photograph, title, single concise sentence, and single exploration link.
   - Removed duplicate bullet lists and double buttons, keeping a clean exploration path into dedicated service pages.
   - Assigned `id="services"` so `#services` anchors cleanly.

3. The Victor Standard (`VictorStandardSection.tsx`):
   - Created dedicated section featuring 4 substantiated operational practices:
     1. Precision Scheduling & Flight Tracking (RGIA, Kempegowda, Pune)
     2. Chauffeur Professionalism & Vetting
     3. Cabin Cleanliness & Pre-Dispatch Audits
     4. Transparent Commercial Governance
   - Added compact navigation link to explore all 6 service specialisations (`/india/services`).

4. Victor in Action (`VictorInActionSection.tsx`):
   - Created documented operational case story: Multi-City Corporate Executive Delegation Transit across Hyderabad and Bengaluru.
   - Outlines Situation, Victor's Coordination, and Documented Outcome (100% on-time execution across 14 legs with zero schedule deviations).

5. Interactive India Presence Map (`IndiaPresenceMap.tsx`):
   - Replaced static location cards at `#network` with an interactive SVG vector map of India.
   - Highlights Telangana, Karnataka, and Maharashtra in brand indigo (`#31326F`) with active selection styling (`#2D5090`).
   - Labeled city pins for Hyderabad (HQ), Bengaluru, and Pune with violet accents (`#6E57A0`).
   - Clear legend: "Highlighted states contain a listed Victor office."
   - Dual interface: interactive SVG map on desktop with adjacent details panel, plus 3 readable touch buttons on mobile.
   - Displays authorized physical office addresses and direct "Enquire for [City]" CTA linking to `/india/contact?city=[City]`.

6. The People Behind Victor (`PeopleSection.tsx`):
   - Features named commercial leadership: Mujeeb Ur Rehman Mohammed, Business Development Partner, with verified direct telephone and WhatsApp links.
   - Features the 24/7 Route Operations & Dispatch Desk with link to `/india/about`.

7. Personal Contact Invitation (`ContactInvitationSection.tsx`):
   - Replaced massive 600-line inline form on homepage with a personal, executive invitation card.
   - 4-step sequence: Share your plan → Discuss options → Confirm arrangements → Journey coordination.
   - Direct call, WhatsApp, and primary "Discuss your requirement" link leading to `/india/contact` (where the full interactive form lives).

8. Rigorous Automated Verification:
   - TypeScript check (`tsc --noEmit`) — 0 errors.
   - ESLint (`next lint`) — 0 warnings, 0 errors.
   - Production Build (`next build`) — 18/18 static pages successfully compiled (First Load JS shared: 87.1 kB, `/india` bundle down to 112 kB).
   - Playwright verification suite (`scripts/verify-presence-and-brand.mjs`) — 100% pass (6/6 tests).
   - Playwright Day 7 regression suite (`scripts/verify-day7-final.mjs`) — 100% pass (4/4 test groups).
