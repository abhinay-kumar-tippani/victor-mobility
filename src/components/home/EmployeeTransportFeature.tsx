"use client";

import Image from "next/image";
import { Clock, Shield, MapPin, ArrowRight } from "lucide-react";
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
      desc: "Designed around your shift rosters and manufacturing or IT business hours to ensure punctual floor coverage.",
    },
    {
      icon: MapPin,
      title: "Dynamic Route Optimization",
      desc: "Pickup points, transit corridors, and corporate hub drops planned for optimal commute times.",
    },
    {
      icon: Shield,
      title: "Vetted Drivers & Monitored Fleet",
      desc: "Professional drivers, safety compliance, and vehicles configured for daily group passenger comfort.",
    },
  ];

  return (
    <section
      id="employee-transport"
      tabIndex={-1}
      className="py-20 sm:py-28 bg-brand-warm-white border-b border-brand-soft-neutral focus:outline-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with Crisp Framing & Caption */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-brand-soft-neutral bg-white group">
              <div className="relative aspect-[16/10] w-full min-h-[280px] sm:min-h-[340px]">
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
              <div className="p-3.5 bg-white/95 backdrop-blur-sm border-t border-brand-soft-neutral flex items-center justify-between text-xs text-brand-ink/75">
                <span className="font-semibold text-brand-indigo">Workplace Commute & Group Shuttles</span>
                <span className="italic text-brand-ink/60">{mediaCaption}</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-brand-soft-neutral">
                <span className="text-xs uppercase tracking-wider font-bold text-brand-blue block mb-1">
                  Bus Configurations
                </span>
                <p className="text-sm font-semibold text-brand-ink">
                  22-Seater & 44-Seater Shuttles
                </p>
                <p className="text-xs text-brand-ink/60 mt-1">Brochure page 10 baseline</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-brand-soft-neutral">
                <span className="text-xs uppercase tracking-wider font-bold text-brand-blue block mb-1">
                  Regional Depots
                </span>
                <p className="text-sm font-semibold text-brand-ink">
                  Hyderabad · Bengaluru · Pune
                </p>
                <p className="text-xs text-brand-ink/60 mt-1">Primary operating hubs</p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="text-xs uppercase tracking-widest font-bold text-brand-blue mb-3">
              Corporate Mobility Pillar
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight mb-6 leading-tight">
              Enterprise Employee Transportation Built for Reliability
            </h2>
            <p className="text-base sm:text-lg text-brand-ink/80 leading-relaxed mb-8">
              Daily employee commute demands the same operational discipline as executive travel. Victor Mobility partners with HR, facilities, and transport teams to provide dedicated corporate shuttles, employee pickup networks, and dependable campus transit.
            </p>

            <div className="space-y-6 mb-10">
              {commitments.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-indigo/10 text-brand-indigo flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-brand-ink mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-brand-ink/75 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  selectEnquiryOption({ service: "Employee Transportation" });
                }}
                className="inline-flex items-center justify-center gap-2 text-sm font-bold bg-brand-indigo hover:bg-brand-blue text-white px-7 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-indigo"
              >
                <span>Plan Your Employee Route</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:+919100777768"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-brand-indigo hover:text-brand-blue border border-brand-indigo/30 px-6 py-3.5 rounded-lg hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-indigo"
              >
                Call +91 91007 77768
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
