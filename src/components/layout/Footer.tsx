"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageSquare, MapPin } from "lucide-react";
import type { ContactData, OfficeItem } from "@/types/content";
import BrandLogo from "@/components/brand/BrandLogo";
import { useLanguage } from "@/i18n/LanguageContext";

interface FooterProps {
  contact: ContactData;
  offices: OfficeItem[];
  mediaCaption: string;
  isoEnabled?: boolean;
}

export default function Footer({
  contact,
  offices,
  mediaCaption,
  isoEnabled = false,
}: FooterProps) {
  const pathname = usePathname();
  const prefix = pathname.startsWith("/uae") ? "/uae" : "/india";
  const isIndia = prefix === "/india";
  const { dict, locale } = useLanguage();
  const publishedOffices = offices.filter((o) => o.published);

  const whatsappMessage =
    locale === "ar"
      ? "مرحباً فيكتور موبيليتي، أود مناقشة متطلبات النقل والتنقل."
      : locale === "hi"
      ? "नमस्ते Victor Mobility, मैं एक परिवहन आवश्यकता पर चर्चा करना चाहता हूँ।"
      : locale === "te"
      ? "నమస్కారం Victor Mobility, నేను రవాణా అవసరం గురించి చర్చించాలనుకుంటున్నాను."
      : "Hello Victor Mobility, I would like to discuss a transport requirement.";

  const aboutText = isIndia
    ? dict.footer.aboutText
    : (locale === "ar"
        ? "خدمات ليموزين فاخرة وتنقلات كبار الشخصيات من وإلى مطار دبي، وتنظيم وفود الشركات عبر دبي وأبوظبي والإمارات."
        : "First-class executive limousine services, DXB terminal transfers, corporate delegations, and luxury mobility across Dubai and Abu Dhabi.");

  return (
    <footer className="bg-brand-ink text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href={prefix}
              className="inline-flex items-center justify-center bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-white/15 hover:border-white/35 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Victor Mobility - Home"
            >
              <BrandLogo className="h-11 sm:h-12 aspect-[810/430] transition-transform duration-150 group-hover:scale-102" />
            </Link>
            <p className="text-sm leading-relaxed text-brand-soft-neutral/80 max-w-sm">
              {aboutText}
            </p>
            {isoEnabled && (
              <p className="text-xs text-brand-soft-neutral/80 font-medium">
                {isIndia ? dict.footer.isoCommitment : "ISO 9001:2015 Quality Commitment"}
              </p>
            )}
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-soft-neutral mb-3">
              {dict.footer.exploreTitle || "Explore"}
            </h2>
            <ul className="space-y-2 text-sm text-brand-soft-neutral/80">
              <li>
                <Link
                  href={`${prefix}/estimator`}
                  className="inline-block py-1 transition-colors hover:text-white"
                >
                  {dict.nav.estimator || "Estimator"}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/rfp`}
                  className="inline-block py-1 transition-colors hover:text-white"
                >
                  {dict.nav.rfp || "RFP Desk"}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/services`}
                  className="hover:text-white transition-colors py-1 inline-block"
                >
                  {dict.nav.services || "Services"}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/fleet`}
                  className="hover:text-white transition-colors py-1 inline-block"
                >
                  {dict.nav.fleet || "Our Fleet"}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/about`}
                  className="hover:text-white transition-colors py-1 inline-block"
                >
                  {dict.nav.about || "About Victor"}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}#network`}
                  className="hover:text-white transition-colors py-1 inline-block"
                >
                  {dict.footer.hubsTitle || "Operating Hubs"}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/contact`}
                  className="hover:text-white transition-colors py-1 inline-block"
                >
                  {dict.nav.contact || "Contact Desk"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Operations & Booking Contact Desk */}
          <div className="lg:col-span-3 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-soft-neutral mb-3">
              {dict.footer.contactTitle || "Direct Contact Desk"}
            </h2>
            <p className="font-semibold text-sm text-white">{contact.name}</p>
            <p className="text-xs text-brand-soft-neutral/75">{contact.role}</p>

            <div className="space-y-2 pt-1">
              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2 text-sm text-brand-soft-neutral hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-blue shrink-0" />
                <span dir="ltr">{contact.phoneDisplay}</span>
              </a>
              <div>
                <a
                  href={`${contact.whatsappBaseUrl}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-brand-soft-neutral hover:text-white transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp (<span dir="ltr">{contact.whatsappDisplay}</span>)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Operating Hubs Summary */}
          <div className="lg:col-span-3 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-soft-neutral mb-3">
              {dict.footer.hubsTitle || "Operating Offices"}
            </h2>
            <div className="space-y-2.5 text-xs text-brand-soft-neutral/80 leading-relaxed">
              {publishedOffices.map((office) => {
                const officeCityName =
                  locale === "ar" && office.city === "Dubai"
                    ? "دبي"
                    : locale === "ar" && office.city === "Abu Dhabi"
                    ? "أبوظبي"
                    : office.city;
                const officeLabel =
                  locale === "ar" && office.city === "Dubai"
                    ? "المقر الرئيسي بالإمارات"
                    : office.label;

                return (
                  <div key={office.city} className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-blue shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white">{officeCityName}</span> ({officeLabel})
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legal & Attribution Bottom Row */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-soft-neutral/70">
          <p>© {new Date().getFullYear()} Victor Mobility. On Time Every Time.</p>
          <div className="flex items-center gap-4">
            <Link href={`${prefix}/privacy`} className="hover:text-white underline underline-offset-4">
              {dict.nav.privacy || "Privacy Notice"}
            </Link>
            <span className="italic">{mediaCaption}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}