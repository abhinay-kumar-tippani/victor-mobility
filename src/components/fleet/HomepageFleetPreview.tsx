"use client";

import BrandText from "@/components/brand/BrandText";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import indiaData from "@/content/india.json";
import uaeData from "@/content/uae.json";
import type { FleetCategory, FleetVehicle } from "@/types/content";
import { useLanguage } from "@/i18n/LanguageContext";
import featuredFleetData from "@/content/featured-fleet.json";

interface HomepageFleetPreviewProps {
  region?: "india" | "uae";
  copy: typeof indiaData.fleetPresentation | typeof uaeData.fleetPresentation;
  vehicles?: FleetVehicle[];
  categories?: FleetCategory[];
  basePath?: string;
  featuredIds?: string[];
}

export default function HomepageFleetPreview({
  region,
  copy,
  vehicles = [],
  basePath,
  featuredIds,
}: HomepageFleetPreviewProps) {
  const { dict, locale } = useLanguage();
  const fleetDict = dict?.fleet;

  // Derive region from basePath or prop
  const effectiveBasePath =
    basePath || (region === "uae" ? "/uae" : "/india");
  const effectiveRegion: "india" | "uae" =
    region || (effectiveBasePath.startsWith("/uae") ? "uae" : "india");

  // Read the short, editable list of featured IDs for the region
  const resolvedFeaturedIds =
    featuredIds && featuredIds.length > 0
      ? featuredIds
      : (featuredFleetData as Record<string, string[]>)[effectiveRegion] || [
          "kia-carens-clavis-ev",
          "hyundai-aura",
          "innova-crysta",
          "tata-marcopolo-40",
        ];

  // Authoritative catalogue source with fallback
  const fallbackVehicles =
    effectiveRegion === "uae"
      ? (uaeData.fleetVehicles as unknown as FleetVehicle[])
      : (indiaData.fleetVehicles as unknown as FleetVehicle[]);
  const sourceVehicles =
    vehicles && vehicles.length > 0 ? vehicles : fallbackVehicles;

  // Resolve the 4 featured vehicles in curated order from regional records
  const featuredVehicles: FleetVehicle[] = resolvedFeaturedIds
    .map((id) => sourceVehicles.find((v) => v.id === id))
    .filter((v): v is FleetVehicle => Boolean(v));

  // Localized fuel label helper
  const getLocalizedFuel = (fuelType: string): string => {
    switch (fuelType) {
      case "Petrol":
        return fleetDict?.fuelBadges?.petrol || "Petrol";
      case "Petrol & CNG":
        return fleetDict?.fuelBadges?.petrolCng || "Petrol & CNG";
      case "Electric Vehicle":
        return fleetDict?.fuelBadges?.electricVehicle || "Electric Vehicle";
      case "Long Range Electric Vehicle":
        return (
          fleetDict?.fuelBadges?.longRangeElectricVehicle ||
          "Long Range Electric Vehicle"
        );
      case "Diesel":
        return fleetDict?.fuelBadges?.diesel || "Diesel";
      case "Hybrid":
      case "Petrol & Hybrid":
        return fleetDict?.fuelBadges?.hybrid || "Hybrid";
      default:
        return fuelType;
    }
  };

  // Localized cab type helper
  const getLocalizedCabType = (cabType: string): string => {
    switch (cabType) {
      case "Sedan":
        return fleetDict?.filterTabs?.sedan || "Sedan";
      case "SUV":
        return fleetDict?.filterTabs?.suv || "SUV";
      case "12 Seater":
        return fleetDict?.filterTabs?.twelveSeater || "12 Seater";
      default:
        return cabType;
    }
  };

  const eyebrow = fleetDict?.eyebrow || copy.eyebrow;
  const title = fleetDict?.title || copy.title;
  const imageCaption =
    fleetDict?.imageCaption ||
    copy.imageCaption ||
    "Vehicle illustrations are for reference; the assigned vehicle may differ.";

  // Labels matching the authoritative fleet cards
  const pricingLabel = fleetDict?.electric?.pricingLabel || "Pricing";
  const requestQuote = fleetDict?.requestQuote || "Request a quote";
  const sharedNote =
    fleetDict?.sharedNote ||
    "Vehicle allocation and pricing are confirmed for your location, dates and requirements.";
  const enquireLabel =
    fleetDict?.enquireVehicle || fleetDict?.enquireCta || "Enquire about this vehicle";

  // CTA button label for the full fleet catalogue link
  const ctaLabel =
    locale === "en"
      ? "View full fleet"
      : fleetDict?.exploreAll || copy.viewAll || "View full fleet";

  return (
    <section
      id="fleet"
      aria-labelledby="homepage-fleet-title"
      className="scroll-mt-24 border-b border-brand-soft-neutral bg-brand-warm-white py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading — Preserves heading & translations */}
        <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
          <p className="uppercase text-brand-blue section-eyebrow">
            <BrandText>{eyebrow}</BrandText>
          </p>
          <h2
            id="homepage-fleet-title"
            className="mt-3 text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl"
          >
            <BrandText>{title}</BrandText>
          </h2>
        </div>

        {/* 
          Featured 4-Vehicle Grid:
          - Desktop: 4 cards in one aligned row (lg:grid-cols-4)
          - Tablet: 2×2 grid (sm:grid-cols-2)
          - Mobile: 1-column stack (grid-cols-1) matching /fleet layout with full car info
          - Card Hover Feature: 4.5% scale expansion, 10px lift, brand-ink elevation shadow & z-index elevation
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-3">
          {featuredVehicles.map((vehicle) => {
            const isEv = Boolean(
              vehicle.isElectric ||
                vehicle.fuelType.toLowerCase().includes("electric")
            );
            const localizedCab = getLocalizedCabType(vehicle.cabType);
            const localizedFuel = getLocalizedFuel(vehicle.fuelType);

            return (
              <article
                key={vehicle.id}
                className="group relative z-0 flex flex-col overflow-hidden rounded-2xl border border-brand-soft-neutral bg-white shadow-xs transition-all duration-300 ease-out hover:z-20 hover:scale-[1.04] sm:hover:scale-[1.045] hover:-translate-y-2 sm:hover:-translate-y-2.5 hover:shadow-[0_22px_40px_-12px_rgba(30,27,78,0.20)] hover:border-brand-indigo/40 hover:ring-1 hover:ring-brand-indigo/25 focus-within:z-20 focus-within:scale-[1.04] sm:focus-within:scale-[1.045] focus-within:-translate-y-2 sm:focus-within:-translate-y-2.5 focus-within:shadow-[0_22px_40px_-12px_rgba(30,27,78,0.20)] focus-within:border-brand-indigo/60 focus-within:ring-2 focus-within:ring-brand-indigo/30 motion-reduce:transform-none motion-reduce:transition-none"
              >
                {/* Vehicle Reference Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-soft-neutral/30">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.imageAlt || vehicle.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/40 to-transparent p-2.5">
                    <p className="text-[10px] leading-tight text-white/90">
                      {imageCaption}
                    </p>
                  </div>
                </div>

                {/* Vehicle Specifications & Card Body (Same as /fleet) */}
                <div className="flex flex-1 flex-col p-5">
                  {/* Badges: Cab Type, Fuel Version & Seating Capacity */}
                  <div className="mb-2.5 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-md border border-brand-soft-neutral bg-brand-warm-white px-2.5 py-0.5 text-xs font-semibold text-brand-ink">
                      {localizedCab}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-xs font-semibold ${
                        isEv
                          ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                          : "border border-brand-soft-neutral/80 bg-brand-soft-neutral/40 text-brand-ink/80"
                      }`}
                    >
                      {isEv && (
                        <Zap
                          className="h-3 w-3 text-emerald-600"
                          aria-hidden="true"
                        />
                      )}
                      <span>{localizedFuel}</span>
                    </span>
                    {vehicle.seatingCapacity &&
                      vehicle.seatingCapacity !== vehicle.cabType &&
                      !vehicle.cabType.includes(vehicle.seatingCapacity) && (
                        <span className="inline-flex items-center rounded-md border border-brand-soft-neutral/80 bg-brand-soft-neutral/30 px-2.5 py-0.5 text-xs font-semibold text-brand-ink/80">
                          {vehicle.seatingCapacity}
                        </span>
                      )}
                  </div>

                  {/* Model Name */}
                  <h3 className="text-lg font-bold text-brand-ink">
                    <span dir="ltr">
                      <BrandText>{vehicle.name}</BrandText>
                    </span>
                  </h3>

                  {/* Vehicle Information / Description */}
                  {vehicle.description && (
                    <p className="mt-1.5 text-xs leading-relaxed text-brand-ink/70">
                      <BrandText>{vehicle.description}</BrandText>
                    </p>
                  )}

                  {/* Quotation Pricing Display */}
                  <div className="mt-auto pt-4">
                    <div className="border-t border-brand-soft-neutral pt-3">
                      <span className="mb-0.5 block text-[11px] font-semibold uppercase tracking-wider text-brand-ink/60">
                        {pricingLabel}
                      </span>
                      <p className="text-xl font-bold tracking-tight text-brand-indigo">
                        {requestQuote}
                      </p>
                    </div>

                    {/* Shared Allocation Disclaimer */}
                    <p className="mt-2 text-[11px] leading-relaxed text-brand-ink/65">
                      {sharedNote}
                    </p>

                    {/* Direct Contact Action with Vehicle Query Pre-fill */}
                    <div className="mt-4 pt-1">
                      <Link
                        href={`${effectiveBasePath}/contact?vehicle=${encodeURIComponent(
                          vehicle.name
                        )}&category=${encodeURIComponent(vehicle.cabType)}`}
                        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-brand-indigo px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-brand-blue group-hover:shadow-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo"
                      >
                        <span>{enquireLabel}</span>
                        <ArrowRight
                          className="h-4 w-4 rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Primary CTA Button to Explore Complete Catalogue */}
        <div className="mt-10 sm:mt-14 flex flex-col items-center justify-center">
          <Link
            href={`${effectiveBasePath}/fleet`}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-indigo px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo shadow-xs"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
