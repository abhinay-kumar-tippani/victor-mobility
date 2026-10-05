import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RouteFareEstimator from "@/components/estimator/RouteFareEstimator";
import CorridorMatrix from "@/components/home/CorridorMatrix";
import uaeData from "@/content/uae.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";
import { Navigation, ShieldCheck, Clock, CheckCircle2, Phone } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "UAE Limousine Route & Fare Estimator | Victor Mobility UAE",
  description:
    "Calculate indicative executive limousine and airport transfer fares across Dubai, Abu Dhabi, and Sharjah corridors. First Class saloons, Maybachs, and luxury coaches.",
  alternates: {
    canonical: "https://victor-mobility.vercel.app/uae/estimator",
    languages: {
      "en-IN": "https://victor-mobility.vercel.app/india/estimator",
      "en-AE": "https://victor-mobility.vercel.app/uae/estimator",
    },
  },
};

export default function UaeEstimatorPage() {
  const content = uaeData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Victor Mobility UAE Limousine Route & Fare Estimator",
    description:
      "Interactive corridor fare estimator for executive limousine transfers, airport VIP arrivals, and inter-emirate transit in the UAE.",
    publisher: {
      "@type": "Organization",
      name: content.companyName,
      telephone: content.contact.phoneDisplay,
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
                <Navigation className="w-3.5 h-3.5 text-brand-violet" />
                UAE Executive Limousine Tariffs
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                UAE Route &amp; Limousine Estimator
              </h1>
              <p className="text-base sm:text-lg text-brand-slate-light leading-relaxed">
                Review indicative travel distances, expressway routes, and executive limousine rates across Dubai, Abu Dhabi, and Sharjah corridors, backed by our founding standard: <strong className="text-white">&ldquo;On Time Every Time.&rdquo;</strong>
              </p>

              <div className="pt-2 flex flex-wrap gap-6 text-xs text-brand-slate-light">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>RTA Certified Executive Chauffeurs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>DXB / AUH / DWC Radar Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Salik Toll &amp; Airport Parking Coordination</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Estimator Application Component */}
        <section className="py-12 sm:py-16 bg-brand-soft-neutral/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RouteFareEstimator region="uae" />
          </div>
        </section>

        {/* Strategic Corridor Matrix */}
        <section className="py-12 sm:py-16 bg-white border-t border-brand-soft-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CorridorMatrix region="uae" />
          </div>
        </section>

        {/* Corporate Limousine Retainers Notice */}
        <section className="py-12 bg-brand-soft-neutral/20 border-t border-brand-soft-neutral">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-brand-indigo">
              Enterprise Delegations &amp; Event Transportation in the UAE
            </h3>
            <p className="text-sm text-brand-slate max-w-2xl mx-auto leading-relaxed">
              For high-volume conference shuttles, corporate fleet retainers, or executive VIP delegations across Dubai and Abu Dhabi, submit a formal RFP.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/uae/rfp"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-indigo hover:bg-brand-indigo-light text-white text-xs font-bold transition-all shadow-md"
              >
                <span>Launch UAE RFP Desk</span>
              </Link>
              <Link
                href="/uae/academy"
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
        isoEnabled={content.sourceClaims?.iso?.enabled}
      />
    </div>
  );
}
