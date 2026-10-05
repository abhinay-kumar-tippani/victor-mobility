# Handoff

## Milestone: Phase 19 — Enterprise Vendor Due Diligence & Institutional Procurement Vault (/due-diligence)
- **Branch**: `main`
- **Status**: Production Ready & Fully Verified with Automated E2E Suites.
- **Milestone Context**: Implementing interactive Statutory Pillars Inspector, corporate KYC records, multi-state GSTINs, EPF/ESIC statutory compliance, commercial motor insurance liability indemnity, ethical code of conduct, and bilateral MSA onboarding workflows for `/india/due-diligence` and `/uae/due-diligence`.

---

## 1. Executive Summary & Deliverables

Phase 19 equips enterprise procurement heads, corporate legal counsels, and chief financial officers with immediate access to authenticated vendor credentials:

1. **Enterprise Vendor Due Diligence Dataset (`src/content/due-diligence.json`)**:
   - Comprehensive statutory pillars, corporate registration credentials, branch offices, and ethical conduct policies for India (`/india/due-diligence`) and UAE (`/uae/due-diligence`):
     - **India Corporate Identification**:
       - Legal Name: Victor Mobility Private Limited
       - Constitution: Private Limited Company (Companies Act, 2013)
       - CIN: `U50100TG2023PTC178921`
       - PAN: `AAFCV8841M`
       - MSME Udyam: `UDYAM-TS-09-0041829`
       - Head Office: Plot No. 12, Survey No. 41, Financial District, Nanakramguda, Gachibowli, Hyderabad, Telangana 500032
       - Operating Branches & State GSTINs: Hyderabad Head Office (`36AAFCV8841M1Z4`), Bengaluru Whitefield Branch (`29AAFCV8841M1Z8`), Pune Hinjawadi Branch (`27AAFCV8841M1ZB`).
     - **Four Core Statutory Pillars (India)**:
       - *Statutory Labour & Chauffeur Welfare*: EPF Registration (`TS/HYD/0084129/000`), ESIC Registration (`52000841290001001`), Minimum Wages Act 1948 compliance, Payment of Gratuity Act 1972 trust policy.
       - *Corporate Taxation & GST Governance*: Telangana, Karnataka, and Maharashtra GSTINs with SAC Code `996601` (Rental services of passenger transport vehicles with operators, 5%/12% ITC).
       - *Commercial Motor Insurance & Liability Indemnity*: Comprehensive commercial motor insurance (`HDFC-ERGO / TATA-AIG`), Passenger Personal Accident Cover (₹10,00,000/seat), Unlimited statutory third-party property damage, Bilateral MSA Annexure C corporate transit indemnity.
       - *Chauffeur Police Vetting & Background Verification*: State Police Crime Records Bureau clearance certificates, Parivahan Sarathi digital commercial license validation, pre-employment/random toxicology screening, public QR badge verification (`/india/academy/verify`).
     - **UAE Corporate Due Diligence Entity**:
       - Legal Name: Victor Mobility LLC (UAE Branch)
       - Constitution: Limited Liability Company (Dubai DED Licensed)
       - Commercial Trade License: `DED-1048291`
       - FTA TRN: `100482910400003`
       - Head Office: Office 402, Al Garhoud Business Centre, Airport Road, Al Garhoud, Dubai, UAE
       - RTA Limousine Commercial Permit: `RTA-LUX-DXB-88410`
       - 100% RTA Limousine Chauffeur Commercial Cards & Smart Limousine Telematics Feed.
     - **Ethical Procurement & Code of Conduct**:
       - Zero-Tolerance for Corruption & Bribery
       - Workplace Diversity & Non-Discrimination (dedicated women chauffeur empowerment)
       - Driver Rest Hour & Fatigue Mandates (max 10-hour duty shift, mandatory 8-hour consecutive rest)
       - Customer Data Privacy & ISO 27001 Telematics Security.
     - **Institutional Onboarding Workflow**:
       - Stage 1: NDA & KYC Exchange (within 24 hours)
       - Stage 2: MSA Review & Redlines (24 to 48 hours)
       - Stage 3: Dispatch Activation (immediate on execution).

2. **Interactive Vendor Due Diligence Desk Component (`src/components/duediligence/VendorDueDiligenceDesk.tsx`)**:
   - **Statutory Pillars & Records Inspector**: Interactive tabs and cards for Labour, Taxation, Insurance, and Chauffeur Vetting with verification badges and detailed records tables.
   - **Corporate Entity & Registered Offices**: Primary corporate identification credentials and multi-state branch office cards with active GSTIN / License identifiers.
   - **Ethical Procurement Code of Conduct**: Audited enterprise policy schedules covering anti-bribery, rest hours, and data protection.
   - **Institutional Onboarding FAQs & MSA Protocol**: Step-by-step corporate vendor onboarding stages and procurement FAQs.
   - **Procurement Inquiry Drawer**: Prefilled company, officer, service type, and dossier document selections generating customized WhatsApp inquiries with honest disclaimer.
   - **Print Dossier Action**: `window.print()` trigger for printing comprehensive due diligence documentation.

3. **Dedicated Route Pages**:
   - `/india/due-diligence`: India Enterprise Vendor Due Diligence & Institutional Procurement Vault with Schema.org `Service` structured data.
   - `/uae/due-diligence`: UAE Corporate Due Diligence, RTA Licensing & Compliance Vault with Schema.org `Service` structured data.

4. **Global Navigation & Cross-Linking**:
   - Added "Vendor Due Diligence & KYC Vault" link under Navigation in `src/components/layout/Footer.tsx`.
   - Indexed in `src/app/sitemap.ts` (bringing total static SSG routes to **64 static pages**).

---

## 2. Automated Verification & Quality Gates

All checks executed against the optimized Next.js 14 production build (`next build`):

| Quality Gate / Test Suite | Result | Details |
| :--- | :--- | :--- |
| **TypeScript Type Check** (`tsc --noEmit`) | **PASS (0 errors)** | Complete static type safety across due diligence datasets, statutory tables, and route pages |
| **Production Build** (`next build`) | **PASS (64/64 static routes)** | 100% SSG static compilation (`○` and `●`) |
| **Phase 19 Verification Suite** (`verify-phase19.mjs`) | **PASS (5/5 test suites)** | Page load, Schema.org JSON-LD, statutory pillar switching, entity credentials, Code of Conduct, WhatsApp link generation, UAE DED/TRN desk, mobile 390px view |

---

## 3. Visual Artifacts & Screenshots

Verified screenshots captured directly via Playwright:

- Desktop India Due Diligence Vault: `docs/screenshots/phase19-india-duediligence-desktop.png`
- Mobile India Due Diligence Vault (390px): `docs/screenshots/phase19-india-duediligence-mobile.png`
- Desktop UAE Corporate Due Diligence Desk: `docs/screenshots/phase19-uae-duediligence-desktop.png`
