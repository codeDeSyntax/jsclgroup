"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ElectronicsCategoryStrip from "./electronics-category-strip";
import { electronicsSlides, electronicsBestSellers } from "./electronics-data";
import HeroBackgroundArt from "../hero-background-art";
import HeroMeshPattern from "../hero-mesh-pattern";

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
          : {
              backgroundImage: `linear-gradient(to bottom right, ${from}, ${to})`,
            }
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

        <div className="flex items-center justify-center px-3 pb-3 sm:px-8 sm:pb-8 lg:px-10 lg:py-10 min-h-[280px] sm:min-h-0">
          <Image
            src={slide.image}
            alt={slide.title}
            width={680}
            height={520}
            className="h-auto max-h-none w-full sm:max-h-40 sm:max-w-[320px] lg:max-h-full lg:max-w-[500px] object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

function RightSlidingPair({ images }: { images: string[] }) {
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(1);
  const slotToggle = useRef(0); // 0 -> replace top next, 1 -> replace bottom next
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // auto-advance every 3.2s
    timerRef.current = window.setInterval(() => {
      const nextIndex = (Math.max(topIndex, bottomIndex) + 1) % images.length;
      if (slotToggle.current === 0) {
        setTopIndex(nextIndex);
      } else {
        setBottomIndex(nextIndex);
      }
      slotToggle.current = 1 - slotToggle.current;
    }, 3200);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [topIndex, bottomIndex, images.length]);

  // allow hover to pause
  const pauseRef = useRef(false);

  const renderSlot = (index: number) => (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={index}
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Image
          src={images[index]}
          alt={`hero-${index}`}
          width={800}
          height={600}
          className="h-full w-full object-cover"
        />
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div
      className="flex w-full flex-col  gap-4 sm:flex-row"
      onMouseEnter={() => {
        pauseRef.current = true;
        if (timerRef.current) window.clearInterval(timerRef.current);
      }}
      onMouseLeave={() => {
        pauseRef.current = false;
        // restart timer
        if (timerRef.current) window.clearInterval(timerRef.current);
        timerRef.current = window.setInterval(() => {
          const nextIndex =
            (Math.max(topIndex, bottomIndex) + 1) % images.length;
          if (slotToggle.current === 0) setTopIndex(nextIndex);
          else setBottomIndex(nextIndex);
          slotToggle.current = 1 - slotToggle.current;
        }, 3200);
      }}
    >
      <div className="relative w-full h-[360px] overflow-hidden rounded-2xl bg-transparent sm:w-1/2 sm:aspect-auto sm:h-[320px]">
        {renderSlot(topIndex)}
      </div>
      <div className="relative w-full h-[360px] overflow-hidden rounded-2xl bg-transparent sm:w-1/2 sm:aspect-auto sm:h-[320px]">
        {renderSlot(bottomIndex)}
      </div>
    </div>
  );
}

export default function ElectronicsHero({
  categories,
  availableCategories,
  onSelectCategory,
}: {
  categories?: string[];
  availableCategories?: string[];
  onSelectCategory?: (value: string) => void;
}) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const images = [
    ...electronicsSlides.map((s) => s.image),
    ...electronicsBestSellers.map((p) => p.image),
  ].filter(Boolean);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchTerm.trim()
      ? `?search=${encodeURIComponent(searchTerm.trim())}`
      : "";
    router.push(`/products/electronics${query}`);
  };

  return (
    <section className="bg-jcl-white pb-6 pt-[70px] relative">
      {/* <HeroBackgroundArt className="absolute inset-0 opacity-100" colorClass="text-jcl-primary/5" /> */}
      <HeroMeshPattern
        className="absolute inset-0 opacity-100"
        colorClass="text-jcl-primary"
      />
      <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <ElectronicsCategoryStrip
          categories={categories}
          onSelect={onSelectCategory}
          // pass availability down to strip so it can indicate which tags have items
          // `availableCategories` contains lowercased slugs from the products list
          availableCategories={availableCategories}
        />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: copy */}
          <div className="lg:col-span-6">
            <p className="text-jcl-accent font-semibold text-sm sm:text-base">
              Welcome to JCL Royal Group Limited
            </p>
            <h2 className="mt-2 max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight text-slate-900">
              Latest Gadget &
              <br />
              Home Appliances
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-slate-600">
              Discover our carefully curated collection of cutting-edge
              technology products and smart home solutions.
            </p>

            <form
              onSubmit={handleSearchSubmit}
              className="mt-6 rounded-3xl border border-black/5 bg-white p-2 shadow-[0_18px_50px_rgba(7,13,75,0.06)] sm:rounded-full"
            >
              <div className="flex w-full items-center justify-between gap-4 ">
                <label className="relative flex-1 block min-w-0">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35" />
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search gadgets and appliances"
                    className="h-12 w-full rounded-2xl border-0 bg-black/[0.03] px-11 text-sm text-black placeholder:text-#975252/40 outline-none ring-0 transition focus:bg-black/[0.02] focus:ring-2 focus:ring-jcl-black/10 sm:rounded-full sm:bg-transparent"
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-jcl-accent px-5 text-sm font-semibold text-white shadow-md transition hover:bg-jcl-accent/90 sm:rounded-full"
                >
                  Search
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: two sliding image cards */}
          <div className="lg:col-span-6">
            <RightSlidingPair images={images} />
          </div>
        </div>
      </div>
    </section>
  );
}
