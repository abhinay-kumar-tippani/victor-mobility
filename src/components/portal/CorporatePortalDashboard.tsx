"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Download,
  MessageSquare,
  Phone,
  Navigation,
  Activity,
  Gauge,
  Thermometer,
  Lock,
  ArrowRight,
  UserCheck,
  Car,
} from "lucide-react";
import portalData from "@/content/portal.json";

interface CorporatePortalDashboardProps {
  region: "india" | "uae";
}

export default function CorporatePortalDashboard({
  region,
}: CorporatePortalDashboardProps) {
  const data = region === "india" ? portalData.india : portalData.uae;
  const [activeTab, setActiveTab] = useState<"rosters" | "sla" | "billing">("rosters");
  const [selectedShiftId, setSelectedShiftId] = useState<string>(data.shiftRosters[0]?.id);

  const activeShift =
    data.shiftRosters.find((s) => s.id === selectedShiftId) || data.shiftRosters[0];

  const waNumber = data.managerWhatsApp;
  const rosterWaMessage = `*VICTOR MOBILITY · CLIENT ROSTER ADJUSTMENT REQUEST*
Company: ${data.clientName}
Contract: ${data.contractType}
Shift: ${activeShift.name}
Route: ${activeShift.routeCode}
Vehicle: ${activeShift.assignedVehicle}
Driver: ${activeShift.driverName}

*Requested Adjustment:*
Please advise our facility transport desk regarding temporary route amendment or seat reallocation.`;

  const waRosterLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    rosterWaMessage
  )}`;

  const handleDownloadInvoice = () => {
    const invoiceContent = `=====================================================
VICTOR MOBILITY · CORPORATE BILLING STATEMENT
${data.clientName}
Invoice No: ${data.billingSummary.invoiceNumber}
Billing Period: ${data.billingSummary.month}
Tagline: On Time Every Time.
=====================================================

Total Routes Operated: ${data.billingSummary.totalRoutesOperated}
Total Fleet Kilometers: ${data.billingSummary.totalKilometers}
Base Operational Retainer: ${data.billingSummary.baseRetainerAmount}
Fuel Index Adjustment: ${data.billingSummary.fuelIndexAdjustment}
Tax (${region === "india" ? "GST 5% RCM" : "UAE VAT 5%"}) : ${data.billingSummary.gstAmount}
-----------------------------------------------------
NET INVOICE TOTAL: ${data.billingSummary.netInvoicePayable}
Payment Status: ${data.billingSummary.paymentStatus}
Audit Verification: ${data.billingSummary.auditStatus}
=====================================================`;

    const blob = new Blob([invoiceContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${data.billingSummary.invoiceNumber}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Enterprise Account Banner */}
      <div className="bg-brand-indigo rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden border border-white/10 shadow-lg">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0066FF_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-xs font-bold uppercase tracking-wider text-brand-blue-light">
                Enterprise Client Portal
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                ● Live Operations Active
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {data.clientName}
            </h2>
            <p className="text-xs sm:text-sm text-brand-slate-light flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-brand-blue-light shrink-0" />
              <span>{data.facilityLocation}</span>
            </p>
            <p className="text-xs text-brand-slate-light/90">
              Contract: <strong className="text-white">{data.contractType}</strong>
            </p>
          </div>

          {/* Account Manager Contact Pill */}
          <div className="bg-white/10 rounded-2xl p-4 sm:p-5 border border-white/10 backdrop-blur-xs shrink-0 max-w-sm">
            <span className="text-[10px] uppercase font-bold tracking-wider text-brand-slate-light block mb-1">
              Dedicated Fleet Account Manager
            </span>
            <h5 className="font-bold text-sm text-white">{data.accountManager}</h5>
            <p className="text-xs text-brand-slate-light mb-3">{data.managerRole}</p>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${data.managerPhone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/10"
              >
                <Phone className="w-3.5 h-3.5 text-brand-blue-light" />
                <span>Call Desk</span>
              </a>
              <a
                href={waRosterLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-brand-soft-neutral bg-white rounded-xl p-1.5 shadow-xs">
        <button
          type="button"
          onClick={() => setActiveTab("rosters")}
          className={`flex-1 py-3 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === "rosters"
              ? "bg-brand-indigo text-white shadow-sm"
              : "text-brand-slate hover:text-brand-indigo hover:bg-brand-soft-neutral/50"
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Live Shift Rosters &amp; Telematics</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("sla")}
          className={`flex-1 py-3 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === "sla"
              ? "bg-brand-indigo text-white shadow-sm"
              : "text-brand-slate hover:text-brand-indigo hover:bg-brand-soft-neutral/50"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Monthly SLA Scorecard</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("billing")}
          className={`flex-1 py-3 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === "billing"
              ? "bg-brand-indigo text-white shadow-sm"
              : "text-brand-slate hover:text-brand-indigo hover:bg-brand-soft-neutral/50"
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Billing &amp; Invoicing Reconciler</span>
        </button>
      </div>

      {/* TAB 1: Live Shift Rosters & Telematics */}
      {activeTab === "rosters" && (
        <div className="space-y-6">
          {/* Shift Selection Pills */}
          <div className="flex flex-wrap gap-2.5">
            {data.shiftRosters.map((shift) => (
              <button
                key={shift.id}
                type="button"
                onClick={() => setSelectedShiftId(shift.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  activeShift.id === shift.id
                    ? "bg-brand-indigo text-white border-brand-indigo shadow-sm"
                    : "bg-white text-brand-indigo border-brand-soft-neutral hover:border-brand-slate-light"
                }`}
              >
                <span>{shift.name}</span>
                <span className="text-[11px] opacity-75 ml-1.5">({shift.window})</span>
              </button>
            ))}
          </div>

          {/* Active Shift Details Card */}
          <div className="bg-white rounded-2xl border border-brand-soft-neutral p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-brand-soft-neutral gap-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-brand-blue block">
                  Active Shift Route
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-brand-indigo mt-0.5">
                  {activeShift.name}
                </h3>
                <p className="text-xs text-brand-slate font-medium mt-1">
                  Corridor: <span className="text-brand-indigo font-semibold">{activeShift.routeCode}</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Activity className="w-3.5 h-3.5" />
                  <span>{activeShift.currentStatus}</span>
                </span>
              </div>
            </div>

            {/* Vehicle & Telematics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-brand-soft-neutral/30 rounded-xl p-4 border border-brand-soft-neutral/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-slate block">
                  Assigned Vehicle
                </span>
                <p className="font-bold text-sm text-brand-indigo mt-1">
                  {activeShift.assignedVehicle}
                </p>
                <span className="text-xs text-brand-slate block mt-0.5">
                  {activeShift.passengerCount}
                </span>
              </div>

              <div className="bg-brand-soft-neutral/30 rounded-xl p-4 border border-brand-soft-neutral/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-slate block">
                  Assigned Chauffeur
                </span>
                <p className="font-bold text-sm text-brand-indigo mt-1">
                  {activeShift.driverName}
                </p>
                <span className="text-xs text-emerald-600 font-semibold block mt-0.5">
                  ✓ 100% Police Verified
                </span>
              </div>

              <div className="bg-brand-soft-neutral/30 rounded-xl p-4 border border-brand-soft-neutral/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-slate block">
                  Live Speed &amp; Telematics
                </span>
                <p className="font-bold text-sm text-brand-indigo mt-1 flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-brand-blue" />
                  <span>{activeShift.telematics.speed}</span>
                </p>
                <span className="text-xs text-brand-slate block mt-0.5">
                  GPS: {activeShift.telematics.gpsSignal}
                </span>
              </div>

              <div className="bg-brand-soft-neutral/30 rounded-xl p-4 border border-brand-soft-neutral/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-slate block">
                  Safety Protocol
                </span>
                <p className="font-bold text-xs text-brand-indigo mt-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{activeShift.telematics.escortStatus}</span>
                </p>
                <span className="text-xs text-brand-slate block mt-0.5">
                  Climate: {activeShift.telematics.cabinTemp}
                </span>
              </div>
            </div>

            {/* Stop-by-Stop Progress Tracker */}
            <div className="pt-4 border-t border-brand-soft-neutral">
              <span className="text-xs uppercase font-bold tracking-wider text-brand-slate block mb-4">
                Shift Stop Sequence &amp; Boarding Audit
              </span>

              <div className="space-y-3">
                {activeShift.stops.map((stop, sIdx) => {
                  const isDone = stop.status.includes("Completed") || stop.status.includes("Confirmed");
                  const isCurrent = stop.status === "Approaching" || stop.status === "Boarding" || stop.status === "Next Drop";

                  return (
                    <div
                      key={sIdx}
                      className={`flex items-center justify-between p-3.5 rounded-xl border text-xs sm:text-sm ${
                        isCurrent
                          ? "bg-brand-blue/5 border-brand-blue/40 font-semibold"
                          : "bg-white border-brand-soft-neutral/70"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                            isDone
                              ? "bg-emerald-100 text-emerald-700"
                              : isCurrent
                              ? "bg-brand-blue text-white"
                              : "bg-brand-soft-neutral text-brand-slate"
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <span className="text-[10px] font-bold">{sIdx + 1}</span>
                          )}
                        </div>
                        <span className="text-brand-indigo font-medium">{stop.stop}</span>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-brand-slate text-xs font-mono">{stop.time}</span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            isDone
                              ? "bg-emerald-50 text-emerald-700"
                              : isCurrent
                              ? "bg-blue-50 text-brand-blue"
                              : "bg-brand-soft-neutral text-brand-slate"
                          }`}
                        >
                          {stop.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-brand-soft-neutral flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-brand-slate">
                Need to add commuter stops or reassign vehicles? Dispatch directly to the fleet desk.
              </p>
              <a
                href={waRosterLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Request Roster Adjustment</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Monthly SLA Compliance Scorecard */}
      {activeTab === "sla" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-brand-soft-neutral p-6 sm:p-8 shadow-sm space-y-8">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-brand-blue block">
                Contractual SLA Performance
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-brand-indigo mt-0.5">
                September 2026 Key Performance Metrics
              </h3>
              <p className="text-xs sm:text-sm text-brand-slate mt-1">
                Grounded in our verified baseline: <strong className="text-brand-indigo">&ldquo;On Time Every Time.&rdquo;</strong>
              </p>
            </div>

            {/* Metric Gauges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                  On-Time Dispatch Rate
                </span>
                <div className="text-3xl font-extrabold text-emerald-900">
                  {data.slaScorecard.onTimeIndex}
                </div>
                <p className="text-xs text-emerald-700">
                  Target: {data.slaScorecard.onTimeTarget} (+0.9% SLA Surplus)
                </p>
              </div>

              <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue">
                  100% Police &amp; BGV Verification
                </span>
                <div className="text-3xl font-extrabold text-brand-indigo">
                  {data.slaScorecard.bgvCompliance}
                </div>
                <p className="text-xs text-brand-slate">
                  Zero unverified drivers on client campuses
                </p>
              </div>

              <div className="bg-purple-50/50 rounded-2xl p-5 border border-purple-100 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800">
                  Night Escort Protocol
                </span>
                <div className="text-3xl font-extrabold text-purple-900">
                  {data.slaScorecard.femaleEscortCompliance}
                </div>
                <p className="text-xs text-purple-700">
                  100% Stay-At-Curb confirmed drops
                </p>
              </div>

              <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-100 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  Commuter Satisfaction
                </span>
                <div className="text-3xl font-extrabold text-amber-900">
                  {data.slaScorecard.passengerSatisfaction}
                </div>
                <p className="text-xs text-amber-700">
                  Cabin Audit Pass: {data.slaScorecard.cabinAuditPassRate}
                </p>
              </div>
            </div>

            {/* SLA Commitment Highlights */}
            <div className="bg-brand-soft-neutral/30 rounded-xl p-5 border border-brand-soft-neutral space-y-3">
              <span className="text-xs uppercase font-bold tracking-wider text-brand-indigo block">
                Audited Operational Safeguards
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-brand-slate">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>24-Hour Breakdown Guarantee:</strong> Immediate hot-swap vehicle dispatched within 15 minutes from nearest hub.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Telemetry Speed Governance:</strong> Automated alarms if vehicle exceeds 50 km/h in city or 80 km/h on expressways.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Statutory Payroll &amp; Compliance:</strong> ESI, PF, and statutory labor law compliance verified for 100% of chauffeurs.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Billing & Invoicing Reconciler */}
      {activeTab === "billing" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-brand-soft-neutral p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-brand-soft-neutral gap-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-brand-blue block">
                  Corporate Statement &amp; Tax Reconciler
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-brand-indigo mt-0.5">
                  Monthly Statement: {data.billingSummary.month}
                </h3>
                <p className="text-xs text-brand-slate font-mono mt-1">
                  Invoice Ref: {data.billingSummary.invoiceNumber}
                </p>
              </div>

              <button
                type="button"
                onClick={handleDownloadInvoice}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-indigo hover:bg-brand-indigo-light text-white font-bold text-xs transition-all shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download Sample Statement</span>
              </button>
            </div>

            {/* Invoicing Breakdown Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-brand-soft-neutral text-brand-slate uppercase text-[11px] font-bold">
                    <th className="py-3 px-4">Line Item Description</th>
                    <th className="py-3 px-4">Volume Metric</th>
                    <th className="py-3 px-4 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-soft-neutral/60 font-medium text-brand-indigo">
                  <tr>
                    <td className="py-3.5 px-4">Base Employee Shift Transport Retainer</td>
                    <td className="py-3.5 px-4 text-brand-slate">{data.billingSummary.totalRoutesOperated}</td>
                    <td className="py-3.5 px-4 text-right font-bold">{data.billingSummary.baseRetainerAmount}</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4">Fuel &amp; Energy Index Adjustment (Benchmarked)</td>
                    <td className="py-3.5 px-4 text-brand-slate">{data.billingSummary.totalKilometers}</td>
                    <td className="py-3.5 px-4 text-right font-bold">{data.billingSummary.fuelIndexAdjustment}</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4">{region === "india" ? "GST (5% RCM Transport Invoicing)" : "UAE VAT (5% Statutory Rate)"}</td>
                    <td className="py-3.5 px-4 text-brand-slate">Statutory</td>
                    <td className="py-3.5 px-4 text-right font-bold">{data.billingSummary.gstAmount}</td>
                  </tr>
                  <tr className="bg-brand-soft-neutral/30 font-extrabold text-sm sm:text-base">
                    <td className="py-4 px-4 text-brand-indigo">Net Monthly Invoice Payable</td>
                    <td className="py-4 px-4 text-emerald-700 text-xs">
                      {data.billingSummary.paymentStatus}
                    </td>
                    <td className="py-4 px-4 text-right text-brand-blue">
                      {data.billingSummary.netInvoicePayable}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between text-xs text-emerald-900">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span><strong>Audit Log:</strong> {data.billingSummary.auditStatus}</span>
              </span>
              <span className="font-semibold text-emerald-700">100% Reconciled</span>
            </div>
          </div>
        </div>
      )}

      {/* Explanatory Note for Prospective Enterprise Clients */}
      <div className="bg-brand-soft-neutral/40 rounded-2xl p-6 border border-brand-soft-neutral flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="text-sm font-bold text-brand-indigo">
            Deploy Customized Roster Telematics for Your Enterprise
          </h4>
          <p className="text-xs text-brand-slate max-w-2xl">
            This dashboard demonstrates Victor Mobility&apos;s real-time client software. Contracted corporate clients receive secure portal logins, API telematics integrations, and dedicated account managers.
          </p>
        </div>

        <Link
          href={`/${region}/rfp`}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs transition-colors shrink-0 shadow-sm"
        >
          <span>Initiate Corporate RFP</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
