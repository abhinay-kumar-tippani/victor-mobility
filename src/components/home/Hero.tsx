"use client";

import Image from "next/image";
import { ArrowRight, ShieldCheck, ChevronRight } from "lucide-react";
import type { IndiaContent, MediaAsset } from "@/types/content";

interface HeroProps {
  content: IndiaContent;
  heroMedia?: MediaAsset;
  mediaCaption: string;
}

export default function Hero({ content, heroMedia, mediaCaption }: HeroProps) {
  const quickLinks = [
    { label: "Employee Transportation", href: "#employee-transport" },
    { label: "Bus & Shuttle", href: "#services" },
    { label: "Event Fleet", href: "#services" },
    { label: "Airport Transfers", href: "#services" },
    { label: "Chauffeur & Luxury", href: "#fleet" },
  ];

  return (
    <section className="relative bg-brand-ink text-white overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroMedia?.src || "/images/india/hero.png"}
          alt={heroMedia?.alt || "Victor Mobility luxury vehicles and corporate transport"}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center] lg:object-center opacity-75 sm:opacity-85"
        />
        {/* Dark editorial gradient for desktop left space readability, subtle vignette on mobile */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/90 sm:via-brand-ink/75 to-transparent lg:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-transparent to-brand-ink/30 sm:hidden" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-32">
        <div className="max-w-2xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider uppercase text-brand-soft-neutral mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {content.hero.eyebrow}
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
            {content.hero.title}
          </h1>

          {/* Subtitle / Description */}
          <p className="text-lg sm:text-xl text-brand-soft-neutral/90 leading-relaxed mb-8 max-w-xl font-normal">
            {content.hero.description}
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 text-sm uppercase tracking-wider font-bold bg-white text-brand-indigo hover:bg-brand-warm-white hover:text-brand-blue px-7 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-150 group"
            >
              <span>{content.hero.primaryCta.label}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
            </a>
            <a
              href="#fleet"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-white hover:text-brand-soft-neutral bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 px-6 py-3.5 rounded-lg transition-colors duration-150"
            >
              <span>{content.hero.secondaryCta.label}</span>
            </a>
          </div>

          {/* Operational highlights */}
          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/15 text-xs text-brand-soft-neutral/80">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-violet" />
              <span>Dedicated Enterprise Fleet</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-violet" />
              <span>Hyderabad · Bengaluru · Pune</span>
            </div>
            <div className="text-[11px] text-brand-soft-neutral/60 italic">
              {mediaCaption}
            </div>
          </div>
        </div>
      </div>

      {/* Under Hero Service Pathway Navigation Strip */}
      <div className="relative z-10 bg-brand-ink/95 border-t border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-6 text-xs sm:text-sm">
            <span className="font-semibold uppercase tracking-wider text-brand-soft-neutral/60 text-[11px] shrink-0">
              Direct Pathways:
            </span>
            <div className="flex items-center gap-5 sm:gap-8 shrink-0">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-brand-soft-neutral hover:text-white flex items-center gap-1 transition-colors font-medium whitespace-nowrap"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
