"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
import type { ContactData } from "@/types/content";

interface HeaderProps {
  contact: ContactData;
}

export default function Header({ contact }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: "Services", href: "#services" },
    { label: "Employee Transport", href: "#employee-transport" },
    { label: "Fleet", href: "#fleet" },
    { label: "Network", href: "#network" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-soft-neutral/80 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo container: Crisp white background, preserving intact original logo */}
          <Link
            href="/india"
            className="flex items-center group py-2 focus:outline-none focus:ring-2 focus:ring-brand-indigo rounded"
            aria-label="Victor Mobility - Home"
          >
            <div className="relative h-14 sm:h-16 w-44 sm:w-52 transition-transform duration-150 group-hover:opacity-95">
              <Image
                src="/brand/victor-original.png"
                alt="Victor Mobility - On Time Every Time."
                fill
                priority
                sizes="(max-width: 640px) 176px, 208px"
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-semibold text-brand-ink/80 hover:text-brand-indigo transition-colors duration-150 py-2"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={contact.phoneHref}
              className="inline-flex items-center gap-2 text-xs font-semibold text-brand-indigo hover:text-brand-blue transition-colors px-3 py-2 rounded-lg border border-brand-indigo/20 hover:border-brand-indigo/40"
              title={`Call ${contact.phoneDisplay}`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{contact.phoneDisplay}</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold bg-brand-indigo hover:bg-brand-blue text-white px-5 py-2.5 rounded-lg shadow-sm transition-colors duration-150"
            >
              Discuss Requirement
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={contact.phoneHref}
              className="p-2.5 text-brand-indigo rounded-lg hover:bg-brand-soft-neutral/30 focus:outline-none"
              aria-label={`Call ${contact.phoneDisplay}`}
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-brand-ink rounded-lg hover:bg-brand-soft-neutral/40 focus:outline-none focus:ring-2 focus:ring-brand-indigo min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-x-0 top-20 sm:top-24 bottom-0 z-40 bg-brand-ink/40 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-white border-b border-brand-soft-neutral px-6 pt-4 pb-8 space-y-4 shadow-xl max-h-[calc(100vh-5rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1 divide-y divide-brand-soft-neutral/40">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleNavClick}
                  className="block text-base font-semibold text-brand-ink hover:text-brand-indigo py-3 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="pt-4 space-y-3">
              <a
                href="#contact"
                onClick={handleNavClick}
                className="w-full flex items-center justify-center gap-2 text-sm font-bold bg-brand-indigo hover:bg-brand-blue text-white py-3 px-4 rounded-lg text-center transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Discuss Requirement
              </a>
              <a
                href={contact.phoneHref}
                className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-brand-indigo border border-brand-indigo/30 hover:bg-brand-warm-white py-2.5 px-4 rounded-lg text-center transition-colors"
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
