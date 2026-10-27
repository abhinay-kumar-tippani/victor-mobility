import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EnquirySection from "@/components/home/EnquirySection";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";
import PartnerEnquirySection from "@/components/contact/PartnerEnquirySection";

export const metadata: Metadata = {
  title: "Contact & Requirement Desk | Victor Mobility India",
  description:
    "Connect with Victor Mobility Pvt. Ltd. to discuss employee transportation, bus shuttles, airport transfers, and event travel. Continue on WhatsApp or send an email enquiry.",
};

export default function ContactPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header contact={content.contact} />

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Interactive WhatsApp & Email Requirement Desk */}
        <EnquirySection
          contact={content.contact}
          enquiry={content.enquiry}
          services={content.services}
          cities={content.cities}
          isStandalonePage={true}
        />

        <PartnerEnquirySection />
      </main>

      <Footer
        contact={content.contact}
        offices={content.offices}
        mediaCaption={media.caption}
        isoEnabled={content.sourceClaims.iso?.enabled}
      />
    </div>
  );
}
