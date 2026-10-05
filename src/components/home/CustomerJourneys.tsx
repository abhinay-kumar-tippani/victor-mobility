"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, MessageSquare, Sparkles, HeartHandshake, Building2 } from "lucide-react";
import { selectEnquiryOption } from "@/lib/enquiryEvents";
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
    <section id="customer-journeys" className="py-14 sm:py-20 bg-brand-warm-white border-b border-brand-soft-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
            Tailored Customer Journeys
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-3">
            Three distinct journeys. One trusted standard.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
            Whether coordinating high-profile executive arrivals, private family celebrations, or daily workplace employee transit, Victor Mobility delivers scheduled precision across Hyderabad, Bengaluru, and Pune.
          </p>
        </div>

        {/* 3 Prominent Customer Journey Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {journeys.map((journey) => {
            const Icon = journeyIcons[journey.id] || Sparkles;

            return (
              <article
                key={journey.id}
                className="bg-white rounded-3xl overflow-hidden border border-brand-soft-neutral shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Visual with Illustrative Badge */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-ink">
                    <Image
                      src={journey.imageSrc}
                      alt={journey.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/40 to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-bold text-brand-indigo uppercase tracking-wider shadow-xs">
                        <Icon className="w-3.5 h-3.5 text-brand-blue" />
                        <span>{journey.eyebrow}</span>
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 right-3 text-[10px] text-white/70 italic">
                      {mediaCaption}
                    </div>
                  </div>

                  {/* Card Editorial Content */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-brand-ink mb-1.5">
                        {journey.title}
                      </h3>
                      <p className="text-xs text-brand-indigo font-semibold">
                        {journey.tagline}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-brand-ink/70 leading-relaxed">
                      {journey.description}
                    </p>

                    <div className="pt-3 border-t border-brand-soft-neutral space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-ink/60 block">
                        Included Standards:
                      </span>
                      <ul className="space-y-1.5">
                        {journey.keyPoints.map((point) => (
                          <li key={point} className="flex items-start gap-2 text-xs text-brand-ink/85">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-violet shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 sm:p-7 pt-0 mt-auto flex flex-col gap-2.5">
                  <Link
                    href={`/india/services/${journey.serviceSlug}`}
                    className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider bg-brand-indigo hover:bg-brand-blue text-white py-3 px-4 rounded-xl transition-colors shadow-xs"
                  >
                    <span>{journey.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      selectEnquiryOption({
                        service: journey.enquiryService,
                        category: journey.category,
                      })
                    }
                    className="w-full inline-flex items-center justify-center gap-2 text-xs font-semibold text-brand-ink/80 hover:text-brand-indigo bg-brand-warm-white hover:bg-brand-soft-neutral/50 py-2.5 px-4 rounded-xl border border-brand-soft-neutral transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Discuss Requirement</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
