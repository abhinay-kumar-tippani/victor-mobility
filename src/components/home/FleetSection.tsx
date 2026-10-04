"use client";

import { useState } from "react";
import Image from "next/image";
import { Car, Users, Bus, Sparkles, Check, ArrowRight } from "lucide-react";
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

export default function FleetSection({
  categories,
  fleetNote,
  fleetModelDisplayDefault = false,
  luxuryMedia,
  mediaCaption,
}: FleetSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(categories[0]?.id || "sedans");

  const currentCategory = categories.find((c) => c.id === activeTab) || categories[0];
  const Icon = categoryIcons[currentCategory?.id || "sedans"] || Car;

  return (
    <section id="fleet" tabIndex={-1} className="py-20 sm:py-28 bg-white border-b border-brand-soft-neutral focus:outline-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest font-bold text-brand-blue mb-3">
              Fleet Categories
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight mb-4">
              Vehicles Configured for Business, Teams & VIP Travel
            </h2>
            <p className="text-base sm:text-lg text-brand-ink/75 leading-relaxed">
              Whether you need efficient daily sedans, executive MPVs, high-capacity commuter buses, or premium chauffeur-driven luxury, choose a category to begin your enquiry.
            </p>
          </div>

          <div className="text-xs bg-brand-warm-white p-4 rounded-xl border border-brand-soft-neutral max-w-sm">
            <span className="font-semibold text-brand-ink block mb-0.5">Fleet Allocation Note:</span>
            <span className="text-brand-ink/70">{fleetNote}</span>
          </div>
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
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-150 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-brand-indigo ${
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

        {/* Selected Category Details Display */}
        <div
          role="tabpanel"
          id={`fleet-panel-${currentCategory.id}`}
          aria-labelledby={`fleet-tab-${currentCategory.id}`}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left: Category Specifications & Enquiry Pathway */}
          <div className="lg:col-span-6 bg-brand-warm-white rounded-2xl p-8 sm:p-10 border border-brand-soft-neutral flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand-indigo/10 text-brand-indigo flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brand-ink">
                    {currentCategory.name}
                  </h3>
                  <span className="text-xs text-brand-ink/60">
                    Dedicated Vehicle Category
                  </span>
                </div>
              </div>

              <p className="text-base text-brand-ink/80 leading-relaxed mb-6">
                {currentCategory.description}
              </p>

              {/* Strict honouring of fleetModelDisplayDefault flag */}
              <div className="space-y-3 mb-8">
                {fleetModelDisplayDefault && currentCategory.brochureModels.length > 0 ? (
                  <>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-ink/70 block">
                      Brochure Reference Models:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentCategory.brochureModels.map((model) => (
                        <div
                          key={model}
                          className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-brand-soft-neutral text-sm font-medium text-brand-ink"
                        >
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{model}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="p-4 bg-white rounded-xl border border-brand-soft-neutral text-xs text-brand-ink/80 leading-relaxed">
                    <span className="font-semibold text-brand-ink block mb-1">
                      Category Customization & Allocation:
                    </span>
                    {fleetNote}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-brand-soft-neutral flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  selectEnquiryOption({ category: currentCategory.name });
                }}
                className="inline-flex items-center justify-center gap-2 text-sm font-bold bg-brand-indigo hover:bg-brand-blue text-white px-6 py-3 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-indigo"
              >
                <span>Enquire About {currentCategory.name}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-xs text-brand-ink/50 text-center sm:text-right">
                Availability confirmed per location
              </span>
            </div>
          </div>

          {/* Right: Featured Fleet Imagery with high visibility and consistent dark text backing */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-brand-soft-neutral shadow-lg flex flex-col justify-end min-h-[380px] bg-brand-ink group">
            <Image
              src={luxuryMedia?.src || "/images/india/luxury-interior.png"}
              alt={luxuryMedia?.alt || "Illustrative executive vehicle interior with leather seating"}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
            />

            {/* Consistent dark ink backdrop behind entire text block preventing overlap on light upholstery */}
            <div className="relative z-10 w-full p-6 sm:p-8 text-white bg-gradient-to-t from-brand-ink via-brand-ink/95 to-brand-ink/85 sm:to-brand-ink/70">
              <span className="text-xs uppercase tracking-widest font-bold text-brand-soft-neutral block mb-1.5">
                Executive Standard
              </span>
              <h4 className="text-xl sm:text-2xl font-bold mb-2 text-white">
                Comfort, Cleanliness & Chauffeur Etiquette
              </h4>
              <p className="text-xs sm:text-sm text-brand-soft-neutral leading-relaxed mb-4 max-w-md">
                Every vehicle in the Victor network is prepared to high hygiene standards with courteous, route-aware chauffeurs.
              </p>
              <div className="text-[11px] text-brand-soft-neutral/80 italic border-t border-white/20 pt-2.5 flex items-center justify-between">
                <span>Executive vehicle interior</span>
                <span>{mediaCaption}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
