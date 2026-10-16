import { MapPin, Navigation } from "lucide-react";
import type { OfficeItem } from "@/types/content";

export default function OfficeMapLinks({ office }: { office: OfficeItem }) {
  if (!office.published) return null;
  const address = encodeURIComponent(office.address);
  const style = "inline-flex min-h-[44px] items-center gap-2 rounded-lg px-2 py-2 text-xs font-bold text-brand-indigo hover:bg-brand-indigo/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo";
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1">
      <a href={`https://www.google.com/maps/search/?api=1&query=${address}`} target="_blank" rel="noopener noreferrer" aria-label={`Open ${office.city} office in Google Maps (new tab)`} className={style}>
        <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" /> Google Maps
      </a>
      <a href={`https://www.google.com/maps/dir/?api=1&destination=${address}`} target="_blank" rel="noopener noreferrer" aria-label={`Get directions to ${office.city} office (new tab)`} className={style}>
        <Navigation className="h-4 w-4 shrink-0" aria-hidden="true" /> Get directions
      </a>
    </div>
  );
}
