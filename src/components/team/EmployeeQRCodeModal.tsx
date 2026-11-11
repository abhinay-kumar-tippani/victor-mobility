"use client";

import React, { useEffect } from "react";
import { Download, X } from "lucide-react";
import type { EmployeeProfile } from "@/types/team";

interface EmployeeQRCodeModalProps {
  employee: EmployeeProfile;
  qrDataUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function EmployeeQRCodeModal({
  employee,
  qrDataUrl,
  isOpen,
  onClose,
}: EmployeeQRCodeModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const canonicalUrl = `https://victormobility.in/team/${employee.slug}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-heading"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#101731]/70 p-4 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close QR Code dialog"
          className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1 pr-6">
          <h2 id="qr-modal-heading" className="font-serif text-lg font-bold text-[#1F2050]">
            Employee QR Code
          </h2>
          <p className="text-xs text-slate-600">
            Scan to view {employee.fullName}&apos;s verified digital business profile.
          </p>
        </div>

        {/* QR Code Container */}
        <div className="flex justify-center p-4 rounded-xl bg-slate-50 border border-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrDataUrl}
            alt={`QR Code for ${employee.fullName}`}
            width={240}
            height={240}
            className="rounded-lg shadow-2xs bg-white p-2 border border-slate-200/80"
          />
        </div>

        {/* Exact Public URL */}
        <p className="text-center text-[11px] font-mono text-slate-600 break-all px-2 select-all">
          {canonicalUrl}
        </p>

        {/* Download Buttons for Print & Vector */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <a
            href={`/team/${employee.slug}/qr?format=png&download=true`}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-800 transition-colors hover:bg-slate-100 hover:border-slate-300"
          >
            <Download className="h-3.5 w-3.5 text-brand-indigo" />
            <span>Download PNG</span>
          </a>

          <a
            href={`/team/${employee.slug}/qr?format=svg&download=true`}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-800 transition-colors hover:bg-slate-100 hover:border-slate-300"
          >
            <Download className="h-3.5 w-3.5 text-brand-indigo" />
            <span>Download SVG</span>
          </a>
        </div>
      </div>
    </div>
  );
}
