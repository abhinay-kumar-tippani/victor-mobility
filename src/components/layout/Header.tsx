"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
import type { ContactData } from "@/types/content";
import BrandLogo from "@/components/brand/BrandLogo";
import LanguageSwitcher, { MobileDrawerLanguageSelector } from "@/components/layout/LanguageSwitcher";
import StickyContactRail from "@/components/layout/StickyContactRail";
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
    : `${basePrefix}/contact#email-enquiry`;

  const navItems = [
    { label: dict.nav.home || "Home", href: basePrefix },
    { label: dict.nav.services || "Services", href: `${basePrefix}/services` },
    { label: dict.nav.fleet || "Fleet", href: `${basePrefix}/fleet` },
    { label: dict.nav.estimator || "Estimator", href: `${basePrefix}/estimator` },
    { label: dict.nav.rfp || "RFP Desk", href: `${basePrefix}/rfp` },
    { label: dict.nav.about || "About", href: `${basePrefix}/about` },
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
    <header className="sticky top-0 z-50 bg-white border-b border-brand-soft-neutral shadow-xs transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[72px] gap-2">
          {/* Logo container: Crisp white background, intact Victor Artwork & Tagline */}
          <Link
            href={basePrefix}
            className="flex items-center group py-1 focus:outline-none focus:ring-2 focus:ring-brand-indigo rounded shrink-0"
            aria-label="Victor Mobility - Home"
          >
            <BrandLogo className="h-11 sm:h-[52px] aspect-[810/430] transition-transform duration-150 group-hover:scale-102" />
          </Link>

          {/* Main destinations and India planning tools */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2 whitespace-nowrap"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const active = isItemActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`min-h-[44px] inline-flex items-center text-xs xl:text-sm font-semibold transition-all duration-150 px-2 xl:px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-indigo ${
                    active
                      ? "bg-brand-indigo text-white shadow-xs hover:bg-brand-blue"
                      : "text-brand-ink/80 hover:text-brand-indigo hover:bg-brand-indigo/10 active:bg-brand-indigo active:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTAs: Language Switcher, Direct Call & Request Quote */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-3.5 whitespace-nowrap shrink-0">
            <LanguageSwitcher id="desktop-language-switcher" />

            <a
              href={contact.phoneHref}
              className="hidden xl:inline-flex items-center gap-2 text-xs font-semibold text-brand-indigo hover:text-brand-blue transition-colors px-3 py-2 rounded-xl border border-brand-indigo/20 hover:border-brand-indigo/40 focus:outline-none focus:ring-2 focus:ring-brand-indigo min-h-[44px]"
              title={`${dict.nav.call || "Call"} ${contact.phoneDisplay}`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span dir="ltr">{contact.phoneDisplay}</span>
            </a>

            <Link
              href={`${basePrefix}/contact`}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-brand-indigo hover:bg-brand-blue text-white px-4 xl:px-5 py-2.5 rounded-xl shadow-xs transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-indigo min-h-[44px]"
            >
              {dict.nav.enquire || "Enquire"}
            </Link>
          </div>

          {/* Mobile Menu Actions: Compact Language Switcher, Call, Drawer Trigger */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            <LanguageSwitcher id="mobile-language-switcher" compactOnMobile={true} />

            <a
              href={contact.phoneHref}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-brand-indigo rounded-xl hover:bg-brand-warm-white focus:outline-none focus:ring-2 focus:ring-brand-indigo transition-colors"
              aria-label={`${dict.nav.call || "Call"} ${contact.phoneDisplay}`}
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
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-x-0 top-16 sm:top-[72px] bottom-0 z-40 bg-brand-ink/40 backdrop-blur-xs"
          onClick={() => closeMenu(true)}
          aria-hidden={!mobileMenuOpen}
        >
          <div
            id="mobile-navigation-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            className="bg-white border-b border-brand-soft-neutral px-6 pt-5 pb-8 space-y-5 shadow-xl max-h-[calc(100dvh-4rem)] sm:max-h-[calc(100dvh-4.5rem)] overflow-y-auto text-start"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-brand-soft-neutral pb-3">
              <span className="text-sm font-bold text-brand-ink">
                {dict.nav.menuLabel}
              </span>
              <button
                type="button"
                onClick={() => closeMenu(true)}
                aria-label={dict.nav.closeMenu}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-brand-indigo focus:outline-none focus:ring-2 focus:ring-brand-indigo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const active = isItemActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => closeMenu(false)}
                    aria-current={active ? "page" : undefined}
                    className={`block text-base sm:text-lg font-semibold py-3 px-4 rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-indigo ${
                      active
                        ? "bg-brand-indigo text-white font-bold shadow-xs hover:bg-brand-blue"
                        : "text-brand-ink hover:text-brand-indigo hover:bg-brand-indigo/10 active:bg-brand-indigo active:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href={`${basePrefix}/privacy`}
                onClick={() => closeMenu(false)}
                className="block text-sm font-medium text-brand-ink/70 hover:text-brand-indigo hover:bg-brand-indigo/5 py-2.5 px-4 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-brand-indigo"
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
                href={contact.phoneHref}
                className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-brand-indigo border border-brand-indigo/30 hover:bg-brand-warm-white py-3 px-4 rounded-xl text-center transition-colors focus:outline-none focus:ring-2 focus:ring-brand-indigo"
              >
                <Phone className="w-4 h-4" />
                <span dir="ltr">
                  {dict.nav.call || "Call"} {contact.phoneDisplay}
                </span>
              </a>
            </div>

            <div className="pt-2 text-xs text-brand-ink/60 text-center font-medium">
              {isIndia ? "Hyderabad · Bengaluru · Pune" : "Dubai · Abu Dhabi · Sharjah"}
            </div>
          </div>
        </div>
      )}

      {!mobileMenuOpen && (
        <StickyContactRail
          phoneHref={contact.phoneHref}
          whatsappHref={whatsappHref}
          emailHref={emailHref}
        />
      )}
    </header>
  );
}
