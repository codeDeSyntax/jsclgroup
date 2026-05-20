import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FooterCtaCard() {
  const ctaBgImage =
    "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779141605/image_mo2c4a.png";

  return (
    <div
      className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-t-3xl rounded-br-3xl  sm:rounded-3xl"
      style={{
        backgroundImage: `url(${ctaBgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_0%,rgba(230,230,230,1)_70%,rgba(255,255,255,0.28)_100%)]" />

      <div className="relative z-10 min-h-[10.5rem]">
        <div className="relative flex min-h-[10.5rem] flex-col justify-center px-4 py-5 text-jcl-primary sm:px-6 lg:px-8">
          <div className="absolute -bottom-16 left-0 h-36 w-36 rounded-full blur-3xl" />

          <div className="relative">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-jcl-orange-500/20 bg-white/75 px-2.5 py-1 text-[10px] font-bold uppercase text-jcl-orange-600 shadow-sm sm:px-3 sm:py-1.5 sm:text-xs">
              Let&apos;s Talk Property & Gadgets
            </div>

            <h2 className="max-w-lg text-2xl font-black leading-[0.98] tracking-[-0.04em] text-jcl-primary sm:text-3xl lg:text-4xl">
              Build your next home, investment, or gadget order with JCL Group
            </h2>

            <p className="mt-3 max-w-xl  leading-5 text-jcl-blue-900/70 sm:text-sm sm:leading-6 lg:text-base">
              From properties and rentals to electrical gadgets and appliances,
              we deliver reliable options and guidance built around your goals.
            </p>

            <div className="mt-4 flex flex-wrap gap-2.5">
              <Link
                href="/contact"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-jcl-accent px-4 text-xs font-bold text-white transition hover:bg-jcl-blue-900 sm:min-h-11 sm:px-5 sm:text-sm"
              >
                Contact Our Team
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex min-h-10 items-center justify-center rounded-full border border-jcl-blue-800/15 bg-white px-4 text-xs font-bold text-jcl-primary transition hover:border-jcl-blue-800/30 hover:bg-jcl-blue-50 sm:min-h-11 sm:px-5 sm:text-sm"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
