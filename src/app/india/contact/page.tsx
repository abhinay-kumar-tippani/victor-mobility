import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EnquirySection from "@/components/home/EnquirySection";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";
import { MessageSquare, Phone, MapPin, ShieldAlert, CheckCircle2, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Requirement Desk | Victor Mobility India",
  description:
    "Connect with Victor Mobility Pvt. Ltd. to discuss employee transportation, bus shuttles, airport transfers, and event travel. Continue on WhatsApp or call our desk.",
};

export default function ContactPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const publishedOffices = content.offices.filter((o) => o.published);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header contact={content.contact} />

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Page Hero Header */}
        <section className="bg-brand-ink text-white py-16 sm:py-24 border-b border-brand-indigo/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6E57A0_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/40 border border-brand-violet/40 text-xs font-bold tracking-widest uppercase text-brand-soft-neutral">
                <MessageSquare className="w-3.5 h-3.5 text-brand-violet" />
                Requirement Desk
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Discuss Your Transport Requirement
              </h1>
              <p className="text-base sm:text-lg text-brand-soft-neutral/85 leading-relaxed">
                Connect directly with our team to arrange corporate employee transport, event fleets,
                airport transfers, or executive chauffeur travel across Hyderabad, Bengaluru, and Pune.
              </p>
            </div>
          </div>
        </section>

        {/* Direct Channel Clarification */}
        <section className="bg-brand-warm-white py-6 border-b border-brand-soft-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-ink/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-violet shrink-0" />
                <span>
                  <strong>Active Channels:</strong> Verified direct telephone line & WhatsApp enquiry desk.
                </span>
              </div>
              <div className="text-brand-ink/60">
                Official corporate email will be activated upon scheduled domain configuration.
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Enquiry Builder */}
        <EnquirySection
          contact={content.contact}
          enquiry={content.enquiry}
          services={content.services}
          cities={content.cities}
          isStandalonePage={true}
        />

        {/* Operating Offices Details */}
        <section className="py-16 sm:py-24 bg-white border-t border-brand-soft-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo block">
                Regional Offices
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink">
                Our Operating Office Locations
              </h2>
              <p className="text-sm text-brand-ink/75">
                Visit or direct formal correspondence to our verified branch offices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {publishedOffices.map((office) => (
                <div
                  key={office.city}
                  className="bg-brand-warm-white rounded-3xl p-8 border border-brand-soft-neutral space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue bg-white px-3 py-1 rounded-full border border-brand-soft-neutral">
                      {office.label}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-brand-ink mb-2">
                      {office.city}
                    </h3>
                    <p className="text-xs text-brand-ink/70 leading-relaxed">
                      {office.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
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
