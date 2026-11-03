# Current Task: Comprehensive Navbar Refinement & Pointer-Intercept Fix — 4 November 2026

Owner: Antigravity, at direct user request ("fix navbar"). Status: COMPLETED.

## Summary of Accomplished Requirements:

### 1. Pointer Interception & Semantic HTML Architectural Fix
- **Isolated `<StickyContactRail>` from `<header>`**:
  - Previously, `<StickyContactRail>` was nested directly inside `<header>`, which caused the header's DOM bounding box to stretch vertically across the viewport (up to `y=422px+`), causing floating contact links to intercept mobile navigation clicks and pointer events.
  - Wrapped `<header>` and `<StickyContactRail>` cleanly in a React fragment `<>...</>`, restoring proper HTML landmark boundaries and eliminating pointer interception on mobile menu triggers.

### 2. Logo Clarity & Proportional Prominence
- **Increased Logo Dimensions in Navbar**:
  - Increased `BrandLogo` height from `h-11 sm:h-[52px]` to `h-12 sm:h-[58px]`, improving width from 98px to ~109px on desktop (and 48px / 90px on mobile).
  - Preserved the authoritative SVG viewport (`130 160 810 430`), intact winged Pegasus, registration mark ®, and original tagline "On Time Every Time." with significantly improved legibility.
- **Fixed SVG ClipPath Collision in `BrandLogo.tsx`**:
  - Replaced hardcoded SVG `<clipPath id="victor-logo-viewport-clip">` with `useId()`, preventing duplicate ID conflicts when the logo appears concurrently in Header, Footer, and modals.

### 3. Visual Hierarchy & Navigation Link Refinements
- **Active Navigation Pill Refinement**:
  - Replaced the heavy, solid dark indigo block (`bg-brand-indigo text-white shadow-xs`) on active navigation links (`Home`, `Services`, `Fleet`, `About`, `Contact`) with a sophisticated, executive active tint (`text-brand-indigo font-bold bg-brand-indigo/10 border border-brand-indigo/15 shadow-2xs`).
  - Restored clear visual hierarchy: the conversion CTA `ENQUIRE` is now the sole filled solid indigo button in the header, removing visual competition between active page indicators and the primary conversion action.
- **Enlarged Text & Spacing**:
  - Increased nav text size from `text-xs xl:text-sm` (12px on 1024px) to consistent `text-sm font-semibold` with `px-3 xl:px-3.5 py-2` padding, eliminating awkward spacing voids following the removal of RFP Desk and Estimator.
- **Header Background & Glassmorphism**:
  - Added `bg-white/95 backdrop-blur-md` with `h-16 sm:h-[74px]`, delivering a sleek, executive glass effect during page scrolling.
- **Desktop CTAs**:
  - Enabled direct call button on all desktop viewports (`hidden lg:inline-flex` instead of `hidden xl:inline-flex`), creating a balanced, symmetrical navbar layout at 1024px and 1440px.

### 4. Mobile Drawer UI/UX Polish
- **Eliminated Duplicate Close (X) Buttons**:
  - Removed the redundant inner `[X]` button inside the mobile drawer header that sat directly beneath the navbar's own `[X]` toggle button.
  - Formatted the drawer header with clean branding: `NAVIGATION` category label alongside `Victor Mobility`.
- **Refined Mobile Active State**:
  - Styled active mobile links with a clean left accent bar (`border-l-4 rtl:border-r-4 border-brand-indigo bg-brand-indigo/10 text-brand-indigo font-bold`).

### 5. LTR / RTL Language Switcher Dropdown Positioning
- **Corrected Tailwind Variants in `LanguageSwitcher.tsx`**:
  - Replaced unsupported `ltr:right-0 rtl:left-0` with `right-0 rtl:right-auto rtl:left-0 origin-top-right rtl:origin-top-left`, ensuring standard right-anchored alignment across all browsers in LTR mode, and proper left-anchored alignment in Arabic RTL.

---

### Verification & Quality Gates
- `npm run type-check`: 0 TypeScript errors.
- `npm run lint`: 0 ESLint warnings or errors.
- `npm run build`: 70/70 static routes compiled successfully.
- Playwright automated multi-viewport capture (`scripts/capture-fixed-navbar.mjs`):
  - Verified 1440px Desktop, 1024px Tablet, 768px Tablet, 390px Mobile, and 390px Mobile Drawer.
  - Verified Arabic RTL layout on `/uae`.
  - Confirmed 0 pointer interceptions and 0 console errors.
- **Screenshots Saved**:
  - `docs/screenshots/navbar-fixed-1440.png`
  - `docs/screenshots/navbar-fixed-page-1440.png`
  - `docs/screenshots/navbar-fixed-1024.png`
  - `docs/screenshots/navbar-fixed-768.png`
  - `docs/screenshots/navbar-fixed-390.png`
  - `docs/screenshots/navbar-fixed-drawer-390.png`
  - `docs/screenshots/navbar-fixed-arabic-1440.png`
