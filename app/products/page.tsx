"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  Search,
  Filter,
  Package,
  Star,
  Heart,
  ShoppingCart,
  ArrowRight,
  Shield,
  Zap,
  CheckCircle,
  Users,
} from "lucide-react";

// Product data
const gadgetsImages = {
  featured: [
    {
      secure_url:
        "https://res.cloudinary.com/dqidnnssq/image/upload/v1733928641/phone1_z9zl9u.webp",
    },
    {
      secure_url:
        "https://res.cloudinary.com/dqidnnssq/image/upload/v1733928641/phone2_cjk8kv.webp",
    },
    {
      secure_url:
        "https://res.cloudinary.com/dqidnnssq/image/upload/v1733928641/phone3_fxehto.webp",
    },
  ],
  products: [
    {
      secure_url:
        "https://res.cloudinary.com/dqidnnssq/image/upload/v1733928641/phone1_z9zl9u.webp",
    },
    {
      secure_url:
        "https://res.cloudinary.com/dqidnnssq/image/upload/v1733928641/phone2_cjk8kv.webp",
    },
    {
      secure_url:
        "https://res.cloudinary.com/dqidnnssq/image/upload/v1733928641/phone3_fxehto.webp",
    },
  ],
};

// Search Filters Component - Responsive design that feels consistent across all devices
const SearchFilters = () => (
  <section className="py-16 relative -mt-20 z-10">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-2xl border border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search Products"
              className="w-full pl-12 pr-4 py-3 md:py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm font-medium bg-white"
            />
          </div>
          <div className="relative">
            <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select className="w-full pl-12 pr-4 py-3 md:py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm font-medium appearance-none bg-white">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Smart Home</option>
              <option>Audio</option>
              <option>Security</option>
            </select>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 font-medium">
              $
            </span>
            <input
              type="number"
              placeholder="Max Price"
              className="w-full pl-8 pr-4 py-3 md:py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm font-medium bg-white"
            />
          </div>
          <button className="flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-blue-900 text-white rounded-xl hover:opacity-90 transition-all font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <Filter className="w-5 h-5" />
            <span className="hidden sm:inline">Find Products</span>
            <span className="sm:hidden">Search</span>
          </button>
        </div>
      </div>
    </div>
  </section>
);

// Product Card Component
const ProductCard = ({ product, index }: { product: any; index: number }) => (
  <div
    className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 group animate-fadeInUp"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="relative h-64 bg-gray-50 overflow-hidden">
      <Image
        src={
          gadgetsImages.products[product.id % gadgetsImages.products.length]
            ?.secure_url || ""
        }
        alt={product.name}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-700 p-4"
        sizes="400px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <button className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
        <Heart size={20} className="text-red-500" />
      </button>
      <div className="absolute top-6 left-6 bg-orange-500 text-white px-4 py-2 rounded-full text-xs font-semibold">
        {product.category}
      </div>
      {product.isNew && (
        <div className="absolute top-16 left-6 bg-green-500 text-white px-4 py-2 rounded-full text-xs font-semibold">
          New
        </div>
      )}
    </div>

    <div className="p-8">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-blue-900 group-hover:text-orange-500 transition-colors mb-3 leading-tight">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            ({product.reviews} reviews)
          </span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          {product.description}
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {product.features.slice(0, 3).map((feature: string, idx: number) => (
          <div
            key={idx}
            className="flex items-center gap-3 text-sm text-gray-600"
          >
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            {feature}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <div className="text-2xl font-bold text-blue-900">{product.price}</div>
        <button className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl hover:opacity-90 transition-all font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

const page = () => {
  const products = [
    {
      id: 1,
      name: "Smart Home Hub Pro",
      category: "Smart Home",
      price: "$299.99",
      rating: 4.9,
      reviews: 234,
      description: "Central control system for all smart devices",
      features: ["Voice Control", "200+ Device Support", "AI Learning"],
      isNew: true,
    },
    {
      id: 2,
      name: "Wireless Earbuds Elite",
      category: "Audio",
      price: "$199.99",
      rating: 4.7,
      reviews: 512,
      description: "Premium sound quality with noise cancellation",
      features: ["ANC", "30H Battery", "Wireless Charging"],
    },
    {
      id: 3,
      name: "Smart Security Camera",
      category: "Security",
      price: "$149.99",
      rating: 4.8,
      reviews: 89,
      description: "4K security monitoring with AI detection",
      features: ["4K Video", "Night Vision", "Motion Detection"],
    },
    {
      id: 4,
      name: "Climate Control System",
      category: "Climate Control",
      price: "$399.99",
      rating: 4.6,
      reviews: 167,
      description: "Smart thermostat with learning capabilities",
      features: ["Auto Schedule", "Energy Saving", "Remote Control"],
    },
    {
      id: 5,
      name: "Portable Projector X1",
      category: "Display",
      price: "$449.99",
      rating: 4.8,
      reviews: 127,
      description: "Compact 4K portable projection system",
      features: ["4K Support", "Portable", "Built-in Speaker"],
    },
    {
      id: 6,
      name: "Smart Lighting Kit",
      category: "Lighting",
      price: "$129.99",
      rating: 4.5,
      reviews: 405,
      description: "RGB programmable smart lighting system",
      features: ["16M Colors", "Schedule Control", "Voice Control"],
    },
  ];

  const categories = [
    "All Products",
    "Smart Home",
    "Audio",
    "Security",
    "Display",
    "Climate Control",
    "Lighting",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 relative min-h-[60vh] flex items-center">
          <div className="absolute inset-0 bg-gray-50"></div>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-orange-500" />
                  </div>
                  <span className="text-sm font-semibold text-orange-500">
                    Premium Electronics
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-6">
                  Latest Tech &<br />
                  <span className="text-orange-500">Smart Gadgets</span>
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
                  Discover our carefully curated collection of cutting-edge
                  technology products and smart home solutions.
                </p>

                {/* Search Bar - Mobile and Desktop Optimized */}
                <div className="mb-8">
                  <div className="relative max-w-lg">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-12 pr-4 py-4 text-base border border-gray-300 rounded-2xl bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-lg transition-all"
                      placeholder="Search for products..."
                    />
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                      <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-4 py-2 text-sm font-semibold transition-colors">
                        Search
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-blue-900 text-white rounded-full font-semibold hover:opacity-90 transition-all">
                    Browse Products
                    <ArrowRight size={18} />
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-all">
                    <Filter size={18} />
                    Filter by Category
                  </button>
                </div>
              </div>

              {/* Images Bento */}
              <div className="grid grid-cols-2 gap-4 h-[300px] sm:h-[400px]">
                <div className="bg-white rounded-2xl p-4 sm:p-6 flex items-center justify-center shadow-lg border border-gray-100">
                  <Image
                    src={gadgetsImages.featured[0]?.secure_url || ""}
                    alt="Featured Product"
                    width={180}
                    height={120}
                    className="object-contain w-full h-full max-w-[120px] sm:max-w-[180px]"
                  />
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-3 sm:p-4 flex items-center justify-center shadow-lg border border-gray-100 flex-1">
                    <Image
                      src={gadgetsImages.featured[1]?.secure_url || ""}
                      alt="Product 2"
                      width={120}
                      height={80}
                      className="object-contain w-full h-full max-w-[80px] sm:max-w-[120px]"
                    />
                  </div>
                  <div className="bg-white rounded-2xl p-3 sm:p-4 flex items-center justify-center shadow-lg border border-gray-100 flex-1">
                    <Image
                      src={gadgetsImages.featured[2]?.secure_url || ""}
                      alt="Product 3"
                      width={120}
                      height={80}
                      className="object-contain w-full h-full max-w-[80px] sm:max-w-[120px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Filters - Responsive design */}
        <SearchFilters />

        {/* Category Filter */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 sm:px-6 py-2 rounded-full whitespace-nowrap font-medium transition-all text-sm sm:text-base ${
                    index === 0
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                Why Shop With Us?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Authentic Products
                </h3>
                <p className="text-gray-600">
                  All items are genuine with full manufacturer warranties.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Fast Delivery
                </h3>
                <p className="text-gray-600">
                  Quick shipping with tracking and insurance included.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Expert Support
                </h3>
                <p className="text-gray-600">
                  24/7 customer service and technical assistance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-blue-900 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <ShoppingCart className="w-12 h-12 text-orange-500 mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              Need Help Choosing?
            </h2>
            <p className="text-base sm:text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Our tech experts are ready to help you find the perfect device for
              your needs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Contact Our Tech Team
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default page;
