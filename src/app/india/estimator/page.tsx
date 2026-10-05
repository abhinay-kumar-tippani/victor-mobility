import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RouteFareEstimator from "@/components/estimator/RouteFareEstimator";
import CorridorMatrix from "@/components/home/CorridorMatrix";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";
import { Navigation, ShieldCheck, Clock, CheckCircle2, Phone, MessageSquare } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Route & Fare Estimator | Victor Mobility India",
  description:
    "Calculate indicative point-to-point and airport corridor rates for executive sedans, MPVs, and luxury coaches across Hyderabad, Bengaluru, and Pune.",
  alternates: {
    canonical: "https://victor-mobility.vercel.app/india/estimator",
    languages: {
      "en-IN": "https://victor-mobility.vercel.app/india/estimator",
      "en-AE": "https://victor-mobility.vercel.app/uae/estimator",
    },
  },
};

export default function IndiaEstimatorPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Victor Mobility India Route & Fare Estimator",
    description:
      "Interactive corridor fare estimator for corporate airport transfers, tech park shuttles, and intercity executive travel in India.",
    publisher: {
      "@type": "Organization",
      name: content.companyName,
      telephone: content.contact.phoneDisplay,
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
                <Navigation className="w-3.5 h-3.5 text-brand-violet" />
                Transparent Corporate Mobility Estimates
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                India Route &amp; Fare Estimator
              </h1>
              <p className="text-base sm:text-lg text-brand-slate-light leading-relaxed">
                Review indicative travel distances, expressway routes, and corporate rate brackets for Hyderabad, Bengaluru, and Pune transit corridors, powered by our punctuality baseline: <strong className="text-white">&ldquo;On Time Every Time.&rdquo;</strong>
              </p>

              <div className="pt-2 flex flex-wrap gap-6 text-xs text-brand-slate-light">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Police Verified Drivers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Flight Delay Radar Compensated</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Transparent Corporate Tariff Guidance</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Estimator Application Component */}
        <section className="py-12 sm:py-16 bg-brand-soft-neutral/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RouteFareEstimator region="india" />
          </div>
        </section>

        {/* Strategic Corridor Matrix */}
        <section className="py-12 sm:py-16 bg-white border-t border-brand-soft-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CorridorMatrix region="india" />
          </div>
        </section>

        {/* Corporate Retainer Notice */}
        <section className="py-12 bg-brand-soft-neutral/20 border-t border-brand-soft-neutral">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-brand-indigo">
              Need Contracted Corporate Employee Transport?
            </h3>
            <p className="text-sm text-brand-slate max-w-2xl mx-auto leading-relaxed">
              For volume employee rosters, daily IT campus shuttles, and monthly executive fleet retainers, submit a formal Request for Proposal (RFP).
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/india/rfp"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-indigo hover:bg-brand-indigo-light text-white text-xs font-bold transition-all shadow-md"
              >
                <span>Launch 4-Step RFP Desk</span>
              </Link>
              <Link
                href="/india/academy"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-brand-soft-neutral hover:border-brand-slate-light text-brand-indigo text-xs font-bold transition-all"
              >
                <span>Explore Chauffeur Protocol Academy</span>
              </Link>
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
