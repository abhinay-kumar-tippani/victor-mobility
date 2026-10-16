"use client";

import { useId } from "react";
import type { JourneyFieldsCopy } from "@/types/content";

interface Props {
  copy: JourneyFieldsCopy;
  passengerCount: string;
  travelDate: string;
  onPassengerChange: (value: string) => void;
  onDateChange: (value: string) => void;
  passengerError?: string;
  dateError?: string;
}

export default function JourneyFields({ copy, passengerCount, travelDate, onPassengerChange, onDateChange, passengerError, dateError }: Props) {
  const id = useId();
  const fieldStyle = "min-h-[48px] w-full min-w-0 rounded-xl border border-brand-soft-neutral bg-white px-3 py-3 text-base text-brand-ink outline-none focus:ring-2 focus:ring-brand-indigo";
  return (
    <div className="space-y-2">
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <label htmlFor={`${id}-passengers`} className="mb-2 block text-sm font-semibold text-brand-ink">{copy.passengerLabel}</label>
          <input id={`${id}-passengers`} name="passengerCount" type="number" min="1" step="1" inputMode="numeric" value={passengerCount} onChange={e => onPassengerChange(e.target.value)} aria-invalid={!!passengerError} aria-describedby={passengerError ? `${id}-passenger-error` : `${id}-help`} className={fieldStyle} />
          {passengerError && <p id={`${id}-passenger-error`} role="alert" className="mt-2 text-sm text-red-700">{passengerError}</p>}
        </div>
        <div className="min-w-0">
          <label htmlFor={`${id}-date`} className="mb-2 block text-sm font-semibold text-brand-ink">{copy.dateLabel}</label>
          <input id={`${id}-date`} name="travelDate" type="date" value={travelDate} onChange={e => onDateChange(e.target.value)} aria-invalid={!!dateError} aria-describedby={dateError ? `${id}-date-error` : `${id}-help`} className={fieldStyle} />
          {dateError && <p id={`${id}-date-error`} role="alert" className="mt-2 text-sm text-red-700">{dateError}</p>}
        </div>
      </div>
      <p id={`${id}-help`} className="text-xs leading-relaxed text-brand-ink/65">{copy.help}</p>
    </div>
  );
}
