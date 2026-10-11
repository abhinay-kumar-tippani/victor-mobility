"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Bus,
  Sparkles,
  Plane,
  CalendarDays,
  Car,
  Compass,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import type { IndiaContent, MediaAsset, ServiceItem } from "@/types/content";

interface HeroProps {
  content: IndiaContent;
  heroMedia?: MediaAsset;
  mediaCaption: string;
}

const serviceIcons: Record<string, React.ElementType> = {
  "employee-transportation": Building2,
  "bus-shuttle-transport": Bus,
  "chauffeur-luxury": Sparkles,
  "airport-transfers": Plane,
  "event-transportation": CalendarDays,
  "rent-a-car": Car,
  "tourism-travel": Compass,
  "self-drive-rentals": Car,
};

export default function Hero({ content }: HeroProps) {
  const isUae = content.region === "uae";
  const prefix = isUae ? "/uae" : "/india";
  const cityHighlights = isUae
    ? "Dubai · Abu Dhabi · Sharjah"
    : "Hyderabad · Bengaluru · Pune";

  // Take the first 6 published core services
  const displayServices: ServiceItem[] = (content.services || [])
    .filter((s) => s.published)
    .slice(0, 6);

  return (
    <section className="relative bg-brand-ink text-white overflow-hidden">
      {/* 100% Image-Free Dark Executive Canvas with Ambient Accents */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand-ink via-[#0d162b] to-[#070c18]">
        {/* Subtle executive ambient glows */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-violet/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
        {/* Subtle geometric micro-grid texture for enterprise structure */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Main Hero Content: 2-Column Responsive Split */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Authority, Tagline & Value Statement */}
          <div className="lg:col-span-6 xl:col-span-6">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold tracking-widest uppercase text-brand-soft-neutral mb-5 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-violet" />
              <span>{content.hero.eyebrow}</span>
            </div>

            {/* Main Tagline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight mb-5">
              {content.hero.title}
            </h1>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg text-brand-soft-neutral/90 leading-relaxed mb-6 font-normal max-w-xl">
              {content.hero.description}
            </p>

            {/* Dual Enterprise CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-7">
              <Link
                href={content.hero.primaryCta.href || `${prefix}/contact`}
                className="inline-flex items-center justify-center gap-2 text-sm font-bold bg-white text-brand-indigo hover:bg-brand-warm-white hover:text-brand-blue px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-150 group focus:outline-none focus:ring-2 focus:ring-white min-h-[48px]"
              >
                <span>{content.hero.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
              </Link>
              <a
                href="#fleet"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-white hover:text-brand-soft-neutral bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3.5 rounded-xl transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white min-h-[48px]"
              >
                <span>{content.hero.secondaryCta.label}</span>
              </a>
            </div>

            {/* Operational Credentials Row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-5 border-t border-white/15 text-xs text-brand-soft-neutral">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-violet shrink-0" />
                <span>{isUae ? "Dubai RTA Licensed Limousines" : "AIS-140 GPS & 24/7 Operations Control"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-violet shrink-0" />
                <span>100% Background-Verified Chauffeurs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-violet shrink-0" />
                <span>{cityHighlights}</span>
              </div>
            </div>
          </div>

          {/* Right Column: 6 Core Services Bento Matrix Grid */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="bg-white/[0.03] backdrop-blur-md rounded-2xl border border-white/10 p-5 sm:p-6 shadow-2xl">
              {/* Matrix Header */}
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/10">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-brand-blue block">
                    Enterprise Fleet Portfolio
                  </span>
                  <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    Select Your Mobility Requirement
                  </h2>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-[11px] font-medium text-brand-soft-neutral shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-violet animate-pulse" />
                  6 Core Divisions
                </span>
              </div>

              {/* 2x3 Grid of 6 Interactive Service Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {displayServices.map((service) => {
                  const Icon = serviceIcons[service.slug] || Building2;
                  return (
                    <Link
                      key={service.slug}
                      href={`${prefix}/services/${service.slug}`}
                      className="group relative p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.10] border border-white/10 hover:border-brand-violet/60 transition-all duration-200 flex flex-col justify-between min-h-[96px] focus:outline-none focus:ring-2 focus:ring-brand-violet shadow-xs"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="p-2 rounded-lg bg-brand-violet/15 text-brand-violet group-hover:bg-brand-violet group-hover:text-white transition-colors duration-200 shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-brand-soft-neutral/70 bg-white/5 px-2 py-0.5 rounded border border-white/10 truncate max-w-[130px]">
                          {service.badge || "Corporate Transit"}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-brand-warm-white tracking-tight line-clamp-1">
                            {service.title}
                          </h3>
                          <ArrowUpRight className="w-3.5 h-3.5 text-brand-soft-neutral/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                        </div>
                        <p className="text-[11px] text-brand-soft-neutral/70 line-clamp-1 mt-0.5">
                          {service.shortDescription}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Under-Hero Statutory Trust & Governance Ribbon */}
      <div className="relative z-10 bg-brand-ink/95 border-t border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-6 text-xs text-brand-soft-neutral/80">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                Statutory Governance:
              </span>
            </div>
            <div className="flex items-center gap-6 shrink-0 text-xs">
              {isUae ? (
                <>
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    DED License: DED-1048291
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    100% RTA Commercial Limousine Permits
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    FTA 5% VAT Invoicing & Salik
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    24/7 Operations Desk: +971 52 455 2441
                  </span>
                </>
              ) : (
                <>
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    CIN: U50100TG2023PTC178921
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    100% EPF & ESIC Compliant
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    GST SAC 9966 Automated E-Invoicing
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    24/7 Operations Desk: +91 91007 77768
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
