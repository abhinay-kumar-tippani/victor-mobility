'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface AuditCheck {
  item: string;
  spec: string;
  status: string;
}

export interface AuditCategory {
  id: string;
  name: string;
  icon: string;
  checks: AuditCheck[];
}

export interface TelematicsHardwareItem {
  name: string;
  tagline: string;
  description: string;
  specs: string[];
}

export interface WomenSafetyStep {
  step: string;
  title: string;
  description: string;
}

export interface WomenSafetyProtocol {
  title: string;
  badge: string;
  steps: WomenSafetyStep[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FleetSafetyAuditDeskProps {
  region: 'india' | 'uae';
  title: string;
  eyebrow: string;
  description: string;
  auditCategories: AuditCategory[];
  telematicsHardware: TelematicsHardwareItem[];
  womenSafetyProtocol: WomenSafetyProtocol;
  faqs: FaqItem[];
  phone: string;
  whatsapp: string;
  supportHours: string;
}

export default function FleetSafetyAuditDesk({
  region,
  title,
  eyebrow,
  description,
  auditCategories,
  telematicsHardware,
  womenSafetyProtocol,
  faqs,
  phone,
  whatsapp,
  supportHours,
}: FleetSafetyAuditDeskProps) {
  const isIndia = region === 'india';

  // State
  const [selectedAuditCatId, setSelectedAuditCatId] = useState<string>(auditCategories[0]?.id || 'mechanical');
  const currentAuditCategory = auditCategories.find((c) => c.id === selectedAuditCatId) || auditCategories[0];

  // Active view tab
  const [activeTab, setActiveTab] = useState<'audit' | 'hardware' | 'women-safety' | 'faqs'>('audit');

  // WhatsApp Inquiry Generator
  const generateWhatsAppMessage = () => {
    const rawNumber = whatsapp.replace(/[^0-9]/g, '');
    const text = [
      `*Fleet Safety & IoT Telematics Audit Inquiry — Victor Mobility (${isIndia ? 'India' : 'UAE'})*`,
      `Audited Category: ${currentAuditCategory.name}`,
      `Safety Standards: ${isIndia ? 'AIS-140 GPS, Dual Panic SOS & 80 km/h Governor' : 'RTA Smart Limousine Telematics & Diplomatic Protocol'}`,
      'Pre-Trip Audit Status: 100% Pre-Dispatch Verified (50-Point Audit Protocol)',
      `Night Transit Protocol: ${womenSafetyProtocol.title}`,
      '',
      'Please provide our corporate travel desk with a complete Corporate Vehicle Safety Audit Dossier and inspection certification.',
      '',
      '_Note: This WhatsApp message initiates an enterprise safety inquiry with Victor Mobility and does not constitute a signed contract._',
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 print:text-slate-800 print:border-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse print:hidden"></span>
            {eyebrow}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 print:text-black">
            {title}
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed mb-8 print:text-slate-700">
            {description}
          </p>

          {/* Key Safety Pillars Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800 print:border-slate-300">
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">IoT Telematics</span>
              <span className="text-2xl font-bold text-emerald-400 print:text-black">{isIndia ? 'AIS-140' : 'RTA Linked'}</span>
              <span className="text-xs text-slate-500 block mt-1">10-Sec Polling Encrypted</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Vehicle Audits</span>
              <span className="text-2xl font-bold text-amber-400 print:text-black">50-Point</span>
              <span className="text-xs text-slate-500 block mt-1">Pre-Dispatch Gate Verified</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Sobriety Policy</span>
              <span className="text-2xl font-bold text-cyan-400 print:text-black">0.00% BAC</span>
              <span className="text-xs text-slate-500 block mt-1">Digital Breathalyzer Log</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Emergency SOS</span>
              <span className="text-2xl font-bold text-rose-400 print:text-black">&lt;1.5 Sec</span>
              <span className="text-xs text-slate-500 block mt-1">Instant Command Bridge</span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs (Hidden in Print) */}
      <div className="sticky top-16 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 print:hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar py-2">
          <nav className="flex space-x-2" aria-label="Safety Desk Navigation">
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'audit'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              50-Point Pre-Trip Audit
            </button>
            <button
              onClick={() => setActiveTab('hardware')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'hardware'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              IoT Hardware Stack
            </button>
            <button
              onClick={() => setActiveTab('women-safety')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'women-safety'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Women Night Protocol
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'faqs'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Safety FAQs
            </button>
          </nav>

          <div className="flex items-center gap-2 pl-4">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded border border-slate-700 transition"
              title="Print Safety Audit Dossier"
            >
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Audit Dossier
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 print:py-4">
        {/* Tab 1: 50-Point Pre-Trip Audit Checklist */}
        {(activeTab === 'audit' || typeof window === 'undefined') && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6 print:border-slate-300">
              <h2 className="text-2xl font-bold text-white print:text-black">
                Interactive Vehicle Pre-Trip Safety Audit Checklist
              </h2>
              <p className="text-sm text-slate-400 mt-1 print:text-slate-600">
                Explore the mandatory 50-point diagnostic inspection conducted on every vehicle at our depot staging bays before passenger assignment.
              </p>
            </div>

            {/* Audit Category Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 print:hidden">
              {auditCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedAuditCatId(cat.id)}
                  className={`p-4 rounded-xl border text-left transition ${
                    selectedAuditCatId === cat.id
                      ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span className="block text-xs uppercase tracking-wider font-bold text-emerald-400 mb-1">
                    {cat.checks.length} Critical Checks
                  </span>
                  <span className="block text-sm font-bold text-white">{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Selected Category Audit Display Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl print:border-slate-300 print:bg-white print:text-black mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 print:border-slate-300 gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-emerald-400">
                    Active Inspection Module
                  </span>
                  <h3 className="text-2xl font-bold text-white print:text-black mt-1">
                    {currentAuditCategory.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Certified Technical Inspection Standard · Victor Mobility Depot Staging
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-950/60 border border-emerald-800/80 px-4 py-2 rounded-lg text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Inspection Result</span>
                    <span className="text-emerald-400 font-bold text-sm">100% Certified Pass</span>
                  </div>
                  <div className="bg-slate-800/60 border border-slate-700 px-4 py-2 rounded-lg text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Protocol</span>
                    <span className="text-white font-bold text-sm">ISO 9001:2015</span>
                  </div>
                </div>
              </div>

              {/* Checklist Items Table */}
              <div className="divide-y divide-slate-800/80 pt-4">
                {currentAuditCategory.checks.map((check, idx) => (
                  <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                          ✓
                        </span>
                        <h4 className="text-sm font-bold text-white print:text-black">{check.item}</h4>
                      </div>
                      <p className="text-xs text-slate-400 pl-7 leading-relaxed">{check.spec}</p>
                    </div>
                    <div className="pl-7 sm:pl-0">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        {check.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-6 border-t border-slate-800 print:hidden">
                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-lg transition shadow-lg shadow-emerald-500/10"
                >
                  Request Safety Audit Dossier on WhatsApp
                </a>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-lg border border-slate-700 transition"
                >
                  Print Full Audit Dossier
                </button>
              </div>
              <p className="text-[11px] text-slate-500 text-center mt-3 print:hidden">
                Prefills WhatsApp inquiry with Victor Mobility safety and compliance team. Technical audit specifications apply.
              </p>
            </div>
          </section>
        )}

        {/* Tab 2: IoT Hardware Stack */}
        {activeTab === 'hardware' && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-2xl font-bold text-white">Onboard IoT Telematics &amp; Safety Hardware</h2>
              <p className="text-sm text-slate-400 mt-1">
                Every Victor Mobility vehicle is equipped with industrial-grade automotive IoT hardware ensuring uninterrupted real-time telemetry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {telematicsHardware.map((hw, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                      {hw.tagline}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">{hw.name}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">{hw.description}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-800 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Technical Hardware Specs:</span>
                    {hw.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="text-emerald-400">•</span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 3: Women Night Safety Protocol */}
        {activeTab === 'women-safety' && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <div className="inline-block px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
                {womenSafetyProtocol.badge}
              </div>
              <h2 className="text-2xl font-bold text-white">{womenSafetyProtocol.title}</h2>
              <p className="text-sm text-slate-400 mt-1">
                Mandatory residential drop and nighttime commute protocol enforced across all enterprise tech park and BPO shift rotations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {womenSafetyProtocol.steps.map((st) => (
                <div key={st.step} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow space-y-3 relative">
                  <span className="text-2xl font-black text-amber-400 opacity-60">Step {st.step}</span>
                  <h3 className="text-base font-bold text-white">{st.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{st.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 4: Safety FAQs */}
        {activeTab === 'faqs' && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-2xl font-bold text-white">Frequently Asked Questions — Fleet Safety</h2>
              <p className="text-sm text-slate-400 mt-1">
                Enterprise guidelines on emergency panic response, speed governance, breathalyzer audits, and telematics privacy.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">Q:</span> {faq.question}
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
