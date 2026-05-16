"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { useEffect, useState } from "react";
import { realEstateImages } from "@/lib/images";

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

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-jcl-white">
      <Header variant="hero"/>
      <main className="flex-1">
        <section className="pt-20 pb-8 sm:pt-40">
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="max-w-2xl">
              <div className="text-sm font-medium uppercase tracking-[0.28em] text-jcl-primary/65">
                [ Home / About ]
              </div>

              <h1 className="mt-4 text-4xl font-extrabold leading-tight text-jcl-primary sm:text-5xl lg:text-6xl">
                Crafting Excellence Together
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-jcl-primary/80 sm:text-base">
                At JCL Royal Group we believe in the power of collaboration to
                achieve outstanding results. With a team of skilled
                professionals and commitment to quality, we work hand-in-hand
                with our clients to bring their ideas to life and make JCL the
                home for all appliances.
              </p>

              <p className="mt-4 max-w-xl text-sm leading-7 text-jcl-primary/75 sm:text-base">
                Together, we create spaces and solutions that stand the test of
                time across real estate, gadgets, appliances, and commercial
                services.
              </p>
            </div>

            <div className="relative flex justify-start lg:justify-end">
              <div className="relative w-full max-w-[520px] overflow-hidden rounded-[28px] ring-4 ring-jcl-accent/60 ring-offset-4 ring-offset-white shadow-[0_20px_60px_rgba(7,13,75,0.12)]">
                <Image
                  src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1778744174/download_1_zlxwgi.jpg"
                  alt="About JCL Royal Group"
                  width={900}
                  height={620}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 sm:py-8">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-base leading-8 text-jcl-primary/80 sm:text-lg">
              At JCL Royal Group we are committed to revolutionizing the
              industry with innovative, sustainable, and cost-effective
              solutions. With a proven track record of delivering exceptional
              projects, we combine state-of-the-art technology, skilled
              expertise, and customer-centric approaches to bring visions to
              life.
            </p>
          </div>
        </section>

        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-16">
              {[
                { value: 150, label: "Complete Projects" },
                { value: 100, label: "Team Members" },
                { value: 200, label: "Client Reviews" },
                { value: 30, label: "Winning Award" },
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
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="overflow-hidden rounded-[28px] ring-4 ring-jcl-accent/55 ring-offset-4 ring-offset-white shadow-[0_18px_50px_rgba(7,13,75,0.1)]">
              <Image
                src={realEstateImages.properties[0]?.secure_url || ""}
                alt="Mission"
                width={960}
                height={720}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold tracking-tight text-jcl-primary sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-jcl-primary/80 sm:text-base">
                To provide exceptional construction, appliance, and product
                services that exceed client expectations through innovative,
                quality craftsmanship, and a commitment to sustainability.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-jcl-primary/85 sm:text-base">
                <li className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-jcl-primary" />
                  <span>
                    Fostering Sustainable Growth and Green Development
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-jcl-primary" />
                  <span>Innovating for a Sustainable Future</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-jcl-primary" />
                  <span>Customer‑Centric Approach</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-jcl-primary" />
                  <span>Building Stronger Communities</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-12">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <h3 className="text-2xl font-bold text-jcl-primary sm:text-3xl">
                Our Vision
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-jcl-primary/80 sm:text-base">
                To redefine the future of construction, appliances, and commerce
                in Ghana by delivering sustainable, efficient, and
                community-focused projects.
              </p>
            </div>

            <div className="overflow-hidden rounded-[28px] ring-4 ring-jcl-accent/55 ring-offset-4 ring-offset-white shadow-[0_18px_50px_rgba(7,13,75,0.1)]">
              <Image
                src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1778682789/applc1_xs8bbg.jpg"
                alt="Vision"
                width={960}
                height={720}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
