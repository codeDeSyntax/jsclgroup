"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Home, Shield, Sparkles, Zap } from "lucide-react";
import { realEstateImages, gadgetsImages } from "@/lib/images";

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  imageUrl: string;
}

const services: Service[] = [
  {
    id: "properties",
    icon: <Home className="w-6 h-6" />,
    title: "Property Sales & Rentals",
    description:
      "Browse verified homes, rentals, and investment opportunities with a team that understands the local market.",
    imageUrl:
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778683097/Modern_Luxury_Bangla_Villa_sm7qxz.jpg",
  },
  {
    id: "Building and Construction",
    icon: <Shield className="w-6 h-6" />,
    title: "Building & Construction",
    description:
      "From design to completion, we manage construction projects with quality craftsmanship and attention to detail.",
    imageUrl:
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778683100/download_vqjuzk.jpg",
  },
  {
    id: "gadgets",
    icon: <Zap className="w-6 h-6" />,
    title: "Gadget Sales & Sourcing",
    description:
      "Find modern devices, accessories, and technology essentials selected for quality and value.",
    imageUrl:
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778682789/applc1_xs8bbg.jpg",
  },
  {
    id: "gadgets",
    icon: <Sparkles className="w-6 h-6" />,
    title: "Customer Support",
    description:
      "Work with a responsive team that helps you move smoothly from inquiry to delivery.",
    imageUrl:
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778682833/applc2_q3svit.png",
  },
];

export default function ServicesSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 xl:py-28">
      <div className="relative mx-auto max-w-6xl  px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px]   px-5 py-6  sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.75fr)] lg:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full  bg-brand-navy/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-navy/80">
                What we can do for you
              </div>
              <h2 className="mt-4 max-w-2xl text-4xl font-black leading-[0.92] tracking-[-0.08em] text-black sm:text-5xl md:text-6xl lg:text-7xl">
                Solutions that feel sharp, simple, and dependable.
              </h2>
            </div>

            <div className="max-w-md lg:justify-self-end">
              <p className="text-sm leading-7 text-brand-navy/75 sm:text-base lg:text-[1.05rem]">
                From property guidance to gadget sourcing, we provide quality
                solutions tailored to your needs and handled with care.
              </p>
              <Link
                href="/services"
                className="mt-5 inline-flex items-center gap-3 rounded-full border border-brand-navy/10 bg-jcl-accent px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#cfb18f] sm:px-6 sm:py-3.5"
              >
                See our services
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-navy text-white">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <article
                key={service.id}
                className={`group relative min-h-[340px] sm:min-h-[380px] lg:min-h-[440px] overflow-hidden rounded-2xl bg-jcl-white shadow-[0_18px_36px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:-translate-y-1 ${
                  index === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  // sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 top-0 flex justify-end p-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/20 text-white backdrop-blur-md transition-colors group-hover:bg-white/30">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <h3 className="max-w-[12rem] text-lg font-medium leading-tight text-white sm:text-xl">
                    {service.title}
                  </h3>
                  <p
                    className="mt-2 max-w-[14rem] text-sm leading-6 text-white/80 truncate"
                    title={service.description}
                  >
                    {service.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
