"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageSquare } from "lucide-react";
import type { ContactData, OfficeItem } from "@/types/content";
import BrandLogo from "@/components/brand/BrandLogo";
import { selectEnquiryOption } from "@/lib/enquiryEvents";

interface FooterProps {
  contact: ContactData;
  offices: OfficeItem[];
  mediaCaption: string;
  isoEnabled?: boolean;
}

export default function Footer({
  contact,
  offices,
  mediaCaption,
  isoEnabled = false,
}: FooterProps) {
  const pathname = usePathname();
  const isUae = pathname?.startsWith("/uae");
  const basePrefix = isUae ? "/uae" : "/india";
  const publishedOffices = offices.filter((o) => o.published);

  return (
    <footer className="bg-brand-ink text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand & Corporate Overview */}
          <div className="lg:col-span-4 space-y-6">
            {/* Crisp white container enclosing the enlarged non-destructive logo */}
            <div className="bg-white px-4 py-3 rounded-xl inline-block shadow-sm">
              <BrandLogo className="w-52 sm:w-60 h-14 sm:h-16" />
            </div>

            <p className="text-sm text-brand-soft-neutral/80 leading-relaxed max-w-sm">
              {isUae
                ? "Dedicated executive limousine services, DXB/AUH airport VIP protocol, global summits, and enterprise fleet leasing across Dubai and Abu Dhabi."
                : "Dedicated corporate mobility, employee shuttle networks, airport transfers, and executive travel across Hyderabad, Bengaluru, and Pune."}
            </p>

            {/* Strictly honour isoEnabled flag; no hardcoded bypass */}
            {isoEnabled && (
              <div className="text-xs text-brand-soft-neutral/60">
                <span>ISO 9001:2015 Quality Commitment</span>
              </div>
            )}
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-soft-neutral/70">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-soft-neutral/80">
              <li>
                <Link href={`${basePrefix}/services`} className="hover:text-white transition-colors">
                  Services Overview
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/rfp`} className="hover:text-white transition-colors font-semibold text-brand-violet">
                  Corporate RFP Desk
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/estimator`} className="hover:text-white transition-colors">
                  Route &amp; Fare Estimator
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/academy`} className="hover:text-white transition-colors">
                  Chauffeur Academy
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/academy/verify`} className="hover:text-white transition-colors text-emerald-400 font-semibold">
                  Chauffeur Verification Desk
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/portal`} className="hover:text-white transition-colors font-semibold text-brand-violet">
                  Client Telematics Portal
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/emergency`} className="hover:text-white transition-colors text-rose-300 font-semibold">
                  24/7 Operations Desk
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/brochure`} className="hover:text-white transition-colors text-amber-300 font-semibold">
                  Executive Deck &amp; Brochure
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/esg`} className="hover:text-white transition-colors text-emerald-400 font-semibold">
                  ESG &amp; Green Mobility
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/events`} className="hover:text-white transition-colors text-purple-300 font-semibold">
                  Event &amp; Summit Logistics
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/sla`} className="hover:text-white transition-colors text-amber-400 font-semibold">
                  Enterprise SLA &amp; Compliance
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/protocol`} className="hover:text-white transition-colors text-sky-400 font-semibold">
                  Airport VIP Protocol Desk
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/billing`} className="hover:text-white transition-colors text-emerald-400 font-semibold">
                  Corporate Billing &amp; Invoicing
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/corridors`} className="hover:text-white transition-colors text-amber-400 font-semibold">
                  Tech Park Corridor Navigator
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/rate-card`} className="hover:text-white transition-colors text-emerald-400 font-semibold">
                  Corporate Rate Card &amp; Retainers
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/safety`} className="hover:text-white transition-colors text-cyan-400 font-semibold">
                  Fleet Safety &amp; IoT Telematics
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/roster`} className="hover:text-white transition-colors text-indigo-400 font-semibold">
                  Employee Shift Roster Desk
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/due-diligence`} className="hover:text-white transition-colors text-teal-400 font-semibold">
                  Vendor Due Diligence &amp; KYC Vault
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/tco-calculator`} className="hover:text-white transition-colors text-cyan-400 font-semibold">
                  Fleet TCO &amp; Transition Desk
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/roadshows`} className="hover:text-white transition-colors text-amber-400 font-semibold">
                  Executive Roadshows &amp; Delegations
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/credit-application`} className="hover:text-white transition-colors text-emerald-400 font-semibold">
                  Corporate Credit &amp; Billing Terms
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/fleet`} className="hover:text-white transition-colors">
                  Fleet Categories
                </Link>
              </li>
              <li>
                <Link href={isUae ? `${basePrefix}#network` : `${basePrefix}#network`} className="hover:text-white transition-colors">
                  {isUae ? "Emirates Network" : "Cities & Network"}
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/about`} className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/contact`} className="hover:text-white transition-colors">
                  Requirement Desk
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/privacy`} className="hover:text-white transition-colors">
                  Privacy Notice
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Authorised Contacts */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-soft-neutral/70">
              Direct Contact
            </h4>
            <div className="space-y-3 text-sm text-brand-soft-neutral/80">
              <div>
                <span className="text-xs text-brand-soft-neutral/50 block">Representative</span>
                <span className="font-semibold text-white">{contact.name}</span>
                <span className="text-xs text-brand-soft-neutral/60 block">{contact.role}</span>
              </div>

              <div className="pt-2 space-y-2">
                <a
                  href={contact.phoneHref}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-violet" />
                  <span>{contact.phoneDisplay}</span>
                </a>

                <a
                  href={`${contact.whatsappBaseUrl}?text=${encodeURIComponent(
                    "Hello Victor Mobility, I would like to discuss a transport requirement."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp: {contact.whatsappDisplay}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Regional Hubs Summary */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-soft-neutral/70">
              Regional Operating Offices
            </h4>
            <div className="space-y-3 text-xs text-brand-soft-neutral/75">
              {publishedOffices.map((office) => (
                <div key={office.city} className="border-l-2 border-brand-violet/60 pl-3">
                  <span className="font-bold text-white block">{office.city}</span>
                  <span className="text-[11px] text-brand-soft-neutral/60">{office.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Legal & Mandatory Disclaimers */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-soft-neutral/60">
          <div>
            © {new Date().getFullYear()} Victor Mobility Pvt. Ltd. All rights reserved. Tagline: &ldquo;On Time Every Time.&rdquo;
          </div>

          {/* Discreet illustrative caption per AGENTS.md */}
          <div className="italic text-center sm:text-right">
            {mediaCaption}
          </div>
        </div>
      </div>
    </footer>
  );
}
