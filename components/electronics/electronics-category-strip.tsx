"use client";

import { useEffect, useRef, useState } from "react";

import { electronicsCategoryTabs } from "./electronics-data";

export default function ElectronicsCategoryStrip() {
  const stripRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (!stripRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = stripRef.current;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
  };

  const scrollByAmount = (direction: "left" | "right") => {
    if (!stripRef.current) return;

    stripRef.current.scrollBy({
      left: direction === "left" ? -220 : 220,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    updateScrollState();

    const node = stripRef.current;
    if (!node) return;

    node.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      node.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-[56px] z-40 border-b border-black/10 bg-jcl-white/95 backdrop-blur">
      <div className="relative mx-auto w-full">
      <button
        type="button"
        aria-label="Scroll categories left"
        onClick={() => scrollByAmount("left")}
        disabled={!canScrollLeft}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-black/10 bg-white/90 px-2 py-1 text-base leading-none text-black/65 shadow-sm backdrop-blur transition hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
      >
        ‹
      </button>

      <div
        ref={stripRef}
        className="flex items-center gap-2 overflow-x-auto bg-jcl-white px-10 py-2 text-sm text-black/70 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {electronicsCategoryTabs.map((item, index) => (
          <button
            key={item}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 transition ${
              index === 0
                ? "bg-jcl-accent text-white"
                : "hover:bg-black/5 hover:text-black"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <button
        type="button"
        aria-label="Scroll categories right"
        onClick={() => scrollByAmount("right")}
        disabled={!canScrollRight}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-black/10 bg-white/90 px-2 py-1 text-base leading-none text-black/65 shadow-sm backdrop-blur transition hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
      >
        ›
      </button>
      </div>
    </div>
  );
}
