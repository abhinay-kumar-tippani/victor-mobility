"use client";

import BrandText from "@/components/brand/BrandText";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Mail, MessageSquare, Pause, Phone, Play, QrCode } from "lucide-react";
import type { ContactData, TeamProfile } from "@/types/content";

interface AboutTeamCarouselProps {
  featured: ContactData;
  featuredDescription: string;
  profiles: TeamProfile[];
}

export default function AboutTeamCarousel({ featured, featuredDescription, profiles }: AboutTeamCarouselProps) {
  // Assemble team members in exact order: 1. Kamran, 2. Narender reddy, 3. Mujeeb, 4. Asif
  const mujeebProfile: TeamProfile = {
    id: "mujeeb",
    name: featured.name,
    role: featured.role,
    description: featuredDescription,
    imageSrc: featured.imageSrc || "/images/india/leadership-mujeeb.jpg",
    imageAlt: `Portrait of ${featured.name}`,
    placeholder: false,
    phoneDisplay: featured.phoneDisplay,
    phoneHref: featured.phoneHref,
    whatsappDisplay: featured.whatsappDisplay,
    whatsappDigits: featured.whatsappDigits,
    emailDisplay: "mujeeburrahman@victorluxurylimousine.com",
    emailEnabled: true,
  };

  const allPeople = [mujeebProfile, ...profiles];

  const getOrderRank = (p: TeamProfile) => {
    const key = `${p.id} ${p.name}`.toLowerCase();
    if (key.includes("kamran")) return 1;
    if (key.includes("nareinder") || key.includes("narender")) return 2;
    if (key.includes("mujeeb")) return 3;
    if (key.includes("asif")) return 4;
    return 99;
  };

  const people: TeamProfile[] = [...allPeople].sort((a, b) => getOrderRank(a) - getOrderRank(b));
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const reducedMotion = useReducedMotion();
  const person = people[activeIndex];
  const whatsappDigits = person.whatsappDisplay?.replace(/\D/g, "") || person.whatsappDigits;

  useEffect(() => {
    if (paused || interacting || reducedMotion || people.length < 2) return;
    const interval = window.setInterval(() => setActiveIndex((current) => (current + 1) % people.length), 3000);
    return () => window.clearInterval(interval);
  }, [paused, interacting, reducedMotion, people.length]);

  function showProfile(nextIndex: number) {
    const normalized = (nextIndex + people.length) % people.length;
    setActiveIndex(normalized);
    setAnnouncement(`Profile ${normalized + 1} of ${people.length}: ${people[normalized].name}`);
  }

  const whatsappMessage = `Hello ${person.name}, I would like to discuss travel requirements with Victor Mobility.`;

  return (
    <article
      id="commercial-leadership"
      aria-label="Victor Mobility team profiles"
      aria-roledescription="carousel"
      className="mx-auto grid w-[calc(100%-1rem)] max-w-4xl grid-cols-1 overflow-hidden rounded-3xl border border-brand-soft-neutral bg-white shadow-sm lg:grid-cols-12"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteracting(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          showProfile(activeIndex - 1);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          showProfile(activeIndex + 1);
        }
      }}
    >
      <div className="relative h-[300px] bg-brand-ink sm:h-[360px] lg:col-span-5 lg:h-full lg:min-h-[440px]">
        <Image
          key={person.id}
          src={person.imageSrc}
          alt={person.imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 380px"
          className="object-cover object-top"
        />
      </div>

      <div className="flex min-w-0 flex-col justify-between gap-5 p-5 sm:p-8 lg:col-span-7 lg:p-9">
        <div>
          <p className="mb-2 uppercase text-brand-blue section-eyebrow section-eyebrow--compact"><BrandText>The people behind Victor</BrandText></p>
          <h3 className="break-words text-2xl font-extrabold leading-tight tracking-tight text-brand-ink sm:text-3xl">{person.name}</h3>
          <p className="mt-2 text-sm font-semibold text-brand-indigo">{person.role}</p>
          {person.division && <p className="mt-1 text-xs font-medium uppercase tracking-wider text-brand-violet">{person.division}</p>}
          {person.description && <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-ink/75"><BrandText>{person.description}</BrandText></p>}
        </div>

        <div>
          <div className="grid gap-2 border-t border-brand-soft-neutral pt-4 sm:grid-cols-2">
            {!person.placeholder && person.phoneHref && person.phoneDisplay && (
              <a href={person.phoneHref} className="flex min-h-12 min-w-0 items-center gap-3 rounded-xl border border-brand-soft-neutral bg-brand-warm-white px-4 py-2 text-brand-indigo transition-colors hover:border-brand-indigo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="min-w-0"><span className="block text-[10px] font-bold uppercase tracking-wider">Call directly</span><bdi dir="ltr" className="block text-xs font-semibold">{person.phoneDisplay}</bdi></span>
              </a>
            )}
            {!person.placeholder && whatsappDigits && person.whatsappDisplay && (
              <a href={`https://wa.me/${whatsappDigits}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="flex min-h-12 min-w-0 items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-emerald-800 transition-colors hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
                <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="min-w-0"><span className="block text-[10px] font-bold uppercase tracking-wider">Open WhatsApp draft</span><bdi dir="ltr" className="block text-xs font-semibold">{person.whatsappDisplay}</bdi></span>
              </a>
            )}
            {!person.placeholder && person.emailEnabled && person.emailDisplay && (
              <a href={`mailto:${person.emailDisplay}`} className="flex min-h-12 min-w-0 items-center gap-3 rounded-xl border border-brand-soft-neutral bg-brand-warm-white px-4 py-2 text-brand-indigo transition-colors hover:border-brand-indigo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo sm:col-span-2">
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="min-w-0"><span className="block text-[10px] font-bold uppercase tracking-wider">Compose email</span><bdi dir="ltr" className="block break-all text-xs font-semibold">{person.emailDisplay}</bdi></span>
              </a>
            )}
            {(() => {
              const profileSlug =
                person.profileSlug ||
                (person.id === "mujeeb"
                  ? "mujeeb"
                  : person.id === "kamran-razvi"
                  ? "kamran-razvi"
                  : person.id === "nareinder-reddy"
                  ? "nareinder-reddy"
                  : person.id === "muhammad-asif"
                  ? "muhammad-asif"
                  : undefined);
              if (!profileSlug) return null;
              return (
                <a
                  href={`/team/${profileSlug}`}
                  className="flex min-h-12 min-w-0 items-center gap-3 rounded-xl border border-brand-indigo/20 bg-brand-warm-white px-4 py-2 text-brand-indigo transition-colors hover:border-brand-indigo hover:bg-brand-indigo/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo sm:col-span-2"
                >
                  <QrCode className="h-4 w-4 shrink-0 text-brand-indigo" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-indigo/70">
                      Digital Business Card &amp; QR
                    </span>
                    <span className="block text-xs font-semibold">View verified profile</span>
                  </span>
                </a>
              );
            })()}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-brand-soft-neutral pt-4">
            <div className="flex items-center gap-2">
              <button type="button" aria-label="Previous employee" onClick={() => showProfile(activeIndex - 1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-soft-neutral text-brand-indigo transition-colors hover:bg-brand-warm-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo"><ChevronLeft className="h-5 w-5 rtl:rotate-180" aria-hidden="true" /></button>
              <button type="button" aria-label="Next employee" onClick={() => showProfile(activeIndex + 1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-soft-neutral text-brand-indigo transition-colors hover:bg-brand-warm-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo"><ChevronRight className="h-5 w-5 rtl:rotate-180" aria-hidden="true" /></button>
              {!reducedMotion && <button type="button" aria-label={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => setPaused((value) => !value)} className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-soft-neutral text-brand-indigo transition-colors hover:bg-brand-warm-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo">{paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}</button>}
            </div>
            <div className="flex items-center" role="group" aria-label="Choose an employee">
              {people.map((employee, index) => (
                <button key={employee.id} type="button" aria-label={`Show ${employee.name}`} aria-current={index === activeIndex ? "true" : undefined} onClick={() => showProfile(index)} className="flex h-11 w-9 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-indigo">
                  <span className={`block h-1.5 rounded-full ${index === activeIndex ? "w-5 bg-brand-indigo" : "w-1.5 bg-brand-soft-neutral"}`} />
                </button>
              ))}
            </div>
          </div>
          <p className="sr-only" aria-live="polite">{announcement}</p>
        </div>
      </div>
    </article>
  );
}
