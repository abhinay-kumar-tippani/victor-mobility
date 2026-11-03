"use client";

import BrandText from "@/components/brand/BrandText";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageSquare, MapPin, Mail } from "lucide-react";
import type { ContactData, OfficeItem, CityItem } from "@/types/content";
import BrandLogo from "@/components/brand/BrandLogo";
import { useLanguage } from "@/i18n/LanguageContext";
import indiaData from "@/content/india.json";

interface FooterProps {
  contact: ContactData;
  offices: OfficeItem[];
  cities?: CityItem[];
  mediaCaption: string;
  isoEnabled?: boolean;
}

export default function Footer({
  contact,
  offices,
  cities,
  mediaCaption,
  isoEnabled = false,
}: FooterProps) {
  const pathname = usePathname();
  const prefix = pathname.startsWith("/uae") ? "/uae" : "/india";
  const isIndia = prefix === "/india";
  const { dict, locale } = useLanguage();
  const publishedOffices = offices.filter((o) => o.published);

  // For India, display all 10 authorized operating cities from india.json without "Branch Office" text.
  // Head Office (Hyderabad) is designated cleanly while the other 9 hubs display only their city names.
  const indiaCities = (cities && cities.length > 0 ? cities : (indiaData.cities as CityItem[])).filter(
    (c) => c.published
  );

  const whatsappMessage =
    locale === "ar"
      ? "مرحباً فيكتور موبيليتي، أود مناقشة متطلبات النقل والتنقل."
      : locale === "hi"
      ? "नमस्ते Victor Mobility, मैं एक परिवहन आवश्यकता पर चर्चा करना चाहता हूँ।"
      : locale === "te"
      ? "నమస్కారం Victor Mobility, నేను రవాణా అవసరం గురించి చర్చించాలనుకుంటున్నాను."
      : locale === "kn"
      ? "ನಮಸ್ಕಾರ Victor Mobility, ನಾನು ಸಾರಿಗೆ ಅವಶ್ಯಕತೆಯ ಬಗ್ಗೆ ಚರ್ಚಿಸಲು ಬಯಸುತ್ತೇನೆ."
      : locale === "ta"
      ? "வணக்கம் Victor Mobility, நான் ஒரு போக்குவரத்து தேவை பற்றி பேச விரும்புகிறேன்."
      : locale === "ma"
      ? "നമസ്കാരം Victor Mobility, എനിക്ക് ഒരു യാത്രാ ആവശ്യത്തെക്കുറിച്ച് സംസാരിക്കണം."
      : locale === "mr"
      ? "नमस्ते Victor Mobility, मला वाहतूक व्यवस्थेबद्दल चौकशी करायची आहे."
      : "Hello Victor Mobility, I would like to discuss a transport requirement.";

  const asifPerson = indiaData.contact.available247?.people?.find(
    (p) => p.name.includes("Asif")
  ) || {
    name: "Muhammad Asif",
    designation: "Manager - Admin & Finance",
    phoneDisplay: "+91 9100 77 77 68",
    phoneHref: "tel:+919100777768",
    whatsappDisplay: "+91 9100 77 77 68",
    whatsappDigits: "919100777768",
    email: "asif@victorluxurylimousine.com",
  };

  const asifRole =
    locale === "ar"
      ? "مدير - الشؤون الإدارية والمالية"
      : locale === "hi"
      ? "प्रबंधक - प्रशासन एवं वित्त"
      : locale === "te"
      ? "మేనేజర్ - అడ్మిన్ & ఫైనాన్స్"
      : locale === "kn"
      ? "ಮ್ಯಾನೇಜರ್ - ಅಡ್ಮಿನ್ & ಫೈನಾನ್ಸ್"
      : locale === "ta"
      ? "மேலாளர் - நிர்வாகம் மற்றும் நிதி"
      : locale === "ma"
      ? "മാനേജർ - അഡ്മിൻ & ഫിനാൻസ്"
      : locale === "mr"
      ? "व्यवस्थापक - प्रशासन आणि वित्त"
      : (asifPerson.designation || "Manager - Admin & Finance");

  const asifWhatsappMessage =
    locale === "ar"
      ? "مرحباً محمد آصف، أود مناقشة متطلبات النقل والتنقل مع شركة فيكتور موبيليتي."
      : locale === "hi"
      ? "नमस्ते Muhammad Asif, मैं Victor Mobility के साथ परिवहन आवश्यकता पर चर्चा करना चाहता हूँ।"
      : locale === "te"
      ? "నమస్కారం Muhammad Asif, నేను Victor Mobility తో రవాణా అవసరాల గురించి చర్చించాలనుకుంటున్నాను."
      : locale === "kn"
      ? "ನಮಸ್ಕಾರ Muhammad Asif, ನಾನು Victor Mobility ಯೊಂದಿಗೆ ಸಾರಿಗೆ ಅಗತ್ಯವನ್ನು ಚರ್ಚಿಸಲು ಬಯಸುತ್ತೇನೆ."
      : locale === "ta"
      ? "வணக்கம் Muhammad Asif, நான் Victor Mobility உடன் போக்குவரத்து தேவையைப் பற்றி பேச விரும்புகிறேன்."
      : locale === "ma"
      ? "നമസ്കാരം Muhammad Asif, Victor Mobility യുമായി യാത്രാ ആവശ്യത്തെക്കുറിച്ച് സംസാരിക്കാൻ ഞാൻ ആഗ്രഹിക്കുന്നു."
      : locale === "mr"
      ? "नमस्ते Muhammad Asif, मला Victor Mobility सोबत वाहतूक गरजेबद्दल चर्चा करायची आहे."
      : "Hello Muhammad Asif, I would like to discuss a transport requirement with Victor Mobility.";

  const uaeWhatsappMessage =
    locale === "ar"
      ? "مرحباً فيكتور موبيليتي، أود مناقشة متطلبات النقل والتنقل."
      : "Hello Victor Mobility, I would like to discuss a transport requirement.";

  // Direct Contact Desk: Mujeeb's details are removed.
  // India displays Muhammad Asif (Manager - Admin & Finance); UAE displays UAE Operations & Reservation Desk.
  const deskName = isIndia ? asifPerson.name : (locale === "ar" ? "مكتب العمليات والحجوزات بالإمارات" : contact.name);
  const deskRole = isIndia ? asifRole : (locale === "ar" ? "خدمات العملاء وتنسيق الأسطول" : contact.role);
  const deskPhoneDisplay = isIndia ? asifPerson.phoneDisplay : contact.phoneDisplay;
  const deskPhoneHref = isIndia ? asifPerson.phoneHref : contact.phoneHref;
  const deskWhatsappDisplay = isIndia ? asifPerson.whatsappDisplay : contact.whatsappDisplay;
  const deskWhatsappHref = isIndia
    ? `https://wa.me/${asifPerson.whatsappDigits}?text=${encodeURIComponent(asifWhatsappMessage)}`
    : `${contact.whatsappBaseUrl}?text=${encodeURIComponent(uaeWhatsappMessage)}`;
  const deskEmail = isIndia ? asifPerson.email : (contact.emailEnabled ? contact.printedEmail : null);

  const aboutText = isIndia
    ? dict.footer.aboutText
    : (locale === "ar"
        ? "خدمات ليموزين فاخرة وتنقلات كبار الشخصيات من وإلى مطار دبي، وتنظيم وفود الشركات عبر دبي وأبوظبي والإمارات."
        : "First-class executive limousine services, DXB terminal transfers, corporate delegations, and luxury mobility across Dubai and Abu Dhabi.");

  return (
    <footer className="bg-brand-ink text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 mb-6 sm:mb-7">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-2.5">
            <Link
              href={prefix}
              className="inline-flex items-center justify-center bg-white px-3 py-1.5 rounded-xl shadow-sm border border-white/15 hover:border-white/35 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Victor Mobility - Home"
            >
              <BrandLogo className="h-8 sm:h-9 aspect-[810/430] transition-transform duration-150 group-hover:scale-102" />
            </Link>
            <p className="text-xs sm:text-sm leading-relaxed text-brand-soft-neutral/80 max-w-sm">
              {aboutText}
            </p>
            {isoEnabled && (
              <p className="text-[11px] sm:text-xs text-brand-soft-neutral/70 font-medium">
                {isIndia ? dict.footer.isoCommitment : "ISO 9001:2015 Quality Commitment"}
              </p>
            )}
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-soft-neutral/90 mb-2">
              {dict.footer.exploreTitle || "Explore"}
            </h2>
            <ul className="space-y-1 text-xs sm:text-sm text-brand-soft-neutral/80">
              <li>
                <Link
                  href={`${prefix}/services`}
                  className="inline-block py-0.5 transition-colors hover:text-white"
                >
                  {dict.nav.services || "Services"}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/fleet`}
                  className="inline-block py-0.5 transition-colors hover:text-white"
                >
                  {dict.nav.fleet || "Our Fleet"}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/about`}
                  className="inline-block py-0.5 transition-colors hover:text-white"
                >
                  <BrandText>{dict.nav.about || "About Victor"}</BrandText>
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}#network`}
                  className="inline-block py-0.5 transition-colors hover:text-white"
                >
                  {dict.footer.hubsTitle || "Operating Hubs"}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/contact`}
                  className="inline-block py-0.5 transition-colors hover:text-white"
                >
                  {dict.nav.contact || "Contact Desk"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Operations & Booking Contact Desk */}
          <div className="lg:col-span-3 space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-soft-neutral/90 mb-2">
              {dict.footer.contactTitle || "Direct Contact Desk"}
            </h2>

            <div className="space-y-1">
              <p className="font-semibold text-sm text-white">{deskName}</p>
              <p className="text-xs text-brand-soft-neutral/75">{deskRole}</p>

              <div className="space-y-1.5 pt-1">
                <div>
                  <a
                    href={deskPhoneHref}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm text-brand-soft-neutral hover:text-white transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                    <span dir="ltr">{deskPhoneDisplay}</span>
                  </a>
                </div>
                <div>
                  <a
                    href={deskWhatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm text-brand-soft-neutral hover:text-white transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>WhatsApp (<span dir="ltr">{deskWhatsappDisplay}</span>)</span>
                  </a>
                </div>
                {deskEmail && (
                  <div>
                    <a
                      href={`mailto:${deskEmail}`}
                      className="inline-flex items-center gap-2 text-xs text-brand-soft-neutral hover:text-white transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-brand-indigo shrink-0" />
                      <span dir="ltr">{deskEmail}</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Operating Hubs Summary */}
          <div className="lg:col-span-3 space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-soft-neutral/90 mb-2">
              {dict.footer.hubsTitle || "Operating Hubs"}
            </h2>
            {isIndia ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-brand-soft-neutral/80 leading-snug">
                {indiaCities.map((city) => {
                  const isHeadOffice = city.name === "Hyderabad";
                  const headOfficeLabel = dict.presence?.headOffice || "Head Office";

                  return (
                    <Link
                      key={city.name}
                      href={`${prefix}#network`}
                      className="flex items-start gap-1.5 group hover:text-white transition-colors py-0.5"
                      title={`View ${city.name} Operations`}
                    >
                      <MapPin className="w-3.5 h-3.5 text-brand-blue group-hover:text-brand-warm-gold shrink-0 mt-0.5 transition-colors" />
                      <div className="leading-tight">
                        <span className="font-semibold text-white group-hover:underline underline-offset-2">
                          {city.name}
                        </span>
                        {isHeadOffice && (
                          <span className="text-[11px] text-brand-soft-neutral/70 block xl:inline xl:ml-1 font-normal">
                            ({headOfficeLabel})
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-1.5 text-xs text-brand-soft-neutral/80 leading-snug">
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
                    <Link
                      key={office.city}
                      href={`${prefix}#network`}
                      className="flex items-start gap-1.5 group hover:text-white transition-colors py-0.5"
                      title={`View ${office.city} Operations`}
                    >
                      <MapPin className="w-3.5 h-3.5 text-brand-blue group-hover:text-brand-warm-gold shrink-0 mt-0.5 transition-colors" />
                      <div className="leading-tight">
                        <span className="font-semibold text-white group-hover:underline underline-offset-2">
                          {officeCityName}
                        </span>{" "}
                        <span className="text-[11px] text-brand-soft-neutral/70 font-normal">
                          ({officeLabel})
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Legal & Attribution Bottom Row */}
        <div className="border-t border-white/10 pt-3.5 sm:pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-soft-neutral/70">
          <p>© {new Date().getFullYear()}<BrandText> Victor Mobility. On Time Every Time.</BrandText></p>
          <div className="flex items-center gap-4">
            <Link href={`${prefix}/privacy`} className="hover:text-white underline underline-offset-4">
              {dict.nav.privacy || "Privacy Notice"}
            </Link>
            <span className="italic"><BrandText>{mediaCaption}</BrandText></span>
          </div>
        </div>
      </div>
    </footer>
  );
}