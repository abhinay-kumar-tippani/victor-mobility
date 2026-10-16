"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import type { SupportedLocale, LocaleMeta, TranslationDictionary } from "./types";
import { SUPPORTED_LOCALES } from "./types";
import { enDictionary } from "./dictionaries/en";
import { hiDictionary } from "./dictionaries/hi";
import { teDictionary } from "./dictionaries/te";

const DICTIONARIES: Record<SupportedLocale, TranslationDictionary> = {
  en: enDictionary,
  hi: hiDictionary,
  te: teDictionary,
};

const STORAGE_KEY = "victor_locale";
const COOKIE_NAME = "victor_locale";

interface LanguageContextValue {
  locale: SupportedLocale;
  setLocale: (newLocale: SupportedLocale) => void;
  dict: TranslationDictionary;
  locales: LocaleMeta[];
  isHydrated: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getSavedLocale(): SupportedLocale | null {
  if (typeof window === "undefined") return null;
  try {
    const local = localStorage.getItem(STORAGE_KEY) as SupportedLocale | null;
    if (local && (local === "en" || local === "hi" || local === "te")) {
      return local;
    }
    // Check cookie fallback
    const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
    if (match) {
      const val = decodeURIComponent(match[1]) as SupportedLocale;
      if (val === "en" || val === "hi" || val === "te") return val;
    }
  } catch {
    // ignore security/storage errors
  }
  return null;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>("en");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = getSavedLocale();
    if (saved) {
      setLocaleState(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = "ltr";
    } else {
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
    }
    setIsHydrated(true);
  }, []);

  const setLocale = useCallback((newLocale: SupportedLocale) => {
    if (newLocale !== "en" && newLocale !== "hi" && newLocale !== "te") return;
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.cookie = `${COOKIE_NAME}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = newLocale;
      document.documentElement.dir = "ltr";
    } catch {
      // ignore
    }
  }, []);

  const dict = useMemo(() => {
    return DICTIONARIES[locale] || enDictionary;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      dict,
      locales: SUPPORTED_LOCALES,
      isHydrated,
    }),
    [locale, setLocale, dict, isHydrated]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Return safe default if rendered outside provider (e.g. UAE routes or isolation)
    return {
      locale: "en",
      setLocale: () => {},
      dict: enDictionary,
      locales: SUPPORTED_LOCALES,
      isHydrated: true,
    };
  }
  return ctx;
}
