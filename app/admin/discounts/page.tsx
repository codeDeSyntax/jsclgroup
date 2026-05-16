"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import { BACKEND_URL } from "@/lib/auth";
import {
  Edit,
  Trash2,
  Plus,
  Search,
  Tag,
  Loader,
  Eye,
  EyeOff,
} from "lucide-react";
import AdminEmpty from "@/components/admin/admin-empty";
import { adminPrimaryButtonClass } from "@/lib/admin-form-styles";

interface DiscountAnnouncement {
  id: string;
  title: string;
  message: string;
  isActive: boolean;
  startsAt?: string;
  endsAt?: string;
  targetScope: string;
}

export default function DiscountsPage() {
  const { token } = useAuth();
  const [announcements, setAnnouncements] = useState<DiscountAnnouncement[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    fetchAnnouncements();
  }, [token]);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/dashboard/discount-announcements`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!response.ok) throw new Error("Failed to fetch announcements");

      const data = await response.json();
      setAnnouncements(data.data || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch announcements",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this discount announcement?",
      )
    )
      return;

    try {
      const response = await fetch(
        `${BACKEND_URL}/dashboard/discount-announcements/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.ok) {
        setAnnouncements(announcements.filter((a) => a.id !== id));
      } else {
        throw new Error("Failed to delete announcement");
      }
    } catch (err) {
      alert(
        "Error deleting announcement: " +
          (err instanceof Error ? err.message : "Unknown error"),
      );
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/dashboard/discount-announcements/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            isActive: !currentStatus,
          }),
        },
      );

      if (response.ok) {
        setAnnouncements(
          announcements.map((a) =>
            a.id === id ? { ...a, isActive: !currentStatus } : a,
          ),
        );
      }
    } catch (err) {
      alert("Error updating announcement status");
    }
  };

  const filteredAnnouncements = announcements.filter(
    (a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.message.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin mr-2" />
        <span>Loading announcements...</span>
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
            placeholder="Search banners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg bg-black/[0.04] py-2 pl-10 pr-4 border border-transparent hover:bg-black/[0.06] focus:outline-none focus:ring-2 focus:ring-jcl-black"
          />
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/discounts/new" className="">
            <Button
              className={`${adminPrimaryButtonClass} flex items-center space-x-2`}
            >
              <Plus size={18} />
              <span>Create Banner</span>
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

      {/* Announcements List */}
      {filteredAnnouncements.length === 0 ? (
        <AdminEmpty
          icon={<Tag size={48} />}
          title={searchTerm ? "No banners found" : "No discount banners yet"}
          description={
            searchTerm ? undefined : "Create a banner to display promotions."
          }
          ctaHref="/admin/discounts/new"
          ctaText="Create First Banner"
        />
      ) : (
        <div className="space-y-4">
          {filteredAnnouncements.map((announcement) => (
            <Card key={announcement.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      {announcement.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        announcement.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {announcement.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{announcement.message}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-semibold">Scope:</span>{" "}
                      {announcement.targetScope}
                    </div>
                    {announcement.startsAt && (
                      <div>
                        <span className="font-semibold">Starts:</span>{" "}
                        {new Date(announcement.startsAt).toLocaleDateString()}
                      </div>
                    )}
                    {announcement.endsAt && (
                      <div>
                        <span className="font-semibold">Ends:</span>{" "}
                        {new Date(announcement.endsAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleToggleActive(announcement.id, announcement.isActive)
                    }
                    className="flex items-center space-x-1"
                  >
                    {announcement.isActive ? (
                      <>
                        <EyeOff size={16} />
                        <span>Hide</span>
                      </>
                    ) : (
                      <>
                        <Eye size={16} />
                        <span>Show</span>
                      </>
                    )}
                  </Button>
                  <Link href={`/admin/discounts/${announcement.id}/edit`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-1"
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => handleDelete(announcement.id)}
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
