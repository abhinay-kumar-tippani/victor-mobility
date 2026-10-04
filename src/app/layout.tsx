import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Victor Mobility | On Time Every Time.",
    template: "%s | Victor Mobility",
  },
  description:
    "Corporate employee transportation, bus shuttles, airport transfers, event logistics, and executive chauffeur travel across Hyderabad, Bengaluru, and Pune.",
  keywords: [
    "employee transportation",
    "corporate bus shuttles",
    "airport transfers Hyderabad",
    "corporate mobility Bengaluru",
    "event transportation Pune",
    "executive chauffeur India",
  ],
  authors: [{ name: "Victor Mobility Pvt. Ltd." }],
  creator: "Victor Mobility Pvt. Ltd.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Victor Mobility",
    title: "Victor Mobility | On Time Every Time.",
    description:
      "Employee transportation, bus and shuttle services, airport transfers, and luxury travel across Hyderabad, Bengaluru, and Pune.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Victor Mobility | On Time Every Time.",
    description:
      "Corporate transport, employee shuttles, and luxury travel across Hyderabad, Bengaluru, and Pune.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#31326F",
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
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="min-h-screen bg-white font-sans text-brand-ink antialiased">
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-brand-indigo focus:text-white focus:font-bold focus:text-xs focus:uppercase focus:tracking-wider focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
