import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CorporateEsgCalculator from "@/components/esg/CorporateEsgCalculator";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";
import { Leaf, ShieldCheck, CheckCircle2, TrendingDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Corporate ESG & Green Commute Carbon Calculator | Victor Mobility India",
  description:
    "Model Scope 3 employee commute emission reductions, EV fleet transitions, and high-capacity shared transit carbon offsets across Hyderabad, Bengaluru, and Pune.",
  alternates: {
    canonical: "https://victor-mobility.vercel.app/india/esg",
    languages: {
      "en-IN": "https://victor-mobility.vercel.app/india/esg",
      "en-AE": "https://victor-mobility.vercel.app/uae/esg",
    },
  },
};

export default function IndiaEsgPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Victor Mobility Corporate ESG Commute Carbon Calculator",
    applicationCategory: "BusinessApplication",
    description:
      "Interactive carbon emissions calculator modeling corporate Scope 3 employee commute offsets via high-occupancy buses and EV fleet integration in India.",
    publisher: {
      "@type": "Organization",
      name: content.companyName,
      url: "https://victor-mobility.vercel.app/india",
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="print:hidden">
        <Header contact={content.contact} />
      </div>

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Page Hero */}
        <section className="print:hidden bg-brand-ink text-white py-16 sm:py-24 border-b border-brand-indigo/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6E57A0_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-xs font-bold tracking-widest uppercase text-emerald-300">
                <Leaf className="w-3.5 h-3.5" />
                Enterprise ESG &amp; Sustainability Architecture
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Decarbonizing Corporate Commutes
              </h1>
              <p className="text-base sm:text-lg text-brand-slate-light leading-relaxed">
                Empowering enterprise procurement and ESG leaders across Hyderabad, Bengaluru, and Pune to model, audit, and systematically reduce Scope 3 employee transit emissions under: <strong className="text-white">&ldquo;On Time Every Time.&rdquo;</strong>
              </p>

              <div className="pt-2 flex flex-wrap gap-6 text-xs text-brand-slate-light">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-emerald-400" />
                  <span>Up to 87% Carbon Reduction via Shared Shuttles</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>BRSR-Audit Compatible Reporting</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Telematics Zero-Deadhead Routing</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ESG Calculator Section */}
        <section className="py-12 sm:py-16 bg-brand-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CorporateEsgCalculator region="india" />
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
