"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Shield, MapPin, ArrowRight, Bus, MessageSquare } from "lucide-react";
import type { MediaAsset } from "@/types/content";
import { selectEnquiryOption } from "@/lib/enquiryEvents";

interface EmployeeTransportFeatureProps {
  media?: MediaAsset;
  mediaCaption: string;
}

export default function EmployeeTransportFeature({
  media,
  mediaCaption,
}: EmployeeTransportFeatureProps) {
  const commitments = [
    {
      icon: Clock,
      title: "Shift Timings & Punctuality",
      desc: "Designed around shift rosters and business hours to ensure punctual floor coverage.",
    },
    {
      icon: MapPin,
      title: "Route & Corridor Planning",
      desc: "Pickup points, transit corridors, and hub drops planned for optimal commute times.",
    },
    {
      icon: Bus,
      title: "22 & 44-Seater Shuttles",
      desc: "Air-conditioned group vehicles configured for daily workplace and campus transit.",
    },
  ];

  return (
    <section
      id="employee-transport"
      tabIndex={-1}
      className="py-14 sm:py-20 bg-brand-warm-white border-b border-brand-soft-neutral focus:outline-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
            Workplace Commute Solutions
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-3">
            Employee transport, planned around your team
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/80 leading-relaxed">
            Daily employee commute demands the same operational discipline as executive travel. Victor Mobility
            coordinates dedicated corporate shuttles, employee pickup networks, and dependable campus transit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Visual Showcase: Appears immediately after header on mobile */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-brand-soft-neutral bg-white group">
              <div className="relative aspect-[16/10] w-full min-h-[240px] sm:min-h-[320px]">
                <Image
                  src={media?.src || "/images/india/employee-shuttle.png"}
                  alt={
                    media?.alt ||
                    "Corporate employee shuttle bus outside modern office building"
                  }
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
              </div>

              {/* Discreet Customer-Facing Caption per media.json and AGENTS.md */}
              <div className="p-3 bg-white/95 backdrop-blur-sm border-t border-brand-soft-neutral flex items-center justify-between text-xs text-brand-ink/75">
                <span className="font-semibold text-brand-indigo">Workplace Commute & Group Shuttles</span>
                <span className="italic text-brand-ink/60">{mediaCaption}</span>
              </div>
            </div>

            <div className="mt-3.5 grid grid-cols-2 gap-3.5">
              <div className="bg-white p-3.5 rounded-xl border border-brand-soft-neutral">
                <span className="text-[11px] uppercase tracking-wider font-bold text-brand-blue block mb-0.5">
                  Bus Capacities
                </span>
                <p className="text-xs sm:text-sm font-semibold text-brand-ink">
                  22 & 44-Seater Shuttles
                </p>
                <p className="text-[11px] text-brand-ink/60 mt-0.5">Workplace & campus shuttles</p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-brand-soft-neutral">
                <span className="text-[11px] uppercase tracking-wider font-bold text-brand-blue block mb-0.5">
                  Operating Cities
                </span>
                <p className="text-xs sm:text-sm font-semibold text-brand-ink">
                  Hyderabad · Bengaluru · Pune
                </p>
                <p className="text-[11px] text-brand-ink/60 mt-0.5">Primary operating hubs</p>
              </div>
            </div>
          </div>

          {/* Planning Details & Direct CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              {commitments.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white border border-brand-soft-neutral shadow-xs"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-brand-ink mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Clear Pathway Links */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/india/services/employee-transportation"
                className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-bold bg-brand-indigo hover:bg-brand-blue text-white px-5 py-3 rounded-xl shadow-sm transition-colors"
              >
                <span>View employee commute guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={() =>
                  selectEnquiryOption({ service: "Employee Transportation" })
                }
                className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-bold bg-white text-brand-indigo hover:bg-brand-warm-white px-5 py-3 rounded-xl border border-brand-soft-neutral transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-brand-blue" />
                <span>Discuss route planning</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
