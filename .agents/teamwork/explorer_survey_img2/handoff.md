# Handoff Report: Victor Mobility Fleet Studio Imagery — Asset Pipeline & UI Integration Survey

**Author**: Explorer 2  
**Date**: 2026-10-23  
**Working Directory**: `d:\victor website\.agents\teamwork\explorer_survey_img2`  
**Milestone**: `fleet-studio-imagery-upgrade`  
**Target Recipient**: Orchestrator / Implementer (`42258ba4-2201-4e69-81b1-16796fa161ca`)

---

## 1. Observation

### 1.1 Existing Tooling and Execution Environment
- **Node.js**: `v22.12.0` is active.
- **Sharp Package**: `sharp` (`^0.35.5`) is installed in `devDependencies` within `package.json:30`.
  - Runtime verification via `node -e "import('sharp').then(...)"` confirms Sharp `0.35.5` with `libvips 8.18.7` and `libwebp 1.6.0` are active and fully operational.
  - Prototype inspection confirms Sharp supports `resize`, `composite`, `extend`, `extract`, `trim`, `sharpen`, `linear`, `modulate`, `tint`, `webp`, and buffer streaming.
- **Python**: Python `3.13.0` is installed with `Pillow` (`PIL`) at `C:\Users\tippa\AppData\Local\Programs\Python\Python313\Lib\site-packages\PIL\__init__.py`.
- **FFmpeg**: Executable available at `C:\Users\tippa\AppData\Local\Microsoft\WinGet\Packages\yt-dlp.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-N-121583-g4348bde2d2-win64-gpl\bin\ffmpeg.exe`.
- **Missing CLI Binaries**: Neither `magick` (ImageMagick) nor `cwebp` are installed in the Windows system `PATH`. Sharp and Pillow provide native, superior programmatic alternatives.
- **Image Generation Capability**: The subagent environment provides the `generate_image` tool supporting `AspectRatio: "16:9"` (native output resolution: `1376 × 768` JPEG).

### 1.2 Public Fleet Assets on Disk (`public/images/fleet/`)
Inspection of all 10 existing assets in `public/images/fleet/` via Sharp reveals:
| Filename | Resolution | Aspect Ratio | Format | File Size | Current Source / Visual Style |
|---|---|---|---|---|---|
| `swift-dzire.webp` | 1200 × 675 | 16:9 | WebP | 47 KB | Local AI studio generated artifact |
| `hyundai-aura.webp` | 1200 × 675 | 16:9 | WebP | 30 KB | Casual outdoor PNG cutout |
| `tata-tigor-ev.webp` | 1200 × 675 | 16:9 | WebP | 92 KB | Geneva motor show snapshot |
| `tata-nexon-ev.webp` | 1200 × 675 | 16:9 | WebP | 49 KB | Local AI studio generated artifact |
| `mg-zs-ev.webp` | 1200 × 675 | 16:9 | WebP | 122 KB | Wikimedia 2023 EV model reference |
| `mahindra-marazzo.webp` | 1200 × 675 | 16:9 | WebP | 94 KB | Casual outdoor street snapshot |
| `ertiga-cng.webp` | 1200 × 675 | 16:9 | WebP | 92 KB | Motor show exhibition reference |
| `innova-crysta.webp` | 1200 × 675 | 16:9 | WebP | 180 KB | Casual roadside snapshot ("near Janampeta") |
| `kia-carens-clavis-ev.webp` | 1200 × 675 | 16:9 | WebP | 47 KB | Casual ICE road model snapshot |
| `force-urbania.webp` | 1200 × 675 | 16:9 | WebP | 140 KB | Generic coach composite (`employee-shuttle.png`) |

All 10 existing assets are currently `1200 × 675` WebP and range between 30 KB and 180 KB (all strictly under 200 KB).

### 1.3 UI Integration Architecture
1. **Single Source of Truth (`src/content/india.json`)**:
   - `fleetVehicles` (lines 771–873) defines the authoritative 10-vehicle dataset in exact manager order.
   - Every entry references `/images/fleet/<filename>.webp` matching the 10 files listed above.
   - Every entry provides verified `name`, `cabType`, `fuelType`, `isElectric`, `imageAlt`, and `description`.
2. **Active Presentation Component (`src/components/fleet/IndiaFleetSection.tsx`)**:
   - Both `/india/fleet` (`src/app/india/fleet/page.tsx:21`) and `/india` (`src/app/india/page.tsx:46`) import and render `<IndiaFleetSection />`.
   - `src/components/home/FleetSection.tsx` is an older category-level component that is **not** imported or rendered on any active route.
   - In `IndiaFleetSection.tsx:402-425`:
     - Grid: `grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`.
     - Card: `group flex flex-col overflow-hidden rounded-2xl border border-brand-soft-neutral bg-brand-warm-white shadow-xs transition-all duration-200 hover:shadow-md`.
     - Image Wrapper: `relative aspect-[16/10] w-full overflow-hidden bg-brand-soft-neutral/30`.
     - Image Tag: `<Image src={vehicle.image} alt={vehicle.imageAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />`.
     - Bottom Overlay: `absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/40 to-transparent p-2.5` displaying `"Images show vehicle models; actual assigned vehicles may vary."`.
3. **Aspect Ratio Analysis**:
   - Container has `aspect-[16/10]` (1.6:1), whereas image assets are 16:9 (1.778:1).
   - Under `object-cover`, the 16:9 image fills container height and is cropped by `~5%` on the left and right edges (10% total width crop).
   - Card height is determined by CSS grid with `flex-1` body; all cards in any given row have identical, uniform height.
4. **Existing Test Suite & Quality Gates**:
   - `scripts/verify-fleet-modernization.mjs` executes 104 assertions spanning Tier 1 to Tier 4; all 104 currently pass.
   - Specifically, `F5.B2` verifies every SOT image exists on disk, `F5.B3` verifies sizes are between 1 KB and 5 MB, and `F5.B4` verifies `docs/fleet-image-sources.md` contains attribution for all 10 models without `TODO`/`TBD` tokens.
   - `npm run type-check` (`tsc --noEmit`) passes with 0 errors.
   - `npm run lint` (`next lint`) passes with 0 errors/warnings.

---

## 2. Logic Chain

1. **Why Sharp is the Primary Optimization Engine**:
   - Sharp is already installed in `devDependencies`, requires no external system dependencies or administrator privileges, and integrates with Node.js ESM scripts.
   - WebP compression with `quality: 85, effort: 5` achieves file sizes of 40–120 KB at `1200 × 675` resolution, well below the 200 KB threshold.
   - Sharp can perform image scaling, centered cropping, and SVG composite overlays (for dark gradient vignettes or ground shadow reinforcement) in a single pipeline.

2. **Why 100% Drop-In Replacement is Feasible and Desirable**:
   - By retaining the exact 10 filenames (`swift-dzire.webp`, `hyundai-aura.webp`, `tata-tigor-ev.webp`, `tata-nexon-ev.webp`, `mg-zs-ev.webp`, `mahindra-marazzo.webp`, `ertiga-cng.webp`, `innova-crysta.webp`, `kia-carens-clavis-ev.webp`, `force-urbania.webp`), `src/content/india.json` requires zero edits.
   - Zero changes to SOT paths guarantees that all existing tests in `verify-fleet-modernization.mjs` and `verify-milestone1-adversarial.mjs` continue to resolve valid assets on disk.
   - All client routes (`/india/fleet`, `/india`, `/uae`, estimator forms, contact enquiry prefill) automatically consume the upgraded assets without any code refactoring.

3. **Why the Aspect Ratio `aspect-[16/10]` vs `aspect-[16/9]` Needs Clear Alignment**:
   - The user follow-up prompt specifically calls for "16:9 widescreen WebP files in public/images/fleet/".
   - If the container remains `aspect-[16/10]`, `object-cover` crops ~5% from each horizontal side. As long as generated vehicles have ≥8% horizontal padding, no car body will be clipped.
   - However, updating `IndiaFleetSection.tsx:411` from `aspect-[16/10]` to `aspect-[16/9]` eliminates all cropping, achieving a 1:1 match with the 1200×675 image geometry.
   - No test script in `scripts/` expects the string `aspect-[16/10]`.

4. **Why Brand Palette Gradient Harmonization Succeeds Seamlessly in the UI**:
   - The card overlay in `IndiaFleetSection.tsx:419` uses `from-brand-ink/80` (where `brand-ink` is `#15162F`).
   - The requested studio backdrop palette (`#070A12`, `#15162F`, `#31326F`) matches `brand-ink` and `brand-indigo`.
   - When the studio floor is rendered in deep obsidian (`#070A12`) with subtle brand indigo (`#31326F`) horizon accents, the overlay text gradient blends into the vehicle shadow with zero hard edges or unsightly banding.

---

## 3. Caveats

1. **AI Image Generation Repeatability**:
   - The `generate_image` tool produces high-resolution 16:9 artwork (`1376 × 768`), but variations in vehicle scale and camera angle can occur between prompts.
   - The optimization script must enforce a uniform ground baseline (`y ≈ 530px` out of 675px, ~78% from top) and consistent horizontal vehicle scale (75–82% width for cars, ~84% for Urbania) to guarantee a cohesive lineup.
2. **Urbania Distinction**:
   - Force Urbania has a distinct, modern aerodynamic front fascia with high-roof passenger van proportions. Prompts must explicitly instruct the generator to depict the modern Force Urbania executive van and avoid classic Force Trax / Tempo Traveler / commercial delivery chassis.
3. **EV Front Fascia Accuracy**:
   - Tata Tigor EV and Kia Carens Clavis EV must feature closed aerodynamic front grilles (no combustion air intake slots) and signature EV badging / accents to satisfy R1 and R3.
4. **Docs Requirement (R4)**:
   - When assets are deployed, `docs/fleet-image-sources.md` must be updated with the luxury studio generation details, prompt specifications, and brand harmony guidelines while retaining the mandatory model-reference disclosure: *"Images show vehicle models; actual assigned vehicles may vary."*

---

## 4. Conclusion & Asset Pipeline Plan

### 4.1 Asset Pipeline Architecture Plan

```
[generate_image tool (16:9 prompt, obsidian/indigo studio palette)]
                          ↓
[Raw Artifact (1376 × 768 JPEG in brain workspace)]
                          ↓
[scripts/build-fleet-studio-images.mjs (Sharp Optimization Pipeline)]
  - Scale & Crop to 1200 × 675 (16:9)
  - Align ground plane baseline to y=525-540px
  - Composite obsidian/indigo vignette & floor tone if needed
  - Encode to WebP (quality: 85, effort: 5)
  - Validate: size < 200 KB, valid decode
                          ↓
[public/images/fleet/<filename>.webp (10 drop-in replacements)]
                          ↓
[Documentation & Verification Gates]
  - Update docs/fleet-image-sources.md
  - Run node scripts/verify-fleet-modernization.mjs (104 tests)
  - Run npm run type-check & npm run lint
  - Capture desktop & mobile Playwright screenshots
```

### 4.2 Exact Filename Mapping (Drop-in Replacements)
1. `swift-dzire.webp` (Already studio asset, 47 KB — retain or harmonize)
2. `hyundai-aura.webp` (REPLACE casual cutout with executive studio sedan)
3. `tata-tigor-ev.webp` (REPLACE motor show photo with closed-grille EV studio visual)
4. `tata-nexon-ev.webp` (Already studio asset, 49 KB — retain or harmonize)
5. `mg-zs-ev.webp` (Facelifted EV model — retain or harmonize to matching backdrop)
6. `mahindra-marazzo.webp` (REPLACE street photo with studio MPV visual)
7. `ertiga-cng.webp` (Exhibition photo — retain or harmonize to matching backdrop)
8. `innova-crysta.webp` (REPLACE roadside snapshot with luxury executive SUV visual)
9. `kia-carens-clavis-ev.webp` (REPLACE ICE photo with futuristic closed-grille EV studio visual)
10. `force-urbania.webp` (REPLACE generic coach with authentic Force Urbania 12-seater passenger van)

### 4.3 Proposed UI Refinements
- **`src/content/india.json`**: **No path changes required**. Retains exact drop-in compatibility.
- **`src/components/fleet/IndiaFleetSection.tsx:411`**:
  - Optional refinement: Change `aspect-[16/10]` to `aspect-[16/9]`.
  - Rationale: Gives true 1:1 pixel mapping for 16:9 widescreen assets, eliminating the ~10% horizontal edge crop and producing uniform, sleek card heights.

---

## 5. Verification Method

To independently verify all findings:

1. **Verify Sharp and Environment Tooling**:
   ```powershell
   node -e "import('sharp').then(s => console.log('sharp version:', s.default.versions.sharp, 'webp:', s.default.versions.webp))"
   python --version
   python -c "import PIL; print('Pillow:', PIL.__version__)"
   ```
2. **Inspect Current Asset Formats and Dimensions**:
   ```powershell
   node -e "import('fs').then(fs => import('sharp').then(sharp => { const dir = 'public/images/fleet'; fs.readdirSync(dir).forEach(async f => { const p = dir + '/' + f; const st = fs.statSync(p); const m = await sharp.default(p).metadata(); console.log(f, Math.round(st.size/1024) + ' KB', m.width + 'x' + m.height, m.format); }); }));"
   ```
3. **Execute Full Test Suite & Static Quality Gates**:
   ```powershell
   node scripts/verify-fleet-modernization.mjs
   npm run type-check
   npm run lint
   ```
4. **Inspect UI Integration Files**:
   - `src/components/fleet/IndiaFleetSection.tsx` (lines 402–430)
   - `src/content/india.json` (lines 771–873)
   - `docs/fleet-image-sources.md`
