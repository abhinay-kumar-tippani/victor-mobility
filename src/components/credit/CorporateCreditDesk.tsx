'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface CreditTier {
  id: string;
  name: string;
  badge: string;
  creditLimit: string;
  settlementCycle: string;
  securityRequirement: string;
  turnaround: string;
  idealFor: string;
  benefits: string[];
}

export interface OnboardingStep {
  step: string;
  title: string;
  timeline: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CorporateCreditDeskProps {
  region: 'india' | 'uae';
  title: string;
  eyebrow: string;
  description: string;
  creditTiers: CreditTier[];
  onboardingWorkflow: OnboardingStep[];
  faqs: FaqItem[];
  phone: string;
  whatsapp: string;
  supportHours: string;
}

export default function CorporateCreditDesk({
  region,
  title,
  eyebrow,
  description,
  creditTiers,
  onboardingWorkflow,
  faqs,
  phone,
  whatsapp,
  supportHours,
}: CorporateCreditDeskProps) {
  const isIndia = region === 'india';

  // Navigation Tab: 'tiers' | 'workflow' | 'kyc' | 'faqs'
  const [activeTab, setActiveTab] = useState<'tiers' | 'workflow' | 'kyc' | 'faqs'>('tiers');

  // Selected Tier
  const [selectedTierId, setSelectedTierId] = useState<string>(creditTiers[1]?.id || creditTiers[0]?.id);
  const activeTier = creditTiers.find((t) => t.id === selectedTierId) || creditTiers[0];

  // Interactive Estimator State
  const [estimatedVehicles, setEstimatedVehicles] = useState<number>(5);
  const [selectedCycle, setSelectedCycle] = useState<'15' | '30' | '45'>('30');

  // Form State
  const [companyName, setCompanyName] = useState('');
  const [entityId, setEntityId] = useState(''); // PAN or TRN
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [bankName, setBankName] = useState('');
  const [requestedLimit, setRequestedLimit] = useState(isIndia ? '₹10,00,000 (10 Lakhs)' : 'AED 75,000');
  const [customNotes, setCustomNotes] = useState('');

  // WhatsApp Message Generator
  const generateWhatsAppMessage = () => {
    const rawNumber = whatsapp.replace(/[^0-9]/g, '');
    const client = companyName.trim() || 'Institutional Entity';
    const taxId = entityId.trim() || 'Pending submission';
    const contact = contactName.trim() || 'Finance / Procurement Desk';
    const email = contactEmail.trim() || 'Not specified';
    const bank = bankName.trim() || 'Corporate Bank';
    const notes = customNotes.trim() ? `\nSpecial Requirements: ${customNotes.trim()}` : '';

    const text = [
      `*Enterprise Corporate Credit Facility Application — Victor Mobility (${isIndia ? 'India' : 'UAE'})*`,
      `Client Entity: ${client}`,
      `${isIndia ? 'Company PAN / GSTIN' : 'Trade License / TRN'}: ${taxId}`,
      `Primary Billing Contact: ${contact} (${email})`,
      `Operating Bank: ${bank}`,
      `Requested Credit Facility: ${requestedLimit}`,
      `Selected Credit Tier: ${activeTier.name} (${activeTier.settlementCycle})`,
      `Estimated Fleet Scale: ${estimatedVehicles} Vehicles`,
      notes,
      '',
      `Please initiate corporate credit assessment, furnish our finance committee with the standard Master Services Agreement (MSA) credit rider, and issue bank ECS mandate paperwork.`,
      '',
      '_Note: This WhatsApp message initiates a corporate credit assessment inquiry with Victor Mobility and does not constitute an approved credit facility._',
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

          {/* Key Facility Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800 print:border-slate-300">
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                Rolling Billing Window
              </span>
              <span className="text-xl font-bold text-emerald-400 block mt-1 print:text-black">
                30-Day Net
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                Consolidated Monthly Invoicing
              </span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                Pre-Approved Limit
              </span>
              <span className="text-xl font-bold text-cyan-400 block mt-1 print:text-black">
                {isIndia ? 'Up to ₹1 Cr+' : 'Up to AED 350k+'}
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                Dynamic Credit Scaling
              </span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                Credit Approval
              </span>
              <span className="text-xl font-bold text-amber-400 block mt-1 print:text-black">
                24–48 Hours
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                Standard Turnaround
              </span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                Account Maintenance
              </span>
              <span className="text-xl font-bold text-indigo-400 block mt-1 print:text-black">
                ₹0 / Zero Fees
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                Pay Only For Contracted Transit
              </span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-4 print:hidden">
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 text-sm font-medium transition cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Credit Application Form
            </button>
            <a
              href="#credit-application-form"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 text-slate-950 font-semibold hover:bg-emerald-400 text-sm transition"
            >
              Apply for 30-Day Credit Account
            </a>
            <span className="text-xs text-slate-400">
              Treasury &amp; Onboarding Desk: <strong className="text-white">{supportHours}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 mb-8 overflow-x-auto print:hidden">
          <button
            onClick={() => setActiveTab('tiers')}
            className={`px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'tiers'
                ? 'border-emerald-400 text-emerald-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Credit Facility Tiers &amp; Terms
          </button>
          <button
            onClick={() => setActiveTab('workflow')}
            className={`px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'workflow'
                ? 'border-emerald-400 text-emerald-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            3-Day Account Onboarding Protocol
          </button>
          <button
            onClick={() => setActiveTab('kyc')}
            className={`px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'kyc'
                ? 'border-emerald-400 text-emerald-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            KYC Documentation Checklist
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'faqs'
                ? 'border-emerald-400 text-emerald-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Treasury &amp; Billing FAQs
          </button>
        </div>

        {/* Tab 1: Credit Facility Tiers */}
        {(activeTab === 'tiers' || typeof window === 'undefined') && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-2 print:text-black">
                Institutional Credit Facility Tiers
              </h2>
              <p className="text-sm text-slate-400 mb-6 print:text-slate-600">
                Pre-approved commercial credit lines structured for growth startups, mid-market enterprises, and global conglomerates.
              </p>

              {/* Quick Tier Selector Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 print:hidden">
                {creditTiers.map((tier) => {
                  const isSelected = tier.id === selectedTierId;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => {
                        setSelectedTierId(tier.id);
                        setRequestedLimit(tier.creditLimit);
                      }}
                      className={`text-left p-3.5 rounded-xl border transition cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500/10 border-emerald-500/50 text-white'
                          : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-emerald-300">
                          {tier.badge}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-white block line-clamp-1">
                        {tier.name}
                      </span>
                      <span className="text-[11px] text-emerald-400 font-mono mt-0.5 block">
                        {tier.creditLimit}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {creditTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`p-6 rounded-2xl border transition flex flex-col justify-between ${
                    tier.id === selectedTierId
                      ? 'bg-slate-900/80 border-emerald-500/60 shadow-lg shadow-emerald-500/5'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {tier.badge}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {tier.turnaround}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">
                      {tier.name}
                    </h3>
                    <div className="text-2xl font-bold text-emerald-400 font-mono mb-2">
                      {tier.creditLimit}
                    </div>
                    <p className="text-xs text-slate-400 mb-4">
                      {tier.idealFor}
                    </p>

                    <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 mb-4 space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Settlement Cycle:</span>
                        <span className="font-semibold text-white">{tier.settlementCycle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Security Mandate:</span>
                        <span className="font-semibold text-amber-300 truncate max-w-[150px]">{tier.securityRequirement}</span>
                      </div>
                    </div>

                    <div className="space-y-2 border-t border-slate-800 pt-3">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Credit Facility Benefits:
                      </span>
                      {tier.benefits.map((benefit, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTierId(tier.id);
                        setRequestedLimit(tier.creditLimit);
                        const form = document.getElementById('credit-application-form');
                        if (form) form.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition cursor-pointer text-center block"
                    >
                      Select This Credit Tier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: 3-Day Onboarding Workflow */}
        {activeTab === 'workflow' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Rapid 3-Day Corporate Account Onboarding Protocol
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                From initial credit assessment to active chauffeur dispatch in under 72 hours.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {onboardingWorkflow.map((step) => (
                <div key={step.step} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 relative">
                  <span className="text-3xl font-extrabold text-slate-800 font-mono absolute top-4 right-4">
                    {step.step}
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
                    {step.timeline}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-400 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    SLA Guaranteed Turnaround
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
              <svg className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <strong className="text-white">Emergency Dispatch Override:</strong> Need immediate vehicle deployment before full KYC completion? Our corporate desk can activate an interim 48-hour credit line upon receipt of an authorized corporate Purchase Order (PO).
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: KYC Documentation Checklist */}
        {activeTab === 'kyc' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Corporate KYC Document Checklist
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Standard corporate documents required to establish an authorized 30-day net billing account.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">
                    {isIndia ? 'Certificate of Incorporation & Company PAN' : 'DED Commercial Trade License'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {isIndia ? 'Copy of CIN incorporation certificate issued by the Ministry of Corporate Affairs (MCA).' : 'Valid commercial trade license issued by the Dubai Department of Economy and Tourism (DED).'}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">
                    {isIndia ? 'Multi-State GSTIN Tax Registrations' : 'FTA Tax Registration Certificate (TRN)'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {isIndia ? 'State GST registration certificates for Telangana, Karnataka, or Maharashtra billing addresses.' : 'Federal Tax Authority (FTA) 5% VAT registration certificate.'}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">
                    Corporate Bank Account Details &amp; Cancelled Cheque
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Company bank details for automated ECS mandate verification and NEFT/RTGS settlement routing.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">
                    Authorized Signatory Card &amp; Work Email Verification
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Designated corporate signatory authorized to execute Master Services Agreements and dispatch authorizations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Treasury & Billing FAQs */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Treasury, Invoicing &amp; Billing FAQs
              </h2>
              <p className="text-sm text-slate-400">
                Detailed contractual guidelines regarding payment timelines, dispute resolutions, and tax invoices.
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
        )}

        {/* Corporate Credit Application Form */}
        <div id="credit-application-form" className="mt-16 pt-12 border-t border-slate-800 print:hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                Direct Credit Desk
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Submit Corporate Credit Application
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Connect directly with our corporate credit committee. We verify your company&apos;s corporate credentials, issue a pre-approved credit ceiling, and deliver standard Master Services Agreement (MSA) documents within 24 to 48 hours.
              </p>
              <div className="pt-4 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pre-approved 30-day net settlement terms</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Automated GST e-invoices with SAC 9966 Input Tax Credit</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Zero setup fees, zero maintenance charges</span>
                </div>
              </div>
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 hover:bg-slate-800 text-xs font-semibold transition"
                >
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Credit Desk: {phone}
                </a>
                <Link
                  href={isIndia ? "/india/due-diligence" : "/uae/due-diligence"}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 hover:bg-slate-800 text-xs font-semibold transition"
                >
                  Vendor Due Diligence Vault
                </Link>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4">
                Corporate Credit Facility Application
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
                      Legal Company / Entity Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Acme Technologies India Pvt Ltd"
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      {isIndia ? 'Company PAN / GSTIN' : 'Commercial License / TRN'}
                    </label>
                    <input
                      type="text"
                      value={entityId}
                      onChange={(e) => setEntityId(e.target.value)}
                      placeholder={isIndia ? 'e.g. AAFCV8841M / 36AAFCV8841M1Z4' : 'e.g. DED-1048291 / 100482910400003'}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Billing Head / Finance Contact Name
                    </label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Suresh Nambiar"
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Corporate Billing Work Email
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="finance@company.com"
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Primary Operating Bank
                    </label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder={isIndia ? 'e.g. HDFC Bank / ICICI Bank' : 'e.g. Emirates NBD / FAB'}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Requested Monthly Credit Facility
                    </label>
                    <select
                      value={requestedLimit}
                      onChange={(e) => setRequestedLimit(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    >
                      {isIndia ? (
                        <>
                          <option value="₹2,00,000 – ₹5,00,000 (Growth)">₹2,00,000 – ₹5,00,000 (Growth)</option>
                          <option value="₹5,00,000 – ₹15,00,000 (Enterprise)">₹5,00,000 – ₹15,00,000 (Enterprise)</option>
                          <option value="₹15,00,000 – ₹25,00,000 (Strategic)">₹15,00,000 – ₹25,00,000 (Strategic)</option>
                          <option value="₹25,00,000 – ₹1 Crore+ (Institutional)">₹25,00,000 – ₹1 Crore+ (Institutional)</option>
                        </>
                      ) : (
                        <>
                          <option value="AED 25,000 – AED 75,000">AED 25,000 – AED 75,000</option>
                          <option value="AED 75,000 – AED 200,000">AED 75,000 – AED 200,000</option>
                          <option value="AED 200,000 – AED 350,000+">AED 200,000 – AED 350,000+</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Special Billing Requirements / Cost Center Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="Mention specific PO number requirements, cost-center split needs, or custom settlement dates..."
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                    </svg>
                    Submit Corporate Credit Application via WhatsApp
                  </button>
                  <p className="text-[11px] text-slate-500 text-center mt-2">
                    Note: Initiates a corporate credit assessment inquiry with Victor Mobility and does not constitute an approved credit facility.
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
