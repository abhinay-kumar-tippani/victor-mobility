"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { usePathname } from "next/navigation";
import type { SupportedLocale, LocaleMeta, TranslationDictionary, Region } from "./types";
import { INDIA_LOCALES, UAE_LOCALES, SUPPORTED_LOCALES } from "./types";
import { enDictionary } from "./dictionaries/en";
import { hiDictionary } from "./dictionaries/hi";
import { teDictionary } from "./dictionaries/te";
import { arDictionary } from "./dictionaries/ar";

const DICTIONARIES: Record<SupportedLocale, TranslationDictionary> = {
  en: enDictionary,
  hi: hiDictionary,
  te: teDictionary,
  ar: arDictionary,
};

const STORAGE_KEY_INDIA = "victor_locale_india";
const STORAGE_KEY_INDIA_LEGACY = "victor_locale";
const STORAGE_KEY_UAE = "victor_locale_uae";

const COOKIE_NAME_INDIA = "victor_locale_india";
const COOKIE_NAME_UAE = "victor_locale_uae";

interface LanguageContextValue {
  locale: SupportedLocale;
  setLocale: (newLocale: SupportedLocale) => void;
  dict: TranslationDictionary;
  locales: LocaleMeta[];
  region: Region;
  dir: "ltr" | "rtl";
  isHydrated: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getSavedLocale(region: Region): SupportedLocale {
  if (typeof window === "undefined") return "en";
  try {
    if (region === "uae") {
      const uaeSaved = localStorage.getItem(STORAGE_KEY_UAE) as SupportedLocale | null;
      if (uaeSaved === "en" || uaeSaved === "ar") {
        return uaeSaved;
      }
      const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME_UAE}=([^;]*)`));
      if (match) {
        const val = decodeURIComponent(match[1]) as SupportedLocale;
        if (val === "en" || val === "ar") return val;
      }
      return "en";
    } else {
      const indiaSaved = (localStorage.getItem(STORAGE_KEY_INDIA) ||
        localStorage.getItem(STORAGE_KEY_INDIA_LEGACY)) as SupportedLocale | null;
      if (indiaSaved === "en" || indiaSaved === "hi" || indiaSaved === "te") {
        return indiaSaved;
      }
      const match = document.cookie.match(
        new RegExp(`(?:^|; )(?:${COOKIE_NAME_INDIA}|${STORAGE_KEY_INDIA_LEGACY})=([^;]*)`)
      );
      if (match) {
        const val = decodeURIComponent(match[1]) as SupportedLocale;
        if (val === "en" || val === "hi" || val === "te") return val;
      }
      return "en";
    }
  } catch {
    return "en";
  }
}

interface LanguageProviderProps {
  children: React.ReactNode;
  region?: Region;
}

export function LanguageProvider({ children, region: propRegion }: LanguageProviderProps) {
  const pathname = usePathname();
  // Derive active region dynamically from pathname or explicit prop
  const currentRegion: Region = useMemo(() => {
    if (propRegion) return propRegion;
    if (pathname && pathname.startsWith("/uae")) return "uae";
    return "india";
  }, [propRegion, pathname]);

  const [locale, setLocaleState] = useState<SupportedLocale>("en");
  const [isHydrated, setIsHydrated] = useState(false);
  const regionRef = useRef<Region>(currentRegion);

  // Sync document element attributes
  const applyHtmlAttributes = useCallback((newLocale: SupportedLocale) => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
  }, []);

  // Initialize on mount
  useEffect(() => {
    const saved = getSavedLocale(currentRegion);
    setLocaleState(saved);
    applyHtmlAttributes(saved);
    setIsHydrated(true);
    regionRef.current = currentRegion;
  }, [currentRegion, applyHtmlAttributes]);

  // Synchronize when navigating between regions (e.g. Back/Forward button or internal link)
  useEffect(() => {
    if (regionRef.current !== currentRegion) {
      regionRef.current = currentRegion;
      const saved = getSavedLocale(currentRegion);
      setLocaleState(saved);
      applyHtmlAttributes(saved);
    }
  }, [currentRegion, applyHtmlAttributes]);

  const setLocale = useCallback(
    (newLocale: SupportedLocale) => {
      // Validate locale belongs to active region
      if (currentRegion === "uae") {
        if (newLocale !== "en" && newLocale !== "ar") return;
      } else {
        if (newLocale !== "en" && newLocale !== "hi" && newLocale !== "te") return;
      }

      setLocaleState(newLocale);
      applyHtmlAttributes(newLocale);

      try {
        if (currentRegion === "uae") {
          localStorage.setItem(STORAGE_KEY_UAE, newLocale);
          document.cookie = `${COOKIE_NAME_UAE}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
        } else {
          localStorage.setItem(STORAGE_KEY_INDIA, newLocale);
          localStorage.setItem(STORAGE_KEY_INDIA_LEGACY, newLocale);
          document.cookie = `${COOKIE_NAME_INDIA}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
          document.cookie = `${STORAGE_KEY_INDIA_LEGACY}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
        }
      } catch {
        // ignore storage errors
      }
    },
    [currentRegion, applyHtmlAttributes]
  );

  const dict = useMemo(() => {
    return DICTIONARIES[locale] || enDictionary;
  }, [locale]);

  const locales = useMemo(() => {
    return currentRegion === "uae" ? UAE_LOCALES : INDIA_LOCALES;
  }, [currentRegion]);

  const dir: "ltr" | "rtl" = locale === "ar" ? "rtl" : "ltr";

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      dict,
      locales,
      region: currentRegion,
      dir,
      isHydrated,
    }),
    [locale, setLocale, dict, locales, currentRegion, dir, isHydrated]
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
    return {
      locale: "en",
      setLocale: () => {},
      dict: enDictionary,
      locales: SUPPORTED_LOCALES,
      region: "india",
      dir: "ltr",
      isHydrated: true,
    };
  }
  return ctx;
}
