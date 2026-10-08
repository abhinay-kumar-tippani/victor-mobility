"use client";

import { useState } from "react";
import { CheckCircle2, Shield, Calendar, MapPin, Users, Building2, Sparkles, ArrowRight } from "lucide-react";
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
      id: "round-the-clock-shifts",
      category: "24/7 Multi-Shift Commute Logistics",
      title: "Critical 24/7 Operations Shift Fleet Coordination",
      clientType: "Healthcare & Technology Operations Center (800+ Employees)",
      locations: "Hyderabad & Pune",
      challenge:
        "Coordinating daily shift transitions across morning, evening, and graveyard rotations with mandatory female commuter escort security, real-time speed monitoring, and zero-delay arrival requirements.",
      solution:
        "Deployed synchronized nodal routing with AIS-140 GPS telematics, automated emergency SOS alerts, verified route marshals on night rotations, and automated attendance notifications.",
      outcome:
        "Maintained 99.7% on-time floor arrival across 36 consecutive months with zero security incidents and automated digital trip-sheet verification for finance audits.",
      metrics: ["800+ Daily Shift Staff", "99.7% On-Time Arrival", "Zero Safety Incidents"],
    },
  ];

  const studies = caseStudies.length > 0 ? caseStudies : defaultStudies;
  const current = studies[activeTab] || studies[0];

  const categoryIcons: Record<string, React.ElementType> = {
    "Corporate Employee Transport": Building2,
    "Executive Chauffeur & VIP Travel": Sparkles,
    "24/7 Multi-Shift Commute Logistics": Building2,
  };

  const Icon = categoryIcons[current.category] || Building2;

  const clients =
    esteemedClientele.length > 0
      ? esteemedClientele
      : [
          "Information Technology & ITeS Campuses",
          "Global Capability Centers (GCCs)",
          "Banking, Financial Services & Insurance (BFSI)",
          "Healthcare & Life Sciences Facilities",
          "Consulting & Professional Services",
          "Manufacturing & Industrial Corridors",
        ];

  return (
    <section id="case-story" className="py-14 sm:py-20 bg-brand-warm-white border-b border-brand-soft-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
            Operational Track Record & Performance
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-3">
            Proven delivery across high-density corporate mobility.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
            Documented operational performance demonstrating how our dedicated fleet allocation, AIS-140 GPS telematics, and 24/7 route controllers maintain 99.8%+ punctuality across technology campuses and executive delegations.
          </p>
        </div>

        {/* Tab Selector for 3 Audiences */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 rounded-2xl bg-white border border-brand-soft-neutral shadow-2xs max-w-3xl" role="tablist">
          {studies.map((s, idx) => {
            const isSelected = activeTab === idx;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(idx)}
                className={`flex-1 min-w-[140px] sm:min-w-[180px] py-2.5 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all text-center shrink-0 ${
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
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-indigo mb-1.5">
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
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-indigo hover:text-brand-blue"
            >
              <span>Discuss a similar requirement</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Enterprise Sectors Served Trust Strip */}
        <div className="pt-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-ink/70">
              Enterprise Mobility Delivered Across Key Verticals
            </span>
            <span className="text-xs text-brand-indigo font-bold">
              Hyderabad · Bengaluru · Pune
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {clients.map((client) => (
              <div
                key={client}
                className="bg-white rounded-xl py-3 px-3.5 text-center border border-brand-soft-neutral/80 shadow-2xs hover:border-brand-indigo/50 hover:shadow-xs transition-all duration-150 flex items-center justify-center min-h-[52px]"
              >
                <span className="text-xs font-bold tracking-tight text-brand-ink">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
