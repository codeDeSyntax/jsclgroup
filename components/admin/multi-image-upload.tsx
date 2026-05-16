"use client";

import { useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Images, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  MAX_GALLERY_FILES,
  uploadImages,
  validateImageFile,
  type UploadFolder,
} from "@/lib/upload";
import {
  adminInputClass,
  adminPrimaryButtonClass,
  adminGhostButtonClass,
} from "@/lib/admin-form-styles";

interface MultiImageUploadProps {
  label: string;
  folder: UploadFolder;
  token: string | null;
  value: string[];
  onChange: (urls: string[]) => void;
  hint?: string;
}

export function MultiImageUpload({
  label,
  folder,
  token,
  value,
  onChange,
  hint,
}: MultiImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const remaining = MAX_GALLERY_FILES - value.length;

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList?.length) return;
    // clear inline errors; using global toast for notices

    const files = Array.from(fileList);
    if (value.length + files.length > MAX_GALLERY_FILES) {
      toast({
        title: "Too many images",
        description: `You can have at most ${MAX_GALLERY_FILES} images.`,
        variant: "destructive",
      });
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    try {
      files.forEach(validateImageFile);
      setIsUploading(true);
      const urls = await uploadImages(files, token, folder);
      onChange([...value, ...urls]);
    } catch (err) {
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

  const removeAt = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-jcl-black/75">
        {label}
      </p>
      {hint ? (
        <p className="text-xs leading-relaxed text-jcl-black/55">{hint}</p>
      ) : null}

      <label
        className={cn(
          "group flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-transparent bg-black/[0.04] px-4 py-6 text-center transition hover:bg-black/[0.06]",
          (isUploading || remaining <= 0) && "pointer-events-none opacity-60",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          aria-label={label}
          disabled={isUploading || remaining <= 0}
          className="sr-only"
          onChange={(e) => void handleFiles(e.target.files)}
        />
        {isUploading ? (
          <Loader2 className="h-7 w-7 animate-spin text-jcl-black/70" />
        ) : (
          <Images className="h-7 w-7 text-jcl-black/30 transition group-hover:text-jcl-black/60" />
        )}
        <span className="text-sm font-medium text-jcl-black/85">
          {remaining <= 0
            ? "Gallery full"
            : isUploading
              ? "Uploading…"
              : "Add images"}
        </span>
        <span className="text-xs text-jcl-black/45">
          {remaining > 0
            ? `${remaining} slot${remaining === 1 ? "" : "s"} left · 8MB each`
            : `Max ${MAX_GALLERY_FILES} images`}
        </span>
      </label>

      {/* errors shown via global toast */}

      {value.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {value.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-black/[0.06] bg-white shadow-sm"
            >
              <img
                src={url}
                alt={`Gallery ${index + 1}`}
                className="h-full w-full object-cover transition group-hover:scale-[1.02]"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeAt(index)}
                disabled={isUploading}
                className={`absolute right-2 top-2 h-8 w-8 rounded-full p-0 opacity-0 transition group-hover:opacity-100 ${adminGhostButtonClass}`}
              >
                <X className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-jcl-black/45">No images in gallery yet.</p>
      )}
    </div>
  );
}
