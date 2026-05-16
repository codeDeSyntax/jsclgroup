"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import { BACKEND_URL } from "@/lib/auth";
import { Edit, Trash2, Plus, Search, Home, Loader } from "lucide-react";
import AdminEmpty from "@/components/admin/admin-empty";
import { adminPrimaryButtonClass } from "@/lib/admin-form-styles";

interface Property {
  id: string;
  title: string;
  slug: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
}

export default function PropertiesPage() {
  const { token } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    fetchProperties();
  }, [token]);

  const fetchProperties = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/dashboard/properties`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch properties");

      const data = await response.json();
      setProperties(data.data || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch properties",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;

    try {
      const response = await fetch(
        `${BACKEND_URL}/dashboard/properties/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.ok) {
        setProperties(properties.filter((p) => p.id !== id));
      } else {
        throw new Error("Failed to delete property");
      }
    } catch (err) {
      alert(
        "Error deleting property: " +
          (err instanceof Error ? err.message : "Unknown error"),
      );
    }
  };

  const filteredProperties = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin mr-2" />
        <span>Loading properties...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by title or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg bg-black/[0.04] py-2 pl-10 pr-4 border border-transparent hover:bg-black/[0.06] focus:outline-none focus:ring-2 focus:ring-jcl-black"
          />
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/properties/new" className="">
            <Button
              className={`${adminPrimaryButtonClass} flex items-center space-x-2`}
            >
              <Plus size={18} />
              <span>Add Property</span>
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

      {/* Properties Grid */}
      {filteredProperties.length === 0 ? (
        <AdminEmpty
          icon={<Home size={48} />}
          title={searchTerm ? "No properties found" : "No properties yet"}
          description={
            searchTerm ? undefined : "Add a property to showcase listings."
          }
          ctaHref="/admin/properties/new"
          ctaText="Create First Property"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card
              key={property.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {property.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{property.address}</p>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-600">Price</p>
                    <p className="font-semibold text-gray-900">
                      ${property.price.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Area</p>
                    <p className="font-semibold text-gray-900">
                      {property.area} m²
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Beds</p>
                    <p className="font-semibold text-gray-900">
                      {property.bedrooms}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Baths</p>
                    <p className="font-semibold text-gray-900">
                      {property.bathrooms}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2 pt-4 border-t">
                  <Link
                    href={`/admin/properties/${property.id}/edit`}
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center justify-center space-x-1"
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => handleDelete(property.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
