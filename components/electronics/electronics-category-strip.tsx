"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ListFilter } from "lucide-react";
import { BACKEND_URL } from "@/lib/auth";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { electronicsCategoryTabs } from "./electronics-data";

type CategoryItem = { id: string; name: string; slug: string };

export default function ElectronicsCategoryStrip({
  categories,
  onSelect,
  availableCategories,
  activeCategory = "all",
}: {
  categories?: string[] | CategoryItem[];
  onSelect?: (value: string) => void;
  availableCategories?: string[] | Set<string>;
  activeCategory?: string;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [fetched, setFetched] = useState<CategoryItem[] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const isCategoryAvailable = (value: string) => {
    const lower = String(value || "")
      .toLowerCase()
      .trim();
    if (value === "all") return true;
    if (!availableCategories) return false;
    return Array.isArray(availableCategories)
      ? (availableCategories as string[]).includes(lower)
      : (availableCategories as Set<string>).has(lower);
  };

  const handleSelect = (value: string) => {
    onSelect?.(value);
    setIsDrawerOpen(false);
  };

  const isAllActive = activeCategory === "all";

  return (
    <>
      {/* Mobile Sticky Top Strip */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <div className="fixed inset-x-0 top-[56px] z-40 border-b border-jcl-accent/10 bg-gradient-to-r from-jcl-accent/[0.08] via-white/90 to-jcl-accent/[0.08] backdrop-blur-lg px-4 py-2 sm:hidden shadow-sm">
          <DrawerTrigger asChild>
            <button
              type="button"
              className="flex h-9 w-full items-center justify-between rounded-full border border-slate-200/50 bg-white/60 px-4 text-xs font-semibold uppercase tracking-wider text-slate-700 transition hover:bg-white shadow-sm"
              aria-label="Open category drawer"
            >
              <span className="inline-flex items-center gap-2">
                <ListFilter className="h-4 w-4 text-jcl-accent" />
                Categories
              </span>
              <span className="inline-flex items-center gap-1 text-slate-400 font-normal">
                {activeCategory === "all" ? "All Categories" : activeCategory}
                <ChevronRight className="h-3 w-3" />
              </span>
            </button>
          </DrawerTrigger>
        </div>

        <DrawerContent className="max-h-[82vh] border-t border-slate-100 bg-white text-slate-800">
          <DrawerHeader className="px-5 pb-3 text-left border-b border-slate-50">
            <DrawerTitle className="text-slate-900 font-bold text-base">Categories</DrawerTitle>
            <DrawerDescription className="text-slate-500 text-xs">
              Choose a category to filter products.
            </DrawerDescription>
          </DrawerHeader>

          <div className="max-h-[58vh] overflow-y-auto px-5 py-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleSelect("all")}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                  isAllActive
                    ? "bg-jcl-accent text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All
              </button>

              {sortedItems.map((item) => {
                const isAvailable = isCategoryAvailable(item.value);
                const isCurrentActive = activeCategory === item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() =>
                      isAvailable ? handleSelect(item.value) : null
                    }
                    disabled={!isAvailable}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                      isAvailable
                        ? isCurrentActive
                          ? "border-jcl-primary bg-jcl-primary text-white shadow-sm"
                          : "border-slate-200 bg-white text-slate-600 hover:border-jcl-accent hover:bg-slate-50"
                        : "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300"
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Desktop categories bar */}
      <div className="fixed inset-x-0 top-[56px] z-40 hidden border-b border-jcl-accent/10 bg-gradient-to-r from-jcl-accent/[0.08] via-white/90 to-jcl-accent/[0.08] backdrop-blur-lg py-2.5 sm:block shadow-sm">
        <div className="relative mx-auto w-full max-w-6xl px-8">
          {/* Scroll Left Button */}
          <button
            type="button"
            aria-label="Scroll categories left"
            onClick={() => scrollByAmount("left")}
            disabled={!canScrollLeft}
            className="absolute left-1 top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Categories Container */}
          <div
            ref={stripRef}
            className="flex items-center gap-2.5 overflow-x-auto py-1 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <button
              key="all"
              onClick={() => onSelect?.("all")}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                isAllActive
                  ? "bg-jcl-accent text-white shadow-md shadow-jcl-accent/20"
                  : "bg-white/60 border border-slate-200/40 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
              type="button"
            >
              All
            </button>

            {sortedItems.map((item) => {
              const isAvailable = isCategoryAvailable(item.value);
              const isCurrentActive = activeCategory === item.value;

              return (
                <button
                  key={item.value}
                  onClick={() => isAvailable && onSelect?.(item.value)}
                  disabled={!isAvailable}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-normal uppercase tracking-wider transition-all duration-200 ${
                    isAvailable
                      ? isCurrentActive
                        ? "bg-jcl-primary text-white shadow-md shadow-jcl-primary/20"
                        : "bg-white/60 border border-slate-200/40 text-black hover:text-jcl-accent hover:bg-white hover:border-jcl-accent/10"
                      : "cursor-not-allowed text-slate-300"
                  }`}
                  type="button"
                  aria-pressed={isCurrentActive}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            aria-label="Scroll categories right"
            onClick={() => scrollByAmount("right")}
            disabled={!canScrollRight}
            className="absolute right-1 top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}
