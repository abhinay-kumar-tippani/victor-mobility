"use client";

import { useState, useId } from "react";
import { MessageSquare, Phone, Send, Info, User, Briefcase, MapPin, FileText } from "lucide-react";
import type { ContactData, EnquiryData, ServiceItem, CityItem } from "@/types/content";

interface EnquirySectionProps {
  contact: ContactData;
  enquiry: EnquiryData;
  services: ServiceItem[];
  cities: CityItem[];
  preselectedService?: string;
  preselectedCategory?: string;
}

export default function EnquirySection({
  contact,
  enquiry,
  services,
  cities,
  preselectedService,
}: EnquirySectionProps) {
  const [fullName, setFullName] = useState("");
  const [selectedService, setSelectedService] = useState(
    preselectedService || services[0]?.title || "Employee Transportation"
  );
  const [selectedCity, setSelectedCity] = useState("Hyderabad");
  const [customCity, setCustomCity] = useState("");
  const [requirementText, setRequirementText] = useState("");

  const nameId = useId();
  const serviceId = useId();
  const cityId = useId();
  const customCityId = useId();
  const reqId = useId();

  const cityDisplay = selectedCity === "Other" && customCity.trim() ? customCity.trim() : selectedCity;

  // Build the WhatsApp message preview
  const generateWhatsAppMessage = () => {
    const lines = [
      `*New Transport Enquiry - Victor Mobility*`,
      `-----------------------------------------`,
      `*Name:* ${fullName.trim() || "[Your Name]"}`,
      `*Service:* ${selectedService}`,
      `*City:* ${cityDisplay}`,
      `*Requirement:*`,
      requirementText.trim() || "[Shift timings, route, passenger count or travel dates]",
    ];
    return lines.join("\n");
  };

  const draftMessage = generateWhatsAppMessage();
  const canSend = fullName.trim().length > 0 && requirementText.trim().length > 0;

  const handleContinueWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedMessage = encodeURIComponent(
      [
        `*New Transport Enquiry - Victor Mobility*`,
        `Name: ${fullName.trim()}`,
        `Service: ${selectedService}`,
        `City: ${cityDisplay}`,
        `Requirement: ${requirementText.trim()}`,
      ].join("\n")
    );
    const url = `${contact.whatsappBaseUrl}?text=${encodedMessage}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white border-b border-brand-soft-neutral/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs uppercase tracking-widest font-bold text-brand-blue mb-3">
            Direct Requirement Desk
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight mb-4">
            Discuss Your Requirement with Our Operations Team
          </h2>
          <p className="text-base sm:text-lg text-brand-ink/75 leading-relaxed">
            Fill in your transport scope below to prepare a structured WhatsApp enquiry directly for our Business Development Partner, or call our Hyderabad desk directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form & Live Draft */}
          <div className="lg:col-span-7 bg-brand-warm-white rounded-2xl p-8 sm:p-10 border border-brand-soft-neutral shadow-sm">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-soft-neutral/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span className="font-bold text-base text-brand-ink">
                  WhatsApp Enquiry Builder
                </span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800">
                Direct WhatsApp Draft
              </span>
            </div>

            <form onSubmit={handleContinueWhatsApp} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor={nameId}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-ink mb-2"
                >
                  <User className="w-3.5 h-3.5 text-brand-blue" />
                  <span>Full Name or Company Representative *</span>
                </label>
                <input
                  id={nameId}
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rahul Sharma (HR / Facilities Manager)"
                  className="w-full px-4 py-3 rounded-xl border border-brand-soft-neutral bg-white text-sm text-brand-ink placeholder:text-brand-ink/40 focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo outline-none"
                />
              </div>

              {/* Service & City (2-column on tablet/desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor={serviceId}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-ink mb-2"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Select Service *</span>
                  </label>
                  <select
                    id={serviceId}
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brand-soft-neutral bg-white text-sm text-brand-ink focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo outline-none"
                  >
                    {services
                      .filter((s) => s.published)
                      .map((s) => (
                        <option key={s.slug} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={cityId}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-ink mb-2"
                  >
                    <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Operating City *</span>
                  </label>
                  <select
                    id={cityId}
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brand-soft-neutral bg-white text-sm text-brand-ink focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo outline-none"
                  >
                    {cities
                      .filter((c) => c.published)
                      .map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name} ({c.state})
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
                    className="text-xs font-bold uppercase tracking-wider text-brand-ink block mb-2"
                  >
                    Specify City / Route Corridor *
                  </label>
                  <input
                    id={customCityId}
                    type="text"
                    required
                    value={customCity}
                    onChange={(e) => setCustomCity(e.target.value)}
                    placeholder="Enter destination or route corridor"
                    className="w-full px-4 py-3 rounded-xl border border-brand-soft-neutral bg-white text-sm text-brand-ink placeholder:text-brand-ink/40 focus:ring-2 focus:ring-brand-indigo outline-none"
                  />
                </div>
              )}

              {/* Requirement Details */}
              <div>
                <label
                  htmlFor={reqId}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-ink mb-2"
                >
                  <FileText className="w-3.5 h-3.5 text-brand-blue" />
                  <span>Requirement Details *</span>
                </label>
                <textarea
                  id={reqId}
                  required
                  rows={4}
                  value={requirementText}
                  onChange={(e) => setRequirementText(e.target.value)}
                  placeholder="Detail your requirements: passenger count, daily shift timings, pickup/drop locations, or event dates..."
                  className="w-full px-4 py-3 rounded-xl border border-brand-soft-neutral bg-white text-sm text-brand-ink placeholder:text-brand-ink/40 focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo outline-none resize-none"
                />
              </div>

              {/* Live Preview Box */}
              <div className="bg-white rounded-xl p-4 border border-brand-soft-neutral/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-ink/60 block mb-2">
                  Draft WhatsApp Message Preview:
                </span>
                <pre className="text-xs font-mono text-brand-ink/80 whitespace-pre-wrap bg-brand-warm-white/60 p-3 rounded-lg border border-brand-soft-neutral/50 max-h-36 overflow-y-auto">
                  {draftMessage}
                </pre>
              </div>

              {/* Helper Notice regarding WhatsApp behaviour */}
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Notice:</strong> {enquiry.helperText} Opening WhatsApp does not confirm a booking or guarantee vehicle reservation. Our team will review availability and discuss arrangements with you.
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                disabled={!canSend}
                className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
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
                  <span>No simulated booking confirmations or automatic billing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0 mt-1.5" />
                  <span>Requirements evaluated for route safety, capacity, and driver dispatch.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0 mt-1.5" />
                  <span>Official written proposals provided for corporate and scheduled transport.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
