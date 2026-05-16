"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ElectronicsCategoryStrip from "./electronics-category-strip";
import { electronicsSlides } from "./electronics-data";

type HeroCardSlide = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  cta: string;
};

function HeroCard({ slide, index }: { slide: HeroCardSlide; index: number }) {
  const isMiddleCard = index === 1;
  const gradientColors = [
    { from: "#e8002d", to: "#ff6b35" },
    { from: "#1a1a2e", to: "#16213e" },
    { from: "#0f3460", to: "#533483" },
  ];
  const { from, to } = gradientColors[index % 3];

  return (
    <div
      className="overflow-hidden rounded-3xl border border-black/10 md:h-[320px]"
      style={
        isMiddleCard
          ? { backgroundColor: "#ffffff" }
          : { backgroundImage: `linear-gradient(to bottom right, ${from}, ${to})` }
      }
    >
      <div className="flex h-full min-h-0 flex-col lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div
          className={`flex h-full min-h-0 flex-col justify-start px-5 pb-3 pt-5 sm:px-8 sm:pb-4 sm:pt-6 lg:justify-center lg:px-10 lg:py-10 ${
            isMiddleCard ? "text-gray-900" : "text-white"
          }`}
        >
          <p
            className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${
              isMiddleCard ? "text-gray-600" : "text-white/80"
            }`}
          >
            {slide.eyebrow}
          </p>
          <h1 className="max-w-md text-2xl font-extrabold leading-tight sm:text-3xl lg:text-3xl">
            {slide.title}
          </h1>
          <p
            className={`mt-2 max-w-md text-sm leading-5 sm:mt-3 sm:text-base ${
              isMiddleCard ? "text-gray-700" : "text-white/90"
            }`}
          >
            {slide.description}
          </p>
          <div className="mt-4 sm:mt-5 lg:mt-6">
            <Link
              href="/products/electronics"
              className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition ${
                isMiddleCard
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-black text-white hover:bg-black/85"
              }`}
            >
              {slide.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center px-5 pb-5 sm:px-8 sm:pb-8 lg:px-10 lg:py-10">
          <Image
            src={slide.image}
            alt={slide.title}
            width={680}
            height={520}
            className="h-auto max-h-36 w-full max-w-[280px] object-contain sm:max-h-40 sm:max-w-[320px] lg:max-h-full lg:max-w-[500px]"
            priority
          />
        </div>
      </div>
    </div>
  );
}

function ElectronicsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayMs = 25000; // 25 seconds
  const autoplayRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (!emblaApi) return;
    autoplayRef.current = window.setInterval(() => {
      if (!emblaApi) return;
      if (!isPausedRef.current) emblaApi.scrollNext();
    }, autoplayMs);
  };

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    emblaApi.on("select", onSelect);
    // start autoplay when embla is ready
    startAutoplay();

    return () => {
      emblaApi.off("select", onSelect);
      stopAutoplay();
    };
  }, [emblaApi]);

  const scrollTo = (index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
    // restart autoplay after manual navigation
    isPausedRef.current = false;
    startAutoplay();
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div
        className="overflow-hidden"
        ref={emblaRef}
        onPointerEnter={() => {
          isPausedRef.current = true;
        }}
        onPointerLeave={() => {
          isPausedRef.current = false;
        }}
        onPointerDown={() => {
          isPausedRef.current = true;
        }}
        onPointerUp={() => {
          isPausedRef.current = false;
        }}
      >
        <div className="flex gap-0 sm:gap-4">
          {electronicsSlides.map((slide, index) => (
            <div
              key={slide.title}
              className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_88%] md:flex-[0_0_calc(50%-1rem)] lg:flex-[0_0_calc(60%-1rem)]"
              style={{ scrollSnapAlign: "center" }}
            >
              <HeroCard slide={slide} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="mt-5 flex justify-center gap-2">
        {electronicsSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all ${
              selectedIndex === index
                ? "w-8 bg-jcl-primary"
                : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ElectronicsHero() {
  return (
    <section className="bg-jcl-white pb-6 pt-[70px]">
      <div className="">
        <ElectronicsCategoryStrip />
        <ElectronicsCarousel />
      </div>
    </section>
  );
}
