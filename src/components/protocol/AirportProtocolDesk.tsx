'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface ProtocolStandard {
  id: string;
  title: string;
  subtitle: string;
  metric: string;
  description: string;
  badge: string;
}

export interface TerminalInfo {
  name: string;
  pickupBay: string;
  curbsideInstructions: string;
  averageTransitToTechCorridor: string;
}

export interface AirportInfo {
  code: string;
  name: string;
  city: string;
  terminals: TerminalInfo[];
}

export interface FleetCapacity {
  classId: string;
  className: string;
  models: string;
  passengers: string;
  luggage: string;
  amenities: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface AirportProtocolDeskProps {
  region: 'india' | 'uae';
  title: string;
  eyebrow: string;
  description: string;
  protocolStandards: ProtocolStandard[];
  airports: AirportInfo[];
  fleetCapacities: FleetCapacity[];
  faqs: FaqItem[];
  phone: string;
  whatsapp: string;
  supportHours: string;
}

export default function AirportProtocolDesk({
  region,
  title,
  eyebrow,
  description,
  protocolStandards,
  airports,
  fleetCapacities,
  faqs,
  phone,
  whatsapp,
  supportHours,
}: AirportProtocolDeskProps) {
  const isIndia = region === 'india';

  // Configurator state
  const [selectedAirportCode, setSelectedAirportCode] = useState<string>(airports[0]?.code || 'HYD');
  const currentAirport = airports.find((a) => a.code === selectedAirportCode) || airports[0];

  const [selectedTerminalIdx, setSelectedTerminalIdx] = useState<number>(0);
  const currentTerminal = currentAirport.terminals[selectedTerminalIdx] || currentAirport.terminals[0];

  const [flightNumber, setFlightNumber] = useState<string>(isIndia ? '6E 521' : 'EK 527');
  const [guestName, setGuestName] = useState<string>(isIndia ? 'Mr. David Sterling' : 'Dr. Sarah Chen');
  const [organization, setOrganization] = useState<string>(isIndia ? 'Enterprise Executive Guest' : 'Global Corporate Delegate');
  const [selectedClassId, setSelectedClassId] = useState<string>('luxury-saloon');
  const [passengerCount, setPassengerCount] = useState<number>(2);
  const [luggageCount, setLuggageCount] = useState<number>(2);

  // Protocol amenities toggles
  const [amenityWater, setAmenityWater] = useState<boolean>(true);
  const [amenityChargers, setAmenityChargers] = useState<boolean>(true);
  const [amenityWifi, setAmenityWifi] = useState<boolean>(true);
  const [amenitySilent, setAmenitySilent] = useState<boolean>(false);
  const [amenityTarmac, setAmenityTarmac] = useState<boolean>(false);

  // Tabs state
  const [activeTab, setActiveTab] = useState<'configurator' | 'airports' | 'standards' | 'fleet' | 'faqs'>('configurator');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const currentClass = fleetCapacities.find((c) => c.classId === selectedClassId) || fleetCapacities[0];

  // Baggage capacity check
  const isBaggageWarning =
    (selectedClassId === 'luxury-saloon' || selectedClassId === 'executive-sedan') && luggageCount > 3;

  // WhatsApp Inquiry Generator
  const generateWhatsAppMessage = () => {
    const rawNumber = whatsapp.replace(/[^0-9]/g, '');
    const amenitiesList = [
      amenityWater ? 'Chilled Mineral Water & Mints' : null,
      amenityChargers ? 'Universal Phone Fast-Charging' : null,
      amenityWifi ? 'High-Speed Wi-Fi Hotspot' : null,
      amenitySilent ? 'Quiet / Silent Cabin Policy' : null,
      amenityTarmac ? 'VIP Lounge / Tarmac Liaison' : null,
    ].filter(Boolean);

    const text = [
      `*Airport VIP Protocol Inquiry — Victor Mobility (${isIndia ? 'India' : 'UAE'})*`,
      `Airport: ${currentAirport.name} (${currentAirport.code})`,
      `Terminal: ${currentTerminal.name}`,
      `Flight Number: ${flightNumber}`,
      `Guest Name on Placard: ${guestName}`,
      `Corporate Entity: ${organization}`,
      `Selected Fleet Class: ${currentClass.className} (${currentClass.models})`,
      `Passengers: ${passengerCount} | Luggage Bags: ${luggageCount}`,
      `Designated Meeting Bay: ${currentTerminal.pickupBay}`,
      `Requested Amenities: ${amenitiesList.join(', ')}`,
      '',
      'Please confirm chauffeur availability, airport commercial parking staging, and rate schedule for this arrival protocol.',
      '',
      '_Note: This WhatsApp message initiates an airport VIP concierge inquiry with Victor Mobility and does not constitute a confirmed flight booking._',
    ].join('\n');

    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`;
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="w-full">
      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 print:bg-white print:text-black print:py-4">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4 print:text-slate-800 print:border-slate-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse print:hidden"></span>
            {eyebrow}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 print:text-black">
            {title}
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed mb-8 print:text-slate-700">
            {description}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800 print:border-slate-300">
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Flight Radar Sync</span>
              <span className="text-2xl font-bold text-amber-400 print:text-black">ADS-B Telemetry</span>
              <span className="text-xs text-slate-500 block mt-1">Automatic Delay Adjustment</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Complimentary Wait</span>
              <span className="text-2xl font-bold text-emerald-400 print:text-black">60 Minutes</span>
              <span className="text-xs text-slate-500 block mt-1">Post-Touchdown Buffer</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Greeting Standard</span>
              <span className="text-2xl font-bold text-cyan-400 print:text-black">Digital Tablet</span>
              <span className="text-xs text-slate-500 block mt-1">High-Contrast Paging</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Cabin Climate</span>
              <span className="text-2xl font-bold text-amber-400 print:text-black">{isIndia ? '21°C' : '20°C'}</span>
              <span className="text-xs text-slate-500 block mt-1">Pre-Cooled Luxury Cabin</span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs (Hidden in Print) */}
      <div className="sticky top-16 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 print:hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar py-2">
          <nav className="flex space-x-2" aria-label="Airport Protocol Sections">
            <button
              onClick={() => setActiveTab('configurator')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'configurator'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Protocol Configurator &amp; Placard Preview
            </button>
            <button
              onClick={() => setActiveTab('airports')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'airports'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Terminal Staging &amp; Pickup Bays
            </button>
            <button
              onClick={() => setActiveTab('standards')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'standards'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              White-Glove Protocols
            </button>
            <button
              onClick={() => setActiveTab('fleet')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'fleet'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Luggage &amp; Capacity Matrix
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'faqs'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Airport FAQs
            </button>
          </nav>

          <div className="flex items-center gap-2 pl-4">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded border border-slate-700 transition"
              title="Print Airport Protocol Blueprint"
            >
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Blueprint
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 print:py-4">
        {/* Tab 1: Configurator & Placard Preview */}
        {(activeTab === 'configurator' || typeof window === 'undefined') && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-2xl font-bold text-white print:text-black">
                Flight Arrival Protocol Configurator &amp; Paging Placard Preview
              </h2>
              <p className="text-sm text-slate-400 mt-1 print:text-slate-600">
                Configure flight arrival details, customize the digital tablet greeting placard, and review terminal bay staging instructions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form Controls (7 Cols) */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6 print:border-slate-300 print:bg-white print:text-black">
                {/* 1. Airport & Terminal Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    1. Select Airport &amp; Terminal
                  </label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {airports.map((airport) => (
                      <button
                        key={airport.code}
                        onClick={() => {
                          setSelectedAirportCode(airport.code);
                          setSelectedTerminalIdx(0);
                        }}
                        className={`p-3 rounded-lg border text-center transition ${
                          selectedAirportCode === airport.code
                            ? 'bg-amber-500/15 border-amber-500 text-white font-bold'
                            : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className="block text-base font-extrabold text-amber-400">{airport.code}</span>
                        <span className="block text-[11px] text-slate-400 truncate">{airport.city}</span>
                      </button>
                    ))}
                  </div>

                  <select
                    value={selectedTerminalIdx}
                    onChange={(e) => setSelectedTerminalIdx(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    {currentAirport.terminals.map((terminal, idx) => (
                      <option key={idx} value={idx}>
                        {terminal.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Flight & Passenger Identifiers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      2. Flight Number / Tail ID
                    </label>
                    <input
                      type="text"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      placeholder="e.g. 6E 521, EK 527"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      3. Guest Name (On Placard)
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Mr. David Sterling"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    4. Corporate / Organization Insignia
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Deloitte Global, Microsoft Executive Desk"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* 5. Fleet Class Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    5. Select Fleet Class &amp; Luggage Capacity
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {fleetCapacities.map((item) => (
                      <button
                        key={item.classId}
                        onClick={() => setSelectedClassId(item.classId)}
                        className={`text-left p-3 rounded-lg border text-xs transition ${
                          selectedClassId === item.classId
                            ? 'bg-amber-500/15 border-amber-500 text-white font-semibold'
                            : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="font-bold text-sm text-white mb-0.5">{item.className}</div>
                        <div className="text-slate-400 line-clamp-1">{item.models}</div>
                        <div className="text-[11px] text-amber-400/90 mt-1">{item.luggage}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Passengers & Bags Count */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Passengers
                    </label>
                    <select
                      value={passengerCount}
                      onChange={(e) => setPassengerCount(Number(e.target.value))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 12, 20].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Baggage Items (Check-in &amp; Cabin)
                    </label>
                    <select
                      value={luggageCount}
                      onChange={(e) => setLuggageCount(Number(e.target.value))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 12, 20].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Suitcase' : 'Suitcases / Bags'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {isBaggageWarning && (
                  <div className="p-3 rounded-lg bg-amber-950/60 border border-amber-800 text-amber-300 text-xs flex items-center gap-2">
                    <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>
                      {luggageCount} bags exceed standard saloon boot capacity. We recommend selecting our Premium Executive MPV (Innova HyCross / Vellfire / V-Class) for comfortable stowage.
                    </span>
                  </div>
                )}

                {/* 6. Protocol Preferences */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    6. Protocol Amenities &amp; Services
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    <label className="flex items-center gap-2 p-2 rounded bg-slate-800/50 border border-slate-700/60 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={amenityWater}
                        onChange={(e) => setAmenityWater(e.target.checked)}
                        className="rounded border-slate-600 text-amber-500 focus:ring-amber-500"
                      />
                      <span>Chilled Mineral Water &amp; Mints</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 rounded bg-slate-800/50 border border-slate-700/60 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={amenityChargers}
                        onChange={(e) => setAmenityChargers(e.target.checked)}
                        className="rounded border-slate-600 text-amber-500 focus:ring-amber-500"
                      />
                      <span>Fast Device Chargers (USB-C &amp; Lightning)</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 rounded bg-slate-800/50 border border-slate-700/60 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={amenityWifi}
                        onChange={(e) => setAmenityWifi(e.target.checked)}
                        className="rounded border-slate-600 text-amber-500 focus:ring-amber-500"
                      />
                      <span>Onboard High-Speed 5G Wi-Fi</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 rounded bg-slate-800/50 border border-slate-700/60 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={amenitySilent}
                        onChange={(e) => setAmenitySilent(e.target.checked)}
                        className="rounded border-slate-600 text-amber-500 focus:ring-amber-500"
                      />
                      <span>Quiet / Silent Cabin Protocol</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 rounded bg-slate-800/50 border border-slate-700/60 cursor-pointer sm:col-span-2">
                      <input
                        type="checkbox"
                        checked={amenityTarmac}
                        onChange={(e) => setAmenityTarmac(e.target.checked)}
                        className="rounded border-slate-600 text-amber-500 focus:ring-amber-500"
                      />
                      <span>CIP Lounge Liaison / Tarmac Diplomatic Gate Protocol</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Tablet Placard Preview & Protocol Output (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Live Digital Tablet Placard Mockup */}
                <div className="bg-slate-950 border-4 border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden text-center print:border-slate-800 print:bg-slate-900 print:text-white">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-700 rounded-full"></div>

                  <div className="pt-4 pb-2 border-b border-slate-800">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                      Chauffeur Paging Tablet Placard
                    </span>
                    <p className="text-xs font-semibold text-amber-400 mt-0.5">VICTOR MOBILITY · VIP PROTOCOL</p>
                  </div>

                  <div className="py-8 space-y-3">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Welcome to {currentAirport.city}</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight leading-tight px-2">
                      {guestName || 'GUEST NAME'}
                    </h3>
                    <p className="text-xs font-bold text-slate-300 tracking-wide">
                      {organization || 'ORGANIZATION / FIRM'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 px-2">
                    <span>Flight: <strong className="text-white">{flightNumber || 'FLIGHT'}</strong></span>
                    <span>Bay: <strong className="text-amber-400">{currentAirport.code} T{selectedTerminalIdx + 1}</strong></span>
                  </div>
                </div>

                {/* Staging Summary Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4 print:border-slate-300 print:bg-white print:text-black">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                        Curbside Protocol Blueprint
                      </span>
                      <h4 className="text-base font-bold text-white mt-0.5">{currentTerminal.name}</h4>
                    </div>
                    <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                      Radar Tracked
                    </span>
                  </div>

                  <div className="text-xs space-y-2 text-slate-300">
                    <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                      <span className="font-bold text-amber-400 block mb-1">Designated Pickup Bay:</span>
                      <p className="text-slate-200">{currentTerminal.pickupBay}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                      <span className="font-bold text-slate-300 block mb-1">Curbside Instructions:</span>
                      <p className="text-slate-400">{currentTerminal.curbsideInstructions}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                      <span className="font-bold text-slate-300 block mb-1">Estimated Transit to Commercial Hub:</span>
                      <p className="text-slate-400">{currentTerminal.averageTransitToTechCorridor}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-col gap-2.5">
                    <a
                      href={generateWhatsAppMessage()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-4 py-3 rounded-lg transition shadow-md"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      Dispatch Protocol Brief on WhatsApp
                    </a>
                    <button
                      onClick={handlePrint}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-lg border border-slate-700 transition"
                    >
                      Print Flight Protocol Blueprint
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center">
                    Prefills WhatsApp draft with Victor Mobility airport dispatch. Does not constitute an instant confirmed booking.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab 2: Terminal Staging & Pickup Bays Guide */}
        {activeTab === 'airports' && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-2xl font-bold text-white">Airport Terminal Staging &amp; Curbside Guide</h2>
              <p className="text-sm text-slate-400 mt-1">
                Precision staging bays, parking arrangements, and greeting instructions for commercial terminals and private aviation FBOs.
              </p>
            </div>

            <div className="space-y-8">
              {airports.map((airport) => (
                <div key={airport.code} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 mb-4 gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded">
                          {airport.code}
                        </span>
                        <h3 className="text-xl font-bold text-white">{airport.name}</h3>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Hub City: {airport.city}</p>
                    </div>
                    <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700 w-fit">
                      {airport.terminals.length} Staged Terminal Gateways
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {airport.terminals.map((t, idx) => (
                      <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-4 space-y-2">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                          {t.name}
                        </h4>
                        <div className="text-xs text-slate-300">
                          <strong className="text-slate-400 block text-[11px] uppercase">Meeting &amp; Pickup Bay:</strong>
                          <span className="text-amber-300 font-medium">{t.pickupBay}</span>
                        </div>
                        <div className="text-xs text-slate-300">
                          <strong className="text-slate-400 block text-[11px] uppercase">Curbside Staging Instructions:</strong>
                          <span className="text-slate-400">{t.curbsideInstructions}</span>
                        </div>
                        <div className="text-xs text-slate-400 pt-1 border-t border-slate-800/60">
                          <strong className="text-slate-300">Transit Duration:</strong> {t.averageTransitToTechCorridor}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 3: White-Glove Protocols */}
        {activeTab === 'standards' && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-2xl font-bold text-white">Four Pillars of Airport VIP Protocol</h2>
              <p className="text-sm text-slate-400 mt-1">
                Every airport transfer adheres to our standardized executive greeting and hospitality framework.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {protocolStandards.map((std, idx) => (
                <div key={std.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Protocol Standard 0{idx + 1}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400">
                        {std.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{std.title}</h3>
                    <p className="text-xs text-emerald-400 font-medium mb-3">{std.subtitle}</p>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">{std.description}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-800 text-xs text-amber-300/90 font-medium">
                    Benchmark: <strong className="text-white">{std.metric}</strong>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 4: Fleet Luggage Capacity Matrix */}
        {activeTab === 'fleet' && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-2xl font-bold text-white">Airport Fleet &amp; Baggage Compatibility Matrix</h2>
              <p className="text-sm text-slate-400 mt-1">
                Ensure comfortable passenger legroom and adequate luggage stowage for corporate travelers and visiting delegations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fleetCapacities.map((item) => (
                <div key={item.classId} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="text-base font-bold text-white">{item.className}</h3>
                    <span className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded font-semibold">
                      {item.passengers}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">
                    <strong className="text-slate-300 block text-[11px] uppercase">Representative Fleet Models:</strong>
                    <span>{item.models}</span>
                  </div>
                  <div className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded border border-slate-800">
                    <strong className="text-emerald-400 block text-[11px] uppercase mb-1">Luggage Stowage Capacity:</strong>
                    <span>{item.luggage}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    <strong className="text-slate-300 block text-[11px] uppercase">Cabin Inclusions:</strong>
                    <span>{item.amenities}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 5: Airport FAQs */}
        {activeTab === 'faqs' && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-2xl font-bold text-white">Frequently Asked Questions — Airport Protocol</h2>
              <p className="text-sm text-slate-400 mt-1">
                Essential questions regarding airport arrivals, flight delays, luggage limits, and terminal staging.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-slate-800/50"
                    >
                      <span className="text-sm font-semibold text-white">{faq.question}</span>
                      <svg
                        className={`w-4 h-4 text-amber-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Direct Concierge Contact Box */}
        <section className="mt-12 bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-8 print:border-slate-300 print:bg-white print:text-black">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
              Airport Terminal &amp; Flight Protocol Dispatch Desk
            </span>
            <h3 className="text-2xl font-bold text-white mt-1 mb-3 print:text-black">
              Coordinate Your Next Executive Arrival
            </h3>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed print:text-slate-700">
              Our dedicated airport dispatch operations team coordinates flight telemetry, commercial terminal parking staging, and VIP greetings across {isIndia ? 'Hyderabad RGIA, Bengaluru KIA, and Pune PNQ' : 'Dubai DXB, DWC, and Abu Dhabi AUH'}.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Airport Hotline: <strong className="text-white">{phone}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Operations Desk: <strong className="text-white">{supportHours}</strong></span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-6 py-3 rounded-lg transition shadow-md"
              >
                Dispatch Protocol on WhatsApp
              </a>
              <Link
                href={isIndia ? '/india/contact' : '/uae/contact'}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm px-6 py-3 rounded-lg border border-slate-700 transition"
              >
                Request Corporate Account Setup
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
