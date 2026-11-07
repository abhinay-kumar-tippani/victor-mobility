# Current Task: Update Navbar Phone Number to +91 91007 77768 — 7 November 2026

Owner: Antigravity, at direct user request. Status: COMPLETED.

## Summary of Accomplished Requirements:

### 1. Updated Navbar Phone Number to +91 91007 77768
- **Primary Layout Header ([`src/components/layout/Header.tsx`](file:///d:/victor%20website/src/components/layout/Header.tsx))**:
  - Calibrated `navPhoneDisplay` and `navPhoneHref` for the navbar CTA actions.
  - On `/india` routes, the desktop call button, mobile header phone action, and mobile navigation drawer now explicitly link to `tel:+919100777768` and display `+91 91007 77768`.
  - Regional isolation preserved for UAE (`/uae`), retaining the UAE Operations Desk number (`+971 52 455 2441`).
- **Data Source Update ([`src/content/india.json`](file:///d:/victor%20website/src/content/india.json))**:
  - Replaced legacy contact phone details with Muhammad Asif (`+91 91007 77768`, `tel:+919100777768`, and WhatsApp `919100777768`), ensuring consistency across all subpages.
- **Related Contact Touchpoints**:
  - Standardized phone display formatting in [`src/components/layout/StickyContactRail.tsx`](file:///d:/victor%20website/src/components/layout/StickyContactRail.tsx), [`src/components/layout/Footer.tsx`](file:///d:/victor%20website/src/components/layout/Footer.tsx), and [`src/components/contact/ImmediateAssistanceCard.tsx`](file:///d:/victor%20website/src/components/contact/ImmediateAssistanceCard.tsx).

### 2. Verification & Quality Gates
- `npm run type-check`: 0 TypeScript errors.
- `npm run lint`: 0 ESLint warnings or errors.
- `npm run build`: 73/73 static pages compiled successfully.
- Automated Playwright verification (`scripts/verify-navbar-phone.mjs`):
  - Desktop India navbar: text `+91 91007 77768`, href `tel:+919100777768`.
  - Mobile India navbar: aria-label `Call +91 91007 77768`, href `tel:+919100777768`.
  - Mobile India drawer: text `Call +91 91007 77768`, href `tel:+919100777768`.
  - UAE navbar: verified `+971 52 455 2441` with `tel:+971524552441`.
  - Visual verification captured in `docs/screenshots/navbar-phone-india-desktop.png` and `docs/screenshots/navbar-phone-india-mobile.png`.
