"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Navigation,
  MapPin,
  Clock,
  ShieldCheck,
  Building2,
  ArrowRight,
  Route,
  Car,
} from "lucide-react";

export interface CorridorHub {
  id: string;
  name: string;
  stateOrEmirate: string;
  badge: string;
  description: string;
  keyZones: string[];
  expressways: string[];
  serviceCapabilities: string[];
  airportConnectors: string;
}

interface CorridorMatrixProps {
  region: "india" | "uae";
  rfpHref?: string;
}

const indiaHubs: CorridorHub[] = [
  {
    id: "hyderabad",
    name: "Hyderabad Hub",
    stateOrEmirate: "Telangana",
    badge: "Operational Headquarters",
    description: "Core high-frequency corporate mobility network serving Hyderabad's premier IT, pharmaceutical, and financial corridors.",
    keyZones: [
      "HITEC City & Madhapur",
      "Financial District (Nanakramguda)",
      "Gachibowli Cyber Corridor",
      "Mindspace IT Park",
      "Genome Valley Biotech Cluster",
    ],
    expressways: [
      "Outer Ring Road (ORR Expressway)",
      "PVNR Elevated Expressway",
      "Gachibowli - Miyapur Corridor",
    ],
    serviceCapabilities: [
      "24/7 Multi-shift Corporate Cabs",
      "32 & 45-Seater IT Campus Shuttles",
      "VIP Board Member Terminal Transfers",
    ],
    airportConnectors: "RGIA Shamshabad via 8-lane ORR Expressway (35-45 min scheduled window)",
  },
  {
    id: "bengaluru",
    name: "Bengaluru Hub",
    stateOrEmirate: "Karnataka",
    badge: "Technology Corridor Hub",
    description: "Punctual workforce transit architecture across Silicon Valley's major tech parks and elevated arterial corridors.",
    keyZones: [
      "Electronic City (Phases 1 & 2)",
      "Whitefield (ITPB & EPIP Zone)",
      "Outer Ring Road (Bellandur - Marathahalli)",
      "Manyata Embassy Business Park",
      "Bagmane Tech Park",
    ],
    expressways: [
      "Hosur Road Elevated Expressway",
      "NICE Road Peripheral Expressway",
      "Hebbal - Airport Expressway",
    ],
    serviceCapabilities: [
      "Fixed-Route Enterprise Employee Shuttles",
      "Dedicated Chauffeur Standby for MNCs",
      "Inter-Campus Executive Transit",
    ],
    airportConnectors: "Kempegowda International Airport (BLR) via Bellary Road Expressway",
  },
  {
    id: "pune",
    name: "Pune Hub",
    stateOrEmirate: "Maharashtra",
    badge: "Automotive & IT Hub",
    description: "High-reliability employee transport and executive mobility across Pune's sprawling software parks and industrial manufacturing corridors.",
    keyZones: [
      "Hinjawadi Rajiv Gandhi Infotech Park (Phases 1, 2, 3)",
      "Magarpatta Cybercity",
      "Kharadi EON Free Zone",
      "Viman Nagar Commerce Hub",
      "Chakan Industrial Belt",
    ],
    expressways: [
      "Mumbai - Pune Expressway Connector",
      "Katraj - Dehu Road Bypass",
      "Pune - Ahmednagar Highway",
    ],
    serviceCapabilities: [
      "Scheduled Shift Roster Transport",
      "Industrial Facility Commute Convoys",
      "Executive Saloons for Leadership Delegations",
    ],
    airportConnectors: "Pune International Airport (PNQ) via Airport Road corridor",
  },
];

const uaeHubs: CorridorHub[] = [
  {
    id: "dubai",
    name: "Dubai Network",
    stateOrEmirate: "Dubai",
    badge: "U.A.E. Head Office Hub",
    description: "Pinnacle executive limousine dispatches and corporate airport protocol based out of our Al Garhoud headquarters near DXB.",
    keyZones: [
      "Dubai International Financial Centre (DIFC)",
      "Downtown Dubai & Business Bay",
      "Dubai South (Expo City & DWC)",
      "Dubai Media City & Internet City",
      "Palm Jumeirah Hospitality Strip",
    ],
    expressways: [
      "Sheikh Zayed Road (E11)",
      "Al Khail Road (E44)",
      "Sheikh Mohammed Bin Zayed Road (E311)",
    ],
    serviceCapabilities: [
      "First Class Saloons (Mercedes-Benz S-Class, BMW 7)",
      "Ultra-Luxury VIP (Mercedes-Maybach)",
      "24/7 DXB Terminal Meet-and-Assist Curbside",
    ],
    airportConnectors: "Dubai International Airport (DXB) immediate 5-min dispatch from Al Garhoud HQ; DWC in 40 min",
  },
  {
    id: "abu-dhabi",
    name: "Abu Dhabi Corridor",
    stateOrEmirate: "Abu Dhabi",
    badge: "Capital & Sovereign Hub",
    description: "State delegations, inter-emirate executive standby, and diplomatic convoy coordination across Abu Dhabi's governmental and financial districts.",
    keyZones: [
      "Al Maryah Island Financial Free Zone",
      "ADNEC Exhibition & Summit Centre",
      "Corniche Government District",
      "Yas Island Executive Zone",
      "Zayed International Airport (AUH) Corridor",
    ],
    expressways: [
      "Sheikh Khalifa Bin Zayed Highway (E12)",
      "Abu Dhabi - Dubai Expressway (E11)",
    ],
    serviceCapabilities: [
      "Inter-Emirate VIP Travel (Dubai ↔ Abu Dhabi)",
      "Global Summit Fleet Logistics (ADIPEC / ADNEC)",
      "Hourly Chauffeur Standby for Delegations",
    ],
    airportConnectors: "Zayed International Airport (AUH) with dedicated VIP curbside reception",
  },
  {
    id: "sharjah",
    name: "Sharjah Free Zones",
    stateOrEmirate: "Sharjah",
    badge: "Commercial Trade Corridor",
    description: "Structured corporate workforce transport and commercial free-zone transit connecting Northern Emirates with Dubai.",
    keyZones: [
      "Sharjah Airport International Free Zone (SAIF)",
      "Hamriyah Free Zone",
      "Al Majaz Waterfront Financial District",
      "University City Campus Zone",
    ],
    expressways: [
      "Emirates Road (E611)",
      "Al Ittihad Street (E11 Connector)",
    ],
    serviceCapabilities: [
      "Scheduled Workforce Commute Shuttles",
      "Inter-City Corporate Fleet Allocation",
      "Free-Zone Facility Staff Transport",
    ],
    airportConnectors: "Sharjah International Airport (SHJ) & Northern Emirates logistics corridor",
  },
];

export default function CorridorMatrix({ region, rfpHref }: CorridorMatrixProps) {
  const hubs = region === "uae" ? uaeHubs : indiaHubs;
  const [activeTab, setActiveTab] = useState<string>(hubs[0].id);

  const activeHub = hubs.find((h) => h.id === activeTab) || hubs[0];
  const targetRfpHref = rfpHref || (region === "uae" ? "/uae/rfp" : "/india/rfp");

  return (
    <section
      id="corridor-matrix"
      className="py-16 sm:py-24 bg-brand-warm-white border-b border-brand-soft-neutral"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo inline-flex items-center gap-1.5">
              <Route className="w-3.5 h-3.5 text-brand-violet" />
              Strategic Transit Corridors
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-ink tracking-tight">
              {region === "uae"
                ? "Key UAE Commercial Corridors & Hubs"
                : "Key Indian Tech Parks & Transit Corridors"}
            </h2>
            <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
              {region === "uae"
                ? "High-frequency executive corridors connecting international financial districts, airport terminals, and sovereign venues."
                : "High-density workforce transit corridors serving enterprise IT hubs, pharmaceutical campuses, and airport expressways."}
            </p>
          </div>

          <Link
            href={targetRfpHref}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-indigo hover:bg-brand-blue text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow-sm"
          >
            <span>Request Corporate RFP</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Hub Selector Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar" role="tablist">
          {hubs.map((hub) => {
            const isActive = activeTab === hub.id;
            return (
              <button
                key={hub.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(hub.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-brand-ink text-white shadow-md"
                    : "bg-white text-brand-ink/80 hover:text-brand-ink border border-brand-soft-neutral hover:bg-brand-soft-neutral/30"
                }`}
              >
                <MapPin className={`w-4 h-4 ${isActive ? "text-brand-violet" : "text-brand-indigo"}`} />
                <span>{hub.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  isActive ? "bg-white/20 text-white" : "bg-brand-warm-white text-brand-ink/60"
                }`}>
                  {hub.stateOrEmirate}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Hub Deep Detail Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-soft-neutral shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Hub Overview & Key Zones */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-warm-white text-brand-indigo border border-brand-soft-neutral">
                {activeHub.badge}
              </span>
              <span className="text-xs font-medium text-brand-ink/60 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Corridor
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-brand-ink">
                {activeHub.name}
              </h3>
              <p className="text-sm text-brand-ink/80 mt-2 leading-relaxed">
                {activeHub.description}
              </p>
            </div>

            {/* Tech Parks / Business Districts */}
            <div className="space-y-3 pt-4 border-t border-brand-soft-neutral">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-ink/60 block">
                Primary Business Campuses & Zones:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeHub.keyZones.map((zone) => (
                  <span
                    key={zone}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-warm-white border border-brand-soft-neutral text-xs font-semibold text-brand-ink"
                  >
                    <Building2 className="w-3 h-3 text-brand-indigo" />
                    <span>{zone}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Airport Transit Details */}
            <div className="p-4 rounded-2xl bg-brand-warm-white/70 border border-brand-soft-neutral space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-indigo block">
                Airport Corridor Connectivity:
              </span>
              <p className="text-xs text-brand-ink/85 font-medium">
                {activeHub.airportConnectors}
              </p>
            </div>
          </div>

          {/* Right Column: Expressways & Fleet Capabilities */}
          <div className="lg:col-span-6 space-y-6 lg:border-l lg:border-brand-soft-neutral lg:pl-10">
            {/* Expressways */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-ink/60 block flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-brand-indigo" />
                Key Expressways & Arterial Links:
              </span>
              <ul className="space-y-2">
                {activeHub.expressways.map((road) => (
                  <li
                    key={road}
                    className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-brand-ink bg-brand-warm-white/50 p-2.5 rounded-xl border border-brand-soft-neutral/70"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-violet shrink-0" />
                    <span>{road}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Typical Fleet Configurations */}
            <div className="space-y-3 pt-4 border-t border-brand-soft-neutral">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-ink/60 block flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-brand-indigo" />
                Active Fleet Deployment Models:
              </span>
              <ul className="space-y-2">
                {activeHub.serviceCapabilities.map((cap) => (
                  <li
                    key={cap}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-ink/85"
                  >
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Corridor Action Button */}
            <div className="pt-6">
              <Link
                href={`${targetRfpHref}?city=${encodeURIComponent(activeHub.name.replace(/ Hub| Network| Corridor| Free Zones/g, ""))}`}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-ink hover:bg-brand-indigo text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>Request {activeHub.name} Tender Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
