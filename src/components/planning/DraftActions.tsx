"use client";

import { useEffect, useState } from "react";
import { Copy, Download, MessageSquare } from "lucide-react";
import type indiaData from "@/content/india.json";
import { planningButton } from "./PlanningField";
import { useLanguage } from "@/i18n/LanguageContext";

export default function DraftActions({ draft, filename, whatsappBaseUrl, copy }: { draft: string; filename: string; whatsappBaseUrl: string; copy: typeof indiaData.planningTools.actions }) {
  const [status, setStatus] = useState("");
  const { dict } = useLanguage();
  const pa = dict.planningActions;

  useEffect(() => { setStatus(""); }, [draft]);

  const whatsappLabel = pa?.whatsapp || copy.whatsapp;
  const copyLabel = pa?.copy || copy.copy;
  const copiedLabel = pa?.copied || copy.copied;
  const downloadLabel = pa?.download || copy.download;

  async function copyDraft() {
    try { await navigator.clipboard.writeText(draft); setStatus(copiedLabel); }
    catch { setStatus(copy.copyFailed); }
  }

  return <div className="space-y-4">
    <a href={`${whatsappBaseUrl}?text=${encodeURIComponent(draft)}`} target="_blank" rel="noopener noreferrer" className={`${planningButton} w-full`}><MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />{whatsappLabel}</a>
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={copyDraft} className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-brand-soft-neutral px-3 py-2 text-sm font-semibold text-brand-indigo hover:bg-brand-warm-white"><Copy className="h-4 w-4 shrink-0" aria-hidden="true" />{copyLabel}</button>
      <a download={filename} href={`data:text/plain;charset=utf-8,${encodeURIComponent(draft)}`} className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-brand-soft-neutral px-3 py-2 text-sm font-semibold text-brand-indigo hover:bg-brand-warm-white"><Download className="h-4 w-4 shrink-0" aria-hidden="true" />{downloadLabel}</a>
    </div>
    {status && <p role="status" className="text-sm font-semibold text-brand-indigo">{status}</p>}
    <p className="text-xs leading-relaxed text-brand-ink/65">{copy.handoff}</p>
  </div>;
}
