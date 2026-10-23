## 2026-10-23T09:54:22Z
You are Worker M1 Composite (teamwork_preview_worker) replacing the previous worker for Victor Mobility Milestone 1: Studio Imagery Asset Generation & Pipeline.
Your working directory is: d:\victor website\.agents\teamwork\worker_m1_composite

Read the authoritative context before starting:
- d:\victor website\.agents\teamwork\ORIGINAL_REQUEST.md (specifically the latest request under `## Follow-up — 2026-10-23T06:36:50Z`)
- d:\victor website\.agents\teamwork\PROJECT.md
- src/content/brand.json (#070A12, #15162F, #31326F)
- src/content/india.json (authoritative single source of truth)

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Context & Existing Assets:
The previous worker generated and prepared high-grade studio assets before encountering a network API timeout:
1. Three high-resolution commercial automotive studio assets generated on dark obsidian floor (#070A12) and brand indigo cyclorama (#15162F -> #31326F):
   - Hyundai Aura: `C:\Users\tippa\.gemini\antigravity\brain\68a84c08-813a-4af1-889e-ef0c9a460c5a\hyundai_aura_studio_1792739374975.jpg`
   - Tata Tigor EV (closed aero grille, teal humanity line, EV badge): `C:\Users\tippa\.gemini\antigravity\brain\68a84c08-813a-4af1-889e-ef0c9a460c5a\tata_tigor_ev_studio_1792739404208.jpg`
   - Mahindra Marazzo (shark-tooth grille, executive cabin): `C:\Users\tippa\.gemini\antigravity\brain\68a84c08-813a-4af1-889e-ef0c9a460c5a\mahindra_marazzo_studio_1792739460812.jpg`
2. Three vehicle cutouts ready for studio compositing:
   - Force Urbania 12-seater (authentic modern European monocoque luxury passenger van, NOT commercial bus or tempo chassis): `d:\victor website\temp_urbania_isnet.png`
   - Toyota Innova Crysta (executive SUV/MPV): `d:\victor website\temp_innova1_isnet.png`
   - Kia Carens Clavis EV: use `d:\victor website\temp_carens_lux.jpg` or `d:\victor website\temp_carens_2024.jpg` (segment with rembg or Sharp)
3. Working calibrated studio compositing script:
   - `d:\victor website\scripts\test-composite-urbania.mjs` (demonstrates SVG cyclorama backdrop with Victor brand palette, dual Gaussian contact shadow filters, and baseline alignment at y ≈ 560px).

Your Task:
1. Write and execute `scripts/build-fleet-studio-images.mjs` using `sharp`:
   - Process the 3 generated JPEGs (`hyundai_aura`, `tata_tigor_ev`, `mahindra_marazzo`): resize/crop to 1200 × 675 (16:9), encode to WebP (quality 85, effort 5), ensure file size < 200 KB, save to:
     - `public/images/fleet/hyundai-aura.webp`
     - `public/images/fleet/tata-tigor-ev.webp`
     - `public/images/fleet/mahindra-marazzo.webp`
   - Composite the remaining 3 vehicles (`force-urbania`, `innova-crysta`, `kia-carens-clavis-ev`) onto the matching SVG brand studio cyclorama (#070A12 floor, #15162F to #31326F wall, dual Gaussian blurred contact shadows, baseline at y ≈ 560px, uniform scaling), encode to 1200 × 675 WebP (quality 85, effort 5), ensure file size < 200 KB, save to:
     - `public/images/fleet/force-urbania.webp`
     - `public/images/fleet/innova-crysta.webp`
     - `public/images/fleet/kia-carens-clavis-ev.webp`
2. Update UI Aspect Ratio:
   - In `src/components/fleet/IndiaFleetSection.tsx:411`, change `aspect-[16/10]` to `aspect-[16/9]` for 1:1 pixel mapping with 0 horizontal side crop.
3. Verification:
   - Verify all 10 fleet images in `public/images/fleet/` exist on disk, decode via Sharp, and are strictly < 200 KB (and > 1 KB).
   - Run `npm run type-check` (0 errors).
   - Run `npm run lint` (0 errors/warnings).
   - Run `npm run build` (74/74 static routes succeed).
4. Clean up temporary `temp_*` files in project root.
5. Write your handoff report to `d:\victor website\.agents\teamwork\worker_m1_composite\handoff.md` and message the orchestrator.
