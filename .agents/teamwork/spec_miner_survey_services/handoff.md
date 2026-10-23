# Specification Mining & Requirements Handoff Report

**Agent**: `spec_miner_survey_services`  
**Milestone**: Survey & Specifications for Mobility Services Visual & Card Layout Modernization  
**Timestamp**: 2026-10-23T07:18:00Z  
**Target Recipient**: Orchestrator / Parent Agent (`c851586f-176a-4841-b00d-e0fa1392c90b` / `dfbf895b-a3a4-4515-8ca5-1a336040e16e`)

---

## 1. Observation

Authoritative specification sources were probed directly via file inspection, code analysis, and git state examination:

1. **`AGENTS.md` (Lines 1–18)**:
   - Line 2: *"Build the India website first within a four-day delivery window. Antigravity owns implementation and iteration. Codex reviews defined milestones."*
   - Line 4: *"Read docs/current-task.md, docs/brief.md and docs/design.md before implementation. Use src/content/india.json for public copy and data. It contains the brochure baseline authorised by the user; do not require repeated approval for those services and cities."*
   - Line 6: *"Preserve the supplied original logo. Website tagline is 'On Time Every Time.', matching the original uploaded artwork. Do not use the former tagline from older references. Do not derive brand colours from the business-card mockup; use src/content/brand.json."*
   - Line 8: *"Keep /india stable. During phase one / redirects temporarily to /india. UAE and the global selector are phase two; do not present a broken UAE navigation choice."*
   - Line 10: *"Use shared components, server-rendered content and small interactive client components. Use one primary motion library. Preserve normal scrolling, keyboard navigation and reduced-motion support."*
   - Line 12: *"The supplied generated images are temporary illustrations. Do not represent them as photographs of Victor's actual fleet. Keep captions concise and customer-relevant; technical implementation notes belong in the docs."*
   - Line 14: *"Use phone and WhatsApp details from the supplied card. Do not activate draft email/domain values before configuration. The enquiry action must state exactly what it does. Opening a WhatsApp draft is not submitting or confirming a booking. Never show simulated submission success."*
   - Line 16: *"Do not invent prices, stock availability, statistics, testimonials, certifications beyond supplied claims or new operating offices. Brochure expansion cities must not be presented as established offices. Images of generic vehicles do not establish specific model availability."*
   - Line 18: *"Preserve unrelated files and user edits. One tool owns edits at a time. End each milestone with a concise docs/handoff.md, relevant checks and desktop/mobile screenshots. Do not load all reference files into every task unnecessarily."*

2. **`ORIGINAL_REQUEST.md` (`## Follow-up — 2026-10-23T07:06:22Z`, Lines 114–152)**:
   - Line 116: *"Generate fresh, realistic photographic images for every mobility service across Victor Mobility's India and UAE platforms, and apply them as background images on all service cards on `/india/services` and `/uae/services` matching the visual treatment of the homepage service cards."*
   - Lines 123–132 (§R1):
     - **Employee Transportation**: Executive corporate shuttles & commuter coaches outside modern tech parks.
     - **Bus & Shuttle Transport**: High-capacity corporate buses on urban business transit corridors.
     - **Event Transportation**: Executive convoys and luxury vans for summits and corporate conferences.
     - **Airport Transfers**: Uniformed chauffeur greeting executive passengers at airport terminal.
     - **Luxury Chauffeur Service**: Executive luxury saloons and limousines outside illuminated corporate headquarters.
     - **Rent-a-Car Fleet**: Premium executive self-drive and corporate car rental fleet.
     - **Tourism & City Travel (UAE)**: Luxury travel and executive excursions across Dubai and Abu Dhabi.
     - Image directory: `public/images/`.
   - Lines 134–139 (§R2): Update service cards in `src/app/india/services/page.tsx` and `src/app/uae/services/page.tsx` matching `src/components/home/ServicesSection.tsx`:
     - Background `Image` component with `fill`, `object-cover`, and smooth hover scale (`group-hover:scale-105 duration-700 ease-out`).
     - Dark brand ink gradient overlay (`from-[#15162F]/95 via-[#15162F]/80 to-[#15162F]/55` or equivalent) ensuring 100% text contrast and readability.
     - Retain all service metadata: number, title, short description, scope checklist items, and CTA links.
   - Lines 140–142 (§R3): Contrast (WCAG AA), responsive grid across 320px, 390px, 1024px, 1440px with zero horizontal overflow.
   - Lines 145–151 (Acceptance Criteria):
     - Fresh, realistic photographic images generated and saved for all published services in India and UAE.
     - Every service card on both `/india/services` and `/uae/services` displays its direct background image.
     - Text contrast meets WCAG AA standards.
     - Service numbers, titles, descriptions, checklist details, and CTA buttons remain legible and fully interactive.
     - `next build` compiles successfully with 0 errors.
     - Desktop (1440px) and mobile (390px) screenshots confirm visual polish and layout stability.

3. **`src/content/brand.json` (Lines 1–30)**:
   - Exact brand palette:
     - `indigo`: `#31326F`
     - `blue`: `#2D5090`
     - `violet`: `#6E57A0`
     - `ink`: `#15162F`
     - `warmWhite`: `#F6F5F2`
     - `white`: `#FFFFFF`
     - `softNeutral`: `#E5E4EA`
     - Extended studio obsidian: `#070A12`
   - Motion tokens: `heroMs`: 650, `sectionMs`: 500, `menuMs`: 200, `controlMs`: 150, `revealDistancePx`: 20, `respectReducedMotion`: true.
   - Tagline: `"On Time Every Time."`

4. **`docs/brief.md` & `docs/design.md`**:
   - Authorized release routes: `/` (country selector linking to `/india` and `/uae`), `/india`, `/india/services`, `/india/services/[slug]`, `/india/fleet`, `/india/about`, `/india/contact`, `/india/privacy`.
   - Slugs restricted to published services (`employee-transportation`, `bus-shuttle-transport`, `event-transportation`, `airport-transfers`, `chauffeur-luxury`, `rent-a-car`). Unknown slugs return `notFound()`.
   - Contact actions: Lead to contact routes with prefill; WhatsApp button reads `"Continue on WhatsApp"`, phone fallback: `+91 91007 77768` (India) and `+971 52 455 2441` (UAE).
   - Card architecture: editorial automotive feel, body copy 16–18px, interactive hit areas ≥ 44px, no floating neon shapes.

5. **Current Implementation Discrepancies**:
   - `src/components/home/ServicesSection.tsx` already uses direct background images with dark ink gradient overlays (`from-[#15162F]/95 via-[#15162F]/80 to-[#15162F]/55`), frosted badges, white typography, and hover zoom.
   - `src/app/india/services/page.tsx` and `src/app/uae/services/page.tsx` currently render plain white cards (`bg-white rounded-2xl p-7 border border-brand-soft-neutral`) with no background imagery.
   - For `tourism-travel` (UAE service), `ServicesSection.tsx` previously fell back to `/images/uae/uae-hero.jpg`. Follow-up §R1 explicitly requires a dedicated image for Tourism & City Travel (UAE).

---

## 2. Logic Chain

1. **Brand Identity & Strict Rules**:
   - `AGENTS.md` mandates that the website tagline is strictly `"On Time Every Time."`. Older taglines, watermarks, or altered punctuation are prohibited.
   - Colors must derive from `src/content/brand.json` (`#31326F`, `#2D5090`, `#6E57A0`, `#15162F`, `#F6F5F2`, `#FFFFFF`, `#E5E4EA`) plus the luxury obsidian token `#070A12`. Mockup approximations are forbidden.
   - All vehicle/service imagery must carry the required customer-facing disclaimer: `"Images show vehicle models; actual assigned vehicles may vary."` or `"Vehicle imagery is illustrative."`. Never claim imagery represents actual physical inventory.

2. **Regional Segregation & Content Boundaries**:
   - India services (6 services): `employee-transportation`, `bus-shuttle-transport`, `event-transportation`, `airport-transfers`, `chauffeur-luxury`, `rent-a-car`.
   - UAE services (6 services): `chauffeur-luxury`, `airport-transfers`, `event-transportation`, `employee-transportation`, `tourism-travel`, `rent-a-car`.
   - Note that `tourism-travel` exists in UAE but NOT in India, whereas `bus-shuttle-transport` is a distinct service on India (while UAE covers coaches under delegation/events/shuttles).
   - India routes use English, Hindi (`hi`), and Telugu (`te`). UAE routes use English and Arabic (`ar`, RTL `dir="rtl"`). LTR isolation must be maintained for phone numbers and numbers in RTL mode.

3. **Service Card Architecture & Visual Standard**:
   - The reference standard is `src/components/home/ServicesSection.tsx`.
   - To align `/india/services` and `/uae/services`, each card must:
     a. Have a container with `relative overflow-hidden rounded-3xl bg-[#15162F] border border-white/10`.
     b. Contain an underlying Next.js `<Image>` with `fill`, `object-cover`, responsive `sizes`, and `group-hover:scale-105 duration-700 ease-out`.
     c. Apply an overlay gradient: `absolute inset-0 bg-gradient-to-t from-[#15162F]/95 via-[#15162F]/80 to-[#15162F]/55`.
     d. Position card content at `relative z-10 flex flex-col justify-between`.
     e. Render frosted glassmorphism icon badge: `w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-white backdrop-blur-md`.
     f. Display two-digit index (`01`, `02`, etc.) in `text-xs font-mono font-bold text-white/70`.
     g. Display title in `text-xl sm:text-2xl font-bold text-white`.
     h. Display short description in `text-sm text-white/85 leading-relaxed`.
     i. Retain scope checklist items (`enquiryDetails`) with white/light text and violet/white icons (`CheckCircle2`).
     j. Provide two distinct action buttons/links:
        - Primary/Secondary action: `Request a quote` or `Enquire` leading to `/contact?service=[slug]` with clear white pill button (`bg-white text-brand-ink hover:bg-brand-indigo hover:text-white`).
        - Detail action: `Explore details` leading to `/services/[slug]` with chevron arrow.

4. **Commercial Truthfulness & WhatsApp Form Action**:
   - WhatsApp enquiry buttons must read `"Continue on WhatsApp"` and clearly state that clicking opens a WhatsApp draft to review and send, and does NOT confirm a contract or booking.
   - Never display simulated submission success for WhatsApp.
   - Email form on `/india/contact` sends to `tippaniabhinay@gmail.com` with a 24-hour response pledge.

5. **Quality Gates & Verification Requirements**:
   - `tsc --noEmit` (or `npm run type-check`) must pass with 0 errors.
   - `next lint` must pass with 0 errors and 0 warnings.
   - `next build` must compile 74/74 static/dynamic routes cleanly.
   - Viewport verification at 1440px (desktop), 768px (tablet), 390px (mobile), and 320px (small mobile) with zero horizontal overflow (`scrollWidth <= innerWidth`).
   - Desktop and mobile screenshots captured into `docs/screenshots/` and documented in `docs/handoff.md`.

---

## 3. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|---|---|---|---|---|---|---|
| 1 | Visual Identity | Tagline Standard | Exact tagline `"On Time Every Time."` across all headings, footers, and brand references. | User brand asset | Rendered text | Banned: old tagline / altered punctuation | `AGENTS.md` §6, `brand.json` |
| 2 | Visual Identity | Color Palette System | Brand palette with `#31326F` (indigo), `#2D5090` (blue), `#6E57A0` (violet), `#15162F` (ink), `#070A12` (obsidian), `#F6F5F2` (warm white), `#FFFFFF` (white). | CSS tokens / Tailwind config | Applied color classes | Banned: card mockup sampled colors | `brand.json`, `docs/design.md` |
| 3 | Imagery | 7 Distinct Service Visuals | Fresh realistic photography for Employee Commute, Bus & Shuttle, Event Transport, Airport Transfers, Chauffeur Luxury, Rent-a-Car, and UAE Tourism. | Prompt / Generation params | WebP/JPG in `public/images/` | Fallback to existing corporate hero if missing | `ORIGINAL_REQUEST.md` §R1 |
| 4 | Card Architecture | Direct Background Card Layout | Card styling in `/india/services` and `/uae/services` with direct background image, smooth zoom, and dark gradient overlay. | Service metadata & image path | Rendered 3D-feel dark card | Fallback to `bg-[#15162F]` solid background | `ORIGINAL_REQUEST.md` §R2, `ServicesSection.tsx` |
| 5 | Accessibility | High Contrast WCAG AA | High-legibility gradient `from-[#15162F]/95 via-[#15162F]/80 to-[#15162F]/55` guaranteeing > 4.5:1 contrast for all text. | Typography over images | High contrast text (`text-white`, `text-white/85`) | Reject unreadable low-contrast overlays | `ORIGINAL_REQUEST.md` §R3, `docs/design.md` |
| 6 | Information Architecture | Retained Service Scope Details | Display `enquiryDetails` checklist items ("Key Coordination Scope" / "Key Specifications") within service cards. | `service.enquiryDetails` array | Formatted checklist with `CheckCircle2` | Omitted gracefully if array is empty | `india/services/page.tsx`, `uae/services/page.tsx` |
| 7 | Regional Scope | India Service Portfolio | 6 published services in India: employee-transportation, bus-shuttle, event-transport, airport-transfers, chauffeur-luxury, rent-a-car. | `src/content/india.json` | Filtered list on `/india/services` | Unknown slugs return `notFound()` | `src/content/india.json`, `docs/brief.md` |
| 8 | Regional Scope | UAE Service Portfolio | 6 published services in UAE: chauffeur-luxury, airport-transfers, event-transport, employee-transport, tourism-travel, rent-a-car. | `src/content/uae.json` | Filtered list on `/uae/services` | Unknown slugs return `notFound()` | `src/content/uae.json`, `docs/brief.md` |
| 9 | Navigation | Regional Service Links | Service card action links pre-fill contact form (`/contact?service=[slug]`) and open detail page (`/services/[slug]`). | Click on card actions | Navigation with preserved query parameters | Broken routes prohibited | `ServicesSection.tsx`, `india/services/page.tsx` |
| 10 | Commercial Truth | WhatsApp Honest Draft | WhatsApp button reads `"Continue on WhatsApp"` and clarifies that it opens a draft, not confirming a booking. | Click on WhatsApp CTA | Opens `wa.me` URL with prefilled text | Banned: simulated booking confirmation | `AGENTS.md` §14, `docs/brief.md` |
| 11 | Compliance | Mandatory Media Disclaimers | Discreet caption: `"Vehicle imagery is illustrative."` or `"Images show vehicle models; actual assigned vehicles may vary."` | Rendered in cards/footers | Visual disclosure text | Banned: claiming images represent actual fleet | `AGENTS.md` §12, `docs/design.md` |
| 12 | Regional Scope | Independent Localization | India: `en`, `hi`, `te` (LTR). UAE: `en`, `ar` (RTL `dir="rtl"`). Isolated storage keys (`victor_locale_india` vs `victor_locale_uae`). | Language switcher action | Updated `<html lang dir>` & UI | No cross-region language leak | `docs/handoff.md`, `LanguageContext.tsx` |
| 13 | Responsive UI | Multi-Viewport Layout | Seamless 1-col (mobile) -> 2-col (tablet) -> 3-col (desktop) grid with 0 horizontal overflow across 320px, 390px, 768px, 1024px, 1440px. | Viewport widths | Responsive grid layout | Reject layouts with `scrollWidth > innerWidth` | `docs/design.md`, `docs/handoff.md` |
| 14 | Quality Gate | Static Build Compilation | Complete compilation of all static and dynamic pages with zero build failures. | `next build` command | SSG HTML/CSS/JS bundles | Build failure on type/lint/syntax error | `package.json`, `AGENTS.md` |

---

## 4. Edge Cases

| # | Feature | Input / Condition | Observed / Required Behavior |
|---|---|---|---|
| 1 | Service Card Checklist Length | `service.enquiryDetails` has 4 items in some services vs 3 in others. | Card uses `flex flex-col justify-between` and `flex-1` on description/checklist so all card heights in a row remain uniform without broken alignment. |
| 2 | UAE Arabic RTL Layout | User selects العربية (`ar`) on `/uae/services`. | Entire layout shifts to `dir="rtl"`. Text aligns right, directional arrows rotate 180° (`rtl:rotate-180`), hover translates flip (`rtl:group-hover/link:-translate-x-1`), checklist icons position on the right, and phone numbers remain strictly LTR via `<span dir="ltr">`. |
| 3 | Image Loading Failure / Offline | Background image fails to load or decodes slowly. | The card's solid background `bg-[#15162F]` and dark gradient overlay ensure text remains 100% readable with zero contrast degradation even if the image asset is delayed. |
| 4 | Unknown Service Slug Navigation | Visitor enters `/india/services/unknown-slug` or `/uae/services/random-name`. | Next.js dynamic route invokes `notFound()` and returns a styled 404 page, preventing 500 server crashes. |
| 5 | Contact Prefill Query Parameter | Visitor clicks "Enquire" on a service card (`/india/contact?service=employee-transportation` or `/uae/contact?service=Chauffeur%20%26%20Luxury%20Limousine`). | The contact page parses the `service` query parameter and automatically selects the matching radio button or dropdown item without resetting user progress. |
| 6 | Extreme Narrow Viewport (320px) | iPhone SE / small mobile screen at 320px width. | Grid collapses to 1 column, card horizontal padding adjusts to `p-6` or `p-7`, buttons stack or flex naturally without clipping, and `document.documentElement.scrollWidth <= 320px` (zero horizontal overflow). |
| 7 | Reduced Motion Setting | User has `prefers-reduced-motion: reduce` enabled in OS/browser. | Image hover scale transition (`group-hover:scale-105`) and card lift (`hover:-translate-y-1.5`) are disabled or neutralized to prevent vestibular discomfort per `brand.json` and `docs/design.md`. |
| 8 | High Ambient Brightness in Imagery | Generated image contains bright daytime airport terminals or sunny outdoor tech park concrete. | The gradient overlay `bg-gradient-to-t from-[#15162F]/95 via-[#15162F]/80 to-[#15162F]/55` guarantees that white typography (`text-white`) always maintains > 4.5:1 contrast regardless of underlying image luminance. |

---

## 5. Caveats

1. **Read-Only Scope**: In strict adherence to the Specification Miner archetype, this agent did not modify any code, create replacement images, or alter page layouts.
2. **Tourism & City Travel Asset**: `src/components/home/ServicesSection.tsx` currently references `/images/uae/uae-hero.jpg` for `tourism-travel`. Requirement R1 establishes that a dedicated high-resolution photographic asset representing luxury travel and excursions across Dubai/Abu Dhabi must be generated and stored under `public/images/`.
3. **Card Checklist Integration**: In `src/components/home/ServicesSection.tsx`, the homepage cards do not show the `enquiryDetails` bullet list (to maintain compact homepage height), but `/india/services/page.tsx` and `/uae/services/page.tsx` do show the `enquiryDetails` checklist. The implementation team must integrate the checklist into the dark card styling without compromising readability or spacing.

---

## 6. Conclusion

All requirements for the Mobility Services Visual Upgrade and Card Layout Modernization are authoritatively established:
1. **7 Distinct Service Visuals**:
   - `employee-transportation`: Executive shuttles outside tech parks.
   - `bus-shuttle-transport`: Corporate buses on transit corridors.
   - `event-transportation`: Executive convoys and luxury vans for summits/conferences.
   - `airport-transfers`: Chauffeur greeting executive at terminal.
   - `chauffeur-luxury`: Luxury saloons outside illuminated corporate HQ.
   - `rent-a-car`: Premium corporate rental fleet.
   - `tourism-travel` (UAE): Luxury excursions across Dubai & Abu Dhabi landmarks.
2. **Card Layout Architecture**:
   - Upgrade `/india/services` and `/uae/services` to matching dark background cards (`bg-[#15162F]`, `Image` `fill`, `object-cover`, `group-hover:scale-105`, and `from-[#15162F]/95 via-[#15162F]/80 to-[#15162F]/55` gradient overlay).
   - Retain all service metadata (number, title, short description, `enquiryDetails` checklist, and dual CTA links).
3. **Rigorous Quality Gates**:
   - `npm run type-check`: 0 errors.
   - `npm run lint`: 0 warnings, 0 errors.
   - `npm run build`: 74/74 routes compiled successfully.
   - Screenshots: 1440px desktop and 390px mobile for both `/india/services` and `/uae/services`.

---

## 7. Verification Method

To verify these specifications independently:
1. **Verify Source Files**:
   - Inspect `AGENTS.md` lines 1–18.
   - Inspect `ORIGINAL_REQUEST.md` lines 114–152.
   - Inspect `src/content/brand.json` lines 1–30.
   - Inspect `src/content/india.json` services array (lines 541–631) and `src/content/uae.json` services array (lines 82–143).
   - Inspect `src/components/home/ServicesSection.tsx` lines 1–189.
2. **Verify Codebase Build & Lint Baseline**:
   - Run `npm run type-check` (`tsc --noEmit`).
   - Run `npm run lint`.
   - Run `npm run build` to confirm 74 routes compile.
3. **Verify Layout & Viewport Invalidation Conditions**:
   - Any horizontal scrollbar on `/india/services` or `/uae/services` at 1440px, 768px, 390px, or 320px invalidates the layout implementation.
   - Any text contrast below WCAG AA (4.5:1) invalidates the gradient overlay implementation.
   - Any altered tagline wording (e.g. omitting periods or using old taglines) violates `AGENTS.md`.
