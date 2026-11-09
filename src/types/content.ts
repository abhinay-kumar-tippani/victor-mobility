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
  mapQuery?: string;
  mapUrl?: string;
}

export interface FleetVehicle {
  id: string;
  name: string;
  cabType: string;
  fuelType: string;
  isElectric: boolean;
  image: string;
  imageAlt: string;
  imageDetails?: {
    doorImage: string;
    plateImage: string;
    plateText: string;
  };
  description?: string;
  seatingCapacity?: string;
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
  teamContact?: ContactData;
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
  achievements?: AchievementsContent;
  driverTraining?: DriverTrainingContent;
}

export interface SampleCertificate {
  title: string;
  sampleLabel: string;
  eyebrow: string;
  caption: string;
  imageSrc: string;
  imageAlt: string;
  actionLabel: string;
  modalTitle: string;
}

export interface SampleMilestone {
  id: string;
  title: string;
  label: string;
  description: string;
}

export interface AchievementsContent {
  title: string;
  subtitle: string;
  sampleCertificate: SampleCertificate;
  sampleMilestones: SampleMilestone[];
}

export interface DriverTrainingCurriculumMoment {
  moment: number;
  title: string;
  description: string;
  practicalExample: string;
}

export interface DriverTrainingScenario {
  badge: string;
  title: string;
  question: string;
  disclosureLabel: string;
  suggestedResponse: string;
  educationalNote: string;
}

export interface DriverTrainingContent {
  title: string;
  intro: string;
  curriculumSectionLabel: string;
  curriculumMoments: DriverTrainingCurriculumMoment[];
  scenario: DriverTrainingScenario;
  academyCta: {
    heading: string;
    description: string;
    buttonLabel: string;
    href: string;
  };
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
