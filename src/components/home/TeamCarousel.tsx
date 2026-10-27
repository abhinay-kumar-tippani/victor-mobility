"use client";

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
  en: { eyebrow: "Core Key Contacts", title: "Meet the team", business: "Business partnerships", placeholder: "Illustrative profile", pending: "This team profile will be updated soon.", member: "Team member", previous: "Previous profile", next: "Next profile", pause: "Pause slideshow", play: "Play slideshow", goTo: "Show profile", whatsapp: "Open WhatsApp draft", call: "Call the desk" },
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
  const labels = copy[locale];
  const channels = channelCopy[locale];
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
      className="flex h-full min-h-[590px] flex-col overflow-hidden rounded-3xl border border-brand-soft-neutral bg-white shadow-xs lg:min-h-[640px]"
      aria-roledescription="carousel"
      aria-label={labels.title}
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteracting(false);
      }}
    >
      <div className="flex items-start justify-between gap-4 px-6 pt-6 sm:px-8 sm:pt-8">
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue">
            <UserCheckIcon className="h-4 w-4" aria-hidden="true" />{labels.eyebrow}
          </span>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-brand-ink sm:text-3xl">{labels.title}</h3>
        </div>
      </div>

      <div className="grid flex-1 gap-5 px-6 py-5 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] sm:items-center sm:gap-7 sm:px-8" aria-live="off">
        <div className="relative h-56 overflow-hidden rounded-2xl bg-brand-warm-white sm:h-[310px] lg:h-[340px]">
          <Image
            key={active.id}
            src={active.imageSrc}
            alt={active.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, 320px"
            className="object-cover object-top"
          />
          {active.placeholder && (
            <span className="absolute bottom-3 start-3 rounded-full border border-white/60 bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-indigo shadow-sm">
              {labels.placeholder}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-violet">{active.placeholder ? labels.placeholder : (active.division || labels.business)}</span>
          <h4 className="mt-3 max-w-[17rem] break-words text-xl font-extrabold leading-tight text-brand-ink sm:max-w-none sm:text-2xl">
            {active.placeholder ? `${labels.member} ${String(index + 1).padStart(2, "0")}` : active.name}
          </h4>
          <p className="mt-2 text-sm font-semibold text-brand-indigo">{active.placeholder ? labels.pending : active.role}</p>
          {!active.placeholder && (active.id === "mujeeb" ? description : active.description) && (
            <p className="mt-5 max-w-[17rem] text-sm leading-relaxed text-brand-ink/75 sm:max-w-sm">{active.id === "mujeeb" ? description : active.description}</p>
          )}
        </div>
      </div>

      <div className="border-t border-brand-soft-neutral px-6 py-4 sm:px-8">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button type="button" aria-label={labels.previous} onClick={() => setIndex((current) => (current - 1 + slides.length) % slides.length)} className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-soft-neutral text-brand-indigo transition-colors hover:bg-brand-warm-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo"><ChevronLeft className="h-5 w-5 rtl:rotate-180" aria-hidden="true" /></button>
            <button type="button" aria-label={labels.next} onClick={() => setIndex((current) => (current + 1) % slides.length)} className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-soft-neutral text-brand-indigo transition-colors hover:bg-brand-warm-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo"><ChevronRight className="h-5 w-5 rtl:rotate-180" aria-hidden="true" /></button>
            {!reducedMotion && <button type="button" aria-label={paused ? labels.play : labels.pause} onClick={() => setPaused((value) => !value)} className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-soft-neutral text-brand-indigo transition-colors hover:bg-brand-warm-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo">{paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}</button>}
          </div>
          <div className="flex items-center gap-1" role="group" aria-label={labels.title}>
            {slides.map((slide, slideIndex) => (
              <button key={slide.id} type="button" aria-label={`${labels.goTo} ${slideIndex + 1}`} aria-current={slideIndex === index ? "true" : undefined} onClick={() => setIndex(slideIndex)} className="flex h-11 w-7 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-indigo">
                <span className={`block h-1.5 rounded-full transition-all ${slideIndex === index ? "w-5 bg-brand-indigo" : "w-1.5 bg-brand-soft-neutral"}`} />
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 grid gap-2 border-t border-brand-soft-neutral pt-4 sm:grid-cols-3">
          {contactChannels.map(({ id, label, sampleLabel, value, href, Icon }) => {
            const content = (
              <>
                <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-wide">{href ? label : `${sampleLabel} · ${channels.sample}`}</span>
                  <bdi dir="ltr" className="mt-1 block break-all text-xs font-semibold normal-case tracking-normal">{value || "—"}</bdi>
                </span>
              </>
            );
            const className = `flex min-h-[58px] items-start gap-2 rounded-xl border px-3 py-2 ${href ? "border-brand-soft-neutral bg-brand-warm-white text-brand-indigo transition-colors hover:border-brand-indigo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo" : "border-brand-soft-neutral bg-brand-warm-white/60 text-brand-ink/60"}`;
            return href ? (
              <a key={id} href={href} target={id === "whatsapp" ? "_blank" : undefined} rel={id === "whatsapp" ? "noopener noreferrer" : undefined} className={className}>{content}</a>
            ) : (
              <div key={id} className={className}>{content}</div>
            );
          })}
        </div>
        <Link href={`${basePath}/about`} className="mt-2 inline-flex min-h-[44px] items-center gap-1.5 text-xs font-bold text-brand-indigo hover:text-brand-blue">{storyLabel}<ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" /></Link>
      </div>
    </div>
  );
}
