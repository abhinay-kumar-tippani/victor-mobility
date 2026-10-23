# Temporary team portraits

The three portraits below were generated with the built-in ImageGen tool on 23 October 2026 and optimized to 720 × 720 WebP. They depict fictional people and are labeled **Illustrative profile** on the site. Mujeeb's existing supplied portrait was not modified.

| Slide | Asset | Prompt |
| --- | --- | --- |
| 02 | `public/images/team/profile-placeholder-2.webp` | Fictional Indian woman in her early 30s, smart business attire, warm confident expression, shoulders-up editorial portrait; semi-realistic painted illustration with subtle paper texture, softly lit warm-neutral office backdrop, indigo and muted blue accents; centered square composition; no text, logo, watermark, vehicles, or additional people. |
| 03 | `public/images/team/profile-placeholder-3.webp` | Fictional Indian man in his late 30s with glasses, smart business attire, approachable expression, shoulders-up editorial portrait; semi-realistic painted illustration with subtle paper texture, softly lit warm-neutral office backdrop, indigo and muted violet accents; centered square composition; no text, logo, watermark, vehicles, or additional people. |
| 04 | `public/images/team/profile-placeholder-4.webp` | Fictional South Asian woman in her 40s with short dark hair, smart business attire, composed friendly expression, shoulders-up editorial portrait; semi-realistic painted illustration with subtle paper texture, softly lit warm-neutral office backdrop, indigo and muted blue accents; centered square composition; no text, logo, watermark, vehicles, or additional people. |

To replace a profile on both homepages, update its record in `src/content/india.json` under `teamProfiles`: set `name`, `role`, `imageSrc`, `imageAlt`, `phoneDisplay`, `whatsappDisplay`, `emailDisplay`, optionally `description`, and change `placeholder` to `false`. Add `phoneHref` and `whatsappDigits` to enable the phone and WhatsApp links; set `emailEnabled` to `true` only after that inbox is configured. The UAE homepage uses the same team list. Mujeeb's supplied phone and WhatsApp details come from `contact`; his displayed sample email is in `teamFeaturedEmail`.
