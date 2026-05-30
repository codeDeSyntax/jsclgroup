"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ElectronicsHeroSection from "@/components/electronics/electronics-hero";
import ElectronicsCta from "@/components/electronics/electronics-cta";
import ProductCardSkeleton from "@/components/electronics/product-card-skeleton";
import { ArrowRight, ChevronRight, Filter, Heart, Star } from "lucide-react";
import AddToCart from "@/components/cart/add-to-cart";
import { BACKEND_URL } from "@/lib/auth";
import { gadgetsImages } from "@/lib/images";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BannerSlide = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  cta: string;
};

const slides: BannerSlide[] = [
  {
    eyebrow: "Sale",
    title: "Discover Apple iPhone 17 Pro Now",
    description:
      "Cutting-edge performance, an immersive display, and premium design in one sleek device.",
    image: gadgetsImages.hero[0]?.secure_url || "",
    cta: "Learn more",
  },
  {
    eyebrow: "Audio",
    title: "Sound that feels bigger than the room",
    description:
      "Explore headphones, speakers, and wireless audio designed for daily use and deep focus.",
    image:
      gadgetsImages.featured[0]?.secure_url ||
      gadgetsImages.featured[1]?.secure_url ||
      "",
    cta: "Shop audio",
  },
  {
    eyebrow: "Smart Home",
    title: "Build a smarter home with the latest gear",
    description:
      "From compact speakers to home essentials, discover practical tech for every room.",
    image:
      gadgetsImages.appliances[0]?.secure_url ||
      gadgetsImages.appliances[1]?.secure_url ||
      "",
    cta: "Browse tech",
  },
];

export default function ElectronicsPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const searchTerm = searchParams.get("search")?.trim().toLowerCase() || "";
  const selectedCategory =
    searchParams.get("category")?.trim().toLowerCase() || "all";

  const categoryOptions = useMemo(() => {
    console.log("Products:", products);
    const uniqueCategories = Array.from(
      new Set(
        (products || [])
          .map((p) => p.category)
          .filter(Boolean)
          .map((cat) => String(cat).toLowerCase().trim()),
      ),
    ).sort();
    console.log("Unique categories:", uniqueCategories);
    return [
      { label: "All categories", value: "all" },
      ...uniqueCategories.map((cat) => ({
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
        value: cat,
      })),
    ];
  }, [products]);

  const heroCategories = useMemo(() => {
    const unique = Array.from(
      new Set(
        (products || [])
          .map((p) => p.category)
          .filter(Boolean)
          .map((c) => String(c).trim()),
      ),
    );

    const humanize = (s: string) =>
      s
        .split(/[-_\s]+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

    return unique.map((u) => humanize(u));
  }, [products]);

  const availableCategorySlugs = useMemo(() => {
    return Array.from(
      new Set(
        (products || [])
          .map((p) =>
            String(p.category || "")
              .toLowerCase()
              .trim(),
          )
          .filter(Boolean),
      ),
    );
  }, [products]);

  const updateCategory = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") params.delete("category");
    else params.set("category", value);

    const query = params.toString();
    router.replace(`/products/electronics${query ? `?${query}` : ""}`);
  };

  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BACKEND_URL}/public/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        if (mounted) setProducts(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error(err);
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    void fetchProducts();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredProducts = (products || []).filter((product) => {
    const matchesSearch = searchTerm
      ? [product.name, product.description, product.summary]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(searchTerm))
      : true;

    const matchesCategory =
      selectedCategory === "all"
        ? true
        : String(product.category || "")
            .toLowerCase()
            .trim() === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex min-h-screen flex-col bg-jcl-white text-black">
      <Header variant="default" />
      {loading && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-jcl-primary">
          <div className="flex flex-col items-center justify-center">
            <img
              src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1779269670/tonefologo_bhbe1s.png"
              alt="Tonefo"
              className="h-28 w-28 object-contain"
            />
          </div>
        </div>
      )}
      <main className="flex-1 pt-16 sm:pt-14">
        <ElectronicsHeroSection
          categories={heroCategories}
          availableCategories={availableCategorySlugs}
          onSelectCategory={updateCategory}
        />

        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold">Popular Electronics</h2>
              <p className="mt-1 text-sm text-black/55">
                {searchTerm || selectedCategory !== "all"
                  ? "Showing filtered results"
                  : "Browse the latest electronics"}
              </p>
            </div>

            <div className="flex w-full sm:w-auto sm:justify-end overflow-hidden">
              <div className="w-full sm:w-[220px]">
                <Select value={selectedCategory} onValueChange={updateCategory}>
                  <SelectTrigger className="h-11 w-full rounded-full border border-black/10 bg-white px-4 text-sm text-black focus:ring-2 focus:ring-jcl-black/10">
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent
                    side="bottom"
                    align="end"
                    sideOffset={8}
                    className="w-[220px] overflow-hidden"
                    position="popper"
                  >
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {loading && (
            <div className="mx-auto grid w-full  grid-cols-1 gap-3 md:grid-cols-3 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={`skeleton-${index}`} />
              ))}
            </div>
          )}

          {!loading && filteredProducts.length > 0 && (
            <div className="mx-auto grid w-full  grid-cols-2 gap-3 md:grid-cols-3 sm:gap-3 lg:grid-cols-3 ">
              {filteredProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  aria-label={`View details for ${p.name}`}
                  className="group rounded-xl border border-black/10 bg-white p-2 transition hover:border-jcl-accent/50 sm:p-2.5"
                >
                  <div className="flex flex-col gap-3 md:grid md:grid-cols-[140px_1fr] md:items-start">
                    <div className="relative flex h-22 items-center justify-center overflow-hidden rounded-lg bg-black/[0.02] p-1.5 sm:h-32 sm:p-2 md:h-full md:min-h-[152px]">
                      {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full object-fit transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="flex h-full flex-col">
                      <p className="line-clamp-2 min-h-[2rem] text-[12px] font-medium leading-4 text-black/80 sm:text-[13px] sm:leading-5">
                        {p.name}
                      </p>

                      {p.category ? (
                        <span className="mt-1 inline-flex w-fit rounded-full bg-black/[0.06] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-black/60">
                          {String(p.category).trim().replace(/[-_]+/g, " ")}
                        </span>
                      ) : null}

                      <p className="mt-1 line-clamp-2 min-h-[2rem] text-[11px] leading-4 text-black/55 sm:min-h-[2.25rem] sm:text-xs">
                        {p.description || p.summary || ""}
                      </p>

                      {p.tag ? (
                        <span className="mt-2 inline-flex w-fit rounded-md bg-jcl-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-jcl-accent">
                          {p.tag}
                        </span>
                      ) : null}

                      <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                        <div>
                          <p className="text-base font-black tracking-[-0.02em] text-jcl-primary">
                            {p.price
                              ? typeof p.price === "number"
                                ? `₵${p.price.toFixed(2)}`
                                : String(p.price).trim().startsWith("₵")
                                  ? String(p.price).trim()
                                  : String(p.price).trim().startsWith("GHS")
                                    ? String(p.price)
                                        .trim()
                                        .replace(/^GHS\s*/, "₵")
                                    : String(p.price).trim().startsWith("$")
                                      ? String(p.price)
                                          .trim()
                                          .replace(/^\$/, "₵")
                                      : `₵${String(p.price).trim()}`
                              : "—"}
                          </p>
                        </div>
                        <AddToCart
                          product={{
                            id: p.id,
                            name: p.name,
                            price: p.price,
                            image: p.image,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && products && filteredProducts.length === 0 && (
            <div className="rounded-3xl bg-black/[0.04] px-6 py-10 text-center text-sm text-black/65">
              No electronics matched your search or filter.
            </div>
          )}
        </section>

        <ElectronicsCta />
      </main>
      <Footer />
    </div>
  );
}
