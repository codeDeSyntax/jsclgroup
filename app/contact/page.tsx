"use client";

import React from "react";
import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { Phone, Mail, MapPin, Send, Clock } from "lucide-react";
import { realEstateImages, travelImages, gadgetsImages } from "@/lib/images";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    division: "Electrical Gadgets",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        division: "Electrical Gadgets",
        subject: "",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  const offices = [
    {
      division: "Electrical Gadgets",
      address: "123 Tech Plaza, San Francisco, CA 94105",
      phone: "+1 (415) 555-0123",
      email: "gadgets@proventure.com",
      hours: "Mon-Fri: 9AM-6PM",
    },
    {
      division: "Real Estate",
      address: "456 Property Ave, New York, NY 10001",
      phone: "+1 (212) 555-0456",
      email: "realestate@proventure.com",
      hours: "Mon-Fri: 9AM-7PM",
    },
    {
      division: "Travel & Tours",
      address: "789 Adventure Blvd, Miami, FL 33139",
      phone: "+1 (305) 555-0789",
      email: "travel@proventure.com",
      hours: "Mon-Sun: 8AM-8PM",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-transparent via-brand-orange/5 to-white/50 ">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl"></div>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div>
                <div className="text-[10px] tracking-[0.4em] uppercase text-gray-400 font-medium mb-6">
                  Contact Us
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-brand-navy mb-6 leading-tight">
                  Get in Touch
                </h1>
                <p className="text-base text-gray-600 leading-relaxed">
                  Have questions? We'd love to hear from you. Reach out to our
                  team at any of our divisions.
                </p>
              </div>

              {/* Image Arrangement */}
              <div className="relative h-[400px]">
                <div className="grid grid-cols-2 gap-3 h-full">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-100">
                    <Image
                      src={realEstateImages.featured[0]?.secure_url || ""}
                      alt="Real Estate"
                      fill
                      className="object-contain"
                      sizes="300px"
                    />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-100 rotate-2">
                    <Image
                      src={travelImages.destinations[0]?.secure_url || ""}
                      alt="Travel"
                      fill
                      className="object-contain"
                      sizes="300px"
                    />
                  </div>
                  <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-xl bg-gray-100 -rotate-1">
                    <Image
                      src={gadgetsImages.featured[0]?.secure_url || ""}
                      alt="Electronics"
                      fill
                      className="object-contain"
                      sizes="600px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-16 md:py-24 relative bg-white/50">
          <div className="absolute inset-0 "></div>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-brand-navy mb-8">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all"
                    >
                      <h3 className="font-semibold text-brand-orange mb-4">
                        {office.division}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <MapPin
                            size={20}
                            className="text-brand-navy flex-shrink-0 mt-1"
                          />
                          <p className="text-gray-600 text-sm">
                            {office.address}
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <Phone
                            size={20}
                            className="text-brand-navy flex-shrink-0"
                          />
                          <a
                            href={`tel:${office.phone}`}
                            className="text-gray-700 hover:text-brand-orange transition-colors text-sm"
                          >
                            {office.phone}
                          </a>
                        </div>
                        <div className="flex gap-3">
                          <Mail
                            size={20}
                            className="text-brand-navy flex-shrink-0"
                          />
                          <a
                            href={`mailto:${office.email}`}
                            className="text-gray-700 hover:text-brand-orange transition-colors text-sm"
                          >
                            {office.email}
                          </a>
                        </div>
                        <div className="flex gap-3">
                          <Clock
                            size={20}
                            className="text-brand-navy flex-shrink-0"
                          />
                          <p className="text-gray-600 text-sm">
                            {office.hours}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2 ">
                <h2 className="text-2xl font-bold text-brand-navy mb-8">
                  Send us a Message
                </h2>

                {submitted ? (
                  <div className="bg-brand-orange/10 border border-brand-orange/30 rounded-xl p-8 text-center">
                    <div className="text-4xl mb-4 text-brand-orange">✓</div>
                    <h3 className="text-lg font-semibold text-brand-navy mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-700">
                      Thank you for contacting us. We'll get back to you
                      shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-brand-navy mb-2"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-white text-gray-900"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-brand-navy mb-2"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-white text-gray-900"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-brand-navy mb-2"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-white text-gray-900"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="division"
                          className="block text-sm font-medium text-brand-navy mb-2"
                        >
                          Division
                        </label>
                        <select
                          id="division"
                          name="division"
                          value={formData.division}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-white text-gray-900"
                        >
                          <option>Electrical Gadgets</option>
                          <option>Real Estate</option>
                          <option>Travel & Tours</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-brand-navy mb-2"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-white text-gray-900"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-brand-navy mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-white text-gray-900 resize-none"
                        placeholder="Tell us more about your inquiry..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center px-8 py-3 bg-brand-orange text-white rounded-full font-semibold hover:opacity-90 transition-all hover:shadow-lg group"
                    >
                      Send Message
                      <Send
                        size={20}
                        className="ml-2 group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-white/50"></div>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-8 text-center">
              Find Us
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Visit our office or reach out to us through any of our contact
              channels above
            </p>

            {/* Embedded Map */}
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

            {/* Quick Location Link */}
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

        {/* FAQ Section */}
        <section className="py-16 md:py-24 relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl"></div>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "How quickly will I hear back from your team?",
                  a: "We typically respond to inquiries within 24 business hours. Urgent matters may be addressed sooner.",
                },
                {
                  q: "Can I contact a specific division?",
                  a: "Yes! You can select your division in the contact form or reach out directly using the contact information provided above.",
                },
                {
                  q: "Do you offer consulting services?",
                  a: "Absolutely! We offer free initial consultations for all our divisions. Contact us to schedule yours.",
                },
                {
                  q: "What are your business hours?",
                  a: "Hours vary by division. Please refer to the contact information section above for specific hours.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-orange/30 hover:shadow-lg transition-all"
                >
                  <h3 className="font-semibold text-brand-navy mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
