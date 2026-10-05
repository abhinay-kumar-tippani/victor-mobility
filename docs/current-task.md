# Milestone: Phase 3 — Enterprise Corporate RFP Portal, Strategic Corridor Matrix & International SEO
Owner: Antigravity.
Reference: Authorized 2024 Victor Business Portfolio Brochure (Pages 6, 7, 8, 12, 16) & AGENTS.md Corporate Procurement Directives.

Scope completed in this milestone:
1. Enterprise Corporate RFP Portals:
   - Built dedicated procurement portals for India (`/india/rfp`) and UAE (`/uae/rfp`).
   - Grounded in MNC tender workflows (Fortune 500 tech campuses, banking conglomerates, and free-zone enterprises).
   - Embedded Schema.org JSON-LD structured data (`ContactPage`, `Organization`) on both portals for enterprise search indexing.
   - Clarified in submission UI that sending an RFP requests a formal commercial quotation and does not constitute a confirmed contract.

2. Interactive 4-Step Corporate RFP Builder (`src/components/rfp/CorporateRfpBuilder.tsx`):
   - **Step 1: Corporate Profile & Facility Leads**: Company entity, facility director/procurement contact name, corporate email, phone, and operational city.
   - **Step 2: Operational Contract Scope**: Daily employee volume tiers (50 to 5,000+ commuters/day), shift roster patterns (General, 2-shift, 24/7 IT/BPO 3-shift rotation), corridor notes.
   - **Step 3: Fleet Mix & Compliance Standards**: Fleet selection (Sedans, Executive MPVs, Staff Buses/Tempo Travelers, Electric Vehicles EV) and 5 enterprise compliance standards (100% Police/BGV verification, GPS telematics & panic button integration, female passenger escort protocols, daily sanitization, ISO audit readiness).
   - **Step 4: Formal Tender Document Review & Dispatch**: Formats a formal enterprise tender brief with one-click copy, formatted WhatsApp dispatch directly to regional desks (`+91 93965 46950` for India, `+971 52 455 2441` for UAE), and corporate email prefill.

3. Strategic Corridor Matrix (`src/components/home/CorridorMatrix.tsx`):
   - High-impact interactive component mapping primary business corridors, tech parks, expressways, and fleet capabilities for major regional operating zones:
     - **India Hubs**: Hyderabad (HITEC City, Financial District, Gachibowli, Shamshabad Airport corridor), Bengaluru (Outer Ring Road, Whitefield, Electronic City, Kempegowda Airport corridor), Pune (Hinjawadi Phase 1-3, Magarpatta, Kharadi, Chakan industrial belt).
     - **UAE Hubs**: Dubai (DIFC, Business Bay, Downtown, Dubai South / DWC, DXB Airport corridor), Abu Dhabi (ADGM Al Maryah Island, Yas Island, Industrial City ICAD), Sharjah (Sharjah Airport International Free Zone SAIF, Al Majaz, Hamriyah Free Zone).
   - Integrated into both `/india/services` and `/uae/services` alongside the RFP desks.

4. Header & Footer Global Integration:
   - Added "RFP Desk" to primary navigation items (`navItems`) dynamically adapting to `/india/rfp` and `/uae/rfp`.
   - Updated `Footer.tsx` to dynamically route navigation links, legal links, and added the dedicated "Corporate RFP Desk" link under Quick Navigation.

5. Sitemap & Static Generation:
   - Added `/india/rfp` and `/uae/rfp` to `src/app/sitemap.ts` (32 total static SSG pages).
   - Build compiles 32/32 static pages with zero errors.

6. Automated Quality & Verification:
   - Production Build (`next build`) — 32/32 static pages compiled.
   - Playwright verification suite (`scripts/verify-phase3.mjs`) — 100% pass across all 6 test suites.
   - Visual screenshots captured:
     - `phase3-india-rfp-desktop.png`
     - `phase3-india-rfp-mobile.png`
     - `phase3-uae-rfp-desktop.png`
