"use client";

import Link from "next/link";
import { MessageSquare, Phone, ArrowRight } from "lucide-react";
import type { ContactData } from "@/types/content";

interface ContactInvitationSectionProps {
  contact: ContactData;
}

export default function ContactInvitationSection({ contact }: ContactInvitationSectionProps) {
  return (
    <section id="contact" tabIndex={-1} className="py-16 sm:py-20 bg-white focus:outline-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-ink text-white rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-center">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest font-bold text-brand-violet block">
                Direct Contact
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Tell us what you need to arrange.
              </h2>
              <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
                Connect directly with our team to discuss employee transport, airport transfers, event logistics, or corporate fleet bookings across 10 operational hubs.
              </p>
            </div>

            {/* Direct Contact & Action Box */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-violet block">
                  Operations & Partnerships Desk
                </span>
                <h3 className="text-lg font-bold text-white">
                  {contact.name}
                </h3>
                <p className="text-xs text-white/70">
                  {contact.role} · Victor Mobility Pvt. Ltd.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full md:w-auto">
                <Link
                  href="/india/contact"
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 text-xs font-bold bg-brand-indigo hover:bg-brand-indigo/90 text-white py-3 px-5 rounded-xl transition-colors shadow-sm text-center"
                >
                  <span>Request a quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`https://wa.me/${contact.whatsappDigits}?text=Hello%20Mujeeb,%20I%20would%20like%20to%20discuss%20travel%20requirements%20with%20Victor%20Mobility.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 py-3 px-5 rounded-xl transition-colors text-center shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp ({contact.whatsappDisplay})</span>
                </a>

                <a
                  href={contact.phoneHref}
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 text-xs font-bold text-white/95 hover:text-white bg-white/10 hover:bg-white/20 py-3 px-5 rounded-xl border border-white/20 transition-colors text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-blue" />
                  <span>Call {contact.phoneDisplay}</span>
                </a>
              </div>
            </div>

            <p className="text-xs text-white/60">
              Opening WhatsApp prepares a message draft for you to review and send to our team directly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
