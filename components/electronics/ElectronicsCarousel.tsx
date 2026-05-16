"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CarouselSlide = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  cta: string;
  gradientFrom: string;
  gradientTo: string;
  href: string;
};

type ElectronicsCarouselProps = {
  slides: CarouselSlide[];
  autoPlayInterval?: number;
};

function CarouselCard({ slide }: { slide: CarouselSlide }) {
  return (
    <div className="h-[320px] rounded-3xl border border-black/10 bg-white overflow-hidden">
      <div className="grid h-full items-center lg:grid-cols-[1.05fr_0.95fr] min-h-0">
        <div
          className="flex h-full flex-col justify-center px-5 py-7 text-white sm:px-10 sm:py-10 min-h-0"
          style={{
            backgroundImage: `linear-gradient(to bottom right, ${slide.gradientFrom}, ${slide.gradientTo})`,
          }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            {slide.eyebrow}
          </p>
          <h1 className="max-w-md text-3xl font-extrabold leading-tight sm:text-5xl">
            {slide.title}
          </h1>
          <p className="mt-3 max-w-md text-sm text-white/90 sm:text-base">
            {slide.description}
          </p>
          <div className="mt-6">
            <Link
              href={slide.href}
              className="inline-flex items-center gap-2 rounded-md bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black/85"
            >
              {slide.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="relative flex h-full items-center justify-center bg-white px-3 py-5 sm:px-6 min-h-0 overflow-visible">
          <Image
            src={slide.image}
            alt={slide.title}
            width={680}
            height={520}
            className="h-auto max-h-full w-full max-w-[500px] object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default function ElectronicsCarousel({
  slides,
}: ElectronicsCarouselProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3 xl:gap-5">
      {slides.map((slide) => (
        <CarouselCard key={slide.title} slide={slide} />
      ))}
    </div>
  );
}
