"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Phone, Mail, ArrowRight, Clock, ShieldCheck, X, ZoomIn } from "lucide-react";
import type { ContactData, DeskPerson } from "@/types/content";
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

  // Fallback fake data in case available247 is not defined in content
  const defaultPeople: DeskPerson[] = isUae
    ? [
        {
          name: "Ahmed Al Rashid",
          designation: "Regional Operations Manager",
          phoneDisplay: "+971 52 455 2441",
          phoneHref: "tel:+971524552441",
          whatsappDisplay: "+971 52 455 2441",
          whatsappDigits: "971524552441",
        },
        {
          name: "Khalid Mansoor",
          designation: "24/7 Client Relations & Fleet Lead",
          phoneDisplay: "+971 50 123 4567",
          phoneHref: "tel:+971501234567",
          whatsappDisplay: "+971 50 123 4567",
          whatsappDigits: "971501234567",
        },
      ]
    : [
        {
          name: "Mujeeb Ur Rahman Mohammed",
          designation: "Business Development & Operations Partner",
          phoneDisplay: "+91 95158 50808",
          phoneHref: "tel:+919515850808",
          whatsappDisplay: "+91 95158 50808",
          whatsappDigits: "919515850808",
        },
        {
          name: "Farhan Ali",
          designation: "24/7 Fleet Dispatch Manager",
          phoneDisplay: "+91 98765 43210",
          phoneHref: "tel:+919876543210",
          whatsappDisplay: "+91 98765 43210",
          whatsappDigits: "919876543210",
        },
      ];

  const people = contact.available247?.people && contact.available247.people.length > 0
    ? contact.available247.people
    : defaultPeople;

  const headline = contact.available247?.headline || (locale === "ar" ? "متاح 24/7" : "24/7 Available");
  const subtitle =
    contact.available247?.subtitle ||
    (isUae
      ? (locale === "ar"
          ? "تنسيق مباشر على مدار الساعة مع فريق عمليات دبي وأبوظبي للحجوزات الفورية والاستفسارات."
          : "Direct round-the-clock coordination with our Dubai & Abu Dhabi executive desk for instant chauffeur arrangements and quotations.")
      : (locale === "ar"
          ? "تواصل مباشرة مع مكتب العمليات في الهند على مدار الساعة لخدمات النقل السريعة وتأكيد الحجوزات."
          : "Direct round-the-clock coordination with our operations desk or connect on WhatsApp for immediate dispatch and bookings."));

  const [selectedPerson, setSelectedPerson] = useState<DeskPerson | null>(null);

  const handleClose = useCallback(() => {
    setSelectedPerson(null);
  }, []);

  useEffect(() => {
    if (!selectedPerson) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPerson, handleClose]);

  const getWhatsappMessage = (personName: string) => {
    if (locale === "ar") {
      return `مرحباً ${personName}، أود مناقشة متطلبات النقل والتنقل مع فيكتور موبيليتي.`;
    }
    if (locale === "hi") {
      return `नमस्ते ${personName}, मैं Victor Mobility के साथ यात्रा आवश्यकताओं पर चर्चा करना चाहता हूँ।`;
    }
    if (locale === "te") {
      return `నమస్కారం ${personName}, నేను Victor Mobilityతో ప్రయాణ అవసరాల గురించి చర్చించాలనుకుంటున్నాను.`;
    }
    if (locale === "kn") {
      return `ನಮಸ್ಕಾರ ${personName}, ನಾನು Victor Mobility ಜೊತೆಗೆ ಪ್ರಯಾಣದ ಅಗತ್ಯತೆಗಳ ಬಗ್ಗೆ ಚರ್ಚಿಸಲು ಬಯಸುತ್ತೇನೆ.`;
    }
    if (locale === "ta") {
      return `வணக்கம் ${personName}, நான் Victor Mobility உடன் பயணத் தேவைகள் பற்றி பேச விரும்புகிறேன்.`;
    }
    if (locale === "ma") {
      return `നമസ്കാരം ${personName}, Victor Mobility യുമായി യാത്രാ ആവശ്യങ്ങളെക്കുറിച്ച് സംസാരിക്കാൻ ആഗ്രഹിക്കുന്നു.`;
    }
    if (locale === "mr") {
      return `नमस्कार ${personName}, मला Victor Mobility सोबत प्रवास गरजांवर चर्चा करायची आहे.`;
    }
    return `Hello ${personName}, I would like to discuss travel requirements with Victor Mobility.`;
  };

  return (
    <section id="contact" tabIndex={-1} className="py-16 sm:py-24 bg-white focus:outline-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-ink text-white rounded-3xl p-6 sm:p-10 lg:p-14 relative overflow-hidden shadow-2xl border border-white/5">
          {/* Subtle brand background glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-violet/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto space-y-10 text-center">
            {/* Header with 24/7 Badge */}
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{locale === "ar" ? "مكتب الدعم على مدار الساعة" : "24/7 Live Operations Desk"}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                {headline}
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
                {subtitle}
              </p>
            </div>

            {/* 2-Column Grid: 2 Contact Persons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start">
              {people.slice(0, 2).map((person, idx) => {
                const waMessage = getWhatsappMessage(person.name);
                const initials = person.name
                  .split(" ")
                  .map((n) => n[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join("")
                  .toUpperCase();

                return (
                  <div
                    key={`${person.name}-${idx}`}
                    className="group relative bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-brand-violet/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 backdrop-blur-md shadow-lg"
                  >
                    <div>
                      {/* Person Details Header */}
                      <div className="flex items-start gap-4">
                        {person.imageSrc ? (
                          <button
                            type="button"
                            onClick={() => setSelectedPerson(person)}
                            aria-haspopup="dialog"
                            aria-expanded={selectedPerson?.name === person.name}
                            aria-label={`View full portrait of ${person.name}`}
                            className="group/avatar relative w-16 h-20 sm:w-20 sm:h-24 rounded-2xl overflow-hidden bg-brand-violet/20 border-2 border-white/20 hover:border-brand-violet/80 flex items-center justify-center shrink-0 cursor-zoom-in transition-all duration-200 hover:scale-105 shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-violet"
                          >
                            <Image
                              src={person.imageSrc}
                              alt={`Portrait of ${person.name}`}
                              fill
                              sizes="(max-width: 640px) 80px, 96px"
                              className="object-cover object-top transition duration-300 group-hover/avatar:scale-105"
                            />
                            <span className="pointer-events-none absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/75 text-white shadow-sm backdrop-blur-xs transition group-hover/avatar:bg-brand-violet">
                              <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
                            </span>
                          </button>
                        ) : (
                          <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-2xl overflow-hidden bg-brand-violet/20 border border-brand-violet/30 flex items-center justify-center font-bold text-white text-base shrink-0 shadow-inner">
                            {initials}
                          </div>
                        )}
                        <div className="min-w-0 flex-1 space-y-1">
                          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                            {person.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-300 font-medium">
                            {person.designation}
                          </p>
                          <p className="text-[11px] text-white/50">
                            {isUae
                              ? (locale === "ar" ? "فيكتور ليموزين الإمارات" : "Victor Mobility UAE")
                              : "Victor Mobility Pvt. Ltd."}
                          </p>
                          {person.imageSrc && (
                            <button
                              type="button"
                              onClick={() => setSelectedPerson(person)}
                              aria-haspopup="dialog"
                              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-violet hover:text-white transition-colors pt-0.5"
                            >
                              <ZoomIn className="h-3.5 w-3.5" />
                              <span>{locale === "ar" ? "عرض الصورة كاملة" : "Click image to view photo"}</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="my-5 border-t border-white/10" />
                    </div>

                    {/* Contact Actions: Phone, WhatsApp and Email */}
                    <div className="space-y-3">
                      {/* WhatsApp Row */}
                      <a
                        href={`https://wa.me/${person.whatsappDigits}?text=${encodeURIComponent(waMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[46px] flex items-center justify-between gap-3 w-full text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 px-4 py-2.5 rounded-xl transition-all shadow-sm group/btn"
                        aria-label={`Chat on WhatsApp with ${person.name}`}
                      >
                        <span className="flex items-center gap-2.5">
                          <MessageSquare className="w-4 h-4 shrink-0 text-white" />
                          <span>{dict.contactSection.whatsappCta || "Continue on WhatsApp"}</span>
                        </span>
                        <span className="font-mono text-xs text-white/90 bg-black/20 py-1 px-2.5 rounded-lg border border-white/10" dir="ltr">
                          {person.whatsappDisplay}
                        </span>
                      </a>

                      {/* Phone Row */}
                      <a
                        href={person.phoneHref}
                        className="min-h-[46px] flex items-center justify-between gap-3 w-full text-xs sm:text-sm font-semibold text-white/90 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 px-4 py-2.5 rounded-xl transition-all shadow-sm"
                        aria-label={`Call ${person.name} at ${person.phoneDisplay}`}
                      >
                        <span className="flex items-center gap-2.5">
                          <Phone className="w-4 h-4 shrink-0 text-brand-violet" />
                          <span>{locale === "ar" ? "اتصال هاتفي مباشر" : "Direct Phone"}</span>
                        </span>
                        <span className="font-mono text-xs text-slate-200" dir="ltr">
                          {person.phoneDisplay}
                        </span>
                      </a>

                      {/* Email Row */}
                      {person.email && (
                        <a
                          href={`mailto:${person.email}`}
                          className="min-h-[46px] flex flex-wrap sm:flex-nowrap items-center justify-between gap-x-3 gap-y-1 w-full text-xs sm:text-sm font-semibold text-white/90 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 px-4 py-2.5 rounded-xl transition-all shadow-sm"
                          aria-label={`Email ${person.name} at ${person.email}`}
                        >
                          <span className="flex items-center gap-2.5 shrink-0">
                            <Mail className="w-4 h-4 shrink-0 text-brand-blue" />
                            <span>{locale === "ar" ? "البريد الإلكتروني" : "Direct Email"}</span>
                          </span>
                          <span className="font-mono text-[11px] sm:text-xs text-slate-200 truncate max-w-full" dir="ltr">
                            {person.email}
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Assistance Banner */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{locale === "ar" ? "استجابة سريعة على مدار 24 ساعة طوال أيام الأسبوع" : "Round-the-clock rapid dispatch & corporate support"}</span>
              </span>
              <span className="hidden sm:inline text-white/30">•</span>
              <Link
                href={`${effectiveBasePath}/contact`}
                className="inline-flex items-center gap-1.5 text-brand-violet hover:text-white font-semibold underline underline-offset-4 transition-colors"
              >
                <span>{dict.servicesSection.requestQuote || "Request a detailed quotation"}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Same-page Image Modal Lightbox for 24/7 Available Team */}
      {selectedPerson && selectedPerson.imageSrc && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Portrait of ${selectedPerson.name}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3.5 sm:p-6 backdrop-blur-md animate-in fade-in duration-200"
          onClick={handleClose}
        >
          <div
            className="relative flex w-full max-w-sm sm:max-w-md flex-col items-center overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-4 sm:p-5 shadow-2xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Person Info and Close Button */}
            <div className="flex w-full items-center justify-between pb-3 border-b border-white/10">
              <div className="min-w-0 pr-2">
                <h4 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
                  {selectedPerson.name}
                </h4>
                <p className="text-xs text-brand-violet font-semibold truncate">
                  {selectedPerson.designation}
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close image viewer"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* High-Resolution Portrait Display with perfect sizing */}
            <div className="relative my-3.5 flex max-h-[58vh] sm:max-h-[62vh] w-full items-center justify-center overflow-hidden rounded-2xl bg-black/50 border border-white/10 p-2">
              <Image
                src={selectedPerson.imageSrc}
                alt={`Full portrait of ${selectedPerson.name}`}
                width={790}
                height={1024}
                unoptimized
                priority
                className="h-auto max-h-[54vh] sm:max-h-[58vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              />
            </div>

            {/* Direct Contact Actions Inside Modal */}
            <div className="w-full space-y-2 pt-1 text-xs">
              <div className="flex items-center justify-between text-slate-400 pb-0.5 text-[11px]">
                <span>Victor Mobility • Operations Desk</span>
                <span className="font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available 24/7
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/${selectedPerson.whatsappDigits}?text=${encodeURIComponent(getWhatsappMessage(selectedPerson.name))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 px-3 font-semibold text-white transition shadow-sm"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={selectedPerson.phoneHref}
                  className="flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 py-2.5 px-3 font-semibold text-white transition border border-white/15"
                >
                  <Phone className="h-4 w-4 text-brand-violet" />
                  <span>Call Direct</span>
                </a>
              </div>

              {selectedPerson.email && (
                <a
                  href={`mailto:${selectedPerson.email}`}
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-white/5 hover:bg-white/10 py-2 px-3 font-medium text-slate-300 hover:text-white transition border border-white/10 truncate"
                >
                  <Mail className="h-3.5 w-3.5 text-brand-blue shrink-0" />
                  <span className="truncate">{selectedPerson.email}</span>
                </a>
              )}

              <button
                type="button"
                onClick={handleClose}
                className="w-full rounded-xl bg-white/10 hover:bg-white/15 py-1.5 text-center font-medium text-slate-300 hover:text-white transition"
              >
                Close (Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
