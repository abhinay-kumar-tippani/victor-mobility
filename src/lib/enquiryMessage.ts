export interface EnquiryDraft {
  companyName: string;
  fullName: string;
  company?: string;
  service: string;
  category?: string | null;
  city: string;
  requirement: string;
  passengerCount?: string;
  travelDate?: string;
}

/** Shared by the full form and guided enquiry. Nothing is submitted here. */
export function buildEnquiryMessage(draft: EnquiryDraft): string {
  return [
    "*Transport Requirement Enquiry*",
    `*${draft.companyName}*`,
    "--------------------------------",
    `*Contact Name:* ${draft.fullName.trim() || "[Your Name]"}`,
    ...(draft.company?.trim() ? [`*Company:* ${draft.company.trim()}`] : []),
    `*Service Required:* ${draft.service}`,
    ...(draft.category ? [`*Vehicle Category:* ${draft.category}`] : []),
    `*City / Region:* ${draft.city}`,
    ...(draft.passengerCount?.trim() ? [`*Passengers:* ${draft.passengerCount.trim()}`] : []),
    ...(draft.travelDate ? [`*Travel / Start Date:* ${draft.travelDate}`] : []),
    "*Journey Details:*",
    draft.requirement.trim() || "[Shift timings, route corridor, passenger count or dates]",
    "--------------------------------",
    "Prepared via Victor Mobility Enquiry",
  ].join("\n");
}

export function isValidPassengerCount(value: string): boolean {
  return !value.trim() || (/^\d+$/.test(value.trim()) && Number.isSafeInteger(Number(value)) && Number(value) > 0);
}

export function isValidTravelDate(value: string): boolean {
  if (!value) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function canonicalCityName(value: string): string {
  const city = value.trim().toLowerCase();
  return city === "bangalore" ? "bengaluru" : city === "gurugram" ? "gurgaon" : city;
}
