import BrandText from "@/components/brand/BrandText";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BrandLogo from "@/components/brand/BrandLogo";
import { IndiaFlag, UaeFlag } from "@/components/brand/CountryFlag";
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
      <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-7xl flex-1 px-5 pt-8 pb-12 focus:outline-none sm:px-8 sm:pt-12 sm:pb-16 lg:px-12 lg:pt-16 lg:pb-20">
        {/* Intro Section: 65/35 split on desktop, stacked on mobile with centered logo */}
        <div className="mb-8 grid grid-cols-1 items-center gap-6 sm:mb-10 sm:gap-8 lg:mb-12 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          {/* Logo block: order-1 centered on mobile, order-2 on desktop right column (~35%) */}
          <div className="order-1 flex justify-center lg:order-2 lg:col-span-4 lg:justify-end">
            <BrandLogo className="w-[210px] sm:w-[260px] lg:w-[320px] aspect-[810/430] h-auto mix-blend-multiply" />
          </div>

          {/* Text block: order-2 left-aligned on mobile, order-1 on desktop left column (~65%) */}
          <div className="order-2 text-left lg:order-1 lg:col-span-8">
            <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-semibold uppercase tracking-[0.14em] text-brand-blue leading-normal">
              <BrandText>{copy.eyebrow}</BrandText>
            </p>
            <h1 className="mt-3 text-[30px] sm:text-[36px] lg:text-[42px] font-semibold leading-[1.2] sm:leading-[1.18] lg:leading-[1.15] tracking-tight text-brand-ink">
              <BrandText>{copy.title}</BrandText>
            </h1>
            <p className="mt-3.5 max-w-2xl text-base leading-relaxed text-brand-ink/75 sm:text-lg sm:leading-relaxed">
              <BrandText>{copy.description}</BrandText>
            </p>
          </div>
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
                  <div className={`flex gap-3.5 sm:gap-4 ${country.label !== country.name ? "items-start" : "items-center"}`}>
                    <div className={`shrink-0 ${country.label !== country.name ? "pt-1 sm:pt-1.5" : ""}`}>
                      {(country.id === "india" || country.name === "INDIA") && (
                        <IndiaFlag className="h-7 sm:h-9 w-auto aspect-[142/102]" />
                      )}
                      {(country.id === "uae" || country.name === "UAE") && (
                        <UaeFlag className="h-7 sm:h-9 w-auto aspect-[142/102]" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
                        {country.name}
                      </h2>
                      {country.label !== country.name && (
                        <p className="mt-1 text-sm font-medium text-white/85">{country.label}</p>
                      )}
                    </div>
                  </div>
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
          <p>© {new Date().getFullYear()}<BrandText> Victor Mobility</BrandText></p>
          <p className="font-semibold text-brand-indigo"><BrandText>{brand.tagline}</BrandText></p>
        </div>
      </footer>
    </div>
  );
}
