# Investigation Report: UAE Fleet Routes, Regional Scope & Fleet Pruning (R4)

**Date**: 2026-10-22  
**Agent**: Teamwork Explorer (`explorer_survey_2`)  
**Workspace**: `d:\victor website`  
**Target Milestone**: Survey & Strategy for R4 (Regional Scope & UAE Fleet Pruning)  
**Parent Orchestrator ID**: `6b49676e-9eb3-4a24-b81e-24558c3bbf1b`

---

## 1. Executive Summary

Victor Mobility's web application features an India-first architecture with an active UAE regional segment served at `/uae` routes. Requirement R4 mandates that:
1. **India fleet records remain strictly within the India website scope**, ensuring zero leakage into `/uae` routes.
2. **Unsupported sample vehicles and fabricated prices are pruned** from UAE fleet routes and pages.
3. **An enquiry-led presentation replaces fabricated numeric prices**, displaying *"Request a quote"* and collecting corporate travel requirements without displaying fake tariffs.
4. **Independently approved UAE brochure content, English/Arabic localization, and RTL (`dir="rtl"`) layout are strictly preserved**.

### Key Findings:
- **No India Vehicle Model Leakage**: India vehicle names (`Swift Dzire`, `Tata Tigor`, `Innova Crysta`, `Urbania`, etc.) do **not** leak into `/uae` customer-facing text or routes. The category schema and route parameters maintain separation.
- **Image Path Directory Anomaly**: Several UAE fleet cards and hero backgrounds in `src/content/uae.json` and `src/content/fleet-specifications.json` point to image files located under `/images/india/` (e.g. `/images/india/luxury-interior.png`, `/images/india/employee-shuttle.png`, `/images/india/electric-fleet.jpg`). While these are illustrative assets, their directory prefix references `india`.
- **Unsupported Vehicles Identified**: Non-brochure sample vehicles appear in secondary UAE content files: `Lexus ES 300h` and `Maybach GLS` in `src/content/rate-card.json`; `Lexus ES` and `Mercedes Sprinter (18 seats)` in `src/content/corridors.json`.
- **Approved UAE Baseline**: The authorized brochure baseline for UAE consists of 5 vehicle tiers + Electric:
  1. *First Class Saloons*: Mercedes-Benz S-Class, BMW 7 Series
  2. *Ultra-Luxury & VIP*: Mercedes-Maybach S-Class
  3. *Executive SUVs*: Cadillac Escalade, GMC Yukon Denali
  4. *Executive MPVs*: Mercedes-Benz V-Class
  5. *Luxury Buses & Coaches*: 22-Seater VIP Coach, 44-Seater Luxury Bus
  6. *Electric Vehicles*: Cross-segment / bespoke corporate allocation (confirmed upon enquiry)
- **Fabricated Pricing Found Across 4 Files**:
  1. `src/content/uae.json` (lines 288–332): Hardcoded prices `1200`, `2500`, `1600`, `1400`, `2200` rendered on `/uae` homepage via `IndiaFleetSection`.
  2. `src/content/fleet-specifications.json` (lines 231–369): Rate cards with hourly/daily/km tariffs (`AED 450–550`, `AED 850`, `AED 1,400`, `AED 4.5/km`, etc.) on `/uae/fleet`.
  3. `src/content/rate-card.json` (lines 173–241): Full numeric tariff matrix on `/uae/rate-card`.
  4. `src/content/corridors.json` (lines 201–260): `hourlyRetainer` and `priceRange` on `/uae/estimator`.
- **Enquiry Pre-fill Gap**: `src/components/home/EnquirySection.tsx` currently inspects `params.get("category")`, but ignores `params.get("vehicle")`. Deep links carrying specific vehicle selections do not pre-fill into the enquiry state or WhatsApp draft message.

---

## 2. Complete Inventory of UAE Routes, Content Files, and Components

### 2.1 UAE Routes (`src/app/uae/`)
| Route | Page File Path | Purpose / Description | Primary Components Rendered |
|---|---|---|---|
| `/` | `src/app/page.tsx` | Country selector root | Links to `/india` and `/uae` |
| `/uae` | `src/app/uae/page.tsx` | UAE Regional Homepage | `Hero`, `StatCounterSection`, `TrustedCompaniesSection`, `IndiaFleetSection`, `ServicesSection`, `VictorStandardSection`, `UaePresenceSection`, `VictorJourneySection`, `PeopleSection`, `HomeFaqSection` |
| `/uae/fleet` | `src/app/uae/fleet/page.tsx` | Dedicated UAE Fleet & Inspection Showcase | `InteractiveFleetShowcase region="uae"`, Capacity & Amenities matrix |
| `/uae/rate-card` | `src/app/uae/rate-card/page.tsx` | Commercial Rate Card Desk | `EnterpriseRateCardDesk region="uae"` |
| `/uae/estimator` | `src/app/uae/estimator/page.tsx` | Limousine Route & Fare Estimator | `RouteFareEstimator region="uae"`, `CorridorMatrix region="uae"` |
| `/uae/rfp` | `src/app/uae/rfp/page.tsx` | Corporate RFP Desk | `CorporateRfpBuilder region="uae"` |
| `/uae/contact` | `src/app/uae/contact/page.tsx` | UAE Reservation & Contact Desk | `EnquirySection` (standalone), `PartnerEnquirySection` |
| `/uae/services` | `src/app/uae/services/page.tsx` | UAE Services Portfolio Index | Grid of 6 brochure services |
| `/uae/services/[slug]` | `src/app/uae/services/[slug]/page.tsx` | Dynamic Service Subpages | Dynamic details for 6 service slugs |
| `/uae/about` | `src/app/uae/about/page.tsx` | About Victor UAE & Leadership | Story, founder Jahangir, Dubai head office |
| `/uae/corridors` | `src/app/uae/corridors/page.tsx` | Inter-Emirate Tech Corridors | Expressways & corridor connections |
| `/uae/academy` | `src/app/uae/academy/page.tsx` | Chauffeur Protocol Academy | Academy standards & badge verification |
| `/uae/protocol` | `src/app/uae/protocol/page.tsx` | Protocol & Security Standards | Airport VIP & diplomatic protocols |
| `/uae/sla` | `src/app/uae/sla/page.tsx` | SLA & Operational Governance | RTA compliance & response guarantees |

### 2.2 Content & Data Sources
| File Path | Schema Key / Section | Fleet Role & Content |
|---|---|---|
| `src/content/uae.json` | `fleetCategories` (lines 176–218) | 6 categories: `first-class`, `ultra-luxury`, `executive-suvs`, `executive-vans`, `coaches`, `electric`. Authoritative brochure models. |
| `src/content/uae.json` | `fleetPresentation` (lines 259–346) | Public presentation copy + `items` with prices: 1200, 2500, 1600, 1400, 2200, null. |
| `src/content/fleet-specifications.json` | `uae.categories` (lines 190–409) | Detailed specs, luggage, cabin, safety telematics, amenities, and `rateCard` for 5 categories. |
| `src/content/rate-card.json` | `uae.categories` (lines 167–242) | Hourly and daily rate card slabs for 4 categories. |
| `src/content/corridors.json` | `uae.vehicleTiers`, `uae.corridors` (lines 190–336) | Indicative pricing brackets per corridor. |
| `src/content/brand.json` | Root | Brand colors, typography, tagline: `"On Time Every Time."` |
| `src/content/media.json` | `caption`, `assets` | Shared media caption: `"Vehicle imagery is illustrative."` |

### 2.3 Shared UI & Layout Components
| File Path | Component Name | Behavior on UAE Routes |
|---|---|---|
| `src/components/layout/Header.tsx` | `Header` | Detects `basePrefix = pathname.startsWith("/uae") ? "/uae" : "/india"`. Navigation items link to `/uae/*`. Integrates language switcher (`en`, `ar`). |
| `src/components/layout/Footer.tsx` | `Footer` | Detects `prefix = /uae`. Customizes quick links, Dubai Al Garhoud office address, UAE phone (`+971 52 455 2441`), and localized Arabic description. |
| `src/components/fleet/InteractiveFleetShowcase.tsx` | `InteractiveFleetShowcase` | Client component rendered on `/uae/fleet`. Supports `#electric` hash navigation. Renders tabs, specs modal, and tariff calculator. |
| `src/components/fleet/IndiaFleetSection.tsx` | `IndiaFleetSection` | Client component rendered on `/uae` homepage (and `/india`). Renders category tabs, capacity, models, pricing block, and direct enquiry link. |
| `src/components/home/EnquirySection.tsx` | `EnquirySection` | Form on `/uae/contact`. Generates WhatsApp message draft to `+971 52 455 2441` with `Victor Luxury Limousine LLC`. |
| `src/components/contact/GuidedEnquiryAssistant.tsx` | `GuidedEnquiryAssistant` | Global drawer loaded in `src/app/uae/layout.tsx`. |
| `src/i18n/LanguageContext.tsx` | `LanguageProvider`, `useLanguage` | Detects `region = "uae"`. Constrains locales to `en` and `ar`. Sets `document.documentElement.dir = "rtl"` when `ar` is active. |

---

## 3. Regional Isolation & Leakage Verification

### 3.1 Fleet Records Separation Architecture
The repository separates regional data at multiple levels:
1. **JSON Data File Boundaries**:
   - `src/content/india.json` contains India-specific operations, 10 Indian hub cities, Indian leadership (Mujeeb Ur Rahman), and India fleet categories (`sedans`, `mpvs`, `buses`, `luxury`, `electric`).
   - `src/content/uae.json` contains UAE legal entity (`Victor Luxury Limousine LLC`), Dubai/Abu Dhabi/Sharjah operating hubs, Dubai head office (`Al Garhoud`), founder Jahangir, and UAE fleet categories (`first-class`, `ultra-luxury`, `executive-suvs`, `executive-vans`, `coaches`, `electric`).
2. **Top-Level Regional Keys in Multi-Region JSON Files**:
   - `fleet-specifications.json`, `rate-card.json`, and `corridors.json` feature discrete `"india"` and `"uae"` top-level object branches.
3. **Locale Separation**:
   - `UAE_LOCALES` in `src/i18n/types.ts` is strictly `["en", "ar"]`. Hindi (`hi`) and Telugu (`te`) are restricted to `INDIA_LOCALES`.
   - `LanguageContext.tsx` stores locale under separate keys: `victor_locale_india` and `victor_locale_uae`.

### 3.2 Verification of India Fleet Leakage into UAE Routes
We executed regex and verbatim text searches across all files in `src/app/uae/` for India-specific vehicle models:
- `Swift Dzire`: **0 matches** in `src/app/uae/`
- `Hyundai Aura`: **0 matches** in `src/app/uae/`
- `Tata Tigor`: **0 matches** in `src/app/uae/`
- `Tata Nexon`: **0 matches** in `src/app/uae/`
- `MG ZS EV`: **0 matches** in `src/app/uae/`
- `Mahindra Marazzo`: **0 matches** in `src/app/uae/`
- `Ertiga CNG`: **0 matches** in `src/app/uae/`
- `Innova Crysta`: **0 matches** in `src/app/uae/`
- `Kia Carens Clavis EV`: **0 matches** in `src/app/uae/`
- `Force Urbania`: **0 matches** in `src/app/uae/`

**Conclusion on Vehicle Names**: India vehicle models are **strictly isolated** and do not leak into UAE routes.

### 3.3 Leakage Observations & Vulnerabilities
1. **Illustrative Image Path Directory Naming**:
   - In `src/content/uae.json`:
     - Line 33: `"imageSrc": "/images/india/luxury-interior.png"`
     - Line 71: `"imageSrc": "/images/india/employee-shuttle.png"`
     - Line 238: `"imageSrc": "/images/india/founder-jahangir.jpg"`
     - Line 285: `"image": "/images/india/services/service-airport-transfers.jpg"`
     - Line 296: `"image": "/images/india/luxury-interior.png"`
     - Line 318: `"image": "/images/india/services/service-employee-transport.jpg"`
     - Line 329: `"image": "/images/india/services/service-bus-shuttle.jpg"`
     - Line 340: `"image": "/images/india/electric-fleet.jpg"`
   - In `src/content/fleet-specifications.json` (`uae` section):
     - Line 200: `"heroImage": "/images/india/luxury-interior.png"`
     - Line 244: `"heroImage": "/images/india/luxury-interior.png"`
     - Line 288: `"heroImage": "/images/india/hero.png"`
     - Line 332: `"heroImage": "/images/india/hero.png"`
     - Line 376: `"heroImage": "/images/india/electric-fleet.jpg"`
   - *Assessment*: While these image files depict generic executive interiors or coaches and satisfy the illustrative disclaimer, their path string contains `/images/india/`. If a visitor inspects network requests or image URLs, the `india` directory name is visible. It is recommended to either serve shared illustrative assets from a neutral path (e.g. `/images/fleet/`) or duplicate them into `/images/uae/` where appropriate.

2. **Component Naming vs Regional Usage**:
   - `src/app/uae/page.tsx` line 116 imports `IndiaFleetSection` from `@/components/fleet/IndiaFleetSection`.
   - Despite the component name, it takes generic props (`categories={content.fleetCategories}`, `copy={uaeData.fleetPresentation}`, `basePath="/uae"`, `currencySymbol="AED "`).
   - *Assessment*: Functionally it renders UAE content correctly, but naming it `IndiaFleetSection` causes cognitive confusion. A generic name or alias (e.g. `FleetCategorySection`) would better reflect multi-region reusability.

---

## 4. Unsupported Sample Vehicles and Fabricated Prices Catalog

### 4.1 Unsupported Vehicle Models
| Location | Current Content | Approved Baseline Equivalent | Assessment & Action Required |
|---|---|---|---|
| `src/content/rate-card.json:177` | `Mercedes-Benz S-Class / BMW 7 Series / Lexus ES 300h` | `Mercedes-Benz S-Class, BMW 7 Series` | **Prune `Lexus ES 300h`**. It is not authorized in brochure baseline. |
| `src/content/rate-card.json:194` | `Mercedes-Maybach S 680 / Maybach GLS` | `Mercedes-Maybach S-Class` | **Prune `Maybach GLS`**. Brochure authorizes Maybach S-Class only. |
| `src/content/rate-card.json:228` | `Mercedes-Benz VIP Sprinter (18 seats) / Luxury Coach (35–50 seats)` | `22-Seater VIP Coach, 44-Seater Luxury Bus` | **Prune `Mercedes-Benz VIP Sprinter (18 seats)`**. Brochure specifies 22 and 44-seater luxury coaches. |
| `src/content/corridors.json:198` | `Mercedes-Benz S-Class / BMW 7 Series / Lexus ES` | `Mercedes-Benz S-Class / BMW 7 Series` | **Prune `Lexus ES`**. |
| `src/content/corridors.json:222` | `Mercedes Sprinter (18 seats) / Luxury Coach (35–50 seats)` | `22-Seater VIP Coach / 44-Seater Luxury Bus` | **Prune `Mercedes Sprinter (18 seats)`**. |
| `src/content/fleet-specifications.json:199` | `Mercedes-Benz S-Class (W223)`, `BMW 7 Series (G70)` | `Mercedes-Benz S-Class`, `BMW 7 Series` | **Prune unofficial chassis generation codes `(W223)` and `(G70)`**. Preserve clean brochure model names. |

### 4.2 Fabricated Numeric Pricing Catalog
| File Path & Line Numbers | Current Fabricated Value | Location Rendered | Required Pruning & Replacement |
|---|---|---|---|
| `src/content/uae.json:270-271` | `"priceLabel": "Sample starting retainer"`, `"priceNote": "Illustrative pricing in AED..."` | `/uae` homepage | Replace with `"priceLabel": "Pricing"` and shared disclaimer: `"Vehicle allocation and pricing are confirmed for your location, dates and requirements."` |
| `src/content/uae.json:275` | `"packageLabel": "8 hours / 80 km"` | `/uae` homepage | Suppress package unit when price is null. |
| `src/content/uae.json:277` | `"pricingSource": "Indicative tariffs and sample retainers..."` | `/uae` data manifest | Remove or replace with confirmation upon quotation. |
| `src/content/uae.json:288` | `"price": 1200` (First Class) | `/uae` homepage | **Set `"price": null`**. Displays "Request a quote". |
| `src/content/uae.json:299` | `"price": 2500` (Ultra-Luxury) | `/uae` homepage | **Set `"price": null`**. Displays "Request a quote". |
| `src/content/uae.json:310` | `"price": 1600` (Executive SUVs) | `/uae` homepage | **Set `"price": null`**. Displays "Request a quote". |
| `src/content/uae.json:321` | `"price": 1400` (Executive MPVs) | `/uae` homepage | **Set `"price": null`**. Displays "Request a quote". |
| `src/content/uae.json:332` | `"price": 2200` (VIP Coaches) | `/uae` homepage | **Set `"price": null`**. Displays "Request a quote". |
| `src/content/fleet-specifications.json:231-237` | `rateCard`: Airport AED 450-550, Half-day AED 850, Full-day AED 1,400, Outstation AED 4.5/km | `/uae/fleet` | **Prune numeric rateCard**. Replace with standard enquiry object: `{"pricingLabel": "Request a quote", "note": "Vehicle options, pricing and route suitability are confirmed by our team."}`. |
| `src/content/fleet-specifications.json:275-281` | `rateCard`: Airport AED 850-1,100, Half-day AED 1,600, Full-day AED 2,600, Outstation AED 8.0/km | `/uae/fleet` | **Prune numeric rateCard**. Replace with standard enquiry object. |
| `src/content/fleet-specifications.json:319-325` | `rateCard`: Airport AED 550-650, Half-day AED 950, Full-day AED 1,600, Outstation AED 5.5/km | `/uae/fleet` | **Prune numeric rateCard**. Replace with standard enquiry object. |
| `src/content/fleet-specifications.json:363-369` | `rateCard`: Airport AED 1,100-1,600, Half-day AED 1,300, Full-day AED 2,200, Outstation AED 7.5/km | `/uae/fleet` | **Prune numeric rateCard**. Replace with standard enquiry object. |
| `src/content/corridors.json:201, 209, 217, 225` | `hourlyRetainer`: "AED 850", "AED 1,800", "AED 1,150", "AED 1,950" | `/uae/estimator` | Replace with `"Rate on quotation"`. |
| `src/content/corridors.json:238-243 (and all corridors)` | `priceRange`: `{"sedan": "AED 220 – AED 280", ...}` | `/uae/estimator` | Replace with enquiry-led rate brackets or `"Quotation on request"`. |

---

## 5. Pruning and Enquiry-Led Presentation Strategy

### 5.1 Architecture for Pruning and Enquiry-Led Replacement
The user rules (`AGENTS.md`) and original request state:
> *"Remove all fabricated pricing, sample rates, and journey calculation totals; display 'Request a quote' on cards and collect enquiry details without calculating fabricated amounts."*
> *"Shared note 'Vehicle allocation and pricing are confirmed for your location, dates and requirements.' is displayed."*

To satisfy this seamlessly on `/uae` and `/uae/fleet`:
1. **All Category Prices Set to `null`**:
   In `src/content/uae.json` (`fleetPresentation.items`), every category (`first-class`, `ultra-luxury`, `executive-suvs`, `executive-vans`, `coaches`, `electric`) has `"price": null`.
2. **Standardized Card Header Badge**:
   Card top right displays `"Request a quote"` (English) / `"طلب عرض أسعار"` (Arabic).
3. **Shared Confirmation Disclaimer**:
   Every vehicle card and fleet overview presents:
   - English: *"Vehicle allocation and pricing are confirmed for your location, dates and requirements."*
   - Arabic: *"يتم تأكيد خيارات المركبات والأسعار بناءً على موقعك ومواعيدك ومتطلباتك."*
4. **Direct Category & Vehicle Enquiries**:
   - Primary action: `"Enquire about this vehicle"` / `"استفسار عن هذه المركبة"` linking directly to `/uae/contact?category=${encodeURIComponent(category.name)}&vehicle=${encodeURIComponent(modelName)}`.
   - Secondary action: `"Plan a journey"` / `"حساب تكلفة الرحلة"` leading to `/uae/estimator` for distance and route planning.

### 5.2 Localization and RTL (`dir="rtl"`) Preservation
1. **Dynamic Direction Setting**:
   - `LanguageContext.tsx` applies `document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr"` and `document.documentElement.lang = newLocale`.
   - All directional icons (`ArrowRight`, chevrons) must have `rtl:rotate-180`.
2. **Arabic Dictionary Verification (`src/i18n/dictionaries/ar.ts`)**:
   - `fleet.priceLabel`: `"التسعير"` (Pricing)
   - `fleet.quoteLabel`: `"طلب عرض أسعار"` (Request a quote)
   - `fleet.priceNote`: `"يتم تأكيد خيارات المركبات والأسعار بناءً على موقعك ومواعيدك ومتطلباتك."`
   - `fleet.enquireCta`: `"استفسار عن هذه المركبة"`
   - `fleet.categories`:
     - `first-class`: `"صالون الدرجة الأولى"` (مرسيدس-بنز الفئة S، بي إم دبليو الفئة 7)
     - `ultra-luxury`: `"فخامة فائقة وكبار الشخصيات"` (مرسيدس-مايباخ الفئة S)
     - `executive-suvs`: `"سيارات الدفع الرباعي التنفيذية"` (كاديلاك إسكاليد، جي إم سي يوكون دينالي)
     - `executive-vans`: `"مركبات MPV التنفيذية"` (مرسيدس-بنز الفئة V)
     - `coaches`: `"حافلات وكوتشات كبار الشخصيات"` (حافلات VIP سعة 22 و44 مقعداً)
     - `electric`: `"المركبات الكهربائية"`
3. **English Dictionary Verification (`src/i18n/dictionaries/en.ts`)**:
   - `fleet.priceLabel`: `"Pricing"`
   - `fleet.quoteLabel`: `"Request a quote"`
   - `fleet.priceNote`: `"Vehicle allocation and pricing are confirmed for your location, dates and requirements."`
   - `fleet.enquireCta`: `"Enquire about this vehicle"`

### 5.3 Flow Comparison: `/uae/fleet` Page Architecture Choice

There are two viable implementation options for `/uae/fleet`:

#### Option A: Unified `IndiaFleetSection` with `standalone` (Recommended)
Replace the 800-line `InteractiveFleetShowcase` on `/uae/fleet` with:
```tsx
<IndiaFleetSection
  categories={content.fleetCategories}
  copy={uaeData.fleetPresentation}
  standalone
  basePath="/uae"
  currencySymbol="AED "
/>
```
- **Advantages**:
  1. *100% dictionary-backed localization* in English and Arabic (`en.ts`, `ar.ts`).
  2. *Single source of truth* using `uaeData.fleetCategories` and `uaeData.fleetPresentation` directly, avoiding the out-of-sync `fleet-specifications.json`.
  3. *Exact layout parity* with `/india/fleet` (responsive tabs, full accessibility, focus management, `#electric` hash listener).
  4. *Automatic RTL handling* already tested and certified in `IndiaFleetSection`.
  5. *Zero redundant pricing calculations*.

#### Option B: Cleaned `InteractiveFleetShowcase` Component
Keep `InteractiveFleetShowcase` in `src/app/uae/fleet/page.tsx`, but modify `InteractiveFleetShowcase.tsx`:
1. Prune all `rateCard` blocks from `fleet-specifications.json.uae`.
2. Remove the Tariff Calculator's calculation engine and replace it with an enquiry-dispatch configurator.
3. Replace hardcoded English strings ("Inspect Specs & Amenities", "Enquire About Category", "Close", "Passenger Configuration") with dictionary lookups from `fleetDict`.
- **Consideration**: Option B preserves the detailed modal inspection, but requires translating ~25 modal spec keys into Arabic to prevent mixed-language display on Arabic `/uae/fleet`.

---

## 6. Pre-fill Integration for "Enquire about this vehicle"

### 6.1 Query Parameter Flow
When a user clicks `"Enquire about this vehicle"` on a fleet card:
- Link: `/uae/contact?category=First+Class+Saloons&vehicle=Mercedes-Benz+S-Class`

### 6.2 Pre-fill Logic in `src/components/home/EnquirySection.tsx`
Currently:
```tsx
// Line 95:
const catParam = params.get("category");
setSelectedCategory(catParam || null);
```
Target Enhancement:
```tsx
const catParam = params.get("category");
const vehicleParam = params.get("vehicle");
setSelectedCategory(catParam || null);
if (vehicleParam) {
  setSelectedVehicle(vehicleParam);
  // Auto-populate requirement note if blank
  setRequirementText((prev) => 
    prev ? prev : `Enquiring regarding ${vehicleParam} (${catParam || "fleet"}).`
  );
}
```

### 6.3 WhatsApp Draft Construction (`src/lib/enquiryMessage.ts`)
Add `vehicle?: string | null;` to `EnquiryDraft` interface:
```typescript
export interface EnquiryDraft {
  companyName: string;
  fullName: string;
  company?: string;
  service: string;
  category?: string | null;
  vehicle?: string | null;
  city: string;
  requirement: string;
  passengerCount?: string;
  travelDate?: string;
  locale?: string;
}
```
In Arabic output (`isAr`):
```typescript
...(draft.vehicle ? [`*المركبة المطلوبة:* ${draft.vehicle}`] : []),
...(draft.category && !draft.vehicle ? [`*فئة المركبة:* ${draft.category}`] : []),
```
In English output:
```typescript
...(draft.vehicle ? [`*Vehicle Requested:* ${draft.vehicle}`] : []),
...(draft.category && !draft.vehicle ? [`*Vehicle Category:* ${draft.category}`] : []),
```

---

## 7. Concrete Implementation Roadmap for Downstream Builder

1. **Step 1: Prune `src/content/uae.json`**:
   - Set `"price": null` for all 6 items in `fleetPresentation.items`.
   - Update `priceLabel` to `"Pricing"` and `priceNote` to `"Vehicle allocation and pricing are confirmed for your location, dates and requirements."`.
   - Remove obsolete `pricingSource` and package rate references.

2. **Step 2: Prune `src/content/fleet-specifications.json`**:
   - Replace numeric `rateCard` on `first-class`, `ultra-luxury`, `executive-suvs`, `coaches` with `{ "pricingLabel": "Request a quote", "note": "Vehicle options, pricing and route suitability are confirmed by our team." }`.
   - Remove unofficial chassis generation codes (`(W223)`, `(G70)`).

3. **Step 3: Update `src/content/rate-card.json` & `corridors.json`**:
   - Prune unverified models (`Lexus ES 300h`, `Maybach GLS`, `Mercedes Sprinter 18-seat`).
   - Replace sample rate cards with corporate request guidance.

4. **Step 4: Update Localization Dictionaries (`en.ts`, `ar.ts`)**:
   - Set `quoteLabel: "Request a quote"` (English) and `"طلب عرض أسعار"` (Arabic).
   - Set `priceNote` to the shared confirmation note across both languages.

5. **Step 5: Implement Vehicle Pre-fill in Contact Flow**:
   - Update `EnquirySection.tsx` and `GuidedEnquiryAssistant.tsx` to read `params.get("vehicle")`.
   - Update `buildEnquiryMessage.ts` to output vehicle model in WhatsApp draft.

6. **Step 6: Execute Verification**:
   - Run `npm run type-check`
   - Run `npm run lint`
   - Run `npm run build`
   - Verify desktop and mobile at 1440px and 390px in both `ltr` and `rtl` modes.
