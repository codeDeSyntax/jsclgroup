"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ElectronicsCategoryStrip from "./electronics-category-strip";
import { electronicsSlides } from "./electronics-data";
import HeroMeshPattern from "../hero-mesh-pattern";

function FeaturedShowcase() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<number | null>(null);

  const slides = electronicsSlides;

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const jumpToSlide = (targetIndex: number) => {
    setDirection(targetIndex > index ? 1 : -1);
    setIndex(targetIndex);
  };

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [index]);

  const slide = slides[index];

  return (
    <div 
      className="relative w-full h-[320px] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-jcl-primary to-slate-950 text-white shadow-xl shadow-jcl-primary/10 border border-slate-800/80 group"
      onMouseEnter={() => {
        if (timerRef.current) window.clearInterval(timerRef.current);
      }}
      onMouseLeave={() => {
        if (timerRef.current) window.clearInterval(timerRef.current);
        timerRef.current = window.setInterval(() => {
          nextSlide();
        }, 5000);
      }}
    >
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-jcl-accent/15 blur-3xl transition-all duration-700 group-hover:bg-jcl-accent/25" />
      <div className="absolute -left-12 -bottom-12 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl" />

      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={index}
          initial={{ x: direction * 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -direction * 50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          className="absolute inset-0 grid grid-cols-[1.25fr_0.75fr] items-center px-6 sm:px-8 py-5"
        >
          <div className="flex flex-col justify-center min-w-0 pr-2">
            <span className="inline-flex w-fit items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-jcl-accent bg-jcl-accent/10 px-2.5 py-0.5 rounded-full mb-3 shadow-sm border border-jcl-accent/20">
              <Sparkles className="h-2.5 w-2.5" />
              {slide.eyebrow}
            </span>
            <h3 className="text-xl font-extrabold tracking-tight sm:text-2xl md:text-2xl leading-tight text-white line-clamp-2">
              {slide.title}
            </h3>
            <p className="text-xs text-slate-300/90 leading-relaxed mt-2.5 line-clamp-3 font-normal max-w-sm">
              {slide.description}
            </p>
            <div className="mt-4">
              <Link
                href="/products/electronics"
                className="inline-flex items-center gap-1.5 bg-white text-slate-900 hover:bg-jcl-accent hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 shadow-sm hover:scale-105 active:scale-95"
              >
                {slide.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="relative flex items-center justify-center h-full w-full">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex items-center justify-center w-full aspect-square"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                width={280}
                height={280}
                className="h-full max-h-[160px] w-full object-contain filter drop-shadow-[0_12px_24px_rgba(255,255,255,0.15)]"
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-6 sm:left-8 flex gap-1.5 z-20">
        {slides.map((_, dotIdx) => (
          <button
            key={dotIdx}
            type="button"
            onClick={() => jumpToSlide(dotIdx)}
            aria-label={`Jump to slide ${dotIdx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              dotIdx === index ? "w-4 bg-jcl-accent" : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ElectronicsHero({
  categories,
  availableCategories,
  onSelectCategory,
  activeCategory = "all",
}: {
  categories?: string[];
  availableCategories?: string[];
  onSelectCategory?: (value: string) => void;
  activeCategory?: string;
}) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchTerm.trim()
      ? `?search=${encodeURIComponent(searchTerm.trim())}`
      : "";
    router.push(`/products/electronics${query}`);
  };

  return (
    <section className="bg-jcl-white pb-6 pt-[70px] relative overflow-hidden">
      <HeroMeshPattern
        className="absolute inset-0 opacity-100 pointer-events-none"
        colorClass="text-slate-100"
      />
      
      <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
        <ElectronicsCategoryStrip
          categories={categories}
          onSelect={onSelectCategory}
          availableCategories={availableCategories}
          activeCategory={activeCategory}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-jcl-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-jcl-accent border border-jcl-accent/20">
                <span className="h-1.5 w-1.5 rounded-full bg-jcl-accent animate-pulse" />
                JCL Royal Group
              </span>
              
              <h2 className="mt-3.5 text-3xl sm:text-4xl md:text-5xl font-black leading-[1.08] tracking-[-0.03em] text-slate-900">
                Latest Gadget &<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-jcl-accent to-orange-500">
                  Home Appliances
                </span>
              </h2>
              
              <p className="mt-4 max-w-lg text-sm text-slate-500 leading-relaxed font-normal">
                Discover our carefully curated collection of cutting-edge
                technology products and smart home solutions. Crafted for premium performance.
              </p>
            </div>

            <form
              onSubmit={handleSearchSubmit}
              className="mt-2 relative flex w-full flex-col sm:flex-row items-stretch gap-2 p-1.5 rounded-2xl sm:rounded-full bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] focus-within:border-jcl-accent/40 focus-within:shadow-[0_10px_35px_rgba(248,85,6,0.05)] transition-all duration-300"
            >
              <div className="relative flex-1 min-w-0">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search gadgets and appliances..."
                  className="h-11 w-full bg-transparent pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none border-none focus:ring-0"
                />
              </div>

              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl sm:rounded-full bg-jcl-accent text-white px-6 text-sm font-semibold transition hover:bg-jcl-accent/90 shadow-md shadow-jcl-accent/25 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-300 shrink-0"
              >
                Search
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          <div className="lg:col-span-6 w-full">
            <FeaturedShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
