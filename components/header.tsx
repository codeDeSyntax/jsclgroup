"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  ChevronRight,
  Crown,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Phone,
  Home,
  Briefcase,
  Users,
  Mail,
  Zap,
  Building2,
  MapPin,
} from "lucide-react";
import { heroImages, featuredImages, getRandomImage } from "../lib/images";

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imageIndices, setImageIndices] = useState({
    first: 0,
    second: 1,
    third: 2,
  });
  const [imageTransitions, setImageTransitions] = useState({
    first: true,
    second: true,
    third: true,
  });
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Get showcase images for mobile menu
  const showcaseImages = [
    ...heroImages.realEstate,
    ...heroImages.travel,
    ...heroImages.gadgets,
    ...featuredImages.realEstate,
    ...featuredImages.gadgets,
  ];

  // Staggered image switching effect with smooth transitions
  useEffect(() => {
    if (!mobileMenuOpen || showcaseImages.length === 0) return;

    // Function to switch a specific image with animation
    const switchImage = (imageKey: "first" | "second" | "third") => {
      // Start fade out
      setImageTransitions((prev) => ({ ...prev, [imageKey]: false }));

      // After fade out, change image and fade in
      setTimeout(() => {
        setImageIndices((prev) => ({
          ...prev,
          [imageKey]: (prev[imageKey] + 3) % showcaseImages.length,
        }));
        setTimeout(() => {
          setImageTransitions((prev) => ({ ...prev, [imageKey]: true }));
        }, 100);
      }, 400);
    };

    // Staggered intervals with natural, undeterministic timing
    const intervals = [
      setInterval(() => switchImage("first"), 6000 + Math.random() * 2000), // 6-8 seconds
      setTimeout(() => {
        setInterval(() => switchImage("second"), 7000 + Math.random() * 2000); // 7-9 seconds
      }, 2000), // Start after 2 seconds
      setTimeout(() => {
        setInterval(() => switchImage("third"), 5500 + Math.random() * 3000); // 5.5-8.5 seconds
      }, 4000), // Start after 4 seconds
    ];

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, [mobileMenuOpen, showcaseImages.length]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const divisions = [
    {
      name: "Electrical Gadgets",
      href: "/gadgets",
      description: "Latest tech & innovative electronics",
    },
    {
      name: "Real Estate",
      href: "/real-estate",
      description: "Premium properties & investments",
    },
    {
      name: "Travel & Tours",
      href: "/travel",
      description: "Unforgettable journeys worldwide",
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between h-16 bg-brand-orange px-4 sm:px-6 rounded-full shadow-lg shadow-brand-orange/20 backdrop-blur-sm">
          {/* Mobile Menu Container - includes button and dropdown */}
          <div ref={mobileMenuRef} className="md:hidden">
            {/* Mobile Menu Button - Modern Hamburger Design */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-white/80 p-2 -ml-2 relative w-8 h-8 flex flex-col justify-center items-center transition-all duration-200 hover:scale-110"
            >
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? "w-6 rotate-45 translate-y-0.5" : "w-6"
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ease-in-out mt-1.5 ${
                  mobileMenuOpen ? "w-0 opacity-0" : "w-4"
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ease-in-out mt-1.5 ${
                  mobileMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-5"
                }`}
              />
            </button>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mr-8">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-md bg-white/95 backdrop-blur-sm ring-2 ring-white/20">
              <Image
                src="https://res.cloudinary.com/dqidnnssq/image/upload/v1770810231/jcllogo_rj8hvw.jpg"
                alt="JCL Group Logo"
                fill
                className="object-contain p-1.5"
                sizes="44px"
                priority
              />
            </div>
            <span className="font-bold text-xl text-white hidden sm:inline tracking-tight drop-shadow-sm">
              JCL Group
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 flex-1">
            {/* Divisions Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center gap-1.5 text-white/90 hover:text-white transition-all duration-200 text-sm font-medium py-2 px-1 rounded-lg hover:bg-white/10"
                onMouseEnter={() => setActiveDropdown("divisions")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                Divisions
                <ChevronDown
                  size={16}
                  className="transition-transform duration-200 group-hover:rotate-180"
                />
              </button>

              {activeDropdown === "divisions" && (
                <div
                  className="absolute left-0 top-full pt-3 w-80 z-50"
                  onMouseEnter={() => setActiveDropdown("divisions")}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 backdrop-blur-xl">
                    {divisions.map((division, idx) => (
                      <Link
                        key={division.href}
                        href={division.href}
                        className="block px-5 py-3.5 hover:bg-brand-orange/5 transition-all duration-200 group/item rounded-xl mx-2"
                      >
                        <div className="font-semibold text-sm text-brand-navy mb-1 group-hover/item:text-brand-orange transition-colors">
                          {division.name}
                        </div>
                        <div className="text-xs text-gray-500 group-hover/item:text-gray-600 transition-colors">
                          {division.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="h-5 w-px bg-white/20"></div>

            <Link
              href="/services"
              className="text-white/90 hover:text-white transition-all duration-200 text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/10"
            >
              Services
            </Link>

            <Link
              href="/about"
              className="text-white/90 hover:text-white transition-all duration-200 text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/10"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-white/90 hover:text-white transition-all duration-200 text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/10"
            >
              Contact
            </Link>
          </div>

          {/* Social Icons */}
          <div className="hidden lg:flex items-center gap-2 ml-6">
            <a
              href="https://web.facebook.com/profile.php?id=61580477670825"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white/70 hover:text-white transition-all duration-200 p-1.5 rounded-lg hover:bg-white/10 hover:scale-110"
            >
              <Facebook size={16} />
            </a>

            <a
              href="https://www.instagram.com/rsgroupghana/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/70 hover:text-white transition-all duration-200 p-1.5 rounded-lg hover:bg-white/10 hover:scale-110"
            >
              <Instagram size={16} />
            </a>

            <a
              href="https://x.com/rsgroupgh?s=09"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="text-white/70 hover:text-white transition-all duration-200 p-1.5 rounded-lg hover:bg-white/10 hover:scale-110"
            >
              <Twitter size={16} />
            </a>

            <a
              href="https://api.whatsapp.com/send?phone=233556463076&text=Hello%2C%20I%20clicked%20the%20link%20on%20the%20RS%20Group%20of%20Companies%20website%20and%20would%20like%20to%20speak%20with%20a%20representative%20to%20seek%20assistance%20and%20make%20an%20enquiry."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-white/70 hover:text-white transition-all duration-200 p-1.5 rounded-lg hover:bg-white/10 hover:scale-110"
            >
              <Phone size={16} />
            </a>

            <a
              href="https://www.linkedin.com/company/rs-group-of-companies-limited/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/70 hover:text-white transition-all duration-200 p-1.5 rounded-lg hover:bg-white/10 hover:scale-110"
            >
              <Linkedin size={16} />
            </a>
          </div>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-brand-navy text-white rounded-xl hover:bg-brand-navy/90 hover:scale-105 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg ml-4 ring-2 ring-white/20"
          >
            <Crown size={16} className="text-brand-orange" />
            Get Quote
          </Link>
        </div>
      </nav>

      {/* Mobile Menu - Two Column Layout */}
      <div
        className={`md:hidden border-t border-gray-100 bg-[#fee9df] overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-screen opacity-100 transform translate-y-0" : "max-h-0 opacity-0 transform -translate-y-2"} rounded-b-2xl md:rounded-b-none shadow`}
      >
        <div
          className={`grid grid-cols-2 gap-4 px-4 py-6 transition-all duration-300 delay-75 ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        >
          {/* Left Column - Menu Items */}
          <div className="space-y-2 pr-2">
            <Link
              href="/"
              className="flex items-center justify-between px-3 py-3 text-sm font-medium text-gray-700 hover:bg-brand-navy/8 hover:text-brand-navy rounded-xl transition-all duration-200 group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <Home
                  size={16}
                  className="text-gray-500 group-hover:text-brand-navy transition-colors"
                />
                <span>Home</span>
              </div>
              <ChevronRight
                size={14}
                className="text-gray-400 group-hover:text-brand-navy transition-colors"
              />
            </Link>

            <div className="px-1 py-1">
              <div className="flex items-center gap-2 px-2 py-1 text-xs font-bold text-brand-navy mb-1">
                <Building2 size={14} className="text-brand-orange" />
                <span>Divisions</span>
              </div>
              <div className="ml-1 space-y-1">
                {divisions.map((division) => {
                  const divisionIcons = {
                    "/gadgets": Zap,
                    "/real-estate": Building2,
                    "/travel": MapPin,
                  };
                  const IconComponent =
                    divisionIcons[
                      division.href as keyof typeof divisionIcons
                    ] || Building2;

                  return (
                    <Link
                      key={division.href}
                      href={division.href}
                      className="flex items-center justify-between px-2 py-2 text-xs text-gray-600 hover:text-brand-navy hover:bg-brand-navy/5 rounded-lg transition-all duration-200 group"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        <IconComponent
                          size={12}
                          className="text-gray-400 group-hover:text-brand-navy transition-colors"
                        />
                        <span className="text-xs leading-tight">
                          {division.name.split(" ")[0]}
                          <br />
                          <span className="text-[10px] opacity-70">
                            {division.name.split(" ").slice(1).join(" ")}
                          </span>
                        </span>
                      </div>
                      <ChevronRight
                        size={12}
                        className="text-gray-300 group-hover:text-brand-navy transition-colors"
                      />
                    </Link>
                  );
                })}
              </div>
            </div>

            <Link
              href="/services"
              className="flex items-center justify-between px-3 py-3 text-sm font-medium text-gray-700 hover:bg-brand-navy/8 hover:text-brand-navy rounded-xl transition-all duration-200 group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <Briefcase
                  size={16}
                  className="text-gray-500 group-hover:text-brand-navy transition-colors"
                />
                <span>Services</span>
              </div>
              <ChevronRight
                size={14}
                className="text-gray-400 group-hover:text-brand-navy transition-colors"
              />
            </Link>

            <Link
              href="/about"
              className="flex items-center justify-between px-3 py-3 text-sm font-medium text-gray-700 hover:bg-brand-navy/8 hover:text-brand-navy rounded-xl transition-all duration-200 group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <Users
                  size={16}
                  className="text-gray-500 group-hover:text-brand-navy transition-colors"
                />
                <span>About</span>
              </div>
              <ChevronRight
                size={14}
                className="text-gray-400 group-hover:text-brand-navy transition-colors"
              />
            </Link>

            <Link
              href="/contact"
              className="flex items-center justify-between px-3 py-3 text-sm font-medium text-gray-700 hover:bg-brand-navy/8 hover:text-brand-navy rounded-xl transition-all duration-200 group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <Mail
                  size={16}
                  className="text-gray-500 group-hover:text-brand-navy transition-colors"
                />
                <span>Contact</span>
              </div>
              <ChevronRight
                size={14}
                className="text-gray-400 group-hover:text-brand-navy transition-colors"
              />
            </Link>

            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 mt-4 px-3 py-3 bg-brand-navy text-white rounded-xl text-center text-sm font-semibold shadow-lg hover:shadow-xl hover:bg-brand-navy/90 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Crown size={16} className="text-brand-orange" />
              <span>Get Quote</span>
            </Link>
          </div>

          {/* Right Column - Switching Images */}
          <div className="relative flex flex-col gap-2.5 pl-2">
            {showcaseImages.length > 0 && (
              <>
                {/* First Image */}
                <div className="relative h-28 rounded-2xl overflow-hidden shadow-md group">
                  <Image
                    src={
                      showcaseImages[imageIndices.first]?.secure_url ||
                      showcaseImages[imageIndices.first]?.url
                    }
                    alt={showcaseImages[imageIndices.first]?.alt || "Showcase"}
                    fill
                    className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                      imageTransitions.first
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    }`}
                    sizes="150px"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/25 to-transparent transition-opacity duration-500 ${
                      imageTransitions.first ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div
                    className={`absolute bottom-2 left-2 right-2 transition-all duration-500 ${
                      imageTransitions.first
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                    }`}
                  >
                    <p className="text-white text-[10px] font-medium leading-tight drop-shadow-md">
                      {showcaseImages[imageIndices.first]?.category
                        ?.replace(/([A-Z])/g, " $1")
                        .trim()}
                    </p>
                  </div>
                </div>

                {/* Second Image */}
                <div className="relative h-28 rounded-2xl overflow-hidden shadow-md group">
                  <Image
                    src={
                      showcaseImages[imageIndices.second]?.secure_url ||
                      showcaseImages[imageIndices.second]?.url
                    }
                    alt={showcaseImages[imageIndices.second]?.alt || "Showcase"}
                    fill
                    className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                      imageTransitions.second
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    }`}
                    sizes="150px"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/25 to-transparent transition-opacity duration-500 ${
                      imageTransitions.second ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div
                    className={`absolute bottom-2 left-2 right-2 transition-all duration-500 ${
                      imageTransitions.second
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                    }`}
                  >
                    <p className="text-white text-[10px] font-medium leading-tight drop-shadow-md">
                      {showcaseImages[imageIndices.second]?.category
                        ?.replace(/([A-Z])/g, " $1")
                        .trim()}
                    </p>
                  </div>
                </div>

                {/* Third Image */}
                <div className="relative h-28 rounded-2xl overflow-hidden shadow-md group">
                  <Image
                    src={
                      showcaseImages[imageIndices.third]?.secure_url ||
                      showcaseImages[imageIndices.third]?.url
                    }
                    alt={showcaseImages[imageIndices.third]?.alt || "Showcase"}
                    fill
                    className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                      imageTransitions.third
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    }`}
                    sizes="150px"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/25 to-transparent transition-opacity duration-500 ${
                      imageTransitions.third ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div
                    className={`absolute bottom-2 left-2 right-2 transition-all duration-500 ${
                      imageTransitions.third
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                    }`}
                  >
                    <p className="text-white text-[10px] font-medium leading-tight drop-shadow-md">
                      {showcaseImages[imageIndices.third]?.category
                        ?.replace(/([A-Z])/g, " $1")
                        .trim()}
                    </p>
                  </div>
                </div>

                {/* Visual indicators - animated dots */}
                <div className="flex justify-center gap-1.5 mt-2">
                  {[
                    imageIndices.first,
                    imageIndices.second,
                    imageIndices.third,
                  ].map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 w-1.5 rounded-full transition-all duration-700 ease-out ${
                        imageTransitions[
                          ["first", "second", "third"][
                            index
                          ] as keyof typeof imageTransitions
                        ]
                          ? "bg-brand-navy scale-125 shadow-sm"
                          : "bg-gray-300 scale-100"
                      }`}
                      style={{
                        animationDelay: `${index * 150}ms`,
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
