import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Car,
  Users,
  Bus,
  Crown,
  CheckCircle2,
  Phone,
  MessageSquare,
  Shield,
  Clock,
  Sparkles,
  Info,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InteractiveFleetShowcase from "@/components/fleet/InteractiveFleetShowcase";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";

export const metadata: Metadata = {
  title: "Corporate & Executive Fleet Showcase | Victor Mobility India",
  description:
    "Explore Victor Mobility's 2,000+ car & 500+ bus fleet architecture across Hyderabad, Bengaluru, and Pune. High-fidelity vehicle specs, cabin layout, luggage capacity, and instant corporate rate card calculator.",
  alternates: {
    canonical: "https://victor-mobility.vercel.app/india/fleet",
    languages: {
      "en-IN": "https://victor-mobility.vercel.app/india/fleet",
      "en-AE": "https://victor-mobility.vercel.app/uae/fleet",
    },
  },
};

export default function FleetPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const luxuryAsset = media.assets.find((a) => a.id === "luxury-interior");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Victor Mobility Commercial & Executive Fleet Architecture",
    description:
      "Enterprise fleet categories including Executive Sedans, MPVs, Luxury Limousines, and High-Capacity Buses across Hyderabad, Bengaluru, and Pune.",
    numberOfItems: 4,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Executive Sedans",
        description: "Swift Dzire, Tata Tigor, Honda City for daily employee commute and airport transfers.",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "MPVs & Group Vehicles",
        description: "Toyota Innova Crysta, Force Urbania for project teams and family celebrations.",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Luxury & Limousines",
        description: "Mercedes-Benz E/S-Class, BMW 7 Series for VIP dignitaries and board members.",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Buses & Corporate Shuttles",
        description: "22-seater and 44-seater luxury coaches for corporate campus loops and event transit.",
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header contact={content.contact} />

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Page Hero Header */}
        <section className="bg-brand-ink text-white py-16 sm:py-24 border-b border-brand-indigo/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6E57A0_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/40 border border-brand-violet/40 text-xs font-bold tracking-widest uppercase text-brand-soft-neutral">
                <Sparkles className="w-3.5 h-3.5 text-brand-violet" />
                Fleet Categories &amp; Virtual Inspection Desk
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Vehicles for Everyday Journeys &amp; Special Occasions
              </h1>
              <p className="text-base sm:text-lg text-brand-soft-neutral/85 leading-relaxed">
                Operating dedicated corporate fleets comprising executive sedans, MPVs, and luxury air-conditioned coaches across Hyderabad, Bengaluru, and Pune. Meticulously maintained, GPS-monitored, and backed by: <strong className="text-white">&ldquo;On Time Every Time.&rdquo;</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Featured Luxury Interior Showcase */}
        {luxuryAsset && (
          <section className="bg-brand-ink py-12 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-brand-ink/90 shadow-2xl">
                <div className="relative h-72 sm:h-96 w-full">
                  <Image
                    src={luxuryAsset.src}
                    alt={luxuryAsset.alt}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/80 to-transparent" />
                </div>

                <div className="relative p-6 sm:p-10 -mt-24 sm:-mt-28 space-y-3 z-10 max-w-2xl bg-gradient-to-r from-brand-ink via-brand-ink/95 to-brand-ink/80 rounded-2xl mx-4 sm:mx-8 mb-6 border border-white/10">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-violet">
                    <Crown className="w-4 h-4" />
                    <span>Executive Standard</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Premium Comfort &amp; Professional Demeanor
                  </h2>
                  <p className="text-xs sm:text-sm text-brand-soft-neutral/90 leading-relaxed">
                    Every passenger vehicle arranged through Victor Mobility undergoes rigorous pre-trip checks,
                    ensuring pristine interiors, climate-controlled comfort, and vetted professional drivers.
                  </p>
                  <p className="text-[11px] text-brand-soft-neutral/60 italic pt-1">
                    {media.caption}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Interactive Fleet Showcase & Rate Card Section */}
        <section className="py-16 sm:py-24 bg-brand-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Guidance Callout */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-brand-soft-neutral flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-brand-indigo/10 text-brand-indigo flex items-center justify-center shrink-0 mt-0.5">
                <Info className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-brand-ink">
                  Vehicle Allocation &amp; Custom Selection
                </h3>
                <p className="text-sm text-brand-ink/75 leading-relaxed">
                  {content.fleetNote}
                </p>
              </div>
            </div>

            {/* Interactive Showcase Component */}
            <InteractiveFleetShowcase region="india" />
          </div>
        </section>

        {/* Operating Standards & Safety */}
        <section className="py-16 sm:py-20 bg-white border-t border-brand-soft-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo block">
                Quality Assurance
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink">
                Our Operational Commitments
              </h2>
              <p className="text-sm text-brand-ink/70">
                Regardless of category, every vehicle managed by Victor Mobility adheres to strict operational standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-brand-warm-white border border-brand-soft-neutral space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-brand-ink">Punctual Dispatch</h3>
                <p className="text-xs text-brand-ink/75 leading-relaxed">
                  True to our motto &ldquo;On Time Every Time,&rdquo; driver dispatches and arrival windows are
                  actively tracked and managed to prevent delays.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-brand-warm-white border border-brand-soft-neutral space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-brand-ink">Driver Compliance</h3>
                <p className="text-xs text-brand-ink/75 leading-relaxed">
                  Professional chauffeurs with commercial driving permits, verified backgrounds, and route
                  familiarity across Hyderabad, Bengaluru, and Pune.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-brand-warm-white border border-brand-soft-neutral space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-brand-ink">Vehicle Condition</h3>
                <p className="text-xs text-brand-ink/75 leading-relaxed">
                  Clean, well-maintained cabins, functional air conditioning, and regular mechanical servicing
                  for safe passenger journeys.
                </p>
              </div>
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
