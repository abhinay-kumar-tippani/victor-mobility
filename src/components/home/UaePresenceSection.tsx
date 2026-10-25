"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Building2, MapPin, Phone, ArrowRight, ShieldCheck, Car, Bus } from "lucide-react";
import type { ContactData } from "@/types/content";
import { useLanguage } from "@/i18n/LanguageContext";
import OfficeMapLinks from "@/components/contact/OfficeMapLinks";
import uaeData from "@/content/uae.json";
import UaeEmiratesMap from "./UaeEmiratesMap";

interface UaePresenceSectionProps {
  contact: ContactData;
}

export default function UaePresenceSection({ contact }: UaePresenceSectionProps) {
  const [selectedCity, setSelectedCity] = useState<string>("Dubai");
  const panelId = useId();
  const { dict, locale } = useLanguage();

  const emirates = [
    {
      name: "Dubai",
      displayName: dict.presence?.dubai?.name || "Dubai",
      label: dict.presence?.dubai?.label || "U.A.E. Head Office",
      address:
        dict.presence?.dubai?.address ||
        "65th Street, Al Garhoud, Near Dubai International Airport, Dubai, United Arab Emirates.",
      corridors:
        dict.presence?.dubai?.corridors ||
        "DXB & DWC Airport VIP terminals, DIFC Financial District, Downtown Dubai, Palm Jumeirah, and Dubai South.",
      capabilities:
        dict.presence?.dubai?.capabilities ||
        "Dedicated luxury saloons, executive MPVs, and 24/7 terminal curbside dispatch.",
    },
    {
      name: "Abu Dhabi",
      displayName: dict.presence?.abuDhabi?.name || "Abu Dhabi",
      label: dict.presence?.abuDhabi?.label || "Regional Operations",
      address:
        dict.presence?.abuDhabi?.address ||
        "Zayed International Airport (AUH) corridor, ADNEC Exhibition Centre, and Corniche corporate districts.",
      corridors:
        dict.presence?.abuDhabi?.corridors ||
        "Inter-Emirate VIP transit (Dubai ↔ Abu Dhabi), diplomatic roadshows, and summit delegation convoys.",
      capabilities:
        dict.presence?.abuDhabi?.capabilities ||
        "Hourly executive standby, VIP luxury coaches, and multi-vehicle conference transit.",
    },
    {
      name: "Sharjah",
      displayName: dict.presence?.sharjah?.name || "Sharjah",
      label: dict.presence?.sharjah?.label || "Corridor Operations",
      address:
        dict.presence?.sharjah?.address ||
        "Sharjah International Airport & Northern Emirates commercial trade corridor.",
      corridors:
        dict.presence?.sharjah?.corridors ||
        "Corporate workforce commutes, industrial park loops, and inter-city team shuttles.",
      capabilities:
        dict.presence?.sharjah?.capabilities ||
        "Corporate bus shuttles and scheduled staff transport solutions.",
    },
  ];

  const current = emirates.find((e) => e.name === selectedCity) || emirates[0];

  return (
    <section id="network" tabIndex={-1} className="py-14 sm:py-20 bg-white border-b border-brand-soft-neutral focus:outline-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
            {dict.presence?.uaeEyebrow || "Emirates Network"}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-3">
            {dict.presence?.uaeTitle || "Our UAE presence."}
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
            {dict.presence?.uaeDescription ||
              "Headquartered near Dubai International Airport (DXB), Victor Mobility delivers seamless luxury limousine, airport VIP, and delegation transport across the Emirates."}
          </p>
        </div>

        {/* Operational Capabilities Highlight Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-brand-warm-white p-6 rounded-2xl border border-brand-soft-neutral flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo shrink-0">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <span className="text-base font-extrabold text-brand-ink block">
                {dict.presence?.rtaLicensed || "100% RTA Licensed"}
              </span>
              <span className="text-xs text-brand-ink/70">
                {dict.presence?.rtaSub || "Commercial Limousine Fleet Compliance"}
              </span>
            </div>
          </div>

          <div className="bg-brand-warm-white p-6 rounded-2xl border border-brand-soft-neutral flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo shrink-0">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <span className="text-base font-extrabold text-brand-ink block">
                {dict.presence?.airportHubs || "DXB · AUH · DWC"}
              </span>
              <span className="text-xs text-brand-ink/70">
                {dict.presence?.airportSub || "VIP Airport Meet & Curbside Staging"}
              </span>
            </div>
          </div>

          <div className="bg-brand-warm-white p-6 rounded-2xl border border-brand-soft-neutral flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white border border-brand-soft-neutral flex items-center justify-center text-emerald-600 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-base font-extrabold text-brand-ink block">
                {dict.presence?.dispatchDesk || "24/7 Dispatch Desk"}
              </span>
              <span className="text-xs text-brand-ink/70">
                {dict.presence?.dispatchSub || "Live Flight Radar & Chauffeur Tracking"}
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Emirate Selector & Office Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Selector Column */}
          <div className="min-w-0 lg:col-span-7 space-y-3">
            <UaeEmiratesMap selectedCity={selectedCity} onSelect={setSelectedCity} panelId={panelId} />
            <div className="pt-2">
              <Link
                href="/uae/contact?city=Other"
                className="inline-flex min-h-[44px] items-center text-xs font-semibold text-brand-indigo underline underline-offset-4"
              >
                {dict.presence?.locationNotFound || "Cannot find your location? Contact our Dubai dispatch desk"}
              </Link>
            </div>
          </div>

          {/* Details Card Column */}
          <div id={panelId} aria-live="polite" aria-atomic="true" className="min-w-0 lg:col-span-5 bg-brand-warm-white rounded-3xl p-5 sm:p-7 border border-brand-soft-neutral shadow-xs space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue block mb-1">
                  {locale === "ar" ? "الإمارات العربية المتحدة" : "United Arab Emirates"}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-ink">
                  {locale === "ar" ? `عمليات ${current.displayName}` : `${current.name} Operations`}
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-brand-soft-neutral text-xs font-bold text-brand-indigo">
                <Building2 className="w-3.5 h-3.5 text-brand-violet" />
                <span>{current.label}</span>
              </span>
            </div>

            <div className="space-y-2 pt-2 border-t border-brand-soft-neutral">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-ink/60 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                <span>{dict.presence?.operatingAddress || "Operating Address"}</span>
              </span>
              <p className="text-xs sm:text-sm text-brand-ink/85 leading-relaxed bg-white p-4 rounded-xl border border-brand-soft-neutral/70">
                {current.address}
              </p>
              {current.name === "Dubai" && uaeData.offices.find(o => o.city === "Dubai" && o.published) && (
                <div className="pt-1">
                  <OfficeMapLinks office={uaeData.offices.find(o => o.city === "Dubai" && o.published)!} />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-ink/60 block">
                {dict.presence?.primaryCorridors || "Primary Corridors & Staging:"}
              </span>
              <p className="text-xs text-brand-ink/75 leading-relaxed">
                {current.corridors}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-ink/60 block">
                {dict.presence?.dedicatedCapabilities || "Dedicated Capabilities:"}
              </span>
              <p className="text-xs text-brand-ink/75 leading-relaxed">
                {current.capabilities}
              </p>
            </div>

            <div className="pt-4 border-t border-brand-soft-neutral flex flex-col sm:flex-row gap-3">
              <Link
                href={`/uae/contact?city=${encodeURIComponent(current.name)}`}
                className="flex-1 inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider bg-brand-indigo hover:bg-brand-blue text-white py-3 px-5 rounded-xl transition-colors shadow-xs"
              >
                <span>{dict.presence?.enquireFor ? `${dict.presence.enquireFor} ${current.displayName}` : `Enquire for ${current.name}`}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>

              <a
                href={contact.phoneHref}
                className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-brand-ink hover:text-brand-indigo bg-white py-3 px-4 rounded-xl border border-brand-soft-neutral hover:bg-brand-warm-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-brand-blue" />
                <span dir="ltr">{contact.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
