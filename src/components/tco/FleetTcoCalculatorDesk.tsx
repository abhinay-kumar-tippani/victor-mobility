'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export interface VehicleCategory {
  id: string;
  name: string;
  badge: string;
  capexPurchasePrice: number;
  monthlyDepreciation: number;
  monthlyMaintenanceTyres: number;
  monthlyInsuranceTax: number;
  monthlyDriverPayroll: number;
  fuelEconomyKmPerLitre: number;
  victorRetainerMonthlyPerVehicle: number;
  defaultKmPerDay: number;
}

export interface ComparisonModel {
  id: string;
  name: string;
  tagline: string;
  overheadFactor: number;
  summary: string;
  leakages: string[];
}

export interface RiskTransferRow {
  dimension: string;
  selfManaged: string;
  victorManaged: string;
  benefit: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FleetTcoCalculatorDeskProps {
  region: 'india' | 'uae';
  title: string;
  eyebrow: string;
  description: string;
  currency: string;
  currencyCode: string;
  fuelPricePerLitre: number;
  vehicleCategories: VehicleCategory[];
  comparisonModels: ComparisonModel[];
  riskTransferMatrix: RiskTransferRow[];
  faqs: FaqItem[];
  phone: string;
  whatsapp: string;
  supportHours: string;
}

export default function FleetTcoCalculatorDesk({
  region,
  title,
  eyebrow,
  description,
  currency,
  currencyCode,
  fuelPricePerLitre,
  vehicleCategories,
  comparisonModels,
  riskTransferMatrix,
  faqs,
  phone,
  whatsapp,
  supportHours,
}: FleetTcoCalculatorDeskProps) {
  const isIndia = region === 'india';

  // Navigation Tabs: 'simulator' | 'matrix' | 'leakages' | 'faqs'
  const [activeTab, setActiveTab] = useState<'simulator' | 'matrix' | 'leakages' | 'faqs'>('simulator');

  // Interactive Calculator State
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(vehicleCategories[0]?.id || 'sedan');
  const [selectedModelId, setSelectedModelId] = useState<string>(comparisonModels[0]?.id || 'capex-owned');
  const [fleetSize, setFleetSize] = useState<number>(5);
  const [operatingDays, setOperatingDays] = useState<number>(26);

  // Active Category & Current Model
  const activeCategory = vehicleCategories.find((c) => c.id === selectedCategoryId) || vehicleCategories[0];
  const activeModel = comparisonModels.find((m) => m.id === selectedModelId) || comparisonModels[0];

  const [dailyKm, setDailyKm] = useState<number>(activeCategory.defaultKmPerDay || 80);

  // Form State
  const [companyName, setCompanyName] = useState('');
  const [officerName, setOfficerName] = useState('');
  const [officerEmail, setOfficerEmail] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Update daily km when category changes
  const handleCategoryChange = (catId: string) => {
    setSelectedCategoryId(catId);
    const cat = vehicleCategories.find((c) => c.id === catId);
    if (cat) {
      setDailyKm(cat.defaultKmPerDay);
    }
  };

  // Financial Calculations
  const calculations = useMemo(() => {
    const monthlyFuelPerVehicle =
      (dailyKm * operatingDays / activeCategory.fuelEconomyKmPerLitre) * fuelPricePerLitre;

    // Self-managed baseline cost per vehicle
    const baseVehicleCost =
      activeCategory.monthlyDepreciation +
      activeCategory.monthlyMaintenanceTyres +
      activeCategory.monthlyInsuranceTax +
      activeCategory.monthlyDriverPayroll +
      monthlyFuelPerVehicle;

    // Apply overhead factor of selected current model
    const currentCostPerVehicle = Math.round(baseVehicleCost * activeModel.overheadFactor);
    const totalCurrentMonthlyCost = currentCostPerVehicle * fleetSize;
    const totalUpfrontCapex = activeCategory.capexPurchasePrice * fleetSize;

    // Victor Retainer: includes vehicle lease, driver payroll & welfare, maintenance, insurance, plus estimated fuel
    const victorBaseCostPerVehicle = activeCategory.victorRetainerMonthlyPerVehicle;
    // Victor fuel pass-through or fuel-inclusive package
    const victorFuelPerVehicle = Math.round(monthlyFuelPerVehicle * 0.95); // 5% fuel savings from route optimization
    const victorMonthlyPerVehicle = victorBaseCostPerVehicle + victorFuelPerVehicle;
    const totalVictorMonthlyCost = victorMonthlyPerVehicle * fleetSize;

    // Net savings
    const netMonthlySavings = Math.max(0, totalCurrentMonthlyCost - totalVictorMonthlyCost);
    const netAnnualSavings = netMonthlySavings * 12;
    const percentageSavings = totalCurrentMonthlyCost > 0
      ? Math.round((netMonthlySavings / totalCurrentMonthlyCost) * 100)
      : 0;

    return {
      monthlyFuelPerVehicle,
      currentCostPerVehicle,
      totalCurrentMonthlyCost,
      totalUpfrontCapex,
      victorMonthlyPerVehicle,
      totalVictorMonthlyCost,
      netMonthlySavings,
      netAnnualSavings,
      percentageSavings,
    };
  }, [activeCategory, activeModel, fleetSize, operatingDays, dailyKm, fuelPricePerLitre]);

  // Format currency
  const formatAmount = (amount: number) => {
    return `${currency}${amount.toLocaleString(isIndia ? 'en-IN' : 'en-AE')}`;
  };

  // WhatsApp Message Generator
  const generateWhatsAppMessage = () => {
    const rawNumber = whatsapp.replace(/[^0-9]/g, '');
    const company = companyName.trim() || 'Enterprise Client';
    const officer = officerName.trim() || 'Finance / Procurement Desk';
    const email = officerEmail.trim() || 'Not specified';
    const notes = additionalNotes.trim() ? `\nTransition Notes: ${additionalNotes.trim()}` : '';

    const text = [
      `*Enterprise Fleet TCO & CAPEX Transition Audit — Victor Mobility (${isIndia ? 'India' : 'UAE'})*`,
      `Client Entity: ${company}`,
      `Procurement / CFO Contact: ${officer} (${email})`,
      `Selected Fleet: ${fleetSize}x ${activeCategory.name}`,
      `Current Fleet Setup: ${activeModel.name}`,
      `Operational Parameters: ${dailyKm} km/day · ${operatingDays} days/month`,
      '',
      `*Financial Transition Model Results:*`,
      `• Current Monthly Spend: ${formatAmount(calculations.totalCurrentMonthlyCost)}`,
      `• Victor Retainer Spend: ${formatAmount(calculations.totalVictorMonthlyCost)}`,
      `• Projected Monthly Net Savings: ${formatAmount(calculations.netMonthlySavings)} (${calculations.percentageSavings}% reduction)`,
      `• Projected Annual Savings: ${formatAmount(calculations.netAnnualSavings)}`,
      `• Capital Expenditure Unlocked: ${formatAmount(calculations.totalUpfrontCapex)}`,
      notes,
      '',
      'Please schedule an institutional fleet financial review and provide a Master Services Agreement (MSA) proposal.',
      '',
      '_Note: This WhatsApp message initiates an enterprise fleet TCO inquiry with Victor Mobility and does not constitute a signed contract._',
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4 print:text-slate-800 print:border-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse print:hidden"></span>
            {eyebrow}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 print:text-black">
            {title}
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed mb-8 print:text-slate-700">
            {description}
          </p>

          {/* Key Financial Impact Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800 print:border-slate-300">
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                Estimated Monthly Savings
              </span>
              <span className="text-2xl font-bold text-cyan-400 block mt-1 print:text-black">
                {formatAmount(calculations.netMonthlySavings)}
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                {calculations.percentageSavings}% Cost Reduction
              </span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                Annual Run-Rate Benefit
              </span>
              <span className="text-2xl font-bold text-emerald-400 block mt-1 print:text-black">
                {formatAmount(calculations.netAnnualSavings)}
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                Full Financial Year Savings
              </span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                Working Capital Unlocked
              </span>
              <span className="text-2xl font-bold text-amber-400 block mt-1 print:text-black">
                {formatAmount(calculations.totalUpfrontCapex)}
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                0% CAPEX · 100% Tax OPEX
              </span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                Downtime Guarantee
              </span>
              <span className="text-2xl font-bold text-indigo-400 block mt-1 print:text-black">
                30–45 Mins
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                Guaranteed Standby Swap
              </span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-4 print:hidden">
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 text-sm font-medium transition cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Financial TCO Audit
            </button>
            <a
              href="#cfo-transition-inquiry"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 text-sm transition"
            >
              Request Custom CFO Fleet Audit
            </a>
            <span className="text-xs text-slate-400">
              Direct Corporate Support: <strong className="text-white">{supportHours}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 mb-8 overflow-x-auto print:hidden">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'simulator'
                ? 'border-cyan-400 text-cyan-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Interactive TCO Simulator &amp; Spend Model
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'matrix'
                ? 'border-cyan-400 text-cyan-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            CAPEX vs OPEX Risk Transfer Matrix
          </button>
          <button
            onClick={() => setActiveTab('leakages')}
            className={`px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'leakages'
                ? 'border-cyan-400 text-cyan-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Current Model Leakage Analysis
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'faqs'
                ? 'border-cyan-400 text-cyan-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            CFO &amp; Procurement FAQs
          </button>
        </div>

        {/* Tab 1: Interactive TCO Simulator */}
        {(activeTab === 'simulator' || typeof window === 'undefined') && (
          <div className="space-y-8">
            {/* Simulator Controls & Results Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Controls: Parameters */}
              <div className="lg:col-span-6 space-y-6">
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                    Configure Corporate Fleet Parameters
                  </h2>

                  {/* 1. Vehicle Category Selection */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      1. Vehicle Classification
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {vehicleCategories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleCategoryChange(cat.id)}
                          className={`p-3 rounded-xl text-left border transition cursor-pointer ${
                            cat.id === selectedCategoryId
                              ? 'bg-cyan-500/10 border-cyan-500/50 text-white'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-cyan-300 block w-fit mb-1">
                            {cat.badge}
                          </span>
                          <span className="text-xs font-bold block text-white line-clamp-1">
                            {cat.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Current Procurement Setup */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      2. Current Fleet Setup
                    </label>
                    <div className="space-y-2">
                      {comparisonModels.map((model) => (
                        <button
                          key={model.id}
                          type="button"
                          onClick={() => setSelectedModelId(model.id)}
                          className={`w-full p-3 rounded-xl text-left border transition cursor-pointer flex items-center justify-between ${
                            model.id === selectedModelId
                              ? 'bg-cyan-500/10 border-cyan-500/50 text-white'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          <div>
                            <span className="text-xs font-bold text-white block">
                              {model.name}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {model.tagline}
                            </span>
                          </div>
                          <span className="text-xs font-mono font-semibold px-2 py-1 rounded bg-slate-800 text-amber-300">
                            +{Math.round((model.overheadFactor - 1) * 100)}% Leakage
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Sliders: Fleet Size, Daily Km, Operating Days */}
                  <div className="space-y-4 pt-2 border-t border-slate-800">
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-slate-400 font-medium">Fleet Size (Dedicated Vehicles)</span>
                        <span className="text-cyan-300 font-bold font-mono text-sm">{fleetSize} Vehicles</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={fleetSize}
                        onChange={(e) => setFleetSize(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                        <span>1 vehicle</span>
                        <span>10</span>
                        <span>25</span>
                        <span>50 vehicles</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-slate-400 font-medium">Average Distance per Vehicle / Day</span>
                        <span className="text-cyan-300 font-bold font-mono text-sm">{dailyKm} km / day</span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="240"
                        step="10"
                        value={dailyKm}
                        onChange={(e) => setDailyKm(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                        <span>40 km</span>
                        <span>120 km</span>
                        <span>240 km</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-slate-400 font-medium">Monthly Operating Schedule</span>
                        <span className="text-cyan-300 font-bold font-mono text-sm">{operatingDays} Days / Month</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        {[22, 26, 30].map((days) => (
                          <button
                            key={days}
                            type="button"
                            onClick={() => setOperatingDays(days)}
                            className={`py-1.5 px-3 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                              operatingDays === days
                                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {days} Days {days === 22 ? '(Mon-Fri)' : days === 26 ? '(Standard)' : '(24/7 Ops)'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Output: Comparative Cost Analysis & Savings Card */}
              <div className="lg:col-span-6 space-y-6">
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6 print:bg-white print:border-slate-300 print:text-black">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold block mb-1">
                      Financial TCO Analysis
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white print:text-black">
                      Monthly Spend &amp; Savings Audit
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Based on {fleetSize}x {activeCategory.name} running {dailyKm} km/day over {operatingDays} days/month.
                    </p>
                  </div>

                  {/* Side-by-side Big Spend Comparison */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-900/40 print:bg-slate-50 print:border-slate-300">
                      <span className="text-xs font-semibold text-rose-400 block mb-1">
                        Current Setup Spend
                      </span>
                      <span className="text-xl sm:text-2xl font-bold font-mono text-white print:text-black">
                        {formatAmount(calculations.totalCurrentMonthlyCost)}
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-1">
                        {formatAmount(calculations.currentCostPerVehicle)} / vehicle / mo
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/50 print:bg-slate-50 print:border-slate-300">
                      <span className="text-xs font-semibold text-cyan-400 block mb-1">
                        Victor Retainer Spend
                      </span>
                      <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-300 print:text-black">
                        {formatAmount(calculations.totalVictorMonthlyCost)}
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-1">
                        {formatAmount(calculations.victorMonthlyPerVehicle)} / vehicle / mo
                      </span>
                    </div>
                  </div>

                  {/* Visual Spend Breakdown Progress Bars */}
                  <div className="space-y-3 pt-2 border-t border-slate-800">
                    <span className="text-xs font-semibold text-slate-300 block">
                      Cost Allocation Breakdown (Per Vehicle / Month)
                    </span>

                    <div className="space-y-2 text-xs">
                      <div>
                        <div className="flex justify-between text-slate-400 mb-1">
                          <span>Driver Payroll &amp; Statutory EPF/ESIC</span>
                          <span className="text-white font-mono">{formatAmount(activeCategory.monthlyDriverPayroll)}</span>
                        </div>
                        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: '40%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-400 mb-1">
                          <span>Vehicle Depreciation &amp; Asset Financing</span>
                          <span className="text-white font-mono">{formatAmount(activeCategory.monthlyDepreciation)}</span>
                        </div>
                        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-400 mb-1">
                          <span>Scheduled Servicing, Tyres &amp; Maintenance</span>
                          <span className="text-white font-mono">{formatAmount(activeCategory.monthlyMaintenanceTyres)}</span>
                        </div>
                        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                          <div className="bg-cyan-500 h-full rounded-full" style={{ width: '15%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-400 mb-1">
                          <span>Commercial Insurance &amp; Road Tax Schedule</span>
                          <span className="text-white font-mono">{formatAmount(activeCategory.monthlyInsuranceTax)}</span>
                        </div>
                        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-500 h-full rounded-full" style={{ width: '15%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 print:text-slate-800 print:border-slate-300">
                    <strong className="text-emerald-400 font-semibold block text-sm mb-1">
                      CFO Value Proposition:
                    </strong>
                    Switching {fleetSize} vehicles to a Victor Mobility managed retainer generates{' '}
                    <strong className="text-white font-mono">{formatAmount(calculations.netMonthlySavings)}</strong> monthly net savings ({calculations.percentageSavings}% overall spend reduction), while unlocking{' '}
                    <strong className="text-white font-mono">{formatAmount(calculations.totalUpfrontCapex)}</strong> in capital expenditure.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: CAPEX vs OPEX Risk Transfer Matrix */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                CAPEX vs OPEX Institutional Risk Transfer Schedule
              </h2>
              <p className="text-sm text-slate-400">
                Detailed side-by-side risk assessment showing how Victor Mobility transfers vehicle depreciation, unscheduled downtime, and statutory compliance liabilities away from your corporate balance sheet.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/50">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="text-xs uppercase bg-slate-950/80 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-semibold">Operational Dimension</th>
                    <th scope="col" className="px-5 py-4 font-semibold text-rose-300">Company-Owned / Self-Managed</th>
                    <th scope="col" className="px-5 py-4 font-semibold text-cyan-300">Victor Mobility Retainer</th>
                    <th scope="col" className="px-5 py-4 font-semibold text-emerald-400">Strategic Benefit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {riskTransferMatrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30">
                      <td className="px-5 py-4 font-bold text-white">
                        {row.dimension}
                      </td>
                      <td className="px-5 py-4 text-xs text-rose-200">
                        {row.selfManaged}
                      </td>
                      <td className="px-5 py-4 text-xs text-cyan-200 font-medium">
                        {row.victorManaged}
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {row.benefit}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Current Model Leakage Analysis */}
        {activeTab === 'leakages' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Corporate Fleet Spend Leakage Breakdown
              </h2>
              <p className="text-sm text-slate-400">
                Understanding the hidden financial and operational costs inherent in traditional corporate transportation arrangements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {comparisonModels.map((model) => (
                <div key={model.id} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                        {model.tagline}
                      </span>
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                        +{Math.round((model.overheadFactor - 1) * 100)}% Leakage
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">
                      {model.name}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {model.summary}
                    </p>
                    <div className="space-y-2 border-t border-slate-800 pt-3">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Observed Financial Leakages:
                      </span>
                      {model.leakages.map((leak, lIdx) => (
                        <div key={lIdx} className="flex items-start gap-2 text-xs text-slate-400">
                          <span className="text-rose-400 font-bold shrink-0 mt-0.5">•</span>
                          <span>{leak}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: CFO & Procurement FAQs */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                CFO &amp; Institutional Procurement FAQs
              </h2>
              <p className="text-sm text-slate-400">
                Essential contractual, tax, and service level questions regarding Victor Mobility fleet transition agreements.
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

        {/* Corporate Onboarding Inquiry Section */}
        <div id="cfo-transition-inquiry" className="mt-16 pt-12 border-t border-slate-800 print:hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                CFO Financial Advisory Desk
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Request Custom Fleet Financial Audit
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Connect directly with our fleet finance and corporate transitions desk. We analyze your company&apos;s existing fleet invoices, calculate exact GST/VAT Input Tax Credit potential, and furnish a tailored Master Services Agreement (MSA) transition plan.
              </p>
              <div className="pt-4 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>100% Tax-Deductible Operational Expense (OPEX) classification</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Zero residual value or vehicle resale risk on corporate balance sheet</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Dedicated corporate account manager &amp; monthly MIS reporting</span>
                </div>
              </div>
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 hover:bg-slate-800 text-xs font-semibold transition"
                >
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Finance Desk: {phone}
                </a>
                <Link
                  href={isIndia ? "/india/due-diligence" : "/uae/due-diligence"}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 hover:bg-slate-800 text-xs font-semibold transition"
                >
                  Review Vendor Due Diligence Vault
                </Link>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4">
                Corporate Fleet Transition Audit Request
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
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Acme Technologies India Pvt Ltd"
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      CFO / Head of Procurement Name
                    </label>
                    <input
                      type="text"
                      value={officerName}
                      onChange={(e) => setOfficerName(e.target.value)}
                      placeholder="e.g. Rajesh Sharma"
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 focus:outline-none"
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
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Target Transition Timeline
                    </label>
                    <select
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="Immediate (Within 30 Days)">Immediate (Within 30 Days)</option>
                      <option value="Next Quarter (60–90 Days)">Next Quarter (60–90 Days)</option>
                      <option value="Annual Fleet Budget Planning">Annual Fleet Budget Planning</option>
                      <option value="Contract Expiry of Existing Vendor">Contract Expiry of Existing Vendor</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Special Transition Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Mention current lease expiry dates, multi-city deployment requirements, or existing vendor pain points..."
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/10"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                    </svg>
                    Send CFO Fleet Transition Request via WhatsApp
                  </button>
                  <p className="text-[11px] text-slate-500 text-center mt-2">
                    Note: Initiates an enterprise fleet TCO inquiry with Victor Mobility and does not constitute a signed contract.
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
