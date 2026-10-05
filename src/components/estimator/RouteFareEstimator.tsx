"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Car,
  Clock,
  Navigation,
  ShieldCheck,
  CheckCircle2,
  Copy,
  MessageSquare,
  FileSpreadsheet,
  Info,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import corridorsData from "@/content/corridors.json";

interface RouteFareEstimatorProps {
  region: "india" | "uae";
}

export default function RouteFareEstimator({ region }: RouteFareEstimatorProps) {
  const data = region === "india" ? corridorsData.india : corridorsData.uae;
  const hubs = useMemo(() => {
    const list = Array.from(new Set(data.corridors.map((c) => c.hub)));
    return ["All Corridors", ...list];
  }, [data]);

  const [selectedHub, setSelectedHub] = useState<string>("All Corridors");
  const filteredCorridors = useMemo(() => {
    if (selectedHub === "All Corridors") return data.corridors;
    return data.corridors.filter((c) => c.hub === selectedHub);
  }, [data, selectedHub]);

  const [selectedCorridorId, setSelectedCorridorId] = useState<string>(
    filteredCorridors[0]?.id || data.corridors[0].id
  );

  const activeCorridor = useMemo(() => {
    return (
      data.corridors.find((c) => c.id === selectedCorridorId) ||
      filteredCorridors[0] ||
      data.corridors[0]
    );
  }, [data, selectedCorridorId, filteredCorridors]);

  const [selectedTierId, setSelectedTierId] = useState<string>("sedan");
  const activeTier = useMemo(() => {
    return (
      data.vehicleTiers.find((t) => t.id === selectedTierId) ||
      data.vehicleTiers[0]
    );
  }, [data, selectedTierId]);

  const [copied, setCopied] = useState<boolean>(false);

  // Price estimate for active corridor and tier
  const priceRange =
    activeCorridor.priceRange[
      selectedTierId as keyof typeof activeCorridor.priceRange
    ] || "Rate on Request";

  // WhatsApp numbers & links
  const whatsappNumber = region === "india" ? "919396546950" : "971524552441";
  const entityName =
    region === "india" ? "Victor Mobility (India)" : "Victor Luxury Limousine (UAE)";

  const formattedSummary = `*VICTOR MOBILITY · ROUTE FARE ESTIMATION REQUEST*
Entity: ${entityName}
Tagline: On Time Every Time.

*Transit Route Details:*
• Route: ${activeCorridor.from} ➔ ${activeCorridor.to}
• Operating Hub: ${activeCorridor.hub}
• Distance: ~${activeCorridor.distanceKm} km
• Est. Duration: ${activeCorridor.estDuration}
• Highway / Corridor: ${activeCorridor.highway}

*Vehicle Preference:*
• Tier: ${activeTier.name} (${activeTier.models})
• Capacity: ${activeTier.capacity}

*Indicative Commercial Range:*
• Estimated Bracket: ${priceRange}
• Note: Indicative estimate for planning. Please share formal quote and availability.`;

  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    formattedSummary
  )}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl border border-brand-soft-neutral shadow-sm overflow-hidden">
      {/* Estimator Header Banner */}
      <div className="bg-brand-indigo px-6 py-8 text-white">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-xs font-semibold text-brand-blue-light mb-3">
            <Navigation className="w-3.5 h-3.5" />
            <span>Interactive Corridor Fare Estimator · {region === "india" ? "India Network" : "UAE Limousine Network"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Calculate Point-to-Point & Corridor Fares
          </h2>
          <p className="mt-2 text-sm sm:text-base text-brand-slate-light leading-relaxed">
            Select your corridor and preferred vehicle tier to review indicative enterprise rates, transit durations, and onboard inclusions backed by <strong className="text-white">&ldquo;On Time Every Time.&rdquo;</strong>
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left Column: Route & Vehicle Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Hub Filters */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-2">
              Select City / Operational Hub
            </label>
            <div className="flex flex-wrap gap-2">
              {hubs.map((hub) => (
                <button
                  key={hub}
                  type="button"
                  onClick={() => {
                    setSelectedHub(hub);
                    const firstMatch =
                      hub === "All Corridors"
                        ? data.corridors[0]
                        : data.corridors.find((c) => c.hub === hub);
                    if (firstMatch) setSelectedCorridorId(firstMatch.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedHub === hub
                      ? "bg-brand-blue text-white shadow-sm"
                      : "bg-brand-soft-neutral/50 text-brand-indigo hover:bg-brand-soft-neutral"
                  }`}
                >
                  {hub}
                </button>
              ))}
            </div>
          </div>

          {/* Corridor Selection */}
          <div>
            <label
              htmlFor="corridor-select"
              className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-2"
            >
              Primary Transit Corridor
            </label>
            <select
              id="corridor-select"
              value={selectedCorridorId}
              onChange={(e) => setSelectedCorridorId(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-brand-soft-neutral rounded-xl text-brand-indigo font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            >
              {filteredCorridors.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.from} ➔ {c.to} ({c.distanceKm} km · {c.estDuration})
                </option>
              ))}
            </select>
          </div>

          {/* Route Overview Card */}
          <div className="bg-brand-soft-neutral/30 rounded-xl p-4 sm:p-5 border border-brand-soft-neutral/60">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-brand-blue uppercase tracking-wider">
                  Selected Route Specifications
                </span>
                <h4 className="text-base sm:text-lg font-bold text-brand-indigo mt-0.5">
                  {activeCorridor.from}
                </h4>
                <div className="flex items-center gap-2 text-xs text-brand-slate my-1">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-blue" />
                  <span className="font-semibold text-brand-indigo">{activeCorridor.to}</span>
                </div>
                <p className="text-xs text-brand-slate mt-1">
                  Corridor: <span className="font-medium text-brand-indigo">{activeCorridor.highway}</span>
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-extrabold text-brand-indigo block">
                  ~{activeCorridor.distanceKm} km
                </span>
                <span className="text-xs text-brand-slate flex items-center justify-end gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-brand-blue" />
                  {activeCorridor.estDuration}
                </span>
              </div>
            </div>

            {/* Corridor Highlights */}
            <div className="mt-3 pt-3 border-t border-brand-soft-neutral/80 space-y-1.5">
              {activeCorridor.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-brand-slate">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle Tier Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-2">
              Select Fleet Tier
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.vehicleTiers.map((tier) => {
                const isSelected = selectedTierId === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedTierId(tier.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all relative ${
                      isSelected
                        ? "border-brand-blue bg-brand-blue/5 ring-1 ring-brand-blue"
                        : "border-brand-soft-neutral bg-white hover:border-brand-slate-light"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-brand-indigo">
                        {tier.name}
                      </span>
                      <Car
                        className={`w-4 h-4 ${
                          isSelected ? "text-brand-blue" : "text-brand-slate"
                        }`}
                      />
                    </div>
                    <p className="text-xs text-brand-slate mt-1 font-medium line-clamp-1">
                      {tier.models}
                    </p>
                    <p className="text-[11px] text-brand-slate/80 mt-1">
                      {tier.capacity}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Price Card & Dispatch Action (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-b from-brand-indigo to-[#060B1A] text-white rounded-2xl p-6 sm:p-8">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs uppercase font-bold tracking-widest text-brand-blue-light">
                Indicative Estimate
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                Corporate Tariff
              </span>
            </div>

            {/* Price Display */}
            <div className="my-6">
              <span className="text-xs text-brand-slate-light uppercase tracking-wider block mb-1">
                Estimated Transit Range
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {priceRange}
              </div>
              <p className="text-xs text-brand-slate-light mt-2 leading-relaxed">
                Includes dedicated chauffeur, fuel, route tracking, and standard waiting allowance.
              </p>
            </div>

            {/* Inclusions Card */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2 mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-slate-light block">
                Standard Inclusions
              </span>
              <ul className="text-xs text-brand-slate-light space-y-1.5">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-blue-light shrink-0" />
                  <span>100% Police Verified & BGV Cleared Chauffeur</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-blue-light shrink-0" />
                  <span>Flight delay radar monitoring & complimentary wait</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-blue-light shrink-0" />
                  <span>Chilled bottled water & fast device charging</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-blue-light shrink-0" />
                  <span>24/7 Operations GPS telemetry monitoring</span>
                </li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-2 text-[11px] text-brand-slate-light/80 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
              <Info className="w-3.5 h-3.5 text-brand-blue-light shrink-0 mt-0.5" />
              <span>
                {data.note}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 space-y-3 pt-6 border-t border-white/10">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg hover:shadow-emerald-600/30"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire via WhatsApp with Estimate</span>
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-all border border-white/10"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Summary</span>
                  </>
                )}
              </button>

              <Link
                href={`/${region}/rfp`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-semibold transition-all"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Request RFP</span>
              </Link>
            </div>
            <p className="text-[11px] text-center text-brand-slate-light/60">
              Opening WhatsApp prepares your request draft; it does not confirm a booking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
