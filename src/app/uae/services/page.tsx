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
  Sparkles,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CorridorMatrix from "@/components/home/CorridorMatrix";
import uaeData from "@/content/uae.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";

export const metadata: Metadata = {
  title: "UAE Services | Victor Mobility UAE - Luxury Limousine & Airport VIP Transfers",
  description:
    "Explore Victor Mobility UAE's executive services: First class luxury limousine, DXB airport VIP transfers, corporate event logistics, workforce transit, and private excursions across Dubai and Abu Dhabi.",
};

const serviceIcons: Record<string, React.ElementType> = {
  "chauffeur-luxury": Car,
  "airport-transfers": Plane,
  "event-transportation": Calendar,
  "employee-transportation": Users,
  "tourism-travel": Sparkles,
  "rent-a-car": KeyRound,
};

export default function UaeServicesPage() {
  const content = uaeData as unknown as IndiaContent;
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
                UAE Mobility Services
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                First Class Limousine & Corporate Mobility
              </h1>
              <p className="text-base sm:text-lg text-brand-soft-neutral/85 leading-relaxed">
                From VIP airport terminal meet-and-assist to multi-coach trade delegation logistics and hourly executive standby across Dubai and Abu Dhabi.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 sm:py-24 bg-brand-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedServices.map((service) => {
                const Icon = serviceIcons[service.slug] || Car;

                return (
                  <article
                    key={service.slug}
                    className="bg-white rounded-3xl p-8 border border-brand-soft-neutral shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo group-hover:bg-brand-indigo group-hover:text-white transition-colors duration-200">
                          <Icon className="w-6 h-6" />
                        </div>
                        {service.badge && (
                          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue bg-brand-warm-white px-3 py-1 rounded-full border border-brand-soft-neutral">
                            {service.badge}
                          </span>
                        )}
                      </div>

                      <div>
                        <h2 className="text-xl font-bold text-brand-ink group-hover:text-brand-indigo transition-colors mb-2">
                          {service.title}
                        </h2>
                        <p className="text-sm text-brand-ink/75 leading-relaxed">
                          {service.shortDescription}
                        </p>
                      </div>

                      {service.enquiryDetails && (
                        <div className="pt-4 border-t border-brand-soft-neutral space-y-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-ink/60 block">
                            Key Specifications:
                          </span>
                          <ul className="space-y-1">
                            {service.enquiryDetails.map((detail) => (
                              <li
                                key={detail}
                                className="text-xs text-brand-ink/80 flex items-center gap-2"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-brand-violet shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="pt-6 mt-6 border-t border-brand-soft-neutral flex items-center justify-between">
                      <Link
                        href={`/uae/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-indigo hover:text-brand-blue transition-colors"
                      >
                        <span>Explore details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <Link
                        href={`/uae/contact?service=${encodeURIComponent(service.title)}`}
                        className="text-xs font-semibold text-brand-ink/70 hover:text-brand-indigo"
                      >
                        Enquire →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Strategic UAE Commercial Corridors */}
        <CorridorMatrix region="uae" />

        {/* CTA Bar */}
        <section className="py-14 bg-white border-t border-brand-soft-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-brand-ink text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2 max-w-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-violet block">
                  UAE Reservation Desk
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold">
                  Require a custom itinerary in Dubai or Abu Dhabi?
                </h3>
                <p className="text-sm text-white/80">
                  Connect with our Dubai reservation desk for immediate quotation and confirmed limousine dispatch.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Link
                  href="/uae/contact"
                  className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider bg-brand-indigo hover:bg-brand-blue text-white px-6 py-3.5 rounded-xl transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Discuss UAE Itinerary</span>
                </Link>
                <a
                  href={content.contact.phoneHref}
                  className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-xl transition-colors border border-white/20"
                >
                  <Phone className="w-4 h-4" />
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
