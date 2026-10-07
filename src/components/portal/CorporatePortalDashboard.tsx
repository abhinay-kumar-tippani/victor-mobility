"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";
import portalData from "@/content/portal.json";

export default function CorporatePortalDashboard({ region }: { region: "india" | "uae" }) {
  const [view, setView] = useState<"rosters" | "sla" | "billing">("rosters");
  const [shiftIndex, setShiftIndex] = useState(0);
  const panelId = useId();
  const sample = portalData;
  const shift = sample.shifts[shiftIndex];
  const views = [{ id: "rosters", label: "Example roster" }, { id: "sla", label: "Example scorecard" }, { id: "billing", label: "Example statement" }] as const;

  const statementText = [sample.downloadNotice, "", "Victor Mobility — portal demonstration", "On Time Every Time.", "Account: Example company (fictional)", "", ...sample.statement.map(row => `${row.label}: ${row.value}`), "", sample.notice].join("\n");

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-brand-indigo p-6 sm:p-8 text-white">
        <p className="text-sm font-bold uppercase tracking-wider">{sample.label}</p>
        <h2 className="mt-3 text-2xl font-bold">Example company</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-white/90">{sample.notice}</p>
      </div>
      <div role="group" aria-label="Choose a demonstration view" className="flex flex-wrap gap-2">
        {views.map(item => <button key={item.id} type="button" aria-pressed={view === item.id} aria-controls={panelId} onClick={() => setView(item.id)} className={`min-h-[44px] rounded-lg px-4 py-3 text-sm font-semibold ${view === item.id ? "bg-brand-indigo text-white" : "border border-brand-soft-neutral bg-white text-brand-indigo"}`}>{item.label}</button>)}
      </div>
      <section id={panelId} aria-label={views.find(item => item.id === view)?.label} className="rounded-2xl border border-brand-soft-neutral bg-white p-5 sm:p-8">
        <p className="mb-6 text-sm font-semibold text-brand-blue">Fictional example • no live data</p>
        {view === "rosters" && <div className="space-y-6">
          <h3 className="text-2xl font-bold text-brand-ink">Shift roster demonstration</h3>
          <div role="group" aria-label="Choose an example shift" className="flex flex-wrap gap-2">
            {sample.shifts.map((item, index) => <button key={item.name} type="button" aria-pressed={index === shiftIndex} onClick={() => setShiftIndex(index)} className={`min-h-[44px] rounded-lg border px-4 py-2 text-sm ${index === shiftIndex ? "border-brand-indigo bg-brand-indigo text-white" : "border-brand-soft-neutral text-brand-indigo"}`}>{item.name}</button>)}
          </div>
          <div className="rounded-xl bg-brand-warm-white p-5">
            <h4 className="font-bold text-brand-indigo">{shift.name}</h4>
            <p className="mt-2 text-brand-slate">{shift.description}</p>
            <ol className="mt-5 space-y-3">{shift.stops.map((stop, index) => <li key={stop} className="flex gap-3 text-brand-ink"><span className="font-bold text-brand-blue">{index + 1}.</span>{stop}</li>)}</ol>
          </div>
          <p className="text-sm leading-relaxed text-brand-slate">Vehicles, chauffeurs and locations have not been assigned. This example does not track a journey or change a roster.</p>
        </div>}
        {view === "sla" && <div className="space-y-6">
          <h3 className="text-2xl font-bold text-brand-ink">Example reporting fields</h3>
          <div className="grid gap-4 sm:grid-cols-2">{sample.metrics.map(metric => <div key={metric.label} className="rounded-xl border border-brand-soft-neutral p-5"><h4 className="font-bold text-brand-indigo">{metric.label}</h4><p className="mt-2 text-brand-slate">{metric.description}</p><p className="mt-4 text-sm font-semibold text-brand-blue">No measured data</p></div>)}</div>
          <p className="text-sm leading-relaxed text-brand-slate">Reporting requirements and service commitments must be agreed with the team. These examples are not Victor performance results or guarantees.</p>
        </div>}
        {view === "billing" && <div className="space-y-6">
          <h3 className="text-2xl font-bold text-brand-ink">Sample statement layout</h3>
          <p className="text-sm font-semibold text-brand-blue">{sample.downloadNotice}</p>
          <dl className="divide-y divide-brand-soft-neutral">{sample.statement.map(row => <div key={row.label} className="grid gap-2 py-4 sm:grid-cols-2"><dt className="font-semibold text-brand-ink">{row.label}</dt><dd className="text-brand-slate">{row.value}</dd></div>)}</dl>
          <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(statementText)}`} download={`DEMO-victor-${region}-sample-statement.txt`} className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-brand-indigo px-5 py-3 font-semibold text-white"><Download className="h-4 w-4" aria-hidden="true" />Download sample statement</a>
        </div>}
      </section>
      <div className="flex flex-col gap-5 rounded-2xl border border-brand-soft-neutral p-6 sm:flex-row sm:items-center sm:justify-between">
        <div><h3 className="font-bold text-brand-ink">Discuss your reporting requirements</h3><p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-slate">Tell the team which capabilities you need. Availability and arrangements will be confirmed separately.</p></div>
        <Link href={`/${region}/contact`} className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-indigo px-5 py-3 font-semibold text-white">Discuss requirements <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      </div>
    </div>
  );
}
