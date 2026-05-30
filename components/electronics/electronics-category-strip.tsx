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
}: {
  categories?: string[] | CategoryItem[];
  onSelect?: (value: string) => void;
  availableCategories?: string[] | Set<string>;
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

  return (
    <>
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <div className="fixed inset-x-0 top-[56px] z-40 border-b border-white/10 bg-[#a2e2fc] px-4 py-1 backdrop-blur sm:hidden">
        <DrawerTrigger asChild>
          <button
            type="button"
            className="flex h-8 w-full items-center justify-between rounded-full bg-white/20 px-4 text-sm font-semibold text-jcl-primary transition hover:bg-white/30"
            aria-label="Open category drawer"
          >
            <span className="inline-flex items-center gap-2">
              <ListFilter className="h-4 w-4" />
              Categories
            </span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </DrawerTrigger>
      </div>

      <DrawerContent className="max-h-[82vh] border-none bg-jcl-primary text-white">
        <DrawerHeader className="px-5 pb-3 text-left">
          <DrawerTitle className="text-white">Categories</DrawerTitle>
          <DrawerDescription className="text-white/55">
            Choose a category to filter products.
          </DrawerDescription>
        </DrawerHeader>

        <div className="max-h-[58vh] overflow-y-auto px-4 pb-5">
          <button
            type="button"
            onClick={() => handleSelect("all")}
            className="mb-3 inline-flex items-center gap-2 rounded-full bg-jcl-accent px-4 py-2 text-sm font-semibold text-white"
          >
            <span>All</span>
            <span className="text-xs text-white/70">Reset</span>
          </button>

          <div className="flex flex-wrap gap-2">
            {sortedItems.map((item) => {
              const isAvailable = isCategoryAvailable(item.value);

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => (isAvailable ? handleSelect(item.value) : null)}
                  disabled={!isAvailable}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${
                    isAvailable
                      ? "border-white/15 bg-white/10 text-white hover:border-jcl-accent/60 hover:bg-white/15 hover:text-jcl-accent"
                      : "cursor-not-allowed border-white/10 bg-white/[0.04] text-white/35"
                  }`}
                >
                  <span className="inline-flex h-2.5 w-2.5 items-center justify-center">
                    {isAvailable ? (
                      <span className="h-2 w-2 rounded-full bg-jcl-accent shadow-[0_0_0_3px_rgba(248,85,6,0.18)]" />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                    )}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </DrawerContent>
    </Drawer>

    <div className="fixed inset-x-0 top-[56px] z-40 hidden border-b border-white/10 bg-[#a2e2fc] backdrop-blur sm:block">
      <div className="relative mx-auto w-full">
        <button
          type="button"
          aria-label="Scroll categories left"
          onClick={() => scrollByAmount("left")}
          disabled={!canScrollLeft}
          className="absolute left-2 top-1/2 z-10 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/75 shadow-sm backdrop-blur transition hover:bg-white/15 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div
          ref={stripRef}
          className="flex items-center gap-2 overflow-x-auto px-10 py-1 text-sm text-jcl-primary [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <button
            key="all"
            onClick={() => onSelect?.("all")}
            className="whitespace-nowrap rounded-full bg-jcl-accent px-3 py-1.5 font-semibold text-jcl-primary shadow-sm transition hover:bg-jcl-accent/90"
            type="button"
          >
            All
          </button>
          {sortedItems.map((item, index) => {
            const isAvailable = isCategoryAvailable(item.value);

            return (
              <Fragment key={item.value}>
                {index > 0 ? (
                  <span
                    className="h-4 w-px shrink-0 rounded-full bg-white/20"
                    aria-hidden
                  />
                ) : null}
              <button
                onClick={() => onSelect?.(item.value)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 transition font-thin ${
                  isAvailable
                    ? "cursor-pointer border-transparent bg-transparent text-jcl-primary hover:text-jcl-accent"
                    : "cursor-not-allowed border-white/10 bg-white/[0.04] text-jcl-primary"
                }`}
                type="button"
                aria-pressed={isAvailable}
              >
                {/* small availability dot */}
                <span className="inline-flex h-2 w-2 items-center justify-center">
                  {isAvailable ? (
                    <span
                      className="h-2 w-2 rounded-full bg-jcl-accent shadow-[0_0_0_3px_rgba(248,85,6,0.18)]"
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
              </Fragment>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Scroll categories right"
          onClick={() => scrollByAmount("right")}
          disabled={!canScrollRight}
          className="absolute right-2 top-1/2 z-10 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/75 shadow-sm backdrop-blur transition hover:bg-white/15 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
    </>
  );
}
