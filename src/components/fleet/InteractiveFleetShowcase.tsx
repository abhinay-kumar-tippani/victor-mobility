"use client";

import { useState } from "react";
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
} from "lucide-react";
import fleetSpecsData from "@/content/fleet-specifications.json";

interface InteractiveFleetShowcaseProps {
  region: "india" | "uae";
}

export default function InteractiveFleetShowcase({
  region,
}: InteractiveFleetShowcaseProps) {
  const data = region === "india" ? fleetSpecsData.india : fleetSpecsData.uae;
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

  const getEstimatedRate = () => {
    const rc = activeCategoryForCalc.rateCard;
    if (calcDuty === "airportTransfer") return rc.airportTransfer;
    if (calcDuty === "halfDay") return rc.halfDay;
    if (calcDuty === "fullDay") return rc.fullDay;
    if (calcDuty === "outstation") return `${rc.outstationPerKm} + Driver Allowance`;
    return "Custom Commercial Contract (Upon RFP Submission)";
  };

  const waQuoteMessage = `*VICTOR MOBILITY · FLEET RATE INQUIRY*
Region: ${region === "india" ? "India (Hyderabad / Bengaluru / Pune)" : "UAE (Dubai / Abu Dhabi)"}
Category: ${activeCategoryForCalc.name}
Recommended Models: ${activeCategoryForCalc.popularModels.join(", ")}
Duty Type: ${dutyLabels[calcDuty]}
Operating City: ${calcCity}
Indicative Tariff: ${getEstimatedRate()}
Tagline: On Time Every Time.

Hello Victor Team,
I am reviewing this fleet specification. Please share your availability, formal quotation, and onboarding terms for our enterprise requirements.`;

  const waQuoteUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    waQuoteMessage
  )}`;

  const getCategoryIcon = (id: string) => {
    switch (id) {
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

  return (
    <div className="space-y-12">
      {/* Category Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedCategoryId("all")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            selectedCategoryId === "all"
              ? "bg-brand-indigo text-white shadow-sm"
              : "bg-brand-soft-neutral/50 text-brand-indigo hover:bg-brand-soft-neutral"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>All Fleet Categories ({categories.length})</span>
        </button>

        {categories.map((cat) => {
          const IconComp = getCategoryIcon(cat.id);
          const isSelected = selectedCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                isSelected
                  ? "bg-brand-indigo text-white shadow-sm"
                  : "bg-brand-soft-neutral/50 text-brand-indigo hover:bg-brand-soft-neutral"
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Fleet Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredCategories.map((category) => {
          const IconComp = getCategoryIcon(category.id);
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
                    alt={category.name}
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
                      {category.name}
                    </h3>
                    <p className="text-xs text-brand-slate-light line-clamp-1">
                      Models: {category.popularModels.join(" · ")}
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

                  {/* Indicative Rate Badge */}
                  <div className="pt-2 border-t border-brand-soft-neutral flex items-center justify-between text-xs">
                    <span className="text-brand-slate font-medium">Full-Day Tariff Guide:</span>
                    <span className="font-bold text-brand-indigo bg-brand-soft-neutral/50 px-2.5 py-1 rounded-md">
                      {category.rateCard.fullDay}
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

                <button
                  type="button"
                  onClick={() => {
                    setCalcCategory(category.id);
                    const calcEl = document.getElementById("fleet-rate-calculator");
                    if (calcEl) calcEl.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-brand-indigo/30 bg-white text-brand-indigo hover:bg-brand-soft-neutral/40 text-xs font-bold transition-all"
                >
                  <span>Build Rate Card</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
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
                  {inspectingCategory.name}
                </h3>
                <p className="text-xs text-brand-slate">
                  Authorized Models: {inspectingCategory.popularModels.join(", ")}
                </p>
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
                  {inspectingCategory.luggageCapacity.largeSuitcases} Large + {inspectingCategory.luggageCapacity.cabinBags} Cabin Bags
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

            {/* Typical Enterprise Applications */}
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

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-brand-soft-neutral flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-brand-slate block">Indicative Tariff:</span>
                <span className="text-sm font-bold text-brand-indigo">
                  {inspectingCategory.rateCard.fullDay}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setInspectingCategory(null)}
                  className="px-4 py-2 rounded-xl border border-brand-soft-neutral text-xs font-bold text-brand-slate hover:bg-brand-soft-neutral/50"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCalcCategory(inspectingCategory.id);
                    setInspectingCategory(null);
                    const calcEl = document.getElementById("fleet-rate-calculator");
                    if (calcEl) calcEl.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-brand-indigo hover:bg-brand-indigo-light text-white text-xs font-bold transition-all shadow-xs"
                >
                  Generate Rate Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: INSTANT CORPORATE RATE CARD & QUOTATION BUILDER */}
      <section
        id="fleet-rate-calculator"
        className="scroll-mt-24 bg-brand-ink text-white rounded-3xl p-6 sm:p-10 border border-brand-indigo/30 shadow-xl space-y-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6E57A0_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-indigo/40 border border-brand-violet/40 text-xs font-bold uppercase tracking-widest text-brand-soft-neutral">
            <FileSpreadsheet className="w-3.5 h-3.5 text-brand-violet" />
            Transparent Commercial Governance
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Instant Corporate Rate Card &amp; Tariff Estimator
          </h2>
          <p className="text-sm sm:text-base text-brand-slate-light leading-relaxed">
            Select your target vehicle class, duty type, and operating hub to view indicative commercial benchmarks. Generate an exact formal quotation brief for your procurement desk with: <strong className="text-white">&ldquo;On Time Every Time.&rdquo;</strong>
          </p>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form */}
          <div className="lg:col-span-7 bg-white/5 rounded-2xl p-6 border border-white/10 space-y-5">
            {/* Step 1: Category */}
            <div className="space-y-2">
              <label
                htmlFor="fleet-category-select"
                className="text-xs font-bold uppercase tracking-wider text-brand-slate-light flex items-center gap-1.5"
              >
                <Car className="w-3.5 h-3.5 text-brand-violet" />
                <span>1. Vehicle Fleet Category</span>
              </label>
              <select
                id="fleet-category-select"
                value={calcCategory}
                onChange={(e) => setCalcCategory(e.target.value)}
                className="w-full bg-slate-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-violet"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.popularModels.join(", ")})
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Duty Type */}
            <div className="space-y-2">
              <label
                htmlFor="fleet-duty-select"
                className="text-xs font-bold uppercase tracking-wider text-brand-slate-light flex items-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5 text-brand-violet" />
                <span>2. Required Duty Assignment</span>
              </label>
              <select
                id="fleet-duty-select"
                value={calcDuty}
                onChange={(e) => setCalcDuty(e.target.value)}
                className="w-full bg-slate-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-violet"
              >
                <option value="airportTransfer">
                  {region === "india" ? "Airport Transfer (RGIA / BLR / PNQ)" : "Airport VIP Transfer (DXB / AUH / DWC)"}
                </option>
                <option value="halfDay">
                  {region === "india" ? "Half-Day Local (4 Hours / 40 KM)" : "Half-Day City Disposal (5 Hours)"}
                </option>
                <option value="fullDay">
                  {region === "india" ? "Full-Day Dedicated (8 Hours / 80 KM)" : "Full-Day City Disposal (10 Hours)"}
                </option>
                <option value="outstation">
                  {region === "india" ? "Outstation Intercity Corridor Travel" : "Inter-Emirate Travel (Dubai–Abu Dhabi)"}
                </option>
                <option value="monthlyRetainer">
                  Corporate Monthly Commute Retainer (Dedicated Fleet)
                </option>
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
                    <option value="Hyderabad">Hyderabad (Telangana Head Office)</option>
                    <option value="Bengaluru">Bengaluru (Karnataka Branch)</option>
                    <option value="Pune">Pune (Maharashtra Branch)</option>
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

          {/* Rate Card Summary Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-indigo/90 to-brand-ink rounded-2xl p-6 sm:p-7 border border-brand-violet/30 shadow-lg space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-violet block">
                Benchmark Tariff Estimate
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {getEstimatedRate()}
              </div>
              <p className="text-xs text-brand-slate-light pt-1">
                Category: <strong className="text-white">{activeCategoryForCalc.name}</strong>
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
                <span className="font-semibold text-white">{activeCategoryForCalc.passengerLabel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Luggage Allowance:</span>
                <span className="font-semibold text-white">
                  {activeCategoryForCalc.luggageCapacity.largeSuitcases} Large / {activeCategoryForCalc.luggageCapacity.cabinBags} Cabin
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Fuel &amp; Chauffeur:</span>
                <span className="font-semibold text-emerald-400">Included</span>
              </div>
            </div>

            {/* Commercial Action CTA */}
            <div className="space-y-3 pt-2">
              <a
                href={waQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Request Rate Card via WhatsApp</span>
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
              Note: Final corporate rates are confirmed based on exact multi-vehicle volume commitments, monthly corridor kilometers, and contractual SLA terms.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
