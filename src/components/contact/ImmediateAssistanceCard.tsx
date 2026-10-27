"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Phone, MessageSquare, Mail } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export interface AssistanceContact {
  id: string;
  name: string;
  role: string;
  imageSrc: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappDisplay: string;
  whatsappDigits: string;
  email: string;
  emailDisplay: string;
}

interface ImmediateAssistanceCardProps {
  isUae?: boolean;
  className?: string;
}

export default function ImmediateAssistanceCard({
  isUae = false,
  className = "",
}: ImmediateAssistanceCardProps) {
  const { locale } = useLanguage();

  const people: AssistanceContact[] = [
    {
      id: "mujeeb",
      name: "Mujeeb Ur Rahman Mohammed",
      role: "Business Development Partner",
      imageSrc: "/images/india/leadership-mujeeb.jpg",
      phoneDisplay: isUae ? "+971 52 455 2441" : "+91 95158 50808",
      phoneHref: isUae ? "tel:+971524552441" : "tel:+919515850808",
      whatsappDisplay: isUae ? "+971 52 455 2441" : "+91 95158 50808",
      whatsappDigits: isUae ? "971524552441" : "919515850808",
      email: "mujeeb@victorluxurylimousine.com",
      emailDisplay: "mujeeb@victorluxurylimousine.com",
    },
    {
      id: "asif",
      name: "Muhammad Asif",
      role: "Manager - Admin & Finance",
      imageSrc: "/images/team/muhammad-asif.jpg",
      phoneDisplay: "+91 9100 77 77 68",
      phoneHref: "tel:+919100777768",
      whatsappDisplay: "+91 9100 77 77 68",
      whatsappDigits: "919100777768",
      email: "asif@victorluxurylimousine.com",
      emailDisplay: "asif@victorluxurylimousine.com",
    },
    {
      id: "thameem",
      name: "Mohammed Thameem Ahmed",
      role: "Head of Operations",
      imageSrc: "/images/team/thameem-ahmed.png",
      phoneDisplay: "+91 95159 50808",
      phoneHref: "tel:+919515950808",
      whatsappDisplay: "+91 95159 50808",
      whatsappDigits: "9515950808",
      email: "thameem@victorluxurylimousine.com",
      emailDisplay: "thameem@victorluxurylimousine.com",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 3-second automatic slideshow rotation
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % people.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, people.length]);

  const person = people[currentIndex];

  const cardEyebrow =
    locale === "ar"
      ? "المساعدة الفورية"
      : locale === "hi"
      ? "त्वरित सहायता"
      : locale === "te"
      ? "తక్షణ సహాయం"
      : locale === "kn"
      ? "ತ್ವರಿತ ಸಹಾಯ"
      : locale === "ta"
      ? "உடனடி உதவி"
      : locale === "ma"
      ? "ഉടനടി സഹായം"
      : "Immediate Assistance";

  const cardHeading =
    locale === "ar"
      ? "هل تفضل التحدث مباشرة؟"
      : locale === "hi"
      ? "सीधे बात करना चाहते हैं?"
      : locale === "te"
      ? "నేరుగా మాట్లాడాలనుకుంటున్నారా?"
      : locale === "kn"
      ? "ನೇರವಾಗಿ ಮಾತನಾಡಲು ಬಯಸುವಿರಾ?"
      : locale === "ta"
      ? "நேரடியாக பேச விரும்புகிறீர்களா?"
      : locale === "ma"
      ? "നേരിട്ട് സംസാരിക്കാൻ താല്പര്യമുണ്ടോ?"
      : "Prefer to Speak Directly?";

  const cardDesc =
    locale === "ar"
      ? "فريق العمليات وتطوير الأعمال متاح لمناقشة العقود المؤسسية وحجوزات السائقين والليموزين الفوري."
      : locale === "hi"
      ? "कॉर्पोरेट अनुबंधों और तत्काल यात्रा आवश्यकताओं पर चर्चा के लिए हमारे संचालन और व्यावसायिक विकास साझेदार व्यावसायिक घंटों के दौरान उपलब्ध हैं।"
      : locale === "te"
      ? "కార్పొరేట్ ఒప్పందాలు మరియు అత్యవసర ప్రయాణ అవసరాలను చర్చించడానికి వ్యాపార వేళల్లో మా ఆపరేషన్స్ మరియు బిజినెస్ డెవలప్‌మెంట్ భాగస్వామి అందుబాటులో ఉంటారు."
      : locale === "kn"
      ? "ಕಾರ್ಪೊರೇಟ್ ಒಪ್ಪಂದಗಳು ಮತ್ತು ತುರ್ತು ಪ್ರಯಾಣದ ಅಗತ್ಯಗಳನ್ನು ಚರ್ಚಿಸಲು ವ್ಯವಹಾರದ ಸಮಯದಲ್ಲಿ ನಮ್ಮ ಕಾರ್ಯಾಚರಣೆ ಮತ್ತು ವ್ಯಾಪಾರ ಅಭಿವೃದ್ಧಿ ಪಾಲುದಾರರು ಲಭ್ಯವಿರುತ್ತಾರೆ."
      : locale === "ta"
      ? "கார்ப்பரேட் ஒப்பந்தங்கள் மற்றும் அவசர பயணத் தேவைகளைப் பற்றி பேச வணிக நேரங்களில் எங்கள் செயல்பாட்டு மற்றும் வணிக மேம்பாட்டு கூட்டாளர் தயாராக உள்ளார்."
      : locale === "ma"
      ? "കോർപ്പറേറ്റ് കരാറുകളും അടിയന്തര യാത്രാ ആവശ്യങ്ങളും ചർച്ച ചെയ്യാൻ ബിസിനസ്സ് സമയങ്ങളിൽ ഞങ്ങളുടെ ഓപ്പറേഷൻസ്, ബിസിനസ്സ് ഡെവലപ്‌മെന്റ് പങ്കാളി ലഭ്യമാണ്."
      : "Our operations and business development partner is available during business hours to discuss corporate contracts and urgent travel needs.";

  const callLabel =
    locale === "ar"
      ? "اتصال مباشر"
      : locale === "hi"
      ? "सीधे कॉल करें"
      : locale === "te"
      ? "నేరుగా కాల్ చేయండి"
      : "Call Direct";

  const whatsappLabel =
    locale === "ar"
      ? "واتساب مباشر"
      : locale === "hi"
      ? "सीधा व्हाट्सएप"
      : locale === "te"
      ? "డైరెక్ట్ వాట్సాప్"
      : "Direct WhatsApp";

  const emailLabel =
    locale === "ar"
      ? "بريد إلكتروني مباشر"
      : locale === "hi"
      ? "सीधा ईमेल"
      : locale === "te"
      ? "డైరెక్ట్ ఇమెయిల్"
      : "Direct Email";

  const whatsappMessage = encodeURIComponent(
    locale === "ar"
      ? `مرحباً ${person.name}، أود مناقشة متطلبات النقل والتنقل مع شركة فيكتور موبيليتي.`
      : locale === "hi"
      ? `नमस्ते ${person.name}, मैं Victor Mobility के साथ परिवहन आवश्यकता पर चर्चा करना चाहता हूँ।`
      : locale === "te"
      ? `నమస్కారం ${person.name}, నేను Victor Mobility తో రవాణా అవసరాల గురించి చర్చించాలనుకుంటున్నాను.`
      : `Hello ${person.name}, I would like to discuss a transport requirement with Victor Mobility.`
  );

  return (
    <div
      data-testid="immediate-assistance-card"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      className={`bg-brand-ink text-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg border border-white/10 ${className}`}
    >
      <span className="text-xs font-bold uppercase tracking-widest text-brand-soft-neutral/70 block mb-2">
        {cardEyebrow}
      </span>
      <h3 className="text-2xl font-bold mb-3">{cardHeading}</h3>
      <p className="text-sm text-brand-soft-neutral/85 leading-relaxed mb-6">
        {cardDesc}
      </p>

      {/* 3 Contact Action Boxes: Phone, WhatsApp, and Email */}
      <div className="space-y-3 sm:space-y-3.5">
        {/* Box 1: Call Direct */}
        <a
          href={person.phoneHref}
          className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 transition-all group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-white text-brand-indigo flex items-center justify-center shrink-0 shadow-xs">
            <Phone className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] uppercase tracking-wider text-brand-soft-neutral/70 block">
              {callLabel}
            </span>
            <span
              className="text-sm sm:text-base font-bold text-white group-hover:text-brand-soft-neutral truncate block"
              dir="ltr"
            >
              {person.phoneDisplay}
            </span>
          </div>
        </a>

        {/* Box 2: Direct WhatsApp */}
        <a
          href={`https://wa.me/${person.whatsappDigits}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/40 transition-all group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] uppercase tracking-wider text-emerald-200 block">
              {whatsappLabel}
            </span>
            <span
              className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-100 truncate block"
              dir="ltr"
            >
              {person.whatsappDisplay}
            </span>
          </div>
        </a>

        {/* Box 3: Direct Email */}
        <a
          href={`mailto:${person.email}?subject=${encodeURIComponent(
            `Enquiry for ${person.name} — Victor Mobility`
          )}`}
          className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-brand-indigo/30 hover:bg-brand-indigo/40 border border-brand-violet/40 transition-all group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-brand-indigo text-white flex items-center justify-center shrink-0 shadow-xs">
            <Mail className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] uppercase tracking-wider text-brand-soft-neutral/70 block">
              {emailLabel}
            </span>
            <span
              className="text-sm sm:text-base font-bold text-white group-hover:text-brand-soft-neutral truncate block"
              dir="ltr"
            >
              {person.emailDisplay}
            </span>
          </div>
        </a>
      </div>

      {/* Slideshow Team Member Footer */}
      <div className="mt-6 pt-5 border-t border-white/15 flex items-center justify-between gap-3.5">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/20 bg-white/10 shadow-xs">
            <Image
              key={person.id}
              src={person.imageSrc}
              alt={`Portrait of ${person.name}`}
              fill
              sizes="48px"
              className="object-cover object-top transition-opacity duration-300"
            />
          </div>
          <div className="min-w-0">
            <span className="font-bold text-white block text-sm truncate">
              {person.name}
            </span>
            <span className="text-xs text-brand-soft-neutral/85 block truncate">
              {person.role}
            </span>
          </div>
        </div>

        {/* Slide indicator dots */}
        <div
          className="flex items-center gap-1.5 shrink-0"
          role="tablist"
          aria-label="Leadership slide indicators"
        >
          {people.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={idx === currentIndex}
              aria-label={`Show ${p.name}`}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? "w-6 bg-white"
                  : "w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
