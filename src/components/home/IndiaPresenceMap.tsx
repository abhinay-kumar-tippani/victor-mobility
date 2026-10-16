"use client";

import { useId, useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Phone, Building2, CheckCircle2, Compass } from "lucide-react";
import geography from "@/content/india-map.json";
import type { OfficeItem, ContactData, CityItem } from "@/types/content";
import OfficeMapLinks from "@/components/contact/OfficeMapLinks";
import { canonicalCityName } from "@/lib/enquiryMessage";
import { useLanguage } from "@/i18n/LanguageContext";

interface CityMeta {
  name: string;
  state: string;
  label: string;
  badge: string;
  corridors: string;
  description: string;
  isRegisteredOffice?: boolean;
}

const citiesData: CityMeta[] = [
  {
    name: "Hyderabad",
    state: "Telangana",
    label: "India Head Office",
    badge: "Head Office & Control Room",
    corridors: "HITEC City · Financial District · Gachibowli · Shamshabad (RGIA) · Madhapur · Kondapur",
    description: "National operations command center, central dispatch control, and enterprise corporate mobility management.",
    isRegisteredOffice: true,
  },
  {
    name: "Bangalore",
    state: "Karnataka",
    label: "Branch Office",
    badge: "Regional Operations Hub",
    corridors: "Whitefield · Electronic City · Outer Ring Road (ORR) · Manyata Tech Park · Kempegowda (BLR)",
    description: "Multi-shift employee transit networks, dedicated tech campus bus loops, and executive chauffeur retainers.",
    isRegisteredOffice: true,
  },
  {
    name: "Pune",
    state: "Maharashtra",
    label: "Branch Office",
    badge: "Regional Operations Hub",
    corridors: "Hinjawadi Phase 1-3 · Kharadi EON · Magarpatta City · Viman Nagar · Pune Airport (PNQ)",
    description: "IT and industrial workforce transportation, nodal campus shuttles, and corporate employee commute fleets.",
    isRegisteredOffice: true,
  },
  {
    name: "Mumbai",
    state: "Maharashtra",
    label: "Operational Presence",
    badge: "Commercial & Financial Hub",
    corridors: "BKC (Bandra Kurla Complex) · Lower Parel · Andheri East · Powai · Nariman Point · Mumbai Airport (BOM)",
    description: "Executive luxury chauffeur protocol, airport VIP transfers, and corporate leadership transit solutions.",
  },
  {
    name: "Chennai",
    state: "Tamil Nadu",
    label: "Operational Presence",
    badge: "Southern Commerce Corridor",
    corridors: "OMR IT Corridor · Guindy · Tidel Park · Sriperumbudur · Ambattur · Chennai Airport (MAA)",
    description: "Manufacturing corridor bus transit, technology park employee shuttles, and airport protocol services.",
  },
  {
    name: "Delhi",
    state: "Delhi",
    label: "Operational Presence",
    badge: "National Capital Hub",
    corridors: "Aerocity · Connaught Place · Nehru Place · South Extension · IGI Airport (DEL Terminal 1-3)",
    description: "Diplomatic and executive delegation mobility, corporate roadshows, and round-the-clock airport connections.",
  },
  {
    name: "Noida",
    state: "Uttar Pradesh",
    label: "Operational Presence",
    badge: "NCR Tech & Industrial Belt",
    corridors: "Sector 62 · Noida-Greater Noida Expressway · Sector 18 · Sector 135 · Greater Noida IT Park",
    description: "Roster-synchronized corporate employee shuttles, nodal campus loops, and tech workforce fleet operations.",
  },
  {
    name: "Gurgaon",
    state: "Haryana",
    label: "Operational Presence",
    badge: "Cyber City Corporate Fleet",
    corridors: "DLF Cyber City · Golf Course Road · Udyog Vihar · Cyber Hub · Sohna Road · Manesar Industrial Hub",
    description: "Enterprise tech employee commutes, hourly executive chauffeur hire, and multi-shift industrial transit.",
  },
  {
    name: "Ahmedabad",
    state: "Gujarat",
    label: "Operational Presence",
    badge: "Commercial & GIFT City Fleet",
    corridors: "SG Highway · GIFT City Corridor · Prahlad Nagar · Sanand Industrial Belt · SVPI Airport (AMD)",
    description: "Executive delegations, GIFT City financial corridor transit, and manufacturing hub group transportation.",
  },
  {
    name: "Kolkata",
    state: "West Bengal",
    label: "Operational Presence",
    badge: "Eastern Commerce Network",
    corridors: "Salt Lake Sector V · New Town Action Area 1-3 · Rajarhat · Park Street · Netaji Subhash Airport (CCU)",
    description: "IT workforce campus shuttles, executive corporate transit, and 24/7 commercial airport transfers.",
  },
];

// Mapping each highlighted state to the city/cities Victor operates in
const stateCityMap: Record<
  string,
  {
    cities: string[];
    citiesDisplay: string;
    primaryCity: string;
  }
> = {
  Telangana: {
    cities: ["Hyderabad"],
    citiesDisplay: "Hyderabad",
    primaryCity: "Hyderabad",
  },
  Karnataka: {
    cities: ["Bangalore"],
    citiesDisplay: "Bangalore",
    primaryCity: "Bangalore",
  },
  Maharashtra: {
    cities: ["Mumbai", "Pune"],
    citiesDisplay: "Mumbai & Pune",
    primaryCity: "Pune",
  },
  "Tamil Nadu": {
    cities: ["Chennai"],
    citiesDisplay: "Chennai",
    primaryCity: "Chennai",
  },
  Delhi: {
    cities: ["Delhi"],
    citiesDisplay: "Delhi",
    primaryCity: "Delhi",
  },
  "Uttar Pradesh": {
    cities: ["Noida"],
    citiesDisplay: "Noida",
    primaryCity: "Noida",
  },
  Haryana: {
    cities: ["Gurgaon"],
    citiesDisplay: "Gurgaon",
    primaryCity: "Gurgaon",
  },
  Gujarat: {
    cities: ["Ahmedabad"],
    citiesDisplay: "Ahmedabad",
    primaryCity: "Ahmedabad",
  },
  "West Bengal": {
    cities: ["Kolkata"],
    citiesDisplay: "Kolkata",
    primaryCity: "Kolkata",
  },
};

export default function IndiaPresenceMap({
  offices,
  contact,
  cities,
  searchCopy,
}: {
  offices: OfficeItem[];
  contact: ContactData;
  cities: CityItem[];
  searchCopy: { label: string; placeholder: string; empty: string; clear: string; other: string };
}) {
  const [search, setSearch] = useState("");
  const [selectedCityName, setSelectedCityName] = useState<string>("Hyderabad");
  const [hoveredStateName, setHoveredStateName] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    city: string;
    state: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
    city: "",
    state: "",
  });

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const panelId = useId();
  const searchId = useId();
  const { dict } = useLanguage();

  const availableCities = citiesData.flatMap(city => {
    const published = cities.find(item => item.published && canonicalCityName(item.name) === canonicalCityName(city.name));
    return published ? [{ ...city, name: published.name }] : [];
  });
  const filteredCities = availableCities.filter(city => {
    const aliases = city.name === "Bengaluru" ? "bangalore" : city.name === "Gurgaon" ? "gurugram" : "";
    return `${city.name} ${city.state} ${aliases}`.toLowerCase().includes(search.trim().toLowerCase());
  });

  const selectedCity =
    availableCities.find(c => canonicalCityName(c.name) === canonicalCityName(selectedCityName)) || availableCities[0];

  if (!selectedCity) return null;

  // Match physical office from content/india.json if exists
  const registeredOffice = offices.find(
    (o) =>
      o.published &&
      (o.city.toLowerCase() === selectedCity.name.toLowerCase() ||
        (selectedCity.name === "Bangalore" && o.city.toLowerCase() === "bengaluru"))
  );

  const updateTooltipCoords = (clientX: number, clientY: number) => {
    if (!mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setTooltip((prev) => (prev.visible ? { ...prev, x, y } : prev));
  };

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateTooltipCoords(e.clientX, e.clientY);
  };

  const handleStateMouseEnter = (
    e: React.MouseEvent<SVGPathElement>,
    stateName: string
  ) => {
    const mapping = stateCityMap[stateName];
    if (mapping) {
      setHoveredStateName(stateName);
      if (mapContainerRef.current) {
        const rect = mapContainerRef.current.getBoundingClientRect();
        setTooltip({
          visible: true,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          city: mapping.citiesDisplay,
          state: stateName,
        });
      }
    }
  };

  const handleStateMouseMove = (
    e: React.MouseEvent<SVGPathElement>,
    stateName: string
  ) => {
    const mapping = stateCityMap[stateName];
    if (mapping && mapContainerRef.current) {
      const rect = mapContainerRef.current.getBoundingClientRect();
      setTooltip({
        visible: true,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        city: mapping.citiesDisplay,
        state: stateName,
      });
    }
  };

  const handleStateMouseLeave = () => {
    setHoveredStateName(null);
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  const handleStateClick = (stateName: string) => {
    const mapping = stateCityMap[stateName];
    if (mapping) {
      setSelectedCityName(mapping.primaryCity);
      setSearch("");
    }
  };

  return (
    <section
      id="network"
      tabIndex={-1}
      className="py-14 sm:py-20 bg-white border-b border-brand-soft-neutral focus:outline-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block">
            {dict.presence.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight">
            {dict.presence.title}
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
            Active corporate mobility operations across 10 major commercial hubs and tech corridors.
            Select any hub below or explore the interactive regional map.
          </p>
        </div>

        {/* Quick City Selector Pill Matrix (Accessible across all viewports) */}
        <div className="space-y-2">
          <div className="mb-4 max-w-lg">
            <label htmlFor={searchId} className="mb-2 block text-sm font-bold text-brand-ink">{searchCopy.label}</label>
            <div className="flex gap-2">
              <input id={searchId} type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder={searchCopy.placeholder} className="min-h-[48px] min-w-0 flex-1 rounded-xl border border-brand-soft-neutral bg-white px-4 py-3 text-base text-brand-ink outline-none focus:ring-2 focus:ring-brand-indigo" />
              {search && <button type="button" onClick={() => setSearch("")} className="min-h-[48px] rounded-xl px-3 text-sm font-bold text-brand-indigo hover:bg-brand-warm-white">{searchCopy.clear}</button>}
            </div>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-ink/70 block">
            Select Operational City:
          </span>
          <div
            role="group"
            aria-label="Select an operational city"
            className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-brand-warm-white border border-brand-soft-neutral shadow-2xs"
          >
            {filteredCities.map((city) => {
              const isActive = selectedCity.name === city.name;
              return (
                <button
                  key={city.name}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedCityName(city.name)}
                  className={`min-h-[44px] text-xs font-bold px-3 py-2 rounded-xl transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-indigo ${
                    isActive
                      ? "bg-brand-indigo text-white shadow-xs"
                      : "text-brand-ink/80 hover:bg-white hover:text-brand-ink"
                  }`}
                >
                  {city.name}
                </button>
              );
            })}
          </div>
          <div role="status" className="text-sm text-brand-ink/75">
            {filteredCities.length === 0 && <p className="py-2">{searchCopy.empty}</p>}
          </div>
          <Link href="/india/contact?city=Other" className="inline-flex min-h-[44px] items-center text-sm font-semibold text-brand-indigo underline underline-offset-4">{searchCopy.other}</Link>
        </div>

        {/* 2-Column Split: Map on Left, Active City Details on Right */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Interactive India Map with Cursor-Tracking Floating Tooltip */}
          <div className="lg:col-span-7 rounded-3xl bg-white p-5 sm:p-7 border border-slate-200/90 relative shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-brand-indigo" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-ink">
                  Interactive Presence Map
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-brand-ink/70">
                <span className="w-3 h-3 rounded bg-brand-indigo inline-block" />
                <span>9 Highlighted States · 10 Cities</span>
              </div>
            </div>

            {/* Map Canvas with Mouse Tracking */}
            <div
              ref={mapContainerRef}
              onMouseMove={handleContainerMouseMove}
              onMouseLeave={() => setTooltip((prev) => ({ ...prev, visible: false }))}
              className="relative w-full max-w-[480px] mx-auto select-none"
            >
              <svg
                viewBox={geography.viewBox}
                role="img"
                aria-labelledby={titleId}
                className="w-full h-auto drop-shadow-sm"
              >
                <title id={titleId}>
                  India presence map: states with Victor Mobility operations are highlighted.
                </title>

                {/* Country Background Outline */}
                <path
                  d={geography.country}
                  fill="#E2E5EC"
                  stroke="#94A3B8"
                  strokeWidth="1.1"
                  fillRule="evenodd"
                />

                {/* All 36 States/UTs */}
                {geography.states.map((state) => {
                  const isPresent = Boolean(stateCityMap[state.name]);
                  const isHovered = hoveredStateName === state.name;
                  const isSelectedState = selectedCity.state === state.name;

                  let fillColor = "#E2E5EC"; // Default non-operational state in crisp slate
                  if (isPresent) {
                    if (isHovered) {
                      fillColor = "#1D4ED8"; // Vivid blue on hover
                    } else if (isSelectedState) {
                      fillColor = "#2D5090"; // Active state
                    } else {
                      fillColor = "#31326F"; // Victor signature dark indigo
                    }
                  }

                  return (
                    <path
                      key={state.name}
                      d={state.path}
                      fill={fillColor}
                      stroke="#FFFFFF"
                      strokeWidth={isPresent ? 0.85 : 0.6}
                      fillRule="evenodd"
                      onMouseEnter={(e) => handleStateMouseEnter(e, state.name)}
                      onMouseMove={(e) => handleStateMouseMove(e, state.name)}
                      onMouseLeave={handleStateMouseLeave}
                      onClick={() => isPresent && handleStateClick(state.name)}
                      className={
                        isPresent
                          ? "cursor-pointer transition-colors duration-150 ease-out"
                          : "transition-colors duration-150"
                      }
                    />
                  );
                })}

                {/* City Markers for the 10 Operating Cities */}
                {geography.cities.map((city) => {
                  const [cx, cy] = city.point;
                  const isSelected = canonicalCityName(selectedCity.name) === canonicalCityName(city.name);

                  // Label alignments (Bangalore on left to prevent overlap with Chennai)
                  const isLeftLabel =
                    city.name === "Pune" ||
                    city.name === "Mumbai" ||
                    city.name === "Ahmedabad" ||
                    city.name === "Gurgaon" ||
                    city.name === "Bangalore";
                  const textAnchor = isLeftLabel ? "end" : "start";
                  const dx = isLeftLabel ? -9 : 9;
                  const dy =
                    city.name === "Noida"
                      ? 8
                      : city.name === "Delhi"
                      ? -5
                      : 4;

                  return (
                    <g
                      key={city.name}
                      onClick={() => setSelectedCityName(city.name)}
                      onMouseEnter={(e) => {
                        if (mapContainerRef.current) {
                          const rect = mapContainerRef.current.getBoundingClientRect();
                          setTooltip({
                            visible: true,
                            x: e.clientX - rect.left,
                            y: e.clientY - rect.top,
                            city: city.name,
                            state: city.state,
                          });
                        }
                      }}
                      onMouseMove={(e) => {
                        if (mapContainerRef.current) {
                          const rect = mapContainerRef.current.getBoundingClientRect();
                          setTooltip((prev) => ({
                            ...prev,
                            visible: true,
                            x: e.clientX - rect.left,
                            y: e.clientY - rect.top,
                            city: city.name,
                            state: city.state,
                          }));
                        }
                      }}
                      className="cursor-pointer"
                    >
                      {/* Pulse ring for selected city */}
                      {isSelected && (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={10}
                          fill="none"
                          stroke="#3B82F6"
                          strokeWidth="2"
                          className="opacity-70"
                        />
                      )}

                      {/* City Pin Dot */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSelected ? 6 : 4}
                        fill={isSelected ? "#FFFFFF" : "#FFFFFF"}
                        stroke={isSelected ? "#2563EB" : "#6E57A0"}
                        strokeWidth={isSelected ? 3 : 2}
                      />

                      {/* City Label */}
                      <text
                        x={cx + dx}
                        y={cy + dy}
                        textAnchor={textAnchor}
                        fontSize="11"
                        fontWeight={isSelected ? "800" : "700"}
                        fill={isSelected ? "#1D4ED8" : "#1E293B"}
                        stroke="#FFFFFF"
                        strokeWidth="3"
                        paintOrder="stroke"
                        strokeLinejoin="round"
                        className="pointer-events-none select-none"
                      >
                        {city.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Cursor-Tracking Floating Tooltip */}
              {tooltip.visible && (
                <div
                  data-testid="map-tooltip"
                  className="pointer-events-none absolute z-30 transition-transform duration-75 ease-out select-none"
                  style={{
                    left: `${tooltip.x}px`,
                    top: `${tooltip.y}px`,
                    transform:
                      tooltip.y < 80
                        ? "translate(-50%, 16px)"
                        : "translate(-50%, -100%) translateY(-14px)",
                  }}
                >
                  <div className="bg-brand-ink/95 backdrop-blur-md text-white px-3.5 py-2 rounded-xl shadow-2xl border border-brand-indigo/40 flex flex-col items-center text-center whitespace-nowrap min-w-[120px]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-violet">
                      {tooltip.state}
                    </span>
                    <span className="text-sm font-extrabold text-white flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                      <span>{tooltip.city}</span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Map Footnote & Attribution */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-brand-ink/70 gap-2">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Hover state to view operational cities · Click to inspect hub
              </span>
              <span className="text-xs text-brand-ink/50">
                Boundaries: DataMeet (CC BY 4.0) · Simplified graphic
              </span>
            </div>
          </div>

          {/* Right Column: Active Hub Dossier */}
          <div className="lg:col-span-5">
            {/* Selected City Hub Dossier Card */}
            <div
              id={panelId}
              aria-live="polite"
              aria-atomic="true"
              className="rounded-3xl bg-brand-warm-white p-6 sm:p-7 border border-brand-soft-neutral shadow-xs space-y-5"
            >
              {/* Header with Classification Badge */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-brand-soft-neutral text-[11px] font-bold uppercase tracking-wider text-brand-indigo">
                  <Building2 className="w-3.5 h-3.5 text-brand-blue" />
                  <span>{selectedCity.label}</span>
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {selectedCity.badge}
                </span>
              </div>

              {/* City & State Title */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-ink">
                  {selectedCity.name}
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-blue mt-0.5">
                  {selectedCity.state} Region
                </p>
                <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed mt-2">
                  {selectedCity.description}
                </p>
              </div>

              {/* Physical Office Address if Registered */}
              {registeredOffice && (
                <div className="p-3.5 rounded-2xl bg-white border border-brand-soft-neutral space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-indigo">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{registeredOffice.label}:</span>
                  </div>
                  <address className="not-italic text-xs text-brand-ink/80 leading-relaxed font-medium">
                    {registeredOffice.address}
                  </address>
                  <OfficeMapLinks office={registeredOffice} />
                </div>
              )}

              {/* Arterial Corridors Served */}
              <div className="p-3.5 rounded-2xl bg-white border border-brand-soft-neutral space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-ink/60 block">
                  {dict.presence.corridorsLabel}:
                </span>
                <p className="text-xs text-brand-ink/80 leading-relaxed font-semibold">
                  {selectedCity.corridors}
                </p>
              </div>

              {/* Direct Actions */}
              <div className="pt-2 space-y-2.5 border-t border-brand-soft-neutral/80">
                <Link
                  href={`/india/contact?city=${encodeURIComponent(selectedCity.name)}`}
                  className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold bg-brand-indigo hover:bg-brand-blue text-white py-3.5 px-4 rounded-xl shadow-xs transition-colors"
                >
                  <span>{dict.presence.enquireFor} {selectedCity.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={contact.phoneHref}
                  className="w-full inline-flex items-center justify-center gap-2 text-xs font-semibold text-brand-ink/80 hover:text-brand-indigo py-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-blue" />
                  <span>{dict.presence.callHub}: {contact.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
