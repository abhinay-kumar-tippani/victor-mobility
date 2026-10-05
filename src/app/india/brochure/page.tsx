import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ExecutivePresentationDeck from "@/components/brochure/ExecutivePresentationDeck";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";
import { FileText, ShieldCheck, CheckCircle2, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Executive Presentation Deck & Capability Brochure | Victor Mobility India",
  description:
    "Official digital slide deck and corporate capability brochure for Victor Mobility India. Explore our 2,000+ car & 500+ bus fleet, Chauffeur Academy, and enterprise transit solutions with Print-to-PDF procurement styling.",
  alternates: {
    canonical: "https://victor-mobility.vercel.app/india/brochure",
    languages: {
      "en-IN": "https://victor-mobility.vercel.app/india/brochure",
      "en-AE": "https://victor-mobility.vercel.app/uae/brochure",
    },
  },
};

export default function IndiaBrochurePage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name: "Victor Mobility India Executive Capability Deck",
    description:
      "Enterprise slide deck and procurement brochure covering corporate employee transport, executive chauffeur fleet, and operations infrastructure across Hyderabad, Bengaluru, and Pune.",
    publisher: {
      "@type": "Organization",
      name: content.companyName,
      url: "https://victor-mobility.vercel.app/india",
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
                Procurement &amp; Board Presentation Deck
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Executive Presentation Deck
              </h1>
              <p className="text-base sm:text-lg text-brand-slate-light leading-relaxed">
                Review our comprehensive corporate mobility capability profile, 2,000+ vehicle infrastructure, Chauffeur Academy compliance standards, and multi-city operations, upholding: <strong className="text-white">&ldquo;On Time Every Time.&rdquo;</strong>
              </p>

              <div className="pt-2 flex flex-wrap gap-6 text-xs text-brand-slate-light">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>2,000+ Cars &amp; 500+ Luxury Buses</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Print-to-PDF Procurement Styling</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>Hyderabad HQ · Bengaluru · Pune</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Presentation Deck Container */}
        <section className="py-12 sm:py-16 bg-slate-950/60 print:bg-white print:py-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 print:p-0 print:max-w-none">
            <ExecutivePresentationDeck region="india" />
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
