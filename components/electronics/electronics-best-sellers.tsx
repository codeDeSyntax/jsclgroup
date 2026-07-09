"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { electronicsBestSellers } from "./electronics-data";
import AddToCart from "@/components/cart/add-to-cart";

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
    <section className="px-4 pb-8 pt-4 sm:px-0 lg:px-0">
      <div className="mx-auto max-w-6xl w-full">
        {/* Filter Bar */}
        <div className="mb-6 rounded-2xl bg-white border border-slate-100 p-4 shadow-sm">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
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
            ].map((item) => {
              const isCurrentActive = activeCategory === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => setActiveCategory(item.value)}
                  className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isCurrentActive
                      ? "bg-jcl-accent text-white shadow-md shadow-jcl-accent/20"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Link
              key={product.name}
              href={`/products/electronics/${product.slug}`}
              aria-label={`View details for ${product.name}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-jcl-accent/30 hover:shadow-md"
            >
              <div>
                {/* Image container */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-50 p-4 flex items-center justify-center">
                  {product.tag && (
                    <span className="absolute left-2.5 top-2.5 z-10 rounded-md bg-jcl-accent px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
                      {product.tag}
                    </span>
                  )}
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={180}
                      height={180}
                      className="h-full max-h-[160px] w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400 text-xs">
                      No image
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="mt-3.5 flex flex-col">
                  {product.category && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-jcl-accent/80">
                      {String(product.category).trim().replace(/[-_]+/g, " ")}
                    </span>
                  )}
                  
                  <h3 className="mt-1 line-clamp-1 text-sm font-bold text-slate-900 group-hover:text-jcl-primary transition-colors duration-200">
                    {product.name}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-xs text-slate-500 leading-normal">
                    {product.description || product.summary || ""}
                  </p>

                  {/* Rating */}
                  {product.rating && (
                    <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-amber-500">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      <span>{Number(product.rating).toFixed(1)}</span>
                      <span className="text-slate-400 font-normal">({product.reviews || 0})</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Action Footer */}
              <div className="mt-5 flex items-center justify-between border-t border-slate-50 pt-3">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Price</span>
                  <div className="flex flex-col">
                    {product.oldPrice && (
                      <span className="text-[10px] text-slate-400 line-through leading-none mb-0.5">
                        {product.oldPrice}
                      </span>
                    )}
                    <span className="text-base font-black tracking-tight text-jcl-primary leading-none">
                      {product.price}
                    </span>
                  </div>
                </div>

                <div className="transition-transform duration-200 hover:scale-105 active:scale-95">
                  <AddToCart
                    product={{
                      id: product.slug,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
