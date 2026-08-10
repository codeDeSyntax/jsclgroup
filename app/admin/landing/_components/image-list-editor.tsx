"use client";

import React, { useState, useRef } from "react";
import { Plus, Trash2, ArrowUp, ArrowDown, Upload, Loader2 } from "lucide-react";
import { BACKEND_URL } from "@/lib/auth";

interface ImageListEditorProps {
  label: string;
  images: string[];
  onChange: (images: string[]) => void;
  token: string | null;
  max?: number;
  hint?: string;
  folder?: string;
}

export default function ImageListEditor({
  label,
  images,
  onChange,
  token,
  max = 10,
  hint,
  folder = "landing-assets",
}: ImageListEditorProps) {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const targetIndexRef = useRef<number | null>(null);

  const update = (index: number, value: string) => {
    const next = [...images];
    next[index] = value;
    onChange(next);
  };

  const remove = async (index: number) => {
    const targetUrl = images[index];
    if (targetUrl && token) {
      try {
        await fetch(`${BACKEND_URL}/uploads/asset`, {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ url: targetUrl }),
        });
      } catch (err) {
        console.warn("Failed to delete removed asset from backend storage", err);
      }
    }
    onChange(images.filter((_, i) => i !== index));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const next = [...images];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next);
  };

  const moveDown = (index: number) => {
    if (index === images.length - 1) return;
    const next = [...images];
    [next[index + 1], next[index]] = [next[index], next[index + 1]];
    onChange(next);
  };

  const triggerUploadForIndex = (index: number) => {
    targetIndexRef.current = index;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const index = targetIndexRef.current;
    if (!file || index === null) return;

    setUploadingIndex(index);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);
      const previousUrl = images[index];
      if (previousUrl) {
        formData.append("previousUrl", previousUrl);
      }

      const res = await fetch(`${BACKEND_URL}/uploads/image?folder=${encodeURIComponent(folder)}`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Upload failed");
      }

      const newUrl = json.data?.url;
      if (newUrl) {
        update(index, newUrl);
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setUploadingIndex(null);
      targetIndexRef.current = null;
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const add = () => {
    if (images.length >= max) return;
    const newIndex = images.length;
    onChange([...images, ""]);
    setTimeout(() => triggerUploadForIndex(newIndex), 100);
  };

  return (
    <div className="space-y-2">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-black/50">
        {label}
      </p>
      {hint && <p className="text-[11px] text-black/35">{hint}</p>}

      <div className="space-y-2.5">
        {images.map((url, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-2.5 rounded-2xl border border-black/[0.08] bg-[#f8f8fa] p-3 sm:flex-row sm:items-center"
          >
            <div className="flex flex-1 items-center gap-2.5 min-w-0">
              {/* Preview thumbnail */}
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-black/10 bg-white shadow-xs">
                {url ? (
                  <img
                    src={url}
                    alt={`Image ${idx + 1}`}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <span className="text-[9px] font-bold text-black/30">NEW</span>
                )}
              </div>

              <input
                type="text"
                value={url}
                readOnly
                placeholder="Click Upload to pick image file"
                className="w-full flex-1 truncate rounded-xl border border-black/15 bg-white px-3 py-2 text-xs text-black/70 shadow-[0_1px_2px_rgba(0,0,0,0.04)] outline-none"
              />
            </div>

            <div className="flex shrink-0 items-center justify-end gap-1.5 pt-1 sm:pt-0">
              <button
                type="button"
                onClick={() => triggerUploadForIndex(idx)}
                disabled={uploadingIndex === idx}
                className="flex h-9 items-center gap-1.5 rounded-xl bg-black px-3.5 text-xs font-semibold text-white transition hover:bg-black/85 disabled:opacity-50 shadow-xs"
              >
                {uploadingIndex === idx ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Upload className="h-3 w-3" />
                )}
                {uploadingIndex === idx ? "Uploading…" : url ? "Replace" : "Upload"}
              </button>

              <button
                type="button"
                onClick={() => moveUp(idx)}
                disabled={idx === 0}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white text-black/50 shadow-xs transition hover:bg-black/5 hover:text-black disabled:opacity-25"
                aria-label="Move up"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => moveDown(idx)}
                disabled={idx === images.length - 1}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white text-black/50 shadow-xs transition hover:bg-black/5 hover:text-black disabled:opacity-25"
                aria-label="Move down"
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => remove(idx)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200/80 bg-red-50 text-red-500 transition hover:bg-red-100"
                aria-label="Remove image"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {error && <p className="text-xs font-semibold text-red-500">{error}</p>}

      {images.length < max && (
        <button
          type="button"
          onClick={add}
          className="mt-1 inline-flex items-center gap-2 rounded-xl border border-dashed border-black/20 px-4 py-2.5 text-xs font-semibold text-black/60 transition hover:border-black/40 hover:text-black shadow-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Image Slot
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
