"use client";

import Link from "next/link";
import HeroMeshPattern from "./hero-mesh-pattern";

export default function HeroSection1() {
  return (
    <div
      className="relative w-full min-h-screen"
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/dlhyawc5e/image/upload/v1778673011/hr4_vkgj6i.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-transparent"></div>

      {/* Decorative mesh pattern revealed through holes */}
      <HeroMeshPattern
        holes={[
          { x: 22, y: 26, r: 12 },
          { x: 72, y: 62, r: 14 },
        ]}
        // Prominent on hero: stronger color and wrapper opacity
        colorClass="text-jcl-primary/70"
        className="z-10 opacity-95"
      />

      {/* Hero Section Content */}
      <main className="relative z-20 w-full min-h-screen flex items-start pt-20 sm:pt-24 lg:pt-28">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden bg-transparent text-brand-navy">
          <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-6 w-full lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.6fr)] lg:gap-10 xl:gap-14 items-start">
                <div className="max-w-3xl">
                  <h1 className="max-w-3xl text-balance text-4xl font-black leading-[0.95] tracking-[-0.08em] text-black sm:text-5xl md:text-7xl">
                    Find a property you
                    <br />
                    will be proud to own
                  </h1>

                  <div className="mt-6 sm:mt-8">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-black/90"
                    >
                      Start your search
                    </Link>
                  </div>
                </div>

                <div className="pt-2 text-left lg:pt-8 lg:text-right">
                  <p className="mt-4 max-w-xl text-lg sm:text-xl leading-7 text-black/80 lg:ml-auto">
                    Discover homes, land, and investment opportunities that fit
                    the way you want to live and grow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
