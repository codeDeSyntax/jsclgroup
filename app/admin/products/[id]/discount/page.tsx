"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/auth-provider";
import { BACKEND_URL } from "@/lib/auth";
import { ArrowLeft, DollarSign, Percent, Trash2 } from "lucide-react";
import Link from "next/link";
import { AdminFormLayout } from "@/components/admin/admin-form";
import {
  adminGhostButtonClass,
  adminInputClass,
  adminPrimaryButtonClass,
} from "@/lib/admin-form-styles";

interface DiscountForm {
  type: "percent" | "fixed";
  value: number;
  floorPrice?: number;
}

export default function ProductDiscountPage() {
  const router = useRouter();
  const params = useParams();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [discountType, setDiscountType] = useState<"percent" | "fixed">(
    "percent",
  );
  const [discountValue, setDiscountValue] = useState("");
  const [floorPrice, setFloorPrice] = useState("");
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;

  const handleApplyDiscount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data: DiscountForm = {
        type: discountType,
        value: parseFloat(discountValue),
      };

      if (floorPrice) {
        data.floorPrice = parseFloat(floorPrice);
      }

      const response = await fetch(
        `${BACKEND_URL}/dashboard/products/${productId}/discount`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to apply discount");
      }

      alert("Discount applied successfully!");
      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to apply discount");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearDiscount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to clear the discount for this product?",
      )
    )
      return;

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${BACKEND_URL}/dashboard/products/${productId}/clear-discount`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!response.ok) throw new Error("Failed to clear discount");

      alert("Discount cleared successfully!");
      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear discount");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminFormLayout
      backHref="/admin/products"
      backLabel="Products"
      title="Apply discount"
      description="Set a product discount with the same sleek admin treatment used across the dashboard."
      error={error}
    >
      <div className="mx-auto w-full max-w-6xl lg:origin-top-left lg:transform lg:scale-90">
        <form
          className="overflow-hidden rounded-2xl border border-black/10 bg-jcl-black shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:rounded-3xl"
          onSubmit={handleApplyDiscount}
        >
          <div className="border-b border-white/10 px-4 py-4 sm:px-5 sm:py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/70">
                  Product discount
                </p>
                <h2 className="mt-1 text-xl font-bold tracking-[-0.03em] text-white sm:text-2xl">
                  Choose the discount style
                </h2>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
                  Keep it short, bold, and easy to scan from the admin view.
                </p>
              </div>

              <Link href="/admin/products" className="w-full sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 w-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to products
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-5 px-4 py-5 sm:space-y-6 sm:px-5 sm:py-6">
            <div className="grid gap-3 md:grid-cols-2">
              <label
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-4 transition ${
                  discountType === "percent"
                    ? "border-white/25 bg-white/10 ring-1 ring-white/20"
                    : "border-white/10 bg-white/5 hover:bg-white/[0.08]"
                }`}
              >
                <input
                  type="radio"
                  name="discountType"
                  value="percent"
                  checked={discountType === "percent"}
                  onChange={() => setDiscountType("percent")}
                  className="mt-1 h-4 w-4 border-white/30 bg-transparent text-white focus:ring-white/40"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Percent className="h-4 w-4 text-white/85" />
                    <span className="text-sm font-semibold text-white">
                      Percentage
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-white/55">
                    Best for seasonal promos and quick conversion boosts.
                  </p>
                </div>
              </label>

              <label
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-4 transition ${
                  discountType === "fixed"
                    ? "border-white/25 bg-white/10 ring-1 ring-white/20"
                    : "border-white/10 bg-white/5 hover:bg-white/[0.08]"
                }`}
              >
                <input
                  type="radio"
                  name="discountType"
                  value="fixed"
                  checked={discountType === "fixed"}
                  onChange={() => setDiscountType("fixed")}
                  className="mt-1 h-4 w-4 border-white/30 bg-transparent text-white focus:ring-white/40"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-white/85" />
                    <span className="text-sm font-semibold text-white">
                      Fixed amount
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-white/55">
                    Great when you want a clean, exact price reduction.
                  </p>
                </div>
              </label>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70">
                  {discountType === "percent"
                    ? "Percentage (%)"
                    : "Amount (USD)"}
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    placeholder={
                      discountType === "percent" ? "e.g. 20" : "e.g. 10"
                    }
                    required
                    className={`${adminInputClass} h-11 bg-white/5 text-white placeholder:text-white/35`}
                  />
                  <span className="flex min-w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 text-sm font-medium text-white/70">
                    {discountType === "percent" ? "%" : "$"}
                  </span>
                </div>
              </div>

              <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70">
                  Floor price (optional)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={floorPrice}
                  onChange={(e) => setFloorPrice(e.target.value)}
                  placeholder="e.g. 49.99"
                  className={`${adminInputClass} h-11 bg-white/5 text-white placeholder:text-white/35`}
                />
                <p className="text-xs leading-relaxed text-white/50">
                  Sets the lowest price this product can reach after the
                  discount.
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="button"
                onClick={handleClearDiscount}
                disabled={isLoading}
                variant="outline"
                className="h-11 w-full border-red-400/30 bg-white/5 text-red-200 hover:bg-red-500/10 hover:text-red-100 sm:w-auto"
              >
                <Trash2 className="h-4 w-4" />
                Clear discount
              </Button>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/admin/products" className="w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="outline"
                    className={`h-11 w-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:w-auto ${adminGhostButtonClass}`}
                  >
                    Cancel
                  </Button>
                </Link>

                <Button
                  type="submit"
                  disabled={isLoading || !discountValue}
                  className={`h-11 w-full ${adminPrimaryButtonClass} sm:w-auto`}
                >
                  {isLoading ? "Applying…" : "Apply discount"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminFormLayout>
  );
}
