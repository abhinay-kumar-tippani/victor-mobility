"use client";

import Image from "next/image";
import { Phone, MessageSquare, Shield } from "lucide-react";
import type { ContactData, OfficeItem } from "@/types/content";

interface FooterProps {
  contact: ContactData;
  offices: OfficeItem[];
  mediaCaption: string;
}

export default function Footer({ contact, offices, mediaCaption }: FooterProps) {
  const publishedOffices = offices.filter((o) => o.published);

  return (
    <footer className="bg-brand-ink text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand & Corporate Overview */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white px-3 py-2 rounded-xl inline-block shadow-sm">
              <div className="relative h-14 w-48">
                <Image
                  src="/brand/victor-original.png"
                  alt="Victor Mobility - On Time Every Time."
                  fill
                  priority
                  sizes="192px"
                  className="object-contain object-left"
                />
              </div>
            </div>

            <p className="text-sm text-brand-soft-neutral/80 leading-relaxed max-w-sm">
              Dedicated corporate mobility, employee shuttle networks, airport transfers, and executive travel across Hyderabad, Bengaluru, and Pune.
            </p>

            <div className="flex items-center gap-2 text-xs text-brand-soft-neutral/60">
              <Shield className="w-4 h-4 text-brand-violet" />
              <span>ISO 9001:2015 Quality Commitment</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-soft-neutral/70">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-soft-neutral/80">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#employee-transport" className="hover:text-white transition-colors">
                  Employee Commute
                </a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-white transition-colors">
                  Fleet Categories
                </a>
              </li>
              <li>
                <a href="#network" className="hover:text-white transition-colors">
                  Cities & Network
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Requirement Desk
                </a>
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
