import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";

export default function PackagesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-brand-navy/5 via-background to-brand-blue-bright/5 py-20 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
              Travel Packages
            </h1>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl">
              Explore our curated collection of travel packages and holiday
              destinations.
            </p>
            <Link
              href="/travel"
              className="inline-flex px-6 py-3 bg-brand-navy text-white rounded-lg hover:bg-brand-navy/90 transition-colors"
            >
              View All Packages
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
