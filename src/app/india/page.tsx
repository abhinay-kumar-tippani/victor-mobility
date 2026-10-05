import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import CustomerJourneys from "@/components/home/CustomerJourneys";
import VictorStandardSection from "@/components/home/VictorStandardSection";
import FleetSection from "@/components/home/FleetSection";
import VictorInActionSection from "@/components/home/VictorInActionSection";
import IndiaPresenceMap from "@/components/home/IndiaPresenceMap";
import PeopleSection from "@/components/home/PeopleSection";
import ContactInvitationSection from "@/components/home/ContactInvitationSection";

import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";

export default function IndiaPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;

  const heroAsset = media.assets.find((a) => a.id === "hero");
  const luxuryAsset = media.assets.find((a) => a.id === "luxury-interior");

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 1. Header with Intact Victor Logo and Direct Navigation */}
      <Header contact={content.contact} />

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* 1. Hero: Cinematic Dark Hero with Authoritative Tagline */}
        <Hero
          content={content}
          heroMedia={heroAsset}
          mediaCaption={media.caption}
        />

        {/* 2. Three Ways to Travel with Victor: Compact Audience Entries */}
        {content.customerJourneys && (
          <CustomerJourneys
            journeys={content.customerJourneys}
            mediaCaption={media.caption}
          />
        )}

        {/* 3. The Victor Standard: Four Substantiated Practices */}
        <VictorStandardSection />

        {/* 4. Fleet Preview: Category Selector with ARIA Tabs & Specifications */}
        <FleetSection
          categories={content.fleetCategories}
          fleetNote={content.fleetNote}
          fleetModelDisplayDefault={content.fleetModelDisplayDefault}
          luxuryMedia={luxuryAsset}
          mediaCaption={media.caption}
        />

        {/* 5. Victor in Action: Documented Operational Case Studies & Esteemed Clientele */}
        <VictorInActionSection
          caseStudies={content.caseStudies}
          esteemedClientele={content.esteemedClientele}
        />

        {/* 6. Our India Presence: Interactive Vector Map & Office Details */}
        <IndiaPresenceMap
          offices={content.offices}
          contact={content.contact}
        />

        {/* 7. The People Behind Victor: Founder, Leadership & Operations Accountability */}
        <PeopleSection
          contact={content.contact}
          founder={content.founder}
        />

        {/* 8. Contact Invitation: Personal Closing & Direct Coordination Desk */}
        <ContactInvitationSection contact={content.contact} />
      </main>

      {/* Corporate Footer with Verified Disclaimers and Operating Offices */}
      <Footer
        contact={content.contact}
        offices={content.offices}
        mediaCaption={media.caption}
        isoEnabled={content.sourceClaims.iso?.enabled}
      />
    </div>
  );
}
