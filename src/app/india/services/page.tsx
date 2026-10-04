import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Users,
  Bus,
  Calendar,
  Plane,
  Car,
  KeyRound,
  CheckCircle2,
  Phone,
  MessageSquare,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";

export const metadata: Metadata = {
  title: "Services | Victor Mobility - Corporate & Group Transport Solutions",
  description:
    "Explore Victor Mobility's complete transport portfolio: employee commuting, bus shuttles, airport transfers, event transport, luxury chauffeur, and rental arrangements across Hyderabad, Bengaluru, and Pune.",
};

const serviceIcons: Record<string, React.ElementType> = {
  "employee-transportation": Users,
  "bus-shuttle-transport": Bus,
  "event-transportation": Calendar,
  "airport-transfers": Plane,
  "chauffeur-luxury": Car,
  "rent-a-car": KeyRound,
};

export default function ServicesPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const publishedServices = content.services.filter((s) => s.published);

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
                <Briefcase className="w-3.5 h-3.5 text-brand-violet" />
                Mobility Services
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Corporate & Group Transport Solutions
              </h1>
              <p className="text-base sm:text-lg text-brand-soft-neutral/85 leading-relaxed">
                From daily employee shift shuttles to executive airport transfers and large-scale event logistics,
                Victor Mobility provides dependable vehicle arrangements across Hyderabad, Bengaluru, and Pune.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 sm:py-24 bg-brand-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedServices.map((service, index) => {
                const IconComponent = serviceIcons[service.slug] || Briefcase;
                return (
                  <article
                    key={service.slug}
                    className="flex flex-col bg-white rounded-2xl p-7 border border-brand-soft-neutral shadow-sm hover:shadow-md hover:border-brand-indigo/30 transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo group-hover:bg-brand-indigo group-hover:text-white transition-colors duration-200">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold text-brand-ink/50 tracking-wider">
                        0{index + 1}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-brand-ink group-hover:text-brand-indigo transition-colors mb-2">
                      {service.title}
                    </h2>

                    <p className="text-sm font-medium text-brand-indigo/90 mb-3">
                      {service.shortDescription}
                    </p>

                    <p className="text-xs text-brand-ink/70 leading-relaxed mb-6 flex-1">
                      {service.description}
                    </p>

                    {/* Key Enquiry Scope Details */}
                    {service.enquiryDetails && service.enquiryDetails.length > 0 && (
                      <div className="border-t border-brand-soft-neutral/80 pt-4 mb-6">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-ink/60 block mb-2">
                          Key Coordination Scope
                        </span>
                        <ul className="space-y-1.5">
                          {service.enquiryDetails.map((detail) => (
                            <li
                              key={detail}
                              className="flex items-start gap-2 text-xs text-brand-ink/80"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-violet shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Action Links */}
                    <div className="pt-4 border-t border-brand-soft-neutral flex items-center justify-between gap-3 mt-auto">
                      <Link
                        href={`/india/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-indigo hover:text-brand-blue transition-colors focus:outline-none focus:underline"
                      >
                        <span>Explore details</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>

                      <Link
                        href={`/india/contact?service=${service.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-ink/80 hover:text-brand-indigo bg-brand-warm-white px-3 py-1.5 rounded-lg border border-brand-soft-neutral hover:border-brand-indigo/30 transition-colors"
                      >
                        <MessageSquare className="w-3 h-3 text-brand-blue" />
                        <span>Enquire</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Operating Coverage Banner */}
        <section className="py-14 bg-white border-t border-brand-soft-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-brand-ink text-white rounded-3xl p-8 sm:p-12 border border-brand-indigo/30 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-violet block">
                  Authorised India Coverage
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Operating in Hyderabad, Bengaluru & Pune
                </h3>
                <p className="text-sm text-brand-soft-neutral/85 leading-relaxed">
                  Victor Mobility coordinates scheduled transportation across our primary operating cities.
                  Tell our team your route corridors, shift timings, or travel schedules for custom planning.
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
