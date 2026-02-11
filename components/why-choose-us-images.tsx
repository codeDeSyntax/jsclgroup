"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { realEstateImages, travelImages, gadgetsImages } from "@/lib/images";

const images = [
  ...(realEstateImages.featured || []).slice(0, 3),
  ...(travelImages.destinations || []).slice(0, 3),
  ...(gadgetsImages.featured || []).slice(0, 2),
];

export default function WhyChooseUsImages() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 300);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  if (images.length === 0) return null;

  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl bg-gray-100">
      {/* Main Image - Responsive */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src={images[currentIndex]?.secure_url || ""}
          alt="JCL Group Services"
          fill
          className="object-cover sm:object-contain"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Gradient Overlay - Mobile Enhanced */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 sm:from-black/30 sm:via-transparent to-transparent"></div>

      {/* Pagination Dots - Touch Optimized */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsTransitioning(false);
              }, 300);
            }}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 min-w-[44px] sm:min-w-0 ${
              index === currentIndex
                ? "w-6 sm:w-8 bg-white"
                : "w-1.5 sm:w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Corner Badge - Mobile Responsive */}
      <div className="absolute top-3 right-3 sm:top-6 sm:right-6 px-2 sm:px-4 py-1 sm:py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
        <span className="text-xs sm:text-sm font-semibold text-brand-orange">
          {currentIndex + 1} / {images.length}
        </span>
      </div>
    </div>
  );
}
