"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Quote, Award } from "lucide-react";
import type { ContactData, TeamProfile } from "@/types/content";
import { useLanguage } from "@/i18n/LanguageContext";
import TeamCarousel from "./TeamCarousel";

interface PeopleSectionProps {
  contact: ContactData;
  teamContact?: ContactData;
  teamProfiles?: TeamProfile[];
  teamFeaturedEmail?: { display: string; enabled: boolean };
  founder?: {
    name: string;
    role: string;
    experience: string;
    quote: string;
    imageSrc: string;
    bio: string;
  };
  basePath?: string;
}

export default function PeopleSection({ contact, teamContact, teamProfiles = [], teamFeaturedEmail, founder, basePath }: PeopleSectionProps) {
  const pathname = usePathname();
  const effectiveBasePath = basePath || (pathname?.startsWith("/uae") ? "/uae" : "/india");
  const isUae = effectiveBasePath === "/uae";
  const { dict, locale } = useLanguage();

  const founderBio =
    locale === "ar"
      ? (dict.people?.uaeBio || dict.people?.founderBio?.join(" ") || founder?.bio)
      : founder?.bio;

  const founderRole =
    locale === "ar"
      ? (dict.people?.founderTitle || "المؤسس والمدير التنفيذي")
      : (founder?.role || "Founder & Managing Director");

  const businessPartnershipDesc =
    isUae
      ? (dict.people?.businessPartnershipDescUae ||
         "Directing enterprise client partnerships, VIP limousine protocols, and corporate fleet coordination across Dubai, Abu Dhabi, and the Emirates.")
      : (dict.people?.businessPartnershipDescIndia ||
         "Directing enterprise client partnerships, corporate transport governance, and multi-city fleet coordination across all 10 operational hubs pan-India.");

  const whatsappMessage =
    locale === "ar"
      ? `مرحباً ${teamContact?.name || contact.name}، أود مناقشة متطلبات النقل والتنقل مع فيكتور موبيليتي.`
      : `Hello, I would like to discuss travel requirements with Victor Mobility.`;

  return (
    <section id="about" tabIndex={-1} className="py-14 sm:py-20 bg-brand-warm-white border-b border-brand-soft-neutral focus:outline-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
            {dict.people?.eyebrow || "Leadership & Accountability"}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-3">
            {dict.people?.title || "The people behind Victor."}
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
            {dict.people?.subtitle || "Every journey is backed by visionary leadership, commercial governance, and 24/7 on-ground route controllers dedicated to \"On Time Every Time.\""}
          </p>
        </div>

        {/* Leadership and team */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Card 1: Founder & Visionary (col-span-5) */}
          {founder && (
            <div className="lg:col-span-5 bg-white rounded-3xl overflow-hidden border border-brand-soft-neutral shadow-xs flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200">
                <Image
                  src={founder.imageSrc}
                  alt={`Portrait of ${founder.name}, ${founder.role} of Victor Mobility`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-violet bg-white/90 px-2.5 py-0.5 rounded-full inline-block mb-1">
                    {dict.people?.founderVision || "Founder & Visionary"}
                  </span>
                  <h3 className="text-xl font-bold">{locale === "ar" ? (dict.people?.founderName || founder.name) : founder.name}</h3>
                  <p className="text-xs text-white/80">{founderRole}</p>
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start gap-2 p-3.5 rounded-xl bg-brand-warm-white border border-brand-soft-neutral/70">
                    <Quote className="w-4 h-4 text-brand-indigo shrink-0 mt-0.5" />
                    <p className="text-xs font-semibold italic text-brand-ink/90">
                      &ldquo;{locale === "ar" ? "نحن لا ننقل الركاب فحسب، بل نحمي جداول أعمالهم ومسؤولياتهم بكل دقة وانضباط." : founder.quote}&rdquo;
                    </p>
                  </div>
                  <p className="text-xs text-brand-ink/75 leading-relaxed">
                    {founderBio}
                  </p>
                </div>

                <div className="pt-3 border-t border-brand-soft-neutral flex items-center gap-2 text-[11px] text-brand-indigo font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-brand-blue" />
                  <span>{locale === "ar" ? "تأسست في عام 2010" : "Founded 2010 · Hyderabad, India"}</span>
                </div>
              </div>
            </div>
          )}

          <div className={founder ? "lg:col-span-7" : "lg:col-span-12"}>
            <TeamCarousel
              featured={teamContact || contact}
              featuredEmail={teamFeaturedEmail}
              profiles={teamProfiles}
              description={businessPartnershipDesc}
              basePath={effectiveBasePath}
              whatsappMessage={whatsappMessage}
              storyLabel={dict.people?.fullCompanyStoryLink || "Read our company story"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
