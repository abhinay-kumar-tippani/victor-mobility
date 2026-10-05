import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CorporateRfpBuilder from "@/components/rfp/CorporateRfpBuilder";
import CorridorMatrix from "@/components/home/CorridorMatrix";
import uaeData from "@/content/uae.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";
import { FileSpreadsheet, ShieldCheck, CheckCircle2, Building2, Phone } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Corporate RFP & Tender Desk | Victor Mobility UAE - Dubai & Abu Dhabi",
  description:
    "Submit an enterprise Request for Proposal (RFP) for executive limousine retainers, DXB/AUH airport VIP protocol, global summit convoys, and corporate employee shuttles across Dubai and Abu Dhabi.",
  alternates: {
    canonical: "https://victor-mobility.vercel.app/uae/rfp",
    languages: {
      "en-IN": "https://victor-mobility.vercel.app/india/rfp",
      "en-AE": "https://victor-mobility.vercel.app/uae/rfp",
    },
  },
};

export default function UaeRfpPage() {
  const content = uaeData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Victor Mobility UAE Enterprise RFP Desk",
    description:
      "Enterprise procurement and tender submission portal for luxury limousine retainers and VIP summit logistics across Dubai and Abu Dhabi.",
    publisher: {
      "@type": "Organization",
      name: uaeData.legalEntityName,
      telephone: content.contact.phoneDisplay,
      email: content.contact.printedEmail,
      url: "https://victor-mobility.vercel.app/uae",
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
                UAE Corporate Procurement & Tenders
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                UAE Enterprise RFP Desk
              </h1>
              <p className="text-base sm:text-lg text-brand-soft-neutral/85 leading-relaxed">
                Dedicated mobility procurement for multinational corporations, international delegations, and luxury hospitality across Dubai, Abu Dhabi, and the Northern Emirates.
              </p>
            </div>

            {/* UAE Enterprise Trust Grid */}
            <div className="mt-10 pt-6 border-t border-brand-indigo/30 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-brand-soft-neutral/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-violet shrink-0" />
                <span>2,000+ Cars & 500+ Buses</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-violet shrink-0" />
                <span>DXB & AUH Radar Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-brand-violet shrink-0" />
                <span>Al Garhoud Head Office</span>
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
              region="uae"
              contact={content.contact}
              cities={content.cities}
              services={content.services}
              companyName={uaeData.legalEntityName}
            />
          </div>
        </section>

        {/* Enterprise SLA & Compliance Framework Banner */}
        <section className="bg-slate-900 border-y border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">RTA Governance &amp; Corporate SLA</span>
              <p className="text-sm font-semibold text-white mt-0.5">Need Contractual SLA Benchmarks or Dubai RTA Compliance Records?</p>
              <p className="text-xs text-slate-400">Review our 99.6% on-time protocol guarantee, 15-min urban hot-swap, and FTA 5% VAT invoicing terms.</p>
            </div>
            <Link
              href="/uae/sla"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shrink-0"
            >
              Explore UAE SLA &amp; RTA Desk &rarr;
            </Link>
          </div>
        </section>

        {/* UAE Commercial Corridors Matrix Reference */}
        <CorridorMatrix region="uae" />
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
