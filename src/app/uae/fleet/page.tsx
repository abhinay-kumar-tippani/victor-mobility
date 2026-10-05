import type { Metadata } from "next";
import Link from "next/link";
import { Car, ShieldCheck, Sparkles, MessageSquare, Phone, CheckCircle2, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InteractiveFleetShowcase from "@/components/fleet/InteractiveFleetShowcase";
import uaeData from "@/content/uae.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";

export const metadata: Metadata = {
  title: "UAE Luxury Fleet & Virtual Inspection Showcase | Victor Mobility UAE",
  description:
    "Explore Victor Mobility UAE's executive fleet across Dubai and Abu Dhabi: Mercedes-Benz S-Class, BMW 7 Series, Mercedes-Maybach, Cadillac Escalade, and VIP Coaches. High-fidelity specs and instant corporate tariff generator.",
  alternates: {
    canonical: "https://victor-mobility.vercel.app/uae/fleet",
    languages: {
      "en-IN": "https://victor-mobility.vercel.app/india/fleet",
      "en-AE": "https://victor-mobility.vercel.app/uae/fleet",
    },
  },
};

export default function UaeFleetPage() {
  const content = uaeData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Victor Mobility UAE Luxury Limousine & Executive Fleet",
    description:
      "Enterprise limousine and coach fleet categories including First Class Saloons, Ultra-Luxury Maybach, Executive SUVs, and VIP Coaches across Dubai and Abu Dhabi.",
    numberOfItems: 4,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "First Class Saloons",
        description: "Mercedes-Benz S-Class, BMW 7 Series for airport VIP and executive roadshows.",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Ultra-Luxury & VIP",
        description: "Mercedes-Maybach S-Class for private jet arrivals and high-profile state delegations.",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Executive SUVs & MPVs",
        description: "Cadillac Escalade, GMC Yukon, Mercedes-Benz V-Class for delegation convoys.",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Luxury Buses & VIP Coaches",
        description: "22-seater and 44-seater luxury coaches for global summits and corporate loops.",
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
        {/* Page Hero */}
        <section className="bg-brand-ink text-white py-16 sm:py-24 border-b border-brand-indigo/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6E57A0_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-indigo/40 border border-brand-violet/40 text-xs font-bold tracking-widest uppercase text-brand-soft-neutral">
                <Car className="w-3.5 h-3.5 text-brand-violet" />
                UAE Executive Fleet &amp; Virtual Inspection Desk
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Luxury Saloons, Executive SUVs &amp; VIP Coaches
              </h1>
              <p className="text-base sm:text-lg text-brand-soft-neutral/85 leading-relaxed">
                Operating with access to over 2,000+ luxury cars and 500+ buses across Dubai and Abu Dhabi. Meticulously maintained, fully sanitized, and ready for immediate deployment under: <strong className="text-white">&ldquo;On Time Every Time.&rdquo;</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Fleet Showcase & Rate Card Component */}
        <section className="py-16 sm:py-24 bg-brand-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <InteractiveFleetShowcase region="uae" />
          </div>
        </section>

        {/* Fleet Tiering & Luggage Specifications */}
        <section className="py-16 sm:py-20 bg-white border-t border-brand-soft-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl">
              <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
                Capacity &amp; Amenities
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight mb-3">
                Vehicle Standards &amp; Luggage Allowances
              </h2>
              <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
                Choose the optimal vehicle category based on passenger numbers, luggage volumes, and desired travel atmosphere.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-brand-warm-white rounded-3xl p-8 border border-brand-soft-neutral shadow-xs space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo font-bold text-sm">
                  01
                </div>
                <h3 className="text-xl font-bold text-brand-ink">First Class Saloons</h3>
                <p className="text-xs text-brand-ink/70">
                  Mercedes-Benz S-Class &amp; BMW 7 Series. Comfortably accommodates up to 3 passengers with 2 large suitcases and 2 cabin bags.
                </p>
                <div className="pt-3 border-t border-brand-soft-neutral text-xs text-brand-indigo font-semibold">
                  Ideal for: Airport VIP, Executive Meetings &amp; Board Travel
                </div>
              </div>

              <div className="bg-brand-warm-white rounded-3xl p-8 border border-brand-soft-neutral shadow-xs space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo font-bold text-sm">
                  02
                </div>
                <h3 className="text-xl font-bold text-brand-ink">Executive SUVs &amp; MPVs</h3>
                <p className="text-xs text-brand-ink/70">
                  Cadillac Escalade, GMC Yukon &amp; Mercedes-Benz V-Class. Accommodates 5 to 7 passengers with up to 6 large suitcases.
                </p>
                <div className="pt-3 border-t border-brand-soft-neutral text-xs text-brand-indigo font-semibold">
                  Ideal for: Family Occasions, Delegation Convoys &amp; Golf Excursions
                </div>
              </div>

              <div className="bg-brand-warm-white rounded-3xl p-8 border border-brand-soft-neutral shadow-xs space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo font-bold text-sm">
                  03
                </div>
                <h3 className="text-xl font-bold text-brand-ink">Luxury Coaches &amp; Shuttles</h3>
                <p className="text-xs text-brand-ink/70">
                  22-seater VIP coaches and 44-seater luxury buses with generous undercarriage luggage bays and reclining executive seating.
                </p>
                <div className="pt-3 border-t border-brand-soft-neutral text-xs text-brand-indigo font-semibold">
                  Ideal for: Trade Summits (GITEX/ADIPEC), Corporate Shuttles &amp; Tours
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Bar */}
        <section className="py-14 bg-brand-warm-white border-t border-brand-soft-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-brand-ink text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2 max-w-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-violet block">
                  Reserve UAE Fleet
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold">
                  Confirm Vehicle Availability in Dubai
                </h3>
                <p className="text-sm text-white/80">
                  Contact our Dubai dispatch desk with your dates and required category to secure confirmed vehicle allocation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Link
                  href="/uae/contact"
                  className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider bg-brand-indigo hover:bg-brand-blue text-white px-6 py-3.5 rounded-xl transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquire via WhatsApp</span>
                </Link>
                <a
                  href={content.contact.phoneHref}
                  className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-xl transition-colors border border-white/20"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {content.contact.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer
        contact={content.contact}
        offices={content.offices}
        mediaCaption={media.caption}
        isoEnabled={false}
      />
    </div>
  );
}
