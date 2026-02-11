import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  ArrowRight,
  Home,
  Plane,
  Zap,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23200070' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 py-12 md:py-16">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-gradient-to-br from-brand-orange to-red-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">JCL</span>
              </div>
              <div>
                <span className="font-bold text-xl text-brand-navy">
                  JCL Group
                </span>
                <p className="text-xs text-gray-500">
                  Excellence in Every Division
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed max-w-md">
              Leading multi-division company delivering exceptional services
              across real estate, travel & tours, and electronics sectors. Your
              trusted partner for quality and innovation.
            </p>

            {/* Social Links */}
            <div className="flex gap-2.5">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 bg-brand-navy/5 rounded-lg flex items-center justify-center hover:bg-brand-orange hover:scale-105 transition-all duration-300 border border-brand-navy/10 hover:border-brand-orange group"
                >
                  <social.icon
                    size={16}
                    className="text-brand-navy group-hover:text-white transition-colors"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base mb-5 text-brand-navy">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Products", href: "/products" },
                { label: "Contact", href: "/contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-brand-orange transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={13}
                      className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Divisions */}
          <div>
            <h3 className="font-bold text-base mb-5 text-brand-navy">
              Our Divisions
            </h3>
            <ul className="space-y-3">
              {[
                {
                  label: "Real Estate",
                  href: "/properties",
                  icon: Home,
                  color: "text-brand-navy",
                },
                {
                  label: "Travel & Tours",
                  href: "/travel",
                  icon: Plane,
                  color: "text-brand-navy",
                },
                {
                  label: "Electronics",
                  href: "/products",
                  icon: Zap,
                  color: "text-brand-orange",
                },
              ].map((division, index) => (
                <li key={index}>
                  <Link
                    href={division.href}
                    className="flex items-center gap-2.5 text-gray-600 hover:text-brand-navy transition-colors group"
                  >
                    <div className="w-7 h-7 bg-brand-navy/5 rounded-lg flex items-center justify-center group-hover:bg-brand-orange/10 transition-colors border border-brand-navy/5">
                      <division.icon size={14} className={division.color} />
                    </div>
                    <span className="text-sm">{division.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-base mb-5 text-brand-navy">
              Get in Touch
            </h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5 group">
                <div className="w-9 h-9 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-orange transition-colors border border-brand-orange/20">
                  <Phone
                    size={14}
                    className="text-brand-orange group-hover:text-white transition-colors"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Call Us</p>
                  <a
                    href="tel:+233-123-456-789"
                    className="text-brand-navy hover:text-brand-orange transition-colors text-sm font-medium"
                  >
                    +233 123 456 789
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5 group">
                <div className="w-9 h-9 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-orange transition-colors border border-brand-orange/20">
                  <Mail
                    size={14}
                    className="text-brand-orange group-hover:text-white transition-colors"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Email Us</p>
                  <a
                    href="mailto:info@jclgroup.com"
                    className="text-brand-navy hover:text-brand-orange transition-colors text-sm font-medium"
                  >
                    info@jclgroup.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5 group">
                <div className="w-9 h-9 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-orange transition-colors border border-brand-orange/20">
                  <MapPin
                    size={14}
                    className="text-brand-orange group-hover:text-white transition-colors"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Visit Us</p>
                  <span className="text-brand-navy text-sm">
                    Accra, Ghana
                    <br />
                    West Africa
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} JCL Group. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-brand-navy transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 hover:text-brand-navy transition-colors text-sm"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-gray-500 hover:text-brand-navy transition-colors text-sm"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
