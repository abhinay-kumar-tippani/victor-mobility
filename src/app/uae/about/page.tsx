import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  Quote,
  CheckCircle2,
  MessageSquare,
  Phone,
  Car,
  Bus,
  HelpCircle,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import uaeData from "@/content/uae.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";

export const metadata: Metadata = {
  title: "About Us | Victor Mobility UAE - Dubai & Abu Dhabi Luxury Limousine",
  description:
    "Discover Victor Mobility UAE: our founder Jahangir, Dubai head office near DXB, 2,000+ car & 500+ bus capabilities, and operating standards across the Emirates. On Time Every Time.",
};

export default function UaeAboutPage() {
  const content = uaeData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const founder = content.founder;
  const publishedOffices = content.offices.filter((o) => o.published);

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
                Victor Mobility UAE
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                International Mobility. Middle East Heritage.
              </h1>
              <p className="text-base sm:text-lg text-brand-soft-neutral/85 leading-relaxed">
                Expanding from our established India foundation into Dubai and Abu Dhabi, Victor Mobility delivers its signature blend of luxury, precision, and passenger accountability to clients across the United Arab Emirates.
              </p>
            </div>
          </div>
        </section>

        {/* Meet our Founder & Visionary */}
        {founder && (
          <section className="py-16 sm:py-24 bg-brand-warm-white border-b border-brand-soft-neutral">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-3xl overflow-hidden border border-brand-soft-neutral shadow-sm grid grid-cols-1 lg:grid-cols-12 items-center">
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
                      <span className="font-semibold">Established 2010 · International Reach</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-brand-indigo" />
                      <span className="font-semibold">2,000+ Car & 500+ Bus Fleet Capability</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* UAE Operational Scale & Fleet Capabilities */}
        <section className="py-16 sm:py-24 bg-white border-b border-brand-soft-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl">
              <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
                Operational Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-3">
                Fleet scale ready for summits, delegations, and executive roadshows.
              </h2>
              <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
                From our Dubai headquarters, Victor Mobility manages comprehensive transport infrastructure capable of meeting high-volume corporate demand.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-brand-warm-white p-8 rounded-3xl border border-brand-soft-neutral space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                  <Car className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-brand-ink">2,000+ Executive Cars</h3>
                <p className="text-xs text-brand-ink/70 leading-relaxed">
                  First Class Mercedes-Benz S-Class, BMW 7 Series, Mercedes-Maybach, and Cadillac Escalade vehicles for executive and VIP transit.
                </p>
              </div>

              <div className="bg-brand-warm-white p-8 rounded-3xl border border-brand-soft-neutral space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                  <Bus className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-brand-ink">500+ Luxury Coaches</h3>
                <p className="text-xs text-brand-ink/70 leading-relaxed">
                  22-seater and 44-seater luxury coaches serving trade summits (GITEX, ADIPEC), corporate workforce loops, and destination events.
                </p>
              </div>

              <div className="bg-brand-warm-white p-8 rounded-3xl border border-brand-soft-neutral space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-brand-soft-neutral flex items-center justify-center text-emerald-600">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-brand-ink">DXB Airport Staging</h3>
                <p className="text-xs text-brand-ink/70 leading-relaxed">
                  Strategic office and staging location at 65th Street Al Garhoud, minutes from Dubai International Airport terminals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Operating Headquarters in UAE */}
        <section id="network" className="py-16 sm:py-24 bg-brand-warm-white border-b border-brand-soft-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo block">
                UAE Headquarters
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-ink">
                Dubai Operating Office
              </h2>
              <p className="text-base text-brand-ink/75 leading-relaxed">
                Connect directly with our Dubai management desk for commercial accounts, VIP itineraries, and inter-emirate contracts.
              </p>
            </div>

            <div className="max-w-2xl">
              {publishedOffices.map((office) => (
                <div
                  key={office.city}
                  className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-soft-neutral shadow-xs space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-warm-white px-3 py-1 rounded-full border border-brand-soft-neutral">
                      {office.label}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-brand-ink mb-2">{office.city}</h3>
                    <p className="text-sm text-brand-ink/80 leading-relaxed bg-brand-warm-white p-4 rounded-2xl border border-brand-soft-neutral/70">
                      {office.address}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-soft-neutral flex flex-wrap items-center gap-4">
                    <Link
                      href={`/uae/contact?city=${encodeURIComponent(office.city)}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-brand-indigo hover:bg-brand-blue text-white py-3 px-5 rounded-xl transition-colors shadow-xs"
                    >
                      <span>Enquire for {office.city}</span>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={content.contact.phoneHref}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-brand-ink hover:text-brand-indigo bg-brand-warm-white py-3 px-4 rounded-xl border border-brand-soft-neutral hover:bg-brand-soft-neutral/50 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-brand-blue" />
                      <span>{content.contact.phoneDisplay}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
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
                  Straightforward answers about our UAE services, booking procedures, and fleet operations.
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
                  UAE Reservation Desk
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Discuss Your UAE Itinerary
                </h3>
                <p className="text-sm text-brand-soft-neutral/85 leading-relaxed">
                  Speak directly with our Dubai operations desk to structure an agreement or itinerary for your organization or private travel.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
                <Link
                  href="/uae/contact"
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
        isoEnabled={false}
      />
    </div>
  );
}
