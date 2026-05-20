"use client";

import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BACKEND_URL } from "@/lib/auth";
import { useAuth } from "@/components/auth-provider";
import { adminInputClass } from "@/lib/admin-form-styles";
import { SingleImageUpload } from "@/components/admin/single-image-upload";
import {
  AdminFormField,
  AdminFormLayout,
  AdminFormLoading,
  AdminFormSection,
  AdminFormTextarea,
  AdminListItem,
} from "@/components/admin/admin-form";

interface Product {
  id?: string;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  features?: string[];
  specs?: Array<{ label: string; value: string }>;
  image?: string;
  description?: string;
  summary?: string;
  tag?: string;
  rating?: number;
  reviews?: number;
}

interface ProductFormProps {
  isEdit?: boolean;
}

export default function ProductForm({ isEdit }: ProductFormProps) {
  const router = useRouter();
  const params = useParams();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<Product>({
    name: "",
    price: 0,
    oldPrice: 0,
    category: "electronics",
    features: [],
    specs: [],
    description: "",
    summary: "",
    tag: "",
  });

  const [featureInput, setFeatureInput] = useState("");
  const [specLabel, setSpecLabel] = useState("");
  const [specValue, setSpecValue] = useState("");
  const [categories, setCategories] = useState<
    { id: string; name: string; slug: string }[]
  >([]);

  useEffect(() => {
    if (isEdit && params.id && token) {
      fetchProduct();
    }
  }, [isEdit, params.id, token]);

  useEffect(() => {
    let mounted = true;
    const fetchCats = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/public/categories`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        if (!mounted) return;
        setCategories(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error(err);
      }
    };
    void fetchCats();
    return () => {
      mounted = false;
    };
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/dashboard/products/${params.id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (!response.ok) throw new Error("Failed to fetch product");
      const data = await response.json();
      setFormData(data.data);
    } catch (err) {
      toast({
        title: "Failed to fetch product",
        description:
          err instanceof Error ? err.message : "Failed to fetch product",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setFormData({
      ...formData,
      features: [...(formData.features || []), featureInput.trim()],
    });
    setFeatureInput("");
  };

  const handleAddSpec = () => {
    if (!specLabel.trim() || !specValue.trim()) return;
    setFormData({
      ...formData,
      specs: [
        ...(formData.specs || []),
        { label: specLabel.trim(), value: specValue.trim() },
      ],
    });
    setSpecLabel("");
    setSpecValue("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // clear any previous inline errors
    if (!token) {
      toast({
        title: "Not authenticated",
        description: "You must be logged in to save a product.",
        variant: "destructive",
      });
      return;
    }
    if (!isEdit && !formData.image) {
      toast({
        title: "Missing image",
        description: "Please upload a product image before saving.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const method = isEdit ? "PUT" : "POST";
      const apiUrl = isEdit
        ? `${BACKEND_URL}/dashboard/products/${params.id}`
        : `${BACKEND_URL}/dashboard/products`;
      const response = await fetch(apiUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to save product");
      }
      toast({
        title: isEdit ? "Product updated" : "Product created",
        description: "Changes saved.",
      });
      router.push("/admin/products");
    } catch (err) {
      toast({
        title: "Save failed",
        description:
          err instanceof Error ? err.message : "Failed to save product",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <AdminFormLayout
        backHref="/admin/products"
        backLabel="Products"
        title={isEdit ? "Edit product" : "New product"}
      >
        <AdminFormLoading />
      </AdminFormLayout>
    );
  }

  return (
    <AdminFormLayout
      backHref="/admin/products"
      backLabel="Products"
      title={isEdit ? "Edit product" : "Add Product"}
      description="Use the left panel for images and the right panel for product details."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6 md:origin-top-left md:transform md:scale-90"
      >
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,420px)]">
          <AdminFormSection title="Add Images" className="h-full">
            <SingleImageUpload
              label="Add Images"
              folder="products"
              token={token}
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              required={!isEdit}
              hint="Drop your files here, or browse."
            />
          </AdminFormSection>

          <AdminFormSection title="Product Details" className="h-full">
            <div className="grid gap-4">
              <AdminFormField label="Product Name" required>
                <Input
                  className={adminInputClass}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Navy Blue Sneakers Shoe"
                  required
                />
              </AdminFormField>

              <AdminFormField label="Category" required>
                <div className="space-y-3">
                  {/* Tag Selection */}
                  <div className="flex flex-wrap gap-2">
                    {categories && categories.length > 0 ? (
                      categories.map((c) => {
                        const isSelected =
                          String(formData.category || "").toLowerCase() ===
                          String(c.slug || c.name || "").toLowerCase();
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, category: c.slug })
                            }
                            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition ${
                              isSelected
                                ? "bg-jcl-accent text-white"
                                : "border border-black/10 bg-white hover:bg-black/5"
                            }`}
                          >
                            {c.name}
                          </button>
                        );
                      })
                    ) : (
                      <div className="text-sm text-black/60">Loading…</div>
                    )}
                  </div>

                  {/* Manual Entry */}
                  <div className="pt-2 border-t border-black/10">
                    <p className="text-xs text-black/55 mb-2">
                      Category:
                    </p>
                    <Input
                      className={adminInputClass}
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value.trim(),
                        })
                      }
                      placeholder="e.g., smartphone, tablet, headphones"
                    />
                  </div>
                </div>
              </AdminFormField>

              <AdminFormField label="Summary">
                <Input
                  className={adminInputClass}
                  value={formData.summary || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, summary: e.target.value })
                  }
                  placeholder="Short summary for the list view"
                />
              </AdminFormField>

              <AdminFormField label="Tag">
                <Input
                  className={adminInputClass}
                  value={formData.tag || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, tag: e.target.value })
                  }
                  placeholder="e.g. Shoe"
                />
              </AdminFormField>

              <div className="grid gap-4 sm:grid-cols-2">
                <AdminFormField label="Price" required>
                  <Input
                    type="number"
                    step="0.01"
                    className={adminInputClass}
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="$175"
                    required
                  />
                </AdminFormField>

                <AdminFormField
                  label="Original Price"
                  hint="Optional, for sales."
                >
                  <Input
                    type="number"
                    step="0.01"
                    className={adminInputClass}
                    value={formData.oldPrice || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        oldPrice: e.target.value
                          ? parseFloat(e.target.value)
                          : undefined,
                      })
                    }
                    placeholder="$210"
                  />
                </AdminFormField>
              </div>

              <AdminFormField label="Description">
                <AdminFormTextarea
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Write a clear product description."
                />
              </AdminFormField>
            </div>
          </AdminFormSection>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <AdminFormSection title="Tags">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                className={adminInputClass}
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="e.g. Sneaker"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
              />
              <Button
                type="button"
                onClick={handleAddFeature}
                className="h-11 shrink-0 rounded-full bg-jcl-black px-6 text-white hover:bg-black/90"
              >
                Add
              </Button>
            </div>
            {formData.features && formData.features.length > 0 && (
              <div className="mt-4 space-y-2">
                {formData.features.map((feature, idx) => (
                  <AdminListItem
                    key={idx}
                    onRemove={() =>
                      setFormData({
                        ...formData,
                        features: formData.features?.filter(
                          (_, i) => i !== idx,
                        ),
                      })
                    }
                  >
                    {feature}
                  </AdminListItem>
                ))}
              </div>
            )}
          </AdminFormSection>

          <AdminFormSection title="Specifications">
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                className={adminInputClass}
                value={specLabel}
                onChange={(e) => setSpecLabel(e.target.value)}
                placeholder="Label"
              />
              <Input
                className={adminInputClass}
                value={specValue}
                onChange={(e) => setSpecValue(e.target.value)}
                placeholder="Value"
              />
            </div>
            <Button
              type="button"
              onClick={handleAddSpec}
              className="mt-3 h-10 rounded-full border border-black/10 bg-white text-jcl-black hover:bg-black/[0.04]"
            >
              Add specification
            </Button>
            {formData.specs && formData.specs.length > 0 && (
              <div className="mt-4 space-y-2">
                {formData.specs.map((spec, idx) => (
                  <AdminListItem
                    key={idx}
                    onRemove={() =>
                      setFormData({
                        ...formData,
                        specs: formData.specs?.filter((_, i) => i !== idx),
                      })
                    }
                  >
                    <span className="font-medium">{spec.label}</span>
                    <span className="text-jcl-black/60"> — {spec.value}</span>
                  </AdminListItem>
                ))}
              </div>
            )}
          </AdminFormSection>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 rounded-full bg-jcl-black px-8 text-white shadow-sm hover:bg-black/90"
          >
            {isSubmitting
              ? "Saving…"
              : isEdit
                ? "Update Product"
                : "Publish Product"}
          </Button>
        </div>
      </form>
    </AdminFormLayout>
  );
}
