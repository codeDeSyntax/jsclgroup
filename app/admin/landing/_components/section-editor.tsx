"use client";

import React from "react";
import { Loader2, Save } from "lucide-react";

interface SectionEditorProps {
  title: string;
  description: string;
  onSave: () => void;
  isSaving: boolean;
  saveStatus: "idle" | "success" | "error";
  statusMessage?: string;
  children: React.ReactNode;
}

export default function SectionEditor({
  title,
  description,
  onSave,
  isSaving,
  saveStatus,
  statusMessage,
  children,
}: SectionEditorProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-black/[0.06]">
      {/* Header */}
      <div className="flex flex-col gap-3.5 border-b border-black/[0.06] px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6 md:py-5">
        <div>
          <h3 className="text-base font-bold tracking-[-0.02em] text-black">
            {title}
          </h3>
          <p className="mt-0.5 text-xs md:text-sm text-black/50">{description}</p>
        </div>
        <div className="flex items-center justify-between gap-3 shrink-0 md:justify-end">
          {saveStatus === "success" && (
            <span className="text-xs font-semibold text-green-600">
              {statusMessage ?? "Saved!"}
            </span>
          )}
          {saveStatus === "error" && (
            <span className="text-xs font-semibold text-red-500">
              {statusMessage ?? "Failed to save"}
            </span>
          )}
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-60 shadow-sm"
          >
            {isSaving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            {isSaving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-5 px-4 py-5 sm:px-6 sm:py-6">{children}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Reusable field components used inside SectionEditor
// ---------------------------------------------------------------------------

interface FieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
}

export function Field({ label, hint, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-black/50">
        {label}
      </label>
      {children}
      {hint && <p className="text-[11px] text-black/35">{hint}</p>}
    </div>
  );
}

interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function TextInput({ className = "", ...props }: TextInputProps) {
  return (
    <input
      {...props}
      className={`h-10 w-full rounded-xl border border-black/15 bg-white px-3.5 text-sm text-black shadow-[0_1px_2px_rgba(0,0,0,0.04)] outline-none transition placeholder:text-black/35 focus:border-black focus:ring-2 focus:ring-black/10 ${className}`}
    />
  );
}

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export function TextArea({ className = "", ...props }: TextAreaProps) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-black shadow-[0_1px_2px_rgba(0,0,0,0.04)] outline-none transition placeholder:text-black/35 focus:border-black focus:ring-2 focus:ring-black/10 ${className}`}
    />
  );
}

export function Divider() {
  return <hr className="border-black/[0.06]" />;
}

interface SubheadingProps {
  children: React.ReactNode;
}

export function Subheading({ children }: SubheadingProps) {
  return (
    <p className="pt-1 text-[11px] font-black uppercase tracking-[0.14em] text-black/35">
      {children}
    </p>
  );
}
