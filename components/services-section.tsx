"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Home, Shield, Sparkles, Zap } from "lucide-react";
import { realEstateImages, gadgetsImages } from "@/lib/images";

interface Service {
  id: string;
  kind: "service";
  icon: React.ReactNode;
  title: string;
  description: string;
  imageUrl: string;
}

interface PromoCard {
  id: string;
  kind: "promo";
  eyebrow: string;
  title: string;
  description: string;
  tone?: "accent" | "primary";
}

type ServiceCardItem = Service | PromoCard;

const promoTones: Array<NonNullable<PromoCard["tone"]>> = ["accent", "primary"];

const services: Service[] = [
  {
    id: "properties",
    kind: "service",
    icon: <Home className="w-6 h-6" />,
    title: "Property Sales & Rentals",
    description:
      "Browse verified homes, rentals, and investment opportunities with a team that understands what matters in every neighborhood.",
    imageUrl:
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778683097/Modern_Luxury_Bangla_Villa_sm7qxz.jpg",
  },
  {
    id: "Building and Construction",
    kind: "service",
    icon: <Shield className="w-6 h-6" />,
    title: "Building & Construction",
    description:
      "From planning to completion, we manage construction projects with quality craftsmanship, clear timelines, and attention to detail.",
    imageUrl:
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778683100/download_vqjuzk.jpg",
  },
  {
    id: "gadgets",
    kind: "service",
    icon: <Zap className="w-6 h-6" />,
    title: "Gadget Sales & Sourcing",
    description:
      "Find electrical gadgets, appliances, and accessories selected for quality, performance, and value.",
    imageUrl:
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778682789/applc1_xs8bbg.jpg",
  },
  {
    id: "gadgets",
    kind: "service",
    icon: <Sparkles className="w-6 h-6" />,
    title: "Customer Support",
    description:
      "Work with a responsive team that helps you move smoothly from inquiry to delivery and after-sales support.",
    imageUrl:
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779222097/download_4_g6bclv.jpg",
  },
];

const promoCards: PromoCard[] = [
  {
    id: "real-estate-services-promo",
    kind: "promo",
    eyebrow: "JCL Services",
    title: "Real estate support that moves with your plans.",
    description:
      "From property search and rentals to building support, our team helps you make confident decisions with clear guidance.",
  },
  {
    id: "tonefo-promo",
    kind: "promo",
    eyebrow: "Tonefo",
    title: "Everyday electronics, sourced with care.",
    description:
      "Shop practical appliances, gadgets, and accessories selected for homes, offices, and reliable daily use.",
  },
];

function getRandomServiceCards(): ServiceCardItem[] {
  const nextCards: ServiceCardItem[] = [...services];
  const shouldShowPromo = Math.random() < 0.67;

  if (!shouldShowPromo) return nextCards;

  const promo = promoCards[Math.floor(Math.random() * promoCards.length)];
  const replaceIndex = Math.floor(Math.random() * nextCards.length);
  const tone = promoTones[Math.floor(Math.random() * promoTones.length)];
  nextCards[replaceIndex] = { ...promo, tone };
  return nextCards;
}

export default function ServicesSection() {
  const [serviceCards, setServiceCards] = useState<ServiceCardItem[]>(services);
  const [shuffleId, setShuffleId] = useState(0);

  useEffect(() => {
    const shuffle = () => {
      setServiceCards(getRandomServiceCards());
      setShuffleId((value) => value + 1);
    };

    shuffle();
    const interval = window.setInterval(() => {
      shuffle();
    }, 7000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden py-16 sm:py-0 sm:pb-20 lg:pb-24">
      <div className="relative mx-auto max-w-6xl  px-0 sm:px-6 lg:px-8">
        <div className="rounded-[32px]   px-5 py-6  sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.75fr)] lg:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-navy/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-brand-navy/55">
                What we do best
              </div>
              <h2 className="mt-4 max-w-4xl text-[clamp(3.15rem,8vw,7.5rem)] font-thin leading-[0.86] tracking-[-0.085em] text-jcl-primary">
                Property and electrical solutions that feel sharp and simple,
              </h2>
            </div>

            <div className="max-w-md lg:justify-self-end">
              <p className="text-sm leading-7 text-jcl ">
                From property guidance to gadget sourcing, we provide tailored
                solutions for homes, investment buyers, and everyday tech needs.
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
            <AnimatePresence mode="popLayout">
              {serviceCards.map((card, index) =>
                card.kind === "promo" ? (
                  <motion.article
                    key={`${shuffleId}-${card.id}-${index}`}
                    initial={{ opacity: 0, scale: 0.985, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.985, y: -8 }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative min-h-[340px] overflow-hidden rounded-2xl p-4 text-jcl-primary shadow-[0_18px_36px_rgba(0,0,0,0.12)] transition-colors duration-700 hover:-translate-y-1 sm:min-h-[380px] sm:p-5 lg:min-h-[440px] ${
                      card.tone === "primary"
                        ? "bg-jcl-primary/10"
                        : "bg-jcl-accent/10"
                    } ${index === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                  >
                    <div className="absolute left-5 top-5 flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-jcl-black" />
                      <span className="h-2 w-2 rounded-full bg-jcl-black" />
                      <span className="h-2 w-2 rounded-full bg-jcl-black" />
                    </div>
                    <div className="flex min-h-[308px] w-full flex-col justify-between gap-4 pt-8 sm:min-h-[340px] lg:min-h-[400px]">
                      <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-jcl-primary/75 sm:text-[11px]">
                          {card.eyebrow}
                        </p>
                        <h3
                          className="mt-2 max-w-full break-words text-lg font-black leading-[1.05] tracking-[-0.03em] text-jcl-primary sm:text-xl lg:text-[1.35rem]"
                          title={card.title}
                        >
                          {card.title}
                        </h3>
                      </div>
                      <p
                        className="max-w-full break-words text-base font-medium leading-[1.35] text-jcl-primary/75 sm:text-xs sm:leading-[1.45] lg:text-base"
                        title={card.description}
                      >
                        {card.description}
                      </p>
                    </div>
                  </motion.article>
                ) : (
                  <motion.article
                    key={`${shuffleId}-${card.id}-${index}`}
                    initial={{ opacity: 0, scale: 0.985, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.985, y: -8 }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className={`group relative min-h-[340px] overflow-hidden rounded-2xl bg-jcl-white shadow-[0_18px_36px_rgba(0,0,0,0.12)] transition-transform duration-300 sm:min-h-[380px] lg:min-h-[440px] ${
                      index === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                    }`}
                  >
                    <Image
                      src={card.imageUrl}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
                    <div className="absolute inset-x-0 top-0 flex justify-end p-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/20 text-white backdrop-blur-md transition-colors group-hover:bg-white/30">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <h3 className="max-w-[12rem] text-lg font-medium leading-tight text-white sm:text-xl">
                        {card.title}
                      </h3>
                      <p
                        className="mt-2 max-w-[14rem] truncate text-sm leading-6 text-white/80"
                        title={card.description}
                      >
                        {card.description}
                      </p>
                    </div>
                  </motion.article>
                ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
