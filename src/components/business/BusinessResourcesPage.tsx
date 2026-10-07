import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import india from "@/content/india.json";
import uae from "@/content/uae.json";
import media from "@/content/media.json";
import type { IndiaContent } from "@/types/content";

export default function BusinessResourcesPage({ region }: { region: "india" | "uae" }) {
  const content = (region === "india" ? india : uae) as unknown as IndiaContent;
  return <>
    <Header contact={content.contact} />
    <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
      <div className="max-w-2xl mb-10">
        <p className="text-sm font-semibold text-brand-blue mb-3">Corporate resources</p>
        <h1 className="text-3xl sm:text-5xl font-bold text-brand-ink mb-5">For businesses</h1>
        <p className="text-lg text-brand-ink/75 leading-relaxed">Find planning tools, company information and the right team for your transport requirements.</p>
        <Link href={`/${region}/rfp`} className="inline-flex mt-6 min-h-[48px] items-center px-6 py-3 bg-brand-indigo text-white rounded-xl font-semibold">Request a proposal</Link>
      </div>
      <div className="grid sm:grid-cols-2 gap-8">
        {india.businessResources.map((group) => <section key={group.title} className="border-t border-brand-soft-neutral pt-6">
          <h2 className="text-xl font-bold text-brand-ink mb-3">{group.title}</h2>
          <ul>{group.links.map(([path, label]) => <li key={path}><Link href={`/${region}/${path}`} className="flex items-center min-h-[44px] py-2 text-brand-indigo underline decoration-brand-indigo/25 underline-offset-4 hover:decoration-brand-indigo">{label}</Link></li>)}</ul>
        </section>)}
      </div>
    </main>
    <Footer contact={content.contact} offices={content.offices} mediaCaption={media.caption} isoEnabled={false} />
  </>;
}
