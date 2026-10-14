# Current Task: Services Section Reordering & Removal of Workforce Commute Feature — 14 October 2026
Owner: Antigravity.
Scope: Reordered homepage sections in `src/app/india/page.tsx` so "Our Services" ("What do you need to arrange?") is positioned directly above "Leadership & Accountability" (`PeopleSection`). Completely removed the "Workforce Commute Feature" card from `src/components/home/ServicesSection.tsx` and cleaned up unused imports.

---

## Deliverables Completed in this Milestone

1. **Services Section Relocation (`src/app/india/page.tsx`)**:
   - Repositioned `<ServicesSection />` from position 2 (after Hero) down to position 5, placing it directly above `<PeopleSection />` ("Leadership & Accountability").
   - New section order on `/india`:
     1. Header (Clean 4-link nav + direct calling)
     2. Hero (Cinematic Canvas Hero: executive fleet photography)
     3. Fleet (`FleetSection`: Dzire, Tigor, Innova, Urbania, Coaches)
     4. The Victor Standard (`VictorStandardSection`: Verified drivers, GPS monitoring, honest billing)
     5. Regional Operating Hubs (`IndiaPresenceMap`: Interactive India map + 10-city dossier)
     6. Our Services (`ServicesSection`: "What do you need to arrange?")
     7. Leadership & Accountability (`PeopleSection`: Founder Jahangir & Commercial Lead Mujeeb)
     8. Direct Coordination Desk (`ContactInvitationSection`)
     9. Footer

2. **Removal of "Workforce Commute Feature" (`src/components/home/ServicesSection.tsx`)**:
   - Completely deleted the "Workforce Commute Feature" editorial planning box.
   - Removed unused icons (`MapPin`, `Clock`, `Shield`) and `next/image` import.
   - Maintained clean 3-column grid of the 6 authorized corporate mobility services with "Request a quote" buttons intact.

3. **Header Modernization (`src/components/layout/Header.tsx`)**:
   - Stripped phantom "For businesses" and unready UAE/Global region selector.
   - Consolidated navigation to 4 authentic destinations: `Services`, `Fleet`, `About`, `Contact`.
   - Added direct phone link (`+91 91007 77768`) and high-visibility "Enquire" action button.
   - Full mobile drawer with focus trap, ESC key dismissal, and backdrop blur.

4. **Grand Luxury Fleet Lineup Hero with Brand Color Harmony (`src/components/home/Hero.tsx`)**:
   - Deployed high-resolution, genuine commercial photography ([`luxury-fleet-brand-graded.jpg`](file:///d:/victor%20website/public/images/india/luxury-fleet-brand-graded.jpg)): a grand diagonal convoy of multiple black luxury executive saloons with illuminated LED headlamps and chrome grilles at night.
   - **Full Brand Palette Color Harmonization**: Eliminated distracting yellowish/brownish gravel tones. Shifted color balance to match Victor Mobility's brand palette (`src/content/brand.json`): deep obsidian `#070A12` and ink `#15162F` shadows, brand indigo `#31326F` and cobalt `#2D5090` metallic reflections, and crisp electric ice-blue `#C7D2FE` headlamp highlights.
   - 100% authentic commercial photography with zero AI distortion or synthetic artifacts.
   - Asymmetric dark editorial gradient (`from-[#070A12] via-[#070A12]/80 to-transparent`) ensuring razor-sharp WCAG AAA contrast for typography, buttons, and status pill on the left while prominently displaying the luxury fleet lineup on the right.
   - Headline: "Corporate Mobility, On Time Every Time." with gradient highlight on the authorized tagline.
   - Floating Glassmorphic Trust Ribbon across the bottom:
     - 10 Operational Cities (Pan-India Transit Network)
     - 100% Verified Drivers (Police Cleared & Trained)
     - 24/7 Operations Desk (Active GPS & SOS Dispatch)
     - Direct Operations Hotline (`+91 91007 77768`)

5. **Fleet Realignment (`src/components/home/FleetSection.tsx`)**:
   - Removed questionnaire dropdowns and UAE contamination.
   - Showcases real brochure models: Sedans (Swift Dzire, Tata Tigor), MPVs (Innova Crysta, Marazzo, Urbania), Buses (22-seater, 44-seater luxury coaches), Luxury (Executive saloons).
   - Displayed seating capacities, luggage capacities, and direct "Enquire About [Category]" actions.

6. **Trust Standards Replaced (`src/components/home/VictorStandardSection.tsx`)**:
   - Replaced bureaucratic legal text and audit jargon with 3 concrete customer commitments:
     1. *100% Background-Verified Drivers*
     2. *Punctual & GPS-Monitored Fleet*
     3. *Transparent Corporate Billing*

7. **Interactive India Presence Map (`src/components/home/IndiaPresenceMap.tsx`)**:
   - Integrated offline SVG map of India highlighting all 9 states where Victor Mobility operates:
     - Telangana (Hyderabad - Head Office)
     - Karnataka (Bangalore - Branch Office)
     - Maharashtra (Mumbai & Pune - Branch Office & Financial Hub)
     - Tamil Nadu (Chennai)
     - Delhi (Delhi Capital Region)
     - Uttar Pradesh (Noida)
     - Haryana (Gurgaon)
     - Gujarat (Ahmedabad)
     - West Bengal (Kolkata)
   - Dynamic cursor-following floating tooltip: Hovering over any operational state displays the state name and exact operational cities (e.g. "Hyderabad" over Telangana, "Mumbai & Pune" over Maharashtra) moving smoothly with cursor position.
   - Interactive 10-city quick selector matrix and synchronized hub dossier card showing registered office addresses, key commercial tech corridors, direct "Enquire for [City]" links, and operations call desk.

8. **Contact & Footer Pruned (`src/components/home/ContactInvitationSection.tsx` & `src/components/layout/Footer.tsx`)**:
   - Removed patronizing 4-step tutorial strip.
   - Removed 18 phantom desk links (`/markets`, `/rfp`, `/estimator`, `/portal`, `/tco-calculator`, etc.).
   - Transparent WhatsApp enquiry messaging stating that clicking initiates a WhatsApp chat draft and does not constitute a confirmed contract.

9. **Sitemap Pruning (`src/app/sitemap.ts`)**:
   - Scaled down index from 71 routes to authentic, user-facing routes: `/`, `/india`, `/india/services`, 6 service slugs, `/india/fleet`, `/india/about`, `/india/contact`, `/india/privacy`.

10. **Verification Quality Gates**:
   - `npm run type-check`: 0 errors.
   - `npm run lint`: 0 warnings, 0 errors.
   - `npm run build`: Static SSG build passing (73/73 routes).
   - Captured desktop and mobile screenshots into `docs/screenshots/`.
