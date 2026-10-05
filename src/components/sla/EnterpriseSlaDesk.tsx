'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface SlaPillar {
  id: string;
  title: string;
  target: string;
  metric: string;
  buffer: string;
  description: string;
  remedy: string;
}

export interface EscalationLevel {
  level: string;
  role: string;
  sla: string;
  channel: string;
  scope: string;
}

export interface StatutoryCompliance {
  title: string;
  status: string;
  items: string[];
}

export interface ServiceTier {
  tierId: string;
  name: string;
  targetAudience: string;
  recommendedFleet: string;
  onTimeTarget: string;
  bufferAllocation: string;
  hotSwapTarget: string;
  dedicatedManager: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EnterpriseSlaDeskProps {
  region: 'india' | 'uae';
  title: string;
  eyebrow: string;
  description: string;
  corePillars: SlaPillar[];
  escalationHierarchy: EscalationLevel[];
  statutoryCompliance: StatutoryCompliance[];
  serviceTiers: ServiceTier[];
  faqs: FaqItem[];
  phone: string;
  whatsapp: string;
  supportHours: string;
}

export default function EnterpriseSlaDesk({
  region,
  title,
  eyebrow,
  description,
  corePillars,
  escalationHierarchy,
  statutoryCompliance,
  serviceTiers,
  faqs,
  phone,
  whatsapp,
  supportHours,
}: EnterpriseSlaDeskProps) {
  const isIndia = region === 'india';
  const currencySymbol = isIndia ? '₹' : 'AED ';
  const defaultHub = isIndia ? 'Hyderabad (Head Office)' : 'Dubai (Al Garhoud)';
  const hubs = isIndia
    ? ['Hyderabad (Head Office)', 'Bengaluru Tech Corridor', 'Pune Automotive Hub']
    : ['Dubai (Al Garhoud Central)', 'Abu Dhabi Commercial Hub', 'Sharjah & Northern Emirates'];

  // State management
  const [activeTab, setActiveTab] = useState<'pillars' | 'calculator' | 'escalation' | 'compliance' | 'faqs'>('pillars');
  const [selectedTier, setSelectedTier] = useState<string>(serviceTiers[0]?.tierId || 'executive');
  const [selectedHub, setSelectedHub] = useState<string>(defaultHub);
  const [tripVolume, setTripVolume] = useState<number>(150);
  const [dedicatedFleet, setDedicatedFleet] = useState<number>(6);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const currentTierObj = serviceTiers.find((t) => t.tierId === selectedTier) || serviceTiers[0];

  // Dynamic calculations based on tier & volume
  const standbyVehicles = Math.max(1, Math.ceil(dedicatedFleet * 0.15));
  const groundMarshals = tripVolume > 300 ? Math.ceil(tripVolume / 150) : 1;
  const auditFrequency = tripVolume > 500 ? 'Bi-Weekly Telematics Audit' : 'Monthly Consolidated Review';

  // Handle WhatsApp Inquiry Generation
  const generateWhatsAppMessage = () => {
    const rawNumber = whatsapp.replace(/[^0-9]/g, '');
    const text = [
      `*Enterprise SLA & Procurement Inquiry — Victor Mobility (${isIndia ? 'India' : 'UAE'})*`,
      `Service Tier: ${currentTierObj.name}`,
      `Operational Hub: ${selectedHub}`,
      `Monthly Trip Volume: ${tripVolume} trips`,
      `Dedicated Fleet Size: ${dedicatedFleet} vehicles`,
      `Target On-Time SLA: ${currentTierObj.onTimeTarget}`,
      `Standby Fleet Buffer: ${standbyVehicles} reserve vehicles`,
      `Emergency Hot-Swap SLA: ${currentTierObj.hotSwapTarget}`,
      '',
      'Please provide your corporate contract terms, GST/VAT billing framework, and an official SLA schedule for our vendor onboarding review.',
      '',
      '_Note: This WhatsApp message initiates an enterprise SLA discussion with Victor Mobility and does not constitute a signed agreement._',
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
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">On-Time Target</span>
              <span className="text-2xl font-bold text-amber-400 print:text-black">99.4% – 99.8%</span>
              <span className="text-xs text-slate-500 block mt-1">GPS Telematics Verified</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Breakdown Hot-Swap</span>
              <span className="text-2xl font-bold text-emerald-400 print:text-black">&lt; 20 Mins</span>
              <span className="text-xs text-slate-500 block mt-1">Guaranteed Replacement</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Chauffeur Sobriety</span>
              <span className="text-2xl font-bold text-cyan-400 print:text-black">0.00% BAC</span>
              <span className="text-xs text-slate-500 block mt-1">Pre-Shift Digital Log</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Credit Terms</span>
              <span className="text-2xl font-bold text-amber-400 print:text-black">30-Day Net</span>
              <span className="text-xs text-slate-500 block mt-1">Consolidated GST/VAT</span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs (Hidden in Print) */}
      <div className="sticky top-16 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 print:hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar py-2">
          <nav className="flex space-x-2" aria-label="SLA Sections">
            <button
              onClick={() => setActiveTab('pillars')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'pillars'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Core SLA Commitments
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'calculator'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Interactive SLA & Fleet Calculator
            </button>
            <button
              onClick={() => setActiveTab('escalation')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'escalation'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Escalation Matrix
            </button>
            <button
              onClick={() => setActiveTab('compliance')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'compliance'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Statutory Compliance Vault
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'faqs'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Procurement FAQs
            </button>
          </nav>

          <div className="flex items-center gap-2 pl-4">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded border border-slate-700 transition"
              title="Print Official SLA Dossier"
            >
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print SLA Dossier
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 print:py-4">
        {/* Tab 1: Core SLA Commitments */}
        {(activeTab === 'pillars' || typeof window === 'undefined') && (
          <section className="mb-12 print:block">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white print:text-black">Five Pillars of Operational Reliability</h2>
                <p className="text-sm text-slate-400 mt-1 print:text-slate-600">
                  Every metric is contractually backed with automated logging, contingency protocols, and fee waiver remedies.
                </p>
              </div>
              <span className="mt-2 sm:mt-0 text-xs text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/60 print:hidden">
                100% Audit Tracked
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {corePillars.map((pillar, idx) => (
                <div
                  key={pillar.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition shadow-lg print:border-slate-300 print:bg-white print:text-black"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Pillar 0{idx + 1}
                      </span>
                      <span className="text-lg font-extrabold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 print:text-black print:border-slate-300">
                        {pillar.target}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1 print:text-black">{pillar.title}</h3>
                    <p className="text-xs text-emerald-400 font-medium mb-3 print:text-slate-700">{pillar.metric}</p>
                    <p className="text-sm text-slate-300 mb-4 leading-relaxed print:text-slate-700">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 print:border-slate-200">
                    <div className="text-xs text-slate-400 mb-1">
                      <span className="font-semibold text-slate-300">Buffer Protocol:</span> {pillar.buffer}
                    </div>
                    <div className="text-xs text-amber-300/90 print:text-slate-800">
                      <span className="font-semibold text-amber-400">Remedy / Penalty:</span> {pillar.remedy}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 2: Interactive SLA & Fleet Calculator */}
        {activeTab === 'calculator' && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-2xl font-bold text-white">Interactive Enterprise SLA & Fleet Matrix</h2>
              <p className="text-sm text-slate-400 mt-1">
                Configure your transit volume, operating hub, and service tier to inspect contractual commitments and generate an enterprise SLA dossier.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Configuration Controls (Left 5 Cols) */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    1. Select Service Tier
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {serviceTiers.map((tier) => (
                      <button
                        key={tier.tierId}
                        onClick={() => setSelectedTier(tier.tierId)}
                        className={`text-left p-3 rounded-lg border text-xs transition ${
                          selectedTier === tier.tierId
                            ? 'bg-amber-500/15 border-amber-500 text-white font-semibold'
                            : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="font-bold text-sm text-white mb-0.5">{tier.name}</div>
                        <div className="text-slate-400 line-clamp-1">{tier.recommendedFleet}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    2. Primary Operating Hub
                  </label>
                  <select
                    value={selectedHub}
                    onChange={(e) => setSelectedHub(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    {hubs.map((hub) => (
                      <option key={hub} value={hub}>
                        {hub}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      3. Estimated Monthly Trips
                    </label>
                    <span className="text-sm font-bold text-amber-400">{tripVolume} trips / month</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={tripVolume}
                    onChange={(e) => setTripVolume(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>10 (Executive)</span>
                    <span>250 (Mid-Size)</span>
                    <span>500 (Campus)</span>
                    <span>1000+ (Enterprise)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      4. Dedicated Fleet Allocation
                    </label>
                    <span className="text-sm font-bold text-amber-400">{dedicatedFleet} vehicles</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={dedicatedFleet}
                    onChange={(e) => setDedicatedFleet(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>1 vehicle</span>
                    <span>15 vehicles</span>
                    <span>30 vehicles</span>
                    <span>50+ vehicles</span>
                  </div>
                </div>
              </div>

              {/* Dynamic SLA Matrix Output (Right 7 Cols) */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Calculated SLA Blueprint
                    </span>
                    <h3 className="text-xl font-bold text-white mt-0.5">{currentTierObj.name}</h3>
                  </div>
                  <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded">
                    Active Benchmark
                  </span>
                </div>

                {/* Key Commitments Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <span className="text-xs text-slate-400 font-medium">On-Time Departure SLA</span>
                    <p className="text-2xl font-black text-amber-400 mt-1">{currentTierObj.onTimeTarget}</p>
                    <p className="text-xs text-slate-400 mt-1">With 45-min pre-staging buffer</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <span className="text-xs text-slate-400 font-medium">Emergency Hot-Swap Time</span>
                    <p className="text-2xl font-black text-emerald-400 mt-1">{currentTierObj.hotSwapTarget}</p>
                    <p className="text-xs text-slate-400 mt-1">Dispatched from nearest staging hub</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <span className="text-xs text-slate-400 font-medium">Dedicated Standby Buffer</span>
                    <p className="text-2xl font-black text-cyan-400 mt-1">+{standbyVehicles} Backup Vehicles</p>
                    <p className="text-xs text-slate-400 mt-1">15% reserve ratio maintained on-duty</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <span className="text-xs text-slate-400 font-medium">On-Site Supervision</span>
                    <p className="text-2xl font-black text-white mt-1">{groundMarshals} Ground Marshal(s)</p>
                    <p className="text-xs text-slate-400 mt-1">{currentTierObj.dedicatedManager}</p>
                  </div>
                </div>

                {/* Detailed SLA Terms Box */}
                <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 text-xs space-y-2 text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Target Audience:</span>
                    <span className="font-medium text-white text-right">{currentTierObj.targetAudience}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Recommended Fleet Class:</span>
                    <span className="font-medium text-white text-right">{currentTierObj.recommendedFleet}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Audit & Governance Cadence:</span>
                    <span className="font-medium text-amber-300 text-right">{auditFrequency}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Billing Reconciliation:</span>
                    <span className="font-medium text-emerald-300 text-right">30-day net credit with digital trip logs</span>
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
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    Discuss SLA on WhatsApp
                  </a>
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-lg border border-slate-700 transition"
                  >
                    Print Calculated SLA Dossier
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 text-center">
                  Inquiry opens prefilled WhatsApp draft with Victor Mobility central operations. Does not constitute a binding booking or contract.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Tab 3: Escalation Hierarchy */}
        {activeTab === 'escalation' && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-2xl font-bold text-white">4-Tier Operational Escalation Hierarchy</h2>
              <p className="text-sm text-slate-400 mt-1">
                Transparent chain of accountability ensuring real-time incident resolution and direct executive oversight.
              </p>
            </div>

            <div className="space-y-4">
              {escalationHierarchy.map((level, idx) => (
                <div
                  key={level.level}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm shrink-0">
                      0{idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase font-bold tracking-wider text-amber-400">{level.level}</span>
                        <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                          Response: {level.sla}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mt-1">{level.role}</h3>
                      <p className="text-xs text-slate-400 mt-1">{level.scope}</p>
                    </div>
                  </div>

                  <div className="bg-slate-950/60 border border-slate-800 px-4 py-2.5 rounded-lg text-xs text-slate-300 md:text-right shrink-0">
                    <span className="block text-[11px] uppercase tracking-wider text-slate-400">Communication Channel</span>
                    <span className="font-semibold text-white">{level.channel}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 4: Statutory Compliance Vault */}
        {activeTab === 'compliance' && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-2xl font-bold text-white">Statutory & Regulatory Compliance Vault</h2>
              <p className="text-sm text-slate-400 mt-1">
                Verified commercial licenses, tax registrations, passenger liability insurance, and labor law compliance across {isIndia ? 'India (Hyderabad, Bengaluru, Pune)' : 'UAE (Dubai RTA)'}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {statutoryCompliance.map((comp) => (
                <div key={comp.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                    <h3 className="text-base font-bold text-white">{comp.title}</h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      {comp.status}
                    </span>
                  </div>
                  <ul className="space-y-2.5">
                    {comp.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <svg className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white">Need Certified Notarized Vendor Documents?</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Request our consolidated vendor onboarding package including GST certificates, insurance endorsements, and audited accounts.
                </p>
              </div>
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 text-xs font-semibold rounded-lg border border-slate-700 transition shrink-0"
              >
                Request Vendor Pack via WhatsApp
              </a>
            </div>
          </section>
        )}

        {/* Tab 5: Corporate FAQs */}
        {activeTab === 'faqs' && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-2xl font-bold text-white">Enterprise Procurement & SLA Questions</h2>
              <p className="text-sm text-slate-400 mt-1">
                Frequently asked contractual, billing, and operational questions for vendor onboarding.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition"
                  >
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

        {/* Procurement Direct Contact Section */}
        <section className="mt-12 bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-8 print:border-slate-300 print:bg-white print:text-black">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
              Corporate Vendor Onboarding & Enterprise Contracts
            </span>
            <h3 className="text-2xl font-bold text-white mt-1 mb-3 print:text-black">
              Formalize Your SLA with Victor Mobility
            </h3>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed print:text-slate-700">
              Our enterprise mobility team partners with procurement directors, HR leaders, and facilities heads to configure custom multi-city transit agreements with audited SLA thresholds, transparent GST/VAT invoicing, and 24/7 dedicated dispatch desks.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Direct Hotline: <strong className="text-white">{phone}</strong></span>
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
                Initiate Contract Review on WhatsApp
              </a>
              <Link
                href={isIndia ? '/india/contact' : '/uae/contact'}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm px-6 py-3 rounded-lg border border-slate-700 transition"
              >
                Submit Procurement RFP
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
