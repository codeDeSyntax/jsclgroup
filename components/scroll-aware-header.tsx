"use client";

import { useEffect, useState } from "react";
import Header from "./header";
import { useMobileMenu } from "@/contexts/mobile-menu-context";

export default function ScrollAwareHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const { mobileMenuOpen } = useMobileMenu();
  const [heroForcesShow, setHeroForcesShow] = useState(false);

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
  // Also ensure the header is visible when hero-section-2 is active.
  // Listen for the `activeHeroChanged` custom event emitted by the
  // switcher so we react immediately when the hero switches.
  useEffect(() => {
    const handler = () => {
      try {
        setHeroForcesShow(document?.body?.dataset?.activeHero === "1");
      } catch (e) {
        setHeroForcesShow(false);
      }
    };

    // initialize from existing dataset (SSR-safe)
    handler();

    window.addEventListener("activeHeroChanged", handler);
    return () => window.removeEventListener("activeHeroChanged", handler);
  }, []);

  const shouldShow = isVisible || mobileMenuOpen || heroForcesShow;

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
