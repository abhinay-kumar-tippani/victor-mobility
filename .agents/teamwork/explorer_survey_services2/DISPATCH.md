## 2026-10-23T07:11:29Z
You are an Explorer agent (explorer_survey_services2).
Your working directory is: `d:\victor website\.agents\teamwork\explorer_survey_services2`

MANDATORY: Read `d:\victor website\.agents\teamwork\ORIGINAL_REQUEST.md` (specifically the section `## Follow-up — 2026-10-23T07:06:22Z`) before starting.

Your objective:
1. Examine the reference implementation in `src/components/home/ServicesSection.tsx` to understand the card architecture:
   - How the background `Image` component is styled (fill, object-cover, sizes, priority/loading, group-hover:scale-105 transition).
   - How the gradient overlay is constructed (`from-[#15162F]/95 via-[#15162F]/80 to-[#15162F]/55` or equivalent brand ink tones).
   - How text contrast, readability, and WCAG AA compliance are achieved.
2. Examine `src/app/india/services/page.tsx` and `src/app/uae/services/page.tsx`:
   - How service cards are currently implemented and rendered on both pages.
   - What metadata is rendered: number, title, short description, scope checklist items, and CTA links.
   - What classes, styles, and markup need to be updated to match the background image card architecture.
3. Identify responsive design requirements across 320px, 390px, 1024px, and 1440px viewports to guarantee 0 horizontal overflow.
4. Produce a detailed handoff report in `d:\victor website\.agents\teamwork\explorer_survey_services2\handoff.md` with code comparisons, exact component structure, and concrete implementation strategy.
Update `progress.md` in your directory as you work. When done, write `handoff.md` and send a message with send_message to dfbf895b-a3a4-4515-8ca5-1a336040e16e (parent orchestrator).
