'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface SpocModel {
  title: string;
  description: string;
  slaHighlights: string[];
}

export interface RoadshowTier {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  vehicleType: string;
  dailyHours: string;
  recommendedDelegation: string;
  features: string[];
}

export interface ItineraryStop {
  time: string;
  location: string;
  action: string;
}

export interface SampleItinerary {
  id: string;
  city: string;
  routeTitle: string;
  duration: string;
  stops: ItineraryStop[];
}

export interface OnboardAmenity {
  item: string;
  detail: string;
}

export interface SecurityAndNda {
  title: string;
  statement: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ExecutiveRoadshowDeskProps {
  region: 'india' | 'uae';
  title: string;
  eyebrow: string;
  description: string;
  spocModel: SpocModel;
  roadshowTiers: RoadshowTier[];
  sampleItineraries: SampleItinerary[];
  onboardAmenities: OnboardAmenity[];
  securityAndNda: SecurityAndNda;
  faqs: FaqItem[];
  phone: string;
  whatsapp: string;
  supportHours: string;
}

export default function ExecutiveRoadshowDesk({
  region,
  title,
  eyebrow,
  description,
  spocModel,
  roadshowTiers,
  sampleItineraries,
  onboardAmenities,
  securityAndNda,
  faqs,
  phone,
  whatsapp,
  supportHours,
}: ExecutiveRoadshowDeskProps) {
  const isIndia = region === 'india';

  // Navigation Tab: 'itineraries' | 'tiers' | 'amenities' | 'faqs'
  const [activeTab, setActiveTab] = useState<'itineraries' | 'tiers' | 'amenities' | 'faqs'>('itineraries');

  // Selected Itinerary
  const [selectedItineraryId, setSelectedItineraryId] = useState<string>(sampleItineraries[0]?.id || 'hyd-tech-bio');
  const activeItinerary = sampleItineraries.find((i) => i.id === selectedItineraryId) || sampleItineraries[0];

  // Selected Tier
  const [selectedTierId, setSelectedTierId] = useState<string>(roadshowTiers[0]?.id || 'ipo-investor');
  const activeTier = roadshowTiers.find((t) => t.id === selectedTierId) || roadshowTiers[0];

  // Inquiry Form State
  const [delegationName, setDelegationName] = useState('');
  const [coordinatorName, setCoordinatorName] = useState('');
  const [coordinatorEmail, setCoordinatorEmail] = useState('');
  const [selectedCity, setSelectedCity] = useState(isIndia ? 'Hyderabad & Bengaluru Multi-City' : 'Dubai & Abu Dhabi Cross-Emirate');
  const [delegationSize, setDelegationSize] = useState('2–4 Principals (1–2 Executive Vehicles)');
  const [flightNotes, setFlightNotes] = useState('');

  // WhatsApp Message Generator
  const generateWhatsAppMessage = () => {
    const rawNumber = whatsapp.replace(/[^0-9]/g, '');
    const client = delegationName.trim() || 'Executive Delegation';
    const contact = coordinatorName.trim() || 'Executive Assistant Desk';
    const email = coordinatorEmail.trim() || 'Not specified';
    const notes = flightNotes.trim() ? `\nFlight & Schedule Notes: ${flightNotes.trim()}` : '';

    const text = [
      `*Executive Roadshow & Investor Delegation Request — Victor Mobility (${isIndia ? 'India' : 'UAE'})*`,
      `Client Entity: ${client}`,
      `Coordinator / EA: ${contact} (${email})`,
      `Mission Hub: ${selectedCity}`,
      `Roadshow Tier: ${activeTier.name}`,
      `Vehicle Type: ${activeTier.vehicleType}`,
      `Delegation Capacity: ${delegationSize}`,
      `Selected Reference Route: ${activeItinerary.routeTitle} (${activeItinerary.duration})`,
      notes,
      '',
      `Please assign a dedicated Central Roadshow SPOC and furnish a comprehensive multi-city roadshow proposal.`,
      '',
      '_Note: This WhatsApp message initiates an enterprise roadshow inquiry with Victor Mobility and does not constitute a signed contract._',
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

          {/* Key SLA Metric Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800 print:border-slate-300">
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                Central SPOC
              </span>
              <span className="text-lg font-bold text-amber-400 block mt-1 print:text-black">
                Single Point
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                Dedicated Mission Director
              </span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                Punctuality SLA
              </span>
              <span className="text-lg font-bold text-emerald-400 block mt-1 print:text-black">
                99.4% On-Time
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                Flight Delay Synchronized
              </span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                Contingency Fleet
              </span>
              <span className="text-lg font-bold text-cyan-400 block mt-1 print:text-black">
                15% Standby
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                Shadow Vehicle Redundancy
              </span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 print:border-slate-300 print:bg-slate-50">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                Confidentiality
              </span>
              <span className="text-lg font-bold text-indigo-400 block mt-1 print:text-black">
                100% Signed NDA
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                Strict Cabin Privacy
              </span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-4 print:hidden">
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 text-sm font-medium transition cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Roadshow Dossier
            </button>
            <a
              href="#roadshow-inquiry"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 text-slate-950 font-semibold hover:bg-amber-400 text-sm transition"
            >
              Request Roadshow Coordination
            </a>
            <span className="text-xs text-slate-400">
              Roadshow Operations Desk: <strong className="text-white">{supportHours}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Main Interactive Work Area */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 mb-8 overflow-x-auto print:hidden">
          <button
            onClick={() => setActiveTab('itineraries')}
            className={`px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'itineraries'
                ? 'border-amber-400 text-amber-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Sample Roadshow Itineraries &amp; Timelines
          </button>
          <button
            onClick={() => setActiveTab('tiers')}
            className={`px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'tiers'
                ? 'border-amber-400 text-amber-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Roadshow Service Tiers &amp; Fleet
          </button>
          <button
            onClick={() => setActiveTab('amenities')}
            className={`px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'amenities'
                ? 'border-amber-400 text-amber-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Onboard Executive Amenities
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'faqs'
                ? 'border-amber-400 text-amber-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Confidentiality &amp; Coordinator FAQs
          </button>
        </div>

        {/* Tab 1: Sample Roadshow Itineraries & Route Timelines */}
        {(activeTab === 'itineraries' || typeof window === 'undefined') && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-2 print:text-black">
                High-Density Roadshow Route Timelines
              </h2>
              <p className="text-sm text-slate-400 mb-6 print:text-slate-600">
                Explore verified roadshow schedules designed for institutional equity analysts, C-Suite board reviews, and industrial plant audits. All routes incorporate traffic choke-point bypasses and terminal tarmac greeting protocols.
              </p>

              {/* Itinerary Selector Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 print:hidden">
                {sampleItineraries.map((itin) => {
                  const isSelected = itin.id === activeItinerary.id;
                  return (
                    <button
                      key={itin.id}
                      onClick={() => setSelectedItineraryId(itin.id)}
                      className={`text-left p-4 rounded-xl border transition cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500/50 text-white'
                          : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-amber-300">
                          {itin.city}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                        )}
                      </div>
                      <h3 className="font-semibold text-sm text-white line-clamp-1">
                        {itin.routeTitle}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        {itin.duration} · {itin.stops.length} Managed Stops
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Itinerary Timeline Card */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 print:bg-white print:border-slate-300 print:text-black">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 print:border-slate-300 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2 print:text-slate-700 print:bg-slate-100">
                    {activeItinerary.city} · Full-Day Schedule
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white print:text-black">
                    {activeItinerary.routeTitle}
                  </h3>
                  <p className="text-sm text-slate-300 mt-1 print:text-slate-600">
                    Duration: <strong className="text-amber-400 print:text-black">{activeItinerary.duration}</strong> · Comprehensive vehicle standby throughout mission
                  </p>
                </div>
                <div className="shrink-0 print:hidden">
                  <a
                    href="#roadshow-inquiry"
                    onClick={() => setSelectedCity(`${activeItinerary.city} Roadshow`)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-xs font-medium border border-amber-500/40 transition"
                  >
                    Select This Route Spec
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Stop Timeline */}
              <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-6 print:border-slate-300">
                {activeItinerary.stops.map((stop, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-4 border-slate-950 print:border-white"></div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <span className="font-mono text-xs font-bold text-amber-300 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 w-fit print:border-slate-300 print:text-black">
                        {stop.time}
                      </span>
                      <span className="text-xs text-slate-500">
                        Stop 0{idx + 1} of 0{activeItinerary.stops.length}
                      </span>
                    </div>
                    <h4 className="font-bold text-base text-white mt-1.5 print:text-black">
                      {stop.location}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 print:text-slate-700">
                      {stop.action}
                    </p>
                  </div>
                ))}
              </div>

              {/* SPOC Coordination Note */}
              <div className="mt-8 p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 text-xs text-slate-400 flex items-start gap-3 print:bg-slate-50 print:border-slate-200 print:text-slate-700">
                <svg className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <strong className="text-slate-200 print:text-black">Real-Time Schedule Flexibility:</strong> Roadshow itineraries frequently adjust in-flight. Your dedicated Central SPOC continuously liaises with corporate executive assistants to re-sequence stops, coordinate early pickup calls, and stage vehicles at subsequent venues.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Roadshow Service Tiers & Fleet */}
        {activeTab === 'tiers' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Executive Roadshow Fleet &amp; Service Tiers
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Tailored vehicle fleets, dedicated hourly packages, and chauffeur protocols matching the specific operational profile of your corporate delegation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {roadshowTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`p-6 rounded-2xl border transition flex flex-col justify-between ${
                    tier.id === selectedTierId
                      ? 'bg-slate-900/80 border-amber-500/60 shadow-lg shadow-amber-500/5'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {tier.badge}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {tier.dailyHours}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">
                      {tier.tagline}
                    </p>

                    <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 mb-4 space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Assigned Fleet:</span>
                        <span className="font-semibold text-white">{tier.vehicleType}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Recommended Size:</span>
                        <span className="font-semibold text-amber-300">{tier.recommendedDelegation}</span>
                      </div>
                    </div>

                    <div className="space-y-2 border-t border-slate-800 pt-3">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Included SLA Features:
                      </span>
                      {tier.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTierId(tier.id);
                        const inquiry = document.getElementById('roadshow-inquiry');
                        if (inquiry) inquiry.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition cursor-pointer text-center block"
                    >
                      Book This Tier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Onboard Executive Amenities */}
        {activeTab === 'amenities' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Executive Cabin Environment &amp; Mobile Workspace
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Transform in-transit travel into a productive, connected, and relaxing executive boardroom.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {onboardAmenities.map((amenity, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center text-xs font-bold font-mono mb-3">
                      0{idx + 1}
                    </div>
                    <h3 className="font-bold text-white text-base mb-2">
                      {amenity.item}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {amenity.detail}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Standard In-Cabin Spec
                  </div>
                </div>
              ))}
            </div>

            {/* Central SPOC Coordination Architecture */}
            <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                {spocModel.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {spocModel.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {spocModel.slaHighlights.map((highlight, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                    <svg className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Confidentiality & Coordinator FAQs */}
        {activeTab === 'faqs' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Confidentiality Protocols &amp; Coordinator FAQs
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Institutional security practices, private aviation coordination, and billing procedures for corporate roadshows.
              </p>
            </div>

            {/* Security & NDA Box */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                {securityAndNda.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {securityAndNda.statement}
              </p>
            </div>

            {/* FAQs */}
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

        {/* Roadshow Booking & Coordination Drawer */}
        <div id="roadshow-inquiry" className="mt-16 pt-12 border-t border-slate-800 print:hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                Direct Roadshow Desk
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Initiate Executive Roadshow Coordination
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Connect directly with our senior roadshow dispatch controllers. We assign a dedicated Single Point of Contact (SPOC) within 2 hours, brief vetted master chauffeurs, and lock multi-city itineraries under a single corporate agreement.
              </p>
              <div className="pt-4 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>100% Guaranteed mechanical backup with shadow standby fleet</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Private FBO &amp; commercial airport tarmac VIP greeting protocol</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Consolidated corporate billing with full GST / VAT ITC compliance</span>
                </div>
              </div>
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 hover:bg-slate-800 text-xs font-semibold transition"
                >
                  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  SPOC Hotline: {phone}
                </a>
                <Link
                  href={isIndia ? "/india/rate-card" : "/uae/rate-card"}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 hover:bg-slate-800 text-xs font-semibold transition"
                >
                  View Corporate Rate Card
                </Link>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4">
                Executive Delegation Roadshow Specification
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
                      Delegation / Organization Name
                    </label>
                    <input
                      type="text"
                      value={delegationName}
                      onChange={(e) => setDelegationName(e.target.value)}
                      placeholder="e.g. Goldman Sachs Investment Banking"
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Coordinator / Executive Assistant Name
                    </label>
                    <input
                      type="text"
                      value={coordinatorName}
                      onChange={(e) => setCoordinatorName(e.target.value)}
                      placeholder="e.g. Priya Venkatesh"
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 focus:outline-none"
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
                      value={coordinatorEmail}
                      onChange={(e) => setCoordinatorEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Primary Mission Hub / Corridor
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 focus:outline-none"
                    >
                      {isIndia ? (
                        <>
                          <option value="Hyderabad Financial District Roadshow">Hyderabad Financial District Roadshow</option>
                          <option value="Bengaluru Tech Corridor Roadshow">Bengaluru Tech Corridor Roadshow</option>
                          <option value="Pune Automotive & MIDC Roadshow">Pune Automotive &amp; MIDC Roadshow</option>
                          <option value="Hyderabad & Bengaluru Multi-City Tour">Hyderabad &amp; Bengaluru Multi-City Tour</option>
                          <option value="Tri-City Pan-India Roadshow (HYD-BLR-PUN)">Tri-City Pan-India Roadshow (HYD-BLR-PUN)</option>
                        </>
                      ) : (
                        <>
                          <option value="Dubai DIFC & Downtown Roadshow">Dubai DIFC &amp; Downtown Roadshow</option>
                          <option value="Abu Dhabi ADGM & Government Roadshow">Abu Dhabi ADGM &amp; Government Roadshow</option>
                          <option value="Dubai & Abu Dhabi Cross-Emirate Axis">Dubai &amp; Abu Dhabi Cross-Emirate Axis</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Delegation Capacity &amp; Vehicle Mix
                    </label>
                    <select
                      value={delegationSize}
                      onChange={(e) => setDelegationSize(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 focus:outline-none"
                    >
                      <option value="2–4 Principals (1–2 Executive Vehicles)">2–4 Principals (1–2 Executive Vehicles)</option>
                      <option value="5–8 Board Members (2–3 Luxury Sedans / MPVs)">5–8 Board Members (2–3 Luxury Sedans / MPVs)</option>
                      <option value="9–16 Delegation Convoy (Executive MPVs + VIP Sprinter)">9–16 Delegation Convoy (Executive MPVs + VIP Sprinter)</option>
                      <option value="Large Investor Summit Delegation (Multiple Motorcades)">Large Investor Summit Delegation (Multiple Motorcades)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Selected Roadshow Tier
                    </label>
                    <select
                      value={activeTier.name}
                      onChange={(e) => {
                        const tier = roadshowTiers.find((t) => t.name === e.target.value);
                        if (tier) setSelectedTierId(tier.id);
                      }}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 focus:outline-none"
                    >
                      {roadshowTiers.map((t) => (
                        <option key={t.id} value={t.name}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Flight Numbers, FBO Info &amp; Special Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={flightNotes}
                    onChange={(e) => setFlightNotes(e.target.value)}
                    placeholder="Mention arrival flight numbers, private jet tail numbers, security escort needs, or baggage counts..."
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                    </svg>
                    Send Roadshow Dispatch Request via WhatsApp
                  </button>
                  <p className="text-[11px] text-slate-500 text-center mt-2">
                    Note: Initiates an enterprise roadshow inquiry with Victor Mobility and does not constitute a signed contract.
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
