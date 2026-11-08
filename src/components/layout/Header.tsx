"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
import type { ContactData } from "@/types/content";
import BrandLogo from "@/components/brand/BrandLogo";
import LanguageSwitcher, { MobileDrawerLanguageSelector } from "@/components/layout/LanguageSwitcher";
import StickyContactRail from "@/components/layout/StickyContactRail";
import SeasonalGreetingBanner from "@/components/layout/SeasonalGreetingBanner";
import { useLanguage } from "@/i18n/LanguageContext";

interface HeaderProps {
  contact: ContactData;
}

export default function Header({ contact }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const basePrefix = pathname.startsWith("/uae") ? "/uae" : "/india";
  const { dict } = useLanguage();

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  const isIndia = basePrefix === "/india";
  const whatsappMessage = isIndia
    ? "Hello Victor Mobility, I would like to discuss a transport requirement."
    : "Hello Victor Mobility UAE, I would like to discuss a transport requirement.";
  const whatsappHref = `${contact.whatsappBaseUrl}?text=${encodeURIComponent(whatsappMessage)}`;
  const emailHref = contact.emailEnabled
    ? `mailto:${contact.printedEmail}`
    : `${basePrefix}/contact?channel=email`;

  const asifPhoneHref = "tel:+919100777768";
  const asifPhoneDisplay = "+91 91007 77768";
  const asifWhatsappMessage = isIndia
    ? "Hello Muhammad Asif, I would like to discuss a transport requirement with Victor Mobility."
    : "Hello Muhammad Asif, I would like to discuss UAE transport arrangements with Victor Mobility.";
  const asifWhatsappHref = `https://wa.me/919100777768?text=${encodeURIComponent(asifWhatsappMessage)}`;
  const asifEmailHref = `mailto:asif@victorluxurylimousine.com?subject=${encodeURIComponent(
    "Transport Enquiry for Muhammad Asif — Victor Mobility"
  )}`;

  // Navbar phone destination & display: India routes to +91 91007 77768; UAE routes to configured UAE Operations Desk
  const navPhoneDisplay = isIndia ? asifPhoneDisplay : (contact.phoneDisplay || "+971 52 455 2441");
  const navPhoneHref = isIndia ? asifPhoneHref : (contact.phoneHref || "tel:+971524552441");

  // Contact Rail Destinations: India routes to Muhammad Asif; UAE routes to configured UAE Operations Desk
  const contactRailPhoneHref = isIndia
    ? asifPhoneHref
    : (contact.phoneHref || "tel:+971524552441");

  const uaeDeskWhatsappMessage = isIndia
    ? "Hello Victor Mobility, I would like to discuss a transport requirement."
    : "Hello Victor Mobility UAE, I would like to discuss UAE transport arrangements.";

  const contactRailWhatsappHref = isIndia
    ? asifWhatsappHref
    : `${contact.whatsappBaseUrl || `https://wa.me/${contact.whatsappDigits || "971524552441"}`}?text=${encodeURIComponent(
        uaeDeskWhatsappMessage
      )}`;

  const contactRailEmailHref = isIndia
    ? asifEmailHref
    : (contact.emailEnabled && contact.printedEmail
        ? `mailto:${contact.printedEmail}?subject=${encodeURIComponent(
            "Transport Enquiry — Victor Mobility UAE"
          )}`
        : `${basePrefix}/contact?channel=email`);

  const contactRailPhoneLabel = isIndia
    ? "Call Muhammad Asif (+91 91007 77768)"
    : `${dict.nav.call || "Call"} ${contact.phoneDisplay || "+971 52 455 2441"}`;

  const contactRailWhatsappLabel = isIndia
    ? "WhatsApp Muhammad Asif (+91 91007 77768)"
    : `WhatsApp ${contact.name || "UAE Operations Desk"} (${contact.whatsappDisplay || "+971 52 455 2441"})`;

  const contactRailEmailLabel = isIndia
    ? "Email Muhammad Asif (asif@victorluxurylimousine.com)"
    : `Email ${contact.name || "UAE Operations Desk"} (${contact.printedEmail || "info@victorluxurylimousine.com"})`;

  const navItems = [
    { label: dict.nav.home || "Home", href: basePrefix },
    { label: dict.nav.services || "Services", href: `${basePrefix}/services` },
    { label: dict.nav.fleet || "Fleet", href: `${basePrefix}/fleet` },
    { label: dict.nav.about || "About", href: `${basePrefix}/about` },
    ...(isIndia
      ? [
          { label: dict.nav.achievements || "Achievements", href: `${basePrefix}/achievements` },
          { label: dict.nav.driverTraining || "Driver Training", href: `${basePrefix}/driver-training` },
        ]
      : []),
    { label: dict.nav.contact || "Contact", href: `${basePrefix}/contact` },
  ];

  const isItemActive = (href: string) => {
    if (href === basePrefix) {
      return pathname === basePrefix || pathname === "/";
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  const closeMenu = (restoreTriggerFocus = true) => {
    setMobileMenuOpen(false);
    document.body.style.overflow = "unset";
    const mainEl = document.getElementById("main-content");
    const footerEl = document.querySelector("footer");
    if (mainEl) {
      mainEl.removeAttribute("inert");
      mainEl.removeAttribute("aria-hidden");
    }
    if (footerEl) {
      footerEl.removeAttribute("inert");
      footerEl.removeAttribute("aria-hidden");
    }
    if (restoreTriggerFocus) {
      setTimeout(() => {
        menuButtonRef.current?.focus();
      }, 50);
    }
  };

  // Auto-close menu when resized to desktop (>= 1024px)
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches && mobileMenuOpen) {
        closeMenu(false);
      }
    };

    if (mql.matches && mobileMenuOpen) {
      closeMenu(false);
    }

    if (mql.addEventListener) {
      mql.addEventListener("change", handleMediaChange);
    } else {
      mql.addListener(handleMediaChange);
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handleMediaChange);
      } else {
        mql.removeListener(handleMediaChange);
      }
    };
  }, [mobileMenuOpen]);

  // Manage inertness of background elements, focus trap, and focus restoration
  useEffect(() => {
    const mainEl = document.getElementById("main-content");
    const footerEl = document.querySelector("footer");

    if (mobileMenuOpen) {
      lastActiveElementRef.current = document.activeElement as HTMLElement | null;

      document.body.style.overflow = "hidden";
      if (mainEl) {
        mainEl.setAttribute("inert", "");
        mainEl.setAttribute("aria-hidden", "true");
      }
      if (footerEl) {
        footerEl.setAttribute("inert", "");
        footerEl.setAttribute("aria-hidden", "true");
      }

      setTimeout(() => {
        if (drawerRef.current) {
          const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length > 0) {
            focusable[0].focus();
          }
        }
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          closeMenu(true);
          return;
        }

        if (e.key === "Tab" && drawerRef.current) {
          const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusables.length === 0) return;

          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "unset";
        if (mainEl) {
          mainEl.removeAttribute("inert");
          mainEl.removeAttribute("aria-hidden");
        }
        if (footerEl) {
          footerEl.removeAttribute("inert");
          footerEl.removeAttribute("aria-hidden");
        }
      };
    } else {
      document.body.style.overflow = "unset";
      if (mainEl) {
        mainEl.removeAttribute("inert");
        mainEl.removeAttribute("aria-hidden");
      }
      if (footerEl) {
        footerEl.removeAttribute("inert");
        footerEl.removeAttribute("aria-hidden");
      }
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-soft-neutral shadow-xs transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[74px] gap-2 sm:gap-4">
            {/* Logo container: Crisp white background, intact Victor Artwork & Tagline */}
            <Link
              href={basePrefix}
              className="flex items-center group py-1 focus:outline-none focus:ring-2 focus:ring-brand-indigo rounded shrink-0"
              aria-label="Victor Mobility - Home"
            >
              <BrandLogo className="h-12 sm:h-[58px] aspect-[810/430] transition-transform duration-150 group-hover:scale-102" />
            </Link>

            {/* Main navigation destinations: evenly spread with increased text size */}
            <nav
              className="hidden lg:flex flex-1 items-center justify-evenly mx-1 xl:mx-4 2xl:mx-6 whitespace-nowrap"
              aria-label="Main Navigation"
            >
              {navItems.map((item) => {
                const active = isItemActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`min-h-[40px] xl:min-h-[44px] inline-flex items-center text-xs lg:text-[13px] xl:text-sm 2xl:text-base font-semibold transition-all duration-150 px-2 lg:px-2.5 xl:px-3.5 2xl:px-4 py-1.5 xl:py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-indigo ${
                      active
                        ? "text-brand-indigo font-bold bg-brand-indigo/10 border border-brand-indigo/15 shadow-2xs"
                        : "text-brand-ink/85 hover:text-brand-indigo hover:bg-brand-indigo/8 active:bg-brand-indigo/15"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTAs: Language Switcher, Direct Call & Request Quote */}
            <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 whitespace-nowrap shrink-0">
              <LanguageSwitcher id="desktop-language-switcher" />

              <a
                href={navPhoneHref}
                className="hidden xl:inline-flex items-center gap-2 text-xs font-semibold text-brand-indigo hover:text-brand-blue hover:bg-brand-indigo/5 transition-colors px-3 py-2 rounded-xl border border-brand-indigo/20 hover:border-brand-indigo/40 focus:outline-none focus:ring-2 focus:ring-brand-indigo min-h-[42px]"
                title={`${dict.nav.call || "Call"} ${navPhoneDisplay}`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span dir="ltr">{navPhoneDisplay}</span>
              </a>

              <Link
                href={`${basePrefix}/contact`}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-brand-indigo hover:bg-brand-blue text-white px-4 xl:px-5 py-2.5 rounded-xl shadow-xs transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-indigo min-h-[42px]"
              >
                {dict.nav.enquire || "Enquire"}
              </Link>
            </div>

            {/* Mobile Menu Actions: Compact Language Switcher, Call, Drawer Trigger */}
            <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
              <LanguageSwitcher id="mobile-language-switcher" compactOnMobile={true} />

              <a
                href={navPhoneHref}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-brand-indigo rounded-xl hover:bg-brand-warm-white focus:outline-none focus:ring-2 focus:ring-brand-indigo transition-colors"
                aria-label={`${dict.nav.call || "Call"} ${navPhoneDisplay}`}
              >
                <Phone className="w-5 h-5" />
              </a>

              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-brand-ink rounded-xl hover:bg-brand-warm-white focus:outline-none focus:ring-2 focus:ring-brand-indigo transition-colors"
                aria-label={mobileMenuOpen ? dict.nav.closeMenu : dict.nav.menuLabel}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-drawer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-brand-indigo" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-x-0 top-16 sm:top-[74px] bottom-0 z-40 bg-brand-ink/40 backdrop-blur-xs"
            onClick={() => closeMenu(true)}
            aria-hidden={!mobileMenuOpen}
          >
            <div
              id="mobile-navigation-drawer"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
              className="bg-white border-b border-brand-soft-neutral px-6 pt-4 pb-8 space-y-4 shadow-xl max-h-[calc(100dvh-4rem)] sm:max-h-[calc(100dvh-4.75rem)] overflow-y-auto text-start"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-brand-soft-neutral pb-2.5">
                <span className="text-xs font-bold tracking-wider uppercase text-brand-ink/60">
                  {dict.nav.menuLabel}
                </span>
                <span className="text-xs font-semibold text-brand-indigo">
                  Victor Mobility
                </span>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const active = isItemActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => closeMenu(false)}
                      aria-current={active ? "page" : undefined}
                      className={`block text-base sm:text-lg font-semibold py-2.5 px-4 rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-indigo ${
                        active
                          ? "bg-brand-indigo/10 text-brand-indigo font-bold border-l-4 rtl:border-l-0 rtl:border-r-4 border-brand-indigo"
                          : "text-brand-ink hover:text-brand-indigo hover:bg-brand-indigo/5 active:bg-brand-indigo/10"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  href={`${basePrefix}/privacy`}
                  onClick={() => closeMenu(false)}
                  className="block text-sm font-medium text-brand-ink/70 hover:text-brand-indigo hover:bg-brand-indigo/5 py-2 px-4 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-brand-indigo"
                >
                  {dict.nav.privacy}
                </Link>
              </nav>

              {/* Prominent Mobile Drawer Language Switcher */}
              <MobileDrawerLanguageSelector />

              <div className="pt-2 space-y-3">
                <Link
                  href={`${basePrefix}/contact`}
                  onClick={() => closeMenu(false)}
                  className="w-full flex items-center justify-center gap-2 text-sm font-bold bg-brand-indigo hover:bg-brand-blue text-white py-3.5 px-4 rounded-xl text-center transition-colors focus:outline-none focus:ring-2 focus:ring-brand-indigo shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{dict.nav.discussRequirement || "Discuss Your Requirement"}</span>
                </Link>
                <a
                  href={navPhoneHref}
                  className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-brand-indigo border border-brand-indigo/30 hover:bg-brand-warm-white py-3 px-4 rounded-xl text-center transition-colors focus:outline-none focus:ring-2 focus:ring-brand-indigo"
                >
                  <Phone className="w-4 h-4" />
                  <span dir="ltr">
                    {dict.nav.call || "Call"} {navPhoneDisplay}
                  </span>
                </a>
              </div>

              <div className="pt-2 text-xs text-brand-ink/60 text-center font-medium">
                {isIndia ? "Hyderabad · Bengaluru · Pune" : "Dubai · Abu Dhabi · Sharjah"}
              </div>
            </div>
          </div>
        )}
      </header>

      <SeasonalGreetingBanner />

      {!mobileMenuOpen && (
        <StickyContactRail
          phoneHref={contactRailPhoneHref}
          whatsappHref={contactRailWhatsappHref}
          emailHref={contactRailEmailHref}
          phoneLabel={contactRailPhoneLabel}
          whatsappLabel={contactRailWhatsappLabel}
          emailLabel={contactRailEmailLabel}
        />
      )}
    </>
  );
}
