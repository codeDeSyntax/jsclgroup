"use client";

import React, { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useCart } from "@/hooks/use-cart";

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

  const handlePurchase = () => {
    // show confirmation modal
    if (items.length === 0) return;
    setShowConfirm(true);
  };

  const [showConfirm, setShowConfirm] = useState(false);

  const confirmPurchase = () => {
    const message = buildWhatsAppMessage();
    const phone = "2335578609299";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setShowConfirm(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-jcl-white text-black">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-2xl font-black">Your cart</h1>

        {items.length === 0 ? (
          <div className="rounded-lg border border-black/10 bg-white p-6">
            Your cart is empty.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
            <div>
              <div className="rounded-lg bg-white">
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Your Order</h2>
                    <button
                      className="text-sm text-jcl-accent"
                      onClick={() => clear()}
                    >
                      Clear all
                    </button>
                  </div>
                </div>

                <div className="divide-y">
                  {items.map((it) => (
                    <div
                      key={it.id}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50"
                    >
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-black/[0.03]">
                        {it.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={it.image}
                            alt={it.name}
                            className="h-full w-full object-contain"
                          />
                        ) : null}
                      </div>

                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="truncate text-base font-semibold">
                              {it.name}
                            </p>
                            <p className="mt-1 text-xs text-black/60">
                              SKU: {it.id}
                            </p>
                          </div>
                          <div className="text-sm font-bold text-jcl-primary">
                            ${it.price.toFixed(2)}
                          </div>
                        </div>

                        <div className="mt-3 flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(it.id, it.quantity - 1)
                            }
                            className="h-8 w-8 rounded-md border border-black/10 bg-white"
                          >
                            -
                          </button>
                          <div className="px-3 text-sm font-semibold">
                            {it.quantity}
                          </div>
                          <button
                            onClick={() =>
                              updateQuantity(it.id, it.quantity + 1)
                            }
                            className="h-8 w-8 rounded-md border border-black/10 bg-white"
                          >
                            +
                          </button>

                          <button
                            onClick={() => removeItem(it.id)}
                            className="ml-4 rounded-full bg-black/5 px-2 py-1 text-sm text-jcl-accent"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="relative">
              <div className="sticky top-28 rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>

                <div className="mb-4 flex items-center justify-between text-sm text-black/70">
                  <div>
                    Subtotal ({totalCount} item{totalCount > 1 ? "s" : ""})
                  </div>
                  <div className="font-semibold">${totalPrice.toFixed(2)}</div>
                </div>

                <div className="mb-6 border-t border-black/5 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-black/70">Order total</div>
                    <div className="text-xl font-black text-jcl-primary">
                      ${totalPrice.toFixed(2)}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePurchase}
                  className="mb-2 w-full rounded-xl bg-jcl-primary px-4 py-3 text-white hover:opacity-95"
                >
                  Purchase my items
                </button>
                <button
                  onClick={() => clear()}
                  className="w-full rounded-xl border border-black/10 px-4 py-3"
                >
                  Clear cart
                </button>
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
