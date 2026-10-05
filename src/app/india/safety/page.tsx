import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FleetSafetyAuditDesk from '@/components/safety/FleetSafetyAuditDesk';
import indiaData from '@/content/india.json';
import mediaData from '@/content/media.json';
import safetyData from '@/content/safety.json';
import type { IndiaContent, MediaContent } from '@/types/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Enterprise Fleet Safety, IoT Telematics & Vehicle Audit Desk | Victor Mobility India',
  description:
    'AIS-140 GPS telematics, dual tactical panic SOS buttons, speed governors, 50-point pre-trip vehicle audits, and women passenger night safety protocols in Hyderabad, Bengaluru, and Pune.',
  alternates: {
    canonical: 'https://victor-mobility.vercel.app/india/safety',
    languages: {
      'en-IN': 'https://victor-mobility.vercel.app/india/safety',
      'en-AE': 'https://victor-mobility.vercel.app/uae/safety',
    },
  },
};

export default function IndiaSafetyPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const safetyIndia = safetyData.india;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Victor Mobility Enterprise Fleet Safety, IoT Telematics & Vehicle Audit Desk',
    serviceType: 'Corporate Transportation Fleet Safety & IoT Telematics Audit Services',
    description: safetyIndia.description,
    provider: {
      '@type': 'Organization',
      name: content.companyName,
      url: 'https://victor-mobility.vercel.app/india',
      telephone: content.contact.phoneHref,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        addressCountry: 'IN',
      },
    },
    termsOfService: 'https://victor-mobility.vercel.app/india/safety',
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="print:hidden">
        <Header contact={content.contact} />
      </div>

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Breadcrumb Bar */}
        <div className="print:hidden bg-slate-900/60 border-b border-slate-800 text-xs text-slate-400 py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto flex items-center gap-2">
            <Link href="/india" className="hover:text-amber-400 transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/india/sla" className="hover:text-amber-400 transition">
              SLA &amp; Compliance
            </Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">Fleet Safety &amp; Telematics</span>
          </div>
        </div>

        {/* Interactive Safety Desk */}
        <FleetSafetyAuditDesk
          region="india"
          title={safetyIndia.title}
          eyebrow={safetyIndia.eyebrow}
          description={safetyIndia.description}
          auditCategories={safetyIndia.auditCategories}
          telematicsHardware={safetyIndia.telematicsHardware}
          womenSafetyProtocol={safetyIndia.womenSafetyProtocol}
          faqs={safetyIndia.faqs}
          phone={content.contact.phoneDisplay}
          whatsapp={content.contact.whatsappDisplay}
          supportHours="24/7 Fleet Safety & Emergency Command Desk"
        />
      </main>

      <div className="print:hidden">
        <Footer
          contact={content.contact}
          offices={content.offices}
          mediaCaption={media.caption}
          isoEnabled={content.sourceClaims?.iso?.enabled}
        />
      </div>
    </div>
  );
}
