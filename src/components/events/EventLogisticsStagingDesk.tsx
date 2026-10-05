"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Users,
  Car,
  Bus,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Printer,
  MessageSquare,
  Building2,
  MapPin,
  Sparkles,
  ChevronRight,
  Radio,
  FileText,
  Crown,
  Compass,
} from "lucide-react";
import eventsData from "@/content/events.json";

interface EventLogisticsStagingDeskProps {
  region: "india" | "uae";
}

export default function EventLogisticsStagingDesk({
  region,
}: EventLogisticsStagingDeskProps) {
  const content = region === "india" ? eventsData.india : eventsData.uae;
  const eventTypes = content.eventTypes;

  // Interactive State
  const [selectedEventTypeId, setSelectedEventTypeId] = useState<string>(
    eventTypes[0].id
  );
  const [attendeeCount, setAttendeeCount] = useState<number>(250);
  const [eventDurationDays, setEventDurationDays] = useState<number>(2);
  const [operatingCity, setOperatingCity] = useState<string>(
    region === "india" ? "Hyderabad" : "Dubai"
  );
  const [includeAirportShuttle, setIncludeAirportShuttle] = useState<boolean>(true);
  const [includeGroundMarshals, setIncludeGroundMarshals] = useState<boolean>(true);

  const selectedEvent =
    eventTypes.find((e) => e.id === selectedEventTypeId) || eventTypes[0];

  // Dynamic Fleet Calculation Heuristics:
  // VIP Saloons: 1 per 50 guests (min 2, max 15)
  const vipSaloons = Math.min(15, Math.max(2, Math.ceil(attendeeCount / 60)));
  // MPVs: 1 per 35 guests (min 4, max 25)
  const mpvs = Math.min(25, Math.max(3, Math.ceil(attendeeCount / 40)));
  // Coaches: 1 per 40 guests needing mass shuttle (min 2, max 40)
  const coaches = Math.min(40, Math.max(2, Math.ceil((attendeeCount * 0.7) / 40)));
  // Ground Marshals: 1 per 100 guests (min 2, max 8)
  const groundMarshals = Math.min(8, Math.max(2, Math.ceil(attendeeCount / 100)));
  // Standby Hot-Swap vehicles: 2 vehicles
  const standbyVehicles = 2;

  const totalVehicles = vipSaloons + mpvs + coaches;

  const handlePrint = () => {
    window.print();
  };

  const waNumber = region === "india" ? "919396546950" : "971524552441";
  const waEventMessage = `*VICTOR MOBILITY · MEGA-EVENT & SUMMIT LOGISTICS BRIEF*
Region: ${region === "india" ? "India (Hyderabad / Bengaluru / Pune)" : "UAE (Dubai / Abu Dhabi)"}
Event Archetype: ${selectedEvent.name}
Operating Hub: ${operatingCity}
Expected Guests: ${attendeeCount} attendees
Duration: ${eventDurationDays} day(s)
Recommended Fleet Staging:
- ${vipSaloons}x VIP Executive Saloons (Mercedes / S-Class)
- ${mpvs}x Delegation MPVs / Executive Vans (Innova Crysta / V-Class)
- ${coaches}x Luxury High-Capacity Shuttle Buses (22-44 Pax)
- ${groundMarshals}x Uniformed On-Site Ground Marshals
- ${standbyVehicles}x Dedicated Standby Hot-Swap Vehicles
Airport Meet & Greet Desk: ${includeAirportShuttle ? "Requested" : "Not Required"}
Tagline: On Time Every Time.

Hello Victor Event Logistics Desk,
Please review our event transit parameters and provide an operational staging blueprint and commercial quotation for our procurement committee.`;

  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    waEventMessage
  )}`;

  return (
    <div className="space-y-12">
      {/* SECTION 1: EVENT ARCHETYPE SELECTOR */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-soft-neutral pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue block">
              Step 1 · Event Profile
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-brand-indigo">
              Select Your Event Logistics Archetype
            </h3>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="print:hidden inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-brand-soft-neutral bg-white hover:bg-brand-soft-neutral text-xs font-bold text-brand-indigo transition-all shadow-2xs"
          >
            <Printer className="w-4 h-4 text-brand-indigo" />
            <span>Print Staging Blueprint</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {eventTypes.map((et) => {
            const isSelected = et.id === selectedEventTypeId;
            return (
              <button
                key={et.id}
                type="button"
                onClick={() => setSelectedEventTypeId(et.id)}
                className={`text-left p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? "bg-brand-indigo text-white border-brand-indigo shadow-md scale-[1.01]"
                    : "bg-white text-brand-indigo border-brand-soft-neutral hover:border-brand-indigo/30"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-brand-soft-neutral/80 text-brand-slate"
                      }`}
                    >
                      {et.id.replace("-", " ")}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-brand-violet" />
                    )}
                  </div>
                  <h4 className="font-extrabold text-sm leading-snug">
                    {et.name}
                  </h4>
                  <p
                    className={`text-xs line-clamp-2 leading-relaxed ${
                      isSelected ? "text-brand-slate-light" : "text-brand-slate"
                    }`}
                  >
                    {et.description}
                  </p>
                </div>

                <div
                  className={`pt-2 border-t text-[11px] font-semibold ${
                    isSelected
                      ? "border-white/20 text-white/90"
                      : "border-brand-soft-neutral text-brand-indigo"
                  }`}
                >
                  Key Hubs: {et.keyHubs}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: INTERACTIVE FLEET STAGING CALCULATOR */}
      <div className="bg-white rounded-3xl border-2 border-brand-indigo/10 shadow-xl p-6 sm:p-10 space-y-8">
        <div className="max-w-2xl space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue block">
            Step 2 · Scale &amp; Staging Parameters
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-indigo tracking-tight">
            Multi-Vehicle Allocation &amp; Ground Marshal Calculator
          </h3>
          <p className="text-xs sm:text-sm text-brand-slate leading-relaxed">
            Adjust your expected guest volume and duration to generate an instant, balanced vehicle convoy recommendation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6 bg-brand-soft-neutral/30 rounded-2xl p-6 border border-brand-soft-neutral/60">
            {/* Slider: Attendee Volume */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-brand-slate">Expected Event Attendees</span>
                <span className="font-extrabold text-brand-indigo text-base bg-white px-3 py-1 rounded-lg border border-brand-soft-neutral shadow-2xs">
                  {attendeeCount} Guests
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="2500"
                step="25"
                value={attendeeCount}
                onChange={(e) => setAttendeeCount(Number(e.target.value))}
                className="w-full accent-brand-indigo cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-brand-slate-light font-mono">
                <span>50 (Delegation)</span>
                <span>500 (Gala)</span>
                <span>2,500+ (Convention)</span>
              </div>
            </div>

            {/* Event Duration & Operating City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-slate block">
                  Event Duration
                </label>
                <select
                  value={eventDurationDays}
                  onChange={(e) => setEventDurationDays(Number(e.target.value))}
                  className="w-full bg-white border border-brand-soft-neutral rounded-xl px-3.5 py-2.5 text-xs font-semibold text-brand-indigo focus:outline-none focus:border-brand-indigo"
                >
                  <option value={1}>1 Day (Single Session)</option>
                  <option value={2}>2 Days (Weekend / Summit)</option>
                  <option value={3}>3 Days (Multi-Venue)</option>
                  <option value={5}>5 Days (Full Week Congress)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-slate block">
                  Operating City Hub
                </label>
                <select
                  value={operatingCity}
                  onChange={(e) => setOperatingCity(e.target.value)}
                  className="w-full bg-white border border-brand-soft-neutral rounded-xl px-3.5 py-2.5 text-xs font-semibold text-brand-indigo focus:outline-none focus:border-brand-indigo"
                >
                  {region === "india" ? (
                    <>
                      <option value="Hyderabad">Hyderabad (Hitec City / RGIA)</option>
                      <option value="Bengaluru">Bengaluru (Whitefield / BLR)</option>
                      <option value="Pune">Pune (Kharadi / Hinjewadi)</option>
                    </>
                  ) : (
                    <>
                      <option value="Dubai">Dubai (DWTC / Expo City / DXB)</option>
                      <option value="Abu Dhabi">Abu Dhabi (ADNEC / AUH)</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            {/* Protocol Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-brand-soft-neutral text-xs">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-brand-slate">
                <input
                  type="checkbox"
                  checked={includeAirportShuttle}
                  onChange={(e) => setIncludeAirportShuttle(e.target.checked)}
                  className="accent-brand-indigo w-4 h-4 rounded"
                />
                <span>Include Airport Terminal VIP Meet &amp; Greet Reception</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-medium text-brand-slate">
                <input
                  type="checkbox"
                  checked={includeGroundMarshals}
                  onChange={(e) => setIncludeGroundMarshals(e.target.checked)}
                  className="accent-brand-indigo w-4 h-4 rounded"
                />
                <span>Include Dedicated On-Site Radio Controllers &amp; Ground Marshals</span>
              </label>
            </div>
          </div>

          {/* Staging Output Summary Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-brand-indigo via-slate-900 to-brand-ink text-white rounded-2xl p-6 sm:p-8 border border-white/15 shadow-xl space-y-6 relative overflow-hidden">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-widest text-brand-violet">
                  Calculated Fleet Staging Matrix
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-mono text-xs font-bold">
                  {totalVehicles} Total Vehicles
                </span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {selectedEvent.name}
              </h4>
              <p className="text-xs text-brand-slate-light">
                Tailored for {attendeeCount} guests across {operatingCity} ({eventDurationDays} days).
              </p>
            </div>

            {/* Allocation Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs border-t border-white/10 pt-4">
              <div className="bg-white/5 rounded-xl p-3 border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-brand-violet font-bold">
                  <Crown className="w-4 h-4" />
                  <span>VIP Saloons</span>
                </div>
                <div className="text-2xl font-black text-white">{vipSaloons} Cars</div>
                <span className="text-[10px] text-brand-slate-light block">
                  Mercedes S-Class / E-Class
                </span>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-brand-violet font-bold">
                  <Users className="w-4 h-4" />
                  <span>Delegation MPVs</span>
                </div>
                <div className="text-2xl font-black text-white">{mpvs} Vans</div>
                <span className="text-[10px] text-brand-slate-light block">
                  Innova Crysta / V-Class
                </span>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-brand-violet font-bold">
                  <Bus className="w-4 h-4" />
                  <span>Luxury Buses</span>
                </div>
                <div className="text-2xl font-black text-white">{coaches} Coaches</div>
                <span className="text-[10px] text-brand-slate-light block">
                  22 &amp; 44-Seater Air-Suspension
                </span>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Radio className="w-4 h-4" />
                  <span>Ground Marshals</span>
                </div>
                <div className="text-2xl font-black text-white">{groundMarshals} Staff</div>
                <span className="text-[10px] text-brand-slate-light block">
                  Uniformed Radio Coordinators
                </span>
              </div>
            </div>

            {/* Standby Guarantee Note */}
            <div className="bg-white/5 rounded-xl p-3 border border-white/10 flex items-center justify-between text-xs">
              <span className="text-brand-slate-light">Depot Standby Hot-Swap:</span>
              <span className="font-bold text-emerald-400">
                +{standbyVehicles} Backup Vehicles Staged
              </span>
            </div>

            {/* WhatsApp Brief Action */}
            <div className="pt-2 space-y-3 print:hidden">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Submit Event Staging Brief via WhatsApp</span>
              </a>

              <p className="text-[11px] text-center text-brand-slate-light">
                Direct liaison with our Senior Fleet Operations Director. Opening WhatsApp creates a draft message; bookings are confirmed upon contract signoff.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: 4-PHASE OPERATIONAL PLAYBOOK */}
      <div className="space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue block">
            Operational Governance
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-indigo tracking-tight">
            The 4-Phase Event Transportation Playbook
          </h3>
          <p className="text-xs sm:text-sm text-brand-slate leading-relaxed">
            Every major gathering managed by Victor Mobility follows an uncompromising 4-stage operational sequence to prevent congestion, delays, or passenger confusion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.playbookPhases.map((phase) => (
            <div
              key={phase.phase}
              className="bg-white rounded-2xl p-6 border border-brand-soft-neutral shadow-xs space-y-3 relative overflow-hidden"
            >
              <div className="text-3xl font-black text-brand-indigo/15">
                {phase.phase}
              </div>
              <h4 className="text-base font-bold text-brand-indigo">{phase.title}</h4>
              <p className="text-xs text-brand-slate leading-relaxed">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
