"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, Sparkles, Zap } from "lucide-react";
import { gadgetsImages, heroImages } from "@/lib/images";

type ShowcaseCard = {
  href: string;
  icon: typeof Home;
  label: string;
  title: string;
  image: string;
  alt: string;
};

export default function FloatingShowcaseCards() {
  const [activeIndex, setActiveIndex] = useState(0);

  const showcaseCards: ShowcaseCard[] = [
    {
      href: "/products/electronics",
      icon: Home,
      label: "Shop",
      title: "Home Appliances",
      image:
        heroImages.gadgets[0]?.secure_url ||
        gadgetsImages.featured[0]?.secure_url ||
        "",
      alt:
        heroImages.gadgets[0]?.alt || gadgetsImages.featured[0]?.alt || "Shop",
    },
    {
      href: "/services",
      icon: Sparkles,
      label: "Services",
      title: "Explore Support",
      image:
        heroImages.gadgets[1]?.secure_url ||
        gadgetsImages.featured[1]?.secure_url ||
        "",
      alt: "Services",
    },
    {
      href: "/gadgets",
      icon: Zap,
      label: "Electronics",
      title: "Smart Gadgets",
      image:
        heroImages.gadgets[0]?.secure_url ||
        gadgetsImages.featured[0]?.secure_url ||
        "",
      alt:
        heroImages.gadgets[0]?.alt ||
        gadgetsImages.featured[0]?.alt ||
        "Electronics",
    },
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex(
        (currentIndex) => (currentIndex + 1) % showcaseCards.length,
      );
    }, 3800);

    return () => window.clearInterval(timer);
  }, [showcaseCards.length]);

  return (
    <div className="mt-8 sm:mt-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="md:hidden">
        <div className="mx-auto w-[82vw] max-w-[320px] overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              width: `${showcaseCards.length * 100}%`,
              transform: `translateX(-${(activeIndex * 100) / showcaseCards.length}%)`,
            }}
          >
            {showcaseCards.map((card) => {
              const CardIcon = card.icon;

              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group relative aspect-square w-full shrink-0 overflow-hidden rounded-full shadow-lg shadow-black/10 ring-1 ring-black/5"
                  style={{ width: `${100 / showcaseCards.length}%` }}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="82vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute left-1/2 bottom-6 w-[78%] -translate-x-1/2 rounded-3xl bg-black/20 px-4 py-3 text-center backdrop-blur-sm sm:bottom-8 sm:w-[74%] sm:px-5 sm:py-4">
                      <div className="mb-2 flex items-center justify-center gap-2">
                        <CardIcon className="h-3 w-3 text-white sm:h-4 sm:w-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-white">
                          {card.label}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold leading-tight text-white sm:text-lg">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {showcaseCards.map((card, index) => (
            <button
              key={card.href}
              type="button"
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-brand-orange"
                  : "w-2.5 bg-white/35"
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${card.label}`}
            />
          ))}
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {showcaseCards.map((card) => {
          const CardIcon = card.icon;

          return (
            <Link
              key={card.href}
              href={card.href}
              className="group relative mx-auto w-full max-w-[320px] aspect-square overflow-hidden rounded-full shadow-lg shadow-black/10 ring-1 ring-black/5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:ring-black/10"
            >
              <div className="relative h-full w-full">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105 sm:group-hover:scale-110"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute left-1/2 bottom-6 w-[78%] -translate-x-1/2 rounded-3xl bg-black/20 px-4 py-3 text-center backdrop-blur-sm sm:bottom-8 sm:w-[74%] sm:px-5 sm:py-4">
                  <div className="mb-2 flex items-center justify-center gap-2">
                    <CardIcon className="h-3 w-3 text-white sm:h-4 sm:w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-white">
                      {card.label}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold leading-tight text-white sm:text-lg">
                    {card.title}
                  </h3>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
