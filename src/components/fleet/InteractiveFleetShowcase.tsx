"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Car,
  Users,
  Bus,
  Crown,
  Briefcase,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  MessageSquare,
  Phone,
  CheckCircle2,
  X,
  Info,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Layers,
  FileSpreadsheet,
  Zap,
} from "lucide-react";
import fleetSpecsData from "@/content/fleet-specifications.json";
import { useLanguage } from "@/i18n/LanguageContext";

interface InteractiveFleetShowcaseProps {
  region: "india" | "uae";
}

export default function InteractiveFleetShowcase({
  region,
}: InteractiveFleetShowcaseProps) {
  const data = region === "india" ? fleetSpecsData.india : fleetSpecsData.uae;
  const { dict, locale } = useLanguage();
  const fleetDict = dict.fleet;

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [inspectingCategory, setInspectingCategory] = useState<
    (typeof data.categories)[0] | null
  >(null);

  // Rate Calculator State
  const [calcCategory, setCalcCategory] = useState<string>(
    data.categories[0].id
  );
  const [calcDuty, setCalcDuty] = useState<string>("fullDay");
  const [calcCity, setCalcCity] = useState<string>(
    region === "india" ? "Hyderabad" : "Dubai"
  );

  const categories = data.categories;

  // Listen to hash and support /fleet#electric directly
  useEffect(() => {
    function applyHash() {
      if (typeof window === "undefined") return;
      const hash = window.location.hash.toLowerCase();
      if (hash === "#electric") {
        setSelectedCategoryId("electric");
        setTimeout(() => {
          const el = document.getElementById("fleet-panel-electric") || document.getElementById("fleet-showcase-tabs");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 80);
      }
    }

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const filteredCategories =
    selectedCategoryId === "all"
      ? categories
      : categories.filter((c) => c.id === selectedCategoryId);

  const activeCategoryForCalc =
    categories.find((c) => c.id === calcCategory) || categories[0];

  // WhatsApp numbers and contact config
  const waNumber = region === "india" ? "919396546950" : "971524552441";
  const phoneDisplay =
    region === "india" ? "+91 91007 77768" : "+971 52 455 2441";
  const phoneHref =
    region === "india" ? "tel:+919100777768" : "tel:+971524552441";

  // Duty Labels mapping
  const dutyLabels: Record<string, string> = {
    airportTransfer: "Airport VIP Transfer",
    halfDay: region === "india" ? "Half-Day Local (4 hrs / 40 km)" : "Half-Day City Disposal (5 hrs)",
    fullDay: region === "india" ? "Full-Day Executive (8 hrs / 80 km)" : "Full-Day City Disposal (10 hrs)",
    outstation: "Intercity / Outstation Corridor",
    monthlyRetainer: "Corporate Monthly Shift Retainer",
  };

  const isCalcEv = activeCategoryForCalc.id === "electric";
  const waQuoteMessage = `*VICTOR MOBILITY · FLEET INQUIRY*
Region: ${region === "india" ? "India" : "UAE"}
Category: ${activeCategoryForCalc.name}
${activeCategoryForCalc.popularModels && activeCategoryForCalc.popularModels.length > 0 ? `Brochure Models: ${activeCategoryForCalc.popularModels.join(", ")}\n` : ""}Duty Type: ${dutyLabels[calcDuty]}
Operating City: ${calcCity}
Tagline: On Time Every Time.

Hello Victor Team,
I would like to enquire about ${isCalcEv ? "electric vehicle options" : "vehicle availability"} and receive a formal quotation for our requirements.`;

  const waQuoteUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    waQuoteMessage
  )}`;

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "electric":
        return Zap;
      case "sedans":
      case "first-class":
        return Car;
      case "mpvs":
      case "executive-suvs":
      case "executive-vans":
        return Users;
      case "luxury":
      case "ultra-luxury":
        return Crown;
      case "buses":
      case "coaches":
        return Bus;
      default:
        return Car;
    }
  };

  const allCategoriesLabel = locale === "ar" ? "جميع فئات الأسطول" : "All Fleet Categories";

  return (
    <div className="space-y-12">
      {/* Category Navigation Tabs */}
      <div id="fleet-showcase-tabs" className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => {
            setSelectedCategoryId("all");
            if (typeof window !== "undefined" && window.location.hash === "#electric") {
              window.history.replaceState(null, "", window.location.pathname);
            }
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            selectedCategoryId === "all"
              ? "bg-brand-indigo text-white shadow-sm"
              : "bg-brand-soft-neutral/50 text-brand-indigo hover:bg-brand-soft-neutral"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{allCategoriesLabel} ({categories.length})</span>
        </button>

        {categories.map((cat) => {
          const IconComp = getCategoryIcon(cat.id);
          const isSelected = selectedCategoryId === cat.id;
          const tabCategory = fleetDict?.categories?.[cat.id];
          const tabName = tabCategory ? tabCategory.name : cat.name;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategoryId(cat.id);
                if (typeof window !== "undefined") {
                  if (cat.id === "electric") {
                    window.history.replaceState(null, "", "#electric");
                  } else if (window.location.hash === "#electric") {
                    window.history.replaceState(null, "", window.location.pathname);
                  }
                }
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                isSelected
                  ? "bg-brand-indigo text-white shadow-sm"
                  : "bg-brand-soft-neutral/50 text-brand-indigo hover:bg-brand-soft-neutral"
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tabName}</span>
            </button>
          );
        })}
      </div>

      {/* Fleet Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredCategories.map((category) => {
          const IconComp = getCategoryIcon(category.id);
          const isEvCategory = category.id === "electric";

          if (isEvCategory) {
            const evTitle = fleetDict?.electric?.title || "Electric Vehicles";
            const evIntro = fleetDict?.electric?.introduction || "Explore electric travel for employee commutes, airport journeys and corporate requirements. Our team will confirm suitable vehicle options for your location and schedule.";

            return (
              <article
                key={category.id}
                id="fleet-panel-electric"
                className={`fleet-showcase-card scroll-mt-24 sm:scroll-mt-28 bg-white rounded-3xl border border-brand-soft-neutral shadow-sm hover:border-brand-indigo/30 transition-all flex flex-col justify-between overflow-hidden group ${selectedCategoryId === "electric" ? "col-span-full max-w-4xl mx-auto w-full" : ""}`}
              >
                <div>
                  {/* Card Top Banner / Image */}
                  <div className="relative h-56 sm:h-64 w-full bg-slate-900 overflow-hidden">
                    <Image
                      src={category.heroImage}
                      alt={evTitle}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-indigo/80 backdrop-blur-md border border-white/20 text-[11px] font-bold tracking-wide uppercase text-white shadow-sm">
                        <Zap className="w-3.5 h-3.5 text-brand-blue" />
                        {evTitle}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-brand-indigo shadow-sm">
                        <Users className="w-3.5 h-3.5 text-brand-blue" />
                        {fleetDict?.electric?.priceValue || "Request a quote"}
                      </span>
                    </div>

                    {/* Title overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-2xl font-extrabold tracking-tight">
                        {evTitle}
                      </h3>
                      <p className="text-xs text-white/80 line-clamp-1 mt-0.5">
                        {fleetDict?.imageCaption || "Vehicle imagery is illustrative."}
                      </p>
                    </div>
                  </div>

                  {/* Key Specifications Matrix */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <p className="text-sm text-brand-ink/75 leading-relaxed">
                      {evIntro}
                    </p>

                    {/* Information Rows */}
                    <dl className="space-y-3 text-xs">
                      <div className="p-3.5 rounded-2xl bg-brand-soft-neutral/30 border border-brand-soft-neutral/60 flex items-start gap-3">
                        <Clock className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                        <div>
                          <dt className="text-[10px] uppercase font-bold text-brand-slate block">
                            {fleetDict?.electric?.journeyRequirementsLabel || "Journey requirements"}
                          </dt>
                          <dd className="font-semibold text-brand-indigo text-xs sm:text-sm mt-0.5">
                            {fleetDict?.electric?.journeyRequirementsValue || "Route, timings and travel frequency."}
                          </dd>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-brand-soft-neutral/30 border border-brand-soft-neutral/60 flex items-start gap-3">
                        <Users className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                        <div>
                          <dt className="text-[10px] uppercase font-bold text-brand-slate block">
                            {fleetDict?.electric?.passengerRequirementsLabel || "Passenger requirements"}
                          </dt>
                          <dd className="font-semibold text-brand-indigo text-xs sm:text-sm mt-0.5">
                            {fleetDict?.electric?.passengerRequirementsValue || "Number of travellers and luggage."}
                          </dd>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-brand-soft-neutral/30 border border-brand-soft-neutral/60 flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                        <div>
                          <dt className="text-[10px] uppercase font-bold text-brand-slate block">
                            {fleetDict?.electric?.vehicleAllocationLabel || "Vehicle allocation"}
                          </dt>
                          <dd className="font-semibold text-brand-indigo text-xs sm:text-sm mt-0.5">
                            {fleetDict?.electric?.vehicleAllocationValue || "Confirmed during the enquiry."}
                          </dd>
                        </div>
                      </div>
                    </dl>

                    {/* Pricing & Availability Note */}
                    <div className="pt-2 border-t border-brand-soft-neutral flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-brand-slate block">
                          {fleetDict?.electric?.pricingLabel || "Pricing"}:
                        </span>
                        <span className="text-base font-bold text-brand-indigo">
                          {fleetDict?.electric?.priceValue || "Request a quote"}
                        </span>
                      </div>
                      <span className="text-brand-ink/75 bg-brand-soft-neutral/50 px-2.5 py-1 rounded-md text-[11px] font-semibold">
                        {fleetDict?.electric?.availabilityNote || "Vehicle options, pricing and route suitability are confirmed by our team."}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 sm:p-8 pt-0 flex flex-wrap sm:flex-nowrap items-center gap-3">
                  <Link
                    href={`${region === "india" ? "/india" : "/uae"}/contact?category=${encodeURIComponent("Electric Vehicles")}`}
                    className="flex-1 inline-flex min-h-[44px] items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-indigo hover:bg-brand-blue text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <span>{fleetDict?.electric?.enquireCta || "Enquire about electric vehicles"}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>

                  <Link
                    href={`${region === "india" ? "/india" : "/uae"}/estimator`}
                    className="flex-1 sm:flex-initial inline-flex min-h-[44px] items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-brand-indigo/30 bg-white text-brand-indigo hover:bg-brand-soft-neutral/40 text-xs font-bold transition-all"
                  >
                    <span>{fleetDict?.estimateCta || "Plan a journey"}</span>
                  </Link>
                </div>
              </article>
            );
          }

          const catName = fleetDict?.categories?.[category.id]?.name || category.name;

          return (
            <article
              key={category.id}
              className="fleet-showcase-card bg-white rounded-3xl border border-brand-soft-neutral shadow-sm hover:border-brand-indigo/30 transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Card Top Banner / Image */}
                <div className="relative h-56 sm:h-64 w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={category.heroImage}
                    alt={catName}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-indigo/80 backdrop-blur-md border border-white/20 text-[11px] font-bold tracking-wide uppercase text-white shadow-sm">
                      <IconComp className="w-3.5 h-3.5 text-brand-violet" />
                      {category.categoryBadge}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-brand-indigo shadow-sm">
                      <Users className="w-3.5 h-3.5 text-brand-blue" />
                      {category.passengerLabel}
                    </span>
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-extrabold tracking-tight">
                      {catName}
                    </h3>
                    <p className="text-xs text-brand-slate-light line-clamp-1">
                      Models: {category.popularModels?.join(" · ")}
                    </p>
                  </div>
                </div>

                {/* Key Specifications Matrix */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Passenger & Luggage Specs Bar */}
                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-brand-soft-neutral/30 border border-brand-soft-neutral/60 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-brand-indigo shadow-2xs shrink-0">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-brand-slate block">
                          Passengers
                        </span>
                        <span className="font-bold text-brand-indigo">
                          {category.passengerCapacity} Seats
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-brand-indigo shadow-2xs shrink-0">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-brand-slate block">
                          Luggage
                        </span>
                        <span className="font-bold text-brand-indigo">
                          {category.luggageCapacity.largeSuitcases} Check-in + {category.luggageCapacity.cabinBags} Cabin
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Cabin Comfort & Seating */}
                  <div className="space-y-2 text-xs">
                    <span className="font-bold text-brand-indigo uppercase tracking-wider text-[11px] block">
                      Cabin Architecture &amp; Climate
                    </span>
                    <p className="text-brand-slate leading-relaxed">
                      {category.cabinLayout.seats}. {category.cabinLayout.climate}.
                    </p>
                  </div>

                  {/* Safety & Telematics Checklist Preview */}
                  <div className="space-y-2">
                    <span className="font-bold text-brand-indigo uppercase tracking-wider text-[11px] block">
                      Safety &amp; Telematics Highlights
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-brand-slate">
                      {category.safetyTelematics.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Availability Note */}
                  <div className="pt-2 border-t border-brand-soft-neutral flex items-center justify-between text-xs">
                    <span className="text-brand-slate font-medium">Availability:</span>
                    <span className="text-brand-ink/75 bg-brand-soft-neutral/50 px-2.5 py-1 rounded-md text-[11px] font-semibold">
                      Confirmed upon quotation request
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 sm:p-8 pt-0 flex flex-wrap sm:flex-nowrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setInspectingCategory(category)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-indigo hover:bg-brand-indigo-light text-white text-xs font-bold transition-all shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Inspect Specs &amp; Amenities</span>
                </button>

                <Link
                  href={`${region === "india" ? "/india" : "/uae"}/contact?category=${encodeURIComponent(category.name)}`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-brand-indigo/30 bg-white text-brand-indigo hover:bg-brand-soft-neutral/40 text-xs font-bold transition-all"
                >
                  <span>Enquire About Category</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {/* DETAILED INSPECTION MODAL */}
      {inspectingCategory && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-brand-soft-neutral shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-brand-soft-neutral pb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-indigo/10 text-brand-indigo text-[10px] font-bold uppercase tracking-wider mb-1">
                  {inspectingCategory.categoryBadge}
                </span>
                <h3 className="text-2xl font-extrabold text-brand-indigo">
                  {fleetDict?.categories?.[inspectingCategory.id]?.name || inspectingCategory.name}
                </h3>
                {inspectingCategory.popularModels && inspectingCategory.popularModels.length > 0 && (
                  <p className="text-xs text-brand-slate">
                    Authorized Models: {inspectingCategory.popularModels.join(", ")}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setInspectingCategory(null)}
                className="w-9 h-9 rounded-xl bg-brand-soft-neutral/60 hover:bg-brand-soft-neutral text-brand-indigo flex items-center justify-center transition-colors"
                aria-label="Close vehicle inspection"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Capacity & Luggage Detailed Box */}
            <div className="bg-brand-soft-neutral/30 rounded-2xl p-5 border border-brand-soft-neutral/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-slate block">
                  Passenger Configuration
                </span>
                <p className="text-sm font-bold text-brand-indigo">
                  {inspectingCategory.passengerLabel}
                </p>
                <p className="text-xs text-brand-slate">
                  {inspectingCategory.cabinLayout.seats}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-slate block">
                  Luggage Capacity Allowance
                </span>
                <p className="text-sm font-bold text-brand-indigo">
                  {inspectingCategory.id === "electric"
                    ? "Confirmed during enquiry"
                    : `${inspectingCategory.luggageCapacity.largeSuitcases} Large + ${inspectingCategory.luggageCapacity.cabinBags} Cabin Bags`}
                </p>
                <p className="text-xs text-brand-slate">
                  {inspectingCategory.luggageCapacity.description}
                </p>
              </div>
            </div>

            {/* Safety & Telematics Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-indigo flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Enterprise Safety &amp; Telematics Protocols</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {inspectingCategory.safetyTelematics.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/60 text-xs text-emerald-950 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Onboard Amenities */}
            {inspectingCategory.amenities && inspectingCategory.amenities.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-indigo flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Standard Onboard Executive Amenities</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {inspectingCategory.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/60 text-xs text-amber-950 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Typical Enterprise Applications */}
            {inspectingCategory.useCases && inspectingCategory.useCases.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-indigo">
                  Recommended Enterprise Deployments
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-brand-slate">
                  {inspectingCategory.useCases.map((useCase, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-brand-soft-neutral flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-brand-slate">
                <span>Quotation confirmed on review of route, timings and dates.</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setInspectingCategory(null)}
                  className="px-4 py-2 rounded-xl border border-brand-soft-neutral text-xs font-bold text-brand-slate hover:bg-brand-soft-neutral/50"
                >
                  Close
                </button>
                <Link
                  href={`${region === "india" ? "/india" : "/uae"}/contact?category=${encodeURIComponent(inspectingCategory.id === "electric" ? "Electric Vehicles" : inspectingCategory.name)}`}
                  className="px-5 py-2.5 rounded-xl bg-brand-indigo hover:bg-brand-indigo-light text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5"
                >
                  <span>{inspectingCategory.id === "electric" ? (fleetDict?.electric?.enquireCta || "Enquire about electric vehicles") : "Request a quote"}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TARIFF CALCULATOR & INSTANT QUOTE GENERATOR */}
      <section className="bg-brand-ink text-white rounded-3xl p-6 sm:p-10 border border-brand-indigo/30 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-indigo/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mb-8 space-y-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/40 border border-brand-violet/40 text-[11px] font-bold tracking-widest uppercase text-brand-violet">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Corporate Rate Card &amp; Tariff Estimator
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Configure {region === "india" ? "India National" : "UAE Executive"} Tariff
          </h3>
          <p className="text-xs sm:text-sm text-brand-slate-light leading-relaxed">
            Select your vehicle tier, assignment duration, and operating base to generate tailored booking dispatch parameters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form */}
          <div className="lg:col-span-7 space-y-5 bg-white/5 p-6 rounded-2xl border border-white/10">
            {/* Step 1: Vehicle Category */}
            <div className="space-y-2">
              <label
                htmlFor="fleet-category-select"
                className="text-xs font-bold uppercase tracking-wider text-brand-slate-light flex items-center gap-1.5"
              >
                <Car className="w-3.5 h-3.5 text-brand-violet" />
                <span>1. Select Vehicle Tier</span>
              </label>
              <select
                id="fleet-category-select"
                value={calcCategory}
                onChange={(e) => setCalcCategory(e.target.value)}
                className="w-full bg-slate-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-violet"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {fleetDict?.categories?.[c.id]?.name || c.name} {c.passengerCapacity > 0 ? `(${c.passengerCapacity} Seats)` : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Duty Duration */}
            <div className="space-y-2">
              <label
                htmlFor="fleet-duty-select"
                className="text-xs font-bold uppercase tracking-wider text-brand-slate-light flex items-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5 text-brand-violet" />
                <span>2. Duty Scope &amp; Timing</span>
              </label>
              <select
                id="fleet-duty-select"
                value={calcDuty}
                onChange={(e) => setCalcDuty(e.target.value)}
                className="w-full bg-slate-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-violet"
              >
                <option value="airportTransfer">Airport VIP Transfer (Meet &amp; Greet Included)</option>
                <option value="halfDay">{dutyLabels.halfDay}</option>
                <option value="fullDay">{dutyLabels.fullDay}</option>
                <option value="outstation">{dutyLabels.outstation}</option>
                <option value="monthlyRetainer">{dutyLabels.monthlyRetainer}</option>
              </select>
            </div>

            {/* Step 3: Operating City */}
            <div className="space-y-2">
              <label
                htmlFor="fleet-city-select"
                className="text-xs font-bold uppercase tracking-wider text-brand-slate-light flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-brand-violet" />
                <span>3. Primary Operating City</span>
              </label>
              <select
                id="fleet-city-select"
                value={calcCity}
                onChange={(e) => setCalcCity(e.target.value)}
                className="w-full bg-slate-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-violet"
              >
                {region === "india" ? (
                  <>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Noida">Noida</option>
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Kolkata">Kolkata</option>
                  </>
                ) : (
                  <>
                    <option value="Dubai">Dubai (Al Garhoud UAE Head Office)</option>
                    <option value="Abu Dhabi">Abu Dhabi Operations</option>
                    <option value="Sharjah">Sharjah Corridor</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Requirement Summary Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-indigo/90 to-brand-ink rounded-2xl p-6 sm:p-7 border border-brand-violet/30 shadow-lg space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-violet block">
                Requirement Summary
              </span>
              <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {fleetDict?.categories?.[activeCategoryForCalc.id]?.name || activeCategoryForCalc.name}
              </div>
              <p className="text-xs text-brand-slate-light pt-1">
                Quote requests collect travel requirements; our team provides the actual quotation.
              </p>
            </div>

            <div className="space-y-2.5 text-xs text-brand-soft-neutral/80 border-t border-white/10 pt-4">
              <div className="flex items-center justify-between">
                <span>Duty Assignment:</span>
                <span className="font-semibold text-white">{dutyLabels[calcDuty]}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Operating City:</span>
                <span className="font-semibold text-white">{calcCity}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Passenger Seating:</span>
                <span className="font-semibold text-white">
                  {isCalcEv ? "Confirmed during enquiry" : activeCategoryForCalc.passengerLabel}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Luggage Allowance:</span>
                <span className="font-semibold text-white">
                  {isCalcEv
                    ? "Confirmed during enquiry"
                    : `${activeCategoryForCalc.luggageCapacity.largeSuitcases} Large / ${activeCategoryForCalc.luggageCapacity.cabinBags} Cabin`}
                </span>
              </div>
            </div>

            {/* Commercial Action CTA */}
            <div className="space-y-3 pt-2">
              <Link
                href={`${region === "india" ? "/india" : "/uae"}/contact?category=${encodeURIComponent(isCalcEv ? "Electric Vehicles" : activeCategoryForCalc.name)}&city=${encodeURIComponent(calcCity)}`}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-indigo hover:bg-brand-indigo-light text-white text-xs font-bold transition-all shadow-md"
              >
                <span>{isCalcEv ? (fleetDict?.electric?.enquireCta || "Enquire about electric vehicles") : "Request a quote"}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>

              <a
                href={waQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Continue on WhatsApp</span>
              </a>

              <div className="flex items-center justify-between text-[11px] text-brand-slate-light px-1">
                <span>Direct Desk:</span>
                <a
                  href={phoneHref}
                  className="font-bold text-white hover:text-brand-violet transition-colors flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-brand-violet" />
                  <span>{phoneDisplay}</span>
                </a>
              </div>
            </div>

            <p className="text-[11px] text-white/50 leading-relaxed italic border-t border-white/10 pt-3">
              Note: Final corporate rates are confirmed based on exact route kilometers, schedule requirements, and vehicle categories.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
