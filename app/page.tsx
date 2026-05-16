import Header from "@/components/header";
import Footer from "@/components/footer";
import ServicesSection from "@/components/services-section";
import FloatingShowcaseCards from "@/components/floating-showcase-cards";
import HeroSectionSwitcher from "@/components/hero-section-switcher";
import {
  Star,
  Search,
  ChevronDown,
  Twitter,
  Instagram,
  Linkedin,
  Facebook,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-jcl-white">
      {/* Hero Section Switcher with Header Overlay */}
      <div className="relative">
        {/* Header - Fixed overlay */}
        <div className="absolute top-0 left-0 right-0 z-50">
          <Header variant="hero" />
        </div>
        
        {/* Hero Switcher */}
        <HeroSectionSwitcher />
      </div>

      <main className="flex-1">
        {/* Services Section */}
        <ServicesSection />

        {/* Why Choose Us Section - Reference-style mosaic */}
        <section className="py-16 sm:py-20 lg:py-24 xl:py-28 bg-jcl-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[24px] bg-transparent p-0">
              <div className="relative z-10 mb-6 sm:mb-8 lg:mb-10">
                <h2 className="max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.08em] text-black sm:text-6xl md:text-7xl lg:text-7xl">
                  The JCL Difference
                </h2>
              </div>

              <div className="relative z-10 grid gap-3 sm:gap-4 md:grid-cols-2">
                <div className="overflow-hidden rounded-[20px] bg-[#d9c7b2] shadow-[0_10px_30px_rgba(0,0,0,0.06)] min-h-[140px] sm:min-h-[170px]">
                  <Image
                    src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1778744174/download_1_zlxwgi.jpg"
                    alt="Home appliances display"
                    width={1080}
                    height={836}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="flex min-h-[140px] items-center rounded-[20px] bg-jcl-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:min-h-[170px] sm:p-5 lg:p-6">
                  <div className="max-w-[18rem]">
                    <h3 className="text-lg font-black leading-[1.05] tracking-[-0.04em] text-brand-navy sm:text-xl lg:text-[1.7rem]">
                      Trusted Network of Specialists:
                    </h3>
                    <p className="mt-3 max-w-[15rem] text-xs leading-5 text-brand-navy/70 sm:text-sm sm:leading-6">
                      We partner with the best property specialists near you,
                      ensuring top-tier care and service.
                    </p>
                  </div>
                </div>

                <div className="flex min-h-[140px] items-center rounded-[20px] bg-jcl-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:min-h-[170px] sm:p-5 lg:p-6">
                  <div className="max-w-[18rem]">
                    <h3 className="text-lg font-black leading-[1.05] tracking-[-0.04em] text-brand-navy sm:text-xl lg:text-[1.7rem]">
                      Compassionate Approach:
                    </h3>
                    <p className="mt-3 max-w-[15rem] text-xs leading-5 text-brand-navy/70 sm:text-sm sm:leading-6">
                      We prioritize your comfort and well-being, fostering a
                      welcoming environment built on respect and understanding.
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[20px] bg-[#d7c2a8] shadow-[0_10px_30px_rgba(0,0,0,0.06)] min-h-[140px] sm:min-h-[170px]">
                  <Image
                    src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1778745059/set-modern-home-appliances-grey-table_495423-30742_qe72re.jpg"
                    alt="Modern home appliances"
                    width={1080}
                    height={836}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="overflow-hidden rounded-[20px] bg-[#eef1ec] shadow-[0_10px_30px_rgba(0,0,0,0.06)] min-h-[140px] sm:min-h-[170px]">
                  <Image
                    src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1778745059/set-modern-home-appliances-grey-table_495423-30742_qe72re.jpg"
                    alt="Modern home appliance showcase"
                    width={1080}
                    height={836}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="flex min-h-[140px] items-center rounded-[20px] bg-jcl-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:min-h-[170px] sm:p-5 lg:p-6">
                  <div className="max-w-[18rem]">
                    <h3 className="text-lg font-black leading-[1.05] tracking-[-0.04em] text-brand-navy sm:text-xl lg:text-[1.7rem]">
                      Rapid Response:
                    </h3>
                    <p className="mt-3 max-w-[15rem] text-xs leading-5 text-brand-navy/70 sm:text-sm sm:leading-6">
                      We expedite the process of getting qualified support to
                      your home, often meeting urgent needs promptly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section - Enhanced Mobile Responsiveness */}
        <section className="relative py-16 sm:py-20 lg:py-24 xl:py-28 bg-jcl-white overflow-hidden">
          {/* CEO Section — layout inspired by reference, using site theme */}
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-20 sm:mb-24 lg:mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left: Text */}
              <div className="order-1 lg:order-1">
                <div className="text-sm font-medium text-brand-navy/70 mb-3">
                  Matt Balshin - CEO / Founder
                </div>

                <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[0.95] tracking-tight text-black mb-4">
                  mb's head
                  <br />
                  honcho.
                </h2>

                <p className="text-lg font-semibold text-brand-navy/90 mb-4 max-w-xl">
                  A hands on strategist & design creative, with a passion for
                  the details.
                </p>

                <p className="text-gray-700 mb-6 max-w-2xl">
                  Matt has been responsible for bringing concepts to life for
                  some of the world's most exciting and forward thinking brands.
                  Outside of work Matt can be found watching his favourite
                  sports and searching for a comedy show to have a few laughs.
                </p>

                <div className="flex items-center gap-4 text-gray-600">
                  <Twitter className="w-5 h-5 text-brand-navy/70 hover:text-brand-navy transition-colors" />
                  <Instagram className="w-5 h-5 text-brand-navy/70 hover:text-brand-navy transition-colors" />
                  <Linkedin className="w-5 h-5 text-brand-navy/70 hover:text-brand-navy transition-colors" />
                  <Facebook className="w-5 h-5 text-brand-navy/70 hover:text-brand-navy transition-colors" />
                </div>
              </div>

              {/* Right: Blob-masked image */}
              <div className="order-2 lg:order-2 flex justify-center lg:justify-end">
                <div className="w-full max-w-[520px] drop-shadow-2xl">
                  <svg viewBox="0 0 600 600" className="w-full h-auto block">
                    <defs>
                      <clipPath id="ceoClip">
                        <path
                          d="M490.6,136.5c38.6,62.7,53.1,180.1,24.6,256.7c-28.6,76.6-111.4,151.2-205.9,155.6c-94.5,4.4-173.8-53.8-223.2-129.9
                          C48.9,357.9,68.4,221.9,110,147.2C151.6,72.6,233.1,65.6,312,60.6C390.9,55.6,452,73.8,490.6,136.5z"
                        />
                      </clipPath>
                    </defs>
                    <g clipPath="url(#ceoClip)">
                      <image
                        href="https://res.cloudinary.com/dqidnnssq/image/upload/v1771239782/ceo_ukjbgd.jpg"
                        x="0"
                        y="0"
                        width="600"
                        height="600"
                        preserveAspectRatio="xMidYMid slice"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Original Testimonials Header and Content */}
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 sm:mb-16 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-navy rounded-full mb-4 sm:mb-6">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-white" />
                <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                  Ratings & Reviews
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-brand-navy tracking-tight">
                Real Stories. Real People. Real Results.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
              {[
                {
                  name: "Tunde O",
                  content:
                    "From check-in to check-out, everything was smooth. The place was so cozy and had this modern vibe. I even hosted a small hangout with friends. Will definitely book again.",
                  image:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
                  bgColor: "bg-brand-navy/5",
                  quoteColor: "text-brand-navy/30",
                  rotation: "-rotate-3",
                },
                {
                  name: "Chinelo A",
                  content:
                    "JCL Group's real estate division helped us find our dream property. Their attention to detail and personalized service exceeded all expectations.",
                  image:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
                  bgColor: "bg-white",
                  quoteColor: "text-gray-300",
                  rotation: "rotate-0",
                },
                {
                  name: "Idris B.",
                  content:
                    "I needed a quiet place to relax and work. Delivered! The location was central, the Wi-Fi was strong, and the host was super responsive. 10/10 experience.",
                  image:
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
                  bgColor: "bg-brand-orange/5",
                  quoteColor: "text-brand-orange/40",
                  rotation: "rotate-2",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="relative"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
                  }}
                >
                  <div
                    className={`${testimonial.bgColor} ${testimonial.rotation} rounded-xl sm:rounded-[2rem] p-6 sm:p-8 shadow-md sm:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-lg sm:hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 relative`}
                  >
                    {/* Avatar and Name at Top */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-white shadow-md flex-shrink-0">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 40px, 48px"
                        />
                      </div>
                      <p className="font-bold text-gray-900 text-sm sm:text-base">
                        {testimonial.name}
                      </p>
                    </div>

                    {/* Content */}
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-[15px] mb-3 sm:mb-4">
                      {testimonial.content}
                    </p>

                    {/* Quote Icon at Bottom Right */}
                    <div className={`${testimonial.quoteColor} ml-auto w-fit`}>
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                      >
                        <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z" />
                      </svg>
                    </div>
                  </div>
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
