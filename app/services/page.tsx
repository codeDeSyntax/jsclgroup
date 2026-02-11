"use client";

import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import {
  Zap,
  Home,
  Plane,
  Shield,
  Headphones,
  Truck,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { realEstateImages, travelImages, gadgetsImages } from "@/lib/images";

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: 0,
      category: "Electrical Gadgets",
      title: "Smart Technology Solutions",
      description:
        "To empower you to embrace modern technology in your daily life. We aim to make cutting-edge electronics accessible, supportive, and transformative for everyone who seeks quality and innovation.",
      items: [
        "Smart Home Solutions",
        "Product Consultation",
        "Installation Services",
        "Technical Support",
        "Warranty Services",
        "Trade-in Programs",
      ],
      image: gadgetsImages.featured[0]?.secure_url || "",
      link: "/products",
      linkText: "Browse Products",
      icon: Zap,
    },
    {
      id: 1,
      category: "Real Estate",
      title: "Premium Property Solutions",
      description:
        "Our real estate services provide a comprehensive approach to buying, selling, and managing properties. We deliver personalized solutions that help you find your perfect space, make sound investments, and achieve your property goals with confidence.",
      items: [
        "Property Sales",
        "Property Rentals",
        "Investment Planning",
        "Property Management",
        "Legal Support",
        "Valuation Services",
      ],
      image: realEstateImages.featured[0]?.secure_url || "",
      link: "/properties",
      linkText: "View Properties",
      icon: Home,
    },
    {
      id: 2,
      category: "Travel & Tours",
      title: "Unforgettable Travel Experiences",
      description:
        "Every journey is unique and special. Our travel services provide carefully curated experiences to explore the world, create lasting memories, and discover new destinations. Our experienced travel consultants use proven expertise to help you plan the perfect trip.",
      items: [
        "Guided Tours",
        "Luxury Packages",
        "Adventure Travel",
        "Custom Itineraries",
        "Travel Insurance",
        "Visa Assistance",
      ],
      image: travelImages.destinations[0]?.secure_url || "",
      link: "/travel",
      linkText: "Explore Packages",
      icon: Plane,
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Trusted Quality",
      description: "Every product and service meets our rigorous standards",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer service and assistance",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and reliable delivery for all orders",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Dedicated professionals in every division",
    },
  ];

  const currentService = services[activeService];
  const ServiceIcon = currentService.icon;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-transparent via-brand-orange/5 to-transparent ">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 ">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <div className="text-[10px] tracking-[0.4em] uppercase text-gray-400 font-medium mb-6">
                (Our Service)
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-brand-navy mb-6 leading-tight">
                Expert Care for Your
                <br />
                Specific Needs
              </h1>
              <p className="text-base text-gray-600 leading-relaxed">
                To empower you to achieve your goals across real estate,
                technology, and travel. We aim to make our services accessible,
                supportive, and transformative for everyone who seeks excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Main Services Section - Side by Side Layout */}
        <section className="py-20 ">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left - Service Navigation */}
              <div className="lg:col-span-4 space-y-2">
                {services.map((service, index) => (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(index)}
                    className={`w-full text-left py-4 px-6 rounded-xl transition-all ${
                      activeService === index
                        ? "bg-brand-navy text-white font-bold"
                        : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-lg">{service.category}</span>
                  </button>
                ))}
              </div>

              {/* Right - Service Content */}
              <div className="lg:col-span-8 space-y-8">
                {/* Service Image */}
                <div className="relative h-[400px] rounded-3xl overflow-hidden bg-gray-100">
                  <Image
                    src={currentService.image}
                    alt={currentService.category}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                </div>

                {/* Service Title & Icon */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-navy/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ServiceIcon className="w-6 h-6 text-brand-navy" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-brand-navy mb-4">
                      {currentService.title}
                    </h2>
                    <p className="text-base text-gray-600 leading-relaxed mb-6">
                      {currentService.description}
                    </p>
                  </div>
                </div>

                {/* Service Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentService.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all"
                    >
                      <div className="w-1.5 h-1.5 bg-brand-orange rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Link
                    href={currentService.link}
                    className="px-6 py-3 bg-brand-navy text-white rounded-full font-semibold hover:bg-brand-orange transition-all text-sm"
                  >
                    {currentService.linkText}
                  </Link>
                  <button className="px-6 py-3 bg-white text-brand-navy border-2 border-brand-navy rounded-full font-semibold hover:bg-brand-navy hover:text-white transition-all text-sm">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 ">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-brand-navy mb-4">
                Why Choose Our Services?
              </h2>
              <p className="text-base text-gray-600">
                Excellence in every aspect of our service delivery
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all group"
                  >
                    <div className="w-14 h-14 bg-brand-navy/10 group-hover:bg-brand-orange/10 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
                      <Icon className="w-7 h-7 text-brand-navy group-hover:text-brand-orange transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 ">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="bg-brand-navy rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl"></div>
              
              <div className="relative">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to Experience Our Services?
                </h2>
                <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                  Contact us today to learn more about how we can serve your needs
                  across all our divisions.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-full font-semibold hover:bg-white hover:text-brand-navy transition-all"
                >
                  Get in Touch
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}