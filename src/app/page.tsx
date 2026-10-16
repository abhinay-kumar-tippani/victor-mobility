import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe2 } from "lucide-react";
import BrandLogo from "@/components/brand/BrandLogo";
import indiaData from "@/content/india.json";
import brand from "@/content/brand.json";

const copy = indiaData.countrySelector;

export const metadata: Metadata = {
  title: { absolute: "Choose your country | Victor Mobility" },
  description: copy.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Choose your country | Victor Mobility",
    description: copy.description,
    url: "/",
  },
  twitter: {
    title: "Choose your country | Victor Mobility",
    description: copy.description,
  },
};

export default function RootPage() {
  return (
    <div lang="en" className="flex min-h-screen flex-col bg-brand-warm-white">
      <header className="border-b border-brand-soft-neutral bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:h-24 sm:px-8 lg:px-12">
          <BrandLogo className="h-14 aspect-[810/430] sm:h-16" />
          <p className="flex items-center gap-2 text-xs font-medium text-brand-ink/70 sm:text-sm">
            <Globe2 className="h-4 w-4 shrink-0 text-brand-indigo" aria-hidden="true" />
            {copy.headerLabel}
          </p>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-7xl flex-1 px-5 py-10 focus:outline-none sm:px-8 sm:py-14 lg:px-12">
        <div className="mb-8 sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.12] tracking-tight text-brand-ink sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-ink/70 sm:text-lg">{copy.description}</p>
        </div>

        <nav aria-label={copy.headerLabel} className="grid gap-5 md:grid-cols-2 lg:gap-7">
          {copy.countries.map(country => (
            <Link
              key={country.href}
              href={country.href}
              aria-label={country.action}
              className="group block overflow-hidden rounded-2xl border border-brand-soft-neutral bg-white shadow-sm transition-shadow duration-200 hover:shadow-xl focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-brand-indigo"
            >
              <div className="relative isolate h-64 overflow-hidden bg-brand-ink sm:h-80 lg:h-[370px]">
                <Image
                  src={country.image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1280px) 577px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.035] motion-safe:group-focus-visible:scale-[1.035]"
                  style={{ objectPosition: country.imagePosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/95 via-brand-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{country.name}</h2>
                  {country.label !== country.name && <p className="mt-2 text-sm font-medium text-white/85">{country.label}</p>}
                </div>
              </div>
              <div className="flex min-h-[76px] items-center justify-between gap-4 px-6 py-4 sm:px-8">
                <span className="text-base font-bold text-brand-indigo">{country.action}</span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-warm-white text-brand-indigo transition-colors group-hover:bg-brand-indigo group-hover:text-white group-focus-visible:bg-brand-indigo group-focus-visible:text-white">
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </nav>
        <p className="mt-5 text-xs text-brand-ink/65">{copy.imageNote}</p>
      </main>

      <footer className="border-t border-brand-soft-neutral">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-brand-ink/65 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>© {new Date().getFullYear()} Victor Mobility</p>
          <p className="font-semibold text-brand-indigo">{brand.tagline}</p>
        </div>
      </footer>
    </div>
  );
}
