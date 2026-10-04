import type { Metadata } from "next";
import Link from "next/link";
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
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";

export const metadata: Metadata = {
  title: "About Us | Victor Mobility - Corporate Transport Partner",
  description:
    "Learn about Victor Mobility Pvt. Ltd.: our company story, corporate transport mission, operating network across Hyderabad, Bengaluru, and Pune, and commitment: On Time Every Time.",
};

export default function AboutPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const publishedOffices = content.offices.filter((o) => o.published);
  const isoClaim = content.sourceClaims.iso;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header contact={content.contact} />

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Page Header */}
        <section className="bg-brand-ink text-white py-16 sm:py-24 border-b border-brand-indigo/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6E57A0_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/40 border border-brand-violet/40 text-xs font-bold tracking-widest uppercase text-brand-soft-neutral">
                <Building2 className="w-3.5 h-3.5 text-brand-violet" />
                Company Overview
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {content.about.title}
              </h1>
              <p className="text-base sm:text-lg text-brand-soft-neutral/85 leading-relaxed">
                {content.about.description}
              </p>
            </div>
          </div>
        </section>

        {/* Core Principles & Mission */}
        <section className="py-16 sm:py-20 bg-brand-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-brand-soft-neutral shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                  <Clock className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-brand-ink">
                  On Time Every Time.
                </h2>
                <p className="text-sm text-brand-ink/75 leading-relaxed">
                  Our motto defines our operating discipline. Whether coordinating complex multi-route employee
                  shifts or single VIP airport pickups, schedule adherence is monitored continuously.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-brand-soft-neutral shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                  <Users className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-brand-ink">
                  Dedicated Coordination
                </h2>
                <p className="text-sm text-brand-ink/75 leading-relaxed">
                  We assign proactive transport coordinators who liaise with company HR, facilities, and administration
                  teams to ensure passenger comfort, route optimization, and rapid issue resolution.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-brand-soft-neutral shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                  <Shield className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-brand-ink">
                  Compliance & Safety
                </h2>
                <p className="text-sm text-brand-ink/75 leading-relaxed">
                  Driver background checks, verified commercial licenses, and routine vehicle maintenance are baseline
                  requirements across all operations in Hyderabad, Bengaluru, and Pune.
                </p>
              </div>
            </div>

            {/* Optional ISO claim conditionally rendered strictly if enabled */}
            {isoClaim?.enabled && (
              <div className="mt-8 p-6 rounded-2xl bg-white border border-brand-soft-neutral flex items-center gap-4">
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

        {/* Established Operating Offices */}
        <section id="network" className="py-16 sm:py-24 bg-white border-t border-brand-soft-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo block">
                Office Locations
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-ink">
                Established India Operating Network
              </h2>
              <p className="text-base text-brand-ink/75 leading-relaxed">
                Victor Mobility maintains operational presence in India&apos;s key corporate corridors.
                Contact our branch teams directly for local fleet allocations.
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
          <section className="py-16 sm:py-20 bg-brand-warm-white border-t border-brand-soft-neutral">
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

        {/* CTA Invitation */}
        <section className="py-14 bg-white border-t border-brand-soft-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-brand-ink text-white rounded-3xl p-8 sm:p-12 border border-brand-indigo/30 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-violet block">
                  Connect With Our Team
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Discuss Your Transport Arrangement
                </h3>
                <p className="text-sm text-brand-soft-neutral/85 leading-relaxed">
                  Speak directly with our Business Development Partner, Mujeeb Ur Rehman Mohammed,
                  to structure a mobility agreement for your organization.
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
