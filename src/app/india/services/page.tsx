import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
import CorridorMatrix from "@/components/home/CorridorMatrix";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";

export const metadata: Metadata = {
  title: "Services | Victor Mobility - Corporate & Group Transport Solutions",
  description:
    "Explore Victor Mobility's complete transport portfolio: employee commuting, bus shuttles, airport transfers, event transport, luxury chauffeur, and rental arrangements across 10 operational hubs pan-India.",
};

const serviceIcons: Record<string, React.ElementType> = {
  "employee-transportation": Users,
  "bus-shuttle-transport": Bus,
  "event-transportation": Calendar,
  "airport-transfers": Plane,
  "chauffeur-luxury": Car,
  "rent-a-car": KeyRound,
};

interface ServiceMeta {
  imageSrc: string;
  imageAlt: string;
}

const serviceMeta: Record<string, ServiceMeta> = {
  "employee-transportation": {
    imageSrc: "/images/india/services/service-employee-transport.webp",
    imageAlt: "Corporate employee commuter coach and shuttle fleet outside innovation campus",
  },
  "bus-shuttle-transport": {
    imageSrc: "/images/india/services/service-bus-shuttle.webp",
    imageAlt: "Executive corporate commuter bus outside commercial tech park",
  },
  "event-transportation": {
    imageSrc: "/images/india/services/service-event-transport.webp",
    imageAlt: "Luxury executive convoy for corporate events and conferences",
  },
  "airport-transfers": {
    imageSrc: "/images/india/services/service-airport-transfers.webp",
    imageAlt: "VIP executive airport chauffeur greeting passenger at private terminal",
  },
  "chauffeur-luxury": {
    imageSrc: "/images/india/services/service-chauffeur-luxury.webp",
    imageAlt: "Chauffeur standing by luxury executive saloon outside corporate headquarters at night",
  },
  "rent-a-car": {
    imageSrc: "/images/india/services/service-rent-a-car.webp",
    imageAlt: "Premium executive car rental fleet parked outside modern business district",
  },
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
                Victor Mobility provides dependable vehicle arrangements across 10 operational hubs pan-India.
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
                const meta = serviceMeta[service.slug] || {
                  imageSrc: "/images/india/services/service-employee-transport.webp",
                  imageAlt: service.title,
                };

                return (
                  <article
                    key={service.slug}
                    data-testid={`service-card-${service.slug}`}
                    className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#15162F] p-7 sm:p-8 shadow-[0_10px_30px_-5px_rgba(21,22,47,0.15)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:border-white/25 overflow-hidden min-h-[420px]"
                  >
                    {/* Direct Background Image Layer */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                      <Image
                        src={meta.imageSrc}
                        alt={meta.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* High-legibility brand ink gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#15162F]/95 via-[#15162F]/85 to-[#15162F]/60" />
                    </div>

                    {/* Card Content - Z-index 10 above image layer */}
                    <div className="relative z-10 flex flex-col flex-1">
                      <div className="flex items-center justify-between gap-4 mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all duration-300 group-hover:bg-white/25 group-hover:scale-105">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xs font-mono font-bold text-white/70">
                          0{index + 1}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                        {service.title}
                      </h2>

                      <p className="text-sm font-semibold text-brand-soft-neutral/90 mb-3">
                        {service.shortDescription}
                      </p>

                      <p className="text-xs text-white/80 leading-relaxed mb-6 flex-1">
                        {service.description}
                      </p>

                      {/* Key Enquiry Scope Details */}
                      {service.enquiryDetails && service.enquiryDetails.length > 0 && (
                        <div className="border-t border-white/15 pt-4 mb-6">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-white/70 block mb-2">
                            Key Coordination Scope
                          </span>
                          <ul className="space-y-1.5">
                            {service.enquiryDetails.map((detail) => (
                              <li
                                key={detail}
                                className="flex items-start gap-2 text-xs text-white/90"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Action Links */}
                    <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between gap-3 mt-auto">
                      <Link
                        href={`/india/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-brand-soft-neutral transition-colors focus:outline-none focus:underline"
                      >
                        <span>Explore details</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>

                      <Link
                        href={`/india/contact?service=${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold bg-white text-brand-ink hover:bg-brand-indigo hover:text-white px-3.5 py-1.5 rounded-xl shadow-sm transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-brand-blue" />
                        <span>Enquire</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tech Park & Strategic Corridors */}
        <CorridorMatrix region="india" />

        {/* Route Estimator & Chauffeur Academy Feature Banner */}
        <section className="py-12 bg-brand-soft-neutral/30 border-t border-brand-soft-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-brand-soft-neutral shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block mb-2">
                    Corporate Quotation
                  </span>
                  <h3 className="text-xl font-bold text-brand-indigo mb-2">
                    Corporate Travel Quotations
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-slate leading-relaxed mb-6">
                    Discuss employee route corridors, executive airport connections, or event schedules. Our operations team provides an itemized proposal based on your requirements.
                  </p>
                </div>
                <Link
                  href="/india/contact"
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue hover:text-brand-blue-dark transition-colors"
                >
                  <span>Request Corporate Quotation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-brand-soft-neutral shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block mb-2">
                    Operational Standards
                  </span>
                  <h3 className="text-xl font-bold text-brand-indigo mb-2">
                    Verified Chauffeur & Safety Rigour
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-slate leading-relaxed mb-6">
                    Discover our 100% background-checked drivers, 24/7 telematics monitoring, and transparent corporate governance backing &ldquo;On Time Every Time.&rdquo;
                  </p>
                </div>
                <Link
                  href="/india/about"
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue hover:text-brand-blue-dark transition-colors"
                >
                  <span>Read Safety &amp; Governance Standards</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
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
                  Operating across 10 Operational Hubs Pan-India
                </h3>
                <p className="text-sm text-brand-soft-neutral/85 leading-relaxed">
                  Victor Mobility coordinates scheduled transportation across Hyderabad, Bengaluru, Chennai, Pune, Mumbai, Delhi, Noida, Gurgaon, Ahmedabad, and Kolkata.
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
