import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ServicesSection from "@/components/home/ServicesSection";
import EmployeeTransportFeature from "@/components/home/EmployeeTransportFeature";
import FleetSection from "@/components/home/FleetSection";
import CitiesSection from "@/components/home/CitiesSection";
import AboutSection from "@/components/home/AboutSection";
import EnquirySection from "@/components/home/EnquirySection";

import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";

export default function IndiaPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;

  const heroAsset = media.assets.find((a) => a.id === "hero");
  const employeeShuttleAsset = media.assets.find((a) => a.id === "employee-shuttle");
  const luxuryAsset = media.assets.find((a) => a.id === "luxury-interior");

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Crisp White Header with Intact Logo */}
      <Header contact={content.contact} />

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Cinematic Dark Hero */}
        <Hero
          content={content}
          heroMedia={heroAsset}
          mediaCaption={media.caption}
        />

        {/* Core Services Portfolio */}
        <ServicesSection services={content.services} />

        {/* Dedicated Employee Commute & Shuttles Spotlight */}
        <EmployeeTransportFeature
          media={employeeShuttleAsset}
          mediaCaption={media.caption}
        />

        {/* Fleet Categories Selector */}
        <FleetSection
          categories={content.fleetCategories}
          fleetNote={content.fleetNote}
          fleetModelDisplayDefault={content.fleetModelDisplayDefault}
          luxuryMedia={luxuryAsset}
          mediaCaption={media.caption}
        />

        {/* Established Operating Network */}
        <CitiesSection
          cities={content.cities}
          offices={content.offices}
        />

        {/* About & FAQs */}
        <AboutSection content={content} />

        {/* Transparent WhatsApp Enquiry Desk */}
        <EnquirySection
          contact={content.contact}
          enquiry={content.enquiry}
          services={content.services}
          cities={content.cities}
        />
      </main>

      {/* Corporate Footer */}
      <Footer
        contact={content.contact}
        offices={content.offices}
        mediaCaption={media.caption}
        isoEnabled={content.sourceClaims.iso?.enabled}
      />
    </div>
  );
}
