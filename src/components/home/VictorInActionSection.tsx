"use client";

import { useState } from "react";
import { CheckCircle2, Shield, Calendar, MapPin, Users, Building2, Sparkles, HeartHandshake, ArrowRight } from "lucide-react";
import Link from "next/link";

interface CaseStudy {
  id: string;
  category: string;
  title: string;
  clientType: string;
  locations: string;
  challenge: string;
  solution: string;
  outcome: string;
  metrics: string[];
}

interface VictorInActionSectionProps {
  caseStudies?: CaseStudy[];
  esteemedClientele?: string[];
}

export default function VictorInActionSection({
  caseStudies = [],
  esteemedClientele = [],
}: VictorInActionSectionProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  // Fallback defaults if not supplied
  const defaultStudies: CaseStudy[] = [
    {
      id: "enterprise-commute",
      category: "Corporate Employee Transport",
      title: "Campus Workforce Transit Architecture",
      clientType: "Global Technology Enterprise (1,200+ Daily Commuters)",
      locations: "Hyderabad & Bengaluru",
      challenge:
        "Coordinating daily employee transit across 3 rotating shift schedules, covering 18 suburban corridors during peak metro traffic with mandatory female employee safety protocols.",
      solution:
        "Deployed 35 dedicated air-conditioned MPVs and coaches with automated route cluster optimization, GPS telematics, female safety escort protocols, and 24/7 route controller oversight.",
      outcome:
        "Achieved 99.8% on-time floor arrival across 24 consecutive months with zero safety incidents and streamlined administrative reporting for the client's facility team.",
      metrics: ["1,200+ Daily Commuters", "99.8% On-Time Arrival", "35 Dedicated Shuttles"],
    },
    {
      id: "executive-delegation",
      category: "Executive Chauffeur & VIP Travel",
      title: "International Board Delegation Mobility",
      clientType: "Multinational Financial Institution",
      locations: "Hyderabad & Bengaluru",
      challenge:
        "High-stakes 3-day board delegation requiring terminal airport greetings at RGIA and Kempegowda, multi-venue executive meetings, and zero tolerance for schedule delay.",
      solution:
        "Pre-allocated luxury sedans 24 hours in advance with 15-point sanitization, radar flight tracking, pre-cleared bypass routes, and dedicated standby chauffeurs.",
      outcome:
        "100% on-time pickups across 14 executive movements with seamless terminal handoffs and undisturbed in-car mobile workspace productivity.",
      metrics: ["14 Executive Movements", "100% Punctual Pickups", "Zero Schedule Deviations"],
    },
    {
      id: "destination-wedding",
      category: "Weddings & Occasion Logistics",
      title: "Destination Celebration Convoy Management",
      clientType: "Private Family & Event Planner",
      locations: "Hyderabad",
      challenge:
        "Coordinating transit for 450 wedding guests across staggered airport arrivals, multi-venue ceremonies, and evening reception galas over 4 days.",
      solution:
        "Orchestrated a dedicated fleet of luxury sedans for the couple and VIPs, combined with 12 AC group shuttles on a synchronized loop with on-ground route marshals.",
      outcome:
        "Seamless transfer of all 450 guests without a single missed ceremony or luggage delay, earning high praise from family hosts and venue organizers.",
      metrics: ["450 Guests Transported", "6 Ceremony Venues", "12 Coordinated Shuttles"],
    },
  ];

  const studies = caseStudies.length > 0 ? caseStudies : defaultStudies;
  const current = studies[activeTab] || studies[0];

  const categoryIcons: Record<string, React.ElementType> = {
    "Corporate Employee Transport": Building2,
    "Executive Chauffeur & VIP Travel": Sparkles,
    "Weddings & Occasion Logistics": HeartHandshake,
  };

  const Icon = categoryIcons[current.category] || Building2;

  const clients =
    esteemedClientele.length > 0
      ? esteemedClientele
      : [
          "Amazon",
          "Google",
          "JPMorgan Chase",
          "Oracle",
          "Wipro",
          "Teleperformance",
          "OTIS",
          "Godrej",
          "HDFC Bank",
          "Synchrony",
          "Synechron",
          "TATA Docomo",
        ];

  return (
    <section id="case-story" className="py-14 sm:py-20 bg-brand-warm-white border-b border-brand-soft-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
            Victor in Action · Client Case Studies
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-3">
            Delivering precision across complex requirements.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
            Real operational scenarios demonstrating how our dedicated fleet allocation, flight radar tracking, and route supervisors manage logistics across corporate campuses, board delegations, and private celebrations.
          </p>
        </div>

        {/* Tab Selector for 3 Audiences */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-brand-soft-neutral shadow-2xs max-w-3xl">
          {studies.map((s, idx) => {
            const isSelected = activeTab === idx;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(idx)}
                className={`flex-1 min-w-[200px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all text-center ${
                  isSelected
                    ? "bg-brand-indigo text-white shadow-xs"
                    : "text-brand-ink/80 hover:text-brand-indigo hover:bg-brand-warm-white"
                }`}
              >
                <span>{s.category}</span>
              </button>
            );
          })}
        </div>

        {/* Active Case Study Presentation Card */}
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-brand-soft-neutral shadow-sm space-y-8">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-brand-soft-neutral">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-indigo mb-1.5">
                <Icon className="w-3.5 h-3.5 text-brand-blue" />
                <span>{current.category}</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-brand-ink">
                {current.title}
              </h3>
              <p className="text-xs text-brand-ink/70 mt-1">
                Client Profile: <span className="font-semibold text-brand-ink">{current.clientType}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-warm-white border border-brand-soft-neutral text-xs font-semibold text-brand-ink">
                <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                <span>{current.locations}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Documented Result</span>
              </span>
            </div>
          </div>

          {/* Three Pillars: Challenge -> Solution -> Outcome */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 bg-brand-warm-white/50 p-5 rounded-2xl border border-brand-soft-neutral/70">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-indigo">
                <Calendar className="w-4 h-4" />
                <span>1. The Challenge</span>
              </div>
              <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed">
                {current.challenge}
              </p>
            </div>

            <div className="space-y-3 bg-brand-warm-white/50 p-5 rounded-2xl border border-brand-soft-neutral/70">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-indigo">
                <Shield className="w-4 h-4" />
                <span>2. Victor&apos;s Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed">
                {current.solution}
              </p>
            </div>

            <div className="space-y-3 bg-brand-warm-white/50 p-5 rounded-2xl border border-brand-soft-neutral/70">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                <span>3. Operational Outcome</span>
              </div>
              <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed">
                {current.outcome}
              </p>
            </div>
          </div>

          {/* Metrics Bar */}
          <div className="pt-6 border-t border-brand-soft-neutral flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {current.metrics.map((metric) => (
                <span
                  key={metric}
                  className="px-3 py-1.5 rounded-xl bg-brand-warm-white border border-brand-soft-neutral text-xs font-bold text-brand-indigo"
                >
                  {metric}
                </span>
              ))}
            </div>

            <Link
              href="/india/contact"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-indigo hover:text-brand-blue"
            >
              <span>Discuss a similar requirement</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Esteemed Corporate Clientele Trust Strip */}
        <div className="pt-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-ink/70">
              Trusted by 30+ Enterprise Partners & MNCs
            </span>
            <span className="text-[11px] text-brand-ink/50 italic">
              From authorized company brochure
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {clients.map((client) => (
              <div
                key={client}
                className="bg-white rounded-xl py-3 px-4 text-center border border-brand-soft-neutral shadow-2xs hover:border-brand-indigo transition-colors"
              >
                <span className="text-xs font-bold text-brand-ink tracking-tight">
                  {client}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-brand-ink/55 text-center pt-1">
            *All brand names are properties of their respective organizations and represent client relationships and employee transit partnerships.
          </p>
        </div>
      </div>
    </section>
  );
}
