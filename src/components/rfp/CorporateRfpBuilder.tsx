"use client";

import { useState } from "react";
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Send,
  Copy,
  Check,
  AlertCircle,
  FileSpreadsheet,
  Briefcase,
  Zap,
} from "lucide-react";
import type { ContactData, CityItem, ServiceItem } from "@/types/content";

interface CorporateRfpBuilderProps {
  region: "india" | "uae";
  contact: ContactData;
  cities: CityItem[];
  services: ServiceItem[];
  companyName: string;
}

export default function CorporateRfpBuilder({
  region,
  contact,
  cities,
  services,
  companyName,
}: CorporateRfpBuilderProps) {
  const [step, setStep] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  // Form State
  const [corporateData, setCorporateData] = useState({
    companyName: "",
    contactPerson: "",
    designation: "",
    email: "",
    phone: "",
    city: cities[0]?.name || (region === "uae" ? "Dubai" : "Hyderabad"),
    contractType: "Employee Transportation (Daily Workforce Shuttles)",
    dailyCommuters: "200 – 500 Commuters",
    shiftPatterns: "2 Shifts (Morning / Evening)",
    vehiclePreferences: ["Corporate AC Cabs (4-seater)", "Executive MPVs (6-7 seater)"],
    safetyRequirements: [
      "100% Police Clearance & Driver Background Verification (BGV)",
      "24/7 Operations Control Room & Real-time GPS Tracking",
      "Female Passenger Escort & Safe-Drop Protocols",
    ],
    evInterest: "Interested in 15%–30% EV Fleet Allocation",
    targetStartDate: "",
    additionalNotes: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const contractOptions =
    region === "uae"
      ? [
          "Corporate Delegation & VIP Limousine Retainer",
          "DXB & AUH Airport VIP Meet-and-Assist Retainer",
          "Free-Zone & Corporate Employee Shuttles",
          "International Summit & Trade Fair Logistics (GITEX / ADIPEC)",
          "Long-Term Fleet Leasing with Chauffeurs",
        ]
      : [
          "Employee Transportation (Daily Workforce Shuttles)",
          "IT Campus Fixed-Route Bus Shuttles (22/45 Seater)",
          "Executive VIP & Board Travel Retainer",
          "Corporate Event & Conference Convoy Transit",
          "Dedicated Enterprise Cab Retainer",
        ];

  const commuterTiers = [
    "Under 50 Passengers / Day",
    "50 – 200 Commuters / Day",
    "200 – 500 Commuters / Day",
    "500 – 1,500 Commuters / Day",
    "1,500+ Large Campus Enterprise Volume",
  ];

  const shiftOptions = [
    "General Office Hours (Single Shift)",
    "2 Shifts (Morning / Evening Rosters)",
    "3 Shifts (24/7 Round-the-Clock IT/BPO Operations)",
    "Split / Custom Timetable Shifts",
  ];

  const vehicleOptions =
    region === "uae"
      ? [
          "First Class Saloons (Mercedes-Benz S-Class, BMW 7)",
          "Ultra-Luxury VIP (Mercedes-Maybach)",
          "Executive SUVs (Cadillac Escalade, GMC Yukon)",
          "Executive MPVs (Mercedes-Benz V-Class)",
          "Luxury Coaches (22 to 50-seater buses)",
        ]
      : [
          "Corporate AC Cabs (4-seater sedans)",
          "Executive MPVs (6-7 seater Toyota Innova Crysta)",
          "22-Seater Air-Conditioned Mini Buses",
          "44/50-Seater Luxury Coaches",
          "Electric Vehicles (EV Cabs & Shuttles)",
        ];

  const complianceStandards = [
    "100% Police Clearance & Driver Background Verification (BGV)",
    "24/7 Operations Control Room & Real-time GPS Tracking",
    "Female Passenger Escort & Safe-Drop Protocols",
    "Pre-Trip Sanitization & Dual-Zone Climate Comfort",
    "Emergency Panic Alarms & Centralized SOS Response",
  ];

  const handleCheckboxToggle = (field: "vehiclePreferences" | "safetyRequirements", item: string) => {
    setCorporateData((prev) => {
      const exists = prev[field].includes(item);
      return {
        ...prev,
        [field]: exists ? prev[field].filter((x) => x !== item) : [...prev[field], item],
      };
    });
  };

  const validateStep = (currentStep: number): boolean => {
    const errs: { [key: string]: string } = {};

    if (currentStep === 1) {
      if (!corporateData.companyName.trim()) errs.companyName = "Company or Enterprise Name is required.";
      if (!corporateData.contactPerson.trim()) errs.contactPerson = "Contact Person name is required.";
      if (!corporateData.email.trim()) {
        errs.email = "Business email is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(corporateData.email.trim())) {
        errs.email = "Please enter a valid corporate email address.";
      }
      if (!corporateData.phone.trim()) errs.phone = "Direct contact phone or WhatsApp is required.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Compile Structured RFP Document
  const generateRfpDocument = () => {
    const lines = [
      `========================================`,
      `ENTERPRISE MOBILITY RFP & TENDER BRIEF`,
      `Victor Mobility (${region === "uae" ? "United Arab Emirates" : "India"})`,
      `Tagline: On Time Every Time.`,
      `========================================`,
      ``,
      `1. CLIENT ENTERPRISE PROFILE`,
      `   Organization: ${corporateData.companyName || "[Company Name]"}`,
      `   Contact Person: ${corporateData.contactPerson || "[Representative Name]"}`,
      `   Designation: ${corporateData.designation || "[Designation]"}`,
      `   Business Email: ${corporateData.email || "[Email]"}`,
      `   Direct Telephone: ${corporateData.phone || "[Phone]"}`,
      `   Operating Hub: ${corporateData.city} (${region === "uae" ? "UAE" : "India"})`,
      ``,
      `2. OPERATIONAL SCOPE & VOLUME`,
      `   Contract Type: ${corporateData.contractType}`,
      `   Daily Passenger Volume: ${corporateData.dailyCommuters}`,
      `   Shift Roster Dynamics: ${corporateData.shiftPatterns}`,
      `   Target Commencement: ${corporateData.targetStartDate || "Immediate / Mutually agreed"}`,
      ``,
      `3. DESIRED FLEET CONFIGURATION`,
      ...(corporateData.vehiclePreferences.length > 0
        ? corporateData.vehiclePreferences.map((v) => `   - ${v}`)
        : [`   - Standard Corporate Allocation`]),
      ``,
      `4. COMPLIANCE & GOVERNANCE REQUIREMENTS`,
      ...(corporateData.safetyRequirements.length > 0
        ? corporateData.safetyRequirements.map((s) => `   [X] ${s}`)
        : [`   [X] Victor Standard Operational Governance`]),
      `   Sustainability: ${corporateData.evInterest}`,
      ``,
      ...(corporateData.additionalNotes.trim()
        ? [
            `5. SPECIAL INSTRUCTIONS / CORRIDORS`,
            `   ${corporateData.additionalNotes.trim()}`,
            ``,
          ]
        : []),
      `========================================`,
      `Prepared via Victor Mobility Enterprise RFP Desk`,
      `Operations Control: ${contact.phoneDisplay} | ${contact.printedEmail || contact.whatsappDisplay}`,
      `========================================`,
    ];
    return lines.join("\n");
  };

  const rfpText = generateRfpDocument();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rfpText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = rfpText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const whatsappHref = `${contact.whatsappBaseUrl}?text=${encodeURIComponent(rfpText)}`;
  const emailHref = contact.printedEmail
    ? `mailto:${contact.printedEmail}?subject=${encodeURIComponent(
        `Corporate RFP: ${corporateData.companyName || "Enterprise Mobility"} - ${corporateData.city}`
      )}&body=${encodeURIComponent(rfpText)}`
    : undefined;

  return (
    <div className="bg-white rounded-3xl border border-brand-soft-neutral shadow-lg overflow-hidden">
      {/* Progress Header */}
      <div className="bg-brand-ink text-white p-6 sm:p-8 border-b border-brand-indigo/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-violet block">
              Enterprise Procurement Desk · {region === "uae" ? "UAE" : "India"}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Request for Proposal (RFP) & Tender Builder
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s
                    ? "bg-brand-violet text-white ring-2 ring-brand-violet/50"
                    : step > s
                    ? "bg-emerald-600 text-white"
                    : "bg-white/10 text-brand-soft-neutral/60"
                }`}
              >
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-xs text-brand-soft-neutral/80 pt-4 border-t border-brand-indigo/25">
          <span>
            {step === 1 && "Step 1 of 4: Corporate Profile & Procurement Contact"}
            {step === 2 && "Step 2 of 4: Contract Scope & Shift Patterns"}
            {step === 3 && "Step 3 of 4: Fleet Mix & Safety Governance"}
            {step === 4 && "Step 4 of 4: Review Tender & Dispatch RFP"}
          </span>
          <span className="text-[11px] font-semibold text-brand-violet">
            Authorized Enterprise SLA
          </span>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 sm:p-10">
        {/* STEP 1: Corporate Profile */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="max-w-xl">
              <h3 className="text-lg font-bold text-brand-ink">
                1. Corporate Profile & Contact Details
              </h3>
              <p className="text-xs sm:text-sm text-brand-ink/75 mt-1">
                Enter your company information and direct facilities contact for quotation delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="rfp-company-name"
                  className="block text-xs font-bold uppercase tracking-wider text-brand-ink mb-2"
                >
                  Enterprise / Organization Name *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-brand-indigo absolute left-3.5 top-3.5" />
                  <input
                    id="rfp-company-name"
                    type="text"
                    required
                    value={corporateData.companyName}
                    onChange={(e) => setCorporateData({ ...corporateData, companyName: e.target.value })}
                    placeholder="e.g. Amazon, JPMorgan Chase, Google"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-brand-warm-white/40 text-sm text-brand-ink outline-none ${
                      errors.companyName ? "border-red-500 focus:ring-2 focus:ring-red-400" : "border-brand-soft-neutral focus:ring-2 focus:ring-brand-indigo"
                    }`}
                  />
                </div>
                {errors.companyName && (
                  <p className="mt-1 text-xs text-red-600 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.companyName}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="rfp-contact-person"
                  className="block text-xs font-bold uppercase tracking-wider text-brand-ink mb-2"
                >
                  Procurement / Facilities Lead *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-brand-indigo absolute left-3.5 top-3.5" />
                  <input
                    id="rfp-contact-person"
                    type="text"
                    required
                    value={corporateData.contactPerson}
                    onChange={(e) => setCorporateData({ ...corporateData, contactPerson: e.target.value })}
                    placeholder="e.g. Rajesh Nair or Sarah Jenkins"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-brand-warm-white/40 text-sm text-brand-ink outline-none ${
                      errors.contactPerson ? "border-red-500 focus:ring-2 focus:ring-red-400" : "border-brand-soft-neutral focus:ring-2 focus:ring-brand-indigo"
                    }`}
                  />
                </div>
                {errors.contactPerson && (
                  <p className="mt-1 text-xs text-red-600 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.contactPerson}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="rfp-email"
                  className="block text-xs font-bold uppercase tracking-wider text-brand-ink mb-2"
                >
                  Corporate Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-brand-indigo absolute left-3.5 top-3.5" />
                  <input
                    id="rfp-email"
                    type="email"
                    required
                    value={corporateData.email}
                    onChange={(e) => setCorporateData({ ...corporateData, email: e.target.value })}
                    placeholder="lead@company.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-brand-warm-white/40 text-sm text-brand-ink outline-none ${
                      errors.email ? "border-red-500 focus:ring-2 focus:ring-red-400" : "border-brand-soft-neutral focus:ring-2 focus:ring-brand-indigo"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="rfp-phone"
                  className="block text-xs font-bold uppercase tracking-wider text-brand-ink mb-2"
                >
                  Direct Telephone / WhatsApp *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-brand-indigo absolute left-3.5 top-3.5" />
                  <input
                    id="rfp-phone"
                    type="tel"
                    required
                    value={corporateData.phone}
                    onChange={(e) => setCorporateData({ ...corporateData, phone: e.target.value })}
                    placeholder={region === "uae" ? "+971 50 123 4567" : "+91 98765 43210"}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-brand-warm-white/40 text-sm text-brand-ink outline-none ${
                      errors.phone ? "border-red-500 focus:ring-2 focus:ring-red-400" : "border-brand-soft-neutral focus:ring-2 focus:ring-brand-indigo"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="rfp-city"
                  className="block text-xs font-bold uppercase tracking-wider text-brand-ink mb-2"
                >
                  Primary Operating Hub / Location *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-brand-indigo absolute left-3.5 top-3.5" />
                  <select
                    id="rfp-city"
                    value={corporateData.city}
                    onChange={(e) => setCorporateData({ ...corporateData, city: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-soft-neutral bg-brand-warm-white/40 text-sm text-brand-ink focus:ring-2 focus:ring-brand-indigo outline-none"
                  >
                    {cities.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                    <option value="Pan-India / Inter-Emirate Network">
                      {region === "uae" ? "Inter-Emirate Network (Dubai & Abu Dhabi)" : "Pan-India Multi-City Network"}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Contract Scope & Shifts */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="max-w-xl">
              <h3 className="text-lg font-bold text-brand-ink">
                2. Operational Scope & Shift Roster
              </h3>
              <p className="text-xs sm:text-sm text-brand-ink/75 mt-1">
                Define the contract framework, expected commuter headcounts, and daily transit rotations.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-ink mb-3">
                  Select Contract Scope / Model *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {contractOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setCorporateData({ ...corporateData, contractType: opt })}
                      className={`text-left p-3.5 rounded-xl border text-xs font-semibold transition-all ${
                        corporateData.contractType === opt
                          ? "bg-brand-indigo text-white border-brand-indigo shadow-xs"
                          : "bg-white text-brand-ink border-brand-soft-neutral hover:bg-brand-warm-white"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-brand-soft-neutral">
                <div>
                  <label
                    htmlFor="rfp-commuters"
                    className="block text-xs font-bold uppercase tracking-wider text-brand-ink mb-2"
                  >
                    Estimated Daily Passenger Volume
                  </label>
                  <select
                    id="rfp-commuters"
                    value={corporateData.dailyCommuters}
                    onChange={(e) => setCorporateData({ ...corporateData, dailyCommuters: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-brand-soft-neutral bg-brand-warm-white/40 text-sm text-brand-ink focus:ring-2 focus:ring-brand-indigo outline-none"
                  >
                    {commuterTiers.map((tier) => (
                      <option key={tier} value={tier}>
                        {tier}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="rfp-shifts"
                    className="block text-xs font-bold uppercase tracking-wider text-brand-ink mb-2"
                  >
                    Shift Roster Frequency
                  </label>
                  <select
                    id="rfp-shifts"
                    value={corporateData.shiftPatterns}
                    onChange={(e) => setCorporateData({ ...corporateData, shiftPatterns: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-brand-soft-neutral bg-brand-warm-white/40 text-sm text-brand-ink focus:ring-2 focus:ring-brand-indigo outline-none"
                  >
                    {shiftOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="rfp-notes"
                  className="block text-xs font-bold uppercase tracking-wider text-brand-ink mb-2"
                >
                  Key Route Corridors or Campus Locations
                </label>
                <textarea
                  id="rfp-notes"
                  rows={3}
                  value={corporateData.additionalNotes}
                  onChange={(e) => setCorporateData({ ...corporateData, additionalNotes: e.target.value })}
                  placeholder={
                    region === "uae"
                      ? "e.g. DIFC Gate Village, Downtown Dubai, and DXB Terminal 3 standby..."
                      : "e.g. HITEC City to RGIA Shamshabad, Whitefield to E-City, Hinjawadi Phase 3..."
                  }
                  className="w-full p-4 rounded-xl border border-brand-soft-neutral bg-brand-warm-white/40 text-sm text-brand-ink focus:ring-2 focus:ring-brand-indigo outline-none resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Fleet Mix & Compliance */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="max-w-xl">
              <h3 className="text-lg font-bold text-brand-ink">
                3. Desired Fleet Mix & Compliance Standards
              </h3>
              <p className="text-xs sm:text-sm text-brand-ink/75 mt-1">
                Select the vehicle categories and required safety verifications for your enterprise SLA.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-ink mb-3">
                  Vehicle Categories Required (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {vehicleOptions.map((veh) => {
                    const checked = corporateData.vehiclePreferences.includes(veh);
                    return (
                      <button
                        type="button"
                        key={veh}
                        onClick={() => handleCheckboxToggle("vehiclePreferences", veh)}
                        className={`text-left p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                          checked
                            ? "bg-brand-indigo/10 text-brand-indigo border-brand-indigo font-bold"
                            : "bg-white text-brand-ink/80 border-brand-soft-neutral hover:bg-brand-warm-white"
                        }`}
                      >
                        <span>{veh}</span>
                        {checked && <CheckCircle2 className="w-4 h-4 text-brand-indigo shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-brand-soft-neutral">
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-ink mb-3">
                  Mandatory Safety & Compliance Protocols
                </label>
                <div className="space-y-2.5">
                  {complianceStandards.map((std) => {
                    const checked = corporateData.safetyRequirements.includes(std);
                    return (
                      <button
                        type="button"
                        key={std}
                        onClick={() => handleCheckboxToggle("safetyRequirements", std)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium flex items-center justify-between transition-all ${
                          checked
                            ? "bg-emerald-50 text-emerald-900 border-emerald-300 font-semibold"
                            : "bg-white text-brand-ink/80 border-brand-soft-neutral hover:bg-brand-warm-white"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <ShieldCheck className={`w-4 h-4 ${checked ? "text-emerald-600" : "text-brand-ink/40"}`} />
                          <span>{std}</span>
                        </span>
                        {checked && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ESG / EV Fleet Allocation */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
                <Zap className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-emerald-950 block">
                    Victor Environmental Stewardship Pledge (15%–30% EV Allocation)
                  </span>
                  <p className="text-emerald-900/80">
                    Victor supports your enterprise net-zero targets with electric vehicle (EV) deployments across our corporate cab and shuttle routes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Review Tender & Dispatch */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                RFP Specification Compiled
              </span>
              <h3 className="text-xl font-bold text-brand-ink">
                4. Review & Dispatch Enterprise RFP
              </h3>
              <p className="text-xs sm:text-sm text-brand-ink/75 mt-1">
                Your formal mobility specification is ready. Choose your preferred dispatch channel to submit to Victor&apos;s corporate desk.
              </p>
            </div>

            {/* Generated RFP Document Preview */}
            <div className="bg-brand-warm-white rounded-2xl p-5 sm:p-6 border border-brand-soft-neutral relative">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-brand-soft-neutral">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-ink/70">
                  <FileSpreadsheet className="w-4 h-4 text-brand-indigo" />
                  <span>Formal Tender Document Brief</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-brand-soft-neutral text-xs font-bold text-brand-ink hover:bg-brand-soft-neutral/50 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-brand-indigo" />
                      <span>Copy Document</span>
                    </>
                  )}
                </button>
              </div>

              <pre
                id="rfp-preview-document"
                className="text-xs font-mono text-brand-ink/85 whitespace-pre-wrap max-h-64 overflow-y-auto leading-relaxed select-all"
              >
                {rfpText}
              </pre>
            </div>

            {/* Multi-Channel Dispatch CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all group"
              >
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                <span>Dispatch RFP via WhatsApp</span>
              </a>

              {emailHref ? (
                <a
                  href={emailHref}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-brand-ink hover:bg-brand-indigo text-white font-bold text-sm shadow-md transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Submit Tender via Email</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-brand-ink hover:bg-brand-indigo text-white font-bold text-sm shadow-md transition-all"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy Tender Specification</span>
                </button>
              )}
            </div>

            {/* SLA Commitment Notice */}
            <div className="p-4 rounded-2xl bg-brand-warm-white border border-brand-soft-neutral text-xs text-brand-ink/75 leading-relaxed">
              <p>
                <strong>24-Hour SLA Commitment:</strong> Upon receipt, our Business Development & Fleet Coordination Team will evaluate your shift rosters, route density, and vehicle allocation. A formal commercial rate card and route simulation report will be issued within 24 business hours.
              </p>
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="mt-8 pt-6 border-t border-brand-soft-neutral flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-brand-soft-neutral text-xs font-bold text-brand-ink hover:bg-brand-warm-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Step</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-violet hover:bg-brand-violet-hover text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>Continue to Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-semibold text-brand-indigo hover:underline"
            >
              Edit Requirements
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
