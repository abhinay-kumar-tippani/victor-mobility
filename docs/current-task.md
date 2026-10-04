# Day 2 — Core Services, Fleet, About, Contact & Privacy Routes
Owner: Antigravity.
Read AGENTS.md, docs/brief.md, docs/design.md, src/content/india.json, src/content/media.json, and src/content/brand.json.

Implement the Day 2 release routes and resolve all Codex review findings:
1. Codex Review Fixes:
   - Header breakpoint resize scroll-lock cleanup (P2)
   - Label association for name input field (P2)
   - Reduced-motion preference support in scrolling (P2)
   - Content baseline alignment: "Operating Cities", "Coordinated Group Transport" (P2)
   - Remove internal draft labels ("Category ID", "Brochure page 10 baseline", "Brochure verified") (P3)
   - Route-planned navigation pointing to real route destinations (P3)

2. Complete Release Routes:
   - `/india/services`: Services overview of all 6 brochure services with scope details and CTAs
   - `/india/services/[slug]`: Dynamic service template with `generateStaticParams()` for the 6 valid services, 404 for unknown slugs, dynamic metadata, and enquiry handoff
   - `/india/fleet`: Complete fleet categories overview (Sedans, MPVs, Buses, Luxury) with guidance notes and illustrative imagery
   - `/india/about`: Corporate story, operating pillars, established operating offices (Hyderabad, Bengaluru, Pune), and verified FAQs
   - `/india/contact`: Dedicated requirement desk with interactive WhatsApp enquiry builder, direct call alternative, and office cards
   - `/india/privacy`: Transparent privacy notice explaining data handling, WhatsApp hand-off, and contact details

3. Verification & Quality:
   - TypeScript check (`tsc --noEmit`)
   - ESLint (`next lint`)
   - Production Build (`next build` with 16 statically generated pages)
   - Playwright automated verification suite (`scripts/verify-day2.mjs`)
   - Desktop and mobile screenshot capture for all release pages
   - Update `docs/handoff.md`
