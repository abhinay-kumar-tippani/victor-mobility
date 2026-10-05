import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ExecutivePresentationDeck from "@/components/brochure/ExecutivePresentationDeck";
import uaeData from "@/content/uae.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";
import { FileText, ShieldCheck, CheckCircle2, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "UAE Executive Presentation Deck & Limousine Profile | Victor Mobility UAE",
  description:
    "Official digital slide deck and corporate capability profile for Victor Mobility UAE. Luxury limousine fleet, VIP airport transfers, executive roadshows, and DIFC corporate mobility with Print-to-PDF procurement styling.",
  alternates: {
    canonical: "https://victor-mobility.vercel.app/uae/brochure",
    languages: {
      "en-IN": "https://victor-mobility.vercel.app/india/brochure",
      "en-AE": "https://victor-mobility.vercel.app/uae/brochure",
    },
  },
};

export default function UaeBrochurePage() {
  const content = uaeData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name: "Victor Mobility UAE Executive Capability Deck",
    description:
      "Enterprise slide deck and procurement brochure covering luxury limousine fleet, VIP airport protocols, corporate delegations, and Dubai Al Garhoud dispatch operations.",
    publisher: {
      "@type": "Organization",
      name: content.companyName,
      url: "https://victor-mobility.vercel.app/uae",
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="print:hidden">
        <Header contact={content.contact} />
      </div>

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Page Hero */}
        <section className="print:hidden bg-brand-ink text-white py-16 sm:py-20 border-b border-brand-indigo/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6E57A0_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/40 border border-brand-violet/40 text-xs font-bold tracking-widest uppercase text-brand-soft-neutral">
                <FileText className="w-3.5 h-3.5 text-brand-violet" />
                Dubai &amp; Abu Dhabi Corporate Mobility Desk
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                UAE Executive Presentation Deck
              </h1>
              <p className="text-base sm:text-lg text-brand-slate-light leading-relaxed">
                Review our premier UAE limousine capability profile, luxury executive fleet, radar-linked airport transfer protocols, and high-profile delegation services: <strong className="text-white">&ldquo;On Time Every Time.&rdquo;</strong>
              </p>

              <div className="pt-2 flex flex-wrap gap-6 text-xs text-brand-slate-light">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Mercedes S-Class, Maybach &amp; First Class Coaches</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>RTA Certified Executive Chauffeurs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>Dubai Al Garhoud HQ · Abu Dhabi Operations</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Presentation Deck Container */}
        <section className="py-12 sm:py-16 bg-slate-950/60 print:bg-white print:py-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 print:p-0 print:max-w-none">
            <ExecutivePresentationDeck region="uae" />
          </div>
        </section>
      </main>

      <div className="print:hidden">
        <Footer
          contact={content.contact}
          offices={content.offices}
          mediaCaption={media.caption}
          isoEnabled={content.sourceClaims?.iso?.enabled}
        />
      </div>
    </div>
  );
}
