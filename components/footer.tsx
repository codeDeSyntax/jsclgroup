import Link from "next/link";
import Image from "next/image";
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
    <section className="py-10 bg-gray-50 sm:pt-16 lg:pt-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <div className="flex items-center gap-3 mb-7">
              <Image
                className="w-auto h-9"
                src="https://res.cloudinary.com/dqidnnssq/image/upload/v1770810231/jcllogo_rj8hvw.jpg"
                alt="JCL Group Logo"
                width={36}
                height={36}
              />
              <span className="font-bold text-xl text-brand-navy">
                JCL Group
              </span>
            </div>

            <p className="text-base leading-relaxed text-gray-600 mt-7">
              Transforming industries through innovation and excellence across
              real estate, travel experiences, and cutting-edge electronics.
              Your trusted partner for quality and innovation.
            </p>

            <ul className="flex items-center space-x-3 mt-9">
              <li>
                <a
                  href="https://web.facebook.com/profile.php?id=61580477670825"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-brand-navy focus:bg-brand-navy"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/rsgroupghana/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-brand-navy focus:bg-brand-navy"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </li>

              <li>
                <a
                  href="https://x.com/rsgroupgh?s=09"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="X (Twitter)"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-brand-navy focus:bg-brand-navy"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </li>

              <li>
                <a
                  href="https://www.linkedin.com/company/rs-group-of-companies-limited/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-brand-navy focus:bg-brand-navy"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Company
            </p>

            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  href="/about"
                  className="flex text-base text-black transition-all duration-200 hover:text-brand-navy focus:text-brand-navy"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/services"
                  className="flex text-base text-black transition-all duration-200 hover:text-brand-navy focus:text-brand-navy"
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  href="/products"
                  className="flex text-base text-black transition-all duration-200 hover:text-brand-navy focus:text-brand-navy"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="flex text-base text-black transition-all duration-200 hover:text-brand-navy focus:text-brand-navy"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Divisions
            </p>

            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  href="/real-estate"
                  className="flex text-base text-black transition-all duration-200 hover:text-brand-orange focus:text-brand-orange"
                >
                  Real Estate
                </Link>
              </li>

              <li>
                <Link
                  href="/travel"
                  className="flex text-base text-black transition-all duration-200 hover:text-brand-orange focus:text-brand-orange"
                >
                  Travel & Tours
                </Link>
              </li>

              <li>
                <Link
                  href="/gadgets"
                  className="flex text-base text-black transition-all duration-200 hover:text-brand-orange focus:text-brand-orange"
                >
                  Electronics
                </Link>
              </li>

              <li>
                <Link
                  href="/properties"
                  className="flex text-base text-black transition-all duration-200 hover:text-brand-orange focus:text-brand-orange"
                >
                  Properties
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Subscribe to newsletter
            </p>

            <form action="#" method="POST" className="mt-6">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-brand-navy caret-brand-navy"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-4 mt-3 font-semibold text-white transition-all duration-200 bg-brand-navy rounded-md hover:bg-brand-navy/90 focus:bg-brand-navy/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="mt-16 mb-10 border-gray-200" />

        <p className="text-sm text-center text-gray-600">
          © Copyright {currentYear}, All Rights Reserved by JCL Group
        </p>
      </div>
    </section>
  );
}
