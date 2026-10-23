# Original User Request

## Initial Request — 2026-10-22T13:35:23Z

Replace Victor Mobility's sample fleet dataset across the India website with the authoritative 10-vehicle manager-approved list, update imagery with verified-license assets, prune unsupported UAE sample fleet data, and support EV deep linking with quote enquiries.

Working directory: d:/victor website
Integrity mode: development

## Requirements

### R1. Authoritative Fleet Dataset Replacement & Single Source of Truth
Replace all customer-facing instances of legacy sample fleet data across `/india/fleet`, homepage fleet previews, vehicle selector dropdowns, enquiry forms, journey estimators, and RFP options with the 10 manager-approved India vehicles:
1. Swift Dzire (Sedan, Petrol)
2. Hyundai Aura (Sedan, Petrol & CNG)
3. Tata Tigor (Sedan, Electric Vehicle)
4. Tata Nexon (Sedan, Long Range Electric Vehicle)
5. MG ZS EV (Sedan, Long Range Electric Vehicle)
6. Mahindra Marazzo (SUV, Diesel)
7. Ertiga CNG (SUV, Petrol & CNG)
8. Innova Crysta (SUV, Diesel)
9. Kia Carens Clavis EV (SUV, Long Range Electric Vehicle)
10. Urbania (12 Seater, Diesel)

Use one shared source of truth for this dataset and remove obsolete sample records so they cannot reappear. Preserve supplied vehicle names, fuel labels, and cab-type classifications exactly as stated without reclassification or inferred seat counts (except Urbania's approved 12 Seater). Remove all fabricated pricing, sample rates, and journey calculation totals; display "Request a quote" on cards and collect enquiry details without calculating fabricated amounts.

### R2. Fleet Page Categorization & Deep Linking
Maintain the existing fleet page design while providing filter tabs: All Vehicles (showing exactly 10 vehicles in supplied order), Sedan (5 vehicles), SUV (4 vehicles), 12 Seater (1 vehicle), and Electric Vehicles (cross-category filter with Tata Tigor, Tata Nexon, MG ZS EV, Kia Carens Clavis EV). Derive all filtered views from the single shared dataset. Support `/india/fleet#electric` so direct navigation or bookmarking automatically activates the Electric Vehicles filter.

### R3. Licensed Reference Imagery & Attribution
Source clean, proportional three-quarter exterior model reference images matching the exact fuel version of each vehicle (e.g. Tigor EV, Nexon EV, MG ZS EV, Clavis EV) with clear reuse permissions (prioritizing manufacturer press assets, Wikimedia Commons, or open stock). Download and optimize assets into the project. Log source URL, creator, and license/permission in `docs/fleet-image-sources.md`. Display the discreet shared caption: "Images show vehicle models; actual assigned vehicles may vary."

### R4. Regional Scope & UAE Fleet Pruning
Ensure India fleet records remain strictly within the India website scope. Identify and prune unsupported sample vehicles and prices from the UAE fleet routes, replacing them with a concise enquiry-led presentation while preserving independently approved UAE content, English/Arabic localization, and RTL layout.

### R5. Enquiry Pre-fill, Multi-Language Localization, and Verification
Ensure "Enquire about this vehicle" CTAs open the regional contact/enquiry flow with the selected vehicle pre-filled and retained. Translate category labels, fuel descriptions, buttons, and supporting copy consistently across English, Hindi, and Telugu (while keeping vehicle names identical). Update `docs/handoff.md`, capture desktop and mobile screenshots, and verify that type-checking, linting, and production builds pass.

## Acceptance Criteria

### Fleet Presentation & Categorization
- [ ] Exactly 10 vehicles are displayed in the `/india/fleet` All Vehicles view in the manager-supplied order.
- [ ] Category filter counts evaluate to: Sedan: 5, SUV: 4, 12 Seater: 1, Electric Vehicles: 4.
- [ ] Direct navigation to `/india/fleet#electric` loads with the Electric Vehicles filter active.
- [ ] No duplicate vehicle cards exist in any view.
- [ ] Card contents display correct image, supplied name, cab type, fuel badge, "Request a quote", and "Enquire about this vehicle" CTA.
- [ ] Shared note "Vehicle allocation and pricing are confirmed for your location, dates and requirements." is displayed.
- [ ] No old sample vehicle names, invented seat counts (except Urbania), or fabricated numeric prices appear anywhere in active India routes or estimators.

### Image Integrity & Sourcing
- [ ] Each vehicle card displays a clean three-quarter exterior image matching the vehicle and fuel type (including dedicated EV models for Tigor, Nexon, MG ZS EV, Clavis EV).
- [ ] `docs/fleet-image-sources.md` contains entries for all vehicle images with original URL, author/organization, license terms, and attribution text.
- [ ] Shared model-reference caption "Images show vehicle models; actual assigned vehicles may vary." is present.

### Regional Integrity & Enquiries
- [ ] India vehicle records do not appear on `/uae` routes.
- [ ] Unsupported sample vehicles and rates are pruned from UAE fleet pages without breaking RTL layout or Arabic/English navigation.
- [ ] Clicking "Enquire about this vehicle" prefills the selected vehicle in the enquiry form.
- [ ] Honest WhatsApp draft behavior is preserved with no fake booking confirmations.

### Localization & Quality Gates
- [ ] Fleet category labels, fuel descriptions, buttons, and notes are translated across English, Hindi, and Telugu, with vehicle model names identical across languages.
- [ ] `npm run type-check` passes with zero errors.
- [ ] `npm run lint` passes with zero errors or warnings.
- [ ] `npm run build` succeeds for all static routes.
- [ ] `docs/handoff.md` is updated with changes, test results, and screenshot artifacts.


## Follow-up — 2026-10-23T06:36:50Z

Generate and deploy premium, luxury-grade commercial automotive studio imagery for Hyundai Aura, Tata Tigor EV, Mahindra Marazzo, Innova Crysta, Kia Carens Clavis EV, and the correct Force Urbania 12-seater, harmonized with Victor Mobility's brand palette (#070A12, #15162F, #31326F) and verified across all fleet touchpoints.

Working directory: d:/victor website
Integrity mode: development

## Requirements

### R1. Luxury Studio Reference Imagery for Flagship Models
Replace casual road-snapshot photos for Hyundai Aura, Tata Tigor EV, Mahindra Marazzo, Innova Crysta, and Kia Carens Clavis EV with premium commercial automotive studio visuals. Assets must feature high-end automotive studio lighting with crisp reflections, clean three-quarter front perspectives, deep obsidian/indigo gradient studio backdrops harmonized with Victor Mobility's brand palette (`#070A12`, `#15162F`, `#31326F`), and accurate vehicle trim and EV styling details (such as closed aerodynamic grilles and EV badging for Tigor EV and Carens Clavis EV).

### R2. Authentic Force Urbania 12-Seater Luxury Passenger Van Visual
Produce an authentic, accurate exterior reference visual for the Force Urbania 12-seater luxury passenger van, ensuring it depicts the modern, aerodynamic luxury executive van profile rather than older commercial tempos or delivery chassis, styled in the same high-end studio lighting aesthetic.

### R3. Visual Harmony, Asset Pipeline & WebP Optimization
Deliver all replacement assets as 16:9 widescreen WebP files in `public/images/fleet/` optimized to < 200 KB. Maintain uniform vehicle scale, contact ground shadows, horizon line alignment, and consistent framing so that cards across `/india/fleet` and homepage previews present an elevated, seamless executive fleet lineup.

### R4. Provenance & Compliance Documentation
Update `docs/fleet-image-sources.md` to reflect the updated asset generation details, prompt specifications, and brand harmony guidelines, retaining the mandatory model-reference disclosure: "Images show vehicle models; actual assigned vehicles may vary."

### R5. Responsive UI Verification & Quality Gates
Ensure responsive card rendering across desktop (1440px), tablet (768px), and mobile (390px/320px) viewports with zero horizontal overflow or layout distortion. Confirm that `npm run type-check`, `npm run lint`, and `npm run build` pass with 0 errors. Update `docs/handoff.md` and capture fresh desktop and mobile screenshots.

## Acceptance Criteria

### Visual Quality & Model Accuracy
- [ ] Hyundai Aura, Tata Tigor EV, Mahindra Marazzo, Innova Crysta, and Kia Carens Clavis EV display luxury-grade studio visuals free from casual outdoor/street snapshots or cluttered backgrounds.
- [ ] Tata Tigor EV and Kia Carens Clavis EV feature correct closed-grille aerodynamic EV front fascias.
- [ ] Urbania displays the authentic modern Force Urbania executive passenger van silhouette.
- [ ] All replacement vehicle images share consistent 16:9 aspect ratios, three-quarter exterior framing, and Victor brand color harmony.

### Asset Integrity & Performance
- [ ] All replacement WebP images in `public/images/fleet/` exist, decode successfully, and are under 200 KB.
- [ ] Fleet card heights remain uniform with zero layout shift or stretched aspect ratios.
- [ ] `docs/fleet-image-sources.md` logs the updated asset details and retains mandatory disclaimers.

### Build & Verification
- [ ] Automated verification script or Playwright check confirms all 10 fleet images load with HTTP 200.
- [ ] `npm run type-check` passes with 0 errors.
- [ ] `npm run lint` passes with 0 errors/warnings.
- [ ] `npm run build` static compilation succeeds across all 74 routes.
- [ ] Updated desktop and mobile screenshots saved in `docs/screenshots/` and documented in `docs/handoff.md`.


## Follow-up — 2026-10-23T07:06:22Z

Generate fresh, realistic photographic images for every mobility service across Victor Mobility's India and UAE platforms, and apply them as background images on all service cards on `/india/services` and `/uae/services` matching the visual treatment of the homepage service cards.

Working directory: `d:\victor website`
Integrity mode: development

## Requirements

### R1. Fresh Image Generation for All Services
Generate realistic, high-resolution photographic images tailored to each distinct service in `src/content/india.json` and `src/content/uae.json`:
- **Employee Transportation**: Executive corporate shuttles & commuter coaches outside modern tech parks.
- **Bus & Shuttle Transport**: High-capacity corporate buses on urban business transit corridors.
- **Event Transportation**: Executive convoys and luxury vans for summits and corporate conferences.
- **Airport Transfers**: Uniformed chauffeur greeting executive passengers at airport terminal.
- **Luxury Chauffeur Service**: Executive luxury saloons and limousines outside illuminated corporate headquarters.
- **Rent-a-Car Fleet**: Premium executive self-drive and corporate car rental fleet.
- **Tourism & City Travel (UAE)**: Luxury travel and executive excursions across Dubai and Abu Dhabi.
Save all generated images to appropriate directories in `public/images/`.

### R2. Background Image Card Styling on `/services` Pages
Update the service card layouts in `src/app/india/services/page.tsx` and `src/app/uae/services/page.tsx` to display the corresponding background image directly on each card (matching the card architecture of `src/components/home/ServicesSection.tsx`):
- Background `Image` component with `fill`, `object-cover`, and smooth hover scale (`group-hover:scale-105`).
- Dark brand ink gradient overlay (`from-[#15162F]/95 via-[#15162F]/80 to-[#15162F]/55` or equivalent) ensuring 100% text contrast and readability.
- Retain all service metadata: number, title, short description, scope checklist items, and CTA links.

### R3. Responsive Polish & Accessibility
Ensure high contrast (WCAG AA) on all titles, descriptions, and action buttons. Maintain responsive grid layouts across 320px, 390px, 1024px, and 1440px viewports with zero horizontal overflow.

## Acceptance Criteria

### Visual & Functional Criteria
- [ ] Fresh, realistic photographic images are generated and saved for all published services in India and UAE.
- [ ] Every service card on both `/india/services` and `/uae/services` displays its direct background image.
- [ ] Text contrast meets WCAG AA standards over the imagery with dark gradient overlays.
- [ ] Service numbers, titles, descriptions, checklist details, and CTA buttons remain legible and fully interactive.
- [ ] `next build` compiles successfully with 0 errors.
- [ ] Desktop (1440px) and mobile (390px) screenshots of `/india/services` and `/uae/services` confirm visual polish and layout stability.


## Follow-up (Server Restart Resume) — 2026-10-23T10:12:54Z

The server was restarted. Please resume and continue orchestrating the luxury studio reference imagery upgrade for the 6 vehicles (Hyundai Aura, Tata Tigor EV, Mahindra Marazzo, Innova Crysta, Kia Carens Clavis EV, and the Force Urbania 12-seater). Complete Milestone 1 (studio assets & Sharp WebP optimization < 200 KB in public/images/fleet/), Milestone 2 (documentation in docs/fleet-image-sources.md), and Milestone 3 (responsive UI verification, quality gates, and screenshots).


## Follow-up (Server Restart Resume 2) — 2026-10-23T12:27:33Z

The server was restarted. Please resume and conclude the Luxury Fleet Imagery Upgrade mission: finalize the second-round M1/M2 gate consensus, complete Milestone 3 responsive visual verification, capture fresh desktop/mobile screenshots in docs/screenshots/, update docs/handoff.md, and conduct the independent Victory Audit.
