"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import HeroMeshPattern from "./hero-mesh-pattern";
import HeroHeader from "./hero/hero-header";
import HeroContent from "./hero/hero-content";
import HeroImage from "./hero/hero-image";
import HeroStats from "./hero/hero-stats";
import HeroRightColumn from "./hero/hero-right-column";
import { BACKEND_URL } from "@/lib/auth";
import { contactInfo } from "@/lib/contact";
import { setActiveImage, setCtaMode, setContactPhone } from "@/store/heroSlice";
import type { RootState, AppDispatch } from "@/store";

const desktopHeroImages = [
  "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779141605/image_mo2c4a.png",
  "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778744174/download_1_zlxwgi.jpg",
  "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779220660/heroslide1_zu4ir8.jpg",
  "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779220660/heroslide3_zurc6j.jpg",
  "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779220660/heroslide4_tibcil.jpg",
  "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779220660/heroslide2_evnnt6.jpg",
];

const mobileHeroImages = [
  "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779094334/h14_ydoyxe.png",
  "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779089309/h13_aegefd.png",
  "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779095349/h15_k5hyga.png",
];

const heroImageCount = Math.max(
  desktopHeroImages.length,
  mobileHeroImages.length,
);

export default function HeroSection1() {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const backgroundVideoUrl =
    "https://res.cloudinary.com/dlhyawc5e/video/upload/v1779283268/projectvideo_bnftd9.mp4";

  const { activeImage, ctaMode } = useSelector(
    (state: RootState) => state.hero,
  );

  useEffect(() => {
    const fetchContactPhone = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/settings/contact_phone`);
        if (!res.ok) return;

        const data = await res.json();
        if (data?.data?.value) {
          dispatch(setContactPhone(String(data.data.value)));
        } else {
          dispatch(setContactPhone(contactInfo.phone));
        }
      } catch (error) {
        console.error("Failed to fetch contact phone:", error);
        dispatch(setContactPhone(contactInfo.phone));
      }
    };

    fetchContactPhone();
  }, [dispatch]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      dispatch(setActiveImage((activeImage + 1) % heroImageCount));
    }, 6800);

    return () => window.clearInterval(intervalId);
  }, [activeImage, dispatch]);

  useEffect(() => {
    const ctaIntervalId = window.setInterval(() => {
      dispatch(setCtaMode(ctaMode === "whatsapp" ? "contact" : "whatsapp"));
    }, 9000);

    return () => window.clearInterval(ctaIntervalId);
  }, [ctaMode, dispatch]);

  const navLinks = [
    { label: "Tonefo", href: "/products/electronics" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="relative w-full min-h-[75vh] sm:min-h-[85vh] md:h-screen overflow-x-hidden bg-jcl-white">
      <HeroMeshPattern
        className="absolute inset-0 opacity-100"
        colorClass="text-"
      />

      <div
        className="absolute inset-0"
        style={{
          animation: "fade-in-out 7.5s ease-in-out infinite",
        }}
      >
        <style>{`
          @keyframes fade-in-out {
            0%, 100% { opacity: 0.92; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>

      {/* Hero Section Content */}
      <main className="relative z-20 w-full h-full">
        <section className="relative mx-auto flex h-full w-full max-w-[78rem] items-start sm:items-center overflow-visible bg-transparent px-3 py-0 text-brand-navy sm:px-4 sm:py-4">
          <div className="grid h-full w-full grid-cols-1 items-stretch gap-4 lg:grid-cols-[0.7fr_0.3fr]">
            {/* Left Column: Content (full height) */}
            <div className="relative -mx-3 flex h-full flex-col justify-between overflow-visible rounded-b-3xl rounded-t-none bg-jcl-primary p-4 pb-8 sm:pb-0 sm:mx-0 sm:overflow-hidden sm:rounded-3xl sm:p-6 lg:p-10">
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-b-3xl rounded-t-none sm:rounded-3xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(7,13,75,0.58)_0%,rgba(7,13,75,0.38)_18%,rgba(7,13,75,0.2)_36%,rgba(7,13,75,0)_70%)]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-jcl-primary via-jcl-primary/95 to-jcl-primary/80" />
                <div className="absolute inset-0 bg-gradient-to-l from-jcl-primary/95 via-jcl-primary/72 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-jcl-primary/42" />
                <div
                  className="absolute inset-0 opacity-40 saturate-125 brightness-105 contrast-110"
                  style={{
                    WebkitMaskImage:
                      "radial-gradient(circle at 86% 80%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 20%, rgba(0,0,0,0.72) 40%, rgba(0,0,0,0.22) 66%, rgba(0,0,0,0) 86%)",
                    maskImage:
                      "radial-gradient(circle at 86% 80%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 20%, rgba(0,0,0,0.72) 40%, rgba(0,0,0,0.22) 66%, rgba(0,0,0,0) 86%)",
                  }}
                >
                  <video
                    src={backgroundVideoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>

              <div className="relative z-10 flex h-full flex-col">
                {/* Header with logo and nav */}
                <HeroHeader navLinks={navLinks} isActiveRoute={isActiveRoute} />

                {/* Main content */}
                <div>
                  <HeroContent />

                  {/* Mobile-only hero image */}
                  <HeroImage heroImages={mobileHeroImages} />
                </div>

                {/* Stats */}
                <HeroStats />
              </div>
            </div>

            {/* Right Column */}
            <HeroRightColumn heroImages={desktopHeroImages} />
          </div>
        </section>
      </main>
    </div>
  );
}
