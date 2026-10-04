import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  MessageSquare,
  Phone,
  Building2,
  CheckCircle2,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";

export const metadata: Metadata = {
  title: "Privacy Notice | Victor Mobility India",
  description:
    "Privacy Notice for Victor Mobility Pvt. Ltd. Learn how we handle your enquiry information and transport requirements transparently.",
};

export default function PrivacyPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const headOffice = content.offices.find((o) => o.label.includes("Head")) || content.offices[0];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header contact={content.contact} />

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Page Header */}
        <section className="bg-brand-ink text-white py-16 sm:py-24 border-b border-brand-indigo/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6E57A0_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/40 border border-brand-violet/40 text-xs font-bold tracking-widest uppercase text-brand-soft-neutral">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-violet" />
                Data Protection & Transparency
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Privacy Notice
              </h1>
              <p className="text-base sm:text-lg text-brand-soft-neutral/85 leading-relaxed">
                Victor Mobility Pvt. Ltd. is committed to protecting your personal and corporate details.
                This notice explains how we collect, use, and protect the information you share with us.
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
                When you interact with our website, prepare an enquiry, or communicate with our team,
                we collect only the information you voluntarily provide:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-brand-ink/80 pt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-violet shrink-0 mt-0.5" />
                  <span><strong>Contact Details:</strong> Your name, company name, telephone number, or WhatsApp handle.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-violet shrink-0 mt-0.5" />
                  <span><strong>Mobility Requirements:</strong> Selected service (e.g. employee commute, bus shuttles, airport transfers), operating city, route corridors, shift timings, and estimated passenger counts.</span>
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
                  2. How We Use Your Information
                </h2>
              </div>
              <p className="text-sm text-brand-ink/80 leading-relaxed">
                The information you provide is utilized solely for lawful business purposes:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-brand-ink/80 pt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-violet shrink-0 mt-0.5" />
                  <span>Assessing vehicle availability, route feasibility, and schedule alignment.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-violet shrink-0 mt-0.5" />
                  <span>Preparing accurate pricing proposals and transport agreements tailored to your requirements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-violet shrink-0 mt-0.5" />
                  <span>Direct phone or WhatsApp communication regarding your specific quotation.</span>
                </li>
              </ul>
            </div>

            {/* 3. No Third-Party Sale or Unsolicited Marketing */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-soft-neutral shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                  <EyeOff className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-brand-ink">
                  3. Zero Data Brokering or Marketing Resale
                </h2>
              </div>
              <p className="text-sm text-brand-ink/80 leading-relaxed">
                Victor Mobility does <strong>not</strong> sell, rent, lease, or monetize your contact or enquiry data
                to third-party advertising brokers or marketing agencies. We do not engage in unsolicited mass email or
                SMS marketing campaigns.
              </p>
            </div>

            {/* 4. WhatsApp Direct Hand-off */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-soft-neutral shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-brand-ink">
                  4. WhatsApp Hand-off & Data Security
                </h2>
              </div>
              <p className="text-sm text-brand-ink/80 leading-relaxed">
                When you click &ldquo;Continue on WhatsApp&rdquo;, your browser opens the official WhatsApp platform
                prefilled with your drafted inquiry. You maintain complete control over the message transmission;
                submitting occurs only when you press Send within WhatsApp. Communication through WhatsApp is subject
                to WhatsApp&apos;s end-to-end encryption and terms of service.
              </p>
            </div>

            {/* 5. Contact Information for Data Inquiries */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-soft-neutral shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                  <Building2 className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-brand-ink">
                  5. Contact Us Regarding Your Data
                </h2>
              </div>
              <p className="text-sm text-brand-ink/80 leading-relaxed">
                If you have questions regarding this Privacy Notice or wish to request the deletion or correction
                of your enquiry records, please reach out to our authorised business representative:
              </p>

              <div className="bg-brand-warm-white rounded-2xl p-6 border border-brand-soft-neutral space-y-2 text-xs sm:text-sm text-brand-ink/85 mt-4">
                <p className="font-bold text-brand-ink">{content.companyName}</p>
                <p>Representative: {content.contact.name} ({content.contact.role})</p>
                <p>Telephone: <a href={content.contact.phoneHref} className="text-brand-indigo font-semibold">{content.contact.phoneDisplay}</a></p>
                <p>Registered Address: {headOffice?.address}</p>
              </div>
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
