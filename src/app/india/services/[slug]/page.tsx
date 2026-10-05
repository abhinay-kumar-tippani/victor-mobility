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
  MapPin,
  Clock,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  Check,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";

interface PageProps {
  params: {
    slug: string;
  };
}

const serviceIcons: Record<string, React.ElementType> = {
  "employee-transportation": Users,
  "bus-shuttle-transport": Bus,
  "event-transportation": Calendar,
  "airport-transfers": Plane,
  "chauffeur-luxury": Car,
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
    imageSrc: "/images/india/luxury-interior.png",
    imageAlt: "Executive luxury cabin with refined leather seating and ambient lighting",
    caption: "Executive luxury cabin with refined leather seating. Vehicle imagery is illustrative.",
    highlights: [
      {
        title: "Discretion & Executive Etiquette",
        desc: "Experienced, courteous chauffeurs trained in executive etiquette, non-intrusive service, and strict passenger confidentiality.",
      },
      {
        title: "Cabin Comfort & Amenities",
        desc: "Pristine, climate-controlled interiors with quiet acoustic insulation, mobile charging access, and bottled water upon request.",
      },
      {
        title: "Airport & Roadshow Coordination",
        desc: "Active flight monitoring for airport pickups and dedicated hourly disposal for multi-stop corporate board schedules.",
      },
    ],
    recommendedComplementary: ["airport-transfers", "event-transportation"],
    scenario: {
      title: "Executive Chauffeur Protocol",
      subtitle: "Standard operating procedure for visiting dignitaries, executives, and VIP guests",
      steps: [
        {
          step: "1. Flight Tracking & Terminal Greeting",
          detail: "Chauffeurs track inbound flight status dynamically and meet passengers with a clean nameboard at the designated airport terminal arrival bay.",
        },
        {
          step: "2. Executive Cabin Readiness",
          detail: "Climate-controlled quiet cabin, immaculate leather upholstery, mobile charging cables, and bottled water verified before boarding.",
        },
        {
          step: "3. Route Discretion & Privacy",
          detail: "Chauffeurs observe strict non-intrusive protocol, route confidentiality, and optimal transit corridors across business districts.",
        },
        {
          step: "4. Hourly Standby & Board Disposal",
          detail: "Continuous vehicle standby outside corporate headquarters, hotel lobbies, or meeting venues for seamless multi-stop itineraries.",
        },
      ],
    },
    practicalAnswers: [
      {
        question: "How much luggage can an executive sedan accommodate?",
        answer: "Executive sedans comfortably hold 2 large suitcases and 2 cabin bags. For travelling delegations with expanded luggage requirements, our MPV category provides expanded cargo capacity.",
      },
      {
        question: "What waiting time is included for airport pickups?",
        answer: "Airport bookings include complimentary waiting time from the actual landed flight time to allow for immigration and baggage collection.",
      },
    ],
  },
  "event-transportation": {
    imageSrc: "/images/india/hero.png",
    imageAlt: "Premium vehicle fleet arranged for special celebrations and corporate events",
    caption: "Coordinated fleet for weddings, private celebrations, and conferences. Vehicle imagery is illustrative.",
    highlights: [
      {
        title: "Weddings & Family Celebrations",
        desc: "Dedicated couple transport, guest shuttles connecting hotels and ceremony venues, and coordinated multi-vehicle family convoys.",
      },
      {
        title: "Corporate Summits & Delegations",
        desc: "Multi-vehicle logistics for conferences, trade summits, and visiting VIP delegations with central dispatch supervision.",
      },
      {
        title: "Flexible Multi-Point Schedules",
        desc: "Itinerary planning that adapts smoothly to ceremony overruns, flight schedule changes, and multi-venue hops.",
      },
    ],
    recommendedComplementary: ["chauffeur-luxury", "bus-shuttle-transport"],
    scenario: {
      title: "Wedding & Occasion Logistics Coordination",
      subtitle: "How we coordinate bride/groom arrivals, family transfers, and guest venue shuttles",
      steps: [
        {
          step: "1. Unified Timetable & Route Mapping",
          detail: "We coordinate all ceremony venues, hotel blocks, and airport arrival corridors into a cohesive vehicle movement schedule.",
        },
        {
          step: "2. Couple & VIP Convoys",
          detail: "Executive sedans for the couple and immediate family, detailed with punctual standby and decorated per occasion guidelines.",
        },
        {
          step: "3. Guest Shuttles & Loop Transit",
          detail: "Air-conditioned 22 & 44-seater shuttles running regular circuits between accommodation and banquet venues, keeping all guests on schedule.",
        },
        {
          step: "4. Ceremony Overrun Handling",
          detail: "On-ground route supervisors stay in direct communication with your wedding coordinator to absorb ceremony schedule extensions smoothly.",
        },
      ],
    },
    practicalAnswers: [
      {
        question: "Can we arrange multi-day wedding transportation?",
        answer: "Yes. We offer coordinated multi-day arrangements spanning pre-wedding ceremonies, the main event, and post-reception guest airport drop-offs across Hyderabad, Bengaluru, and Pune.",
      },
      {
        question: "How are last-minute ceremony delays managed?",
        answer: "Our occasion fleet assignments include dedicated buffer windows and transparent overtime terms agreed upfront in your proposal, ensuring no vehicle departs prematurely.",
      },
    ],
  },
  "employee-transportation": {
    imageSrc: "/images/india/employee-shuttle.png",
    imageAlt: "Modern 22 and 44-seater corporate commuter bus shuttle",
    caption: "Workplace commute shuttles and daily employee transport coaches. Vehicle imagery is illustrative.",
    highlights: [
      {
        title: "Shift Roster Synchronization",
        desc: "Designed around plant and office shift timings to guarantee punctual floor coverage and minimize worker wait times.",
      },
      {
        title: "Route & Corridor Optimization",
        desc: "Corridor mapping with designated hub pickups and campus drops, reducing transit duration across tech corridors.",
      },
      {
        title: "22 & 44-Seater Group Fleet",
        desc: "Air-conditioned commuter buses maintained under regular service schedules with verified commercial driver assignments.",
      },
    ],
    recommendedComplementary: ["bus-shuttle-transport", "rent-a-car"],
    scenario: {
      title: "Workplace Commute Architecture",
      subtitle: "How we engineer reliable shift transit for corporate and technology facilities",
      steps: [
        {
          step: "1. Corridor & Cluster Analysis",
          detail: "Employee home locations are grouped into optimized pickup hubs along major transit corridors to shorten commute duration.",
        },
        {
          step: "2. Shift Roster Synchronization",
          detail: "Vehicle timetables are calculated backward from office shift starts to ensure 100% on-time floor arrival.",
        },
        {
          step: "3. Pre-Trip Vehicle Audits",
          detail: "Working air conditioning, verified seatbelts, clean bus cabins, and driver fitness confirmed prior to first daily pickup.",
        },
        {
          step: "4. Route Supervisor Liaison",
          detail: "Direct communication line between Victor's dispatch supervisor and your HR/transport admin desk for immediate updates.",
        },
      ],
    },
    practicalAnswers: [
      {
        question: "What vehicle categories are deployed for workforce transit?",
        answer: "We provide 22-seater and 44-seater commuter buses for primary employee routes, as well as MPVs for late-night or small-team shifts.",
      },
      {
        question: "How do you handle shift changes or emergency roster adjustments?",
        answer: "Our operations desk coordinates route revisions directly with your facility admin, communicating revised dispatch instructions immediately.",
      },
    ],
  },
  "airport-transfers": {
    imageSrc: "/images/india/hero.png",
    imageAlt: "Airport transfer sedan and MPV vehicles",
    caption: "Punctual terminal connections across Hyderabad, Bengaluru, and Pune. Vehicle imagery is illustrative.",
    highlights: [
      {
        title: "Flight Arrival & Departure Monitoring",
        desc: "Real-time alignment with flight schedules at RGIA (Hyderabad), Kempegowda (BLR), and Pune (PNQ) airports.",
      },
      {
        title: "Terminal Meet & Luggage Support",
        desc: "Designated pickup bay greetings with luggage assistance for stress-free transitions from arrivals to city destinations.",
      },
      {
        title: "Individual & Delegation Capacity",
        desc: "Sedan choices for solo business travellers and spacious MPVs for families and luggage-heavy delegation arrivals.",
      },
    ],
    recommendedComplementary: ["chauffeur-luxury", "rent-a-car"],
    scenario: {
      title: "Terminal Punctuality Protocol",
      subtitle: "Seamless airport connections across Hyderabad (RGIA), Bengaluru (BLR), and Pune (PNQ)",
      steps: [
        {
          step: "1. Live Flight Monitoring",
          detail: "Arrival times are tracked dynamically so chauffeur arrival synchronizes precisely with your landing, even during flight delays.",
        },
        {
          step: "2. Designated Terminal Greeting",
          detail: "Chauffeur waits at designated commercial pickup bays with visible name paging and luggage assistance.",
        },
        {
          step: "3. Corporate Expressway Routing",
          detail: "Direct expressway and arterial corridor routing to major business hubs (Gachibowli, Whitefield, Hinjawadi).",
        },
      ],
    },
    practicalAnswers: [
      {
        question: "Which airports in India are covered?",
        answer: "We provide scheduled terminal pickups and drops at Rajiv Gandhi International Airport (HYD), Kempegowda International Airport (BLR), and Pune International Airport (PNQ).",
      },
      {
        question: "How is flight delay managed for airport arrivals?",
        answer: "Our desk tracks your flight number in real time and automatically reschedules the chauffeur pickup time to match actual touchdown.",
      },
    ],
  },
  "bus-shuttle-transport": {
    imageSrc: "/images/india/employee-shuttle.png",
    imageAlt: "Group bus shuttle for campus and venue loops",
    caption: "Air-conditioned group shuttle transport. Vehicle imagery is illustrative.",
    highlights: [
      {
        title: "Campus & Inter-Facility Loops",
        desc: "Continuous loop transit connecting corporate campuses, metro stations, and parking facilities.",
      },
      {
        title: "Comfort & Air-Conditioning",
        desc: "Equipped with climate control, high-back ergonomic seating, and spacious center aisles for comfortable transit.",
      },
      {
        title: "Dedicated Dispatch Supervision",
        desc: "Assigned route supervisors monitoring timetable adherence and vehicle readiness before scheduled dispatch.",
      },
    ],
    recommendedComplementary: ["employee-transportation", "event-transportation"],
    scenario: {
      title: "Campus & Venue Loop Operations",
      subtitle: "Continuous group shuttle frequency between key transit hubs and corporate facilities",
      steps: [
        {
          step: "1. Timetable & Loop Frequency Planning",
          detail: "Loop frequency structured around peak arrival hours, shift overlaps, and metro connection windows.",
        },
        {
          step: "2. Safe Boarding & Ergonomic Cabins",
          detail: "Designated boarding zones, orderly passenger entry, high-back seats, and climate-controlled cabin environments.",
        },
        {
          step: "3. Dispatch Redundancy",
          detail: "Standby fleet readiness to maintain scheduled frequency during unexpected route traffic or peak passenger loads.",
        },
      ],
    },
    practicalAnswers: [
      {
        question: "Are bus shuttles suitable for multi-facility tech parks?",
        answer: "Yes. We design high-frequency loop corridors connecting metro hubs, campus parking structures, and distinct facility buildings.",
      },
      {
        question: "What passenger capacity options exist?",
        answer: "We offer 22-seater and 44-seater air-conditioned commuter configurations based on route volume requirements.",
      },
    ],
  },
  "rent-a-car": {
    imageSrc: "/images/india/hero.png",
    imageAlt: "Fleet of sedans and MPVs available for flexible rental terms",
    caption: "Flexible vehicle rental and dedicated mobility arrangements. Vehicle imagery is illustrative.",
    highlights: [
      {
        title: "Flexible Rental Horizons",
        desc: "Short-term daily bookings, extended weekend travel, and tailored monthly corporate vehicle allocation.",
      },
      {
        title: "Chauffeur or Self-Drive Options",
        desc: "Choose between professional chauffeur-driven mobility or verified self-drive vehicles subject to documentation.",
      },
      {
        title: "Transparent Commercial Terms",
        desc: "Clear upfront proposals specifying kilometre allowances, fuel terms, and vehicle inspection protocols.",
      },
    ],
    recommendedComplementary: ["airport-transfers", "chauffeur-luxury"],
    scenario: {
      title: "Dedicated Corporate Vehicle Allocation",
      subtitle: "Flexible fleet deployment tailored for project teams and visiting leadership",
      steps: [
        {
          step: "1. Scope & Duration Assessment",
          detail: "Selection between daily, weekly, or monthly rental horizons based on your travel itinerary and team requirements.",
        },
        {
          step: "2. Transparent Condition Audit",
          detail: "Comprehensive vehicle condition report detailing exterior, interior, fuel level, and odometer reading before handover.",
        },
        {
          step: "3. Professional Chauffeur or Handover",
          detail: "Professional chauffeur assignment or verified self-drive handover subject to commercial documentation and terms.",
        },
      ],
    },
    practicalAnswers: [
      {
        question: "What documentation is required for vehicle rentals?",
        answer: "Corporate rentals require an official authorization letter, billing GST details, and valid driver credentials where self-drive is selected.",
      },
      {
        question: "Are inter-city journeys permitted?",
        answer: "Yes. Inter-city itineraries across Telangana, Karnataka, and Maharashtra can be arranged with upfront toll and permit inclusions.",
      },
    ],
  },
};

export async function generateStaticParams() {
  const content = indiaData as unknown as IndiaContent;
  return content.services
    .filter((service) => service.published)
    .map((service) => ({
      slug: service.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const content = indiaData as unknown as IndiaContent;
  const service = content.services.find(
    (s) => s.slug === params.slug && s.published
  );

  if (!service) {
    return {
      title: "Service Not Found | Victor Mobility",
    };
  }

  return {
    title: `${service.title} | Victor Mobility India`,
    description: service.description,
  };
}

export default function ServiceDetailPage({ params }: PageProps) {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;

  const service = content.services.find(
    (s) => s.slug === params.slug && s.published
  );

  if (!service) {
    notFound();
  }

  const visualData = serviceVisualMap[service.slug] || serviceVisualMap["employee-transportation"];

  // Select 2 complementary services based on recommendation, or fallback
  const complementaryServices = content.services.filter(
    (s) => s.published && visualData.recommendedComplementary.includes(s.slug)
  );

  const IconComponent = serviceIcons[service.slug] || Briefcase;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header contact={content.contact} />

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Breadcrumb & Service Hero Header */}
        <section className="bg-brand-ink text-white pt-8 pb-14 sm:pb-20 border-b border-brand-indigo/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6E57A0_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="text-xs text-brand-soft-neutral/70">
              <ol className="flex items-center gap-2 flex-wrap">
                <li>
                  <Link href="/india" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/india/services" className="hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li>/</li>
                <li className="text-white font-bold" aria-current="page">
                  {service.title}
                </li>
              </ol>
            </nav>

            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/40 border border-brand-violet/40 text-xs font-bold tracking-widest uppercase text-brand-soft-neutral">
                <IconComponent className="w-3.5 h-3.5 text-brand-violet" />
                <span>{service.badge || "Corporate Mobility Solution"}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {service.title}
              </h1>
              <p className="text-base sm:text-xl text-brand-soft-neutral/90 leading-relaxed font-medium">
                {service.shortDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Service Overview & Planning Guide */}
        <section className="py-14 sm:py-20 bg-brand-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Main Content Column */}
              <div className="lg:col-span-8 space-y-8 sm:space-y-10">
                {/* Visual Editorial Image Card */}
                <div className="rounded-3xl overflow-hidden border border-brand-soft-neutral shadow-sm bg-white">
                  <div className="relative aspect-[16/9] w-full bg-brand-ink">
                    <Image
                      src={visualData.imageSrc}
                      alt={visualData.imageAlt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/75 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-xs text-white/90">
                      <span className="font-semibold block">{service.title} Experience</span>
                      <span className="text-[11px] text-brand-soft-neutral/80 italic">{visualData.caption}</span>
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
                    Victor Mobility coordinates vehicle allocation, scheduling, driver alignment, and dispatch
                    supervision to ensure your journey aligns with the company commitment:{" "}
                    <strong className="text-brand-indigo font-bold">&ldquo;On Time Every Time.&rdquo;</strong>
                  </p>
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
                          Having these details ready helps our team prepare an accurate plan and quotation.
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

                {/* Practical Service Clarifications Q&A */}
                {visualData.practicalAnswers && visualData.practicalAnswers.length > 0 && (
                  <div className="bg-white rounded-3xl p-7 sm:p-9 border border-brand-soft-neutral shadow-sm space-y-5">
                    <div>
                      <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-1">
                        Common Clarifications
                      </span>
                      <h3 className="text-xl font-bold text-brand-ink">
                        Practical arrangements for {service.title}
                      </h3>
                    </div>

                    <div className="space-y-3.5">
                      {visualData.practicalAnswers.map((qa) => (
                        <div
                          key={qa.question}
                          className="p-5 rounded-2xl bg-brand-warm-white/60 border border-brand-soft-neutral/70 space-y-1.5"
                        >
                          <h4 className="text-sm font-bold text-brand-ink">
                            {qa.question}
                          </h4>
                          <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed">
                            {qa.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pricing & Proposal Reassurance */}
                <div className="p-5 rounded-2xl bg-white border border-brand-soft-neutral/80 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo shrink-0 mt-0.5">
                    <HelpCircle className="w-4 h-4 text-brand-blue" />
                  </div>
                  <div className="text-xs text-brand-ink/75 leading-relaxed">
                    <strong className="text-brand-ink block mb-0.5">Transparent Quotation Process</strong>
                    Quotations are tailored according to route distance, schedule duration, and vehicle category. Our desk provides clear written proposals with no hidden surcharges.
                  </div>
                </div>

                {/* Operational Coverage Guarantee */}
                <div className="bg-white rounded-3xl p-7 sm:p-9 border border-brand-soft-neutral shadow-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-brand-ink">
                        Operating Hubs & Routing
                      </h3>
                      <p className="text-xs text-brand-ink/60">
                        Operational coverage across primary corporate hubs
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-ink/80 leading-relaxed">
                    This service is coordinated actively across Victor Mobility&apos;s established operating cities:{" "}
                    <strong>Hyderabad</strong>, <strong>Bengaluru</strong>, and <strong>Pune</strong>, as well as their
                    immediate industrial corridors and airport routes.
                  </p>
                </div>
              </div>

              {/* Sidebar Action Card */}
              <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                <div className="bg-brand-ink text-white rounded-3xl p-7 sm:p-8 border border-brand-indigo/30 space-y-6 shadow-md">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-violet block">
                      Direct Engagement
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      Discuss This Requirement
                    </h3>
                    <p className="text-xs text-brand-soft-neutral/80 leading-relaxed">
                      Connect directly with our corporate development team to discuss route schedules,
                      vehicle preferences, and passenger capacity.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Link
                      href={`/india/contact?service=${service.slug}`}
                      className="w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider bg-brand-indigo hover:bg-brand-blue text-white py-3.5 px-4 rounded-xl text-center transition-colors shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Prepare WhatsApp Enquiry</span>
                    </Link>

                    <a
                      href={content.contact.phoneHref}
                      className="w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white py-3.5 px-4 rounded-xl text-center transition-colors border border-white/20"
                    >
                      <Phone className="w-4 h-4 text-brand-soft-neutral" />
                      <span>Call {content.contact.phoneDisplay}</span>
                    </a>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-brand-soft-neutral/70">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-brand-violet shrink-0" />
                      <span>Direct discussion with Business Partner</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-violet shrink-0" />
                      <span>Direct confirmation with vehicle & driver details</span>
                    </div>
                  </div>
                </div>

                {/* Back to All Services */}
                <div className="bg-white rounded-2xl p-6 border border-brand-soft-neutral">
                  <Link
                    href="/india/services"
                    className="inline-flex items-center gap-2 text-xs font-bold text-brand-indigo hover:text-brand-blue transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>View all 6 mobility services</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tailored Complementary Services Navigation */}
        <section className="py-14 sm:py-16 bg-white border-t border-brand-soft-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo block mb-1">
                  Complementary Solutions
                </span>
                <h3 className="text-2xl font-bold text-brand-ink">
                  Frequently Paired with {service.title}
                </h3>
              </div>
              <Link
                href="/india/services"
                className="text-xs font-bold text-brand-indigo hover:text-brand-blue inline-flex items-center gap-1"
              >
                <span>Full services directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              {complementaryServices.map((other) => (
                <Link
                  key={other.slug}
                  href={`/india/services/${other.slug}`}
                  className="p-6 rounded-2xl bg-brand-warm-white hover:bg-white border border-brand-soft-neutral hover:border-brand-indigo/30 transition-all duration-150 group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block mb-1">
                      {other.badge || "Mobility Option"}
                    </span>
                    <h4 className="text-lg font-bold text-brand-ink group-hover:text-brand-indigo transition-colors mb-2">
                      {other.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-brand-ink/70 leading-relaxed">
                      {other.shortDescription}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-brand-soft-neutral/60 flex items-center justify-between text-xs font-bold text-brand-indigo">
                    <span>Explore {other.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer
        contact={content.contact}
        offices={content.offices}
        mediaCaption={media.caption}
        isoEnabled={content.sourceClaims.iso?.enabled}
      />
    </div>
  );
}
