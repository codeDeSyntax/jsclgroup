"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { BACKEND_URL } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";

type Props = {
  product: {
    id: string | number;
    name: string;
    price: number | string;
    image?: string | null;
  };
  quantity?: number;
};

export default function AddToCart({ product, quantity = 1 }: Props) {
  const { addItem } = useCart();

  const priceNum =
    typeof product.price === "number"
      ? product.price
      : Number(String(product.price).replace(/[^\d.]/g, "")) || 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    void (async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/public/products/${product.id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const payload = await res.json();
        const p = payload?.data || payload;
        if (!p) throw new Error("Product not found");
        // Debug: log payload and resolved product shape
        // eslint-disable-next-line no-console
        console.debug("AddToCart fetched payload:", { payload, resolved: p });
        // Try several common paths for price
        const candidate =
          p.price ??
          p?.data?.price ??
          (Array.isArray(p) ? p[0]?.price : undefined) ??
          payload.price;
        // Debug: log candidate before normalization
        // eslint-disable-next-line no-console
        console.debug("AddToCart price candidate:", { candidate });
        const realPrice =
          typeof candidate === "number"
            ? candidate
            : Number(String(candidate ?? "").replace(/[^\d.]/g, "")) || 0;
        if (!realPrice) {
          // don't add items with missing/zero price
          toast({
            title: "Price unavailable",
            description: "Product price is not available, cannot add to cart",
            variant: "destructive",
          });
          return;
        }
        // Debug: log final numeric price
        // eslint-disable-next-line no-console
        console.debug("AddToCart realPrice:", { realPrice });
        addItem(
          {
            id: String(product.id),
            name: p.name || product.name,
            price: realPrice,
            image: product.image || null,
          },
          quantity,
        );
      } catch (err) {
        toast({
          title: "Could not add to cart",
          description: "Failed to fetch latest product price",
          variant: "destructive",
        });
      }
    })();
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      aria-label={`Add ${product.name} to cart`}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-jcl-black text-white transition hover:opacity-90"
    >
      <ShoppingCart className="h-3.5 w-3.5" />
    </button>
  );
}
