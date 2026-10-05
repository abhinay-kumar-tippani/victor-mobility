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
  MessageSquare,
} from "lucide-react";
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

  return (
    <section
      id="services"
      tabIndex={-1}
      className="py-14 sm:py-20 bg-white border-b border-brand-soft-neutral focus:outline-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
              Mobility Services
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-2">
              Transport for work, travel and events
            </h2>
            <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
              Explore our verified corporate mobility solutions across Hyderabad, Bengaluru, and Pune.
            </p>
          </div>

          <Link
            href="/india/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-indigo hover:text-brand-blue transition-colors focus:outline-none focus:underline shrink-0"
          >
            <span>View all services guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Compact 6-Service Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {publishedServices.map((service, index) => {
            const Icon = serviceIcons[service.slug] || Users;
            return (
              <div
                key={service.slug}
                className="group rounded-2xl bg-brand-warm-white p-6 border border-brand-soft-neutral hover:border-brand-indigo/40 hover:bg-white hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo group-hover:bg-brand-indigo group-hover:text-white transition-colors duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-brand-ink/40 tracking-wider">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-brand-ink mb-1.5 group-hover:text-brand-indigo transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-ink/70 leading-relaxed mb-5">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-brand-soft-neutral/80 flex items-center justify-between gap-2 mt-auto">
                  <Link
                    href={`/india/services/${service.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-indigo hover:text-brand-blue group-hover:underline focus:outline-none focus:ring-1 focus:ring-brand-indigo rounded px-0.5"
                  >
                    <span>Service details</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => selectEnquiryOption({ service: service.title })}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-ink/80 hover:text-brand-indigo bg-white px-2.5 py-1 rounded-lg border border-brand-soft-neutral hover:border-brand-indigo/30 transition-colors focus:outline-none focus:ring-1 focus:ring-brand-indigo"
                  >
                    <MessageSquare className="w-3 h-3 text-brand-blue" />
                    <span>Discuss</span>
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
