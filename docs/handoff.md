# Handoff

## Milestone: Phase 16 — Enterprise Master Rate Card & Contract Retainer Desk (/rate-card)
- **Branch**: `main`
- **Status**: Production Ready & Fully Verified with Automated E2E Suites.
- **Milestone Context**: Implementing interactive Master Tariff Matrix, volume rebate tier calculator, Master Services Agreement (MSA) onboarding roadmap, and transparent Fastag/Salik disclosure for `/india/rate-card` and `/uae/rate-card`.

---

## 1. Executive Summary & Deliverables

Phase 16 equips corporate procurement officers, travel managers, and facilities directors with complete transparency into standard commercial tariffs and contract retainer packages:

1. **Enterprise Rate Card & Retainer Dataset (`src/content/rate-card.json`)**:
   - Detailed corporate tariff matrices, vehicle category specifications, and contract packages for India (`/india/rate-card`) and UAE (`/uae/rate-card`):
     - **India Corporate Tariffs**:
       - **Executive Sedan** (Dzire / Etios / Aura): 4h/40km (₹1,400), 8h/80km (₹2,400), 12h/120km (₹3,400), Extra km (₹14), Extra hr (₹150), Monthly Retainer (₹58,000 for 26D/2,600km), Outstation (₹13/km, min 250km/day + ₹400 bata).
       - **Corporate MPV** (Innova Crysta / HyCross): 4h/40km (₹2,400), 8h/80km (₹4,200), 12h/120km (₹5,800), Extra km (₹22), Extra hr (₹250), Monthly Retainer (₹96,000 for 26D/2,600km), Outstation (₹20/km, min 300km/day + ₹500 bata).
       - **Premium Luxury Saloon** (Camry Hybrid / BMW 5 Series / Mercedes E-Class): 4h/40km (₹4,500), 8h/80km (₹8,500), 12h/120km (₹12,000), Extra km (₹45), Extra hr (₹500), Monthly Retainer (₹1,85,000), Outstation (₹42/km + ₹800 bata).
       - **Executive Minibus & Van** (Force Urbania / Luxury Tempo Traveller): 4h/40km (₹3,800), 8h/80km (₹6,800), Extra km (₹32), Extra hr (₹350), Monthly Retainer (₹1,45,000), Outstation (₹30/km + ₹600 bata).
       - **High-Capacity Commuter Coach** (22 & 44-Seater AC Luxury Coach): 4h/40km (₹5,500), 8h/80km (₹9,800), Extra km (₹52), Extra hr (₹650), Fixed Route Campus Shuttles (₹1,65,000 – ₹2,40,000/mo).
     - **UAE Limousine & Commercial Fleet Tariffs**:
       - **First Class Saloon** (Mercedes-Benz S-Class / BMW 7 Series / Lexus ES): Half-Day 5h (AED 850), Full-Day 10h (AED 1,600), Monthly Dedicated Retainer (AED 24,000).
       - **Ultra-Luxury Limousine** (Mercedes-Maybach S 680): Half-Day 5h (AED 1,800), Full-Day 10h (AED 3,400), Monthly Retainer (AED 48,000).
       - **Executive SUV & MPV** (Cadillac Escalade / GMC Yukon / V-Class): Half-Day 5h (AED 1,150), Full-Day 10h (AED 2,100), Monthly Retainer (AED 32,000).
       - **VIP Sprinter & Tourism Coach** (18 to 50 seats): Half-Day 5h (AED 1,950), Full-Day 10h (AED 3,600), Monthly Route Contract (AED 28,000 – AED 42,000).
     - **Enterprise Volume Rebate Tiers**:
       - Tier 1: 1–5 Vehicles (Standard Tariff, 30-day net credit, verified chauffeurs).
       - Tier 2: 6–20 Vehicles (8% preferred volume rebate, depot hot-swap standby vehicle).
       - Tier 3: 20+ Vehicles (15% strategic volume rebate, dedicated on-site campus fleet supervisor, custom HRMS API).
     - **Transparent Inclusions & Disclosed Actuals**:
       - Inclusions: Uniformed chauffeur, fuel, maintenance, AIS-140 GPS, 45-min replacement SLA, digital duty slip.
       - Actuals: Fastag tolls, interstate taxes, airport parking, GST/VAT.

2. **Interactive Enterprise Rate Card Desk Component (`src/components/ratecard/EnterpriseRateCardDesk.tsx`)**:
   - **Category Specification & Standard Tariff Matrix**: Interactive selector chips for rapid switching between vehicle classes with local, monthly, and outstation rates.
   - **Volume Rebate & Retainer Sizing Calculator**: Dynamic slider (1 to 30 vehicles) and horizon selector (Monthly vs Annual), computing gross tariff, applied volume rebate, net investment, and hot-swap backup fleet.
   - **MSA & Corporate Governance**: 4-step institutional onboarding framework (KYC, Agreement, Credit Approval, Staging) + Tier perks grid.
   - **Actions**:
     - "Request Contract Schedule on WhatsApp" with prefilled fleet specifications and truthful inquiry disclaimer.
     - "Print Tariff Dossier" (`window.print()`).

3. **Dedicated Route Pages**:
   - `/india/rate-card`: India Enterprise Master Rate Card & Retainer Schedule with Schema.org `Service` structured data.
   - `/uae/rate-card`: UAE Executive Limousine & Commercial Rate Card with Schema.org `Service` structured data.

4. **Global Navigation & Cross-Linking**:
   - Added "Corporate Rate Card & Retainers" link under Navigation in `src/components/layout/Footer.tsx`.
   - Indexed in `src/app/sitemap.ts` (bringing total static SSG routes to **58 static pages**).

---

## 2. Automated Verification & Quality Gates

All checks executed against the optimized Next.js 14 production build (`next build`):

| Quality Gate / Test Suite | Result | Details |
| :--- | :--- | :--- |
| **TypeScript Type Check** (`tsc --noEmit`) | **PASS (0 errors)** | Complete static type safety across rate card datasets, calculator models, and route pages |
| **ESLint** (`next lint`) | **PASS (0 warnings)** | 100% clean rule compliance |
| **Production Build** (`next build`) | **PASS (58/58 static routes)** | 100% SSG static compilation (`○` and `●`) |
| **Phase 16 Verification Suite** (`verify-phase16.mjs`) | **PASS (5/5 test suites)** | Page load, Schema.org JSON-LD, category switching, volume rebate calculator, WhatsApp link generation, UAE limousine tariffs, mobile 390px view |

---

## 3. Visual Artifacts Captured

| Screenshot Artifact | Location | Purpose |
| :--- | :--- | :--- |
| `phase16-india-ratecard-desktop.png` | `docs/screenshots/` | Desktop view of India Rate Card Desk with Executive Sedan, MPV, and Coach tariff matrices |
| `phase16-india-ratecard-mobile.png` | `docs/screenshots/` | Mobile view (390px) showing responsive single-column layout, touch controls, and tariff cards |
| `phase16-uae-ratecard-desktop.png` | `docs/screenshots/` | Desktop view of UAE Limousine Rate Card Desk with First Class, Ultra-Luxury Maybach, and SUV retainers |
