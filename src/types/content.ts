export interface CustomerJourneyItem {
  id: string;
  title: string;
  eyebrow: string;
  tagline: string;
  description: string;
  serviceSlug: string;
  serviceTitle: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
  keyPoints: string[];
  ctaLabel: string;
  enquiryService: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  badge?: string;
  shortDescription: string;
  description: string;
  source: string;
  enquiryDetails: string[];
  published: boolean;
}

export interface CityItem {
  name: string;
  state: string;
  kind: string;
  published: boolean;
  source: string;
}

export interface OfficeItem {
  city: string;
  label: string;
  address: string;
  source: string;
  published: boolean;
}

export interface FleetVehicle {
  id: string;
  name: string;
  cabType: "Sedan" | "SUV" | "12 Seater";
  fuelType: "Petrol" | "Petrol & CNG" | "Electric Vehicle" | "Long Range Electric Vehicle" | "Diesel";
  isElectric: boolean;
  image: string;
  imageAlt: string;
  description?: string;
}

export interface FleetCategory {
  id: string;
  name: string;
  description: string;
  brochureModels: string[];
  source: string;
}

export interface DeskPerson {
  name: string;
  designation: string;
  imageSrc?: string;
  phoneDisplay: string;
  phoneHref: string;
  deskPhoneDisplay?: string;
  deskPhoneHref?: string;
  whatsappDisplay: string;
  whatsappDigits: string;
  email?: string;
}

export interface ContactData {
  name: string;
  role: string;
  imageSrc?: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappDisplay: string;
  whatsappDigits: string;
  whatsappBaseUrl: string;
  printedEmail: string;
  emailEnabled: boolean;
  printedDomain: string;
  domainPurchased: boolean;
  available247?: {
    headline: string;
    subtitle: string;
    people: DeskPerson[];
  };
}

export interface TeamProfile {
  id: string;
  name: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
  placeholder: boolean;
  division?: string;
  description?: string;
  phoneDisplay?: string;
  phoneHref?: string;
  deskPhoneDisplay?: string;
  deskPhoneHref?: string;
  whatsappDisplay?: string;
  whatsappDigits?: string;
  emailDisplay?: string;
  emailEnabled?: boolean;
}

export interface JourneyFieldsCopy {
  passengerLabel: string;
  dateLabel: string;
  help: string;
  passengerError: string;
  dateError: string;
}

export interface EnquiryData {
  mode: string;
  submitLabel: string;
  helperText: string;
  isConfirmedBooking: boolean;
  fields: string[];
  fallback: string;
  planningFields?: JourneyFieldsCopy;
}

export interface IndiaContent {
  schemaVersion: number;
  region: string;
  countryName: string;
  companyName: string;
  tagline: string;
  contentBasis: string;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    subtext?: string;
    primaryCta: {
      label: string;
      href: string;
    };
    secondaryCta: {
      label: string;
      href: string;
    };
  };
  about: {
    title: string;
    description: string;
    coverage: string;
    cta: string;
    story?: {
      foundingVision: string;
      leadershipRole: string;
      leadershipName: string;
      commitments: Array<{
        title: string;
        description: string;
      }>;
      audiences: Array<{
        title: string;
        tagline: string;
        description: string;
      }>;
    };
  };
  customerJourneys?: CustomerJourneyItem[];
  services: ServiceItem[];
  cities: CityItem[];
  brochureExpansionCities: Array<{
    name: string;
    kind: string;
    published: boolean;
    source: string;
  }>;
  offices: OfficeItem[];
  fleetCategories: FleetCategory[];
  fleetVehicles?: FleetVehicle[];
  fleetNote: string;
  fleetModelDisplayDefault: boolean;
  contact: ContactData;
  teamProfiles?: TeamProfile[];
  teamFeaturedEmail?: { display: string; enabled: boolean };
  enquiry: EnquiryData;
  sourceClaims: {
    iso?: {
      text: string;
      source: string;
      enabled: boolean;
      note: string;
    };
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  founder?: {
    name: string;
    role: string;
    experience: string;
    quote: string;
    imageSrc: string;
    bio: string;
    aboutBio?: string[];
  };
  milestones?: Array<{
    year: string;
    quarter?: string;
    title: string;
    description: string;
  }>;
  esteemedClientele?: string[];
  caseStudies?: Array<{
    id: string;
    category: string;
    title: string;
    clientType: string;
    locations: string;
    challenge: string;
    solution: string;
    outcome: string;
    metrics: string[];
  }>;
  safetyCommitments?: Array<{
    title: string;
    description: string;
  }>;
}

export interface MediaAsset {
  id: string;
  src: string;
  alt: string;
  focalPointDesktop: string;
  focalPointMobile: string;
  aiGenerated: boolean;
  temporary: boolean;
  actualVictorFleetPhoto: boolean;
}

export interface MediaContent {
  caption: string;
  assets: MediaAsset[];
  replacementInstructions: string;
}
