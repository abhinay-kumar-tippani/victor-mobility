"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Globe, Leaf, ShieldCheck } from "lucide-react";
import JourneyArtwork from "@/components/about/JourneyArtwork";
import journey from "@/content/journey.json";
import { useLanguage } from "@/i18n/LanguageContext";

export default function VictorJourneySection() {
  const pathname = usePathname();
  const aboutHref = pathname?.startsWith("/uae") ? "/uae/about" : "/india/about";
  const { dict, locale } = useLanguage();
  const eyebrow = dict.journey?.eyebrow || journey.eyebrow;
  const title = dict.journey?.title || journey.title;
  const subtitle = dict.journey?.subtitle || journey.subtitle;
  const isArabic = locale === "ar";
  const phases = [
    {
      icon: ShieldCheck,
      years: "2009 – 2018",
      title: isArabic ? "التأسيس وتوسيع الأسطول" : "Foundation & Fleet Scale",
      description: isArabic
        ? "تأسيس الشركة والتوسع إلى أكثر من 1,500 مركبة تنفيذية وإدارة عقود كبرى المؤسسات."
        : "Incorporated under Indian Companies Act 1956; expanded fleet capacity to over 1,500+ executive vehicles.",
    },
    {
      icon: Leaf,
      years: "2020 – 2022",
      title: isArabic ? "السلامة والانضباط التشغيلي" : "Safety & Resilience",
      description: isArabic
        ? "تدريب السائقين والالتزام ببروتوكولات الأمان العالمية واستمرارية خدمات النقل المؤسسي."
        : "WHO driver re-education through pandemic challenges and resumption of full-capacity corporate operations.",
    },
    {
      icon: Globe,
      years: "2023 – 2025",
      title: isArabic ? "التوسع الإقليمي والدولي في الإمارات" : "Pan-India & International",
      description: isArabic
        ? "توسع الشبكة، الالتزام بالاستدامة، وإطلاق العمليات الرسمية في دبي وأبوظبي والإمارات."
        : "Metropolitan pan-India network reach, 15%–30% EV sustainability commitment, and full UAE international operations.",
    },
  ];

  return (
    <section
      id="journey"
      tabIndex={-1}
      aria-labelledby="journey-heading"
      className="relative scroll-mt-24 overflow-hidden border-y border-white/10 bg-[#0B0914] py-10 text-white focus:outline-none sm:py-12"
    >
      <div className="pointer-events-none absolute right-1/4 top-0 h-[500px] w-full max-w-[500px] rounded-full bg-brand-violet/10 blur-[140px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-full max-w-[400px] rounded-full bg-brand-indigo/10 blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#A790D7]">{eyebrow}</p>
            <h2 id="journey-heading" className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.65rem]">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">{subtitle}</p>

            <div className="mt-5 space-y-2.5">
              {phases.map((phase) => {
                const Icon = phase.icon;
                return (
                  <div key={phase.years} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-3.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-brand-violet/20 text-[#B9A6E2]" aria-hidden="true"><Icon className="size-4" /></span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <h3 className="text-xs font-bold uppercase tracking-wide text-white">{phase.title}</h3>
                        <span dir="ltr" className="rounded-full bg-brand-violet/20 px-2 py-0.5 text-[10px] font-bold text-[#C5B5E5]">{phase.years}</span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-zinc-300">{phase.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              href={aboutHref}
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-violet px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-indigo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {isArabic ? "قراءة قصة الشركة بالكامل" : "Read Full Company Story"}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <JourneyArtwork dark />
          </div>
        </div>
      </div>
    </section>
  );
}
