export interface EnquiryDraft {
  companyName: string;
  fullName: string;
  company?: string;
  service: string;
  category?: string | null;
  vehicle?: string | null;
  city: string;
  requirement: string;
  passengerCount?: string;
  travelDate?: string;
  locale?: string;
}

/** Shared by the full form and guided enquiry. Nothing is submitted here. */
export function buildEnquiryMessage(draft: EnquiryDraft): string {
  const isAr = draft.locale === "ar";
  const isHi = draft.locale === "hi";
  const isTe = draft.locale === "te";
  const isKn = draft.locale === "kn";
  const isTa = draft.locale === "ta";
  const isMa = draft.locale === "ma";

  if (isAr) {
    return [
      "*استفسار عن متطلبات النقل والتنقل*",
      `*${draft.companyName}*`,
      "--------------------------------",
      `*اسم جهة الاتصال:* ${draft.fullName.trim() || "[الاسم الكريم]"}`,
      ...(draft.company?.trim() ? [`*اسم الشركة:* ${draft.company.trim()}`] : []),
      `*الخدمة المطلوبة:* ${draft.service}`,
      ...(draft.category ? [`*فئة المركبة:* ${draft.category}`] : []),
      ...(draft.vehicle?.trim() ? [`*المركبة المطلوبة:* ${draft.vehicle.trim()}`] : []),
      `*المدينة / الإمارة:* ${draft.city}`,
      ...(draft.passengerCount?.trim() ? [`*عدد الركاب:* ${draft.passengerCount.trim()}`] : []),
      ...(draft.travelDate ? [`*تاريخ الرحلة / البدء:* ${draft.travelDate}`] : []),
      "*تفاصيل الرحلة والمسار:*",
      draft.requirement.trim() || "[أوقات الخدمة، المطار أو المسار، عدد الركاب أو التواريخ]",
      "--------------------------------",
      "تم الإعداد عبر استفسارات فيكتور موبيليتي",
    ].join("\n");
  }

  if (isHi) {
    return [
      "*परिवहन आवश्यकता पूछताछ*",
      `*${draft.companyName}*`,
      "--------------------------------",
      `*संपर्क नाम:* ${draft.fullName.trim() || "[आपका नाम]"}`,
      ...(draft.company?.trim() ? [`*कंपनी:* ${draft.company.trim()}`] : []),
      `*आवश्यक सेवा:* ${draft.service}`,
      ...(draft.category ? [`*वाहन श्रेणी:* ${draft.category}`] : []),
      ...(draft.vehicle?.trim() ? [`*अनुरोधित वाहन:* ${draft.vehicle.trim()}`] : []),
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
      ...(draft.vehicle?.trim() ? [`*అభ్యర్థించిన వాహనం:* ${draft.vehicle.trim()}`] : []),
      `*నగరం / ప్రాంతం:* ${draft.city}`,
      ...(draft.passengerCount?.trim() ? [`*ప్రయాణీకులు:* ${draft.passengerCount.trim()}`] : []),
      ...(draft.travelDate ? [`*ప్రయాణ / ప్రారంభ తేదీ:* ${draft.travelDate}`] : []),
      "*ప్రయాణ వివరాలు:*",
      draft.requirement.trim() || "[షిఫ్ట్ సమయాలు, రూట్ కారిడార్, ప్రయాణీకుల సంఖ్య లేదా తేదీలు]",
      "--------------------------------",
      "Victor Mobility విచారణ ద్వారా రూపొందించబడింది",
    ].join("\n");
  }

  if (isKn) {
    return [
      "*ಸಾರಿಗೆ ಅಗತ್ಯತೆಯ ವಿಚಾರಣೆ*",
      `*${draft.companyName}*`,
      "--------------------------------",
      `*ಸಂಪರ್ಕ ಹೆಸರು:* ${draft.fullName.trim() || "[ನಿಮ್ಮ ಹೆಸರು]"}`,
      ...(draft.company?.trim() ? [`*ಕಂಪನಿ:* ${draft.company.trim()}`] : []),
      `*ಅಗತ್ಯವಿರುವ ಸೇವೆ:* ${draft.service}`,
      ...(draft.category ? [`*ವಾಹನ ವರ್ಗ:* ${draft.category}`] : []),
      ...(draft.vehicle?.trim() ? [`*ಕೋರಿದ ವಾಹನ:* ${draft.vehicle.trim()}`] : []),
      `*ನಗರ / ಪ್ರದೇಶ:* ${draft.city}`,
      ...(draft.passengerCount?.trim() ? [`*ಪ್ರಯಾಣಿಕರು:* ${draft.passengerCount.trim()}`] : []),
      ...(draft.travelDate ? [`*ಪ್ರಯಾಣ / ಪ್ರಾರಂಭ ದಿನಾಂಕ:* ${draft.travelDate}`] : []),
      "*ಪ್ರಯಾಣದ ವಿವರಗಳು:*",
      draft.requirement.trim() || "[ಶಿಫ್ಟ್ ಸಮಯ, ಮಾರ್ಗ ಕಾರಿಡಾರ್, ಪ್ರಯಾಣಿಕರ ಸಂಖ್ಯೆ ಅಥವಾ ದಿನಾಂಕಗಳು]",
      "--------------------------------",
      "Victor Mobility ವಿಚಾರಣೆ ಮೂಲಕ ಸಿದ್ಧಪಡಿಸಲಾಗಿದೆ",
    ].join("\n");
  }

  if (isTa) {
    return [
      "*போக்குவரத்து தேவை விசாரணை*",
      `*${draft.companyName}*`,
      "--------------------------------",
      `*தொடர்பு பெயர்:* ${draft.fullName.trim() || "[உங்கள் பெயர்]"}`,
      ...(draft.company?.trim() ? [`*நிறுவனம்:* ${draft.company.trim()}`] : []),
      `*தேவைப்படும் சேவை:* ${draft.service}`,
      ...(draft.category ? [`*வாகன வகை:* ${draft.category}`] : []),
      ...(draft.vehicle?.trim() ? [`*கோரப்பட்ட வாகனம்:* ${draft.vehicle.trim()}`] : []),
      `*நகரம் / பகுதி:* ${draft.city}`,
      ...(draft.passengerCount?.trim() ? [`*பயணிகள்:* ${draft.passengerCount.trim()}`] : []),
      ...(draft.travelDate ? [`*பயண / தொடக்க தேதி:* ${draft.travelDate}`] : []),
      "*பயண விவரங்கள்:*",
      draft.requirement.trim() || "[ஷிப்ட் நேரங்கள், வழித்தடம், பயணிகள் எண்ணிக்கை அல்லது தேதிகள்]",
      "--------------------------------",
      "Victor Mobility விசாரணை மூலம் உருவாக்கப்பட்டது",
    ].join("\n");
  }

  if (isMa) {
    return [
      "*ഗതാഗത ആവശ്യങ്ങളുടെ അന്വേഷണം*",
      `*${draft.companyName}*`,
      "--------------------------------",
      `*ബന്ധപ്പെടേണ്ട പേര്:* ${draft.fullName.trim() || "[നിങ്ങളുടെ പേര്]"}`,
      ...(draft.company?.trim() ? [`*കമ്പനി:* ${draft.company.trim()}`] : []),
      `*ആവശ്യമായ സേവനം:* ${draft.service}`,
      ...(draft.category ? [`*വാഹന വിഭാഗം:* ${draft.category}`] : []),
      ...(draft.vehicle?.trim() ? [`*ആവശ്യപ്പെട്ട വാഹനം:* ${draft.vehicle.trim()}`] : []),
      `*നഗരം / പ്രദേശം:* ${draft.city}`,
      ...(draft.passengerCount?.trim() ? [`*യാത്രക്കാർ:* ${draft.passengerCount.trim()}`] : []),
      ...(draft.travelDate ? [`*യാത്രാ / ആരംഭ തീയതി:* ${draft.travelDate}`] : []),
      "*യാത്രാ വിവരങ്ങൾ:*",
      draft.requirement.trim() || "[ഷിഫ്റ്റ് സമയം, റൂട്ട്, യാത്രക്കാരുടെ എണ്ണം അല്ലെങ്കിൽ തീയതികൾ]",
      "--------------------------------",
      "Victor Mobility അന്വേഷണം വഴി തയ്യാറാക്കിയത്",
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
    ...(draft.vehicle?.trim() ? [`*Vehicle Requested:* ${draft.vehicle.trim()}`] : []),
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
