import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ServicesSection from "@/components/home/ServicesSection";
import FleetSection from "@/components/home/FleetSection";
import VictorStandardSection from "@/components/home/VictorStandardSection";
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
      {/* 1. Clean Header with Intact Victor Logo & 4 Essential Routes */}
      <Header contact={content.contact} />

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* 1. Hero: Authoritative Brand Tagline, Focused Value Statement & Dual CTAs */}
        <Hero
          content={content}
          heroMedia={heroAsset}
          mediaCaption={media.caption}
        />

        {/* 2. Fleet: Real Brochure Models (Dzire, Tigor, Innova, Urbania, Coaches) & Seating Capacities */}
        <FleetSection
          categories={content.fleetCategories}
          fleetNote={content.fleetNote}
          luxuryMedia={luxuryAsset}
          mediaCaption={media.caption}
        />

        {/* 3. The Victor Standard: 3 Grounded Trust Pillars (Verified Drivers, Punctual Fleet, Transparent Billing) */}
        <VictorStandardSection />

        {/* 4. Regional Operating Hubs: Hyderabad (Gachibowli), Bengaluru & Pune */}
        <IndiaPresenceMap
          offices={content.offices}
          contact={content.contact}
        />

        {/* 5. Services: The 6 Authentic Transport Services (Shown ONCE, Clean & Direct) */}
        <ServicesSection services={content.services} />

        {/* 6. Leadership & Operations Accountability: Founder Jahangir & Commercial Lead Mujeeb */}
        <PeopleSection
          contact={content.contact}
          founder={content.founder}
        />

        {/* 7. Direct Coordination Desk: Instant WhatsApp & Phone Actions */}
        <ContactInvitationSection contact={content.contact} />
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
