"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { Expand, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { FleetVehicle } from "@/types/content";

export default function FleetPhoto({ vehicle }: { vehicle: FleetVehicle }) {
  const { dict } = useLanguage();
  const dialog = useRef<HTMLDialogElement>(null);
  const [expanded, setExpanded] = useState(false);
  const titleId = useId();
  const details = vehicle.imageDetails;
  const photo = (
    <Image
      src={vehicle.image}
      alt={vehicle.imageAlt}
      fill
      sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 596px"
      className="object-contain"
    />
  );

  if (!details) return <div className="relative aspect-video w-full">{photo}</div>;

  return (
    <>
      <button
        type="button"
        className="relative block aspect-video w-full cursor-zoom-in focus-visible:outline focus-visible:-outline-offset-4 focus-visible:outline-brand-indigo"
        aria-haspopup="dialog"
        aria-label={`${dict.servicesSection.viewDetails} · ${vehicle.name}`}
        onClick={() => {
          setExpanded(true);
          dialog.current?.showModal();
        }}
      >
        {photo}
        <span className="pointer-events-none absolute end-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-brand-ink shadow-sm">
          <Expand size={17} aria-hidden="true" />
        </span>
      </button>
      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        className="m-auto max-h-[92dvh] w-[min(94vw,960px)] overflow-y-auto overscroll-contain rounded-2xl bg-white text-brand-ink shadow-xl backdrop:bg-brand-ink/75"
        onClose={() => setExpanded(false)}
        onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}
      >
        <div className="p-3 sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 id={titleId} className="text-lg font-semibold sm:text-2xl">{vehicle.name}</h2>
            <button type="button" aria-label={dict.fleet.closePhoto} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-warm-white focus-visible:outline-brand-indigo" onClick={() => dialog.current?.close()}>
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          {expanded && (
            <>
              <Image src={vehicle.image} alt={vehicle.imageAlt} width={1600} height={900} className="h-auto w-full rounded-lg" />
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { image: details.doorImage, label: "Victor Mobility · On Time Every Time." },
                  { image: details.plateImage, label: details.plateText },
                ].map(({ image, label }) => (
                  <Image key={image} src={image} alt={label} width={720} height={360} className="h-auto w-full rounded-lg" />
                ))}
              </div>
              <p className="mt-3 text-xs text-brand-ink/65">{dict.fleet.imageCaption}</p>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
