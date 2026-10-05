"use client";

import Link from "next/link";
import { Building2, MapPin, Phone, MessageSquare, ArrowRight, UserCheck } from "lucide-react";
import type { CityItem, OfficeItem, ContactData } from "@/types/content";

interface CitiesSectionProps {
  cities: CityItem[];
  offices: OfficeItem[];
  contact?: ContactData;
}

export default function CitiesSection({ cities, offices, contact }: CitiesSectionProps) {
  const publishedCities = cities.filter((c) => c.published);

  const cityHighlights: Record<string, { role: string; focus: string }> = {
    Hyderabad: {
      role: "India Head Office",
      focus: "Gachibowli, HITEC City, Financial District corridors, and Rajiv Gandhi International Airport routes.",
    },
    Bengaluru: {
      role: "Branch Office",
      focus: "Electronic City, Whitefield, Outer Ring Road technology hubs, and Kempegowda International Airport transfers.",
    },
    Pune: {
      role: "Branch Office",
      focus: "Hadapsar, Hinjawadi Infotech Park, Magarpatta, industrial corridors, and Pune Airport connectivity.",
    },
  };

  const steps = [
    {
      num: "01",
      title: "Share Scope",
      desc: "Specify your passenger counts, shift roster, pickup corridors, or event itinerary.",
    },
    {
      num: "02",
      title: "Review Proposal",
      desc: "Receive vehicle allocation options, schedule planning, and transparent pricing.",
    },
    {
      num: "03",
      title: "Punctual Dispatch",
      desc: "Vetted drivers, tracked vehicles, and dedicated coordination backing 'On Time Every Time.'",
    },
  ];

  return (
    <section
      id="network"
      tabIndex={-1}
      className="py-14 sm:py-20 bg-white border-b border-brand-soft-neutral focus:outline-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
              Corporate Presence
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-2">
              Hyderabad. Bengaluru. Pune.
            </h2>
            <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
              Authorised corporate operations across India&apos;s primary technology and business corridors.
            </p>
          </div>

          <Link
            href="/india/about#network"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-indigo hover:text-brand-blue transition-colors shrink-0"
          >
            <span>View office addresses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Operating Hubs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {publishedCities.map((city) => {
            const highlight = cityHighlights[city.name] || {
              role: "Operating Office",
              focus: "Corporate shuttles and scheduled passenger transit.",
            };
            return (
              <div
                key={city.name}
                className="bg-brand-warm-white rounded-2xl p-6 border border-brand-soft-neutral flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-soft-neutral/70 text-brand-indigo">
                      {highlight.role}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-brand-ink mb-1">
                    {city.name}
                  </h3>
                  <span className="text-xs text-brand-blue font-semibold block mb-3">
                    {city.state}, India
                  </span>

                  <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed">
                    {highlight.focus}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-brand-soft-neutral/80 flex items-center justify-between">
                  <Link
                    href={`/india/contact?city=${encodeURIComponent(city.name)}`}
                    className="text-xs font-bold text-brand-indigo hover:text-brand-blue inline-flex items-center gap-1"
                  >
                    <span>Enquire for {city.name}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* People & Coordination Process Banner */}
        <div className="bg-brand-ink text-white rounded-2xl p-6 sm:p-8 border border-brand-indigo/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Named Contact Lead */}
          <div className="lg:col-span-5 space-y-3 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-violet">
              <UserCheck className="w-4 h-4" />
              <span>Operations & Development</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              {contact?.name || "Mujeeb Ur Rehman Mohammed"}
            </h4>
            <p className="text-xs text-brand-soft-neutral/80 leading-relaxed">
              {contact?.role || "Business Development Partner"} · Direct discussion for corporate master agreements, shift contracts, and urgent fleet requirements.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={contact?.phoneHref || "tel:+919100777768"}
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-white text-brand-indigo hover:bg-brand-warm-white px-3.5 py-2 rounded-lg transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-brand-indigo" />
                <span>{contact?.phoneDisplay || "+91 91007 77768"}</span>
              </a>
              <a
                href={`${contact?.whatsappBaseUrl || "https://wa.me/919396546950"}?text=${encodeURIComponent(
                  "Hello Victor Mobility, I would like to discuss a corporate transport requirement."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-lg transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* 3-Step Coordination Process */}
          <div className="lg:col-span-7">
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-soft-neutral/60 block mb-3">
              How We Coordinate Your Transport
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {steps.map((s) => (
                <div key={s.num} className="space-y-1.5">
                  <span className="text-xs font-mono font-bold text-brand-violet">
                    {s.num}
                  </span>
                  <h5 className="text-sm font-bold text-white">{s.title}</h5>
                  <p className="text-[11px] text-brand-soft-neutral/75 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
