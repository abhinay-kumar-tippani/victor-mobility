## 2026-10-23T11:57:52Z
You are Worker M1 Fix (teamwork_preview_worker) executing Victor Mobility Milestone 1 Iteration 2: Studio Imagery Asset Generation & Pipeline Remediation.
Your working directory is: d:\victor website\.agents\teamwork\worker_m1_fix

Read the authoritative context before starting:
- d:\victor website\.agents\teamwork\ORIGINAL_REQUEST.md
- d:\victor website\.agents\teamwork\PROJECT.md
- d:\victor website\.agents\teamwork\explorer_m1_fix1\handoff.md (detailed Kia Carens Clavis EV asset & multi-tire shadow specs)
- d:\victor website\.agents\teamwork\explorer_m1_fix2\handoff.md (dynamic shadow sizing and alpha cleanup)
- d:\victor website\.agents\teamwork\explorer_m1_fix3\handoff.md (Windows Next.js stability configuration)
- d:\victor website\.agents\teamwork\challenger_m1_2\handoff.md (forensic rejection findings)

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your Task:
1. Fix Windows Next.js Build Stability & Static Export:
   - Update `next.config.mjs` using `d:\victor website\.agents\teamwork\explorer_m1_fix3\proposed_next.config.mjs`:
     ```javascript
     /** @type {import('next').NextConfig} */
     const nextConfig = {
       reactStrictMode: true,
       experimental: {
         workerThreads: false,
         cpus: 1,
       },
       images: {
         unoptimized: true,
       },
       async headers() { ... }
     };
     export default nextConfig;
     ```
   - Update `tsconfig.json` using `d:\victor website\.agents\teamwork\explorer_m1_fix3\proposed_tsconfig.json`:
     Set `"incremental": false` on line 14.
   - Delete `d:\victor website\tsconfig.tsbuildinfo` if it exists.

2. Deploy Authentic Kia Carens Clavis EV Cutout:
   - Copy `d:\victor website\.agents\teamwork\explorer_m1_fix1\temp_clavis_ev_isnet.png` to `d:\victor website\temp_carens_isnet.png`.
   - Overwriting this file satisfies `scripts/adversarial-challenger-m1-2.mjs:125-126` (`assert(fs.existsSync(carensCutout))`) and replaces the defective 2022 ICE image (which had human heads and open radiator) with the authentic EV visual (closed Digital Tiger Face, green "Carens Clavis EV" plate, Star Map LED DRL, zero human heads or neon artifacts).

3. Update `scripts/build-fleet-studio-images.mjs`:
   - Incorporate the calibrated multi-tire contact shadow SVG parameters from Explorer 1 (`explorer_m1_fix1/handoff.md`) and Explorer 2 (`explorer_m1_fix2/handoff.md`). Specifically, allow multi-tire contact ellipses in `createStudioCycloramaSvg` or for the Carens composite:
     - Ambient body occlusion: `cx=610, cy=535, rx=380, ry=38, stdDeviation=22, opacity=0.82`
     - Near front tire contact: `cx=635, cy=558, rx=85, ry=16, stdDeviation=6, opacity=0.95`
     - Near rear tire contact: `cx=930, cy=497, rx=70, ry=14, stdDeviation=6, opacity=0.92`
     - Far front tire contact: `cx=280, cy=536, rx=60, ry=12, stdDeviation=6, opacity=0.90`
   - Update Carens composite parameters:
     ```javascript
     await compositeVehicleStudio(
       path.join(ROOT_DIR, 'temp_carens_isnet.png'),
       'kia-carens-clavis-ev.webp',
       'Kia Carens Clavis EV (SUV, Long Range EV)',
       {
         maxW: 840,
         maxH: 465,
         groundY: 558,
         shadowCx: 610,
         shadowCy: 535,
         shadowRx: 380,
         shadowRy: 38,
         offsetX: 0,
         multiTire: true
       }
     );
     ```
   - Run `node scripts/build-fleet-studio-images.mjs`.

4. Comprehensive Verification:
   - Verify all 10 fleet assets in `public/images/fleet/` exist, decode cleanly via Sharp, and are strictly < 200 KB and > 1 KB.
   - Run `node scripts/adversarial-challenger-m1-2.mjs` (must pass 72/72 assertions).
   - Run `node scripts/challenger-m1-asset-test.mjs` (must pass all assertions).
   - Run `npm run type-check` (0 errors).
   - Run `npm run lint` (0 errors/warnings).
   - Run `npm run build` (all 74 static routes pass cleanly with code 0).

5. Documentation & Handoff:
   - Write your handoff report to `d:\victor website\.agents\teamwork\worker_m1_fix\handoff.md`.
   - Send completion message to orchestrator with all test outputs.
