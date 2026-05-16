import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import FooterCtaCard from "@/components/footer-cta-card";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/products/electronics", label: "Shop" },
    { href: "/gadgets", label: "Gadgets" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    {
      href: "https://web.facebook.com/profile.php?id=61580477670825",
      label: "Facebook",
      icon: Facebook,
    },
    {
      href: "https://www.instagram.com/rsgroupghana/",
      label: "Instagram",
      icon: Instagram,
    },
    {
      href: "https://x.com/rsgroupgh?s=09",
      label: "X",
      icon: Twitter,
    },
    {
      href: "https://www.linkedin.com/company/rs-group-of-companies-limited/",
      label: "LinkedIn",
      icon: Linkedin,
    },
  ];

  return (
    <footer className="relative mt-28 w-full rounded-t-3xl bg-black text-white sm:mt-32">
      <div className="w-full">
        <div className="pointer-events-none absolute left-0 right-0 -top-24 z-20 px-4 sm:-top-28 sm:px-6 lg:px-8">
          <div className="pointer-events-auto mx-auto flex max-w-6xl justify-center">
            <FooterCtaCard />
          </div>
        </div>

        <div className="relative z-10 w-full px-4 pb-8 pt-44 sm:px-6 sm:pt-48 lg:pt-52">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 pb-12 md:grid-cols-3">
              <div>
                <h3 className="text-3xl font-black tracking-[-0.03em] text-white">
                  Quick Links
                </h3>
                <ul className="mt-6 space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/75 transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-3xl font-black tracking-[-0.03em] text-white">
                  Contact &amp; Legal
                </h3>
                <ul className="mt-6 space-y-3 text-sm text-white/75">
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-jcl-orange-400" />
                    <a
                      href="mailto:info@jclgroupgh.com"
                      className="transition hover:text-white"
                    >
                      info@jclgroupgh.com
                    </a>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="transition hover:text-white"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="transition hover:text-white">
                      Terms &amp; Conditions
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="max-w-sm text-3xl font-black leading-tight tracking-[-0.03em] text-white">
                  Join the conversation let&apos;s connect!
                </h3>
                <ul className="mt-6 flex items-center gap-3">
                  {socialLinks.map(({ href, label, icon: Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        title={label}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-jcl-primary transition hover:-translate-y-0.5 hover:bg-jcl-orange-500 hover:text-white"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-6 border-t border-white/15 py-8 lg:grid-cols-[1fr_1.15fr] lg:items-end">
              <p className="max-w-xl text-4xl font-black leading-tight tracking-[-0.04em] text-white sm:text-5xl">
                Never miss updates from our community.
              </p>

              <form className="space-y-3">
                <label
                  htmlFor="footer-email"
                  className="text-sm font-medium text-white/75"
                >
                  Email
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="footer-email"
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 w-full rounded-full border border-white/20 bg-white/10 px-5 text-sm text-white placeholder:text-white/55 outline-none ring-0 transition focus:border-jcl-orange-400"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-jcl-orange-500 px-8 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-jcl-orange-600"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>

            <div className="border-t border-white/10 pt-6 text-center text-xs text-white/55">
              Copyright © {currentYear} JCL Group. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
