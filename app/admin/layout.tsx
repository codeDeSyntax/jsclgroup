"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronRight,
  LayoutGrid,
  LogOut,
  Home,
  Package,
  FileText,
  Tag,
  Menu,
  X,
  Settings,
  Images,
  Mail,
} from "lucide-react";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(
    typeof window !== "undefined" ? window.location.pathname : pathname || "",
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout, user } = useAuth();

  useEffect(() => {
    if (pathname) {
      setCurrentPath(pathname);
      setIsMobileMenuOpen(false);
    }
  }, [pathname]);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: Home },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/projects", label: "Projects", icon: FileText },
    { href: "/admin/gallery", label: "Gallery", icon: Images },
    { href: "/admin/discounts", label: "Discount Banners", icon: Tag },
    { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (href: string) => {
    if (!currentPath) return false;
    if (href === "/admin") {
      return currentPath === "/admin";
    }
    return currentPath.startsWith(href);
  };

  if (currentPath.startsWith("/admin/login")) {
    return <>{children}</>;
  }

  return (
    <ProtectedRoute>
      <div className="flex h-dvh overflow-hidden overscroll-none bg-[#f7f7f7]">
        <aside className="relative hidden h-full w-64 shrink-0 overflow-hidden  bg-[#f6f6f4] text-black md:block">
          <div className="flex h-full flex-col">
            <div className=" px-5 pb-5 pt-3">
              <div className="flex items-center gap-3">
                <div className="flex  items-center justify-center rounded-2xl  text-white ">
                  <Image
                    src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1778910277/logo_wrfy8c.png"
                    alt="JCL Logo"
                    width={120}
                    height={40}
                    className=" h-10 w-8 opacity-90"
                  />
                </div>
                <div className="min-w-0">
                  <h1 className="truncate text-lg font-black tracking-[-0.04em] text-black">
                    JCL Admin
                  </h1>
                </div>
              </div>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-5">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`group relative flex items-center gap-3 rounded-2xl px-4 py-1 transition-all duration-200 ${
                    isActive(href)
                      ? "bg-jcl-black/10 text-black"
                      : "text-black/72 hover:bg-black/[0.04] hover:text-black"
                  }`}
                >
                  <span
                    className={`absolute inset-y-2 left-1 w-1 rounded-full transition-opacity ${
                      isActive(href)
                        ? "bg-jcl-black opacity-100"
                        : "bg-jcl-black opacity-0 group-hover:opacity-80"
                    }`}
                  />
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isActive(href)
                        ? "bg-white/10"
                        : "bg-black/[0.03] group-hover:bg-black/[0.06]"
                    }`}
                  >
                    <Icon size={18} />
                  </span>
                  <span className="flex min-w-0 flex-1 items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold tracking-[-0.01em]">
                      {label}
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${
                        isActive(href)
                          ? "translate-x-0 text-white/80"
                          : "-translate-x-1 text-black/30 group-hover:translate-x-0 group-hover:text-black/50"
                      }`}
                    />
                  </span>
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-white mx-4 my-6 rounded-full p-2 ">
              <Image
                className="h-7 w-7 shrink-0 rounded-full"
                src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1778879333/icons8-user-male-100_dwyggr.png"
                alt="User Avatar"
                width={20}
                height={20}
              />
              <span className="max-w-[11rem] truncate rounded-full bg-white px-2 py-1 font-semibold text-jcl-primary">
                {user?.email}
              </span>
              <Button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 rounded-2xl bg-jcl-black px-4 text-white shadow-[0_12px_28px_rgba(0,0,0,0.12)] transition hover:bg-black/90"
              >
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        </aside>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#f7f7f7]">
          <div className="flex items-center justify-between gap-3 bg-[#f7f7f7] px-4 py-3 sm:px-6 lg:justify-end lg:px-8">
            <div className="flex items-center gap-2 md:hidden">
              <span className="hidden md:flex rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                JCL Admin
              </span>
              <Button
                type="button"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                className="h-9 rounded-full bg-white px-3 text-xs font-semibold text-gray-700 shadow-none hover:bg-gray-100"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle admin menu"
              >
                {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
                <span className="ml-2">Menu</span>
              </Button>
            </div>

            <div className="hidden gap-2 overflow-x-auto pb-1 md:flex lg:hidden">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    isActive(href)
                      ? "bg-jcl-black text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Image
                className="h-7 w-7 shrink-0 rounded-full"
                src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1778879333/icons8-user-male-100_dwyggr.png"
                alt="User Avatar"
                width={20}
                height={20}
              />
              <span className="max-w-[11rem] truncate rounded-full bg-white px-2 py-1 font-semibold text-jcl-primary">
                {user?.email}
              </span>
            </div>
          </div>

          <div
            className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            } bg-black text-white`}
          >
            <div className="flex h-full flex-col px-5 pb-4 pt-5 sm:px-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                    JCL Admin
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="rounded-full border border-white/15 p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  <span className="sr-only">Close</span>
                  <div className="relative h-5 w-5">
                    <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 rotate-45 bg-current" />
                    <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 -rotate-45 bg-current" />
                  </div>
                </button>
              </div>

              <div className="mt-16 flex flex-1 flex-col justify-start">
                <div className="space-y-3">
                  {navItems.map(({ href, label, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-current={isActive(href) ? "page" : undefined}
                      className={`block rounded-2xl px-1 py-1 transition-all duration-200 ${
                        isActive(href)
                          ? "bg-jcl-primary text-white ring-1 ring-jcl-accent/35"
                          : "text-white"
                      }`}
                    >
                      <span className="flex items-center gap-3 text-[clamp(2.25rem,9vw,4rem)] font-light leading-none tracking-[-0.04em]">
                        <Icon size={18} />
                        <span>{label}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 border-t border-white/10 pt-3 text-sm font-medium text-white/85">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 border-r border-white/10 py-4 transition hover:bg-white/5"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-4 transition hover:bg-white/5"
                >
                  <X size={16} />
                  <span>Close</span>
                </button>
              </div>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar overscroll-contain rounded-l-3xl bg-white px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
