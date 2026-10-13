"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Bus,
  Calendar,
  Plane,
  Sparkles,
  Key,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Layers,
  LayoutGrid,
} from "lucide-react";
import type { ServiceItem } from "@/types/content";
import { selectEnquiryOption } from "@/lib/enquiryEvents";

interface ServicesSectionProps {
  services: ServiceItem[];
}

interface MobilityVertical {
  id: string;
  category: string;
  headline: string;
  description: string;
  targetAudience: string;
  operationalHighlights: string[];
  vehicleTypes: string[];
  services: {
    slug: string;
    title: string;
    icon: typeof Users;
    shortDescription: string;
  }[];
}

const MOBILITY_VERTICALS: MobilityVertical[] = [
  {
    id: "workforce",
    category: "Daily Enterprise Commute",
    headline: "Workforce Transit & Campus Shuttles",
    description:
      "Engineered for technology parks, corporate headquarters, and multi-shift industrial facilities requiring punctual attendance and monitored route safety.",
    targetAudience: "HR, Facilities & Administration Teams",
    operationalHighlights: [
      "Shift roster & nodal route alignment",
      "AIS-140 GPS tracking & telematics",
      "Dedicated route supervisors & e-logs",
      "Late-night escort & female commuter safety",
    ],
    vehicleTypes: ["22 & 44-Seater Coaches", "Executive MPVs", "Sedans"],
    services: [
      {
        slug: "employee-transportation",
        title: "Employee Transportation",
        icon: Users,
        shortDescription: "Daily employee travel, nodal pickups, and multi-shift rosters.",
      },
      {
        slug: "bus-shuttle-transport",
        title: "Bus & Shuttle Transport",
        icon: Bus,
        shortDescription: "High-capacity campus loops and fixed-corridor transit.",
      },
    ],
  },
  {
    id: "executive",
    category: "VIP & Airport Mobility",
    headline: "Executive Chauffeur & Terminal Protocol",
    description:
      "Discreet, premium transportation for senior leadership, board members, and visiting client delegations requiring immaculate vehicles and terminal coordination.",
    targetAudience: "CXOs, Board Members & Visiting Delegations",
    operationalHighlights: [
      "Real-time flight radar tracking",
      "Curbside meet-and-greet reception",
      "Police-verified, English-speaking chauffeurs",
      "Dual-zone climate & pristine leather cabins",
    ],
    vehicleTypes: ["Executive Saloons", "Luxury Sedans", "Premium MPVs"],
    services: [
      {
        slug: "airport-transfers",
        title: "Airport Transfers",
        icon: Plane,
        shortDescription: "Terminal arrivals and departures with live flight tracking.",
      },
      {
        slug: "chauffeur-luxury",
        title: "Chauffeur & Luxury Travel",
        icon: Sparkles,
        shortDescription: "Executive chauffeur journeys for senior leadership.",
      },
    ],
  },
  {
    id: "events-hire",
    category: "Logistics & Fleet Leases",
    headline: "Event Convoys & On-Demand Fleet Hire",
    description:
      "Coordinated motorcade operations for conferences, summits, and weddings, alongside short and long-term corporate retainers with itemized billing.",
    targetAudience: "Event Organizers & Corporate Procurement",
    operationalHighlights: [
      "Synchronized multi-vehicle convoys",
      "Dedicated on-ground fleet marshals",
      "Flexible hourly & monthly retainers",
      "Transparent GST-compliant e-invoicing",
    ],
    vehicleTypes: ["Toyota Innova Crysta", "Force Urbania", "Luxury Fleet"],
    services: [
      {
        slug: "event-transportation",
        title: "Event Transportation",
        icon: Calendar,
        shortDescription: "Multi-vehicle guest logistics for summits and weddings.",
      },
      {
        slug: "rent-a-car",
        title: "Rent-A-Car",
        icon: Key,
        shortDescription: "Corporate fleet rentals and flexible travel retainers.",
      },
    ],
  },
];

export default function ServicesSection({ services }: ServicesSectionProps) {
  const [viewMode, setViewMode] = useState<"verticals" | "grid">("verticals");

  return (
    <section
      id="services"
      tabIndex={-1}
      className="py-14 sm:py-20 bg-brand-warm-white border-b border-brand-soft-neutral focus:outline-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with View Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
              Operational Solutions
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-2">
              Enterprise Mobility Architecture
            </h2>
            <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
              Beyond standard cab bookings—we deliver disciplined, SLA-governed transportation
              tailored to corporate operations across 10 national hubs.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* View Mode Toggle Buttons */}
            <div className="inline-flex items-center p-1 bg-white rounded-xl border border-brand-soft-neutral shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode("verticals")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "verticals"
                    ? "bg-brand-indigo text-white shadow-2xs"
                    : "text-brand-ink/70 hover:text-brand-ink hover:bg-brand-warm-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>By Operations</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "grid"
                    ? "bg-brand-indigo text-white shadow-2xs"
                    : "text-brand-ink/70 hover:text-brand-ink hover:bg-brand-warm-white"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>All 6 Services</span>
              </button>
            </div>

            <Link
              href="/india/services"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-indigo hover:text-brand-blue transition-colors focus:outline-none focus:underline"
            >
              <span>Full Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* View 1: 3 Strategic Enterprise Verticals (Default, Differentiated from Hero) */}
        {viewMode === "verticals" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {MOBILITY_VERTICALS.map((vertical, index) => (
              <div
                key={vertical.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-brand-soft-neutral shadow-xs hover:shadow-md hover:border-brand-indigo/30 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Category Pill & Index */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-warm-white border border-brand-soft-neutral text-brand-blue">
                      {vertical.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-brand-ink/40">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-brand-ink mb-2">
                    {vertical.headline}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-ink/70 leading-relaxed mb-4">
                    {vertical.description}
                  </p>

                  {/* Target Audience Pill */}
                  <div className="mb-5 pb-4 border-b border-brand-soft-neutral/70">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-ink/50 block mb-1">
                      Designed For
                    </span>
                    <span className="text-xs font-semibold text-brand-indigo">
                      {vertical.targetAudience}
                    </span>
                  </div>

                  {/* Operational Highlights */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-ink/50 block mb-1.5">
                      Operational Standards
                    </span>
                    {vertical.operationalHighlights.map((highlight) => (
                      <div key={highlight} className="flex items-start gap-2 text-xs text-brand-ink/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Deployed Vehicle Types */}
                  <div className="mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-ink/50 block mb-2">
                      Vehicles Deployed
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {vertical.vehicleTypes.map((v) => (
                        <span
                          key={v}
                          className="px-2.5 py-0.5 rounded-md bg-brand-warm-white border border-brand-soft-neutral text-[11px] font-medium text-brand-ink/85"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sub-Services Quick Launchers */}
                <div className="pt-4 border-t border-brand-soft-neutral space-y-2.5 mt-auto">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-ink/50 block">
                    Associated Service Modules:
                  </span>
                  {vertical.services.map((sub) => {
                    const SubIcon = sub.icon;
                    return (
                      <div
                        key={sub.slug}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-brand-warm-white hover:bg-brand-indigo/5 border border-brand-soft-neutral/70 transition-colors group"
                      >
                        <Link
                          href={`/india/services/${sub.slug}`}
                          className="flex items-center gap-2.5 min-w-0"
                        >
                          <div className="w-7 h-7 rounded-lg bg-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo shrink-0">
                            <SubIcon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-bold text-brand-ink group-hover:text-brand-indigo transition-colors truncate">
                            {sub.title}
                          </span>
                        </Link>

                        <button
                          type="button"
                          onClick={() => selectEnquiryOption({ service: sub.title })}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-indigo hover:text-brand-blue px-2 py-1 rounded bg-white border border-brand-soft-neutral shrink-0 transition-colors"
                          title={`Discuss ${sub.title}`}
                        >
                          <MessageSquare className="w-3 h-3 text-brand-blue" />
                          <span>Discuss</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* View 2: Clean 6-Service Index Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services
              .filter((s) => s.published)
              .map((service, index) => (
                <div
                  key={service.slug}
                  className="rounded-2xl bg-white p-6 border border-brand-soft-neutral hover:border-brand-indigo/40 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-brand-blue">
                        {service.badge || "Mobility Service"}
                      </span>
                      <span className="text-xs font-mono text-brand-ink/40">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-brand-ink mb-1.5">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-brand-ink/70 leading-relaxed mb-5">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-brand-soft-neutral/80 flex items-center justify-between gap-2 mt-auto">
                    <Link
                      href={`/india/services/${service.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-indigo hover:text-brand-blue"
                    >
                      <span>Specifications</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => selectEnquiryOption({ service: service.title })}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand-ink/80 hover:text-brand-indigo bg-brand-warm-white px-2.5 py-1 rounded-lg border border-brand-soft-neutral hover:border-brand-indigo/30 transition-colors"
                    >
                      <MessageSquare className="w-3 h-3 text-brand-blue" />
                      <span>Enquire</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}

