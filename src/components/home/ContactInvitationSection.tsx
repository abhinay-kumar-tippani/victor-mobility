"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Phone, ArrowRight } from "lucide-react";
import type { ContactData } from "@/types/content";
import { useLanguage } from "@/i18n/LanguageContext";

interface ContactInvitationSectionProps {
  contact: ContactData;
  basePath?: string;
}

export default function ContactInvitationSection({ contact, basePath }: ContactInvitationSectionProps) {
  const pathname = usePathname();
  const effectiveBasePath = basePath || (pathname?.startsWith("/uae") ? "/uae" : "/india");
  const isUae = effectiveBasePath === "/uae";
  const { dict, locale } = useLanguage();

  const whatsappMessage =
    locale === "hi"
      ? `नमस्ते ${contact.name}, मैं Victor Mobility के साथ यात्रा आवश्यकताओं पर चर्चा करना चाहता हूँ।`
      : locale === "te"
      ? `నమస్కారం ${contact.name}, నేను Victor Mobilityతో ప్రయాణ అవసరాల గురించి చర్చించాలనుకుంటున్నాను.`
      : `Hello ${contact.name}, I would like to discuss travel requirements with Victor Mobility.`;

  return (
    <section id="contact" tabIndex={-1} className="py-16 sm:py-20 bg-white focus:outline-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-ink text-white rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-center">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest font-bold text-brand-violet block">
                {dict.nav.contact}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {dict.contactSection.title}
              </h2>
              <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
                {dict.contactSection.subtitle}
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
                  {contact.role} · {isUae ? "Victor Mobility UAE" : "Victor Mobility Pvt. Ltd."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full md:w-auto">
                <Link
                  href={`${effectiveBasePath}/contact`}
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 text-xs font-bold bg-brand-indigo hover:bg-brand-indigo/90 text-white py-3 px-5 rounded-xl transition-colors shadow-sm text-center"
                >
                  <span>{dict.servicesSection.requestQuote}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`https://wa.me/${contact.whatsappDigits}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 py-3 px-5 rounded-xl transition-colors text-center shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{dict.contactSection.whatsappCta}</span>
                </a>

                <a
                  href={contact.phoneHref}
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 text-xs font-semibold text-white/80 hover:text-white border border-white/20 hover:border-white/40 py-3 px-4 rounded-xl transition-colors text-center"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{dict.contactSection.callCta}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
