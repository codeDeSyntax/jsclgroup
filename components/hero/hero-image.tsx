"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

interface HeroImageProps {
  heroImages: string[];
}

export default function HeroImage({ heroImages }: HeroImageProps) {
  const activeImage = useSelector((state: RootState) => state.hero.activeImage);
  const currentImage =
    heroImages[activeImage % heroImages.length] ?? heroImages[0];

  return (
    <div className="block sm:hidden mt-5 rounded-2xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeImage + "-mobile"}
          className="w-full bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${currentImage})`,
            minHeight: "11rem",
            backgroundSize: "cover",
          }}
          initial={{
            opacity: 0,
            scale: 1.06,
            filter: "blur(10px)",
          }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.03, filter: "blur(6px)" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>
    </div>
  );
}
