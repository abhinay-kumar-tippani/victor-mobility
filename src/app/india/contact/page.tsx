import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EnquirySection from "@/components/home/EnquirySection";
import DirectContactForm from "@/components/contact/DirectContactForm";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";
import PartnerEnquirySection from "@/components/contact/PartnerEnquirySection";
import { Clock } from "lucide-react";

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
        {/* Interactive WhatsApp Requirement Desk */}
        <EnquirySection
          contact={content.contact}
          enquiry={content.enquiry}
          services={content.services}
          cities={content.cities}
          isStandalonePage={true}
        />

        {/* Direct Email Enquiry Section */}
        <section id="email-enquiry" className="py-16 sm:py-24 bg-white border-t border-brand-soft-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Left Column: Context, Heading, Trust & Direct Contacts (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo block">
                    Email Enquiry
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink">
                    Send Us a Message
                  </h2>
                  <p className="text-sm text-brand-ink/75 leading-relaxed">
                    Have a corporate transportation requirement, inquiry, or question? Fill in your details and our team will get back to you promptly.
                  </p>
                </div>

                <div className="bg-brand-warm-white rounded-3xl p-6 sm:p-7 border border-brand-soft-neutral space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo shadow-2xs">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-brand-ink">We usually respond within 24 hours</h3>
                      <p className="text-xs text-brand-ink/70">All enquiries are reviewed directly by our operations team.</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-brand-soft-neutral space-y-2 text-xs text-brand-ink/80">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-indigo shrink-0" />
                      <span>Dedicated corporate travel coordinators</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-indigo shrink-0" />
                      <span>Custom vehicle allocation & route proposals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-indigo shrink-0" />
                      <span>Official correspondence delivered to your inbox</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Direct Email Form (7 cols) */}
              <div className="lg:col-span-7 bg-brand-warm-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-brand-soft-neutral shadow-sm">
                <DirectContactForm hideHeader={true} />
              </div>
            </div>
          </div>
        </section>

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
