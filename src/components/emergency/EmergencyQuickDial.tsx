"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PhoneCall,
  Phone,
  MessageSquare,
  ShieldAlert,
  ShieldCheck,
  Clock,
  Car,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Copy,
  ArrowRight,
  Radio,
} from "lucide-react";

interface EmergencyQuickDialProps {
  region: "india" | "uae";
}

export default function EmergencyQuickDial({ region }: EmergencyQuickDialProps) {
  const isIndia = region === "india";

  // Contacts
  const operationsPhoneDisplay = isIndia ? "+91 91007 77768" : "+971 52 455 2441";
  const operationsPhoneHref = isIndia ? "tel:+919100777768" : "tel:+971524552441";
  const secondaryPhoneDisplay = isIndia ? "+91 93965 46950" : "+971 52 455 2441";
  const secondaryPhoneHref = isIndia ? "tel:+919396546950" : "tel:+971524552441";
  const waNumber = isIndia ? "919396546950" : "971524552441";

  // Hot-swap dispatch state
  const [vehicleNo, setVehicleNo] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [passengerCount, setPassengerCount] = useState("1-4 Passengers");
  const [natureOfRequest, setNatureOfRequest] = useState("Vehicle Technical Assistance / Hot-Swap");
  const [copied, setCopied] = useState(false);

  const hotSwapMessage = `*🚨 PRIORITY OPERATIONS ALERT: HOT-SWAP / ASSISTANCE DISPATCH*
Entity: ${isIndia ? "Victor Mobility (India)" : "Victor Luxury Limousine (UAE)"}
Tagline: On Time Every Time.

*Incident Parameters:*
• Nature: ${natureOfRequest}
• Vehicle Reg/Type: ${vehicleNo || "[Not Specified]"}
• Current Location / Landmark: ${currentLocation || "[Current Location]"}
• Commuter Count: ${passengerCount}
• Time Stamp: ${new Date().toLocaleTimeString()}

*Action Required:*
Immediate Operations Room review for nearest depot replacement vehicle dispatch or protocol assistance.`;

  const waHotSwapLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    hotSwapMessage
  )}`;

  const handleCopyAlert = () => {
    navigator.clipboard.writeText(hotSwapMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-12">
      {/* 24/7 Operations Emergency Header Banner */}
      <div className="bg-gradient-to-br from-brand-indigo via-[#0D1636] to-[#060B1A] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden border border-white/10 shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0066FF_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                24/7 Live Operations Desk
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-brand-slate-light text-xs font-semibold">
                Offline Resilient
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Emergency Chauffeur Quick-Dial &amp; Hot-Swap Helpline
            </h2>
            <p className="text-sm text-brand-slate-light leading-relaxed">
              In low-connectivity airport basements, late-night transit situations, or sudden route disruptions, use direct one-tap telephone links or priority operations dispatch backed by <strong className="text-white">&ldquo;On Time Every Time.&rdquo;</strong>
            </p>
          </div>

          <div className="shrink-0 space-y-2">
            <a
              href={operationsPhoneHref}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm sm:text-base transition-all shadow-lg hover:shadow-rose-600/40"
            >
              <PhoneCall className="w-5 h-5 animate-bounce" />
              <span>Call Operations: {operationsPhoneDisplay}</span>
            </a>
            <p className="text-[11px] text-center text-brand-slate-light/70">
              Immediate connection to duty fleet controller
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Primary Operations Hotline */}
        <div className="bg-white rounded-2xl p-6 border border-brand-soft-neutral shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-3">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-slate block">
              Primary Central Operations
            </span>
            <h4 className="text-lg font-bold text-brand-indigo mt-0.5">
              24/7 Fleet Control Room
            </h4>
            <p className="text-xs text-brand-slate mt-1 leading-relaxed">
              {isIndia
                ? "Direct hotline to Hyderabad, Bengaluru, and Pune central fleet controllers for live route updates and dispatch support."
                : "Direct hotline to Dubai Al Garhoud operations desk for DXB airport arrivals, VIP transfers, and inter-emirate routing."}
            </p>
          </div>

          <a
            href={operationsPhoneHref}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-indigo hover:bg-brand-indigo-light text-white text-xs font-bold transition-all shadow-xs"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call {operationsPhoneDisplay}</span>
          </a>
        </div>

        {/* Card 2: Fleet WhatsApp Dispatch */}
        <div className="bg-white rounded-2xl p-6 border border-brand-soft-neutral shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-slate block">
              Instant Dispatch Messenger
            </span>
            <h4 className="text-lg font-bold text-brand-indigo mt-0.5">
              WhatsApp Operations Desk
            </h4>
            <p className="text-xs text-brand-slate mt-1 leading-relaxed">
              {isIndia
                ? "Prefilled messaging channel to +91 93965 46950 for corporate facility admins, roster modifications, and itinerary shifts."
                : "Prefilled WhatsApp channel to +971 52 455 2441 for flight radar adjustments, hotel pickups, and delegation concierge."}
            </p>
          </div>

          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Open WhatsApp Desk</span>
          </a>
        </div>

        {/* Card 3: Hot-Swap & SOS Assurance */}
        <div className="bg-white rounded-2xl p-6 border border-brand-soft-neutral shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-slate block">
              15-Minute SLA Guarantee
            </span>
            <h4 className="text-lg font-bold text-brand-indigo mt-0.5">
              Depot Hot-Swap Commitment
            </h4>
            <p className="text-xs text-brand-slate mt-1 leading-relaxed">
              In the unlikely event of a mechanical fault or unexpected highway puncture, a standby replacement vehicle is mobilized immediately from the nearest operational depot.
            </p>
          </div>

          <a
            href={secondaryPhoneHref}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-soft-neutral hover:bg-brand-soft-neutral/80 text-brand-indigo text-xs font-bold transition-all border border-brand-soft-neutral"
          >
            <Clock className="w-3.5 h-3.5 text-brand-blue" />
            <span>Hot-Swap Helpline</span>
          </a>
        </div>
      </div>

      {/* Interactive Priority Dispatch Brief Form */}
      <div className="bg-white rounded-3xl border border-brand-soft-neutral p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-blue block mb-2">
            Priority Incident Coordination
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-indigo">
            Dispatch Priority Operations Brief
          </h3>
          <p className="text-sm text-brand-slate mt-1">
            Need urgent assistance, vehicle replacement, or emergency security escort coordination? Fill in the details below to generate a formatted incident brief for immediate dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-2">
              Nature of Emergency / Incident
            </label>
            <select
              value={natureOfRequest}
              onChange={(e) => setNatureOfRequest(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-brand-soft-neutral rounded-xl text-brand-indigo font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            >
              <option value="Vehicle Technical Assistance / Hot-Swap">
                Vehicle Technical Fault / Immediate Hot-Swap Required
              </option>
              <option value="Flight Radar Delay / Schedule Change">
                Flight Schedule Shift / Terminal Curbside Rescheduling
              </option>
              <option value="Night Safety Escort SOS Alert">
                Night Safety Escort Confirmation / Urgent Check-In
              </option>
              <option value="Severe Traffic Bottleneck / Route Deviation">
                Severe Expressway Blockage / Dynamic Alternative Routing
              </option>
              <option value="Corporate Roster Emergency Reassignment">
                Corporate Commuter Shift Emergency Reassignment
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-2">
              Vehicle Registration or Route Code (Optional)
            </label>
            <input
              type="text"
              placeholder={isIndia ? "e.g., TS 09 UB 4821 or HYD-COR-04" : "e.g., Dubai Plate D 40182 or DXB-VIP-01"}
              value={vehicleNo}
              onChange={(e) => setVehicleNo(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-brand-soft-neutral rounded-xl text-brand-indigo font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-2">
              Current Location &amp; Landmark
            </label>
            <input
              type="text"
              placeholder={isIndia ? "e.g., Near Gachibowli Flyover / ORR Toll" : "e.g., Sheikh Zayed Road near DIFC"}
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-brand-soft-neutral rounded-xl text-brand-indigo font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-2">
              Passenger Volume Onboard
            </label>
            <select
              value={passengerCount}
              onChange={(e) => setPassengerCount(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-brand-soft-neutral rounded-xl text-brand-indigo font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            >
              <option value="1-4 Passengers">1 – 4 Passengers (Sedan / MPV)</option>
              <option value="5-7 Passengers">5 – 7 Passengers (Executive MPV / SUV)</option>
              <option value="8-20 Passengers">8 – 20 Passengers (Tempo Traveler / Minibus)</option>
              <option value="20+ Passengers">20+ Passengers (Luxury Staff Coach)</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-brand-soft-neutral flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-brand-slate">
            Opening WhatsApp prepares this alert draft; it does not constitute a booking confirmation.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyAlert}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-soft-neutral hover:bg-brand-soft-neutral/80 text-brand-indigo text-xs font-semibold transition-all border border-brand-soft-neutral"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied Alert</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Brief</span>
                </>
              )}
            </button>

            <a
              href={waHotSwapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Dispatch via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
