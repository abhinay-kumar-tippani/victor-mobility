"use client";

import React, { useState } from "react";
import { Phone, Mail, Copy, Check } from "lucide-react";
import type { EmployeeProfile } from "@/types/team";

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`${className} fill-current`}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

interface EmployeeContactDetailsProps {
  employee: EmployeeProfile;
}

export default function EmployeeContactDetails({ employee }: EmployeeContactDetailsProps) {
  const [copied, setCopied] = useState(false);

  const phoneValue = employee.phone || employee.whatsapp;
  const whatsappDigits = employee.whatsapp.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${whatsappDigits}`;
  const telUrl = `tel:${phoneValue.replace(/[^\d+]/g, "")}`;
  const mailtoUrl = `mailto:${employee.email}`;

  const handleCopyDetails = async () => {
    const textToCopy = [
      employee.fullName,
      employee.designation,
      "Victor Mobility Pvt. Ltd.",
      employee.location || "Hyderabad, India",
      "",
      phoneValue ? `Call: ${phoneValue}` : null,
      employee.whatsapp ? `WhatsApp: ${employee.whatsapp}` : null,
      employee.email ? `Email: ${employee.email}` : null,
      "",
      `Profile: https://victormobility.in/team/${employee.slug}`,
    ]
      .filter((line) => line !== null)
      .join("\n");

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      {/* Contact Section Header with "Copy details" action */}
      <div className="flex items-center justify-between pb-1">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1F2050] tracking-tight">
          Contact
        </h2>

        <button
          type="button"
          onClick={handleCopyDetails}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#31326F] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31326F] rounded px-1.5 py-1"
          aria-label="Copy employee contact details to clipboard"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              <span className="text-emerald-700 font-bold">Details copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 text-slate-600" aria-hidden="true" />
              <span>Copy details</span>
            </>
          )}
        </button>
      </div>

      {/* Contact Rows Container */}
      <div className="divide-y divide-slate-200">
        {/* 1. Call Row */}
        {phoneValue && (
          <a
            href={telUrl}
            className="group block py-3.5 sm:py-4 transition-colors hover:bg-slate-50/70 -mx-2 px-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31326F]"
            aria-label={`Call ${employee.fullName} at ${phoneValue}`}
          >
            {/* Desktop Layout: Icon | Label -> Value */}
            <div className="hidden sm:flex sm:items-center sm:justify-between text-sm sm:text-base">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-slate-700 shrink-0" aria-hidden="true" />
                <span className="h-4 w-[1px] bg-slate-300" aria-hidden="true" />
                <span className="font-bold text-slate-900">Call</span>
              </div>
              <span className="font-medium text-slate-800 tabular-nums">
                {phoneValue}
              </span>
            </div>

            {/* Mobile Layout: Rounded Pale-Purple Icon Container + Stacked Label & Value */}
            <div className="flex sm:hidden items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F4F3FA] text-[#31326F]">
                <Phone className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Call
                </p>
                <p className="text-xs sm:text-sm font-medium text-slate-800 tabular-nums">
                  {phoneValue}
                </p>
              </div>
            </div>
          </a>
        )}

        {/* 2. WhatsApp Row */}
        {employee.whatsapp && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block py-3.5 sm:py-4 transition-colors hover:bg-slate-50/70 -mx-2 px-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31326F]"
            aria-label={`WhatsApp ${employee.fullName} at ${employee.whatsapp}`}
          >
            {/* Desktop Layout: Icon | Label -> Value */}
            <div className="hidden sm:flex sm:items-center sm:justify-between text-sm sm:text-base">
              <div className="flex items-center gap-3">
                <WhatsAppIcon className="h-4 w-4 text-slate-700 shrink-0" />
                <span className="h-4 w-[1px] bg-slate-300" aria-hidden="true" />
                <span className="font-bold text-slate-900">WhatsApp</span>
              </div>
              <span className="font-medium text-slate-800 tabular-nums">
                {employee.whatsapp}
              </span>
            </div>

            {/* Mobile Layout: Rounded Pale-Purple Icon Container + Stacked Label & Value */}
            <div className="flex sm:hidden items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F4F3FA] text-[#31326F]">
                <WhatsAppIcon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  WhatsApp
                </p>
                <p className="text-xs sm:text-sm font-medium text-slate-800 tabular-nums">
                  {employee.whatsapp}
                </p>
              </div>
            </div>
          </a>
        )}

        {/* 3. Email Row */}
        {employee.email && (
          <a
            href={mailtoUrl}
            className="group block py-3.5 sm:py-4 transition-colors hover:bg-slate-50/70 -mx-2 px-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31326F]"
            aria-label={`Email ${employee.fullName} at ${employee.email}`}
          >
            {/* Desktop Layout: Icon | Label -> Value */}
            <div className="hidden sm:flex sm:items-center sm:justify-between text-sm sm:text-base gap-4">
              <div className="flex items-center gap-3 shrink-0">
                <Mail className="h-4 w-4 text-slate-700 shrink-0" aria-hidden="true" />
                <span className="h-4 w-[1px] bg-slate-300" aria-hidden="true" />
                <span className="font-bold text-slate-900">Email</span>
              </div>
              <span className="font-medium text-slate-800 truncate">
                {employee.email}
              </span>
            </div>

            {/* Mobile Layout: Rounded Pale-Purple Icon Container + Stacked Label & Value */}
            <div className="flex sm:hidden items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F4F3FA] text-[#31326F]">
                <Mail className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Email
                </p>
                <p className="text-xs sm:text-sm font-medium text-slate-800 break-all leading-snug">
                  {employee.email}
                </p>
              </div>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
