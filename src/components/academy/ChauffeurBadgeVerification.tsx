"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Search,
  Printer,
  MessageSquare,
  Phone,
  Award,
  AlertCircle,
  Eye,
  HeartPulse,
  Wine,
  Moon,
  Car,
  QrCode,
  FileCheck,
  Building2,
  Calendar,
} from "lucide-react";
import verificationData from "@/content/chauffeur-verification.json";

interface ChauffeurBadgeVerificationProps {
  region: "india" | "uae";
}

export default function ChauffeurBadgeVerification({
  region,
}: ChauffeurBadgeVerificationProps) {
  const content = region === "india" ? verificationData.india : verificationData.uae;
  const records = content.records;

  // Search state
  const [searchTerm, setSearchTerm] = useState<string>(content.sampleBadges[0]);
  const [activeBadgeId, setActiveBadgeId] = useState<string>(content.sampleBadges[0]);

  // Find record
  const currentRecord = records.find(
    (r) => r.badgeId.toLowerCase() === activeBadgeId.toLowerCase().trim()
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setActiveBadgeId(searchTerm.trim());
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const waNumber = region === "india" ? "919396546950" : "971524552441";
  const phoneDisplay =
    region === "india" ? "+91 91007 77768" : "+971 52 455 2441";
  const phoneHref =
    region === "india" ? "tel:+919100777768" : "tel:+971524552441";

  const waAuditMessage = `*VICTOR MOBILITY · CHAUFFEUR COMPLIANCE AUDIT INQUIRY*
Region: ${region === "india" ? "India Operations" : "UAE Operations"}
Chauffeur Badge ID: ${activeBadgeId}
${currentRecord ? `Chauffeur: ${currentRecord.name} (${currentRecord.academyLevel})` : "Badge Status: Unverified Search"}
Depot: ${currentRecord ? currentRecord.city : "Central Registry"}
Tagline: On Time Every Time.

Hello Victor Operations Desk,
Our corporate security/procurement team is conducting a vendor driver audit. Please share the official signed compliance dossier and police verification certificate for this badge ID.`;

  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    waAuditMessage
  )}`;

  return (
    <div className="space-y-10">
      {/* Search Bar & Sample Badge Chips */}
      <div className="bg-white rounded-3xl border border-brand-soft-neutral shadow-sm p-6 sm:p-8 space-y-5 print:hidden">
        <div className="max-w-2xl space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue block">
            Central Safety Registry
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-brand-indigo">
            Audit Chauffeur Background &amp; Protocol Credentials
          </h3>
          <p className="text-xs sm:text-sm text-brand-slate">
            Enter a Victor Chauffeur Badge ID to view authenticated police clearance, medical fitness, sobriety logs, and academy certification level.
          </p>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-brand-slate" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g. VIC-HYD-4821 or VIC-DXB-9021"
              className="w-full bg-brand-soft-neutral/40 border border-brand-soft-neutral rounded-xl pl-11 pr-4 py-3 text-sm font-mono font-bold text-brand-indigo uppercase focus:outline-none focus:border-brand-indigo focus:bg-white"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-brand-indigo hover:bg-brand-indigo-light text-white text-xs font-bold transition-all shadow-xs shrink-0 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify Badge</span>
          </button>
        </form>

        {/* Quick Sample Badge Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-brand-slate font-medium text-[11px]">Quick Sample Badges:</span>
          {content.sampleBadges.map((badge) => (
            <button
              key={badge}
              type="button"
              onClick={() => {
                setSearchTerm(badge);
                setActiveBadgeId(badge);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                activeBadgeId.toLowerCase() === badge.toLowerCase()
                  ? "bg-brand-indigo text-white shadow-2xs"
                  : "bg-brand-soft-neutral/60 text-brand-indigo hover:bg-brand-soft-neutral"
              }`}
            >
              {badge}
            </button>
          ))}
        </div>
      </div>

      {/* VERIFIED CHAUFFEUR CREDENTIAL CARD */}
      {currentRecord ? (
        <div className="bg-white rounded-3xl border-2 border-emerald-500/20 shadow-xl overflow-hidden space-y-6">
          {/* Card Top Banner */}
          <div className="bg-gradient-to-r from-brand-indigo via-slate-900 to-brand-ink text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shrink-0 shadow-md">
                <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[11px] font-bold text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Active Chauffeur
                  </span>
                  <span className="text-xs font-mono text-brand-slate-light">
                    ID: {currentRecord.badgeId}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {currentRecord.name}
                </h3>
                <p className="text-xs text-brand-violet font-semibold">
                  {currentRecord.academyLevel} · {currentRecord.experience}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 print:hidden">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print Dossier</span>
              </button>
            </div>
          </div>

          {/* Core Operating Assignment Details */}
          <div className="px-6 sm:px-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-brand-soft-neutral/30 border border-brand-soft-neutral flex items-center gap-3 text-xs">
              <Building2 className="w-5 h-5 text-brand-indigo shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-slate block">
                  Operating Hub &amp; Depot
                </span>
                <span className="font-bold text-brand-indigo text-sm">
                  {currentRecord.city}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-brand-soft-neutral/30 border border-brand-soft-neutral flex items-center gap-3 text-xs">
              <Car className="w-5 h-5 text-brand-indigo shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-slate block">
                  Assigned Vehicle Fleet Tier
                </span>
                <span className="font-bold text-brand-indigo text-sm">
                  {currentRecord.assignedFleet}
                </span>
              </div>
            </div>
          </div>

          {/* 5-PILLAR SECURITY AUDIT MATRIX */}
          <div className="px-6 sm:px-8 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-indigo flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>Comprehensive 5-Pillar Security &amp; Compliance Audit</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pillar 1: Police Background Clearance */}
              <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Police Background Clearance
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase">
                    {currentRecord.policeClearance.status}
                  </span>
                </div>
                <p className="text-xs font-semibold text-emerald-900">
                  Authority: {currentRecord.policeClearance.authority}
                </p>
                <div className="flex items-center justify-between text-[11px] text-emerald-800 pt-1 border-t border-emerald-200/50">
                  <span>Validity: {currentRecord.policeClearance.validity}</span>
                  <span className="font-bold">{currentRecord.policeClearance.criminalRecord}</span>
                </div>
              </div>

              {/* Pillar 2: Medical & Vision Fitness */}
              <div className="p-5 rounded-2xl bg-blue-50/40 border border-blue-200/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                    <HeartPulse className="w-4 h-4 text-blue-600" />
                    Medical &amp; Vision Examination
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase">
                    {currentRecord.medicalExam.status}
                  </span>
                </div>
                <p className="text-xs font-semibold text-blue-900">
                  Fitness: {currentRecord.medicalExam.cardioFitness}
                </p>
                <div className="flex items-center justify-between text-[11px] text-blue-800 pt-1 border-t border-blue-200/50">
                  <span>Vision: {currentRecord.medicalExam.visionScore}</span>
                  <span>Exam Date: {currentRecord.medicalExam.lastExamDate}</span>
                </div>
              </div>

              {/* Pillar 3: Zero-Tolerance Sobriety Log */}
              <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                    <Wine className="w-4 h-4 text-amber-600" />
                    Pre-Shift Sobriety Test
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-bold uppercase">
                    {currentRecord.sobrietyLog.status}
                  </span>
                </div>
                <p className="text-xs font-semibold text-amber-900">
                  Reading: {currentRecord.sobrietyLog.reading}
                </p>
                <div className="text-[11px] text-amber-800 pt-1 border-t border-amber-200/50">
                  Cadence: {currentRecord.sobrietyLog.testingCadence}
                </div>
              </div>

              {/* Pillar 4: Women Passenger Night Safety */}
              <div className="p-5 rounded-2xl bg-purple-50/40 border border-purple-200/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                    <Moon className="w-4 h-4 text-purple-600" />
                    Women Passenger Night Escort
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-bold uppercase">
                    {currentRecord.womenSafetyRating.rating}
                  </span>
                </div>
                <p className="text-xs font-semibold text-purple-900">
                  Rating: {currentRecord.womenSafetyRating.status}
                </p>
                <div className="text-[11px] text-purple-800 pt-1 border-t border-purple-200/50">
                  Protocols: {currentRecord.womenSafetyRating.protocols}
                </div>
              </div>
            </div>

            {/* Defensive Driving Score Banner */}
            <div className="p-4 rounded-2xl bg-brand-soft-neutral/40 border border-brand-soft-neutral flex items-center justify-between text-xs">
              <span className="text-brand-slate font-medium">
                Victor Academy Defensive Driving &amp; Telematics Rating:
              </span>
              <span className="font-extrabold text-brand-indigo text-base bg-white px-3 py-1 rounded-lg border border-brand-soft-neutral">
                {currentRecord.defensiveDrivingScore} Compliance Score
              </span>
            </div>
          </div>

          {/* Audit Verification Actions Bar */}
          <div className="p-6 sm:p-8 bg-brand-soft-neutral/30 border-t border-brand-soft-neutral flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="text-xs font-bold text-brand-indigo block">
                Official Compliance Dossier Request
              </span>
              <p className="text-[11px] text-brand-slate">
                Need certified physical copies of police clearance certificates for your vendor audit?
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Request Signed Audit File via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* Fallback for unlisted badge ID */
        <div className="bg-white rounded-3xl border border-amber-200 p-8 sm:p-12 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center border border-amber-200">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h4 className="text-xl font-bold text-brand-indigo">
              Badge ID &ldquo;{activeBadgeId}&rdquo; Pending Central Sync
            </h4>
            <p className="text-xs text-brand-slate leading-relaxed">
              This driver badge ID is not in the cached instant showcase registry. Contact our 24/7 central control desk to verify this driver&apos;s active shift authorization directly against our live database.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-4 text-xs font-bold">
            <a
              href={phoneHref}
              className="px-5 py-3 rounded-xl bg-brand-indigo text-white hover:bg-brand-indigo-light transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Central Desk: {phoneDisplay}</span>
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Check via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
