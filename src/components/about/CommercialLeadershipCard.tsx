import Image from "next/image";
import { MessageSquare, Phone, Quote } from "lucide-react";
import type { ContactData } from "@/types/content";

interface CommercialLeadershipCardProps {
  contact: ContactData;
  copy: {
    commercialEyebrow: string;
    commercialScope: string;
    commercialQuote: string;
    commercialDescription: string;
    commercialImageSrc: string;
    commercialWhatsappMessage: string;
    commercialWhatsappLabel: string;
  };
}

export default function CommercialLeadershipCard({ contact, copy }: CommercialLeadershipCardProps) {
  return (
    <article id="commercial-leadership" aria-labelledby="commercial-leadership-name" className="grid grid-cols-1 items-center overflow-hidden rounded-3xl border border-brand-soft-neutral bg-white shadow-sm lg:grid-cols-12">
      <div className="relative min-h-[380px] aspect-[4/5] bg-brand-ink sm:aspect-square lg:col-span-5 lg:aspect-auto lg:h-full">
        <Image src={copy.commercialImageSrc} alt={`Portrait of ${contact.name}, ${contact.role} of Victor Mobility`} fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/20 to-transparent lg:hidden" />
        <div className="absolute bottom-4 start-4 end-4 text-white lg:hidden" aria-hidden="true">
          <span className="mb-1 inline-block rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-violet">{contact.role}</span>
          <p className="text-xl font-bold">{contact.name}</p>
        </div>
      </div>
      <div className="space-y-6 p-8 sm:p-12 lg:col-span-7 lg:p-14">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-blue">{copy.commercialEyebrow}</p>
          <h2 id="commercial-leadership-name" className="text-2xl font-extrabold tracking-tight text-brand-ink sm:text-4xl">{contact.name}</h2>
          <p className="mt-1 text-xs font-semibold text-brand-indigo sm:text-sm">{contact.role} · {copy.commercialScope}</p>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-brand-soft-neutral bg-brand-warm-white p-4 sm:p-5">
          <Quote className="mt-1 h-5 w-5 shrink-0 text-brand-indigo" aria-hidden="true" />
          <p className="text-sm font-semibold italic text-brand-ink sm:text-base">&ldquo;{copy.commercialQuote}&rdquo;</p>
        </div>
        <p className="text-sm leading-relaxed text-brand-ink/80">{copy.commercialDescription}</p>
        <div className="flex flex-wrap items-center gap-4 border-t border-brand-soft-neutral pt-4 text-xs">
          <a href={contact.phoneHref} className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-brand-soft-neutral bg-brand-warm-white px-4 py-2.5 font-bold text-brand-indigo transition-colors hover:bg-brand-indigo hover:text-white">
            <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /><span dir="ltr">{contact.phoneDisplay}</span>
          </a>
          <a href={`https://wa.me/${contact.whatsappDigits}?text=${encodeURIComponent(copy.commercialWhatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 font-semibold text-emerald-800 transition-colors hover:bg-emerald-100">
            <MessageSquare className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /><span>{copy.commercialWhatsappLabel}</span>
          </a>
        </div>
      </div>
    </article>
  );
}
