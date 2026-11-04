import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EnquirySection from "@/components/home/EnquirySection";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";
import PartnerEnquirySection from "@/components/contact/PartnerEnquirySection";
import OfficeMapLinks from "@/components/contact/OfficeMapLinks";
import { MapPin, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Requirement Desk | Victor Mobility India",
  description:
    "Connect with Victor Mobility Pvt. Ltd. to discuss employee transportation, bus shuttles, airport transfers, and event travel. Continue on WhatsApp or send an email enquiry.",
};

export default function ContactPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const publishedOffices = content.offices.filter((o) => o.published);

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

        {/* Operating Offices with Google Maps Locations */}
        <section id="offices" className="py-14 sm:py-20 bg-brand-warm-white border-b border-brand-soft-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="max-w-2xl space-y-2">
              <span className="uppercase text-brand-indigo block section-eyebrow section-eyebrow--compact">
                Verified Office Presence
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight">
                Our Office Locations
              </h2>
              <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
                Connect with our local operations desks or navigate to our registered facilities across India via Google Maps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedOffices.map((office) => (
                <div
                  key={office.city}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-soft-neutral flex flex-col justify-between shadow-2xs space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-brand-indigo/10 flex items-center justify-center text-brand-indigo">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <h3 className="text-xl font-bold text-brand-ink">
                          {office.city}
                        </h3>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-soft-neutral text-brand-indigo">
                        {office.label}
                      </span>
                    </div>

                    <p className="text-xs text-brand-ink/75 leading-relaxed min-h-[48px]">
                      {office.address}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-brand-soft-neutral/80">
                    <OfficeMapLinks office={office} />
                  </div>
                </div>
              ))}
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
