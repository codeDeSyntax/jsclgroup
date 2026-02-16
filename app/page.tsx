import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroBackgroundArt from "@/components/hero-background-art";
import ServicesSection from "@/components/services-section";
import PartnersSection from "@/components/partners-section";
import WhyChooseUsImages from "@/components/why-choose-us-images";
import CTABannerImages from "@/components/cta-banner-images";
import {
  ArrowRight,
  Zap,
  Home,
  Plane,
  Users,
  TrendingUp,
  Star,
  Search,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  heroImages,
  getLimitedImages,
  realEstateImages,
  travelImages,
  gadgetsImages,
} from "@/lib/images";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pb-32">
          <HeroBackgroundArt />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 pb-6">
            {/* Main Heading - Fully Responsive Typography */}
            <h1 className="font-medium text-gray-900 mb-4 sm:mb-6 tracking-tight leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              Over 50,000+ Satisfied Customers
            </h1>

            {/* Subheading - Responsive variants */}
            <div className="mx-auto mb-8">
              <p className="text-base text-gray-700 max-w-2xl mx-auto leading-6 hidden sm:block">
                From cutting-edge electronics to premium real estate and
                unforgettable travel experiences.
                <br />
                We deliver excellence across three industries — with 24/7
                support and guaranteed satisfaction.
              </p>
              <p className="text-base text-gray-700 max-w-xl mx-auto leading-6 sm:hidden">
                Curated Electronics, Premium Properties, and Exclusive Travel
                Packages.
              </p>
            </div>

            {/* Search Form - Enhanced Mobile-First Responsive Design */}
            <div className="relative max-w-5xl mx-auto  sm:px-6 lg:px-0">
              <form className="relative">
                <div className="flex flex-row items-stretch relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200">
                  {/* Division Selector Dropdown - Mobile optimized, scales up */}
                  <div className="relative border-r border-gray-200">
                    <button
                      type="button"
                      className="px-1 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4 bg-white hover:bg-gray-50 text-gray-900 font-medium text-xs sm:text-sm md:text-base flex items-center justify-center gap-1 sm:gap-2 md:gap-3 whitespace-nowrap transition-colors min-w-[80px] sm:min-w-[120px] md:min-w-[180px]"
                      style={{ minHeight: "2.5rem" }}
                    >
                      <span className="hidden sm:inline md:inline">
                        All Divisions
                      </span>
                      <span className="sm:hidden">All</span>
                      <ChevronDown
                        size={14}
                        className="flex-shrink-0 sm:w-4 sm:h-4"
                      />
                    </button>
                  </div>

                  {/* Search Input - Mobile first sizing */}
                  <input
                    type="text"
                    placeholder="Search..."
                    required
                    autoFocus
                    className="flex-1 px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4 text-sm sm:text-base border-0 focus:outline-none focus:ring-0 placeholder:text-gray-400 sm:placeholder:text-gray-500"
                    style={{ minHeight: "2.5rem" }}
                  />

                  {/* Search Buttons - Mobile optimized sizing */}
                  <div className="flex items-center gap-1 sm:gap-2 p-1 sm:p-2">
                    {/* Search Button - Smaller on mobile */}
                    <button
                      type="submit"
                      className="flex items-center justify-center min-w-[32px] sm:min-w-[40px] md:min-w-[44px] h-8 sm:h-10 md:h-12 px-2 sm:px-3 md:px-4 bg-brand-navy hover:bg-brand-navy-bright/90 text-white rounded-lg sm:rounded-xl transition-colors font-medium"
                      aria-label="Search"
                    >
                      <Search size={16} className="sm:w-5 sm:h-5" />
                      <span className="ml-1 sm:ml-2 hidden lg:inline text-xs sm:text-sm">
                        Search
                      </span>
                    </button>

                    {/* Image Search Button - Smaller on mobile */}
                    <button
                      type="button"
                      className="flex items-center justify-center min-w-[32px] sm:min-w-[40px] md:min-w-[44px] h-8 sm:h-10 md:h-12 px-2 sm:px-3 bg-gray-100 hover:bg-gray-200 rounded-lg sm:rounded-xl transition-colors"
                      title="Try Reverse Image Search"
                      aria-label="Image Search"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-gray-700 sm:w-5 sm:h-5"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                        <path
                          d="M21 15l-5-5L5 21"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </form>

              {/* Trending section - Compressed Layout */}
              <div className="mt-4 sm:mt-5 px-2 sm:px-6">
                <div className="flex items-center justify-center flex-wrap text-xs sm:text-sm text-center gap-0.5 sm:gap-1">
                  <div className="opacity-60 font-medium mr-1 sm:mr-2">
                    Trending:
                  </div>
                  <ul className="flex items-center flex-wrap justify-center p-0 m-0 gap-x-0.5 gap-y-0.5 sm:gap-x-1">
                    <li className="inline-flex items-center">
                      <Link
                        href="/gadgets"
                        className="hover:text-brand-blue-bright transition-colors px-1 py-0.5 rounded text-xs sm:text-sm"
                      >
                        <span className="relative">
                          Smart Phones
                          <span className="absolute text-gray-400">,</span>
                        </span>
                      </Link>
                    </li>
                    <li className="inline-flex items-center">
                      <Link
                        href="/real-estate/buy"
                        className="hover:text-brand-blue-bright transition-colors px-1 py-0.5 rounded text-xs sm:text-sm"
                      >
                        <span className="relative">
                          Luxury Homes
                          <span className="absolute text-gray-400">,</span>
                        </span>
                      </Link>
                    </li>
                    <li className="inline-flex items-center">
                      <Link
                        href="/travel/packages"
                        className="hover:text-brand-blue-bright transition-colors px-1 py-0.5 rounded text-xs sm:text-sm"
                      >
                        <span className="relative">
                          Travel Packages
                          <span className="absolute text-gray-400">,</span>
                        </span>
                      </Link>
                    </li>
                    <li className="inline-flex items-center">
                      <Link
                        href="/gadgets/laptops"
                        className="hover:text-brand-blue-bright transition-colors px-1 py-0.5 rounded text-xs sm:text-sm"
                      >
                        <span className="relative">
                          Laptops
                          <span className="absolute text-gray-400">,</span>
                        </span>
                      </Link>
                    </li>
                    <li className="inline-flex items-center">
                      <Link
                        href="/real-estate/invest"
                        className="hover:text-brand-blue-bright transition-colors px-1 py-0.5 rounded text-xs sm:text-sm"
                      >
                        <span className="relative">
                          Investment Properties
                          <span className="absolute text-gray-400">,</span>
                        </span>
                      </Link>
                    </li>
                    <li className="inline-flex items-center">
                      <Link
                        href="/travel"
                        className="hover:text-brand-blue-bright transition-colors px-1 py-0.5 rounded text-xs sm:text-sm"
                      >
                        <span>Tours & Bookings</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Floating Product Showcase Cards - Fully Responsive Grid */}
            <div className="mt-8 sm:mt-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {/* Real Estate Card */}
                <Link
                  href="/real-estate"
                  className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2"
                >
                  <div className="aspect-[4/3] sm:aspect-[4/3] relative">
                    <Image
                      src={
                        realEstateImages.featured[2]?.secure_url ||
                        realEstateImages.properties[0]?.secure_url ||
                        ""
                      }
                      alt={
                        heroImages.realEstate[0]?.alt ||
                        realEstateImages.properties[0]?.alt ||
                        "Real Estate"
                      }
                      fill
                      className="object-cover group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Home className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        <span className="text-white text-xs font-semibold uppercase tracking-wider">
                          Real Estate
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-base sm:text-lg">
                        Premium Properties
                      </h3>
                    </div>
                  </div>
                </Link>

                {/* Travel Card */}
                <Link
                  href="/travel"
                  className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2"
                >
                  <div className="aspect-[4/3] sm:aspect-[4/3] relative">
                    <Image
                      src={travelImages.packages[2]?.secure_url || ""}
                      alt={heroImages.travel[0]?.alt || "Travel"}
                      fill
                      className="object-cover group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Plane className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        <span className="text-white text-xs font-semibold uppercase tracking-wider">
                          Travel & Tours
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-base sm:text-lg">
                        Explore Destinations
                      </h3>
                    </div>
                  </div>
                </Link>

                {/* Gadgets Card */}
                <Link
                  href="/gadgets"
                  className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 sm:col-span-2 lg:col-span-1"
                >
                  <div className="aspect-[4/3] sm:aspect-[4/3] relative">
                    <Image
                      src={
                        heroImages.gadgets[0]?.secure_url ||
                        gadgetsImages.featured[0]?.secure_url ||
                        ""
                      }
                      alt={
                        heroImages.gadgets[0]?.alt ||
                        gadgetsImages.featured[0]?.alt ||
                        "Electronics"
                      }
                      fill
                      className="object-cover group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        <span className="text-white text-xs font-semibold uppercase tracking-wider">
                          Electronics
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-base sm:text-lg">
                        Smart Gadgets
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <PartnersSection />

        {/* Services Section */}
        <ServicesSection />

        {/* Why Choose Us Section - Enhanced Responsive Design */}
        <section className="py-16 sm:py-20 lg:py-24 xl:py-28 bg-gradient-to-b from-white via-brand-orange/5 to-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-start">
              {/* Left Side - Text Content */}
              <div className="text-center lg:text-left">
                <div className="mb-3 sm:mb-4">
                  <span className="text-xs sm:text-sm font-semibold text-brand-blue-bright uppercase tracking-wider">
                    / Why JCL Group?
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-gray-900 mb-4 sm:mb-6 tracking-tight">
                  The JCL Difference
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base max-w-lg mx-auto lg:mx-0">
                  For over a decade, we've been a trusted service provider,
                  earning and maintaining the trust of the community across real
                  estate, travel, and electronics sectors.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 text-brand-blue-bright font-semibold hover:gap-3 transition-all text-sm sm:text-base min-h-[44px] px-4"
                  >
                    Contact Us
                    <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center gap-2 text-gray-900 font-semibold hover:gap-3 transition-all text-sm sm:text-base min-h-[44px] px-4"
                  >
                    Learn More
                    <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </Link>
                </div>
              </div>

              {/* Middle - Benefits List */}
              <div className="space-y-6 sm:space-y-8 relative">
                {/* Connecting Line - Hidden on mobile */}
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-brand-navy/20 hidden sm:block"></div>

                {/* Benefit 1 */}
                <div className="flex items-start gap-3 sm:gap-4 relative">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-brand-navy rounded-full flex items-center justify-center z-10">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 pt-0.5 sm:pt-1">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">
                      Competitive Pricing
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                      Experience quality without breaking the bank—we offer fair
                      and competitive pricing across all our services.
                    </p>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="flex items-start gap-3 sm:gap-4 relative">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-brand-navy rounded-full flex items-center justify-center z-10">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 pt-0.5 sm:pt-1">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">
                      Easy Financing
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                      Don't let budget constraints stop you—explore our
                      hassle-free financing options for your needs.
                    </p>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="flex items-start gap-3 sm:gap-4 relative">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-brand-navy rounded-full flex items-center justify-center z-10">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 pt-0.5 sm:pt-1">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">
                      Certified Experts
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                      Choose JCL for proven excellence backed by certified
                      professionals across all divisions.
                    </p>
                  </div>
                </div>

                {/* Benefit 4 */}
                <div className="flex items-start gap-3 sm:gap-4 relative">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-brand-navy rounded-full flex items-center justify-center z-10">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 pt-0.5 sm:pt-1">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">
                      100% Satisfaction
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                      Don't just take our word for it—see what customers across
                      Ghana say about JCL Group.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Auto-Rotating Images */}
              <WhyChooseUsImages />
            </div>
          </div>
        </section>

        {/* Testimonials Section - Enhanced Mobile Responsiveness */}
 <section className="relative py-16 sm:py-20 lg:py-24 xl:py-28 bg-gradient-to-b from-white via-brand-navy/2 to-white overflow-hidden">
          {/* CEO Message Section */}
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-20 sm:mb-24 lg:mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              {/* CEO Image */}
              <div className="relative order-2 lg:order-1">
                <div className="relative w-full aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://res.cloudinary.com/dqidnnssq/image/upload/v1771239782/ceo_ukjbgd.jpg"
                    alt="CEO - JCL Group"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
                {/* Decorative Element */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-orange rounded-2xl opacity-10 blur-2xl" />
              </div>

              {/* CEO Message */}
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-orange/10 rounded-full mb-4 sm:mb-6 border border-brand-orange/20">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-brand-orange" />
                  <span className="text-xs sm:text-sm font-semibold text-brand-orange uppercase tracking-wide">
                    Message from Leadership
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-brand-navy mb-4 sm:mb-6 tracking-tight">
                  Driven by Vision, Guided by Values
                </h2>

                <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                  At JCL Group, we believe in transforming lives through
                  excellence. For over a decade, our commitment to quality,
                  integrity, and customer satisfaction has made us a trusted
                  name across Ghana.
                </p>

                <p className="text-gray-600 leading-relaxed mb-8 sm:mb-10 text-sm sm:text-base">
                  Whether it's finding your dream home, embarking on
                  unforgettable travels, or accessing cutting-edge technology,
                  JCL Group is your partner in success. Thank you for your
                  continued trust in us.
                </p>

                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <p className="font-bold text-brand-navy text-base sm:text-lg">
                      Chief Executive Officer
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      JCL Group of Companies
                    </p>
                  </div>
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
        {/* CTA Banner Section - Enhanced Mobile Design */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-6xl mx-auto bg-brand-navy/10 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100">
              {/* Background Pattern */}
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  // backgroundImage:
                  //   "radial-gradient(circle at 2px 2px, #200070 1px, transparent 0)",
                  backgroundSize: "40px 40px",
                }}
              ></div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-brand-orange/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-brand-blue-bright/5 rounded-full blur-3xl"></div>

              {/* Content */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-6 lg:gap-8 items-center px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10">
                {/* Left - Text Content */}
                <div className="text-center lg:text-left order-2 lg:order-1">
                  <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-brand-navy/5 rounded-full mb-3 sm:mb-4 border border-brand-navy/10">
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-orange" />
                    <span className="text-xs font-semibold text-brand-navy uppercase tracking-wider">
                      Let's Work Together
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4 tracking-tight text-brand-navy">
                    Ready to Get Started?
                  </h2>

                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                    Whether you&apos;re looking for electronics, real estate, or
                    travel experiences, we&apos;re here to help.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:justify-start justify-center">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-brand-orange text-white rounded-full font-bold hover:bg-brand-orange/90 transition-all hover:shadow-xl group text-xs sm:text-sm min-h-[44px]"
                    >
                      Contact Us Today
                      <ArrowRight
                        size={14}
                        className="sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform"
                      />
                    </Link>

                    <Link
                      href="/services"
                      className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-brand-navy/10 text-brand-navy rounded-full font-bold hover:bg-brand-navy/20 transition-all border border-brand-navy/20 hover:border-brand-navy/40 text-xs sm:text-sm min-h-[44px]"
                    >
                      Explore Services
                    </Link>
                  </div>
                </div>

                {/* Right - Image Carousel */}
                <div className="relative h-[200px] sm:h-[250px] lg:h-[300px] rounded-lg sm:rounded-xl overflow-hidden  order-1 lg:order-2">
                  <CTABannerImages />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
