"use client";

import React, { useState } from "react";
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
  initial?: number;
};

export default function AddToCartWithQty({ product, initial = 1 }: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState<number>(initial);

  const priceNum =
    typeof product.price === "number"
      ? product.price
      : Number(String(product.price).replace(/[^\d.]/g, "")) || 0;

  const inc = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setQty((s) => s + 1);
  };
  const dec = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setQty((s) => Math.max(1, s - 1));
  };

  const handleAdd = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    void (async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/public/products/${product.id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const payload = await res.json();
        const p = payload?.data || payload;
        if (!p) throw new Error("Product not found");
        const candidate =
          p.price ??
          p?.data?.price ??
          (Array.isArray(p) ? p[0]?.price : undefined) ??
          payload.price;
        const realPrice =
          typeof candidate === "number"
            ? candidate
            : Number(String(candidate ?? "").replace(/[^\d.]/g, "")) || 0;
        if (!realPrice) {
          toast({
            title: "Price unavailable",
            description: "Product price is not available, cannot add to cart",
            variant: "destructive",
          });
          return;
        }
        addItem(
          {
            id: String(product.id),
            name: p.name || product.name,
            price: realPrice,
            image: product.image || null,
          },
          qty,
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
    <div className="flex items-center gap-2">
      <div className="inline-flex items-center rounded-xl border border-black/15 bg-white px-1">
        <button
          aria-label="Decrease quantity"
          onClick={dec}
          className="h-8 w-8 rounded-md text-sm"
        >
          -
        </button>
        <div className="px-3 text-sm font-semibold">{qty}</div>
        <button
          aria-label="Increase quantity"
          onClick={inc}
          className="h-8 w-8 rounded-md text-sm"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        aria-label={`Add ${product.name} to cart`}
        className="inline-flex items-center gap-2 rounded-xl bg-jcl-black px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90"
      >
        <ShoppingCart className="h-4 w-4" />
        Add to cart
      </button>
    </div>
  );
}
