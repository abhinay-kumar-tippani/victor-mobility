"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLocale } from "@/i18n/types";

interface LanguageSwitcherProps {
  id?: string;
  className?: string;
  compactOnMobile?: boolean;
}

export default function LanguageSwitcher({
  id = "language-switcher-trigger",
  className = "",
  compactOnMobile = false,
}: LanguageSwitcherProps) {
  const { locale, setLocale, locales, dict } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const currentLocale = locales.find((l) => l.code === locale) || locales[0];

  const closeDropdown = useCallback((restoreFocus = true) => {
    setIsOpen(false);
    if (restoreFocus) {
      triggerRef.current?.focus();
    }
  }, []);

  const selectLocale = useCallback(
    (code: SupportedLocale) => {
      setLocale(code);
      closeDropdown(true);
    },
    [setLocale, closeDropdown]
  );

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeDropdown(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeDropdown]);

  // Handle keyboard events when dropdown is open
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
        const idx = locales.findIndex((l) => l.code === locale);
        setHighlightedIndex(idx >= 0 ? idx : 0);
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        closeDropdown(true);
        break;
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % locales.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 + locales.length) % locales.length);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        selectLocale(locales[highlightedIndex].code);
        break;
      case "Tab":
        closeDropdown(false);
        break;
      default:
        break;
    }
  };

  // Keep highlighted item in view
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const items = menuRef.current.querySelectorAll<HTMLLIElement>('[role="option"]');
      if (items[highlightedIndex]) {
        items[highlightedIndex].scrollIntoView({ block: "nearest" });
      }
    }
  }, [isOpen, highlightedIndex]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left ${className}`}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={triggerRef}
        type="button"
        id={id}
        onClick={() => {
          setIsOpen((prev) => !prev);
          const idx = locales.findIndex((l) => l.code === locale);
          setHighlightedIndex(idx >= 0 ? idx : 0);
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-menu`}
        aria-label={`${dict.nav.changeLanguage}. Current: ${currentLocale.name}`}
        className="min-h-[44px] px-3 py-2 bg-white hover:bg-brand-warm-white text-brand-ink rounded-xl border border-brand-soft-neutral hover:border-brand-indigo/30 transition-all duration-150 inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-indigo shadow-2xs select-none"
      >
        <Globe
          className="w-4 h-4 text-brand-indigo shrink-0"
          aria-hidden="true"
        />
        <span className={`text-xs font-semibold ${compactOnMobile ? "hidden sm:inline" : ""}`}>
          {currentLocale.nativeName}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-brand-ink/60 transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 sm:w-52 origin-top-right bg-white rounded-2xl shadow-xl border border-brand-soft-neutral py-2 px-1 z-50 animate-in fade-in zoom-in-95 duration-150"
          role="presentation"
        >
          <div className="px-3 py-1.5 border-b border-brand-soft-neutral/60 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-brand-ink/50">
              {dict.nav.selectLanguage}
            </span>
          </div>

          <ul
            id={`${id}-menu`}
            ref={menuRef}
            role="listbox"
            aria-label={dict.nav.selectLanguage}
            tabIndex={-1}
            className="space-y-0.5"
          >
            {locales.map((item, index) => {
              const isSelected = item.code === locale;
              const isHighlighted = index === highlightedIndex;

              return (
                <li
                  key={item.code}
                  role="option"
                  id={`language-option-${item.code}`}
                  aria-selected={isSelected}
                  onClick={() => selectLocale(item.code)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`min-h-[42px] cursor-pointer flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm transition-colors duration-100 select-none ${
                    isSelected
                      ? "bg-brand-indigo/10 text-brand-indigo font-bold"
                      : isHighlighted
                      ? "bg-brand-warm-white text-brand-indigo font-medium"
                      : "text-brand-ink hover:bg-brand-warm-white hover:text-brand-indigo font-medium"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">{item.nativeName}</span>
                    {item.nativeName !== item.name && (
                      <span className="text-[10px] text-brand-ink/55 font-normal">
                        {item.name}
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    <Check
                      className="w-4 h-4 text-brand-indigo shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

/**
 * Mobile Drawer Language Selector Component
 * Dedicated full-width display for the navigation drawer
 */
export function MobileDrawerLanguageSelector() {
  const { locale, setLocale, locales, dict } = useLanguage();

  return (
    <div className="pt-2 border-t border-brand-soft-neutral">
      <div className="flex items-center gap-2 mb-2 px-1">
        <Globe className="w-4 h-4 text-brand-indigo" aria-hidden="true" />
        <span className="text-xs font-bold uppercase tracking-wider text-brand-ink/70">
          {dict.nav.selectLanguage}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {locales.map((item) => {
          const isSelected = item.code === locale;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => setLocale(item.code)}
              aria-pressed={isSelected}
              className={`min-h-[44px] flex flex-col items-center justify-center p-2 rounded-xl text-xs transition-all border ${
                isSelected
                  ? "bg-brand-indigo text-white border-brand-indigo font-bold shadow-xs"
                  : "bg-brand-warm-white/60 hover:bg-white text-brand-ink border-brand-soft-neutral hover:border-brand-indigo/30 font-medium"
              }`}
            >
              <span className="text-sm">{item.nativeName}</span>
              <span
                className={`text-[10px] ${
                  isSelected ? "text-white/80" : "text-brand-ink/60"
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
