"use client";

import { Building2, MapPin, Navigation } from "lucide-react";
import type { CityItem, OfficeItem } from "@/types/content";

interface CitiesSectionProps {
  cities: CityItem[];
  offices: OfficeItem[];
}

export default function CitiesSection({ cities, offices }: CitiesSectionProps) {
  const publishedCities = cities.filter((c) => c.published);
  const publishedOffices = offices.filter((o) => o.published);

  return (
    <section id="network" className="py-20 sm:py-28 bg-brand-warm-white border-b border-brand-soft-neutral/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs uppercase tracking-widest font-bold text-brand-blue mb-3">
            Operating Network
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight mb-4">
            Established Presence Across Southern & Western India
          </h2>
          <p className="text-base sm:text-lg text-brand-ink/75 leading-relaxed">
            Victor Mobility operates dedicated regional facilities in major corporate and technology corridors, providing localized fleet coordination and dispatch.
          </p>
        </div>

        {/* Operating Hubs & Physical Offices */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {publishedOffices.map((office) => (
            <div
              key={office.city}
              className="bg-white rounded-2xl p-8 border border-brand-soft-neutral shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-brand-indigo/10 text-brand-indigo flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-brand-soft-neutral/50 text-brand-indigo">
                    {office.label}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-brand-ink mb-2">
                  {office.city}
                </h3>

                <p className="text-xs text-brand-ink/60 font-medium mb-4 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                  <span>
                    {publishedCities.find((c) => c.name === office.city)?.state || "India"}
                  </span>
                </p>

                <p className="text-sm text-brand-ink/80 leading-relaxed bg-brand-warm-white p-4 rounded-xl border border-brand-soft-neutral/60">
                  {office.address}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-soft-neutral/50">
                <a
                  href={`#contact?city=${encodeURIComponent(office.city)}`}
                  className="text-xs font-bold text-brand-indigo hover:text-brand-blue flex items-center gap-1"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Enquire for {office.city} routes</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Transparent Network Note regarding custom or other routes */}
        <div className="bg-white/80 rounded-xl p-6 border border-brand-soft-neutral flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-brand-ink mb-1">
              Need transport in another city or inter-city corridor?
            </h4>
            <p className="text-xs text-brand-ink/70">
              Our operations team coordinates outstation transfers, inter-city corporate shuttles, and pan-regional event fleets on request.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center justify-center text-xs font-bold bg-brand-indigo hover:bg-brand-blue text-white px-5 py-2.5 rounded-lg shrink-0 transition-colors"
          >
            Contact Dispatch Team
          </a>
        </div>
      </div>
    </section>
  );
}
