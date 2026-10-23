# Dispatch Instructions

## 2026-10-23T07:08:16Z
From: dfbf895b-a3a4-4515-8ca5-1a336040e16e (parent)
Working Directory: d:\victor website\.agents\teamwork\orchestrator_4
Task:
Execute the project per the latest request in ORIGINAL_REQUEST.md:
1. Generate fresh, realistic photographic images tailored to each distinct mobility service in `src/content/india.json` and `src/content/uae.json`:
   - Employee Transportation: Executive corporate shuttles & commuter coaches outside modern tech parks.
   - Bus & Shuttle Transport: High-capacity corporate buses on urban business transit corridors.
   - Event Transportation: Executive convoys and luxury vans for summits and corporate conferences.
   - Airport Transfers: Uniformed chauffeur greeting executive passengers at airport terminal.
   - Luxury Chauffeur Service: Executive luxury saloons and limousines outside illuminated corporate headquarters.
   - Rent-a-Car Fleet: Premium executive self-drive and corporate car rental fleet.
   - Tourism & City Travel (UAE): Luxury travel and executive excursions across Dubai and Abu Dhabi.
   Save all generated images to appropriate directories in `public/images/`.
2. Update service card layouts in `src/app/india/services/page.tsx` and `src/app/uae/services/page.tsx` to display the corresponding background image directly on each card (matching the card architecture of `src/components/home/ServicesSection.tsx`):
   - Background `Image` component with `fill`, `object-cover`, and smooth hover scale (`group-hover:scale-105`).
   - Dark brand ink gradient overlay (`from-[#15162F]/95 via-[#15162F]/80 to-[#15162F]/55` or equivalent) ensuring 100% text contrast and readability.
   - Retain all service metadata: number, title, short description, scope checklist items, and CTA links.
3. Responsive polish & accessibility:
   - High contrast (WCAG AA) on all titles, descriptions, and action buttons.
   - Maintain responsive grid layouts across 320px, 390px, 1024px, and 1440px viewports with zero horizontal overflow.
4. Verify:
   - `next build` compiles successfully with 0 errors.
   - Capture desktop (1440px) and mobile (390px) screenshots of `/india/services` and `/uae/services`.
   - Update `docs/handoff.md`.
Adhere to all project rules in `AGENTS.md`. Maintain your `plan.md` and update `progress.md` regularly. When done, write your handoff report and notify parent with victory claim.
