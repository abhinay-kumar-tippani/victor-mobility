"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Download,
  Mail,
  Phone,
  QrCode,
  Share2,
  Check,
  ExternalLink,
  UserPlus,
} from "lucide-react";
import type { EmployeeProfile } from "@/types/team";

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`${className} fill-current`}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

interface ProfileActionsProps {
  employee: EmployeeProfile;
  qrDataUrl: string;
}

export default function ProfileActions({ employee, qrDataUrl }: ProfileActionsProps) {
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const whatsappDigits = employee.whatsapp.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
    `Hello ${employee.fullName}, I would like to connect regarding Victor Mobility services.`
  )}`;

  const vcfUrl = `/team/${employee.slug}/contact.vcf`;
  const canonicalUrl = `https://victormobility.in/team/${employee.slug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(canonicalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Primary Hero CTA: Save Contact to Phone / Address Book */}
      <a
        href={vcfUrl}
        download={`${employee.slug}.vcf`}
        className="group relative flex w-full items-center justify-center gap-3 rounded-xl bg-brand-indigo px-6 py-4 text-base font-bold text-white shadow-md transition-all duration-150 hover:bg-brand-blue hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo focus-visible:ring-offset-2 active:scale-[0.99]"
      >
        <UserPlus className="h-5 w-5 transition-transform group-hover:scale-110" />
        <span>Save Contact to Device</span>
      </a>

      {/* Grid of Direct Communication Actions */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {/* WhatsApp Direct */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border border-emerald-600/30 bg-emerald-50 px-4 py-3.5 text-sm font-bold text-emerald-800 transition-colors hover:bg-emerald-100 hover:text-emerald-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          aria-label={`WhatsApp ${employee.fullName}`}
        >
          <WhatsAppIcon className="h-4 w-4 text-emerald-600" />
          <span>WhatsApp</span>
        </a>

        {/* Email Direct */}
        <a
          href={`mailto:${employee.email}`}
          className="flex items-center justify-center gap-2 rounded-xl border border-brand-soft-neutral bg-white px-4 py-3.5 text-sm font-bold text-brand-ink transition-colors hover:border-brand-indigo/30 hover:bg-brand-warm-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo"
          aria-label={`Email ${employee.fullName}`}
        >
          <Mail className="h-4 w-4 text-brand-indigo" />
          <span>Email</span>
        </a>

        {/* Optional Call Direct */}
        {employee.phone ? (
          <a
            href={`tel:${employee.phone.replace(/[^\d+]/g, "")}`}
            className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 rounded-xl border border-brand-soft-neutral bg-white px-4 py-3.5 text-sm font-bold text-brand-ink transition-colors hover:border-brand-indigo/30 hover:bg-brand-warm-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo"
            aria-label={`Call ${employee.fullName}`}
          >
            <Phone className="h-4 w-4 text-brand-blue" />
            <span>Call</span>
          </a>
        ) : null}
      </div>

      {/* Utility Action Bar: Share Profile & View / Download QR Code */}
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-brand-soft-neutral/70">
        <button
          type="button"
          onClick={() => setShowQrModal(true)}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-brand-ink/80 transition-colors hover:bg-brand-soft-neutral/40 hover:text-brand-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo"
        >
          <QrCode className="h-4 w-4 text-brand-indigo" />
          <span>View QR Code</span>
        </button>

        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-brand-ink/80 transition-colors hover:bg-brand-soft-neutral/40 hover:text-brand-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-600" />
              <span className="text-emerald-700">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4 text-brand-indigo" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>

      {/* QR Code Modal / Dialog */}
      {showQrModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="qr-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-ink/60 p-4 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl border border-brand-soft-neutral bg-white p-6 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-1">
              <h3 id="qr-modal-title" className="text-lg font-bold text-brand-ink">
                Employee QR Code
              </h3>
              <p className="text-xs text-brand-ink/70">
                Scan to open {employee.fullName}&apos;s verified digital business profile.
              </p>
            </div>

            {/* QR Image Container */}
            <div className="flex justify-center p-3 rounded-xl bg-brand-warm-white border border-brand-soft-neutral/80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrDataUrl}
                alt={`QR code for ${employee.fullName}`}
                width={260}
                height={260}
                className="rounded-lg shadow-2xs"
              />
            </div>

            <p className="text-center text-[11px] text-brand-ink/60 font-mono break-all px-2">
              {canonicalUrl}
            </p>

            {/* Download Buttons for Print & Vector */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href={`/team/${employee.slug}/qr?format=png&download=true`}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-brand-soft-neutral bg-brand-warm-white px-3 py-2 text-xs font-bold text-brand-ink transition-colors hover:bg-brand-soft-neutral"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download PNG</span>
              </a>

              <a
                href={`/team/${employee.slug}/qr?format=svg&download=true`}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-brand-soft-neutral bg-brand-warm-white px-3 py-2 text-xs font-bold text-brand-ink transition-colors hover:bg-brand-soft-neutral"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download SVG</span>
              </a>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="w-full rounded-lg bg-brand-soft-neutral/60 py-2.5 text-xs font-bold text-brand-ink transition-colors hover:bg-brand-soft-neutral"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
