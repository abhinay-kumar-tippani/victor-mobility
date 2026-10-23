# Survey Report: Documentation, Provenance, Compliance & Verification Quality Gates
**Milestone**: Fleet Studio Imagery Upgrade  
**Explorer**: Explorer 3 (`explorer_survey_img3`)  
**Working Directory**: `d:\victor website\.agents\teamwork\explorer_survey_img3`  
**Date**: 2026-10-23  

---

## 1. Observation

### 1.1 Documentation & Provenance Baseline
- **`docs/fleet-image-sources.md`** (Lines 1–49):
  - Currently contains:
    - Regulatory & Brand Compliance Notice (Lines 5–12): Sets model reference disclosure principles and mandates the shared caption:
      > `"Images show vehicle models; actual assigned vehicles may vary."`
    - Authoritative 10-Vehicle Reference Image Registry Table (Lines 17–28): Logs `#`, `Vehicle Model`, `Cab Type`, `Fuel Version`, `Project Asset Path`, `Source URL / Repository`, `Author / Copyright Holder`, `License Terms`, and `Required Attribution Text`.
    - Dedicated Electric Vehicle (EV) Styling Specifications (Lines 32–39): Notes styling requirements for Tata Tigor (closed front aero grille, teal blue line), Tata Nexon (closed front fascia, teal accents), MG ZS EV (enclosed grille with charging flap), and Kia Carens Clavis EV (closed aero face, Star-Map LED DRLs).
    - Technical Specifications & Asset Optimization (Lines 42–49): Defines dimensions (1200×675, 16:9), format (WebP, 85% quality), serving architecture (`<Image />` component with `sizes="(max-width: 1024px) 100vw, 50vw"` and `object-cover`), and average size (~80 KB).
  - Current Registry entries for the 6 target upgrade vehicles cite external Wikimedia Commons / press references that suffer from casual road/street photography or composite staging:
    - Hyundai Aura (`/images/fleet/hyundai-aura.webp`): Auto Zuto, Wikimedia Commons (casual street photo).
    - Tata Tigor EV (`/images/fleet/tata-tigor-ev.webp`): Norbert Aepli, Geneva Motor Show 2017 (crowded auto-show floor).
    - Mahindra Marazzo (`/images/fleet/mahindra-marazzo.webp`): SnapMeUp, Wikimedia Commons (outdoor dealership parking lot).
    - Innova Crysta (`/images/fleet/innova-crysta.webp`): iMahesh, Wikimedia Commons (outdoor rural road near Janampeta).
    - Kia Carens Clavis EV (`/images/fleet/kia-carens-clavis-ev.webp`): DriveSpark, Wikimedia Commons (outdoor road snapshot of ICE Carens).
    - Force Urbania (`/images/fleet/force-urbania.webp`): Listed as composite with fallback to Ertiga/employee-shuttle.

- **`docs/handoff.md`** (Lines 1612–1680):
  - Structured chronological milestone format: Milestone title, Date, Owner, Key Deliverables & Scope, Changed Files, Quality Gates & Verification, and Verified Screenshots.
  - Previous Milestone 4 (2026-10-23) documented 104/104 test pass, 0 type errors, 0 lint warnings, and 74/74 static routes compiled.

### 1.2 Verification Infrastructure & Scripts
- **`package.json`** (Lines 5–11):
  - Scripts configured:
    - `"type-check"`: `tsc --noEmit`
    - `"lint"`: `next lint`
    - `"build"`: `next build`
    - `"dev"`: `next dev`
    - `"start"`: `next start`
  - Dependencies: `next@14.2.24`, `react@18.3.1`, `framer-motion@11.18.2`, `lucide-react@0.475.0`.
  - DevDependencies: `sharp@0.35.5`, `playwright@1.63.0`, `typescript@5.7.3`, `tailwindcss@3.4.17`.

- **Existing Test Suites**:
  - `scripts/verify-fleet-modernization.mjs` (84,225 bytes, 1,738 lines):
    - 4-Tier verification architecture:
      - Tier 1: Feature Coverage (45 tests across Features F1–F9)
      - Tier 2: Boundary & Corner Cases (45 tests across Features F1–F9)
      - Tier 3: Cross-Feature Combinations (9 tests, C1–C9)
      - Tier 4: Real-World Scenarios (5 tests, S1–S5 tested with Playwright browser against live server)
    - Directly executed on local environment:
      - Command: `node scripts/verify-fleet-modernization.mjs --skip-gates`
      - Result: **104/104 PASSED (100% compliance)** in 61.87s with Playwright Microsoft Edge browser engine.
    - Image-related assertions in current suite:
      - `F5.1_FLEET_IMAGE_DIR_AND_ASSETS`: Verifies `public/images/fleet/` directory exists.
      - `F5.2_IMAGE_SOURCES_DOC_EXISTS`: Verifies `docs/fleet-image-sources.md` exists.
      - `F5.3_IMAGE_SOURCES_ENTRIES`: Verifies all 10 vehicle names are present in documentation.
      - `F5.4_SHARED_IMAGE_CAPTION`: Verifies `"Images show vehicle models; actual assigned vehicles may vary."` is present.
      - `F5.5_EV_DEDICATED_IMAGERY`: Verifies EV image paths exist in SOT.
      - `F5.B1_VALID_IMAGE_EXTENSIONS`: Verifies `.webp`, `.jpg`, `.png` extensions.
      - `F5.B2_FILE_SYSTEM_EXISTENCE`: Verifies all 10 files exist on disk.
      - `F5.B3_IMAGE_FILE_SIZE_SANITY`: Checks `stat.size > 1024 && stat.size < 5 * 1024 * 1024` (5 MB ceiling). Note: Requirement R3 requires tightening this to `< 200 KB`.
      - `F5.B4_NO_TODO_IN_ATTRIBUTION_DOC`: Checks absence of `TODO`/`TBD`.
      - `F5.B5_NON_EMPTY_ALT_TEXT`: Checks `imageAlt` attribute length ≥ 10 chars.

- **Current Quality Gate Health**:
  - `npm run type-check`: Exited with code 0 (0 errors).
  - `npm run lint`: Exited with code 0 (`✔ No ESLint warnings or errors`).
  - `npm run build`: Exited with code 0, generating all 74 static pages (`74/74`) cleanly.

- **Current Fleet Asset Status in `public/images/fleet/`**:
  1. `swift-dzire.webp`: 48,184 bytes (47.1 KB)
  2. `hyundai-aura.webp`: 30,390 bytes (29.7 KB)
  3. `tata-tigor-ev.webp`: 94,596 bytes (92.4 KB)
  4. `tata-nexon-ev.webp`: 50,054 bytes (48.9 KB)
  5. `mg-zs-ev.webp`: 124,476 bytes (121.6 KB)
  6. `mahindra-marazzo.webp`: 95,784 bytes (93.5 KB)
  7. `ertiga-cng.webp`: 94,594 bytes (92.4 KB)
  8. `innova-crysta.webp`: 184,560 bytes (180.2 KB)
  9. `kia-carens-clavis-ev.webp`: 48,472 bytes (47.3 KB)
  10. `force-urbania.webp`: 143,248 bytes (139.9 KB)
  All 10 files currently resolve on disk, are WebP, and are under 200 KB. However, models 2, 3, 6, 8, 9, 10 are the older casual/road assets targeted for replacement with luxury studio visuals.

---

## 2. Logic Chain

### 2.1 Documentation & Provenance Requirements (R4)
1. **Observation**: The follow-up request requires luxury commercial automotive studio imagery for Hyundai Aura, Tata Tigor EV, Mahindra Marazzo, Innova Crysta, Kia Carens Clavis EV, and the authentic Force Urbania 12-seater, harmonized with Victor Mobility's brand palette (`#070A12`, `#15162F`, `#31326F`).
2. **Observation**: `docs/fleet-image-sources.md` currently attributes these models to Wikimedia Commons road photos or auto-show snapshots.
3. **Reasoning Step 1 (Asset Provenance Update)**:
   When new bespoke studio assets are generated and deployed, the provenance registry in `docs/fleet-image-sources.md` must accurately reflect their generation pipeline, prompt parameters, lighting setup, and commercial rights/license rather than claiming they are third-party Creative Commons street photos.
4. **Reasoning Step 2 (Brand Palette Guidelines Documentation)**:
   The document must codify the precise studio aesthetic standards:
   - Deep obsidian floor/shadows: `#070A12`
   - Corporate deep ink background gradient: `#15162F`
   - Subtle brand indigo ambient highlight: `#31326F`
   - Multi-point lighting setup: key light, softbox roofline strip, cool rim contour light.
   - Floor treatment: dark reflective surface with realistic contact shadow.
   - Horizon line alignment: consistent ~35-40% vertical baseline across all cards.
   - Camera angle: standard 3/4 front perspective with vehicle rotated ~30–35 degrees.
5. **Reasoning Step 3 (Technical EV and Model Accuracy Standards)**:
   - Tata Tigor EV: Closed front aero grille, teal blue humanity accent, EV badging.
   - Kia Carens Clavis EV: Futuristic closed EV front face, Star-Map LED daytime running light signature, aerodynamic wheels.
   - Force Urbania 12-Seater: Modern high-roof luxury passenger van silhouette with bull-inspired front fascia, wraparound projector headlamps, executive tinted panoramic windows — NOT a flat-nosed tempo or commercial cargo van.
6. **Reasoning Step 4 (Mandatory Regulatory Disclosure)**:
   Under Indian Consumer Protection rules and `AGENTS.md` instructions, the disclaimer:
   > `"Images show vehicle models; actual assigned vehicles may vary."`
   must remain verbatim on every vehicle card and be explicitly maintained in `docs/fleet-image-sources.md` as a non-negotiable compliance pillar.

### 2.2 Verification Quality Gates Architecture (R5)
1. **Observation**: `scripts/verify-fleet-modernization.mjs` exists, runs cleanly, and tests 104 static and dynamic rules. However, its image size sanity check accepts assets up to 5 MB (`F5.B3_IMAGE_FILE_SIZE_SANITY`).
2. **Observation**: Requirement R3 explicitly sets a strict `< 200 KB` file size limit for all replacement WebP assets.
3. **Observation**: Requirement R5 demands:
   a) Automated check that all 10 fleet images exist, decode successfully, and are under 200 KB.
   b) Responsive card rendering across desktop (1440px), tablet (768px), and mobile (390px/320px) viewports with zero horizontal overflow or layout distortion.
   c) Fresh desktop and mobile screenshots for `docs/screenshots/` and `docs/handoff.md`.
4. **Reasoning Step 5 (Automated Image Check Engine)**:
   A dedicated automated test function or standalone verification script (`scripts/verify-fleet-studio-imagery.mjs`) must verify:
   - Disk existence: all 10 filenames present in `public/images/fleet/`.
   - File size strictness: `stat.size < 200 * 1024` (204,800 bytes) and `stat.size > 1024` bytes.
   - Sharp decode test: `await sharp(filePath).metadata()` confirms format is `webp`, dimensions are 1200×675 (16:9), and `sharp(filePath).raw().toBuffer()` decodes all pixel data without corruption.
   - Network HTTP 200 test: fetches `/images/fleet/${filename}` against the live Next.js server, confirming HTTP 200 and `image/webp` MIME type.
5. **Reasoning Step 6 (Responsive Viewport & Zero Overflow Engine)**:
   In Playwright, test the `/india/fleet` and `/india` pages across 4 explicit viewports:
   - **Desktop (1440 × 900)**: 4-column card grid (`xl:grid-cols-4`), uniform card bounding boxes, zero layout shift.
   - **Tablet (768 × 1024)**: 2-column card grid (`sm:grid-cols-2`), no overflowing badges or text.
   - **Mobile (390 × 844)**: 1-column card grid (`grid-cols-1`), full-width cards.
   - **Narrow Mobile (320 × 568)**: Boundary test for small devices.
   Overflow evaluation formula:
   `document.documentElement.scrollWidth <= window.innerWidth + 1` (tolerance for subpixel rendering).
   Layout distortion evaluation:
   Verify `.aspect-[16/10]` image container renders with positive dimensions, `object-cover` prevents stretching, model names and badges wrap cleanly, and CTA buttons remain fully clickable within viewport boundaries.
6. **Reasoning Step 7 (Screenshot Capture Matrix)**:
   Generate and persist 8 fresh screenshot artifacts in `docs/screenshots/`:
   1. `fleet-studio-desktop-all-1440.png` (Desktop 1440px, All Vehicles view)
   2. `fleet-studio-desktop-ev-1440.png` (Desktop 1440px, `#electric` filter active)
   3. `fleet-studio-tablet-768.png` (Tablet 768px, 2-column layout)
   4. `fleet-studio-mobile-all-390.png` (Mobile 390px, All Vehicles view)
   5. `fleet-studio-mobile-ev-390.png` (Mobile 390px, `#electric` filter active)
   6. `fleet-studio-mobile-320.png` (Mobile 320px, narrow viewport check)
   7. `fleet-studio-home-desktop.png` (Homepage `/india#fleet` preview at 1440px)
   8. `fleet-studio-home-mobile.png` (Homepage `/india#fleet` preview at 390px)

---

## 3. Caveats
1. **Drop-in Filename Preservation**: The SOT (`src/content/india.json`) and `IndiaFleetSection.tsx` already map to specific asset filenames (`hyundai-aura.webp`, `tata-tigor-ev.webp`, `mahindra-marazzo.webp`, `innova-crysta.webp`, `kia-carens-clavis-ev.webp`, `force-urbania.webp`). Implementing the replacements as drop-in overwrites with identical filenames ensures zero code changes are required in UI components or page routes.
2. **Sharp vs Browser Decoding**: While Sharp verifies that the WebP bitstream decodes correctly into raw RGB/RGBA buffers on Node.js, browser-level Playwright execution additionally verifies that Chromium/WebKit/Edge decodes the image in the DOM without triggering `img.naturalWidth === 0` or console image-load errors. Both levels must be tested.
3. **Dev Server Prerequisite for Browser Tests**: Tier 4 browser tests and screenshot captures require an active local server at `http://127.0.0.1:3000`. The server is currently active and healthy.

---

## 4. Conclusion & Actionable Blueprint

### 4.1 Specification for `docs/fleet-image-sources.md` (Requirement R4)
The updated `docs/fleet-image-sources.md` must be structured into 5 authoritative sections:
1. **Regulatory & Brand Compliance Notice**: Retain verbatim `"Images show vehicle models; actual assigned vehicles may vary."` with the legal explanation that assets represent vehicle model references and do not depict specific physical units of Victor's operational fleet.
2. **Authoritative 10-Vehicle Reference Image Registry Table**:
   Update entries 2, 3, 6, 8, 9, 10 to document bespoke studio generative provenance, retaining existing verified reference documentation for models 1, 4, 5, 7.
3. **Studio Staging, Lighting & Brand Harmony Guidelines**:
   Document the exact visual standards:
   - Palette: Obsidian `#070A12`, Deep Ink `#15162F`, Indigo `#31326F`.
   - Contact ground shadows, specular reflection, multi-point studio lighting.
   - Consistent 16:9 widescreen aspect ratio, centered horizon line baseline at 35–40%.
4. **Vehicle-Specific Prompt & Model Trim Specifications**:
   Provide the exact, reproducible generation prompts used for:
   - Hyundai Aura (Sedan, Petrol & CNG)
   - Tata Tigor EV (Sedan, Electric Vehicle — closed aerodynamic grille, teal humanity accent, EV badging)
   - Mahindra Marazzo (SUV, Diesel — aerodynamic shark-inspired MPV silhouette)
   - Toyota Innova Crysta (SUV, Diesel — chrome trapezoidal grille, executive stance)
   - Kia Carens Clavis EV (SUV, Long Range EV — closed futuristic aero front, Star-Map LED DRLs)
   - Force Urbania 12-Seater (12 Seater, Diesel — modern aerodynamic luxury passenger van silhouette)
5. **Technical Specifications & Optimization Protocol**:
   Record standard dimensions (1200×675 px), format (WebP 85%), strict `< 200 KB` file size ceiling, and `<Image />` component responsive attributes.

### 4.2 Specification for `scripts/verify-fleet-studio-imagery.mjs` (Requirement R5)
Create an automated test suite script that executes the following 3 suites:
1. **Suite 1: Asset Pipeline & Sharp Decoding Gate**:
   - Asserts all 10 assets exist in `public/images/fleet/`.
   - Asserts all 10 assets are strictly `< 204,800 bytes` (200 KB) and `> 1,024 bytes`.
   - Sharp metadata test: `format === "webp"`, `width === 1200`, `height === 675`, aspect ratio = 16:9.
   - Sharp raw buffer decode test: validates 0 decode corruption.
   - HTTP probe test: checks HTTP 200 and Content-Type `image/webp` for all 10 assets on `http://127.0.0.1:3000`.
2. **Suite 2: Responsive Rendering & Zero Overflow Gate**:
   - Tests `/india/fleet` across 1440px (desktop), 768px (tablet), 390px (mobile), and 320px (narrow mobile).
   - Asserts `scrollWidth <= innerWidth + 1` across all 4 viewports in both All Vehicles and Electric filter modes.
   - Asserts card layout integrity: uniform card height, no badge or text overflow, non-zero image container dimensions.
3. **Suite 3: Screenshot Artifact Capture Gate**:
   - Captures and saves the 8 fresh screenshot PNGs to `docs/screenshots/`.
   - Confirms non-zero byte size for all screenshot files.

### 4.3 Specification for `docs/handoff.md`
Append a new milestone entry:
- Title: `## 23 October 2026 — Milestone: Luxury Commercial Automotive Studio Imagery Upgrade & Compliance Verification`
- Record Owner, Scope, Target Vehicles Upgraded, Asset Optimization Results, Quality Gates Passed (`type-check`, `lint`, `build` 74/74, automated verification script), and Markdown image links to all 8 fresh screenshots.

---

## 5. Verification Method

To independently verify this survey and future milestone execution, run the following commands:

1. **Verify TypeScript Compilation**:
   ```powershell
   npm run type-check
   ```
   *Expected result*: Exit code 0, 0 type errors.

2. **Verify ESLint Linting**:
   ```powershell
   npm run lint
   ```
   *Expected result*: Exit code 0, "✔ No ESLint warnings or errors".

3. **Verify Next.js Production Build**:
   ```powershell
   npm run build
   ```
   *Expected result*: Exit code 0, 74/74 static routes compiled successfully.

4. **Verify Existing E2E Fleet Suite**:
   ```powershell
   node scripts/verify-fleet-modernization.mjs --skip-gates
   ```
   *Expected result*: Exit code 0, 104/104 assertions passed.

5. **Verify Fleet Studio Imagery Suite (Once Implemented)**:
   ```powershell
   node scripts/verify-fleet-studio-imagery.mjs
   ```
   *Expected result*: All 10 images exist, decode cleanly via Sharp, are strictly < 200 KB, responsive viewports (1440px, 768px, 390px, 320px) show 0 horizontal overflow, and fresh screenshots are generated in `docs/screenshots/`.

6. **Inspect Documentation Files**:
   - `docs/fleet-image-sources.md` contains updated asset details, prompt specifications, brand harmony guidelines, and verbatim disclosure `"Images show vehicle models; actual assigned vehicles may vary."`.
   - `docs/handoff.md` contains the new milestone entry with screenshot links.
