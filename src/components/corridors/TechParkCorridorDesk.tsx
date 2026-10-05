'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface TechHub {
  id: string;
  name: string;
  parks: string[];
  transitTime: string;
  peakWindows: string;
  gateProtocol: string;
  recommendedFleet: string;
  corridorRoute: string;
}

export interface CityCorridor {
  id: string;
  name: string;
  tagline: string;
  hubs: TechHub[];
}

export interface ShiftModel {
  modelId: string;
  name: string;
  timings: string;
  description: string;
  fleetRecommendation: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TechParkCorridorDeskProps {
  region: 'india' | 'uae';
  title: string;
  eyebrow: string;
  description: string;
  cities: CityCorridor[];
  shiftModels: ShiftModel[];
  faqs: FaqItem[];
  phone: string;
  whatsapp: string;
  supportHours: string;
}

export default function TechParkCorridorDesk({
  region,
  title,
  eyebrow,
  description,
  cities,
  shiftModels,
  faqs,
  phone,
  whatsapp,
  supportHours,
}: TechParkCorridorDeskProps) {
  const isIndia = region === 'india';

  // City selection
  const [selectedCityId, setSelectedCityId] = useState<string>(cities[0]?.id || 'hyderabad');
  const currentCity = cities.find((c) => c.id === selectedCityId) || cities[0];

  // Hub selection within city
  const [selectedHubId, setSelectedHubId] = useState<string>(currentCity.hubs[0]?.id || 'hitec-city');
  const currentHub = currentCity.hubs.find((h) => h.id === selectedHubId) || currentCity.hubs[0];

  // Shift model selection
  const [selectedShiftId, setSelectedShiftId] = useState<string>(shiftModels[0]?.modelId || 'general-day');
  const currentShift = shiftModels.find((s) => s.modelId === selectedShiftId) || shiftModels[0];

  // Employee volume slider
  const [headcount, setHeadcount] = useState<number>(300);

  // Tabs
  const [activeTab, setActiveTab] = useState<'planner' | 'explorer' | 'shifts' | 'faqs'>('planner');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Dynamic Fleet Calculation
  const coachCapacity = 44;
  const shuttleCapacity = 22;

  // Mix calculation
  const totalCoaches = Math.max(1, Math.floor(headcount / coachCapacity));
  const remainder = headcount % coachCapacity;
  const totalShuttles = remainder > 0 ? Math.ceil(remainder / shuttleCapacity) : 0;
  const standbyVehicles = Math.max(1, Math.ceil((totalCoaches + totalShuttles) * 0.15));
  const estimatedRoutes = Math.max(2, Math.ceil(headcount / 60));

  // WhatsApp Inquiry Generator
  const generateWhatsAppMessage = () => {
    const rawNumber = whatsapp.replace(/[^0-9]/g, '');
    const text = [
      `*Tech Park Corridor Transit Inquiry — Victor Mobility (${isIndia ? 'India' : 'UAE'})*`,
      `City Hub: ${currentCity.name}`,
      `Tech Park / Corridor: ${currentHub.name}`,
      `Shift Model: ${currentShift.name} (${currentShift.timings})`,
      `Estimated Employee Headcount: ${headcount} employees`,
      `Recommended Fleet Allocation: ${totalCoaches}x 44-Seater Coaches + ${totalShuttles}x 22-Seater Shuttles (+${standbyVehicles} Standby Buffer)`,
      `Planned Nodal Routes: ~${estimatedRoutes} corridor loops`,
      `Security Protocol: ${currentHub.gateProtocol}`,
      '',
      'Please send a formal corridor transit route feasibility study, per-seat pricing schedule, and trial corridor proposal.',
      '',
      '_Note: This WhatsApp message initiates an enterprise corridor commute inquiry with Victor Mobility and does not constitute a signed contract._',
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
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Punctuality SLA</span>
              <span className="text-2xl font-bold text-amber-400 print:text-black">99.4% On-Time</span>
              <span className="text-xs text-slate-500 block mt-1">Geo-Fence Tracked</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Gate Access</span>
              <span className="text-2xl font-bold text-emerald-400 print:text-black">RFID Commercial</span>
              <span className="text-xs text-slate-500 block mt-1">Pre-Authorized Access</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Women Safety</span>
              <span className="text-2xl font-bold text-cyan-400 print:text-black">Escort Badged</span>
              <span className="text-xs text-slate-500 block mt-1">Doorstep Visual Handshake</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Fleet Standards</span>
              <span className="text-2xl font-bold text-amber-400 print:text-black">22 &amp; 44 Seater</span>
              <span className="text-xs text-slate-500 block mt-1">Air-Suspension Coaches</span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs (Hidden in Print) */}
      <div className="sticky top-16 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 print:hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar py-2">
          <nav className="flex space-x-2" aria-label="Corridor Sections">
            <button
              onClick={() => setActiveTab('planner')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'planner'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Corridor Commute Planner
            </button>
            <button
              onClick={() => setActiveTab('explorer')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'explorer'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Tech Park Transit Profiles
            </button>
            <button
              onClick={() => setActiveTab('shifts')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'shifts'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Shift Roster Models
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'faqs'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Corridor FAQs
            </button>
          </nav>

          <div className="flex items-center gap-2 pl-4">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded border border-slate-700 transition"
              title="Print Tech Park Blueprint"
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
        {/* Tab 1: Interactive Corridor Planner */}
        {(activeTab === 'planner' || typeof window === 'undefined') && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-2xl font-bold text-white print:text-black">
                Interactive Tech Park Corridor &amp; Fleet Planner
              </h2>
              <p className="text-sm text-slate-400 mt-1 print:text-slate-600">
                Configure your destination tech park, shift schedule, and employee headcount to calculate optimal shuttle fleet sizing and corridor routing.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Controls (5 Cols) */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6 print:border-slate-300 print:bg-white print:text-black">
                {/* 1. Hub City */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    1. Select Operating City Hub
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {cities.map((city) => (
                      <button
                        key={city.id}
                        onClick={() => {
                          setSelectedCityId(city.id);
                          setSelectedHubId(city.hubs[0]?.id || '');
                        }}
                        className={`p-3 rounded-lg border text-center transition ${
                          selectedCityId === city.id
                            ? 'bg-amber-500/15 border-amber-500 text-white font-bold'
                            : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className="block text-sm font-bold text-white">{city.name}</span>
                        <span className="block text-[10px] text-slate-400 truncate">{city.hubs.length} Corridors</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Tech Park Corridor */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    2. Select Destination Tech Park / SEZ
                  </label>
                  <select
                    value={selectedHubId}
                    onChange={(e) => setSelectedHubId(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    {currentCity.hubs.map((hub) => (
                      <option key={hub.id} value={hub.id}>
                        {hub.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Shift Model */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    3. Select Shift Roster Window
                  </label>
                  <div className="space-y-2">
                    {shiftModels.map((shift) => (
                      <button
                        key={shift.modelId}
                        onClick={() => setSelectedShiftId(shift.modelId)}
                        className={`w-full text-left p-2.5 rounded-lg border text-xs transition ${
                          selectedShiftId === shift.modelId
                            ? 'bg-amber-500/15 border-amber-500 text-white font-semibold'
                            : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="font-bold text-white mb-0.5">{shift.name}</div>
                        <div className="text-[11px] text-amber-400">{shift.timings}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Employee Volume Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      4. Commuting Employees
                    </label>
                    <span className="text-sm font-bold text-amber-400">{headcount} employees</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1500"
                    step="25"
                    value={headcount}
                    onChange={(e) => setHeadcount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>50 (Pilot)</span>
                    <span>300 (Mid-Size)</span>
                    <span>750 (Campus)</span>
                    <span>1,500+ (MNC)</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Blueprint Output (7 Cols) */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6 print:border-slate-300 print:bg-white print:text-black">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Calculated Corridor Blueprint
                    </span>
                    <h3 className="text-xl font-bold text-white mt-0.5">{currentHub.name}</h3>
                  </div>
                  <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded">
                    Active Blueprint
                  </span>
                </div>

                {/* Fleet Sizing Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <span className="text-xs text-slate-400 font-medium">44-Seater Coaches</span>
                    <p className="text-2xl font-black text-amber-400 mt-1">{totalCoaches} Buses</p>
                    <p className="text-xs text-slate-400 mt-1">Main arterial trunk line</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <span className="text-xs text-slate-400 font-medium">22-Seater Shuttles</span>
                    <p className="text-2xl font-black text-cyan-400 mt-1">{totalShuttles} Shuttles</p>
                    <p className="text-xs text-slate-400 mt-1">Suburban feeder feeds</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <span className="text-xs text-slate-400 font-medium">Standby Buffer</span>
                    <p className="text-2xl font-black text-emerald-400 mt-1">+{standbyVehicles} Backup</p>
                    <p className="text-xs text-slate-400 mt-1">Staged at depot hot-swap</p>
                  </div>
                </div>

                {/* Corridor Operational Profile */}
                <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 text-xs space-y-2.5 text-slate-300">
                  <div>
                    <strong className="text-amber-400 block uppercase text-[11px] mb-0.5">Primary Corridor Arterial:</strong>
                    <span className="text-slate-200">{currentHub.corridorRoute}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800/60">
                    <div>
                      <strong className="text-slate-400 block uppercase text-[10px]">Peak Congestion Window:</strong>
                      <span className="text-white">{currentHub.peakWindows}</span>
                    </div>
                    <div>
                      <strong className="text-slate-400 block uppercase text-[10px]">Average Transit Duration:</strong>
                      <span className="text-white">{currentHub.transitTime}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-800/60">
                    <strong className="text-slate-400 block uppercase text-[10px]">Tech Park Gate Entry Protocol:</strong>
                    <span className="text-emerald-400">{currentHub.gateProtocol}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800/60">
                    <strong className="text-slate-400 block uppercase text-[10px]">Covered Campuses &amp; SEZs:</strong>
                    <span className="text-slate-300">{currentHub.parks.join(' · ')}</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-4 py-3 rounded-lg transition shadow-md"
                  >
                    Request Corridor Proposal on WhatsApp
                  </a>
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-lg border border-slate-700 transition"
                  >
                    Print Corridor Blueprint
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 text-center">
                  Prefills WhatsApp inquiry with Victor Mobility transit team. Does not constitute an instant confirmed booking.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Tab 2: Tech Park Transit Profiles */}
        {activeTab === 'explorer' && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-2xl font-bold text-white">Commercial Tech Park &amp; Corridor Profiles</h2>
              <p className="text-sm text-slate-400 mt-1">
                Explore dedicated transit maps, gate pass requirements, and peak congestion buffers across our operating hubs.
              </p>
            </div>

            <div className="space-y-8">
              {cities.map((city) => (
                <div key={city.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{city.name}</h3>
                      <p className="text-xs text-amber-400 mt-0.5">{city.tagline}</p>
                    </div>
                    <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                      {city.hubs.length} Active Corridors
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {city.hubs.map((hub) => (
                      <div key={hub.id} className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-4 space-y-2">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                          {hub.name}
                        </h4>
                        <p className="text-xs text-slate-400">
                          <strong>Parks:</strong> {hub.parks.join(', ')}
                        </p>
                        <div className="text-xs text-slate-300">
                          <strong className="text-slate-400 block text-[11px] uppercase">Route Corridor:</strong>
                          <span className="text-slate-300">{hub.corridorRoute}</span>
                        </div>
                        <div className="text-xs text-slate-400 pt-1 border-t border-slate-800/60">
                          <strong className="text-emerald-400">Gate Protocol:</strong> {hub.gateProtocol}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 3: Shift Roster Models */}
        {activeTab === 'shifts' && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-2xl font-bold text-white">Three Enterprise Shift Commute Models</h2>
              <p className="text-sm text-slate-400 mt-1">
                Customized floor timing synchronization designed for MNC tech campuses, global capability centers (GCCs), and BPO operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {shiftModels.map((shift, idx) => (
                <div key={shift.modelId} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Model 0{idx + 1}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400">
                        {shift.timings}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{shift.name}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">{shift.description}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-800 text-xs text-emerald-400 font-medium">
                    Fleet Allocation: <strong className="text-slate-200 block mt-0.5">{shift.fleetRecommendation}</strong>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 4: Corridor FAQs */}
        {activeTab === 'faqs' && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-2xl font-bold text-white">Frequently Asked Questions — Tech Park Transit</h2>
              <p className="text-sm text-slate-400 mt-1">
                Common questions on corridor route mapping, nodal stops, traffic management, and women passenger safety.
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

        {/* Corporate Facilities Contact Box */}
        <section className="mt-12 bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-8 print:border-slate-300 print:bg-white print:text-black">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
              Enterprise Corridor Transit Desk
            </span>
            <h3 className="text-2xl font-bold text-white mt-1 mb-3 print:text-black">
              Launch a Dedicated Corridor Shuttle Network
            </h3>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed print:text-slate-700">
              Our facilities transit team will survey your employee residential distribution, map high-occupancy nodal corridors, configure GPS telematics manifests, and deploy air-conditioned coaches backed by our 99.4% On-Time SLA.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Transit Hotline: <strong className="text-white">{phone}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Operations Control: <strong className="text-white">{supportHours}</strong></span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-6 py-3 rounded-lg transition shadow-md"
              >
                Request Corridor Route Study on WhatsApp
              </a>
              <Link
                href={isIndia ? '/india/rfp' : '/uae/rfp'}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm px-6 py-3 rounded-lg border border-slate-700 transition"
              >
                Submit Corporate Commute RFP
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
