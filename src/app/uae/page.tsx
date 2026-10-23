import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import StatCounterSection, { type StatItemData } from "@/components/home/StatCounterSection";
import TrustedCompaniesSection from "@/components/home/TrustedCompaniesSection";
import IndiaFleetSection from "@/components/fleet/IndiaFleetSection";
import ServicesSection from "@/components/home/ServicesSection";
import VictorStandardSection from "@/components/home/VictorStandardSection";
import UaePresenceSection from "@/components/home/UaePresenceSection";
import VictorJourneySection from "@/components/home/VictorJourneySection";
import PeopleSection from "@/components/home/PeopleSection";
import HomeFaqSection from "@/components/home/HomeFaqSection";
import ContactInvitationSection from "@/components/home/ContactInvitationSection";
import PartnerEnquirySection from "@/components/contact/PartnerEnquirySection";

import uaeData from "@/content/uae.json";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";

export const metadata: Metadata = {
  title: "Victor Mobility UAE | Luxury Limousine & Airport VIP Transfers Dubai",
  description:
    "First-class executive limousine services, DXB terminal transfers, corporate delegations, and luxury mobility across Dubai and Abu Dhabi. On Time Every Time.",
};

const UAE_STATS: StatItemData[] = [
  {
    id: "established",
    targetValue: 2010,
    suffix: "",
    formatCommas: false,
    colorHex: "#31326F",
    colorClass: "text-brand-indigo",
    durationMs: 2000,
    labelLines: ["Established in", "Logistics & Fleet"],
  },
  {
    id: "experience",
    targetValue: 15,
    suffix: "+",
    formatCommas: false,
    colorHex: "#6E57A0",
    colorClass: "text-brand-violet",
    durationMs: 1600,
    labelLines: ["Years of industry", "leadership"],
  },
  {
    id: "fleet",
    targetValue: 2500,
    suffix: "+",
    formatCommas: true,
    colorHex: "#2D5090",
    colorClass: "text-brand-blue",
    durationMs: 2000,
    labelLines: ["Luxury cars &", "buses accessible"],
  },
  {
    id: "clients",
    targetValue: 30,
    suffix: "+",
    formatCommas: false,
    colorHex: "#31326F",
    colorClass: "text-brand-indigo",
    durationMs: 1800,
    labelLines: ["Multinational", "clients"],
  },
  {
    id: "offices",
    targetValue: 1,
    suffix: "",
    formatCommas: false,
    colorHex: "#6E57A0",
    colorClass: "text-brand-violet",
    durationMs: 1200,
    labelLines: ["UAE Head Office", "Dubai (DXB)"],
  },
  {
    id: "services",
    targetValue: 6,
    suffix: "",
    formatCommas: false,
    colorHex: "#2D5090",
    colorClass: "text-brand-blue",
    durationMs: 1400,
    labelLines: ["Executive services"],
  },
];

export default function UaePage() {
  const content = uaeData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;

  const heroAsset = media.assets.find((a) => a.id === "hero");

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 1. Clean Header with Intact Victor Logo & Essential Routes */}
      <Header contact={content.contact} />

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* 1. Hero: Authoritative Brand Tagline, Focused Value Statement & Dual CTAs */}
        <Hero
          content={content}
          heroMedia={heroAsset}
          mediaCaption={media.caption}
        />

        {/* 1b. Key Performance Statistics: Animated Number Counter */}
        <StatCounterSection stats={UAE_STATS} />

        {/* 1c. Enterprise Clientele: Companies We Work With (3 Continuous Directional Sliders) */}
        <TrustedCompaniesSection />

        {/* 2. Fleet: Real Brochure Models (S-Class, BMW 7, Maybach, Escalade, Coaches) & Capacities */}
        <IndiaFleetSection
          categories={content.fleetCategories}
          copy={uaeData.fleetPresentation}
          basePath="/uae"
          currencySymbol="AED "
        />

        {/* 2b. Core Services Portfolio: What do you need to arrange? */}
        <ServicesSection services={content.services} basePath="/uae" />

        {/* 3. Operational Rigour & Security: Safety comes first */}
        <VictorStandardSection basePath="/uae" />

        {/* 4. Regional Operating Hubs: Dubai Head Office & Inter-Emirate Network */}
        <UaePresenceSection contact={content.contact} />

        {/* 5. The Journey of Victor: 2009 Founding to International Expansion */}
        <VictorJourneySection />

        {/* 6. Leadership & Operations Accountability: Founder Jahangir & UAE Operations Desk */}
        <PeopleSection
          contact={content.contact}
          teamContact={indiaData.contact}
          teamProfiles={indiaData.teamProfiles}
          teamFeaturedEmail={indiaData.teamFeaturedEmail}
          founder={content.founder}
          basePath="/uae"
        />

        {/* 6b. Helpful Answers: UAE Airport & Booking FAQs */}
        <HomeFaqSection
          faqs={uaeData.faqs}
          contactHref="/uae/contact"
          copy={uaeData.enquiryExperience?.faq}
        />

        {/* 7. Direct Coordination Desk: Instant WhatsApp & Phone Actions */}
        <ContactInvitationSection contact={content.contact} basePath="/uae" />
        <PartnerEnquirySection
          contact={content.contact}
          copy={uaeData.enquiryExperience?.partner}
        />
      </main>

      {/* Corporate Footer with Verified UAE Office & Legal Attribution */}
      <Footer
        contact={content.contact}
        offices={content.offices}
        mediaCaption={media.caption}
        isoEnabled={false}
      />
    </div>
  );
}
