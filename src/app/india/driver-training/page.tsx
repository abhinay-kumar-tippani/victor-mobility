import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DriverTrainingGuide from "@/components/training/DriverTrainingGuide";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";

export const metadata: Metadata = {
  title: "Driver Training | Victor Mobility India",
  description:
    "Explore Victor Mobility's daily driver briefing standards, pre-departure vehicle readiness checklists, on-road safety rules, and supervisory protocols.",
  alternates: {
    canonical: "https://victormobility.in/india/driver-training",
    languages: {
      "en-IN": "https://victormobility.in/india/driver-training",
    },
  },
};

export default function IndiaDriverTrainingPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const driverTraining = content.driverTraining;

  if (!driverTraining) {
    return null;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Victor Mobility Daily Drivers Briefing",
    description: driverTraining.page1.instruction,
    image: `https://victormobility.in${driverTraining.page4.photos[0].src}`,
    provider: {
      "@type": "Organization",
      name: content.companyName,
      url: "https://victormobility.in/india",
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header contact={content.contact} />

      <main id="main-content" className="flex-1 focus:outline-none py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <DriverTrainingGuide content={driverTraining} />
        </div>
      </main>

      <Footer
        contact={content.contact}
        offices={content.offices}
        mediaCaption={media.caption}
        isoEnabled={content.sourceClaims?.iso?.enabled}
      />
    </div>
  );
}
