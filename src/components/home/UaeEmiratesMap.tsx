"use client";

import { useId, useState } from "react";
import { Check, Compass } from "lucide-react";
import geography from "../../../public/maps/uae-emirates.json";
import indiaData from "@/content/india.json";
import { useLanguage } from "@/i18n/LanguageContext";

const highlighted = ["AE-DU", "AE-AZ", "AE-SH"];
type EmirateId = keyof typeof indiaData.uaePresenceMap.en.names;

export default function UaeEmiratesMap({ selectedCity, onSelect, panelId }: {
  selectedCity: string;
  onSelect: (city: string) => void;
  panelId: string;
}) {
  const { locale } = useLanguage();
  const copy = indiaData.uaePresenceMap[locale === "ar" ? "ar" : "en"];
  const [hovered, setHovered] = useState<string | null>(null);
  const titleId = useId();
  const descriptionId = useId();
  const selected = geography.emirates.find(emirate => emirate.name === selectedCity)!;
  const inspected = geography.emirates.find(emirate => emirate.id === hovered) || selected;

  return (
    <div className="overflow-hidden rounded-3xl border border-brand-soft-neutral bg-brand-warm-white">
      <div className="flex items-start gap-3 border-b border-brand-soft-neutral px-5 py-5 sm:px-7">
        <Compass className="mt-0.5 h-5 w-5 shrink-0 text-brand-indigo" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-brand-ink">{copy.title}</h3>
          <p className="mt-1 text-xs text-brand-ink/65">{copy.summary}</p>
        </div>
        <div className="shrink-0 text-end text-sm font-bold text-brand-indigo">
          {copy.names[inspected.id as EmirateId]}
          <span className="mt-1 block text-[11px] font-medium text-brand-ink/65">
            {inspected.name === selectedCity ? copy.selected : highlighted.includes(inspected.id) ? copy.highlighted : copy.other}
          </span>
        </div>
      </div>
      <div className="relative px-2 pt-3 sm:px-4">
        <svg viewBox={geography.viewBox} role="group" aria-labelledby={titleId} aria-describedby={descriptionId} className="mx-auto h-auto w-full max-w-[640px]" style={{ direction: "ltr" }}>
          <title id={titleId}>{copy.title}</title>
          <desc id={descriptionId}>{copy.description}</desc>
          {geography.emirates.map(emirate => {
            const active = highlighted.includes(emirate.id);
            const isSelected = selectedCity === emirate.name;
            const name = copy.names[emirate.id as EmirateId];
            return (
              <path
                key={emirate.id}
                data-emirate={emirate.id}
                data-highlighted={active}
                d={emirate.path}
                fill={active ? (hovered === emirate.id ? "#6E57A0" : isSelected ? "#2D5090" : "#31326F") : "#E2E5EC"}
                stroke="#FFFFFF"
                strokeWidth={1.1}
                fillRule="evenodd"
                role={active ? "button" : undefined}
                tabIndex={active ? 0 : undefined}
                aria-label={active ? name : undefined}
                aria-pressed={active ? isSelected : undefined}
                aria-controls={active ? panelId : undefined}
                onPointerEnter={() => setHovered(emirate.id)}
                onPointerLeave={() => setHovered(null)}
                onFocus={() => setHovered(emirate.id)}
                onBlur={() => setHovered(null)}
                onClick={active ? () => onSelect(emirate.name) : undefined}
                onKeyDown={active ? event => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelect(emirate.name);
                  }
                } : undefined}
                className={active ? "cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:stroke-brand-violet focus-visible:stroke-[3]" : "transition-colors duration-150"}
              >
                <title>{name}</title>
              </path>
            );
          })}
        </svg>
      </div>
      <div className="space-y-4 px-5 pb-5 sm:px-7">
        <p className="text-xs leading-relaxed text-brand-ink/70">{copy.hint}</p>
        <div role="group" aria-label={copy.highlighted} className="grid grid-cols-1 gap-2 min-[360px]:grid-cols-3">
          {highlighted.map(id => {
            const emirate = geography.emirates.find(item => item.id === id)!;
            const active = selectedCity === emirate.name;
            return <button key={id} type="button" aria-pressed={active} aria-controls={panelId} onClick={() => onSelect(emirate.name)} className={`flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl border px-2 py-3 text-sm font-semibold transition-colors ${active ? "border-brand-indigo bg-brand-indigo text-white" : "border-brand-soft-neutral bg-white text-brand-indigo hover:border-brand-indigo"}`}>
              {active && <Check className="h-4 w-4 shrink-0" aria-hidden="true" />}
              {copy.names[id as EmirateId]}
            </button>;
          })}
        </div>
        <div className="flex items-start gap-2 text-xs leading-relaxed text-brand-ink/70">
          <span className="mt-0.5 h-3 w-3 shrink-0 rounded-sm border border-slate-300 bg-[#E2E5EC]" aria-hidden="true" />
          <p>{copy.other}: {geography.emirates.filter(emirate => !highlighted.includes(emirate.id)).map(emirate => copy.names[emirate.id as EmirateId]).join(" · ")}</p>
        </div>
        <p className="text-[11px] leading-relaxed text-brand-ink/60">{copy.note}</p>
        <p className="text-[11px] leading-relaxed text-brand-ink/60">
          © <a href="https://www.openstreetmap.org/copyright" className="underline underline-offset-2">OpenStreetMap contributors</a> · Wambacher · <a href="https://www.geoboundaries.org/" className="underline underline-offset-2">geoBoundaries</a> · <a href="https://opendatacommons.org/licenses/odbl/1-0/" className="underline underline-offset-2">ODbL 1.0</a> · <a href="/maps/uae-emirates.json" download className="underline underline-offset-2">{copy.data}</a>
        </p>
      </div>
    </div>
  );
}
