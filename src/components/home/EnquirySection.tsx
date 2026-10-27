"use client";

import { Suspense, useState, useId, useEffect, useMemo } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  MessageSquare,
  Phone,
  Send,
  Info,
  User,
  Building2,
  Briefcase,
  MapPin,
  FileText,
  Copy,
  Check,
  AlertCircle,
} from "lucide-react";
import type { ContactData, EnquiryData, ServiceItem, CityItem } from "@/types/content";
import type { EnquirySelectionEvent } from "@/lib/enquiryEvents";
import { buildEnquiryMessage, canonicalCityName, isValidPassengerCount, isValidTravelDate } from "@/lib/enquiryMessage";
import { useLanguage } from "@/i18n/LanguageContext";
import JourneyFields from "@/components/contact/JourneyFields";

interface EnquirySectionProps {
  contact: ContactData;
  enquiry: EnquiryData;
  services: ServiceItem[];
  cities: CityItem[];
  preselectedService?: string;
  preselectedCity?: string;
  isStandalonePage?: boolean;
  companyName?: string;
}

export default function EnquirySection(props: EnquirySectionProps) {
  return (
    <Suspense fallback={<div className="min-h-[480px] p-8" role="status">Loading enquiry form…</div>}>
      <EnquiryForm {...props} />
    </Suspense>
  );
}

function EnquiryForm({
  contact,
  enquiry,
  services,
  cities,
  preselectedService,
  preselectedCity,
  isStandalonePage = false,
  companyName,
}: EnquirySectionProps) {
  const { dict, locale } = useLanguage();
  const isUae = contact.whatsappDigits?.startsWith("971");
  const effectiveCompany =
    companyName || (isUae ? "Victor Luxury Limousine LLC (Victor Mobility UAE)" : "Victor Mobility Pvt. Ltd.");
  const publishedServices = useMemo(() => services.filter((s) => s.published), [services]);
  const publishedCities = useMemo(() => cities.filter((c) => c.published), [cities]);
  const query = useSearchParams().toString();
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [selectedService, setSelectedService] = useState(
    preselectedService || "General Vehicle Enquiry"
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState(
    preselectedCity || publishedCities[0]?.name || "Hyderabad"
  );
  const [customCity, setCustomCity] = useState("");
  const [requirementText, setRequirementText] = useState("");
  const [passengerCount, setPassengerCount] = useState("");
  const [travelDate, setTravelDate] = useState("");

  const [touched, setTouched] = useState({
    name: false,
    customCity: false,
    requirement: false,
  });
  const [submissionAttempted, setSubmissionAttempted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const serviceId = useId();
  const cityId = useId();
  const customCityId = useId();
  const reqId = useId();

  // Apply defaults on navigation only. Subsequent edits belong to the visitor.
  useEffect(() => {
      const params = new URLSearchParams(query);
      const sParam = params.get("service") || preselectedService;
      const cParam = params.get("city") || preselectedCity;
      const catParam = params.get("category");
      const vParam = params.get("vehicle");
      setSelectedCategory(catParam && catParam.trim() ? catParam.trim() : null);
      setSelectedVehicle(vParam && vParam.trim() ? vParam.trim() : null);
      if (sParam) {
        const matchedService = publishedServices.find(
          (s) =>
            s.slug === sParam ||
            s.title.toLowerCase() === sParam.toLowerCase() ||
            s.slug.toLowerCase() === sParam.toLowerCase().replace(/\s+/g, "-")
        );
        if (matchedService) {
          setSelectedService(matchedService.title);
        } else {
          setSelectedService(sParam);
        }
      } else {
        setSelectedService("General Vehicle Enquiry");
      }
      if (cParam) {
        const matchedCity = publishedCities.find(
          (c) => canonicalCityName(c.name) === canonicalCityName(cParam)
        );
        if (matchedCity) {
          setSelectedCity(matchedCity.name);
        } else {
          setSelectedCity("Other");
          setCustomCity(cParam.toLowerCase() === "other" ? "" : cParam);
        }
      }
  }, [query, publishedServices, publishedCities, preselectedService, preselectedCity]);

  // Legacy in-page entry points remain independent of query initialization.
  useEffect(() => {
    const handleEnquirySelection = (e: Event) => {
      const customEvent = e as CustomEvent<EnquirySelectionEvent>;
      const detail = customEvent.detail;
      if (!detail) return;

      if ((detail as any).vehicle) {
        setSelectedVehicle((detail as any).vehicle);
      }

      if (detail.category) {
        setSelectedCategory(detail.category);
      }

      if (detail.service) {
        const matchedService = publishedServices.find(
          (s) => s.slug === detail.service || s.title.toLowerCase() === detail.service?.toLowerCase()
        );
        if (matchedService) {
          setSelectedService(matchedService.title);
        } else {
          setSelectedService(detail.service);
        }
      }

      if (detail.city) {
        const matchedCity = publishedCities.find(
          (c) => canonicalCityName(c.name) === canonicalCityName(detail.city || "")
        );
        if (matchedCity) {
          setSelectedCity(matchedCity.name);
        } else {
          setSelectedCity("Other");
          setCustomCity(detail.city);
        }
      }

      if (detail.note) {
        setRequirementText((prev) => (prev ? `${prev}\n${detail.note}` : detail.note || ""));
      }
    };

    window.addEventListener("victor:select-enquiry", handleEnquirySelection);
    return () => {
      window.removeEventListener("victor:select-enquiry", handleEnquirySelection);
    };
  }, [publishedServices, publishedCities]);

  const cityDisplay = selectedCity === "Other" && customCity.trim() ? customCity.trim() : selectedCity;

  // Real-time accessible error calculations using localized dictionary
  const nameError =
    (touched.name || submissionAttempted) && !fullName.trim()
      ? dict.enquiryForm.errors.name
      : "";

  const customCityError =
    selectedCity === "Other" && (touched.customCity || submissionAttempted) && !customCity.trim()
      ? dict.enquiryForm.errors.customCity
      : "";

  const requirementError =
    (touched.requirement || submissionAttempted) && !requirementText.trim()
      ? dict.enquiryForm.errors.requirement
      : "";

  const passengerError = submissionAttempted && !isValidPassengerCount(passengerCount)
    ? dict.enquiryForm.errors.passengers : undefined;
  const dateError = submissionAttempted && !isValidTravelDate(travelDate)
    ? dict.enquiryForm.errors.date : undefined;

  const draftMessage = buildEnquiryMessage({
    companyName: effectiveCompany,
    fullName, company, service: selectedService, category: selectedCategory,
    vehicle: selectedVehicle,
    city: cityDisplay, requirement: requirementText,
    passengerCount: enquiry.planningFields ? passengerCount : undefined,
    travelDate: enquiry.planningFields ? travelDate : undefined,
    locale,
  });

  const handleCopyDraft = async () => {
    setCopyFailed(false);
    try {
      await navigator.clipboard.writeText(draftMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
      setCopyFailed(true);
    }
  };

  const handleContinueWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionAttempted(true);

    if (!fullName.trim()) {
      document.getElementById("enquiry-name-input")?.focus();
      return;
    }
    if (selectedCity === "Other" && !customCity.trim()) {
      document.getElementById(customCityId)?.focus();
      return;
    }
    if (enquiry.planningFields && !isValidPassengerCount(passengerCount)) {
      e.currentTarget.querySelector<HTMLInputElement>('[name="passengerCount"]')?.focus();
      return;
    }
    if (enquiry.planningFields && !isValidTravelDate(travelDate)) {
      e.currentTarget.querySelector<HTMLInputElement>('[name="travelDate"]')?.focus();
      return;
    }
    if (!requirementText.trim()) {
      document.getElementById("enquiry-requirement-input")?.focus();
      return;
    }

    const encodedMessage = encodeURIComponent(draftMessage);
    const url = `${contact.whatsappBaseUrl}?text=${encodedMessage}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const currentServiceObj = publishedServices.find((s) => s.title === selectedService);

  const getRequirementPlaceholder = () => {
    if (
      locale === "ar" ||
      locale === "hi" ||
      locale === "te" ||
      locale === "kn" ||
      locale === "ta" ||
      locale === "ma"
    ) {
      return dict.enquiryForm.requirementPlaceholder;
    }
    switch (selectedService) {
      case "Airport Transfers":
        return "Flight number, terminal, travel date & time, passenger count and luggage volume...";
      case "Employee Transportation":
        return "Shift roster timings, office location, transit corridors, and estimated employee count...";
      case "Bus & Shuttle Transport":
        return "Pickup points, campus/venue route, expected passenger count, and shuttle schedule...";
      case "Event Transportation":
        return "Event dates, venue locations, VIP or guest group counts, and transit itinerary...";
      case "Chauffeur & Luxury Travel":
        return "Occasion, preferred vehicle category, dates, and itinerary requirements...";
      case "Rent-A-Car":
        return "Rental duration, preferred vehicle type, self-drive or chauffeur preference...";
      default:
        return dict.enquiryForm.requirementPlaceholder;
    }
  };

  const journeyFieldsCopy = enquiry.planningFields ? {
    passengerLabel: dict.enquiryForm.passengers,
    dateLabel: dict.enquiryForm.date,
    help: locale === "ar"
      ? "مطلوب لتحديد سعة المركبة المناسبة والجدولة الدقيقة."
      : locale === "hi"
      ? "सटीक वाहन क्षमता और शेड्यूलिंग योजना के लिए आवश्यक।"
      : locale === "te"
      ? "ఖచ్చితమైన వాహన సామర్థ్యం మరియు షెడ్యూలింగ్ ప్లానింగ్ కోసం అవసరం."
      : (enquiry.planningFields.help || "Required for vehicle capacity and scheduling planning."),
    passengerError: dict.enquiryForm.errors.passengers,
    dateError: dict.enquiryForm.errors.date,
  } : undefined;

  const deskBadge =
    locale === "ar"
      ? "مكتب الحجوزات والاستفسارات"
      : locale === "hi"
      ? "आवश्यकता डेस्क"
      : locale === "te"
      ? "అవసరాల డెస్క్"
      : locale === "kn"
      ? "ಅಗತ್ಯತೆಗಳ ಡೆಸ್ಕ್"
      : locale === "ta"
      ? "தேவைகள் மையம்"
      : locale === "ma"
      ? "ആവശ്യങ്ങളുടെ ഡെസ്ക്"
      : "Requirement Desk";

  const deskHeading =
    locale === "ar"
      ? "أخبرنا باحتياجات تنقلك"
      : locale === "hi"
      ? "अपनी परिवहन आवश्यकता बताएं"
      : locale === "te"
      ? "మీ రవాణా అవసరాలను మాకు తెలియజేయండి"
      : locale === "kn"
      ? "ನಿಮ್ಮ ಸಾರಿಗೆ ಅಗತ್ಯಗಳನ್ನು ನಮಗೆ ತಿಳಿಸಿ"
      : locale === "ta"
      ? "உங்கள் போக்குவரத்து தேவைகளை எங்களிடம் கூறுங்கள்"
      : locale === "ma"
      ? "നിങ്ങളുടെ യാത്രാ ആവശ്യങ്ങൾ ഞങ്ങളോട് പറയൂ"
      : "Tell us what you need to arrange";

  const formTitle =
    locale === "ar"
      ? "استفسار عن متطلبات النقل"
      : locale === "hi"
      ? "परिवहन आवश्यकता पूछताछ"
      : locale === "te"
      ? "రవాణా అవసరాల విచారణ"
      : locale === "kn"
      ? "ಸಾರಿಗೆ ಅಗತ್ಯತೆಯ ವಿಚಾರಣೆ"
      : locale === "ta"
      ? "போக்குவரத்து தேவை விசாரணை"
      : locale === "ma"
      ? "ഗതാഗത ആവശ്യങ്ങളുടെ അന്വേഷണം"
      : "Transport Requirement Enquiry";

  const deskStatus =
    locale === "ar"
      ? "مكتب العمليات المباشر"
      : locale === "hi"
      ? "प्रत्यक्ष संचालन डेस्क"
      : locale === "te"
      ? "ప్రత్యక్ష ఆపరేషన్స్ డెస్క్"
      : locale === "kn"
      ? "ನೇರ ಕಾರ್ಯಾಚರಣೆ ಡೆಸ್ಕ್"
      : locale === "ta"
      ? "நேரடி செயல்பாட்டு மையம்"
      : locale === "ma"
      ? "നേരിട്ടുള്ള ഓപ്പറേഷൻസ് ഡെസ്ക്"
      : "Direct Operations Desk";

  const otherCityLabel =
    locale === "ar"
      ? "إمارة أو مدينة أخرى"
      : locale === "hi"
      ? "अन्य शहर / इंटर-सिटी"
      : locale === "te"
      ? "ఇతర నగరం / ఇంటర్-సిటీ"
      : locale === "kn"
      ? "ಇತರ ನಗರ / ಇಂಟರ್-ಸಿಟಿ"
      : locale === "ta"
      ? "பிற நகரம் / நகரங்களுக்கு இடையே"
      : locale === "ma"
      ? "മറ്റ് നഗരം / നഗരങ്ങൾക്കിടയിൽ"
      : "Other City / Inter-City";

  const generalVehicleEnquiryLabel =
    locale === "ar"
      ? "استفسار عام عن المركبات"
      : locale === "hi"
      ? "सामान्य वाहन पूछताछ"
      : locale === "te"
      ? "సాధారణ వాహన విచారణ"
      : locale === "kn"
      ? "ಸಾಮಾನ್ಯ ವಾಹನ ವಿಚಾರಣೆ"
      : locale === "ta"
      ? "பொதுவான வாகன விசாரணை"
      : locale === "ma"
      ? "പൊതുവായ വാഹന അന്വേഷണം"
      : "General Vehicle Enquiry";
  const summaryTitle =
    locale === "ar"
      ? "ملخص مواصفات الاستفسار:"
      : locale === "hi"
      ? "पूछताछ विवरण सारांश:"
      : locale === "te"
      ? "విచారణ స్పెసిఫికేషన్ సారాంశం:"
      : locale === "kn"
      ? "ವಿಚಾರಣಾ ವಿವರಣೆ ಸಾರಾಂಶ:"
      : locale === "ta"
      ? "விசாரணை விவரக் குறிப்பு சுருக்கம்:"
      : locale === "ma"
      ? "അന്വേഷണ വിവരങ്ങളുടെ സംഗ്രഹം:"
      : "Enquiry Specification Summary:";

  const speakDirectlyTitle =
    locale === "ar"
      ? "هل تفضل التحدث مباشرة؟"
      : locale === "hi"
      ? "सीधे बात करना चाहते हैं?"
      : locale === "te"
      ? "నేరుగా మాట్లాడాలనుకుంటున్నారా?"
      : locale === "kn"
      ? "ನೇರವಾಗಿ ಮಾತನಾಡಲು ಬಯಸುವಿರಾ?"
      : locale === "ta"
      ? "நேரடியாக பேச விரும்புகிறீர்களா?"
      : locale === "ma"
      ? "നേരിട്ട് സംസാരിക്കാൻ താല്പര്യമുണ്ടോ?"
      : "Prefer to Speak Directly?";

  const speakDirectlyDesc =
    locale === "ar"
      ? "فريق العمليات وتطوير الأعمال متاح لمناقشة العقود المؤسسية وحجوزات السائقين والليموزين الفوري."
      : locale === "hi"
      ? "कॉर्पोरेट अनुबंधों और तत्काल यात्रा आवश्यकताओं पर चर्चा के लिए हमारे संचालन और व्यावसायिक विकास साझेदार व्यावसायिक घंटों के दौरान उपलब्ध हैं।"
      : locale === "te"
      ? "కార్పొరేట్ ఒప్పందాలు మరియు అత్యవసర ప్రయాణ అవసరాలను చర్చించడానికి వ్యాపార వేళల్లో మా ఆపరేషన్స్ మరియు బిజినెస్ డెవలప్‌మెంట్ భాగస్వామి అందుబాటులో ఉంటారు."
      : locale === "kn"
      ? "ಕಾರ್ಪೊರೇಟ್ ಒಪ್ಪಂದಗಳು ಮತ್ತು ತುರ್ತು ಪ್ರಯಾಣದ ಅಗತ್ಯಗಳನ್ನು ಚರ್ಚಿಸಲು ವ್ಯವಹಾರದ ಸಮಯದಲ್ಲಿ ನಮ್ಮ ಕಾರ್ಯಾಚರಣೆ ಮತ್ತು ವ್ಯಾಪಾರ ಅಭಿವೃದ್ಧಿ ಪಾಲುದಾರರು ಲಭ್ಯವಿರುತ್ತಾರೆ."
      : locale === "ta"
      ? "கார்ப்பரேட் ஒப்பந்தங்கள் மற்றும் அவசர பயணத் தேவைகளைப் பற்றி பேச வணிக நேரங்களில் எங்கள் செயல்பாட்டு மற்றும் வணிக மேம்பாட்டு கூட்டாளர் தயாராக உள்ளார்."
      : locale === "ma"
      ? "കോർപ്പറേറ്റ് കരാറുകളും അടിയന്തര യാത്രാ ആവശ്യങ്ങളും ചർച്ച ചെയ്യാൻ ബിസിനസ്സ് സമയങ്ങളിൽ ഞങ്ങളുടെ ഓപ്പറേഷൻസ്, ബിസിനസ്സ് ഡെവലപ്‌മെന്റ് പങ്കാളി ലഭ്യമാണ്."
      : "Our operations and business development partner is available during business hours to discuss corporate contracts and urgent travel needs.";

  const callDirectLabel =
    locale === "ar"
      ? "اتصال مباشر"
      : locale === "hi"
      ? "सीधे कॉल करें"
      : locale === "te"
      ? "నేరుగా కాల్ చేయండి"
      : locale === "kn"
      ? "ನೇರವಾಗಿ ಕರೆ ಮಾಡಿ"
      : locale === "ta"
      ? "நேரடியாக அழைக்கவும்"
      : locale === "ma"
      ? "നേരിട്ട് വിളിക്കുക"
      : "Call Direct";

  const directWhatsappLabel =
    locale === "ar"
      ? "واتساب مباشر"
      : locale === "hi"
      ? "सीधा व्हाट्सएप"
      : locale === "te"
      ? "డైరెక్ట్ వాట్సాప్"
      : locale === "kn"
      ? "ನೇರ WhatsApp"
      : locale === "ta"
      ? "நேரடி WhatsApp"
      : locale === "ma"
      ? "നേരിട്ട് വാട്ട്‌സ്ആപ്പ്"
      : "Direct WhatsApp";

  const transparentProcessTitle =
    locale === "ar"
      ? "إجراءات حجز شفافة وموثوقة"
      : locale === "hi"
      ? "पारदर्शी पूछताछ प्रक्रिया"
      : locale === "te"
      ? "పారదర్శక విచారణ ప్రక్రియ"
      : locale === "kn"
      ? "ಪಾರದರ್ಶಕ ವಿಚಾರಣಾ ಪ್ರಕ್ರಿಯೆ"
      : locale === "ta"
      ? "வெளிப்படையான விசாரணை செயல்முறை"
      : locale === "ma"
      ? "സുതാര്യമായ അന്വേഷണ പ്രക്രിയ"
      : "Transparent Enquiry Process";

  const transparentStep1 =
    locale === "ar"
      ? "يستقبل مكتب العمليات استفسارك مباشرة لمراجعة المسار والأسطول المتاح."
      : locale === "hi"
      ? "मार्ग और क्षमता समीक्षा के लिए हमारे संचालन डेस्क द्वारा पूछताछ सीधे प्राप्त की जाती है।"
      : locale === "te"
      ? "రూట్ మరియు సామర్థ్య సమీక్ష కోసం మా ఆపరేషన్స్ డెస్క్ ద్వారా విచారణ నేరుగా స్వీకరించబడుతుంది."
      : locale === "kn"
      ? "ಮಾರ್ಗ ಮತ್ತು ಸಾಮರ್ಥ್ಯ ಪರಿಶೀಲನೆಗಾಗಿ ನಮ್ಮ ಕಾರ್ಯಾಚರಣೆ ಡೆಸ್ಕ್ ಮೂಲಕ ವಿಚಾರಣೆಯನ್ನು ನೇರವಾಗಿ ಸ್ವೀಕರಿಸಲಾಗುತ್ತದೆ."
      : locale === "ta"
      ? "வழித்தடம் மற்றும் வாகன ஏற்பாடுகளை மதிப்பாய்வு செய்ய எங்கள் செயல்பாட்டு மையம் விசாரணையை நேரடியாகப் பெறுகிறது."
      : locale === "ma"
      ? "റൂട്ടും വാഹന ലഭ്യതയും പരിശോധിക്കാൻ ഞങ്ങളുടെ ഓപ്പറേഷൻസ് ഡെസ്ക് നേരിട്ട് അന്വേഷണം സ്വീകരിക്കുന്നു."
      : "Enquiry received directly by our operations desk for route and capacity review.";

  const transparentStep2 =
    locale === "ar"
      ? "تحديد خيارات المركبة والجدول الزمني وشروط الخدمة الواضحة."
      : locale === "hi"
      ? "अनुकूलित वाहन विकल्प, रूट शेड्यूल और स्पष्ट शर्तों पर आपके साथ चर्चा की जाती है।"
      : locale === "te"
      ? "అనుకూలమైన వాహన ఎంపికలు, రూట్ షెడ్యూల్ మరియు స్పష్టమైన నిబంధనలు మీతో చర్చించబడతాయి."
      : "Tailored vehicle options, route schedule, and clear terms discussed with you.";

  const transparentStep3 =
    locale === "ar"
      ? "تأكيد مباشر مع بيانات السائق الخاص والمركبة المخصصة."
      : locale === "hi"
      ? "समर्पित ड्राइवर और वाहन प्रेषण विवरण के साथ प्रत्यक्ष पुष्टि।"
      : locale === "te"
      ? "ప్రత్యేక డ్రైవర్ మరియు వాహన పంపకం వివరాలతో ప్రత్యక్ష నిర్ధారణ."
      : locale === "kn"
      ? "ಮೀಸಲಾದ ಚಾಲಕ ಮತ್ತು ವಾಹನ ರವಾನೆ ವಿವರಗಳೊಂದಿಗೆ ನೇರ ದೃಢೀಕರಣ."
      : locale === "ta"
      ? "பிரத்யேக ஓட்டுநர் மற்றும் வாகன புறப்பாடு விவரங்களுடன் நேரடி உறுதிப்படுத்தல்."
      : locale === "ma"
      ? "പ്രത്യേക ഡ്രൈവറുടെയും വാഹനത്തിന്റെയും വിവരങ്ങളോടെ നേരിട്ടുള്ള സ്ഥിരീകരണം."
      : "Direct confirmation with dedicated chauffeur and vehicle dispatch details.";

  return (
    <section
      id="contact"
      tabIndex={-1}
      className={`${
        isStandalonePage ? "pt-6 pb-14 sm:pt-10 sm:pb-20" : "py-14 sm:py-20"
      } bg-white border-b border-brand-soft-neutral focus:outline-none`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`max-w-3xl ${isStandalonePage ? "mb-6 sm:mb-8" : "mb-8 sm:mb-12"}`}>
          <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
            {deskBadge}
          </span>
          {isStandalonePage ? (
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-2">
              {deskHeading}
            </h1>
          ) : (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-2">
              {deskHeading}
            </h2>
          )}
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
            {dict.enquiryForm.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Form & Live Draft */}
          <div className="lg:col-span-7 bg-brand-warm-white rounded-2xl p-6 sm:p-8 border border-brand-soft-neutral shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-brand-soft-neutral">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-indigo text-white flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm sm:text-base text-brand-ink">
                  {formTitle}
                </span>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                {deskStatus}
              </span>
            </div>

            {(selectedVehicle || selectedCategory) && (
              <div className="mb-5 flex flex-wrap items-center gap-2">
                {selectedVehicle && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-blue/10 border border-brand-blue/25 text-xs font-semibold text-brand-blue">
                    <span>{locale === "ar" ? "المركبة المطلوبة:" : locale === "hi" ? "चयनित वाहन:" : locale === "te" ? "ఎంచుకున్న వాహనం:" : locale === "kn" ? "ಆಯ್ಕೆಮಾಡಿದ ವಾಹನ:" : locale === "ta" ? "தேர்ந்தெடுக்கப்பட்ட வாகனம்:" : locale === "ma" ? "തിരഞ്ഞെടുത്ത വാഹനം:" : "Selected Vehicle:"} <strong>{selectedVehicle}</strong></span>
                    <button
                      type="button"
                      onClick={() => setSelectedVehicle(null)}
                      className="w-4 h-4 rounded-full bg-brand-blue/20 hover:bg-brand-blue hover:text-white flex items-center justify-center text-[10px] transition-colors ltr:ml-1 rtl:mr-1"
                      aria-label="Remove preselected vehicle"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {selectedCategory && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-indigo/10 border border-brand-indigo/25 text-xs font-semibold text-brand-indigo">
                    <span>{locale === "ar" ? "الفئة المفضلة:" : locale === "hi" ? "पसंदीदा श्रेणी:" : locale === "te" ? "ఇష్టపడే విభాగం:" : locale === "kn" ? "ಆದ್ಯತೆಯ ವರ್ಗ:" : locale === "ta" ? "விருப்பமான வகை:" : locale === "ma" ? "മുൻഗണനയുള്ള വിഭാഗം:" : "Preferred Category:"} <strong>{selectedCategory}</strong></span>
                    <button
                      type="button"
                      onClick={() => setSelectedCategory(null)}
                      className="w-4 h-4 rounded-full bg-brand-indigo/20 hover:bg-brand-indigo hover:text-white flex items-center justify-center text-[10px] transition-colors ltr:ml-1 rtl:mr-1"
                      aria-label="Remove category filter"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleContinueWhatsApp} noValidate className="space-y-6">
              {/* Contact & Company Fields (2-column on tablet/desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="enquiry-name-input"
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-ink mb-2 cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-brand-blue" />
                    <span>{dict.enquiryForm.name} *</span>
                  </label>
                  <input
                    id="enquiry-name-input"
                    name="fullName"
                    type="text"
                    required
                    aria-required="true"
                    aria-invalid={!!nameError}
                    aria-describedby={nameError ? "name-error" : undefined}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                    placeholder={dict.enquiryForm.namePlaceholder}
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-brand-ink placeholder:text-brand-ink/40 outline-none transition-all ${
                      nameError
                        ? "border-red-500 focus:ring-2 focus:ring-red-400"
                        : "border-brand-soft-neutral focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo"
                    }`}
                  />
                  {nameError && (
                    <p id="name-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{nameError}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="enquiry-company-input"
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-ink mb-2 cursor-pointer"
                  >
                    <Building2 className="w-3.5 h-3.5 text-brand-blue" />
                    <span>{dict.enquiryForm.company}</span>
                  </label>
                  <input
                    id="enquiry-company-input"
                    name="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={dict.enquiryForm.companyPlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-brand-soft-neutral bg-white text-sm text-brand-ink placeholder:text-brand-ink/40 focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo outline-none transition-all"
                  />
                </div>
              </div>

              {/* Service & City (2-column on tablet/desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor={serviceId}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-ink mb-2 cursor-pointer"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-brand-blue" />
                    <span>{dict.enquiryForm.service} *</span>
                  </label>
                  <select
                    id={serviceId}
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brand-soft-neutral bg-white text-sm text-brand-ink focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo outline-none"
                  >
                    <option value="General Vehicle Enquiry">{generalVehicleEnquiryLabel}</option>
                    {publishedServices.map((s) => (
                      <option key={s.slug} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={cityId}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-ink mb-2 cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                    <span>{dict.enquiryForm.city} *</span>
                  </label>
                  <select
                    id={cityId}
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brand-soft-neutral bg-white text-sm text-brand-ink focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo outline-none"
                  >
                    {publishedCities.map((c: any) => (
                      <option key={c.name} value={c.name}>
                        {c.name}{c.state ? ` (${c.state})` : c.emirate ? ` (${c.emirate})` : ""}
                      </option>
                    ))}
                    <option value="Other">{otherCityLabel}</option>
                  </select>
                </div>
              </div>

              {/* If "Other" city selected */}
              {selectedCity === "Other" && (
                <div>
                  <label
                    htmlFor={customCityId}
                    className="text-xs font-bold uppercase tracking-wider text-brand-ink block mb-2 cursor-pointer"
                  >
                    {dict.enquiryForm.customCity} *
                  </label>
                  <input
                    id={customCityId}
                    type="text"
                    required
                    aria-required="true"
                    aria-invalid={!!customCityError}
                    aria-describedby={customCityError ? "custom-city-error" : undefined}
                    value={customCity}
                    onChange={(e) => setCustomCity(e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, customCity: true }))}
                    placeholder={dict.enquiryForm.customCityPlaceholder}
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-brand-ink placeholder:text-brand-ink/40 outline-none transition-all ${
                      customCityError
                        ? "border-red-500 focus:ring-2 focus:ring-red-400"
                        : "border-brand-soft-neutral focus:ring-2 focus:ring-brand-indigo"
                    }`}
                  />
                  {customCityError && (
                    <p id="custom-city-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{customCityError}</span>
                    </p>
                  )}
                </div>
              )}

              {enquiry.planningFields && (
                <JourneyFields copy={journeyFieldsCopy || enquiry.planningFields} passengerCount={passengerCount} travelDate={travelDate} onPassengerChange={setPassengerCount} onDateChange={setTravelDate} passengerError={passengerError} dateError={dateError} />
              )}

              {/* Requirement Details */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="enquiry-requirement-input"
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-ink cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-brand-blue" />
                    <span>{dict.enquiryForm.requirement} *</span>
                  </label>
                  {currentServiceObj && currentServiceObj.enquiryDetails.length > 0 && (
                    <span className="text-[11px] text-brand-indigo font-medium hidden sm:inline-block">
                      Include: {currentServiceObj.enquiryDetails.slice(0, 3).join(", ")}
                    </span>
                  )}
                </div>
                <textarea
                  id="enquiry-requirement-input"
                  name="requirement"
                  required
                  aria-required="true"
                  aria-invalid={!!requirementError}
                  aria-describedby={requirementError ? "req-error" : undefined}
                  rows={4}
                  value={requirementText}
                  onChange={(e) => setRequirementText(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, requirement: true }))}
                  placeholder={getRequirementPlaceholder()}
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-brand-ink placeholder:text-brand-ink/40 outline-none resize-none transition-all ${
                    requirementError
                      ? "border-red-500 focus:ring-2 focus:ring-red-400"
                      : "border-brand-soft-neutral focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo"
                  }`}
                />
                {requirementError && (
                  <p id="req-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{requirementError}</span>
                  </p>
                )}
              </div>

              {/* Requirement Summary Box */}
              <div className="bg-white rounded-xl p-4 border border-brand-soft-neutral space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-ink/70">
                    {summaryTitle}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyDraft}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded bg-brand-warm-white hover:bg-brand-soft-neutral text-brand-ink/80 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-indigo"
                    aria-label="Copy draft enquiry specification to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">{dict.enquiryForm.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-brand-indigo" />
                        <span>{dict.enquiryForm.copyDraft}</span>
                      </>
                    )}
                  </button>
                </div>

                <pre aria-label="WhatsApp message preview" className="whitespace-pre-wrap break-words rounded-lg border border-brand-soft-neutral/70 bg-brand-warm-white p-3.5 font-sans text-sm leading-relaxed text-brand-ink/85">{draftMessage}</pre>
                {copyFailed && <p role="status" className="text-sm text-brand-ink/75">Copy is unavailable here. Select and copy the message above, or continue on WhatsApp.</p>}
              </div>

              {/* Helper Notice regarding WhatsApp behaviour */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-brand-soft-neutral/40 border border-brand-soft-neutral text-xs text-brand-ink/80 leading-relaxed">
                <Info className="w-4 h-4 text-brand-indigo shrink-0 mt-0.5" />
                <div>
                  {dict.enquiryForm.whatsappExplainer}
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <Send className="w-4 h-4" />
                <span>{dict.enquiryForm.submit}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Direct Contact Details & Business Card Baseline */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Calling Card */}
            <div className="bg-brand-ink text-white rounded-2xl p-8 sm:p-10 shadow-lg">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-soft-neutral/70 block mb-2">
                {locale === "ar" ? "المساعدة الفورية" : locale === "hi" ? "त्वरित सहायता" : locale === "te" ? "తక్షణ సహాయం" : locale === "kn" ? "ತ್ವರಿತ ಸಹಾಯ" : locale === "ta" ? "உடனடி உதவி" : locale === "ma" ? "ഉടനടി സഹായം" : "Immediate Assistance"}
              </span>
              <h3 className="text-2xl font-bold mb-4">{speakDirectlyTitle}</h3>
              <p className="text-sm text-brand-soft-neutral/80 leading-relaxed mb-6">
                {speakDirectlyDesc}
              </p>

              <div className="space-y-4">
                <a
                  href={contact.phoneHref}
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white text-brand-indigo flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-brand-soft-neutral/70 block">
                      {callDirectLabel}
                    </span>
                    <span className="text-base font-bold text-white group-hover:text-brand-soft-neutral" dir="ltr">
                      {contact.phoneDisplay}
                    </span>
                  </div>
                </a>

                <a
                  href={`${contact.whatsappBaseUrl}?text=${encodeURIComponent(
                    locale === "ar"
                      ? "مرحباً فريق فيكتور موبيليتي، أود مناقشة متطلبات النقل والتنقل."
                      : locale === "hi"
                      ? "नमस्ते Victor Mobility टीम, मैं परिवहन आवश्यकता पर चर्चा करना चाहता हूँ।"
                      : locale === "te"
                      ? "నమస్కారం Victor Mobility బృందం, నేను రవాణా అవసరాల గురించి చర్చించాలనుకుంటున్నాను."
                      : locale === "kn"
                      ? "ನಮಸ್ಕಾರ Victor Mobility ತಂಡ, ನಾನು ಸಾರಿಗೆ ಅವಶ್ಯಕತೆಗಳ ಬಗ್ಗೆ ಚರ್ಚಿಸಲು ಬಯಸುತ್ತೇನೆ."
                      : locale === "ta"
                      ? "வணக்கம் Victor Mobility குழு, நான் ஒரு போக்குவரத்து தேவை பற்றி பேச விரும்புகிறேன்."
                      : locale === "ma"
                      ? "നമസ്കാരം Victor Mobility ടീം, ഞാൻ യാത്രാ ആവശ്യങ്ങളെക്കുറിച്ച് സംസാരിക്കാൻ ആഗ്രഹിക്കുന്നു."
                      : "Hello Victor Mobility team, I would like to discuss a transport requirement."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-emerald-200 block">
                      {directWhatsappLabel}
                    </span>
                    <span className="text-base font-bold text-white" dir="ltr">
                      {contact.whatsappDisplay}
                    </span>
                  </div>
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-white/15 flex items-center gap-3.5">
                {contact.imageSrc && (
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/20 bg-white/10 shadow-xs">
                    <Image
                      src={contact.imageSrc}
                      alt={`Portrait of ${contact.name}`}
                      fill
                      sizes="48px"
                      className="object-cover object-top"
                    />
                  </div>
                )}
                <div className="text-xs text-brand-soft-neutral/70">
                  <span className="font-bold text-white block text-sm">{contact.name}</span>
                  <span className="text-brand-soft-neutral/85">{contact.role}</span>
                </div>
              </div>
            </div>

            {/* Operating Guidelines Card */}
            <div className="bg-brand-warm-white rounded-2xl p-6 sm:p-8 border border-brand-soft-neutral">
              <h4 className="text-sm font-bold text-brand-ink mb-3">
                {transparentProcessTitle}
              </h4>
              <ul className="space-y-2.5 text-xs text-brand-ink/75">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0 mt-1.5" />
                  <span>{transparentStep1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0 mt-1.5" />
                  <span>{transparentStep2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0 mt-1.5" />
                  <span>{transparentStep3}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
