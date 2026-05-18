"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
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
  return (
    <div className="flex min-h-screen flex-col bg-jcl-white">
      <Header variant="hero" />
      <main className="flex-1">
        <section className="pt-20 pb-8 sm:pt-40">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.28em] text-jcl-primary/65">
                [ Home / Services ]
              </div>

              <h1 className="mt-4 text-4xl font-extrabold leading-tight text-jcl-primary sm:text-5xl lg:text-6xl">
                Comprehensive Solutions for Your Needs
              </h1>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-jcl-primary/80 sm:text-base">
                JCL Royal Group delivers world-class services across real
                estate, construction, electronics, and customer support. Our
                expert team is dedicated to providing tailored solutions that
                drive success and exceed expectations.
              </p>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-jcl-primary/75 sm:text-base">
                From property investments to construction projects and
                cutting-edge gadgets, we provide comprehensive support every
                step of the way.
              </p>
            </div>
          </div>
        </section>

        <section className="py-4 sm:py-8">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-base leading-8 text-jcl-primary/80 sm:text-lg">
              Our diverse service portfolio is designed to meet every aspect of
              your needs. Whether you're looking for premium properties,
              construction excellence, quality electronics, or exceptional
              customer support, we combine expertise, innovation, and dedication
              to deliver outstanding results.
            </p>
          </div>
        </section>

        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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

        <section className="py-8 sm:py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-jcl-primary sm:text-4xl">
                What We Offer
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-jcl-primary/80 sm:text-base">
                Our comprehensive range of services is designed to address all
                your needs with professional expertise and personalized
                attention.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-jcl-primary/85 sm:text-base">
                <li className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-jcl-accent" />
                  <span>Property Sales & Rental Management</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-jcl-accent" />
                  <span>Professional Construction Services</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-jcl-accent" />
                  <span>Premium Electronics & Gadgets</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-jcl-accent" />
                  <span>Dedicated Customer Support</span>
                </li>
              </ul>
            </div>
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
