import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import IndiaFleetSection from "@/components/fleet/IndiaFleetSection";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { FleetVehicle } from "@/types/content";

export const metadata: Metadata = {
  title: "Fleet & Vehicle Categories | Victor Mobility India",
  description: indiaData.fleetPresentation.pageDescription,
};

export default function FleetPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header contact={indiaData.contact} />
      <main id="main-content" className="flex-1">
        <IndiaFleetSection
          categories={indiaData.fleetCategories}
          copy={indiaData.fleetPresentation}
          vehicles={indiaData.fleetVehicles as FleetVehicle[]}
          standalone={true}
        />
      </main>
      <Footer
        contact={indiaData.contact}
        offices={indiaData.offices}
        mediaCaption={mediaData.caption}
        isoEnabled={indiaData.sourceClaims.iso?.enabled}
      />
    </div>
  );
}
