"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroMeshPattern from "./hero-mesh-pattern";

export default function HeroSection2() {
  const [activeImage, setActiveImage] = useState(0);

  const appliances = [
    {
      name: "Refrigerator",
      image:
        "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778761897/Ashfridge_wvsbqv.png",
      description: "Reliable cooling for modern homes",
    },
    {
      name: "Blender",
      image:
        "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778761897/powerful-metallic-silver-blender-with-sleek-design-smooth-blending-transparent-background_1059034-40329-removebg-preview_r3irun.png",
      description: "Everyday power for fast prep",
    },
    {
      name: "Flat Screen TV",
      image:
        "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778761898/flatscreen_ebhsbj.png",
      description: "Sharp viewing for work and play",
    },
    {
      name: "Standing Fan",
      image:
        "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778761898/standing_fan_mzwgrz.png",
      description: "Comfort that keeps every room moving",
    },
  ];

  // Auto-rotate images every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % appliances.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-jcl-white overflow-hidden">
      {/* Mesh pattern behind hero content */}
      <HeroMeshPattern
        holes={[
          { x: 18, y: 36, r: 18 },
          { x: 62, y: 58, r: 16 },
        ]}
        colorClass="text-jcl-primary/8"
        className="z-0"
      />
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out;
        }
      `}</style>

      {/* Hero Container */}
      <div className="min-h-screen flex items-center relative z-10 pt-20 sm:pt-24 lg:pt-28">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Side - Image */}
              <div className="relative order-2 lg:order-1 flex justify-center items-center">
                <div className="relative h-[280px] sm:h-[350px] md:h-[420px] lg:h-[480px] w-full max-w-[300px] sm:max-w-[380px] md:max-w-[450px]">
                  {/* Image with scale animation */}
                  <div
                    key={activeImage}
                    className="relative w-full h-full animate-scale-in"
                  >
                    <Image
                      src={appliances[activeImage].image}
                      alt={appliances[activeImage].name}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="order-1 lg:order-2">
                <div className="space-y-6 animate-slide-in-right">
                  {/* Main Heading */}
                  <div>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[0.95] tracking-[-0.08em] text-black mb-2">
                      ELECTRICAL
                    </h1>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] tracking-[-0.08em] text-black">
                      GADGET SALES
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-base sm:text-lg leading-7 sm:leading-8 text-black/85 max-w-xl">
                    Explore our curated selection of electrical gadgets and home
                    appliances, from refrigerators and fans to televisions,
                    kitchen essentials, and everyday devices at competitive
                    prices.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Link
                      href="/products/electronics"
                      className="px-7 sm:px-8 py-3 bg-jcl-accent text-white font-bold text-sm sm:text-base rounded-lg hover:bg-black/90 transition-colors duration-300 inline-flex items-center justify-center"
                    >
                      Explore Products
                    </Link>
                    <Link
                      href="/products/electronics"
                      className="px-7 sm:px-8 py-3 border-2 border-black text-black font-bold text-sm sm:text-base rounded-lg hover:bg-black/5 transition-colors duration-300 inline-flex items-center justify-center"
                    >
                      Shop Electricals
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
