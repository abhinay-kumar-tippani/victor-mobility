"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShieldCheck, Clock, FileText, Leaf, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface VictorStandardSectionProps {
  basePath?: string;
}

export default function VictorStandardSection({ basePath }: VictorStandardSectionProps = {}) {
  const pathname = usePathname();
  const effectiveBasePath = basePath || (pathname?.startsWith("/uae") ? "/uae" : "/india");
  const { dict, locale } = useLanguage();
  const isUae = effectiveBasePath.startsWith("/uae");

  const bannerDescription = isUae
    ? (locale === "ar"
        ? "تواصل مباشرة مع مكتب عمليات دبي على مدار الساعة للحصول على جداول السائقين المعتمدين واتفاقيات مستوى الخدمة في الإمارات."
        : "Speak directly with our 24/7 Dubai operations desk for verified chauffeur rosters and executive SLA agreements across the Emirates.")
    : dict.safetySection.bannerDescription;

  const safetyPillars = [
    {
      id: "verified-drivers",
      icon: ShieldCheck,
      number: "01",
      imageSrc: "/images/india/safety/safety-verified-drivers.jpg",
      imageAlt: "Verified chauffeur with commercial licence and background verification badge",
      title: dict.safetySection?.pillars?.[0]?.title || "Verified drivers (BGV & PCC)",
      description:
        dict.safetySection?.pillars?.[0]?.description ||
        "Every chauffeur holds a valid commercial licence, background verification and a Police Clearance Certificate.",
    },
    {
      id: "women-safety",
      icon: Clock,
      number: "02",
      imageSrc: "/images/india/safety/safety-women-safety.jpg",
      imageAlt: "Corporate woman passenger safely commuting with real-time GPS route monitoring",
      title: dict.safetySection?.pillars?.[1]?.title || "Safety for women passengers",
      description:
        dict.safetySection?.pillars?.[1]?.description ||
        "Escort protocols, live route monitoring and SOS coordination for evening and night shifts.",
    },
    {
      id: "defensive-driving",
      icon: FileText,
      number: "03",
      imageSrc: "/images/india/safety/safety-defensive-driving.jpg",
      imageAlt: "Professional chauffeur observing speed limits, lane discipline, and defensive driving",
      title: dict.safetySection?.pillars?.[2]?.title || "Defensive driving",
      description:
        dict.safetySection?.pillars?.[2]?.description ||
        "Speed limits, lane discipline, seatbelts and hands-free kits to stop distracted driving.",
    },
    {
      id: "pre-trip-checks",
      icon: Leaf,
      number: "04",
      imageSrc: "/images/india/safety/safety-pre-trip-checks.jpg",
      imageAlt: "Executive vehicle inspection showing clean interior, upholstery, tyres and climate controls",
      title: dict.safetySection?.pillars?.[3]?.title || "Pre-trip vehicle checks",
      description:
        dict.safetySection?.pillars?.[3]?.description ||
        "Air conditioning, tyres, sanitisation, charging and upholstery are inspected before every departure.",
    },
  ];

  return (
    <section
      id="safety"
      tabIndex={-1}
      aria-labelledby="safety-heading"
      className="py-16 sm:py-24 bg-white border-b border-brand-soft-neutral focus:outline-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2.5">
            {dict.safetySection.eyebrow}
          </span>
          <h2
            id="safety-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-ink tracking-tight mb-3"
          >
            {dict.safetySection.title}
          </h2>
          <p className="text-base sm:text-lg text-brand-ink/75 leading-relaxed">
            {dict.safetySection.subtitle}
          </p>
        </div>

        {/* 4 Grounded Pillars in Responsive Grid (1 col mobile, 2 col tablet, 4 col desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {safetyPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                data-testid={`safety-pillar-${pillar.id}`}
                className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#15162F] p-7 sm:p-8 shadow-[0_10px_30px_-5px_rgba(21,22,47,0.15)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:border-white/25 overflow-hidden min-h-[320px]"
              >
                {/* Direct Background Image Layer */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <Image
                    src={pillar.imageSrc}
                    alt={pillar.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* High-legibility brand ink gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15162F]/95 via-[#15162F]/80 to-[#15162F]/55" />
                </div>

                {/* Card Content - Z-index 10 above image layer */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Top row: Icon Badge (left) & Number (right) */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all duration-300 group-hover:bg-white/25 group-hover:scale-105">
                        <Icon className="w-5 h-5 transition-transform duration-300" />
                      </div>
                      <span className="text-xs font-mono font-bold text-white/70">
                        {pillar.number}
                      </span>
                    </div>

                    {/* Pillar Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 tracking-tight">
                      {pillar.title}
                    </h3>

                    {/* Pillar Description */}
                    <p className="text-sm text-white/85 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear route to Operations Desk */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-brand-warm-white border border-brand-soft-neutral flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="max-w-xl min-w-0 flex-1">
            <h4 className="text-base sm:text-lg font-bold text-brand-ink mb-1">
              {dict.safetySection.bannerTitle}
            </h4>
            <p className="text-sm text-brand-ink/75 leading-relaxed">
              {bannerDescription}
            </p>
          </div>
          <Link
            href={`${effectiveBasePath}/contact`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-brand-indigo hover:bg-brand-indigo/90 text-white px-5 py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md shrink-0 hover:scale-[1.02] active:scale-98"
          >
            <span>{dict.safetySection.bannerCta}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
