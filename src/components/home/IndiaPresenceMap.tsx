"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Phone, Building2, CheckCircle2 } from "lucide-react";
import type { OfficeItem, ContactData } from "@/types/content";

interface HubMetadata {
  corridors: string;
  dispatchZone: string;
}

const hubDetails: Record<string, HubMetadata> = {
  Hyderabad: {
    corridors: "HITEC City · Financial District · Gachibowli · Shamshabad (RGIA) · Madhapur · Kondapur",
    dispatchZone: "Primary Regional Operations Center & 24/7 Telematics Dispatch",
  },
  Bengaluru: {
    corridors: "Whitefield · Electronic City · Outer Ring Road (ORR) · Manyata · Kempegowda (BLR)",
    dispatchZone: "Branch Operations & Dedicated Corporate Tech Corridor Fleet",
  },
  Pune: {
    corridors: "Hinjawadi Phase 1-3 · Magarpatta City · Kharadi EON · Viman Nagar · Pune Airport (PNQ)",
    dispatchZone: "Branch Operations & 24/7 Industrial & IT Workforce Shuttles",
  },
};

export default function IndiaPresenceMap({ offices, contact }: { offices: OfficeItem[]; contact: ContactData }) {
  const publishedOffices = offices.filter((o) => o.published);

  return (
    <section id="network" tabIndex={-1} className="py-14 sm:py-20 bg-white border-b border-brand-soft-neutral focus:outline-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
            Regional Operational Footprint
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink mb-3">
            Our established operating hubs across India.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
            Fully staffed regional operations, verified driver staging bays, and 24/7 route dispatch centers located across Hyderabad, Bengaluru, and Pune.
          </p>
        </div>

        {/* 3 Physical Hub Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {publishedOffices.map((office) => {
            const meta = hubDetails[office.city] || {
              corridors: "Key commercial and technology corridors",
              dispatchZone: "Operational Dispatch Hub",
            };

            return (
              <div
                key={office.city}
                className="bg-brand-warm-white rounded-2xl p-6 sm:p-7 border border-brand-soft-neutral shadow-2xs hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-brand-soft-neutral text-[11px] font-bold uppercase tracking-wider text-brand-indigo">
                      <Building2 className="w-3.5 h-3.5 text-brand-blue" />
                      <span>{office.label}</span>
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Active Depot
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-brand-ink mb-1">
                      {office.city}
                    </h3>
                    <p className="text-xs font-semibold text-brand-indigo">
                      {meta.dispatchZone}
                    </p>
                  </div>

                  {/* Physical Address */}
                  <div className="flex items-start gap-2.5 pt-2 border-t border-brand-soft-neutral/70">
                    <MapPin className="w-4 h-4 text-brand-indigo shrink-0 mt-0.5" />
                    <address className="not-italic text-xs text-brand-ink/80 leading-relaxed">
                      {office.address}
                    </address>
                  </div>

                  {/* Arterial Corridors */}
                  <div className="p-3 rounded-xl bg-white border border-brand-soft-neutral/80 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-ink/60 block">
                      Key Corridors Served:
                    </span>
                    <p className="text-xs text-brand-ink/80 leading-relaxed font-medium">
                      {meta.corridors}
                    </p>
                  </div>
                </div>

                {/* Direct Enquire Actions */}
                <div className="pt-5 mt-5 border-t border-brand-soft-neutral/80 space-y-2.5">
                  <Link
                    href={`/india/contact?city=${encodeURIComponent(office.city)}`}
                    className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold bg-brand-indigo hover:bg-brand-blue text-white py-3 px-4 rounded-xl shadow-xs transition-colors"
                  >
                    <span>Enquire for {office.city} Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={contact.phoneHref}
                    className="w-full inline-flex items-center justify-center gap-2 text-xs font-semibold text-brand-ink/80 hover:text-brand-indigo py-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Operations Desk: {contact.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Operational Dispatch Commitment Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-brand-soft-neutral flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-xs text-brand-ink/80 leading-relaxed">
              <strong>Guaranteed Operational Staging:</strong> All regional operating hubs maintain dedicated staging bays, backup vehicle reserves, and live telematics oversight.
            </p>
          </div>

          <Link
            href="/india/contact"
            className="shrink-0 text-xs font-bold text-brand-indigo hover:text-brand-blue underline underline-offset-4"
          >
            Schedule a depot site visit →
          </Link>
        </div>
      </div>
    </section>
  );
}
