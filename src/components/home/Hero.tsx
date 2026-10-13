"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, MapPin, Clock, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import type { IndiaContent, MediaAsset } from "@/types/content";

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

const SLIDE_INTERVAL_MS = 2000;

export default function Hero({ content }: HeroProps) {
  const isUae = content.region === "uae";
  const prefix = isUae ? "/uae" : "/india";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Auto-advance interval
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

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

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Victor Mobility Services Showcase"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[720px] sm:min-h-[780px] lg:min-h-[calc(100vh-5.5rem)] flex flex-col justify-between bg-[#070A12] text-white overflow-hidden border-b border-white/10 outline-none select-none"
    >
      {/* Background Image Slides (Smooth Crossfade, Natural Graded Photography) */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, idx) => (
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
        <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_80%_60%_at_0%_30%,rgba(49,50,111,0.28),transparent_70%)] pointer-events-none" />

        {/* Editorial Scrim Gradient Overlays for High-Contrast Text Legibility */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#070A12] via-[#070A12]/85 to-[#070A12]/25 lg:via-[#070A12]/75 lg:to-transparent pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-32 z-20 bg-gradient-to-b from-[#070A12]/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-48 z-20 bg-gradient-to-t from-[#070A12] via-[#070A12]/85 to-transparent pointer-events-none" />
      </div>

      {/* Main Hero Content: Refined Luxury Editorial Layout */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-14 w-full flex-1 flex flex-col justify-between">
        <div className="max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-6 my-2 sm:my-auto">
          {/* Eyebrow Pill: Slide Category */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/90 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-zinc-300">
                {currentSlide.category}
              </span>
            </div>
          </div>

          {/* Service Headline & Subheading: Distinct Luxury Hierarchy */}
          <div className="space-y-2.5 sm:space-y-3.5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] text-white leading-[1.15]">
              {currentSlide.title}
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-zinc-400 font-normal leading-relaxed max-w-xl">
              {currentSlide.subtitle}
            </p>
          </div>

          {/* Micro-Pillars / Service Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            {currentSlide.badges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[11px] sm:text-xs font-medium text-zinc-300 backdrop-blur-sm"
              >
                <span className="w-1 h-1 rounded-full bg-indigo-400/80" />
                {badge}
              </span>
            ))}
          </div>

          {/* Actions: Primary Service Link & Secondary Consultation */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
            <Link
              href={`${prefix}/services/${currentSlide.slug}`}
              className="inline-flex items-center justify-center gap-2 text-sm sm:text-base font-semibold bg-white text-zinc-950 hover:bg-zinc-100 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group text-center"
            >
              <span>Explore Service</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              href={`${prefix}/contact`}
              className="inline-flex items-center justify-center gap-2 text-sm sm:text-base font-medium bg-white/[0.06] hover:bg-white/[0.12] text-zinc-200 hover:text-white border border-white/15 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl backdrop-blur-md transition-all duration-200 text-center"
            >
              <span>Discuss Requirement</span>
            </Link>
          </div>

          {/* Luxury Slide Navigator (Counter, Dynamic Progress Dashes & Chevron Navigation) */}
          <div className="flex items-center gap-3 sm:gap-4 pt-2">
            {/* Slide Index Counter */}
            <div className="flex items-center gap-1 text-xs font-mono tracking-widest text-zinc-400 select-none">
              <span className="text-white font-semibold">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-zinc-600">/</span>
              <span>{String(HERO_SLIDES.length).padStart(2, "0")}</span>
            </div>

            {/* Progress Dashes */}
            <div className="flex items-center gap-1.5">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.slug}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? "w-7 sm:w-8 bg-white shadow-xs"
                      : "w-2.5 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            {/* Tactile Previous / Next Chevrons */}
            <div className="flex items-center gap-1 ml-1">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="w-7 h-7 rounded-lg bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="w-7 h-7 rounded-lg bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Floating Glassmorphic Trust Ribbon (4 Pillars Across the Bottom) */}
        <div className="pt-6 sm:pt-8 lg:pt-10 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
            {/* 1. 10 Operational Cities */}
            <div className="flex items-center gap-3 sm:gap-3.5 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur-xl border border-white/[0.08] hover:border-white/20 transition-all duration-200">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white">10 Operational Cities</p>
                <p className="text-[11px] sm:text-xs text-zinc-400">Pan-India Transit Network</p>
              </div>
            </div>

            {/* 2. 100% Background-Verified Drivers */}
            <div className="flex items-center gap-3 sm:gap-3.5 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur-xl border border-white/[0.08] hover:border-white/20 transition-all duration-200">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white">100% Verified Drivers</p>
                <p className="text-[11px] sm:text-xs text-zinc-400">Police Cleared & Trained</p>
              </div>
            </div>

            {/* 3. 24/7 Operations Desk */}
            <div className="flex items-center gap-3 sm:gap-3.5 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur-xl border border-white/[0.08] hover:border-white/20 transition-all duration-200">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-300 shrink-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white">24/7 Operations Desk</p>
                <p className="text-[11px] sm:text-xs text-zinc-400">Active GPS & SOS Dispatch</p>
              </div>
            </div>

            {/* 4. Direct Operations Hotline */}
            <a
              href={content.contact.phoneHref}
              className="flex items-center gap-3 sm:gap-3.5 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl border border-white/[0.08] hover:border-emerald-400/30 transition-all duration-200 group"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#070A12] animate-pulse" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-emerald-200 transition-colors truncate">
                  {content.contact.phoneDisplay}
                </p>
                <p className="text-[11px] sm:text-xs text-zinc-400 flex items-center gap-1 group-hover:text-zinc-300">
                  <span>Call Operations Desk</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </p>
              </div>
            </a>
          </div>

          {/* Discreet Caption per AGENTS.md */}
          <div className="mt-3 flex justify-end items-center text-[10px] text-white/40">
            <span>Vehicle imagery illustrative. Actual fleet deployed per client roster.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
