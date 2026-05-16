"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { electronicsBestSellers } from "./electronics-data";

function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-xs text-jcl-black">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={
            index < Math.round(rating)
              ? "h-3.5 w-3.5 fill-jcl-black"
              : "h-3.5 w-3.5 text-black/15"
          }
        />
      ))}
    </div>
  );
}

export default function ElectronicsBestSellers() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = useMemo(
    () =>
      activeCategory === "all"
        ? electronicsBestSellers
        : electronicsBestSellers.filter(
            (product) => product.category === activeCategory,
          ),
    [activeCategory],
  );

  return (
    <section className=" px-4 pb-8 pt-4 sm:px-0 lg:px-0">
      <div className="mx-auto max-w-6xl w-full">
        <div className="mb-5 rounded-2xl bg-jcl-white p-2">
          <h2 className="mb-5 text-2xl font-black tracking-[-0.04em] sm:mb-0 sm:text-3xl">
            Best Sellers
          </h2>
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              { label: "All", value: "all" },
              { label: "Computing", value: "computing" },
              { label: "Mobile", value: "mobile" },
              { label: "Audio", value: "audio" },
              { label: "Wearables", value: "wearables" },
              { label: "Home", value: "home" },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setActiveCategory(item.value)}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition sm:px-4 ${
                  activeCategory === item.value
                    ? "bg-jcl-accent text-white"
                    : "bg-black/5 text-black/65 hover:bg-black/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Link
              key={product.name}
              href={`/products/electronics/${product.slug}`}
              aria-label={`View details for ${product.name}`}
              className="group rounded-xl border border-black/10 bg-white p-2 transition hover:border-jcl-accent/50 sm:p-2.5"
            >
              <div className="flex flex-col gap-3 md:grid md:grid-cols-[112px_1fr] md:items-start">
                <div className="relative flex h-24 items-center justify-center overflow-hidden rounded-lg bg-black/[0.02] p-1.5 sm:h-32 sm:p-2 md:h-full md:min-h-[152px]">
                  <span className="absolute left-2 top-2 rounded-md bg-jcl-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-jcl-accent">
                    {product.tag}
                  </span>

                  <Image
                    src={product.image}
                    alt={product.name}
                    width={150}
                    height={120}
                    className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex h-full flex-col">
                  <p className="line-clamp-2 min-h-[2rem] text-[12px] font-medium leading-4 text-black/80 sm:text-[13px] sm:leading-5">
                    {product.name}
                  </p>

                  <p className="mt-1 line-clamp-2 min-h-[2rem] text-[11px] leading-4 text-black/55 sm:min-h-[2.25rem] sm:text-xs">
                    {product.description}
                  </p>

                  <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                    <div>
                      <p className="text-[11px] text-black/45 line-through">
                        {product.oldPrice}
                      </p>
                      <p className="text-base font-black tracking-[-0.02em] text-jcl-primary">
                        {product.price}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Add ${product.name} to cart`}
                      onClick={(event) => event.preventDefault()}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-jcl-black text-white transition hover:opacity-90"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
