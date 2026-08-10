"use client";

import React, { useState, useRef } from "react";
import { Upload, Trash2, Loader2, Image as ImageIcon, Video, ExternalLink } from "lucide-react";
import { BACKEND_URL } from "@/lib/auth";

interface MediaUploaderProps {
  label: string;
  value: string;
  onChange: (newUrl: string) => void;
  token: string | null;
  accept?: string; // e.g. "image/*" or "video/*,image/*"
  hint?: string;
  folder?: string;
  isVideo?: boolean;
}

export default function MediaUploader({
  label,
  value,
  onChange,
  token,
  accept = "image/*",
  hint,
  folder = "landing-assets",
  isVideo = false,
}: MediaUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append(isVideo ? "file" : "image", file);
      if (value) {
        formData.append("previousUrl", value);
      }

      const endpoint = isVideo ? "/uploads/media" : "/uploads/image";
      const res = await fetch(`${BACKEND_URL}${endpoint}?folder=${encodeURIComponent(folder)}`, {
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
      if (!newUrl) {
        throw new Error("No URL returned from upload");
      }

      onChange(newUrl);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to upload asset");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = async () => {
    if (!value) return;

    setIsDeleting(true);
    setError(null);

    try {
      if (token) {
        await fetch(`${BACKEND_URL}/uploads/asset`, {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ url: value }),
        });
      }
      onChange("");
    } catch (err) {
      console.error(err);
      setError("Failed to delete asset from storage");
    } finally {
      setIsDeleting(false);
    }
  };

  const isCurrentVideo = isVideo || value.endsWith(".mp4") || value.endsWith(".webm") || value.includes("/video/upload/");

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-black/50">
          {label}
        </label>
        {value && (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-medium text-black/40 hover:text-black hover:underline"
          >
            Open Original <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      {hint && <p className="text-[11px] text-black/35">{hint}</p>}

      <div className="rounded-2xl border border-black/[0.08] bg-[#f8f8fa] p-3.5">
        {value ? (
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            {/* Preview Box */}
            <div className="relative flex h-28 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-xs md:w-36">
              {isCurrentVideo ? (
                <video
                  src={value}
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={value}
                  alt={label}
                  className="h-full w-full object-contain p-1"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
              <div className="absolute left-1.5 top-1.5 rounded-md bg-black/75 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-xs">
                {isCurrentVideo ? "VIDEO" : "IMAGE"}
              </div>
            </div>

            {/* URL string & action buttons */}
            <div className="flex flex-1 flex-col gap-2 min-w-0">
              <input
                type="text"
                value={value}
                readOnly
                className="w-full truncate rounded-xl border border-black/15 bg-white px-3.5 py-2 text-xs text-black/70 shadow-[0_1px_2px_rgba(0,0,0,0.04)] outline-none"
              />
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading || isDeleting}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-black px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-black/85 disabled:opacity-50 shadow-xs"
                >
                  {isUploading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Upload className="h-3.5 w-3.5" />
                  )}
                  {isUploading ? "Uploading & Replacing…" : "Replace Asset"}
                </button>

                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={isUploading || isDeleting}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-red-200/80 bg-red-50 px-3.5 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                >
                  {isDeleting ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Empty state dropzone */
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-black/20 bg-white py-6 text-center transition hover:border-black/40 hover:bg-black/[0.01] shadow-xs"
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2 text-black/50">
                <Loader2 className="h-6 w-6 animate-spin text-black" />
                <p className="text-xs font-semibold">Uploading asset to Supabase Storage…</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-black/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5">
                  {isVideo ? <Video className="h-5 w-5 text-black/60" /> : <ImageIcon className="h-5 w-5 text-black/60" />}
                </div>
                <div>
                  <p className="text-xs font-bold text-black">
                    Click or drag & drop to upload {isVideo ? "video" : "image"}
                  </p>
                  <p className="mt-0.5 text-[10px] text-black/40">
                    File will be saved to Supabase Storage bucket
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {error && (
          <p className="mt-2 text-xs font-semibold text-red-500">{error}</p>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
