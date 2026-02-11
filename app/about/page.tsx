"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  TrendingUp,
  Shield,
  Users,
  Lightbulb,
  Target,
  Building2,
  Plane,
  Zap,
  Sparkles,
  Rocket,
  ShoppingBag,
  Pickaxe,
} from "lucide-react";
import { realEstateImages, travelImages, gadgetsImages } from "@/lib/images";

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return <>{count}+</>;
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <main className="flex-1">
        {/* Hero Section - Ultra Minimal & Bold */}
        <section className="relative min-h-[85vh] flex items-center bg-gradient-to-b from-transparent via-brand-orange/5 to-transparent ">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left - Massive Typography */}
              <div className="lg:col-span-5 space-y-6">
                <div className="text-[10px] tracking-[0.4em] uppercase text-gray-400 font-medium">
                  About JCL Royal Group
                </div>

                <h1 className="text-6xl md:text-8xl font-bold text-brand-navy leading-[0.9] tracking-tighter">
                  ABOUT
                  <br />
                  US
                </h1>

                <div className="pt-4 space-y-4">
                  <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                    Luxurious Interior and Industrial Design
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                    Modern Elegance: Designs featuring clean lines, neutral
                    palettes, and high-quality materials.
                  </p>
                </div>
              </div>

              {/* Right - Stylish Image Collection */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-12 gap-4 h-[500px]">
                  {/* Large Main Image - Real Estate */}
                  <div className="col-span-7 row-span-2 relative rounded-[2rem] overflow-hidden shadow-xl group bg-gray-100">
                    <Image
                      src={realEstateImages.featured[0]?.secure_url || ""}
                      alt="Real Estate"
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      sizes="400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 via-transparent to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-xs uppercase tracking-wider opacity-80">Real Estate</div>
                    </div>
                  </div>

                  {/* Top Right - Travel */}
                  <div className="col-span-5 relative rounded-[2rem] overflow-hidden shadow-lg group -rotate-1 bg-gray-100">
                    <Image
                      src={travelImages.destinations[1]?.secure_url || ""}
                      alt="Travel Experiences"
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      sizes="300px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-orange/30 via-transparent to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-3 left-3 text-white">
                      <div className="text-xs uppercase tracking-wider opacity-80">Travel</div>
                    </div>
                  </div>

                  {/* Middle Right - Electronics */}
                  <div className="col-span-5 relative rounded-[2rem] overflow-hidden shadow-lg group rotate-1 bg-gray-100">
                    <Image
                      src={gadgetsImages.featured[1]?.secure_url || ""}
                      alt="Electronics"
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      sizes="300px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 via-transparent to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-3 left-3 text-white">
                      <div className="text-xs uppercase tracking-wider opacity-80">Electronics</div>
                    </div>
                  </div>

                  {/* Bottom Left - Property */}
                  <div className="col-span-5 relative rounded-[1.5rem] overflow-hidden shadow-lg group rotate-2 bg-gray-100">
                    <Image
                      src={realEstateImages.properties[1]?.secure_url || ""}
                      alt="Property Portfolio"
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      sizes="300px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-orange/30 via-transparent to-transparent pointer-events-none"></div>
                  </div>

                  {/* Bottom Right - Philosophy Card */}
                  <div className="col-span-7 bg-gradient-to-br from-white to-gray-50 rounded-[1.5rem] p-6 shadow-lg border border-gray-100 flex flex-col justify-center -rotate-1">
                    <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-3">
                      <Sparkles className="w-5 h-5 text-brand-orange" />
                    </div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2">
                      Our Philosophy
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Creating luxurious, personalized environments that reflect our clients' tastes and lifestyles across real estate, travel, and technology.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Principals Section */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="relative  rounded-[2rem] p-12 md:p-16">
              {/* Title Card - Centered */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="bg-white rounded-[2rem] px-12 py-8 shadow-xl">
                  <h2 className="text-3xl font-bold text-center text-brand-navy leading-tight">
                    MEET THE
                    <br />
                    PRINCIPALS
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Principal */}
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/20 to-brand-navy/5 rounded-full blur-2xl scale-110"></div>
                    <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-xl">
                      <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                        alt="Jay Britto"
                        fill
                        className="object-cover"
                        sizes="224px"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-brand-navy mb-1">
                    Jay Britto
                  </h3>
                  <p className="text-sm text-gray-600 uppercase tracking-wider">
                    Founder and Principal
                  </p>
                </div>

                {/* Right Principal */}
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 to-brand-orange/5 rounded-full blur-2xl scale-110"></div>
                    <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-xl">
                      <Image
                        src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop"
                        alt="David Charette"
                        fill
                        className="object-cover"
                        sizes="224px"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-brand-navy mb-1">
                    David Charette
                  </h3>
                  <p className="text-sm text-gray-600 uppercase tracking-wider">
                    Founder and Principal
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mt-16 text-center max-w-2xl mx-auto">
                <p className="text-sm text-gray-600 leading-relaxed">
                  As principal and licensed designer, the founders oversee the
                  day-to-day operations of JCL Royal Group and the design and
                  manufacture of our firm's custom furniture and award-winning
                  accessories.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Minimal */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center gap-16">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-brand-navy mb-2">
                  <AnimatedCounter target={200} />
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">
                  Projects
                  <br />
                  Completed
                </div>
              </div>
              <div className="w-px h-16 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-brand-navy mb-2">
                  <AnimatedCounter target={150} />
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">
                  Satisfied
                  <br />
                  Clients
                </div>
              </div>
              <div className="w-px h-16 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-brand-navy mb-2">
                  <AnimatedCounter target={50} />
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">
                  Industry
                  <br />
                  Awards
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Content - Side by Side */}
        <section className="py-24 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-navy/5 rounded-full blur-3xl"></div>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left - Text */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6 leading-tight">
                    Building Ghana's Future
                  </h2>
                  <div className="w-20 h-1 bg-brand-orange"></div>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed font-light">
                  For over 9 years, JCL Royal Group has been at the forefront of
                  Ghana's economic development, delivering excellence across
                  multiple sectors and creating lasting value for our
                  communities.
                </p>

                <p className="text-base text-gray-600 leading-relaxed">
                  Our team of experts works tirelessly to bring your vision to
                  life, ensuring that every project we undertake not only meets
                  but exceeds expectations.
                </p>

                <div className="pt-4">
                  <button className="px-8 py-4 bg-brand-orange text-white rounded-full font-semibold hover:bg-brand-navy transition-colors text-sm">
                    Partner with Us
                  </button>
                </div>
              </div>

              {/* Right - Image Collage */}
              <div className="relative h-[500px]">
                <div className="grid grid-cols-6 grid-rows-6 gap-3 h-full">
                  {/* Large Image - Top Left */}
                  <div className="col-span-4 row-span-4 relative rounded-2xl overflow-hidden shadow-xl group bg-gray-100">
                    <Image
                      src={realEstateImages.properties[0]?.secure_url || ""}
                      alt="Real Estate Project"
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      sizes="400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 via-transparent to-transparent pointer-events-none"></div>
                  </div>

                  {/* Top Right - Travel */}
                  <div className="col-span-2 row-span-3 relative rounded-xl overflow-hidden shadow-lg group bg-gray-100 rotate-1">
                    <Image
                      src={travelImages.destinations[0]?.secure_url || ""}
                      alt="Travel Services"
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      sizes="200px"
                    />
                  </div>

                  {/* Middle Right - Electronics */}
                  <div className="col-span-2 row-span-3 relative rounded-xl overflow-hidden shadow-lg group bg-gray-100 -rotate-1">
                    <Image
                      src={gadgetsImages.featured[0]?.secure_url || ""}
                      alt="Electronics"
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      sizes="200px"
                    />
                  </div>

                  {/* Bottom Left - Small */}
                  <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden shadow-lg group bg-gray-100">
                    <Image
                      src={travelImages.packages[0]?.secure_url || ""}
                      alt="Travel Packages"
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      sizes="200px"
                    />
                  </div>

                  {/* Bottom Center */}
                  <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden shadow-lg group bg-gray-100 rotate-2">
                    <Image
                      src={realEstateImages.featured[1]?.secure_url || ""}
                      alt="Featured Property"
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      sizes="200px"
                    />
                  </div>

                  {/* Bottom Right */}
                  <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden shadow-lg group bg-gray-100 -rotate-2">
                    <Image
                      src={gadgetsImages.electronics[0]?.secure_url || ""}
                      alt="Electronics Products"
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      sizes="200px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blue About Card */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="bg-brand-navy rounded-[2rem] p-12 md:p-16 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>

              <div className="relative max-w-3xl">
                <div className="inline-flex items-center gap-2 mb-8">
                  <Sparkles className="w-5 h-5 text-brand-orange" />
                  <span className="text-xs tracking-[0.3em] uppercase text-white/70">
                    About Us
                  </span>
                </div>

                <p className="text-xl md:text-2xl font-light leading-relaxed mb-6 text-white/95">
                  We believe in the power of collaboration and creativity. By
                  combining closely with our clients, we gain a deep
                  understanding of their goals and aspirations.
                </p>

                <p className="text-base leading-relaxed text-white/80">
                  Our holistic approach integrates design, technology, and
                  strategy to create seamless and engaging digital experiences.
                  By staying ahead of the curve and embracing the latest trends,
                  we ensure cutting-edge solutions that set our clients apart.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Timeline - Progress Stepper */}
        <section className="py-12 relative">
          <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-navy/5 rounded-full blur-3xl"></div>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-2">
                Our Journey
              </h2>
              <p className="text-sm text-gray-600 max-w-xl">
                Key milestones in our growth and expansion across multiple
                sectors.
              </p>
            </div>

            <div className="relative">
              {/* Vertical Progress Line */}
              <div className="absolute left-[32px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-brand-orange via-brand-navy to-brand-orange hidden md:block"></div>

              <div className="space-y-4">
                {[
                  {
                    year: "2016",
                    title: "Company Founded | Travel and Tour",
                    description:
                      "JCL Royal Group was established with a vision to transform Ghana's business landscape.",
                    Icon: Rocket,
                  },
                  {
                    year: "2018",
                    title: "Real Estate Expansion",
                    description:
                      "Launched our first major real estate development project in Accra.",
                    Icon: Building2,
                  },
                  {
                    year: "2020",
                    title: "Mining Operations",
                    description:
                      "Entered the mining sector with sustainable and responsible extraction practices.",
                    Icon: Pickaxe,
                  },
                  {
                    year: "2024",
                    title: "Tonefo Commerce Launch",
                    description:
                      "Introduced our innovative commerce platform providing quality products to customers across Ghana.",
                    Icon: ShoppingBag,
                  },
                ].map((milestone, index) => {
                  const Icon = milestone.Icon;
                  return (
                  <div key={index} className="flex gap-4 items-start group">
                    {/* Step Circle */}
                    <div className="flex-shrink-0 relative z-10">
                      {/* Year Badge */}
                      <div className="inline-flex items-center justify-center px-3 py-1 bg-gradient-to-br from-brand-orange to-brand-orange/80 rounded-full mb-2">
                        <span className="text-xs font-bold text-white">
                          {milestone.year}
                        </span>
                      </div>
                      
                      {/* Icon Circle */}
                      <div className="w-16 h-16 rounded-full bg-white border-2 border-brand-navy/10 group-hover:border-brand-orange/50 transition-all flex items-center justify-center shadow-lg group-hover:shadow-xl">
                        <Icon className="w-7 h-7 text-brand-navy group-hover:text-brand-orange transition-colors" />
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 bg-white rounded-xl p-4 border border-gray-100 group-hover:shadow-xl group-hover:border-brand-orange/20 transition-all mt-4">
                      <h3 className="text-base font-bold text-brand-navy mb-1 group-hover:text-brand-orange transition-colors">
                        {milestone.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission - Large Cards */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Vision */}
              <div className="bg-white rounded-[2rem] p-12 relative overflow-hidden group hover:shadow-xl transition-all">
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-navy/5 rounded-full blur-3xl opacity-50"></div>

                <div className="relative">
                  <div className="w-16 h-16 bg-brand-navy/10 rounded-2xl flex items-center justify-center mb-8">
                    <Target className="w-8 h-8 text-brand-navy" />
                  </div>

                  <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-brand-navy mb-6">
                    Vision
                  </h3>

                  <p className="text-xl font-light text-gray-800 leading-relaxed">
                    To be the leading multi-sector company in West Africa,
                    recognized for excellence, innovation, and positive impact
                    on communities and the environment.
                  </p>
                </div>
              </div>

              {/* Mission */}
              <div className="bg-white rounded-[2rem] p-12 relative overflow-hidden group hover:shadow-xl transition-all">
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-orange/5 rounded-full blur-3xl opacity-50"></div>

                <div className="relative">
                  <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center mb-8">
                    <Lightbulb className="w-8 h-8 text-brand-orange" />
                  </div>

                  <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-brand-orange mb-6">
                    Mission
                  </h3>

                  <p className="text-xl font-light text-gray-800 leading-relaxed">
                    To drive sustainable economic growth across Ghana and West
                    Africa through innovative solutions, exceptional service,
                    and responsible business practices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl"></div>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-4">
                Our Core Values
              </h2>
              <p className="text-base text-gray-600 max-w-xl">
                These fundamental principles guide our decisions and shape our
                culture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: TrendingUp,
                  title: "Excellence",
                  description:
                    "We strive for excellence in every project, delivering quality that exceeds expectations.",
                  iconBg: "bg-brand-navy/10",
                  iconColor: "text-brand-navy",
                },
                {
                  icon: Shield,
                  title: "Integrity",
                  description:
                    "We conduct business with honesty, transparency, and ethical practices at all times.",
                  iconBg: "bg-brand-navy/10",
                  iconColor: "text-brand-navy",
                },
                {
                  icon: Users,
                  title: "Collaboration",
                  description:
                    "We believe in the power of teamwork and building strong partnerships with our clients.",
                  iconBg: "bg-brand-orange/10",
                  iconColor: "text-brand-orange",
                },
                {
                  icon: Lightbulb,
                  title: "Innovation",
                  description:
                    "We embrace new technologies and innovative solutions to drive sustainable growth.",
                  iconBg: "bg-brand-orange/10",
                  iconColor: "text-brand-orange",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-[1.5rem] p-8 hover:shadow-xl transition-all group border border-gray-100"
                >
                  <div
                    className={`w-14 h-14 ${value.iconBg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <value.icon className={`w-7 h-7 ${value.iconColor}`} />
                  </div>

                  <h3 className="text-lg font-bold text-brand-navy mb-3">
                    {value.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Divisions - Image Grid */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-4">
                Our Divisions
              </h2>
              <p className="text-base text-gray-600 max-w-xl">
                Browse through our gallery to see the impact of our creativity
                and craftsmanship across various projects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Real Estate",
                  icon: Building2,
                  image: realEstateImages.properties[0]?.secure_url || "",
                  rotation: "-rotate-2",
                },
                {
                  title: "Travel & Tours",
                  icon: Plane,
                  image: travelImages.destinations[0]?.secure_url || "",
                  rotation: "rotate-0",
                },
                {
                  title: "Electronics",
                  icon: Zap,
                  image: gadgetsImages.featured[0]?.secure_url || "",
                  rotation: "rotate-2",
                },
              ].map((division, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-[2rem] h-72 hover:shadow-2xl transition-all hover:-translate-y-1 ${division.rotation}`}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={division.image}
                      alt={division.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <division.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {division.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 relative">
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-navy/5 rounded-full blur-3xl"></div>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-12">
              Leadership Team
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Chief Operations Officer",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop",
                },
                {
                  name: "Michael Chen",
                  role: "Head of Real Estate",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
                },
                {
                  name: "Emma Williams",
                  role: "Director of Travel",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop",
                },
                {
                  name: "David Martinez",
                  role: "Head of Electronics",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className="group text-center"
                >
                  <div className="relative inline-block mb-4">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg group-hover:shadow-xl group-hover:border-brand-orange/30 transition-all duration-300 bg-gray-50">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={160}
                        height={160}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-brand-navy mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs text-gray-600">{member.role}</p>
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
