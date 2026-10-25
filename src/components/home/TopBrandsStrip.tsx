import Image from "next/image";
import indiaData from "@/content/india.json";

export default function TopBrandsStrip({ title = indiaData.topBrandsCarried.title, caption }: { title?: string; caption?: string } = {}) {
  const { brands } = indiaData.topBrandsCarried;
  return (
    <section id="top-brands-carried" aria-labelledby="top-brands-title" className="rounded-3xl bg-[#07182C] px-5 py-8 sm:p-10">
      <h2 id="top-brands-title" className="mb-7 text-center text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
        {brands.map((brand) => (
          <li key={brand.name} className="flex min-w-0 flex-col items-center justify-center gap-4 rounded-2xl bg-white px-4 py-6 sm:py-7">
            <Image src={brand.logo} alt={brand.name + " logo"} width={160} height={64} unoptimized className="h-16 w-full object-contain" />
            <span className="text-xs font-semibold tracking-wide text-brand-ink">{brand.name}</span>
          </li>
        ))}
      </ul>
      {caption && <p className="mt-6 text-center text-xs leading-relaxed text-white/75">{caption}</p>}
    </section>
  );
}
