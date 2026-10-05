import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  MapPin,
  Clock,
  Building2,
  Users,
  CheckCircle2,
  Phone,
  MessageSquare,
  HelpCircle,
  Award,
  Sparkles,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  Quote,
  Calendar,
  Check,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";

export const metadata: Metadata = {
  title: "About Us | Victor Mobility - Corporate & Luxury Transport Partner",
  description:
    "Discover Victor Mobility Pvt. Ltd.: our founder Jahangir, company history since 2010, leadership, operating discipline, and verified network across Hyderabad, Bengaluru, and Pune. On Time Every Time.",
};

export default function AboutPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const publishedOffices = content.offices.filter((o) => o.published);
  const isoClaim = content.sourceClaims.iso;
  const story = content.about.story;
  const founder = content.founder;
  const milestones = content.milestones || [];
  const clientele = content.esteemedClientele || [];
  const safety = content.safetyCommitments || [];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header contact={content.contact} />

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Page Hero Header */}
        <section className="bg-brand-ink text-white py-16 sm:py-24 border-b border-brand-indigo/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6E57A0_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-indigo/40 border border-brand-violet/40 text-xs font-bold tracking-widest uppercase text-brand-soft-neutral">
                <Building2 className="w-3.5 h-3.5 text-brand-violet" />
                Company Story & Philosophy
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Punctual mobility built on trust and accountability.
              </h1>
              <p className="text-base sm:text-lg text-brand-soft-neutral/85 leading-relaxed">
                From executive VIP chauffeur protocols to multi-vehicle wedding convoys and tech workforce commutes,
                Victor Mobility unites three customer dimensions under one discipline:{" "}
                <strong className="text-white font-bold">&ldquo;On Time Every Time.&rdquo;</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Meet our Founder and Visionary (Brochure Page 5) */}
        {founder && (
          <section className="py-16 sm:py-24 bg-brand-warm-white border-b border-brand-soft-neutral">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-3xl overflow-hidden border border-brand-soft-neutral shadow-sm grid grid-cols-1 lg:grid-cols-12 items-center">
                {/* Founder Portrait Column */}
                <div className="lg:col-span-5 relative aspect-[4/5] sm:aspect-square lg:aspect-auto lg:h-full min-h-[380px] bg-brand-ink">
                  <Image
                    src={founder.imageSrc}
                    alt={`Portrait of ${founder.name}, ${founder.role} of Victor Mobility`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/20 to-transparent lg:hidden" />
                  <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-violet bg-white/90 px-2.5 py-0.5 rounded-full inline-block mb-1">
                      {founder.role}
                    </span>
                    <h3 className="text-xl font-bold">{founder.name}</h3>
                  </div>
                </div>

                {/* Founder Narrative Column */}
                <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
                      Meet our Founder & Visionary
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-ink tracking-tight">
                      {founder.name}
                    </h2>
                    <p className="text-xs sm:text-sm font-semibold text-brand-indigo mt-1">
                      {founder.role} · {founder.experience}
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-brand-warm-white border border-brand-soft-neutral flex items-start gap-3">
                    <Quote className="w-5 h-5 text-brand-indigo shrink-0 mt-1" />
                    <p className="text-sm sm:text-base font-semibold italic text-brand-ink">
                      &ldquo;{founder.quote}&rdquo;
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-ink/80 leading-relaxed">
                    {founder.bio}
                  </p>

                  <div className="pt-4 border-t border-brand-soft-neutral flex flex-wrap items-center gap-6 text-xs text-brand-ink/70">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-brand-blue" />
                      <span className="font-semibold">Established 2010 in Hyderabad</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-brand-indigo" />
                      <span className="font-semibold">Registered under Indian Companies Act 1956</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Company Evolution & Milestones (Brochure Page 4) */}
        {milestones.length > 0 && (
          <section className="py-16 sm:py-24 bg-white border-b border-brand-soft-neutral">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="max-w-3xl">
                <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
                  Company Evolution (2010 – 2024)
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-3">
                  A decade of disciplined growth and operational milestones.
                </h2>
                <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
                  Founded in Hyderabad with a focus on enterprise reliability, Victor Mobility has systematically expanded into a multi-city mobility provider across India.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {milestones.map((m) => (
                  <div
                    key={m.year + m.title}
                    className="p-6 rounded-2xl bg-brand-warm-white border border-brand-soft-neutral flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-sm transition-all"
                  >
                    <div className="space-y-2">
                      <span className="text-2xl font-extrabold text-brand-indigo block">
                        {m.year}
                      </span>
                      <h3 className="text-base font-bold text-brand-ink">
                        {m.title}
                      </h3>
                      <p className="text-xs text-brand-ink/75 leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-brand-soft-neutral/70 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-blue">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified Milestone</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Commitment to Safety (Brochure Page 11) */}
        {safety.length > 0 && (
          <section className="py-16 sm:py-20 bg-brand-warm-white border-b border-brand-soft-neutral">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="max-w-3xl">
                <span className="text-xs uppercase tracking-widest font-bold text-brand-indigo block mb-2">
                  Safety First
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight mb-3">
                  Our Uncompromising Commitment to Safety
                </h2>
                <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
                  At Victor Mobility, passenger security and chauffeur professionalism form the foundation of our daily operations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {safety.map((item, idx) => (
                  <div
                    key={item.title}
                    className="bg-white p-6 rounded-2xl border border-brand-soft-neutral shadow-2xs space-y-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-brand-indigo/10 text-brand-indigo flex items-center justify-center font-bold text-xs">
                      0{idx + 1}
                    </div>
                    <h3 className="text-sm font-bold text-brand-ink">{item.title}</h3>
                    <p className="text-xs text-brand-ink/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Esteemed Clientele (Brochure Page 9) */}
        {clientele.length > 0 && (
          <section className="py-16 bg-white border-b border-brand-soft-neutral">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block">
                  Enterprise Client Relationships
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink">
                  Trusted by Over 30+ Multinational Corporations
                </h2>
                <p className="text-xs sm:text-sm text-brand-ink/70">
                  Providing enterprise employee transportation, VIP delegation transit, and reliable corporate mobility.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {clientele.map((client) => (
                  <div
                    key={client}
                    className="bg-brand-warm-white/70 rounded-xl py-3.5 px-4 text-center border border-brand-soft-neutral shadow-2xs hover:border-brand-indigo transition-colors"
                  >
                    <span className="text-xs font-bold text-brand-ink tracking-tight">
                      {client}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-brand-ink/50 text-center">
                *All corporate trademarks and brand names are properties of their respective organizations and represent client partnerships.
              </p>
            </div>
          </section>
        )}

        {/* Established Operating Offices */}
        <section id="network" className="py-16 sm:py-24 bg-brand-warm-white border-b border-brand-soft-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo block">
                Office Locations
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-ink">
                Established India Operating Network
              </h2>
              <p className="text-base text-brand-ink/75 leading-relaxed">
                Victor Mobility maintains verified physical presence across India&apos;s leading commercial and technology
                centers. Contact our branch teams directly for local allocations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {publishedOffices.map((office) => (
                <div
                  key={office.city}
                  className="bg-white rounded-3xl p-8 border border-brand-soft-neutral flex flex-col justify-between shadow-2xs"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue bg-brand-warm-white px-3 py-1 rounded-full border border-brand-soft-neutral">
                        {office.label}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-brand-ink mb-2">
                        {office.city}
                      </h3>
                      <p className="text-xs text-brand-ink/70 leading-relaxed">
                        {office.address}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-brand-soft-neutral flex items-center justify-between">
                    <Link
                      href={`/india/contact?city=${encodeURIComponent(office.city)}`}
                      className="text-xs font-bold text-brand-indigo hover:text-brand-blue inline-flex items-center gap-1"
                    >
                      <span>Enquire for {office.city}</span>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        {content.faqs && content.faqs.length > 0 && (
          <section className="py-16 sm:py-20 bg-white border-b border-brand-soft-neutral">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-indigo">
                  <HelpCircle className="w-4 h-4" />
                  <span>Clarifications & Guidance</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink">
                  Frequently Asked Questions
                </h2>
                <p className="text-sm text-brand-ink/70">
                  Straightforward answers about our operations, quoting process, and booking procedures.
                </p>
              </div>

              <div className="space-y-4">
                {content.faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="bg-brand-warm-white rounded-2xl p-6 sm:p-7 border border-brand-soft-neutral shadow-2xs space-y-2"
                  >
                    <h3 className="text-base font-bold text-brand-ink">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-brand-ink/75 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-14 bg-brand-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-brand-ink text-white rounded-3xl p-8 sm:p-12 border border-brand-indigo/30 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-violet block">
                  Direct Requirement Desk
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Discuss Your Transport Arrangement
                </h3>
                <p className="text-sm text-brand-soft-neutral/85 leading-relaxed">
                  Speak directly with our Business Development Partner, Mujeeb Ur Rehman Mohammed,
                  to structure an agreement or itinerary for your organization or special occasion.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
                <Link
                  href="/india/contact"
                  className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider bg-brand-indigo hover:bg-brand-blue text-white px-6 py-3.5 rounded-xl transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Discuss Requirement</span>
                </Link>
                <a
                  href={content.contact.phoneHref}
                  className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-xl transition-colors border border-white/20"
                >
                  <Phone className="w-4 h-4 text-brand-soft-neutral" />
                  <span>{content.contact.phoneDisplay}</span>
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
        isoEnabled={content.sourceClaims.iso?.enabled}
      />
    </div>
  );
}
