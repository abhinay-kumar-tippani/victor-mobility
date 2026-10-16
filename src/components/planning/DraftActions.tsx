"use client";

import { useEffect, useState } from "react";
import { Copy, Download, MessageSquare } from "lucide-react";
import type indiaData from "@/content/india.json";
import { planningButton } from "./PlanningField";

export default function DraftActions({ draft, filename, whatsappBaseUrl, copy }: { draft: string; filename: string; whatsappBaseUrl: string; copy: typeof indiaData.planningTools.actions }) {
  const [status, setStatus] = useState("");
  useEffect(() => { setStatus(""); }, [draft]);
  async function copyDraft() {
    try { await navigator.clipboard.writeText(draft); setStatus(copy.copied); }
    catch { setStatus(copy.copyFailed); }
  }
  return <div className="space-y-4">
    <a href={`${whatsappBaseUrl}?text=${encodeURIComponent(draft)}`} target="_blank" rel="noopener noreferrer" className={`${planningButton} w-full`}><MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />{copy.whatsapp}</a>
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={copyDraft} className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-brand-soft-neutral px-3 py-2 text-sm font-semibold text-brand-indigo hover:bg-brand-warm-white"><Copy className="h-4 w-4 shrink-0" aria-hidden="true" />{copy.copy}</button>
      <a download={filename} href={`data:text/plain;charset=utf-8,${encodeURIComponent(draft)}`} className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-brand-soft-neutral px-3 py-2 text-sm font-semibold text-brand-indigo hover:bg-brand-warm-white"><Download className="h-4 w-4 shrink-0" aria-hidden="true" />{copy.download}</a>
    </div>
    <p role="status" className="text-sm text-brand-indigo">{status}</p>
    <p className="text-xs leading-relaxed text-brand-ink/65">{copy.handoff}</p>
  </div>;
}
