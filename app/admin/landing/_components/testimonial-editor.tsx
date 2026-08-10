"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import MediaUploader from "./media-uploader";
import { TextInput, TextArea } from "./section-editor";

export interface TestimonialItem {
  name: string;
  quote: string;
  photo: string;
}

interface TestimonialEditorProps {
  items: TestimonialItem[];
  onChange: (items: TestimonialItem[]) => void;
  token: string | null;
}

export default function TestimonialEditor({
  items,
  onChange,
  token,
}: TestimonialEditorProps) {
  const update = (index: number, field: keyof TestimonialItem, value: string) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const remove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const add = () => {
    onChange([
      ...items,
      {
        name: "New Client",
        quote: "Great service and experience with JCL Group.",
        photo: "",
      },
    ]);
  };

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative space-y-3 rounded-2xl border border-black/[0.08] bg-[#f8f8fa] p-4 sm:p-5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-black/60">
              Testimonial #{idx + 1}
            </span>
            <button
              type="button"
              onClick={() => remove(idx)}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-red-200/80 bg-red-50 text-red-500 transition hover:bg-red-100"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-black/40">
                Client Name
              </label>
              <TextInput
                value={item.name}
                onChange={(e) => update(idx, "name", e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-black/40">
                Client Quote / Feedback
              </label>
              <TextArea
                rows={2}
                value={item.quote}
                onChange={(e) => update(idx, "quote", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <MediaUploader
            label="Client Photo"
            value={item.photo}
            onChange={(url) => update(idx, "photo", url)}
            token={token}
            accept="image/*"
            folder="testimonials"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-2 rounded-xl border border-dashed border-black/20 px-4 py-2.5 text-xs font-semibold text-black/60 transition hover:border-black/40 hover:text-black shadow-xs"
      >
        <Plus className="h-3.5 w-3.5" />
        Add Testimonial
      </button>
    </div>
  );
}
