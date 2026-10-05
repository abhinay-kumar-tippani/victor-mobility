import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
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
  ShieldCheck,
  Clock,
  MapPin,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import uaeData from "@/content/uae.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";

interface PageProps {
  params: {
    slug: string;
  };
}

const serviceIcons: Record<string, React.ElementType> = {
  "chauffeur-luxury": Car,
  "airport-transfers": Plane,
  "event-transportation": Calendar,
  "employee-transportation": Users,
  "tourism-travel": Sparkles,
  "rent-a-car": KeyRound,
};

export async function generateStaticParams() {
  const content = uaeData as unknown as IndiaContent;
  return content.services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const content = uaeData as unknown as IndiaContent;
  const service = content.services.find((s) => s.slug === params.slug);

  if (!service) {
    return {
      title: "Service Not Found | Victor Mobility UAE",
    };
  }

  return {
    title: `${service.title} in Dubai & Abu Dhabi | Victor Mobility UAE`,
    description: service.shortDescription,
  };
}

export default function UaeServiceDetailPage({ params }: PageProps) {
  const content = uaeData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const service = content.services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const Icon = serviceIcons[service.slug] || Car;
  const otherServices = content.services.filter((s) => s.slug !== service.slug);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header contact={content.contact} />

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Breadcrumb Bar */}
        <div className="bg-brand-warm-white border-b border-brand-soft-neutral py-3.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/uae/services"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-ink/70 hover:text-brand-indigo transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all UAE services</span>
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-brand-ink text-white py-16 sm:py-24 border-b border-brand-indigo/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6E57A0_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-indigo/40 border border-brand-violet/40 text-xs font-bold tracking-widest uppercase text-brand-soft-neutral">
                  <Icon className="w-3.5 h-3.5 text-brand-violet" />
                  <span>{service.badge || "UAE Service"}</span>
                </span>
                <span className="text-xs text-white/60 font-medium">Dubai · Abu Dhabi · Sharjah</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-brand-soft-neutral/85 leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        </section>

        {/* Service Details & Specifications */}
        <section className="py-16 sm:py-20 bg-brand-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Specifications & Operating Standards (col-span-8) */}
              <div className="lg:col-span-8 space-y-8">
                {/* Key Inclusions Card */}
                <div className="bg-white rounded-3xl p-8 border border-brand-soft-neutral shadow-xs space-y-6">
                  <h2 className="text-xl font-bold text-brand-ink">
                    Included Operational Standards
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-warm-white border border-brand-soft-neutral/70">
                      <Clock className="w-5 h-5 text-brand-indigo shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-xs font-bold text-brand-ink">Flight Radar & Punctuality</h3>
                        <p className="text-xs text-brand-ink/70 mt-1">Live tracking at DXB, DWC, and AUH terminals with guaranteed curbside standby.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-warm-white border border-brand-soft-neutral/70">
                      <ShieldCheck className="w-5 h-5 text-brand-indigo shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-xs font-bold text-brand-ink">Vetted Chauffeurs</h3>
                        <p className="text-xs text-brand-ink/70 mt-1">Uniformed, multilingual professionals trained in executive protocol and confidentiality.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-warm-white border border-brand-soft-neutral/70">
                      <Sparkles className="w-5 h-5 text-brand-indigo shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-xs font-bold text-brand-ink">First Class Cabin Comfort</h3>
                        <p className="text-xs text-brand-ink/70 mt-1">Pristine leather interiors, multi-zone climate control, bottled water, and device charging.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-warm-white border border-brand-soft-neutral/70">
                      <MapPin className="w-5 h-5 text-brand-indigo shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-xs font-bold text-brand-ink">Inter-Emirate Transit</h3>
                        <p className="text-xs text-brand-ink/70 mt-1">Seamless highway transfers between Dubai, Abu Dhabi, Sharjah, and Northern Emirates.</p>
                      </div>
                    </div>
                  </div>

                  {service.enquiryDetails && (
                    <div className="pt-4 border-t border-brand-soft-neutral">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-brand-ink/60 mb-3">
                        Required Itinerary Information:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {service.enquiryDetails.map((detail) => (
                          <span
                            key={detail}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-warm-white border border-brand-soft-neutral text-xs font-semibold text-brand-ink"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue" />
                            <span>{detail}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Other UAE Services */}
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-brand-ink">
                    Explore Other UAE Specialisations
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {otherServices.slice(0, 4).map((other) => (
                      <Link
                        key={other.slug}
                        href={`/uae/services/${other.slug}`}
                        className="bg-white p-5 rounded-2xl border border-brand-soft-neutral hover:border-brand-indigo transition-colors flex items-center justify-between group shadow-2xs"
                      >
                        <div>
                          <h3 className="text-sm font-bold text-brand-ink group-hover:text-brand-indigo transition-colors">
                            {other.title}
                          </h3>
                          <p className="text-xs text-brand-ink/60 mt-0.5 line-clamp-1">
                            {other.shortDescription}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-brand-ink/40 group-hover:text-brand-indigo transition-colors shrink-0 ml-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Reservation Sidebar (col-span-4) */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-3xl p-7 border border-brand-soft-neutral shadow-sm space-y-6 sticky top-28">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block mb-1">
                      Direct Reservation
                    </span>
                    <h3 className="text-xl font-bold text-brand-ink">
                      Reserve this Service
                    </h3>
                    <p className="text-xs text-brand-ink/70 mt-1">
                      Connect directly with our Dubai operations desk for vehicle availability and prompt rate quotation.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Link
                      href={`/uae/contact?service=${encodeURIComponent(service.title)}`}
                      className="w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider bg-brand-indigo hover:bg-brand-blue text-white py-3.5 px-4 rounded-xl transition-colors shadow-xs"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Prepare WhatsApp Enquiry</span>
                    </Link>

                    <a
                      href={content.contact.phoneHref}
                      className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-brand-ink hover:text-brand-indigo bg-brand-warm-white py-3 px-4 rounded-xl border border-brand-soft-neutral hover:bg-brand-soft-neutral/50 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-brand-blue" />
                      <span>Call {content.contact.phoneDisplay}</span>
                    </a>
                  </div>

                  <div className="pt-4 border-t border-brand-soft-neutral space-y-2 text-[11px] text-brand-ink/60">
                    <p>• Standard & custom hourly disposal available</p>
                    <p>• Commercial pricing quoted in AED with zero hidden fees</p>
                    <p>• 24/7 flight delay monitoring included</p>
                  </div>
                </div>
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
