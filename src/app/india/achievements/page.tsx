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
    "Explore Victor Mobility's genuine milestones in electric corporate mobility, featuring the brand-new Kia Clavis EV fleet expansion and industry partnership recognition.",
  alternates: {
    canonical: "https://victormobility.in/india/achievements",
    languages: {
      "en-IN": "https://victormobility.in/india/achievements",
    },
  },
};

export default function IndiaAchievementsPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const achievements = content.achievements;

  if (!achievements) {
    return null;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Victor Mobility Achievements & Recognition",
    description: achievements.hero.intro,
    url: "https://victormobility.in/india/achievements",
    provider: {
      "@type": "Organization",
      name: content.companyName,
      url: "https://victormobility.in/india",
    },
    mainEntity: achievements.featuredAchievements.map((item) => ({
      "@type": "Article",
      headline: item.heading,
      articleSection: item.category,
      image: `https://victormobility.in${item.imageSrc}`,
      description: item.highlightStatement,
    })),
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
          <AchievementsGallery achievements={achievements} />
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
