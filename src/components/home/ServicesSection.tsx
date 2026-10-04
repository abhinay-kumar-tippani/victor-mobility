"use client";

import { Users, Bus, Calendar, Plane, Sparkles, Key, ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { ServiceItem } from "@/types/content";
import { selectEnquiryOption } from "@/lib/enquiryEvents";

interface ServicesSectionProps {
  services: ServiceItem[];
}

const serviceIcons: Record<string, typeof Users> = {
  "employee-transportation": Users,
  "bus-shuttle-transport": Bus,
  "event-transportation": Calendar,
  "airport-transfers": Plane,
  "chauffeur-luxury": Sparkles,
  "rent-a-car": Key,
};

export default function ServicesSection({ services }: ServicesSectionProps) {
  const publishedServices = services.filter((s) => s.published);

  // Distinguish flagship enterprise services from on-demand / specialty travel for editorial variety
  const enterpriseServices = publishedServices.slice(0, 2);
  const specializedServices = publishedServices.slice(2);

  return (
    <section id="services" tabIndex={-1} className="py-20 sm:py-28 bg-white border-b border-brand-soft-neutral focus:outline-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs uppercase tracking-widest font-bold text-brand-blue mb-3">
            Core Service Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight mb-4">
            Structured Mobility for Workplaces, Groups & Executives
          </h2>
          <p className="text-base sm:text-lg text-brand-ink/75 leading-relaxed">
            From scheduled corporate commuter corridors to airport arrivals and bespoke event fleets, Victor Mobility coordinates every route with dedicated vehicles and professional operations.
          </p>
        </div>

        {/* Featured Enterprise Commute Cards (Editorial Split Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {enterpriseServices.map((service) => {
            const Icon = serviceIcons[service.slug] || Users;
            return (
              <div
                key={service.slug}
                className="group relative rounded-2xl bg-brand-warm-white p-8 sm:p-10 border border-brand-soft-neutral hover:border-brand-indigo/40 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-brand-indigo text-white flex items-center justify-center shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-indigo/10 text-brand-indigo">
                      Enterprise Tier
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-brand-ink mb-3 group-hover:text-brand-indigo transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-brand-ink/80 text-base leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-8 bg-white/70 rounded-xl p-4 border border-brand-soft-neutral/50">
                    <span className="text-xs font-bold text-brand-ink/70 uppercase tracking-wider block">
                      Typical Enquiry Scope:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.enquiryDetails.map((detail) => (
                        <div key={detail} className="flex items-center gap-2 text-xs font-medium text-brand-ink/90">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-soft-neutral flex items-center justify-between">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      selectEnquiryOption({ service: service.title });
                    }}
                    className="inline-flex items-center gap-2 text-sm font-bold text-brand-indigo hover:text-brand-blue group-hover:underline focus:outline-none focus:ring-2 focus:ring-brand-indigo rounded px-1"
                  >
                    <span>Discuss {service.title}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <span className="text-xs text-brand-ink/50">Brochure verified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Specialized Travel Pathways (4-column editorial grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specializedServices.map((service) => {
            const Icon = serviceIcons[service.slug] || Calendar;
            return (
              <div
                key={service.slug}
                className="group rounded-xl bg-white p-6 sm:p-7 border border-brand-soft-neutral hover:border-brand-indigo/30 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-brand-soft-neutral/60 text-brand-indigo flex items-center justify-center mb-5 group-hover:bg-brand-indigo group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-brand-ink mb-2 group-hover:text-brand-indigo transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-brand-ink/75 leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-soft-neutral/40">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      selectEnquiryOption({ service: service.title });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-indigo hover:text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-indigo rounded px-1"
                  >
                    <span>Enquire Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
