"use client";

import Link from "next/link";
import {
  Users,
  Bus,
  Calendar,
  Plane,
  Sparkles,
  Key,
  ArrowRight,
} from "lucide-react";
import type { ServiceItem } from "@/types/content";

interface ServicesSectionProps {
  services: ServiceItem[];
}

const SERVICE_ICONS: Record<string, typeof Users> = {
  "employee-transportation": Users,
  "bus-shuttle-transport": Bus,
  "airport-transfers": Plane,
  "chauffeur-luxury": Sparkles,
  "event-transportation": Calendar,
  "rent-a-car": Key,
};

export default function ServicesSection({ services }: ServicesSectionProps) {
  const publishedServices = services.filter((s) => s.published);

  return (
    <section
      id="services"
      tabIndex={-1}
      className="py-14 sm:py-20 bg-brand-warm-white border-b border-brand-soft-neutral focus:outline-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
              Our Services
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-2">
              What do you need to arrange?
            </h2>
            <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
              Select a service below to request a quotation, or review our detailed vehicle and planning specifications.
            </p>
          </div>

          <Link
            href="/india/services"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-indigo hover:text-brand-blue transition-colors shrink-0"
          >
            <span>All Service Specifications</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Compact List of 6 Authorised Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedServices.map((service, index) => {
            const Icon = SERVICE_ICONS[service.slug] || Users;
            return (
              <div
                key={service.slug}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-brand-soft-neutral hover:border-brand-indigo/30 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-brand-ink/40">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-brand-ink mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-soft-neutral/80 flex items-center justify-between gap-3 mt-auto">
                  <Link
                    href={`/india/contact?service=${service.slug}`}
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-brand-indigo hover:bg-brand-indigo/90 text-white shadow-2xs transition-colors"
                  >
                    Request a quote
                  </Link>

                  <Link
                    href={`/india/services/${service.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-ink/70 hover:text-brand-indigo transition-colors"
                  >
                    <span>View details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
