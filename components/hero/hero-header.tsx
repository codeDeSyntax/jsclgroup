"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useMobileMenu } from "@/contexts/mobile-menu-context";

interface HeroHeaderProps {
  navLinks: Array<{ label: string; href: string }>;
  isActiveRoute: (href: string) => boolean;
}

export default function HeroHeader({ navLinks, isActiveRoute }: HeroHeaderProps) {
  const { mobileMenuOpen, setMobileMenuOpen } = useMobileMenu();

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3 justify-between w-full lg:w-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 self-start">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white/95 shadow-md ring-2 ring-white/20 backdrop-blur-sm">
            <Image
              src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1778910277/logo_wrfy8c.png"
              alt="JCL Group Logo"
              fill
              className="h-full w-full object-fill p-1"
              priority
            />
          </div>
          <span className="hidden text-lg font-extrabold tracking-tighter text-white sm:inline">
            JCL Group
          </span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white hover:text-white/80 transition-colors"
          aria-label="Toggle mobile menu"
          type="button"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex flex-wrap items-center justify-end gap-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
              isActiveRoute(link.href)
                ? "bg-white text-jcl-primary"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
