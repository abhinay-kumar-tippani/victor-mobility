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
