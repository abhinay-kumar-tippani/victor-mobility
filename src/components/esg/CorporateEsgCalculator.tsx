"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Leaf,
  Trees,
  Fuel,
  TrendingDown,
  Printer,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Bus,
  Car,
  Zap,
  Globe,
  Award,
  ArrowRight,
} from "lucide-react";
import esgData from "@/content/esg.json";

interface CorporateEsgCalculatorProps {
  region: "india" | "uae";
}

export default function CorporateEsgCalculator({
  region,
}: CorporateEsgCalculatorProps) {
  const content = region === "india" ? esgData.india : esgData.uae;
  const benchmarks = content.emissionsBenchmarks;

  // Interactive State
  const [commuterCount, setCommuterCount] = useState<number>(150);
  const [dailyDistanceKm, setDailyDistanceKm] = useState<number>(45);
  const [transitStrategy, setTransitStrategy] = useState<"bus" | "ev">("bus");
  const [evPercentage, setEvPercentage] = useState<number>(50);

  // Calculations:
  // Baseline: individual ICE cars for each commuter
  // Working days per year = 250 days; per month = ~21 days
  const annualKmPerCommuter = dailyDistanceKm * 250;
  const monthlyKmPerCommuter = dailyDistanceKm * 21;

  // Baseline ICE Emissions (kg CO2)
  const baselineAnnualCo2Kg =
    (commuterCount * annualKmPerCommuter * benchmarks.iceSedanGPerKm) / 1000;
  const baselineMonthlyCo2Kg =
    (commuterCount * monthlyKmPerCommuter * benchmarks.iceSedanGPerKm) / 1000;

  // Optimized Strategy Emissions (kg CO2)
  let optimizedAnnualCo2Kg = 0;
  let strategyLabel = "";

  if (transitStrategy === "bus") {
    // Shared bus fleet: 44 passengers per bus
    const busesNeeded = Math.ceil(commuterCount / 35); // realistic average fill
    // Total bus km = busesNeeded * annualKmPerCommuter
    optimizedAnnualCo2Kg =
      (busesNeeded * annualKmPerCommuter * benchmarks.iceBusGPerKm) / 1000;
    strategyLabel = "High-Capacity Shared Corporate Bus Network";
  } else {
    // EV Transition: proportion of fleet electrified
    const evFactor = evPercentage / 100;
    const iceFactor = 1 - evFactor;
    const blendedGPerKm =
      evFactor * benchmarks.evSedanGPerKm + iceFactor * benchmarks.iceSedanGPerKm;
    optimizedAnnualCo2Kg =
      (commuterCount * annualKmPerCommuter * blendedGPerKm) / 1000;
    strategyLabel = `${evPercentage}% Electric Vehicle (EV) Transition Mix`;
  }

  // Savings
  const annualCo2SavedKg = Math.max(0, baselineAnnualCo2Kg - optimizedAnnualCo2Kg);
  const annualCo2SavedTonnes = (annualCo2SavedKg / 1000).toFixed(1);
  const monthlyCo2SavedTonnes = (
    (baselineMonthlyCo2Kg - (optimizedAnnualCo2Kg * 21) / 250) /
    1000
  ).toFixed(1);

  const percentReduction = Math.round(
    (annualCo2SavedKg / (baselineAnnualCo2Kg || 1)) * 100
  );

  // Tree absorption equivalent (21.8 kg CO2/year per mature tree)
  const treesEquivalent = Math.round(
    annualCo2SavedKg / benchmarks.treeAbsorptionKgPerYear
  );

  // Barrels of oil equivalent (~430 kg CO2 per barrel of crude oil burned)
  const barrelsOilEquivalent = Math.round(annualCo2SavedKg / 430);

  const handlePrint = () => {
    window.print();
  };

  const waNumber = region === "india" ? "919396546950" : "971524552441";
  const waEsgMessage = `*VICTOR MOBILITY · ESG CARBON MITIGATION CONSULTATION*
Region: ${region === "india" ? "India (Hyderabad / Bengaluru / Pune)" : "UAE (Dubai / Abu Dhabi)"}
Corporate Commuters: ${commuterCount} employees
Daily Route Distance: ${dailyDistanceKm} km round-trip
Strategy: ${strategyLabel}
Estimated Annual CO2 Offset: ${annualCo2SavedTonnes} Metric Tonnes (${percentReduction}% Reduction)
Equivalent Forest Impact: ${treesEquivalent.toLocaleString()} mature trees
Tagline: On Time Every Time.

Hello Victor Sustainability Team,
We would like to consult your corporate mobility desk on integrating Scope 3 employee commute emission reductions into our annual sustainability & RFP roadmap.`;

  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    waEsgMessage
  )}`;

  return (
    <div className="space-y-12">
      {/* Interactive Calculator Workspace */}
      <div className="bg-white rounded-3xl border-2 border-brand-indigo/10 shadow-xl overflow-hidden p-6 sm:p-10 space-y-8">
        {/* Workspace Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-soft-neutral pb-6">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <Leaf className="w-3.5 h-3.5" />
              Scope 3 Carbon Modeling Tool
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-indigo tracking-tight">
              Corporate Commute Carbon Savings Estimator
            </h3>
            <p className="text-xs sm:text-sm text-brand-slate">
              Model the tangible carbon offset achieved by shifting from private uncoordinated transport to Victor&apos;s synchronized shared networks.
            </p>
          </div>

          <div className="flex items-center gap-3 print:hidden">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-brand-soft-neutral bg-white hover:bg-brand-soft-neutral text-xs font-bold text-brand-indigo transition-all shadow-2xs"
            >
              <Printer className="w-4 h-4 text-brand-indigo" />
              <span>Print ESG Report</span>
            </button>
          </div>
        </div>

        {/* Input Parameters Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6 bg-brand-soft-neutral/30 rounded-2xl p-6 border border-brand-soft-neutral/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-indigo flex items-center gap-2">
              <Sliders className="w-4 h-4 text-brand-blue" />
              <span>1. Workplace Commute Baseline</span>
            </h4>

            {/* Slider 1: Commuter Count */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-brand-slate">Daily Corporate Commuters</span>
                <span className="font-extrabold text-brand-indigo text-base bg-white px-3 py-1 rounded-lg border border-brand-soft-neutral shadow-2xs">
                  {commuterCount} Passengers
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="1000"
                step="10"
                value={commuterCount}
                onChange={(e) => setCommuterCount(Number(e.target.value))}
                className="w-full accent-brand-indigo cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-brand-slate-light font-mono">
                <span>20 pax (Team)</span>
                <span>500 pax</span>
                <span>1,000 pax (Campus)</span>
              </div>
            </div>

            {/* Slider 2: Daily Distance */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-brand-slate">Average Daily Round-Trip</span>
                <span className="font-extrabold text-brand-indigo text-base bg-white px-3 py-1 rounded-lg border border-brand-soft-neutral shadow-2xs">
                  {dailyDistanceKm} km / day
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="120"
                step="5"
                value={dailyDistanceKm}
                onChange={(e) => setDailyDistanceKm(Number(e.target.value))}
                className="w-full accent-brand-indigo cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-brand-slate-light font-mono">
                <span>15 km (City Center)</span>
                <span>60 km (Outer Ring)</span>
                <span>120 km (Corridor)</span>
              </div>
            </div>

            {/* Strategy Selector */}
            <div className="space-y-3 pt-2 border-t border-brand-soft-neutral">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-slate block">
                2. Transition Strategy Selection
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTransitStrategy("bus")}
                  className={`p-3.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                    transitStrategy === "bus"
                      ? "bg-brand-indigo text-white border-brand-indigo shadow-xs"
                      : "bg-white text-brand-indigo border-brand-soft-neutral hover:bg-brand-soft-neutral/40"
                  }`}
                >
                  <Bus className="w-5 h-5" />
                  <span>Shared Buses (22-44 Pax)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTransitStrategy("ev")}
                  className={`p-3.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                    transitStrategy === "ev"
                      ? "bg-brand-indigo text-white border-brand-indigo shadow-xs"
                      : "bg-white text-brand-indigo border-brand-soft-neutral hover:bg-brand-soft-neutral/40"
                  }`}
                >
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span>Electric Vehicle (EV) Mix</span>
                </button>
              </div>

              {/* EV Percentage Slider if EV selected */}
              {transitStrategy === "ev" && (
                <div className="space-y-2 pt-2 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-brand-slate">Target Fleet Electrification</span>
                    <span className="font-extrabold text-emerald-600 text-sm bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                      {evPercentage}% EV Fleet
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="10"
                    value={evPercentage}
                    onChange={(e) => setEvPercentage(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Results Impact Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-brand-ink text-white rounded-2xl p-6 sm:p-8 border border-emerald-500/30 shadow-lg space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Leaf className="w-32 h-32 text-emerald-400" />
              </div>

              <div className="relative space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                    Annual Carbon Offset
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs">
                    <TrendingDown className="w-3.5 h-3.5" />
                    -{percentReduction}% Carbon Cut
                  </span>
                </div>
                <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  {annualCo2SavedTonnes} <span className="text-xl font-bold text-emerald-300">Metric Tonnes CO₂e</span>
                </div>
                <p className="text-xs text-brand-slate-light pt-1">
                  Monthly Impact: Approx. <strong className="text-white">{monthlyCo2SavedTonnes} MT CO₂e</strong> saved every 30 days.
                </p>
              </div>

              {/* Equivalent Metrics */}
              <div className="relative grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
                <div className="bg-white/5 rounded-xl p-3.5 border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <Trees className="w-4 h-4" />
                    <span>Forest Equivalent</span>
                  </div>
                  <div className="text-xl font-extrabold text-white">
                    {treesEquivalent.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-brand-slate-light block">
                    Mature tree carbon absorption per year
                  </span>
                </div>

                <div className="bg-white/5 rounded-xl p-3.5 border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <Fuel className="w-4 h-4" />
                    <span>Fossil Fuel Conserved</span>
                  </div>
                  <div className="text-xl font-extrabold text-white">
                    {barrelsOilEquivalent.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-brand-slate-light block">
                    Barrels of crude oil equivalent
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="relative pt-2 space-y-3 print:hidden">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Consult ESG Mobility Specialist via WhatsApp</span>
                </a>

                <p className="text-[11px] text-center text-brand-slate-light">
                  Data formatted for Scope 3 Business Responsibility and Sustainability Reporting (BRSR).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 ESG OPERATIONAL PILLARS */}
      <div className="space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue block">
            Environmental Governance
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-indigo tracking-tight">
            How Victor Mobility Delivers Measurable Decarbonization
          </h3>
          <p className="text-xs sm:text-sm text-brand-slate leading-relaxed">
            Sustainability at Victor Mobility is not a speculative marketing claim; it is engineered through high-occupancy vehicle routing, driver behavioral training, and disciplined vehicle maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.esgPillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-brand-soft-neutral shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {pillar.badge}
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-brand-indigo">{pillar.title}</h4>
                <span className="text-xs text-brand-blue font-semibold block mb-2">
                  {pillar.subtitle}
                </span>
                <p className="text-xs text-brand-slate leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Governance & Compliance Standards */}
      <div className="bg-brand-soft-neutral/30 rounded-3xl p-6 sm:p-8 border border-brand-soft-neutral/80 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-brand-indigo flex items-center gap-2">
          <Award className="w-4 h-4 text-brand-blue" />
          <span>Audit &amp; Reporting Compliance Standards</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-brand-slate">
          {content.governanceStandards.map((std, idx) => (
            <div key={idx} className="flex items-start gap-2 bg-white p-3 rounded-xl border border-brand-soft-neutral shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{std}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
