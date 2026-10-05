'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface RateCategory {
  id: string;
  name: string;
  models: string;
  capacity: string;
  bestFor: string;
  rates: {
    halfDay: string;
    fullDay: string;
    extendedDay: string;
    extraKm: string;
    extraHour: string;
    monthlyRetainer: string;
    outstationPerKm: string;
    driverBata: string;
  };
}

export interface VolumeTier {
  tierId: string;
  name: string;
  fleetRange: string;
  rebate: string;
  perks: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EnterpriseRateCardDeskProps {
  region: 'india' | 'uae';
  title: string;
  eyebrow: string;
  description: string;
  currency: string;
  currencySymbol: string;
  categories: RateCategory[];
  volumeTiers: VolumeTier[];
  inclusions: string[];
  exclusions: string[];
  faqs: FaqItem[];
  phone: string;
  whatsapp: string;
  supportHours: string;
}

export default function EnterpriseRateCardDesk({
  region,
  title,
  eyebrow,
  description,
  currency,
  currencySymbol,
  categories,
  volumeTiers,
  inclusions,
  exclusions,
  faqs,
  phone,
  whatsapp,
  supportHours,
}: EnterpriseRateCardDeskProps) {
  const isIndia = region === 'india';

  // State
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(categories[0]?.id || 'executive-sedan');
  const currentCategory = categories.find((c) => c.id === selectedCategoryId) || categories[0];

  // Active view tab
  const [activeTab, setActiveTab] = useState<'matrix' | 'calculator' | 'msa' | 'faqs'>('matrix');

  // Calculator State
  const [calcFleetCount, setCalcFleetCount] = useState<number>(3);
  const [calcDuration, setCalcDuration] = useState<'monthly' | 'annual'>('monthly');

  // Determine volume tier rebate
  const getVolumeRebate = (count: number) => {
    if (isIndia) {
      if (count >= 20) return 0.15;
      if (count >= 6) return 0.08;
      return 0.0;
    } else {
      if (count >= 10) return 0.12;
      if (count >= 4) return 0.07;
      return 0.0;
    }
  };

  const getTierLabel = (count: number) => {
    if (isIndia) {
      if (count >= 20) return 'Tier 3: Campus & Tech Park Master MSA (15% Rebate)';
      if (count >= 6) return 'Tier 2: Enterprise Fleet Growth (8% Rebate)';
      return 'Tier 1: Standard Corporate Retainer';
    } else {
      if (count >= 10) return 'Tier 3: Sovereign & Global Enterprise MSA (12% Rebate)';
      if (count >= 4) return 'Tier 2: Corporate Retainer (7% Rebate)';
      return 'Tier 1: Standard Executive Account';
    }
  };

  // Base numerical monthly estimate
  const getBaseMonthlyRate = (catId: string) => {
    if (isIndia) {
      switch (catId) {
        case 'executive-sedan': return 58000;
        case 'corporate-mpv': return 96000;
        case 'premium-saloon': return 185000;
        case 'luxury-minibus': return 145000;
        case 'commuter-coach': return 210000;
        default: return 75000;
      }
    } else {
      switch (catId) {
        case 'first-class-saloon': return 24000;
        case 'ultra-luxury': return 48000;
        case 'executive-suv': return 32000;
        case 'vip-coach': return 35000;
        default: return 28000;
      }
    }
  };

  const baseMonthly = getBaseMonthlyRate(selectedCategoryId);
  const rebateRate = getVolumeRebate(calcFleetCount);
  const grossMonthly = baseMonthly * calcFleetCount;
  const netMonthly = Math.round(grossMonthly * (1 - rebateRate));
  const monthlySavings = grossMonthly - netMonthly;
  const multiplier = calcDuration === 'annual' ? 12 : 1;
  const totalInvestment = netMonthly * multiplier;
  const totalSavings = monthlySavings * multiplier;

  // WhatsApp Inquiry Generator
  const generateWhatsAppMessage = () => {
    const rawNumber = whatsapp.replace(/[^0-9]/g, '');
    const text = [
      `*Enterprise Rate Card & Retainer Contract Inquiry — Victor Mobility (${isIndia ? 'India' : 'UAE'})*`,
      `Vehicle Category: ${currentCategory.name} (${currentCategory.models})`,
      `Contract Duration: ${calcDuration === 'annual' ? '12-Month Annual Master Contract' : 'Monthly Dedicated Retainer (26 Days)'}`,
      `Fleet Volume: ${calcFleetCount} dedicated vehicles`,
      `Volume Discount Tier: ${getTierLabel(calcFleetCount)}`,
      `Estimated Investment: ${currencySymbol}${totalInvestment.toLocaleString()} (Estimated Savings: ${currencySymbol}${totalSavings.toLocaleString()})`,
      '',
      'Please share a formal Corporate Tariff Schedule, Master Services Agreement (MSA) template, and credit onboarding documentation.',
      '',
      '_Note: This WhatsApp message initiates an enterprise tariff inquiry with Victor Mobility and does not constitute a signed contract._',
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

          {/* Key Commercial Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800 print:border-slate-300">
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Credit Terms</span>
              <span className="text-2xl font-bold text-amber-400 print:text-black">30-Day Net</span>
              <span className="text-xs text-slate-500 block mt-1">Fortnightly Invoicing</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Volume Rebate</span>
              <span className="text-2xl font-bold text-emerald-400 print:text-black">Up to 15%</span>
              <span className="text-xs text-slate-500 block mt-1">Enterprise Fleet Slabs</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Hot-Swap SLA</span>
              <span className="text-2xl font-bold text-cyan-400 print:text-black">45 Mins</span>
              <span className="text-xs text-slate-500 block mt-1">Depot Standby Backup</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Tax Compliance</span>
              <span className="text-2xl font-bold text-indigo-400 print:text-black">100% ITC</span>
              <span className="text-xs text-slate-500 block mt-1">{isIndia ? 'SAC 9966 Compliant' : 'FTA 5% VAT Certified'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs (Hidden in Print) */}
      <div className="sticky top-16 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 print:hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar py-2">
          <nav className="flex space-x-2" aria-label="Rate Card Navigation">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'matrix'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Master Tariff Matrix
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'calculator'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Volume Rebate Calculator
            </button>
            <button
              onClick={() => setActiveTab('msa')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'msa'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              MSA &amp; Governance
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
              title="Print Rate Card Dossier"
            >
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Tariff Dossier
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 print:py-4">
        {/* Tab 1: Master Tariff Matrix */}
        {(activeTab === 'matrix' || typeof window === 'undefined') && (
          <section className="mb-12 print:block">
            {/* Category Selector Chips */}
            <div className="pb-4 border-b border-slate-800 mb-6 print:border-slate-300">
              <h2 className="text-2xl font-bold text-white print:text-black">
                Select Fleet Category
              </h2>
              <p className="text-sm text-slate-400 mt-1 print:text-slate-600">
                Explore transparent hourly rental slabs, dedicated monthly retainers, and outstation rates across vehicle classes.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8 print:hidden">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`p-3.5 rounded-xl border text-left transition ${
                    selectedCategoryId === cat.id
                      ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span className="block text-xs uppercase tracking-wider font-bold text-amber-400 truncate mb-1">
                    {cat.capacity}
                  </span>
                  <span className="block text-sm font-bold text-white truncate">{cat.name}</span>
                  <span className="block text-[11px] text-slate-500 truncate mt-0.5">{cat.models.split('/')[0]}</span>
                </button>
              ))}
            </div>

            {/* Selected Category Comprehensive Tariff Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl print:border-slate-300 print:bg-white print:text-black mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 print:border-slate-300 gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-amber-400">
                    Category Specification &amp; Standard Tariff
                  </span>
                  <h3 className="text-2xl font-bold text-white print:text-black mt-1">
                    {currentCategory.name}
                  </h3>
                  <p className="text-sm text-slate-300 print:text-slate-600 mt-1">
                    <strong>Fleet Models:</strong> {currentCategory.models} · <span className="text-emerald-400">{currentCategory.capacity}</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    <strong>Primary Application:</strong> {currentCategory.bestFor}
                  </p>
                </div>
                <div className="text-left sm:text-right bg-slate-950/60 p-4 rounded-lg border border-slate-800/80 print:bg-slate-50 print:border-slate-300">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Dedicated Monthly Retainer</span>
                  <span className="text-2xl font-black text-amber-400 print:text-black">{currentCategory.rates.monthlyRetainer}</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">26 Operational Days · Chauffeur Included</span>
                </div>
              </div>

              {/* Tariff Rates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                {/* Local Spot Rentals */}
                <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-5 space-y-3 print:bg-slate-50 print:border-slate-300">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 print:text-black">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    Local Spot Rentals
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Half Day (4h / 40 km):</span>
                      <strong className="text-white print:text-black">{currentCategory.rates.halfDay}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Full Day (8h / 80 km):</span>
                      <strong className="text-white print:text-black">{currentCategory.rates.fullDay}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Extended Day (12h / 120 km):</span>
                      <strong className="text-white print:text-black">{currentCategory.rates.extendedDay}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Extra Kilometre:</span>
                      <strong className="text-amber-400 print:text-black">{currentCategory.rates.extraKm}</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Extra Hour:</span>
                      <strong className="text-amber-400 print:text-black">{currentCategory.rates.extraHour}</strong>
                    </div>
                  </div>
                </div>

                {/* Monthly Dedicated Retainers */}
                <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-5 space-y-3 print:bg-slate-50 print:border-slate-300">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 print:text-black">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Monthly Dedicated Retainer
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Commitment Period:</span>
                      <strong className="text-white print:text-black">26 Operational Days</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Included Distance:</span>
                      <strong className="text-white print:text-black">2,600 km / month</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Chauffeur Salary &amp; Fuel:</span>
                      <strong className="text-emerald-400 print:text-black">100% Included</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Replacement Guarantee:</span>
                      <strong className="text-white print:text-black">45-Min Hot Swap</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Corporate Credit:</span>
                      <strong className="text-cyan-400 print:text-black">30-Day Net Credit</strong>
                    </div>
                  </div>
                </div>

                {/* Outstation & Interstate */}
                <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-5 space-y-3 print:bg-slate-50 print:border-slate-300">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 print:text-black">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    Outstation &amp; Inter-City
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Per-Kilometre Rate:</span>
                      <strong className="text-white print:text-black">{currentCategory.rates.outstationPerKm}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Driver Night Bata:</span>
                      <strong className="text-white print:text-black">{currentCategory.rates.driverBata}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Permit &amp; Tolls:</span>
                      <strong className="text-amber-400 print:text-black">Actual Toll Logs</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">GPS Live Sharing:</span>
                      <strong className="text-emerald-400 print:text-black">Mandatory AIS-140</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Billing Cycle:</span>
                      <strong className="text-white print:text-black">Consolidated Duty Slip</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-6 border-t border-slate-800 print:hidden">
                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-lg transition shadow-lg shadow-amber-500/10"
                >
                  Request Contract Schedule on WhatsApp
                </a>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-lg border border-slate-700 transition"
                >
                  Print Selected Category Dossier
                </button>
              </div>
              <p className="text-[11px] text-slate-500 text-center mt-3 print:hidden">
                Prefills WhatsApp corporate inquiry with Victor Mobility commercial desk. Standard corporate terms apply.
              </p>
            </div>

            {/* Inclusions & Exclusions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:border-slate-300">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 print:border-slate-300 print:bg-white print:text-black">
                <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  What Is Included in Standard Tariffs
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-300 print:text-slate-700">
                  {inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 print:border-slate-300 print:bg-white print:text-black">
                <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Disclosed Out-of-Pocket Actuals
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-300 print:text-slate-700">
                  {exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Tab 2: Volume Rebate & Fleet Sizing Calculator */}
        {activeTab === 'calculator' && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-2xl font-bold text-white">Enterprise Volume Rebate &amp; Retainer Calculator</h2>
              <p className="text-sm text-slate-400 mt-1">
                Calculate total monthly and annual mobility expenditures with automatic enterprise volume rebate tier adjustments.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Controls (5 Cols) */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
                {/* 1. Fleet Category */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    1. Select Vehicle Category
                  </label>
                  <select
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.models.split('/')[0]})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Contract Horizon */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    2. Contract Horizon
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setCalcDuration('monthly')}
                      className={`p-3 rounded-lg border text-xs font-bold transition ${
                        calcDuration === 'monthly'
                          ? 'bg-amber-500/15 border-amber-500 text-amber-400'
                          : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      Monthly Retainer (26 Days)
                    </button>
                    <button
                      onClick={() => setCalcDuration('annual')}
                      className={`p-3 rounded-lg border text-xs font-bold transition ${
                        calcDuration === 'annual'
                          ? 'bg-amber-500/15 border-amber-500 text-amber-400'
                          : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      Annual Contract (12 Months)
                    </button>
                  </div>
                </div>

                {/* 3. Dedicated Fleet Volume */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      3. Dedicated Fleet Size
                    </label>
                    <span className="text-sm font-bold text-amber-400">{calcFleetCount} Vehicles</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={calcFleetCount}
                    onChange={(e) => setCalcFleetCount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>1 Vehicle</span>
                    <span>10 Fleet</span>
                    <span>20 Campus</span>
                    <span>30+ MSA</span>
                  </div>
                </div>

                {/* Volume Tier Badge */}
                <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Applied Enterprise Slab</span>
                  <span className="font-bold text-emerald-400">{getTierLabel(calcFleetCount)}</span>
                </div>
              </div>

              {/* Dynamic Calculation Outputs (7 Cols) */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Estimated Corporate Budget
                    </span>
                    <h3 className="text-xl font-bold text-white mt-0.5">
                      {calcFleetCount}x {currentCategory.name} Retainer
                    </h3>
                  </div>
                  <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded">
                    {(rebateRate * 100).toFixed(0)}% Rebate Unlocked
                  </span>
                </div>

                {/* Financial Summary Slabs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <span className="text-xs text-slate-400 font-medium">Standard Gross Tariff</span>
                    <p className="text-xl font-black text-slate-300 mt-1 line-through">
                      {currencySymbol}{(grossMonthly * multiplier).toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Benchmark baseline</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <span className="text-xs text-slate-400 font-medium">Enterprise Volume Rebate</span>
                    <p className="text-xl font-black text-emerald-400 mt-1">
                      -{currencySymbol}{totalSavings.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">Direct corporate savings</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/60 border border-amber-500/40 bg-amber-500/5">
                    <span className="text-xs text-amber-400 font-medium">Net Contract Investment</span>
                    <p className="text-2xl font-black text-amber-400 mt-1">
                      {currencySymbol}{totalInvestment.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">{calcDuration === 'annual' ? 'Per 12-Month Contract' : 'Per Month (26 Days)'}</p>
                  </div>
                </div>

                {/* Operations Specifications */}
                <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 text-xs space-y-2 text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Assigned Chauffeurs:</span>
                    <span className="text-white font-semibold">{calcFleetCount} Uniformed Badged Drivers</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Included Distance Pool:</span>
                    <span className="text-white font-semibold">{(calcFleetCount * 2600 * multiplier).toLocaleString()} km allowance</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Hot-Swap Backup Fleet:</span>
                    <span className="text-emerald-400 font-semibold">{Math.max(1, Math.ceil(calcFleetCount * 0.15))} Standby Vehicle(s)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Credit Billing Terms:</span>
                    <span className="text-cyan-400 font-semibold">30-Day Net Corporate Credit</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-lg transition shadow-lg shadow-amber-500/10"
                  >
                    Send Rate Inquiry on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab 3: MSA & Corporate Governance */}
        {activeTab === 'msa' && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-2xl font-bold text-white">Master Services Agreement (MSA) &amp; Onboarding</h2>
              <p className="text-sm text-slate-400 mt-1">
                Our institutional onboarding protocol ensures seamless compliance, credit risk underwriting, and service level guarantee.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Step 01</span>
                <h4 className="text-base font-bold text-white">Vendor KYC &amp; Verification</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Submission of corporate GSTIN/TRN, certificate of incorporation, PAN, and billing contact details for compliance check.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Step 02</span>
                <h4 className="text-base font-bold text-white">Master Agreement Sign-Off</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Execution of bilateral MSA covering standard tariffs, contracted vehicle specifications, and non-disclosure obligations.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Step 03</span>
                <h4 className="text-base font-bold text-white">30-Day Credit Approval</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Commercial finance team approves credit limit, setting up electronic invoicing delivered within 48 hours of cycle end.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Step 04</span>
                <h4 className="text-base font-bold text-white">Fleet &amp; Chauffeur Staging</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Dedicated vehicles detailed, RFID tags attached, verified chauffeurs briefed, and live telematics portal access activated.
                </p>
              </div>
            </div>

            {/* Volume Tiers Grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Enterprise Volume Discount Tiers</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {volumeTiers.map((tier) => (
                  <div key={tier.tierId} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{tier.fleetRange}</span>
                      <h4 className="text-lg font-bold text-white mt-1 mb-1">{tier.name}</h4>
                      <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4">
                        {tier.rebate}
                      </span>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {tier.perks.map((perk, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-400 mt-0.5">•</span>
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Tab 4: Procurement FAQs */}
        {activeTab === 'faqs' && (
          <section className="mb-12 print:block">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-2xl font-bold text-white">Corporate Procurement &amp; Tariff FAQs</h2>
              <p className="text-sm text-slate-400 mt-1">
                Common questions on Master Services Agreements, billing reconciliation, vehicle substitutions, and credit limits.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="text-amber-400 font-bold">Q:</span> {faq.question}
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
