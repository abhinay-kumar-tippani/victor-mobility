"use client";

import React, { useState } from "react";
import { Link2, Check } from "lucide-react";
import type { EmployeeProfile } from "@/types/team";

import EmployeeProfileHeader from "./EmployeeProfileHeader";
import EmployeeHero from "./EmployeeHero";
import EmployeeDesktopProfilePanel from "./EmployeeDesktopProfilePanel";
import EmployeeContactActions from "./EmployeeContactActions";
import EmployeeContactDetails from "./EmployeeContactDetails";
import EmployeeSocialLinks from "./EmployeeSocialLinks";
import EmployeeQRCodeModal from "./EmployeeQRCodeModal";

interface EmployeeDigitalBusinessCardProps {
  employee: EmployeeProfile;
  qrDataUrl: string;
}

export default function EmployeeDigitalBusinessCard({
  employee,
  qrDataUrl,
}: EmployeeDigitalBusinessCardProps) {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const displayUrl = `victormobility.in/team/${employee.slug}`;
  const fullUrl = `https://victormobility.in/team/${employee.slug}`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex min-h-[100dvh] w-full flex-col bg-[#F8F9FA] sm:px-4 sm:py-6 lg:py-10">
      {/* Centered Desktop Card / Full-Width Mobile Card Container */}
      <div className="mx-auto w-full max-w-[1040px] overflow-hidden bg-white shadow-xs sm:rounded-2xl sm:border sm:border-slate-200">
        {/* A. Shared Header (Matches Desktop & Mobile Reference) */}
        <EmployeeProfileHeader employee={employee} />

        {/* =========================================================================
            DESKTOP LAYOUT (>= 1024px) — Matches Image 2 (Two-Column Corporate Card)
           ========================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-12 min-h-[540px]">
          {/* Left Profile Panel (~40% of width) */}
          <aside className="lg:col-span-5 relative h-full">
            <EmployeeDesktopProfilePanel employee={employee} />
          </aside>

          {/* Right Content Panel (~60% of width) */}
          <main className="lg:col-span-7 flex flex-col justify-between p-8 xl:p-10 bg-white space-y-7">
            {/* 1. Primary Action Buttons */}
            <EmployeeContactActions
              employee={employee}
              onOpenQr={() => setIsQrOpen(true)}
            />

            {/* 2. Contact Section */}
            <EmployeeContactDetails employee={employee} />

            {/* 3. Social Profiles */}
            <EmployeeSocialLinks employee={employee} />

            {/* 4. Profile URL (Clickable & Copyable) */}
            <div className="pt-2 border-t border-slate-200/80">
              <button
                type="button"
                onClick={handleCopyUrl}
                className="group flex items-center gap-2 text-xs sm:text-sm text-slate-700 hover:text-[#31326F] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31326F] rounded px-1 py-0.5"
                title="Click to copy profile link"
              >
                <Link2 className="h-4 w-4 text-slate-500 group-hover:text-[#31326F] shrink-0" aria-hidden="true" />
                <span className="font-normal truncate">{displayUrl}</span>
                {copiedUrl && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 ml-2">
                    <Check className="h-3 w-3" />
                    <span>Copied!</span>
                  </span>
                )}
              </button>
            </div>
          </main>
        </div>

        {/* =========================================================================
            MOBILE & TABLET LAYOUT (< 1024px) — Matches Image 3 (Distinct Mobile Hero)
           ========================================================================= */}
        <div className="block lg:hidden w-full">
          {/* B. Full-Width Employee Hero (Left text + right blended photo) */}
          <EmployeeHero employee={employee} />

          {/* C-F. Lower Content on Pure White Background */}
          <main className="w-full bg-white px-5 py-6 xs:px-6 xs:py-7 sm:px-8 sm:py-8 space-y-6">
            {/* Primary Action Buttons */}
            <EmployeeContactActions
              employee={employee}
              onOpenQr={() => setIsQrOpen(true)}
            />

            {/* Contact Section */}
            <EmployeeContactDetails employee={employee} />

            {/* Social Profiles */}
            <EmployeeSocialLinks employee={employee} />

            {/* Profile URL */}
            <div className="pt-3 border-t border-slate-200/80 flex justify-center sm:justify-start">
              <button
                type="button"
                onClick={handleCopyUrl}
                className="group inline-flex items-center gap-2 text-xs sm:text-sm text-slate-700 hover:text-[#31326F] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31326F] rounded px-1.5 py-1"
                title="Click to copy profile link"
              >
                <Link2 className="h-4 w-4 text-slate-500 group-hover:text-[#31326F] shrink-0" aria-hidden="true" />
                <span className="font-normal truncate">{displayUrl}</span>
                {copiedUrl && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 ml-1">
                    <Check className="h-3 w-3" />
                    <span>Copied!</span>
                  </span>
                )}
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* Shared Interactive QR Code Modal */}
      <EmployeeQRCodeModal
        employee={employee}
        qrDataUrl={qrDataUrl}
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
      />
    </div>
  );
}
