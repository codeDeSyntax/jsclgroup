"use client";

import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/components/auth-provider";
import { BACKEND_URL } from "@/lib/auth";
import {
  adminInputClass,
  adminTextareaClass,
  adminSelectClass,
} from "@/lib/admin-form-styles";
import {
  AdminFormActions,
  AdminFormField,
  AdminFormLayout,
  AdminFormLoading,
  AdminFormSection,
} from "@/components/admin/admin-form";

interface DiscountAnnouncement {
  id?: string;
  title: string;
  message: string;
  ctaText?: string;
  ctaLink?: string;
  bannerType?: string;
  isActive: boolean;
  startsAt?: string;
  endsAt?: string;
  targetScope: string;
  targetProducts?: string[];
}

interface DiscountFormProps {
  isEdit?: boolean;
}

export default function DiscountForm({ isEdit }: DiscountFormProps) {
  const router = useRouter();
  const params = useParams();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<DiscountAnnouncement>({
    title: "",
    message: "",
    isActive: true,
    targetScope: "all",
    targetProducts: [],
  });

  useEffect(() => {
    if (isEdit && params.id && token) {
      void fetchAnnouncement();
    }
  }, [isEdit, params.id, token]);

  const fetchAnnouncement = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/dashboard/discount-announcements/${params.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!response.ok) throw new Error("Failed to fetch announcement");

      const data = await response.json();
      setFormData(data.data);
    } catch (err) {
      toast({
        title: "Failed to fetch announcement",
        description:
          err instanceof Error ? err.message : "Failed to fetch announcement",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit
        ? `${BACKEND_URL}/dashboard/discount-announcements/${params.id}`
        : `${BACKEND_URL}/dashboard/discount-announcements`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to save announcement");
      }

      router.push("/admin/discounts");
    } catch (err) {
      toast({
        title: "Save failed",
        description:
          err instanceof Error ? err.message : "Failed to save announcement",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <AdminFormLayout
        backHref="/admin/discounts"
        backLabel="Discount Banners"
        title={isEdit ? "Edit banner" : "New banner"}
      >
        <AdminFormLoading />
      </AdminFormLayout>
    );
  }

  return (
    <AdminFormLayout
      backHref="/admin/discounts"
      backLabel="Discount Banners"
      title={isEdit ? "Edit banner" : "New banner"}
      description="Create and manage discount announcements displayed across the platform."
    >
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-6xl lg:origin-top-left lg:transform lg:scale-90"
      >
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-jcl-black shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:rounded-3xl">
          <div className="px-3 py-3 sm:px-4 sm:py-4 lg:px-5 lg:py-5">
            <div className="mb-3 grid gap-3 sm:grid-cols-[1.2fr_auto] sm:items-center sm:text-left text-center">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/70">
                  Banner
                </p>
                <h2 className="mt-0.5 text-lg font-bold text-white sm:text-xl">
                  {isEdit ? "Edit banner" : "Create banner"}
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-white/60 sm:text-sm">
                  Make this promotion short, direct, and attractive.
                </p>
              </div>
              <img
                src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1778875142/undraw_easter-bunny_1v4n_w7x5bj.svg"
                alt="Decorative"
                className="mx-auto h-14 w-auto sm:mx-0 sm:h-18 lg:h-20"
              />
            </div>

            <div className="grid gap-3 lg:grid-cols-3 lg:gap-4">
              <div className="space-y-3 lg:col-span-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/75">
                    Title
                  </label>
                  <Input
                    className={`${adminInputClass} h-10 bg-white/5 text-white placeholder:text-white/40`}
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g., Summer Sale 2024"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/75">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Banner message text..."
                    required
                    className={`${adminTextareaClass} min-h-[86px] bg-white/5 text-white placeholder:text-white/40`}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/75">
                      CTA text
                    </label>
                    <Input
                      className={`${adminInputClass} h-10 bg-white/5 text-white placeholder:text-white/40`}
                      value={formData.ctaText || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, ctaText: e.target.value })
                      }
                      placeholder="e.g., Shop Now"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/75">
                      CTA link
                    </label>
                    <Input
                      className={`${adminInputClass} h-10 bg-white/5 text-white placeholder:text-white/40`}
                      value={formData.ctaLink || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, ctaLink: e.target.value })
                      }
                      placeholder="e.g., /products/electronics"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/75">
                    Target scope
                  </label>
                  <Select
                    value={formData.targetScope}
                    onValueChange={(value) =>
                      setFormData({ ...formData, targetScope: value })
                    }
                  >
                    <SelectTrigger
                      className={`${adminSelectClass} h-10 bg-white/5 text-white`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Products</SelectItem>
                      <SelectItem value="category">
                        Specific Category
                      </SelectItem>
                      <SelectItem value="ids">Specific Products</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/75">
                    Start date
                  </label>
                  <Input
                    type="datetime-local"
                    className={`${adminInputClass} h-10 bg-white/5 text-white`}
                    value={formData.startsAt || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, startsAt: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/75">
                    End date
                  </label>
                  <Input
                    type="datetime-local"
                    className={`${adminInputClass} h-10 bg-white/5 text-white`}
                    value={formData.endsAt || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, endsAt: e.target.value })
                    }
                  />
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 sm:col-span-2 lg:col-span-1">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-white/20 text-white focus:ring-white"
                  />
                  <label
                    htmlFor="isActive"
                    className="text-sm font-medium text-white"
                  >
                    Active
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 bg-black/20 px-3 py-3 sm:px-4 lg:px-5">
            <AdminFormActions
              isSubmitting={isSubmitting}
              submitLabel={isEdit ? "Update banner" : "Create banner"}
              cancelHref="/admin/discounts"
            />
          </div>
        </div>
      </form>
    </AdminFormLayout>
  );
}
