"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";

const coreValues = [
  [
    "Innovation",
    "Continuous integration of modern technologies and methodologies across all business units.",
  ],
  [
    "National Progress",
    "Aligning our corporate goals with the socio-economic development of Ghana.",
  ],
  [
    "Sustainability",
    "Implementing eco-friendly engineering, green building practices, and responsible resource management.",
  ],
  [
    "Partnership",
    "Building transparent, long-term alliances with corporate, institutional, and community stakeholders.",
  ],
  [
    "Integrity",
    "Maintaining absolute transparency, strict regulatory compliance, and ethical governance in all operations.",
  ],
  [
    "Reliability",
    "Delivering complex, large-scale projects on time, within budget, and to precise specifications.",
  ],
  [
    "Excellence",
    "Setting the benchmark for quality control and operational safety in West Africa.",
  ],
];

const sectorCards = [
  {
    title: "Civil Engineering & Infrastructure",
    body: "For nearly 20 years of operational service, JCL Royal Group has delivered structural solutions that support communities and national security. We handle end-to-end project execution from architectural planning to final handover.",
    points: [
      "Industrial & logistics warehousing for high-capacity supply chains and institutional use.",
      "Modern residential and commercial builds using advanced structural engineering and climate-resilient methods.",
      "Procurement and project estimation with rigorous quantity surveying and transparent cost analysis.",
    ],
  },
  {
    title: "Real Estate, Hospitality & Industrial Partnerships",
    body: "JCL Royal Group identifies, acquires, and develops high-value assets in growth markets, mining-logistics zones, and international hospitality frameworks.",
    points: [
      "Industrial real estate positioned to support mining, housing, and operational needs in key hubs such as Tarkwa.",
      "Hospitality and franchising partnerships for luxury accommodation and corporate lodging in urban centers.",
    ],
  },
];

const strategyItems = [
  "Institutional banking partnerships with seamless financial liquidity and multi-currency (GHS/USD) compliance.",
  "Turnkey delivery for mining firms, multinational corporations, and state institutions.",
  "Integrated infrastructure and IT backbones that reduce reliance on multiple third-party vendors.",
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-jcl-white">
      <Header variant="hero" />
      <main className="flex-1">
        <section className="pt-20 pb-8 sm:pt-28">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="max-w-2xl">
              <div className="text-sm font-medium uppercase tracking-[0.28em] text-jcl-primary/65">
                [ Home / About ]
              </div>

              <h1 className="mt-4 text-4xl font-black leading-tight tracking-[-0.06em] text-jcl-primary sm:text-5xl lg:text-6xl">
                JCL Royal Group: Corporate Capability & Profile
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-jcl-primary/80 sm:text-base">
                JCL Royal Group is a multi-sector conglomerate focused on
                infrastructure, technology, real estate, hospitality, and
                strategic partnerships that support Ghana’s future growth.
              </p>

              <div className="mt-6 space-y-4 text-sm leading-7 text-jcl-primary/80 sm:text-base">
                <p>
                  To be the premier multi-sector conglomerate in West Africa,
                  recognized for driving sustainable industrialization, digital
                  transformation, and infrastructural excellence that empowers
                  communities and builds Ghana’s future.
                </p>
                <p>
                  We deliver world-class services across infrastructure,
                  technology, and real estate by integrating cutting-edge
                  engineering, robust project management, and sustainable
                  practices.
                </p>
              </div>
            </div>

            <div className="relative flex justify-start lg:justify-end">
              <div className="relative w-full max-w-[520px] overflow-hidden rounded-[28px] ring-4 ring-jcl-accent/60 ring-offset-4 ring-offset-white shadow-[0_20px_60px_rgba(7,13,75,0.12)]">
                <Image
                  src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1778744174/download_1_zlxwgi.jpg"
                  alt="JCL Royal Group"
                  width={900}
                  height={620}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-[28px] border border-jcl-primary/10 bg-white p-6 shadow-[0_18px_50px_rgba(7,13,75,0.06)]">
                <h2 className="text-2xl font-black tracking-[-0.04em] text-jcl-primary">
                  Our Vision
                </h2>
                <p className="mt-3 text-sm leading-7 text-jcl-primary/80">
                  To be the premier multi-sector conglomerate in West Africa,
                  recognized for driving sustainable industrialization, digital
                  transformation, and infrastructural excellence.
                </p>
              </div>

              <div className="rounded-[28px] border border-jcl-primary/10 bg-white p-6 shadow-[0_18px_50px_rgba(7,13,75,0.06)]">
                <h2 className="text-2xl font-black tracking-[-0.04em] text-jcl-primary">
                  Our Mission
                </h2>
                <p className="mt-3 text-sm leading-7 text-jcl-primary/80">
                  To deliver world-class services across infrastructure,
                  technology, and real estate through engineering excellence,
                  project discipline, and sustainable practices.
                </p>
              </div>

              <div className="rounded-[28px] border border-jcl-primary/10 bg-white p-6 shadow-[0_18px_50px_rgba(7,13,75,0.06)] md:col-span-2 xl:col-span-1">
                <h2 className="text-2xl font-black tracking-[-0.04em] text-jcl-primary">
                  Core Values: I.N.S.P.I.R.E.
                </h2>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-jcl-primary/80">
                  {coreValues.map(([label, description]) => (
                    <li key={label}>
                      <span className="font-semibold text-jcl-primary">
                        {label}:
                      </span>{" "}
                      {description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2">
              {sectorCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-[28px] border border-jcl-primary/10 bg-white p-6 shadow-[0_18px_50px_rgba(7,13,75,0.06)]"
                >
                  <h3 className="text-2xl font-black tracking-[-0.04em] text-jcl-primary">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-jcl-primary/80">
                    {card.body}
                  </p>
                  <ul className="mt-5 space-y-3 text-sm leading-7 text-jcl-primary/80">
                    {card.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-jcl-accent" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
              <div className="rounded-[28px] border border-jcl-primary/10 bg-white p-6 shadow-[0_18px_50px_rgba(7,13,75,0.06)]">
                <h3 className="text-2xl font-black tracking-[-0.04em] text-jcl-primary">
                  Strategic Growth & B2B Engagement
                </h3>
                <p className="mt-3 text-sm leading-7 text-jcl-primary/80">
                  JCL Royal Group operates on a collaborative growth model,
                  forming institutional partnerships with premier banking and
                  corporate stakeholders while ensuring financial liquidity and
                  international compliance.
                </p>
                <div className="mt-5 space-y-3 text-sm leading-7 text-jcl-primary/80">
                  {strategyItems.map((item) => (
                    <div key={item} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-jcl-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-jcl-primary/10 bg-jcl-blue-50 p-6 shadow-[0_18px_50px_rgba(7,13,75,0.06)]">
                <h3 className="text-2xl font-black tracking-[-0.04em] text-jcl-primary">
                  What We Can Deliver
                </h3>
                <ol className="mt-4 space-y-3 text-sm leading-7 text-jcl-primary/80 list-decimal pl-5">
                  <li>A Complete Corporate Governance & Policy Manual.</li>
                  <li>
                    Detailed Sector Playbooks for Construction, IT, and Real
                    Estate.
                  </li>
                  <li>
                    A Comprehensive 5-Year Strategic Business Plan covering
                    Ghanaian real estate, mining logistics, and hospitality.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
