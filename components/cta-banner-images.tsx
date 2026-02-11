"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { realEstateImages, travelImages, gadgetsImages } from "@/lib/images";

const images = [
  ...(realEstateImages.properties || []).slice(0, 2),
  ...(travelImages.packages || []).slice(0, 2),
  ...(gadgetsImages.electronics || []).slice(0, 2),
].filter((img) => img && img.secure_url); // Filter out any null/undefined images

export default function CTABannerImages() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setIsLoading(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Reset loading state when image changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [currentIndex]);

  if (images.length === 0) {
    return (
      <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-brand-navy/20 to-brand-orange/20 flex items-center justify-center">
        <div className="text-center text-brand-navy">
          <div className="w-12 h-12 mx-auto mb-2 opacity-40">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-xs opacity-60">Coming Soon</p>
        </div>
      </div>
    );
  }

  const currentImage = images[currentIndex];
  if (!currentImage?.secure_url) {
    return (
      <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="w-8 h-8 mx-auto mb-2 opacity-40">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-xs">Image not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden">
      {/* Image Container - Mobile Responsive */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src={currentImage.secure_url}
          alt={currentImage.alt || "JCL Services"}
          fill
          className="object-cover sm:object-contain rounded-lg sm:rounded-xl"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          onLoad={() => {
            setIsLoading(false);
            setHasError(false);
          }}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          priority={currentIndex === 0}
        />
      </div>

      {/* Gradient Overlay - Enhanced for Mobile */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 via-brand-navy/10 sm:from-brand-navy/30 sm:via-transparent to-transparent rounded-lg sm:rounded-xl"></div>

      {/* Loading indicator - Show when loading */}
      {(isLoading || hasError) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg sm:rounded-xl z-10">
          {isLoading && !hasError && (
            <div className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin opacity-70"></div>
          )}
          {hasError && (
            <div className="text-center text-gray-500">
              <div className="w-8 h-8 mx-auto mb-1 opacity-40">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-xs">Failed to load</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
