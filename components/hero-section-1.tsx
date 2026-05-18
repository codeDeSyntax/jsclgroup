"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import HeroMeshPattern from "./hero-mesh-pattern";

const heroImages = [
  "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779084984/transparentrealestatebuilding2.png_psd62r.png",
  "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779084988/transparentrealestatebuilding1_xphksl.png",
  "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779098137/h16_kudnoq.png",
];

export default function HeroSection1() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % heroImages.length);
    }, 6800);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-jcl-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeImage}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat max-w-5xl mx-auto top-20"
          style={{ backgroundImage: `url(${heroImages[activeImage]})` }}
          initial={{ opacity: 0, scale: 1.1, filter: "blur(18px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.08, filter: "blur(14px)" }}
          transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      <HeroMeshPattern
        className="absolute inset-0 opacity-100"
        colorClass="text-"
      />

      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.92, 1, 0.92] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero Section Content */}
      <main className="relative z-20 w-full min-h-screen flex items-start pt-20 sm:pt-24 lg:pt-28">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden bg-transparent text-brand-navy">
          <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-6 w-full lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.6fr)] lg:gap-10 xl:gap-14 items-start">
                <div className="max-w-3xl">
                  <h1 className="max-w-3xl text-balance text-4xl font-black leading-[0.95] tracking-[-0.08em] text-jcl-primary sm:text-5xl md:text-7xl">
                    Find a property you
                    <br />
                    will be proud to own
                  </h1>

                  <div className="mt-6 sm:mt-8">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-full bg-jcl-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-black/90"
                    >
                      Start your search
                    </Link>
                  </div>
                </div>

                <div className="pt-2 text-left lg:pt-8 lg:text-right">
                  <p className="max-w-xl text-lg leading-7 text-black/80 sm:text-xl lg:ml-auto">
                    Discover homes, land, and investment opportunities that fit
                    the way you want to live and grow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-2 backdrop-blur-md sm:bottom-8">
        {heroImages.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveImage(index)}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === activeImage ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
            aria-label={`Show hero background ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
