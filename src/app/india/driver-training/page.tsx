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
    "Explore how preparation, road awareness and passenger care fit into a professional driver’s day with Victor Mobility.",
  alternates: {
    canonical: "https://victor-mobility.vercel.app/india/driver-training",
    languages: {
      "en-IN": "https://victor-mobility.vercel.app/india/driver-training",
    },
  },
};

export default function IndiaDriverTrainingPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const driverTraining = content.driverTraining || {
    title: "Driver Training",
    intro:
      "Explore how preparation, road awareness and passenger care fit into a professional driver’s day.",
    curriculumSectionLabel: "Sample training outline",
    curriculumMoments: [
      {
        moment: 1,
        title: "Before pickup",
        description:
          "Pre-dispatch reconnaissance, vehicle hygiene verification, and route telematics assessment before arrival.",
        practicalExample:
          "Confirming GPS telematics, checking tire pressure and HVAC settings, and verifying that bottled water, amenities, and cabin cleanliness meet executive standards 15 minutes prior to scheduled pickup.",
      },
      {
        moment: 2,
        title: "On the road",
        description:
          "Defensive driving, lane discipline, smooth passenger comfort, and heightened awareness during peak corridors.",
        practicalExample:
          "Maintaining consistent braking buffers, navigating congested junctions with calm patience, and observing female passenger night-safety protocols throughout the transit.",
      },
      {
        moment: 3,
        title: "At drop-off",
        description:
          "Authorized curb parking, polite passenger egress assistance, and mandatory vehicle cabin security sweep.",
        practicalExample:
          "Pulling up smoothly at the designated drop-off bay, offering courteous umbrella or luggage assistance, and immediately checking rear passenger seats for forgotten items.",
      },
    ],
    scenario: {
      badge: "Interactive Reflection",
      title: "What would you do?",
      question:
        "You reach the pickup point and the passenger is at a different entrance.",
      disclosureLabel: "See suggested response",
      suggestedResponse:
        "Stop in a permitted location, confirm the entrance with the passenger or dispatch, and agree on a safe meeting point.",
      educationalNote:
        "This scenario emphasizes defensive road placement, clear communication, and safe passenger coordination over hasty curb maneuvers.",
    },
    academyCta: {
      heading: "Explore the Chauffeur Academy",
      description:
        "Learn more about the formal background-checked verification, 24-point audit framework, and chauffeur protocols backing Victor Mobility pan-India.",
      buttonLabel: "Explore the Chauffeur Academy",
      href: "/india/academy",
    },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: "Victor Mobility Driver Training Overview",
    description: driverTraining.intro,
    provider: {
      "@type": "Organization",
      name: content.companyName,
      url: "https://victor-mobility.vercel.app/india",
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
