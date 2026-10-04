# Victor Mobility — four-day India website plan
Updated 4 October 2026 after receiving the original logo, finalized business card and revised instructions.

This revision replaces the earlier broader schedule. The current deliverable is the India website. UAE and the global India/UAE entry experience follow after India is complete.

## Confirmed decisions
- Company: Victor Mobility Pvt. Ltd.
- Tagline: **On Time Every Time.**, using the spacing and punctuation in the supplied original logo.
- Original logo is the colour and artwork master. The business card provides supporting identity/contact context.
- Antigravity handles most implementation and iteration. The user has Google Pro and is comfortable with the available usage.
- Codex supplies the specification and focused visual/engineering reviews.
- Services and cities use the shared brochure as the authorised initial content. Abhinay can edit them later.
- AI-generated vehicle images are temporary website assets, to be replaced with colleague-supplied photographs.
- Complete the India release within the four-day implementation window.
- Domain has not yet been purchased.

## Ready-to-use handoff
Victor_India_Starter.zip contains:
- The untouched original logo and final card reference.
- Three generated illustrative images: India hero, corporate bus and executive interior.
- Editable India content, brand tokens and media records.
- Shared AGENTS.md instructions.
- A Day 1 implementation prompt, a Codex review prompt and a continuation prompt.
- Design specification, content sources, current task, schedule and handoff document.

This is a prepared project handoff. It does not yet contain an installed Next.js application or a completed website. Antigravity scaffolds and implements it using the supplied Day 1 prompt.

## Start immediately
1. Extract the ZIP into a new local project folder.
2. Open that folder in Antigravity.
3. Paste the full contents of prompts/01-antigravity-day1.md.
4. Let Antigravity complete the responsive India homepage and return screenshots.
5. Send the screenshots or preview URL to Codex for the focused review supplied in prompts/02-codex-review.md.

Keep one repository and one tool editing at a time. Record a commit and concise handoff after each milestone. If Codex works remotely, share committed changes through the same repository or provide a focused diff; the tools do not automatically share chat history.

## Four-day schedule
Plan for approximately 6–8 focused hours daily. This is a working estimate for the scoped release, not a guarantee. Reassess after Day 1.

| Day | Main work | Result |
| --- | --- | --- |
| 1 | Next.js setup, brand integration, desktop/mobile India homepage, first visual review | Working homepage preview |
| 2 | Services overview and reusable detail template, fleet, about, contact | Complete page structure |
| 3 | Motion refinement, WhatsApp enquiry flow, accessibility, metadata and performance | Complete visitor journey |
| 4 | Device checks, content/link review, fixes, build and deployment configuration | Tested release and preview |

Protect Day 4 for finishing. Avoid changing the broad design direction after the first review without a concrete reason. If progress slips, retain the full core pages and working enquiry journey; add additional service-detail pages from the shared template after the essential release is stable.

## First-release architecture
Recommended: Next.js App Router, TypeScript, Tailwind or custom CSS tied to tokens, and one main motion library.
Keep most public content server-rendered, with small interactive components for menus, selectors and forms.

Routes:
- / temporarily redirects to /india.
- /india is the stable India homepage.
- /india/services and /india/services/[slug].
- /india/fleet, /india/about, /india/contact and /india/privacy.

The temporary root redirect keeps the future global selector possible without moving India pages. Build the selector and /uae after India is complete. Avoid publishing a nonfunctional UAE choice during this release.

No account system, payment gateway, automated booking confirmation, live fleet database, Arabic version or complex 3D configurator is needed for the four-day India scope.

## Brand direction
Approximate solid colours sampled from the uploaded original raster:
- Indigo: #31326F
- Blue: #2D5090
- Violet: #6E57A0

Supporting design choices:
- Ink: #15162F
- Warm white: #F6F5F2
- White: #FFFFFF
- Soft neutral: #E5E4EA

The source image contains antialiasing and shade variations; these are sampled web tokens, not a new vector brand standard.
Keep the original logo intact. Use a white brand area and maintain all artwork proportions. Do not recreate the wordmark, horse or V.
The card's background watermark contains the former tagline; do not use that watermark on the website.

Aim for confident automotive photography, precise typography and varied editorial compositions. Give buses and employee transport equal care alongside luxury vehicles.
Use generous space, clear service names and concise enquiry actions. Avoid repeating identical feature-card grids or using unsupported animated numbers.

## Homepage composition
1. White header with full Victor logo, navigation and enquiry action.
2. Cinematic dark hero using the supplied image and "On Time Every Time." headline.
3. Clear service navigation.
4. Employee/bus transport feature with the supplied shuttle image.
5. Fleet categories spanning everyday sedans, group vehicles, buses and luxury.
6. Event, airport and chauffeur/rental pathways.
7. Hyderabad, Bengaluru and Pune coverage.
8. Concise company story and contact invitation.

Use the darker left side of the hero for desktop copy. Design the mobile crop and copy separately so both remain readable. The site should look considered as a static composition before animation is added.

## Motion
- Hero settles/fades in about 650 ms.
- Sections use small one-time reveals over approximately 450–600 ms.
- Fleet selection updates image and details together in around 250 ms.
- Navigation opens in around 200 ms with keyboard focus and Escape support.
- Controls use short 120–180 ms feedback.
- Reduced-motion users get immediately readable content and simplified transitions.

Keep normal scrolling. No long intro, autoplay-video dependency, custom cursor or compulsory horizontal scroll.
The supplied still images are sufficient for the first release. A professionally shot hero film can follow later.

## Brochure-based content
The editable content file includes:
- Employee transportation.
- Bus and shuttle transport.
- Event transportation.
- Airport transfers.
- Chauffeur and luxury travel.
- Rent-a-car/self-drive enquiries.

The brochure names Hyderabad, Bengaluru and Pune as the primary India operating cities. Their brochure office addresses are included.
It also discusses expansion into other metros. Those cities are stored separately and unpublished by default, so they are not incorrectly presented as established offices.

Vehicle categories and historical model examples come from the brochure. Default public presentation uses categories; current per-model availability is confirmed by the sales team.
No invented prices, reviews, fleet totals or claimed electric-fleet percentage.

Source precedence: current user instructions, current original logo/final card, then the shared 2024 brochure.
Source notes are recorded in docs/facts-and-sources.md.

## Contacts and enquiries
The final card supplies:
- Calls: +91 91007 77768.
- WhatsApp: +91 93965 46950.
- Mujeeb Ur Rehman Mohammed, Business Development Partner.

The card's email/domain are stored as editable draft values because the domain is not yet purchased. They are inactive by default.
The older brochure email/domain are source notes only.

For the initial release, a short quote form prepares a WhatsApp message. Its action says "Continue on WhatsApp", and visitors understand they must send the message there. Provide a call option.
This is a genuine contact journey, not a simulated form submission or a confirmed booking.
If an active email/provider becomes available during implementation, a server-backed form can be connected and tested separately.

## Temporary images and replacement
The supplied AI assets are:
- public/images/india/hero.png
- public/images/india/employee-shuttle.png
- public/images/india/luxury-interior.png

They are illustrative scenes, not photos of Victor's actual fleet. Use a discreet "Vehicle imagery is illustrative." caption in relevant media/fleet context.
Keep source status internal in src/content/media.json. Do not expose developer notes in visitor-facing UI.
Replace files at the same paths or update the media record; refresh alt text and focal points when real photos arrive.
Do not claim a particular vehicle model based on the generated image.

## Review and launch evidence
Check actual desktop and mobile rendering, keyboard navigation, reduced motion, all release routes, phone and WhatsApp links, form validation and message formatting.
A WhatsApp draft opening should never show "Booking confirmed".
Use responsive image loading and reserve media dimensions.
Set canonical/sitemap values from the actual deployed domain; do not insert an unpurchased domain as though it is live.
Run the production build and relevant checks. Keep the last working commit for rollback.

A preview URL is sufficient for demonstrating completion if the domain has not yet been purchased. Configure the company-owned domain and active email when available.

## Research retained from the original plan
The design principles draw from the published structures of [Rolls-Royce](https://www.rolls-roycemotorcars.com/en_US/home.html), [Aman](https://www.aman.com/) and [Blacklane](https://www.blacklane.com/en/). These are references for presentation and service discovery, not layouts to copy.
Implementation guidance: [Next.js server/client components](https://nextjs.org/docs/app/getting-started/server-and-client-components), [Motion accessibility](https://motion.dev/docs/react-accessibility), [Web Vitals](https://web.dev/articles/vitals), [Codex AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md), and [Antigravity rules](https://antigravity.google/docs/rules/).
