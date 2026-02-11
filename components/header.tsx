"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  Crown,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Phone,
} from "lucide-react";

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-50 backdrop-blur-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-600 hover:text-brand-navy p-2 -ml-2"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mr-8">
            <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-brand-orange font-bold text-xl tracking-tight">
                JCL
              </span>
            </div>
            <span className="font-bold text-xl text-brand-navy hidden sm:inline tracking-tight">
              JCL Group
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 flex-1">
            {/* Divisions Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center gap-1.5 text-gray-700 hover:text-brand-navy transition-colors text-sm font-semibold py-2"
                onMouseEnter={() => setActiveDropdown("divisions")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                Divisions
                <ChevronDown
                  size={16}
                  className="transition-transform group-hover:rotate-180"
                />
              </button>

              {activeDropdown === "divisions" && (
                <div
                  className="absolute left-0 top-full pt-2 w-80"
                  onMouseEnter={() => setActiveDropdown("divisions")}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="bg-white rounded-xl shadow-2xl border border-gray-100 py-2">
                    {divisions.map((division, idx) => (
                      <Link
                        key={division.href}
                        href={division.href}
                        className="block px-4 py-3 hover:bg-brand-navy/5 transition-colors group/item"
                      >
                        <div className="font-semibold text-sm text-brand-navy mb-1 group-hover/item:text-brand-orange transition-colors">
                          {division.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {division.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="h-5 w-px bg-gray-200"></div>

            <Link
              href="/services"
              className="text-gray-700 hover:text-brand-navy transition-colors text-sm font-semibold"
            >
              Services
            </Link>

            <Link
              href="/about"
              className="text-gray-700 hover:text-brand-navy transition-colors text-sm font-semibold"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-gray-700 hover:text-brand-navy transition-colors text-sm font-semibold"
            >
              Contact
            </Link>
          </div>

          {/* Social Icons (replaces search input) */}
          <div className="hidden lg:flex items-center gap-3 ml-6">
            <a
              href="https://web.facebook.com/profile.php?id=61580477670825"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-600 hover:text-brand-navy transition-colors"
            >
              <Facebook size={18} />
            </a>

            <a
              href="https://www.instagram.com/rsgroupghana/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-600 hover:text-brand-navy transition-colors"
            >
              <Instagram size={18} />
            </a>

            <a
              href="https://x.com/rsgroupgh?s=09"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="text-gray-600 hover:text-brand-navy transition-colors"
            >
              <Twitter size={18} />
            </a>

            <a
              href="https://api.whatsapp.com/send?phone=233556463076&text=Hello%2C%20I%20clicked%20the%20link%20on%20the%20RS%20Group%20of%20Companies%20website%20and%20would%20like%20to%20speak%20with%20a%20representative%20to%20seek%20assistance%20and%20make%20an%20enquiry."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-gray-600 hover:text-brand-navy transition-colors"
            >
              <Phone size={18} />
            </a>

            <a
              href="https://www.linkedin.com/company/rs-group-of-companies-limited/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-600 hover:text-brand-navy transition-colors"
            >
              <Linkedin size={18} />
            </a>
          </div>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-brand-navy text-white rounded-lg hover:bg-brand-navy/90 transition-all text-sm font-semibold shadow-sm hover:shadow-md ml-6"
          >
            <Crown size={16} className="text-brand-orange" />
            Get Quote
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-4 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-base font-semibold text-gray-700 hover:bg-brand-navy/5 hover:text-brand-navy rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            <div className="px-3 py-2">
              <div className="text-sm font-bold text-brand-navy mb-2">
                Divisions
              </div>
              {divisions.map((division) => (
                <Link
                  key={division.href}
                  href={division.href}
                  className="block px-3 py-2 text-sm text-gray-600 hover:text-brand-navy"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {division.name}
                </Link>
              ))}
            </div>

            <Link
              href="/services"
              className="block px-3 py-2 text-base font-semibold text-gray-700 hover:bg-brand-navy/5 hover:text-brand-navy rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>

            <Link
              href="/about"
              className="block px-3 py-2 text-base font-semibold text-gray-700 hover:bg-brand-navy/5 hover:text-brand-navy rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            <Link
              href="/contact"
              className="block px-3 py-2 text-base font-semibold text-gray-700 hover:bg-brand-navy/5 hover:text-brand-navy rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            <Link
              href="/contact"
              className="block mt-4 px-4 py-3 bg-brand-navy text-white rounded-lg text-center font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
