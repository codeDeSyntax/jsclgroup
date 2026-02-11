"use client";

import Image from "next/image";

interface Partner {
  name: string;
  logo: string;
  category: string;
}

const partners: Partner[] = [
  {
    name: "Emirates",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/2560px-Emirates_logo.svg.png",
    category: "Airlines",
  },
  {
    name: "Booking.com",
    logo: "https://cf.bstatic.com/static/img/booking_logo_knowledge_graph/247454a990efac1952e44dddbf30c58677aa0fd8.png",
    category: "Travel",
  },
  {
    name: "Airbnb",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png",
    category: "Accommodation",
  },

  {
    name: "Turkish Airlines",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Turkish_Airlines_logo_2019_compact.svg/2560px-Turkish_Airlines_logo_2019_compact.svg.png",
    category: "Airlines",
  },
  {
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png",
    category: "Electronics",
  },
  {
    name: "Sony",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/2560px-Sony_logo.svg.png",
    category: "Electronics",
  },
];

export default function PartnersSection() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-white via-brand-orange/10 to-white">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-navy/5 rounded-full mb-4 sm:mb-6 border border-brand-navy/10">
            <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-semibold text-brand-navy uppercase tracking-wider">
              Trusted Partners
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium text-brand-navy mb-3 sm:mb-4 tracking-tight">
            Global Partnerships
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            Collaborating with industry leaders to bring you the best
            experiences
          </p>
        </div>

        {/* Logos Grid with Infinite Scroll Effect - Enhanced Mobile */}
        <div className="relative">
          {/* First Row - Scroll Right */}
          <div className="mb-4 sm:mb-6 lg:mb-8 overflow-hidden">
            <div className="flex gap-4 sm:gap-6 lg:gap-8 xl:gap-12 animate-scroll-right">
              {[...partners.slice(0, 6), ...partners.slice(0, 6)].map(
                (partner, index) => (
                  <div
                    key={`${partner.name}-${index}`}
                    className="flex-shrink-0 group"
                  >
                    <div className="relative w-24 h-16 sm:w-32 sm:h-20 lg:w-40 lg:h-24  rounded-lg sm:rounded-xl p-2 sm:p-4 lg:p-6 shadow-sm hover:shadow-lg sm:hover:shadow-xl transition-all duration-500 flex items-center justify-center border border-gray-100 hover:border-brand-orange/20 hover:scale-105 sm:hover:scale-110">
                      <div className="relative w-full h-full">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                          sizes="(max-width: 640px) 96px, (max-width: 1024px) 128px, 160px"
                        />
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Second Row - Scroll Left */}
          <div className="overflow-hidden">
            <div className="flex gap-4 sm:gap-6 lg:gap-8 xl:gap-12 animate-scroll-left">
              {[...partners.slice(3, 9), ...partners.slice(3, 9)].map(
                (partner, index) => (
                  <div
                    key={`${partner.name}-${index}`}
                    className="flex-shrink-0 group"
                  >
                    <div className="relative w-24 h-16 sm:w-32 sm:h-20 lg:w-40 lg:h-24 rounded-lg sm:rounded-xl p-2 sm:p-4 lg:p-6 shadow-sm hover:shadow-lg sm:hover:shadow-xl transition-all duration-500 flex items-center justify-center border border-gray-100 hover:border-brand-orange/20 hover:scale-105 sm:hover:scale-110">
                      <div className="relative w-full h-full">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                          sizes="(max-width: 640px) 96px, (max-width: 1024px) 128px, 160px"
                        />
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes scroll-left {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        .animate-scroll-right:hover,
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }

        /* Slower animation on mobile for better UX */
        @media (max-width: 640px) {
          .animate-scroll-right {
            animation-duration: 50s;
          }
          .animate-scroll-left {
            animation-duration: 50s;
          }
        }
      `}</style>
    </section>
  );
}
