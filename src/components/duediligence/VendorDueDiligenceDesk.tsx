'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface OfficeRecord {
  city: string;
  address: string;
  gstin?: string;
  license?: string;
}

export interface EntityInfo {
  legalName: string;
  tradeName: string;
  constitution: string;
  cin?: string;
  licenseNumber?: string;
  pan?: string;
  trn?: string;
  msmeUdyam?: string;
  headOffice: string;
  operatingOffices: OfficeRecord[];
}

export interface StatutoryRecord {
  framework: string;
  regNumber: string;
  status: string;
  details: string;
}

export interface StatutoryPillar {
  id: string;
  title: string;
  badge: string;
  description: string;
  records: StatutoryRecord[];
}

export interface CodeOfConductItem {
  principle: string;
  clause: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface VendorDueDiligenceDeskProps {
  region: 'india' | 'uae';
  title: string;
  eyebrow: string;
  description: string;
  entity: EntityInfo;
  statutoryPillars: StatutoryPillar[];
  codeOfConduct: CodeOfConductItem[];
  faqs: FaqItem[];
  phone: string;
  whatsapp: string;
  supportHours: string;
}

export default function VendorDueDiligenceDesk({
  region,
  title,
  eyebrow,
  description,
  entity,
  statutoryPillars,
  codeOfConduct,
  faqs,
  phone,
  whatsapp,
  supportHours,
}: VendorDueDiligenceDeskProps) {
  const isIndia = region === 'india';

  // Active Tab: 'pillars' | 'entity' | 'conduct' | 'faqs'
  const [activeTab, setActiveTab] = useState<'pillars' | 'entity' | 'conduct' | 'faqs'>('pillars');

  // Selected Pillar
  const [selectedPillarId, setSelectedPillarId] = useState<string>(
    statutoryPillars[0]?.id || (isIndia ? 'labour' : 'rta-licensing')
  );
  const activePillar =
    statutoryPillars.find((p) => p.id === selectedPillarId) || statutoryPillars[0];

  // Inquiry Form State
  const [procurementCompany, setProcurementCompany] = useState('');
  const [officerName, setOfficerName] = useState('');
  const [officerEmail, setOfficerEmail] = useState('');
  const [fleetRequirement, setFleetRequirement] = useState('Employee Transportation (Daily Shuttles)');
  const [requestedPillar, setRequestedPillar] = useState('All Statutory KYC & MSA Documents');
  const [formNotes, setFormNotes] = useState('');

  // WhatsApp Message Generator
  const generateWhatsAppMessage = () => {
    const rawNumber = whatsapp.replace(/[^0-9]/g, '');
    const company = procurementCompany.trim() || 'Institutional Client';
    const officer = officerName.trim() || 'Procurement Desk';
    const email = officerEmail.trim() || 'Not specified';
    const notes = formNotes.trim() ? `\nSpecific Requirements: ${formNotes.trim()}` : '';

    const text = [
      `*Enterprise Vendor Due Diligence & KYC Request — Victor Mobility (${isIndia ? 'India' : 'UAE'})*`,
      `Client Entity: ${company}`,
      `Procurement Contact: ${officer} (${email})`,
      `Service Requirement: ${fleetRequirement}`,
      `Requested Dossier: ${requestedPillar}`,
      `Current Focus Pillar: ${activePillar.title} (${activePillar.badge})`,
      notes,
      '',
      `Please furnish our vendor onboarding committee with certified copies of Victor Mobility's Certificate of Incorporation, ${isIndia ? 'GSTIN credentials, EPF/ESIC compliance challans,' : 'DED Commercial License, FTA TRN certificate, RTA permits,'} and Master Services Agreement (MSA) template.`,
      '',
      '_Note: This WhatsApp message initiates an enterprise vendor due diligence inquiry with Victor Mobility and does not constitute a signed contract._',
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-4 print:text-slate-800 print:border-slate-300">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse print:hidden"></span>
            {eyebrow}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 print:text-black">
            {title}
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed mb-8 print:text-slate-700">
            {description}
          </p>

          {/* Key Compliance Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800 print:border-slate-300">
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                Legal Entity
              </span>
              <span className="text-sm font-bold text-teal-400 block mt-1 truncate print:text-black">
                {entity.legalName}
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                {isIndia ? `CIN: ${entity.cin}` : `License: ${entity.licenseNumber}`}
              </span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                {isIndia ? 'GST & Tax ID' : 'Tax Registration'}
              </span>
              <span className="text-sm font-bold text-amber-400 block mt-1 print:text-black">
                {isIndia ? `PAN: ${entity.pan}` : `TRN: ${entity.trn}`}
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                {isIndia ? '3 Operating States' : 'FTA 5% VAT Registered'}
              </span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                {isIndia ? 'Labour Statutory' : 'Transport Authority'}
              </span>
              <span className="text-sm font-bold text-emerald-400 block mt-1 print:text-black">
                {isIndia ? 'EPF & ESIC 100%' : 'Dubai RTA Limousine'}
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                {isIndia ? 'Monthly Remittance Audited' : '100% Commercial Permits'}
              </span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                Corporate Indemnity
              </span>
              <span className="text-sm font-bold text-indigo-400 block mt-1 print:text-black">
                Bilateral MSA
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                Annexure C Road Transit Defense
              </span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-4 print:hidden">
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/30 hover:bg-teal-500/20 text-sm font-medium transition cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print Due Diligence Dossier
            </button>
            <a
              href="#procurement-inquiry"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-500 text-slate-950 font-semibold hover:bg-teal-400 text-sm transition"
            >
              Request Certified Statutory Copies
            </a>
            <span className="text-xs text-slate-400">
              Audit support desk: <strong className="text-white">{supportHours}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Main Interactive Work Area */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 mb-8 overflow-x-auto print:hidden">
          <button
            onClick={() => setActiveTab('pillars')}
            className={`px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'pillars'
                ? 'border-teal-400 text-teal-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Statutory Pillars &amp; Compliance Vault
          </button>
          <button
            onClick={() => setActiveTab('entity')}
            className={`px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'entity'
                ? 'border-teal-400 text-teal-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Corporate Entity &amp; Branch Registrations
          </button>
          <button
            onClick={() => setActiveTab('conduct')}
            className={`px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'conduct'
                ? 'border-teal-400 text-teal-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Ethical Procurement &amp; Code of Conduct
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'faqs'
                ? 'border-teal-400 text-teal-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Institutional Onboarding FAQs &amp; MSA
          </button>
        </div>

        {/* Tab 1: Statutory Pillars & Records Inspector */}
        {(activeTab === 'pillars' || typeof window === 'undefined') && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-2 print:text-black">
                Institutional Statutory Pillars
              </h2>
              <p className="text-sm text-slate-400 mb-6 print:text-slate-600">
                Explore the four pillars of corporate compliance governing Victor Mobility operations. All records are updated and audited monthly by certified chartered accountants and legal counsel.
              </p>

              {/* Pillar Selector Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 print:hidden">
                {statutoryPillars.map((pillar) => {
                  const isSelected = pillar.id === activePillar.id;
                  return (
                    <button
                      key={pillar.id}
                      onClick={() => setSelectedPillarId(pillar.id)}
                      className={`text-left p-4 rounded-xl border transition cursor-pointer ${
                        isSelected
                          ? 'bg-teal-500/10 border-teal-500/50 text-white'
                          : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-teal-300">
                          {pillar.badge}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                        )}
                      </div>
                      <h3 className="font-semibold text-sm text-white line-clamp-1">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {pillar.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Pillar Card */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 print:bg-white print:border-slate-300 print:text-black">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 print:border-slate-300 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-teal-500/10 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2 print:text-slate-700 print:bg-slate-100">
                    {activePillar.badge}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white print:text-black">
                    {activePillar.title}
                  </h3>
                  <p className="text-sm text-slate-300 mt-1 max-w-2xl print:text-slate-600">
                    {activePillar.description}
                  </p>
                </div>
                <div className="shrink-0 print:hidden">
                  <a
                    href="#procurement-inquiry"
                    onClick={() => setRequestedPillar(activePillar.title)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 text-xs font-medium border border-teal-500/40 transition"
                  >
                    Request Certified Copies
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Records Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300 print:text-black">
                  <thead className="text-xs uppercase bg-slate-950/60 text-slate-400 border-b border-slate-800 print:bg-slate-100 print:text-slate-700 print:border-slate-300">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">Statutory Framework</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Registration / Policy No.</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Verification Status</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Audit Specification &amp; Governance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 print:divide-slate-200">
                    {activePillar.records.map((rec, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30 print:hover:bg-transparent">
                        <td className="px-4 py-3.5 font-medium text-white print:text-black">
                          {rec.framework}
                        </td>
                        <td className="px-4 py-3.5 font-mono text-xs text-amber-300 print:text-black">
                          {rec.regNumber}
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 print:border-slate-300 print:text-slate-800">
                            <svg className="w-3 h-3 text-emerald-400 print:text-black" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {rec.status}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-xs text-slate-400 print:text-slate-700">
                          {rec.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Confidentiality Notice */}
              <div className="mt-6 p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 text-xs text-slate-400 flex items-start gap-3 print:bg-slate-50 print:border-slate-200 print:text-slate-700">
                <svg className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <strong className="text-slate-200 print:text-black">Institutional Audit Protocol:</strong> Original registration certificates, monthly bank payment challans, and full commercial insurance policies are released directly to corporate legal and procurement committees upon formal verification under bilateral Non-Disclosure Agreements (NDA).
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Corporate Entity & Branch Registrations */}
        {activeTab === 'entity' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Corporate Entity Details &amp; Registered Offices
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Official entity registration credentials and state-wise operating offices for institutional billing and tax invoice routing.
              </p>
            </div>

            {/* Corporate Identification Card */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
                Primary Corporate Identification
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <span className="text-xs text-slate-400 font-medium block">Legal Corporate Name</span>
                  <span className="text-sm font-semibold text-white mt-1 block">{entity.legalName}</span>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <span className="text-xs text-slate-400 font-medium block">Trade Name</span>
                  <span className="text-sm font-semibold text-teal-400 mt-1 block">{entity.tradeName}</span>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <span className="text-xs text-slate-400 font-medium block">Entity Constitution</span>
                  <span className="text-sm font-semibold text-slate-200 mt-1 block">{entity.constitution}</span>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <span className="text-xs text-slate-400 font-medium block">
                    {isIndia ? 'Corporate Identification Number (CIN)' : 'Commercial Trade License'}
                  </span>
                  <span className="text-sm font-mono font-semibold text-amber-300 mt-1 block">
                    {isIndia ? entity.cin : entity.licenseNumber}
                  </span>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <span className="text-xs text-slate-400 font-medium block">
                    {isIndia ? 'Permanent Account Number (PAN)' : 'Tax Registration Number (TRN)'}
                  </span>
                  <span className="text-sm font-mono font-semibold text-emerald-400 mt-1 block">
                    {isIndia ? entity.pan : entity.trn}
                  </span>
                </div>
                {isIndia && entity.msmeUdyam && (
                  <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <span className="text-xs text-slate-400 font-medium block">MSME Udyam Registration</span>
                    <span className="text-sm font-mono font-semibold text-indigo-400 mt-1 block">
                      {entity.msmeUdyam}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-4 p-3.5 rounded-lg bg-slate-950/40 border border-slate-800/60 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Registered Corporate Head Office:</span> {entity.headOffice}
              </div>
            </div>

            {/* Operating Offices & Branch Registrations */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">
                {isIndia ? 'State Operating Offices & Local GSTINs' : 'Emirates Operational Desks'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {entity.operatingOffices.map((office, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-white">{office.city}</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          Active Branch
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        {office.address}
                      </p>
                    </div>
                    {office.gstin && (
                      <div className="pt-3 border-t border-slate-800">
                        <span className="text-xs text-slate-500 block">State GSTIN</span>
                        <span className="text-xs font-mono font-semibold text-amber-300 block mt-0.5">
                          {office.gstin}
                        </span>
                      </div>
                    )}
                    {office.license && (
                      <div className="pt-3 border-t border-slate-800">
                        <span className="text-xs text-slate-500 block">Emirate Authority</span>
                        <span className="text-xs font-mono font-semibold text-amber-300 block mt-0.5">
                          {office.license}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Ethical Procurement & Code of Conduct */}
        {activeTab === 'conduct' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Ethical Procurement &amp; Corporate Code of Conduct
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Victor Mobility adheres to stringent international business conduct standards, guaranteeing ethical labor practices, transparency, and integrity across all client engagements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {codeOfConduct.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center text-xs font-bold font-mono">
                        0{idx + 1}
                      </span>
                      <h3 className="text-base font-bold text-white">
                        {item.principle}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {item.clause}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-teal-400 font-medium flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Audited Enterprise Policy Schedule
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-2">
                Corporate Governance &amp; Whistleblower Protection
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Victor Mobility maintains an independent corporate compliance email hotline for all client procurement teams, drivers, and partners. Any deviation from statutory wages, safety limits, or ethical standards can be reported confidentially with zero retaliation risk.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Institutional Onboarding FAQs & MSA Protocol */}
        {activeTab === 'faqs' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Institutional Onboarding FAQs &amp; MSA Workflow
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Standard operating procedures, turnaround times, and contract guidelines for institutional vendor onboarding.
              </p>
            </div>

            {/* Turnaround Milestones */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Stage 1</span>
                <span className="text-lg font-bold text-teal-400 block mt-1">NDA &amp; KYC Exchange</span>
                <span className="text-xs text-slate-500 block mt-1">Within 24 Hours</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Stage 2</span>
                <span className="text-lg font-bold text-amber-400 block mt-1">MSA Review &amp; Redlines</span>
                <span className="text-xs text-slate-500 block mt-1">24 to 48 Hours</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Stage 3</span>
                <span className="text-lg font-bold text-emerald-400 block mt-1">Dispatch Activation</span>
                <span className="text-xs text-slate-500 block mt-1">Immediate on Execution</span>
              </div>
            </div>

            {/* Accordion / FAQ List */}
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
        )}

        {/* Corporate Onboarding Inquiry Section */}
        <div id="procurement-inquiry" className="mt-16 pt-12 border-t border-slate-800 print:hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold uppercase tracking-wider">
                Direct Procurement Desk
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Initiate Corporate Vendor Onboarding
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Connect directly with our corporate legal and procurement relations desk. We furnish standard vendor forms, Certificate of Incorporation, GSTIN/Trade licenses, and insurance schedules within 24 hours.
              </p>
              <div className="pt-4 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pre-approved Master Services Agreement (MSA) template</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Bank ECS Mandate / Direct NEFT institutional billing account</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Standard 30-day corporate credit billing window</span>
                </div>
              </div>
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 hover:bg-slate-800 text-xs font-semibold transition"
                >
                  <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Desk: {phone}
                </a>
                <Link
                  href={isIndia ? "/india/rfp" : "/uae/rfp"}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 hover:bg-slate-800 text-xs font-semibold transition"
                >
                  Submit Formal RFP Spec
                </Link>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4">
                Corporate KYC &amp; Onboarding Inquiry
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
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Client Entity / Company Name
                    </label>
                    <input
                      type="text"
                      value={procurementCompany}
                      onChange={(e) => setProcurementCompany(e.target.value)}
                      placeholder="e.g. Acme Technologies India Pvt Ltd"
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Procurement Officer / Legal Contact
                    </label>
                    <input
                      type="text"
                      value={officerName}
                      onChange={(e) => setOfficerName(e.target.value)}
                      placeholder="e.g. Rajesh Sharma"
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Corporate Work Email
                    </label>
                    <input
                      type="email"
                      value={officerEmail}
                      onChange={(e) => setOfficerEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Primary Service Requirement
                    </label>
                    <select
                      value={fleetRequirement}
                      onChange={(e) => setFleetRequirement(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-teal-500 focus:outline-none"
                    >
                      <option value="Employee Transportation (Daily Shuttles)">Employee Transportation (Daily Shuttles)</option>
                      <option value="Executive Chauffeur Retainer Fleet">Executive Chauffeur Retainer Fleet</option>
                      <option value="Airport VIP & Delegations Logistics">Airport VIP &amp; Delegations Logistics</option>
                      <option value="Corporate Events & Annual Summits">Corporate Events &amp; Annual Summits</option>
                      <option value="Multi-City Pan-India Retainer">Multi-City Pan-India Retainer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Specific Due Diligence Document Needed
                  </label>
                  <select
                    value={requestedPillar}
                    onChange={(e) => setRequestedPillar(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-teal-500 focus:outline-none"
                  >
                    <option value="All Statutory KYC & MSA Documents">All Statutory KYC &amp; Bilateral MSA Documents</option>
                    <option value="Certificate of Incorporation & PAN Card">Certificate of Incorporation &amp; PAN/TRN Card</option>
                    <option value="Multi-State GSTIN Tax Registrations">Multi-State GSTIN / FTA Tax Registrations</option>
                    <option value="EPF & ESIC Labour Compliance Records">EPF &amp; ESIC Labour Compliance Records</option>
                    <option value="Commercial Motor Insurance Policy Schedules">Commercial Motor Insurance Policy Schedules</option>
                    <option value="Chauffeur Police Vetting Credentials">Chauffeur Police Vetting Credentials</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Special Procurement Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    placeholder="Mention custom MSA redlines, vendor portal registration links, or specific billing cycles..."
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-lg bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-teal-500/10"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                    </svg>
                    Send Due Diligence Dossier Request via WhatsApp
                  </button>
                  <p className="text-[11px] text-slate-500 text-center mt-2">
                    Note: Initiates an enterprise vendor due diligence inquiry with Victor Mobility and does not constitute a signed contract.
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
