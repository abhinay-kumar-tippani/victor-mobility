'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface RegionData {
  id: string;
  country: string;
  flag: string;
  title: string;
  legalEntity: string;
  registration: string;
  headquarters: string;
  operatingHubs: string[];
  currency: string;
  primaryServices: string[];
  complianceHighlights: string[];
  portalUrl: string;
  rfpUrl: string;
  rateCardUrl: string;
}

export interface CrossBorderSynergy {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface GlobalMarketsGatewayProps {
  title: string;
  eyebrow: string;
  description: string;
  regions: RegionData[];
  crossBorderSynergies: CrossBorderSynergy[];
  faqs: FaqItem[];
  phone: string;
  whatsapp: string;
  supportHours: string;
}

export default function GlobalMarketsGateway({
  title,
  eyebrow,
  description,
  regions,
  crossBorderSynergies,
  faqs,
  phone,
  whatsapp,
  supportHours,
}: GlobalMarketsGatewayProps) {
  // Active region tab
  const [selectedRegionId, setSelectedRegionId] = useState<string>('india');
  const activeRegion = regions.find((r) => r.id === selectedRegionId) || regions[0];

  // Inquiry Form State
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [jurisdiction, setJurisdiction] = useState('Both India & UAE Cross-Border Account');
  const [fleetRequirement, setFleetRequirement] = useState('Executive Chauffeur Retainers & Airport Protocol');
  const [specialNotes, setSpecialNotes] = useState('');

  // WhatsApp Message Generator
  const generateWhatsAppMessage = () => {
    const rawNumber = whatsapp.replace(/[^0-9]/g, '');
    const client = companyName.trim() || 'Global Enterprise Entity';
    const contact = contactName.trim() || 'Global Travel / Procurement Desk';
    const email = contactEmail.trim() || 'Not specified';
    const notes = specialNotes.trim() ? `\nSpecial Notes: ${specialNotes.trim()}` : '';

    const text = [
      `*Global Enterprise Mobility Inquiry — Victor Mobility (Cross-Border Desk)*`,
      `Client Entity: ${client}`,
      `Procurement / Travel Contact: ${contact} (${email})`,
      `Operating Jurisdiction: ${jurisdiction}`,
      `Selected Requirement: ${fleetRequirement}`,
      `Focus Operating Region: ${activeRegion.title} (${activeRegion.currency})`,
      notes,
      '',
      `Please schedule an enterprise cross-border mobility consultation and furnish our procurement team with a bilateral Master Services Agreement (MSA) proposal.`,
      '',
      '_Note: This WhatsApp message initiates an enterprise global mobility inquiry with Victor Mobility and does not constitute a signed contract._',
    ].join('\n');

    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`;
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Directory of all 18 dedicated specialized desks per region
  const getSpecializedDesks = (prefix: string) => [
    { title: 'Master Rate Card', path: `${prefix}/rate-card`, badge: 'Pricing' },
    { title: 'Enterprise SLA', path: `${prefix}/sla`, badge: 'Governance' },
    { title: 'Fleet Safety Audit', path: `${prefix}/safety`, badge: 'IoT & Telematics' },
    { title: 'Shift Roster Desk', path: `${prefix}/roster`, badge: 'Logistics' },
    { title: 'Vendor Due Diligence', path: `${prefix}/due-diligence`, badge: 'KYC Vault' },
    { title: 'Fleet TCO Desk', path: `${prefix}/tco-calculator`, badge: 'CFO Model' },
    { title: 'Executive Roadshows', path: `${prefix}/roadshows`, badge: 'C-Suite Transit' },
    { title: 'Corporate Credit', path: `${prefix}/credit-application`, badge: '30-Day Billing' },
    { title: 'Corporate Invoicing', path: `${prefix}/billing`, badge: 'Tax & ITC' },
    { title: 'Corridor Navigator', path: `${prefix}/corridors`, badge: 'Tech Parks' },
    { title: 'Fare Estimator', path: `${prefix}/estimator`, badge: 'Calculator' },
    { title: 'Procurement RFP', path: `${prefix}/rfp`, badge: 'Formal RFP' },
    { title: 'Chauffeur Academy', path: `${prefix}/academy`, badge: 'Training' },
    { title: 'Chauffeur Verification', path: `${prefix}/academy/verify`, badge: 'QR Badges' },
    { title: 'Client Telematics', path: `${prefix}/portal`, badge: 'Live Tracking' },
    { title: '24/7 Operations Desk', path: `${prefix}/emergency`, badge: 'Escalations' },
    { title: 'Airport VIP Protocol', path: `${prefix}/protocol`, badge: 'FBO Transit' },
    { title: 'ESG & Green Mobility', path: `${prefix}/esg`, badge: 'Carbon Offsets' },
  ];

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

          {/* Global Network Overview Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800 print:border-slate-300">
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                Operating Countries
              </span>
              <span className="text-2xl font-bold text-indigo-400 block mt-1 print:text-black">
                India &amp; UAE
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                Bilateral Operational Framework
              </span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                Metropolitan Hubs
              </span>
              <span className="text-2xl font-bold text-amber-400 block mt-1 print:text-black">
                5 Primary Hubs
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                HYD · BLR · PUN · DXB · AUH
              </span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                Legal Certifications
              </span>
              <span className="text-2xl font-bold text-emerald-400 block mt-1 print:text-black">
                100% Certified
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                MCA, GSTIN, DED, RTA &amp; FTA
              </span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                Specialized Desks
              </span>
              <span className="text-2xl font-bold text-cyan-400 block mt-1 print:text-black">
                70+ Static Routes
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                Full-Lifecycle Corporate Tools
              </span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-4 print:hidden">
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/20 text-sm font-medium transition cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Global Network Dossier
            </button>
            <a
              href="#global-inquiry"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-400 text-sm transition"
            >
              Initiate Multi-Region Onboarding
            </a>
            <span className="text-xs text-slate-400">
              Global Support Hotline: <strong className="text-white">{supportHours}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Main Interactive Work Area */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Country Selector Switcher */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white print:text-black">
                Regional Operating Divisions
              </h2>
              <p className="text-sm text-slate-400 mt-1 print:text-slate-600">
                Switch between operating divisions to review legal entities, operating hubs, statutory compliance credentials, and specialized service suites.
              </p>
            </div>

            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 w-fit shrink-0 print:hidden">
              {regions.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegionId(reg.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                    reg.id === selectedRegionId
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-base">{reg.flag}</span>
                  <span>{reg.country}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dual Regional Operating Jurisdictions Preview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {regions.map((reg) => (
              <div
                key={`preview-${reg.id}`}
                onClick={() => setSelectedRegionId(reg.id)}
                className={`p-6 rounded-2xl border transition cursor-pointer ${
                  selectedRegionId === reg.id
                    ? 'bg-slate-900/90 border-indigo-500 ring-2 ring-indigo-500/30'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{reg.flag}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                    {reg.currency}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{reg.title}</h3>
                <p className="text-xs text-indigo-400 font-mono mb-2">{reg.legalEntity}</p>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Operating Hubs: {reg.operatingHubs.join(', ')}
                </p>
                <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-800/80">
                  <span className="text-slate-400 font-mono text-[11px]">{reg.registration}</span>
                  <span className="text-indigo-400 font-semibold">
                    {selectedRegionId === reg.id ? 'Active Focus ✓' : 'Switch Focus →'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Active Region Full Card */}
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 print:bg-white print:border-slate-300 print:text-black">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-800 print:border-slate-300">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-3">
                  <span className="text-sm">{activeRegion.flag}</span>
                  <span>{activeRegion.country} Division</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white print:text-black">
                  {activeRegion.title}
                </h3>
                <p className="text-sm text-slate-300 mt-1 font-mono">
                  {activeRegion.legalEntity}
                </p>
                <p className="text-xs text-amber-300 font-mono mt-0.5">
                  {activeRegion.registration}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0 print:hidden">
                <Link
                  href={activeRegion.portalUrl}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition"
                >
                  Launch {activeRegion.country} Portal →
                </Link>
                <Link
                  href={activeRegion.rateCardUrl}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                >
                  Rate Card
                </Link>
                <Link
                  href={activeRegion.rfpUrl}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                >
                  Submit RFP
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                  Operating Hubs &amp; Coverage
                </span>
                <div className="space-y-1.5 text-xs text-white">
                  {activeRegion.operatingHubs.map((hub, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                      <span>{hub}</span>
                    </div>
                  ))}
                </div>
                <span className="text-[11px] text-slate-500 block mt-3 pt-2 border-t border-slate-800">
                  Headquarters: {activeRegion.headquarters}
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                  Core Service Capabilities
                </span>
                <div className="space-y-1.5 text-xs text-slate-300">
                  {activeRegion.primaryServices.map((svc, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2">
                      <span className="text-indigo-400 font-bold">›</span>
                      <span>{svc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                  Statutory Compliance
                </span>
                <div className="space-y-1.5 text-xs text-slate-300">
                  {activeRegion.complianceHighlights.map((comp, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2">
                      <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{comp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Specialized Desks Directory */}
            <div className="mt-8 pt-6 border-t border-slate-800 print:hidden">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Specialized {activeRegion.country} Operational Desks ({getSpecializedDesks(activeRegion.portalUrl).length})
                </h4>
                <span className="text-xs text-slate-400">
                  All desks accessible under {activeRegion.currency} billing
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {getSpecializedDesks(activeRegion.portalUrl).map((desk, dIdx) => (
                  <Link
                    key={dIdx}
                    href={desk.path}
                    className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-indigo-500/60 hover:bg-slate-900 transition block text-left"
                  >
                    <span className="text-[10px] text-indigo-400 font-semibold block truncate">
                      {desk.badge}
                    </span>
                    <span className="text-xs font-bold text-white block truncate mt-0.5">
                      {desk.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cross-Border Enterprise Synergies */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">
              Cross-Border Multinational Synergies
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              How global corporations benefit from single-vendor mobility coverage across India and the United Arab Emirates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {crossBorderSynergies.map((syn, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-xs font-bold font-mono">
                      0{idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {syn.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {syn.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-indigo-400 font-medium flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Standard Cross-Border SLA Feature
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">
              Global Operations &amp; Cross-Border FAQs
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Contractual and operational guidelines for multinational procurement officers.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-900/40 border border-slate-800">
                <h3 className="font-semibold text-white text-base mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-Border Onboarding Inquiry Drawer */}
        <div id="global-inquiry" className="mt-16 pt-12 border-t border-slate-800 print:hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                Cross-Border Account Desk
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Initiate Multi-Region Enterprise Onboarding
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Connect directly with our global corporate relations team. We configure a unified bilateral Master Services Agreement (MSA) covering all your operating entities across India and the United Arab Emirates.
              </p>
              <div className="pt-4 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Single global contract governing India &amp; UAE entities</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Dual-currency billing in INR (with GST ITC) and AED (with FTA 5% VAT)</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Dedicated Global Account Director available 24/7</span>
                </div>
              </div>
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 hover:bg-slate-800 text-xs font-semibold transition"
                >
                  <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Global Desk: {phone}
                </a>
                <Link
                  href="/india/due-diligence"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 hover:bg-slate-800 text-xs font-semibold transition"
                >
                  Review Compliance Vault
                </Link>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4">
                Cross-Border Corporate Account Specification
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (typeof window !== 'undefined') {
                    window.open(generateWhatsAppMessage(), '_blank');
                  }
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="companyName" className="block text-xs font-medium text-slate-400 mb-1">
                      Organization / Multinational Entity
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Acme Global Corporation"
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactName" className="block text-xs font-medium text-slate-400 mb-1">
                      Global Procurement / Travel Lead
                    </label>
                    <input
                      id="contactName"
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Priya Venkatesh"
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactEmail" className="block text-xs font-medium text-slate-400 mb-1">
                      Corporate Work Email
                    </label>
                    <input
                      id="contactEmail"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="travel.lead@company.com"
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="jurisdiction" className="block text-xs font-medium text-slate-400 mb-1">
                      Operational Jurisdictions Needed
                    </label>
                    <select
                      id="jurisdiction"
                      value={jurisdiction}
                      onChange={(e) => setJurisdiction(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="Both India & UAE Cross-Border Account">Both India &amp; UAE Cross-Border Account</option>
                      <option value="India Operations (Hyderabad, Bengaluru, Pune)">India Operations (Hyderabad, Bengaluru, Pune)</option>
                      <option value="UAE Operations (Dubai, Abu Dhabi)">UAE Operations (Dubai, Abu Dhabi)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="fleetRequirement" className="block text-xs font-medium text-slate-400 mb-1">
                    Primary Fleet Service Requirement
                  </label>
                  <select
                    id="fleetRequirement"
                    value={fleetRequirement}
                    onChange={(e) => setFleetRequirement(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Executive Chauffeur Retainers & Airport Protocol">Executive Chauffeur Retainers &amp; Airport Protocol</option>
                    <option value="High-Density Employee Commute Shuttles & Buses">High-Density Employee Commute Shuttles &amp; Buses</option>
                    <option value="Multi-City Investor Roadshows & C-Suite Tours">Multi-City Investor Roadshows &amp; C-Suite Tours</option>
                    <option value="Global Summit & Conference Convoy Logistics">Global Summit &amp; Conference Convoy Logistics</option>
                    <option value="Full Comprehensive Corporate Transit Retainer">Full Comprehensive Corporate Transit Retainer</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="specialNotes" className="block text-xs font-medium text-slate-400 mb-1">
                    Special Cross-Border Notes (Optional)
                  </label>
                  <textarea
                    id="specialNotes"
                    rows={2}
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="Mention custom MSA redlines, expected monthly vehicle volumes, or currency preferences..."
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                    </svg>
                    Initiate Cross-Border Inquiry via WhatsApp
                  </a>
                  <p className="text-[11px] text-slate-500 text-center mt-2">
                    Note: Initiates an enterprise global mobility inquiry with Victor Mobility and does not constitute a signed contract.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
