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
  locale?: string;
}

/** Shared by the full form and guided enquiry. Nothing is submitted here. */
export function buildEnquiryMessage(draft: EnquiryDraft): string {
  const isHi = draft.locale === "hi";
  const isTe = draft.locale === "te";

  if (isHi) {
    return [
      "*परिवहन आवश्यकता पूछताछ*",
      `*${draft.companyName}*`,
      "--------------------------------",
      `*संपर्क नाम:* ${draft.fullName.trim() || "[आपका नाम]"}`,
      ...(draft.company?.trim() ? [`*कंपनी:* ${draft.company.trim()}`] : []),
      `*आवश्यक सेवा:* ${draft.service}`,
      ...(draft.category ? [`*वाहन श्रेणी:* ${draft.category}`] : []),
      `*शहर / क्षेत्र:* ${draft.city}`,
      ...(draft.passengerCount?.trim() ? [`*यात्री:* ${draft.passengerCount.trim()}`] : []),
      ...(draft.travelDate ? [`*यात्रा / प्रारंभ तिथि:* ${draft.travelDate}`] : []),
      "*यात्रा विवरण:*",
      draft.requirement.trim() || "[शिफ्ट समय, रूट कॉरिडोर, यात्री संख्या या तिथियां]",
      "--------------------------------",
      "Victor Mobility पूछताछ द्वारा तैयार",
    ].join("\n");
  }

  if (isTe) {
    return [
      "*రవాణా అవసరాల విచారణ*",
      `*${draft.companyName}*`,
      "--------------------------------",
      `*సంప్రదించాల్సిన పేరు:* ${draft.fullName.trim() || "[మీ పేరు]"}`,
      ...(draft.company?.trim() ? [`*కంపెనీ:* ${draft.company.trim()}`] : []),
      `*కావలసిన సేవ:* ${draft.service}`,
      ...(draft.category ? [`*వాహన విభాగం:* ${draft.category}`] : []),
      `*నగరం / ప్రాంతం:* ${draft.city}`,
      ...(draft.passengerCount?.trim() ? [`*ప్రయాణీకులు:* ${draft.passengerCount.trim()}`] : []),
      ...(draft.travelDate ? [`*ప్రయాణ / ప్రారంభ తేదీ:* ${draft.travelDate}`] : []),
      "*ప్రయాణ వివరాలు:*",
      draft.requirement.trim() || "[షిఫ్ట్ సమయాలు, రూట్ కారిడార్, ప్రయాణీకుల సంఖ్య లేదా తేదీలు]",
      "--------------------------------",
      "Victor Mobility విచారణ ద్వారా రూపొందించబడింది",
    ].join("\n");
  }

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
