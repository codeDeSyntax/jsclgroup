"use client";

import DivisionsHeader from "@/components/divisions-header";
import Footer from "@/components/footer";
import Image from "next/image";
import {
  MapPin,
  Bed,
  Bath,
  Zap,
  Home,
  Heart,
  ArrowRight,
  Shield,
  Users,
  Sparkles,
  Search,
  Filter,
  Star,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { realEstateImages } from "@/lib/images";

// Hero Statistics Component - Following sample's structure
const HeroStats = () => (
  <div className="space-y-4">
    <div className="bg-gradient-to-r from-brand-orange/20 to-brand-navy/20 rounded-2xl p-6 backdrop-blur-sm animate-fadeInUp">
      <p className="text-xs text-white/80 mb-2">
        Years of Real Estate Excellence
      </p>
      <div className="text-3xl font-bold text-white">15+</div>
    </div>
    <div
      className="bg-gradient-to-r from-brand-navy/20 to-brand-orange/20 rounded-2xl p-6 backdrop-blur-sm animate-fadeInUp"
      style={{ animationDelay: "0.2s" }}
    >
      <p className="text-xs text-white/80 mb-2">Properties Sold Successfully</p>
      <div className="text-3xl font-bold text-white">500+</div>
    </div>
  </div>
);

// Client Satisfaction Component - Following sample's circular images pattern
const ClientSatisfaction = () => (
  <div className="relative animate-fadeInLeft">
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="w-24 h-24 rounded-full overflow-hidden shadow-xl border-4 border-white/20">
        <Image
          src={realEstateImages.featured[3]?.secure_url || ""}
          alt="Happy Client 1"
          width={96}
          height={96}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-24 h-24 rounded-full overflow-hidden shadow-xl border-4 border-white/20">
        <Image
          src={realEstateImages.featured[4]?.secure_url || ""}
          alt="Happy Client 2"
          width={96}
          height={96}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-xl">
      <p className="text-sm font-semibold text-white">
        <Link href="#" className="hover:text-brand-orange transition-colors">
          98%
        </Link>{" "}
        Client Satisfaction
      </p>
    </div>
  </div>
);

// Property Features Component - Following sample's icon grid
const PropertyFeatures = () => (
  <div className="grid grid-cols-3 gap-6 animate-fadeInRight">
    <div className="text-center">
      <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3 mx-auto shadow-xl">
        <Home className="w-8 h-8 text-brand-orange" />
      </div>
      <p className="text-xs text-white/80 font-medium">Residential</p>
    </div>
    <div className="text-center">
      <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3 mx-auto shadow-xl">
        <Shield className="w-8 h-8 text-brand-orange" />
      </div>
      <p className="text-xs text-white/80 font-medium">Commercial</p>
    </div>
    <div className="text-center">
      <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3 mx-auto shadow-xl">
        <Sparkles className="w-8 h-8 text-brand-orange" />
      </div>
      <p className="text-xs text-white/80 font-medium">Luxury</p>
    </div>
  </div>
);

// Enhanced Search Filters Component
const SearchFilters = () => (
  <section className="py-12 bg-white/95 backdrop-blur-sm">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-brand-navy mb-8 text-center">
          Find Your Perfect Property
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-orange w-5 h-5" />
            <input
              type="text"
              placeholder="East Legon, Cantonments..."
              className="w-full pl-14 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm font-medium"
            />
          </div>
          <div className="relative">
            <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-orange w-5 h-5" />
            <select className="w-full pl-14 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm font-medium appearance-none bg-white">
              <option>Property Type</option>
              <option>Residential Villa</option>
              <option>Executive Apartment</option>
              <option>Commercial Office</option>
              <option>Luxury Penthouse</option>
            </select>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-orange text-sm font-semibold">
              GHS
            </span>
            <input
              type="number"
              placeholder="Max Price"
              className="w-full pl-14 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm font-medium"
            />
          </div>
          <button className="flex items-center justify-center gap-3 px-8 py-4 bg-brand-navy text-white rounded-xl hover:opacity-90 transition-all font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <Search className="w-5 h-5" />
            Search Properties
          </button>
        </div>
      </div>
    </div>
  </section>
);

// Property Card Component
const PropertyCard = ({
  property,
  index,
}: {
  property: any;
  index: number;
}) => (
  <div
    className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 group animate-fadeInUp"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="relative h-64 bg-gray-100 overflow-hidden">
      <Image
        src={
          realEstateImages.properties[
            property.id % realEstateImages.properties.length
          ]?.secure_url || ""
        }
        alt={property.name}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-700"
        sizes="400px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <button className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
        <Heart size={20} className="text-red-500" />
      </button>
      <div className="absolute top-6 left-6 bg-brand-orange text-white px-4 py-2 rounded-full text-xs font-semibold">
        {property.type}
      </div>
    </div>

    <div className="p-8">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-orange transition-colors mb-3 leading-tight">
          {property.name}
        </h3>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin size={16} />
          <span className="text-sm">{property.location}</span>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-6 text-gray-600">
        {property.beds > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <Bed size={18} className="text-brand-navy" />
            <span>{property.beds}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm">
          <Bath size={18} className="text-brand-navy" />
          <span>{property.baths}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Zap size={18} className="text-brand-navy" />
          <span>{property.sqft} sqft</span>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        {property.features.slice(0, 3).map((feature: string, idx: number) => (
          <div
            key={idx}
            className="text-sm text-gray-600 flex items-center gap-3"
          >
            <CheckCircle size={16} className="text-brand-orange" />
            {feature}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-2xl font-bold text-brand-navy">
          {property.price}
        </span>
        <button className="px-6 py-3 bg-brand-navy text-white rounded-xl hover:bg-brand-navy/90 transition-colors font-semibold text-sm shadow-lg hover:shadow-xl">
          View Details
        </button>
      </div>
    </div>
  </div>
);

// Properties Grid Component
const PropertiesGrid = ({ properties }: { properties: any[] }) => (
  <section id="properties" className="py-20 bg-gray-50">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
          Featured <span className="text-brand-orange">Properties</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover our handpicked selection of premium properties across Ghana's
          most sought-after locations.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property, index) => (
          <PropertyCard key={property.id} property={property} index={index} />
        ))}
      </div>
    </div>
  </section>
);

// About Section Component
const AboutSection = () => (
  <section className="py-20 bg-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="animate-fadeInLeft">
          <div className="text-sm tracking-[0.3em] uppercase text-brand-orange font-semibold mb-6">
            About Our Real Estate Division
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-8 leading-tight">
            Ghana's Premier
            <br />
            <span className="text-brand-orange">Property Experts</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            With over 15 years of experience in Ghana's real estate market, our
            dedicated team has helped hundreds of families and businesses find
            their perfect properties. From luxury villas in East Legon to
            commercial spaces in Cantonments, we deliver excellence in every
            transaction.
          </p>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <div className="text-3xl font-bold text-brand-navy mb-2">
                500+
              </div>
              <p className="text-sm text-gray-600">Properties Sold</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-navy mb-2">98%</div>
              <p className="text-sm text-gray-600">Client Satisfaction</p>
            </div>
          </div>
        </div>
        <div className="relative animate-fadeInRight">
          <div className="relative h-96 rounded-[2rem] overflow-hidden shadow-2xl">
            <Image
              src={realEstateImages.featured[1]?.secure_url || ""}
              alt="JCL Real Estate Office"
              fill
              className="object-cover"
              sizes="600px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Why Choose Us Component
const WhyChooseUs = () => (
  <section className="py-20 bg-gray-50">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
          Why Choose <span className="text-brand-orange">JCL Real Estate?</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We combine local expertise with international standards to deliver
          exceptional real estate services.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-[2rem] p-8 shadow-lg hover:shadow-2xl transition-all duration-500 animate-fadeInUp group">
          <div className="w-16 h-16 bg-gradient-to-r from-brand-navy to-brand-blue-bright rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-brand-navy mb-4">
            Expert Local Team
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Our experienced agents have deep knowledge of Ghana's real estate
            market and provide personalized guidance throughout your property
            journey.
          </p>
        </div>

        <div
          className="bg-white rounded-[2rem] p-8 shadow-lg hover:shadow-2xl transition-all duration-500 animate-fadeInUp group"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-brand-orange to-red-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-brand-navy mb-4">
            Trusted & Secure
          </h3>
          <p className="text-gray-600 leading-relaxed">
            All transactions are handled with the highest level of security and
            transparency, ensuring your peace of mind at every step.
          </p>
        </div>

        <div
          className="bg-white rounded-[2rem] p-8 shadow-lg hover:shadow-2xl transition-all duration-500 animate-fadeInUp group"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-brand-blue-bright to-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-brand-navy mb-4">
            Premium Service
          </h3>
          <p className="text-gray-600 leading-relaxed">
            From initial consultation to closing, we provide comprehensive
            support and maintain the highest service standards in the industry.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// CTA Section Component
const CTASection = () => (
  <section className="py-20 bg-gradient-to-r from-brand-navy via-brand-navy to-brand-blue-bright text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-black/20"></div>
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        Ready to Find Your Perfect Property?
      </h2>
      <p className="text-xl opacity-90 mb-10 max-w-3xl mx-auto leading-relaxed">
        Let our expert team guide you through Ghana's premier real estate
        opportunities. From luxury residences to strategic investments, we're
        here to help.
      </p>
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 px-10 py-4 bg-brand-orange text-white rounded-full font-semibold hover:bg-white hover:text-brand-navy transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
        >
          Schedule a Consultation
          <ArrowRight className="w-5 h-5" />
        </Link>
        <Link
          href="#properties"
          className="inline-flex items-center gap-3 px-10 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-full font-semibold hover:bg-white hover:text-brand-navy transition-all"
        >
          Browse Properties
        </Link>
      </div>
    </div>
  </section>
);

export default function RealEstatePage() {
  const properties = [
    {
      id: 1,
      name: "Luxury Executive Villa",
      location: "East Legon, Accra",
      price: "GHS 1,800,000",
      beds: 5,
      baths: 4,
      sqft: "4,500",
      type: "Villa",
      features: [
        "Swimming Pool",
        "Fitted Kitchen",
        "24/7 Security",
        "Generator",
        "Landscaped Garden",
        "Master Suite",
        "Staff Quarters",
      ],
    },
    {
      id: 2,
      name: "Modern Executive Apartment",
      location: "Cantonments, Accra",
      price: "GHS 850,000",
      beds: 3,
      baths: 3,
      sqft: "2,200",
      type: "Apartment",
      features: [
        "Balcony Views",
        "Gym Access",
        "Parking Space",
        "Air Conditioning",
        "Elevator Access",
      ],
    },
    {
      id: 3,
      name: "Beachfront Resort Property",
      location: "Cape Coast",
      price: "GHS 2,500,000",
      beds: 6,
      baths: 5,
      sqft: "5,000",
      type: "Resort",
      features: [
        "Ocean View",
        "Private Beach",
        "Restaurant Ready",
        "Conference Facilities",
        "Helipad",
      ],
    },
    {
      id: 4,
      name: "Commercial Office Complex",
      location: "Airport City, Accra",
      price: "GHS 3,200,000",
      beds: 0,
      baths: 8,
      sqft: "8,000",
      type: "Commercial",
      features: [
        "Modern Office Spaces",
        "Conference Rooms",
        "Parking Garage",
        "Backup Power",
        "High-Speed Internet",
      ],
    },
    {
      id: 5,
      name: "Family Townhouse",
      location: "Spintex, Accra",
      price: "GHS 650,000",
      beds: 4,
      baths: 3,
      sqft: "2,800",
      type: "Townhouse",
      features: [
        "Garage",
        "Small Garden",
        "Modern Kitchen",
        "Guest Room",
        "Study Room",
      ],
    },
    {
      id: 6,
      name: "Investment Duplex",
      location: "Tema, Greater Accra",
      price: "GHS 1,100,000",
      beds: 4,
      baths: 4,
      sqft: "3,200",
      type: "Duplex",
      features: [
        "Rental Income Ready",
        "Separate Entrances",
        "Parking Spaces",
        "Storage Rooms",
        "Modern Appliances",
      ],
    },
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translate3d(-100%, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translate3d(100%, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 100%, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translate3d(0, -100%, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 1s ease-out;
        }

        .animate-fadeInRight {
          animation: fadeInRight 1s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }

        .animate-fadeInDown {
          animation: fadeInDown 1s ease-out;
        }
      `}</style>

      <div className="flex flex-col min-h-screen">
        <DivisionsHeader division="real-estate" divisionTitle="Real Estate" />
        <main className="flex-1">
          {/* Hero Section - Following sample's constrained container pattern */}
          <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={
              {
                "--content-width":
                  "min(100%, var(--container-max-width, 1140px))",
                "--container-max-width":
                  "var(--theme-normal-container-max-width, 1290px)",
              } as React.CSSProperties
            }
          >
            {/* Background Slideshow Effect - Constrained Width */}
            <div
              className="absolute inset-0 z-0 mx-auto rounded-t-2xl overflow-hidden"
              style={
                {
                  width: "var(--content-width)",
                  maxWidth: "var(--container-max-width)",
                  borderRadius:
                    "var(--border-radius, 0.75rem) var(--border-radius, 0.75rem) 0 0",
                } as React.CSSProperties
              }
            >
              <Image
                src={realEstateImages.featured[0]?.secure_url || ""}
                alt="Premium Properties Background"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 to-brand-navy/60"></div>
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Hero Content - Constrained Container */}
            <div
              className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8"
              style={
                {
                  width: "var(--content-width)",
                  maxWidth: "var(--container-max-width)",
                } as React.CSSProperties
              }
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                {/* Main Content - Center */}
                <div className="lg:col-span-1 text-center lg:text-left animate-fadeInUp">
                  <div className="text-xs tracking-[0.3em] uppercase text-white/70 font-medium mb-6">
                    JCL Group Real Estate Division
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                    Premium
                    <br />
                    <span className="text-brand-orange">Properties</span>
                  </h1>
                  <p className="text-lg text-white/80 leading-relaxed mb-12 max-w-2xl">
                    Discover exceptional properties across Ghana with our expert
                    real estate team. From luxury residences to commercial
                    investments.
                  </p>
                  <Link
                    href="#properties"
                    className="inline-flex items-center gap-3 px-10 py-4 bg-brand-orange text-white rounded-full font-semibold hover:bg-white hover:text-brand-navy transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Explore Properties
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>

                {/* Statistics Cards - Left */}
                <div className="lg:col-span-1 animate-fadeInLeft">
                  <HeroStats />
                </div>

                {/* Client Satisfaction & Icons - Right */}
                <div className="lg:col-span-1 space-y-12">
                  <ClientSatisfaction />
                  <PropertyFeatures />
                </div>
              </div>
            </div>
          </section>

          <SearchFilters />
          <PropertiesGrid properties={properties} />
          <AboutSection />
          <WhyChooseUs />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
}
