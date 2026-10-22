import type { Metadata, Viewport } from "next";
import { Manrope, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Victor Mobility | On Time Every Time.",
    template: "%s | Victor Mobility",
  },
  description:
    "Corporate employee transportation, bus shuttles, airport transfers, event logistics, and executive chauffeur travel across 10 operational hubs: Hyderabad, Bengaluru, Chennai, Pune, Mumbai, Delhi, Noida, Gurgaon, Ahmedabad, and Kolkata.",
  keywords: [
    "employee transportation",
    "corporate bus shuttles",
    "airport transfers Hyderabad",
    "corporate mobility Bengaluru",
    "event transportation Pune",
    "executive chauffeur India",
    "corporate fleet Delhi Mumbai Chennai",
  ],
  authors: [{ name: "Victor Mobility Pvt. Ltd." }],
  creator: "Victor Mobility Pvt. Ltd.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Victor Mobility",
    title: "Victor Mobility | On Time Every Time.",
    description:
      "Employee transportation, bus and shuttle services, airport transfers, and luxury travel across 10 major commercial hubs pan-India.",
    images: [
      {
        url: "/images/india/hero.png",
        width: 1200,
        height: 630,
        alt: "Victor Mobility - On Time Every Time.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Victor Mobility | On Time Every Time.",
    description:
      "Corporate transport, employee shuttles, and luxury travel across 10 major commercial hubs pan-India.",
    images: ["/images/india/hero.png"],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Victor Mobility",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#15162F",
  width: "device-width",
  initialScale: 1,
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "urn:victor-mobility:organization",
      "name": "Victor Mobility Pvt. Ltd.",
      "slogan": "On Time Every Time.",
      "telephone": "+91 91007 77768",
      "areaServed": [
        { "@type": "City", "name": "Hyderabad" },
        { "@type": "City", "name": "Bengaluru" },
        { "@type": "City", "name": "Pune" }
      ],
      "knowsAbout": [
        "Employee Transportation",
        "Bus & Shuttle Transport",
        "Event Transportation",
        "Airport Transfers",
        "Chauffeur & Luxury Travel",
        "Vehicle Rentals"
      ]
    },
    {
      "@type": "LocalBusiness",
      "@id": "urn:victor-mobility:head-office",
      "name": "Victor Mobility Pvt. Ltd. - India Head Office",
      "telephone": "+91 91007 77768",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2-48/3&5, VSGGC/4th Floor, Venkata Sai's Ganapathi Gold Complex, Telecom Nagar, Gachibowli",
        "addressLocality": "Hyderabad",
        "postalCode": "500032",
        "addressRegion": "Telangana",
        "addressCountry": "IN"
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": "urn:victor-mobility:bengaluru-office",
      "name": "Victor Mobility Pvt. Ltd. - Bengaluru Branch Office",
      "telephone": "+91 91007 77768",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "#22 Hamsa Mansion, B-Block, 4th Main Road, Cybela Greens BDA Layout, Phase-2, Maragondanahalli",
        "addressLocality": "Bengaluru",
        "postalCode": "560036",
        "addressRegion": "Karnataka",
        "addressCountry": "IN"
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": "urn:victor-mobility:pune-office",
      "name": "Victor Mobility Pvt. Ltd. - Pune Branch Office",
      "telephone": "+91 91007 77768",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Flat No. S-3, 1st Floor, Tanishka Prestige, Manjari Budruk, Hadapsar",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${manrope.variable} ${ibmPlexArabic.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=window.location.pathname;if(p.startsWith('/uae')){var lu=localStorage.getItem('victor_locale_uae');if(lu==='ar'){document.documentElement.lang='ar';document.documentElement.dir='rtl';}else{document.documentElement.lang='en';document.documentElement.dir='ltr';}}else if(p.startsWith('/india')){var li=localStorage.getItem('victor_locale_india')||localStorage.getItem('victor_locale');if(li==='hi'||li==='te'){document.documentElement.lang=li;}else{document.documentElement.lang='en';}document.documentElement.dir='ltr';}else{document.documentElement.lang='en';document.documentElement.dir='ltr';}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className={`${manrope.className} min-h-screen bg-white font-sans text-brand-ink antialiased`}>
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-brand-indigo focus:text-white focus:font-bold focus:text-xs focus:uppercase focus:tracking-wider focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
