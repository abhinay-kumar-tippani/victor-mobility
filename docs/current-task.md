# Current Task: Direct Photographic Backgrounds on Service Cards (/services) — 23 October 2026

Owner: Antigravity.
Scope: Add realistic, high-resolution photographic background images to every service card on both `/india/services` and `/uae/services`, matching the visual styling of homepage service cards with high-contrast dark brand overlays, uniform card heights, and fully responsive layouts.

### Status: COMPLETED

### Completed in this Milestone:
1. **Asset Generation & WebP Optimization**:
   - Generated realistic, professional corporate transport photography for all 7 services.
   - Converted to widescreen 16:9 WebP at 1200x675 (<200 KB) using Sharp.
   - Mirror deployed to `public/images/services/`, `public/images/india/services/`, and `public/images/uae/services/`.
   - Asset provenance documented in `docs/service-image-sources.md`.
2. **Card Architecture Refactoring (`src/app/india/services/page.tsx` & `src/app/uae/services/page.tsx`)**:
   - Implemented Next.js `<Image>` layer with `fill`, `object-cover`, and smooth `group-hover:scale-105` zoom.
   - Added multi-stop gradient overlay (`from-[#15162F]/95 via-[#15162F]/85 to-[#15162F]/60`) ensuring WCAG AAA contrast.
   - Refactored text, badges, and checklists to `z-10` layer with frosted icon glass pills and emerald checkmarks (`text-emerald-400`).
   - Standardized uniform minimum card height (`min-h-[420px]`).
3. **Verification & Quality Gates**:
   - `npm run build`: 74/74 static routes compiled with 0 errors.
   - Automated verification suite (`scripts/verify-services-pages.mjs`):
     - All 6 India service cards and 6 UAE service cards verified with background images.
     - 0 horizontal overflow at 390px mobile viewport (`scrollWidth === clientWidth === 390px`).
   - Captured full-page desktop and mobile screenshots:
     - `docs/screenshots/services-india-desktop-1440.png`
     - `docs/screenshots/services-india-mobile-390.png`
     - `docs/screenshots/services-uae-desktop-1440.png`
     - `docs/screenshots/services-uae-mobile-390.png`
