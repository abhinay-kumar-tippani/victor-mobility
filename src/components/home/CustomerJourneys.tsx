"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, HeartHandshake, Building2 } from "lucide-react";
import type { CustomerJourneyItem } from "@/types/content";

interface CustomerJourneysProps {
  journeys: CustomerJourneyItem[];
  mediaCaption: string;
}

const journeyIcons: Record<string, React.ElementType> = {
  "executive-vip": Sparkles,
  "weddings-occasions": HeartHandshake,
  "corporate-employee": Building2,
};

export default function CustomerJourneys({ journeys, mediaCaption }: CustomerJourneysProps) {
  return (
    <section id="services" className="py-12 sm:py-16 bg-brand-warm-white border-b border-brand-soft-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
            Tailored Pathways
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight mb-2">
            Three ways to travel with Victor.
          </h2>
          <p className="text-sm text-brand-ink/75 leading-relaxed">
            Choose your journey type for tailored vehicle categories, dedicated protocols, and scheduled precision across Hyderabad, Bengaluru, and Pune.
          </p>
        </div>

        {/* 3 Compact Customer Journey Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {journeys.map((journey) => {
            const Icon = journeyIcons[journey.id] || Sparkles;

            return (
              <article
                key={journey.id}
                className="bg-white rounded-2xl overflow-hidden border border-brand-soft-neutral shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Visual with Eyebrow Badge */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-ink">
                    <Image
                      src={journey.imageSrc}
                      alt={journey.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/30 to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[10px] font-bold text-brand-indigo uppercase tracking-wider shadow-xs">
                        <Icon className="w-3 h-3 text-brand-blue" />
                        <span>{journey.eyebrow}</span>
                      </span>
                    </div>

                    <div className="absolute bottom-2 right-3 text-xs text-white/75 italic">
                      {mediaCaption}
                    </div>
                  </div>

                  {/* Card Editorial: Title, Tagline & Tangible Key Highlights */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <h3 className="text-lg sm:text-xl font-bold text-brand-ink tracking-tight">
                      {journey.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed">
                      {journey.tagline}
                    </p>

                    {/* Verified Tangible Deliverables */}
                    {journey.keyPoints && journey.keyPoints.length > 0 && (
                      <ul className="pt-2 space-y-1.5 border-t border-brand-soft-neutral/70">
                        {journey.keyPoints.map((point) => (
                          <li key={point} className="flex items-start gap-2 text-xs text-brand-ink/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0 mt-1.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Single Exploration Action Link */}
                <div className="p-5 sm:p-6 pt-0 mt-auto">
                  <Link
                    href={`/india/services/${journey.serviceSlug}`}
                    className="w-full inline-flex items-center justify-between text-xs font-bold bg-brand-warm-white hover:bg-brand-indigo hover:text-white text-brand-indigo py-3 px-4 rounded-xl border border-brand-soft-neutral transition-colors group-hover:border-brand-indigo"
                  >
                    <span>{journey.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
