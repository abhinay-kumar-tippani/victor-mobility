# Project: Victor Mobility - Fleet Studio Imagery Upgrade & Brand Harmonization

## Architecture
- **Single Source of Truth**: `src/content/india.json` (`fleetVehicles`) and `src/types/content.ts`.
- **Fleet Presentation**: `src/components/fleet/IndiaFleetSection.tsx` serving `/india/fleet` and homepage preview.
- **Image Pipeline**: `generate_image` tool + Sharp optimization script (`scripts/build-fleet-studio-images.mjs`) -> 1200x675 WebP < 200 KB.
- **Asset Directory**: `public/images/fleet/*.webp`.
- **Brand Palette Integration**: Obsidian `#070A12`, Deep Ink `#15162F`, Brand Indigo `#31326F`.
- **Attribution & Provenance**: `docs/fleet-image-sources.md`.
- **Verification Engine**: `scripts/verify-fleet-studio-imagery.mjs`, Playwright browser engine, Next.js build.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Luxury Studio Reference Imagery for Flagship Models | High-end studio lighting, crisp reflections, 3/4 front perspective, obsidian/indigo gradient backdrop (#070A12, #15162F, #31326F), closed EV grilles & badges for Aura, Tigor EV, Marazzo, Crysta, Carens Clavis EV | M1 | ORIGINAL_REQUEST §R1 |
| 2 | Authentic Force Urbania 12-Seater Visual | Modern aerodynamic luxury monocoque executive passenger van visual (not commercial bus or delivery chassis) | M1 | ORIGINAL_REQUEST §R2 |
| 3 | Visual Harmony, Asset Pipeline & WebP Optimization | 16:9 widescreen WebP files in `public/images/fleet/`, size < 200 KB, uniform scale, contact shadows, horizon alignment | M1 | ORIGINAL_REQUEST §R3 |
| 4 | Provenance & Compliance Documentation | Update `docs/fleet-image-sources.md` with prompt specifications, brand harmony guidelines, retain mandatory disclosure | M2 | ORIGINAL_REQUEST §R4 |
| 5 | Responsive UI Verification & Quality Gates | 0 overflow at 1440px/768px/390px/320px, Sharp decode check, HTTP 200 check, type-check, lint, build (74/74), fresh screenshots, `docs/handoff.md` | M3 | ORIGINAL_REQUEST §R5 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Studio Imagery Asset Generation & Pipeline | Generate 6 luxury studio assets, process via Sharp to 1200x675 WebP < 200 KB, deploy to `public/images/fleet/`, verify visual accuracy | Survey | IN_PROGRESS |
| M2 | Provenance & Compliance Documentation | Update `docs/fleet-image-sources.md` with prompts, brand harmony guidelines, and compliance disclosures | M1 | PLANNED |
| M3 | Responsive UI Verification & Quality Gates | Create `scripts/verify-fleet-studio-imagery.mjs`, run all gates, capture fresh screenshots, update `docs/handoff.md` | M1, M2 | PLANNED |

## Interface Contracts
### M1: Asset Pipeline Contract
- Input: Image generation prompts with brand palette (#070A12, #15162F, #31326F), 3/4 front perspective, specific model trims.
- Processing: Sharp pipeline script `scripts/build-fleet-studio-images.mjs` converting 16:9 artifacts into 1200x675 WebP with quality 85, effort 5.
- Output: Files in `public/images/fleet/`:
  - `hyundai-aura.webp` (< 200 KB)
  - `tata-tigor-ev.webp` (< 200 KB)
  - `mahindra-marazzo.webp` (< 200 KB)
  - `innova-crysta.webp` (< 200 KB)
  - `kia-carens-clavis-ev.webp` (< 200 KB)
  - `force-urbania.webp` (< 200 KB)
- Baseline Alignment: Ground plane baseline at y=525-540px, vehicle width ~75-84% of frame.

### M2: Documentation Contract
- Input: Exact generation prompts, asset filenames, file sizes, and brand palette guidelines from M1.
- Output: Authoritative `docs/fleet-image-sources.md` with 5 structured sections and verbatim disclosure:
  > `"Images show vehicle models; actual assigned vehicles may vary."`

### M3: Quality Gates Contract
- Input: Assets in `public/images/fleet/`, documentation in `docs/fleet-image-sources.md`.
- Automated Verification: `scripts/verify-fleet-studio-imagery.mjs` confirming:
  - 10/10 assets exist, valid WebP, decode cleanly in Sharp, < 200 KB, HTTP 200.
  - Zero horizontal overflow across 1440px, 768px, 390px, 320px viewports.
  - 8 fresh screenshot PNGs saved in `docs/screenshots/`.
- Standard Gates:
  - `npm run type-check`: 0 errors
  - `npm run lint`: 0 warnings/errors
  - `npm run build`: 74/74 static pages
- Handoff: `docs/handoff.md` updated with full milestone report.

## Code Layout
- `public/images/fleet/`: 10 vehicle WebP assets.
- `src/content/india.json`: Single source of truth for India fleet data (`fleetVehicles`).
- `src/components/fleet/IndiaFleetSection.tsx`: Card grid, image container, and disclaimers.
- `docs/fleet-image-sources.md`: Model reference provenance & licensing documentation.
- `docs/screenshots/`: Verification screenshot artifacts.
- `docs/handoff.md`: Project delivery handoff documentation.
- `scripts/verify-fleet-studio-imagery.mjs`: Automated verification test suite.
