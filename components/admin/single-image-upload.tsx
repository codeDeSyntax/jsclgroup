"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { ImagePlus, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  readFilePreview,
  uploadImage,
  validateImageFile,
  type UploadFolder,
} from "@/lib/upload";

interface SingleImageUploadProps {
  label: string;
  folder: UploadFolder;
  token: string | null;
  value?: string;
  onChange: (url: string | undefined) => void;
  required?: boolean;
  hint?: string;
}

export function SingleImageUpload({
  label,
  folder,
  token,
  value,
  onChange,
  required,
  hint,
}: SingleImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(value || "");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setPreview(value || "");
  }, [value]);

  const handleFile = async (file: File) => {
    try {
      validateImageFile(file);
      const localPreview = await readFilePreview(file);
      setPreview(localPreview);
      setIsUploading(true);
      const url = await uploadImage(file, token, folder);
      onChange(url);
      setPreview(url);
    } catch (err) {
      setPreview(value || "");
      onChange(value);
      toast({
        title: "Upload failed",
        description: err instanceof Error ? err.message : "Upload failed",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemove = () => {
    setPreview("");
    onChange(undefined);
    // removed inline error; using toast for notices
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-jcl-black/65">
        {label}
        {required ? <span className="text-jcl-black"> *</span> : null}
      </p>
      {hint ? (
        <p className="text-xs leading-relaxed text-jcl-black/55">{hint}</p>
      ) : null}

      <label
        className={cn(
          "group relative flex min-h-[210px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-black/[0.06] bg-white px-4 py-8 text-center transition hover:border-jcl-black/10 hover:bg-black/[0.02]",
          isUploading && "pointer-events-none opacity-70",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          aria-label={label}
          disabled={isUploading}
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
          }}
        />
        {isUploading ? (
          <Loader2 className="h-10 w-10 animate-spin text-jcl-black/70" />
        ) : (
          <ImagePlus className="h-10 w-10 text-jcl-black/30 transition group-hover:text-jcl-black/60" />
        )}
        <span className="text-sm font-medium text-jcl-black/75">
          {isUploading ? "Uploading…" : "Drop your files here, or browse"}
        </span>
        <span className="text-xs text-jcl-black/45">
          PNG, JPG, WebP · max 8MB
        </span>
      </label>

      {/* errors shown via global toast */}

      {preview ? (
        <div className="relative overflow-hidden rounded-2xl border border-black/[0.06] bg-transparent p-3">
          <img
            src={preview}
            alt="Preview"
            className="mx-auto max-h-60 w-full rounded-xl object-contain"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleRemove}
            disabled={isUploading}
            className="absolute right-4 top-4 h-7 w-7 rounded-full border-black/10 bg-white/95 text-jcl-black hover:bg-black hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
