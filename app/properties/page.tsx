"use client";

import Header from "@/components/header";
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

// Property Features Icons Component - Following sample's icon grid pattern
const PropertyFeatures = () => (
  <div className="grid grid-cols-3 gap-8 animate-fadeInRight">
    <div className="text-center">
      <div className="w-20 h-20 bg-brand-orange/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
        <Shield className="w-10 h-10 text-brand-orange" />
      </div>
      <h6 className="text-sm font-semibold text-white">Secure</h6>
    </div>
    <div className="text-center" style={{ animationDelay: "0.2s" }}>
      <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
        <Sparkles className="w-10 h-10 text-white" />
      </div>
      <h6 className="text-sm font-semibold text-white">Premium</h6>
    </div>
    <div className="text-center" style={{ animationDelay: "0.4s" }}>
      <div className="w-20 h-20 bg-green-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
        <CheckCircle className="w-10 h-10 text-green-400" />
      </div>
      <h6 className="text-sm font-semibold text-white">Verified</h6>
    </div>
  </div>
);

// Search Filters Component - Modular search section
const SearchFilters = () => (
  <section className="py-16 relative -mt-20 z-10">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-[2rem] p-8 shadow-2xl border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Location"
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm font-medium"
            />
          </div>
          <div className="relative">
            <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm font-medium appearance-none bg-white">
              <option>Property Type</option>
              <option>Residential</option>
              <option>Commercial</option>
              <option>Multi-Unit</option>
            </select>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 font-medium">
              $
            </span>
            <input
              type="number"
              placeholder="Max Price"
              className="w-full pl-8 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm font-medium"
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

// Property Card Component - Following sample's card structure
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

      <div className="space-y-3 mb-6">
        {property.features.slice(0, 3).map((feature: string, idx: number) => (
          <div
            key={idx}
            className="flex items-center gap-3 text-sm text-gray-600"
          >
            <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
            {feature}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <div className="text-2xl font-bold text-brand-navy">
          {property.price}
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-brand-orange text-white rounded-xl hover:opacity-90 transition-all font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          View Details
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  </div>
);

// Properties Grid Component - Following sample's grid structure
const PropertiesGrid = ({ properties }: { properties: any[] }) => (
  <section className="py-24 relative" id="properties">
    <div className="absolute top-20 left-20 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 right-20 w-80 h-80 bg-brand-navy/5 rounded-full blur-3xl"></div>

    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
      <div className="text-center mb-16">
        <div className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium mb-4 animate-fadeInDown">
          Featured Properties
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6 animate-fadeInUp">
          Explore Our Properties
        </h2>
        <p
          className="text-lg text-gray-600 max-w-2xl mx-auto animate-fadeInUp"
          style={{ animationDelay: "0.2s" }}
        >
          Discover our carefully curated selection of premium properties in
          prime locations
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

// About Section Component - Following sample's two-column about structure
const AboutSection = () => (
  <section className="py-24 relative bg-gray-50">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="animate-fadeInLeft">
          <div className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium mb-6">
            Who We Are
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
            Building Excellence for a Better Tomorrow
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            JCL Group's Real Estate Division is a fast-growing multi-sector
            enterprise built on integrity, innovation, and excellence,
            delivering quality property services across residential, commercial,
            and investment sectors.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-8">
            At our Real Estate Division, your property investment is more than
            just a transaction, it is a partnership built on trust. We
            understand that every home, office, or investment begins with a
            vision, and our responsibility is to bring that vision to life with
            precision, honesty, and excellence.
          </p>

          {/* Vision and Mission Cards */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg animate-fadeInUp">
              <h6 className="text-lg font-bold text-brand-navy mb-3">
                Our Vision
              </h6>
              <p className="text-sm text-gray-600">
                To become a leading real estate company recognized for
                innovation, sustainability, and excellence, improving everyday
                life through quality and reliable property solutions.
              </p>
            </div>
            <div
              className="bg-white rounded-2xl p-6 shadow-lg animate-fadeInUp"
              style={{ animationDelay: "0.2s" }}
            >
              <h6 className="text-lg font-bold text-brand-navy mb-3">
                Our Mission
              </h6>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-orange rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-sm text-gray-600">
                    Build quality properties that uplift communities across
                    Ghana and Africa.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-orange rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-sm text-gray-600">
                    Deliver projects efficiently, on time, and within budget.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-orange rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-sm text-gray-600">
                    Embrace technology and sustainable building practices.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Image */}
        <div className="animate-fadeInRight">
          <div className="relative h-[600px] rounded-[2rem] overflow-hidden shadow-2xl">
            <Image
              src={realEstateImages.featured[5]?.secure_url || ""}
              alt="Our Real Estate Team"
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

// Why Choose Us Component - Following sample's services structure
const WhyChooseUs = () => (
  <section className="py-24 relative">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium mb-4 animate-fadeInDown">
          Why Work With Us
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6 animate-fadeInUp">
          Why Work With Our Real Estate Division?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-[2rem] p-8 shadow-lg hover:shadow-xl transition-all text-center group animate-fadeInUp">
          <div className="w-20 h-20 bg-brand-navy/10 group-hover:bg-brand-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors">
            <Users className="w-10 h-10 text-brand-navy group-hover:text-brand-orange transition-colors" />
          </div>
          <h3 className="text-xl font-bold text-brand-navy mb-4">
            Expert Agents
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Our team includes experienced real estate professionals with deep
            local market knowledge and proven track records.
          </p>
        </div>
        <div
          className="bg-white rounded-[2rem] p-8 shadow-lg hover:shadow-xl transition-all text-center group animate-fadeInUp"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="w-20 h-20 bg-brand-navy/10 group-hover:bg-brand-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors">
            <Home className="w-10 h-10 text-brand-navy group-hover:text-brand-orange transition-colors" />
          </div>
          <h3 className="text-xl font-bold text-brand-navy mb-4">
            Curated Listings
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            We carefully select premium properties that meet our high standards
            of quality, location, and investment potential.
          </p>
        </div>
        <div
          className="bg-white rounded-[2rem] p-8 shadow-lg hover:shadow-xl transition-all text-center group animate-fadeInUp"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="w-20 h-20 bg-brand-navy/10 group-hover:bg-brand-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors">
            <Shield className="w-10 h-10 text-brand-navy group-hover:text-brand-orange transition-colors" />
          </div>
          <h3 className="text-xl font-bold text-brand-navy mb-4">
            Full Support
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            From initial consultation to closing, we guide you through every
            step of the property acquisition process.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// CTA Section Component
const CTASection = () => (
  <section className="py-24 relative">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="bg-brand-navy rounded-[2rem] p-16 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-orange/20 rounded-full blur-3xl"></div>
        <div className="relative">
          <Sparkles className="w-12 h-12 text-brand-orange mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Contact our real estate experts today for a personalized
            consultation and discover your next investment opportunity.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 bg-brand-orange text-white rounded-full font-semibold hover:bg-white hover:text-brand-navy transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Schedule a Consultation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

// Main Properties Page Component
export default function PropertiesPage() {
  const properties = [
    {
      id: 1,
      name: "Luxury Executive Villa",
      location: "East Legon, Accra",
      price: "GHS 1,800,000",
      beds: 5,
      baths: 4,
      sqft: "4,500",
      type: "Residential",
      features: [
        "Swimming Pool",
        "Fitted Kitchen",
        "Generator",
        "Security System",
        "Garden",
      ],
    },
    {
      id: 2,
      name: "Modern Office Complex",
      location: "Cantonments, Accra",
      price: "GHS 3,200,000",
      beds: 0,
      baths: 8,
      sqft: "15,000",
      type: "Commercial",
      features: [
        "Parking Spaces",
        "24/7 Security",
        "Air Conditioning",
        "Conference Rooms",
        "High-Speed Internet",
      ],
    },
    {
      id: 3,
      name: "Beachfront Resort Property",
      location: "Cape Coast",
      price: "GHS 2,500,000",
      beds: 12,
      baths: 10,
      sqft: "8,000",
      type: "Hospitality",
      features: [
        "Beach Access",
        "Restaurant",
        "Event Hall",
        "Ocean Views",
        "Spa Facilities",
      ],
    },
    {
      id: 4,
      name: "Residential Apartments",
      location: "Kumasi",
      price: "GHS 950,000",
      beds: 18,
      baths: 18,
      sqft: "12,000",
      type: "Multi-Unit",
      features: [
        "6 Units",
        "Parking",
        "Security",
        "Modern Finishes",
        "Investment Ready",
      ],
    },
    {
      id: 5,
      name: "Industrial Warehouse",
      location: "Tema",
      price: "GHS 4,100,000",
      beds: 0,
      baths: 4,
      sqft: "25,000",
      type: "Industrial",
      features: [
        "Loading Bays",
        "High Ceilings",
        "Office Space",
        "Security",
        "Strategic Location",
      ],
    },
    {
      id: 6,
      name: "Suburban Family Home",
      location: "Spintex, Accra",
      price: "GHS 780,000",
      beds: 4,
      baths: 3,
      sqft: "3,200",
      type: "Residential",
      features: [
        "Family Neighborhood",
        "Modern Kitchen",
        "Garage",
        "Study Room",
        "Garden Space",
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
        <Header />
        <main className="flex-1">
          {/* Hero Section - Following sample's full-height slideshow pattern */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Slideshow Effect */}
            <div className="absolute inset-0 z-0">
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

            {/* Hero Content */}
            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
