"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, X } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useCart } from "@/hooks/use-cart";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { contactInfo } from "@/lib/contact";

export default function CartPage() {
  const {
    items,
    totalCount,
    totalPrice,
    updateQuantity,
    removeItem,
    clear,
    buildWhatsAppMessage,
  } = useCart();

  // Use centralized contact phone from Redux; fall back to contactInfo.phone
  const contactPhone =
    useSelector((state: RootState) => state.hero.contactPhone) ||
    contactInfo.phone;
  const [showConfirm, setShowConfirm] = useState(false);

  const handlePurchase = () => {
    if (items.length === 0) return;
    setShowConfirm(true);
  };

  const confirmPurchase = () => {
    const message = buildWhatsAppMessage();
    const normalized = contactPhone.replace(/\D/g, "");
    const url = `https://wa.me/${normalized}?text=${encodeURIComponent(
      message,
    )}`;
    window.open(url, "_blank");
    setShowConfirm(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-jcl-white text-black">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 lg:px-8 md:origin-top-left md:transform md:scale-90">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-black/60 hover:text-black"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Link>

        <h1 className="mb-8 text-3xl font-black tracking-[-0.02em]">
          YOUR CART
        </h1>

        {items.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div>
              <p className="text-center text-black/60">Your cart is empty.</p>
              <Link
                href="/products"
                className="mt-4 inline-block rounded-lg bg-jcl-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* Cart items */}
            <div className="divide-y divide-black/10">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex gap-4 py-6 first:pt-0 last:pb-0"
                >
                  {/* Image */}
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-black/[0.02]">
                    {it.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={it.image}
                        alt={it.name}
                        className="h-full w-full object-contain"
                      />
                    ) : null}
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col">
                    <p className="font-semibold text-black/90">{it.name}</p>
                    <p className="mt-0.5 text-xs text-black/50">SKU: {it.id}</p>
                    {/* Quantity controls */}
                    <div className="mt-auto flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(it.id, Math.max(1, it.quantity - 1))
                        }
                        className="h-7 w-7 rounded border border-black/10 bg-white text-sm font-semibold hover:bg-black/5"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">
                        {it.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(it.id, it.quantity + 1)}
                        className="h-7 w-7 rounded border border-black/10 bg-white text-sm font-semibold hover:bg-black/5"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price and remove */}
                  <div className="flex flex-col items-end">
                    <p className="font-black text-jcl-primary">
                      ₵{it.price.toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(it.id)}
                      className="mt-auto rounded-full p-1 text-black/40 hover:bg-black/5 hover:text-black/60"
                      aria-label="Remove item"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals sidebar */}
            <aside className="relative">
              <div className="sticky top-28 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wide text-black/60">
                  CART TOTALS
                </h3>

                <div className="space-y-3 border-t border-black/10 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-black/60">
                      Shipping (2-5 Business Days)
                    </span>
                    <span className="font-semibold">Free</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-black/60">
                      Tax (estimated for Ghana)
                    </span>
                    <span className="font-semibold">₵0.00</span>
                  </div>
                </div>

                <div className="border-t border-black/10 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-black/60">Subtotal</span>
                    <span className="font-semibold">
                      ₵{totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-black/10 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-black/60">
                      Total
                    </span>
                    <span className="text-2xl font-black text-jcl-primary">
                      ₵{totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handlePurchase}
                  className="mt-6 w-full rounded-md bg-jcl-black py-3 text-sm font-bold text-white transition hover:opacity-90"
                >
                  PROCEED TO CHECKOUT
                </button>

                <Link
                  href="/products"
                  className="flex justify-center rounded-md border border-black/10 py-3 text-sm font-semibold text-black transition hover:bg-black/5"
                >
                  ← CONTINUE SHOPPING
                </Link>
              </div>
            </aside>
          </div>
        )}

        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-white p-6">
              <h3 className="mb-2 text-lg font-bold">Confirm purchase</h3>
              <p className="mb-4 text-sm text-black/70">
                You are about to send your order via WhatsApp. Continue?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={confirmPurchase}
                  className="flex-1 rounded-xl bg-jcl-primary px-4 py-2 text-white"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="rounded-xl border border-black/15 px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
