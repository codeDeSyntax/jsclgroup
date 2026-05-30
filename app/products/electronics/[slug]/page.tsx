import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ChevronRight,
  Heart,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  electronicsBestSellers,
  getElectronicsProductBySlug,
} from "@/components/electronics/electronics-data";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function toNumber(price: string) {
  return Number(price.replace(/[^\d.]/g, ""));
}

function discountPercent(price: string, oldPrice: string) {
  const current = toNumber(price);
  const previous = toNumber(oldPrice);
  if (!current || !previous || previous <= current) return 0;
  return Math.round(((previous - current) / previous) * 100);
}

function toSku(slug: string) {
  return `JCL-${slug.toUpperCase().replace(/-/g, "-")}`;
}

export function generateStaticParams() {
  return electronicsBestSellers.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getElectronicsProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = electronicsBestSellers.filter(
    (item) => item.slug !== product.slug && item.category === product.category,
  );
  const galleryImages = [
    product.image,
    ...relatedProducts.map((item) => item.image),
    ...electronicsBestSellers
      .filter((item) => item.slug !== product.slug && item.category !== product.category)
      .map((item) => item.image),
  ].slice(0, 4);
  const savings = discountPercent(product.price, product.oldPrice);
  const sku = toSku(product.slug);

  return (
    <div className="flex min-h-screen flex-col bg-jcl-white text-black">
      <Header variant="default" />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-10 pt-24 sm:px-6 lg:px-8">
        <div className="mb-3">
          <nav className="flex flex-wrap items-center gap-1 text-xs text-black/50 sm:text-sm">
            <Link href="/" className="hover:text-jcl-primary">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/products" className="hover:text-jcl-primary">
              Products
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/products/electronics" className="hover:text-jcl-primary">
              Electronics
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-black/80">{product.name}</span>
          </nav>
        </div>


        <section className="rounded-3xl border border-black/10 bg-whit p-4 sm:p-6 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.7fr_1.2fr] lg:gap-10">
            <div>
              <div className="rounded-2xl  p-4 sm:p-6">
                <div className="relative mx-auto flex min-h-[280px] max-w-md items-center justify-center sm:min-h-[360px]">
                  <span className="absolute left-3 top-3 rounded-md bg-jcl-accent/10 px-2 py-1 text-xs font-semibold uppercase text-jcl-accent">
                    {product.tag}
                  </span>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={560}
                    height={480}
                    className="h-full w-full object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2">
                {galleryImages.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className={`overflow-hidden rounded-xl border p-1.5 ${
                      index === 0
                        ? "border-jcl-primary/40 bg-jcl-primary/[0.04]"
                        : "border-black/10 bg-black/[0.02]"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      width={140}
                      height={100}
                      className="h-16 w-full object-contain sm:h-20"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-4 md:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="absolute left-3 top-3 rounded-md bg-jcl-accent/10 px-2 py-1 text-xs font-semibold uppercase text-jcl-accent">
                  {product.tag}
                </span>
                {savings > 0 && (
                  <span className="rounded-md bg-jcl-primary/10 px-2 py-1 text-xs font-semibold uppercase text-jcl-primary">
                    Save {savings}%
                  </span>
                )}
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.14em] text-black/50">
                Product Details
              </p>
              <h1 className="mt-2 text-2xl font-black tracking-[-0.03em] sm:text-3xl">
                {product.name}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-black/70 sm:text-base">
                {product.summary}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center gap-1 text-jcl-black">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={
                        index < Math.round(product.rating)
                          ? "h-4 w-4 fill-jcl-black"
                          : "h-4 w-4 text-black/15"
                      }
                    />
                  ))}
                </div>
                <p className="text-sm text-black/55">
                  {product.rating.toFixed(1)} ({product.reviews} reviews)
                </p>
              </div>

              <div className="mt-3 grid gap-2 text-xs text-black/60 sm:grid-cols-2 sm:text-sm">
                <p>
                  SKU: <span className="font-semibold text-black/80">{sku}</span>
                </p>
                <p>
                  Availability: <span className="font-semibold text-emerald-700">In stock</span>
                </p>
              </div>

              <div className="mt-5 flex items-end gap-3">
                <p className="text-2xl font-black tracking-[-0.03em] text-jcl-primary sm:text-3xl">
                  {product.price}
                </p>
                <p className="pb-1 text-sm text-black/45 line-through">{product.oldPrice}</p>
              </div>
              <p className="mt-1 text-xs text-black/55 sm:text-sm">Price includes standard VAT and warranty cover.</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-black/50">
                    Color
                  </p>
                  <div className="flex items-center gap-2">
                    <button className="h-7 w-7 rounded-full border-2 border-jcl-primary bg-slate-800" aria-label="Midnight" />
                    <button className="h-7 w-7 rounded-full border border-black/20 bg-slate-400" aria-label="Silver" />
                    <button className="h-7 w-7 rounded-full border border-black/20 bg-zinc-200" aria-label="Light" />
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-black/50">
                    Protection Plan
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button className="rounded-lg border border-jcl-primary/35 bg-jcl-primary/[0.05] px-3 py-1.5 text-xs font-semibold text-jcl-primary sm:text-sm">
                      1 Year
                    </button>
                    <button className="rounded-lg border border-black/15 bg-white px-3 py-1.5 text-xs font-semibold text-black/75 sm:text-sm">
                      2 Years
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-2 sm:grid-cols-[auto_1fr_1fr]">
                <div className="inline-flex h-11 items-center rounded-xl border border-black/15 bg-white px-2">
                  <button
                    type="button"
                    className="h-8 w-8 rounded-lg text-sm font-bold text-black/65 transition hover:bg-black/[0.04]"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-2 text-sm font-semibold">1</span>
                  <button
                    type="button"
                    className="h-8 w-8 rounded-lg text-sm font-bold text-black/65 transition hover:bg-black/[0.04]"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-jcl-black px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to cart
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-black/15 bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-black/[0.03]"
                >
                  Buy now
                </button>
              </div>

              <div className="mt-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-black/65 transition hover:text-jcl-primary"
                >
                  <Heart className="h-4 w-4" />
                  Add to wishlist
                </button>
              </div>

              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                <div className="rounded-xl border border-black/10 bg-black/[0.02] p-3">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Truck className="h-4 w-4 text-jcl-primary" />
                    Fast delivery
                  </div>
                  <p className="mt-1 text-xs text-black/65">Ships within 24 hours in selected locations.</p>
                </div>
                <div className="rounded-xl border border-black/10 bg-black/[0.02] p-3">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <ShieldCheck className="h-4 w-4 text-jcl-primary" />
                    Warranty support
                  </div>
                  <p className="mt-1 text-xs text-black/65">Official support and service backed warranty.</p>
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-black/10 bg-white p-3 text-xs text-black/65 sm:text-sm">
                Free delivery for eligible orders above ₵100 and easy 14-day return support.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-2xl border border-black/10 bg-white p-5">
            <h2 className="text-lg font-black tracking-[-0.02em]">About This Product</h2>
            <p className="mt-3 text-sm leading-6 text-black/70 sm:text-base">{product.description}</p>

            <h3 className="mt-6 text-base font-black tracking-[-0.02em]">Key Features</h3>
            <ul className="mt-3 grid gap-2 text-sm text-black/70 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li key={feature} className="rounded-lg bg-black/[0.02] px-3 py-2">
                  {feature}
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-base font-black tracking-[-0.02em]">What&apos;s In The Box</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-black/65">
              <li>- Main product unit</li>
              <li>- Charging or power accessory</li>
              <li>- Quick setup guide</li>
              <li>- Warranty card</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-black/10 bg-white p-5">
            <h2 className="text-lg font-black tracking-[-0.02em]">Technical Specs</h2>
            <dl className="mt-3 divide-y divide-black/10">
              {product.specs.map((spec) => (
                <div key={spec.label} className="grid grid-cols-2 gap-4 py-2.5 text-sm">
                  <dt className="text-black/50">{spec.label}</dt>
                  <dd className="font-semibold text-black/80">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 space-y-2">
              <div className="rounded-lg border border-black/10 bg-black/[0.02] p-3 text-sm text-black/70">
                <div className="flex items-center gap-2 font-semibold text-black/80">
                  <Truck className="h-4 w-4 text-jcl-primary" />
                  Shipping Information
                </div>
                <p className="mt-1 text-xs sm:text-sm">Dispatch in 24 hours. Delivery window: 2-5 business days.</p>
              </div>

              <div className="rounded-lg border border-black/10 bg-black/[0.02] p-3 text-sm text-black/70">
                <div className="flex items-center gap-2 font-semibold text-black/80">
                  <RotateCcw className="h-4 w-4 text-jcl-primary" />
                  Returns and Refunds
                </div>
                <p className="mt-1 text-xs sm:text-sm">Return eligible in 14 days if item is unused and in original packaging.</p>
              </div>

              <div className="rounded-lg border border-black/10 bg-black/[0.02] p-3 text-sm text-black/70">
                <div className="flex items-center gap-2 font-semibold text-black/80">
                  <PackageCheck className="h-4 w-4 text-jcl-primary" />
                  Authenticity
                </div>
                <p className="mt-1 text-xs sm:text-sm">Sourced through verified channels and quality checked before shipping.</p>
              </div>
            </div>
          </article>
        </section>

        {relatedProducts.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-black tracking-[-0.02em] sm:text-2xl">
              Related Products
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/products/electronics/${item.slug}`}
                  className="group rounded-2xl border border-black/10 bg-white p-4 transition hover:border-jcl-accent/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-black/[0.03] p-1.5">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={120}
                        height={120}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="line-clamp-2 text-sm font-semibold leading-5 text-black/80">
                        {item.name}
                      </p>
                      <p className="mt-1 text-sm font-black text-jcl-primary">{item.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
