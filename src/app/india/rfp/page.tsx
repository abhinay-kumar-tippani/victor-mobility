import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CorporateRfpBuilder from "@/components/rfp/CorporateRfpBuilder";
import CorridorMatrix from "@/components/home/CorridorMatrix";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";
import { FileSpreadsheet, ShieldCheck, CheckCircle2, Building2, Phone } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Corporate RFP & Tender Desk | Victor Mobility India",
  description:
    "Submit an enterprise Request for Proposal (RFP) for corporate employee transportation, IT campus bus shuttles, and executive chauffeur retainers across Hyderabad, Bengaluru, and Pune.",
  alternates: {
    canonical: "https://victor-mobility.vercel.app/india/rfp",
    languages: {
      "en-IN": "https://victor-mobility.vercel.app/india/rfp",
      "en-AE": "https://victor-mobility.vercel.app/uae/rfp",
    },
  },
};

export default function IndiaRfpPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Victor Mobility India Enterprise RFP Desk",
    description:
      "Enterprise procurement and tender submission portal for corporate employee transit and executive mobility.",
    publisher: {
      "@type": "Organization",
      name: content.companyName,
      telephone: content.contact.phoneDisplay,
      email: content.contact.printedEmail,
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

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Page Hero */}
        <section className="bg-brand-ink text-white py-16 sm:py-24 border-b border-brand-indigo/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6E57A0_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/40 border border-brand-violet/40 text-xs font-bold tracking-widest uppercase text-brand-soft-neutral">
                <FileSpreadsheet className="w-3.5 h-3.5 text-brand-violet" />
                Enterprise Procurement & Tenders
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Corporate Mobility RFP Desk
              </h1>
              <p className="text-base sm:text-lg text-brand-soft-neutral/85 leading-relaxed">
                Structured contract procurement for enterprise employee commute rosters, IT campus shuttles, and executive fleet retainers across Hyderabad, Bengaluru, and Pune.
              </p>
            </div>

            {/* Enterprise Trust Grid */}
            <div className="mt-10 pt-6 border-t border-brand-indigo/30 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-brand-soft-neutral/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-violet shrink-0" />
                <span>100% BGV & Police Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-violet shrink-0" />
                <span>24/7 Operations Control</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-brand-violet shrink-0" />
                <span>MNC Contract Proven</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-violet shrink-0" />
                <span>24-Hour SLA Quote Delivery</span>
              </div>
            </div>
          </div>
        </section>

        {/* Multi-step RFP Builder Section */}
        <section className="py-14 sm:py-20 bg-brand-warm-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <CorporateRfpBuilder
              region="india"
              contact={content.contact}
              cities={content.cities}
              services={content.services}
              companyName={content.companyName}
            />
          </div>
        </section>

        {/* Enterprise SLA & Compliance Framework Banner */}
        <section className="bg-slate-900 border-y border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Vendor Governance &amp; SLA</span>
              <p className="text-sm font-semibold text-white mt-0.5">Need Contractual SLA Benchmarks or Statutory Compliance Records?</p>
              <p className="text-xs text-slate-400">Review our 99.4% on-time guarantee, 20-min emergency hot-swap, and GST SAC 9966 invoicing terms.</p>
            </div>
            <Link
              href="/india/sla"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shrink-0"
            >
              Explore SLA &amp; Compliance Desk &rarr;
            </Link>
          </div>
        </section>

        {/* Tech Park & Corridor Matrix Reference */}
        <CorridorMatrix region="india" />
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
