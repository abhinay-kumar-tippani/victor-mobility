import type { Metadata } from "next";
import Link from "next/link";
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
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent, ServiceItem } from "@/types/content";

interface PageProps {
  params: {
    slug: string;
  };
}

const serviceIcons: Record<string, React.ElementType> = {
  "employee-transportation": Users,
  "bus-shuttle-transport": Bus,
  "event-transportation": Calendar,
  "airport-transfers": Plane,
  "chauffeur-luxury": Car,
  "rent-a-car": KeyRound,
};

export async function generateStaticParams() {
  const content = indiaData as unknown as IndiaContent;
  return content.services
    .filter((service) => service.published)
    .map((service) => ({
      slug: service.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const content = indiaData as unknown as IndiaContent;
  const service = content.services.find(
    (s) => s.slug === params.slug && s.published
  );

  if (!service) {
    return {
      title: "Service Not Found | Victor Mobility",
    };
  }

  return {
    title: `${service.title} | Victor Mobility India`,
    description: service.description,
  };
}

export default function ServiceDetailPage({ params }: PageProps) {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;

  const service = content.services.find(
    (s) => s.slug === params.slug && s.published
  );

  if (!service) {
    notFound();
  }

  const otherServices = content.services.filter(
    (s) => s.published && s.slug !== service.slug
  );

  const IconComponent = serviceIcons[service.slug] || Briefcase;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header contact={content.contact} />

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Breadcrumb Navigation & Hero Header */}
        <section className="bg-brand-ink text-white py-14 sm:py-20 border-b border-brand-indigo/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6E57A0_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs font-semibold text-brand-soft-neutral/70">
                <li>
                  <Link href="/india" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/india/services" className="hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li>/</li>
                <li className="text-white font-bold" aria-current="page">
                  {service.title}
                </li>
              </ol>
            </nav>

            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/40 border border-brand-violet/40 text-xs font-bold tracking-widest uppercase text-brand-soft-neutral">
                <IconComponent className="w-3.5 h-3.5 text-brand-violet" />
                <span>Enterprise Service Profile</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {service.title}
              </h1>
              <p className="text-base sm:text-xl text-brand-soft-neutral/90 leading-relaxed font-medium">
                {service.shortDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Service Overview & Planning Guide */}
        <section className="py-16 sm:py-24 bg-brand-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Main Content Column */}
              <div className="lg:col-span-8 space-y-10">
                {/* Editorial Description */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-soft-neutral shadow-sm space-y-6">
                  <h2 className="text-2xl font-bold text-brand-ink">
                    Service Scope & Planning Overview
                  </h2>
                  <p className="text-base text-brand-ink/85 leading-relaxed">
                    {service.description}
                  </p>
                  <p className="text-sm text-brand-ink/75 leading-relaxed">
                    Victor Mobility coordinates corporate routes, scheduling, driver alignment, and dispatch
                    supervision to ensure your journey aligns with the company commitment:{" "}
                    <strong className="text-brand-indigo font-bold">&ldquo;On Time Every Time.&rdquo;</strong>
                  </p>
                </div>

                {/* Key Coordination Information Checklist */}
                {service.enquiryDetails && service.enquiryDetails.length > 0 && (
                  <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-soft-neutral shadow-sm space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-brand-ink">
                          Required Information for Enquiry
                        </h3>
                        <p className="text-xs text-brand-ink/60">
                          Having these details ready helps our team prepare an accurate plan and quotation.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {service.enquiryDetails.map((detail, idx) => (
                        <div
                          key={detail}
                          className="flex items-start gap-3 p-4 rounded-xl bg-brand-warm-white/70 border border-brand-soft-neutral"
                        >
                          <div className="w-6 h-6 rounded-full bg-brand-indigo text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            {idx + 1}
                          </div>
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo block">
                              Detail Item
                            </span>
                            <span className="text-sm font-semibold text-brand-ink">
                              {detail}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Operational Coverage Guarantee */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-soft-neutral shadow-sm space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-brand-ink">
                        Operating Hubs & Routing
                      </h3>
                      <p className="text-xs text-brand-ink/60">
                        Operational coverage across primary corporate hubs
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-brand-ink/80 leading-relaxed">
                    This service is coordinated actively across Victor Mobility&apos;s established operating cities:{" "}
                    <strong>Hyderabad</strong>, <strong>Bengaluru</strong>, and <strong>Pune</strong>, as well as their
                    immediate industrial corridors and airport routes. For custom multi-city itineraries or corporate expansions,
                    our team confirms specific vehicle allocation upon review.
                  </p>
                </div>
              </div>

              {/* Sidebar Action Card */}
              <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                <div className="bg-brand-ink text-white rounded-3xl p-8 border border-brand-indigo/30 space-y-6 shadow-md">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-violet block">
                      Direct Engagement
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      Discuss This Requirement
                    </h3>
                    <p className="text-xs text-brand-soft-neutral/80 leading-relaxed">
                      Connect directly with our corporate development team to discuss route schedules,
                      vehicle preferences, and passenger capacity.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Link
                      href={`/india/contact?service=${service.slug}`}
                      className="w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider bg-brand-indigo hover:bg-brand-blue text-white py-3.5 px-4 rounded-xl text-center transition-colors shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Prepare WhatsApp Enquiry</span>
                    </Link>

                    <a
                      href={content.contact.phoneHref}
                      className="w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white py-3.5 px-4 rounded-xl text-center transition-colors border border-white/20"
                    >
                      <Phone className="w-4 h-4 text-brand-soft-neutral" />
                      <span>Call {content.contact.phoneDisplay}</span>
                    </a>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-brand-soft-neutral/70">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-brand-violet shrink-0" />
                      <span>Direct discussion with Business Partner</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-violet shrink-0" />
                      <span>No automated spam or premature bookings</span>
                    </div>
                  </div>
                </div>

                {/* Back to All Services */}
                <div className="bg-white rounded-2xl p-6 border border-brand-soft-neutral">
                  <Link
                    href="/india/services"
                    className="inline-flex items-center gap-2 text-xs font-bold text-brand-indigo hover:text-brand-blue transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>View all 6 mobility services</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Services Navigation */}
        <section className="py-16 bg-white border-t border-brand-soft-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo block mb-1">
                  Explore More Solutions
                </span>
                <h3 className="text-2xl font-bold text-brand-ink">
                  Other Services in Victor Portfolio
                </h3>
              </div>
              <Link
                href="/india/services"
                className="text-xs font-bold text-brand-indigo hover:text-brand-blue inline-flex items-center gap-1"
              >
                <span>Full services directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {otherServices.slice(0, 5).map((other) => (
                <Link
                  key={other.slug}
                  href={`/india/services/${other.slug}`}
                  className="p-5 rounded-2xl bg-brand-warm-white hover:bg-white border border-brand-soft-neutral hover:border-brand-indigo/30 transition-all duration-150 group flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-sm font-bold text-brand-ink group-hover:text-brand-indigo transition-colors mb-1.5">
                      {other.title}
                    </h4>
                    <p className="text-xs text-brand-ink/70 line-clamp-2">
                      {other.shortDescription}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-brand-soft-neutral/60 flex items-center justify-between text-[11px] font-bold text-brand-indigo">
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
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
