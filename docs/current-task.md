# Milestone: Phase 20 — Enterprise Fleet TCO & CAPEX vs OPEX Transition Desk (/tco-calculator)
Owner: Antigravity.
Reference: Authorized 2024 Victor Business Portfolio Brochure (Page 2, 4, 6, 8, 10: Fixed Monthly Cost, 0% Capital Expenditure, Fleet Maintenance & Depreciation Transfer, Standby Vehicle Replacement SLA, 100% Tax Deductible OPEX).

Scope completed in this milestone:
1. Enterprise Fleet TCO Dataset (`src/content/tco.json`):
   - Comprehensive Total Cost of Ownership (TCO) financial model, vehicle asset classes, procurement models, and risk transfer schedules for India (`/india/tco-calculator`) and UAE (`/uae/tco-calculator`):
     - **Vehicle Classifications & Capital Valuations (India)**:
       - *Executive Saloon* (Dzire / Ciaz / Camry): Purchase Price ₹11,00,000, Monthly Depreciation ₹18,333, Maintenance/Tyres ₹6,500, Insurance/Tax ₹4,500, Driver Payroll ₹24,000, Victor Retainer ₹48,000/mo.
       - *Premium MPV* (Toyota Innova Crysta / HyCross): Purchase Price ₹24,00,000, Monthly Depreciation ₹40,000, Maintenance/Tyres ₹12,000, Insurance/Tax ₹8,500, Driver Payroll ₹26,000, Victor Retainer ₹82,000/mo.
       - *Executive Shuttle* (Force Urbania / 22-Seater AC): Purchase Price ₹32,00,000, Monthly Depreciation ₹53,333, Maintenance/Tyres ₹18,000, Insurance/Tax ₹12,500, Driver Payroll ₹28,000, Victor Retainer ₹1,15,000/mo.
       - *Luxury Transit Coach* (44-Seater Air-Suspension): Purchase Price ₹65,00,000, Monthly Depreciation ₹1,08,333, Maintenance/Tyres ₹28,000, Insurance/Tax ₹18,000, Driver Payroll ₹32,000, Victor Retainer ₹1,85,000/mo.
     - **Procurement Comparison Models**:
       - *Company-Owned Fleet (CAPEX Model)*: +28% overhead factor (15–20% annual asset depreciation hitting enterprise EBITDA, internal fleet supervisor payroll, downtime risk).
       - *Fragmented Local Taxi Vendors*: +22% leakage (unregulated trip sheets, 8–12% billing disputes, ad-hoc surge pricing, delayed ITC).
       - *App-Based Ride Hailing (Employee Reimbursements)*: +35% leakage (1.8x to 2.5x morning/evening surge multipliers, lack of duty of care, high expense fraud risk).
     - **CAPEX vs OPEX Risk Transfer Matrix**:
       - Capital Outlay: ₹11L to ₹65L per vehicle locked into depreciating assets vs ₹0 CAPEX (100% Tax-Deductible OPEX).
       - Vehicle Breakdown & Downtime: 1 to 3 days out of service vs 30–45 minute guaranteed vehicle swap from depot standby pool.
       - Driver Welfare: Corporate HR liable for PF/ESIC audits vs 100% Victor Mobility payroll compliance backed by certified challans.
       - Maintenance & Tyres: Unscheduled repair bills & parts markups vs inclusive scheduled servicing.
       - GST Input Tax Credit: Ineligible or fragmented ITC receipts vs 100% compliant e-invoices with SAC 9966 automated ITC reconciliation.
     - **UAE Market Model**:
       - Lexus ES300h / Mercedes E-Class, Mercedes V-Class / Lexus LM, VIP Sprinter 16-Seater, and 50-Seater luxury touring coach modeled in AED with FTA 5% VAT recovery and RTA limousine permit governance.

2. Interactive Fleet TCO Calculator Desk Component (`src/components/tco/FleetTcoCalculatorDesk.tsx`):
   - **Real-Time Financial Simulator**:
     - Dynamic category selector, fleet size slider (1 to 50 vehicles), daily distance slider (40 to 240 km/day), and operating schedule buttons (22, 26, 30 days/mo).
     - Live output engine calculating Monthly Current Spend, Victor Retainer Spend, Monthly Net Savings, Annual Run-Rate Benefit, % Cost Reduction, and Working Capital Unlocked.
     - Visual cost allocation progress bars for Driver Payroll, Vehicle Depreciation, Scheduled Maintenance, and Commercial Insurance.
   - **CAPEX vs OPEX Risk Transfer Matrix**: 5-point assessment table covering balance sheet exposure, downtime risk, and statutory compliance.
   - **Current Model Spend Leakage Breakdown**: Comprehensive analysis of hidden costs across Company-Owned, Fragmented Vendors, and Ride-Hailing models.
   - **CFO Advisory Inquiry Drawer**: Prepopulated parameters and honest disclaimer (`_Note: This WhatsApp message initiates an enterprise fleet TCO inquiry with Victor Mobility and does not constitute a signed contract._`).
   - **Print Financial Audit**: `window.print()` action for institutional board presentation.

3. Dedicated Route Pages:
   - `/india/tco-calculator`: India Enterprise Fleet TCO & CAPEX vs OPEX Transition Desk with Schema.org `WebApplication` structured data.
   - `/uae/tco-calculator`: UAE Corporate Fleet TCO & Executive Retainer Transition Desk with Schema.org `WebApplication` structured data.

4. Global Navigation & Cross-Linking:
   - Added "Fleet TCO & Transition Desk" link under Navigation in `src/components/layout/Footer.tsx`.
   - Indexed in `src/app/sitemap.ts` (bringing total static SSG routes to **66 static pages**).

5. Automated Verification & Quality Gates:
   - TypeScript Typecheck (`tsc --noEmit`) — 0 errors.
   - Production Build (`next build`) — 66/66 static pages compiled (`○` and `●`).
   - Playwright verification suite (`scripts/verify-phase20.mjs`) — 100% pass across all 5 test suites.
   - Visual screenshots captured:
     - `phase20-india-tco-desktop.png`
     - `phase20-india-tco-mobile.png`
     - `phase20-uae-tco-desktop.png`
