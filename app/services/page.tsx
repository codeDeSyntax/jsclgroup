"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { contactInfo } from "@/lib/contact";
import { useEffect, useState } from "react";

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1400;
    const steps = 40;
    const increment = target / steps;
    let current = 0;

    const timer = window.setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        window.clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => window.clearInterval(timer);
  }, [target]);

  return <>{count}+</>;
}

export default function ServicesPage() {
  const services = [
    {
      title: "Real Estate Services",
      tags: ["Property Sales", "Rentals", "Investment Advisory"],
      description:
        "By working closely with clients, we deliver practical real estate solutions that match budget, location, and long-term goals.",
      cta: "Discuss Project",
      highlighted: true,
    },
    {
      title: "Tenofo - Sales of Appliances and Gadgets",
      tags: ["Home Appliances", "Gadgets", "After-Sales Support"],
      description:
        "We provide trusted appliances and gadgets for homes and businesses, with guidance on selecting the right products for everyday use.",
    },
    {
      title: "Professional Construction Services",
      tags: ["Building", "Renovation", "Project Delivery"],
    },
    {
      title: "Property Maintenance and Facility Support",
      tags: ["Inspections", "Repairs", "Facility Care"],
    },
    {
      title: "Dedicated Customer Support",
      tags: ["Client Care", "Issue Resolution", "Follow-Up"],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-jcl-white">
      <Header variant="hero" />
      <main className="flex-1">
        <section className="pt-20 pb-8 sm:pt-40 ">
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-jcl-primary sm:text-5xl">
            Our Services
          </h1>
          <p className="text-base max-w-4xl mx-auto leading-8 text-jcl-primary/80 sm:text-lg p-4">
            Our diverse service portfolio is designed to meet every aspect of
            your needs. Whether you're looking for premium properties,
            construction excellence, quality electronics, or exceptional
            customer support, we combine expertise, innovation, and dedication
            to deliver outstanding results.
          </p>
        </section>

        <section className="pt-10 sm:pt-12">
          <div className="mx-auto max-w-6xl bg-[#d3e5ea] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-16">
              {[
                { value: 150, label: "Projects Delivered" },
                { value: 50, label: "Service Categories" },
                { value: 1000, label: "Happy Clients" },
                { value: 20, label: "Years Experience" },
              ].map((item) => (
                <div key={item.label} className="w-36 text-center sm:w-40">
                  <div className="text-4xl font-extrabold tracking-tight text-jcl-primary sm:text-5xl">
                    <AnimatedCounter target={item.value} />
                  </div>
                  <div className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-jcl-primary/70 sm:text-[11px]">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-8 sm:pb-12">
          <div className="mx-auto max-w-6xl border-y border-jcl-primary/15">
            {services.map((service, index) => (
              <article
                key={service.title}
                className={`grid grid-cols-1 gap-6 border-t border-jcl-primary/15 px-4 py-8 sm:grid-cols-[72px_1fr] sm:px-8 sm:py-10 ${
                  index === 0 ? "border-t-0 bg-[#d3e5ea]" : "bg-white"
                }`}
              >
                <div className="text-xs font-semibold tracking-[0.2em] text-jcl-primary/60 sm:pt-2">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <h2 className="text-3xl font-semibold leading-tight text-jcl-primary sm:text-5xl">
                    {service.title}
                  </h2>

                  <p className="mt-3 text-sm text-jcl-primary/70 sm:text-base">
                    {service.tags.join(" • ")}
                  </p>

                  {service.description ? (
                    <p className="mt-5 max-w-3xl text-sm leading-7 text-jcl-primary/80 sm:text-base">
                      {service.description}
                    </p>
                  ) : null}

                  {service.cta ? (
                    <a
                      href={contactInfo.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-block rounded-full border border-jcl-primary/70 px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-jcl-primary transition hover:bg-jcl-primary hover:text-white"
                    >
                      {service.cta}
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-8 sm:py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div>
              <h3 className="text-2xl font-bold text-jcl-primary sm:text-3xl">
                Our Service Promise
              </h3>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-jcl-primary/80 sm:text-base">
                We are committed to delivering exceptional value in every
                service. With transparent communication, professional execution,
                and post-service support, we ensure your complete satisfaction
                and success.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
