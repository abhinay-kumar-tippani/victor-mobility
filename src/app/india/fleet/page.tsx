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
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";

export const metadata: Metadata = {
  title: "Fleet Categories | Victor Mobility - Corporate & Executive Vehicles",
  description:
    "Explore Victor Mobility's vehicle categories: Sedans, MPVs & Group Vehicles, Buses & Shuttles, and Executive Luxury. Tailored transport arrangements across Hyderabad, Bengaluru, and Pune.",
};

const categoryDetails: Record<
  string,
  {
    icon: React.ElementType;
    capacity: string;
    useCases: string[];
    idealFor: string;
  }
> = {
  sedans: {
    icon: Car,
    capacity: "Up to 3-4 passengers",
    useCases: [
      "Executive city commutes",
      "One-on-one airport transfers",
      "Full-day corporate meetings",
      "Intercity business travel",
    ],
    idealFor: "Individual business travelers, executives, and routine corporate station runs.",
  },
  mpvs: {
    icon: Users,
    capacity: "Up to 6-7 passengers",
    useCases: [
      "Project team transportation",
      "Small delegation transfers",
      "Airport runs with heavy luggage",
      "Site visits & multi-stop schedules",
    ],
    idealFor: "Visiting corporate teams, families, and project managers requiring generous luggage room.",
  },
  buses: {
    icon: Bus,
    capacity: "22-seater and 44-seater configurations",
    useCases: [
      "Daily corporate employee commute",
      "Campus & IT park circular shuttles",
      "Conference delegate logistics",
      "Event & venue guest transit",
    ],
    idealFor: "Enterprise workplace transit, factory shift moves, and conference coordination.",
  },
  luxury: {
    icon: Crown,
    capacity: "Premium executive configurations",
    useCases: [
      "VIP delegate & dignitary transport",
      "High-profile event arrivals",
      "Board of Directors mobility",
      "Celebrations and special occasions",
    ],
    idealFor: "High-level corporate delegations, dignitaries, weddings, and premium hospitality.",
  },
};

export default function FleetPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const luxuryAsset = media.assets.find((a) => a.id === "luxury-interior");

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header contact={content.contact} />

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Page Hero Header */}
        <section className="bg-brand-ink text-white py-16 sm:py-24 border-b border-brand-indigo/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6E57A0_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/40 border border-brand-violet/40 text-xs font-bold tracking-widest uppercase text-brand-soft-neutral">
                <Sparkles className="w-3.5 h-3.5 text-brand-violet" />
                Fleet Categories & Specifications
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Vehicles for Everyday Journeys & Special Occasions
              </h1>
              <p className="text-base sm:text-lg text-brand-soft-neutral/85 leading-relaxed">
                Victor Mobility structures its fleet into four core categories designed to cover every
                scale of movement—from individual executive travel to multi-shift corporate bus shuttles.
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
                    Premium Comfort & Professional Demeanor
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

        {/* Category Cards Section */}
        <section className="py-16 sm:py-24 bg-brand-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Guidance Callout */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-brand-soft-neutral flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-brand-indigo/10 text-brand-indigo flex items-center justify-center shrink-0 mt-0.5">
                <Info className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-brand-ink">
                  Vehicle Allocation & Custom Selection
                </h3>
                <p className="text-sm text-brand-ink/75 leading-relaxed">
                  {content.fleetNote}
                </p>
              </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {content.fleetCategories.map((category) => {
                const details = categoryDetails[category.id] || {
                  icon: Car,
                  capacity: "Custom allocation",
                  useCases: ["Corporate transit", "Scheduled routes"],
                  idealFor: "Corporate and event mobility.",
                };
                const IconComp = details.icon;

                return (
                  <article
                    key={category.id}
                    className="bg-white rounded-3xl p-8 border border-brand-soft-neutral shadow-sm hover:border-brand-indigo/30 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-warm-white px-3 py-1.5 rounded-full border border-brand-soft-neutral">
                          {details.capacity}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-brand-ink mb-2">
                          {category.name}
                        </h3>
                        <p className="text-sm text-brand-indigo font-medium mb-3">
                          {category.description}
                        </p>
                        <p className="text-xs text-brand-ink/70 leading-relaxed">
                          {details.idealFor}
                        </p>
                      </div>

                      {/* Typical Applications */}
                      <div className="border-t border-brand-soft-neutral pt-4 space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-ink/60 block">
                          Recommended Applications
                        </span>
                        <ul className="space-y-1.5">
                          {details.useCases.map((useCase) => (
                            <li
                              key={useCase}
                              className="flex items-center gap-2 text-xs text-brand-ink/80"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-violet shrink-0" />
                              <span>{useCase}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-brand-soft-neutral flex items-center justify-between">
                      <Link
                        href={`/india/contact?category=${category.id}`}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-brand-indigo hover:bg-brand-blue text-white px-5 py-2.5 rounded-xl transition-colors shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Enquire for {category.name}</span>
                      </Link>

                      <a
                        href={content.contact.phoneHref}
                        className="text-xs font-semibold text-brand-ink/70 hover:text-brand-indigo transition-colors"
                      >
                        Call desk
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
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
