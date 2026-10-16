"use client";

import Link from "next/link";
import { ShieldCheck, Clock, FileText, Leaf, ArrowRight } from "lucide-react";

export default function VictorStandardSection() {
  const safetyPillars = [
    {
      id: "verified-drivers",
      icon: ShieldCheck,
      number: "01",
      title: "Verified drivers (BGV & PCC)",
      description:
        "Every chauffeur holds a valid commercial licence, background verification and a Police Clearance Certificate.",
      iconColor: "text-brand-indigo",
    },
    {
      id: "women-safety",
      icon: Clock,
      number: "02",
      title: "Safety for women passengers",
      description:
        "Escort protocols, live route monitoring and SOS coordination for evening and night shifts.",
      iconColor: "text-brand-violet",
    },
    {
      id: "defensive-driving",
      icon: FileText,
      number: "03",
      title: "Defensive driving",
      description:
        "Speed limits, lane discipline, seatbelts and hands-free kits to stop distracted driving.",
      iconColor: "text-brand-blue",
    },
    {
      id: "pre-trip-checks",
      icon: Leaf,
      number: "04",
      title: "Pre-trip vehicle checks",
      description:
        "Air conditioning, tyres, sanitisation, charging and upholstery are inspected before every departure.",
      iconColor: "text-emerald-700",
    },
  ];

  return (
    <section
      id="safety"
      tabIndex={-1}
      aria-labelledby="safety-heading"
      className="py-16 sm:py-24 bg-white border-b border-brand-soft-neutral focus:outline-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2.5">
            Operational Rigour & Security
          </span>
          <h2
            id="safety-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-ink tracking-tight mb-3"
          >
            Safety comes first
          </h2>
          <p className="text-base sm:text-lg text-brand-ink/75 leading-relaxed">
            Passenger security and chauffeur professionalism are the foundation of
            every trip.
          </p>
        </div>

        {/* 4 Grounded Pillars in Responsive Grid (1 col mobile, 2 col tablet, 4 col desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {safetyPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                data-testid={`safety-pillar-${pillar.id}`}
                className="bg-brand-warm-white/70 hover:bg-white rounded-3xl p-7 sm:p-8 border border-brand-soft-neutral/90 hover:border-brand-indigo/30 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-brand-soft-neutral/80 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-300">
                      <Icon className={`w-5 h-5 ${pillar.iconColor}`} />
                    </div>
                    <span className="text-xs font-mono font-bold text-brand-ink/40 group-hover:text-brand-indigo transition-colors">
                      {pillar.number}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-brand-ink mb-2.5 tracking-tight group-hover:text-brand-indigo transition-colors duration-200">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-brand-ink/75 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear route to Operations Desk */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-brand-warm-white border border-brand-soft-neutral flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h4 className="text-base sm:text-lg font-bold text-brand-ink mb-1">
              Need customized transport retainers or employee shift shuttle planning?
            </h4>
            <p className="text-sm text-brand-ink/75 leading-relaxed">
              Speak directly with our 24/7 operations desk for verified driver rosters and SLA agreements across India.
            </p>
          </div>
          <Link
            href="/india/contact"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-brand-indigo hover:bg-brand-indigo/90 text-white px-5 py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md shrink-0 hover:scale-[1.02] active:scale-98"
          >
            <span>Speak with our operations desk</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
