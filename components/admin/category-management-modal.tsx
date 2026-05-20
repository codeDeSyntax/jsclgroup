"use client";

import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { BACKEND_URL } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, Loader } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CategoryManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  token?: string;
  onCategoryAdded?: () => void;
}

export default function CategoryManagementModal({
  isOpen,
  onClose,
  token,
  onCategoryAdded,
}: CategoryManagementModalProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDesc, setNewCategoryDesc] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/public/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed to fetch categories",
        description:
          err instanceof Error ? err.message : "Failed to fetch categories",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      toast({
        title: "Empty name",
        description: "Please enter a category name.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${BACKEND_URL}/dashboard/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newCategoryName.trim(),
          description: newCategoryDesc.trim(),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create category");
      }

      toast({
        title: "Category created",
        description: `${newCategoryName} has been added.`,
      });

      setNewCategoryName("");
      setNewCategoryDesc("");
      await fetchCategories();
      onCategoryAdded?.();
    } catch (err) {
      toast({
        title: "Creation failed",
        description:
          err instanceof Error ? err.message : "Failed to create category",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This action cannot be undone.`))
      return;

    try {
      const res = await fetch(`${BACKEND_URL}/dashboard/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to delete category");
      }

      toast({
        title: "Category deleted",
        description: `${name} has been removed.`,
      });

      await fetchCategories();
    } catch (err) {
      toast({
        title: "Deletion failed",
        description:
          err instanceof Error ? err.message : "Failed to delete category",
        variant: "destructive",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed h-full inset-0 z-50 flex items-end sm:items-center justify-center  backdrop-blur-sm">
      <div className="w-full sm:w-96 rounded-t-3xl sm:rounded-3xl bg-white max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between bg-white px-5 py-4 sm:px-6">
          <h2 className="text-base sm:text-lg font-bold text-black">
            Categories
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-black/5 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4 sm:px-6 space-y-4">
          {/* Add Category Form */}
          <div className="rounded-lg bg-black/[0.02] p-3 sm:p-4">
            <h3 className="mb-3 font-semibold text-black text-xs">Add New</h3>
            <form
              onSubmit={handleAddCategory}
              className=" flex items-center justify-center gap-2"
            >
              <Input
                placeholder="Name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                disabled={isSubmitting}
                className="h-9 rounded-lg border-0 bg-white text-sm"
              />
              {/* <Input
                placeholder="Desc (optional)"
                value={newCategoryDesc}
                onChange={(e) => setNewCategoryDesc(e.target.value)}
                disabled={isSubmitting}
                className="h-9 rounded-lg border-0 bg-white text-sm"
              /> */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className=" h-9 rounded-lg bg-black text-white text-sm hover:bg-black/90 transition"
              >
                {isSubmitting ? (
                  <Loader className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Plus className="h-3.5 w-3.5" />
                )}
              </Button>
            </form>
          </div>

          {/* Categories List */}
          <div>
            <h3 className="mb-2 font-semibold text-black text-xs">
              All ({categories.length})
            </h3>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader className="h-5 w-5 animate-spin text-black/40" />
              </div>
            ) : categories.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="inline-flex items-center gap-1.5 rounded-md bg-black/10 px-2.5 py-1.5 group hover:bg-black/15 transition text-xs"
                  >
                    <p className="font-medium text-black leading-none">
                      {cat.name}
                    </p>
                    <button
                      onClick={() => handleDeleteCategory(cat.id, cat.name)}
                      className="ml-0.5 rounded p-0.5 text-black/40 hover:text-black/70 transition opacity-0 group-hover:opacity-100"
                      title={`Delete ${cat.name}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-black/[0.02] p-4 text-center text-xs text-black/55">
                None yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
