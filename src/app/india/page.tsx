import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import StatCounterSection from "@/components/home/StatCounterSection";
import TrustedCompaniesSection from "@/components/home/TrustedCompaniesSection";
import VictorJourneySection from "@/components/home/VictorJourneySection";
import IndiaFleetSection from "@/components/fleet/IndiaFleetSection";
import VictorStandardSection from "@/components/home/VictorStandardSection";
import IndiaPresenceMap from "@/components/home/IndiaPresenceMap";
import PeopleSection from "@/components/home/PeopleSection";
import ContactInvitationSection from "@/components/home/ContactInvitationSection";
import HomeFaqSection from "@/components/home/HomeFaqSection";
import PartnerEnquirySection from "@/components/contact/PartnerEnquirySection";
import ServicesSection from "@/components/home/ServicesSection";

import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent, FleetVehicle } from "@/types/content";

export default function IndiaPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;

  const heroAsset = media.assets.find((a) => a.id === "hero");

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 1. Clean Header with Intact Victor Logo & 4 Essential Routes */}
      <Header contact={content.contact} />

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* 1. Hero: Authoritative Brand Tagline, Focused Value Statement & Dual CTAs */}
        <Hero
          content={content}
          heroMedia={heroAsset}
          mediaCaption={media.caption}
        />

        {/* 1b. Key Performance Statistics: Animated Number Counter */}
        <StatCounterSection />

        {/* 1c. Enterprise Clientele: Companies We Work With (3 Continuous Directional Sliders) */}
        <TrustedCompaniesSection />

        {/* 2. Fleet: Real Brochure Models (Dzire, Tigor, Innova, Urbania, Coaches) & Seating Capacities */}
        <IndiaFleetSection
          categories={content.fleetCategories}
          copy={indiaData.fleetPresentation}
          vehicles={indiaData.fleetVehicles as FleetVehicle[]}
        />

        {/* 2b. Core Services Portfolio: What do you need to arrange? */}
        <ServicesSection services={content.services} />

        {/* 3. Operational Rigour & Security: Safety comes first */}
        <VictorStandardSection />

        {/* 4. Regional Operating Hubs: Hyderabad (Gachibowli), Bengaluru & Pune */}
        <IndiaPresenceMap
          offices={content.offices}
          contact={content.contact}
          cities={content.cities}
          searchCopy={indiaData.enquiryExperience.citySearch}
        />

        {/* 5. The Journey of Victor: 2009 Founding to International Expansion */}
        <VictorJourneySection />

        {/* 6. Leadership & Operations Accountability: Founder Jahangir & Commercial Lead Mujeeb */}
        <PeopleSection
          contact={content.contact}
          founder={content.founder}
        />

        <HomeFaqSection />

        {/* 7. Direct Coordination Desk: Instant WhatsApp & Phone Actions */}
        <ContactInvitationSection contact={content.contact} />
        <PartnerEnquirySection />
      </main>

      {/* Corporate Footer with Verified Operating Hubs & Legal Attribution */}
      <Footer
        contact={content.contact}
        offices={content.offices}
        mediaCaption={media.caption}
        isoEnabled={content.sourceClaims.iso?.enabled}
      />
    </div>
  );
}
