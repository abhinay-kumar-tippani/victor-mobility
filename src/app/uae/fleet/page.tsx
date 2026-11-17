import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import IndiaFleetSection from "@/components/fleet/IndiaFleetSection";
import uaeData from "@/content/uae.json";
import mediaData from "@/content/media.json";
import type { FleetVehicle } from "@/types/content";

export const metadata: Metadata = {
  title: "Fleet & Vehicle Categories | Victor Mobility UAE",
  description: uaeData.fleetPresentation.pageDescription,
  alternates: {
    canonical: "https://victor-mobility.vercel.app/uae/fleet",
    languages: {
      "en-AE": "https://victor-mobility.vercel.app/uae/fleet",
    },
  },
};

export default function UaeFleetPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Victor Mobility UAE Executive Fleet",
    description: uaeData.fleetPresentation.pageDescription,
    numberOfItems: uaeData.fleetVehicles.length,
    itemListElement: uaeData.fleetVehicles.map((vehicle, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: vehicle.name,
      description: vehicle.description,
      image: `https://victor-mobility.vercel.app${vehicle.image}`,
    })),
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header contact={uaeData.contact} />
      <main id="main-content" className="flex-1">
        <IndiaFleetSection
          categories={uaeData.fleetCategories}
          copy={uaeData.fleetPresentation}
          vehicles={uaeData.fleetVehicles as FleetVehicle[]}
          standalone={true}
          basePath="/uae"
          currencySymbol="AED "
        />
      </main>
      <Footer
        contact={uaeData.contact}
        offices={uaeData.offices}
        mediaCaption={mediaData.caption}
        isoEnabled={false}
      />
    </div>
  );
}
