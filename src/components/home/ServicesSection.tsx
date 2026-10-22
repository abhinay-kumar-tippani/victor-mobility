"use client";

import Link from "next/link";
import Image from "next/image";
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
import { useLanguage } from "@/i18n/LanguageContext";

interface ServicesSectionProps {
  services: ServiceItem[];
  basePath?: string;
}

interface ServiceMeta {
  number: string;
  imageSrc: string;
  imageAlt: string;
  icon: typeof Users;
}

const SERVICE_META: Record<string, ServiceMeta> = {
  "employee-transportation": {
    number: "01",
    imageSrc: "/images/india/services/service-employee-transport.jpg",
    imageAlt: "Corporate employee commuter coach and shuttle fleet outside innovation campus",
    icon: Users,
  },
  "bus-shuttle-transport": {
    number: "02",
    imageSrc: "/images/india/services/service-bus-shuttle.jpg",
    imageAlt: "Executive corporate commuter bus outside commercial tech park",
    icon: Bus,
  },
  "event-transportation": {
    number: "03",
    imageSrc: "/images/india/services/service-event-transport.jpg",
    imageAlt: "Luxury executive convoy for corporate events and conferences",
    icon: Calendar,
  },
  "airport-transfers": {
    number: "04",
    imageSrc: "/images/india/services/service-airport-transfers.jpg",
    imageAlt: "VIP executive airport chauffeur greeting passenger at private terminal",
    icon: Plane,
  },
  "chauffeur-luxury": {
    number: "05",
    imageSrc: "/images/india/services/service-chauffeur-luxury.jpg",
    imageAlt: "Chauffeur standing by luxury executive saloon outside corporate headquarters at night",
    icon: Sparkles,
  },
  "tourism-travel": {
    number: "05",
    imageSrc: "/images/uae/uae-hero.jpg",
    imageAlt: "Luxury limousine tourism and city excursions across Dubai and Abu Dhabi",
    icon: Sparkles,
  },
  "rent-a-car": {
    number: "06",
    imageSrc: "/images/india/services/service-rent-a-car.jpg",
    imageAlt: "Premium executive car rental fleet parked outside modern business district",
    icon: Key,
  },
};

export default function ServicesSection({ services, basePath = "/india" }: ServicesSectionProps) {
  const publishedServices = services.filter((s) => s.published);
  const { dict } = useLanguage();

  return (
    <section
      id="services"
      tabIndex={-1}
      aria-labelledby="services-heading"
      className="py-16 sm:py-24 bg-[#F8F9FB] border-b border-brand-soft-neutral focus:outline-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2.5">
              {dict.servicesSection.eyebrow}
            </span>
            <h2
              id="services-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-ink tracking-tight mb-3"
            >
              {dict.servicesSection.title}
            </h2>
            <p className="text-base sm:text-lg text-brand-ink/75 leading-relaxed">
              {dict.servicesSection.description}
            </p>
          </div>

          <Link
            href={`${basePath}/services`}
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-indigo hover:text-brand-blue transition-colors shrink-0 group/link"
          >
            <span>{dict.servicesSection.allServicesLink}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1 rtl:rotate-180" />
          </Link>
        </div>

        {/* 6 Authorised Service Cards Grid Matching Reference Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {publishedServices.map((service) => {
            const meta = SERVICE_META[service.slug] || {
              number: "00",
              imageSrc: "/images/india/corporate-hero.jpg",
              imageAlt: service.title,
              icon: Users,
            };
            const Icon = meta.icon;

            return (
              <div
                key={service.slug}
                data-testid={`service-card-${service.slug}`}
                className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#15162F] p-7 sm:p-8 shadow-[0_10px_30px_-5px_rgba(21,22,47,0.15)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:border-white/25 overflow-hidden min-h-[320px]"
              >
                {/* Direct Background Image Layer */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <Image
                    src={meta.imageSrc}
                    alt={meta.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* High-legibility brand ink gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15162F]/95 via-[#15162F]/80 to-[#15162F]/55" />
                </div>

                {/* Card Content - Z-index 10 above image layer */}
                <div className="relative z-10 flex flex-col">
                  {/* Top row: Icon Badge (left) & Number (right) */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all duration-300 group-hover:bg-white/25 group-hover:scale-105">
                      <Icon className="w-5 h-5 transition-transform duration-300" />
                    </div>
                    <span className="text-xs font-mono font-bold text-white/70">
                      {meta.number}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2.5">
                    {dict.servicesSection.items[service.slug]?.title || service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-sm sm:text-[15px] text-white/85 leading-relaxed">
                    {dict.servicesSection.items[service.slug]?.description || service.shortDescription}
                  </p>
                </div>

                {/* Bottom Actions - Z-index 10 above image layer */}
                <div className="relative z-10 pt-5 mt-6 border-t border-white/15 flex items-center justify-between gap-3">
                  <Link
                    href={`${basePath}/contact?service=${service.slug}#enquiry`}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-white text-brand-ink shadow-sm transition-all duration-300 hover:bg-brand-indigo hover:text-white hover:shadow-lg active:scale-95"
                  >
                    {dict.servicesSection.requestQuote}
                  </Link>

                  <Link
                    href={`${basePath}/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white/85 hover:text-white transition-all duration-300 hover:translate-x-1 rtl:hover:-translate-x-1"
                  >
                    <span>{dict.servicesSection.viewDetails}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:rotate-180" />
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
