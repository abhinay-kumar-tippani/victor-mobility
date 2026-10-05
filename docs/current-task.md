# Milestone: Phase 14 — Corporate Billing, GST/VAT Invoicing & Duty Slip Desk (/billing)
Owner: Antigravity.
Reference: Authorized 2024 Victor Business Portfolio Brochure (Page 2, 4, 10: Financial Integrity, Corporate Net Credit, SAC 9966 Tax Input Credit, Digital GPS Duty Slips, Transparent Fastag/Salik Toll Accounting).

Scope completed in this milestone:
1. Corporate Billing & Tax Framework Dataset (`src/content/billing.json`):
   - Detailed corporate taxation, credit terms, and duty slip manifests for India (`/india/billing`) and UAE (`/uae/billing`):
     - **India Tax Framework**:
       - SAC Code 996601: Rental Services of Passenger Transport Vehicles With Operators.
       - 5% GST (RCM / forward charge without ITC) vs 12% GST Forward Charge with 100% Input Tax Credit (ITC) eligibility for commercial corporate entities.
       - Multi-state GSTIN compliance across Telangana (36), Karnataka (29), and Maharashtra (27).
     - **UAE Tax Framework**:
       - Federal Tax Authority (FTA) Tax Registration Number (TRN): 100482910400003.
       - 5% Standard Commercial VAT on passenger luxury chauffeur transit.
       - Transparent Dubai Salik toll and airport parking electronic manifests.
     - **Corporate Credit Governance**:
       - 30-Day Net Corporate Credit terms upon standard vendor onboarding.
       - Fortnightly / Monthly consolidated electronic tax invoices delivered within 48 hours of billing cycle close.
       - Disputed Line-Item Freeze SLA: Disputed line items isolated for 48-hour audit review while undisputed amounts clear normally with zero operational service interruption.
     - **Authentic Sample Duty Slips**:
       - `VIC-DS-8841`: Deloitte Global Services (Toyota Innova HyCross, K. Venkatesh, 88 km, Fastag tolls, AIS-140 GPS verified, passenger OTP authenticated).
       - `VIC-DS-9102`: Amazon Development Centre India (44-Seater Luxury AC Coach, S. Anand Murthy, 46 km, roster supervisor manifest sign-off).
       - `VIC-DXB-7721`: Standard Chartered Bank UAE (Mercedes-Benz S-Class, M. Farhan Al-Mansoor, 55 km, Salik tolls, electronic tablet signature).
       - `VIC-AUH-4109`: Abu Dhabi Investment Council (Mercedes-Maybach S 680, T. Rashid, 160 km, protocol officer confirmation).

2. Interactive Corporate Billing Desk Component (`src/components/billing/CorporateBillingDesk.tsx`):
   - **Digital Duty Slip Audit Inspector**:
     - Interactive chips to toggle between executive saloon retainers and campus commuter shuttles.
     - Complete digital duty slip manifest layout featuring GPS start/end odometer readings, vehicle details, Fastag/Salik toll breakdowns, and OTP authentication stamps.
     - "Print Duty Slip" action (`window.print()`).
   - **Interactive GST / VAT & ITC Reconciler**:
     - Monthly Transit Spend slider (₹25,000 to ₹25,00,000+ / AED 2,500 to AED 250,000+).
     - Tax Scheme selector (5% vs 12% GST / 5% UAE VAT).
     - Dynamic financial outputs: Base Fare, Billed GST/VAT, Input Tax Credit (ITC) savings, Net Corporate Expenditure, and 30-day working capital float value.
     - "Open Corporate Account on WhatsApp" with prefilled spend, tax category, and credit preferences.

3. Dedicated Route Pages:
   - `/india/billing`: India Corporate Billing, GST Invoicing & Digital Duty Slip Desk with Schema.org `Service` structured data.
   - `/uae/billing`: UAE Corporate Billing, FTA VAT & Electronic Invoicing Desk with Schema.org `Service` structured data.

4. Global Navigation & Cross-Linking:
   - Added "Corporate Billing & Invoicing" link under Navigation in `src/components/layout/Footer.tsx`.
   - Indexed in `src/app/sitemap.ts` (bringing total static SSG routes to **54 static pages**).

5. Automated Verification & Quality Gates:
   - TypeScript Typecheck (`tsc --noEmit`) — 0 errors.
   - Production Build (`next build`) — 54/54 static pages compiled (`○` and `●`).
   - Playwright verification suite (`scripts/verify-phase14.mjs`) — 100% pass across all 5 test suites.
   - Visual screenshots captured:
     - `phase14-india-billing-desktop.png`
     - `phase14-india-billing-mobile.png`
     - `phase14-uae-billing-desktop.png`
