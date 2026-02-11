import Header from "@/components/header";
import Footer from "@/components/footer";
import { Calendar, Users, MapPin, Star, Plane, Clock } from "lucide-react";
import Link from "next/link";

export default function TravelPage() {
  const packages = [
    {
      id: 1,
      name: "European Grand Tour",
      destination: "Paris, Rome, Barcelona",
      price: "$4,299",
      duration: "14 Days",
      groupSize: "12-20 people",
      rating: 4.9,
      reviews: 127,
      description:
        "Experience Europe's most iconic cities with expert guides and luxury accommodations.",
      highlights: [
        "Paris Eiffel Tower",
        "Roman Colosseum",
        "Barcelona Architecture",
      ],
    },
    {
      id: 2,
      name: "Tropical Paradise Escape",
      destination: "Bali & Lombok, Indonesia",
      price: "$2,899",
      duration: "7 Days",
      groupSize: "8-16 people",
      rating: 4.8,
      reviews: 98,
      description:
        "Relax on pristine beaches and explore tropical landscapes with private guides.",
      highlights: ["Island Hopping", "Beach Resorts", "Sunset Cruises"],
    },
    {
      id: 3,
      name: "African Safari Adventure",
      destination: "Kenya & Tanzania",
      price: "$5,599",
      duration: "10 Days",
      groupSize: "6-12 people",
      rating: 4.9,
      reviews: 156,
      description:
        "Experience the wildlife and natural beauty of Africa's greatest safari destinations.",
      highlights: ["Big Five", "Serengeti", "Maasai Villages"],
    },
    {
      id: 4,
      name: "Japan Cultural Journey",
      destination: "Tokyo, Kyoto, Osaka",
      price: "$3,699",
      duration: "10 Days",
      groupSize: "10-18 people",
      rating: 4.7,
      reviews: 142,
      description:
        "Immerse yourself in Japan's rich culture, ancient temples, and modern technology.",
      highlights: ["Temple Tours", "Tea Ceremonies", "Cherry Blossoms"],
    },
    {
      id: 5,
      name: "Swiss Alps & Scenic Railways",
      destination: "Switzerland",
      price: "$3,399",
      duration: "8 Days",
      groupSize: "10-20 people",
      rating: 4.8,
      reviews: 89,
      description:
        "Explore stunning alpine scenery and ride legendary scenic mountain railways.",
      highlights: ["Alpine Mountains", "Scenic Trains", "Charming Villages"],
    },
    {
      id: 6,
      name: "Caribbean Luxury Cruise",
      destination: "Caribbean Islands",
      price: "$2,499",
      duration: "7 Days",
      groupSize: "20-50 people",
      rating: 4.6,
      reviews: 203,
      description:
        "Experience island hopping luxury with all-inclusive amenities and world-class dining.",
      highlights: ["Island Stops", "Beach Days", "Water Sports"],
    },
    {
      id: 7,
      name: "South America Explorer",
      destination: "Peru, Bolivia, Chile",
      price: "$4,799",
      duration: "12 Days",
      groupSize: "8-14 people",
      rating: 4.9,
      reviews: 134,
      description:
        "Discover ancient civilizations, vibrant cultures, and breathtaking landscapes.",
      highlights: ["Machu Picchu", "Atacama Desert", "Amazon Rainforest"],
    },
    {
      id: 8,
      name: "Middle East Heritage",
      destination: "Dubai, Abu Dhabi, Oman",
      price: "$3,199",
      duration: "9 Days",
      groupSize: "12-18 people",
      rating: 4.7,
      reviews: 76,
      description:
        "Experience modern marvels and ancient heritage in the Middle East.",
      highlights: ["Desert Safari", "Luxury Shopping", "Cultural Sites"],
    },
    {
      id: 9,
      name: "Iceland Natural Wonders",
      destination: "Iceland",
      price: "$2,199",
      duration: "6 Days",
      groupSize: "8-16 people",
      rating: 4.8,
      reviews: 112,
      description:
        "Experience Iceland's dramatic landscapes, waterfalls, and natural hot springs.",
      highlights: ["Geysers", "Glaciers", "Northern Lights"],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-brand-navy/5 via-background to-brand-blue-bright/5 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Plane className="text-brand-orange" size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
                Unforgettable Travel Experiences
              </h1>
              <p className="text-xl text-foreground/70">
                Discover the world with expertly crafted itineraries and
                unforgettable journeys.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Links to Categories */}
        <section className="py-8 bg-white border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/travel/packages"
                className="p-4 border-2 border-brand-navy hover:bg-brand-navy/5 rounded-lg transition-all"
              >
                <h3 className="text-lg font-semibold text-brand-navy">
                  Travel Packages
                </h3>
                <p className="text-sm text-foreground/60 mt-1">
                  Explore curated holiday packages
                </p>
              </Link>
              <Link
                href="/travel/bookings"
                className="p-4 border-2 border-brand-orange hover:bg-brand-orange/5 rounded-lg transition-all"
              >
                <h3 className="text-lg font-semibold text-brand-orange">
                  Book Now
                </h3>
                <p className="text-sm text-foreground/60 mt-1">
                  Manage your travel bookings
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-background border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Destination"
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy"
              />
              <select className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy">
                <option>Duration</option>
                <option>5-7 Days</option>
                <option>8-10 Days</option>
                <option>11+ Days</option>
              </select>
              <select className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy">
                <option>Price Range</option>
                <option>Under $2,500</option>
                <option>$2,500-$4,000</option>
                <option>$4,000+</option>
              </select>
              <button className="px-6 py-2 bg-brand-navy text-white rounded-lg hover:bg-brand-navy/90 transition-colors font-semibold">
                Search
              </button>
            </div>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="py-16 md:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border-r-4 border-brand-orange"
                >
                  {/* Package Image */}
                  <div className="h-56 bg-gradient-to-br from-brand-navy/10 to-brand-blue-bright/10 flex items-center justify-center">
                    <div className="text-6xl">🌍</div>
                  </div>

                  {/* Package Info */}
                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-brand-navy">
                        {pkg.name}
                      </h3>
                      <div className="flex items-center gap-2 text-foreground/60 mt-2">
                        <MapPin size={16} />
                        <span className="text-sm">{pkg.destination}</span>
                      </div>
                    </div>

                    <p className="text-foreground/60 text-sm mb-4">
                      {pkg.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-foreground/70">
                        <Calendar size={16} />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground/70">
                        <Users size={16} />
                        <span>{pkg.groupSize}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1 mb-4">
                      {pkg.highlights.map((highlight, index) => (
                        <div
                          key={index}
                          className="text-sm text-foreground/60 flex items-center gap-2"
                        >
                          <span className="w-1 h-1 bg-brand-orange rounded-full"></span>
                          {highlight}
                        </div>
                      ))}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < Math.floor(pkg.rating)
                                ? "fill-brand-orange text-brand-orange"
                                : "text-border"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-sm text-foreground/60">
                        {pkg.rating} ({pkg.reviews} reviews)
                      </span>
                    </div>

                    {/* Price and Button */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-foreground/60">From</p>
                        <span className="text-2xl font-bold text-brand-navy">
                          {pkg.price}
                        </span>
                      </div>
                      <button className="px-4 py-2 bg-brand-navy text-white rounded-lg hover:bg-brand-navy/90 transition-colors font-semibold text-sm">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                Why Choose Our Travel Division?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-brand-navy/5 to-brand-blue-bright/5 rounded-xl p-8">
                <div className="text-4xl mb-4">🗺️</div>
                <h3 className="text-lg font-semibold text-brand-navy mb-3">
                  Expert Itineraries
                </h3>
                <p className="text-foreground/60">
                  Carefully curated journeys designed by experienced travel
                  experts and local guides.
                </p>
              </div>
              <div className="bg-gradient-to-br from-brand-orange/5 to-brand-navy/5 rounded-xl p-8">
                <div className="text-4xl mb-4">✈️</div>
                <h3 className="text-lg font-semibold text-brand-orange mb-3">
                  Seamless Travel
                </h3>
                <p className="text-foreground/60">
                  All arrangements handled including flights, hotels, meals, and
                  activities.
                </p>
              </div>
              <div className="bg-gradient-to-br from-brand-blue-bright/5 to-brand-orange/5 rounded-xl p-8">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-lg font-semibold text-brand-blue-bright mb-3">
                  24/7 Support
                </h3>
                <p className="text-foreground/60">
                  Round-the-clock assistance for any needs during your travels.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-brand-navy to-brand-blue-bright text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Explore the World?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Contact our travel experts to customize your perfect vacation
              today.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-white text-brand-navy rounded-lg font-semibold hover:bg-white/90 transition-all"
            >
              Plan Your Adventure
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
