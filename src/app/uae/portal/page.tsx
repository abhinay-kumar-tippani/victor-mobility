import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CorporatePortalDashboard from "@/components/portal/CorporatePortalDashboard";
import uaeData from "@/content/uae.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";
import { Activity, ShieldCheck, CheckCircle2, Building2 } from "lucide-react";


export const metadata: Metadata = {
  title: "Corporate Portal Demonstration | Victor Mobility UAE",
  description: "Interactive portal demonstration using fictional examples. No live tracking, client records, measured performance or payable invoices.",
  alternates: {
    canonical: "https://victor-mobility.vercel.app/uae/portal",
    languages: {
      "en-IN": "https://victor-mobility.vercel.app/india/portal",
      "en-AE": "https://victor-mobility.vercel.app/uae/portal",
    },
  },
};

export default function UaePortalPage() {
  const content = uaeData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Victor Mobility UAE Corporate Client Portal",
    applicationCategory: "BusinessApplication",
    description: "Interactive portal demonstration using fictional examples. No live tracking, client records, measured performance or payable invoices.",
    provider: {
      "@type": "Organization",
      name: content.companyName,
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
        {/* Hero Section */}
        <section className="bg-brand-ink text-white py-16 sm:py-24 border-b border-brand-indigo/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6E57A0_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/40 border border-brand-violet/40 text-xs font-bold tracking-widest uppercase text-brand-soft-neutral">
                <Activity className="w-3.5 h-3.5 text-brand-violet" />
                Portal demonstration — sample data
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                UAE Portal Demonstration
              </h1>
              <p className="text-base sm:text-lg text-brand-slate-light leading-relaxed">
                Explore example roster, reporting and statement layouts. This preview is not connected to live operations or customer accounts.
              </p>

              <div className="pt-2 flex flex-wrap gap-6 text-xs text-brand-slate-light">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Fictional roster examples</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>No measured performance data</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>No account or booking created</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Section */}
        <section className="py-12 sm:py-16 bg-brand-soft-neutral/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CorporatePortalDashboard region="uae" />
          </div>
        </section>
      </main>

      <Footer
        contact={content.contact}
        offices={content.offices}
        mediaCaption={media.caption}
        isoEnabled={content.sourceClaims?.iso?.enabled}
      />
    </div>
  );
}
