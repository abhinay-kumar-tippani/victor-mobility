'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface ShiftInfo {
  id: string;
  name: string;
  login: string;
  logout: string;
  commuteType: string;
  routingStrategy: string;
  avgTravelTime: string;
  occupancyTarget: string;
}

export interface StopInfo {
  stopNo: number;
  location: string;
  scheduledTime: string;
  boardings: number;
  status: string;
}

export interface RosterManifest {
  rosterId: string;
  city: string;
  corridor: string;
  shift: string;
  vehicleType: string;
  plateNumber: string;
  chauffeur: string;
  supervisor: string;
  capacity: number;
  bookedSeats: number;
  occupancyRate: string;
  stops: StopInfo[];
}

export interface OptimizationRule {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EmployeeShiftRosterDeskProps {
  region: 'india' | 'uae';
  title: string;
  eyebrow: string;
  description: string;
  shifts: ShiftInfo[];
  sampleManifests: RosterManifest[];
  optimizationRules: OptimizationRule[];
  faqs: FaqItem[];
  phone: string;
  whatsapp: string;
  supportHours: string;
}

export default function EmployeeShiftRosterDesk({
  region,
  title,
  eyebrow,
  description,
  shifts,
  sampleManifests,
  optimizationRules,
  faqs,
  phone,
  whatsapp,
  supportHours,
}: EmployeeShiftRosterDeskProps) {
  const isIndia = region === 'india';

  // State
  const [selectedManifestId, setSelectedManifestId] = useState<string>(sampleManifests[0]?.rosterId || '');
  const currentManifest = sampleManifests.find((m) => m.rosterId === selectedManifestId) || sampleManifests[0];

  // Active view tab
  const [activeTab, setActiveTab] = useState<'manifest' | 'shifts' | 'optimization' | 'faqs'>('manifest');

  // WhatsApp Inquiry Generator
  const generateWhatsAppMessage = () => {
    const rawNumber = whatsapp.replace(/[^0-9]/g, '');
    const text = [
      `*Employee Shift Roster & Route Optimization Inquiry — Victor Mobility (${isIndia ? 'India' : 'UAE'})*`,
      `Corridor Route: ${currentManifest.corridor}`,
      `Shift Schedule: ${currentManifest.shift}`,
      `Vehicle Fleet: ${currentManifest.vehicleType}`,
      `Target Occupancy: ${currentManifest.occupancyRate} (${currentManifest.bookedSeats}/${currentManifest.capacity} seats)`,
      '',
      'Please provide our corporate transport operations desk with a formal route feasibility study, nodal stop mapping, and per-employee tariff schedule.',
      '',
      '_Note: This WhatsApp message initiates an enterprise route study inquiry with Victor Mobility and does not constitute a signed contract._',
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4 print:text-slate-800 print:border-slate-300">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse print:hidden"></span>
            {eyebrow}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 print:text-black">
            {title}
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed mb-8 print:text-slate-700">
            {description}
          </p>

          {/* Key Operations SLA Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800 print:border-slate-300">
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Punctuality SLA</span>
              <span className="text-2xl font-bold text-indigo-400 print:text-black">99.4%</span>
              <span className="text-xs text-slate-500 block mt-1">Campus Gate Arrival</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Commute Window</span>
              <span className="text-2xl font-bold text-amber-400 print:text-black">&le; 45 Mins</span>
              <span className="text-xs text-slate-500 block mt-1">Max Travel Guarantee</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Night Escort</span>
              <span className="text-2xl font-bold text-emerald-400 print:text-black">100% Drops</span>
              <span className="text-xs text-slate-500 block mt-1">Doorstep Handshake</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Occupancy Rate</span>
              <span className="text-2xl font-bold text-cyan-400 print:text-black">92.8% Avg</span>
              <span className="text-xs text-slate-500 block mt-1">Nodal Route Efficiency</span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs (Hidden in Print) */}
      <div className="sticky top-16 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 print:hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar py-2">
          <nav className="flex space-x-2" aria-label="Roster Desk Navigation">
            <button
              onClick={() => setActiveTab('manifest')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'manifest'
                  ? 'bg-indigo-500 text-white font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Live Roster Manifests
            </button>
            <button
              onClick={() => setActiveTab('shifts')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'shifts'
                  ? 'bg-indigo-500 text-white font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Shift Commute Models
            </button>
            <button
              onClick={() => setActiveTab('optimization')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'optimization'
                  ? 'bg-indigo-500 text-white font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Nodal Optimization Rules
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'faqs'
                  ? 'bg-indigo-500 text-white font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Roster FAQs
            </button>
          </nav>

          <div className="flex items-center gap-2 pl-4">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded border border-slate-700 transition"
              title="Print Roster Manifest"
            >
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Manifest
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 print:py-4">
        {/* Tab 1: Live Roster Manifests */}
        {(activeTab === 'manifest' || typeof window === 'undefined') && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6 print:border-slate-300">
              <h2 className="text-2xl font-bold text-white print:text-black">
                Shift Roster Dispatch Manifests
              </h2>
              <p className="text-sm text-slate-400 mt-1 print:text-slate-600">
                Inspect authentic digital route manifests showing nodal pickup stops, scheduled boarding windows, passenger capacities, and live tracking telemetry.
              </p>
            </div>

            {/* Manifest Selector Chips */}
            <div className="flex flex-wrap gap-2 mb-8 print:hidden">
              {sampleManifests.map((manifest) => (
                <button
                  key={manifest.rosterId}
                  onClick={() => setSelectedManifestId(manifest.rosterId)}
                  className={`px-4 py-2.5 rounded-lg border text-xs font-bold transition flex items-center gap-2 ${
                    selectedManifestId === manifest.rosterId
                      ? 'bg-indigo-500/20 border-indigo-500 text-white shadow-lg'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                  <span>{manifest.rosterId}</span>
                  <span className="text-[10px] text-slate-400">({manifest.city} · {manifest.capacity} Seats)</span>
                </button>
              ))}
            </div>

            {/* Selected Manifest Detail Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl print:border-slate-300 print:bg-white print:text-black mb-8">
              {/* Manifest Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 print:border-slate-300 gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-indigo-400">
                    Active Shift Route Manifest
                  </span>
                  <h3 className="text-2xl font-bold text-white print:text-black mt-1">
                    {currentManifest.rosterId} — {currentManifest.corridor}
                  </h3>
                  <p className="text-xs text-slate-300 print:text-slate-600 mt-1">
                    <strong>Shift Model:</strong> {currentManifest.shift} · <span className="text-indigo-400">{currentManifest.vehicleType}</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    <strong>Vehicle Plate:</strong> <span className="font-mono text-white print:text-black">{currentManifest.plateNumber}</span> · <strong>Chauffeur:</strong> {currentManifest.chauffeur} · <strong>Supervisor:</strong> {currentManifest.supervisor}
                  </p>
                </div>
                <div className="bg-slate-950/70 border border-slate-800/80 p-4 rounded-lg text-left sm:text-right print:bg-slate-50 print:border-slate-300">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Occupancy Rate</span>
                  <span className="text-2xl font-black text-indigo-400 print:text-black">{currentManifest.occupancyRate}</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">{currentManifest.bookedSeats} / {currentManifest.capacity} Confirmed Seats</span>
                </div>
              </div>

              {/* Nodal Stops Sequence Table */}
              <div className="pt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                  Scheduled Nodal Pickup Stops &amp; ETA Telemetry
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300 print:text-slate-700">
                    <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] print:bg-slate-100 print:border-slate-300">
                      <tr>
                        <th className="py-3 px-3">Stop #</th>
                        <th className="py-3 px-4">Nodal Location</th>
                        <th className="py-3 px-4">Scheduled Time</th>
                        <th className="py-3 px-4">Passenger Movement</th>
                        <th className="py-3 px-4">Live Dispatch Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 print:divide-slate-200">
                      {currentManifest.stops.map((stop) => (
                        <tr key={stop.stopNo} className="hover:bg-slate-800/30 transition">
                          <td className="py-3 px-3 font-mono font-bold text-indigo-400">
                            Stop 0{stop.stopNo}
                          </td>
                          <td className="py-3 px-4 font-semibold text-white print:text-black">
                            {stop.location}
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-300">
                            {stop.scheduledTime}
                          </td>
                          <td className="py-3 px-4">
                            {stop.boardings > 0 ? (
                              <span className="text-emerald-400 font-bold">+{stop.boardings} Boarding</span>
                            ) : stop.boardings < 0 ? (
                              <span className="text-amber-400 font-bold">{stop.boardings} Alighting</span>
                            ) : (
                              <span className="text-slate-500 font-medium">Campus Drop</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                              stop.status === 'On Time' || stop.status === 'Campus Departure'
                                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                                : stop.status === 'Visual Handshake'
                                ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                                : 'bg-indigo-500/10 border border-indigo-500/30 text-indigo-400'
                            }`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                              {stop.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-6 border-t border-slate-800 print:hidden">
                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-lg transition shadow-lg shadow-indigo-600/20"
                >
                  Request Route Optimization Study on WhatsApp
                </a>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-lg border border-slate-700 transition"
                >
                  Print Selected Manifest Dossier
                </button>
              </div>
              <p className="text-[11px] text-slate-500 text-center mt-3 print:hidden">
                Prefills WhatsApp corporate inquiry with Victor Mobility route planning team. Standard NDA terms apply.
              </p>
            </div>
          </section>
        )}

        {/* Tab 2: Shift Commute Models */}
        {activeTab === 'shifts' && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-2xl font-bold text-white">Enterprise Shift Commute Synchronization</h2>
              <p className="text-sm text-slate-400 mt-1">
                Synchronized shift frameworks configured for tech campuses, global delivery centers (GCCs), and BPO operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {shifts.map((shift) => (
                <div key={shift.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="text-lg font-bold text-white">{shift.name}</h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                      {shift.login} &rarr; {shift.logout}
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Fleet Allocation:</span>
                      <strong className="text-white">{shift.commuteType}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Routing Strategy:</span>
                      <strong className="text-indigo-400">{shift.routingStrategy}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Average Transit Duration:</span>
                      <strong className="text-amber-400">{shift.avgTravelTime}</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Occupancy Target:</span>
                      <strong className="text-emerald-400">{shift.occupancyTarget}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 3: Nodal Optimization Rules */}
        {activeTab === 'optimization' && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-2xl font-bold text-white">Nodal Routing &amp; Travel Optimization Architecture</h2>
              <p className="text-sm text-slate-400 mt-1">
                Our mathematical routing algorithms balance travel time, seating capacity, highway tolls, and passenger security.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {optimizationRules.map((rule, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Rule 0{idx + 1}</span>
                  <h3 className="text-lg font-bold text-white">{rule.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{rule.description}</p>
                </div>
              ))}
            </div>

            {/* Nodal vs Doorstep Comparison Matrix */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Nodal Staging vs. Doorstep Commute Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-indigo-400 uppercase">Nodal Transit Loops</h4>
                    <span className="text-xs text-emerald-400 font-bold">35% Cost Reduction</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400">•</span>
                      <span>High-occupancy 44-seater luxury coaches along major arterial corridors.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400">•</span>
                      <span>Pickups centralized at Metro stations and gated community main gates.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400">•</span>
                      <span>Predictable schedule with reduced stop-and-go highway delays.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-amber-400 uppercase">Doorstep Escort Drops</h4>
                    <span className="text-xs text-cyan-400 font-bold">Maximum Security</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400">•</span>
                      <span>Executive MPVs and sedans delivering point-to-point residential drops.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400">•</span>
                      <span>Mandatory for female employees during night shift drops (20:00 to 06:00).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400">•</span>
                      <span>Chauffeur remains stationary until visual indoor entrance is confirmed.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab 4: Roster FAQs */}
        {activeTab === 'faqs' && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-2xl font-bold text-white">Frequently Asked Questions — Shift Rosters</h2>
              <p className="text-sm text-slate-400 mt-1">
                Common operational questions on shift swaps, HRMS API synchronization, and employee live tracking.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="text-indigo-400 font-bold">Q:</span> {faq.question}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed pl-5">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
