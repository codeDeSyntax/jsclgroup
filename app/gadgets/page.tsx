import Header from "@/components/header";
import Footer from "@/components/footer";
import { Star, ShoppingCart, Zap } from "lucide-react";
import Link from "next/link";

export default function GadgetsPage() {
  const products = [
    {
      id: 1,
      name: "Smart Home Hub Pro",
      category: "Smart Home",
      price: "$299.99",
      rating: 4.8,
      reviews: 156,
      description: "Central control system for all your smart home devices",
      features: ["Voice Control", "App Integration", "24h Support"],
    },
    {
      id: 2,
      name: "Wireless Earbuds Elite",
      category: "Audio",
      price: "$149.99",
      rating: 4.7,
      reviews: 342,
      description: "Premium noise-cancelling wireless earbuds",
      features: ["Noise Cancelling", "30h Battery", "Premium Sound"],
    },
    {
      id: 3,
      name: "4K Security Camera Set",
      category: "Security",
      price: "$399.99",
      rating: 4.9,
      reviews: 218,
      description: "Professional-grade 4K security camera system",
      features: ["4K Resolution", "Night Vision", "Cloud Storage"],
    },
    {
      id: 4,
      name: "Smart Thermostat Deluxe",
      category: "Climate Control",
      price: "$179.99",
      rating: 4.6,
      reviews: 289,
      description: "Energy-efficient smart temperature management",
      features: ["Learning Algorithm", "Energy Saving", "Remote Control"],
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
    {
      id: 7,
      name: "Robotic Vacuum Pro",
      category: "Home Cleaning",
      price: "$599.99",
      rating: 4.7,
      reviews: 198,
      description: "AI-powered intelligent cleaning robot",
      features: ["Obstacle Detection", "Smart Mapping", "Auto Charging"],
    },
    {
      id: 8,
      name: "Air Purifier Smart",
      category: "Air Quality",
      price: "$249.99",
      rating: 4.6,
      reviews: 267,
      description: "HEPA filter smart air purification system",
      features: ["HEPA Filter", "Air Quality Monitor", "Auto Mode"],
    },
    {
      id: 9,
      name: "5G Mobile Router",
      category: "Connectivity",
      price: "$189.99",
      rating: 4.8,
      reviews: 156,
      description: "Ultra-fast 5G portable connectivity solution",
      features: ["5G Speed", "Long Battery", "Multiple Devices"],
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
        <section className="bg-gradient-to-b from-brand-orange/5 via-white to-white py-20 md:py-28 relative overflow-hidden">
          {/* Background Glow */}
          <div
            className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-3xl -z-10"
            aria-hidden="true"
          ></div>

          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-orange/10 rounded-2xl mb-6">
              <Zap className="text-brand-orange" size={40} />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-brand-navy mb-6 tracking-tight">
              Electrical Gadgets & Tech
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover our curated collection of the latest and greatest
              technology products.
            </p>
          </div>
        </section>

        {/* Quick Links to Categories */}
        <section className="py-12 bg-white border-y border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/gadgets/phones"
                className="group p-6 border-2 border-brand-blue-bright/20 hover:border-brand-blue-bright rounded-2xl transition-all hover:shadow-lg bg-white"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-blue-bright/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-blue-bright mb-2">
                      Mobile Phones
                    </h3>
                    <p className="text-sm text-gray-600">
                      Latest smartphone models with cutting-edge features
                    </p>
                  </div>
                </div>
              </Link>
              <Link
                href="/gadgets/laptops"
                className="group p-6 border-2 border-brand-orange/20 hover:border-brand-orange rounded-2xl transition-all hover:shadow-lg bg-white"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-2xl">💻</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-orange mb-2">
                      Laptops & Computers
                    </h3>
                    <p className="text-sm text-gray-600">
                      High-performance computing for work and play
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-gray-50 border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-6 py-3 rounded-xl whitespace-nowrap font-semibold transition-all text-sm ${
                    index === 0
                      ? "bg-brand-navy text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-brand-navy/5 border border-gray-200 hover:border-brand-navy/30"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group border border-gray-100"
                >
                  {/* Product Image */}
                  <div className="h-64 bg-gradient-to-br from-brand-navy/5 to-brand-blue-bright/5 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="text-7xl relative z-10 group-hover:scale-110 transition-transform">
                      📱
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="text-sm text-brand-orange font-bold mb-2 uppercase tracking-wide">
                          {product.category}
                        </p>
                        <h3 className="text-xl font-bold text-brand-navy leading-tight">
                          {product.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < Math.floor(product.rating)
                                ? "fill-brand-orange text-brand-orange"
                                : "text-gray-200"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-brand-navy">
                        {product.rating}
                      </span>
                      <span className="text-sm text-gray-400">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-brand-navy/5 text-brand-navy text-xs rounded-lg font-medium border border-brand-navy/10"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Price and Button */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-3xl font-bold text-brand-orange">
                        {product.price}
                      </span>
                      <button className="flex items-center justify-center gap-2 px-5 py-3 bg-brand-navy text-white rounded-xl hover:bg-brand-navy/90 transition-all shadow-md hover:shadow-lg group/btn">
                        <ShoppingCart
                          size={20}
                          className="group-hover/btn:scale-110 transition-transform"
                        />
                        <span className="text-sm font-semibold">Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4 tracking-tight">
                Why Shop With Us?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We deliver exceptional value and service with every purchase
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-brand-navy/5 to-brand-blue-bright/5 rounded-2xl p-10 text-center hover:shadow-xl transition-all border border-brand-navy/10">
                <div className="text-5xl mb-6">✓</div>
                <h3 className="text-xl font-bold text-brand-navy mb-3">
                  Authentic Products
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  All items are genuine with full manufacturer warranties.
                </p>
              </div>
              <div className="bg-gradient-to-br from-brand-orange/5 to-brand-navy/5 rounded-2xl p-10 text-center hover:shadow-xl transition-all border border-brand-orange/10">
                <div className="text-5xl mb-6">🚚</div>
                <h3 className="text-xl font-bold text-brand-orange mb-3">
                  Fast Delivery
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Quick shipping with tracking and insurance included.
                </p>
              </div>
              <div className="bg-gradient-to-br from-brand-blue-bright/5 to-brand-orange/5 rounded-2xl p-10 text-center hover:shadow-xl transition-all border border-brand-blue-bright/10">
                <div className="text-5xl mb-6">💬</div>
                <h3 className="text-xl font-bold text-brand-blue-bright mb-3">
                  Expert Support
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  24/7 customer service and technical assistance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-brand-orange via-brand-orange/90 to-brand-navy text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          ></div>

          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Need Help Choosing?
            </h2>
            <p className="text-xl opacity-95 mb-10 max-w-2xl mx-auto leading-relaxed">
              Our tech experts are ready to help you find the perfect device for
              your needs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-brand-navy rounded-xl font-bold hover:bg-gray-50 transition-all shadow-2xl text-lg"
            >
              Contact Our Tech Team
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
