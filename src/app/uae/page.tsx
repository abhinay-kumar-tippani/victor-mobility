import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import CustomerJourneys from "@/components/home/CustomerJourneys";
import VictorStandardSection from "@/components/home/VictorStandardSection";
import FleetSection from "@/components/home/FleetSection";
import UaePresenceSection from "@/components/home/UaePresenceSection";
import PeopleSection from "@/components/home/PeopleSection";
import ContactInvitationSection from "@/components/home/ContactInvitationSection";

import uaeData from "@/content/uae.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";

export const metadata: Metadata = {
  title: "Victor Mobility UAE | Luxury Limousine & Airport VIP Transfers Dubai",
  description:
    "First-class executive limousine services, DXB terminal transfers, corporate delegations, and luxury mobility across Dubai and Abu Dhabi. On Time Every Time.",
};

export default function UaePage() {
  const content = uaeData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;

  const heroAsset = media.assets.find((a) => a.id === "hero");
  const luxuryAsset = media.assets.find((a) => a.id === "luxury-interior");

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 1. Header with UAE Contact & Global Region Switcher */}
      <Header contact={content.contact} />

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* 1. Hero: Cinematic Hero with UAE Tagline & Actions */}
        <Hero
          content={content}
          heroMedia={heroAsset}
          mediaCaption={media.caption}
        />

        {/* 2. Three UAE Customer Journeys */}
        {content.customerJourneys && (
          <CustomerJourneys
            journeys={content.customerJourneys}
            mediaCaption={media.caption}
          />
        )}

        {/* 3. The Victor Standard */}
        <VictorStandardSection />

        {/* 4. UAE Luxury Fleet Preview */}
        <FleetSection
          categories={content.fleetCategories}
          fleetNote="UAE fleet specifications include Mercedes-Benz S-Class, BMW 7 Series, Mercedes-Maybach, Cadillac Escalade, and luxury coaches. Actual model assignment is confirmed upon reservation."
          fleetModelDisplayDefault={true}
          luxuryMedia={luxuryAsset}
          mediaCaption={media.caption}
        />

        {/* 5. Our UAE Presence: Dubai Head Office & Inter-Emirate Network */}
        <UaePresenceSection contact={content.contact} />

        {/* 6. Leadership & Operations */}
        <PeopleSection
          contact={content.contact}
          founder={content.founder}
        />

        {/* 7. Contact Invitation */}
        <ContactInvitationSection contact={content.contact} />
      </main>

      {/* UAE Footer */}
      <Footer
        contact={content.contact}
        offices={content.offices}
        mediaCaption={media.caption}
        isoEnabled={false}
      />
    </div>
  );
}
