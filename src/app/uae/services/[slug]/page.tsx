import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Users,
  Bus,
  Calendar,
  Plane,
  Car,
  KeyRound,
  CheckCircle2,
  Phone,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Clock,
  MapPin,
  HelpCircle,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import uaeData from "@/content/uae.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";

interface PageProps {
  params: {
    slug: string;
  };
}

const serviceIcons: Record<string, React.ElementType> = {
  "chauffeur-luxury": Car,
  "airport-transfers": Plane,
  "event-transportation": Calendar,
  "employee-transportation": Users,
  "tourism-travel": Sparkles,
  "rent-a-car": KeyRound,
};

const serviceVisualMap: Record<
  string,
  {
    imageSrc: string;
    imageAlt: string;
    caption: string;
    highlights: { title: string; desc: string }[];
    recommendedComplementary: string[];
    scenario: {
      title: string;
      subtitle: string;
      steps: { step: string; detail: string }[];
    };
    practicalAnswers: {
      question: string;
      answer: string;
    }[];
  }
> = {
  "chauffeur-luxury": {
    imageSrc: "/images/india/services/service-chauffeur-luxury.jpg",
    imageAlt: "Executive luxury saloon with professional chauffeur in Dubai",
    caption: "Executive luxury cabin with refined leather seating. Vehicle imagery is illustrative.",
    highlights: [
      {
        title: "Discretion & Executive Etiquette",
        desc: "Experienced, courteous bilingual chauffeurs trained in executive etiquette, non-intrusive service, and strict passenger confidentiality.",
      },
      {
        title: "First Class Cabin Comfort & Amenities",
        desc: "Pristine leather interiors with multi-zone climate control, quiet acoustic insulation, mobile charging access, and bottled water.",
      },
      {
        title: "Hourly Retainers & Inter-Emirate Transit",
        desc: "Continuous vehicle standby outside corporate headquarters, luxury hotels, and seamless highway transfers between Dubai and Abu Dhabi.",
      },
    ],
    recommendedComplementary: ["airport-transfers", "event-transportation"],
    scenario: {
      title: "Executive Chauffeur Protocol",
      subtitle: "Standard operating procedure for visiting dignitaries, executives, and VIP guests across the Emirates",
      steps: [
        {
          step: "1. Advance Vehicle Sanitisation & Staging",
          detail: "Pristine Mercedes-Benz S-Class or BMW 7 Series arrives 15 minutes ahead of schedule, with climate preset and cabin amenities inspected.",
        },
        {
          step: "2. Executive Greeting & Route Review",
          detail: "Chauffeur greets passengers courteously, assists with luggage, and confirms the optimal expressway or city corridor route.",
        },
        {
          step: "3. Route Discretion & Cabin Privacy",
          detail: "Chauffeurs observe strict non-intrusive protocol, acoustic privacy, and route discretion across DIFC, Downtown, and inter-emirate highways.",
        },
        {
          step: "4. Hourly Standby & Board Disposal",
          detail: "Continuous vehicle standby outside corporate headquarters, hotel lobbies, or meeting venues for seamless multi-stop itineraries.",
        },
      ],
    },
    practicalAnswers: [
      {
        question: "What vehicle categories are available for executive chauffeur hire in the UAE?",
        answer: "Our UAE chauffeur fleet comprises first-class saloons (Mercedes-Benz S-Class, BMW 7 Series), ultra-luxury vehicles (Mercedes-Maybach), and executive SUVs (Cadillac Escalade) for delegation convoys.",
      },
      {
        question: "Can we hire a chauffeur for inter-emirate transit between Dubai and Abu Dhabi?",
        answer: "Yes. We operate frequent Dubai ↔ Abu Dhabi transfers and full-day retainers covering all highway tolls (Salik/Darb) with transparent AED billing.",
      },
    ],
  },
  "airport-transfers": {
    imageSrc: "/images/india/services/service-airport-transfers.jpg",
    imageAlt: "Mercedes-Benz S-Class at airport VIP private terminal curb in warm dusk lighting",
    caption: "Punctual terminal connections across DXB, DWC, and AUH airports. Vehicle imagery is illustrative.",
    highlights: [
      {
        title: "Live Radar Flight Tracking",
        desc: "Real-time alignment with inbound flight schedules at Dubai International (DXB T1/T2/T3, Al Majlis), Dubai World Central (DWC), and Zayed International (AUH).",
      },
      {
        title: "Curbside Meet & Paging",
        desc: "Designated arrival hall greeting with personalized corporate nameboard, luggage handling, and curbside limousine dispatch.",
      },
      {
        title: "Individual & Delegation Capacity",
        desc: "First-class sedans for solo executives and spacious Cadillac Escalade / Mercedes V-Class for luggage-heavy delegation arrivals.",
      },
    ],
    recommendedComplementary: ["chauffeur-luxury", "event-transportation"],
    scenario: {
      title: "Terminal Punctuality Protocol",
      subtitle: "Seamless airport arrival and departure management across DXB, DWC, and AUH terminals",
      steps: [
        {
          step: "1. Flight Radar Monitoring",
          detail: "Arrival timing is tracked dynamically through live aviation feeds so your chauffeur synchronizes precisely with wheels-down time.",
        },
        {
          step: "2. Terminal Arrival Bay Greeting",
          detail: "Chauffeur stages inside the arrivals hall with an electronic or physical nameboard, assisting with all baggage.",
        },
        {
          step: "3. Express Curbside Boarding",
          detail: "Direct escort to the staging lane with pre-cooled cabin, ensuring departure from the airport within minutes of customs clearance.",
        },
        {
          step: "4. Direct Expressway Transit",
          detail: "Immediate routing via Sheikh Zayed Road or Al Khail Road to Downtown Dubai, DIFC, Dubai Marina, or Abu Dhabi.",
        },
      ],
    },
    practicalAnswers: [
      {
        question: "Which UAE airport terminals are covered?",
        answer: "We provide scheduled terminal pickups and drops at Dubai International (DXB Terminals 1, 2, and 3, plus Al Majlis VIP lounge), Dubai World Central (DWC Jetex FBO), and Abu Dhabi Zayed International (AUH).",
      },
      {
        question: "How are inbound flight delays handled?",
        answer: "Our operations desk tracks your flight number in real time. Chauffeur dispatch adjusts automatically to landing delays with no premature departures.",
      },
    ],
  },
  "event-transportation": {
    imageSrc: "/images/india/services/service-event-transport.jpg",
    imageAlt: "Lineup of luxury black limousines outside grand venue",
    caption: "Synchronized fleet logistics for trade summits and galas. Vehicle imagery is illustrative.",
    highlights: [
      {
        title: "Global Trade Summits & Expos",
        desc: "Full transportation logistics for major UAE expos including GITEX Global, ADIPEC, Arabian Travel Market, and World Government Summit.",
      },
      {
        title: "Dedicated Route Marshals",
        desc: "On-ground dispatch supervisors managing vehicle queueing, hotel departures, and venue drop-off zones.",
      },
      {
        title: "Coordinated Delegation Convoys",
        desc: "Synchronized multi-vehicle motorcades with executive sedans, luxury MPVs, and VIP coaches moving in harmony.",
      },
    ],
    recommendedComplementary: ["chauffeur-luxury", "employee-transportation"],
    scenario: {
      title: "Summit & Event Fleet Logistics",
      subtitle: "How we coordinate venue transfers, dignitary convoys, and conference shuttle loops",
      steps: [
        {
          step: "1. Timetable & Venue Route Mapping",
          detail: "We integrate all venue hubs (Dubai World Trade Centre, ADNEC, Dubai South), hotel blocks, and flight arrival times into a unified schedule.",
        },
        {
          step: "2. VIP & Dignitary Convoys",
          detail: "Executive saloons and SUVs detailed for VIP guests, escorted with dedicated priority parking and curbside access.",
        },
        {
          step: "3. Delegation Shuttle Loops",
          detail: "Luxury 22 and 44-seater coaches operating scheduled continuous circuits between accommodation hotels and convention halls.",
        },
        {
          step: "4. Real-Time Schedule Adaptation",
          detail: "On-site dispatch coordinators absorb ceremony extensions, session overruns, and unexpected timetable changes seamlessly.",
        },
      ],
    },
    practicalAnswers: [
      {
        question: "Can you manage transport for large exhibitions like GITEX or ADIPEC?",
        answer: "Yes. Victor Mobility manages multi-vehicle allocations spanning executive saloons, MPVs, and coaches with on-ground marshals at DWTC and ADNEC.",
      },
      {
        question: "What contingency plans are in place for sudden schedule changes?",
        answer: "Every event deployment includes dedicated standby vehicles and buffer windows agreed in your proposal to accommodate session overruns.",
      },
    ],
  },
  "employee-transportation": {
    imageSrc: "/images/india/services/service-employee-transport.jpg",
    imageAlt: "Corporate staff transit shuttle coach outside modern commercial office",
    caption: "Workplace commute shuttles and staff mobility. Vehicle imagery is illustrative.",
    highlights: [
      {
        title: "Shift Roster Synchronisation",
        desc: "Engineered around free-zone and commercial office shifts to guarantee punctual attendance and eliminate employee commute stress.",
      },
      {
        title: "Corridor & Route Optimisation",
        desc: "Structured pickup hubs across residential districts connecting to DIFC, Dubai Internet City, Dubai South, and Sharjah industrial corridors.",
      },
      {
        title: "RTA Compliant Fleet",
        desc: "Air-conditioned 22 & 44-seater luxury coaches and passenger vans maintained under strict commercial inspection standards.",
      },
    ],
    recommendedComplementary: ["rent-a-car", "event-transportation"],
    scenario: {
      title: "Workforce Mobility Architecture",
      subtitle: "How we manage reliable employee transit for corporations and free-zone facilities",
      steps: [
        {
          step: "1. Corridor & Cluster Analysis",
          detail: "Employee residences are mapped into efficient cluster pickup points along major transit arteries to minimize overall commute time.",
        },
        {
          step: "2. Shift Synchronisation",
          detail: "Pickup and arrival timetables are precision-matched to facility work hours, accommodating single-shift and 24/7 rotational operations.",
        },
        {
          step: "3. Pre-Trip Vehicle Inspection",
          detail: "Air conditioning performance, seatbelts, cabin sanitisation, and driver credentials verified before the first pickup.",
        },
        {
          step: "4. Central Operations Liaison",
          detail: "Dedicated direct communication between our operations desk and your corporate HR or admin manager for immediate updates.",
        },
      ],
    },
    practicalAnswers: [
      {
        question: "Which free zones and commercial areas in the UAE are served?",
        answer: "We provide staff mobility across DIFC, Dubai Internet City, Dubai Media City, JAFZA, DAFZA, Sharjah Free Zone, and Abu Dhabi commercial corridors.",
      },
      {
        question: "How are roster adjustments handled?",
        answer: "Our operations desk updates route schedules directly with your facility transport coordinator to reflect revised shift rosters immediately.",
      },
    ],
  },
  "tourism-travel": {
    imageSrc: "/images/uae/uae-hero.jpg",
    imageAlt: "Executive luxury fleet outside contemporary Dubai architectural landmark",
    caption: "Curated private excursions and city tours across the Emirates. Vehicle imagery is illustrative.",
    highlights: [
      {
        title: "Iconic Landmarks & Cultural Heritage",
        desc: "Bespoke itineraries covering Burj Khalifa, Palm Jumeirah, Dubai Frame, Sheikh Zayed Grand Mosque, and Louvre Abu Dhabi.",
      },
      {
        title: "Experienced, Multilingual Chauffeurs",
        desc: "Knowledgeable chauffeurs who ensure a relaxed, courteous, and informative experience throughout your journey.",
      },
      {
        title: "Flexible Full-Day & Multi-Day Hire",
        desc: "Seamless disposal for shopping excursions, dining reservations, architectural tours, and desert resort transfers.",
      },
    ],
    recommendedComplementary: ["chauffeur-luxury", "airport-transfers"],
    scenario: {
      title: "Curated UAE City Excursion",
      subtitle: "Custom private sightseeing itineraries tailored for visiting executives, families, and delegations",
      steps: [
        {
          step: "1. Custom Itinerary Design",
          detail: "Pickups, timing, and preferred landmarks arranged in consultation with your schedule to maximize comfort and minimize transit delays.",
        },
        {
          step: "2. Chauffeur Staging & Presentation",
          detail: "Pristine luxury vehicle arrives with chilled refreshments, mobile chargers, and sanitized cabin readiness.",
        },
        {
          step: "3. Seamless Multi-Stop Sightseeing",
          detail: "Chauffeur provides door-to-door access at major landmarks, waiting on standby while you enjoy your visit.",
        },
        {
          step: "4. Relaxed Hotel or Airport Return",
          detail: "Flexible completion of your excursion with convenient drop-off at your hotel, private residence, or terminal departure curb.",
        },
      ],
    },
    practicalAnswers: [
      {
        question: "Can tours combine Dubai and Abu Dhabi on the same day?",
        answer: "Yes. Our full-day inter-emirate packages allow guests to experience Dubai landmarks in the morning and Abu Dhabi cultural sites in the afternoon.",
      },
      {
        question: "Are highway tolls and fuel included in private tour packages?",
        answer: "Yes. All Salik and Darb toll clearances, fuel, and chauffeur services are inclusive in our upfront package quotation.",
      },
    ],
  },
  "rent-a-car": {
    imageSrc: "/images/india/services/service-rent-a-car.jpg",
    imageAlt: "Executive sedan and luxury fleet outside corporate headquarters",
    caption: "Corporate fleet hire and flexible vehicle leasing. Vehicle imagery is illustrative.",
    highlights: [
      {
        title: "Corporate Monthly & Annual Retainers",
        desc: "Dedicated vehicle allocations with fixed monthly invoicing, full maintenance, and replacement guarantee.",
      },
      {
        title: "Short-Term Luxury Fleet Hire",
        desc: "Daily and weekly rentals of premium Mercedes-Benz, BMW, Cadillac, and luxury SUV models for visiting executives.",
      },
      {
        title: "Comprehensive Insurance & Zero Surprises",
        desc: "Fully insured commercial vehicles, prompt roadside assistance, and clear terms with zero hidden fees.",
      },
    ],
    recommendedComplementary: ["employee-transportation", "chauffeur-luxury"],
    scenario: {
      title: "Corporate Fleet Allocation Workflow",
      subtitle: "How enterprise clients secure flexible luxury vehicle leases and retainers in the UAE",
      steps: [
        {
          step: "1. Fleet Requirement Assessment",
          detail: "We evaluate vehicle class, expected monthly mileage, duration, and whether chauffeur or self-drive allocation is needed.",
        },
        {
          step: "2. Proposal & Corporate Terms",
          detail: "A transparent tariff agreement in AED detailing maintenance inclusions, insurance coverage, and flexible renewal options.",
        },
        {
          step: "3. White-Glove Vehicle Handover",
          detail: "Detailed, inspected, and fully fueled vehicle delivered directly to your corporate office or residence.",
        },
        {
          step: "4. Ongoing Fleet Support & Maintenance",
          detail: "Scheduled maintenance checkups, complimentary replacement vehicles during servicing, and dedicated account management.",
        },
      ],
    },
    practicalAnswers: [
      {
        question: "What documents are required for corporate vehicle leasing in the UAE?",
        answer: "Corporate leases require a valid UAE Trade Licence, passport/Emirates ID of authorised signatory, and valid driving licences for assigned drivers.",
      },
      {
        question: "Is vehicle maintenance included in corporate retainers?",
        answer: "Yes. Comprehensive servicing, tyre wear replacement, scheduled checkups, and equivalent replacement vehicles are fully included.",
      },
    ],
  },
};

export async function generateStaticParams() {
  const content = uaeData as unknown as IndiaContent;
  return content.services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const content = uaeData as unknown as IndiaContent;
  const service = content.services.find((s) => s.slug === params.slug);

  if (!service) {
    return {
      title: "Service Not Found | Victor Mobility UAE",
    };
  }

  return {
    title: `${service.title} in Dubai & Abu Dhabi | Victor Mobility UAE`,
    description: service.shortDescription,
  };
}

export default function UaeServiceDetailPage({ params }: PageProps) {
  const content = uaeData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const service = content.services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const Icon = serviceIcons[service.slug] || Car;
  const otherServices = content.services.filter((s) => s.slug !== service.slug);
  const visualData = serviceVisualMap[service.slug] || serviceVisualMap["chauffeur-luxury"];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header contact={content.contact} />

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Breadcrumb Bar */}
        <div className="bg-brand-warm-white border-b border-brand-soft-neutral py-3.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/uae/services"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-ink/70 hover:text-brand-indigo transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all UAE services</span>
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-brand-ink text-white py-16 sm:py-24 border-b border-brand-indigo/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6E57A0_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-indigo/40 border border-brand-violet/40 text-xs font-bold tracking-widest uppercase text-brand-soft-neutral">
                  <Icon className="w-3.5 h-3.5 text-brand-violet" />
                  <span>{service.badge || "UAE Service"}</span>
                </span>
                <span className="text-xs text-white/60 font-medium">Dubai · Abu Dhabi · Sharjah</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-brand-soft-neutral/85 leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        </section>

        {/* Service Details & Specifications */}
        <section className="py-16 sm:py-20 bg-brand-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Specifications & Operating Standards (col-span-8) */}
              <div className="lg:col-span-8 space-y-8">
                {/* Visual Banner Card */}
                <div className="bg-white rounded-3xl overflow-hidden border border-brand-soft-neutral shadow-sm">
                  <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-brand-ink">
                    <Image
                      src={visualData.imageSrc}
                      alt={visualData.imageAlt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/30 to-transparent" />
                    <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white">
                      <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                        {service.title}
                      </span>
                      <span className="text-[11px] text-white/70 italic">
                        {visualData.caption}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Editorial Description */}
                <div className="bg-white rounded-3xl p-7 sm:p-9 border border-brand-soft-neutral shadow-sm space-y-4">
                  <h2 className="text-2xl font-bold text-brand-ink">
                    Service Scope & Planning Overview
                  </h2>
                  <p className="text-sm sm:text-base text-brand-ink/85 leading-relaxed">
                    {service.description}
                  </p>
                  <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed pt-2 border-t border-brand-soft-neutral/70">
                    Victor Mobility coordinates vehicle allocation, scheduling, chauffeur alignment, and dispatch
                    supervision to ensure your journey aligns with the company commitment:{" "}
                    <strong className="text-brand-indigo font-bold">&ldquo;On Time Every Time.&rdquo;</strong>
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/uae/contact?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center justify-center gap-2 text-xs font-bold bg-brand-indigo hover:bg-brand-blue text-white py-2.5 px-4 rounded-xl transition-colors shadow-xs min-h-[44px]"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Request a quote for {service.title}</span>
                    </Link>
                  </div>
                </div>

                {/* Experiential Highlights / Standards */}
                <div className="bg-white rounded-3xl p-7 sm:p-9 border border-brand-soft-neutral shadow-sm space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-1">
                      Service Standards
                    </span>
                    <h3 className="text-xl font-bold text-brand-ink">
                      What to expect on this journey
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {visualData.highlights.map((item) => (
                      <div
                        key={item.title}
                        className="p-5 rounded-2xl bg-brand-warm-white/70 border border-brand-soft-neutral/80 flex items-start gap-3.5"
                      >
                        <div className="w-8 h-8 rounded-xl bg-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-brand-violet" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-brand-ink mb-1">
                            {item.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-brand-ink/70 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specific Journey Operational Scenario & Workflow */}
                {visualData.scenario && (
                  <div className="bg-white rounded-3xl p-7 sm:p-9 border border-brand-soft-neutral shadow-sm space-y-6">
                    <div>
                      <span className="text-xs uppercase tracking-widest font-bold text-brand-indigo block mb-1">
                        Operational Workflow
                      </span>
                      <h3 className="text-xl font-bold text-brand-ink">
                        {visualData.scenario.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-brand-ink/70">
                        {visualData.scenario.subtitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {visualData.scenario.steps.map((st) => (
                        <div
                          key={st.step}
                          className="p-5 rounded-2xl bg-brand-warm-white/70 border border-brand-soft-neutral/80 space-y-2"
                        >
                          <h4 className="text-sm font-bold text-brand-indigo">
                            {st.step}
                          </h4>
                          <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed">
                            {st.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Airport Arrival Coordination */}
                {service.slug === "airport-transfers" && (
                  <div className="bg-slate-950 text-white rounded-3xl p-7 sm:p-9 border border-slate-800 shadow-xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs uppercase tracking-widest font-bold text-amber-400 block mb-1">
                          VIP Aviation Protocol
                        </span>
                        <h3 className="text-xl font-bold text-white">
                          UAE Airport VIP Concierge &amp; FBO Protocol Desk
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
                          Explore Dubai DXB (T1/T2/T3, Al Majlis VIP), DWC Jetex FBO, and Abu Dhabi AUH terminal pickup bays with live flight radar tracking.
                        </p>
                      </div>
                      <Link
                        href="/uae/protocol"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shrink-0 min-h-[44px]"
                      >
                        <span>Open UAE Protocol Desk &rarr;</span>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Key Coordination Information Checklist */}
                {service.enquiryDetails && service.enquiryDetails.length > 0 && (
                  <div className="bg-white rounded-3xl p-7 sm:p-9 border border-brand-soft-neutral shadow-sm space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-brand-ink">
                          Required Information for Enquiry
                        </h3>
                        <p className="text-xs text-brand-ink/60">
                          Having these details ready helps our team prepare an accurate plan and quotation in AED.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {service.enquiryDetails.map((detail, idx) => (
                        <div
                          key={detail}
                          className="flex items-start gap-3 p-4 rounded-xl bg-brand-warm-white/70 border border-brand-soft-neutral"
                        >
                          <div className="w-6 h-6 rounded-full bg-brand-indigo text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            {idx + 1}
                          </div>
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo block">
                              Detail Item
                            </span>
                            <span className="text-sm font-semibold text-brand-ink">
                              {detail}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Practical Questions & Answers Accordion */}
                {visualData.practicalAnswers && visualData.practicalAnswers.length > 0 && (
                  <div className="bg-white rounded-3xl p-7 sm:p-9 border border-brand-soft-neutral shadow-sm space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                        <HelpCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-brand-ink">
                          Frequently Asked Questions
                        </h3>
                        <p className="text-xs text-brand-ink/60">
                          Practical answers to common operational questions regarding this UAE service.
                        </p>
                      </div>
                    </div>

                    <div className="divide-y divide-brand-soft-neutral border-y border-brand-soft-neutral">
                      {visualData.practicalAnswers.map((item) => (
                        <details key={item.question} className="group py-4">
                          <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-brand-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-indigo [&::-webkit-details-marker]:hidden">
                            <span>{item.question}</span>
                            <span className="text-brand-indigo text-lg transition-transform group-open:rotate-45">
                              +
                            </span>
                          </summary>
                          <p className="mt-2 text-xs sm:text-sm text-brand-ink/75 leading-relaxed">
                            {item.answer}
                          </p>
                        </details>
                      ))}
                    </div>
                  </div>
                )}

                {/* Other UAE Services */}
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-brand-ink">
                    Explore Other UAE Specialisations
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {otherServices.slice(0, 4).map((other) => (
                      <Link
                        key={other.slug}
                        href={`/uae/services/${other.slug}`}
                        className="bg-white p-5 rounded-2xl border border-brand-soft-neutral hover:border-brand-indigo transition-colors flex items-center justify-between group shadow-2xs"
                      >
                        <div>
                          <h3 className="text-sm font-bold text-brand-ink group-hover:text-brand-indigo transition-colors">
                            {other.title}
                          </h3>
                          <p className="text-xs text-brand-ink/60 mt-0.5 line-clamp-1">
                            {other.shortDescription}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-brand-ink/40 group-hover:text-brand-indigo transition-colors shrink-0 ml-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Reservation Sidebar (col-span-4) */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-3xl p-7 border border-brand-soft-neutral shadow-sm space-y-6 sticky top-28">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block mb-1">
                      Direct Reservation
                    </span>
                    <h3 className="text-xl font-bold text-brand-ink">
                      Reserve this Service
                    </h3>
                    <p className="text-xs text-brand-ink/70 mt-1">
                      Connect directly with our Dubai operations desk for vehicle availability and prompt rate quotation.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Link
                      href={`/uae/contact?service=${encodeURIComponent(service.title)}`}
                      className="w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider bg-brand-indigo hover:bg-brand-blue text-white py-3.5 px-4 rounded-xl transition-colors shadow-xs min-h-[44px]"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Prepare WhatsApp Enquiry</span>
                    </Link>

                    <a
                      href={content.contact.phoneHref}
                      className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-brand-ink hover:text-brand-indigo bg-brand-warm-white py-3 px-4 rounded-xl border border-brand-soft-neutral hover:bg-brand-soft-neutral/50 transition-colors min-h-[44px]"
                    >
                      <Phone className="w-4 h-4 text-brand-blue" />
                      <span>Call {content.contact.phoneDisplay}</span>
                    </a>
                  </div>

                  <div className="pt-4 border-t border-brand-soft-neutral space-y-2 text-[11px] text-brand-ink/60">
                    <p>• Standard & custom hourly disposal available</p>
                    <p>• Commercial pricing quoted in AED with zero hidden fees</p>
                    <p>• 24/7 flight delay monitoring included</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer
        contact={content.contact}
        offices={content.offices}
        mediaCaption={media.caption}
        isoEnabled={false}
      />
    </div>
  );
}
