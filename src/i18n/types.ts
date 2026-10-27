export type SupportedLocale = "en" | "hi" | "te" | "kn" | "ta" | "ma" | "ar";
export type Region = "india" | "uae";

export interface LocaleMeta {
  code: SupportedLocale;
  name: string;
  nativeName: string;
  flag?: string;
  dir: "ltr" | "rtl";
}

export const INDIA_LOCALES: LocaleMeta[] = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", dir: "ltr" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", dir: "ltr" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", dir: "ltr" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", dir: "ltr" },
  { code: "ma", name: "Malayalam", nativeName: "മലയാളം", dir: "ltr" },
];

export const UAE_LOCALES: LocaleMeta[] = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr" },
  { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl" },
];

export const SUPPORTED_LOCALES: LocaleMeta[] = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", dir: "ltr" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", dir: "ltr" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", dir: "ltr" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", dir: "ltr" },
  { code: "ma", name: "Malayalam", nativeName: "മലയാളം", dir: "ltr" },
  { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl" },
];

export interface TranslationDictionary {
  nav: {
    home: string;
    services: string;
    fleet: string;
    estimator: string;
    rfp: string;
    about: string;
    contact: string;
    enquire: string;
    call: string;
    privacy: string;
    discussRequirement: string;
    menuLabel: string;
    closeMenu: string;
    changeLanguage: string;
    selectLanguage: string;
  };
  hero: {
    slides: {
      slug: string;
      category: string;
      title: string;
      subtitle: string;
      badges: string[];
    }[];
    uaeSlides?: {
      slug: string;
      category: string;
      title: string;
      subtitle: string;
      badges: string[];
    }[];
    exploreService: string;
    discussRequirement: string;
    imageCaption: string;
  };
  stats: {
    established: string[];
    experience: string[];
    fleet: string[];
    clients: string[];
    offices: string[];
    services: string[];
    uaeEstablished?: string[];
    uaeExperience?: string[];
    uaeFleet?: string[];
    uaeClients?: string[];
    uaeOffices?: string[];
    uaeServices?: string[];
  };
  companies: {
    eyebrow: string;
    title: string;
    description: string;
    uaeDescription?: string;
  };
  servicesSection: {
    eyebrow: string;
    title: string;
    description: string;
    allServicesLink: string;
    requestQuote: string;
    viewDetails: string;
    items: Record<
      string,
      {
        title: string;
        description: string;
      }
    >;
  };
  safetySection: {
    eyebrow: string;
    title: string;
    subtitle: string;
    pillars: {
      id: string;
      number: string;
      title: string;
      description: string;
    }[];
    bannerTitle: string;
    bannerDescription: string;
    bannerCta: string;
  };
  fleet: {
    eyebrow: string;
    title: string;
    description: string;
    tabLabel: string;
    modelsLabel: string;
    capacityLabel: string;
    useLabel: string;
    priceLabel: string;
    priceNote: string;
    packageLabel: string;
    enquireCta: string;
    estimateCta: string;
    exploreAll: string;
    imageCaption: string;
    requestQuote: string;
    enquireVehicle: string;
    sharedNote: string;
    filterTabs: {
      all: string;
      sedan: string;
      suv: string;
      twelveSeater: string;
      electric: string;
    };
    fuelBadges: {
      petrol: string;
      petrolCng: string;
      electricVehicle: string;
      longRangeElectricVehicle: string;
      diesel: string;
    };
    electric?: {
      title: string;
      introduction: string;
      journeyRequirementsLabel: string;
      journeyRequirementsValue: string;
      passengerRequirementsLabel: string;
      passengerRequirementsValue: string;
      vehicleAllocationLabel: string;
      vehicleAllocationValue: string;
      pricingLabel: string;
      priceValue: string;
      enquireCta: string;
      availabilityNote: string;
    };
    categories: Record<
      string,
      {
        name: string;
        capacity: string;
        models: string;
        use: string;
      }
    >;
  };
  journey: {
    eyebrow: string;
    title: string;
    subtitle: string;
    milestones: {
      period: string;
      title: string;
      description: string;
    }[];
  };
  presence: {
    eyebrow: string;
    title: string;
    searchPlaceholder: string;
    clearSearch: string;
    noResults: string;
    headOffice: string;
    branchOffice: string;
    commercialHub: string;
    enquireFor: string;
    callHub: string;
    registeredAddress: string;
    corridorsLabel: string;
    uaeEyebrow?: string;
    uaeTitle?: string;
    uaeDescription?: string;
    dubai?: { name: string; label: string; corridors: string; capabilities: string; address?: string };
    abuDhabi?: { name: string; label: string; corridors: string; capabilities: string; address?: string };
    sharjah?: { name: string; label: string; corridors: string; capabilities: string; address?: string };
    rtaLicensed?: string;
    rtaSub?: string;
    airportHubs?: string;
    airportSub?: string;
    dispatchDesk?: string;
    dispatchSub?: string;
    selectLocation?: string;
    operatingAddress?: string;
    primaryCorridors?: string;
    dedicatedCapabilities?: string;
    locationNotFound?: string;
  };
  people: {
    eyebrow: string;
    title: string;
    subtitle: string;
    founderTitle: string;
    founderName: string;
    founderBio: string[];
    accountabilityTitle: string;
    accountabilityText: string;
    uaeBio?: string;
    founderVision?: string;
    businessPartnerships?: string;
    dubaiOperationsDesk?: string;
    headOfficeLabel?: string;
    operationsCoordinationDesk?: string;
    operationsDeskDescUae?: string;
    operationsDeskDescIndia?: string;
    businessPartnershipDescUae?: string;
    businessPartnershipDescIndia?: string;
    fullCompanyStoryLink?: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  contactSection: {
    title: string;
    subtitle: string;
    whatsappCta: string;
    callCta: string;
    partnerEyebrow: string;
    partnerTitle: string;
    partnerDescription: string;
    partnerCta: string;
    partnerHelper: string;
  };
  footer: {
    tagline: string;
    aboutText: string;
    exploreTitle: string;
    hubsTitle: string;
    contactTitle: string;
    allRightsReserved: string;
    privacyNotice: string;
    isoCommitment: string;
  };
  estimator: {
    title: string;
    description: string;
    formTitle: string;
    formHelp: string;
    city: string;
    otherCity: string;
    pickup: string;
    dropoff: string;
    passengers: string;
    seats: string;
    capacityHelp: string;
    distance: string;
    days: string;
    returnTrip: string;
    rate: string;
    rateHelp: string;
    calculate: string;
    resultTitle: string;
    emptyTitle: string;
    emptyHelp: string;
    vehicleLabel: string;
    distanceLabel: string;
    budgetLabel: string;
    noRate: string;
    basisTitle: string;
    basisHelp: string;
    exclusions: string;
    review: string;
    rfpLink: string;
    summaryTitle: string;
    errors: {
      pickup: string;
      dropoff: string;
      passengers: string;
      seats: string;
      distance: string;
      days: string;
      rate: string;
    };
  };
  rfp: {
    title: string;
    sideTitle: string;
    sideDescription: string;
    steps: [string, string, string];
    intro: string;
    requirementsHelp: string;
    reviewHelp: string;
    company: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    city: string;
    customCity: string;
    service: string;
    passengers: string;
    date: string;
    schedule: string;
    details: string;
    scheduleOptions: string[];
    vehiclesTitle: string;
    summaryTitle: string;
    notSpecified: string;
    continue: string;
    back: string;
    buildAnother: string;
    errors: {
      company: string;
      name: string;
      email: string;
      city: string;
      passengers: string;
      date: string;
      details: string;
    };
  };
  planningActions: {
    whatsapp: string;
    whatsappNote: string;
    copy: string;
    copied: string;
    download: string;
  };
  enquiryAssistant: {
    trigger: string;
    title: string;
    intro: string;
    stepTitles: [string, string, string];
    serviceLabel: string;
    cityLabel: string;
    otherCity: string;
    customCityLabel: string;
    nameLabel: string;
    companyLabel: string;
    detailsLabel: string;
    detailsPlaceholder: string;
    passengerLabel: string;
    dateLabel: string;
    next: string;
    back: string;
    restart: string;
    close: string;
    fullForm: string;
    submitLabel: string;
    disclaimer: string;
    errors: {
      name: string;
      city: string;
      details: string;
      passengers: string;
      date: string;
    };
  };
  enquiryForm: {
    title: string;
    subtitle: string;
    name: string;
    namePlaceholder: string;
    company: string;
    companyPlaceholder: string;
    service: string;
    city: string;
    customCity: string;
    customCityPlaceholder: string;
    requirement: string;
    requirementPlaceholder: string;
    passengers: string;
    date: string;
    submit: string;
    whatsappExplainer: string;
    copyDraft: string;
    copied: string;
    callOption: string;
    errors: {
      name: string;
      customCity: string;
      requirement: string;
      passengers: string;
      date: string;
    };
  };
}
