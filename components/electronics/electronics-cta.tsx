import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ElectronicsCta() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[#111827] px-6 py-10 text-white sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
              Need help choosing?
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black leading-[0.95] tracking-[-0.05em] sm:text-4xl lg:text-5xl">
              Our team can help you find the right electronics for your needs.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
              Compare features, pricing, and compatibility before you buy.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-jcl-accent px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
            >
              Contact sales
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/products/electronics"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
