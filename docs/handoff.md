# Handoff

## Milestone: Day 2 — Core Services, Fleet, About, Contact & Privacy Routes & Codex Fixes
- **Branch**: `main`
- **Status**: Completed and fully verified. Ready for review.

---

## 1. Codex Review Corrections Completed

1. **P2 — Header Breakpoint Resize Scroll-Lock & Inert Cleanup**:
   - **Location**: `src/components/layout/Header.tsx:54-79, 143-156`
   - Added a `window.matchMedia('(min-width: 1024px)')` listener that immediately closes the mobile drawer when the viewport widens past the desktop breakpoint.
   - Restores `document.body.style.overflow = "unset"`, and removes `inert` and `aria-hidden` attributes from `#main-content` and `footer`.
   - Effect cleanup ensures overflow and inert state are cleared on unmount.

2. **P2 — Unified Name Field Label Association**:
   - **Location**: `src/components/home/EnquirySection.tsx:159-181`
   - Unified the identifier so `<label htmlFor="enquiry-name-input">` matches `<input id="enquiry-name-input">`. Clicking the label directly focuses the name input.

3. **P2 — Respect Reduced-Motion Preference on Programmatic Scrolling**:
   - **Location**: `src/lib/enquiryEvents.ts:15-21`, `src/components/layout/Header.tsx:180-188`
   - Checks `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.
   - When active, uses `{ behavior: "auto" }` and shortens focus transition delays (50ms vs 350ms).

4. **P2 & P3 — Internal Authoring Markers Replaced with Professional Customer Messaging**:
   - **Locations**:
     - `src/components/home/FleetSection.tsx:97`: Replaced `"Category ID: ..."` with `"Dedicated Vehicle Category"`.
     - `src/components/home/EmployeeTransportFeature.tsx:30, 75`: Replaced `"Regional Depots"` with `"Operating Cities: Hyderabad · Bengaluru · Pune"` and `"Vetted Drivers & Monitored Fleet"` with `"Coordinated Group Transport"`.
     - `src/components/home/ServicesSection.tsx:96`: Replaced `"Brochure verified"` with `"Enterprise mobility"`.

5. **P3 — Navigation Pointed to Real Route Destinations**:
   - **Locations**: `src/components/layout/Header.tsx:25-30`, `src/components/layout/Footer.tsx:53-89`
   - Navigation links now target their real route destinations:
     - Services: `/india/services`
     - Employee Commute: `/india/services/employee-transportation`
     - Fleet: `/india/fleet`
     - Network: `/india#network`
     - About: `/india/about`
     - Contact: `/india/contact`
     - Privacy Notice: `/india/privacy`

---

## 2. Day 2 Routes Implemented

1. **Services Overview (`/india/services`)**:
   - Presents all 6 brochure services (`employee-transportation`, `bus-shuttle-transport`, `event-transportation`, `airport-transfers`, `chauffeur-luxury`, `rent-a-car`).
   - Detailed service descriptions, key coordination scope checklists, deep links to `/india/services/[slug]`, and enquiry actions to `/india/contact?service=[slug]`.

2. **Dynamic Service Detail Template (`/india/services/[slug]`)**:
   - Dynamic route powered by `generateStaticParams()` covering all 6 published brochure services.
   - Unknown/unauthorized slugs return `notFound()` (404).
   - Dynamic metadata (`generateMetadata`) with service-specific title and description.
   - Breadcrumb navigation (`Home / Services / [Service Title]`), scope and coordination checklist (`enquiryDetails`), operating hubs callout, and sidebar CTAs.

3. **Fleet Overview (`/india/fleet`)**:
   - Highlights 4 categories: Sedans, MPVs & Group Vehicles, Buses & Shuttles, Luxury & Limousines.
   - Evaluates `fleetModelDisplayDefault: false` by presenting category guidance and the authoritative `fleetNote` instead of claiming specific model stock availability.
   - Includes executive interior illustration (`/images/india/luxury-interior.png`) paired with the required caption: *"Vehicle imagery is illustrative."*
   - Explains passenger capacity, suitability, and operational standards (punctual dispatch, driver compliance, sanitized cabins).

4. **About Page (`/india/about`)**:
   - Company story, operating pillars, and mission: *"On Time Every Time."*
   - Operational network detailing the 3 established operating offices: Hyderabad (Head Office), Bengaluru (Branch Office), and Pune (Branch Office).
   - Expansion cities from brochure are strictly omitted from office listings per `AGENTS.md`.
   - Verified brochure FAQs.

5. **Contact & Requirement Desk (`/india/contact`)**:
   - Interactive WhatsApp enquiry draft generator (`+91 93965 46950`) prefilling service, city, and requirement details.
   - URL search parameter support (`?service=...&city=...`) for instant pre-population from in-page service and city buttons.
   - Direct telephone line to representative Mujeeb Ur Rehman Mohammed (`+91 91007 77768`).
   - Explicit disclaimer that WhatsApp draft creation is not an automated booking confirmation.
   - Transparent clarification that official corporate email will be activated upon scheduled domain setup.

6. **Privacy Notice (`/india/privacy`)**:
   - Truthful notice explaining voluntary enquiry collection, zero data brokering/reselling, WhatsApp end-to-end encryption hand-off, and contact details for data inquiries.

---

## 3. Verification Checks & Results

1. **TypeScript Type Check**: `npm run type-check` (`tsc --noEmit`) — **PASSED** (0 errors).
2. **ESLint**: `npm run lint` (`next lint`) — **PASSED** (0 warnings, 0 errors).
3. **Production Build**: `npm run build` — **PASSED** (16 static pages generated).
4. **Automated Playwright Test Suite** (`scripts/verify-day2.mjs`):
   - ✔ PASS: Route `/` status (Root Redirect -> `/india`)
   - ✔ PASS: Route `/india` status (India Homepage)
   - ✔ PASS: Route `/india/services` status (Services Overview)
   - ✔ PASS: Route `/india/services/employee-transportation` status (Service Detail: Employee Transportation)
   - ✔ PASS: Route `/india/services/bus-shuttle-transport` status (Service Detail: Bus & Shuttle)
   - ✔ PASS: Route `/india/services/event-transportation` status (Service Detail: Event Transportation)
   - ✔ PASS: Route `/india/services/airport-transfers` status (Service Detail: Airport Transfers)
   - ✔ PASS: Route `/india/services/chauffeur-luxury` status (Service Detail: Chauffeur & Luxury)
   - ✔ PASS: Route `/india/services/rent-a-car` status (Service Detail: Rent-A-Car)
   - ✔ PASS: Route `/india/fleet` status (Fleet Categories Page)
   - ✔ PASS: Route `/india/about` status (About Us Page)
   - ✔ PASS: Route `/india/contact` status (Contact & Requirement Desk)
   - ✔ PASS: Route `/india/privacy` status (Privacy Notice Page)
   - ✔ PASS: Route `/india/services/non-existent-service` status (Invalid Service Slug returns 404)
   - ✔ PASS: Codex Finding 1: Menu auto-closes and removes inert/overflow lock on resize >= 1024px
   - ✔ PASS: Codex Finding 2: Clicking label focuses `#enquiry-name-input`
   - ✔ PASS: Codex Finding 4 & 5: Internal draft labels removed and Operating Cities verified

---

## 4. Screenshot Locations

- **Desktop (1440px)**:
  - Homepage: `docs/screenshots/home-desktop.png`
  - Services Overview: `docs/screenshots/services-desktop.png`
  - Service Detail Template: `docs/screenshots/service-detail-desktop.png`
  - Fleet Categories: `docs/screenshots/fleet-desktop.png`
  - About Us: `docs/screenshots/about-desktop.png`
  - Contact & Requirement Desk: `docs/screenshots/contact-desktop.png`
  - Privacy Notice: `docs/screenshots/privacy-desktop.png`

- **Mobile (390px)**:
  - Homepage: `docs/screenshots/home-mobile.png`
  - Services Overview: `docs/screenshots/services-mobile.png`
  - Service Detail Template: `docs/screenshots/service-detail-mobile.png`
  - Fleet Categories: `docs/screenshots/fleet-mobile.png`
  - About Us: `docs/screenshots/about-mobile.png`
  - Contact & Requirement Desk: `docs/screenshots/contact-mobile.png`
  - Privacy Notice: `docs/screenshots/privacy-mobile.png`

---

## 5. Next Task
- Proceed to Day 3: Interactive refinement, advanced inquiry handoffs, SEO schema/metadata enrichment, and edge testing.
