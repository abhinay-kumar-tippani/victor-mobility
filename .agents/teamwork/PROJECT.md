# Project: Victor Mobility - Authoritative Fleet Dataset Replacement & Modernization

## Architecture
- **Single Source of Truth**: `src/content/india.json` (`fleetVehicles`) and `src/types/content.ts`.
- **Fleet Presentation**: `src/components/fleet/IndiaFleetSection.tsx` serving `/india/fleet` and homepage preview.
- **Enquiry & Pre-fill Flow**: `src/components/home/EnquirySection.tsx`, `src/lib/enquiryMessage.ts`.
- **Localization Layer**: `src/i18n/types.ts`, `src/i18n/dictionaries/{en,hi,te,ar}.ts`, with model name invariance.
- **Regional Isolation & UAE Fleet**: `src/content/uae.json`, `src/app/uae/fleet/page.tsx`, `src/app/uae/page.tsx` with enquiry-led presentation and RTL support.
- **Attribution & Provenance**: `docs/fleet-image-sources.md`, `public/images/fleet/`.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Authoritative Single Source of Truth | 10 manager-approved vehicles in `src/content/india.json` (`fleetVehicles`) with exact names, fuel labels, and cab types | M1 | ORIGINAL_REQUEST §R1 |
| 2 | Removal of Fabricated Pricing & Sample Rates | Replace numeric pricing with "Request a quote" and shared note across India routes and estimators | M1 | ORIGINAL_REQUEST §R1 |
| 3 | Fleet Page Categorization | 5 filter tabs (All: 10, Sedan: 5, SUV: 4, 12 Seater: 1, Electric: 4) rendered as interactive grid | M2 | ORIGINAL_REQUEST §R2 |
| 4 | EV Deep Linking (`/india/fleet#electric`) | Direct navigation / bookmark activates Electric Vehicles cross-category filter | M2 | ORIGINAL_REQUEST §R2 |
| 5 | Licensed Reference Imagery & Attribution | Clean 3/4 exterior reference images in `public/images/fleet/`, `docs/fleet-image-sources.md`, shared caption | M3 | ORIGINAL_REQUEST §R3 |
| 6 | Regional Scope & UAE Fleet Pruning | Prune unsupported models and prices from UAE, maintain enquiry-led presentation and RTL/Arabic | M3 | ORIGINAL_REQUEST §R4 |
| 7 | Vehicle Enquiry Pre-fill | "Enquire about this vehicle" CTA passes vehicle param; pre-filled in contact form and WhatsApp draft | M4 | ORIGINAL_REQUEST §R5 |
| 8 | Multi-Language Localization | Translate tabs, fuels, buttons, notes across EN, HI, TE, AR; maintain Latin model names | M4 | ORIGINAL_REQUEST §R5 |
| 9 | Quality Gates & Verification | `npm run type-check`, `npm run lint`, `npm run build`, desktop & mobile screenshots, `docs/handoff.md` | M4 | ORIGINAL_REQUEST §R5 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Dataset SOT & Price Removal | `india.json`, `types/content.ts`, `rate-card.json`, `corridors.json`, `JourneyEstimator.tsx`, `RfpDesk.tsx` | none | DONE |
| M2 | Fleet Page & Deep Linking | `IndiaFleetSection.tsx`, `/india/fleet/page.tsx`, `/india/page.tsx`, `FleetSection.tsx` | M1 | DONE |
| M3 | Licensed Imagery & UAE Pruning | `public/images/fleet/`, `docs/fleet-image-sources.md`, `uae.json`, `fleet-specifications.json`, UAE routes | M1 | DONE |
| M4 | Enquiry Pre-fill, i18n & Gates | `EnquirySection.tsx`, `enquiryMessage.ts`, `src/i18n/`, Playwright verification, `docs/handoff.md` | M2, M3 | DONE |

## Interface Contracts
### M1 ↔ M2 (`FleetVehicle` Contract)
- `src/types/content.ts` exports `FleetVehicle`:
  ```typescript
  export interface FleetVehicle {
    id: string;
    name: string; // e.g. "Swift Dzire"
    cabType: "Sedan" | "SUV" | "12 Seater";
    fuelType: "Petrol" | "Petrol & CNG" | "Electric Vehicle" | "Long Range Electric Vehicle" | "Diesel";
    isElectric: boolean;
    image: string; // e.g. "/images/fleet/swift-dzire.webp"
    imageAlt: string;
    description?: string;
  }
  ```
- `src/content/india.json` defines `fleetVehicles: FleetVehicle[]` containing exactly 10 records in manager order:
  1. Swift Dzire (Sedan, Petrol, isElectric: false)
  2. Hyundai Aura (Sedan, Petrol & CNG, isElectric: false)
  3. Tata Tigor (Sedan, Electric Vehicle, isElectric: true)
  4. Tata Nexon (Sedan, Long Range Electric Vehicle, isElectric: true)
  5. MG ZS EV (Sedan, Long Range Electric Vehicle, isElectric: true)
  6. Mahindra Marazzo (SUV, Diesel, isElectric: false)
  7. Ertiga CNG (SUV, Petrol & CNG, isElectric: false)
  8. Innova Crysta (SUV, Diesel, isElectric: false)
  9. Kia Carens Clavis EV (SUV, Long Range Electric Vehicle, isElectric: true)
  10. Urbania (12 Seater, Diesel, isElectric: false)

### M2 ↔ M4 (Enquiry Link Contract)
- Card CTA links to:
  `${effectiveBasePath}/contact?vehicle=${encodeURIComponent(vehicle.name)}&category=${encodeURIComponent(vehicle.cabType)}`
- `EnquirySection.tsx` parses `searchParams.get("vehicle")` and `searchParams.get("category")`.
- `buildEnquiryMessage` in `src/lib/enquiryMessage.ts` accepts `vehicle?: string | null` and outputs `*Vehicle Requested:* [vehicle]`.

### M3 ↔ M2 (Image Asset Contract)
- Image files located at `public/images/fleet/[id].webp` (or `.jpg`/`.png`).
- Shared caption displayed on each card:
  `"Images show vehicle models; actual assigned vehicles may vary."`

## Code Layout
- `src/content/india.json`: Single source of truth for India fleet data (`fleetVehicles`).
- `src/content/uae.json`: UAE content, enquiry-led (`price: null`), no fabricated rates.
- `src/types/content.ts`: Type definitions for `FleetVehicle` and updated content models.
- `src/components/fleet/IndiaFleetSection.tsx`: Filter tabs, vehicle card grid, `#electric` hash listener.
- `src/components/home/EnquirySection.tsx`: Enquiry form with vehicle pre-fill.
- `src/lib/enquiryMessage.ts`: WhatsApp draft message builder with vehicle details.
- `src/i18n/types.ts` & `src/i18n/dictionaries/`: Localization dictionaries.
- `public/images/fleet/`: Verified licensed vehicle images.
- `docs/fleet-image-sources.md`: Provenance documentation.
- `docs/handoff.md`: Project delivery handoff documentation.
