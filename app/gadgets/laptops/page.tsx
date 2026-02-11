import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";

export default function LaptopsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-brand-orange/5 via-background to-brand-navy/5 py-20 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-orange mb-6">
              Laptops & Computers
            </h1>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl">
              Discover high-performance laptops and computers for professionals
              and enthusiasts.
            </p>
            <Link
              href="/gadgets"
              className="inline-flex px-6 py-3 bg-brand-orange text-white rounded-lg hover:bg-brand-orange/90 transition-colors"
            >
              Back to All Gadgets
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
