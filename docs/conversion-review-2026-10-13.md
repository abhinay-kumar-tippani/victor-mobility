# Victor Mobility: conversion review and implementation brief

13 October 2026 · Codex review · Antigravity implementation

**Decision: repair the enquiry journey before adding more features or visual effects.** The local build has genuine conversion blockers alongside an overly complicated presentation. Retain the original identity, six authorised services, ten published service cities and three supplied office addresses. The goal is more qualified conversations that the team can turn into quotations, bookings and ongoing contracts. A browser click is not a completed enquiry or booking.

This is a review milestone, not an implemented redesign. No application source or public content was changed. Existing edits to `PeopleSection.tsx`, `india.json` and `sla.json` were preserved. Conversion impact below is a design hypothesis; no traffic or sales analytics were available.

## Fix order, with evidence

| Priority | Finding | Required change and acceptance |
| --- | --- | --- |
| P1 | **All 12 homepage service enquiry buttons are inert.** Six “Discuss” buttons and six “Enquire” buttons leave both URL and scroll position unchanged. `ServicesSection.tsx:291,345` calls `selectEnquiryOption`; `enquiryEvents.ts:8` dispatches to an absent form and `#contact`. The homepage now renders `#contact-invitation`. | Use ordinary links to `/india/contact?service=<canonical-slug>`. All six services must arrive with the correct service selected in the form and WhatsApp message. Links must also work before hydration. Remove the obsolete event dependency from these entry points. |
| P1 | **Fleet tariffs and extra models exceed the authorised baseline.** `fleet-specifications.json:44` supplies prices such as ₹1,400–₹1,800 airport transfers and ₹3,200 day hire. `InteractiveFleetShowcase.tsx:262,565` renders rates and line 91 includes them in a draft. Its “Authorized Models” list and `india/fleet/page.tsx:69` add specific Mercedes/BMW models while `india.json` names no luxury models. | Remove unconfirmed prices, inclusions and extra models from the UI, modal, structured data and drafts. Use the brochure categories/models in `india.json`; retain the existing availability confirmation note. Quote requests collect requirements; the team provides the actual quotation. |
| P1 | **Service copy makes unsupported commercial promises.** `india/services/[slug]/page.tsx:198` promises “100% on-time floor arrival”; line 113 promises complimentary waiting; line 265 promises automatic chauffeur rescheduling. | Replace these with planning information grounded in `india.json`. Example: “Routes and pickup times planned around your shifts.” Airport: “Share your flight number so the team can discuss pickup timing and waiting arrangements.” Do not remove authorised services. |
| P2 | **The hero changes its primary destination while the visitor is using it.** At 390px with reduced motion and keyboard focus on “Explore Service,” its destination changed from employee transport to bus/shuttle after 2.2 seconds. There is no pause button. Dots are 6px tall and arrows 28px square. `Hero.tsx:83,103,220`. | Keep the main proposition and enquiry action stable. Prefer manual service/image selection. If automatic image changes remain, provide pause, stop on focus and reduced motion, and do not change the primary enquiry link. Use the project's 44px interaction targets. |
| P2 | **Fleet selection corrupts enquiry intent.** Selecting “Luxury & Limousines” on the homepage reaches contact with that category but “Employee Transportation” as its service. `FleetSection.tsx:259`, `EnquirySection.tsx:59,85`. | Retain category independently of service. When purpose is unknown, offer “Choose a service” or a general vehicle enquiry rather than inventing a service choice. A vehicle category does not identify the reason for travel. Preserve explicit service and city parameters. |
| P2 | **Mobile visitors cannot enquire where they decide.** On the airport page at 390 × 844, its first service-specific enquiry is at document y=4,270px; the desktop equivalent is y=632px. The sidebar follows the entire article on mobile. `india/services/[slug]/page.tsx:445,714`. | Add “Request a quote” beside the opening service description and repeat it after the useful details, with the service slug preserved. At 390px the first action must be visible with the introduction. Keep a direct call alternative. |
| P2 | **Language and detours make simple requests feel like procurement exercises.** “Enterprise Mobility Architecture,” “Associated Service Modules” and “Corporate Requirement Specification Desk” dominate simple travel choices. Airport details promise live flight telemetry via `/india/protocol`, which is a local configurator. The services index promises an estimator but links to `contact?intent=corporate-tariffs`, an ignored parameter. | Use familiar service names and plain action labels. Remove the two homepage service display modes. Present a corporate quotation request honestly and preserve its purpose. Keep simulated operational tools out of the first-release customer path. |
| P2 | **Coverage changes between browsing and enquiring.** The site describes ten cities; `FleetSection.tsx:266` and the fleet estimator/draft still restrict their copy or choices to Hyderabad, Bengaluru and Pune. | Derive service areas and choices from published `india.json.cities`. Derive physical offices separately from `india.json.offices`. Ten service cities must not turn into ten office claims. |

The carousel recommendation is supported by the [W3C carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/), which specifies a rotation control and stopping rotation when focus enters. The two-second interval is recorded as an implemented milestone in the current handoff; this review challenges its usability, not its provenance.

## The page Antigravity should build

**Positioning:** a recognisable transportation company with clear service choices and a real person to contact. Premium comes from disciplined typography, useful vehicle information, credible imagery and predictable interaction. Remove decorative status lights and dense operational jargon that imply live systems.

### Opening screen

Use the intact original logo in the white header. Keep Services, Fleet, About and Contact. Give “Request a quote” the strongest action styling; keep “Call us” visible. Avoid adding another floating button cluster. Mobile should retain easy enquiry access without hiding content under a fixed bar.

Proposed copy, to be maintained in `src/content/india.json`:

> VICTOR MOBILITY · INDIA  
> **On Time Every Time.**  
> Employee transport, airport transfers, event travel and chauffeur services—for everyday journeys and special occasions.  
> **Request a quote** · Explore our fleet

Below the actions: “Share your city, dates and travel needs. Our team will confirm vehicle options and a quotation.”

Use one carefully cropped transport image, readable text and a concise “Vehicle imagery is illustrative.” caption. Maintain stable copy even if imagery changes. Show actual service choices immediately below the opening section; the four large mobile proof boxes should not consume the entire next screen. Do not introduce a numerical guarantee or imply the image documents Victor's fleet.

### Service choices and proof

| Section | What the visitor should learn | Proposed treatment |
| --- | --- | --- |
| “What do you need to arrange?” | Whether Victor handles their journey | One compact list of the six authorised services with a one-sentence description, service-specific quote link and quieter details link. No display-mode switcher. |
| Employee transport feature | How to start a recurring company transport discussion | Larger editorial section with bus imagery and three useful planning inputs: office locations, shifts and passenger count. “Discuss an employee transport plan.” Route to the same short form, prefilled for employee transportation. |
| “Find the right vehicle category” | Which category suits their group | Keep the manual fleet selector. Use brochure models, relevant capacity information only when sourced, and the availability note. “Enquire about this category” preserves the category. No instant rate calculator. |
| “The people behind your journey” | Who is accountable | Founder and business development contact, supplied roles, direct phone and actual approved commitments. Retain existing user-edited biography. Verify that the control-room image really depicts Victor before identifying it as Victor's facility. |
| “Where we operate” | Whether their city is covered | Ten published cities, readable as text without hovering or understanding a map. Keep the map secondary and distinguish three supplied office addresses. City enquiry links preserve city. |
| “Planning ongoing transport for your business?” | How to discuss a partnership | One concise invitation for employee routes, recurring airport travel or event programmes. Reuse the same form, with company optional and a visible business-purpose selection preserved in the message. No separate procurement portal. |
| Final contact invitation | What to do next and who will respond | “Tell us what you need to arrange.” Request a quote and Call us, with the supplied contact identity. No invented response-time promise. |

Keep variation between an editorial feature, compact service rows, a manual fleet selector and a people section. Use brand indigo for the primary action, warm white for supporting sections and violet sparingly. Body copy should normally be 16–18px. Avoid stacking pill labels, icons, nested panels and small uppercase headings around every sentence.

### Enquiry journey

`Service / vehicle category / city → short enquiry with context retained → review message → Continue on WhatsApp → visitor sends → team confirms arrangements`

Use **Your name**, **Service**, **City**, **Trip details**, and **Company (optional)**. Keep the service-specific prompts already present. Do not ask for a designation or mandatory company from an individual airport traveller. Keep the direct phone alternative at +91 91007 77768 and WhatsApp destination +91 93965 46950.

The final action remains exactly **“Continue on WhatsApp.”** Explain: “This opens your message in WhatsApp. Review and send it to our team.” Keep the distinction between an enquiry and confirmed arrangements. Preserve the working validation, message preview and copy fallback. Do not activate draft email addresses.

Use “Request a quote” for links opening the form. Use “Continue on WhatsApp” only for the actual handoff. Do not label either action “Book now” or show a successful booking state.

## Four-day implementation sequence

| Day | Work | Review gate |
| --- | --- | --- |
| 1 | Repair all enquiry links and context propagation; remove unsupported pricing, model availability and guarantees. | Every service, category and city entry point produces the intended message. No simulated live capabilities or unconfirmed commercial terms on the customer path. |
| 2 | Simplify hero and service section; add early service-detail actions; improve type, spacing and interaction targets. | Desktop 1440px, mobile 390px and small mobile 320px screenshots; stable primary action; keyboard and reduced-motion checks. |
| 3 | Align fleet, coverage, leadership proof and partnership invitation; simplify enquiry wording. | One public content source; consistent ten-city coverage with three offices; no phone/email re-entry requirement; preserve original artwork and supplied contact details. |
| 4 | Verify routes and complete the production release checks; add the agreed measurement events. | Root redirects temporarily to `/india`; no unready UAE choice; unknown service slugs return 404; lint, type-check and production build pass; complete the screenshot/handoff evidence. |

This is sequencing within the existing delivery scope, not a new commitment to add portals, payment, automated booking or live availability.

## Measurement

Track service/category/city entry point, enquiry start, WhatsApp handoff click and call click. Record only categorical context; do not put names, company names, phone numbers or free-text trip details in analytics. No analytics provider was configured in this review.

The business outcome is **qualified enquiries that lead to quotations, confirmed bookings or ongoing contracts**. Establish a baseline before setting uplift targets. Match handoff activity to actual received enquiries and outcomes through the team's records. Never report a WhatsApp window opening or telephone click as a sent enquiry, answered call or completed booking.

## Verification and evidence

Local development preview: `http://127.0.0.1:3000`. Review script: `scripts/review-conversion-2026-10-13.mjs`. Data: `docs/screenshots/conversion-review-2026-10-13/results.json`.

- Reproduced the 12 inert service actions, wrong luxury service default, carousel focus/reduced-motion failure, and buried mobile airport CTA.
- Verified root resolves to `/india`; sampled home, contact and airport pages return 200; no page-level JavaScript exceptions were observed in that run.
- Verified direct service + city prefilling, empty-form validation/focus, and the generated WhatsApp URL with synthetic review data. Intercepted the handoff; no message was sent and no external booking/contact was made.
- No horizontal document overflow in sampled home/contact views at 1440px, 390px and 320px, or airport views at 1440px and 390px. This is not a full accessibility certification.
- Desktop/mobile fold and full-page screenshots are in `docs/screenshots/conversion-review-2026-10-13/`. Snapshot capture returns to scroll position zero and loads images below the fold; the homepage is shown on its first service slide for comparison.
- During the later screenshot refresh, Next development Fast Refresh produced a contact 404 and an airport static-paths 500 (`__webpack_modules__[moduleId] is not a function`). A targeted recheck returned 200 for both and the affected screenshots were recaptured; see `screenshot-metrics.json` and `screenshot-recheck.json`. Include these routes in the production smoke check. Do not infer production reliability from the successful development retry.
- The review script passed a syntax check and `git diff --check` reported no whitespace errors. The script records observations rather than treating the existing defects as passing acceptance tests.
- No application changes, deployment, or production-build claim in this review. The implementation milestone must run its own lint/type-check/build and repeat journey checks after fixes.
