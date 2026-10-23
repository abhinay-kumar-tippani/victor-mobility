# Milestone 1 Iteration 2 Explorer Report: Image Build & Studio Compositing Pipeline

**Agent**: Explorer M1 Fix 2 (`teamwork_preview_explorer`)  
**Working Directory**: `d:\victor website\.agents\teamwork\explorer_m1_fix2`  
**Milestone**: Milestone 1 Iteration 2 — Fleet Studio Imagery & Asset Pipeline  
**Target Project**: Victor Mobility (`d:\victor website`)  
**Parent Agent**: `42258ba4-2201-4e69-81b1-16796fa161ca` (Orchestrator)  
**Handoff Type**: Hard (Investigation & Analysis Complete)

---

## 1. Observation

### 1.1 Architecture of `scripts/build-fleet-studio-images.mjs`
Direct inspection of `scripts/build-fleet-studio-images.mjs` reveals a dual-mode asset pipeline:
1. **Direct AI Studio Processing (`processDirectStudioImage`, lines 106–136)**:
   - Used for Hyundai Aura (`hyundai_aura_studio_1792739374975.jpg`), Tata Tigor EV (`tata_tigor_ev_studio_1792739404208.jpg`), and Mahindra Marazzo (`mahindra_marazzo_studio_1792739460812.jpg`).
   - Sourced from direct AI studio generations already staged on obsidian floor (`#070A12`) and indigo cyclorama (`#15162F` to `#31326F`).
   - Crops/resizes directly to `1200 × 675` with `fit: 'cover', position: 'center'`.
   - WebP compression starts at `quality: 85, effort: 5` with an adaptive quality reduction loop (`quality -= 5` down to 60) until buffer size is `< 200 * 1024` bytes.
2. **Calibrated Studio Compositing (`compositeVehicleStudio`, lines 140–192)**:
   - Used for Force Urbania (`temp_urbania_isnet.png`), Toyota Innova Crysta (`temp_innova1_isnet.png`), and Kia Carens Clavis EV (`temp_carens_isnet.png`).
   - Generates an SVG brand cyclorama via `createStudioCycloramaSvg(1200, 675, shadowCx, shadowCy, shadowRx, shadowRy)` (lines 42–100).
   - Rasterizes SVG into PNG buffer:
     ```javascript
     const bgBuffer = await sharp(Buffer.from(svgContent)).png().toBuffer();
     ```
   - Trims and scales transparent vehicle cutout:
     ```javascript
     const vehicleObj = await sharp(cutoutPath)
       .trim()
       .resize(maxW, maxH, { fit: 'inside' })
       .toBuffer({ resolveWithObject: true });
     ```
   - Calculates spatial positioning:
     ```javascript
     const vW = vehicleObj.info.width;
     const vH = vehicleObj.info.height;
     const left = Math.round((1200 - vW) / 2) + offsetX;
     const top = groundY - vH;
     ```
   - Composites vehicle cutout directly over `bgBuffer` via Sharp:
     ```javascript
     finalBuffer = await sharp(bgBuffer)
       .composite([
         {
           input: vehicleObj.data,
           top: Math.max(0, top),
           left: Math.max(0, left)
         }
       ])
       .webp({ quality, effort: 5 })
       .toBuffer();
     ```

### 1.2 SVG Cyclorama & Dual Ground Shadow Specifications
`createStudioCycloramaSvg` (lines 42–100) defines the following vector elements:
- **Upper Cyclorama Wall (y = 0 to 385)**:
  - Base gradient `cycloramaGrad`: 4-stop linear gradient from `#1E2048` (0%) -> `#282B5C` (35%) -> `#181938` (70%) -> `#0E0F22` (100% at y=385).
  - Overhead softbox spotlight `softboxAura`: radial gradient centered at `cx="50%", cy="20%", r="55%"` from `#31326F` (opacity 0.85) -> `#2D5090` (opacity 0.35) -> `#15162F` (opacity 0).
- **Studio Floor Plane (y = 380 to 675)**:
  - Base floor gradient `floorGrad`: linear gradient from `#0E0F22` (0%) -> `#0A0C18` (10%) -> `#070A12` (Victor Obsidian, 45%) -> `#04050A` (100% at y=675).
  - Specular sheen gradient `floorSheen`: horizontal linear gradient (`#070A12` -> `#15162F` 0.3 opacity -> `#2D5090` 0.2 opacity -> `#15162F` 0.3 opacity -> `#070A12`).
  - 5px overlap between wall (y=0–385) and floor (y=380–675) ensures a smooth horizon transition.
- **Dual Ground Shadows**:
  - Shadow 1 (ambient ground occlusion):
    `<ellipse cx="${shadowCx}" cy="${shadowCy}" rx="${shadowRx}" ry="${shadowRy}" fill="#000000" opacity="0.88" filter="url(#softBlur)" />`
    where `softBlur` is `feGaussianBlur stdDeviation="24"`.
  - Shadow 2 (crisp tire contact patch):
    `<ellipse cx="${shadowCx}" cy="${shadowCy + 5}" rx="${shadowRx * 0.8}" ry="${shadowRy * 0.5}" fill="#000000" opacity="0.96" filter="url(#crispBlur)" />`
    where `crispBlur` is `feGaussianBlur stdDeviation="8"`.
  - Shadows are baked into `bgBuffer` *beneath* the vehicle layer.

### 1.3 Forensic Inspection of Kia Carens Placement & Geometry Discrepancy
Lines 260–274 in `scripts/build-fleet-studio-images.mjs` specify the current Carens composite options:
```javascript
// Kia Carens Clavis EV (next-gen long range electric SUV)
await compositeVehicleStudio(
  path.join(ROOT_DIR, 'temp_carens_isnet.png'),
  'kia-carens-clavis-ev.webp',
  'Kia Carens Clavis EV (SUV, Long Range EV)',
  {
    maxW: 900,
    maxH: 420,
    groundY: 565,
    shadowCx: 600,
    shadowCy: 565,
    shadowRx: 440,
    shadowRy: 34,
    offsetX: 0
  }
);
```

Empirical measurement of `temp_carens_isnet.png`:
- Original dimensions: `1024 × 768` (4 channels, RGBA).
- Trimmed dimensions via Sharp `.trim()`: `878 × 696` (aspect ratio 1.26:1).
- Scaled dimensions under `{ maxW: 900, maxH: 420, fit: 'inside' }`: **`530 × 420`**.
- Placement coordinates: `left = 335, top = 145, bottom = 565`.
- **Severe Discrepancy**:
  - The vehicle rendered at only **530 px wide** (44.2% of the 1200px frame).
  - But `shadowRx: 440` created a shadow with total width `2 * 440 = 880 px`!
  - The shadow extended `(880 - 530) / 2 = 175 px` beyond the vehicle on both sides!
  - A 530px car was hovering over an 880px wide shadow ellipse, causing an unnatural, oversized contact shadow defect.

### 1.4 Alpha Channel Analysis of `temp_carens_isnet.png`
Direct pixel probing of `temp_carens_isnet.png` via Sharp raw buffer revealed:
- Total pixels: 786,432 (1024 × 768).
- Fully transparent (`alpha === 0`): 345,338 pixels.
- Fully opaque (`alpha === 255`): **only 20 pixels**.
- Semi-transparent (`0 < alpha < 255`): **441,074 pixels**.
  - Alpha in range `[1, 15]`: **8,583 noise pixels** (low-opacity outer halo).
  - Alpha in range `[16, 229]`: 27,924 pixels (anti-aliased edges and semi-transparent glass).
  - Alpha in range `[230, 255]`: 404,567 pixels.
- In `compositeVehicleStudio()`, there is currently **zero alpha thresholding or de-fringing**. If an uncleaned cutout with outdoor or stage background remnants is composited onto `#070A12` and `#181938`, the low-opacity halo pixels produce a visible milky fringe around the vehicle perimeter.

### 1.5 Sharp WebP Encoding Settings & Performance Budget Compliance
Inspection of disk files in `public/images/fleet/` produced by `scripts/build-fleet-studio-images.mjs`:
| Asset Filename | Dimensions | Format | Channels | WebP Quality / Effort | Actual File Size | Budget (< 200 KB) |
|---|---|---|---|---|---|---|
| `swift-dzire.webp` | 1200 × 675 | WebP | 3 | quality 85 | 47.1 KB (48,184 B) | PASS (23.5% of cap) |
| `hyundai-aura.webp` | 1200 × 675 | WebP | 3 | quality 85, effort 5 | 53.0 KB (54,232 B) | PASS (26.5% of cap) |
| `tata-tigor-ev.webp` | 1200 × 675 | WebP | 3 | quality 85, effort 5 | 46.4 KB (47,540 B) | PASS (23.2% of cap) |
| `tata-nexon-ev.webp` | 1200 × 675 | WebP | 3 | quality 85 | 48.9 KB (50,054 B) | PASS (24.4% of cap) |
| `mg-zs-ev.webp` | 1200 × 675 | WebP | 3 | quality 85 | 121.6 KB (124,476 B) | PASS (60.8% of cap) |
| `mahindra-marazzo.webp` | 1200 × 675 | WebP | 3 | quality 85, effort 5 | 57.1 KB (58,466 B) | PASS (28.5% of cap) |
| `ertiga-cng.webp` | 1200 × 675 | WebP | 3 | quality 85 | 92.4 KB (94,594 B) | PASS (46.2% of cap) |
| `innova-crysta.webp` | 1200 × 675 | WebP | 3 | quality 85, effort 5 | 40.0 KB (40,922 B) | PASS (20.0% of cap) |
| `kia-carens-clavis-ev.webp` | 1200 × 675 | WebP | 3 | quality 85, effort 5 | 23.4 KB (23,954 B) | PASS (11.7% of cap) |
| `force-urbania.webp` | 1200 × 675 | WebP | 3 | quality 85, effort 5 | 38.0 KB (38,908 B) | PASS (19.0% of cap) |

All 10 fleet assets are strictly `< 200 KB` (`204,800 bytes`) and `> 1 KB` (`1,024 bytes`). WebP encoding with `quality: 85, effort: 5` achieves an optimal balance, keeping files well below 130 KB while preserving crisp chrome highlights, clean text badges, and continuous gradient tones.

---

## 2. Logic Chain

1. **Premise 1 (Compositing Mechanics)**: `compositeVehicleStudio()` rasterizes an SVG brand cyclorama into a PNG buffer, trims and scales a vehicle cutout, and places it with its bottom edge at `groundY = 565` directly over the dual Gaussian ground shadows (`stdDeviation="24"` and `"8"`). Because the shadows are pre-rendered into the background, the vehicle is seamlessly grounded as long as the cutout bounding box bottom matches the actual tire contact patches.
2. **Premise 2 (Root Cause of Carens Placement Defect)**: In the previous iteration, `temp_carens_isnet.png` was derived from a tall, nearly head-on front perspective (`2022_Kia_Carens_1.4_(India)_front_view_01.jpg`) with human heads on the roof. This resulted in an aspect ratio of 1.26:1 (`878 × 696`). When constrained by `maxH: 420`, the vehicle scaled down to only 530 px width (44.2% frame width). Hardcoding `shadowRx: 440` (880 px wide shadow) created an 880 px shadow under a 530 px car, protruding 175 px on both sides.
3. **Premise 3 (Geometry for Authentic Replacement)**: Under `PROJECT.md:39`, fleet models require "Baseline Alignment: Ground plane baseline at y=525-540px, vehicle width ~75-84% of frame." For a 1200px wide canvas, a proper three-quarter exterior vehicle profile (aspect ratio ~2.2:1 to 2.5:1) should have:
   - Width: `920` to `980 px` (~77% to 81% of frame).
   - Height: `380` to `420 px`.
   - Contact Shadow Radius (`shadowRx`): Must be dynamically derived from the scaled vehicle width: `shadowRx = Math.round(vW * 0.46)` to `Math.round(vW * 0.48)` (e.g. for a 940px wide car, `shadowRx ≈ 440px`).
   - Ground baseline: `groundY: 565` leaves 110 px of ground space below the tires, perfectly accommodating the contact shadow (`shadowCy = 565, shadowRy = 34`, extending downward to y ≈ 600) with ~75px of clean obsidian floor at the bottom.
4. **Premise 4 (Alpha Mask & Fringe Requirements)**:
   - If an image cutout is used: Neural segmentation produces low-alpha haze (8,583 pixels with alpha < 16 observed in `temp_carens_isnet.png`). An alpha clamp (`alpha < 16 -> alpha = 0`) eliminates outer noise. Color modulation (`brightness: 0.98, saturation: 1.05`) harmonizes vehicle tones with the cool indigo studio environment.
   - If a direct AI studio asset is generated (identical to Aura, Tigor EV, and Marazzo): No cutout or alpha blending is required. `processDirectStudioImage()` crops/resizes directly to 1200 × 675, completely eliminating cutout fringe, human silhouettes, and stage reflections.
5. **Premise 5 (Encoding & Performance Budget)**:
   - WebP encoding at `{ quality: 85, effort: 5 }` produces files between 23.4 KB and 57.1 KB for studio composites and direct studio images.
   - The while-loop fallback in `build-fleet-studio-images.mjs` guarantees compliance with `< 200 KB` (`stat.size < 204,800 bytes`).
   - The bitstream decompression probe in `challenger-m1-asset-test.mjs` confirms that `1200 * 675 * 3` raw buffers decode cleanly with channel variances > 20 and dynamic ranges > 50.

---

## 3. Caveats

1. **Asset Source Path Fork**: Explorer M1 Fix 1 is determining whether the replacement asset will be sourced from a direct AI studio generation or a licensed press cutout. Both pipelines are fully supported in `scripts/build-fleet-studio-images.mjs`:
   - If direct studio generation: Use `processDirectStudioImage()`.
   - If cutout: Use `compositeVehicleStudio()` with dynamic shadow sizing and alpha cleanup.
2. **UI Aspect Ratio**: The gallery card container in `src/components/fleet/IndiaFleetSection.tsx:411` was previously updated from `aspect-[16/10]` to `aspect-[16/9]`. All 10 assets map 1:1 without horizontal or vertical crop.

---

## 4. Conclusion

### Concrete Pipeline Specifications for Upcoming Worker

#### A. If Using Direct AI Studio Generation (Recommended — Parity with Aura, Tigor EV, Marazzo)
Direct studio generation is the cleanest, highest-fidelity approach because it renders the vehicle natively on the obsidian floor with authentic studio softbox reflections, zero cutout boundaries, and zero fringe:
```javascript
await processDirectStudioImage(
  path.join(BRAIN_DIR, 'kia_carens_clavis_ev_studio.jpg'),
  'kia-carens-clavis-ev.webp',
  'Kia Carens Clavis EV (SUV, Long Range EV)'
);
```

#### B. If Using Cutout Compositing Pipeline (`compositeVehicleStudio`)
If a transparent PNG cutout is used, the worker must update `compositeVehicleStudio()` and its call parameters in `scripts/build-fleet-studio-images.mjs`:
1. **Dynamic Shadow Sizing**:
   Update `compositeVehicleStudio()` to derive `shadowRx` dynamically from actual trimmed width `vW`:
   ```javascript
   const effectiveShadowRx = shadowRx || Math.round(vW * 0.47);
   ```
2. **Alpha Mask Cleaning & Noise Elimination**:
   Before compositing, clamp low-alpha noise pixels to 0 to prevent glowing edge fringe:
   ```javascript
   const { data, info } = await sharp(cutoutPath).raw().toBuffer({ resolveWithObject: true });
   for (let i = 3; i < data.length; i += 4) {
     if (data[i] < 16) data[i] = 0; // eliminate outer segmentation haze
   }
   const cleanedCutout = await sharp(data, {
     raw: { width: info.width, height: info.height, channels: 4 }
   })
     .modulate({ brightness: 0.98, saturation: 1.05 })
     .png()
     .toBuffer();
   ```
3. **Calibrated Placement Parameters**:
   ```javascript
   {
     maxW: 960,       // fills 80% of canvas width (1200px)
     maxH: 420,       // standard SUV height
     groundY: 565,    // leaves 110px floor margin for dual Gaussian shadows
     shadowCx: 600,
     shadowCy: 565,
     shadowRx: 450,   // ~47% of 960px width
     shadowRy: 34,
     offsetX: 0
   }
   ```
4. **Encoding Settings**:
   Retain `{ quality: 85, effort: 5 }` with the adaptive fallback loop.

---

## 5. Verification Method

To independently verify this pipeline and reproduce all measurements:

1. **Inspect Asset Dimensions, Format, and File Sizes**:
   ```powershell
   node -e "
   import('sharp').then(async ({ default: sharp }) => {
     const meta = await sharp('public/images/fleet/kia-carens-clavis-ev.webp').metadata();
     const fs = await import('fs');
     const stat = fs.statSync('public/images/fleet/kia-carens-clavis-ev.webp');
     console.log('Carens:', meta.width + 'x' + meta.height, meta.format, (stat.size / 1024).toFixed(1) + ' KB');
   });
   "
   ```
   *Expected*: `Carens: 1200x675 webp 23.4 KB`.

2. **Execute Full Pipeline Execution Script**:
   ```powershell
   node scripts/build-fleet-studio-images.mjs
   ```
   *Expected*: Exit code 0, `RESULT: ALL 10 FLEET ASSETS VERIFIED (1200x675 WebP, < 200 KB)`.

3. **Execute Adversarial Quality Suite**:
   ```powershell
   node scripts/adversarial-challenger-m1-2.mjs
   ```
   *Expected*: 72/72 assertions pass.

4. **Verify Quality Gates**:
   ```powershell
   npm run type-check
   npm run lint
   ```
   *Expected*: Both exit code 0.

5. **Invalidation Conditions**:
   - Any cutout placement resulting in vehicle width < 70% of frame width (under 840 px).
   - Any hardcoded shadow radius exceeding vehicle width (`2 * shadowRx > vW`).
   - Cutout edge artifacts or uncleaned alpha haze on the dark cyclorama.
   - File size exceeding 204,800 bytes (200 KB) or dimensions differing from 1200 × 675.
