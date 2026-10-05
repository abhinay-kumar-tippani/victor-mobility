"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, MapPin, Phone, ArrowRight, ShieldCheck, Car, Bus } from "lucide-react";
import type { ContactData } from "@/types/content";

interface UaePresenceSectionProps {
  contact: ContactData;
}

export default function UaePresenceSection({ contact }: UaePresenceSectionProps) {
  const [selectedCity, setSelectedCity] = useState<string>("Dubai");

  const emirates = [
    {
      name: "Dubai",
      label: "U.A.E. Head Office",
      address: "65th Street, Al Garhoud, Near Dubai International Airport, Dubai, United Arab Emirates.",
      corridors: "DXB & DWC Airport VIP terminals, DIFC Financial District, Downtown Dubai, Palm Jumeirah, and Dubai South.",
      capabilities: "Dedicated luxury saloons, executive MPVs, and 24/7 terminal curbside dispatch.",
    },
    {
      name: "Abu Dhabi",
      label: "Regional Operations",
      address: "Zayed International Airport (AUH) corridor, ADNEC Exhibition Centre, and Corniche corporate districts.",
      corridors: "Inter-Emirate VIP transit (Dubai ↔ Abu Dhabi), diplomatic roadshows, and summit delegation convoys.",
      capabilities: "Hourly executive standby, VIP luxury coaches, and multi-vehicle conference transit.",
    },
    {
      name: "Sharjah",
      label: "Corridor Operations",
      address: "Sharjah International Airport & Northern Emirates commercial trade corridor.",
      corridors: "Corporate workforce commutes, industrial park loops, and inter-city team shuttles.",
      capabilities: "Corporate bus shuttles and scheduled staff transport solutions.",
    },
  ];

  const current = emirates.find((e) => e.name === selectedCity) || emirates[0];

  return (
    <section id="network" tabIndex={-1} className="py-14 sm:py-20 bg-white border-b border-brand-soft-neutral focus:outline-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
            Emirates Network
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-3">
            Our UAE presence.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
            Headquartered near Dubai International Airport (DXB), Victor Mobility delivers seamless luxury limousine, airport VIP, and delegation transport across the Emirates.
          </p>
        </div>

        {/* Operational Capabilities Highlight Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-brand-warm-white p-6 rounded-2xl border border-brand-soft-neutral flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo shrink-0">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-brand-ink block">2,000+</span>
              <span className="text-xs text-brand-ink/70">Luxury & Executive Fleet Capability</span>
            </div>
          </div>

          <div className="bg-brand-warm-white p-6 rounded-2xl border border-brand-soft-neutral flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo shrink-0">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-brand-ink block">500+</span>
              <span className="text-xs text-brand-ink/70">Luxury Buses & Shuttles Fleet Capability</span>
            </div>
          </div>

          <div className="bg-brand-warm-white p-6 rounded-2xl border border-brand-soft-neutral flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white border border-brand-soft-neutral flex items-center justify-center text-emerald-600 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-brand-ink block">24/7</span>
              <span className="text-xs text-brand-ink/70">Airport VIP & Terminal Flight Radar Desk</span>
            </div>
          </div>
        </div>

        {/* Interactive Emirate Selector & Office Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Selector Column */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-ink/60 block px-1">
              Select Operating Location:
            </span>
            {emirates.map((em) => {
              const isSelected = selectedCity === em.name;
              return (
                <button
                  key={em.name}
                  type="button"
                  onClick={() => setSelectedCity(em.name)}
                  className={`w-full p-5 rounded-2xl text-left border transition-all ${
                    isSelected
                      ? "bg-brand-indigo text-white border-brand-indigo shadow-sm"
                      : "bg-brand-warm-white hover:bg-white text-brand-ink border-brand-soft-neutral"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold">{em.name}</span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        isSelected ? "bg-white/20 text-white" : "bg-white text-brand-indigo"
                      }`}
                    >
                      {em.label}
                    </span>
                  </div>
                  <p className={`text-xs mt-1.5 ${isSelected ? "text-white/80" : "text-brand-ink/60"}`}>
                    {em.name === "Dubai" ? "Head Office & Airport Hub" : "Inter-Emirate Corridors"}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Details Card Column */}
          <div className="lg:col-span-8 bg-brand-warm-white rounded-3xl p-7 sm:p-10 border border-brand-soft-neutral shadow-xs space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue block mb-1">
                  United Arab Emirates
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-ink">
                  {current.name} Operations
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-brand-soft-neutral text-xs font-bold text-brand-indigo">
                <Building2 className="w-3.5 h-3.5 text-brand-violet" />
                <span>{current.label}</span>
              </span>
            </div>

            <div className="space-y-2 pt-2 border-t border-brand-soft-neutral">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-ink/60 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                <span>Operating Address</span>
              </span>
              <p className="text-xs sm:text-sm text-brand-ink/85 leading-relaxed bg-white p-4 rounded-xl border border-brand-soft-neutral/70">
                {current.address}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-ink/60 block">
                Primary Corridors & Staging:
              </span>
              <p className="text-xs text-brand-ink/75 leading-relaxed">
                {current.corridors}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-ink/60 block">
                Dedicated Capabilities:
              </span>
              <p className="text-xs text-brand-ink/75 leading-relaxed">
                {current.capabilities}
              </p>
            </div>

            <div className="pt-4 border-t border-brand-soft-neutral flex flex-col sm:flex-row gap-3">
              <Link
                href={`/uae/contact?city=${encodeURIComponent(current.name)}`}
                className="flex-1 inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider bg-brand-indigo hover:bg-brand-blue text-white py-3 px-5 rounded-xl transition-colors shadow-xs"
              >
                <span>Enquire for {current.name}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={contact.phoneHref}
                className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-brand-ink hover:text-brand-indigo bg-white py-3 px-4 rounded-xl border border-brand-soft-neutral hover:bg-brand-warm-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-brand-blue" />
                <span>{contact.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
