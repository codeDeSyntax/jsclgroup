"use client";

import { useEffect, useState } from "react";
import Header from "./header";
import { useMobileMenu } from "@/contexts/mobile-menu-context";

export default function ScrollAwareHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const { mobileMenuOpen } = useMobileMenu();

  useEffect(() => {
    const handleScroll = () => {
      // Show header after scrolling past hero + watermark (approximately 100vh)
      const heroAndWatermarkHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > heroAndWatermarkHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Make the header visible if we've scrolled past the hero OR the mobile menu is open.
  const shouldShow = isVisible || mobileMenuOpen;

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        shouldShow ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <Header variant="hero" />
    </div>
  );
}
