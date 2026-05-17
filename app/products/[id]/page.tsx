import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AddToCartWithQty from "@/components/cart/add-to-cart-with-qty";
import { getBackendUrl } from "@/lib/server-config";

type ProductPageProps = {
  params: {
    id: string;
  };
};

function toNumber(price: unknown) {
  if (typeof price === "number") return price;
  if (typeof price === "string") return Number(price.replace(/[^\d.]/g, ""));
  return 0;
}

function formatPrice(price: unknown) {
  if (price === null || price === undefined || price === "") return "—";
  if (typeof price === "number") return `$${price.toFixed(2)}`;
  return String(price).startsWith("$") ? String(price) : `$${price}`;
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const BACKEND_URL = getBackendUrl();
  // `params` can be a Promise in some Next.js setups; await if needed.
  // This makes the route resilient to both Promise and plain object forms.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resolvedParams =
    typeof (params as any)?.then === "function"
      ? await (params as any)
      : params;
  const id = resolvedParams?.id;

  const response = await fetch(`${BACKEND_URL}/public/products/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    notFound();
  }

  const payload = await response.json();
  const product = payload?.data;

  if (!product) {
    notFound();
  }

  const currentPrice = toNumber(product.price);
  const oldPrice = toNumber(product.oldPrice);
  const savingsPercent =
    currentPrice > 0 && oldPrice > currentPrice
      ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
      : 0;
  const description = product.description || product.summary || "";
  const features = Array.isArray(product.features) ? product.features : [];
  const specs = Array.isArray(product.specs) ? product.specs : [];

  return (
    <div className="flex min-h-screen flex-col bg-jcl-white text-black">
      <Header variant="default" />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-10 pt-24 sm:px-6 lg:px-8">
        <div className="mb-4">
          <nav className="flex flex-wrap items-center gap-1 text-xs text-black/50 sm:text-sm">
            <Link href="/" className="hover:text-jcl-primary">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/products" className="hover:text-jcl-primary">
              Products
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-black/80">{product.name}</span>
          </nav>
        </div>

        <section className="rounded-3xl border border-black/10 bg-white p-4 sm:p-6 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.7fr_1.2fr] lg:gap-10">
            <div>
              <div className="rounded-2xl bg-black/[0.02] p-4 sm:p-6">
                <div className="relative mx-auto flex min-h-[280px] max-w-md items-center justify-center sm:min-h-[360px]">
                  {product.tag ? (
                    <span className="absolute left-3 top-3 rounded-md bg-jcl-accent/10 px-2 py-1 text-xs font-semibold uppercase text-jcl-accent">
                      {product.tag}
                    </span>
                  ) : null}
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={560}
                      height={480}
                      className="h-full w-full object-contain"
                      priority
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-2xl border border-dashed border-black/15 text-sm text-black/45">
                      No image available
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-4 md:p-8">
              <div className="flex flex-wrap items-center gap-2">
                {savingsPercent > 0 ? (
                  <span className="rounded-md bg-jcl-primary/10 px-2 py-1 text-xs font-semibold uppercase text-jcl-primary">
                    Save {savingsPercent}%
                  </span>
                ) : null}
                {product.category ? (
                  <span className="rounded-md bg-black/5 px-2 py-1 text-xs font-semibold uppercase text-black/60">
                    {product.category}
                  </span>
                ) : null}
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-black/50">
                Product Details
              </p>
              <h1 className="mt-2 text-2xl font-black tracking-[-0.03em] sm:text-3xl">
                {product.name}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-black/70 sm:text-base">
                {description}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center gap-1 text-jcl-black">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={
                        index < Math.round(Number(product.rating || 0))
                          ? "h-4 w-4 fill-jcl-black"
                          : "h-4 w-4 text-black/15"
                      }
                    />
                  ))}
                </div>
                <p className="text-sm text-black/55">
                  {product.rating
                    ? `${Number(product.rating).toFixed(1)}`
                    : "0.0"}
                  {product.reviews ? ` (${product.reviews} reviews)` : ""}
                </p>
              </div>

              <div className="mt-3 grid gap-2 text-xs text-black/60 sm:grid-cols-2 sm:text-sm">
                <p>
                  ID:{" "}
                  <span className="font-semibold text-black/80">
                    {product.id}
                  </span>
                </p>
                <p>
                  Availability:{" "}
                  <span className="font-semibold text-emerald-700">
                    In stock
                  </span>
                </p>
              </div>

              <div className="mt-5 flex items-end gap-3">
                <p className="text-2xl font-black tracking-[-0.03em] text-jcl-primary sm:text-3xl">
                  {formatPrice(product.price)}
                </p>
                {product.oldPrice ? (
                  <p className="pb-1 text-sm text-black/45 line-through">
                    {formatPrice(product.oldPrice)}
                  </p>
                ) : null}
              </div>

              {features.length > 0 ? (
                <div className="mt-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-black/50">
                    Features
                  </p>
                  <ul className="space-y-2 text-sm text-black/70">
                    {features.map((feature: string, index: number) => (
                      <li key={`${feature}-${index}`} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-jcl-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {specs.length > 0 ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {specs.map((spec: any, index: number) => (
                    <div
                      key={`${spec.label || spec.name || index}`}
                      className="rounded-2xl border border-black/10 bg-black/[0.02] p-3"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/45">
                        {spec.label || spec.name}
                      </p>
                      <p className="mt-1 text-sm font-medium text-black/80">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-6 grid gap-2 sm:grid-cols-[auto_1fr_1fr]">
                <div className="inline-flex h-11 items-center rounded-xl border border-black/15 bg-white px-2">
                  {/* Quantity controls are handled in cart page; default add-to-cart uses qty=1 */}
                  <span className="px-2 text-sm font-semibold">1</span>
                </div>
                <div>
                  <AddToCartWithQty
                    product={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    }}
                  />
                </div>
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
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
