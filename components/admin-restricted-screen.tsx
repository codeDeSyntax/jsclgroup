import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function AdminRestrictedScreen() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).replace(/\//g, ".");

  return (
    <main className="min-h-screen w-full bg-[#f4f3ef] flex items-center justify-center p-4 sm:p-8 select-none">
      {/* Editorial Card matching reference design */}
      <div className="w-full max-w-3xl rounded-[28px] bg-[#e6e4df] p-5 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.06]">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-7 items-center md:items-stretch">
          
          {/* Left: Monochromatic Abstract Wave Artwork */}
          <div className="relative w-full md:w-[240px] lg:w-[260px] aspect-square shrink-0 overflow-hidden rounded-2xl bg-black/5 shadow-xs">
            <Image
              src="/abstract-wave.jpg"
              alt="Administrative Notice Artwork"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right: Content Column */}
          <div className="flex flex-col justify-between flex-1 text-left w-full py-1">
            
            {/* Top metadata line */}
            <div className="flex items-center justify-between gap-2 font-mono text-[11px] font-medium tracking-wider text-black/60 uppercase">
              <span>ADMIN ACCESS</span>
              <span>{currentDate} • RESTRICTED</span>
            </div>

            {/* Main Headline in elegant editorial serif typography */}
            <div className="my-3">
              <h1 className="font-serif text-2xl sm:text-3xl text-gray-950 font-normal leading-[1.2] tracking-tight">
                Pending Fee of GHC 500. Not accessible at the moment.
              </h1>

              <p className="mt-3 text-xs sm:text-[13.5px] leading-relaxed text-gray-700 font-normal">
                Access to the administrative control panel has been temporarily paused pending the clearance of the outstanding fee. Portal management will resume immediately once confirmed.
              </p>
            </div>

            {/* Attribution / Reference line */}
            <div className="space-y-4 pt-1">
              <p className="text-xs font-medium text-gray-600">
                JCL Royal Group Ltd, System Administration
              </p>

              {/* Action Button */}
              <div>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-lg border border-black bg-[#e6e4df] px-5 py-2 text-xs font-semibold text-gray-950 transition hover:bg-black hover:text-white"
                >
                  Return to homepage
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
