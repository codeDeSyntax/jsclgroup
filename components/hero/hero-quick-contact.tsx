"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

interface HeroQuickContactProps {
  ctaHref: string;
  ctaMode: "whatsapp" | "contact";
  ctaLabel: string;
  ctaIcon: React.ReactNode;
  ctaButtonClass: string;
}

export default function HeroQuickContact({
  ctaHref,
  ctaMode,
  ctaLabel,
  ctaIcon,
  ctaButtonClass,
}: HeroQuickContactProps) {
  return (
    <div className="grid min-h-0 gap-2 rounded-2xl border border-black/5 bg-jcl-white p-2.5 sm:p-3 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-3">
      <div className="min-w-0">
        <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-brand-navy/40">
          Quick Contact
        </p>
        <h2 className="mt-1 text-[11px] font-black leading-tight tracking-[-0.03em] text-brand-navy sm:text-xs lg:text-sm">
          Start your search with JCL Group
        </h2>
        <p className="mt-0.5 max-w-full break-words text-[10px] leading-4 text-brand-navy/60 sm:text-[11px]">
          Property, projects, and electronics support.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-1.5  lg:justify-end">
        <Link
          href={ctaHref}
          target={ctaMode === "whatsapp" ? "_blank" : undefined}
          rel={ctaMode === "whatsapp" ? "noopener noreferrer" : undefined}
          className={`inline-flex w-full items-center justify-center gap-1 rounded-full ${ctaButtonClass} px-2.5 py-1.5 text-[10px] font-semibold text-white transition-colors`}
        >
          {ctaIcon}
          <span>{ctaLabel}</span>
        </Link>

        <Link
          href="/contact"
          className="inline-flex w-full items-center justify-center rounded-full border border-black/10 bg-white px-2.5 py-1.5 text-[10px] font-semibold text-brand-navy transition-colors hover:bg-black/5"
        >
          Contact Page
        </Link>
      </div>
    </div>
  );
}
