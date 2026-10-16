"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, Route } from "lucide-react";
import type indiaData from "@/content/india.json";
import { calculateJourney } from "@/lib/journeyEstimate";
import Field, { planningInput, planningButton } from "./PlanningField";
import DraftActions from "./DraftActions";

type Props = { copy: typeof indiaData.planningTools.estimator; actions: typeof indiaData.planningTools.actions; cities: string[]; whatsappBaseUrl: string; companyName: string };
const number = (value: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(value);

export default function JourneyEstimator({ copy, actions, cities, whatsappBaseUrl, companyName }: Props) {
  const [values, setValues] = useState({ city: cities[0] || "Other", pickup: "", dropoff: "", passengers: "", seats: "", distance: "", days: "1", rate: "", returnTrip: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [calculated, setCalculated] = useState(false);
  const [validationAttempt, setValidationAttempt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const calculation = calculateJourney(values);
  const result = calculated ? calculation.result : null;
  useEffect(() => { if (validationAttempt) formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(); }, [validationAttempt]);
  useEffect(() => { if (calculated) resultRef.current?.focus(); }, [calculated]);
  function update(key: string, value: string | boolean) { setValues(current => ({ ...current, [key]: value })); setCalculated(false); setErrors(current => ({ ...current, [key]: "" })); }
  function calculate(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    for (const key of calculation.errors) nextErrors[key] = copy.errors[key as keyof typeof copy.errors];
    if (!values.pickup.trim()) nextErrors.pickup = copy.errors.pickup;
    if (!values.dropoff.trim()) nextErrors.dropoff = copy.errors.dropoff;
    setErrors(nextErrors); setCalculated(Object.keys(nextErrors).length === 0);
    if (Object.keys(nextErrors).length) setValidationAttempt(current => current + 1);
  }
  const draft = result ? [copy.summaryTitle, companyName, "", `City: ${values.city === "Other" ? "Inter-city / other" : values.city}`, `Route: ${values.pickup.trim()} → ${values.dropoff.trim()}`, `Passengers travelling together: ${values.passengers}`, `Passenger seats per vehicle (planning input): ${values.seats}`, `Vehicles per journey: ${result.vehicles}`, `One-way distance per vehicle: ${values.distance} km`, `Journeys per vehicle per day: ${result.legs}`, `Travel days: ${values.days}`, `Total vehicle kilometres: ${number(result.vehicleKm)} km`, ...(result.budget !== null ? [`Customer-entered planning rate: INR ${values.rate} / vehicle / km`, `Calculated planning budget: INR ${number(result.budget)}`] : ["Rate: please quote"]), "", copy.exclusions, "Please discuss suitable vehicles, availability and a formal quotation with me."].join("\n") : "";
  const input = (key: "pickup" | "dropoff" | "passengers" | "seats" | "distance" | "days" | "rate", type = "text", hint?: string) => <Field id={`estimate-${key}`} label={copy[key]} error={errors[key]} hint={hint}><input id={`estimate-${key}`} type={type} value={values[key]} onChange={event => update(key, event.target.value)} min={type === "number" ? (key === "distance" || key === "rate" ? "0.01" : "1") : undefined} step={type === "number" ? (key === "distance" || key === "rate" ? "any" : "1") : undefined} required={key !== "rate"} inputMode={type === "number" ? "decimal" : undefined} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `estimate-${key}-error` : hint ? `estimate-${key}-hint` : undefined} className={planningInput} /></Field>;
  return <div className="grid items-start gap-7 lg:grid-cols-12">
    <form ref={formRef} onSubmit={calculate} noValidate className="min-w-0 rounded-2xl border border-brand-soft-neutral bg-white p-5 sm:p-8 lg:col-span-7">
      <h2 className="text-2xl font-bold tracking-tight text-brand-ink">{copy.formTitle}</h2><p className="mb-7 mt-2 text-sm leading-relaxed text-brand-ink/65">{copy.formHelp}</p>
      <div className="space-y-6">
        <Field id="estimate-city" label={copy.city}><select id="estimate-city" value={values.city} onChange={event => update("city", event.target.value)} className={planningInput}>{cities.map(city => <option key={city}>{city}</option>)}<option value="Other">{copy.otherCity}</option></select></Field>
        <div className="grid gap-5 sm:grid-cols-2">{input("pickup")}{input("dropoff")}</div>
        <div className="grid gap-5 sm:grid-cols-2">{input("passengers", "number")}{input("seats", "number", copy.capacityHelp)}</div>
        <div className="grid gap-5 sm:grid-cols-2">{input("distance", "number")}{input("days", "number")}</div>
        <label className="flex min-h-[48px] cursor-pointer items-center gap-3 rounded-xl bg-brand-warm-white p-4 text-sm font-semibold text-brand-ink"><input type="checkbox" checked={values.returnTrip} onChange={event => update("returnTrip", event.target.checked)} className="h-5 w-5 shrink-0 accent-brand-indigo" />{copy.returnTrip}</label>
        {input("rate", "number", copy.rateHelp)}
        {errors.total && <p role="alert" className="text-sm text-red-700">{errors.total}</p>}
        <button type="submit" className={`${planningButton} w-full sm:w-auto`}><Calculator className="h-4 w-4" aria-hidden="true" />{copy.calculate}</button>
      </div>
    </form>
    <aside className="min-w-0 overflow-hidden rounded-2xl border border-brand-soft-neutral bg-white lg:sticky lg:top-24 lg:col-span-5">
      <div className="bg-brand-ink p-6 text-white sm:p-8"><Route className="mb-5 h-7 w-7 text-white/65" aria-hidden="true" /><h2 ref={resultRef} tabIndex={-1} className="text-2xl font-bold tracking-tight outline-none">{result ? copy.resultTitle : copy.emptyTitle}</h2>
        {result ? <dl className="mt-6 grid grid-cols-2 gap-5"><div><dt className="text-xs leading-relaxed text-white/65">{copy.vehicleLabel}</dt><dd className="mt-2 text-4xl font-semibold">{number(result.vehicles)}</dd></div><div><dt className="text-xs leading-relaxed text-white/65">{copy.distanceLabel}</dt><dd className="mt-2 break-words text-3xl font-semibold">{number(result.vehicleKm)}</dd></div><div className="col-span-2 border-t border-white/15 pt-5"><dt className="text-xs text-white/65">{copy.budgetLabel}</dt><dd className="mt-2 break-words text-3xl font-semibold">{result.budget === null ? "—" : `₹${number(result.budget)}`}</dd>{result.budget === null && <p className="mt-3 text-sm leading-relaxed text-white/75">{copy.noRate}</p>}</div></dl> : <p className="mt-4 text-sm leading-relaxed text-white/70">{copy.emptyHelp}</p>}
      </div>
      <div className="space-y-6 p-6 sm:p-8">
        {result && <><div><h3 className="text-sm font-bold text-brand-ink">{copy.basisTitle}</h3><p className="mt-2 text-sm leading-relaxed text-brand-ink/70">{values.passengers} ÷ {values.seats} → {result.vehicles} vehicles<br />{result.vehicles} × {values.distance} km × {result.legs} × {values.days} days = {number(result.vehicleKm)} vehicle km</p><p className="mt-2 text-xs leading-relaxed text-brand-ink/65">{copy.basisHelp}</p></div><p className="text-xs leading-relaxed text-brand-ink/65">{copy.exclusions}</p><details><summary className="cursor-pointer py-3 text-sm font-bold text-brand-indigo">{copy.review}</summary><pre className="whitespace-pre-wrap break-words rounded-xl bg-brand-warm-white p-4 font-sans text-xs leading-relaxed">{draft}</pre></details><DraftActions draft={draft} filename="victor-journey-estimate.txt" whatsappBaseUrl={whatsappBaseUrl} copy={actions} /></>}
        <Link href="/india/rfp" className="inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-brand-indigo">{copy.rfpLink}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>
      </div>
    </aside>
  </div>;
}
