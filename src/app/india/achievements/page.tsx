import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AchievementsGallery from "@/components/achievements/AchievementsGallery";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";

export const metadata: Metadata = {
  title: "Achievements & Recognition | Victor Mobility India",
  description:
    "Editorial gallery of Victor Mobility's collaborative operational benchmarks, fleet readiness workshops, and professional partnership recognitions.",
  alternates: {
    canonical: "https://victor-mobility.vercel.app/india/achievements",
    languages: {
      "en-IN": "https://victor-mobility.vercel.app/india/achievements",
    },
  },
};

export default function IndiaAchievementsPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const achievements = content.achievements || {
    title: "Achievements & Recognition",
    subtitle:
      "An editorial record of collaborative benchmarks, fleet readiness standards, and corporate mobility recognition.",
    sampleCertificate: {
      title: "Certificate of Strategic Business Partnership",
      sampleLabel: "Sample certificate",
      eyebrow: "Featured recognition",
      caption:
        "Sample recognition certificate highlighting collaborative fleet operational benchmarks and professional partnership standards.",
      imageSrc: "/images/achievements/sample-certificate.svg",
      imageAlt:
        "Sample Certificate of Strategic Business Partnership presented to Victor Luxury Limousine Private Limited",
      actionLabel: "View certificate",
      modalTitle: "Sample Certificate — Strategic Business Partnership",
    },
    sampleMilestones: [
      {
        id: "fleet-readiness-workshop",
        title: "Fleet readiness workshop",
        label: "Sample milestone",
        description:
          "Multi-point technical vehicle health reviews and passenger cabin comfort workshops conducted across regional fleet operating hubs.",
      },
      {
        id: "driver-mentoring-initiative",
        title: "Driver mentoring initiative",
        label: "Sample milestone",
        description:
          "Structured peer-to-peer mentoring on executive etiquette, defensive road safety, and discreet passenger care for corporate chauffeurs.",
      },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    name: "Victor Mobility Achievements & Recognition",
    description: achievements.subtitle,
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AchievementsGallery
            title={achievements.title}
            subtitle={achievements.subtitle}
            sampleCertificate={achievements.sampleCertificate}
            sampleMilestones={achievements.sampleMilestones}
          />
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
