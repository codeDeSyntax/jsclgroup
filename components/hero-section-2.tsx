"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlignLeft,
  ArrowUpRight,
  ChevronRight,
  Home,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";
import HeroMeshPattern from "./hero-mesh-pattern";
import { useMobileMenu } from "@/contexts/mobile-menu-context";
import { contactInfo } from "@/lib/contact";
import { BACKEND_URL } from "@/lib/auth";

export default function HeroSection2() {
  const pathname = usePathname();
  const { mobileMenuOpen, setMobileMenuOpen } = useMobileMenu();
  const [activeImage, setActiveImage] = useState(0);
  const [fetchedProducts, setFetchedProducts] = useState<any[]>([]);

  const appliances = [
    {
      id: "appliances",
      name: "Refrigerator",
      image:
        "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778761897/Ashfridge_wvsbqv.png",
      description: "Reliable cooling for modern homes",
    },
    {
      id: "appliances",
      name: "Blender",
      image:
        "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778761897/powerful-metallic-silver-blender-with-sleek-design-smooth-blending-transparent-background_1059034-40329-removebg-preview_r3irun.png",
      description: "Everyday power for fast prep",
    },
    {
      id: "appliances",
      name: "Flat Screen TV",
      image:
        "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778761898/flatscreen_ebhsbj.png",
      description: "Sharp viewing for work and play",
    },
    {
      id: "appliances",
      name: "Standing Fan",
      image:
        "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778761898/standing_fan_mzwgrz.png",
      description: "Comfort that keeps every room moving",
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/public/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const payload = await res.json();
        const items = Array.isArray(payload.data) ? payload.data : [];
        if (items.length > 0) {
          // Shuffle and pick products that have an image
          const randomized = [...items]
            .sort(() => 0.5 - Math.random())
            .filter((p) => p.image);
          if (randomized.length > 0) {
            setFetchedProducts(randomized.slice(0, 8));
          }
        }
      } catch (err) {
        console.error("Error fetching homepage hero products:", err);
      }
    };
    void fetchProducts();
  }, []);

  const currentItems = fetchedProducts.length > 0 ? fetchedProducts : appliances;

  // Auto-rotate images every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % currentItems.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [currentItems.length]);

  const navLinks = [
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

  const whatsappHref = `https://wa.me/${(contactInfo.phone).replace(/\D/g, "")}?text=Hello%20JCL%20Group`;

  return (
    <section className="relative min-h-screen overflow-hidden bg-jcl-white px-2 pb-10 pt-2 sm:pt-0 text-jcl-primary sm:px-3 sm:py-3">
      <div className="pointer-events-none absolute left-6 top-7 hidden text-jcl-primary/10 sm:block">
        <Sparkles className="h-10 w-10 fill-jcl-primary/10 stroke-[3]" />
      </div>

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out;
        }
      `}</style>

      {/* Desktop editorial canvas */}
      <div className="relative mx-auto hidden min-h-[calc(100vh-1.5rem)] w-full max-w-[94rem] items-stretch sm:grid">
        <div className="flex min-h-[calc(100vh-1.5rem)] flex-col rounded-[28px] border border-black/5 bg-jcl-white p-3 relative overflow-hidden text-black shadow-xl">
          {/* Mesh pattern background inside card canvas */}
          <HeroMeshPattern
            holes={[
              { x: 18, y: 36, r: 18 },
              { x: 62, y: 58, r: 16 },
            ]}
            colorClass="text-jcl-primary/8"
            className="z-0"
          />

          {/* Canvas header navigation */}
          <div className="flex h-10 items-center justify-between z-10 relative">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <span className="relative h-8 w-8 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/10">
                  <Image
                    src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1778869865/jcllogo_rj8hvw-removebg-preview_csqvsg.png"
                    alt="JCL Group Logo"
                    fill
                    className="h-full w-full object-fill p-1"
                    priority
                  />
                </span>
                <span className="hidden text-sm font-extrabold tracking-tighter text-jcl-primary sm:inline">
                  JCL Royal Group Ltd
                </span>
              </Link>
            </div>

            <nav className="flex items-center rounded-full bg-black/[0.03] px-2 py-1">
              {navLinks.slice(0, 5).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3 py-1 text-[11px] transition ${
                    isActiveRoute(link.href)
                      ? "bg-jcl-primary text-white shadow-sm"
                      : "text-jcl-primary/45 hover:text-jcl-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-[11px] text-jcl-primary hover:bg-black/[0.03] transition"
            >
              Contact
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Core Content Grid */}
          <div className="mt-12 grid flex-1 grid-cols-[minmax(0,1fr)_clamp(150px,16vw,260px)] gap-5 z-10 relative">
            <div>
              <div className="flex items-start gap-4">
                <h1 className="max-w-[74rem] text-[clamp(4.25rem,8.6vw,9.2rem)] font-thin leading-[0.84] tracking-[-0.085em] text-jcl-primary">
                  Electrical
                  <br />
                  <span className="font-normal">gadget</span> sales
                </h1>
                <div className="mt-3 max-w-[320px] text-sm leading-6 text-jcl-primary/70 flex flex-col gap-4">
                  <p>
                    Explore our curated selection of electrical gadgets and home
                    appliances, from refrigerators and fans to televisions, kitchen
                    essentials, and everyday devices.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Link
                      href="/products/electronics"
                      className="inline-flex items-center gap-1 rounded-full bg-jcl-accent px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-black/90 transition shadow-md shadow-jcl-accent/20"
                    >
                      Explore Appliances
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                    <Link
                      href="/products/electronics"
                      className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/40 px-4 py-2 text-xs font-bold uppercase tracking-wider text-jcl-primary hover:bg-white hover:border-black/30 transition shadow-sm"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/products/electronics"
              className="group relative flex min-h-[clamp(132px,18vh,210px)] flex-col justify-end overflow-hidden rounded-xl bg-jcl-primary p-5 text-white shadow-lg"
            >
              <ArrowUpRight className="absolute right-3 top-3 h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <p className="max-w-[12rem] text-2xl font-light leading-tight">
                Modern essentials for comfortable living
              </p>
            </Link>
          </div>

          {/* Bottom Grid and Showcase */}
          <div className="mt-5 grid grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] gap-3 z-10 relative">
            <div className="flex h-[clamp(220px,32vh,360px)] flex-col justify-end overflow-hidden rounded-xl border border-black/5 bg-jcl-primary/5 backdrop-blur-md p-6">
              <p className="text-3xl font-light leading-tight text-jcl-primary">
                Available now in Ghana.
              </p>
              <p className="mt-2 text-2xl font-thin leading-tight text-jcl-primary/70">
                Premium electrical brands with secure payment and local delivery support.
              </p>
            </div>

            <div className="relative grid grid-cols-2 gap-2 h-[clamp(220px,32vh,360px)] overflow-hidden rounded-xl bg-black/[0.025] border border-black/5 p-2 backdrop-blur-sm">
              {[0, 1].map((idx) => {
                const itemIndex = (activeImage + idx) % currentItems.length;
                const item = currentItems[itemIndex];
                if (!item) return null;
                return (
                  <Link
                    key={item.id && item.id !== "appliances" ? `${item.id}-${idx}` : `${item.name}-${idx}`}
                    href={
                      item.id && item.id !== "appliances"
                        ? `/products/${item.id}`
                        : "/products/electronics"
                    }
                    className="relative flex h-full min-w-0 flex-col items-center justify-center rounded-lg bg-white p-3 hover:scale-[1.02] transition-all duration-300 border border-black/5 group"
                  >
                    <div className="relative w-full h-[70%] max-h-[180px] flex items-center justify-center mt-2">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain filter drop-shadow-md"
                        priority
                      />
                    </div>
                    
                    <div className="mt-2 w-full text-center">
                      <p className="text-[11px] font-bold text-slate-900 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-jcl-accent font-semibold mt-0.5">
                        {typeof item.price === "number"
                          ? `₵${item.price.toFixed(2)}`
                          : String(item.price || "Check Price")}
                      </p>
                    </div>
                  </Link>
                );
              })}

              {/* Slider Dots */}
              <div className="absolute bottom-4 right-4 flex rounded-full bg-white/40 backdrop-blur-md p-1 shadow-lg border border-black/5 z-20">
                {currentItems.map((item, index) => (
                  <button
                    key={item.id && item.id !== "appliances" ? item.id : item.name}
                    onClick={() => setActiveImage(index)}
                    aria-label={`Show slide ${index + 1}`}
                    className={`mx-0.5 h-1.5 rounded-full transition-all duration-300 ${
                      index === activeImage ? "bg-jcl-primary w-3.5" : "bg-jcl-primary/30 hover:bg-jcl-primary/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Footer Line */}
          <div className="mt-4 flex items-center justify-between text-[11px] text-jcl-primary/55 z-10 relative">
            <div className="flex gap-2">
              <Link
                href="/products/electronics"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/10 hover:bg-black/[0.03] text-jcl-primary transition"
                aria-label="Tonefo"
              >
                <Home className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/10 hover:bg-black/[0.03] text-jcl-primary transition"
                aria-label="Contact"
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/products/electronics"
                className="self-center font-semibold text-jcl-primary hover:underline transition"
              >
                Request service info
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
              className="font-medium underline underline-offset-4 text-jcl-primary/80 hover:text-jcl-primary"
            >
              Have questions about items? Ask our team now
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

        {/* Product Card Container on Mobile */}
        <div className="rounded-[24px] bg-jcl-white p-3 shadow-[0_20px_48px_rgba(7,13,75,0.12)] relative overflow-hidden border border-black/5 text-jcl-primary min-h-[480px] flex flex-col justify-between">
          <HeroMeshPattern
            holes={[{ x: 50, y: 50, r: 24 }]}
            colorClass="text-jcl-primary/5"
            className="z-0"
          />

          <div className="relative z-10 flex flex-col h-full justify-between flex-1">
            <div>
              <p className="px-1 text-xs italic font-bold text-jcl-primary/45">
                Welcome to JCL Royal Group Limited
              </p>
              <h1 className="mt-1 px-1 text-[3.45rem] font-thin leading-[0.9] tracking-[-0.075em] text-jcl-primary">
                Electrical gadget sales
              </h1>
            </div>

            <div className="relative mt-4 min-h-[300px] overflow-hidden rounded-xl bg-black/[0.025] flex items-center justify-center p-4 border border-black/5">
              <Link
                href={
                  currentItems[activeImage]?.id && currentItems[activeImage]?.id !== "appliances"
                    ? `/products/${currentItems[activeImage].id}`
                    : "/products/electronics"
                }
                className="relative h-[250px] w-[250px] flex items-center justify-center"
              >
                <div key={activeImage} className="relative w-full h-full animate-scale-in">
                  <Image
                    src={currentItems[activeImage]?.image || currentItems[0].image}
                    alt={currentItems[activeImage]?.name || "Product"}
                    fill
                    className="object-contain filter drop-shadow-md"
                    priority
                  />
                </div>
              </Link>

              {/* Slider Dots */}
              <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 rounded-full bg-white/60 backdrop-blur-md p-1.5 shadow border border-black/5 z-20">
                {currentItems.map((item, index) => (
                  <button
                    key={`${item.id && item.id !== "appliances" ? item.id : item.name}-mobile`}
                    onClick={() => setActiveImage(index)}
                    aria-label={`Show slide ${index + 1}`}
                    className={`mx-0.5 h-1.5 rounded-full transition-all duration-300 ${
                      index === activeImage ? "bg-jcl-primary w-3.5" : "bg-jcl-primary/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] bg-white p-7 shadow-[0_20px_48px_rgba(7,13,75,0.10)] text-jcl-primary">
          <h2 className="text-[2.8rem] font-thin leading-[0.92] tracking-[-0.07em] text-jcl-primary">
            Everyday gadgets, sourced with care.
          </h2>
          <p className="mt-4 text-sm leading-6 text-jcl-primary/50">
            Explore quality-sourced kitchen appliances, home entertainment systems,
            refrigerators, and fans at competitive local prices.
          </p>
          <Link
            href="/products/electronics"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-jcl-accent px-5 py-3 text-sm font-semibold text-white shadow-md shadow-jcl-accent/20"
          >
            Explore Electronics
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
