"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, MapPin, Phone, MessageSquare, ArrowRight, ShieldCheck } from "lucide-react";
import type { OfficeItem, ContactData } from "@/types/content";

interface IndiaPresenceMapProps {
  offices: OfficeItem[];
  contact: ContactData;
}

interface CityData {
  id: string;
  name: string;
  state: string;
  label: string;
  address: string;
  focus: string;
  coordinates: { x: number; y: number };
  statePath: string;
}

export default function IndiaPresenceMap({ offices, contact }: IndiaPresenceMapProps) {
  const [selectedCity, setSelectedCity] = useState<string>("Hyderabad");

  // Authorised office data and state coordinates
  const cities: CityData[] = [
    {
      id: "hyderabad",
      name: "Hyderabad",
      state: "Telangana",
      label: "India Head Office",
      address:
        offices.find((o) => o.city === "Hyderabad")?.address ||
        "2-48/3&5, VSGGC/4th Floor, Venkata Sai's Ganapathi Gold Complex, Telecom Nagar, Gachibowli - 500032, Hyderabad, Telangana, India.",
      focus: "Gachibowli, HITEC City, Financial District, and Rajiv Gandhi International Airport (RGIA).",
      coordinates: { x: 236, y: 345 },
      // Telangana SVG path (Deccan plateau region)
      statePath:
        "M 215 320 C 230 315 250 315 265 325 C 275 335 270 355 260 365 C 245 375 230 370 218 360 C 210 345 210 330 215 320 Z",
    },
    {
      id: "bengaluru",
      name: "Bengaluru",
      state: "Karnataka",
      label: "Branch Office",
      address:
        offices.find((o) => o.city === "Bengaluru")?.address ||
        "#22 Hamsa Mansion, B-Block, 4th Main Road, Cybela Greens BDA Layout, Phase-2, Maragondanahalli - 560036, Bengaluru, Karnataka, India.",
      focus: "Electronic City, Whitefield, Outer Ring Road technology parks, and Kempegowda Airport (BLR).",
      coordinates: { x: 202, y: 432 },
      // Karnataka SVG path (Western/Southern corridor)
      statePath:
        "M 160 355 C 180 348 200 355 210 370 C 215 395 215 425 212 445 C 195 455 180 440 172 420 C 160 395 155 375 160 355 Z",
    },
    {
      id: "pune",
      name: "Pune",
      state: "Maharashtra",
      label: "Branch Office",
      address:
        offices.find((o) => o.city === "Pune")?.address ||
        "Flat No. S-3, 1st Floor, Tanishka Prestige, Manjari Budruk, Hadapsar, Pune, Maharashtra, India.",
      focus: "Hadapsar, Hinjawadi Infotech Park, Magarpatta, industrial corridors, and Pune Airport (PNQ).",
      coordinates: { x: 165, y: 320 },
      // Maharashtra SVG path (West-central coast & Deccan)
      statePath:
        "M 125 285 C 150 275 190 270 230 280 C 240 295 225 320 205 325 C 175 335 150 335 135 325 C 120 310 120 295 125 285 Z",
    },
  ];

  const currentCity = cities.find((c) => c.name === selectedCity) || cities[0];

  return (
    <section id="network" tabIndex={-1} className="py-14 sm:py-20 bg-white border-b border-brand-soft-neutral focus:outline-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
            Regional Network
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-3">
            Our India presence.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
            Connect with Victor in Hyderabad, Bengaluru, and Pune. Established physical offices backed by local fleet staging and on-ground route controllers.
          </p>
        </div>

        {/* Desktop Layout: Map on Left (col-span-7), Office Panel on Right (col-span-5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Map Column */}
          <div className="lg:col-span-7 bg-brand-warm-white/70 rounded-3xl p-6 sm:p-8 border border-brand-soft-neutral flex flex-col items-center">
            {/* Interactive SVG India Vector Map */}
            <div className="relative w-full max-w-[420px] aspect-[500/550] flex items-center justify-center">
              <svg
                viewBox="0 0 500 550"
                className="w-full h-full drop-shadow-xs select-none"
                role="img"
                aria-label="Interactive map of India showing Victor Mobility offices in Telangana, Karnataka, and Maharashtra"
              >
                {/* Simplified Realistic Stylized India Contour */}
                {/* Non-highlighted base India landmass */}
                <path
                  d="M 230 25 C 240 20 260 30 265 50 C 270 70 255 90 250 110 C 265 125 285 130 300 145 C 320 155 350 160 375 170 C 400 180 435 185 450 205 C 465 220 455 240 435 245 C 410 245 390 230 370 235 C 355 245 340 260 330 280 C 315 310 300 340 280 375 C 260 415 240 460 220 515 C 215 520 210 515 205 500 C 185 460 165 425 150 380 C 135 340 120 310 110 280 C 95 260 70 245 65 225 C 60 200 85 185 110 180 C 135 175 160 165 180 145 C 200 125 215 90 220 55 Z"
                  fill="#E5E4EA"
                  stroke="#D8D7DE"
                  strokeWidth="1.5"
                  className="transition-colors duration-200"
                />

                {/* Regional State Highlights: Maharashtra, Telangana, Karnataka */}
                {cities.map((city) => {
                  const isSelected = selectedCity === city.name;
                  return (
                    <path
                      key={city.id}
                      d={city.statePath}
                      fill={isSelected ? "#2D5090" : "#31326F"}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      onClick={() => setSelectedCity(city.name)}
                      className="cursor-pointer transition-all duration-300 hover:fill-brand-blue"
                      tabIndex={0}
                      role="button"
                      aria-label={`Select ${city.name}, ${city.state}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedCity(city.name);
                        }
                      }}
                    />
                  );
                })}

                {/* City Markers & Labels */}
                {cities.map((city) => {
                  const isSelected = selectedCity === city.name;
                  const { x, y } = city.coordinates;

                  return (
                    <g
                      key={`marker-${city.id}`}
                      className="cursor-pointer group"
                      onClick={() => setSelectedCity(city.name)}
                    >
                      {/* Pulse ring for selected city */}
                      {isSelected && (
                        <circle
                          cx={x}
                          cy={y}
                          r="14"
                          fill="none"
                          stroke="#6E57A0"
                          strokeWidth="2"
                          className="animate-ping opacity-75 origin-center"
                        />
                      )}

                      {/* City Marker Pin */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? "7" : "5.5"}
                        fill={isSelected ? "#6E57A0" : "#FFFFFF"}
                        stroke={isSelected ? "#FFFFFF" : "#31326F"}
                        strokeWidth="2.5"
                        className="transition-all duration-200 shadow-md"
                      />

                      {/* Marker Label */}
                      <text
                        x={x + 12}
                        y={y + 4}
                        fill={isSelected ? "#15162F" : "#31326F"}
                        fontSize={isSelected ? "13" : "11"}
                        fontWeight={isSelected ? "800" : "600"}
                        className="transition-all duration-200 pointer-events-none drop-shadow-xs"
                      >
                        {city.name}
                        {city.id === "hyderabad" && " (HQ)"}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Clear Map Legend */}
            <div className="mt-4 pt-4 border-t border-brand-soft-neutral/70 w-full flex items-center justify-between text-xs text-brand-ink/75">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-sm bg-brand-indigo inline-block" />
                <span className="font-semibold text-brand-ink">
                  Highlighted states contain a listed Victor office.
                </span>
              </div>
              <span className="text-[11px] text-brand-ink/60 hidden sm:inline">
                Click a state or city
              </span>
            </div>
          </div>

          {/* Office Details Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Mobile/Touch City Selector Buttons */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-brand-warm-white border border-brand-soft-neutral" role="tablist">
              {cities.map((city) => {
                const isSelected = selectedCity === city.name;
                return (
                  <button
                    key={city.name}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCity(city.name)}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                      isSelected
                        ? "bg-brand-indigo text-white shadow-xs"
                        : "text-brand-ink hover:text-brand-indigo bg-transparent"
                    }`}
                  >
                    <span>{city.name}</span>
                    {city.name === "Hyderabad" && (
                      <span className="block text-[9px] font-normal opacity-85">Head Office</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active City Details Card */}
            <div className="bg-brand-warm-white rounded-3xl p-7 sm:p-8 border border-brand-soft-neutral space-y-6 shadow-xs">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block mb-1">
                    {currentCity.state}
                  </span>
                  <h3 className="text-2xl font-extrabold text-brand-ink">
                    {currentCity.name}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-brand-soft-neutral text-xs font-bold text-brand-indigo shadow-2xs">
                  <Building2 className="w-3.5 h-3.5 text-brand-violet" />
                  <span>{currentCity.label}</span>
                </span>
              </div>

              {/* Verified Physical Address from Authorized Baseline */}
              <div className="space-y-1.5 pt-2 border-t border-brand-soft-neutral">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-ink/60 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                  <span>Registered Address</span>
                </span>
                <p className="text-xs sm:text-sm text-brand-ink/85 leading-relaxed bg-white p-3.5 rounded-xl border border-brand-soft-neutral/70">
                  {currentCity.address}
                </p>
              </div>

              {/* Operational Key Hubs */}
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-ink/60 block">
                  Primary Coverage Corridors:
                </span>
                <p className="text-xs text-brand-ink/75 leading-relaxed">
                  {currentCity.focus}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-brand-soft-neutral flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/india/contact?city=${encodeURIComponent(currentCity.name)}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider bg-brand-indigo hover:bg-brand-blue text-white py-3 px-5 rounded-xl transition-colors shadow-xs"
                >
                  <span>Enquire for {currentCity.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={contact.phoneHref}
                  className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-brand-ink hover:text-brand-indigo bg-white py-3 px-4 rounded-xl border border-brand-soft-neutral hover:bg-brand-warm-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-blue" />
                  <span>{contact.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
