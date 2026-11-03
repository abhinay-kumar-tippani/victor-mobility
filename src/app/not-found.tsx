import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-brand-ink sm:text-5xl">404</h1>
      <p className="mt-4 text-lg font-medium text-brand-ink/80">Page not found</p>
      <p className="mt-2 text-sm text-brand-ink/60">
        Sorry, we could not find the page you are looking for.
      </p>
      <div className="mt-6 flex gap-4">
        <Link
          href="/india"
          className="rounded-xl bg-brand-indigo px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-brand-indigo/90"
        >
          Go to India Homepage
        </Link>
        <Link
          href="/uae"
          className="rounded-xl border border-brand-soft-neutral bg-white px-5 py-2.5 text-sm font-semibold text-brand-ink hover:bg-brand-warm-white"
        >
          Go to UAE Homepage
        </Link>
      </div>
    </div>
  );
}
