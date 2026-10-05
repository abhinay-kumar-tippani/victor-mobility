# Milestone: Phase 9 — Enterprise ESG & Green Fleet Carbon Calculator (/esg)
Owner: Antigravity.
Reference: Authorized 2024 Victor Business Portfolio Brochure (Page 4, 10: Fleet Sustainability, EV Roadmap, High-Capacity Group Transit, ISO Environmental Standards).

Scope completed in this milestone:
1. ESG & Carbon Modeling Dataset (`src/content/esg.json`):
   - Detailed emissions factors and benchmarks for India (`/india/esg`) and UAE (`/uae/esg`):
     - Single-occupancy ICE car vs high-occupancy corporate bus (148g CO2/km vs 18.6g CO2/passenger-km; ~87% carbon reduction).
     - Electric Vehicle (EV) fleet factor (44g CO2/km life-cycle grid in India, 38g CO2/km in UAE).
     - Mature tree absorption equivalent (21.8 kg CO2/year).
     - Crude oil consumption offset factors.
   - 4 Operational ESG Pillars:
     - High-Occupancy Group Transit (Scope 3 commute emissions reduction).
     - Telematics & Zero-Deadhead Routing (algorithmic pickup clusters avoiding empty engine idling).
     - Chauffeur Eco-Driving Certification (smooth acceleration curves, idle cutoff > 60s).
     - Planned Progressive EV Fleet Roadmap (zero-emission airport transfers & tech campus feeder loops).
   - Governance Standards: BRSR-audit compatibility, transparent Scope 3 department invoicing, strict particulate filter checks.

2. Interactive Corporate ESG Calculator (`src/components/esg/CorporateEsgCalculator.tsx`):
   - **Interactive Sliders**:
     - Commuter Volume (20 to 1,000 corporate passengers).
     - Daily Round-Trip Commute Distance (15 to 120 km/day).
     - Strategy Selector: Shared High-Capacity Buses (22-44 Pax) vs Electric Vehicle (EV) Transition Mix (10% to 100%).
   - **Live Carbon Impact Metrics**:
     - Monthly & Annual Metric Tonnes CO2e saved with percentage reduction index.
     - Mature forest equivalent (number of trees).
     - Barrels of crude oil conserved.
   - **Boardroom & Procurement Reporting**:
     - One-click "Print ESG Report" action with clean print styling (`window.print()`).
     - "Consult ESG Mobility Specialist via WhatsApp" prefilling corporate commuter count, route distance, strategy, and annual CO2 savings.

3. Dedicated Route Pages:
   - `/india/esg`: India Enterprise ESG & Sustainable Commute Desk with Schema.org `WebApplication` structured data.
   - `/uae/esg`: UAE Green Limousine & Sustainable Mobility Desk aligned with UAE Net Zero 2050 strategy and Dubai Clean Energy targets.

4. Global Navigation & Sitemap:
   - `Footer.tsx`: Added "ESG & Green Mobility" link under Quick Navigation across both India and UAE portals.
   - `src/app/sitemap.ts`: Indexed all 44 static SSG routes (100% static compilation).

5. Automated Quality & Verification:
   - TypeScript Typecheck (`tsc --noEmit`) — 0 errors.
   - Production Build (`next build`) — 44/44 static pages compiled.
   - Playwright verification suite (`scripts/verify-phase9.mjs`) — 100% pass across all 5 test suites.
   - Visual screenshots captured:
     - `phase9-india-esg-desktop.png`
     - `phase9-india-esg-mobile.png`
     - `phase9-uae-esg-desktop.png`
