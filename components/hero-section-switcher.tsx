"use client";

import { useState, useEffect } from "react";
import HeroSection1 from "./hero-section-1";
import HeroSection2 from "./hero-section-2";

export default function HeroSectionSwitcher() {
  const [activeHero, setActiveHero] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const heroes = [
    { id: 0, component: HeroSection1, label: "Real Estate" },
    { id: 1, component: HeroSection2, label: "Appliance Sales" },
  ];

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveHero((prev) => (prev + 1) % heroes.length);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  };

  const handlePrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveHero((prev) => (prev - 1 + heroes.length) % heroes.length);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  };

  // Auto-switch every 60 seconds (1 minute)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setActiveHero((prev) => (prev + 1) % heroes.length);
      setTimeout(() => setIsTransitioning(false), 600);
    }, 60000);
    return () => clearInterval(interval);
  }, [heroes.length]);

  const CurrentHeroComponent = heroes[activeHero].component;

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Content with fade animation */}
      <div
        className={`transition-opacity duration-500 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <CurrentHeroComponent />
      </div>
    </div>
  );
}
