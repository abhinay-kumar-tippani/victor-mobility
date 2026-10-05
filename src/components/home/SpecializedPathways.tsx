"use client";

import Link from "next/link";
import { Plane, Calendar, Sparkles, Key, ArrowRight, CheckCircle2 } from "lucide-react";
import { selectEnquiryOption } from "@/lib/enquiryEvents";

export default function SpecializedPathways() {
  const pathways = [
    {
      slug: "airport-transfers",
      title: "Airport Transfers",
      icon: Plane,
      tag: "Terminal Punctuality",
      description:
        "Scheduled pickups and drop-offs connecting corporate offices and hotels with Hyderabad (RGIA), Bengaluru (BLR), and Pune (PNQ) airports.",
      keyPoints: ["Flight schedule alignment", "Luggage accommodation", "Single & group transfers"],
    },
    {
      slug: "event-transportation",
      title: "Event Transportation",
      icon: Calendar,
      tag: "Delegation Logistics",
      description:
        "Dedicated fleet management for corporate annual meets, international conferences, and wedding celebrations with coordinated multi-vehicle dispatch.",
      keyPoints: ["Venue shuttle loops", "VIP guest handling", "Multi-point coordination"],
    },
    {
      slug: "chauffeur-luxury",
      title: "Chauffeur & Luxury Travel",
      icon: Sparkles,
      tag: "Executive Hospitality",
      description:
        "Discreet, professional chauffeur travel in premium vehicles for executive roadshows, board meetings, and high-profile guest itineraries.",
      keyPoints: ["Vetted chauffeurs", "Pristine cabins", "Full-day & hourly schedules"],
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-brand-warm-white border-b border-brand-soft-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
              Tailored Travel Scenarios
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-2">
              Airport, Event & Executive Mobility
            </h2>
            <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
              Beyond daily workplace shuttles, Victor Mobility coordinates specialized journeys requiring dedicated route supervision.
            </p>
          </div>

          <Link
            href="/india/services/rent-a-car"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-indigo hover:text-brand-blue transition-colors shrink-0"
          >
            <Key className="w-3.5 h-3.5 text-brand-violet" />
            <span>Also enquire for Vehicle Rentals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pathways.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.slug}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-brand-soft-neutral hover:border-brand-indigo/30 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue bg-brand-warm-white px-2.5 py-1 rounded-full border border-brand-soft-neutral">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-brand-ink mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-ink/70 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <ul className="space-y-1.5 mb-6 border-t border-brand-soft-neutral/70 pt-3">
                    {item.keyPoints.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-xs text-brand-ink/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-violet shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-brand-soft-neutral flex items-center justify-between gap-2 mt-auto">
                  <Link
                    href={`/india/services/${item.slug}`}
                    className="text-xs font-bold text-brand-indigo hover:text-brand-blue inline-flex items-center gap-1"
                  >
                    <span>View details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => selectEnquiryOption({ service: item.title })}
                    className="text-xs font-semibold text-brand-ink/75 hover:text-brand-indigo px-2.5 py-1 rounded-lg border border-brand-soft-neutral bg-brand-warm-white hover:bg-white transition-colors"
                  >
                    Discuss
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
