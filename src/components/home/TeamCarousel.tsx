"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Mail, Phone, QrCode } from "lucide-react";
import type { ContactData, TeamProfile } from "@/types/content";
import { useLanguage } from "@/i18n/LanguageContext";

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

interface TeamCarouselProps {
  featured: ContactData;
  featuredEmail?: { display: string; enabled: boolean };
  profiles: TeamProfile[];
  description?: string;
  basePath: string;
  whatsappMessage: string;
  storyLabel: string;
}

const actionCopy: Record<string, { call: string; whatsapp: string; office: string; email: string; profile: string }> = {
  en: { call: "Call", whatsapp: "WhatsApp", office: "Office", email: "Email", profile: "Profile" },
  ar: { call: "اتصال", whatsapp: "واتساب", office: "المكتب", email: "بريد", profile: "الملف الشخصي" },
  hi: { call: "कॉल करें", whatsapp: "व्हाट्सऐप", office: "कार्यालय", email: "ईमेल", profile: "प्रोफ़ाइल" },
  te: { call: "కాల్ చేయండి", whatsapp: "వాట్సాప్", office: "కార్యాలయం", email: "ఇమెయిల్", profile: "ప్రొఫైల్" },
  kn: { call: "ಕರೆ ಮಾಡಿ", whatsapp: "ವಾಟ್ಸಾಪ್", office: "ಕಚೇರಿ", email: "ಇಮೇಲ್", profile: "ಪ್ರೊಫೈಲ್" },
  ta: { call: "அழைக்கவும்", whatsapp: "வாட்ஸ்அப்", office: "அலுவலகம்", email: "மின்னஞ்சல்", profile: "சுயவிவரம்" },
  mr: { call: "कॉल करा", whatsapp: "व्हॉट्सअॅप", office: "कार्यालय", email: "ईमेल", profile: "प्रोफाइल" },
  ma: { call: "വിളിക്കുക", whatsapp: "വാട്ട്സ്ആപ്പ്", office: "ഓഫീസ്", email: "ഇമെയിൽ", profile: "പ്രൊഫൈൽ" },
};

type ContactChannel = {
  id: string;
  label: string;
  href: string;
  ariaLabel: string;
  Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  isExternal: boolean;
};

export default function TeamCarousel({
  featured,
  featuredEmail,
  profiles = [],
  basePath,
  whatsappMessage,
  storyLabel,
}: TeamCarouselProps) {
  const { locale } = useLanguage();
  const actionLabels = actionCopy[locale] || actionCopy.en;

  // Assemble team members in exact order: 1. Kamran, 2. Narender reddy, 3. Mujeeb, 4. Asif
  const mujeebProfile: TeamProfile = {
    id: "mujeeb",
    name: featured.name,
    role: featured.role,
    imageSrc: featured.imageSrc || "/images/india/leadership-mujeeb.jpg",
    imageAlt: `Portrait of ${featured.name}, ${featured.role} at Victor Mobility`,
    placeholder: false,
    phoneDisplay: featured.phoneDisplay,
    phoneHref: featured.phoneHref,
    whatsappDisplay: featured.whatsappDisplay,
    whatsappDigits: featured.whatsappDigits,
    emailDisplay: featuredEmail?.display,
    emailEnabled: featuredEmail?.enabled,
  };

  const allProfiles = [mujeebProfile, ...profiles];

  const getOrderRank = (p: TeamProfile) => {
    const key = `${p.id} ${p.name}`.toLowerCase();
    if (key.includes("kamran")) return 1;
    if (key.includes("nareinder") || key.includes("narender")) return 2;
    if (key.includes("mujeeb")) return 3;
    if (key.includes("asif")) return 4;
    return 99;
  };

  const members: TeamProfile[] = [...allProfiles].sort((a, b) => getOrderRank(a) - getOrderRank(b));

  return (
    <div className="w-full">
      {/* 2x2 Team Grid on Desktop, 1 Column on Mobile with 24px card gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {members.map((member) => {
          const draftText =
            locale === "ar"
              ? `مرحباً ${member.name}، أود مناقشة متطلبات النقل والتنقل مع فيكتور موبيليتي.`
              : whatsappMessage;

          // Assemble only valid, configured and enabled channels
          const channels: ContactChannel[] = [];

          if (member.phoneDisplay && member.phoneHref && !member.placeholder) {
            channels.push({
              id: "phone",
              label: actionLabels.call,
              href: member.phoneHref,
              ariaLabel: `${actionLabels.call} ${member.name}`,
              Icon: Phone,
              isExternal: false,
            });
          }

          if (member.whatsappDigits && !member.placeholder) {
            channels.push({
              id: "whatsapp",
              label: actionLabels.whatsapp,
              href: `https://wa.me/${member.whatsappDigits}?text=${encodeURIComponent(draftText)}`,
              ariaLabel: `${actionLabels.whatsapp} ${member.name}`,
              Icon: WhatsAppIcon,
              isExternal: true,
            });
          }

          if (member.deskPhoneDisplay && !member.placeholder) {
            channels.push({
              id: "office",
              label: actionLabels.office,
              href: member.deskPhoneHref || `tel:${member.deskPhoneDisplay.replace(/\s+/g, "")}`,
              ariaLabel: `${actionLabels.office} ${member.name}`,
              Icon: Building2,
              isExternal: false,
            });
          }

          if (member.emailDisplay && member.emailEnabled && !member.placeholder) {
            channels.push({
              id: "email",
              label: actionLabels.email,
              href: `mailto:${member.emailDisplay}`,
              ariaLabel: `${actionLabels.email} ${member.name}`,
              Icon: Mail,
              isExternal: false,
            });
          }

          const profileSlug =
            member.profileSlug ||
            (member.id === "mujeeb"
              ? "mujeeb"
              : member.id === "kamran-razvi"
              ? "kamran-razvi"
              : member.id === "nareinder-reddy"
              ? "nareinder-reddy"
              : member.id === "muhammad-asif"
              ? "muhammad-asif"
              : member.id === "thameem-ahmed"
              ? "thameem-ahmed"
              : undefined);

          if (profileSlug) {
            channels.push({
              id: "profile",
              label: actionLabels.profile,
              href: `/team/${profileSlug}`,
              ariaLabel: `${actionLabels.profile} for ${member.name}`,
              Icon: QrCode,
              isExternal: false,
            });
          }

          const renderContactLinks = () => (
            <div className="flex flex-wrap items-center gap-2">
              {channels.map(({ id, label, href, ariaLabel, Icon, isExternal }) => (
                <a
                  key={id}
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  aria-label={ariaLabel}
                  title={ariaLabel}
                  className="inline-flex min-h-[44px] items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-brand-indigo hover:text-brand-blue hover:bg-brand-indigo/8 border border-brand-soft-neutral hover:border-brand-indigo/30 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo focus-visible:ring-offset-1 bg-white shadow-2xs cursor-pointer select-none"
                >
                  <Icon className="h-4 w-4 shrink-0 text-brand-indigo" aria-hidden="true" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          );

          return (
            <article
              key={member.id}
              className="bg-white rounded-2xl border border-brand-soft-neutral hover:border-brand-indigo/30 transition-colors shadow-2xs p-5 sm:p-6 text-start"
            >
              {/* Desktop Profile (>= 640px): Horizontal Layout with Vertically Centered Information */}
              <div className="hidden sm:flex sm:items-center sm:gap-5 lg:gap-6">
                {/* Desktop Portrait 112x140 */}
                <div className="relative shrink-0 w-[112px] h-[140px] rounded-xl overflow-hidden bg-brand-warm-white border border-brand-soft-neutral/80 shadow-2xs">
                  <Image
                    src={member.imageSrc}
                    alt={member.imageAlt || `Portrait of ${member.name}`}
                    fill
                    sizes="112px"
                    className="object-cover object-top"
                  />
                </div>

                {/* Vertically Grouped Information: Name, Role, and Contact Actions */}
                <div className="min-w-0 flex-1 flex flex-col justify-center">
                  <h3 className="text-lg sm:text-xl lg:text-[22px] font-semibold text-brand-ink leading-snug tracking-tight break-words">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm sm:text-base font-medium text-brand-indigo leading-normal break-words">
                    {member.role}
                  </p>
                  <div className="mt-4">
                    {renderContactLinks()}
                  </div>
                </div>
              </div>

              {/* Mobile Profile (< 640px): Portrait (88x110) & Text Beside It, Contact Actions Below */}
              <div className="sm:hidden">
                <div className="flex items-center gap-4">
                  {/* Mobile Portrait 88x110 */}
                  <div className="relative shrink-0 w-[88px] h-[110px] rounded-xl overflow-hidden bg-brand-warm-white border border-brand-soft-neutral/80 shadow-2xs">
                    <Image
                      src={member.imageSrc}
                      alt={member.imageAlt || `Portrait of ${member.name}`}
                      fill
                      sizes="88px"
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Name and Role */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-brand-ink leading-snug tracking-tight break-words">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm font-medium text-brand-indigo leading-normal break-words">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Contact Actions Below Profile Row */}
                <div className="mt-4">
                  {renderContactLinks()}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Understated Section-level Story Link */}
      <div className="mt-8 sm:mt-12 text-center">
        <Link
          href={`${basePath}/about`}
          className="inline-flex min-h-[44px] items-center gap-2 text-sm sm:text-base font-semibold text-brand-indigo hover:text-brand-blue transition-colors group/link focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo rounded-xl px-4 py-2"
        >
          <span>{storyLabel}</span>
          <ArrowRight
            className="h-4 w-4 rtl:rotate-180 transition-transform group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </div>
  );
}
