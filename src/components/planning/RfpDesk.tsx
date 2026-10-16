"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, FileText } from "lucide-react";
import type indiaData from "@/content/india.json";
import { isValidPassengerCount, isValidTravelDate } from "@/lib/enquiryMessage";
import Field, { planningButton, planningInput } from "./PlanningField";
import DraftActions from "./DraftActions";

interface Props {
  copy: typeof indiaData.planningTools.rfp;
  actions: typeof indiaData.planningTools.actions;
  cities: string[];
  services: string[];
  vehicles: string[];
  whatsappBaseUrl: string;
  companyName: string;
}

export default function RfpDesk({ copy, actions, cities, services, vehicles, whatsappBaseUrl, companyName }: Props) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({ company: "", name: "", role: "", email: "", phone: "", city: cities[0] || "Other", customCity: "", service: services[0] || "", passengers: "", date: "", schedule: copy.scheduleOptions[0], details: "" });
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validationAttempt, setValidationAttempt] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const previousStep = useRef(step);
  useEffect(() => { if (previousStep.current !== step) { headingRef.current?.focus(); previousStep.current = step; } }, [step]);
  useEffect(() => { if (validationAttempt) formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(); }, [validationAttempt]);
  function update(key: keyof typeof values, value: string) { setValues(current => ({ ...current, [key]: value })); setErrors(current => ({ ...current, [key]: "" })); }
  function changeStep(next: number) { setErrors({}); setStep(next); }
  function next(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (step === 0) {
      if (!values.company.trim()) nextErrors.company = copy.errors.company;
      if (!values.name.trim()) nextErrors.name = copy.errors.name;
      if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) nextErrors.email = copy.errors.email;
    } else {
      if (values.city === "Other" && !values.customCity.trim()) nextErrors.customCity = copy.errors.city;
      if (!isValidPassengerCount(values.passengers)) nextErrors.passengers = copy.errors.passengers;
      if (!isValidTravelDate(values.date)) nextErrors.date = copy.errors.date;
      if (!values.details.trim()) nextErrors.details = copy.errors.details;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) setValidationAttempt(current => current + 1);
    if (!Object.keys(nextErrors).length) changeStep(step + 1);
  }
  const draft = [copy.summaryTitle, companyName, "", `${copy.company}: ${values.company.trim()}`, `${copy.name}: ${values.name.trim()}`, ...(values.role.trim() ? [`Role: ${values.role.trim()}`] : []), ...(values.email.trim() ? [`Email: ${values.email.trim()}`] : []), ...(values.phone.trim() ? [`Phone: ${values.phone.trim()}`] : []), "", `${copy.service}: ${values.service}`, `${copy.city}: ${values.city === "Other" ? values.customCity.trim() : values.city}`, `Passengers per day: ${values.passengers || copy.notSpecified}`, `Target start date: ${values.date || copy.notSpecified}`, `${copy.schedule}: ${values.schedule}`, `Preferred vehicles: ${selectedVehicles.length ? selectedVehicles.join(", ") : copy.notSpecified}`, "", `${copy.details}:`, values.details.trim(), "", "Please discuss suitable vehicles, availability, pricing and terms with us. This brief is a request for a proposal, not a confirmed booking."].join("\n");
  const input = (key: "company" | "name" | "role" | "email" | "phone" | "customCity" | "passengers" | "date", type = "text", required = false) => <Field id={`rfp-${key}`} label={copy[key]} error={errors[key]}><input id={`rfp-${key}`} type={type} value={values[key]} required={required} autoComplete={key === "company" ? "organization" : key === "name" ? "name" : key === "email" ? "email" : key === "phone" ? "tel" : undefined} min={type === "number" ? "1" : undefined} step={type === "number" ? "1" : undefined} onChange={event => update(key, event.target.value)} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `rfp-${key}-error` : undefined} className={planningInput} /></Field>;
  return <div className="grid items-start gap-7 lg:grid-cols-12">
    <aside className="rounded-2xl bg-brand-ink p-6 text-white sm:p-8 lg:col-span-4">
      <FileText className="mb-5 h-7 w-7 text-white/60" aria-hidden="true" /><h2 className="text-2xl font-bold tracking-tight">{copy.sideTitle}</h2><p className="mt-4 text-sm leading-relaxed text-white/70">{copy.sideDescription}</p>
      <ol aria-label="RFP progress" className="mt-8 space-y-5">{copy.steps.map((label, index) => <li key={label} aria-current={step === index ? "step" : undefined} className="flex items-center gap-3 text-sm"><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${step === index ? "border-white bg-white text-brand-indigo" : "border-white/25 text-white/60"}`}>{step > index ? <Check className="h-4 w-4" aria-hidden="true" /> : `0${index + 1}`}</span><span className={step === index ? "font-bold text-white" : "text-white/65"}>{label}</span></li>)}</ol>
      <ul className="mt-8 space-y-3 border-t border-white/15 pt-6 text-xs text-white/65">{copy.sideItems.map(item => <li key={item} className="flex items-start gap-2"><Check className="h-4 w-4 shrink-0" aria-hidden="true" />{item}</li>)}</ul>
    </aside>
    <div className="min-w-0 rounded-2xl border border-brand-soft-neutral bg-white p-5 sm:p-8 lg:col-span-8">
      <p aria-live="polite" className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-blue">Step {step + 1} / 3</p><h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold tracking-tight text-brand-ink outline-none">{copy.steps[step]}</h2><p className="mb-7 mt-3 text-sm leading-relaxed text-brand-ink/65">{step === 0 ? copy.intro : step === 1 ? copy.requirementsHelp : copy.reviewHelp}</p>
      {step < 2 ? <form ref={formRef} onSubmit={next} noValidate className="space-y-6">
        {step === 0 ? <>{input("company", "text", true)}<div className="grid gap-5 sm:grid-cols-2">{input("name", "text", true)}{input("role")}</div><div className="grid gap-5 sm:grid-cols-2">{input("email", "email")}{input("phone", "tel")}</div></> : <>
          <div className="grid gap-5 sm:grid-cols-2"><Field id="rfp-service" label={copy.service}><select id="rfp-service" value={values.service} onChange={event => update("service", event.target.value)} className={planningInput}>{services.map(service => <option key={service}>{service}</option>)}</select></Field><Field id="rfp-city" label={copy.city}><select id="rfp-city" value={values.city} onChange={event => update("city", event.target.value)} className={planningInput}>{cities.map(city => <option key={city}>{city}</option>)}<option value="Other">Other city / inter-city</option></select></Field></div>
          {values.city === "Other" && input("customCity", "text", true)}
          <div className="grid gap-5 sm:grid-cols-2">{input("passengers", "number")}{input("date", "date")}</div>
          <Field id="rfp-schedule" label={copy.schedule}><select id="rfp-schedule" value={values.schedule} onChange={event => update("schedule", event.target.value)} className={planningInput}>{copy.scheduleOptions.map(schedule => <option key={schedule}>{schedule}</option>)}</select></Field>
          <fieldset><legend className="mb-2 text-sm font-bold text-brand-ink">{copy.vehicles}</legend><p className="mb-3 text-xs leading-relaxed text-brand-ink/65">{copy.vehicleHelp}</p><div className="grid gap-3 sm:grid-cols-2">{vehicles.map(vehicle => <label key={vehicle} className={`flex min-h-[52px] cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm font-semibold ${selectedVehicles.includes(vehicle) ? "border-brand-indigo bg-brand-indigo/5 text-brand-indigo" : "border-brand-soft-neutral text-brand-ink"}`}><input type="checkbox" checked={selectedVehicles.includes(vehicle)} onChange={event => setSelectedVehicles(current => event.target.checked ? [...current, vehicle] : current.filter(value => value !== vehicle))} className="h-4 w-4 shrink-0 accent-brand-indigo" />{vehicle}</label>)}</div></fieldset>
          <Field id="rfp-details" label={copy.details} error={errors.details}><textarea id="rfp-details" rows={5} required value={values.details} onChange={event => update("details", event.target.value)} placeholder={copy.detailsPlaceholder} aria-invalid={!!errors.details} aria-describedby={errors.details ? "rfp-details-error" : undefined} className={planningInput} /></Field>
        </>}
        <div className="flex flex-wrap justify-between gap-3 border-t border-brand-soft-neutral pt-6">{step > 0 && <button type="button" onClick={() => changeStep(step - 1)} className="inline-flex min-h-[48px] items-center gap-2 rounded-xl px-4 text-sm font-bold text-brand-indigo hover:bg-brand-warm-white"><ArrowLeft className="h-4 w-4" aria-hidden="true" />{copy.back}</button>}<button type="submit" className={`${planningButton} ml-auto`}>{step === 0 ? copy.continue : copy.review}<ArrowRight className="h-4 w-4" aria-hidden="true" /></button></div>
      </form> : <div className="space-y-6"><pre aria-label="RFP brief preview" className="whitespace-pre-wrap break-words rounded-xl border border-brand-soft-neutral bg-brand-warm-white p-4 font-sans text-sm leading-relaxed text-brand-ink sm:p-6">{draft}</pre><div className="flex flex-wrap gap-3"><button type="button" onClick={() => changeStep(0)} className="min-h-[44px] rounded-lg px-3 text-sm font-bold text-brand-indigo hover:bg-brand-warm-white">{copy.companyEdit}</button><button type="button" onClick={() => changeStep(1)} className="min-h-[44px] rounded-lg px-3 text-sm font-bold text-brand-indigo hover:bg-brand-warm-white">{copy.edit}</button></div><DraftActions draft={draft} filename="victor-corporate-rfp.txt" whatsappBaseUrl={whatsappBaseUrl} copy={actions} /></div>}
    </div>
  </div>;
}
