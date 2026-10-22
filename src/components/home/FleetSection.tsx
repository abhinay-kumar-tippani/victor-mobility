"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Car, Users, Bus, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import type { FleetCategory, MediaAsset } from "@/types/content";

interface FleetSectionProps {
  categories: FleetCategory[];
  fleetNote: string;
  fleetModelDisplayDefault?: boolean;
  luxuryMedia?: MediaAsset;
  mediaCaption: string;
}

const categoryIcons: Record<string, typeof Car> = {
  electric: Zap,
  sedans: Car,
  mpvs: Users,
  buses: Bus,
  luxury: Sparkles,
};

interface CategoryDisplayData {
  badge: string;
  headline: string;
  models: string[];
  capacity: string;
  uses: string;
  features: string[];
  imageSrc: string;
  imageAlt: string;
}

const fleetDetails: Record<string, CategoryDisplayData> = {
  electric: {
    badge: "Electric Vehicles",
    headline: "Explore Electric Travel for Commutes & Airport Transfers",
    models: [],
    capacity: "Confirmed during enquiry",
    uses: "Employee commutes, airport journeys, and corporate requirements.",
    features: [
      "Journey requirements: route, timings and travel frequency",
      "Passenger requirements: number of travellers and luggage",
      "Vehicle allocation: confirmed during the enquiry",
    ],
    imageSrc: "/images/india/electric-fleet.jpg",
    imageAlt: "Illustrative executive electric vehicle for corporate mobility",
  },
  sedans: {
    badge: "Executive Sedans",
    headline: "Comfortable Saloons for Commutes & Business Travel",
    models: ["Maruti Swift Dzire", "Tata Tigor"],
    capacity: "Up to 3–4 Passengers · 2 Luggage Bags",
    uses: "Daily employee commute, airport transfers, and point-to-point city travel.",
    features: [
      "Fuel-efficient, air-conditioned comfortable cabins",
      "Real-time GPS telematics with speed governance",
      "Verified commercial drivers with route familiarity",
    ],
    imageSrc: "/images/india/hero.png",
    imageAlt: "Executive sedan for business travel and airport transfers",
  },
  mpvs: {
    badge: "MPVs & Group Vehicles",
    headline: "Spacious Multi-Utility Vehicles for Teams & Delegations",
    models: ["Toyota Innova Crysta", "Mahindra Marazzo", "Force Urbania"],
    capacity: "Up to 6–7 Passengers · 4–5 Suitcases",
    uses: "Visiting executive delegations, project teams, multi-stop site visits, and family travel.",
    features: [
      "Reclining captain seats with generous legroom",
      "Ample boot capacity for airport international baggage",
      "Smooth highway stability for intercity corporate travel",
    ],
    imageSrc: "/images/india/hero.png",
    imageAlt: "Spacious passenger MPV for team and group travel",
  },
  buses: {
    badge: "Buses & Shuttles",
    headline: "Air-Conditioned Coaches for Campuses & Events",
    models: ["22-Seater Executive Bus", "44-Seater Luxury Coach"],
    capacity: "22 to 44 Passengers",
    uses: "Daily IT workforce transit, corporate campus loops, and conference attendee shuttles.",
    features: [
      "High-capacity air-conditioned group transit",
      "Certified speed governors & emergency exit safety",
      "Dedicated route management for office shift timings",
    ],
    imageSrc: "/images/india/employee-shuttle.png",
    imageAlt: "Corporate employee shuttle bus for workplace and venue transit",
  },
  luxury: {
    badge: "Luxury & Limousines",
    headline: "Premium Chauffeur-Driven Travel for VIP Dignitaries",
    models: ["Executive Business Saloons", "Premium Hospitality Fleet"],
    capacity: "Pinnacle Executive Comfort",
    uses: "Board members, international delegations, corporate summits, and luxury hospitality.",
    features: [
      "Immaculate leather cabins with dual-zone climate control",
      "Experienced executive chauffeurs trained in VIP protocol",
      "Flight radar tracking with personalized terminal greeting",
    ],
    imageSrc: "/images/india/luxury-interior.png",
    imageAlt: "Luxury vehicle interior with executive leather seating",
  },
};

export default function FleetSection({
  categories,
  fleetNote,
  mediaCaption,
}: FleetSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(categories[0]?.id || "sedans");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const currentCategory = categories.find((c) => c.id === activeTab) || categories[0];
  const Icon = categoryIcons[currentCategory?.id || "sedans"] || Car;
  const currentData = fleetDetails[currentCategory?.id || "sedans"] || fleetDetails.sedans;

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (index + 1) % categories.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (index - 1 + categories.length) % categories.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = categories.length - 1;
    }

    if (nextIndex >= 0) {
      setActiveTab(categories[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <section
      id="fleet"
      tabIndex={-1}
      className="py-14 sm:py-20 bg-brand-warm-white border-b border-brand-soft-neutral focus:outline-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
              Vehicle Categories
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-2">
              Our Managed Fleet
            </h2>
            <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
              Explore vehicle options suited for daily employee travel, visiting delegations, and executive events across all 10 operational hubs pan-India.
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

        {/* Category Tabs */}
        <div
          role="tablist"
          aria-label="Fleet vehicle categories"
          className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 bg-white rounded-xl border border-brand-soft-neutral mb-8 max-w-2xl shadow-2xs"
        >
          {categories.map((cat, idx) => {
            const TabIcon = categoryIcons[cat.id] || Car;
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                role="tab"
                id={`fleet-tab-${cat.id}`}
                aria-selected={isActive}
                aria-controls={`fleet-panel-${cat.id}`}
                tabIndex={isActive ? 0 : -1}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-150 min-h-[44px] shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-indigo ${
                  isActive
                    ? "bg-brand-indigo text-white shadow-xs"
                    : "text-brand-ink/70 hover:text-brand-ink hover:bg-brand-warm-white"
                }`}
              >
                <TabIcon className="w-4 h-4 shrink-0" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Details Display */}
        <div
          role="tabpanel"
          id={`fleet-panel-${currentCategory.id}`}
          aria-labelledby={`fleet-tab-${currentCategory.id}`}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left Column: Specifications & Real Models */}
          <div className="order-2 lg:order-1 lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-brand-soft-neutral shadow-xs flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                    <Icon className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-brand-ink">
                      {currentCategory.name}
                    </h3>
                    <span className="text-xs text-brand-indigo font-semibold">
                      {currentData.capacity}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-brand-ink/80 leading-relaxed">
                {currentData.uses}
              </p>

              {/* Real Vehicle Models from Brochure */}
              <div className="bg-brand-warm-white rounded-xl p-4 border border-brand-soft-neutral/80 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-ink/60 block">
                  Brochure Vehicle Models:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentData.models.map((model) => (
                    <span
                      key={model}
                      className="px-3 py-1 rounded-lg bg-white border border-brand-soft-neutral text-xs font-bold text-brand-ink"
                    >
                      {model}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Operational Features */}
              <ul className="space-y-2 pt-1">
                {currentData.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-xs text-brand-ink/80">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Note on availability */}
              <p className="text-xs text-brand-ink/60 italic pt-1 border-t border-brand-soft-neutral/60">
                {fleetNote}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-brand-soft-neutral flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <Link
                href={`/india/contact?category=${encodeURIComponent(currentCategory.name)}`}
                className="inline-flex items-center justify-center gap-2 text-xs font-bold bg-brand-indigo hover:bg-brand-blue text-white px-6 py-3 rounded-xl shadow-xs transition-colors"
              >
                <span>Enquire About {currentCategory.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-xs text-brand-ink/50 text-center sm:text-right">
                Available across 10 operational hubs pan-India
              </span>
            </div>
          </div>

          {/* Right Column: Visual Card */}
          <div className="order-1 lg:order-2 lg:col-span-5 relative rounded-2xl overflow-hidden border border-brand-soft-neutral shadow-sm flex flex-col justify-end min-h-[280px] sm:min-h-[340px] bg-brand-ink group">
            <Image
              key={currentCategory.id}
              src={currentData.imageSrc}
              alt={currentData.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover group-hover:scale-102 transition-transform duration-300"
            />
            <div className="relative z-10 w-full p-5 sm:p-6 text-white bg-gradient-to-t from-brand-ink via-brand-ink/70 to-transparent">
              <span className="text-xs uppercase tracking-widest font-bold text-brand-violet block mb-1">
                {currentData.badge}
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white mb-1 leading-snug">
                {currentData.headline}
              </h4>
              <p className="text-xs text-brand-soft-neutral/70 italic pt-1">
                {mediaCaption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
