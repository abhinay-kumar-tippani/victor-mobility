"use client";

import BrandText from "@/components/brand/BrandText";
import { usePathname } from "next/navigation";
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
    aboutBio?: string[];
  };
  basePath?: string;
}

export default function PeopleSection({
  contact,
  teamContact,
  teamProfiles = [],
  teamFeaturedEmail,
  basePath,
}: PeopleSectionProps) {
  const pathname = usePathname();
  const effectiveBasePath = basePath || (pathname?.startsWith("/uae") ? "/uae" : "/india");
  const isUae = effectiveBasePath === "/uae";
  const { dict, locale } = useLanguage();

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
    <section
      id="about"
      tabIndex={-1}
      className="py-14 sm:py-20 bg-brand-warm-white border-b border-brand-soft-neutral focus:outline-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Centered & Balanced */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <span className="uppercase text-brand-blue block mb-2 section-eyebrow">
            <BrandText>{dict.people?.eyebrow || "Leadership & Accountability"}</BrandText>
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-3">
            <BrandText>{dict.people?.title || "The people behind Victor."}</BrandText>
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed max-w-2xl mx-auto">
            <BrandText>
              {dict.people?.subtitle ||
                "Every journey is backed by visionary leadership, commercial governance, and 24/7 on-ground route controllers dedicated to \"On Time Every Time.\""}
            </BrandText>
          </p>
        </div>

        {/* 2x2 Core Team Grid */}
        <div className="w-full">
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
    </section>
  );
}
