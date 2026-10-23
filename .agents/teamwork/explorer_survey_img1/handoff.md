# Victor Mobility Fleet Studio Imagery Survey & Prompt Specifications
**Explorer 1 Investigation & Synthesis Report**
**Working Directory:** `d:\victor website\.agents\teamwork\explorer_survey_img1`
**Date:** 2026-10-23
**Reference:** Follow-up Directive `2026-10-23T06:36:50Z` in `ORIGINAL_REQUEST.md`

---

## 1. Observation

### 1.1 Direct Inspection of Current Assets in `public/images/fleet/`

A forensic visual and technical inspection of the existing fleet images was conducted via `view_file` and filesystem metadata tools:

| # | Vehicle | Current Asset Path | File Size | Observed Source / Context | Specific Visual & Technical Flaws Observed |
|---|---|---|---|---|---|
| 1 | **Hyundai Aura** | `public/images/fleet/hyundai-aura.webp` | 30.4 KB | Wikimedia Commons (`2020_Hyundai_Aura_Front.png` by Auto Zuto) | **Severe quality degradation & improper environment**: Blurry 30 KB asset with heavy JPEG/WebP compression artifacts and pixel noise. Photographed in an unpaved outdoor dirt/gravel clearing with dry weeds in the background under harsh direct noon sunlight. Distorted low front perspective, sun glare across windscreen, complete absence of luxury executive presence. |
| 2 | **Tata Tigor EV** | `public/images/fleet/tata-tigor-ev.webp` | 94.6 KB | Geneva Motor Show 2017 (`2017-03-07_Geneva_Motor_Show_1068.JPG` by Norbert Aepli) | **Cluttered trade show & wrong specification**: Crowded exhibition floor with spectators, camera tripods, and trade booth signage ("VR BAR", "INFINITI") directly behind the vehicle. Clashing candy-red concept paint violating Victor Mobility's brand palette. Crucially, depicts a 2017 pre-production show car with an **open honeycomb grille** rather than the production Tata Tigor EV closed aerodynamic front fascia with signature electric teal humanity line and EV badging. |
| 3 | **Mahindra Marazzo** | `public/images/fleet/mahindra-marazzo.webp` | 95.8 KB | Dealership Showroom (`Mahindra_Marazzo_MPV_SEP_18_(1).jpg` by SnapMeUp) | **Cluttered retail dealership interior**: Vehicle parked on a tiled showroom floor. Interior passenger seats are still draped in wrinkled clear protective plastic transit wrap. Two dealership visitors/staff in casual clothing (one in yellow shirt talking on mobile phone, one in purple shirt) visible in background. Wall advertising posters and harsh fluorescent ceiling lighting reflecting glare across the hood. Tightly cropped, awkward perspective. |
| 4 | **Innova Crysta** | `public/images/fleet/innova-crysta.webp` | 184.6 KB | Rural Road Snapshot (`Innova_Crysta_car_near_Janampeta.jpg` by iMahesh) | **Inappropriate road snapshot & tiny subject**: Vehicle is photographed at an extreme distance on an unpaved red mud/dirt road riddled with deep potholes. The car occupies less than 15% of the total frame area. Distracting background elements include overgrown jungle foliage, an oversized commercial billboard in Telugu script ("క్యాష్ బ్యాక్"), a roadside scooter rider carrying cargo, and a clearly legible private/state vehicle registration plate ("TS12EE3777"). |
| 5 | **Kia Carens Clavis EV** | `public/images/fleet/kia-carens-clavis-ev.webp` | 48.5 KB | Media Launch Video Still (`2022_Kia_Carens_1.4_(India)_front_view_01.jpg` by DriveSpark) | **Low-res phone capture & ICE specification**: Highly compressed 48 KB video capture with ringing artifacts. Awkward high-angle downward smartphone tilt. Spectator in a navy blazer and denim jeans standing immediately adjacent to the front right wing holding a phone. Depicts standard 1.4 ICE Carens with open radiator intake rather than the dedicated Clavis EV closed digital tiger face, aerodynamic low-drag wheels, and EV badging. |
| 6 | **Force Urbania** | `public/images/fleet/force-urbania.webp` | 143.2 KB | Fallback copy from `public/images/india/employee-shuttle.png` | **Completely incorrect vehicle**: Script `scripts/build-fleet-images.mjs` (lines 130-137) substituted `employee-shuttle.png` as a fallback. The image depicts a full-size 30-40+ passenger commercial transit bus with dual rear axles, 6 large window bays, and transit bus proportions outside an office complex. It does NOT depict the approved 12-seater Force Urbania executive monocoque luxury passenger van. |

### 1.2 Inspection of Existing High-Quality Benchmarks on Disk
In contrast to the 6 flawed images above, two fleet assets currently exhibit acceptable commercial studio properties:
- `public/images/fleet/swift-dzire.webp` (48.2 KB): Clean three-quarter front perspective of a white Maruti Suzuki Dzire sedan on a neutral studio cyclorama with contact shadow and balanced studio illumination.
- `public/images/fleet/tata-nexon-ev.webp` (50.1 KB): Clean three-quarter front perspective of a teal-and-white Tata Nexon EV on a studio cyclorama with soft floor reflection, realistic contact shadow, and accurate closed EV front styling.

### 1.3 Brand Palette & Design Tokens (`src/content/brand.json` & `docs/design.md`)
- **Obsidian**: `#070A12` (dominant deep floor shadow, ground contact plane, dark edge vignette)
- **Ink**: `#15162F` (mid-tone studio backdrop shadow, subtle cyclorama wall shading)
- **Indigo**: `#31326F` (primary brand color, upper backdrop gradient aura, rim light reflection)
- **Blue**: `#2D5090` (secondary specular highlights, subtle metallic reflex)
- **Soft Neutral / Warm White**: `#E5E4EA` / `#F6F5F2` (softbox diffuser highlights on vehicle shoulders)

### 1.4 Codebase Rendering Constraints
- `src/components/fleet/IndiaFleetSection.tsx`: Vehicle cards render images in a container styled with `aspect-[16/10] w-full overflow-hidden` and Next.js `<Image fill className="object-cover" />`.
- Standard target resolution: `1200 × 675` pixels (16:9 widescreen ratio), WebP format, quality 85, file size target `< 200 KB`.
- Mandatory legal disclosure maintained in `docs/fleet-image-sources.md` and on-card overlays:
  > *"Images show vehicle models; actual assigned vehicles may vary."*

---

## 2. Logic Chain

1. **Premise 1 (Brand Inconsistency & Quality Deficit)**: Victor Mobility is an executive corporate transport provider operating across 10 major Indian commercial hubs (Hyderabad, Bengaluru, Pune, Mumbai, Delhi, etc.). As observed in Section 1.1, 5 of the 6 target vehicle cards display casual outdoor snapshots (dirt roads, potholes, roadside ads, trade show crowds, dealership plastic seat wrap), while the 6th depicts a 35-seat transit bus instead of a 12-seater executive van. This degrades user trust and clashes with the editorial aesthetic defined in `docs/design.md`.
2. **Premise 2 (Technical & Model Inaccuracies)**:
   - The Tata Tigor EV and Kia Carens Clavis EV are designated as zero-emission corporate mobility options (`fuelType: "Electric Vehicle"` and `"Long Range Electric Vehicle"`). Displaying ICE models with open radiator grilles and concept-car trade show clutter directly contradicts the technical EV specifications defined in `docs/fleet-image-sources.md` lines 32–39.
   - The Urbania is cataloged as a `"12 Seater"` passenger van in `src/content/india.json` (line 865). Presenting a 40-seat coach bus causes category dissonance for corporate travel planners.
3. **Premise 3 (Harmonization with Brand Studio Architecture)**: To achieve visual continuity across `/india/fleet` and homepage previews:
   - All replacement imagery must share a single camera geometry: clean 3/4 front perspective (25°–30° angle), medium telephoto focal length (approx. 80-85mm equivalent), eye-level headlight horizon, and uniform vehicle scale filling ~75-80% of frame width.
   - Lighting must follow high-end commercial automotive studio standards: overhead softbox diffuser casting a longitudinal highlight along the roof and hood, side strip softboxes sculpting character lines, and a smooth ambient occlusion shadow grounding tires to the floor.
   - The studio backdrop must integrate Victor Mobility's brand colors: an infinite cyclorama gradient transitioning from obsidian `#070A12` at floor contact, through ink `#15162F`, to deep indigo `#31326F` in the ambient upper atmosphere.
4. **Premise 4 (Implementation Readiness via Production Prompts)**: Formulating complete, deterministic image generation prompts for each of the 6 models ensures that downstream image generation tools (e.g. `generate_image`) produce assets that are model-accurate, free of artifacts, and immediately ready for WebP optimization under 200 KB.

---

## 3. Caveats

1. **Read-Only Investigation Boundary**: This survey is an investigative report. No source code modifications or image replacements in `public/images/fleet/` have been performed by Explorer 1.
2. **Illustrative Reference Disclosure**: Under `AGENTS.md` and commercial consumer regulations, all generated visuals remain model references to communicate vehicle class, styling, and fuel configuration. They are not represented as physical operational photographs of Victor Mobility's actual fleet vehicles.
3. **Existing Unchanged Fleet Assets**: Four vehicles in the 10-model fleet (`swift-dzire`, `tata-nexon-ev`, `mg-zs-ev`, `ertiga-cng`) are not part of the active 6-vehicle upgrade scope. However, `swift-dzire` and `tata-nexon-ev` provide the aesthetic baseline that the 6 replacement assets will match and elevate.

---

## 4. Conclusion & Production-Grade Prompt Specifications

Below are the comprehensive, production-grade image generation prompt specifications formulated for each of the 6 target vehicles.

### Common Studio Environment & Photography Parameters (Applied to all 6 Prompts)
- **Aspect Ratio**: `16:9` widescreen (`1200x675` target render).
- **Camera Perspective**: Front three-quarter angle (3/4 front view, vehicle angled approximately 28 degrees, facing forward-right).
- **Lens & Framing**: 85mm automotive portrait prime lens, f/8 aperture for razor-sharp edge-to-edge depth of field, camera positioned at headlight height. Vehicle occupies ~78% of the frame with balanced negative margins.
- **Lighting Rig**: Professional commercial automotive studio setup. Large overhead ceiling softbox producing clean longitudinal reflection streaks down the hood and roof. Dual vertical strip softboxes flanking the vehicle at ground level to sculpt the shoulder crease, rocker panels, and wheel arches. Zero harsh glare or hot spots.
- **Backdrop & Floor**: Seamless dark luxury automotive cyclorama studio. Floor is polished dark obsidian (`#070A12`) with subtle ground reflection and crisp contact shadow beneath all four tires. Backdrop smoothly transitions upward from dark ink (`#15162F`) to a deep brand indigo (`#31326F`) gradient aura.
- **Exclusions (Negative Prompt Principles)**: No people, no pedestrians, no dealership showrooms, no plastic seat covers, no street clutter, no trees, no outdoor dirt or gravel, no potholes, no visible license plate numbers (clean blank plate or model plate only), no wide-angle barrel distortion, no motion blur, no compression artifacts.

---

### Detailed Vehicle Prompt Specifications

#### Model 1: Hyundai Aura (Sedan, Petrol & CNG)
- **Vehicle Classification**: Compact Executive Sedan (Sub-4m sedan).
- **Key Visual Anchors**:
  - Inverted trapezoidal parametric gloss-black radiator grille with Hyundai chrome badge centered above the grille on the sculpted nose.
  - Distinctive inverted L-shaped / boomerang LED daytime running lights (DRLs) embedded vertically in the outer bumper corners.
  - Swept-back projector headlamps with chrome brows.
  - Blacked-out C-pillar producing the signature floating-roof aesthetic.
  - 15-inch dual-tone diamond-cut alloy wheels with chrome lug details.
  - Elegant executive Metallic Silver / Arctic White exterior finish.
- **Production Prompt Specification**:
  ```text
  Commercial automotive studio photography of a pristine 2024 Hyundai Aura executive sedan, clean three-quarter front hero angle facing right. Painted in gleaming liquid metallic silver with flawless clearcoat reflections. Featuring the signature gloss-black inverted trapezoidal radiator grille, chrome Hyundai emblem on the nose, crisp inverted boomerang LED daytime running lights integrated into the front bumper corners, and swept-back projector headlights. Distinctive blacked-out C-pillar creating a floating roof effect, chrome door handles, and 15-inch diamond-cut multi-spoke alloy wheels. Positioned in a high-end automotive studio on a polished dark obsidian floor (#070A12) with realistic contact ground shadows and soft tire reflections. Seamless studio cyclorama backdrop featuring a subtle dark ink (#15162F) to deep brand indigo (#31326F) gradient. Professional overhead diffused softbox lighting casting crisp longitudinal reflection lines along the sculpted hood and roofline. Photographed with an 85mm prime lens at eye level, ultra-sharp focus, cinematic commercial automotive catalog grade, 16:9 aspect ratio.
  ```

---

#### Model 2: Tata Tigor EV (Sedan, Electric Vehicle)
- **Vehicle Classification**: Dedicated Electric Compact Sedan.
- **Key Visual Anchors**:
  - Fully closed aerodynamic front grille panel in piano black, replacing open ICE radiator slats.
  - Signature horizontal Humanity Line accent strip in Electric Teal Blue spanning the width of the front grille under the headlamps.
  - Prominent chrome-and-teal "EV" badge on the closed front grille and front quarter panel.
  - Tri-arrow pattern accents subtly integrated into the lower bumper intake with teal blue highlights.
  - Sharp projector headlamps with integrated LED daytime running lights.
  - Dual-tone aerodynamic alloy wheels with teal accent center caps.
  - Finished in Pearlescent White or Signature Tata EV Teal with contrasting gloss-black roof.
- **Production Prompt Specification**:
  ```text
  Commercial automotive studio photography of a modern Tata Tigor EV electric sedan, clean three-quarter front hero angle facing right. Pristine pearlescent white body with contrast gloss-black roof and mirrors. Dedicated electric vehicle styling featuring a completely closed aerodynamic gloss-black front grille panel with no open radiator slats, highlighted by the signature Tata EV horizontal humanity line in vivid electric teal blue beneath the sharp projector headlamps. Prominent chrome and teal EV badging on the closed front grille. Sculpted lower bumper with tri-arrow aero accents and subtle teal highlights. Aerodynamic dual-tone hyper-style alloy wheels with teal center accents. Set in a luxury automotive photography studio with a polished obsidian (#070A12) floor, crisp contact tire shadows, and subtle ground reflections. Seamless infinite cyclorama background with a refined dark ink (#15162F) to deep indigo (#31326F) ambient gradient. Large overhead diffused studio softbox illuminating crisp linear highlights across the sculpted hood. 85mm automotive portrait lens, f/8, ultra-high resolution commercial automotive catalog grade, 16:9 aspect ratio.
  ```

---

#### Model 3: Mahindra Marazzo (SUV, Diesel)
- **Vehicle Classification**: Premium MPV / Executive SUV (7-seater).
- **Key Visual Anchors**:
  - Pininfarina shark-inspired design language.
  - Distinctive vertical chrome shark-tooth front grille inserts set against a black mesh background.
  - Twin-chamber projector headlamps with eyebrow LED daytime running lights resembling a shark's eyes.
  - Fluid aerodynamic silhouette with a forward-raked roofline and prominent sculpted character crease along the body flanks.
  - 17-inch machined dual-tone alloy wheels.
  - Clean executive cabin interior with dark leatherette seats visible through crystal-clear front glass (zero plastic wraps).
  - Executive Oceanic Deep Navy Blue or Shimmering Silver finish.
- **Production Prompt Specification**:
  ```text
  Commercial automotive studio photography of a premium Mahindra Marazzo executive SUV MPV, three-quarter front hero perspective facing right. Finished in deep metallic oceanic navy blue with flawless high-gloss lacquer reflections. Showcasing the distinctive shark-inspired front fascia with vertical chrome shark-tooth grille accents, twin-chamber projector headlights with sharp eyebrow LED daytime running lights, and sculpted lower bumper with integrated fog lights. Sleek aerodynamic sweeping roofline, sculpted dynamic shoulder creases along the doors, chrome window beltline finisher, and 17-inch machined dual-tone alloy wheels. Immaculate executive cabin visible through pristine lightly-tinted glass without seat plastic. Positioned in a luxury automotive cyclorama studio on a dark obsidian (#070A12) satin floor with precise contact tire shadows. Background features a smooth dark ink (#15162F) to rich brand indigo (#31326F) lighting gradient. Dual side strip softboxes and overhead lightbox defining the muscular body contours. Shot on 85mm prime lens, f/8, commercial automotive brochure quality, 16:9 aspect ratio.
  ```

---

#### Model 4: Toyota Innova Crysta (SUV, Diesel)
- **Vehicle Classification**: Premium Executive MPV / SUV (Chauffeur Benchmark).
- **Key Visual Anchors**:
  - Authoritative, massive trapezoidal radiator grille with wide horizontal slats in piano black and prominent polished chrome borders.
  - Dual-beam automatic LED projector headlamps seamlessly merging into the chrome grille extension wings.
  - Muscular front bumper with triangular LED turn indicator bezels and chrome-ringed round fog lamps.
  - Chiseled squared-off wheel arches, chrome door mirror caps with puddle lamps, chrome door handles.
  - 17-inch multi-spoke diamond-cut alloy wheels.
  - Commanding stance, finished in Executive Super White or Metallic Silver.
- **Production Prompt Specification**:
  ```text
  Commercial automotive studio photography of a prestigious 2024 Toyota Innova Crysta executive SUV, commanding three-quarter front hero angle facing right. Finished in flawless high-gloss metallic silver with pristine mirror reflections. Imposing front design featuring the signature bold trapezoidal radiator grille with piano black horizontal slats and polished chrome outer frame, integrated seamlessly with automatic dual-beam LED projector headlamps. Muscular sculpted front bumper with integrated triangular indicator housings and chrome-accented fog lamps. Authoritative executive stance, chrome door mirrors, chrome exterior handles, and 17-inch diamond-cut multi-spoke alloy wheels. Set inside a minimalist high-end automotive studio on a polished obsidian black (#070A12) floor with grounded tire contact shadows and soft reflections. Infinite seamless cyclorama backdrop with a dark ink (#15162F) to deep indigo (#31326F) ambient gradient. Overhead automotive bank lighting casting long, razor-sharp highlight bands across the hood and shoulder creases. 85mm focal length, sharp focus throughout, executive fleet marketing standard, 16:9 aspect ratio.
  ```

---

#### Model 5: Kia Carens Clavis EV (SUV, Long Range Electric Vehicle)
- **Vehicle Classification**: Next-Generation Long Range Electric SUV.
- **Key Visual Anchors**:
  - Futuristic Kia "Digital Tiger Face" with a completely enclosed aerodynamic front fascia (no open radiator slats).
  - Star Map LED light signature: full-width horizontal LED lightbar connecting vertical geometric LED headlamp clusters.
  - Flush-fit integrated front charging flap with discreet illuminated Kia emblem and EV badging.
  - Aerodynamic low-drag geometric alloy wheels with dark aero disc inserts.
  - Blacked-out A, B, and C pillars creating a floating roof effect, equipped with satin silver roof rails.
  - Finished in Gravity Deep Blue or Glacier Pearlescent White.
- **Production Prompt Specification**:
  ```text
  Commercial automotive studio photography of the futuristic Kia Carens Clavis EV long-range electric SUV, dynamic three-quarter front hero angle facing right. Finished in gleaming Gravity Deep Blue with pristine metallic flake. Featuring the advanced Digital Tiger Face with a completely sealed, seamless aerodynamic front fascia without open radiator grilles, full-width continuous horizontal Star Map LED daytime running light bar spanning the hood leading edge, and sharp vertical geometric LED headlights. Discreet chrome EV badge and flush front charging flap. Aerodynamic low-drag geometric EV alloy wheels with dark aero inserts, blacked-out greenhouse pillars creating a floating roofline, and sleek satin roof rails. Positioned in a high-tech automotive studio on a dark obsidian (#070A12) floor with clean tire contact shadows. Infinite cyclorama studio background washed in a smooth dark ink (#15162F) to deep indigo (#31326F) gradient. Precision softbox studio lighting highlighting the sharp geometric body creases and futuristic EV contours. Shot on an 85mm automotive lens, f/8, ultra-sharp detail, high-end electric vehicle campaign quality, 16:9 aspect ratio.
  ```

---

#### Model 6: Force Urbania 12-Seater (Luxury Executive Passenger Van)
- **Vehicle Classification**: Luxury Monocoque Executive Passenger Van (Approved 12 Seater).
- **Key Visual Anchors**:
  - Ground-up modern European monocoque passenger van architecture (comparable to Mercedes-Benz Sprinter / luxury executive shuttle, NOT a boxy old tempo traveler delivery chassis).
  - Aerodynamic sloping front nose with steeply raked windshield.
  - Signature bull-horn LED daytime running lights wrapping around projector headlamps.
  - Contemporary composite front grille with chrome Force insignia and integrated lower fog lamps in a body-colored aerodynamic bumper.
  - Flush-mounted panoramic privacy-tinted passenger windows with sleek blacked-out window pillars.
  - Subtle glimpse through the deep privacy glass of plush individual reclining VIP executive bucket seats with headrests in a 12-passenger layout.
  - High-roof executive van silhouette with integrated rear roof contour and modern single rear wheel arches.
  - Finished in Pristine Arctic White with chrome accents.
- **Production Prompt Specification**:
  ```text
  Commercial automotive studio photography of an authentic 2024 Force Urbania 12-seater luxury executive passenger van, three-quarter front hero angle facing right. Finished in pristine Arctic White with mirror-finish clearcoat. Authentic modern European-style aerodynamic monocoque executive van styling with a steeply raked aerodynamic windscreen and sculpted car-like front nose (not a boxy commercial delivery truck or tempo). Striking signature bull-horn LED daytime running lights surrounding projector headlights, modern composite front grille with chrome emblem, and body-colored front bumper with integrated fog lamps. Flush-mounted continuous panoramic privacy-tinted passenger windows with blacked-out pillars, revealing subtle silhouettes of plush individual reclining VIP bucket seats with headrests inside the spacious 12-passenger executive cabin. High-roofline luxury shuttle profile with aerodynamic contours and single rear wheels with modern styled wheel covers. Positioned in a state-of-the-art commercial automotive studio on a dark obsidian (#070A12) floor with soft tire contact shadows. Seamless dark ink (#15162F) to deep brand indigo (#31326F) gradient backdrop. High-end commercial lighting sculpting the expansive flanks and aerodynamic roofline. 85mm lens, f/8, ultra-sharp commercial fleet catalog standard, 16:9 aspect ratio.
  ```

---

## 5. Verification Method

To independently verify the findings and validate subsequent asset implementation:

### 5.1 Verification Commands
1. **Asset File Size and Dimension Check**:
   ```powershell
   # Run in d:\victor website to inspect file sizes of replacement assets
   Get-ChildItem public/images/fleet/*.webp | Select-Object Name, Length, LastWriteTime
   ```
   *Pass criteria*: All replacement files exist, are valid WebP images, and have size `< 200,000 bytes` (> 1 KB and < 200 KB).

2. **Aspect Ratio and Format Validation Script**:
   ```powershell
   node -e "
   const sharp = require('sharp');
   const fs = require('fs');
   const targets = ['hyundai-aura.webp', 'tata-tigor-ev.webp', 'mahindra-marazzo.webp', 'innova-crysta.webp', 'kia-carens-clavis-ev.webp', 'force-urbania.webp'];
   targets.forEach(async (f) => {
     const meta = await sharp('public/images/fleet/' + f).metadata();
     console.log(f, meta.width + 'x' + meta.height, meta.format, (meta.size/1024).toFixed(1) + 'KB');
   });
   "
   ```
   *Pass criteria*: Output displays exactly `1200x675` (or 16:9 equivalent), format `webp`, size `< 200KB`.

3. **Next.js Type-Checking and Linting Quality Gates**:
   ```powershell
   npm run type-check
   npm run lint
   ```
   *Pass criteria*: Zero errors and zero warnings.

4. **Production Build Compilation**:
   ```powershell
   npm run build
   ```
   *Pass criteria*: Static SSG build succeeds across all routes.

5. **Visual Grid Alignment & Browser Inspection**:
   - Inspect `/india/fleet` at desktop (1440px), tablet (768px), and mobile (390px / 320px).
   - Verify that all 10 vehicle cards display uniform height, aligned horizon lines, no stretched images, and that the Force Urbania renders as an executive luxury van rather than a bus.

### 5.2 Invalidation Conditions
This survey and its specifications shall be considered invalidated if:
1. Replacement images retain outdoor clutter (dirt roads, potholes, crowds, dealership interiors).
2. The Tata Tigor EV or Kia Carens Clavis EV are generated with open ICE radiator grilles.
3. The Force Urbania visual continues to depict a 30+ passenger bus or an old delivery tempo chassis instead of the authentic monocoque executive passenger van.
4. Studio backdrops depart from Victor Mobility's brand palette (`#070A12`, `#15162F`, `#31326F`).
5. WebP asset sizes exceed the 200 KB performance budget.
