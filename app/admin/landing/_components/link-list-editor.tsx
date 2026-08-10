"use client";

import { Plus, Trash2, ArrowUp, ArrowDown, Link as LinkIcon } from "lucide-react";
import { TextInput } from "./section-editor";

export interface NavLink {
  label: string;
  href: string;
}

interface LinkListEditorProps {
  label: string;
  links: NavLink[];
  onChange: (links: NavLink[]) => void;
  hint?: string;
}

export default function LinkListEditor({
  label,
  links,
  onChange,
  hint,
}: LinkListEditorProps) {
  const update = (index: number, field: keyof NavLink, value: string) => {
    const next = links.map((l, i) =>
      i === index ? { ...l, [field]: value } : l,
    );
    onChange(next);
  };

  const remove = (index: number) => {
    onChange(links.filter((_, i) => i !== index));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const next = [...links];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next);
  };

  const moveDown = (index: number) => {
    if (index === links.length - 1) return;
    const next = [...links];
    [next[index + 1], next[index]] = [next[index], next[index + 1]];
    onChange(next);
  };

  const add = () => {
    onChange([...links, { label: "", href: "" }]);
  };

  return (
    <div className="space-y-3">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-black/50">
          {label}
        </p>
        {hint && <p className="mt-0.5 text-[11px] text-black/35">{hint}</p>}
      </div>

      <div className="space-y-3">
        {links.map((link, idx) => (
          <div
            key={idx}
            className="group relative space-y-3 rounded-2xl border border-black/[0.08] bg-[#f8f8fa] p-3.5 sm:p-4 transition-all hover:border-black/15"
          >
            {/* Header bar with badge and action controls */}
            <div className="flex items-center justify-between gap-2 border-b border-black/[0.05] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="flex h-6 items-center gap-1 rounded-md bg-black/5 px-2 text-[10px] font-bold text-black/60">
                  <LinkIcon className="h-3 w-3 text-black/40" />
                  Link #{idx + 1}
                </span>
                {link.label && (
                  <span className="truncate text-xs font-semibold text-black/70 max-w-[120px] sm:max-w-[200px]">
                    {link.label}
                  </span>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveUp(idx)}
                  disabled={idx === 0}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-black/10 bg-white text-black/50 shadow-2xs transition hover:bg-black/5 hover:text-black disabled:opacity-25"
                  title="Move Up"
                  aria-label="Move up"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(idx)}
                  disabled={idx === links.length - 1}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-black/10 bg-white text-black/50 shadow-2xs transition hover:bg-black/5 hover:text-black disabled:opacity-25"
                  title="Move Down"
                  aria-label="Move down"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-red-200/80 bg-red-50 text-red-500 transition hover:bg-red-100"
                  title="Remove Link"
                  aria-label="Remove link"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Input fields grid */}
            <div className="grid gap-3 sm:grid-cols-[1fr_1.5fr]">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-black/40">
                  Link Title / Label
                </label>
                <TextInput
                  value={link.label}
                  onChange={(e) => update(idx, "label", e.target.value)}
                  placeholder="e.g. Real Estate"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-black/40">
                  Target Path or URL
                </label>
                <TextInput
                  value={link.href}
                  onChange={(e) => update(idx, "href", e.target.value)}
                  placeholder="e.g. /properties or https://..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="mt-1 inline-flex items-center gap-2 rounded-xl border border-dashed border-black/20 px-4 py-2.5 text-xs font-semibold text-black/60 transition hover:border-black/40 hover:text-black shadow-2xs"
      >
        <Plus className="h-3.5 w-3.5" />
        Add Link Item
      </button>
    </div>
  );
}
