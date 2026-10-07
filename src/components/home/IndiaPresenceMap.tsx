"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import geography from "@/content/india-map.json";
import type { OfficeItem, ContactData } from "@/types/content";

export default function IndiaPresenceMap({ offices, contact }: { offices: OfficeItem[]; contact: ContactData }) {
  const cities = geography.cities.flatMap((city) => {
    const office = offices.find((item) => item.published && item.city === city.name);
    return office ? [{ ...city, office }] : [];
  });
  const [selection, setSelection] = useState("Hyderabad");
  const current = cities.find((city) => city.name === selection) || cities[0];
  const titleId = useId();
  const panelId = useId();
  if (!current) return null;

  return (
    <section id="network" tabIndex={-1} className="py-14 sm:py-20 bg-white border-b border-brand-soft-neutral focus:outline-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">Regional network</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink mb-3">Our India presence.</h2>
          <p className="text-base text-brand-ink/75">Connect with Victor in {cities.map((city) => city.name).join(", ")}.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 rounded-2xl bg-brand-warm-white p-4 sm:p-6 border border-brand-soft-neutral">
            <svg viewBox={geography.viewBox} role="img" aria-labelledby={titleId} className="w-full max-w-[450px] mx-auto">
              <title id={titleId}>India: highlighted states contain Victor offices. Choose a city using the buttons beside the map.</title>
              <path d={geography.country} fill="#E5E4EA" stroke="#AAA9B8" strokeWidth="0.8" fillRule="evenodd" />
              {geography.states.map((state) => {
                const city = cities.find((item) => item.state === state.name);
                return <path key={state.name} d={state.path} fill={city ? (current.name === city.name ? "#2D5090" : "#31326F") : "#E5E4EA"}
                  stroke="#FFFFFF" strokeWidth="0.65" fillRule="evenodd"
                  onClick={city ? () => setSelection(city.name) : undefined}
                  className={city ? "cursor-pointer transition-colors duration-150 hover:fill-brand-blue" : undefined} />;
              })}
              {cities.map((city) => {
                const [x, y] = city.point;
                const left = city.name === "Pune";
                return <g key={city.name} onClick={() => setSelection(city.name)} className="cursor-pointer">
                  <circle cx={x} cy={y} r={city.name === current.name ? 7 : 5} fill="#FFFFFF" stroke="#6E57A0" strokeWidth="3" />
                  <text x={x + (left ? -12 : 12)} y={y + 5} textAnchor={left ? "end" : "start"} fontSize="15" fontWeight="700" fill="#15162F" stroke="#FFFFFF" strokeWidth="3" paintOrder="stroke" strokeLinejoin="round">{city.name}</text>
                </g>;
              })}
            </svg>
            <p className="flex items-start gap-2 text-xs leading-relaxed text-brand-ink/80 mt-3"><span className="w-3 h-3 bg-brand-indigo rounded-sm shrink-0 mt-0.5" />Highlighted states contain a listed Victor office.</p>
            <p className="text-xs text-brand-ink/60 mt-2">Boundaries: <a href="https://github.com/datameet/maps" className="underline hover:text-brand-indigo">DataMeet</a> · <a href="https://creativecommons.org/licenses/by/4.0/" className="underline hover:text-brand-indigo">CC BY 4.0</a>. Simplified for display.</p>
          </div>
          <div className="order-1 lg:order-2 min-w-0">
            <div role="group" aria-label="Choose an office city" className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-brand-warm-white border border-brand-soft-neutral mb-5">
              {cities.map((city) => <button key={city.name} type="button" aria-pressed={current.name === city.name} aria-controls={panelId}
                onClick={() => setSelection(city.name)}
                className={`min-h-[48px] px-1 py-2 rounded-lg text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo ${current.name === city.name ? "bg-brand-indigo text-white" : "text-brand-ink hover:bg-white"}`}>{city.name}</button>)}
            </div>
            <div id={panelId} aria-live="polite" aria-atomic="true" className="rounded-2xl border border-brand-soft-neutral bg-brand-warm-white p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2">{current.state} · {current.office.label}</p>
              <h3 className="text-2xl font-bold text-brand-ink mb-5">{current.name}</h3>
              <div className="flex gap-3 mb-6"><MapPin className="w-5 h-5 shrink-0 text-brand-indigo mt-1" /><address className="not-italic text-base leading-relaxed text-brand-ink/80">{current.office.address}</address></div>
              <Link href={`/india/contact?city=${encodeURIComponent(current.name)}`} className="flex items-center justify-center gap-2 min-h-[48px] rounded-xl px-4 py-3 bg-brand-indigo text-white text-sm font-bold hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo">Enquire for {current.name}<ArrowRight className="w-4 h-4" /></Link>
              <a href={contact.phoneHref} className="mt-3 flex items-center justify-center gap-2 min-h-[44px] text-sm font-semibold text-brand-indigo"><Phone className="w-4 h-4" />{contact.phoneDisplay}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
