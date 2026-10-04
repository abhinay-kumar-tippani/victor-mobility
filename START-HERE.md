# Victor Mobility India — Antigravity starter
Prepared 4 October 2026. This package contains the approved reference assets, three AI-generated temporary photographs, editable website content and build instructions. It is a handoff package, not an installed or completed website.

## Start now
1. Extract this ZIP into a new folder, for example D:\Victor\victor-india.
2. Open that extracted project folder in Antigravity.
3. Open prompts/01-antigravity-day1.md, copy its complete contents and send it to the agent.
4. Let Antigravity implement the Day 1 preview and produce desktop/mobile screenshots.
5. Bring those screenshots or a preview URL to Codex for the focused review in prompts/02-codex-review.md.

The folder intentionally has no package.json yet. The Day 1 instructions cover scaffolding Next.js while preserving these files. Dependencies are installed on your machine during that step.

## Authoritative inputs
- Original logo: public/brand/victor-original.png. Preserve the file and the colours; do not redraw it.
- Final business card: references/final-business-card.png. Reference only; do not display the card or its QR on the website.
- Copy and regional data: src/content/india.json.
- Colours and motion: docs/design.md and src/content/brand.json.
- Current scope: docs/brief.md.
- Current task: docs/current-task.md.
- Four-day schedule: docs/four-day-plan.md.

## Editing later
Change services, city information and contacts in src/content/india.json. Components should read that file so copy edits do not require rewriting layouts.
Replace temporary photographs at the same paths in public/images/india, or update src/content/media.json. Update the image's description and illustrative status when you replace it.

## Important launch details
The company domain has not been purchased. The email/domain printed on the card are draft business contact values until activated. Calling and WhatsApp use the supplied card's phone numbers.
The first release uses a clearly labelled WhatsApp enquiry draft. It does not simulate an email submission or a confirmed booking.
UAE implementation and the global country selector are phase two. Keep /india as the stable regional route and temporarily redirect / to /india.

