"use client";

import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/auth-provider";
import { BACKEND_URL } from "@/lib/auth";
import { adminInputClass } from "@/lib/admin-form-styles";
import { MultiImageUpload } from "@/components/admin/multi-image-upload";
import {
  AdminFormActions,
  AdminFormField,
  AdminFormLayout,
  AdminFormLoading,
  AdminFormSection,
} from "@/components/admin/admin-form";

interface Property {
  id?: string;
  title: string;
  slug: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images?: string[];
}

interface PropertyFormProps {
  isEdit?: boolean;
}

export default function PropertyForm({ isEdit }: PropertyFormProps) {
  const router = useRouter();
  const params = useParams();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<Property>({
    title: "",
    slug: "",
    price: 0,
    address: "",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    images: [],
  });

  useEffect(() => {
    if (isEdit && params.id && token) fetchProperty();
  }, [isEdit, params.id, token]);

  const fetchProperty = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/dashboard/properties/${params.id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (!response.ok) throw new Error("Failed to fetch property");
      const data = await response.json();
      const property = data.data;
      setFormData({
        ...property,
        images: Array.isArray(property.images) ? property.images : [],
      });
    } catch (err) {
      toast({
        title: "Failed to fetch property",
        description:
          err instanceof Error ? err.message : "Failed to fetch property",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    setFormData({ ...formData, slug });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // clear any inline error
    if (!token) {
      toast({
        title: "Not authenticated",
        description: "You must be logged in to save a property.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit
        ? `${BACKEND_URL}/dashboard/properties/${params.id}`
        : `${BACKEND_URL}/dashboard/properties`;
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
        throw new Error(errData.error || "Failed to save property");
      }
      router.push("/admin/properties");
    } catch (err) {
      toast({
        title: "Save failed",
        description:
          err instanceof Error ? err.message : "Failed to save property",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <AdminFormLayout
        backHref="/admin/properties"
        backLabel="Properties"
        title={isEdit ? "Edit property" : "New property"}
      >
        <AdminFormLoading />
      </AdminFormLayout>
    );
  }

  return (
    <AdminFormLayout
      backHref="/admin/properties"
      backLabel="Properties"
      title={isEdit ? "Edit property" : "New property"}
      description="Listings for the real estate division."
    >
      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        <AdminFormSection title="Basic information">
          <div className="space-y-5">
            <AdminFormField label="Property title" required>
              <Input
                className={adminInputClass}
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Modern 3-bedroom apartment"
                required
              />
            </AdminFormField>
            <div className="grid gap-5 sm:grid-cols-2">
              <AdminFormField label="URL slug" required>
                <div className="flex gap-2">
                  <Input
                    className={adminInputClass}
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="modern-3bed-apartment"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGenerateSlug}
                    className="h-11 shrink-0 rounded-full border-jcl-blue-100 px-4"
                  >
                    Auto
                  </Button>
                </div>
              </AdminFormField>
              <AdminFormField label="Address" required>
                <Input
                  className={adminInputClass}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Full address"
                  required
                />
              </AdminFormField>
            </div>
          </div>
        </AdminFormSection>

        <AdminFormSection title="Pricing & details">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
            <AdminFormField label="Price (USD)" required>
              <Input
                type="number"
                className={adminInputClass}
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
                required
              />
            </AdminFormField>
            <AdminFormField label="Area (m²)" required>
              <Input
                type="number"
                className={adminInputClass}
                value={formData.area}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    area: parseFloat(e.target.value) || 0,
                  })
                }
                required
              />
            </AdminFormField>
            <AdminFormField label="Bedrooms" required>
              <Input
                type="number"
                className={adminInputClass}
                value={formData.bedrooms}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bedrooms: parseInt(e.target.value, 10) || 0,
                  })
                }
                required
              />
            </AdminFormField>
            <AdminFormField label="Bathrooms" required>
              <Input
                type="number"
                className={adminInputClass}
                value={formData.bathrooms}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bathrooms: parseInt(e.target.value, 10) || 0,
                  })
                }
                required
              />
            </AdminFormField>
          </div>
        </AdminFormSection>

        <AdminFormSection title="Gallery">
          <MultiImageUpload
            label="Property photos"
            folder="properties"
            token={token}
            value={formData.images || []}
            onChange={(images) => setFormData({ ...formData, images })}
            hint="Up to 10 images for listings and detail pages."
          />
        </AdminFormSection>

        <AdminFormActions
          isSubmitting={isSubmitting}
          submitLabel={isEdit ? "Update property" : "Create property"}
          cancelHref="/admin/properties"
        />
      </form>
    </AdminFormLayout>
  );
}
