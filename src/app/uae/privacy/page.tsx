import type { Metadata } from "next";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  MessageSquare,
  Building2,
  CheckCircle2,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import uaeData from "@/content/uae.json";

export const metadata: Metadata = {
  title: "Privacy Notice | Victor Mobility UAE",
  description:
    "Privacy Notice for Victor Luxury Limousine LLC (Victor Mobility UAE). Learn how we handle your enquiry details and chauffeur requirements transparently under UAE data protection principles.",
};

export default function UaePrivacyPage() {
  const headOffice = uaeData.offices[0];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header contact={uaeData.contact} />

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Page Header */}
        <section className="bg-brand-ink text-white py-16 sm:py-24 border-b border-brand-indigo/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6E57A0_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/40 border border-brand-violet/40 text-xs font-bold tracking-widest uppercase text-brand-soft-neutral">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-violet" />
                UAE Data Protection & Transparency
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                UAE Privacy Notice
              </h1>
              <p className="text-base sm:text-lg text-brand-soft-neutral/85 leading-relaxed">
                Victor Luxury Limousine LLC (Victor Mobility UAE) is committed to protecting your corporate delegations
                and personal passenger details in alignment with UAE Federal Decree-Law No. 45 of 2021 regarding Personal Data Protection.
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Notice Editorial Body */}
        <section className="py-16 sm:py-24 bg-brand-warm-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {/* 1. Scope & Commitment */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-soft-neutral shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-brand-ink">
                  1. Information We Collect
                </h2>
              </div>
              <p className="text-sm text-brand-ink/80 leading-relaxed">
                When you enquire about UAE chauffeur reservations, airport meet-and-assist, or corporate delegation logistics,
                we collect only the information necessary to fulfill your request:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-brand-ink/80 pt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-violet shrink-0 mt-0.5" />
                  <span><strong>Contact Information:</strong> Guest or coordinator name, corporate affiliation, direct telephone, and WhatsApp number.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-violet shrink-0 mt-0.5" />
                  <span><strong>Flight & Journey Details:</strong> Flight numbers (for DXB / AUH terminal radar tracking), arrival times, pickup points, hotel destinations, passenger counts, and luggage volume.</span>
                </li>
              </ul>
            </div>

            {/* 2. Purpose of Processing */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-soft-neutral shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-brand-ink">
                  2. Purpose of Processing
                </h2>
              </div>
              <p className="text-sm text-brand-ink/80 leading-relaxed">
                Your enquiry data is strictly utilized for operational execution:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-brand-ink/80 pt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-violet shrink-0 mt-0.5" />
                  <span>Verifying vehicle tier availability and chauffeur dispatch schedules.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-violet shrink-0 mt-0.5" />
                  <span>Calculating formal quotations in UAE Dirhams (AED) and managing corporate billing agreements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-violet shrink-0 mt-0.5" />
                  <span>Sending dispatch notifications, chauffeur contact cards, and flight tracking updates.</span>
                </li>
              </ul>
            </div>

            {/* 3. No Commercial Brokering */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-soft-neutral shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                  <EyeOff className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-brand-ink">
                  3. Zero Marketing Data Resale
                </h2>
              </div>
              <p className="text-sm text-brand-ink/80 leading-relaxed">
                Victor Luxury Limousine LLC does <strong>not</strong> sell, lease, or monetize your contact or itinerary details
                to third-party advertisers, telemarketers, or commercial brokers. We do not participate in unsolicited mass marketing.
              </p>
            </div>

            {/* 4. WhatsApp Direct Hand-off */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-soft-neutral shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-brand-ink">
                  4. Direct WhatsApp Protocol & Security
                </h2>
              </div>
              <p className="text-sm text-brand-ink/80 leading-relaxed">
                When you initiate an inquiry via WhatsApp, you interact directly with our UAE operations desk at{" "}
                <span className="font-semibold text-brand-indigo">{uaeData.contact.whatsappDisplay}</span>.
                Your browser opens the WhatsApp application prefilled with your draft notes. You retain full control to edit or send.
                All WhatsApp communications are secured by WhatsApp&apos;s native end-to-end encryption.
              </p>
            </div>

            {/* 5. Contact Information */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-soft-neutral shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                  <Building2 className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-brand-ink">
                  5. Contact Our UAE Office
                </h2>
              </div>
              <p className="text-sm text-brand-ink/80 leading-relaxed">
                For data protection inquiries or to update or remove your reservation records, contact our UAE headquarters:
              </p>

              <div className="bg-brand-warm-white rounded-2xl p-6 border border-brand-soft-neutral space-y-2 text-xs sm:text-sm text-brand-ink/85 mt-4">
                <p className="font-bold text-brand-ink">{uaeData.legalEntityName}</p>
                <p>Operations Desk: {uaeData.contact.name}</p>
                <p>Telephone: <a href={uaeData.contact.phoneHref} className="text-brand-indigo font-semibold">{uaeData.contact.phoneDisplay}</a></p>
                <p>Registered Address: {headOffice?.address}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer
        contact={uaeData.contact}
        offices={uaeData.offices}
        mediaCaption="Victor Mobility UAE fleet illustrations and service representations."
        isoEnabled={false}
      />
    </div>
  );
}
