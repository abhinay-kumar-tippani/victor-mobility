import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CorporatePortalDashboard from "@/components/portal/CorporatePortalDashboard";
import uaeData from "@/content/uae.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";
import { Activity, ShieldCheck, CheckCircle2, Building2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "UAE Corporate Client Portal & Fleet Telematics | Victor Mobility UAE",
  description:
    "Enterprise client mobility portal preview with executive limousine flight monitoring, delegation shift rosters, monthly SLA scorecards, and VAT billing reconciliation for UAE enterprises.",
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
    description:
      "Executive limousine delegation tracking, flight radar telematics, and SLA compliance scorecards in Dubai and the UAE.",
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
                Dubai Limousine Operations Software
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                UAE Corporate Client Portal
              </h1>
              <p className="text-base sm:text-lg text-brand-slate-light leading-relaxed">
                Experience real-time executive delegation monitoring, flight radar telematics, monthly SLA scorecards, and VAT billing transparency backed by: <strong className="text-white">&ldquo;On Time Every Time.&rdquo;</strong>
              </p>

              <div className="pt-2 flex flex-wrap gap-6 text-xs text-brand-slate-light">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>RTA Certified Limousine Telematics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>99.7% On-Time SLA Record</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>Dubai Al Garhoud Head Office Desk</span>
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
