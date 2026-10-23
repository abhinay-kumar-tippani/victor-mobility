# Project: Victor Mobility - Service Photographic Imagery & Card Architecture Upgrade

## Architecture
- **Single Source of Truth**: `src/content/india.json` (`services`) and `src/content/uae.json` (`services`).
- **Data Model**: `src/types/content.ts` (`ServiceItem`).
- **Service Pages**: `src/app/india/services/page.tsx` and `src/app/uae/services/page.tsx` (Server Components).
- **Reference Card Component**: `src/components/home/ServicesSection.tsx` (background Next.js `<Image fill>`, ink gradient overlay).
- **Asset Pipeline**: High-resolution photographic generation via `generate_image` + Sharp optimization (`scripts/build-service-images.mjs`) producing 1200x675 16:9 WebP files (< 200 KB) in `public/images/services/`.
- **Brand Palette Integration**: Deep Ink `#15162F`, Obsidian `#070A12`, Brand Indigo `#31326F`, Warm White `#F6F5F2`, Soft Neutral `#E5E4EA`.
- **WCAG AA Compliance**: Dark ink gradient overlay (`from-[#15162F]/95 via-[#15162F]/80 to-[#15162F]/55`) providing >= 8.9:1 contrast for text and >= 9.0:1 for icons.
- **Verification Engine**: Automated test script, Playwright screenshot capture (1440px desktop, 390px mobile), `tsc --noEmit`, `next lint`, `next build`.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Employee Transportation Visual | Executive corporate shuttles & commuter coaches outside modern tech parks | M1 | ORIGINAL_REQUEST §R1 |
| 2 | Bus & Shuttle Transport Visual | High-capacity corporate buses on urban business transit corridors | M1 | ORIGINAL_REQUEST §R1 |
| 3 | Event Transportation Visual | Executive convoys and luxury vans for summits and corporate conferences | M1 | ORIGINAL_REQUEST §R1 |
| 4 | Airport Transfers Visual | Uniformed chauffeur greeting executive passengers at airport terminal | M1 | ORIGINAL_REQUEST §R1 |
| 5 | Luxury Chauffeur Service Visual | Executive luxury saloons and limousines outside illuminated corporate headquarters | M1 | ORIGINAL_REQUEST §R1 |
| 6 | Rent-a-Car Fleet Visual | Premium executive self-drive and corporate car rental fleet | M1 | ORIGINAL_REQUEST §R1 |
| 7 | Tourism & City Travel (UAE) Visual | Luxury travel and executive excursions across Dubai and Abu Dhabi | M1 | ORIGINAL_REQUEST §R1 |
| 8 | Asset Pipeline & WebP Optimization | 1200x675 16:9 WebP images in `public/images/services/`, size < 200 KB | M1 | ORIGINAL_REQUEST §R1, §R3 |
| 9 | /india/services Card Layout Redesign | Background Next.js `<Image>`, fill, object-cover, group-hover:scale-105, dark ink gradient overlay | M2 | ORIGINAL_REQUEST §R2 |
| 10 | /uae/services Card Layout Redesign | Background Next.js `<Image>`, fill, object-cover, dark gradient overlay, RTL support | M2 | ORIGINAL_REQUEST §R2 |
| 11 | Service Metadata & Action Links Preservation | Preserve numbers (01-06), badge, title, description, scope checklist, and CTA links | M2 | ORIGINAL_REQUEST §R2 |
| 12 | WCAG AA Contrast & Accessible Icons | > 4.5:1 text contrast, accessible white/soft-neutral checklist icons replacing violet | M2 | ORIGINAL_REQUEST §R3 |
| 13 | Responsive Polish (320px to 1440px) | Zero horizontal overflow, flexible card padding and line-wrapping across all viewports | M2 | ORIGINAL_REQUEST §R3 |
| 14 | Quality Gates & Verification | `tsc --noEmit`, `next lint`, `next build` (74/74 routes), 1440px/390px screenshots, `docs/handoff.md` | M3 | ORIGINAL_REQUEST §R4 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Service Photographic Imagery Generation & Optimization | Generate 7 fresh realistic photographic assets, optimize to 16:9 WebP (< 200 KB) in `public/images/services/` | Survey | IN_PROGRESS |
| M2 | Services Card Architecture Redesign & Accessibility | Update `/india/services` and `/uae/services` cards with background images, ink gradient, WCAG AA contrast, RTL support | M1 | PLANNED |
| M3 | Responsive UI Verification, Screenshots & Handoff | Automated checks, `next build`, desktop (1440px) & mobile (390px) screenshots, `docs/handoff.md` | M1, M2 | PLANNED |

## Interface Contracts
### M1: Asset Pipeline Contract
- Input: High-fidelity generation prompts incorporating brand lighting and real-world executive mobility scenarios.
- Processing: Image generation tool + Sharp conversion script (`scripts/build-service-images.mjs`) to output 1200x675 WebP at quality 85, effort 5, file size < 200 KB.
- Output: Files in `public/images/services/`:
  - `employee-transportation.webp` (< 200 KB)
  - `bus-shuttle-transport.webp` (< 200 KB)
  - `event-transportation.webp` (< 200 KB)
  - `airport-transfers.webp` (< 200 KB)
  - `chauffeur-luxury.webp` (< 200 KB)
  - `rent-a-car.webp` (< 200 KB)
  - `tourism-travel.webp` (< 200 KB)
- Content Mapping: Service slug to image URL mapping exported or structured for easy consumption in both India and UAE routes.

### M2: Card Architecture Contract
- Target Components: `src/app/india/services/page.tsx` and `src/app/uae/services/page.tsx`.
- Card Container: `group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#15162F] overflow-hidden min-h-[380px] sm:min-h-[420px] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:border-white/25`.
- Image Layer: `<Image src={...} alt={service.title} fill className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={index < 2} />`.
- Gradient Overlay: `<div className="absolute inset-0 bg-gradient-to-t from-[#15162F]/95 via-[#15162F]/80 to-[#15162F]/55" />`.
- Content Layer: `relative z-10 flex flex-col justify-between h-full p-6 sm:p-8`.
- Contrast Standards:
  - Titles: `text-white font-bold` (12.35:1 contrast against `#15162F`).
  - Descriptions: `text-white/85` (8.94:1 contrast).
  - Scope Checklist items: `text-white/90` with icons in `text-brand-soft-neutral` (9.5:1 contrast).
  - Buttons: Primary CTA `bg-white text-brand-ink hover:bg-brand-warm-white` (17.68:1 contrast).
- Regional Invariance: LTR numbers & phone links in UAE Arabic mode (`dir="rtl"`).

### M3: Quality Gates Contract
- Verification Script: `scripts/verify-services-modernization.mjs` confirming:
  - 7/7 WebP service images decode cleanly, exist, and are < 200 KB.
  - HTTP 200 checks on `/india/services` and `/uae/services`.
  - Zero horizontal overflow across 1440px, 1024px, 390px, 320px viewports.
  - Screenshots captured for desktop (1440px) and mobile (390px) on both `/india/services` and `/uae/services`.
- Standard Gates:
  - `tsc --noEmit`: 0 errors.
  - `next lint`: 0 errors / warnings.
  - `next build`: 74 static and dynamic routes compiled with 0 errors.
- Handoff: `docs/handoff.md` updated with full release report.

## Code Layout
- `public/images/services/`: 7 optimized WebP service images.
- `scripts/build-service-images.mjs`: Sharp asset transformation script.
- `scripts/verify-services-modernization.mjs`: Automated verification and screenshot capture suite.
- `src/app/india/services/page.tsx`: India service catalog page.
- `src/app/uae/services/page.tsx`: UAE service catalog page.
- `src/types/content.ts`: Service item definitions.
- `docs/screenshots/`: Verification screenshots.
- `docs/handoff.md`: Project delivery notes.
