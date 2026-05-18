"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ElectronicsHeroSection from "@/components/electronics/electronics-hero";
import ElectronicsCta from "@/components/electronics/electronics-cta";
import ProductCardSkeleton from "@/components/electronics/product-card-skeleton";
import { ArrowRight, ChevronRight, Filter, Heart, Star } from "lucide-react";
import AddToCart from "@/components/cart/add-to-cart";
import { BACKEND_URL } from "@/lib/auth";
import { gadgetsImages } from "@/lib/images";

type BannerSlide = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  cta: string;
};

const categoryTabs = [
  "Sale",
  "Smartphones",
  "Tablets",
  "Smartwatches",
  "Headphones and headsets",
  "Smart Speaker",
  "TV",
  "Game Consoles",
  "Hair dryers",
  "Stylers",
  "Vacuum Cleaners",
  "Washing",
];

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

export default function ElectronicsPage() {
  const [products, setProducts] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${BACKEND_URL}/public/products?category=electronics`,
        );
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
  return (
    <div className="flex min-h-screen flex-col bg-jcl-white text-black">
      <Header variant="default" />
      <main className="flex-1 pt-16 sm:pt-14">
        <ElectronicsHeroSection />

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">Popular Electronics</h2>
            <Link
              href="/products"
              className="text-sm font-medium text-jcl-black/70"
            >
              View all <ChevronRight className="inline-block" />
            </Link>
          </div>

          {loading && (
            <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={`skeleton-${index}`} />
              ))}
            </div>
          )}

          {!loading && products && products.length > 0 && (
            <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  aria-label={`View details for ${p.name}`}
                  className="group rounded-xl border border-black/10 bg-white p-2 transition hover:border-jcl-accent/50 sm:p-2.5"
                >
                  <div className="flex flex-col gap-3 md:grid md:grid-cols-[112px_1fr] md:items-start">
                    <div className="relative flex h-24 items-center justify-center overflow-hidden rounded-lg bg-black/[0.02] p-1.5 sm:h-32 sm:p-2 md:h-full md:min-h-[152px]">
                      {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
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
                                ? `$${p.price}`
                                : p.price
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
        </section>

        <ElectronicsCta />
      </main>
      <Footer />
    </div>
  );
}
