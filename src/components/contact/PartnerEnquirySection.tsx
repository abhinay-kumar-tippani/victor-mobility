"use client";

import { ArrowUpRight, Bus } from "lucide-react";
import indiaData from "@/content/india.json";
import { useLanguage } from "@/i18n/LanguageContext";
import type { ContactData } from "@/types/content";

interface PartnerEnquirySectionProps {
  contact?: ContactData;
  copy?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    cta?: string;
    helper?: string;
    message?: string;
  };
}

export default function PartnerEnquirySection({ contact: propContact, copy: propCopy }: PartnerEnquirySectionProps = {}) {
  const { dict, locale } = useLanguage();
  const contact = propContact || indiaData.contact;
  const copy = propCopy || indiaData.enquiryExperience.partner;

  const eyebrow = propCopy?.eyebrow || dict.contactSection?.partnerEyebrow || copy.eyebrow;
  const title = propCopy?.title || dict.contactSection?.partnerTitle || copy.title;
  const description = propCopy?.description || dict.contactSection?.partnerDescription || copy.description;
  const cta = propCopy?.cta || dict.contactSection?.partnerCta || copy.cta;
  const helper = propCopy?.helper || dict.contactSection?.partnerHelper || copy.helper;

  const partnerMessage =
    locale === "ar"
      ? "مرحباً فيكتور موبيليتي، أود مناقشة شراكة تشغيلية للأسطول.\n\nالمدينة التشغيلية:\nفئات المركبات:\nعدد المركبات:\n\nيرجى إفادتي بالخطوات التالية."
      : locale === "hi"
      ? "नमस्ते Victor Mobility, मैं एक संभावित फ्लीट साझेदारी पर चर्चा करना चाहता हूँ।\n\nपरिचालन शहर:\nवाहन श्रेणियां:\nवाहनों की संख्या:\n\nकृपया मुझे आगे के कदम बताएं।"
      : locale === "te"
      ? "నమస్కారం Victor Mobility, నేను ఫ్లీట్ భాగస్వామ్యం గురించి చర్చించాలనుకుంటున్నాను.\n\nకార్యాచరణ నగరం:\nవాహన విభాగాలు:\nవాహనాల సంఖ్య:\n\nదయచేసి తదుపరి దశలను తెలియజేయండి."
      : locale === "kn"
      ? "ನಮಸ್ಕಾರ Victor Mobility, ನಾನು ಫ್ಲೀಟ್ ಪಾಲುದಾರಿಕೆಯ ಬಗ್ಗೆ ಚರ್ಚಿಸಲು ಬಯಸುತ್ತೇನೆ.\n\nಕಾರ್ಯಾಚರಣೆ ನಗರ:\nವಾಹನ ವಿಭಾಗಗಳು:\nವಾಹನಗಳ ಸಂಖ್ಯೆ:\n\nದಯವಿಟ್ಟು ಮುಂದಿನ ಹಂತಗಳನ್ನು ತಿಳಿಸಿ."
      : locale === "ta"
      ? "வணக்கம் Victor Mobility, நான் ஒரு வாகனக் கூட்டாண்மை பற்றி பேச விரும்புகிறேன்.\n\nசெயல்பாட்டு நகரம்:\nவாகன வகைகள்:\nவாகனங்களின் எண்ணிக்கை:\n\nஅடுத்த கட்ட நடவடிக்கைகளைத் தெரியப்படுத்தவும்."
      : locale === "ma"
      ? "നമസ്കാരം Victor Mobility, വാഹന ഫ്ലീറ്റ് പങ്കാളിത്തത്തെക്കുറിച്ച് സംസാരിക്കാൻ ആഗ്രഹിക്കുന്നു.\n\nപ്രവർത്തന നഗരം:\nവാഹന വിഭാഗങ്ങൾ:\nവാഹനങ്ങളുടെ എണ്ണം:\n\nദയവായി അടുത്ത ഘട്ടങ്ങൾ അറിയിക്കുക."
      : locale === "mr"
      ? "नमस्ते Victor Mobility, मला कॉर्पोरेट फ्लीट भागीदारीबद्दल चर्चा करायची आहे.\n\nकार्यरत शहर:\nवाहन श्रेणी:\nवाहनांची संख्या:\n\nकृपया पुढील पायऱ्या सांगा."
      : copy.message;

  return (
    <section id="partners" aria-labelledby="partner-title" className="border-t border-brand-soft-neutral bg-brand-warm-white py-12 sm:py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex max-w-2xl items-start gap-4">
          <Bus className="mt-1 h-7 w-7 shrink-0 text-brand-indigo" aria-hidden="true" />
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-blue">{eyebrow}</p>
            <h2 id="partner-title" className="text-2xl font-extrabold text-brand-ink">{title}</h2>
            <p className="mt-3 text-base leading-relaxed text-brand-ink/75">{description}</p>
          </div>
        </div>
        <div className="max-w-sm md:shrink-0">
          <a href={`${contact.whatsappBaseUrl}?text=${encodeURIComponent(partnerMessage || "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-indigo px-5 py-3 text-sm font-bold text-white hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-indigo">
            <span>{cta}</span>
            <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
          </a>
          <p className="mt-3 text-xs leading-relaxed text-brand-ink/65">{helper}</p>
        </div>
      </div>
    </section>
  );
}