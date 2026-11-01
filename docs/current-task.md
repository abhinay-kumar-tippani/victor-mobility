# Current Task: Inline Victor wordmark — 1 November 2026

Owner: Codex, at direct user request. Implementation complete; see `docs/handoff.md` for validation and original-site exceptions.

Follow-up completed: the user approved a pure-white version of the simple wordmark for dark sections. Removed white backing tiles, retained V/o negative space, and refined heading scale/alignment. Light surfaces and the infographic retain the coloured wordmark. The original asset and full-company-name protections are unchanged.

Replace visible standalone English brand words with the supplied simple transparent logo throughout India/UAE/shared pages and language versions. Preserve the entire `Victor Mobility Pvt. Ltd.` company name, including punctuation/case variations and split elements. Preserve nonvisual strings, existing assets and user edits. Implemented with `BrandText` and the unchanged `public/brand/victor-simple.png`; explicit visual rendering only, with accessible text and responsive sizing.

---

# Previous Task: Marathi Language Support for Victor Mobility India — 30 October 2026

Owner: Antigravity, at direct user request. Status: COMPLETED.

## Requirements Addressed:
1. **Marathi (`mr`) Language Support**:
   - Added Marathi as the 7th language option in the India language selector (`/india` and all `/india/*` routes).
   - Order:
     1. English — `en`
     2. हिन्दी — `hi`
     3. తెలుగు — `te`
     4. ಕನ್ನಡ — `kn`
     5. தமிழ் — `ta`
     6. മലയാളം — `ma`
     7. मराठी — `mr`
   - Native Name: `मराठी`.
   - Locale code: `mr`, Direction: `dir="ltr"`.
   - Typography: Rendered crisply with `Noto Sans Devanagari` font fallback.

2. **Full Dictionary & Component Translation Coverage**:
   - `src/i18n/dictionaries/mr.ts`: Complete Marathi dictionary matching 100% of keys and structure of `en.ts`.
   - `src/i18n/types.ts`: Added `"mr"` to `SupportedLocale`, `INDIA_LOCALES`, and `SUPPORTED_LOCALES`.
   - `src/i18n/LanguageContext.tsx`: Registered `mr` dictionary, allowed `mr` for `india` region in persistence and selection.
   - `src/app/layout.tsx`: Synchronous head script handles `mr` with 0 flash of unlocalized content.
   - `src/lib/enquiryMessage.ts`: Formatted Marathi WhatsApp enquiry message with localized headers and field names.
   - Localized strings updated in `EnquirySection.tsx`, `ContactInvitationSection.tsx`, `PartnerEnquirySection.tsx`, `ImmediateAssistanceCard.tsx`, `GuidedEnquiryAssistant.tsx`, and `Footer.tsx`.

3. **UAE Scope Boundary & Preserved Brand Assets**:
   - UAE routes (`/uae/*`) strictly restricted to English and Arabic (`en`, `ar`).
   - Root page (`/`) country selector behavior preserved.
   - Brand tagline preserved verbatim: `"On Time Every Time."`.
   - Fleet models (`Swift Dzire`, `Innova Crysta`, `Tata Tigor`, `Force Urbania`), pricing, and contact numbers preserved.
   - Form state, calculator inputs, and vehicle selections preserved across language switches.

## Verification:
- `scripts/verify-dictionary-keys.mjs`: 100% key match between `en.ts` and `mr.ts` (0 missing keys).
- `npm run type-check`: 0 TypeScript errors.
- `npm run lint`: 0 ESLint warnings or errors.
- `npm run build`: 74/74 static routes compiled successfully.
- Playwright end-to-end verification (`scripts/verify-indic-languages.mjs`):
  - 10 test suites passed (0 errors).
  - Verified 7 options in selector, Marathi rendering on all India routes, form state retention, UAE isolation, and responsive layout without horizontal overflow at 1440px, 768px, 390px, and 320px.
  - Screenshots:
    - [Desktop Marathi Homepage](screenshots/lang-mr-desktop.png)
    - [Mobile Marathi Homepage](screenshots/lang-mr-mobile.png)
    - [Language Selector 7 Options](screenshots/lang-selector-all-options.png)
