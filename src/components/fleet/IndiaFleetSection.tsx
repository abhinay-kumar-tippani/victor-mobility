"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Users, Zap } from "lucide-react";
import type indiaData from "@/content/india.json";
import type uaeData from "@/content/uae.json";
import type { FleetCategory } from "@/types/content";
import { useLanguage } from "@/i18n/LanguageContext";

interface Props {
  categories: FleetCategory[];
  copy: typeof indiaData.fleetPresentation | typeof uaeData.fleetPresentation;
  standalone?: boolean;
  basePath?: string;
  currencySymbol?: string;
}

export default function IndiaFleetSection({ categories, copy, standalone = false, basePath, currencySymbol }: Props) {
  const pathname = usePathname();
  const effectiveBasePath = basePath || (pathname.startsWith("/uae") ? "/uae" : "/india");
  const isUae = effectiveBasePath === "/uae";
  const effectiveCurrency = currencySymbol || (isUae ? "AED " : "₹");

  const { dict } = useLanguage();
  const fleetDict = dict.fleet;

  const items = copy.items.filter(item => categories.some(category => category.id === item.id));
  const [activeId, setActiveId] = useState(items[0]?.id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  // Listen to hash and support /fleet#electric directly
  useEffect(() => {
    function applyHash() {
      if (typeof window === "undefined") return;
      const hash = window.location.hash.toLowerCase();
      if (hash === "#electric") {
        const hasEv = items.some(item => item.id === "electric");
        if (hasEv) {
          setActiveId("electric");
          setTimeout(() => {
            const panel = document.getElementById("fleet-panel-electric") || document.getElementById("fleet");
            if (panel) {
              panel.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 60);
        }
      }
    }

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [items]);

  const active = items.find(item => item.id === activeId) || items[0];
  if (!active) return null;
  const category = categories.find(item => item.id === active.id)!;
  const PanelHeading = standalone ? "h2" : "h3";
  const isEv = active.id === "electric";

  const localizedActiveCategory = fleetDict?.categories?.[active.id];

  function navigate(event: React.KeyboardEvent, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % items.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;
    event.preventDefault();
    const nextItem = items[next];
    setActiveId(nextItem.id);
    tabs.current[next]?.focus();
    if (typeof window !== "undefined" && standalone) {
      if (nextItem.id === "electric") {
        window.history.replaceState(null, "", "#electric");
      } else if (window.location.hash === "#electric") {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  }

  const eyebrow = fleetDict?.eyebrow || copy.eyebrow;
  const title = fleetDict?.title || copy.title;
  const description = fleetDict?.description || copy.description;
  const viewAll = fleetDict?.exploreAll || copy.viewAll;
  const tabLabel = fleetDict?.tabLabel || copy.tabLabel;
  const capacityLabel = fleetDict?.capacityLabel || copy.capacityLabel;
  const useLabel = fleetDict?.useLabel || copy.useLabel;
  const modelsLabel = fleetDict?.modelsLabel || copy.modelsLabel;
  const priceLabel = fleetDict?.priceLabel || copy.priceLabel;
  const packageLabel = fleetDict?.packageLabel || copy.packageLabel;
  const priceNote = fleetDict?.priceNote || copy.priceNote;
  const enquireCta = fleetDict?.enquireCta || copy.enquire;
  const estimateCta = fleetDict?.estimateCta || copy.estimate;
  const imageCaption = fleetDict?.imageCaption || copy.imageCaption;

  return (
    <section id="fleet" aria-labelledby={`${id}-title`} className="scroll-mt-24 border-b border-brand-soft-neutral bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">{eyebrow}</p>
            {standalone ? (
              <h1 id={`${id}-title`} className="mt-3 text-4xl font-semibold tracking-tight text-brand-ink sm:text-5xl">{copy.pageTitle}</h1>
            ) : (
              <h2 id={`${id}-title`} className="mt-3 text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl">{title}</h2>
            )}
            <p className="mt-4 text-base leading-relaxed text-brand-ink/70">{standalone ? copy.pageDescription : description}</p>
          </div>
          {!standalone && (
            <Link href={`${effectiveBasePath}/fleet`} className="inline-flex min-h-[44px] shrink-0 items-center gap-2 text-sm font-bold text-brand-indigo">
              {viewAll}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          )}
        </div>

        <div role="tablist" aria-label={tabLabel} className="mb-7 flex flex-wrap gap-x-6 gap-y-2 border-b border-brand-soft-neutral sm:gap-8">
          {items.map((item, index) => {
            const tabCategory = fleetDict?.categories?.[item.id];
            const tabName = tabCategory ? tabCategory.name : item.tab;
            const itemIsEv = item.id === "electric";
            return (
              <button
                key={item.id}
                ref={element => { tabs.current[index] = element; }}
                role="tab"
                id={`${id}-tab-${item.id}`}
                aria-selected={active.id === item.id}
                aria-controls={`${id}-panel-${item.id}`}
                tabIndex={active.id === item.id ? 0 : -1}
                type="button"
                onClick={() => {
                  setActiveId(item.id);
                  if (typeof window !== "undefined" && standalone) {
                    if (item.id === "electric") {
                      window.history.replaceState(null, "", "#electric");
                    } else if (window.location.hash === "#electric") {
                      window.history.replaceState(null, "", window.location.pathname);
                    }
                  }
                }}
                onKeyDown={event => navigate(event, index)}
                className={`inline-flex items-center gap-2 min-h-[52px] border-b-2 px-1 py-3 text-start text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-indigo sm:text-base ${active.id === item.id ? "border-brand-indigo text-brand-indigo" : "border-transparent text-brand-ink/65 hover:text-brand-indigo"}`}
              >
                {itemIsEv && <Zap className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />}
                <span>{tabName}</span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          tabIndex={0}
          id={isEv ? "fleet-panel-electric" : `${id}-panel-${active.id}`}
          aria-labelledby={`${id}-tab-${active.id}`}
          className="scroll-mt-24 sm:scroll-mt-28 grid overflow-hidden rounded-2xl border border-brand-soft-neutral bg-brand-warm-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-indigo lg:grid-cols-2"
        >
          <div className="relative min-h-[240px] sm:min-h-[340px] lg:min-h-[500px]">
            <Image src={active.image} alt={active.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" style={{ objectPosition: active.imagePosition }} />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-ink/85 to-transparent px-5 pb-5 pt-16">
              <p className="text-xs text-white/85">{imageCaption}</p>
            </div>
          </div>
          <div className="flex flex-col p-5 sm:p-8 lg:p-10">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-blue">
              {isEv && <Zap className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
              <span>{isEv ? (fleetDict?.electric?.title || localizedActiveCategory?.name || "Electric Vehicles") : (localizedActiveCategory?.name || category.name)}</span>
            </div>
            <PanelHeading className="mt-3 max-w-md text-2xl font-semibold leading-snug tracking-tight text-brand-ink sm:text-3xl">
              {active.headline}
            </PanelHeading>
            <p className="mt-3 text-sm leading-relaxed text-brand-ink/70">
              {isEv ? (fleetDict?.electric?.introduction || "Explore electric travel for employee commutes, airport journeys and corporate requirements. Our team will confirm suitable vehicle options for your location and schedule.") : category.description}
            </p>

            {isEv ? (
              <dl className="my-6 space-y-4 text-sm">
                <div>
                  <dt className="mb-1 text-xs text-brand-ink/65">{fleetDict?.electric?.journeyRequirementsLabel || "Journey requirements"}</dt>
                  <dd className="font-semibold text-brand-ink">{fleetDict?.electric?.journeyRequirementsValue || "Route, timings and travel frequency."}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-xs text-brand-ink/65">{fleetDict?.electric?.passengerRequirementsLabel || "Passenger requirements"}</dt>
                  <dd className="font-semibold text-brand-ink">{fleetDict?.electric?.passengerRequirementsValue || "Number of travellers and luggage."}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-xs text-brand-ink/65">{fleetDict?.electric?.vehicleAllocationLabel || "Vehicle allocation"}</dt>
                  <dd className="font-semibold text-brand-ink">{fleetDict?.electric?.vehicleAllocationValue || "Confirmed during the enquiry."}</dd>
                </div>
              </dl>
            ) : (
              <dl className="my-6 space-y-4 text-sm">
                <div>
                  <dt className="mb-1 text-xs text-brand-ink/65">{capacityLabel}</dt>
                  <dd className="flex items-start gap-2 font-semibold text-brand-ink">
                    <Users className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                    {localizedActiveCategory?.capacity || active.capacity}
                  </dd>
                </div>
                <div>
                  <dt className="mb-1 text-xs text-brand-ink/65">{useLabel}</dt>
                  <dd className="font-medium leading-relaxed text-brand-ink">
                    {localizedActiveCategory?.use || active.bestFor}
                  </dd>
                </div>
                {category.brochureModels?.length > 0 && (
                  <div>
                    <dt className="mb-1 text-xs text-brand-ink/65">{modelsLabel}</dt>
                    <dd className="font-medium leading-relaxed text-brand-ink">
                      {localizedActiveCategory?.models || category.brochureModels.join(" · ")}
                    </dd>
                  </div>
                )}
              </dl>
            )}

            <div className="mt-auto border-t border-brand-ink/15 pt-5">
              <p className="text-xs font-semibold text-brand-ink/65">
                {isEv ? (fleetDict?.electric?.pricingLabel || "Pricing") : priceLabel}
              </p>
              <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                {isEv || active.price === null ? (
                  <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-brand-indigo">
                    {fleetDict?.electric?.priceValue || "Request a quote"}
                  </p>
                ) : (
                  <>
                    <p className="text-3xl font-semibold tracking-tight text-brand-indigo">
                      <span dir="ltr">{effectiveCurrency}{active.price.toLocaleString("en-US")}</span>
                    </p>
                    <span className="text-sm text-brand-ink/70">/ {packageLabel}</span>
                  </>
                )}
              </div>
              <p className="mt-2 max-w-md text-xs leading-relaxed text-brand-ink/65">
                {isEv ? (fleetDict?.electric?.availabilityNote || "Vehicle options, pricing and route suitability are confirmed by our team.") : priceNote}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={`${effectiveBasePath}/contact?category=${encodeURIComponent(isEv ? "Electric Vehicles" : category.name)}`}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-indigo px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-indigo"
              >
                {isEv ? (fleetDict?.electric?.enquireCta || "Enquire about electric vehicles") : enquireCta}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
              <Link
                href={`${effectiveBasePath}/estimator`}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 px-2 text-sm font-bold text-brand-indigo"
              >
                {estimateCta}
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-5 text-xs leading-relaxed text-brand-ink/65">
          {isEv ? (fleetDict?.electric?.availabilityNote || "Vehicle options, pricing and route suitability are confirmed by our team.") : copy.availability}
        </p>
      </div>
    </section>
  );
}
