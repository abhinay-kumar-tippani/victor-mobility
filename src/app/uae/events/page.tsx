import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EventLogisticsStagingDesk from "@/components/events/EventLogisticsStagingDesk";
import uaeData from "@/content/uae.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";
import { Calendar, ShieldCheck, CheckCircle2, Radio, Crown } from "lucide-react";

export const metadata: Metadata = {
  title: "UAE Diplomatic Summit & VIP Motorcade Logistics | Victor Mobility UAE",
  description:
    "First-class motorcades, high-profile diplomatic delegations, and convention transit for DWTC, Expo City Dubai, and ADNEC Abu Dhabi. RTA-certified luxury fleet.",
  alternates: {
    canonical: "https://victor-mobility.vercel.app/uae/events",
    languages: {
      "en-IN": "https://victor-mobility.vercel.app/india/events",
      "en-AE": "https://victor-mobility.vercel.app/uae/events",
    },
  },
};

export default function UaeEventsPage() {
  const content = uaeData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Victor Mobility UAE Diplomatic Summit & VIP Motorcade Logistics",
    serviceType: "Diplomatic & Summit VIP Motorcade Transportation",
    description:
      "RTA-licensed luxury limousine motorcades, FBO private jet terminal liaison, and convention shuttle networks across Dubai and Abu Dhabi.",
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
                <Crown className="w-3.5 h-3.5 text-brand-violet" />
                UAE Diplomatic &amp; Summit Staging Desk
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                VIP Motorcades &amp; Summit Transit
              </h1>
              <p className="text-base sm:text-lg text-brand-slate-light leading-relaxed">
                Coordinating high-profile diplomatic motorcades, DWTC congress shuttles, and luxury hospitality arrivals across Dubai and Abu Dhabi, upholding: <strong className="text-white">&ldquo;On Time Every Time.&rdquo;</strong>
              </p>

              <div className="pt-2 flex flex-wrap gap-6 text-xs text-brand-slate-light">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-emerald-400" />
                  <span>Mercedes-Maybach &amp; S-Class Motorcades</span>
                </div>
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-emerald-400" />
                  <span>Dubai Al Garhoud Central Radar Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>RTA Certified Protocol Chauffeurs</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Staging Desk Component Container */}
        <section className="py-12 sm:py-16 bg-brand-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <EventLogisticsStagingDesk region="uae" />
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
