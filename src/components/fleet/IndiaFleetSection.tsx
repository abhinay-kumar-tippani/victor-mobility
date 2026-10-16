"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import type indiaData from "@/content/india.json";
import type { FleetCategory } from "@/types/content";

interface Props {
  categories: FleetCategory[];
  copy: typeof indiaData.fleetPresentation;
  standalone?: boolean;
}

export default function IndiaFleetSection({ categories, copy, standalone = false }: Props) {
  const items = copy.items.filter(item => categories.some(category => category.id === item.id));
  const [activeId, setActiveId] = useState(items[0]?.id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const active = items.find(item => item.id === activeId) || items[0];
  if (!active) return null;
  const category = categories.find(item => item.id === active.id)!;
  const PanelHeading = standalone ? "h2" : "h3";
  function navigate(event: React.KeyboardEvent, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % items.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;
    event.preventDefault(); setActiveId(items[next].id); tabs.current[next]?.focus();
  }
  return <section id="fleet" aria-labelledby={`${id}-title`} className="scroll-mt-24 border-b border-brand-soft-neutral bg-white py-14 sm:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">{copy.eyebrow}</p>{standalone ? <h1 id={`${id}-title`} className="mt-3 text-4xl font-semibold tracking-tight text-brand-ink sm:text-5xl">{copy.pageTitle}</h1> : <h2 id={`${id}-title`} className="mt-3 text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl">{copy.title}</h2>}<p className="mt-4 text-base leading-relaxed text-brand-ink/70">{standalone ? copy.pageDescription : copy.description}</p></div>
        {!standalone && <Link href="/india/fleet" className="inline-flex min-h-[44px] shrink-0 items-center gap-2 text-sm font-bold text-brand-indigo">{copy.viewAll}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
      </div>
      <div role="tablist" aria-label={copy.tabLabel} className="mb-7 grid grid-cols-2 gap-x-4 gap-y-1 border-b border-brand-soft-neutral sm:flex sm:gap-8">
        {items.map((item, index) => <button key={item.id} ref={element => { tabs.current[index] = element; }} role="tab" id={`${id}-tab-${item.id}`} aria-selected={active.id === item.id} aria-controls={`${id}-panel-${item.id}`} tabIndex={active.id === item.id ? 0 : -1} type="button" onClick={() => setActiveId(item.id)} onKeyDown={event => navigate(event, index)} className={`min-h-[52px] border-b-2 px-1 py-3 text-left text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-indigo sm:text-base ${active.id === item.id ? "border-brand-indigo text-brand-indigo" : "border-transparent text-brand-ink/65 hover:text-brand-indigo"}`}>{item.tab}</button>)}
      </div>
      <div role="tabpanel" tabIndex={0} id={`${id}-panel-${active.id}`} aria-labelledby={`${id}-tab-${active.id}`} className="grid overflow-hidden rounded-2xl border border-brand-soft-neutral bg-brand-warm-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-indigo lg:grid-cols-2">
        <div className="relative min-h-[240px] sm:min-h-[340px] lg:min-h-[500px]">
          <Image src={active.image} alt={active.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" style={{ objectPosition: active.imagePosition }} />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-ink/85 to-transparent px-5 pb-5 pt-16"><p className="text-xs text-white/85">{copy.imageCaption}</p></div>
        </div>
        <div className="flex flex-col p-5 sm:p-8 lg:p-10">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-blue">{category.name}</p><PanelHeading className="mt-3 max-w-md text-2xl font-semibold leading-snug tracking-tight text-brand-ink sm:text-3xl">{active.headline}</PanelHeading><p className="mt-3 text-sm leading-relaxed text-brand-ink/70">{category.description}</p>
          <dl className="my-6 space-y-4 text-sm"><div><dt className="mb-1 text-xs text-brand-ink/65">{copy.capacityLabel}</dt><dd className="flex items-start gap-2 font-semibold text-brand-ink"><Users className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />{active.capacity}</dd></div><div><dt className="mb-1 text-xs text-brand-ink/65">{copy.useLabel}</dt><dd className="font-medium leading-relaxed text-brand-ink">{active.bestFor}</dd></div>{category.brochureModels?.length > 0 && <div><dt className="mb-1 text-xs text-brand-ink/65">{copy.modelsLabel}</dt><dd className="font-medium leading-relaxed text-brand-ink">{category.brochureModels.join(" · ")}</dd></div>}</dl>
          <div className="mt-auto border-t border-brand-ink/15 pt-5"><p className="text-xs font-semibold text-brand-ink/65">{copy.priceLabel}</p><div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1"><p className="text-3xl font-semibold tracking-tight text-brand-indigo">₹{active.price.toLocaleString("en-IN")}</p><span className="text-sm text-brand-ink/70">/ {copy.packageLabel}</span></div><p className="mt-2 max-w-md text-xs leading-relaxed text-brand-ink/65">{copy.priceNote}</p></div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"><Link href={`/india/contact?category=${encodeURIComponent(category.name)}`} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-indigo px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-indigo">{copy.enquire}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><Link href="/india/estimator" className="inline-flex min-h-[44px] items-center justify-center gap-2 px-2 text-sm font-bold text-brand-indigo">{copy.estimate}</Link></div>
        </div>
      </div>
      <p className="mt-5 text-xs leading-relaxed text-brand-ink/65">{copy.availability}</p>
    </div>
  </section>;
}
