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
    "Discover Victor Mobility Pvt. Ltd.: our company story, leadership, operating discipline, and verified network across Hyderabad, Bengaluru, and Pune. On Time Every Time.",
};

export default function AboutPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const publishedOffices = content.offices.filter((o) => o.published);
  const isoClaim = content.sourceClaims.iso;
  const story = content.about.story;

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

        {/* Founding Story & Accountable Leadership */}
        <section className="py-16 sm:py-20 bg-brand-warm-white border-b border-brand-soft-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Founding Vision Narrative */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
                    Our Origin & Purpose
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight mb-4">
                    Disciplined transport management for India&apos;s commercial hubs
                  </h2>
                  <p className="text-sm sm:text-base text-brand-ink/80 leading-relaxed">
                    {story?.foundingVision || content.about.description}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-brand-soft-neutral space-y-3">
                  <h3 className="text-base font-bold text-brand-ink flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-brand-indigo" />
                    <span>The Victor Operating Promise</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed">
                    We recognize that transport failure disrupts business reputations, employee shifts, and celebratory
                    milestones. That is why our operations desk plans verified travel buffers, inspects vehicles prior to dispatch,
                    and provides direct human communication from enquiry to destination.
                  </p>
                </div>
              </div>

              {/* Right Column: Accountable Leadership Card */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-3xl p-8 border border-brand-soft-neutral shadow-sm space-y-6">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-indigo block mb-1">
                      Operations & Commercial Leadership
                    </span>
                    <h3 className="text-xl font-bold text-brand-ink">
                      {story?.leadershipName || content.contact.name}
                    </h3>
                    <p className="text-xs text-brand-ink/60 font-semibold">
                      {story?.leadershipRole || content.contact.role}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed">
                    Responsible for corporate client partnerships, service agreements, and operational dispatch standards
                    across our Hyderabad, Bengaluru, and Pune corridors.
                  </p>

                  <div className="space-y-3 pt-3 border-t border-brand-soft-neutral">
                    <a
                      href={content.contact.phoneHref}
                      className="flex items-center gap-3 p-3 rounded-xl bg-brand-warm-white hover:bg-brand-soft-neutral/60 transition-colors group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo group-hover:text-brand-blue">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-brand-ink/50 block">Direct Calling Line</span>
                        <span className="text-sm font-bold text-brand-ink">{content.contact.phoneDisplay}</span>
                      </div>
                    </a>

                    <a
                      href={`${content.contact.whatsappBaseUrl}?text=Hello%20Mujeeb,%20I%20would%20like%20to%20discuss%20a%20transport%20requirement%20with%20Victor%20Mobility.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100/70 transition-colors group border border-emerald-200"
                    >
                      <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-emerald-800 block">Direct WhatsApp Desk</span>
                        <span className="text-sm font-bold text-emerald-950">{content.contact.whatsappDisplay}</span>
                      </div>
                    </a>
                  </div>

                  <p className="text-[11px] text-brand-ink/50 italic">
                    Available during business hours for corporate agreements and urgent travel arrangements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Four Operational Commitments */}
        <section className="py-16 sm:py-20 bg-white border-b border-brand-soft-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
                Operational Discipline
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight mb-3">
                Four commitments we hold ourselves accountable to
              </h2>
              <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
                Rather than generic declarations, our standard is built on repeatable, verifiable operating procedures.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {story?.commitments.map((item, idx) => (
                <div
                  key={item.title}
                  className="p-7 sm:p-8 rounded-3xl bg-brand-warm-white border border-brand-soft-neutral flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo font-bold text-xs">
                        0{idx + 1}
                      </div>
                      <h3 className="text-lg font-bold text-brand-ink">{item.title}</h3>
                    </div>
                    <p className="text-sm text-brand-ink/75 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Optional ISO claim conditionally rendered strictly if enabled */}
            {isoClaim?.enabled && (
              <div className="mt-8 p-6 rounded-2xl bg-brand-warm-white border border-brand-soft-neutral flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-indigo/10 text-brand-indigo flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-ink">{isoClaim.text}</h3>
                  <p className="text-xs text-brand-ink/70">
                    Quality management systems adhering to international standards.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Three Managed Customer Dimensions */}
        <section className="py-16 sm:py-20 bg-brand-warm-white border-b border-brand-soft-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs uppercase tracking-widest font-bold text-brand-indigo block mb-2">
                Portfolio Breadth
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight mb-3">
                Three distinct customer journeys. One standard.
              </h2>
              <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
                We cater to diverse travel needs with dedicated fleet categories and tailored coordination workflows.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {story?.audiences.map((aud, idx) => {
                const serviceLinks = [
                  "/india/services/chauffeur-luxury",
                  "/india/services/event-transportation",
                  "/india/services/employee-transportation",
                ];
                return (
                  <div
                    key={aud.title}
                    className="bg-white rounded-3xl p-7 sm:p-8 border border-brand-soft-neutral shadow-sm flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block">
                        {aud.tagline}
                      </span>
                      <h3 className="text-xl font-bold text-brand-ink">{aud.title}</h3>
                      <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed">
                        {aud.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-brand-soft-neutral">
                      <Link
                        href={serviceLinks[idx] || "/india/services"}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-indigo hover:text-brand-blue transition-colors"
                      >
                        <span>Learn about this service</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Established Operating Offices */}
        <section id="network" className="py-16 sm:py-24 bg-white border-b border-brand-soft-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo block">
                Office Locations
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-ink">
                Established India Operating Network
              </h2>
              <p className="text-base text-brand-ink/75 leading-relaxed">
                Victor Mobility maintains authorized physical presence across India&apos;s leading commercial and technology
                centers. Contact our branch teams directly for local allocations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {publishedOffices.map((office) => (
                <div
                  key={office.city}
                  className="bg-brand-warm-white rounded-3xl p-8 border border-brand-soft-neutral flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue bg-white px-3 py-1 rounded-full border border-brand-soft-neutral">
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
          <section className="py-16 sm:py-20 bg-brand-warm-white border-b border-brand-soft-neutral">
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
                    className="bg-white rounded-2xl p-6 sm:p-7 border border-brand-soft-neutral shadow-sm space-y-2"
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
        <section className="py-14 bg-white">
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
