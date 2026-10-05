'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface DutySlip {
  slipId: string;
  service: string;
  client: string;
  passenger: string;
  date: string;
  vehicle: string;
  chauffeur: string;
  startKm: string;
  endKm: string;
  totalKm: string;
  totalHours: string;
  tolls: string;
  parking: string;
  gpsVerified: string;
  signatureStatus: string;
}

export interface GstRate {
  rate: string;
  description: string;
  eligibility: string;
}

export interface TaxFramework {
  sacCode: string;
  category: string;
  gstRates: GstRate[];
  compliancePoints: string[];
}

export interface CreditTerms {
  standardPeriod: string;
  billingCycle: string;
  paymentModes: string;
  disputeProtocol: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CorporateBillingDeskProps {
  region: 'india' | 'uae';
  title: string;
  eyebrow: string;
  description: string;
  taxFramework: TaxFramework;
  creditTerms: CreditTerms;
  sampleDutySlips: DutySlip[];
  faqs: FaqItem[];
  phone: string;
  whatsapp: string;
  supportHours: string;
}

export default function CorporateBillingDesk({
  region,
  title,
  eyebrow,
  description,
  taxFramework,
  creditTerms,
  sampleDutySlips,
  faqs,
  phone,
  whatsapp,
  supportHours,
}: CorporateBillingDeskProps) {
  const isIndia = region === 'india';
  const currencySymbol = isIndia ? '₹' : 'AED ';

  // State management
  const [activeTab, setActiveTab] = useState<'dutyslip' | 'calculator' | 'terms' | 'faqs'>('dutyslip');
  const [selectedSlipIdx, setSelectedSlipIdx] = useState<number>(0);
  const currentSlip = sampleDutySlips[selectedSlipIdx] || sampleDutySlips[0];

  // Calculator State
  const defaultSpend = isIndia ? 250000 : 25000;
  const [monthlySpend, setMonthlySpend] = useState<number>(defaultSpend);
  const [selectedTaxRateIdx, setSelectedTaxRateIdx] = useState<number>(isIndia ? 1 : 0); // Default to 12% in India for ITC
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Calculations
  const activeTaxRate = taxFramework.gstRates[selectedTaxRateIdx] || taxFramework.gstRates[0];
  const ratePercentage = isIndia ? (selectedTaxRateIdx === 0 ? 0.05 : 0.12) : 0.05;
  const taxAmount = Math.round(monthlySpend * ratePercentage);
  const itcSavings = isIndia && selectedTaxRateIdx === 1 ? taxAmount : isIndia ? 0 : Math.round(taxAmount * 0.95);
  const netEffectiveCost = monthlySpend + taxAmount - itcSavings;
  const workingCapitalBenefit = Math.round((monthlySpend / 30) * 30); // 30-day float

  // WhatsApp Inquiry Generator
  const generateWhatsAppMessage = () => {
    const rawNumber = whatsapp.replace(/[^0-9]/g, '');
    const text = [
      `*Corporate Billing & Account Onboarding Inquiry — Victor Mobility (${isIndia ? 'India' : 'UAE'})*`,
      `Estimated Monthly Transit Spend: ${currencySymbol}${monthlySpend.toLocaleString()}`,
      `Selected Invoicing Preference: ${activeTaxRate.rate} (${activeTaxRate.description.slice(0, 60)}...)`,
      `Requested Credit Facility: 30-Day Net Corporate Credit`,
      `SAC / Tax Category: ${taxFramework.sacCode}`,
      '',
      'Please send your corporate account onboarding packet, sample tax invoice format, and master service agreement (MSA).',
      '',
      '_Note: This WhatsApp message initiates a corporate billing discussion with Victor Mobility and does not constitute a signed contract._',
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
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Tax Compliance</span>
              <span className="text-2xl font-bold text-amber-400 print:text-black">{isIndia ? 'SAC 9966' : 'FTA 5% VAT'}</span>
              <span className="text-xs text-slate-500 block mt-1">100% ITC Eligible</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Corporate Credit</span>
              <span className="text-2xl font-bold text-emerald-400 print:text-black">30-Day Net</span>
              <span className="text-xs text-slate-500 block mt-1">Working Capital Friendly</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Duty Slip Verification</span>
              <span className="text-2xl font-bold text-cyan-400 print:text-black">AIS-140 GPS</span>
              <span className="text-xs text-slate-500 block mt-1">Digital Odometer Stamp</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Invoice SLA</span>
              <span className="text-2xl font-bold text-amber-400 print:text-black">&lt; 48 Hours</span>
              <span className="text-xs text-slate-500 block mt-1">Month-End Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs (Hidden in Print) */}
      <div className="sticky top-16 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 print:hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar py-2">
          <nav className="flex space-x-2" aria-label="Billing Sections">
            <button
              onClick={() => setActiveTab('dutyslip')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'dutyslip'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Digital Duty Slip Inspector
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'calculator'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              GST / VAT &amp; ITC Reconciler
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'terms'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Corporate Credit Terms
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'faqs'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Billing FAQs
            </button>
          </nav>

          <div className="flex items-center gap-2 pl-4">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded border border-slate-700 transition"
              title="Print Sample Duty Slip & Dossier"
            >
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Duty Slip Dossier
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 print:py-4">
        {/* Tab 1: Digital Duty Slip Inspector */}
        {(activeTab === 'dutyslip' || typeof window === 'undefined') && (
          <section className="mb-12 print:block">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 mb-6 gap-2">
              <div>
                <h2 className="text-2xl font-bold text-white print:text-black">Digital Duty Slip Audit Inspector</h2>
                <p className="text-sm text-slate-400 mt-1 print:text-slate-600">
                  Inspect authentic corporate trip records with automated GPS odometer readings, Fastag/Salik toll logging, and passenger OTP authentication.
                </p>
              </div>

              {/* Sample Selector Chips */}
              <div className="flex gap-2 print:hidden">
                {sampleDutySlips.map((slip, idx) => (
                  <button
                    key={slip.slipId}
                    onClick={() => setSelectedSlipIdx(idx)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition ${
                      selectedSlipIdx === idx
                        ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {slip.slipId} ({slip.service.split(' ')[0]})
                  </button>
                ))}
              </div>
            </div>

            {/* Duty Slip Card Presentation */}
            <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden print:border-slate-400 print:bg-white print:text-black">
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 print:border-slate-300 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded print:text-slate-900 print:border-slate-400">
                      VICTOR MOBILITY · VERIFIED MANIFEST
                    </span>
                    <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded print:hidden">
                      {currentSlip.gpsVerified}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 print:text-black">
                    Duty Slip: {currentSlip.slipId}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 print:text-slate-600">
                    Service: <strong className="text-slate-200 print:text-black">{currentSlip.service}</strong> | Date: {currentSlip.date}
                  </p>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2 text-right shrink-0 print:border-slate-300 print:bg-slate-50">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Corporate Client</span>
                  <span className="text-sm font-bold text-white print:text-black">{currentSlip.client}</span>
                  <span className="text-[11px] text-amber-300/90 block mt-0.5">{currentSlip.passenger}</span>
                </div>
              </div>

              {/* Trip Data Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-b border-slate-800 print:border-slate-300">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 print:border-slate-200 print:bg-slate-50">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Assigned Fleet</span>
                  <p className="text-sm font-bold text-white mt-1 print:text-black">{currentSlip.vehicle}</p>
                  <span className="text-xs text-emerald-400 block mt-1">Pre-Trip Inspected</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 print:border-slate-200 print:bg-slate-50">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Verified Chauffeur</span>
                  <p className="text-sm font-bold text-white mt-1 print:text-black">{currentSlip.chauffeur}</p>
                  <span className="text-xs text-cyan-400 block mt-1">0.00% BAC Cleared</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 print:border-slate-200 print:bg-slate-50">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Distance Traveled</span>
                  <p className="text-2xl font-black text-amber-400 mt-1 print:text-black">{currentSlip.totalKm}</p>
                  <span className="text-xs text-slate-400 block mt-0.5">Duration: {currentSlip.totalHours}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 print:border-slate-200 print:bg-slate-50">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Tolls &amp; Parking</span>
                  <p className="text-sm font-bold text-white mt-1 print:text-black">{currentSlip.tolls}</p>
                  <span className="text-xs text-slate-400 block mt-0.5">Parking: {currentSlip.parking}</span>
                </div>
              </div>

              {/* Odometer Detailed Breakdown */}
              <div className="py-6 border-b border-slate-800 print:border-slate-300 text-xs space-y-3">
                <div className="flex flex-col sm:flex-row justify-between py-1 border-b border-slate-800/60 gap-1">
                  <span className="text-slate-400">Departure Depot / Reporting:</span>
                  <span className="font-semibold text-white print:text-black">{currentSlip.startKm}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between py-1 border-b border-slate-800/60 gap-1">
                  <span className="text-slate-400">Release Location / Closing:</span>
                  <span className="font-semibold text-white print:text-black">{currentSlip.endKm}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between py-1 gap-1">
                  <span className="text-slate-400">Passenger Authentication:</span>
                  <span className="font-semibold text-emerald-400 print:text-black">{currentSlip.signatureStatus}</span>
                </div>
              </div>

              {/* Bottom Footer Actions */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  <span>SAC / Tax Code: <strong className="text-slate-300">{taxFramework.sacCode}</strong></span>
                  <span className="mx-2">·</span>
                  <span>Invoice Cycle: <strong className="text-slate-300">{creditTerms.standardPeriod}</strong></span>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition"
                  >
                    Open Corporate Account on WhatsApp
                  </a>
                  <button
                    onClick={handlePrint}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-lg border border-slate-700 transition"
                  >
                    Print Duty Slip
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab 2: GST / VAT & ITC Reconciler */}
        {activeTab === 'calculator' && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-2xl font-bold text-white">Enterprise GST / VAT &amp; Input Tax Credit Reconciler</h2>
              <p className="text-sm text-slate-400 mt-1">
                Calculate corporate tax liabilities, eligible Input Tax Credit (ITC) savings under SAC 9966, and 30-day working capital advantages.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Controls (5 Cols) */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Monthly Transit Expenditure
                    </label>
                    <span className="text-sm font-bold text-amber-400">
                      {currencySymbol}{monthlySpend.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={isIndia ? 25000 : 2500}
                    max={isIndia ? 2500000 : 250000}
                    step={isIndia ? 25000 : 2500}
                    value={monthlySpend}
                    onChange={(e) => setMonthlySpend(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>{currencySymbol}{isIndia ? '25K' : '2.5K'}</span>
                    <span>{currencySymbol}{isIndia ? '500K' : '50K'}</span>
                    <span>{currencySymbol}{isIndia ? '1.5M' : '150K'}</span>
                    <span>{currencySymbol}{isIndia ? '2.5M+' : '250K+'}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Select Tax &amp; Invoicing Model
                  </label>
                  <div className="space-y-2">
                    {taxFramework.gstRates.map((rate, idx) => (
                      <button
                        key={rate.rate}
                        onClick={() => setSelectedTaxRateIdx(idx)}
                        className={`w-full text-left p-3 rounded-lg border text-xs transition ${
                          selectedTaxRateIdx === idx
                            ? 'bg-amber-500/15 border-amber-500 text-white font-semibold'
                            : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sm text-white">{rate.rate}</span>
                          <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-1.5 py-0.5 rounded">
                            {idx === 1 && isIndia ? '100% ITC Eligible' : 'Standard'}
                          </span>
                        </div>
                        <p className="text-slate-400 leading-relaxed">{rate.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Financial Reconciliation Output (7 Cols) */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Corporate Tax Reconciliation
                    </span>
                    <h3 className="text-xl font-bold text-white mt-0.5">
                      Net Effective Spend Blueprint
                    </h3>
                  </div>
                  <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded">
                    SAC 9966 Compliant
                  </span>
                </div>

                {/* Financial Summary Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <span className="text-xs text-slate-400 font-medium">Base Transit Fare</span>
                    <p className="text-2xl font-black text-white mt-1">
                      {currencySymbol}{monthlySpend.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">Net fleet lease &amp; trip charges</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <span className="text-xs text-slate-400 font-medium">Billed GST / VAT ({activeTaxRate.rate})</span>
                    <p className="text-2xl font-black text-amber-400 mt-1">
                      +{currencySymbol}{taxAmount.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">Rule 46 CGST / FTA Compliant</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <span className="text-xs text-slate-400 font-medium">Input Tax Credit (ITC) Savings</span>
                    <p className="text-2xl font-black text-emerald-400 mt-1">
                      -{currencySymbol}{itcSavings.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">Eligible corporate tax offset</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <span className="text-xs text-slate-400 font-medium">Net Corporate Cost</span>
                    <p className="text-2xl font-black text-cyan-400 mt-1">
                      {currencySymbol}{netEffectiveCost.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">Real bottom-line expenditure</p>
                  </div>
                </div>

                {/* Working Capital Float Box */}
                <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 text-xs space-y-2 text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Payment Facility:</span>
                    <span className="font-semibold text-white">30-Day Net Corporate Credit</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Monthly Working Capital Float:</span>
                    <span className="font-semibold text-amber-300">{currencySymbol}{workingCapitalBenefit.toLocaleString()} retained for 30 days</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Invoice Reconciliation Cadence:</span>
                    <span className="font-semibold text-emerald-300">Delivered within 48 hours of month close</span>
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
                    Open Corporate Account on WhatsApp
                  </a>
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-lg border border-slate-700 transition"
                  >
                    Print Tax Blueprint
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab 3: Corporate Credit Terms */}
        {activeTab === 'terms' && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-2xl font-bold text-white">Corporate Credit Governance &amp; Payment Standards</h2>
              <p className="text-sm text-slate-400 mt-1">
                Designed to integrate seamlessly into corporate procurement systems (SAP, Oracle ERP, Coupa, Tally Prime).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Credit Terms &amp; Settlement
                </h3>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <strong className="text-slate-400 min-w-[120px]">Standard Credit:</strong>
                    <span className="text-white">{creditTerms.standardPeriod} upon invoice submission</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <strong className="text-slate-400 min-w-[120px]">Billing Cycle:</strong>
                    <span className="text-white">{creditTerms.billingCycle}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <strong className="text-slate-400 min-w-[120px]">Payment Channels:</strong>
                    <span className="text-white">{creditTerms.paymentModes}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  Dispute Resolution SLA
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {creditTerms.disputeProtocol}
                </p>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-amber-300/90">
                  <strong>Zero Operational Impact:</strong> Even during line-item reviews, vehicle dispatches and scheduled shift rosters continue without interruption.
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab 4: Corporate FAQs */}
        {activeTab === 'faqs' && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-2xl font-bold text-white">Frequently Asked Questions — Corporate Billing</h2>
              <p className="text-sm text-slate-400 mt-1">
                Common questions from procurement and accounts payable teams regarding tax, duty slips, and credit terms.
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

        {/* Corporate Finance Contact Box */}
        <section className="mt-12 bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-8 print:border-slate-300 print:bg-white print:text-black">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
              Corporate Accounts &amp; Credit Desk
            </span>
            <h3 className="text-2xl font-bold text-white mt-1 mb-3 print:text-black">
              Establish a Central Corporate Billing Facility
            </h3>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed print:text-slate-700">
              Our accounts team partners with CFOs, financial controllers, and procurement heads to configure consolidated GST/VAT billing, digital duty slip reconciliation, and 30-day net credit facilities.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Billing Hotline: <strong className="text-white">{phone}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Accounts Desk: <strong className="text-white">{supportHours}</strong></span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-6 py-3 rounded-lg transition shadow-md"
              >
                Apply for Corporate Account on WhatsApp
              </a>
              <Link
                href={isIndia ? '/india/contact' : '/uae/contact'}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm px-6 py-3 rounded-lg border border-slate-700 transition"
              >
                Contact Accounts Payable Desk
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
