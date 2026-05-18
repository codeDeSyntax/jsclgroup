"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Twitter,
} from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { BACKEND_URL } from "@/lib/auth";

type HeaderProps = {
  variant?: "default" | "hero" | "realestate";
};

export default function Header({ variant = "default" }: HeaderProps) {
  const { totalCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ctaMode, setCtaMode] = useState<"whatsapp" | "contact">("whatsapp");
  const [contactPhone, setContactPhone] = useState("2335578609299");
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
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

  // Styling variables for consistent theming
  const isHero = variant === "hero";
  const isRealestate = variant === "realestate";

  // Background colors
  const headerBgClass = isRealestate
    ? "bg-transparent"
    : isHero
      ? "bg-transparent"
      : "bg-transparent";
  const navBarBgClass = isRealestate
    ? "bg-transparent shadow-none"
    : isHero
      ? "bg-jcl-primary shadow-lg rounded-full"
      : "bg-jcl-primary shadow-none rounded-none";

  // Text and icon colors - ensure proper contrast on black backgrounds
  const logoTextClass = isRealestate
    ? "text-black"
    : isHero
      ? "text-white"
      : "text-white";
  const navLinkClass = isRealestate
    ? "text-black/90 hover:text-black hover:bg-black/5"
    : isHero
      ? "text-white/90 hover:text-white hover:bg-white/10"
      : "text-white/90 hover:text-white hover:bg-white/10";
  const iconClass = isRealestate
    ? "text-black/70 hover:text-black hover:bg-black/5"
    : isHero
      ? "text-white/70 hover:text-white hover:bg-white/10"
      : "text-white/70 hover:text-white hover:bg-white/10";
  const hamburgerClass = isRealestate
    ? "text-black hover:text-black/80"
    : isHero
      ? "text-white hover:text-white/80"
      : "text-white hover:text-white/80";

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCtaMode((current) =>
        current === "whatsapp" ? "contact" : "whatsapp",
      );
    }, 9000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchContactPhone = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/settings/contact_phone`);
        if (!res.ok) return;

        const data = await res.json();
        if (data?.data?.value) {
          setContactPhone(String(data.data.value));
        }
      } catch (error) {
        console.error("Failed to fetch contact phone:", error);
      }
    };

    fetchContactPhone();
  }, []);

  const normalizedPhone = contactPhone.replace(/\D/g, "");

  const ctaHref =
    ctaMode === "whatsapp"
      ? `https://wa.me/${normalizedPhone}?text=Hello%20JCL%20Group`
      : "/contact";
  const ctaLabel = ctaMode === "whatsapp" ? "WhatsApp" : "Contact";
  const ctaAriaLabel =
    ctaMode === "whatsapp" ? "Contact us on WhatsApp" : "Go to contact page";
  const ctaButtonClass =
    ctaMode === "whatsapp"
      ? "bg-green-500 hover:bg-green-600"
      : "bg-jcl-orange-500 hover:bg-jcl-orange-600";
  const ctaIcon =
    ctaMode === "whatsapp" ? (
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
        <Image
          src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1778935166/pngtree-whatsapp-icon-new-png-image_6315990_lhujqg.png"
          alt="WhatsApp"
          width={16}
          height={16}
          className="h-4 w-4 rounded-full object-cover"
        />
      </div>
    ) : (
      <MessageCircle size={16} className="text-white" />
    );

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 ${headerBgClass}`}>
      <nav
        className={`mx-auto ${isRealestate ? "max-w-5xl bg-jcl-white" : isHero ? "py-3 px-2 md:px-0 max-w-6xl" : "py- w-full"}`}
      >
        <div
          className={`flex h-14 items-center justify-between px-4 sm:px-6 ${navBarBgClass}`}
        >
          <div className="md:hidden">
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className={`${hamburgerClass} relative -ml-2 flex h-8 w-8 flex-col items-center justify-center p-2 transition-all duration-200 hover:scale-110`}
            >
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? "w-6 translate-y-0.5 rotate-45" : "w-6"
                }`}
              />
              <span
                className={`mt-1.5 block h-0.5 bg-current transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? "w-0 opacity-0" : "w-4"
                }`}
              />
              <span
                className={`mt-1.5 block h-0.5 bg-current transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? "w-6 -translate-y-2 -rotate-45" : "w-5"
                }`}
              />
            </button>
          </div>

          <Link href="/" className="mr-8 flex items-center gap-3">
            <div className="relative h-8 w-8 overflow-hidden rounded-xl bg-white/95 shadow-md ring-2 ring-white/20 backdrop-blur-sm">
              <Image
                src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1778910277/logo_wrfy8c.png"
                alt="JCL Group Logo"
                fill
                className="h-full w-full object-fill p-1"
                priority
              />
            </div>
            <span
              className={`hidden text-base font-extrabold tracking-tighter sm:inline ${logoTextClass}`}
            >
              JCL Group
            </span>
          </Link>

          <div className="hidden flex-1 items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={ ` ${link.label === "Contact" && "hidden"}  ${link.label === "Home" && "hidden"} rounded-lg px-3 py-2 text-sm font-thin transition-all duration-200 ${
                  isActiveRoute(link.href)
                    ? isHero
                      ? "bg-white/10 text-white"
                      : "bg-white/10 text-white"
                    : navLinkClass
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="ml-6 hidden items-center gap-2 lg:flex">
            <a
              href="https://web.facebook.com/profile.php?id=61580477670825"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={`rounded-lg p-1.5 transition-all duration-200 hover:scale-110 ${iconClass}`}
            >
              <Facebook size={16} />
            </a>
            <a
              href="https://www.instagram.com/rsgroupghana/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={`rounded-lg p-1.5 transition-all duration-200 hover:scale-110 ${iconClass}`}
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://x.com/Jclgroup3"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className={`rounded-lg p-1.5 transition-all duration-200 hover:scale-110 ${iconClass}`}
            >
              <Twitter size={16} />
            </a>
            <a
              href="tel:+1234567890"
              aria-label="Call us"
              className={`rounded-lg p-1.5 transition-all duration-200 hover:scale-110 ${iconClass}`}
            >
              <Phone size={16} />
            </a>
            <a
              href="https://www.linkedin.com/company/rs-group-of-companies-limited/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={`rounded-lg p-1.5 transition-all duration-200 hover:scale-110 ${iconClass}`}
            >
              <Linkedin size={16} />
            </a>
          </div>

          <div className="ml-2 hidden items-center gap-3 lg:flex">
            <Link href="/cart" aria-label="View cart" className="relative">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-black/10 text-white transition hover:scale-105">
                <ShoppingCart className="h-4 w-4 text-white" />
              </div>
              {/* badge */}
              {totalCount > 0 && (
                <span className="absolute -right-2 -top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-semibold text-white">
                  {totalCount}
                </span>
              )}
            </Link>
          </div>

          <a
            href={ctaHref}
            target={ctaMode === "whatsapp" ? "_blank" : undefined}
            rel={ctaMode === "whatsapp" ? "noopener noreferrer" : undefined}
            className={`group ml-4 hidden h-11  shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl px-4 text-sm font-medium text-white shadow-md ring-2 ring-white/20 transition-all duration-500 hover:scale-105 hover:shadow-lg sm:flex ${ctaButtonClass}`}
            aria-label={ctaAriaLabel}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center transition-transform duration-500 ease-in-out group-hover:scale-110">
              {ctaIcon}
            </span>
            <span className="w-[70px] text-left transition-all duration-500 ease-in-out">
              {ctaLabel}
            </span>
          </a>
        </div>
      </nav>

      <div
        className={`md:hidden fixed inset-0 z-50 bg-jcl-primary text-white transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col px-5 pb-4 pt-5 sm:px-6">
          <div className="flex items-start justify-between">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <div className="relative h-9 w-9 overflow-hidden rounded-lg bg-white/95 ring-1 ring-white/20">
                <Image
                  src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1778910277/logo_wrfy8c.png"
                  alt="JCL Group Logo"
                  fill
                  className="object-fill p-1.5"
                  priority
                />
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="rounded-full border border-white/15 p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <span className="sr-only">Close</span>
              <div className="relative h-5 w-5">
                <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 -rotate-45 bg-current" />
              </div>
            </button>
          </div>

          <div className="mt-16 flex flex-1 flex-col justify-start">
            <div className="space-y-3">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActiveRoute(item.href) ? "page" : undefined}
                  className={`block rounded-2xl px-1 py-1 transition-all duration-200 ${
                    isActiveRoute(item.href)
                      ? "bg-white/10 text-white ring-1 ring-white/15"
                      : "text-white"
                  }`}
                >
                  <span className={`  block  text-[clamp(2.25rem,9vw,4rem)] font-light leading-none tracking-[-0.04em]`}>
                    {item.label}
                  </span>
                </Link>
              ))}

              <a
                href={`https://wa.me/${normalizedPhone}?text=Hello%20JCL%20Group`}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-white/10 bg-white/5 px-1 py-1 transition-all duration-200 hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-3 text-[clamp(1.2rem,5vw,1.9rem)] font-semibold tracking-[-0.03em] text-white">
                  <MessageCircle size={18} />
                  <span>WhatsApp</span>
                </span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 border-t border-white/10 pt-3 text-sm font-medium text-white/85">
         
            <a
              href="mailto:joelokornoe97@gmail.com"
              className="flex items-center justify-center gap-2 py-4 transition hover:bg-white/5"
            >
              <Mail size={16} />
              <span>Mail</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
