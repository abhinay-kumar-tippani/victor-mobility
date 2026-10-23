# Fleet Architecture & Data Mapping Survey (Requirements R1 & R2)

**Explorer**: `teamwork_preview_explorer`  
**Date**: 2026-10-22  
**Target Project**: Victor Mobility (`d:\victor website`)  
**Scope**: Requirements R1 (Authoritative Fleet Dataset & Single Source of Truth) and R2 (Fleet Page Categorization & Deep Linking)

---

## 1. Executive Summary

Victor Mobility's India website currently lacks an authoritative 10-vehicle dataset. Instead, it relies on legacy, category-level brochure placeholders (`sedans`, `mpvs`, `buses`, `luxury`, `electric`) split across multiple competing content files (`src/content/india.json`, `src/content/fleet-specifications.json`, `src/content/corridors.json`, and `src/content/rate-card.json`). Active India routes display fabricated pricing (e.g. ₹2,200, ₹3,800, ₹7,200, ₹6,500), obsolete model names (Toyota Etios, Toyota Camry, Tempo Traveller, XUV 400 EV), and lack individual vehicle cards.

To fulfill R1 and R2 cleanly:
1. `src/content/india.json` must be established as the single authoritative source of truth by adding the manager-approved 10-vehicle dataset with exact names, fuel labels, and cab types.
2. `src/components/fleet/IndiaFleetSection.tsx` must be upgraded on `/india/fleet` from a single-category container into an interactive vehicle card grid supporting the 5 specified filter tabs: **All Vehicles (10)**, **Sedan (5)**, **SUV (4)**, **12 Seater (1)**, and **Electric Vehicles (4)**.
3. Direct navigation to `/india/fleet#electric` must automatically activate the Electric Vehicles filter.
4. All fabricated numeric pricing, sample rates, and journey calculation totals must be replaced with `"Request a quote"` and the mandatory shared note: *"Vehicle allocation and pricing are confirmed for your location, dates and requirements."*
5. Enquiry flows across `/india/contact`, the Guided Enquiry Assistant, and the RFP desk must pre-fill and retain the selected vehicle.

---

## 2. Single Source of Truth for India Fleet Data

### 2.1 Current Fragmentation
Currently, fleet data is fragmented across four separate files with conflicting models and structures:

| Location | Purpose / Usage | Current Structure |
|---|---|---|
| `src/content/india.json` (lines 121–198, 749–805) | Main content file; used by `IndiaFleetSection`, `FleetPage`, and homepage | Contains `fleetCategories` (5 high-level categories) and `fleetPresentation` (category tab copy, fabricated sample prices: ₹2,200, ₹3,800, ₹7,200, ₹6,500) |
| `src/content/fleet-specifications.json` (lines 2–189) | Deep vehicle specifications and telematics; currently imported only by `InteractiveFleetShowcase.tsx` | Contains `india.categories` (`sedans`, `mpvs`, `luxury`, `buses`, `electric`) with detailed cabin, luggage, and telematics specs |
| `src/content/corridors.json` (lines 2–39) | Point-to-point transit pricing and vehicle tiers; used by `RouteFareEstimator.tsx` | Contains `india.vehicleTiers` with obsolete models (`Toyota Etios / Maruti Dzire`, `Toyota Camry / Mercedes E-Class`) and fabricated hourly retainers |
| `src/content/rate-card.json` (lines 3–95) | Master enterprise tariffs; used by `EnterpriseRateCardDesk.tsx` on `/india/rate-card` | Contains `india.categories` with obsolete models and fabricated tariff slabs (`executive-sedan` ₹1,400–₹58,000, `corporate-mpv` ₹2,400–₹96,000, etc.) |

### 2.2 Authorized Target Single Source of Truth
Per `AGENTS.md`, **`src/content/india.json` is the sole authorized baseline for public copy and data**. All customer-facing fleet data for India must reside in `src/content/india.json`.

#### Target Data Schema in `src/content/india.json`
Add a dedicated `fleetVehicles` (or `vehicles`) collection to `src/content/india.json`, defined in `src/types/content.ts`:

```typescript
export interface FleetVehicle {
  id: string; // URL-safe slug, e.g. "swift-dzire", "hyundai-aura"
  name: string; // Verbatim supplied name, e.g. "Swift Dzire"
  category: "Sedan" | "SUV" | "12 Seater"; // Verbatim manager classification
  categoryId: "sedan" | "suv" | "12-seater"; // Normalized filter key
  fuelType: "Petrol" | "Petrol & CNG" | "Electric Vehicle" | "Long Range Electric Vehicle" | "Diesel"; // Verbatim supplied fuel label
  isElectric: boolean; // True for Tigor, Nexon, MG ZS EV, Clavis EV (cross-category filter)
  seatingCapacity: string | null; // null for 1-9; "12 Seater" ONLY for Urbania
  image: string; // Reference image path, e.g. "/images/india/fleet/swift-dzire.jpg"
  imageAlt: string; // Descriptive alt text for accessibility
  priceDisplay: "Request a quote"; // Standardized non-fabricated pricing label
  order: number; // 1 to 10 (strict manager order)
}
```

#### Shared Fleet Presentation Fields
In `src/content/india.json` -> `fleetPresentation`:
- `sharedNote`: `"Vehicle allocation and pricing are confirmed for your location, dates and requirements."`
- `imageDisclaimer`: `"Images show vehicle models; actual assigned vehicles may vary."`
- `priceDisplay`: `"Request a quote"`
- Remove `pricingSource`, `price`, `priceLabel`, `packageLabel`, and `priceNote` that present or rationalize numeric rates.

---

## 3. Comprehensive Audit of Legacy Sample Fleet Data Across Codebase

### 3.1 `/india/fleet` Route and Page Components
- **File**: `src/app/india/fleet/page.tsx`
  - **Lines 10–13**: Metadata description pulls `indiaData.fleetPresentation.pageDescription`.
  - **Line 19**: `<IndiaFleetSection categories={indiaData.fleetCategories} copy={indiaData.fleetPresentation} standalone />`
  - **Lines 20**: RFP banner leading to `/india/rfp`.
- **File**: `src/components/fleet/IndiaFleetSection.tsx`
  - **Lines 30–31**: Filters `copy.items` against `categories`. Currently filters 5 legacy category objects (`sedans`, `mpvs`, `buses`, `luxury`, `electric`).
  - **Lines 123–156**: Category tablist rendering Sedans, MPVs & Groups, Buses & Shuttles, Luxury, Electric Vehicles.
  - **Lines 163–263**: Renders a **single large category card** (left image, right specs) rather than individual vehicle cards.
  - **Lines 230–240**: Renders fabricated numeric pricing:
    ```tsx
    <p className="text-3xl font-semibold tracking-tight text-brand-indigo">
      <span dir="ltr">{effectiveCurrency}{active.price.toLocaleString("en-US")}</span>
    </p>
    <span className="text-sm text-brand-ink/70">/ {packageLabel}</span>
    ```
  - **Line 243**: Renders legacy disclaimer `priceNote` ("Illustrative pricing...").
  - **Line 249**: CTA links to `${effectiveBasePath}/contact?category=${encodeURIComponent(category.name)}` instead of specific vehicle pre-fill.
  - **Line 256**: CTA links to `/estimator` with "Plan a journey".

### 3.2 Homepage Fleet Previews
- **File**: `src/app/india/page.tsx`
  - **Line 45**: Code comment still says `{/* 2. Fleet: Real Brochure Models (Dzire, Tigor, Innova, Urbania, Coaches) & Seating Capacities */}`.
  - **Lines 46–49**: Renders `<IndiaFleetSection categories={content.fleetCategories} copy={indiaData.fleetPresentation} />`.
- **File**: `src/components/home/FleetSection.tsx` (Orphaned / Legacy)
  - **Lines 36–107**: Hardcoded `fleetDetails` constant with obsolete vehicle models:
    - `sedans`: `["Maruti Swift Dzire", "Tata Tigor"]`
    - `mpvs`: `["Toyota Innova Crysta", "Mahindra Marazzo", "Force Urbania"]`
    - `buses`: `["22-Seater Executive Bus", "44-Seater Luxury Coach"]`
    - `luxury`: `["Executive Business Saloons", "Premium Hospitality Fleet"]`
  - This file is not currently imported by `src/app/india/page.tsx` (which imports `IndiaFleetSection.tsx`), but remains in the repository as dead code that could cause confusion or accidental re-import.

### 3.3 Vehicle Selector Dropdowns & Enquiry Forms
- **File**: `src/components/home/EnquirySection.tsx` (Used on `/india/contact` and homepage)
  - **Lines 97–104**: Reads `service`, `city`, and `category` from URL search parameters.
  - **Lines 524–536**: Displays a badge when `selectedCategory` is set: `"Preferred Category: [Category]"`.
  - **Lines 596–618**: Contains a Service dropdown (`<select id={serviceId}>`) populated from `publishedServices`.
  - **Deficiency**: **There is NO vehicle dropdown selector in the form!** When a user clicks "Enquire about this vehicle" on `/india/fleet`, there is no mechanism to capture or display the vehicle name other than generic `selectedCategory` or free-form requirement text.
  - **Lines 201–209**: `buildEnquiryMessage` call receives `category: selectedCategory`, but lacks a `vehicle` property.
- **File**: `src/lib/enquiryMessage.ts`
  - **Lines 1–12**: `EnquiryDraft` interface has `service: string; category?: string | null;` but no `vehicle?: string | null;`.
  - **Lines 28, 47, 66, 84**: Message builder formats `*Vehicle Category:* ${draft.category}` but has no vehicle model line.
- **File**: `src/components/contact/GuidedEnquiryAssistant.tsx`
  - **Lines 37–45**: State contains `service`, `city`, `customCity`, `category`, but no `vehicle`.
  - **Line 86**: Reads `params.get("category")`, but ignores vehicle-level parameters.

### 3.4 RFP Forms & Booking Selectors
- **File**: `src/app/india/rfp/page.tsx`
  - **Line 12**: Passes `vehicles={indiaData.fleetCategories.map(category => category.name)}`.
  - Currently evaluates to: `["Sedans", "MPVs & Group Vehicles", "Buses & Shuttles", "Luxury & Limousines", "Electric Vehicles"]`.
- **File**: `src/components/planning/RfpDesk.tsx`
  - **Lines 161–171**: Renders a fieldset with checkbox pills for each string in `vehicles`.
  - Displays generic legacy category names rather than manager-approved vehicles or updated vehicle options.
- **File**: `src/components/rfp/CorporateRfpBuilder.tsx`
  - **Lines 110–116**: Hardcoded India vehicle options:
    ```typescript
    [
      "Corporate AC Cabs (4-seater sedans)",
      "Executive MPVs (6-7 seater Toyota Innova Crysta)",
      "22-Seater Air-Conditioned Mini Buses",
      "44/50-Seater Luxury Coaches",
      "Electric Vehicles (EV Cabs & Shuttles)",
    ]
    ```
  - Contains outdated labels, invented seat counts ("4-seater", "6-7 seater"), and unapproved vehicle categories.

### 3.5 Journey Estimators & Rate Calculations
- **File**: `src/app/india/estimator/page.tsx`
  - Renders `<JourneyEstimator copy={indiaData.planningTools.estimator} ... />`.
- **File**: `src/components/planning/JourneyEstimator.tsx`
  - **Line 19**: State includes `rate: ""`.
  - **Lines 56**: Generates draft text: `Customer-entered planning rate: INR ${values.rate} / vehicle / km`, `Calculated planning budget: INR ${number(result.budget)}`.
  - **Lines 98**: Renders rate input: `{input("rate", "number", effectiveCopy.rateHelp)}`.
  - **Lines 123–130**: Renders calculated budget total: `{result.budget === null ? "—" : `₹${number(result.budget)}`}`.
  - Requirement R1 explicitly prohibits calculating fabricated amounts or rates; pricing must be replaced with "Request a quote" and confirmation from the operations team.
- **File**: `src/lib/journeyEstimate.ts`
  - **Lines 23–24**: Calculates `budget = input.rate.trim() ? vehicleKm * Number(input.rate) : null`.
- **File**: `src/components/estimator/RouteFareEstimator.tsx` (Used in UAE, but contains India network logic)
  - **Lines 25, 49–64**: References `corridorsData.india.vehicleTiers` and calculates `priceRange` (e.g. `₹1,600 – ₹1,900`).
  - **Lines 70–87**: Formats WhatsApp draft with `*Indicative Commercial Range:* Estimated Bracket: ${priceRange}`.
- **File**: `src/content/corridors.json`
  - **Lines 6–38**: Defines `vehicleTiers` with obsolete models (`Toyota Etios / Maruti Dzire`, `Toyota Camry / Mercedes E-Class`) and fabricated hourly retainers (`₹2,200 (8h / 80km)`, `₹6,500`, `₹3,800`, `₹7,200`).
  - **Lines 49–110**: Defines corridors with explicit numeric `basePrice` and `priceRange` maps.
- **File**: `src/app/india/rate-card/page.tsx` & `src/content/rate-card.json`
  - Dedicated route displaying extensive fabricated rate tables for Sedans, MPVs, Saloons, Minibuses, and Coaches (e.g. `₹1,400`, `₹2,400`, `₹58,000`, `₹13/km`).
  - Includes an interactive calculator calculating monthly & annual fleet costs.
  - Violates R1 rule: "Remove all fabricated pricing, sample rates, and journey calculation totals; display 'Request a quote' on cards and collect enquiry details without calculating fabricated amounts."

### 3.6 Localization Dictionaries (`src/i18n/`)
- **File**: `src/i18n/dictionaries/en.ts`
  - **Lines 195–196**: `pricingLabel: "Pricing", priceValue: "Request a quote"` (already compliant for EV, but missing for standard categories).
  - **Lines 207–230**: `fleet.categories` has legacy keys: `sedans` (Dzire, Tigor), `mpvs` (Innova Crysta, Marazzo, Force Urbania), `buses` (Tempo Traveller, 22/44-seater), `luxury` (Executive and premium saloons).
- **File**: `src/i18n/dictionaries/hi.ts`
  - **Lines 203–227**: Hindi dictionary mirrors the legacy categories (`सेडान`, `एमपीवी एवं समूह वाहन`, `बसें एवं शटल`, `लक्जरी एवं लिमोसिन`).
- **File**: `src/i18n/dictionaries/te.ts`
  - **Lines 202–226**: Telugu dictionary mirrors the legacy categories (`సెడాన్లు`, `ఎంపివి & గ్రూప్ వాహనాలు`, `బస్సులు & షటిల్స్`, `లగ్జరీ & లిమోసిన్లు`).

---

## 4. Requirements R1 & R2 Architectural Mapping

### 4.1 The 10 Manager-Approved Vehicles
The manager-approved list contains exactly 10 vehicles in a strict sequence with mandatory cab types and fuel designations:

| # | Manager Vehicle Name | Cab Type (Category) | Fuel Label | Electric? | Approved Seating Capacity |
|---|---|---|---|---|---|
| 1 | **Swift Dzire** | Sedan | Petrol | No | None (unspecified) |
| 2 | **Hyundai Aura** | Sedan | Petrol & CNG | No | None (unspecified) |
| 3 | **Tata Tigor** | Sedan | Electric Vehicle | **Yes** | None (unspecified) |
| 4 | **Tata Nexon** | Sedan *(Preserved)* | Long Range Electric Vehicle | **Yes** | None (unspecified) |
| 5 | **MG ZS EV** | Sedan *(Preserved)* | Long Range Electric Vehicle | **Yes** | None (unspecified) |
| 6 | **Mahindra Marazzo** | SUV | Diesel | No | None (unspecified) |
| 7 | **Ertiga CNG** | SUV | Petrol & CNG | No | None (unspecified) |
| 8 | **Innova Crysta** | SUV | Diesel | No | None (unspecified) |
| 9 | **Kia Carens Clavis EV** | SUV | Long Range Electric Vehicle | **Yes** | None (unspecified) |
| 10 | **Urbania** | 12 Seater | Diesel | No | **12 Seater** *(Manager-approved)* |

> **Critical Constraint Enforcement**:
> - Preserve supplied vehicle names, fuel labels, and cab-type classifications exactly as stated without reclassification or inferred seat counts.
> - Note that Tata Nexon and MG ZS EV are explicitly classified by the manager as **Sedan** for this dataset. They must NOT be reclassified as SUVs.
> - Do not invent seat counts for vehicles 1–9. Urbania is the sole vehicle with an approved seat count ("12 Seater").

### 4.2 Category Filter Tabs & Exact Counts

The fleet page navigation requires 5 filter tabs evaluated strictly from the 10 vehicles:

```
[ All Vehicles (10) ]  [ Sedan (5) ]  [ SUV (4) ]  [ 12 Seater (1) ]  [ ⚡ Electric Vehicles (4) ]
```

1. **All Vehicles (10)**: Displays all 10 vehicles in original sequence (1 to 10).
2. **Sedan (5)**:
   - Swift Dzire
   - Hyundai Aura
   - Tata Tigor
   - Tata Nexon
   - MG ZS EV
3. **SUV (4)**:
   - Mahindra Marazzo
   - Ertiga CNG
   - Innova Crysta
   - Kia Carens Clavis EV
4. **12 Seater (1)**:
   - Urbania
5. **Electric Vehicles (4)** *(Cross-category filter: matches `isElectric === true`)*:
   - Tata Tigor (Sedan)
   - Tata Nexon (Sedan)
   - MG ZS EV (Sedan)
   - Kia Carens Clavis EV (SUV)

### 4.3 Deep Linking: `/india/fleet#electric`
- When a user navigates directly to `/india/fleet#electric` or loads a bookmarked URL:
  1. The client component must inspect `window.location.hash` during mount.
  2. If `hash === "#electric"`, the active filter tab must automatically be set to `"electric"`.
  3. The fleet showcase container or tab panel must be scrolled smoothly into view.
  4. Tab keyboard navigation and ARIA attributes (`aria-selected="true"`, `tabIndex={0}`) must synchronize.
  5. When switching between tabs, if "Electric Vehicles" is active, `#electric` is reflected in `window.history.replaceState()`; if switching to another tab, the `#electric` hash is removed cleanly.

### 4.4 Vehicle Card Content Specification
Each card in the grid must contain:
1. **Clean exterior 3/4 image**: Proportional model reference matching the exact fuel variant.
2. **Vehicle Name**: Verbatim supplied name (e.g. "Swift Dzire").
3. **Cab Type Badge**: e.g. "Sedan", "SUV", "12 Seater".
4. **Fuel Badge**: Styled pill with icon/badge:
   - `Petrol`
   - `Petrol & CNG`
   - `Diesel`
   - `Electric Vehicle` (with lightning icon)
   - `Long Range Electric Vehicle` (with lightning icon)
5. **Seating Capacity**: Displayed ONLY on Urbania ("12 Seater"); omitted or left as "Seating confirmed on enquiry" for others (no fabricated seat numbers).
6. **Price Indicator**: Displays `"Request a quote"` (never numeric rates or hourly slabs).
7. **CTA Action**: Button `"Enquire about this vehicle"` leading to `/india/contact?vehicle=[Name]&category=[Category]`.
8. **Shared Mandatory Footnote**:
   - On the section/grid: *"Vehicle allocation and pricing are confirmed for your location, dates and requirements."*
   - On card/media: *"Images show vehicle models; actual assigned vehicles may vary."*

---

## 5. Concrete Implementation Strategy for Downstream Agents

### Phase 1: Data Model & TypeScript Types (`src/content/india.json`, `src/types/content.ts`)
1. In `src/types/content.ts`:
   - Define `FleetVehicle` interface.
   - Update `IndiaContent` interface to include `fleetVehicles: FleetVehicle[];`.
2. In `src/content/india.json`:
   - Add `fleetVehicles` array with all 10 vehicles in exact manager order.
   - Update `fleetPresentation`:
     - Set `sharedNote: "Vehicle allocation and pricing are confirmed for your location, dates and requirements."`
     - Set `imageCaption: "Images show vehicle models; actual assigned vehicles may vary."`
     - Remove obsolete sample prices (`2200`, `3800`, `7200`, `6500`) and `pricingSource`.
     - Update category tabs array to reflect: `all` (All Vehicles), `sedan` (Sedan), `suv` (SUV), `12-seater` (12 Seater), `electric` (Electric Vehicles).

### Phase 2: Fleet Page & Component Refactoring (`IndiaFleetSection.tsx`)
1. Refactor `src/components/fleet/IndiaFleetSection.tsx`:
   - Accept `vehicles?: FleetVehicle[]` or import from `indiaData.fleetVehicles`.
   - Calculate tab counts dynamically:
     - `all`: `vehicles.length` (10)
     - `sedan`: `vehicles.filter(v => v.categoryId === "sedan").length` (5)
     - `suv`: `vehicles.filter(v => v.categoryId === "suv").length` (4)
     - `12-seater`: `vehicles.filter(v => v.categoryId === "12-seater").length` (1)
     - `electric`: `vehicles.filter(v => v.isElectric).length` (4)
   - Implement hash listener for `#electric`:
     ```typescript
     useEffect(() => {
       const handleHash = () => {
         if (window.location.hash.toLowerCase() === "#electric") {
           setActiveTab("electric");
         }
       };
       handleHash();
       window.addEventListener("hashchange", handleHash);
       return () => window.removeEventListener("hashchange", handleHash);
     }, []);
     ```
   - On `/india/fleet` (`standalone={true}`):
     - Render a responsive 2-column/3-column card grid displaying each vehicle in the filtered set.
     - Each card displays vehicle image, name, category badge, fuel badge, "Request a quote", and "Enquire about this vehicle" CTA button.
     - Display the shared note banner prominently.
   - On homepage (`standalone={false}`):
     - Render a clean preview showcase derived from the authoritative dataset without old sample prices or obsolete vehicle names.

### Phase 3: Enquiry Flow & Pre-fill Wiring (`EnquirySection.tsx`, `enquiryMessage.ts`)
1. In `src/components/home/EnquirySection.tsx`:
   - Read `const vParam = params.get("vehicle");`.
   - If present, initialize `selectedVehicle` state.
   - Display a prominent active selection pill: `"Selected Vehicle: Swift Dzire (Sedan)"` with a dismiss button.
   - Add a Vehicle dropdown in the form (or include vehicle in the requirement text and draft builder).
2. In `src/lib/enquiryMessage.ts`:
   - Add `vehicle?: string | null;` to `EnquiryDraft`.
   - Include `...(draft.vehicle ? [`*Selected Vehicle:* ${draft.vehicle}`] : [])` across all four language formats (English, Hindi, Telugu, Arabic).

### Phase 4: RFP & Estimator Sanitization
1. In `src/app/india/rfp/page.tsx` & `src/components/planning/RfpDesk.tsx`:
   - Pass the 10 manager-approved vehicle names into `vehicles` prop:
     `indiaData.fleetVehicles.map(v => `${v.name} (${v.category}, ${v.fuelType})`)`.
2. In `src/components/planning/JourneyEstimator.tsx`:
   - Remove the optional planning rate and budget arithmetic.
   - Replace calculated budget with `"Request a quote"`.
   - Display the shared note: `"Vehicle allocation and pricing are confirmed for your location, dates and requirements."`.
3. In `src/content/rate-card.json` and `src/content/corridors.json`:
   - Review `/india/rate-card` and corridor data to ensure no active India routes display fabricated prices or obsolete models.

### Phase 5: Multi-Language Localization (`src/i18n/`)
1. In `src/i18n/types.ts`:
   - Update `fleet.categories` to include keys: `all`, `sedan`, `suv`, `12-seater`, `electric`.
   - Add fuel badge translation keys if necessary.
2. In `src/i18n/dictionaries/en.ts`, `hi.ts`, `te.ts`:
   - Add translations for:
     - `Sedan`: English "Sedan", Hindi "सेडान", Telugu "సెడాన్"
     - `SUV`: English "SUV", Hindi "एसयूवी", Telugu "ఎస్‌యూవీ"
     - `12 Seater`: English "12 Seater", Hindi "12 सीटर", Telugu "12 సీటర్"
     - `Electric Vehicles`: English "Electric Vehicles", Hindi "इलेक्ट्रिक वाहन", Telugu "ఎలక్ట్రిక్ వాహనాలు"
     - Fuel labels: Petrol, Petrol & CNG, Diesel, Electric Vehicle, Long Range Electric Vehicle.
   - **Crucial**: Keep vehicle model names identical across all languages (do not translate "Swift Dzire" or "Innova Crysta").

---

## 6. Exact File Index & Action Summary

| File Path | Nature of File | Required Action |
|---|---|---|
| `src/content/india.json` | Content / Data | **Primary SOT update**: Add 10 manager-approved vehicles, prune sample prices, add shared notes. |
| `src/types/content.ts` | TypeScript Definitions | Add `FleetVehicle` interface, update `IndiaContent`. |
| `src/components/fleet/IndiaFleetSection.tsx` | UI Component | Implement 10-vehicle grid, 5 category tabs with counts, `#electric` deep linking, "Request a quote" badge. |
| `src/app/india/fleet/page.tsx` | Route Page | Pass authoritative fleet vehicle data to `IndiaFleetSection`. |
| `src/components/home/EnquirySection.tsx` | UI Component | Support `?vehicle=` query param, pre-fill selected vehicle, display vehicle badge. |
| `src/lib/enquiryMessage.ts` | Utility Library | Add `vehicle` field to `EnquiryDraft` and WhatsApp message generators. |
| `src/components/contact/GuidedEnquiryAssistant.tsx` | UI Component | Retain vehicle pre-fill in modal enquiry flow. |
| `src/app/india/rfp/page.tsx` | Route Page | Supply 10 manager-approved vehicles to RFP desk options. |
| `src/components/planning/RfpDesk.tsx` | UI Component | Present updated vehicle checklist. |
| `src/components/planning/JourneyEstimator.tsx` | UI Component | Eliminate fabricated rate/budget calculation; replace with "Request a quote". |
| `src/content/corridors.json` | Content / Data | Remove fabricated hourly retainers and obsolete models from India section. |
| `src/content/rate-card.json` | Content / Data | Prune fabricated tariff numbers and obsolete vehicle models. |
| `src/components/home/FleetSection.tsx` | Orphaned Component | Remove or align with 10-vehicle SOT to prevent accidental re-emergence. |
| `src/i18n/types.ts` & `src/i18n/dictionaries/*.ts` | Localization | Align fleet tab keys, fuel labels, and shared notes across `en`, `hi`, and `te`. |
