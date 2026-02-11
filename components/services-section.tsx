"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plane,
  MapPin,
  Users,
  Building2,
  FileText,
  ArrowRight,
} from "lucide-react";
import { travelImages } from "@/lib/images";

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  imageUrl: string;
}

const services: Service[] = [
  {
    id: "flights",
    icon: <Plane className="w-6 h-6" />,
    title: "Flight Bookings & Reservations",
    description:
      "Book local and international flights at the best rates. We help you find the perfect schedule and fare fast, easy, and hassle-free.",
    imageUrl: travelImages.hero[0]?.secure_url || "",
  },
  {
    id: "tours",
    icon: <MapPin className="w-6 h-6" />,
    title: "Tour Packages",
    description:
      "Explore curated tours that blend culture, adventure, and relaxation. Discover Ghana's hidden gems or travel internationally with expertly crafted itineraries.",
    imageUrl: travelImages.packages[0]?.secure_url || "",
  },
  {
    id: "corporate",
    icon: <Users className="w-6 h-6" />,
    title: "Corporate & Group Travel",
    description:
      "From corporate events to group getaways, we design structured travel solutions that keep your team organized, comfortable, and on schedule.",
    imageUrl: travelImages.destinations[0]?.secure_url || "",
  },
  {
    id: "hotels",
    icon: <Building2 className="w-6 h-6" />,
    title: "Hotel & Accommodation Services",
    description:
      "We partner with trusted hotels worldwide to secure clean, safe, and comfortable accommodations suited to your budget and preferences.",
    imageUrl: travelImages.destinations[1]?.secure_url || "",
  },
  {
    id: "visa",
    icon: <FileText className="w-6 h-6" />,
    title: "Visa & Travel Assistance",
    description:
      "From documentation to compliance, our team guides you through every step of the visa process to ensure smooth and stress-free travel.",
    imageUrl: travelImages.packages[1]?.secure_url || "",
  },
];

export default function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on client side
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-rotate featured service every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setFeaturedIndex((prev) => (prev + 1) % services.length);
        setIsTransitioning(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const featuredService = services[featuredIndex];

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden bg-gradient-to-b from-brand-white via-brand-orange/5 to-white">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title - Enhanced Mobile Responsiveness */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
            <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-semibold text-brand-navy uppercase tracking-wider">
              What We Offer
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-brand-navy mb-3 sm:mb-4 tracking-tight">
            Our Services
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            Experience world-class service across every journey
          </p>
        </div>

        {/* Two Column Layout - Enhanced Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-8 xl:gap-12 items-center">
          {/* Left: Auto-Rotating Featured Card - Mobile Optimized */}
          <div
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl hover:shadow-xl sm:hover:shadow-3xl transition-all duration-700 transform hover:scale-[1.01] sm:hover:scale-[1.02]"
            onMouseEnter={() => setHoveredCard(featuredService.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
              >
                <Image
                  src={featuredService.imageUrl}
                  alt={featuredService.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              {/* Content - Mobile Responsive */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 lg:p-8 xl:p-10">
                <div
                  className={`transform transition-all duration-500 group-hover:-translate-y-1 sm:group-hover:-translate-y-2 ${
                    isTransitioning
                      ? "opacity-0 translate-y-4 sm:translate-y-8"
                      : "opacity-100 translate-y-0"
                  }`}
                >
                  <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 bg-white/20 backdrop-blur-md rounded-full mb-4 sm:mb-6 border border-white/20">
                    <div className="text-white">{featuredService.icon}</div>
                    <span className="text-white text-xs sm:text-sm font-semibold">
                      Featured
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-3 sm:mb-4">
                    {featuredService.title}
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base lg:text-lg max-w-lg mb-4 sm:mb-6 leading-relaxed">
                    {featuredService.description}
                  </p>
                  <button className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-brand-navy rounded-full font-semibold hover:bg-brand-orange hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base min-h-[44px]">
                    Learn More
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Progress Indicators - Touch Optimized */}
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setFeaturedIndex(index);
                        setIsTransitioning(false);
                      }, 300);
                    }}
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 min-w-[44px] sm:min-w-0 ${
                      index === featuredIndex
                        ? "w-6 sm:w-8 bg-white"
                        : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Overlapping Cards Stack - Mobile Responsive */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] perspective-1000 mt-8 lg:mt-0">
            <div className="relative h-full flex flex-col justify-center px-2 sm:px-4">
              {services
                .filter((s) => s.id !== featuredService.id)
                .map((service, index) => (
                  <div
                    key={service.id}
                    className="group absolute w-full transition-all duration-500 ease-out will-change-transform"
                    style={{
                      top: `${index * (isMobile ? 20 : 18)}%`,
                      zIndex: hoveredCard === service.id ? 50 : 10 - index,
                      transform:
                        hoveredCard === service.id
                          ? "scale(1.02) translateY(-4px) rotate(0deg)"
                          : `translateY(${index * (isMobile ? 2 : 4)}px) rotate(${
                              index % 2 === 0
                                ? isMobile
                                  ? -2
                                  : -3
                                : isMobile
                                  ? 2
                                  : 3
                            }deg)`,
                      animationName: "slideInRight",
                      animationDuration: "0.8s",
                      animationTimingFunction: "ease-out",
                      animationDelay: `${index * 0.15}s`,
                      animationFillMode: "backwards",
                    }}
                    onMouseEnter={() => setHoveredCard(service.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 bg-white">
                      {/* Card Content - Mobile Optimized */}
                      <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 p-4 sm:p-6 lg:p-8">
                        {/* Image Thumbnail - Responsive Sizing */}
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden ring-2 ring-brand-orange/20">
                          <Image
                            src={service.imageUrl}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 112px"
                          />
                        </div>

                        {/* Text Content - Mobile Responsive */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <div className="p-1.5 sm:p-2.5 bg-brand-orange/10 rounded-md sm:rounded-lg flex-shrink-0 transition-all duration-300 group-hover:bg-brand-orange group-hover:scale-110">
                              <div className="text-brand-orange group-hover:text-white transition-colors">
                                {React.cloneElement(
                                  service.icon as React.ReactElement<any>,
                                  {
                                    className:
                                      "w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6",
                                  } as any,
                                )}
                              </div>
                            </div>
                            <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-brand-navy line-clamp-2 group-hover:text-brand-orange transition-colors">
                              {service.title}
                            </h3>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2">
                            {service.description}
                          </p>
                        </div>

                        {/* Arrow Icon - Hidden on small mobile */}
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 hidden sm:block">
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange" />
                        </div>
                      </div>

                      {/* Accent Border */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange via-brand-navy to-brand-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
