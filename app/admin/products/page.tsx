"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Edit,
  Trash2,
  Plus,
  Search,
  Tag,
  DollarSign,
  Loader,
  Star,
} from "lucide-react";
import AdminEmpty from "@/components/admin/admin-empty";

interface Product {
  id: string;
  name: string;
  image?: string;
  // backend may return numeric strings; accept both
  price: number | string;
  oldPrice?: number | string;
  description?: string | null;
  summary?: string | null;
  rating?: number | null;
  reviews?: number | null;
  tag?: string | null;
  features?: string[] | null;
  specs?: Array<{ label: string; value: string }> | null;
  discountPercent?: number;
  discountActive: boolean;
  category: string;
}

export default function ProductsPage() {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    fetchProducts();
  }, [token]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/dashboard/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const response = await fetch(`${BACKEND_URL}/dashboard/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setProducts(products.filter((p) => p.id !== id));
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (err) {
      alert(
        "Error deleting product: " +
          (err instanceof Error ? err.message : "Unknown error"),
      );
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "all" || p.category === selectedCategory),
  );

  const categories = Array.from(
    new Set(products.map((product) => product.category).filter(Boolean)),
  ).sort();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin mr-2" />
        <span>Loading products...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative h-full">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg bg-black/[0.04] py-2 pl-10 pr-4 border border-transparent hover:bg-black/[0.06] focus:outline-none focus:ring-2 focus:ring-jcl-black"
          />
        </div>

        <div className="flex items-center gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="h-10 w-[180px] bg-white ">
              <SelectValue placeholder="Filter category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="hover:bg-jcl-black">
                All categories
              </SelectItem>
              {categories.map((category) => (
                <SelectItem
                  key={category}
                  value={category}
                  className="hover:bg-jcl-black"
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Link href="/admin/products/new" className="">
            <Button className="bg-jcl-black hover:bg-jcl-primary/90 flex items-center space-x-2">
              <Plus size={18} />
              <span>Add Product</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Products Table */}
      {filteredProducts.length === 0 ? (
        <AdminEmpty
          icon={<Tag size={48} />}
          title={searchTerm ? "No products found" : "No products yet"}
          description={
            searchTerm ? undefined : "Create a product to display to customers."
          }
          ctaHref="/admin/products/new"
          ctaText="Create First Product"
        />
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-xl border border-transparent bg-black/[0.04] p-2 transition hover:border-jcl-accent/40 sm:p-3"
            >
              <div className="flex flex-col gap-2 md:grid md:grid-cols-[112px_1fr] md:items-start md:gap-3">
                <div className="relative flex h-24 items-center justify-center overflow-hidden rounded-lg bg-black/5 p-1.5 sm:h-28 md:h-full">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="h-20 w-full bg-black/[0.02]" />
                  )}
                </div>

                <div className="flex flex-col">
                  <p className="line-clamp-2 min-h-[2rem] text-[12px] font-medium leading-4 text-black/85 sm:text-sm sm:leading-5">
                    {product.name}
                  </p>

                  <p className="mt-1 line-clamp-2 min-h-[2rem] text-[11px] leading-4 text-black/55 sm:text-xs">
                    {product.description ?? "No description"}
                  </p>

                  <div className="mt-auto flex items-end gap-2 pt-2 sm:gap-3">
                    <div>
                      {product.oldPrice ? (
                        <p className="text-[10px] text-black/45 line-through sm:text-[11px]">
                          {typeof product.oldPrice === "number"
                            ? `$${Number(product.oldPrice).toFixed(2)}`
                            : product.oldPrice}
                        </p>
                      ) : null}

                      <div className="flex items-center gap-3">
                        <p className="text-sm font-black tracking-[-0.02em] text-jcl-accent sm:text-base">
                          {typeof product.price === "number"
                            ? `$${Number(product.price).toFixed(2)}`
                            : product.price}
                        </p>

                        {typeof product.rating === "number" ? (
                          <div className="flex items-center gap-1 text-xs text-jcl-black">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={
                                  i < Math.round(product.rating ?? 0)
                                    ? "h-3.5 w-3.5 fill-jcl-black"
                                    : "h-3.5 w-3.5 text-black/15"
                                }
                              />
                            ))}
                            <span className="text-xs text-black/45">
                              ({product.reviews ?? 0})
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute right-1.5 top-1.5 z-10 flex flex-col items-end gap-1 opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-150">
                <Link href={`/admin/products/${product.id}/edit`}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-5 w-5 p-0 min-h-0 rounded-md bg-white/95 [&_svg]:h-3 [&_svg]:w-3"
                    aria-label={`Edit ${product.name}`}
                  >
                    <Edit />
                  </Button>
                </Link>

                <Link href={`/admin/products/${product.id}/discount`}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-5 w-5 p-0 min-h-0 rounded-md bg-white/95 [&_svg]:h-3 [&_svg]:w-3"
                    aria-label={`Discount ${product.name}`}
                  >
                    <Tag />
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-5 w-5 p-0 min-h-0 rounded-md bg-white/95 text-red-600 [&_svg]:h-3 [&_svg]:w-3"
                  onClick={() => handleDelete(product.id)}
                  aria-label={`Delete ${product.name}`}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
