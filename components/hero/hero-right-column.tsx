"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setActiveImage } from "@/store/heroSlice";
import type { RootState } from "@/store";
import HeroQuickContact from "./hero-quick-contact";
import { contactInfo } from "@/lib/contact";

interface HeroRightColumnProps {
  heroImages: string[];
}

export default function HeroRightColumn({ heroImages }: HeroRightColumnProps) {
  const dispatch = useDispatch();
  const activeImage = useSelector((state: RootState) => state.hero.activeImage);
  const ctaMode = useSelector((state: RootState) => state.hero.ctaMode);
  const contactPhone = useSelector(
    (state: RootState) => state.hero.contactPhone,
  );

  const normalizedPhone = (contactPhone || contactInfo.phone).replace(
    /\D/g,
    "",
  );
  const ctaHref =
    ctaMode === "whatsapp"
      ? `https://wa.me/${normalizedPhone}?text=Hello%20JCL%20Group`
      : "/contact";
  const ctaLabel = ctaMode === "whatsapp" ? "WhatsApp" : "Contact";
  const ctaButtonClass =
    ctaMode === "whatsapp"
      ? "bg-green-500 hover:bg-green-600"
      : "bg-jcl-orange-500 hover:bg-jcl-orange-600";
  const ctaIcon =
    ctaMode === "whatsapp" ? (
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15">
        <Image
          src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1778935166/pngtree-whatsapp-icon-new-png-image_6315990_lhujqg.png"
          alt="WhatsApp"
          width={14}
          height={14}
          className="h-3.5 w-3.5 rounded-full object-cover"
        />
      </div>
    ) : (
      <MessageCircle size={14} className="text-white" />
    );

  const currentImage =
    heroImages[activeImage % heroImages.length] ?? heroImages[0];

  return (
    <div className="grid h-full min-h-0 gap-4 lg:grid-rows-[3fr_1fr]">
      {/* Hero Image */}
      <div className="hidden sm:block relative order-first lg:order-none min-h-[11rem] sm:min-h-[14rem] md:min-h-[18rem] lg:min-h-0 overflow-hidden rounded-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${currentImage})`,
            }}
            initial={{ opacity: 0, scale: 1.1, filter: "blur(18px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.08, filter: "blur(14px)" }}
            transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>

        <div className="absolute top-4 right-4 z-20">
          <Link
            href={ctaHref}
            target={ctaMode === "whatsapp" ? "_blank" : undefined}
            rel={ctaMode === "whatsapp" ? "noopener noreferrer" : undefined}
            className={`flex items-center gap-2 rounded-full ${ctaButtonClass} px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-colors`}
          >
            {ctaIcon}
            <span className="hidden sm:inline">{ctaLabel}</span>
          </Link>
        </div>

        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-2 backdrop-blur-md">
          {heroImages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => dispatch(setActiveImage(index))}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === activeImage ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
              aria-label={`Show hero image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Quick Contact Card */}
      <HeroQuickContact
        ctaHref={ctaHref}
        ctaMode={ctaMode}
        ctaLabel={ctaLabel}
        ctaIcon={ctaIcon}
        ctaButtonClass={ctaButtonClass}
      />
    </div>
  );
}
