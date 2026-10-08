"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, ChevronRight } from "lucide-react";
import type { IndiaContent, MediaAsset } from "@/types/content";

interface HeroProps {
  content: IndiaContent;
  heroMedia?: MediaAsset;
  mediaCaption: string;
}

export default function Hero({ content, heroMedia, mediaCaption }: HeroProps) {
  const isUae = content.region === "uae";
  const cityHighlights = isUae
    ? "Dubai · Abu Dhabi · Sharjah"
    : "Hyderabad · Bengaluru · Pune";

  const defaultHeroSrc = isUae
    ? "/images/uae/uae-hero.jpg"
    : "/images/india/corporate-hero.jpg";

  const heroImageSrc = isUae
    ? "/images/uae/uae-hero.jpg"
    : (heroMedia?.src && !heroMedia.src.includes("hero.png") ? heroMedia.src : defaultHeroSrc);

  const quickLinks = isUae
    ? [
        { label: "Executive Limousine Retainers", href: "/uae/services/chauffeur-luxury" },
        { label: "Airport VIP Terminal Protocol", href: "/uae/services/airport-transfers" },
        { label: "Corporate Delegations & Summits", href: "/uae/services/event-transportation" },
        { label: "UAE Fleet Tiers", href: "#fleet" },
      ]
    : [
        { label: "Daily Employee Commute", href: "/india/services/employee-transportation" },
        { label: "Corporate Campus Shuttles", href: "/india/services/bus-shuttle-transport" },
        { label: "Executive Chauffeur Retainers", href: "/india/services/chauffeur-luxury" },
        { label: "Airport VIP Transfers", href: "/india/services/airport-transfers" },
        { label: "Enterprise Fleet", href: "#fleet" },
      ];

  return (
    <section className="relative bg-brand-ink text-white overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImageSrc}
          alt={heroMedia?.alt || "Victor Mobility corporate transportation fleet"}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] lg:object-center opacity-80 sm:opacity-90"
        />
        {/* Crisp editorial gradient for readability while showing clean corporate fleet */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/90 sm:via-brand-ink/80 to-transparent lg:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-transparent to-brand-ink/40 sm:hidden" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-32">
        <div className="max-w-2xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-widest uppercase text-brand-soft-neutral mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-violet" />
            <span>{content.hero.eyebrow}</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-5">
            {content.hero.title}
          </h1>

          {/* Subtitle / Description */}
          <p className="text-base sm:text-xl text-brand-soft-neutral leading-relaxed mb-8 max-w-xl font-normal">
            {content.hero.description}
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
            <Link
              href={content.hero.primaryCta.href || `${isUae ? "/uae" : "/india"}/contact`}
              className="inline-flex items-center justify-center gap-2 text-sm font-bold bg-white text-brand-indigo hover:bg-brand-warm-white hover:text-brand-blue px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-150 group focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span>{content.hero.primaryCta.label}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
            </Link>
            <a
              href="#fleet"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-white hover:text-brand-soft-neutral bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 px-6 py-3.5 rounded-xl transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span>{content.hero.secondaryCta.label}</span>
            </a>
          </div>

          {/* Operational highlights */}
          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/15 text-xs text-brand-soft-neutral">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-violet" />
              <span>{isUae ? "Dubai RTA Licensed Limousines" : "AIS-140 GPS & 24/7 Operations Control"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-violet" />
              <span>100% Background-Verified Chauffeurs</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-violet" />
              <span>{cityHighlights}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Under Hero Service Pathway Navigation Strip */}
      <div className="relative z-10 bg-brand-ink/95 border-t border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-4 text-xs sm:text-sm">
            <span className="font-bold uppercase tracking-wider text-brand-soft-neutral/60 text-xs shrink-0">
              Direct Pathways:
            </span>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-brand-soft-neutral hover:text-white text-xs font-semibold whitespace-nowrap transition-colors focus:outline-none focus:ring-1 focus:ring-white min-h-[44px]"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
