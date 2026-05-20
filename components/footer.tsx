"use client";

import { useState } from "react";
import Link from "next/link";
import { Linkedin, Mail, Phone } from "lucide-react";
import FooterCtaCard from "@/components/footer-cta-card";
import { contactInfo } from "@/lib/contact";
import { BACKEND_URL } from "@/lib/auth";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<string | null>(null);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribeStatus(null);
    setSubscribeError(null);

    const email = subscriberEmail.trim().toLowerCase();
    if (!email) {
      setSubscribeError("Please enter your email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${BACKEND_URL}/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setSubscribeStatus(data.message || "Subscribed successfully");
      setSubscriberEmail("");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not subscribe right now";
      setSubscribeError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Footer-specific contact lines (as provided)
  const footerPhones = ["025 646 6565", "+233 53 110 1123", "0245118310"];

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
      href: "https://www.linkedin.com/in/jclroyalgh",
      label: "LinkedIn",
      icon: Linkedin,
    },
    {
      href: "https://www.tiktok.com/@tonefo2",
      label: "TikTok",
      icon: null,
    },
  ];

  return (
    <footer className="relative mt-52 w-full rounded-t-3xl bg-jcl-primary text-white sm:mt-80">
      <div className="w-full">
        <div className="pointer-events-none absolute left-0 right-0 -top-40 z-20 px-4 sm:-top-36 sm:px-0 w-full lg:px-0">
          <div className="pointer-events-auto mx-auto flex w-full justify-center">
            <FooterCtaCard />
          </div>
        </div>

        <div className="relative z-10 w-full px-4 pb-8 pt-52 sm:px-6 sm:pt-48 lg:pt-52">
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
                  {footerPhones.map((p) => {
                    const href = `tel:${p.replace(/\s+/g, "")}`;
                    return (
                      <li key={p} className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-jcl-orange-400" />
                        <a href={href} className="transition hover:text-white">
                          {p}
                        </a>
                      </li>
                    );
                  })}
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-jcl-orange-400" />
                    <a
                      href={contactInfo.emailHref}
                      className="transition hover:text-white"
                    >
                      {contactInfo.email}
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
                  Ready to buy, rent, or source the right gadget?
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
                        {Icon ? (
                          <Icon className="h-4 w-4" />
                        ) : (
                          <img
                            src="https://www.tiktok.com/favicon.ico"
                            alt="TikTok"
                            className="h-4 w-4"
                          />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-6 border-t border-white/15 py-8 lg:grid-cols-[1fr_1.15fr] lg:items-end">
              <p className="max-w-xl text-4xl font-black leading-tight tracking-[-0.04em] text-white sm:text-5xl">
                Get updates on fresh properties, offers, and gadget drops.
              </p>

              <form className="space-y-3" onSubmit={handleSubscribe}>
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
                    value={subscriberEmail}
                    onChange={(e) => {
                      setSubscriberEmail(e.target.value);
                      if (subscribeError) setSubscribeError(null);
                    }}
                    disabled={isSubmitting}
                    required
                    placeholder="Enter your email"
                    className="h-12 w-full rounded-full border border-white/20 bg-white/10 px-5 text-sm text-white placeholder:text-white/55 outline-none ring-0 transition focus:border-jcl-orange-400 disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-jcl-orange-500 px-8 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-jcl-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Submitting..." : "Stay Updated"}
                  </button>
                </div>
                {subscribeStatus ? (
                  <p className="text-xs text-green-300">{subscribeStatus}</p>
                ) : null}
                {subscribeError ? (
                  <p className="text-xs text-red-300">{subscribeError}</p>
                ) : null}
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
