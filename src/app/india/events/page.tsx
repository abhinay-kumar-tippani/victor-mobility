import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EventLogisticsStagingDesk from "@/components/events/EventLogisticsStagingDesk";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";
import { Calendar, ShieldCheck, CheckCircle2, Radio, Bus } from "lucide-react";

export const metadata: Metadata = {
  title: "Mega-Event & Summit Transit Logistics Staging Desk | Victor Mobility India",
  description:
    "Orchestrate multi-vehicle motorcades, tech summit shuttle networks, and luxury wedding guest convoys across Hyderabad, Bengaluru, and Pune. 2,000+ cars and 500+ buses capability.",
  alternates: {
    canonical: "https://victor-mobility.vercel.app/india/events",
    languages: {
      "en-IN": "https://victor-mobility.vercel.app/india/events",
      "en-AE": "https://victor-mobility.vercel.app/uae/events",
    },
  },
};

export default function IndiaEventsPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Victor Mobility India Mega-Event & Summit Transit Logistics",
    serviceType: "Corporate Event & Summit Transportation",
    description:
      "Turnkey multi-vehicle staging, airport VIP reception desks, and dedicated on-site radio marshals for major conferences and weddings in India.",
    provider: {
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
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/40 border border-brand-violet/40 text-xs font-bold tracking-widest uppercase text-brand-soft-neutral">
                <Calendar className="w-3.5 h-3.5 text-brand-violet" />
                Mega-Event &amp; Summit Staging Desk
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Flawless Multi-Vehicle Staging
              </h1>
              <p className="text-base sm:text-lg text-brand-slate-light leading-relaxed">
                Orchestrating synchronized vehicle convoys, keynote VIP arrivals, and campus shuttle loops across Hyderabad, Bengaluru, and Pune, executed under: <strong className="text-white">&ldquo;On Time Every Time.&rdquo;</strong>
              </p>

              <div className="pt-2 flex flex-wrap gap-6 text-xs text-brand-slate-light">
                <div className="flex items-center gap-2">
                  <Bus className="w-4 h-4 text-emerald-400" />
                  <span>2,000+ Cars &amp; 500+ Buses Capacity</span>
                </div>
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-emerald-400" />
                  <span>On-Site Ground Marshals &amp; Radio Control</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Standby Hot-Swap Vehicle Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Staging Desk Component Container */}
        <section className="py-12 sm:py-16 bg-brand-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <EventLogisticsStagingDesk region="india" />
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
