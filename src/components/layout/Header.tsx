"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
import type { ContactData } from "@/types/content";
import BrandLogo from "@/components/brand/BrandLogo";
import { selectEnquiryOption } from "@/lib/enquiryEvents";

interface HeaderProps {
  contact: ContactData;
}

export default function Header({ contact }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/india" || pathname === "/";

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  const navItems = [
    { label: "Services", href: "/india/services", hash: "#services" },
    { label: "Fleet", href: "/india/fleet", hash: "#fleet" },
    { label: "Network", href: isHomepage ? "#network" : "/india#network" },
    { label: "About", href: "/india/about", hash: "#about" },
    { label: "Contact", href: "/india/contact", hash: "#contact" },
  ];

  // Helper to close menu and clean up
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

      // Lock scrolling and make background content inert
      document.body.style.overflow = "hidden";
      if (mainEl) {
        mainEl.setAttribute("inert", "");
        mainEl.setAttribute("aria-hidden", "true");
      }
      if (footerEl) {
        footerEl.setAttribute("inert", "");
        footerEl.setAttribute("aria-hidden", "true");
      }

      // Move focus into the first interactive element inside drawer
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

      // Keyboard trap and Escape listener
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
        // Robust cleanup on unmount
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

  const handleNavClick = (href: string) => {
    closeMenu(false);

    if (href.startsWith("#") && isHomepage) {
      if (href === "#contact") {
        selectEnquiryOption({});
        return;
      }
      const targetId = href.replace("#", "");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        targetElement.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
        setTimeout(() => {
          targetElement.focus();
        }, prefersReduced ? 50 : 350);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-soft-neutral shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo container: Crisp white background, non-destructive viewport for enlarged tagline & Pegasus */}
          <Link
            href="/india"
            className="flex items-center group py-2 focus:outline-none focus:ring-2 focus:ring-brand-indigo rounded"
            aria-label="Victor Mobility - Home"
          >
            <BrandLogo className="w-48 sm:w-56 h-12 sm:h-14 transition-transform duration-150 group-hover:scale-102" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-semibold transition-colors duration-150 py-2 focus:outline-none focus:ring-2 focus:ring-brand-indigo rounded px-1 ${
                    active
                      ? "text-brand-indigo underline underline-offset-4 font-bold"
                      : "text-brand-ink/80 hover:text-brand-indigo"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={contact.phoneHref}
              className="inline-flex items-center gap-2 text-xs font-semibold text-brand-indigo hover:text-brand-blue transition-colors px-3 py-2 rounded-lg border border-brand-indigo/20 hover:border-brand-indigo/40 focus:outline-none focus:ring-2 focus:ring-brand-indigo"
              title={`Call ${contact.phoneDisplay}`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{contact.phoneDisplay}</span>
            </a>
            <Link
              href="/india/contact"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold bg-brand-indigo hover:bg-brand-blue text-white px-5 py-2.5 rounded-lg shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-indigo"
            >
              Discuss Requirement
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={contact.phoneHref}
              className="p-2.5 text-brand-indigo rounded-lg hover:bg-brand-warm-white focus:outline-none focus:ring-2 focus:ring-brand-indigo"
              aria-label={`Call ${contact.phoneDisplay}`}
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => {
                if (mobileMenuOpen) {
                  closeMenu(true);
                } else {
                  setMobileMenuOpen(true);
                }
              }}
              className="p-2.5 text-brand-ink rounded-lg hover:bg-brand-warm-white focus:outline-none focus:ring-2 focus:ring-brand-indigo min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with Focus Containment */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-x-0 top-20 sm:top-24 bottom-0 z-40 bg-brand-ink/40 backdrop-blur-sm"
          onClick={() => closeMenu(true)}
          aria-hidden={!mobileMenuOpen}
        >
          <div
            id="mobile-navigation-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            className="bg-white border-b border-brand-soft-neutral px-6 pt-4 pb-8 space-y-4 shadow-xl max-h-[calc(100vh-5rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-brand-soft-neutral">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                Menu
              </span>
              <button
                type="button"
                onClick={() => closeMenu(true)}
                className="p-1.5 text-brand-ink/70 hover:text-brand-ink rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-indigo"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1 divide-y divide-brand-soft-neutral">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="block text-base font-semibold text-brand-ink hover:text-brand-indigo py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-indigo rounded px-1"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/india/privacy"
                onClick={() => closeMenu(false)}
                className="block text-sm font-medium text-brand-ink/70 hover:text-brand-indigo py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-indigo rounded px-1"
              >
                Privacy Notice
              </Link>
            </div>

            <div className="pt-4 space-y-3">
              <Link
                href="/india/contact"
                onClick={() => closeMenu(false)}
                className="w-full flex items-center justify-center gap-2 text-sm font-bold bg-brand-indigo hover:bg-brand-blue text-white py-3 px-4 rounded-lg text-center transition-colors focus:outline-none focus:ring-2 focus:ring-brand-indigo"
              >
                <MessageSquare className="w-4 h-4" />
                Discuss Requirement
              </Link>
              <a
                href={contact.phoneHref}
                className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-brand-indigo border border-brand-indigo/30 hover:bg-brand-warm-white py-2.5 px-4 rounded-lg text-center transition-colors focus:outline-none focus:ring-2 focus:ring-brand-indigo"
              >
                <Phone className="w-4 h-4" />
                Call {contact.phoneDisplay}
              </a>
            </div>

            <div className="pt-2 text-xs text-brand-ink/60 text-center">
              Hyderabad · Bengaluru · Pune
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
