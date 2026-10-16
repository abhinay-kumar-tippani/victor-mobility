"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { IndiaContent, MediaAsset } from "@/types/content";
import { useLanguage } from "@/i18n/LanguageContext";

interface HeroProps {
  content: IndiaContent;
  heroMedia?: MediaAsset;
  mediaCaption?: string;
}

interface SlideItem {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  badges: string[];
  imageSrc: string;
  imageAlt: string;
}

const HERO_SLIDES: SlideItem[] = [
  {
    slug: "employee-transportation",
    category: "Workforce Commute",
    title: "Employee Transportation",
    subtitle: "Punctual daily employee commutes and dedicated tech campus shuttle networks across major corporate corridors.",
    badges: ["Roster-Synchronized", "Nodal & Doorstep Routes", "24/7 GPS Tracking"],
    imageSrc: "/images/india/services/service-employee-transport.jpg",
    imageAlt: "Executive employee transport fleet outside corporate campus in daylight",
  },
  {
    slug: "bus-shuttle-transport",
    category: "Campus & Arterial Transit",
    title: "Bus & Shuttle Transport",
    subtitle: "High-capacity luxury coaches connecting major residential clusters and enterprise corridors with punctual timetables.",
    badges: ["22 & 44-Seater Coaches", "Fixed-Corridor Shuttles", "AIS-140 Compliant"],
    imageSrc: "/images/india/services/service-bus-shuttle.jpg",
    imageAlt: "Modern luxury corporate coach buses outside tech headquarters in daylight",
  },
  {
    slug: "airport-transfers",
    category: "VIP Terminal Reception",
    title: "Airport Transfers",
    subtitle: "Punctual terminal meet-and-greet with flight radar tracking and executive curbside reception.",
    badges: ["Flight Radar Tracking", "Curbside Meet & Greet", "Luggage Assistance"],
    imageSrc: "/images/india/services/service-airport-transfers.jpg",
    imageAlt: "Mercedes-Benz S-Class at airport VIP private terminal curb in warm dusk lighting",
  },
  {
    slug: "chauffeur-luxury",
    category: "Executive Chauffeur",
    title: "Chauffeur & Luxury Travel",
    subtitle: "Discreet chauffeur-driven journeys in pristine executive saloons and luxury sedans for senior leadership.",
    badges: ["Discreet Chauffeurs", "Pristine Luxury Saloons", "Flexible Hourly Retainers"],
    imageSrc: "/images/india/services/service-chauffeur-luxury.jpg",
    imageAlt: "Chauffeur opening door of black Mercedes S-Class outside corporate entrance in warm lighting",
  },
  {
    slug: "event-transportation",
    category: "Delegation Logistics",
    title: "Event Transportation",
    subtitle: "Coordinated motorcade logistics and delegate travel for high-profile conferences, summits, and galas.",
    badges: ["Motorcade Logistics", "Dedicated Fleet Marshals", "Multi-City Summits"],
    imageSrc: "/images/india/services/service-event-transport.jpg",
    imageAlt: "Lineup of black Mercedes-Benz S-Class limousines outside grand palace hotel",
  },
  {
    slug: "rent-a-car",
    category: "Corporate Fleet Hire",
    title: "Rent-A-Car",
    subtitle: "Premium self-drive and corporate fleet rental customized to your business itinerary with transparent billing.",
    badges: ["Corporate Retainers", "Short & Long-Term Leases", "Transparent Monthly Billing"],
    imageSrc: "/images/india/services/service-rent-a-car.jpg",
    imageAlt: "Executive sedan, MPV, and coach fleet outside corporate headquarters",
  },
];

const UAE_HERO_SLIDES: SlideItem[] = [
  {
    slug: "chauffeur-luxury",
    category: "First Class Limousine",
    title: "Chauffeur & Luxury Limousine",
    subtitle: "Pristine Mercedes-Benz S-Class, BMW 7 Series, and Mercedes-Maybach sedans with bilingual executive chauffeurs.",
    badges: ["Discreet Chauffeurs", "First-Class Saloons", "Hourly & Inter-Emirate Retainers"],
    imageSrc: "/images/india/services/service-chauffeur-luxury.jpg",
    imageAlt: "Chauffeur opening door of black Mercedes S-Class outside executive entrance in Dubai",
  },
  {
    slug: "airport-transfers",
    category: "VIP Terminal Reception",
    title: "Airport VIP Transfers",
    subtitle: "Terminal meet-and-assist with live radar flight tracking at Dubai (DXB, DWC) and Abu Dhabi (AUH).",
    badges: ["Live Radar Tracking", "Curbside Meet & Greet", "Terminal VIP Paging"],
    imageSrc: "/images/india/services/service-airport-transfers.jpg",
    imageAlt: "Mercedes-Benz S-Class at airport VIP terminal curb in warm dusk lighting",
  },
  {
    slug: "event-transportation",
    category: "Summit & Delegation Logistics",
    title: "Events & Delegations",
    subtitle: "Synchronized motorcade logistics for international trade summits, VIP delegations, and destination galas.",
    badges: ["Summit Motorcades", "Dedicated Route Marshals", "VIP Coach Allocation"],
    imageSrc: "/images/india/services/service-event-transport.jpg",
    imageAlt: "Lineup of luxury black limousines outside grand hotel venue",
  },
  {
    slug: "employee-transportation",
    category: "Workforce Mobility",
    title: "Corporate Employee Transport",
    subtitle: "Reliable staff commute solutions managing corporate office routes and free-zone campus shuttles.",
    badges: ["Free Zone Shuttles", "Shift Roster Synchronisation", "RTA Compliant"],
    imageSrc: "/images/india/services/service-employee-transport.jpg",
    imageAlt: "Corporate staff transit shuttle coach outside modern commercial office",
  },
  {
    slug: "tourism-travel",
    category: "Private Excursions",
    title: "Tourism & City Excursions",
    subtitle: "Curated chauffeured excursions across Dubai landmarks, Abu Dhabi cultural destinations, and desert retreats.",
    badges: ["Custom Itineraries", "Inter-Emirate Tours", "Luxury MPVs & Coaches"],
    imageSrc: "/images/uae/uae-hero.jpg",
    imageAlt: "Executive luxury fleet outside contemporary Dubai architectural landmark",
  },
  {
    slug: "rent-a-car",
    category: "Corporate Fleet Leasing",
    title: "Rent-A-Car & Fleet Leasing",
    subtitle: "Flexible short-term luxury rentals and dedicated corporate vehicle allocations across the Emirates.",
    badges: ["Corporate Retainers", "Short & Long-Term Leases", "Transparent Monthly Billing"],
    imageSrc: "/images/india/services/service-rent-a-car.jpg",
    imageAlt: "Executive sedan and luxury fleet outside corporate headquarters",
  },
];

const SLIDE_INTERVAL_MS = 2000;

export default function Hero({ content }: HeroProps) {
  const isUae = content.region === "uae";
  const prefix = isUae ? "/uae" : "/india";
  const { dict } = useLanguage();

  const slides = isUae
    ? UAE_HERO_SLIDES
    : HERO_SLIDES.map((slide, idx) => {
        const localized = dict.hero?.slides?.[idx];
        return {
          ...slide,
          category: localized?.category || slide.category,
          title: localized?.title || slide.title,
          subtitle: localized?.subtitle || slide.subtitle,
          badges: localized?.badges || slide.badges,
        };
      });

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-advance interval (continuous sliding without pausing on hover)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    },
    [nextSlide, prevSlide]
  );

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartXRef.current = null;
  };

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Victor Mobility Services Showcase"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[720px] sm:min-h-[780px] lg:min-h-[calc(100vh-4.5rem)] flex flex-col justify-between bg-[#070A12] text-white overflow-hidden border-b border-white/10 outline-none select-none"
    >
      {/* Background Image Slides (Smooth Crossfade, Natural Graded Photography) */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={slide.slug}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              idx === currentIndex ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
            }`}
          >
            <Image
              src={slide.imageSrc}
              alt={slide.imageAlt}
              fill
              priority={idx === 0 || idx === 1}
              sizes="100vw"
              className="object-cover object-[70%_center] lg:object-[65%_center] filter brightness-[0.9] contrast-[1.02]"
            />
          </div>
        ))}

        {/* Ambient Brand Indigo Glow for Depth */}
        <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_70%_55%_at_0%_35%,rgba(49,50,111,0.35),transparent_70%)] pointer-events-none" />

        {/* Editorial Scrim Gradient Overlays for High-Contrast Text Legibility */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#070A12] via-[#070A12]/90 via-35% to-transparent to-85% pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-32 z-20 bg-gradient-to-b from-[#070A12]/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-44 z-20 bg-gradient-to-t from-[#070A12] via-[#070A12]/80 to-transparent pointer-events-none" />
      </div>

      {/* Main Hero Content: Refined Luxury Editorial Layout */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-8 sm:pb-10 w-full flex-1 flex flex-col justify-between">
        {/* Text Block: Positioned in upper-left quadrant with dedicated column width */}
        <div className="max-w-xl lg:max-w-2xl space-y-5 sm:space-y-6 mt-1 sm:mt-2 mb-auto">
          {/* Service Headline & Subheading: Sculpted Luxury Editorial Hierarchy */}
          <div className="space-y-3 sm:space-y-3.5">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-semibold tracking-[-0.03em] text-white leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
              {currentSlide.title}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-zinc-300 font-light leading-relaxed max-w-lg drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              {currentSlide.subtitle}
            </p>
          </div>

          {/* Micro-Pillars / Refined Luxury Spec Strip */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-0.5 text-xs sm:text-[13px] tracking-wide text-zinc-300">
            {currentSlide.badges.map((badge, idx) => (
              <div key={badge} className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.9)]" />
                <span className="font-medium text-zinc-200">{badge}</span>
                {idx < currentSlide.badges.length - 1 && (
                  <span className="text-white/20 ml-3 hidden sm:inline select-none">|</span>
                )}
              </div>
            ))}
          </div>

          {/* Actions: Cohesive Luxury Pill Buttons (Solid Pearl & Frosted Crystal) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-1 sm:pt-2">
            <Link
              href={`${prefix}/services/${currentSlide.slug}`}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white text-zinc-950 font-semibold text-sm sm:text-base shadow-[0_4px_24px_rgba(255,255,255,0.22)] hover:bg-zinc-100 hover:shadow-[0_6px_32px_rgba(255,255,255,0.32)] hover:-translate-y-0.5 transition-all duration-200 group text-center"
            >
              <span>{isUae ? "Explore Service" : dict.hero.exploreService}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              href={`${prefix}/contact`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-white/50 backdrop-blur-md font-medium text-sm sm:text-base hover:-translate-y-0.5 transition-all duration-200 text-center shadow-sm"
            >
              <span>{isUae ? "Discuss Requirement" : dict.hero.discussRequirement}</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar: Slide Indicators centered in a floating luxury glass dock */}
        <div className="relative pt-6 pb-2 flex flex-col sm:flex-row items-center justify-center">
          {/* Centered slide indicator dashes inside luxury dock without arrows or numbers */}
          <div className="inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full bg-black/50 border border-white/15 backdrop-blur-xl shadow-2xl">
            {slides.map((slide, idx) => (
              <button
                key={slide.slug}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? "w-10 sm:w-12 bg-white shadow-[0_0_14px_rgba(255,255,255,0.9)]"
                    : "w-2.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Discreet Caption per AGENTS.md */}
          <div className="sm:absolute sm:right-0 pt-3 sm:pt-0 text-[10px] text-white/40 text-center sm:text-right">
            <span>{isUae ? "Vehicle imagery illustrative. Actual fleet deployed per client roster." : dict.hero.imageCaption}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
