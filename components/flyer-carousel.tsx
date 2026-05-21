"use client";

import Image from "next/image";

const flyers = [
  {
    src: "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779101289/tonefosales1_hwwbvj.jpg",
    alt: "Real estate sales promotion",
  },
  {
    src: "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779101297/tonefosales2_z3irlm.jpg",
    alt: "Property offer campaign visual",
  },
];

export default function FlyerCarousel() {
  return (
    <div className="md:col-span-2">
      <div className="relative overflow-hidden rounded-[20px] bg-jcl-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-3 sm:p-4 lg:p-5">
        <div className="md:hidden">
          <div className="overflow-hidden">
            <div
              className="relative w-full p-3 sm:p-5"
              style={{ aspectRatio: "3 / 4" }}
            >
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[16px] bg-white">
                <Image
                  src={flyers[0].src}
                  alt={flyers[0].alt}
                  fill
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:grid grid-cols-2 gap-2 lg:gap-3 md:h-[44rem] lg:h-[52rem] items-stretch">
          {flyers.map((flyer) => (
            <div
              key={flyer.src}
              className="relative rounded-[18px] bg-white p-2 flex-1 flex items-center justify-center"
            >
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-[14px]">
                <Image
                  src={flyer.src}
                  alt={flyer.alt}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
