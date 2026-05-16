"use client";

import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  adminGhostButtonClass,
  adminPrimaryButtonClass,
  adminSectionClass,
  adminSelectClass,
  adminTextareaClass,
} from "@/lib/admin-form-styles";

export function AdminFormLoading({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-black/[0.06] bg-black/[0.01]">
      <Loader2 className="h-8 w-8 animate-spin text-jcl-black/70" />
      <p className="text-sm font-medium text-jcl-black/70">{label}</p>
    </div>
  );
}

export function AdminFormError({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-red-200/80 bg-red-50/90 px-4 py-3 text-sm text-red-800 sm:px-5 sm:py-4"
    >
      {message}
    </div>
  );
}

export function AdminFormLayout({
  backHref,
  backLabel,
  title,
  description,
  error,
  children,
}: {
  backHref: string;
  backLabel: string;
  title: string;
  description?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-3xl pb-24 lg:max-w-4xl lg:pb-8">
      <Link
        href={backHref}
        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-jcl-black/70 transition hover:text-jcl-black"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>

      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-black tracking-[-0.04em] text-jcl-black sm:text-3xl md:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt- max-w-xl text-sm leading-relaxed text-jcl-black/65 sm:text-base">
            {description}
          </p>
        ) : (
          ""
        )}
      </header>

      {error ? (
        <div className="mb-6">
          <AdminFormError message={error} />
        </div>
      ) : null}

      {children}
    </div>
  );
}

export function AdminFormSection({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn(adminSectionClass, className)}>
      <div className="border-b border-black/[0.02] px-4 py-4 sm:px-6 sm:py-5">
        <h2 className="text-base font-bold tracking-tight text-jcl-black sm:text-lg">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 text-xs text-jcl-black/60 sm:text-sm">
            {description}
          </p>
        ) : null}
      </div>
      <div className="space-y-5 px-4 py-5 sm:space-y-6 sm:px-6 sm:py-6">
        {children}
      </div>
    </section>
  );
}

export function AdminFormField({
  label,
  htmlFor,
  required,
  hint,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label
        htmlFor={htmlFor}
        className="text-xs font-semibold uppercase tracking-[0.12em] text-jcl-black/65"
      >
        {label}
        {required ? <span className="text-jcl-black"> *</span> : null}
      </Label>
      {children}
      {hint ? (
        <p className="text-xs leading-relaxed text-jcl-black/55">{hint}</p>
      ) : null}
    </div>
  );
}

export function AdminFormSelect(
  props: React.SelectHTMLAttributes<HTMLSelectElement>,
) {
  return (
    <select {...props} className={cn(adminSelectClass, props.className)} />
  );
}

export function AdminFormTextarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea {...props} className={cn(adminTextareaClass, props.className)} />
  );
}

export function AdminFormActions({
  isSubmitting,
  submitLabel,
  savingLabel = "Saving…",
  cancelHref,
  cancelLabel = "Cancel",
}: {
  isSubmitting: boolean;
  submitLabel: string;
  savingLabel?: string;
  cancelHref: string;
  cancelLabel?: string;
}) {
  return (
    <div className="mt-6 border-t border-black/[0.06] px-0 py-4">
      <div className="mx-auto flex max-w-3xl flex-col-reverse gap-2 sm:flex-row sm:items-center sm:gap-3 lg:max-w-4xl">
        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn("h-11 w-full sm:w-auto", adminPrimaryButtonClass)}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {savingLabel}
            </>
          ) : (
            submitLabel
          )}
        </Button>
        <Link href={cancelHref} className="w-full sm:w-auto">
          <Button
            type="button"
            variant="outline"
            className={cn("h-11 w-full", adminGhostButtonClass)}
          >
            {cancelLabel}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export function AdminListItem({
  children,
  onRemove,
  removeLabel = "Remove",
}: {
  children: React.ReactNode;
  onRemove: () => void;
  removeLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-black/[0.03] bg-transparent p-3 sm:flex-row sm:items-start sm:justify-between sm:p-4">
      <div className="min-w-0 flex-1 text-sm text-jcl-black/80 flex flex-wrap items-center gap-2 whitespace-normal">
        {children}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onRemove}
        className="shrink-0 h-8 rounded-full border border-black/[0.06] text-jcl-black hover:bg-black/[0.03] hover:text-jcl-black"
      >
        {removeLabel}
      </Button>
    </div>
  );
}
