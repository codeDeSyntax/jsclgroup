"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/components/auth-provider";
import { BACKEND_URL } from "@/lib/auth";
import { Edit, Trash2, Plus, Upload, Loader, X } from "lucide-react";
import AdminEmpty from "@/components/admin/admin-empty";
import { adminPrimaryButtonClass } from "@/lib/admin-form-styles";
import Image from "next/image";

interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  displayOrder: number;
}

export default function GalleryPage() {
  const { token } = useAuth();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    displayOrder: 0,
  });

  useEffect(() => {
    if (!token) return;
    fetchImages();
  }, [token]);

  const fetchImages = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/dashboard/gallery`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch gallery images");

      const data = await response.json();
      setImages(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch images");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setImageToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!imageToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/dashboard/gallery/${imageToDelete}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.ok) {
        setImages(images.filter((img) => img.id !== imageToDelete));
        setDeleteDialogOpen(false);
        setImageToDelete(null);
      } else {
        throw new Error("Failed to delete image");
      }
    } catch (err) {
      alert(
        "Error deleting image: " +
          (err instanceof Error ? err.message : "Unknown error"),
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      description: image.description || "",
      imageUrl: image.imageUrl,
      displayOrder: image.displayOrder,
    });
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    if (!editingImage) return;

    try {
      const response = await fetch(
        `${BACKEND_URL}/dashboard/gallery/${editingImage.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        const updatedData = await response.json();
        setImages(
          images.map((img) =>
            img.id === editingImage.id ? updatedData.data : img,
          ),
        );
        setIsEditing(false);
        setEditingImage(null);
      }
    } catch (err) {
      alert(
        "Error updating image: " +
          (err instanceof Error ? err.message : "Unknown error"),
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin mr-2" />
        <span>Loading gallery...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-black">Gallery</h1>
          <p className="text-sm text-black/60 mt-1">
            Manage your gallery photos and images
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/gallery/new" className="">
            <Button
              className={`${adminPrimaryButtonClass} flex items-center space-x-2`}
            >
              <Plus size={18} />
              <span>Add Image</span>
            </Button>
          </Link>
        </div>
      </div>

      {images.length === 0 ? (
        <AdminEmpty
          icon={<Upload size={48} />}
          title="No gallery images yet"
          description="Upload your first gallery image to get started."
          ctaHref="/admin/gallery/new"
          ctaText="Upload First Image"
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-[28px] border border-gray-200/40 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_18px_50px_rgba(0,0,0,0.12)] transition-all"
            >
              <div className="relative h-44 overflow-hidden bg-gray-200 rounded-b-3xl">
                <Image
                  src={image.imageUrl}
                  alt={image.title}
                  fill
                  className="object-cover rounded-b-3x transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 truncate text-sm">
                  {image.title}
                </h3>
                {image.description && (
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {image.description}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Order: {image.displayOrder}
                </p>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 flex items-end justify-end p-3 gap-2">
                <button
                  onClick={() => handleEdit(image)}
                  className="flex items-center gap-1 h-8 px-3 rounded-lg bg-white/20 hover:bg-white/30 text-white transition text-xs font-medium"
                >
                  <Edit size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="flex items-center gap-1 h-8 px-3 rounded-lg bg-red-500/20 hover:bg-red-600/30 text-white transition text-xs font-medium"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg">Delete image?</DialogTitle>
            <DialogDescription className="text-base">
              This action cannot be undone. The image will be permanently
              deleted from the gallery.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3 flex flex-row justify-end">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
              className="rounded-lg bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="rounded-2xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg">Edit Gallery Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-jcl-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-jcl-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={formData.displayOrder}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    displayOrder: parseInt(e.target.value),
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-jcl-primary"
              />
            </div>
          </div>
          <DialogFooter className="gap-3 flex flex-row justify-end">
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              className={`${adminPrimaryButtonClass} rounded-lg`}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
