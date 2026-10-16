"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MessageSquare, Phone, X } from "lucide-react";
import type indiaData from "@/content/india.json";
import type { ContactData, JourneyFieldsCopy } from "@/types/content";
import { buildEnquiryMessage, canonicalCityName, isValidPassengerCount, isValidTravelDate } from "@/lib/enquiryMessage";
import JourneyFields from "@/components/contact/JourneyFields";
import { useLanguage } from "@/i18n/LanguageContext";

interface Props {
  copy: typeof indiaData.enquiryExperience.assistant;
  planningCopy: JourneyFieldsCopy;
  contact: ContactData;
  companyName: string;
  submitLabel: string;
  services: { slug: string; title: string }[];
  cities: { name: string }[];
}

export default function GuidedEnquiryAssistant({ copy, planningCopy, contact, companyName, submitLabel, services, cities }: Props) {
  const pathname = usePathname();
  const { dict, locale } = useLanguage();
  const effectiveCopy = dict.enquiryAssistant || copy;
  const effectiveSubmitLabel = effectiveCopy.submitLabel || submitLabel;

  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const id = useId();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [attempted, setAttempted] = useState(false);
  const [service, setService] = useState(services[0]?.title || "General Vehicle Enquiry");
  const [city, setCity] = useState(cities[0]?.name || "Other");
  const [customCity, setCustomCity] = useState("");
  const [category, setCategory] = useState("");
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [passengerCount, setPassengerCount] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [requirement, setRequirement] = useState("");

  const cityError = attempted && city === "Other" && !customCity.trim() ? effectiveCopy.errors.city : "";
  const nameError = attempted && !fullName.trim() ? effectiveCopy.errors.name : "";
  const detailsError = attempted && !requirement.trim() ? effectiveCopy.errors.details : "";
  const passengerError = attempted && !isValidPassengerCount(passengerCount) ? effectiveCopy.errors.passengers : "";
  const dateError = attempted && !isValidTravelDate(travelDate) ? effectiveCopy.errors.date : "";
  const draft = buildEnquiryMessage({ companyName, fullName, company, service, city: city === "Other" ? customCity.trim() : city, category, passengerCount, travelDate, requirement, locale });

  useEffect(() => {
    dialogRef.current?.close();
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  useEffect(() => {
    if (open) headingRef.current?.focus();
  }, [open, step]);

  useEffect(() => {
    if (attempted) formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [attempted]);

  function openAssistant() {
    if (!fullName && !requirement && step === 0) {
      const params = new URLSearchParams(window.location.search);
      const requestedService = params.get("service");
      const matchedService = services.find(item => item.slug === requestedService || item.title.toLowerCase() === requestedService?.toLowerCase());
      if (matchedService) setService(matchedService.title);
      const requestedCity = params.get("city");
      if (requestedCity) {
        const matchedCity = cities.find(item => canonicalCityName(item.name) === canonicalCityName(requestedCity));
        setCity(matchedCity?.name || "Other");
        setCustomCity(matchedCity || requestedCity.toLowerCase() === "other" ? "" : requestedCity);
      }
      setCategory(params.get("category") || "");
    }
    dialogRef.current?.showModal();
    setOpen(true);
  }

  function closeAssistant() {
    dialogRef.current?.close();
  }

  function next(event: React.FormEvent) {
    event.preventDefault();
    const invalid = step === 0
      ? city === "Other" && !customCity.trim()
      : !fullName.trim() || !requirement.trim() || !isValidPassengerCount(passengerCount) || !isValidTravelDate(travelDate);
    if (invalid) {
      setAttempted(true);
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }
    setAttempted(false);
    setStep(current => Math.min(2, current + 1));
  }

  function restart() {
    setService(services[0]?.title || "General Vehicle Enquiry");
    setCity(cities[0]?.name || "Other");
    setCustomCity(""); setCategory(""); setFullName(""); setCompany("");
    setPassengerCount(""); setTravelDate(""); setRequirement("");
    setAttempted(false); setStep(0);
  }

  const fieldStyle = "w-full min-w-0 min-h-[48px] rounded-xl border border-brand-soft-neutral bg-white px-3 py-3 text-base text-brand-ink outline-none focus:ring-2 focus:ring-brand-indigo";
  const labelStyle = "mb-2 block text-sm font-bold text-brand-ink";

  return (
    <>
      <button ref={triggerRef} type="button" onClick={openAssistant} aria-haspopup="dialog" aria-expanded={open} aria-controls={`${id}-dialog`} className="fixed bottom-4 right-4 z-40 inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/30 bg-brand-indigo px-4 py-3 text-sm font-bold text-white shadow-lg hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-indigo sm:bottom-6 sm:right-6">
        <MessageSquare className="h-5 w-5" aria-hidden="true" /><span>{effectiveCopy.trigger}</span>
      </button>
      <dialog ref={dialogRef} id={`${id}-dialog`} aria-labelledby={`${id}-title`} aria-describedby={`${id}-intro`} onClose={() => { setOpen(false); triggerRef.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) closeAssistant(); }} className="fixed bottom-3 left-auto right-3 top-auto m-0 max-h-[calc(100dvh-1.5rem)] w-[calc(100vw-1.5rem)] max-w-[460px] overflow-y-auto overscroll-contain rounded-2xl border border-brand-soft-neutral bg-white p-0 text-brand-ink shadow-2xl backdrop:bg-brand-ink/50 sm:bottom-6 sm:right-6">
        <div>
          <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-brand-soft-neutral bg-brand-ink p-5 text-white">
            <div><h2 id={`${id}-title`} className="text-lg font-extrabold">{effectiveCopy.title}</h2><p id={`${id}-intro`} className="mt-1 text-sm text-white/75">{effectiveCopy.intro}</p></div>
            <button type="button" onClick={closeAssistant} aria-label={effectiveCopy.close} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><X className="h-5 w-5" aria-hidden="true" /></button>
          </div>
          <div className="p-5 sm:p-6">
            <p aria-live="polite" className="text-xs font-bold uppercase tracking-widest text-brand-blue">Step {step + 1} of 3</p>
            <div aria-hidden="true" className="mb-5 mt-3 flex gap-2">{[0, 1, 2].map(index => <span key={index} className={`h-1 flex-1 rounded-full ${index <= step ? "bg-brand-indigo" : "bg-brand-soft-neutral"}`} />)}</div>
            <h3 ref={headingRef} tabIndex={-1} className="mb-5 text-xl font-extrabold tracking-tight outline-none">{effectiveCopy.stepTitles[step]}</h3>
            {step < 2 ? (
              <form ref={formRef} onSubmit={next} noValidate className="space-y-5">
                {step === 0 ? (
                  <>
                    <div><label htmlFor={`${id}-service`} className={labelStyle}>{effectiveCopy.serviceLabel}</label><select id={`${id}-service`} value={service} onChange={event => { setService(event.target.value); setCategory(""); }} className={fieldStyle}>{services.map(item => <option key={item.slug} value={item.title}>{item.title}</option>)}</select></div>
                    <div><label htmlFor={`${id}-city`} className={labelStyle}>{effectiveCopy.cityLabel}</label><select id={`${id}-city`} value={city} onChange={event => setCity(event.target.value)} className={fieldStyle}>{cities.map(item => <option key={item.name}>{item.name}</option>)}<option value="Other">{effectiveCopy.otherCity}</option></select></div>
                    {city === "Other" && <div><label htmlFor={`${id}-custom-city`} className={labelStyle}>{effectiveCopy.customCityLabel}</label><input id={`${id}-custom-city`} required value={customCity} onChange={event => setCustomCity(event.target.value)} aria-invalid={!!cityError} aria-describedby={cityError ? `${id}-city-error` : undefined} className={fieldStyle} />{cityError && <p id={`${id}-city-error`} role="alert" className="mt-2 text-sm text-red-700">{cityError}</p>}</div>}
                  </>
                ) : (
                  <>
                    <div><label htmlFor={`${id}-name`} className={labelStyle}>{effectiveCopy.nameLabel}</label><input id={`${id}-name`} autoComplete="name" required value={fullName} onChange={event => setFullName(event.target.value)} aria-invalid={!!nameError} aria-describedby={nameError ? `${id}-name-error` : undefined} className={fieldStyle} />{nameError && <p id={`${id}-name-error`} role="alert" className="mt-2 text-sm text-red-700">{nameError}</p>}</div>
                    <div><label htmlFor={`${id}-company`} className={labelStyle}>{effectiveCopy.companyLabel}</label><input id={`${id}-company`} autoComplete="organization" value={company} onChange={event => setCompany(event.target.value)} className={fieldStyle} /></div>
                    <JourneyFields copy={planningCopy} passengerCount={passengerCount} travelDate={travelDate} onPassengerChange={setPassengerCount} onDateChange={setTravelDate} passengerError={passengerError} dateError={dateError} />
                    <div><label htmlFor={`${id}-details`} className={labelStyle}>{effectiveCopy.detailsLabel}</label><textarea id={`${id}-details`} rows={3} required value={requirement} onChange={event => setRequirement(event.target.value)} placeholder={effectiveCopy.detailsPlaceholder} aria-invalid={!!detailsError} aria-describedby={detailsError ? `${id}-details-error` : undefined} className={fieldStyle} />{detailsError && <p id={`${id}-details-error`} role="alert" className="mt-2 text-sm text-red-700">{detailsError}</p>}</div>
                  </>
                )}
                <div className="flex items-center justify-between gap-3">
                  {step > 0 && <button type="button" onClick={() => { setStep(step - 1); setAttempted(false); }} className="inline-flex min-h-[48px] items-center gap-1 rounded-xl px-3 font-bold text-brand-indigo hover:bg-brand-warm-white"><ArrowLeft className="h-4 w-4" aria-hidden="true" />{effectiveCopy.back}</button>}
                  <button type="submit" className="ml-auto inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-indigo px-6 py-3 text-sm font-bold text-white hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo">{effectiveCopy.next}<ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
                </div>
              </form>
            ) : (
              <div className="space-y-5">
                <p className="text-sm text-brand-ink/75">{copy.reviewHelp}</p>
                <pre className="whitespace-pre-wrap break-words rounded-xl border border-brand-soft-neutral bg-brand-warm-white p-4 font-sans text-sm leading-relaxed">{draft}</pre>
                <p className="text-sm leading-relaxed text-brand-ink/75">{effectiveCopy.disclaimer || copy.handoffHelp}</p>
                <a href={`${contact.whatsappBaseUrl}?text=${encodeURIComponent(draft)}`} target="_blank" rel="noopener noreferrer" className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-indigo px-4 py-3 text-sm font-bold text-white hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo"><MessageSquare className="h-4 w-4" aria-hidden="true" />{effectiveSubmitLabel}</a>
                <div className="flex justify-between gap-3"><button type="button" onClick={() => { setStep(1); setAttempted(false); }} className="min-h-[44px] rounded-lg px-3 text-sm font-bold text-brand-indigo hover:bg-brand-warm-white">{effectiveCopy.back}</button><button type="button" onClick={restart} className="min-h-[44px] rounded-lg px-3 text-sm font-semibold text-brand-ink/70 hover:bg-brand-warm-white">{effectiveCopy.restart}</button></div>
              </div>
            )}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-brand-soft-neutral pt-4 text-sm">
              <Link href="/india/contact" onClick={closeAssistant} className="inline-flex min-h-[44px] items-center font-semibold text-brand-indigo underline underline-offset-4">{effectiveCopy.fullForm}</Link>
              <a href={contact.phoneHref} className="inline-flex min-h-[44px] items-center gap-1 font-semibold text-brand-indigo"><Phone className="h-4 w-4" aria-hidden="true" />{copy.callLabel}</a>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
