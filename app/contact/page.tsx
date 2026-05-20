"use client";

import React, { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { BACKEND_URL } from "@/lib/auth";
import {
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";
import { contactInfo } from "@/lib/contact";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const footerPhones = ["025 646 6565", "053 110 1123", "0245118310"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/email/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send email");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to send email. Please try again.";
      setError(errorMessage);
      console.error("Error sending contact email:", err);
    } finally {
      setLoading(false);
    }
  };

  const contactBlocks = [
    {
      title: "Chat to us",
      description: "Our friendly team is here to help.",
      value: contactInfo.email,
      icon: MessageSquare,
    },
    {
      title: "Visit us",
      description: "Come say hello at our office HQ.",
      value: "Accra, Ghana",
      icon: MapPin,
    },
    {
      title: "Call us",
      description: "Mon-Fri from 8am to 5pm.",
      value: footerPhones,
      icon: Phone,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-jcl-white">
      <Header variant="hero" />
      <main className="flex-1">
        <section className="py-20 sm:py-14 lg:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[32px] border-[3px] border-jcl-primary/90 bg-[#f2f2f2] p-3 sm:p-4">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[0.85fr_1.35fr]">
                <aside className="order-2 rounded-[24px] bg-transparent px-4 py-5 sm:px-6 sm:py-6 lg:order-1 lg:px-8 lg:py-8">
                  <div className="mb-8 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-jcl-primary" />
                    <span className="text-xl font-extrabold tracking-tight text-jcl-primary">
                      JCL Group
                    </span>
                  </div>

                  <div className="space-y-7">
                    {contactBlocks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="flex gap-3">
                          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-jcl-primary/15 bg-white text-jcl-primary">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-jcl-primary">
                              {item.title}
                            </h3>
                            <p className="mt-0.5 text-sm text-jcl-primary/75">
                              {item.description}
                            </p>
                            {Array.isArray(item.value) ? (
                              <div className="mt-2 space-y-1">
                                {item.value.map((phone) => (
                                  <a
                                    key={phone}
                                    href={`tel:${phone.replace(/\s+/g, "")}`}
                                    className="block text-base font-semibold text-jcl-primary hover:underline"
                                  >
                                    {phone}
                                  </a>
                                ))}
                              </div>
                            ) : (
                              <p className="mt-2 text-base font-semibold text-jcl-primary">
                                {item.value}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-10 flex items-center gap-2.5">
                    {/* LinkedIn */}
                    <a
                      href="https://www.linkedin.com/in/jclroyalgh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-jcl-primary/15 bg-white text-jcl-primary transition hover:bg-jcl-primary hover:text-white"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    {/* TikTok */}
                    <a
                      href="https://www.tiktok.com/@tonefo2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-jcl-primary/15 bg-white transition hover:bg-jcl-primary"
                      aria-label="TikTok"
                    >
                      <img
                        src="https://www.tiktok.com/favicon.ico"
                        alt="TikTok"
                        className="h-4 w-4"
                      />
                    </a>
                  </div>
                </aside>

                <div className="order-1 rounded-[24px] border border-jcl-primary/10 bg-white px-5 py-6 shadow-[0_20px_60px_rgba(7,13,75,0.06)] relative overflow-hidden sm:px-8 sm:py-8 lg:order-2 lg:px-10 lg:py-10">
                  <div className="absolute inset-y-0 right-0 w-2/5 bg-gradient-to-l from-brand-navy/10 via-brand-navy/5 to-transparent" />
                  {submitted ? (
                    <div className="relative z-10 rounded-xl border border-jcl-primary/15 bg-white/80 p-8 text-center">
                      <p className="text-4xl font-black text-jcl-primary">✓</p>
                      <h2 className="mt-3 text-2xl font-black text-jcl-primary">
                        Message Sent
                      </h2>
                      <p className="mt-2 text-jcl-primary/80">
                        Thanks for reaching out. Our team will get back shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="relative z-10">
                      <h1 className="max-w-2xl text-3xl font-black leading-tight tracking-tight text-black sm:text-3xl lg:text-5xl">
                        Do you want to reach out? We&apos;re here to help.
                      </h1>
                      <p className="mt-3 max-w-2xl text-sm text-jcl-primary/80 sm:text-base">
                        Tell us more about yourself and what you&apos;re
                        building.
                      </p>

                      {error && (
                        <div className="mt-4 rounded-lg border border-red-500/20 bg-red-50 p-4">
                          <p className="text-sm text-red-700">{error}</p>
                        </div>
                      )}

                      <div className="mt-8 space-y-5">
                        <div>
                          <label
                            htmlFor="name"
                            className="text-sm font-medium text-jcl-primary"
                          >
                            Your name
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            disabled={loading}
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-2 w-full border-0 border-b border-jcl-primary/45 bg-transparent pb-2 text-jcl-primary placeholder:text-jcl-primary/55 outline-none focus:border-brand-orange disabled:opacity-50"
                            placeholder="Your full name"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="text-sm font-medium text-jcl-primary"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            disabled={loading}
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-2 w-full border-0 border-b border-jcl-primary/45 bg-transparent pb-2 text-jcl-primary placeholder:text-jcl-primary/55 outline-none focus:border-brand-orange disabled:opacity-50"
                            placeholder="name@yourdomain.com"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="message"
                            className="text-sm font-medium text-jcl-primary"
                          >
                            Tell us a little about what you have in mind...
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            required
                            disabled={loading}
                            rows={3}
                            value={formData.message}
                            onChange={handleChange}
                            className="mt-2 w-full resize-none border-0 border-b border-jcl-primary/45 bg-transparent pb-2 text-jcl-primary placeholder:text-jcl-primary/55 outline-none focus:border-brand-orange disabled:opacity-50"
                            placeholder="Tell us what you have in mind"
                          />
                        </div>
                      </div>

                      {/* Service selection removed per project requirements */}

                      <button
                        type="submit"
                        disabled={loading}
                        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-jcl-accent px-6 py-3 text-sm font-bold text-white transition hover:bg-jcl-blue-900 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {loading ? "Sending..." : "Let's get started"}
                        <Send className="h-4 w-4" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-jcl-white" />
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-8 text-center">
              Find Us
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Visit our office or reach out to us through any of our contact
              channels above
            </p>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <div className="aspect-[16/9] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127118.07476861928!2d-0.2870457!3d5.6037168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2s!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

            <div className="mt-8 text-center">
              <a
                href="https://maps.google.com/?q=Accra,Ghana"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy text-white rounded-full font-semibold hover:opacity-90 transition-all text-sm"
              >
                <MapPin className="w-4 h-4" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
