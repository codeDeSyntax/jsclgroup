"use client";

import Link from "next/link";

export default function HeroContent() {
  return (
    <div>
      <p className="text-jcl-accent font-extrabold pt-6 text-sm sm:text-base">
        Welcome to JCL Royal Group Limited
      </p>

      <h1 className="max-w-2xl text-balance text-3xl pt3 sm:text-4xl md:text-4xl lg:text-5xl font-black leading-[1] tracking-[-0.06em] text-white">
        Find a property you
        <br />
        will be proud to own
      </h1>

      <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-6 text-white/85 max-w-xl">
        Discover homes, land, and investment opportunities that fit the way you
        want to live and grow.
      </p>

      <div className="mt-6 sm:mt-8">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-jcl-accent px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-white/90"
        >
          Start your search
        </Link>
      </div>
    </div>
  );
}
