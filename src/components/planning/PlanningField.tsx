import type { ReactNode } from "react";

export const planningInput = "min-h-[48px] w-full min-w-0 rounded-xl border border-brand-soft-neutral bg-white px-3.5 py-3 text-base text-brand-ink outline-none focus:border-brand-indigo focus:ring-2 focus:ring-brand-indigo/20";
export const planningButton = "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-indigo px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-indigo";

export default function PlanningField({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: ReactNode }) {
  return <div className="min-w-0"><label htmlFor={id} className="mb-2 block text-sm font-bold text-brand-ink">{label}</label>{children}{hint && <p id={`${id}-hint`} className="mt-2 text-xs leading-relaxed text-brand-ink/65">{hint}</p>}{error && <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-red-700">{error}</p>}</div>;
}
