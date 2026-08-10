"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import {
  AlignLeft,
  ArrowUpRight,
  ChevronRight,
  Home,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";
import { setActiveImage, setCtaMode } from "@/store/heroSlice";
import type { RootState, AppDispatch } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useMobileMenu } from "@/contexts/mobile-menu-context";
import { contactInfo } from "@/lib/contact";
import { useLandingContent } from "@/hooks/use-landing-content";

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
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { mobileMenuOpen, setMobileMenuOpen } = useMobileMenu();
  const { activeImage, ctaMode, contactPhone } = useAppSelector(
    (state: RootState) => state.hero,
  );

  const { hero1, navbar } = useLandingContent();

  const backgroundVideoUrl = hero1.backgroundVideoUrl || "https://res.cloudinary.com/dlhyawc5e/video/upload/v1779283268/projectvideo_bnftd9.mp4";
  const desktopHeroImages = hero1.desktopImages && hero1.desktopImages.length > 0 ? hero1.desktopImages : [
    "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779141605/image_mo2c4a.png",
    "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778744174/download_1_zlxwgi.jpg",
    "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779220660/heroslide1_zu4ir8.jpg",
    "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779220660/heroslide3_zurc6j.jpg",
    "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779220660/heroslide4_tibcil.jpg",
    "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779220660/heroslide2_evnnt6.jpg",
  ];
  const mobileHeroImages = hero1.mobileImages && hero1.mobileImages.length > 0 ? hero1.mobileImages : [
    "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779094334/h14_ydoyxe.png",
    "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779089309/h13_aegefd.png",
    "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779095349/h15_k5hyga.png",
  ];
  const heroImageCount = desktopHeroImages.length;

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      dispatch(setActiveImage((activeImage + 1) % heroImageCount));
    }, 6800);

    return () => window.clearInterval(intervalId);
  }, [activeImage, dispatch, heroImageCount]);

  useEffect(() => {
    const ctaIntervalId = window.setInterval(() => {
      dispatch(setCtaMode(ctaMode === "whatsapp" ? "contact" : "whatsapp"));
    }, 9000);

    return () => window.clearInterval(ctaIntervalId);
  }, [ctaMode, dispatch]);

  const navLinks = navbar.navLinks && navbar.navLinks.length > 0 ? navbar.navLinks.slice(1, 7) : [
    { label: "Tonefo", href: "/products/electronics" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "About us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const desktopImage =
    desktopHeroImages[activeImage % desktopHeroImages.length] ??
    desktopHeroImages[0];
  const desktopImageTwo =
    desktopHeroImages[(activeImage + 2) % desktopHeroImages.length] ??
    desktopHeroImages[1];
  const desktopImageThree =
    desktopHeroImages[(activeImage + 4) % desktopHeroImages.length] ??
    desktopHeroImages[2];
  const mobileImage =
    mobileHeroImages[activeImage % mobileHeroImages.length] ??
    mobileHeroImages[0];
  const mobileImageTwo =
    mobileHeroImages[(activeImage + 1) % mobileHeroImages.length] ??
    mobileHeroImages[1];
  const ctaHref = ctaMode === "whatsapp" ? (hero1.ctaHref1 || "/contact") : (hero1.ctaHref2 || "/services");
  const ctaLabel =
    ctaMode === "whatsapp" ? (hero1.ctaLabel1 || "Request services") : (hero1.ctaLabel2 || "Explore services");
  const normalizedPhone = (contactPhone || navbar.contactPhone || contactInfo.phone).replace(
    /\D/g,
    "",
  );
  const whatsappHref = `https://wa.me/${navbar.whatsappNumber || normalizedPhone}?text=Hello%20JCL%20Group`;

  return (
    <section className="relative min-h-screen overflow-hidden bg-jcl-white px-2 pb-10 pt-2 sm:pt-0 text-jcl-primary sm:px-0 sm:py-0">

      {/* Desktop editorial canvas */}
      <div className="relative mx-auto hidden min-h-screen w-full max-w-none items-stretch sm:grid">
        <div className="flex min-h-screen flex-col rounded-none border-0 bg-slate-950 px-5 py-3 relative overflow-hidden text-white">
          {/* Background Video — full bleed behind all content */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <video
              src={backgroundVideoUrl}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/45 to-slate-950/70 backdrop-blur-[1px]" />
          </div>

          {/* Canvas content wrapped inside z-10 layers */}
          <div className="flex h-10 items-center justify-between z-10 relative">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <span className="relative h-8 w-8 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-white/15">
                  <Image
                    src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1778869865/jcllogo_rj8hvw-removebg-preview_csqvsg.png"
                    alt="JCL Group Logo"
                    fill
                    className="h-full w-full object-fill p-1"
                    priority
                  />
                </span>
                <span className="hidden text-sm font-extrabold tracking-tighter text-white sm:inline">
                  JCL Royal Group Ltd
                </span>
              </Link>
            </div>

            <nav className="flex items-center rounded-full bg-white/5 backdrop-blur-md px-2 py-1 border border-white/5">
              {navLinks.slice(0, 5).map((link: { label: string; href: string }) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3 py-1 text-[11px] transition ${
                    isActiveRoute(link.href)
                      ? "bg-white text-white shadow-sm"
                      : "text-white hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[11px] text-white hover:bg-white/10 transition"
            >
              Contact
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Content: 2-column split — headline left, main cards right */}
          <div className="mt-8 flex flex-1 gap-5 z-10 relative">
            {/* LEFT — headline + description */}
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h1 className="text-[clamp(4rem,8.2vw,9rem)] font-thin leading-[0.84] tracking-[-0.085em] text-white">
                  {hero1.headlineLine1 || "We bring new"}
                  <br />
                  <span className="font-normal">{hero1.headlineLine2 || "evolution of"}</span> {hero1.headlineLine3 || "home"}
                </h1>
                <div className="mt-5 max-w-[280px] text-xs leading-5 text-white/60">
                  {hero1.subtext || "Experience the perfect blend of property care, construction support, and trusted electronics sourcing."}
                </div>
                <Link
                  href={ctaHref}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-jcl-accent px-4 py-2 text-xs font-semibold text-white hover:bg-jcl-accent/90 transition shadow-md shadow-jcl-accent/20"
                >
                  {ctaLabel}
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>

              {/* Bottom info card */}
              <div className="flex h-[clamp(160px,22vh,240px)] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                <p className="text-2xl font-light leading-tight text-white">
                  {hero1.bottomCardLine1 || "Available now in Ghana."}
                </p>
                <p className="mt-1.5 text-lg font-thin leading-tight text-white/60">
                  {hero1.bottomCardLine2 || "Property, construction, and electronics support from one team."}
                </p>
              </div>
            </div>

            {/* RIGHT — side card + tall image showcase stacked */}
            <div className="flex w-[clamp(220px,28vw,420px)] shrink-0 flex-col gap-3">
              <Link
                href="/services"
                className="group relative flex h-[clamp(80px,12vh,140px)] shrink-0 flex-col justify-end overflow-hidden rounded-2xl bg-jcl-primary p-5 text-white"
              >
                <ArrowUpRight className="absolute right-3 top-3 h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <p className="text-xl font-light leading-tight">
                  {hero1.sideCardText || "A room of infinite possibilities"}
                </p>
              </Link>

              {/* Image showcase — tall panel */}
              <div className="relative flex-1 grid grid-cols-2 gap-2 overflow-hidden rounded-2xl bg-white p-2">
                {[desktopImage, desktopImageTwo].map((image, index) => (
                  <div
                    key={`${image}-hero-pair-${index}`}
                    className="relative flex h-full min-w-0 items-center justify-center overflow-hidden rounded-xl bg-white border border-black/5"
                  >
                    <Image
                      src={image}
                      alt={`JCL featured property ${index + 1}`}
                      width={720}
                      height={520}
                      priority={index === 0}
                      className="h-full max-h-full w-full object-contain filter drop-shadow-md"
                    />
                  </div>
                ))}
                {/* Preview strip */}
                <div className="absolute bottom-3 right-3 flex rounded-full bg-black/40 backdrop-blur-md p-1 shadow-lg border border-white/10">
                  {[desktopImage, desktopImageTwo, desktopImageThree].map(
                    (image, index) => (
                      <span
                        key={`${image}-${index}`}
                        className="-ml-2 first:ml-0 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-jcl-white"
                      >
                        <Image
                          src={image}
                          alt={`JCL preview ${index + 1}`}
                          width={40}
                          height={40}
                          className="h-full w-full object-contain"
                        />
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-[11px] text-white/70 z-10 relative">
            <div className="flex gap-2">
              <Link
                href="/products/electronics"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 hover:bg-white/10 text-white transition"
                aria-label="Tonefo"
              >
                <Home className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 hover:bg-white/10 text-white transition"
                aria-label="Contact"
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </Link>
              <Link
                href={ctaHref}
                className="self-center font-semibold text-white hover:underline transition"
              >
                Request services
              </Link>
              <Link
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-green-500 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm transition hover:bg-green-600"
                aria-label="Contact JCL on WhatsApp"
              >
                <Image
                  src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1778935166/pngtree-whatsapp-icon-new-png-image_6315990_lhujqg.png"
                  alt=""
                  width={14}
                  height={14}
                  className="h-3.5 w-3.5 rounded-full object-cover"
                />
                WhatsApp
              </Link>
            </div>
            <Link
              href="/contact"
              className="font-medium underline underline-offset-4 text-white hover:text-white/90"
            >
              Not sure where to start? Talk to us now
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile inspired stack */}
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col gap-3 sm:hidden z-10">
        <div className="flex items-center justify-between px-1 pt-1 text-jcl-primary">
          <Link href="/" className="flex items-center gap-2">
            <span className="relative h-9 w-9 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/10">
              <Image
                src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1778869865/jcllogo_rj8hvw-removebg-preview_csqvsg.png"
                alt="JCL Group Logo"
                fill
                className="h-full w-full object-contain p-1"
                priority
              />
            </span>
            <span className="max-w-[10rem] text-sm font-extrabold leading-tight tracking-tighter text-jcl-primary">
              JCL Royal Group Ltd
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
            className="inline-flex items-center gap-2 rounded-full text-xs text-jcl-primary shadow-sm"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <AlignLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Video Card Container on Mobile */}
        <div className="rounded-[24px] bg-slate-950 p-3 shadow-[0_20px_48px_rgba(7,13,75,0.12)] relative overflow-hidden border border-white/10 text-white min-h-[480px]">
          {/* Background Video inside the mobile card parent */}
          <div className="absolute inset-0 z-0 rounded-[24px] overflow-hidden">
            <video
              src={backgroundVideoUrl}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-slate-950/60" />
          </div>

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <p className="px-1 text-xs italic font-bold text-white/50">
                Welcome to JCL Royal Group Limited
              </p>
              <h1 className="mt-1 px-1 text-[3.45rem] font-thin leading-[0.9] tracking-[-0.075em] text-white">
                Find a property you will be proud to own
              </h1>
            </div>

            <div className="relative mt-4 min-h-[300px] overflow-hidden rounded-xl bg-black/[0.025]">
              <Image
                src={mobileImage}
                alt="JCL mobile hero home"
                fill
                priority
                className="object-cover"
              />
              <span className="absolute left-5 top-24 rounded-full bg-white px-4 py-2 text-xs font-medium text-jcl-primary shadow-md">
                Balcony
              </span>
              <span className="absolute right-5 top-56 rounded-full bg-white px-4 py-2 text-xs font-medium text-jcl-primary shadow-md">
                Main hall
              </span>
              <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 rounded-full bg-white/10 backdrop-blur-md p-1.5 shadow-lg border border-white/10">
                {[mobileImage, mobileImageTwo, desktopImage].map(
                  (image, index) => (
                    <span
                      key={`${image}-mobile-${index}`}
                      className="-ml-2 first:ml-0 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-jcl-white"
                    >
                      <Image
                        src={image}
                        alt={`Mobile preview ${index + 1}`}
                        width={48}
                        height={48}
                        className="h-full w-full object-contain"
                      />
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] bg-white p-7 shadow-[0_20px_48px_rgba(7,13,75,0.10)] text-jcl-primary">
          <h2 className="text-[2.8rem] font-thin leading-[0.92] tracking-[-0.07em] text-jcl-primary">
            A lot can happen with a little space.
          </h2>
          <p className="mt-4 text-sm leading-6 text-jcl-primary/50">
            Property guidance, project support, and trusted electronics for the
            way you live now.
          </p>
          <Link
            href={ctaHref}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-jcl-accent px-5 py-3 text-sm font-semibold text-white shadow-md shadow-jcl-accent/20"
          >
            {ctaLabel}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
