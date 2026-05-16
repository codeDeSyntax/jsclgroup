"use client";

import Image from "next/image";

type WhyChooseUsImagesProps = {
  label: string;
  description: string;
  imageSrc?: string;
  alt?: string;
  placeholderTone?: "warm" | "cool";
};

export default function WhyChooseUsImages({
  label,
  description,
  imageSrc,
  alt,
  placeholderTone = "warm",
}: WhyChooseUsImagesProps) {
  const toneClasses =
    placeholderTone === "warm"
      ? "from-[#ead9c7] via-[#f3ede5] to-[#d7c1aa]"
      : "from-[#d8dfe8] via-[#eef1f5] to-[#c7d0dd]";

  return (
    <div className="relative h-full min-h-[280px] overflow-hidden rounded-[24px]">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={alt || label}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${toneClasses}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.65),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.35),transparent_48%)]" />
          <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:22px_22px]" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <h3 className="text-base font-medium text-white sm:text-lg">{label}</h3>
        <p className="mt-2 max-w-sm text-sm leading-6 text-white/80">
          {description}
        </p>
      </div>
    </div>
  );
}
