"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/lib/auth";
import { useAuth } from "@/components/auth-provider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, Upload, Loader2, X } from "lucide-react";

interface ImageFile {
  file: File;
  title: string;
  description: string;
  type: string;
  preview: string;
}

export default function NewGalleryImagePage() {
  const router = useRouter();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState<ImageFile[]>([]);
  const [bulkTitle, setBulkTitle] = useState("");
  const [bulkDescription, setBulkDescription] = useState("");
  const [bulkType, setBulkType] = useState<string>("project");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, 10 - images.length) // Limit total to 10
      .map((file) => ({
        file,
        title: "",
        description: "",
        type: bulkType || "project",
        preview: URL.createObjectURL(file),
      }));

    setImages((prev) => [...prev, ...newImages]);
    setError("");
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      // Revoke the preview URL to free memory
      URL.revokeObjectURL(prev[index].preview);
      return updated;
    });
  };

  const updateImage = (
    index: number,
    field: keyof Omit<ImageFile, "file" | "preview">,
    value: string | number,
  ) => {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, [field]: value } : img)),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (images.length === 0) {
      setError("Please select at least one image");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();

      // Add files
      images.forEach((img) => {
        formData.append("images", img.file);
      });

      // Add metadata arrays
      images.forEach((img, index) => {
        const title =
          img.title.trim() || bulkTitle.trim() || `Gallery Image ${index + 1}`;
        formData.append("titles[]", title);

        const description =
          img.description.trim() || bulkDescription.trim() || "";
        formData.append("descriptions[]", description);

        formData.append("types[]", img.type || bulkType || "project");
      });

      const response = await fetch(`${BACKEND_URL}/dashboard/gallery`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to upload images");
      }

      router.push("/admin/gallery");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload images");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Link
        href="/admin/gallery"
        className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black transition"
      >
        <ChevronLeft size={16} />
        Back to Gallery
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-black">Add Gallery Images</h1>
        <p className="text-sm text-black/60 mt-2">
          Upload multiple photos to the gallery (max 10 at a time)
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
      >
        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
            {error}
          </div>
        )}

        {/* File Upload Area */}
        <div className="space-y-4">
          <div className="relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              disabled={images.length >= 10}
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className={`flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 text-center transition ${
                images.length >= 10
                  ? "border-black/10 bg-black/5 cursor-not-allowed"
                  : "border-jcl-primary/30 bg-jcl-primary/5 cursor-pointer hover:border-jcl-primary/50 hover:bg-jcl-primary/10"
              }`}
            >
              <Upload
                size={32}
                className={
                  images.length >= 10 ? "text-black/40" : "text-jcl-primary"
                }
              />
              <div>
                <p
                  className={`font-semibold ${images.length >= 10 ? "text-black/60" : "text-black"}`}
                >
                  {images.length >= 10
                    ? "Maximum images reached"
                    : "Click to upload or drag images here"}
                </p>
                <p className="text-xs text-black/50 mt-1">
                  PNG, JPG, GIF up to 8MB each ({images.length}/10)
                </p>
              </div>
            </label>
          </div>

          {/* Bulk Metadata Fields */}
          {images.length > 0 && (
            <div className="space-y-3 rounded-lg bg-black/5 p-4">
              <p className="text-sm font-semibold text-black">
                Bulk Settings (optional)
              </p>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-semibold text-black mb-1">
                    Default Title (if not set per image)
                  </label>
                  <Input
                    type="text"
                    value={bulkTitle}
                    onChange={(e) => setBulkTitle(e.target.value)}
                    placeholder="Applied to all images without titles"
                    className="w-full text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-black mb-1">
                    Default Description (if not set per image)
                  </label>
                  <textarea
                    value={bulkDescription}
                    onChange={(e) => setBulkDescription(e.target.value)}
                    placeholder="Applied to all images without descriptions"
                    rows={2}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-black placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-black mb-1">
                    Default Type
                  </label>
                  <select
                    value={bulkType}
                    onChange={(e) => setBulkType(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-black"
                  >
                    <option value="project">Project</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Image Preview Cards */}
          {images.length > 0 && (
            <div className="space-y-4">
              <p className="text-sm font-semibold text-black">
                Selected Images ({images.length})
              </p>
              <div className="grid grid-cols-1 gap-4">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="flex gap-4 rounded-lg border border-black/10 p-4"
                  >
                    {/* Preview Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={img.preview}
                        alt={`Preview ${index + 1}`}
                        className="h-24 w-24 object-cover rounded"
                      />
                    </div>

                    {/* Image Details */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-black mb-1">
                          Title
                        </label>
                        <Input
                          type="text"
                          value={img.title}
                          onChange={(e) =>
                            updateImage(index, "title", e.target.value)
                          }
                          placeholder={
                            bulkTitle || `Gallery Image ${index + 1}`
                          }
                          className="w-full text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-black mb-1">
                          Description
                        </label>
                        <textarea
                          value={img.description}
                          onChange={(e) =>
                            updateImage(index, "description", e.target.value)
                          }
                          placeholder={
                            bulkDescription || "Optional description"
                          }
                          rows={2}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-black placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-black mb-1">
                          Type
                        </label>
                        <select
                          value={img.type}
                          onChange={(e) =>
                            updateImage(index, "type", e.target.value)
                          }
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-black"
                        >
                          <option value="project">Project</option>
                          <option value="staff">Staff</option>
                        </select>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="flex-shrink-0 p-2 text-red-500 hover:text-red-700 transition"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={isLoading || images.length === 0}
            className="flex items-center gap-2 bg-jcl-primary text-white hover:bg-jcl-primary/90 rounded-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Upload{" "}
                {images.length > 0
                  ? `${images.length} Image${images.length !== 1 ? "s" : ""}`
                  : "Images"}
              </>
            )}
          </Button>
          <Link href="/admin/gallery">
            <Button variant="outline" className="rounded-lg">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
