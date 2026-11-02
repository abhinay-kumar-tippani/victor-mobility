"use client";

import BrandText from "@/components/brand/BrandText";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Mail, MessageSquare, Pause, Phone, Play } from "lucide-react";

function UserCheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  );
}
import type { ContactData, TeamProfile } from "@/types/content";
import { useLanguage } from "@/i18n/LanguageContext";

interface TeamCarouselProps {
  featured: ContactData;
  featuredEmail?: { display: string; enabled: boolean };
  profiles: TeamProfile[];
  description: string;
  basePath: string;
  whatsappMessage: string;
  storyLabel: string;
}

const copy = {
  en: { eyebrow: "core team members", title: "Meet the team", business: "Business partnerships", placeholder: "Illustrative profile", pending: "This team profile will be updated soon.", member: "Team member", previous: "Previous profile", next: "Next profile", pause: "Pause slideshow", play: "Play slideshow", goTo: "Show profile", whatsapp: "Open WhatsApp draft", call: "Call the desk" },
  hi: { eyebrow: "हर सफ़र के पीछे लोग", title: "हमारी टीम", business: "व्यावसायिक साझेदारियाँ", placeholder: "प्रतीकात्मक प्रोफ़ाइल", pending: "इस टीम प्रोफ़ाइल को जल्द अपडेट किया जाएगा।", member: "टीम सदस्य", previous: "पिछली प्रोफ़ाइल", next: "अगली प्रोफ़ाइल", pause: "स्लाइड शो रोकें", play: "स्लाइड शो चलाएँ", goTo: "प्रोफ़ाइल दिखाएँ", whatsapp: "व्हाट्सऐप ड्राफ़्ट खोलें", call: "डेस्क पर कॉल करें" },
  te: { eyebrow: "ప్రతి ప్రయాణం వెనుక ఉన్నవారు", title: "మా బృందం", business: "వ్యాపార భాగస్వామ్యాలు", placeholder: "నమూనా ప్రొఫైల్", pending: "ఈ బృంద సభ్యుడి వివరాలు త్వరలో నవీకరించబడతాయి.", member: "బృంద సభ్యుడు", previous: "మునుపటి ప్రొఫైల్", next: "తదుపరి ప్రొఫైల్", pause: "స్లైడ్ షో ఆపండి", play: "స్లైడ్ షో ప్రారంభించండి", goTo: "ప్రొఫైల్ చూపండి", whatsapp: "వాట్సాప్ డ్రాఫ్ట్ తెరవండి", call: "డెస్క్‌కు కాల్ చేయండి" },
  ar: { eyebrow: "الأشخاص وراء كل رحلة", title: "تعرّف على الفريق", business: "شراكات الأعمال", placeholder: "ملف تعريفي توضيحي", pending: "سيتم تحديث بيانات هذا العضو قريباً.", member: "عضو الفريق", previous: "الملف السابق", next: "الملف التالي", pause: "إيقاف عرض الشرائح", play: "تشغيل عرض الشرائح", goTo: "عرض الملف", whatsapp: "فتح مسودة واتساب", call: "اتصل بالمكتب" },
} as const;

const channelCopy = {
  en: { phone: "Call", phoneMobile: "Call Mobile", desk: "Call Landline", whatsapp: "Open WhatsApp draft", email: "Compose email", sample: "Sample", phoneName: "Phone", phoneMobileName: "Mobile", deskName: "Office", whatsappName: "WhatsApp", emailName: "Email" },
  hi: { phone: "कॉल करें", phoneMobile: "मोबाइल कॉल", desk: "कार्यालय फ़ोन", whatsapp: "व्हाट्सऐप ड्राफ़्ट खोलें", email: "ईमेल लिखें", sample: "नमूना", phoneName: "फ़ोन", phoneMobileName: "मोबाइल", deskName: "कार्यालय", whatsappName: "व्हाट्सऐप", emailName: "ईमेल" },
  te: { phone: "కాల్ చేయండి", phoneMobile: "మొబైల్ కాల్", desk: "కార్యాలయ ఫోన్", whatsapp: "వాట్సాప్ డ్రాఫ్ట్ తెరవండి", email: "ఇమెయిల్ రాయండి", sample: "నమూనా", phoneName: "ఫోన్", phoneMobileName: "మొబైల్", deskName: "కార్యాలయం", whatsappName: "వాట్సాప్", emailName: "ఇమెయిల్" },
  ar: { phone: "اتصل", phoneMobile: "اتصال جوال", desk: "هاتف المكتب", whatsapp: "فتح مسودة واتساب", email: "كتابة بريد إلكتروني", sample: "نموذج", phoneName: "الهاتف", phoneMobileName: "جوال", deskName: "المكتب", whatsappName: "واتساب", emailName: "البريد الإلكتروني" },
} as const;

export default function TeamCarousel({ featured, featuredEmail, profiles, description, basePath, whatsappMessage, storyLabel }: TeamCarouselProps) {
  const { locale } = useLanguage();
  const labels = (copy as Record<string, Record<string, string>>)[locale] || copy.en;
  const channels = (channelCopy as Record<string, Record<string, string>>)[locale] || channelCopy.en;
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const slides: TeamProfile[] = [
    { id: "mujeeb", name: featured.name, role: featured.role, imageSrc: featured.imageSrc || "/images/india/leadership-mujeeb.jpg", imageAlt: `Portrait of ${featured.name}`, placeholder: false, phoneDisplay: featured.phoneDisplay, phoneHref: featured.phoneHref, whatsappDisplay: featured.whatsappDisplay, whatsappDigits: featured.whatsappDigits, emailDisplay: featuredEmail?.display, emailEnabled: featuredEmail?.enabled },
    ...profiles,
  ];
  const active = slides[index];
  const contactChannels = [
    {
      id: "phone",
      label: active.deskPhoneDisplay ? channels.phoneMobile : channels.phone,
      sampleLabel: active.deskPhoneDisplay ? channels.phoneMobileName : channels.phoneName,
      value: active.phoneDisplay,
      href: !active.placeholder ? active.phoneHref : undefined,
      Icon: Phone,
    },
    {
      id: "whatsapp",
      label: channels.whatsapp,
      sampleLabel: channels.whatsappName,
      value: active.whatsappDisplay,
      href: !active.placeholder && active.whatsappDigits ? `https://wa.me/${active.whatsappDigits}?text=${encodeURIComponent(whatsappMessage)}` : undefined,
      Icon: MessageSquare,
    },
    active.deskPhoneDisplay
      ? {
          id: "desk",
          label: channels.desk,
          sampleLabel: channels.deskName,
          value: active.deskPhoneDisplay,
          href: !active.placeholder ? (active.deskPhoneHref || `tel:${active.deskPhoneDisplay.replace(/\s+/g, "")}`) : undefined,
          Icon: Phone,
        }
      : {
          id: "email",
          label: channels.email,
          sampleLabel: channels.emailName,
          value: active.emailDisplay,
          href: !active.placeholder && active.emailEnabled && active.emailDisplay ? `mailto:${active.emailDisplay}` : undefined,
          Icon: Mail,
        },
  ];

  useEffect(() => {
    if (paused || interacting || reducedMotion || slides.length < 2) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % slides.length), 3000);
    return () => window.clearInterval(timer);
  }, [paused, interacting, reducedMotion, slides.length]);

  return (
    <div
      className="flex flex-col overflow-hidden rounded-3xl border border-brand-soft-neutral bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
      aria-roledescription="carousel"
      aria-label={labels.eyebrow}
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteracting(false);
      }}
    >
      <div className="flex items-center justify-between gap-4 px-6 pt-6 sm:px-8 sm:pt-8 border-b border-brand-soft-neutral/50 pb-4">
        <div>
          <h3 className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-blue">
            <UserCheckIcon className="h-4 w-4" aria-hidden="true" /><BrandText>{labels.eyebrow}</BrandText>
          </h3>
        </div>
        <span className="text-xs font-bold text-brand-ink/40 tracking-wider tabular-nums">
          0{index + 1} / 0{slides.length}
        </span>
      </div>

      <div className="grid flex-1 gap-6 px-6 py-6 sm:grid-cols-[minmax(0,280px)_minmax(0,1fr)] lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] sm:items-center sm:gap-8 sm:px-8" aria-live="off">
        <div className="relative h-64 sm:h-[300px] lg:h-[320px] w-full overflow-hidden rounded-2xl bg-brand-warm-white shadow-2xs border border-brand-soft-neutral/70">
          <Image
            key={active.id}
            src={active.imageSrc}
            alt={active.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, 320px"
            className="object-cover object-top transition-opacity duration-300"
          />
          {active.placeholder && (
            <span className="absolute bottom-3 start-3 rounded-full border border-white/60 bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-indigo shadow-sm">
              {labels.placeholder}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-brand-violet/10 border border-brand-violet/20 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-violet">
            {active.placeholder ? labels.placeholder : (active.division || labels.business)}
          </span>
          <h4 className="mt-2.5 text-2xl sm:text-3xl font-extrabold leading-tight text-brand-ink tracking-tight">
            {active.placeholder ? `${labels.member} ${String(index + 1).padStart(2, "0")}` : active.name}
          </h4>
          <p className="mt-1 text-sm sm:text-base font-semibold text-brand-indigo">
            {active.placeholder ? labels.pending : active.role}
          </p>
          {!active.placeholder && (active.id === "mujeeb" ? description : active.description) && (
            <p className="mt-3.5 text-sm leading-relaxed text-brand-ink/75 max-w-xl">
              <BrandText>{active.id === "mujeeb" ? description : active.description}</BrandText>
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-brand-soft-neutral bg-slate-50/40 px-6 py-5 sm:px-8">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={labels.previous}
              onClick={() => setIndex((current) => (current - 1 + slides.length) % slides.length)}
              className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-brand-soft-neutral bg-white text-brand-indigo transition-all hover:bg-brand-warm-white hover:border-brand-indigo/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-indigo shadow-2xs cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={labels.next}
              onClick={() => setIndex((current) => (current + 1) % slides.length)}
              className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-brand-soft-neutral bg-white text-brand-indigo transition-all hover:bg-brand-warm-white hover:border-brand-indigo/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-indigo shadow-2xs cursor-pointer"
            >
              <ChevronRight className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
            </button>
            {!reducedMotion && (
              <button
                type="button"
                aria-label={paused ? labels.play : labels.pause}
                onClick={() => setPaused((value) => !value)}
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-brand-soft-neutral bg-white text-brand-indigo transition-all hover:bg-brand-warm-white hover:border-brand-indigo/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-indigo shadow-2xs cursor-pointer"
              >
                {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
              </button>
            )}
          </div>
          <div className="flex items-center gap-1.5" role="group" aria-label={labels.eyebrow}>
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`${labels.goTo} ${slideIndex + 1}`}
                aria-current={slideIndex === index ? "true" : undefined}
                onClick={() => setIndex(slideIndex)}
                className="flex h-10 w-6 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-indigo cursor-pointer"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    slideIndex === index ? "w-6 bg-brand-indigo" : "w-1.5 bg-brand-soft-neutral hover:bg-brand-ink/30"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
          {contactChannels.map(({ id, label, sampleLabel, value, href, Icon }) => {
            const content = (
              <>
                <div className="w-8 h-8 rounded-lg bg-white border border-brand-soft-neutral/80 flex items-center justify-center shrink-0 text-brand-indigo shadow-2xs">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-ink/65">
                    {href ? label : `${sampleLabel} · ${channels.sample}`}
                  </span>
                  <bdi dir="ltr" className="mt-0.5 block truncate text-xs font-bold text-brand-ink">
                    {value || "—"}
                  </bdi>
                </span>
              </>
            );
            const className = `flex min-h-[58px] items-center gap-2.5 rounded-xl border px-3.5 py-2.5 transition-all ${
              href
                ? "border-brand-soft-neutral bg-white hover:border-brand-indigo hover:shadow-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-indigo cursor-pointer"
                : "border-brand-soft-neutral/70 bg-white/60 text-brand-ink/50"
            }`;
            return href ? (
              <a
                key={id}
                href={href}
                target={id === "whatsapp" ? "_blank" : undefined}
                rel={id === "whatsapp" ? "noopener noreferrer" : undefined}
                className={className}
              >
                {content}
              </a>
            ) : (
              <div key={id} className={className}>
                {content}
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-brand-soft-neutral/60 flex items-center justify-between">
          <Link
            href={`${basePath}/about`}
            className="inline-flex min-h-[44px] items-center gap-2 text-xs font-bold text-brand-indigo hover:text-brand-blue transition-colors group/link"
          >
            <span>{storyLabel}</span>
            <ArrowRight className="h-4 w-4 rtl:rotate-180 transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
