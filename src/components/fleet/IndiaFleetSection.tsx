"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Users, Zap } from "lucide-react";
import indiaData from "@/content/india.json";
import type uaeData from "@/content/uae.json";
import type { FleetCategory, FleetVehicle } from "@/types/content";
import { useLanguage } from "@/i18n/LanguageContext";

interface Props {
  categories: FleetCategory[];
  copy: typeof indiaData.fleetPresentation | typeof uaeData.fleetPresentation;
  standalone?: boolean;
  basePath?: string;
  currencySymbol?: string;
  vehicles?: FleetVehicle[];
}

type TabId = "all" | "sedan" | "suv" | "12-seater" | "electric";

interface TabItem {
  id: TabId;
  label: string;
  count: number;
}

export default function IndiaFleetSection({
  categories,
  copy,
  standalone = false,
  basePath,
  currencySymbol,
  vehicles,
}: Props) {
  const pathname = usePathname();
  const effectiveBasePath = basePath || (pathname.startsWith("/uae") ? "/uae" : "/india");
  const isUae = effectiveBasePath === "/uae" || effectiveBasePath.startsWith("/uae");
  const effectiveCurrency = currencySymbol || (isUae ? "AED " : "₹");

  const { dict } = useLanguage();
  const fleetDict = dict.fleet;
  const id = useId();

  // --------------------------------------------------------------------------
  // Regional Branch: UAE Fleet Showcase (Preserve RTL/Arabic & isolated UAE tiers)
  // --------------------------------------------------------------------------
  const items = copy.items.filter(item => categories.some(category => category.id === item.id));
  const [activeUaeId, setActiveUaeId] = useState(items[0]?.id);
  const uaeTabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // --------------------------------------------------------------------------
  // India Fleet: Modern Categorization Grid (5 Filter Tabs & 10 Manager Vehicles)
  // --------------------------------------------------------------------------
  const allVehicles: FleetVehicle[] = useMemo(() => {
    return (vehicles && vehicles.length > 0)
      ? vehicles
      : ((indiaData.fleetVehicles || []) as FleetVehicle[]);
  }, [vehicles]);

  const [activeTab, setActiveTab] = useState<TabId>("all");
  const indiaTabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Calculate exact partition counts from single source of truth
  const tabAllCount = allVehicles.length;
  const tabSedanCount = allVehicles.filter(v => v.cabType === "Sedan").length;
  const tabSuvCount = allVehicles.filter(v => v.cabType === "SUV").length;
  const tab12Count = allVehicles.filter(v => v.cabType === "12 Seater").length;
  const tabEvCount = allVehicles.filter(v => Boolean(v.isElectric)).length;

  const tabs: TabItem[] = useMemo(() => [
    { id: "all", label: fleetDict?.filterTabs?.all || "All Vehicles", count: tabAllCount },
    { id: "sedan", label: fleetDict?.filterTabs?.sedan || "Sedan", count: tabSedanCount },
    { id: "suv", label: fleetDict?.filterTabs?.suv || "SUV", count: tabSuvCount },
    { id: "12-seater", label: fleetDict?.filterTabs?.twelveSeater || "12 Seater", count: tab12Count },
    { id: "electric", label: fleetDict?.filterTabs?.electric || "Electric Vehicles", count: tabEvCount },
  ], [fleetDict, tabAllCount, tabSedanCount, tabSuvCount, tab12Count, tabEvCount]);

  const getLocalizedFuel = (fuelType: string): string => {
    switch (fuelType) {
      case "Petrol":
        return fleetDict?.fuelBadges?.petrol || "Petrol";
      case "Petrol & CNG":
        return fleetDict?.fuelBadges?.petrolCng || "Petrol & CNG";
      case "Electric Vehicle":
        return fleetDict?.fuelBadges?.electricVehicle || "Electric Vehicle";
      case "Long Range Electric Vehicle":
        return fleetDict?.fuelBadges?.longRangeElectricVehicle || "Long Range Electric Vehicle";
      case "Diesel":
        return fleetDict?.fuelBadges?.diesel || "Diesel";
      default:
        return fuelType;
    }
  };

  // Handle URL deep linking for #electric (mount and dynamic hashchange)
  useEffect(() => {
    function applyHash() {
      if (typeof window === "undefined") return;
      const hash = window.location.hash.toLowerCase();
      if (hash === '#electric' || hash === "#electric-vehicles") {
        if (!isUae) {
          setActiveTab("electric");
          setTimeout(() => {
            const panel = document.getElementById("fleet-panel-electric") || document.getElementById("fleet");
            if (panel) {
              panel.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 60);
        } else {
          const hasEv = items.some(item => item.id === "electric");
          if (hasEv) {
            setActiveUaeId("electric");
          }
        }
      }
    }

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [isUae, items]);

  // Synchronize history state on tab change
  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    if (typeof window !== "undefined") {
      if (tabId === "electric") {
        window.history.replaceState(null, "", "#electric");
      } else if (window.location.hash === "#electric") {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  };

  // Keyboard navigation for India tabs (Arrow keys, Home, End)
  function handleIndiaKeyDown(event: React.KeyboardEvent, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;

    event.preventDefault();
    const nextTab = tabs[next];
    handleTabChange(nextTab.id);
    indiaTabRefs.current[next]?.focus();
  }

  // Active vehicles view derived idempotently from active tab
  const currentTab = activeTab || 'all';
  const filteredVehicles = useMemo(() => {
    switch (currentTab) {
      case "sedan":
        return allVehicles.filter(v => v.cabType === "Sedan");
      case "suv":
        return allVehicles.filter(v => v.cabType === "SUV");
      case "12-seater":
        return allVehicles.filter(v => v.cabType === "12 Seater");
      case "electric":
        return allVehicles.filter(v => Boolean(v.isElectric));
      case "all":
      default:
        return allVehicles;
    }
  }, [allVehicles, currentTab]);

  // Keyboard navigation for UAE legacy showcase
  function handleUaeKeyDown(event: React.KeyboardEvent, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % items.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;

    event.preventDefault();
    const nextItem = items[next];
    setActiveUaeId(nextItem.id);
    uaeTabsRef.current[next]?.focus();
  }

  // Localized copy references
  const eyebrow = fleetDict?.eyebrow || copy.eyebrow;
  const title = fleetDict?.title || copy.title;
  const description = fleetDict?.description || copy.description;
  const viewAll = fleetDict?.exploreAll || copy.viewAll;
  const tabLabel = fleetDict?.tabLabel || copy.tabLabel;
  const priceLabel = fleetDict?.priceLabel || copy.priceLabel;
  const packageLabel = fleetDict?.packageLabel || copy.packageLabel;
  const imageCaption = fleetDict?.imageCaption || copy.imageCaption;

  // ==========================================================================
  // UAE ROUTE RENDERING (Regional Isolation)
  // ==========================================================================
  if (isUae) {
    const activeUae = items.find(item => item.id === activeUaeId) || items[0];
    if (!activeUae) return null;
    const category = categories.find(item => item.id === activeUae.id)!;
    const PanelHeading = standalone ? "h2" : "h3";
    const isEv = activeUae.id === "electric";
    const localizedActiveCategory = fleetDict?.categories?.[activeUae.id];

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
                  ref={element => { uaeTabsRef.current[index] = element; }}
                  role="tab"
                  id={`${id}-tab-${item.id}`}
                  aria-selected={activeUae.id === item.id}
                  aria-controls={`${id}-panel-${item.id}`}
                  tabIndex={activeUae.id === item.id ? 0 : -1}
                  type="button"
                  onClick={() => setActiveUaeId(item.id)}
                  onKeyDown={event => handleUaeKeyDown(event, index)}
                  className={`inline-flex items-center gap-2 min-h-[52px] border-b-2 px-1 py-3 text-start text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-indigo sm:text-base ${activeUae.id === item.id ? "border-brand-indigo text-brand-indigo" : "border-transparent text-brand-ink/65 hover:text-brand-indigo"}`}
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
            id={isEv ? "fleet-panel-electric" : `${id}-panel-${activeUae.id}`}
            aria-labelledby={`${id}-tab-${activeUae.id}`}
            className="scroll-mt-24 sm:scroll-mt-28 grid overflow-hidden rounded-2xl border border-brand-soft-neutral bg-brand-warm-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-indigo lg:grid-cols-2"
          >
            <div className="relative min-h-[240px] sm:min-h-[340px] lg:min-h-[500px]">
              <Image src={activeUae.image} alt={activeUae.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" style={{ objectPosition: activeUae.imagePosition }} />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-ink/85 to-transparent px-5 pb-5 pt-16">
                <p className="text-xs text-white/85">{imageCaption}</p>
              </div>
            </div>
            <div className="flex flex-col p-5 sm:p-8 lg:p-10">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-blue">
                {isEv && <Zap className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
                <span>{isEv ? (fleetDict?.electric?.title || localizedActiveCategory?.name || "Electric Vehicles") : (localizedActiveCategory?.name || category?.name)}</span>
              </div>
              <PanelHeading className="mt-3 max-w-md text-2xl font-semibold leading-snug tracking-tight text-brand-ink sm:text-3xl">
                {activeUae.headline}
              </PanelHeading>
              <p className="mt-3 text-sm leading-relaxed text-brand-ink/70">
                {isEv ? (fleetDict?.electric?.introduction || "Explore executive transportation across Dubai and Abu Dhabi.") : category?.description}
              </p>

              <div className="mt-auto border-t border-brand-ink/15 pt-5">
                <p className="text-xs font-semibold text-brand-ink/65">{priceLabel}</p>
                <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  {isEv || activeUae.price === null ? (
                    <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-brand-indigo">
                      {fleetDict?.requestQuote || fleetDict?.electric?.priceValue || "Request a quote"}
                    </p>
                  ) : (
                    <>
                      <p className="text-3xl font-semibold tracking-tight text-brand-indigo">
                        <span dir="ltr">{effectiveCurrency}{(activeUae.price as unknown as number)?.toLocaleString("en-US")}</span>
                      </p>
                      <span className="text-sm text-brand-ink/70">/ {packageLabel}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href={`${effectiveBasePath}/contact?category=${encodeURIComponent(category?.name || "Corporate Fleet")}`}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-indigo px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-indigo"
                >
                  <span>{fleetDict?.enquireVehicle || fleetDict?.enquireCta || "Enquire about this vehicle"}</span>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                </Link>
                <Link
                  href={`${effectiveBasePath}/estimator`}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 px-2 text-sm font-bold text-brand-indigo"
                >
                  <span>{fleetDict?.estimateCta || "Plan a journey"}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================================================
  // INDIA AUTHORITATIVE FLEET RENDERING (Categorization Grid & EV Deep Linking)
  // ==========================================================================
  return (
    <section id="fleet" aria-labelledby={`${id}-title`} className="scroll-mt-24 border-b border-brand-soft-neutral bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">{eyebrow}</p>
            {standalone ? (
              <h1 id={`${id}-title`} className="mt-3 text-4xl font-semibold tracking-tight text-brand-ink sm:text-5xl">{copy.pageTitle}</h1>
            ) : (
              <h2 id={`${id}-title`} className="mt-3 text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl">{title}</h2>
            )}
            <p className="mt-4 text-base leading-relaxed text-brand-ink/70">
              {standalone ? copy.pageDescription : description}
            </p>
          </div>
          {!standalone && (
            <Link
              href={`${effectiveBasePath}/fleet`}
              className="inline-flex min-h-[44px] shrink-0 items-center gap-2 text-sm font-bold text-brand-indigo hover:text-brand-blue transition-colors"
            >
              <span>{viewAll}</span>
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          )}
        </div>

        {/* 5 Filter Tabs with Exact Counts & WCAG Keyboard Navigation */}
        <div
          role="tablist"
          aria-label={tabLabel || "Fleet vehicle categories"}
          className="mb-8 flex flex-wrap gap-2 border-b border-brand-soft-neutral pb-4 sm:gap-3"
        >
          {tabs.map((tab, index) => {
            const isSelected = currentTab === tab.id;
            const isEv = tab.id === "electric";
            return (
              <button
                key={tab.id}
                ref={element => { indiaTabRefs.current[index] = element; }}
                role="tab"
                id={`fleet-tab-${tab.id}`}
                aria-selected={isSelected}
                aria-controls={`fleet-panel-${tab.id}`}
                tabIndex={isSelected ? 0 : -1}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                onKeyDown={event => handleIndiaKeyDown(event, index)}
                className={`inline-flex min-h-[48px] items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-indigo ${
                  isSelected
                    ? "bg-brand-indigo text-white shadow-xs"
                    : "bg-brand-warm-white text-brand-ink/75 hover:bg-brand-soft-neutral/50 hover:text-brand-ink"
                }`}
              >
                {isEv && (
                  <Zap className={`h-4 w-4 shrink-0 ${isSelected ? "text-amber-300" : "text-brand-blue"}`} aria-hidden="true" />
                )}
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-brand-soft-neutral/70 text-brand-ink/70"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Tabpanel: Responsive 10-Vehicle Card Grid */}
        <div
          role="tabpanel"
          id={currentTab === "electric" ? "fleet-panel-electric" : `fleet-panel-${currentTab}`}
          aria-labelledby={`fleet-tab-${currentTab}`}
          tabIndex={0}
          className="scroll-mt-24 sm:scroll-mt-28 focus-visible:outline-none"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredVehicles.map(vehicle => {
              const isEvVehicle = Boolean(vehicle.isElectric);
              return (
                <article
                  key={vehicle.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-brand-soft-neutral bg-brand-warm-white shadow-xs transition-all duration-200 hover:shadow-md"
                >
                  {/* Vehicle Reference Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-soft-neutral/30">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/40 to-transparent p-2.5">
                      <p className="text-[10px] leading-tight text-white/90">
                        Images show vehicle models; actual assigned vehicles may vary.
                      </p>
                    </div>
                  </div>

                  {/* Vehicle Specifications & Quotation Card Body */}
                  <div className="flex flex-1 flex-col p-5">
                    {/* Badges: Cab Type & Fuel Version */}
                    <div className="mb-2.5 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-md border border-brand-soft-neutral bg-white px-2.5 py-0.5 text-xs font-semibold text-brand-ink">
                        {vehicle.cabType}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-xs font-semibold ${
                          isEvVehicle
                            ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                            : "border border-brand-soft-neutral/80 bg-brand-soft-neutral/40 text-brand-ink/80"
                        }`}
                      >
                        {isEvVehicle && <Zap className="h-3 w-3 text-emerald-600" aria-hidden="true" />}
                        <span>{getLocalizedFuel(vehicle.fuelType)}</span>
                      </span>
                    </div>

                    {/* Verbatim Model Name */}
                    <h3 className="text-lg font-bold text-brand-ink">{vehicle.name}</h3>

                    {vehicle.description && (
                      <p className="mt-1.5 text-xs leading-relaxed text-brand-ink/70">
                        {vehicle.description}
                      </p>
                    )}

                    {/* Quotation Pricing Display (Zero Numeric Fabrications) */}
                    <div className="mt-4 border-t border-brand-soft-neutral pt-3">
                      <span className="mb-0.5 block text-[11px] font-semibold uppercase tracking-wider text-brand-ink/60">
                        Pricing
                      </span>
                      <p className="text-xl font-bold tracking-tight text-brand-indigo">
                        {fleetDict?.requestQuote || "Request a quote"}
                      </p>
                    </div>

                    {/* Shared Allocation Disclaimer */}
                    <p className="mt-2 text-[11px] leading-relaxed text-brand-ink/65">
                      {fleetDict?.sharedNote || "Vehicle allocation and pricing are confirmed for your location, dates and requirements."}
                    </p>

                    {/* Direct Contact Action with Vehicle Query Pre-fill */}
                    <div className="mt-5 pt-1">
                      <Link
                        href={`${effectiveBasePath}/contact?vehicle=${encodeURIComponent(vehicle.name)}&category=${encodeURIComponent(vehicle.cabType)}`}
                        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-brand-indigo px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo"
                      >
                        <span>{fleetDict?.enquireVehicle || "Enquire about this vehicle"}</span>
                        <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Section Footnote Disclaimers */}
        <div className="mt-8 border-t border-brand-soft-neutral pt-4">
          <p className="text-xs leading-relaxed text-brand-ink/65">
            {fleetDict?.sharedNote || "Vehicle allocation and pricing are confirmed for your location, dates and requirements."} Images show vehicle models; actual assigned vehicles may vary.
          </p>
        </div>
      </div>
    </section>
  );
}
