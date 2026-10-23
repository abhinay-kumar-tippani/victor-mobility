# Investigation Report: Vehicle Imagery, Licensing, Multi-Language Localization & Quality Gates (R3, R5)

**Agent**: Explorer Survey 3 (`teamwork_preview_explorer`)  
**Working Directory**: `d:\victor website\.agents\teamwork\explorer_survey_3`  
**Date**: 2026-10-22  
**Scope**: Requirements R3 & R5 from `ORIGINAL_REQUEST.md` and `AGENTS.md` (Vehicle imagery, licensing attribution, multi-language localization across EN/HI/TE/AR, model name invariance, quality gate scripts, and handoff standards).

---

## Executive Summary

1. **Vehicle Imagery Status**:
   - The repository currently contains **zero** individual model images for the 10 manager-approved India vehicles. Existing imagery in `public/images/india/` comprises temporary AI-generated composites (`hero.png`, `employee-shuttle.png`, `luxury-interior.png`, `electric-fleet.jpg`), documented in `docs/image-prompts.md` and flagged in `src/content/media.json` as `aiGenerated: true` and `temporary: true`.
   - Serving pattern: Components (`IndiaFleetSection.tsx`, `InteractiveFleetShowcase.tsx`) use Next.js `<Image />` with `fill`, `object-cover`, responsive `sizes`, and an overlay caption.
   - Requirement R3 calls for clean, proportional 3/4 exterior model reference images matching the exact fuel type (specifically dedicated EV models for Tigor, Nexon, MG ZS EV, and Carens Clavis EV). Assets should be WebP/JPEG, optimized (< 200KB), and organized in `public/images/fleet/`.

2. **Licensing Documentation (`docs/fleet-image-sources.md`)**:
   - `docs/fleet-image-sources.md` does **not exist** and must be created.
   - Provenance schema should match `docs/map-attribution.md`: Model Name, Cab Type, Fuel Version, Asset Path, Source URL, Author/Organization, License Terms (CC BY-SA, manufacturer editorial press asset, open stock), Attribution Text, and SHA-256 hash or retrieval date.
   - The shared caption across all cards and dictionaries must be updated from `"Vehicle imagery is illustrative."` to:  
     `"Images show vehicle models; actual assigned vehicles may vary."`

3. **Multi-Language Localization Survey**:
   - Architecture: Client provider `src/i18n/LanguageContext.tsx` with strongly typed dictionaries in `src/i18n/dictionaries/` (`en.ts`, `hi.ts`, `te.ts`, `ar.ts`).
   - Regional isolation: India routes (`/india/*`) offer `en`, `hi`, `te` (LTR); UAE routes (`/uae/*`) offer `en` and `ar` (RTL). Preferences persist independently in `localStorage` + cookies.
   - Translation strings: Currently, fleet filter tabs ("All Vehicles", "Sedan", "SUV", "12 Seater"), fuel badges ("Petrol", "Petrol & CNG", "Electric Vehicle", "Long Range Electric Vehicle", "Diesel"), and shared notes are missing from the i18n dictionaries.
   - **Critical Rule — Model Name Invariance**: Vehicle model names ("Swift Dzire", "Hyundai Aura", "Tata Tigor", "Tata Nexon", "MG ZS EV", "Mahindra Marazzo", "Ertiga CNG", "Innova Crysta", "Kia Carens Clavis EV", "Urbania") must remain **identical Latin script** across English, Hindi, Telugu, and Arabic. Previous translations in `hi.ts` and `te.ts` that transliterated model names into Devanagari/Telugu scripts must be avoided.

4. **Quality Gates & Verification**:
   - `package.json` scripts:
     - `npm run type-check` (`tsc --noEmit`)
     - `npm run lint` (`next lint`)
     - `npm run build` (`next build`, 74 SSG static pages + `/api/contact`)
   - Test framework: Playwright (`playwright` in `devDependencies`). Scripts launch via Edge channel (`channel: "msedge"`).
   - Screenshot setup: Viewports 1440x900 (desktop) and 390x844 (mobile), output to `docs/screenshots/`.
   - `docs/handoff.md` standards: Append-only chronological entry documenting deliverables, quality gate logs, changed files, and screenshot paths.

---

## 1. Vehicle Imagery & Component Serving Architecture

### 1.1 Existing Image Asset Inventory
Inspection of `public/images/` and subdirectories revealed the following fleet-related assets:

| File Path | Format | Size | Resolution / Aspect | Current Role / Component Use |
|---|---|---|---|---|
| `public/images/india/hero.png` | PNG | 2.24 MB | 1920×1080 (16:9) | Default image for Sedans and MPVs in `india.json` / `fleet-specifications.json` |
| `public/images/india/employee-shuttle.png` | PNG | 2.19 MB | 1920×1080 (16:9) | Used for Buses & Shuttles in `india.json` |
| `public/images/india/luxury-interior.png` | PNG | 1.98 MB | 1920×1080 (16:9) | Interior shot used for Luxury saloons |
| `public/images/india/electric-fleet.jpg` | JPEG | 815 KB | 1920×1080 (16:9) | Used for Electric Vehicles tab |
| `public/images/uae/uae-hero.jpg` | JPEG | 884 KB | 1920×1080 (16:9) | Used for UAE Executive SUVs and UAE Hero |
| `public/images/india/services/*` | JPEG/PNG | 840KB - 2.7MB | Various | Service category hero illustrations |

### 1.2 Current Asset Metadata (`src/content/media.json`)
Lines 1–13 of `src/content/media.json`:
```json
{
  "caption": "Vehicle imagery is illustrative.",
  "assets": [
    {
      "id": "hero",
      "src": "/images/india/corporate-hero.jpg",
      "alt": "Modern corporate commuter bus and executive fleet outside a contemporary commercial technology park in daylight.",
      "aiGenerated": true,
      "temporary": true,
      "actualVictorFleetPhoto": false
    },
    ...
  ],
  "replacementInstructions": "Replace the file at the same path or edit src. Update alt text, focal point, aiGenerated, temporary and actualVictorFleetPhoto to reflect the replacement. Do not state it is a real fleet image until that is true."
}
```

### 1.3 How Images Are Served in Components
In `src/components/fleet/IndiaFleetSection.tsx` (lines 165–170):
```tsx
<div className="relative min-h-[240px] sm:min-h-[340px] lg:min-h-[500px]">
  <Image 
    src={active.image} 
    alt={active.imageAlt} 
    fill 
    sizes="(max-width: 1024px) 100vw, 50vw" 
    className="object-cover" 
    style={{ objectPosition: active.imagePosition }} 
  />
  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-ink/85 to-transparent px-5 pb-5 pt-16">
    <p className="text-xs text-white/85">{imageCaption}</p>
  </div>
</div>
```

In `src/components/fleet/InteractiveFleetShowcase.tsx` (lines 215–222):
```tsx
<div className="relative h-56 sm:h-64 w-full bg-slate-900 overflow-hidden">
  <Image
    src={category.heroImage}
    alt={evTitle}
    fill
    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-85"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
  ...
```

### 1.4 Recommendations for 10-Vehicle Imagery (R3)
- Target directory: `public/images/fleet/`
- Target naming:
  - `swift-dzire.webp`
  - `hyundai-aura.webp`
  - `tata-tigor-ev.webp`
  - `tata-nexon-ev.webp`
  - `mg-zs-ev.webp`
  - `mahindra-marazzo.webp`
  - `ertiga-cng.webp`
  - `innova-crysta.webp`
  - `kia-carens-clavis-ev.webp`
  - `urbania.webp`
- Format & Dimensions: WebP with JPEG fallback, 16:9 or 4:3 exterior three-quarter angle, 1200×675 px downscaled/responsive, compressed to < 180 KB each.
- Ensure dedicated EV representations for Tigor EV, Nexon EV, MG ZS EV, and Clavis EV (e.g., closed EV grille, distinctive EV teal/blue badging or accents).

---

## 2. Licensing Documentation & Attribution (`docs/fleet-image-sources.md`)

### 2.1 File Absence
`docs/fleet-image-sources.md` currently does not exist.

### 2.2 Provenance Documentation Schema
Modeled after `docs/map-attribution.md` and `docs/uae-map-attribution.md`, the new file `docs/fleet-image-sources.md` should include:

1. **Header & Context**: Objective, compliance with AGENTS.md, clear disclosure that images serve as model references and not actual fleet photos.
2. **Attribution Table**:
   | Vehicle Model | Category | Fuel Version | Project File Path | Source URL / Repository | Creator / Copyright Holder | License Type | Attribution Text |
3. **Model-Reference Caption Requirement**:
   - Exact text: `"Images show vehicle models; actual assigned vehicles may vary."`
   - Must appear on every vehicle presentation card/panel and be localized across all supported languages.

---

## 3. Multi-Language Localization Survey (EN, HI, TE, AR)

### 3.1 Localization Architecture
- **Location**: `src/i18n/`
  - `types.ts`: `SupportedLocale` (`"en" | "hi" | "te" | "ar"`), `LocaleMeta`, `TranslationDictionary` interface.
  - `LanguageContext.tsx`: Client context provider managing `locale`, `setLocale`, `dict`, `dir`, and regional storage keys (`victor_locale_india`, `victor_locale_uae`).
  - `dictionaries/en.ts`: Canonical English dictionary.
  - `dictionaries/hi.ts`: Hindi dictionary.
  - `dictionaries/te.ts`: Telugu dictionary.
  - `dictionaries/ar.ts`: Arabic dictionary.

### 3.2 Regional Language Scope
- **India Routes (`/india`, `/india/*`)**:
  - Languages: English (`en`), हिन्दी (`hi`), తెలుగు (`te`).
  - Direction: All `dir="ltr"`.
- **UAE Routes (`/uae`, `/uae/*`)**:
  - Languages: English (`en`), العربية (`ar`).
  - Direction: `en` is `ltr`, `ar` is `rtl`.
  - Arabic font: `IBM Plex Sans Arabic` loaded in `src/app/layout.tsx`.
  - Directional icons: `rtl:rotate-180`.
  - Numbers/phones: Wrapped in `<span dir="ltr">` or CSS `unicode-bidi: isolate`.

### 3.3 Translation Strings Needed for Fleet Overhaul

#### A. Category Filter Tabs
| Tab Identifier | English (`en.ts`) | Hindi (`hi.ts`) | Telugu (`te.ts`) | Arabic (`ar.ts`) |
|---|---|---|---|---|
| `all` | All Vehicles | सभी वाहन | అన్ని వాహనాలు | جميع المركبات |
| `sedan` | Sedan | सेडान | సెడాన్ | سيدان |
| `suv` | SUV | एसयूवी | ఎస్ యూ వి | سيارات الدفع الرباعي |
| `twelveSeater` | 12 Seater | 12 सीटर | 12 సీటర్ | 12 مقعد |
| `electric` | Electric Vehicles | इलेक्ट्रिक वाहन | ఎలక్ట్రిక్ వాహనాలు | المركبات الكهربائية |

#### B. Fuel Type Badges
| Fuel Identifier | English (`en.ts`) | Hindi (`hi.ts`) | Telugu (`te.ts`) | Arabic (`ar.ts`) |
|---|---|---|---|---|
| `petrol` | Petrol | पेट्रोल | పెట్రోల్ | بنزين |
| `petrolCng` | Petrol & CNG | पेट्रोल एवं सीएनजी | పెట్రోల్ & సిఎన్జి | بنزين وغاز طبيعي |
| `ev` | Electric Vehicle | इलेक्ट्रिक वाहन | ఎలక్ట్రిక్ వాహనం | مركبة كهربائية |
| `longRangeEv` | Long Range Electric Vehicle | लॉन्ग रेंज इलेक्ट्रिक वाहन | లాంగ్ రేంజ్ ఎలక్ట్రిక్ వాహనం | مركبة كهربائية طويلة المدى |
| `diesel` | Diesel | डीजल | డీజిల్ | ديزل |

#### C. Action Buttons & CTAs
| Action Identifier | English (`en.ts`) | Hindi (`hi.ts`) | Telugu (`te.ts`) | Arabic (`ar.ts`) |
|---|---|---|---|---|
| `requestQuote` | Request a quote | कोटेशन का अनुरोध करें | కొటేషన్ అభ్యర్థించండి | طلب عرض أسعار |
| `enquireVehicle` | Enquire about this vehicle | इस वाहन के लिए पूछताछ करें | ఈ వాహనం కోసం విచారించండి | استفسار عن هذه المركبة |

#### D. Shared Notes & Captions
| Note Identifier | English (`en.ts`) | Hindi (`hi.ts`) | Telugu (`te.ts`) | Arabic (`ar.ts`) |
|---|---|---|---|---|
| `modelReferenceCaption` | Images show vehicle models; actual assigned vehicles may vary. | छवियां वाहन मॉडल दर्शाती हैं; वास्तविक आवंटित वाहन भिन्न हो सकते हैं। | చిత్రాలు వాహన మోడళ్లను చూపుతాయి; వాస్తవంగా కేటాయించిన వాహనాలు మారవచ్చు. | تُظهر الصور طرازات المركبات؛ قد تختلف المركبات المخصصة فعلياً. |
| `allocationNote` | Vehicle allocation and pricing are confirmed for your location, dates and requirements. | वाहन आवंटन और मूल्य निर्धारण आपके स्थान, तिथियों और आवश्यकताओं के लिए पुष्टि की जाती है। | మీ ప్రదేశం, తేదీలు మరియు అవసరాలకు అనుగుణంగా వాహన కేటాయింపు మరియు ధర నిర్ధారించబడతాయి. | يتم تأكيد تخصيص المركبة والأسعار وفقاً لموقعك وتواريخك ومتطلباتك. |

### 3.4 Vehicle Model Name Invariance Verification
The user requirement and `ORIGINAL_REQUEST.md` mandate:
> "Translate category labels, fuel descriptions, buttons, and supporting copy consistently across English, Hindi, and Telugu (while keeping vehicle names identical)."

**Verification Finding**:
- In existing `hi.ts` (lines 206, 212) and `te.ts` (lines 206, 212), previous code transliterated models:
  - `hi.ts:206`: `models: "स्विफ्ट डिजायर, टाटा टिगोर या समकक्ष"`
  - `te.ts:206`: `models: "స్విఫ్ట్ డిజైర్, టాటా టిగోర్ లేదా సమానమైనవి"`
- **Strict Implementation Rule**: Under the new architecture, vehicle model names MUST remain exactly identical across all languages:
  1. `Swift Dzire`
  2. `Hyundai Aura`
  3. `Tata Tigor`
  4. `Tata Nexon`
  5. `MG ZS EV`
  6. `Mahindra Marazzo`
  7. `Ertiga CNG`
  8. `Innova Crysta`
  9. `Kia Carens Clavis EV`
  10. `Urbania`
- They must not be transliterated into Devanagari, Telugu, or Arabic alphabets.

---

## 4. Quality Gate Commands, Scripts & Handoff Setup

### 4.1 `package.json` Scripts
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "type-check": "tsc --noEmit"
}
```
- **Type-Check Gate**: `npm run type-check` invokes `tsc --noEmit`. Must exit 0 with 0 errors.
- **Lint Gate**: `npm run lint` invokes `next lint`. Configured with `.eslintrc.json` (`next/core-web-vitals`). Must exit 0 with 0 warnings and 0 errors.
- **Build Gate**: `npm run build` runs Next.js production SSG build. Compiles 74 static pages + `/api/contact`. Must succeed cleanly.

### 4.2 Automated Testing Setup (Playwright)
- `playwright` is installed in `devDependencies` (`^1.63.0`).
- Test scripts live in `scripts/`:
  - `scripts/verify-language-selector.mjs`: Tests India language switcher (en, hi, te), persistence, dropdown keyboard interactions.
  - `scripts/verify-uae-language-selector.mjs`: Tests UAE language switcher (en, ar), RTL layout, isolation.
  - `scripts/verify-ev-fleet.mjs`: Tests EV tab content on `/india/fleet`.
  - `scripts/capture-screenshots.mjs`: Captures desktop (1440×900) and mobile (390×844) viewport and full-page screenshots.
- **Execution pattern**: Scripts launch via Playwright using:
  ```js
  const browser = await chromium.launch({ channel: "msedge" });
  ```
  with fallback to default chromium.

### 4.3 Screenshot Capture Requirements
Artifacts must be stored in `docs/screenshots/`:
- `desktop-fleet-all.png` (1440px, All Vehicles view)
- `desktop-fleet-electric.png` (1440px, `#electric` active tab)
- `mobile-fleet-all.png` (390px, mobile card stack)
- `mobile-fleet-electric.png` (390px, mobile EV view)
- `desktop-contact-prefilled.png` (Enquiry form with pre-filled vehicle)

### 4.4 `docs/handoff.md` Conventions
Entries in `docs/handoff.md` must follow the established format:
1. Date header: `## [DD Month YYYY] — [Milestone Title]`
2. Owner: `Owner: Antigravity`
3. Architecture & UX Deliverables (bullet points with code locations)
4. Quality Gate Pass Log:
   - `npm run type-check`: 0 errors
   - `npm run lint`: 0 errors, 0 warnings
   - `npm run build`: static SSG compile status
   - Playwright verification test assertion count
5. Screenshot artifacts table/list with links to `docs/screenshots/`

---

## 5. Concrete Implementation Strategy for Workers

### Step 1: Create Single Source of Truth Fleet Dataset
Create a single authoritative file `src/content/fleet-authoritative.json` (or TypeScript module `src/content/fleetData.ts`) defining the 10 vehicles:
```ts
export interface VehicleRecord {
  id: string;
  name: string;
  cabType: "Sedan" | "SUV" | "12 Seater";
  fuelLabel: "Petrol" | "Petrol & CNG" | "Electric Vehicle" | "Long Range Electric Vehicle" | "Diesel";
  isElectric: boolean;
  image: string;
  imageAlt: string;
  seating?: string; // Only Urbania: "12 Seater"
  displayOrder: number; // 1 to 10
}
```
All filtered views (All: 10, Sedan: 5, SUV: 4, 12 Seater: 1, Electric Vehicles: 4) are strictly derived from this single array.

### Step 2: Download / Optimize 10 Licensed Images
- Obtain licensed 3/4 exterior photos for the 10 vehicles.
- Optimize into `public/images/fleet/*.webp`.
- Populate `docs/fleet-image-sources.md` with complete provenance entries.

### Step 3: Extend i18n Dictionaries
- In `src/i18n/types.ts`: Add `filterTabs`, `fuelLabels`, `buttons`, `sharedNotes` to `fleet`.
- In `en.ts`, `hi.ts`, `te.ts`, `ar.ts`: Populate translations while keeping `name` identical Latin text.
- Update `imageCaption` in all dictionaries to `"Images show vehicle models; actual assigned vehicles may vary."`.

### Step 4: Refactor India Fleet Components
- Update `src/components/fleet/IndiaFleetSection.tsx`:
  - Render the 5 category tabs: All Vehicles (10), Sedan (5), SUV (4), 12 Seater (1), Electric Vehicles (4).
  - Handle URL hash `#electric` on mount and hashchange to select Electric Vehicles.
  - Display "Request a quote" (no numeric rates).
  - "Enquire about this vehicle" CTA routes to `/india/contact?vehicle=${encodeURIComponent(vehicle.name)}`.
  - Display shared note: "Vehicle allocation and pricing are confirmed for your location, dates and requirements."

### Step 5: Prune UAE Fleet Routes
- Remove fabricated pricing and sample rates from `src/content/uae.json` and `src/components/fleet/InteractiveFleetShowcase.tsx`.
- Replace tariff generator / rate cards with an enquiry-led quote request flow ("Request a quote" / "طلب عرض أسعار").
- Ensure no India vehicles leak onto UAE routes and RTL layout remains intact.

### Step 6: Connect Enquiry Pre-fill
- In `src/components/home/EnquirySection.tsx`:
  - Parse `vehicle` query parameter from URL in addition to `category`.
  - Pre-fill preferred vehicle badge/input.
  - Include vehicle name in WhatsApp draft message generator (`src/lib/enquiryMessage.ts`).
  - Retain pre-filled vehicle state when switching languages.

### Step 7: Quality Gate Verification & Handoff
- Run `npm run type-check`, `npm run lint`, `npm run build`.
- Run automated Playwright tests and capture desktop/mobile screenshots into `docs/screenshots/`.
- Update `docs/handoff.md`.
