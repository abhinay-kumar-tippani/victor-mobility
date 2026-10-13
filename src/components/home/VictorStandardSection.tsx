"use client";

import Link from "next/link";
import { ShieldCheck, Clock, FileText, ArrowRight } from "lucide-react";

export default function VictorStandardSection() {
  const standards = [
    {
      icon: ShieldCheck,
      number: "01",
      title: "100% Background-Verified Drivers",
      description:
        "Every chauffeur and coach captain carries a verified commercial license, background clearance, and defensive driving training for passenger safety.",
    },
    {
      icon: Clock,
      number: "02",
      title: "Punctual & GPS-Monitored Fleet",
      description:
        "Active GPS tracking, speed governors, and pre-departure vehicle checks ensure punctual staging and clean, air-conditioned cabins across all shifts.",
    },
    {
      icon: FileText,
      number: "03",
      title: "Transparent Corporate Billing",
      description:
        "Clear itemized commercial proposals detailing route kilometers and hourly retainers, backed by GST-compliant invoicing and zero hidden surcharges.",
    },
  ];

  return (
    <section id="standards" className="py-14 sm:py-20 bg-white border-b border-brand-soft-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
            Safety & Operational Rigour
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-3">
            The Victor Standard: Grounded Reliability
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
            Market leadership is built on everyday discipline, verified drivers, and transparent commercial operations across all 10 operational hubs pan-India.
          </p>
        </div>

        {/* 3 Grounded Pillars in Clean 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {standards.map((std) => {
            const Icon = std.icon;
            return (
              <div
                key={std.title}
                className="bg-brand-warm-white rounded-2xl p-7 sm:p-8 border border-brand-soft-neutral shadow-2xs hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo shadow-2xs">
                      <Icon className="w-5 h-5 text-brand-blue" />
                    </div>
                    <span className="text-xs font-mono font-bold text-brand-violet px-2.5 py-1 rounded-full bg-white border border-brand-soft-neutral">
                      Pillar {std.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-brand-ink mb-2.5">
                    {std.title}
                  </h3>
                  <p className="text-sm text-brand-ink/75 leading-relaxed">
                    {std.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear route to Contact */}
        <div className="mt-10 p-6 rounded-2xl bg-brand-warm-white border border-brand-soft-neutral flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm font-medium text-brand-ink/80">
            Need customized transport retainers or employee shift shuttle planning?
          </p>
          <Link
            href="/india/contact"
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-white hover:bg-brand-indigo hover:text-white text-brand-indigo px-5 py-3 rounded-xl border border-brand-soft-neutral transition-colors shadow-2xs shrink-0"
          >
            <span>Speak with our operations desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
