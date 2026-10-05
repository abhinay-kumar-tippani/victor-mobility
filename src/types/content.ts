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

export interface FleetCategory {
  id: string;
  name: string;
  description: string;
  brochureModels: string[];
  source: string;
}

export interface ContactData {
  name: string;
  role: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappDisplay: string;
  whatsappDigits: string;
  whatsappBaseUrl: string;
  printedEmail: string;
  emailEnabled: boolean;
  printedDomain: string;
  domainPurchased: boolean;
}

export interface EnquiryData {
  mode: string;
  submitLabel: string;
  helperText: string;
  isConfirmedBooking: boolean;
  fields: string[];
  fallback: string;
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
  fleetNote: string;
  fleetModelDisplayDefault: boolean;
  contact: ContactData;
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
