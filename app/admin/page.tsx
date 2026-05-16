"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { BACKEND_URL } from "@/lib/auth";
import { Package, FileText, Tag, ArrowRight } from "lucide-react";

export default function AdminDashboard() {
  const { token } = useAuth();
  const [productsCount, setProductsCount] = useState<number | null>(null);
  const [projectsCount, setProjectsCount] = useState<number | null>(null);
  const [activeBannersCount, setActiveBannersCount] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (!token) return;

    const fetchCounts = async () => {
      try {
        const [prodRes, projRes, bannersRes] = await Promise.all([
          fetch(`${BACKEND_URL}/dashboard/products`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${BACKEND_URL}/dashboard/project-profiles`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${BACKEND_URL}/dashboard/discount-announcements`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (prodRes.ok) {
          const data = await prodRes.json();
          setProductsCount(Array.isArray(data.data) ? data.data.length : 0);
        }
        if (projRes.ok) {
          const data = await projRes.json();
          setProjectsCount(Array.isArray(data.data) ? data.data.length : 0);
        }
        if (bannersRes.ok) {
          const data = await bannersRes.json();
          const all = Array.isArray(data.data) ? data.data : [];
          const active = all.filter((b: any) => b.isActive);
          setActiveBannersCount(active.length);
        }
      } catch (err) {
        // ignore errors for counts
        setProductsCount(0);
        setProjectsCount(0);
        setActiveBannersCount(0);
      }
    };

    void fetchCounts();
  }, [token]);

  return (
    <div className="space-y-6  sm:space-y-0 md:origin-top md:transform md:scale-90">
      {/* Welcome Section */}
      {/* Welcome Cards */}
      <div className="grid gap-4 py-2 lg:grid-cols-2 xl:gap-5">
        {/* Content Management Card - full gradient background */}
        <div
          className="relative h-[160px] overflow-hidden rounded-3xl border border-black/10 sm:h-[240px]"
          style={{
            backgroundImage: "linear-gradient(135deg,#f97316 0%,#ea580c 100%)",
          }}
        >
          <div className="absolute inset-0 bg-transparent"></div>
          <div className="relative z-10 flex h-full items-center px-4 sm:px-6 lg:px-8">
            <div className="z-50 flex-1 max-w-full pr-2 sm:max-w-[60%] sm:pr-0">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90 sm:text-[14px]">
                Content Management
              </p>
              <h1 className="text-xl font-bold leading-tight text-white sm:text-2xl">
                Manage Your Content
              </h1>
              <p className="mt-2 max-w-xs text-xs text-white/90 sm:text-sm">
                Add and manage products, properties, projects, and promotional
                banners
              </p>
              <div className="mt-3">
                <Link
                  href="/admin/products"
                  className="inline-flex items-center gap-2 rounded-full bg-black px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-black/85 sm:px-4"
                >
                  Get Started
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
            <div className="pointer-events-none absolute bottom-2 right-2 flex items-end sm:inset-y-0 sm:right-4 sm:items-center">
              <img
                src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1778671477/hr3_klxnnx.png"
                alt="Content"
                className="h-[112px] w-auto rounded-md object-contain opacity-35 sm:h-[200px] sm:opacity-100"
              />
            </div>
          </div>
        </div>

        {/* Analytics Card - full gradient background */}
        <div
          className="relative h-[160px] overflow-hidden rounded-3xl border border-black/10 sm:h-[240px]"
          style={{
            backgroundImage: "linear-gradient(135deg,#000000 0%,#0e0e0e 100%)",
          }}
        >
          <div className="absolute inset-0 bg-transparent"></div>
          <div className="relative z-10 flex h-full items-center px-4 sm:px-6 lg:px-8">
            <div className="z-50 flex-1 max-w-full pr-2 sm:max-w-[60%] sm:pr-0">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90 sm:text-[14px]">
                Analytics & Insights
              </p>
              <h1 className="text-xl font-bold leading-tight text-white sm:text-2xl">
                Track Performance
              </h1>
              <p className="mt-2 max-w-xs text-xs text-white/90 sm:text-sm">
                Monitor your business metrics and user engagement across all
                platforms
              </p>
              <div className="mt-3">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 rounded-full bg-black px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-black/85 sm:px-4"
                >
                  View Dashboard
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
            <div className="pointer-events-none absolute bottom-2 right-2 flex items-end sm:inset-y-0 sm:right-4 sm:items-center">
              <img
                src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1778671477/hero2_abro4k.png"
                alt="Analytics"
                className="h-[112px] w-auto rounded-md object-contain opacity-35 sm:h-[200px] sm:opacity-100"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Stats Section */}
      <div className="grid gap-8 lg:grid-cols-[minmax(260px,360px)_1fr] lg:items-center lg:gap-10">
        <div className="flex flex-col justify-center">
          <p className="mb-3 text-sm font-semibold text-jcl-black/60 sm:mb-4">
            Store Overview
          </p>
          <h2 className="mb-3 max-w-[11ch] text-3xl font-black tracking-[-0.05em] text-jcl-black sm:mb-4 sm:text-5xl sm:leading-[1.02]">
            Key Metrics
          </h2>
          <p className="mb-5 max-w-[18rem] text-sm leading-relaxed text-jcl-black/60 sm:mb-6 sm:text-base">
            Quick overview of your product catalog, project profiles, and active
            promotions.
          </p>
          <Link
            href="/admin/products"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-jcl-black px-5 py-2.5 font-semibold text-white transition hover:bg-jcl-black/90"
          >
            Manage Products
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-4xl">
          <div className="space-y-4 lg:space-y-0">
            <Link href="/admin/products" className="block lg:pl-16">
              <div className="flex min-h-[92px] cursor-pointer items-center justify-between rounded-2xl border border-black/[0.08] bg-white px-4 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(0,0,0,0.06)] sm:px-5 sm:py-5 lg:min-h-[108px]">
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <p className="flex-shrink-0 text-3xl font-black tracking-[-0.05em] text-jcl-black sm:text-4xl lg:text-5xl">
                    {productsCount === null
                      ? "—"
                      : String(productsCount).padStart(2, "0")}
                    +
                  </p>
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-medium text-jcl-black/70 sm:text-base">
                      Products in catalog
                    </p>
                    <p className="line-clamp-2 text-xs leading-relaxed text-jcl-black/55 sm:text-sm">
                      Items available for sale on the storefront
                    </p>
                  </div>
                </div>
                <Package
                  className="flex-shrink-0 text-jcl-black/60"
                  size={22}
                />
              </div>
            </Link>

            <Link href="/admin/projects" className="block lg:-mt-3 lg:ml-8">
              <div className="flex min-h-[92px] cursor-pointer items-center justify-between rounded-2xl border border-black/[0.08] bg-white px-4 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(0,0,0,0.06)] sm:px-5 sm:py-5 lg:min-h-[108px]">
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <p className="flex-shrink-0 text-3xl font-black tracking-[-0.05em] text-jcl-black sm:text-4xl lg:text-5xl">
                    {projectsCount === null
                      ? "—"
                      : String(projectsCount).padStart(2, "0")}
                    +
                  </p>
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-medium text-jcl-black/70 sm:text-base">
                      Project profiles
                    </p>
                    <p className="line-clamp-2 text-xs leading-relaxed text-jcl-black/55 sm:text-sm">
                      Profiles and case studies for projects
                    </p>
                  </div>
                </div>
                <FileText
                  className="flex-shrink-0 text-jcl-black/60"
                  size={22}
                />
              </div>
            </Link>

            <Link href="/admin/discounts" className="block lg:-mt-3 lg:ml-16">
              <div className="flex min-h-[96px] cursor-pointer items-center justify-between rounded-2xl bg-jcl-black px-4 py-4 shadow-[0_14px_34px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.16)] sm:px-5 sm:py-5 lg:min-h-[118px]">
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <p className="flex-shrink-0 text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">
                    {activeBannersCount === null
                      ? "—"
                      : String(activeBannersCount).padStart(2, "0")}
                    +
                  </p>
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-medium text-white sm:text-base">
                      Active promotions
                    </p>
                    <p className="line-clamp-2 text-xs leading-relaxed text-white/75 sm:text-sm">
                      Live discount banners
                    </p>
                  </div>
                </div>
                <Tag className="flex-shrink-0 text-white" size={28} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
