"use client";

import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "@/lib/auth";

import { electronicsCategoryTabs } from "./electronics-data";

type CategoryItem = { id: string; name: string; slug: string };

export default function ElectronicsCategoryStrip({
  categories,
  onSelect,
  availableCategories,
}: {
  categories?: string[] | CategoryItem[];
  onSelect?: (value: string) => void;
  availableCategories?: string[] | Set<string>;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [fetched, setFetched] = useState<CategoryItem[] | null>(null);

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

  useEffect(() => {
    // if caller supplied categories as objects, don't fetch
    if (categories && categories.length && typeof categories[0] !== "string")
      return;

    let mounted = true;
    const fetchCats = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/public/categories`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        if (!mounted) return;
        setFetched(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error(err);
        if (mounted) setFetched([]);
      }
    };

    void fetchCats();
    return () => {
      mounted = false;
    };
  }, [categories]);

  const items: Array<{ label: string; value: string }> = ((): any => {
    const normalize = (value: string) =>
      String(value || "")
        .toLowerCase()
        .trim();

    const merged = new Map<string, { label: string; value: string }>();

    const addItem = (item: { label: string; value: string }) => {
      const key = normalize(item.value);
      if (!key || merged.has(key)) return;
      merged.set(key, item);
    };

    // Prefer the backend category list, but keep any additional categories
    // already surfaced by products so we never hide a real category.
    if (fetched && fetched.length) {
      fetched.forEach((c) => addItem({ label: c.name, value: c.slug }));
    }

    if (categories && categories.length) {
      if (typeof categories[0] === "string") {
        (categories as string[]).forEach((c) =>
          addItem({ label: c, value: c }),
        );
      } else {
        (categories as CategoryItem[]).forEach((c) =>
          addItem({ label: c.name, value: c.slug }),
        );
      }
    }

    if (!merged.size) {
      electronicsCategoryTabs.forEach((c) => addItem({ label: c, value: c }));
    }

    return Array.from(merged.values());
  })();

  const sortedItems = ((): typeof items => {
    if (!items || !items.length) return items;
    const has = (val: string) => {
      const lower = String(val || "")
        .toLowerCase()
        .trim();
      if (!availableCategories) return false;
      return Array.isArray(availableCategories)
        ? (availableCategories as string[]).includes(lower)
        : (availableCategories as Set<string>).has(lower);
    };

    return [...items].sort((a, b) => {
      const aHas = has(a.value) ? 0 : 1;
      const bHas = has(b.value) ? 0 : 1;
      return aHas - bHas;
    });
  })();

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
          className="flex items-center gap-2 overflow-x-auto bg-jcl-white px-10 py-1 text-sm text-black/70 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <button
            key="all"
            onClick={() => onSelect?.("all")}
            className="whitespace-nowrap rounded-full px-2 py-1.5 transition bg-jcl-accent text-white hover:bg-jcl-accent/90"
            type="button"
          >
            All
          </button>
          {sortedItems.map((item) => {
            const lower = String(item.value || "")
              .toLowerCase()
              .trim();
            const isAvailable = availableCategories
              ? Array.isArray(availableCategories)
                ? (availableCategories as string[]).includes(lower)
                : (availableCategories as Set<string>).has(lower)
              : false;

            return (
              <button
                key={item.value}
                onClick={() => onSelect?.(item.value)}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 transition bg-jcl-white text-black/80 hover:bg-black/5 flex items-center gap-2 ${isAvailable ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}
                type="button"
                aria-pressed={isAvailable}
              >
                {/* small availability dot */}
                <span className="inline-flex h-2 w-2 items-center justify-center">
                  {isAvailable ? (
                    <span
                      className="h-2 w-2 rounded-full bg-jcl-accent"
                      aria-hidden
                    />
                  ) : (
                    <span
                      className="h-2 w-2 rounded-full bg-transparent"
                      aria-hidden
                    />
                  )}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
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
