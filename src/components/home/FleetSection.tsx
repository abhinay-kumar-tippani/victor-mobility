"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Car, Users, Bus, Sparkles, Check, ArrowRight, Info, CheckCircle2 } from "lucide-react";
import type { FleetCategory, MediaAsset } from "@/types/content";
import { selectEnquiryOption } from "@/lib/enquiryEvents";

interface FleetSectionProps {
  categories: FleetCategory[];
  fleetNote: string;
  fleetModelDisplayDefault?: boolean;
  luxuryMedia?: MediaAsset;
  mediaCaption: string;
}

const categoryIcons: Record<string, typeof Car> = {
  sedans: Car,
  mpvs: Users,
  buses: Bus,
  luxury: Sparkles,
};

interface CategoryVisualData {
  imageSrc: string;
  imageAlt: string;
  objectPosition: string;
  badge: string;
  headline: string;
  capacityText: string;
  planningInputs: string[];
}

const categoryVisuals: Record<string, CategoryVisualData> = {
  sedans: {
    imageSrc: "/images/india/hero.png",
    imageAlt: "Executive sedan for business travel and airport transfers",
    objectPosition: "28% 65%",
    badge: "Executive Sedan",
    headline: "Comfortable Saloons for Individual & Business Travel",
    capacityText: "Up to 3–4 passengers · 2 luggage bags",
    planningInputs: [
      "Passenger count and luggage requirements",
      "Point-to-point business travel or airport route",
      "Date, pickup time, and local itinerary",
    ],
  },
  mpvs: {
    imageSrc: "/images/india/hero.png",
    imageAlt: "Spacious passenger MPV for team and group travel",
    objectPosition: "72% 65%",
    badge: "Team Transit MPV",
    headline: "Spacious Multi-Utility Vehicles for Corporate Teams",
    capacityText: "Up to 6–7 passengers · Generous baggage space",
    planningInputs: [
      "Visiting delegation or project team headcount",
      "Multi-stop pickups and site visit schedules",
      "Luggage accommodation for airport transfers",
    ],
  },
  buses: {
    imageSrc: "/images/india/employee-shuttle.png",
    imageAlt: "Corporate employee shuttle bus for workplace and venue transit",
    objectPosition: "center",
    badge: "Workplace & Venue Shuttles",
    headline: "Air-Conditioned Buses for Workplaces, Events & Shuttles",
    capacityText: "22-seater & 44-seater configurations",
    planningInputs: [
      "Shift roster timings and office arrival windows",
      "Route corridor stops and total employee count",
      "Conference or venue transit coordination",
    ],
  },
  luxury: {
    imageSrc: "/images/india/luxury-interior.png",
    imageAlt: "Luxury vehicle interior with executive leather seating",
    objectPosition: "center",
    badge: "Executive Luxury",
    headline: "Premium Chauffeur-Driven Travel for VIPs & Delegations",
    capacityText: "VIP seating · Climate controlled executive cabin",
    planningInputs: [
      "Occasion, hospitality, or dignitary delegation scope",
      "Full-day chauffeur service or event schedule",
      "Preferred executive vehicle category",
    ],
  },
};

export default function FleetSection({
  categories,
  fleetNote,
  mediaCaption,
}: FleetSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(categories[0]?.id || "sedans");

  const currentCategory = categories.find((c) => c.id === activeTab) || categories[0];
  const Icon = categoryIcons[currentCategory?.id || "sedans"] || Car;
  const currentVisual =
    categoryVisuals[currentCategory?.id || "sedans"] || categoryVisuals.sedans;

  return (
    <section
      id="fleet"
      tabIndex={-1}
      className="py-14 sm:py-20 bg-white border-b border-brand-soft-neutral focus:outline-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
              Vehicle Categories
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-2">
              Find the right vehicle category
            </h2>
            <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
              Review vehicle options tailored for daily workplace commutes, visiting delegations, and executive hospitality.
            </p>
          </div>

          <Link
            href="/india/fleet"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-indigo hover:text-brand-blue transition-colors shrink-0"
          >
            <span>Explore full fleet guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Category Selector Tabs */}
        <div
          role="tablist"
          aria-label="Fleet vehicle categories"
          className="flex flex-wrap gap-2 sm:gap-3 p-1.5 bg-brand-warm-white rounded-xl border border-brand-soft-neutral mb-8 max-w-3xl"
        >
          {categories.map((cat) => {
            const TabIcon = categoryIcons[cat.id] || Car;
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                role="tab"
                id={`fleet-tab-${cat.id}`}
                aria-selected={isActive}
                aria-controls={`fleet-panel-${cat.id}`}
                tabIndex={isActive ? 0 : -1}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-150 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-brand-indigo ${
                  isActive
                    ? "bg-brand-indigo text-white shadow-sm"
                    : "text-brand-ink/70 hover:text-brand-ink hover:bg-white"
                }`}
              >
                <TabIcon className="w-4 h-4 shrink-0" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Details Display: Image & Details Update Together */}
        <div
          role="tabpanel"
          id={`fleet-panel-${currentCategory.id}`}
          aria-labelledby={`fleet-tab-${currentCategory.id}`}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left: Category Specifications & Planning Guidance */}
          <div className="lg:col-span-6 bg-brand-warm-white rounded-2xl p-6 sm:p-8 border border-brand-soft-neutral flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-brand-ink">
                      {currentCategory.name}
                    </h3>
                    <span className="text-xs text-brand-indigo font-semibold">
                      {currentVisual.capacityText}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-brand-ink/80 leading-relaxed">
                {currentCategory.description}
              </p>

              {/* Category-Specific Planning Inputs */}
              <div className="bg-white rounded-xl p-4 border border-brand-soft-neutral/80 space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-ink/60 block">
                  Helpful Enquiry Inputs:
                </span>
                <ul className="space-y-1.5">
                  {currentVisual.planningInputs.map((input) => (
                    <li
                      key={input}
                      className="flex items-start gap-2 text-xs text-brand-ink/85"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-violet shrink-0 mt-0.5" />
                      <span>{input}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Single Clear Allocation Guidance */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/70 border border-brand-soft-neutral/60 text-xs text-brand-ink/70">
                <Info className="w-4 h-4 text-brand-indigo shrink-0 mt-0.5" />
                <span>{fleetNote}</span>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-brand-soft-neutral flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() =>
                  selectEnquiryOption({ category: currentCategory.name })
                }
                className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-bold bg-brand-indigo hover:bg-brand-blue text-white px-5 py-3 rounded-xl shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-indigo"
              >
                <span>Enquire About {currentCategory.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] text-brand-ink/50 text-right">
                Per-location availability
              </span>
            </div>
          </div>

          {/* Right: Dynamic Category-Specific Image */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-brand-soft-neutral shadow-md flex flex-col justify-end min-h-[320px] sm:min-h-[380px] bg-brand-ink group">
            <Image
              key={currentCategory.id}
              src={currentVisual.imageSrc}
              alt={currentVisual.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectPosition: currentVisual.objectPosition }}
              className="object-cover group-hover:scale-102 transition-all duration-300"
            />

            {/* Consistent dark ink backdrop ensuring readable contrast */}
            <div className="relative z-10 w-full p-6 text-white bg-gradient-to-t from-brand-ink via-brand-ink/95 to-brand-ink/80 sm:to-brand-ink/70">
              <span className="text-[11px] uppercase tracking-widest font-bold text-brand-violet block mb-1">
                {currentVisual.badge}
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white mb-1 leading-snug">
                {currentVisual.headline}
              </h4>
              <p className="text-xs text-brand-soft-neutral/85 leading-relaxed">
                Commercial permits, professional demeanor, and vehicle condition verified before dispatch.
              </p>
              <p className="text-[11px] text-brand-soft-neutral/60 italic pt-1.5">
                {mediaCaption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
