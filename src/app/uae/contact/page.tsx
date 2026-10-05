import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EnquirySection from "@/components/home/EnquirySection";
import uaeData from "@/content/uae.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";
import { Building2, Phone, MessageSquare, MapPin, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact UAE Operations | Victor Mobility UAE - Dubai Limousine Desk",
  description:
    "Connect with Victor Mobility UAE in Dubai. Direct WhatsApp reservation and phone booking for luxury limousine, DXB airport VIP transfers, and corporate fleet services. On Time Every Time.",
};

export default function UaeContactPage() {
  const content = uaeData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const publishedOffices = content.offices.filter((o) => o.published);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header contact={content.contact} />

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Interactive Enquiry Builder */}
        <EnquirySection
          contact={content.contact}
          enquiry={{
            mode: "whatsapp-draft",
            submitLabel: "Continue on WhatsApp",
            helperText: "Opens a pre-filled WhatsApp message for you to review and send to our Dubai desk.",
            isConfirmedBooking: false,
            fields: ["name", "service", "city", "requirement"],
            fallback: "Or call our Dubai desk directly at +971 52 455 2441.",
          }}
          services={content.services}
          cities={content.cities}
          isStandalonePage={true}
        />

        {/* Operating Headquarters Details */}
        <section className="py-16 sm:py-24 bg-white border-t border-brand-soft-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo block">
                Regional Headquarters
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink">
                Dubai Operating Office
              </h2>
              <p className="text-sm text-brand-ink/75">
                Visit or direct formal correspondence to our verified Dubai headquarters.
              </p>
            </div>

            <div className="max-w-2xl">
              {publishedOffices.map((office) => (
                <div
                  key={office.city}
                  className="bg-brand-warm-white rounded-3xl p-8 border border-brand-soft-neutral space-y-5"
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
                      {office.city}, United Arab Emirates
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-ink/80 leading-relaxed bg-white p-4 rounded-xl border border-brand-soft-neutral/70">
                      {office.address}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-brand-soft-neutral flex flex-wrap items-center gap-3">
                    <a
                      href={content.contact.phoneHref}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-brand-indigo bg-white px-4 py-2.5 rounded-xl border border-brand-soft-neutral"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{content.contact.phoneDisplay}</span>
                    </a>

                    <a
                      href={`https://wa.me/${content.contact.whatsappDigits}?text=Hello,%20I%20would%20like%20to%20enquire%20about%20transportation%20in%20Dubai.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp Reservation</span>
                    </a>

                    {content.contact.printedEmail && (
                      <a
                        href={`mailto:${content.contact.printedEmail}`}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-brand-ink bg-white px-4 py-2.5 rounded-xl border border-brand-soft-neutral"
                      >
                        <Mail className="w-3.5 h-3.5 text-brand-indigo" />
                        <span>{content.contact.printedEmail}</span>
                      </a>
                    )}
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
        isoEnabled={false}
      />
    </div>
  );
}
