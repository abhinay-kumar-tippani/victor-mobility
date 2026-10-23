# Explorer Survey Handoff: India Fleet Architecture, Selectors, Estimators & Deep Linking (R1 & R2)

**From**: Explorer (`teamwork_preview_explorer`, conversation: `b9db50df-002b-4fa2-a9a5-9629f3a57953`)  
**To**: Orchestrator Parent (`6b49676e-9eb3-4a24-b81e-24558c3bbf1b`) & Downstream Implementation Agents  
**Target Project**: Victor Mobility (`d:\victor website`)  
**Handoff Type**: Hard (Investigation & Architecture Survey Complete)  

---

## 1. Observation

Direct code and content observations gathered across the repository using `grep_search`, `find_by_name`, and `view_file`:

1. **Current SOT & Fleet Categories in `src/content/india.json`**:
   - `lines 749–795`: `fleetCategories` defines 5 legacy categories:
     `"sedans"` (`brochureModels: ["Swift Dzire", "TATA Tigor"]`), `"mpvs"` (`brochureModels: ["Toyota Innova Crysta", "Mahindra Marazzo", "Force Urbania"]`), `"buses"` (`brochureModels: ["22-seater bus", "44-seater bus"]`), `"luxury"` (`brochureModels: []`), and `"electric"` (`brochureModels: []`).
   - `lines 121–198`: `fleetPresentation` defines category tab copy with fabricated prices:
     - `lines 150–151`: `"price": 2200` for Sedans
     - `lines 161–162`: `"price": 3800` for MPVs
     - `lines 172–173`: `"price": 7200` for Buses
     - `lines 183–184`: `"price": 6500` for Luxury
     - `line 139`: `"pricingSource": "Temporary sample values from existing corridors.json hourlyRetainer data..."`
     - `lines 132–133`: `"priceLabel": "Sample starting price"`, `"priceNote": "Illustrative pricing..."`

2. **Fleet Page Implementation in `src/app/india/fleet/page.tsx` & `src/components/fleet/IndiaFleetSection.tsx`**:
   - `src/app/india/fleet/page.tsx:19`: `<IndiaFleetSection categories={indiaData.fleetCategories} copy={indiaData.fleetPresentation} standalone />`
   - `src/components/fleet/IndiaFleetSection.tsx:30`: `const items = copy.items.filter(item => categories.some(category => category.id === item.id));`
   - `src/components/fleet/IndiaFleetSection.tsx:123–156`: Renders 5 category tabs.
   - `src/components/fleet/IndiaFleetSection.tsx:163–263`: Renders a **single category panel** for whichever tab is active, rather than a card grid of individual vehicles.
   - `src/components/fleet/IndiaFleetSection.tsx:235–240`: Formats and displays numeric price (`effectiveCurrency + active.price.toLocaleString("en-US") + " / " + packageLabel`).
   - `src/components/fleet/IndiaFleetSection.tsx:249`: CTA button links to `${effectiveBasePath}/contact?category=${encodeURIComponent(category.name)}` instead of specific vehicle pre-fill.
   - `src/components/fleet/IndiaFleetSection.tsx:36–57`: Implements `#electric` hash detection, but applies it only to the legacy category tab `"electric"` rather than filtering the 4 EV vehicles across categories.

3. **Homepage Fleet Implementation in `src/app/india/page.tsx` & `src/components/home/FleetSection.tsx`**:
   - `src/app/india/page.tsx:46–49`: Renders `<IndiaFleetSection categories={content.fleetCategories} copy={indiaData.fleetPresentation} />`.
   - `src/components/home/FleetSection.tsx:36–107`: An orphaned/unimported component containing hardcoded `fleetDetails` for `sedans` (`["Maruti Swift Dzire", "Tata Tigor"]`), `mpvs` (`["Toyota Innova Crysta", "Mahindra Marazzo", "Force Urbania"]`), `buses` (`["22-Seater Executive Bus", "44-Seater Luxury Coach"]`), and `luxury`.

4. **Enquiry & Contact Flows in `src/components/home/EnquirySection.tsx` & `src/lib/enquiryMessage.ts`**:
   - `src/components/home/EnquirySection.tsx:97–104`: Extracts `service`, `city`, and `category` from `useSearchParams()`.
   - `src/components/home/EnquirySection.tsx:524–536`: Renders a badge for `selectedCategory`.
   - `src/components/home/EnquirySection.tsx`: **Does not contain a vehicle selector dropdown** nor does it read a `vehicle` URL search parameter.
   - `src/lib/enquiryMessage.ts:1–12`: `EnquiryDraft` interface has `category?: string | null;` but no `vehicle?: string | null;`.
   - `src/lib/enquiryMessage.ts:28, 47, 66, 84`: WhatsApp draft builders format `*Vehicle Category:* ${draft.category}` without a vehicle model line.

5. **RFP & Estimator Components in `src/app/india/rfp/` & `src/app/india/estimator/`**:
   - `src/app/india/rfp/page.tsx:12`: Passes `vehicles={indiaData.fleetCategories.map(category => category.name)}` (the 5 legacy categories).
   - `src/components/planning/RfpDesk.tsx:161–171`: Renders checkboxes for the passed category strings instead of approved vehicles.
   - `src/components/rfp/CorporateRfpBuilder.tsx:110–116`: Hardcodes legacy India vehicles: `["Corporate AC Cabs (4-seater sedans)", "Executive MPVs (6-7 seater Toyota Innova Crysta)", "22-Seater Air-Conditioned Mini Buses", "44/50-Seater Luxury Coaches", "Electric Vehicles (EV Cabs & Shuttles)"]`.
   - `src/components/planning/JourneyEstimator.tsx:19, 56, 98, 122–130`: Contains `rate` input ("Customer-entered planning rate") and calculates `result.budget = vehicleKm * rate`, displaying `₹${number(result.budget)}`.
   - `src/content/corridors.json:6–38`: India section has `vehicleTiers` with obsolete models (`Toyota Etios / Maruti Dzire`, `Toyota Camry / Mercedes E-Class`) and hourly retainers (`₹2,200`, `₹6,500`, `₹3,800`, `₹7,200`).
   - `src/app/india/rate-card/page.tsx` & `src/content/rate-card.json:9–95`: Renders comprehensive tariff tables with fabricated pricing (`₹1,400`, `₹2,400`, `₹58,000`, etc.) and volume discount calculations.

6. **Localization in `src/i18n/`**:
   - `src/i18n/types.ts:145–153`: `fleet.categories` typed as `Record<string, { name: string; capacity: string; models: string; use: string; }>`.
   - `src/i18n/dictionaries/en.ts:200–230`, `hi.ts:196–227`, `te.ts:196–227`: Dictionary entries are keyed to legacy category IDs (`electric`, `sedans`, `mpvs`, `buses`, `luxury`).

---

## 2. Logic Chain

1. **Premise**: Per `AGENTS.md` and `ORIGINAL_REQUEST.md` (R1), Victor Mobility requires replacing all legacy sample fleet data with the 10 manager-approved India vehicles as a single source of truth, removing fabricated pricing.
2. **Observation -> Deduction (Single Source of Truth)**:
   - Since `src/content/india.json` is the authorized baseline for public copy and data (Observation 1), the 10-vehicle dataset must be authored in `src/content/india.json` under a new collection `fleetVehicles`.
   - The obsolete category-level `fleetCategories` (5 categories) and `fleetPresentation.items` with numeric prices must be reconciled with this dataset.
3. **Observation -> Deduction (Categorization & Counts)**:
   - Partitioning the 10 manager-approved vehicles:
     - Sedans (5): Swift Dzire, Hyundai Aura, Tata Tigor, Tata Nexon, MG ZS EV. (Note: Nexon and MG ZS EV must stay as Sedan per manager instruction).
     - SUVs (4): Mahindra Marazzo, Ertiga CNG, Innova Crysta, Kia Carens Clavis EV.
     - 12 Seater (1): Urbania.
     - Cross-category Electric Vehicles (4): Tata Tigor, Tata Nexon, MG ZS EV, Kia Carens Clavis EV.
   - Filter tab counts evaluate to: Sedan: 5, SUV: 4, 12 Seater: 1, Electric Vehicles: 4, All Vehicles: 10. This matches Acceptance Criteria exactly.
4. **Observation -> Deduction (Page Component Redesign)**:
   - `IndiaFleetSection.tsx` currently displays only 1 category panel at a time (Observation 2). To satisfy "Exactly 10 vehicles are displayed in the `/india/fleet` All Vehicles view", `/india/fleet` (`standalone={true}`) must render an interactive grid of vehicle cards derived from the active filter tab.
   - Each card must display the verified image, verbatim vehicle name, cab type, fuel badge, "Request a quote", and "Enquire about this vehicle" CTA.
5. **Observation -> Deduction (Deep Linking)**:
   - The current `#electric` hash handler in `IndiaFleetSection.tsx:36–57` switches to a legacy category tab `"electric"`.
   - Under R2, it must activate the Electric Vehicles filter tab (showing all 4 EV vehicles across Sedan and SUV) and scroll into view.
6. **Observation -> Deduction (Pricing Sanitization)**:
   - Fabricated prices exist in `india.json` (`2200`, `3800`, `7200`, `6500`), `corridors.json`, `rate-card.json`, and `JourneyEstimator.tsx` (Observations 1 & 5).
   - In accordance with R1, all numeric prices, sample rates, and journey calculation totals must be replaced with `"Request a quote"` and the mandatory shared note: *"Vehicle allocation and pricing are confirmed for your location, dates and requirements."*
7. **Observation -> Deduction (Enquiry Pre-fill)**:
   - Currently, clicking "Enquire" only passes `?category=...` and `EnquirySection.tsx` has no vehicle field (Observation 4).
   - To satisfy R5 ("Enquire about this vehicle CTAs open the regional contact/enquiry flow with the selected vehicle pre-filled and retained"), `IndiaFleetSection` must pass `?vehicle=[name]&category=[category]`, and `EnquirySection.tsx` + `enquiryMessage.ts` must capture, display, and format the vehicle.

---

## 3. Caveats

1. **Licensed Images (Requirement R3)**:
   - Sourcing and downloading the 10 licensed reference images is scoped under R3. In Phase 1 / R1, initial placeholder reference paths (e.g. `/images/india/fleet/[model].jpg`) can be used until R3 assets are placed in `public/images/india/fleet/`.
2. **UAE Route Integrity (Requirement R4)**:
   - `src/components/fleet/InteractiveFleetShowcase.tsx` is currently imported by `src/app/uae/fleet/page.tsx`. Changes made for India fleet must not break UAE fleet rendering or English/Arabic localization.
3. **Read-Only Explorer Scope**:
   - This agent operated strictly in read-only mode without modifying source code or launching builds. Implementation belongs to the designated Antigravity implementer.

---

## 4. Conclusion

The architecture for R1 and R2 is clear, verified, and ready for immediate implementation:
1. **Source of Truth**: Add `fleetVehicles` to `src/content/india.json` and declare `FleetVehicle` in `src/types/content.ts`.
2. **Fleet Page (`src/components/fleet/IndiaFleetSection.tsx`)**: Refactor to render an interactive grid of cards with 5 filter tabs: All Vehicles (10), Sedan (5), SUV (4), 12 Seater (1), Electric Vehicles (4).
3. **Deep Linking**: Enhance `#electric` hash detection to activate the cross-category EV filter and synchronize window history.
4. **Price Removal**: Replace all numeric rates with `"Request a quote"` and attach the shared note: *"Vehicle allocation and pricing are confirmed for your location, dates and requirements."*
5. **Enquiry & RFP Pre-fill**: Wire `?vehicle=` query param into `EnquirySection.tsx`, `GuidedEnquiryAssistant.tsx`, `lib/enquiryMessage.ts`, and `RfpDesk.tsx`.

---

## 5. Verification Method

To independently verify the implementation after code edits:

1. **Dataset Integrity Check**:
   - Inspect `src/content/india.json` to verify exactly 10 vehicles exist under `fleetVehicles`.
   - Verify filter counts evaluate to: Sedan: 5, SUV: 4, 12 Seater: 1, Electric Vehicles: 4.
2. **Fabricated Pricing Check**:
   - Run:
     ```powershell
     rg -n "2200|3800|7200|6500" src/content/india.json
     rg -n "Etios|Camry|Tempo Traveller" src/content/india.json src/app/india/
     ```
   - Confirm zero occurrences in active India fleet routes.
3. **Quality Gates & Build**:
   - Type check: `npm run type-check` (must pass with 0 errors).
   - Lint: `npm run lint` (must pass with 0 warnings/errors).
   - Production Build: `npm run build` (must compile all static routes without errors).
4. **Functional & Deep Link Verification**:
   - Launch local preview (`npm run start` or dev).
   - Navigate to `/india/fleet` -> verify All Vehicles shows 10 cards in manager order.
   - Navigate to `/india/fleet#electric` -> verify Electric Vehicles tab is active and shows 4 vehicles.
   - Click "Enquire about this vehicle" on any card -> verify `/india/contact` opens with that vehicle pre-filled.
