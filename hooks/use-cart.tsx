"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "@/hooks/use-toast";
import { BACKEND_URL } from "@/lib/auth";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string | null;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clear: () => void;
  totalCount: number;
  totalPrice: number;
  buildWhatsAppMessage: () => string;
};

const CART_KEY = "jcl_cart_v1";

const CartContext = createContext<CartContextType | undefined>(undefined);

function parseStored(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // hydrate from localStorage
    let normalized: CartItem[] = [];
    try {
      const stored = parseStored();
      // normalize stored items to ensure price is a number
      normalized = stored.map((it) => ({
        ...it,
        price:
          typeof it.price === "number"
            ? it.price
            : Number(String(it.price).replace(/[^\d.]/g, "")) || 0,
        quantity:
          typeof it.quantity === "number"
            ? it.quantity
            : Number(it.quantity) || 1,
      }));
      setItems(normalized);
    } catch (err) {
      setItems([]);
    }
    // If any item has price 0, attempt to refresh its price from backend
    const zeros = normalized.filter((i) => !i.price);
    if (zeros.length > 0) {
      (async () => {
        try {
          const updates: Array<{ id: string; price: number }> = [];
          await Promise.all(
            zeros.map(async (it) => {
              try {
                const res = await fetch(
                  `${BACKEND_URL}/public/products/${it.id}`,
                );
                if (!res.ok) return;
                const payload = await res.json();
                const p = payload?.data;
                if (p && (p.price || p.price === 0)) {
                  const rp =
                    typeof p.price === "number"
                      ? p.price
                      : Number(String(p.price).replace(/[^\\d.]/g, "")) || 0;
                  updates.push({ id: it.id, price: rp });
                }
              } catch {
                // ignore individual failures
              }
            }),
          );

          if (updates.length > 0) {
            setItems((prev) =>
              prev.map((it) => {
                const u = updates.find((x) => x.id === it.id);
                return u ? { ...it, price: u.price } : it;
              }),
            );
          }
        } catch {
          // ignore
        }
      })();
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (item: Omit<CartItem, "quantity">, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      let next: CartItem[];
      if (existing) {
        next = prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + qty } : p,
        );
      } else {
        next = [...prev, { ...item, quantity: qty }];
      }
      toast({ title: "Added to cart", description: item.name });
      return next;
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) return removeItem(id);
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p)),
    );
  };

  const clear = () => setItems([]);

  const totalCount = useMemo(
    () => items.reduce((s, i) => s + i.quantity, 0),
    [items],
  );
  const totalPrice = useMemo(
    () => items.reduce((s, i) => s + i.quantity * i.price, 0),
    [items],
  );

  const buildWhatsAppMessage = () => {
    const lines: string[] = [];
    lines.push("Order from JCL Group\n");
    lines.push("*Order summary:*\n");
    items.forEach((it, idx) => {
      const line = `${idx + 1}. ${it.name} - $${it.price.toFixed(2)} x ${it.quantity} = $${(
        it.price * it.quantity
      ).toFixed(2)}`;
      lines.push(line);
    });
    lines.push(`\n*Total:* $${totalPrice.toFixed(2)}`);
    lines.push("\nPlease include your delivery address and contact details.");
    return lines.join("\n");
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clear,
        totalCount,
        totalPrice,
        buildWhatsAppMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export default useCart;
