"use client";

import { useState, useId, useEffect } from "react";
import {
  MessageSquare,
  Phone,
  Send,
  Info,
  User,
  Briefcase,
  MapPin,
  FileText,
  Copy,
  Check,
  AlertCircle,
} from "lucide-react";
import type { ContactData, EnquiryData, ServiceItem, CityItem } from "@/types/content";
import type { EnquirySelectionEvent } from "@/lib/enquiryEvents";

interface EnquirySectionProps {
  contact: ContactData;
  enquiry: EnquiryData;
  services: ServiceItem[];
  cities: CityItem[];
  preselectedService?: string;
  preselectedCity?: string;
  isStandalonePage?: boolean;
  companyName?: string;
}

export default function EnquirySection({
  contact,
  enquiry,
  services,
  cities,
  preselectedService,
  preselectedCity,
  isStandalonePage = false,
  companyName,
}: EnquirySectionProps) {
  const isUae = contact.whatsappDigits?.startsWith("971");
  const effectiveCompany =
    companyName || (isUae ? "Victor Luxury Limousine LLC (Victor Mobility UAE)" : "Victor Mobility Pvt. Ltd.");
  const publishedServices = services.filter((s) => s.published);
  const publishedCities = cities.filter((c: any) => c.published);
  const [fullName, setFullName] = useState("");
  const [selectedService, setSelectedService] = useState(
    preselectedService || publishedServices[0]?.title || "Employee Transportation"
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState(
    preselectedCity || publishedCities[0]?.name || "Hyderabad"
  );
  const [customCity, setCustomCity] = useState("");
  const [requirementText, setRequirementText] = useState("");

  const [touched, setTouched] = useState({
    name: false,
    customCity: false,
    requirement: false,
  });
  const [submissionAttempted, setSubmissionAttempted] = useState(false);
  const [copied, setCopied] = useState(false);

  const serviceId = useId();
  const cityId = useId();
  const customCityId = useId();
  const reqId = useId();

  // Read URL search params and listen for selection events from in-page links
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const sParam = params.get("service") || preselectedService;
      const cParam = params.get("city") || preselectedCity;
      const catParam = params.get("category");
      if (catParam) {
        setSelectedCategory(catParam);
      }
      if (sParam) {
        const matchedService = publishedServices.find(
          (s) => s.slug === sParam || s.title.toLowerCase() === sParam.toLowerCase()
        );
        if (matchedService) {
          setSelectedService(matchedService.title);
        }
      }
      if (cParam) {
        const matchedCity = publishedCities.find(
          (c) => c.name.toLowerCase() === cParam.toLowerCase()
        );
        if (matchedCity) {
          setSelectedCity(matchedCity.name);
        } else {
          setSelectedCity("Other");
          setCustomCity(cParam);
        }
      }
    }
    const handleEnquirySelection = (e: Event) => {
      const customEvent = e as CustomEvent<EnquirySelectionEvent>;
      const detail = customEvent.detail;
      if (!detail) return;

      if (detail.category) {
        setSelectedCategory(detail.category);
        // If no explicit service provided, intelligently map to matching service
        if (!detail.service) {
          const catLower = detail.category.toLowerCase();
          if (catLower.includes("luxury")) {
            setSelectedService("Chauffeur & Luxury Travel");
          } else if (catLower.includes("bus")) {
            setSelectedService("Bus & Shuttle Transport");
          } else if (catLower.includes("mpv")) {
            setSelectedService("Event Transportation");
          } else if (catLower.includes("sedan")) {
            setSelectedService("Chauffeur & Luxury Travel");
          }
        }
      }

      if (detail.service) {
        const matchedService = publishedServices.find(
          (s) => s.slug === detail.service || s.title.toLowerCase() === detail.service?.toLowerCase()
        );
        if (matchedService) {
          setSelectedService(matchedService.title);
        } else {
          setSelectedService(detail.service);
        }
      }

      if (detail.city) {
        const matchedCity = publishedCities.find(
          (c) => c.name.toLowerCase() === detail.city?.toLowerCase()
        );
        if (matchedCity) {
          setSelectedCity(matchedCity.name);
        } else {
          setSelectedCity("Other");
          setCustomCity(detail.city);
        }
      }

      if (detail.note) {
        setRequirementText((prev) => (prev ? `${prev}\n${detail.note}` : detail.note || ""));
      }
    };

    window.addEventListener("victor:select-enquiry", handleEnquirySelection);
    return () => {
      window.removeEventListener("victor:select-enquiry", handleEnquirySelection);
    };
  }, [publishedServices, publishedCities, preselectedService, preselectedCity]);

  const cityDisplay = selectedCity === "Other" && customCity.trim() ? customCity.trim() : selectedCity;

  // Real-time accessible error calculations
  const nameError =
    (touched.name || submissionAttempted) && !fullName.trim()
      ? "Please provide your full name or company representative name."
      : "";

  const customCityError =
    selectedCity === "Other" && (touched.customCity || submissionAttempted) && !customCity.trim()
      ? "Please specify the destination or route corridor."
      : "";

  const requirementError =
    (touched.requirement || submissionAttempted) && !requirementText.trim()
      ? "Please describe your transport requirement (passengers, schedule, or locations)."
      : "";

  const isValid =
    fullName.trim().length > 0 &&
    requirementText.trim().length > 0 &&
    (selectedCity !== "Other" || customCity.trim().length > 0);

  // Build the WhatsApp message preview
  const generateWhatsAppMessage = () => {
    const lines = [
      `*Transport Requirement Enquiry*`,
      `*${effectiveCompany}*`,
      `--------------------------------`,
      `*Contact Name:* ${fullName.trim() || "[Your Name]"}`,
      `*Service:* ${selectedService}`,
      ...(selectedCategory ? [`*Vehicle Category:* ${selectedCategory}`] : []),
      `*City / Region:* ${cityDisplay}`,
      `*Journey Details:*`,
      requirementText.trim() || "[Shift timings, route corridor, passenger count or dates]",
      `--------------------------------`,
      `Prepared via Victor Mobility Requirement Desk`,
    ];
    return lines.join("\n");
  };

  const draftMessage = generateWhatsAppMessage();

  const handleCopyDraft = async () => {
    try {
      await navigator.clipboard.writeText(draftMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API is restricted
      const textarea = document.createElement("textarea");
      textarea.value = draftMessage;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleContinueWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionAttempted(true);

    if (!fullName.trim()) {
      document.getElementById("enquiry-name-input")?.focus();
      return;
    }
    if (selectedCity === "Other" && !customCity.trim()) {
      document.getElementById(customCityId)?.focus();
      return;
    }
    if (!requirementText.trim()) {
      document.getElementById(reqId)?.focus();
      return;
    }

    const encodedMessage = encodeURIComponent(draftMessage);
    const url = `${contact.whatsappBaseUrl}?text=${encodedMessage}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const currentServiceObj = publishedServices.find((s) => s.title === selectedService);

  const getRequirementPlaceholder = () => {
    switch (selectedService) {
      case "Airport Transfers":
        return "Flight number, terminal, travel date & time, passenger count and luggage volume...";
      case "Employee Transportation":
        return "Shift roster timings, office location, transit corridors, and estimated employee count...";
      case "Bus & Shuttle Transport":
        return "Pickup points, campus/venue route, expected passenger count, and shuttle schedule...";
      case "Event Transportation":
        return "Event dates, venue locations, VIP or guest group counts, and transit itinerary...";
      case "Chauffeur & Luxury Travel":
        return "Occasion, preferred vehicle category, dates, and itinerary requirements...";
      case "Rent-A-Car":
        return "Rental duration, preferred vehicle type, self-drive or chauffeur preference...";
      default:
        return "Detail your requirements: passenger count, shift timings, pickup/drop locations, or dates...";
    }
  };

  return (
    <section
      id="contact"
      tabIndex={-1}
      className={`${
        isStandalonePage ? "pt-6 pb-14 sm:pt-10 sm:pb-20" : "py-14 sm:py-20"
      } bg-white border-b border-brand-soft-neutral focus:outline-none`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`max-w-3xl ${isStandalonePage ? "mb-6 sm:mb-8" : "mb-8 sm:mb-12"}`}>
          <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
            Requirement Desk
          </span>
          {isStandalonePage ? (
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-2">
              Tell us what you need to arrange
            </h1>
          ) : (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-2">
              Tell us what you need to arrange
            </h2>
          )}
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
            Fill in your transport details below to prepare a structured WhatsApp enquiry, or call our operations desk directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Form & Live Draft */}
          <div className="lg:col-span-7 bg-brand-warm-white rounded-2xl p-6 sm:p-8 border border-brand-soft-neutral shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-brand-soft-neutral">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm sm:text-base text-brand-ink">
                  WhatsApp Enquiry Builder
                </span>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Direct WhatsApp Draft
              </span>
            </div>

            {selectedCategory && (
              <div className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-indigo/10 border border-brand-indigo/25 text-xs font-semibold text-brand-indigo">
                <span>Preferred Category: <strong>{selectedCategory}</strong></span>
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className="w-4 h-4 rounded-full bg-brand-indigo/20 hover:bg-brand-indigo hover:text-white flex items-center justify-center text-[10px] transition-colors ml-1"
                  aria-label="Remove category filter"
                >
                  ✕
                </button>
              </div>
            )}

            <form onSubmit={handleContinueWhatsApp} noValidate className="space-y-6">
              {/* Name Field: Unified matching ID for label htmlFor and input id */}
              <div>
                <label
                  htmlFor="enquiry-name-input"
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-ink mb-2 cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-brand-blue" />
                  <span>Your Name or Company *</span>
                </label>
                <input
                  id="enquiry-name-input"
                  name="fullName"
                  type="text"
                  required
                  aria-required="true"
                  aria-invalid={!!nameError}
                  aria-describedby={nameError ? "name-error" : undefined}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                  placeholder="e.g. Rahul Sharma or Acme Corp"
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-brand-ink placeholder:text-brand-ink/40 outline-none transition-all ${
                    nameError
                      ? "border-red-500 focus:ring-2 focus:ring-red-400"
                      : "border-brand-soft-neutral focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo"
                  }`}
                />
                {nameError && (
                  <p id="name-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{nameError}</span>
                  </p>
                )}
              </div>

              {/* Service & City (2-column on tablet/desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor={serviceId}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-ink mb-2 cursor-pointer"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Service Needed *</span>
                  </label>
                  <select
                    id={serviceId}
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brand-soft-neutral bg-white text-sm text-brand-ink focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo outline-none"
                  >
                    {publishedServices.map((s) => (
                      <option key={s.slug} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={cityId}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-ink mb-2 cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                    <span>City or Region *</span>
                  </label>
                  <select
                    id={cityId}
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brand-soft-neutral bg-white text-sm text-brand-ink focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo outline-none"
                  >
                    {publishedCities.map((c: any) => (
                      <option key={c.name} value={c.name}>
                        {c.name}{c.state ? ` (${c.state})` : c.emirate ? ` (${c.emirate})` : ""}
                      </option>
                    ))}
                    <option value="Other">Other City / Inter-City</option>
                  </select>
                </div>
              </div>

              {/* If "Other" city selected */}
              {selectedCity === "Other" && (
                <div>
                  <label
                    htmlFor={customCityId}
                    className="text-xs font-bold uppercase tracking-wider text-brand-ink block mb-2 cursor-pointer"
                  >
                    Specify City / Route Corridor *
                  </label>
                  <input
                    id={customCityId}
                    type="text"
                    required
                    aria-required="true"
                    aria-invalid={!!customCityError}
                    aria-describedby={customCityError ? "custom-city-error" : undefined}
                    value={customCity}
                    onChange={(e) => setCustomCity(e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, customCity: true }))}
                    placeholder="Enter destination or route corridor"
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-brand-ink placeholder:text-brand-ink/40 outline-none transition-all ${
                      customCityError
                        ? "border-red-500 focus:ring-2 focus:ring-red-400"
                        : "border-brand-soft-neutral focus:ring-2 focus:ring-brand-indigo"
                    }`}
                  />
                  {customCityError && (
                    <p id="custom-city-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{customCityError}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Requirement Details */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor={reqId}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-ink cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Journey or Schedule Details *</span>
                  </label>
                  {currentServiceObj && currentServiceObj.enquiryDetails.length > 0 && (
                    <span className="text-[11px] text-brand-indigo font-medium hidden sm:inline-block">
                      Include: {currentServiceObj.enquiryDetails.slice(0, 3).join(", ")}
                    </span>
                  )}
                </div>
                <textarea
                  id={reqId}
                  required
                  aria-required="true"
                  aria-invalid={!!requirementError}
                  aria-describedby={requirementError ? "req-error" : undefined}
                  rows={4}
                  value={requirementText}
                  onChange={(e) => setRequirementText(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, requirement: true }))}
                  placeholder={getRequirementPlaceholder()}
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-brand-ink placeholder:text-brand-ink/40 outline-none resize-none transition-all ${
                    requirementError
                      ? "border-red-500 focus:ring-2 focus:ring-red-400"
                      : "border-brand-soft-neutral focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo"
                  }`}
                />
                {requirementError && (
                  <p id="req-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{requirementError}</span>
                  </p>
                )}
              </div>

              {/* Live Preview Box with Copy Button */}
              <div className="bg-white rounded-xl p-4 border border-brand-soft-neutral">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-ink/60">
                    Draft WhatsApp Message Preview:
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyDraft}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-brand-warm-white hover:bg-brand-soft-neutral text-brand-ink/80 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-indigo"
                    aria-label="Copy draft WhatsApp message to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-brand-indigo" />
                        <span>Copy Draft</span>
                      </>
                    )}
                  </button>
                </div>
                <pre
                  id="enquiry-whatsapp-preview"
                  className="text-xs font-mono text-brand-ink/80 whitespace-pre-wrap bg-brand-warm-white p-3 rounded-lg border border-brand-soft-neutral max-h-36 overflow-y-auto"
                >
                  {draftMessage}
                </pre>
              </div>

              {/* Helper Notice regarding WhatsApp behaviour per Codex recommendation */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-brand-soft-neutral/40 border border-brand-soft-neutral text-xs text-brand-ink/80 leading-relaxed">
                <Info className="w-4 h-4 text-brand-indigo shrink-0 mt-0.5" />
                <div>
                  Continue to WhatsApp to review and send your enquiry. Our team will confirm options and arrangements with you.
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <Send className="w-4 h-4" />
                <span>{enquiry.submitLabel}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Direct Contact Details & Business Card Baseline */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Calling Card */}
            <div className="bg-brand-ink text-white rounded-2xl p-8 sm:p-10 shadow-lg">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-soft-neutral/70 block mb-2">
                Immediate Assistance
              </span>
              <h3 className="text-2xl font-bold mb-4">Prefer to Speak Directly?</h3>
              <p className="text-sm text-brand-soft-neutral/80 leading-relaxed mb-6">
                Our operations and business development partner is available during business hours to discuss corporate contracts and urgent travel needs.
              </p>

              <div className="space-y-4">
                <a
                  href={contact.phoneHref}
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white text-brand-indigo flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-brand-soft-neutral/70 block">
                      Call Direct
                    </span>
                    <span className="text-base font-bold text-white group-hover:text-brand-soft-neutral">
                      {contact.phoneDisplay}
                    </span>
                  </div>
                </a>

                <a
                  href={`${contact.whatsappBaseUrl}?text=${encodeURIComponent(
                    "Hello Victor Mobility team, I would like to discuss a transport requirement."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-emerald-200 block">
                      Direct WhatsApp
                    </span>
                    <span className="text-base font-bold text-white">
                      {contact.whatsappDisplay}
                    </span>
                  </div>
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-white/15 text-xs text-brand-soft-neutral/70">
                <span className="font-bold text-white block">{contact.name}</span>
                <span>{contact.role}</span>
              </div>
            </div>

            {/* Operating Guidelines Card */}
            <div className="bg-brand-warm-white rounded-2xl p-6 sm:p-8 border border-brand-soft-neutral">
              <h4 className="text-sm font-bold text-brand-ink mb-3">
                Transparent Enquiry Process
              </h4>
              <ul className="space-y-2.5 text-xs text-brand-ink/75">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0 mt-1.5" />
                  <span>Enquiry received directly by our operations desk for route and capacity review.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0 mt-1.5" />
                  <span>Tailored vehicle options, route schedule, and clear terms discussed with you.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0 mt-1.5" />
                  <span>Direct confirmation with dedicated chauffeur and vehicle dispatch details.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
