"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldAlert,
  ArrowLeft,
  RefreshCw,
  Lock,
  Receipt,
  AlertCircle,
  Clock,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import HeroBackgroundArt from "@/components/hero-background-art";

export default function AdminRestrictedScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      window.location.reload();
    }, 600);
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0c] text-white flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background ambient lighting and glow effects */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[600px] sm:w-[900px] rounded-full bg-gradient-to-b from-amber-500/15 via-orange-600/10 to-transparent blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-blue-900/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
      </div>

      {/* Top Navigation / Brand Bar */}
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3 transition hover:opacity-90"
        >
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white/10 p-1.5 backdrop-blur-md ring-1 ring-white/15 transition group-hover:scale-105 group-hover:ring-amber-400/40">
            <Image
              src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1778910277/logo_wrfy8c.png"
              alt="JCL Royal Group"
              width={120}
              height={40}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-tight text-white">
              JCL Royal Group Ltd
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
              Admin Portal
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 backdrop-blur-md ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white hover:ring-white/20"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Return to Site</span>
        </Link>
      </header>

      {/* Main Content Hero */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-2xl flex-col items-center px-5 py-8 text-center sm:px-8">
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 px-4 py-1.5 text-xs font-semibold text-amber-300 backdrop-blur-md shadow-[0_0_24px_rgba(245,158,11,0.15)] animate-pulse">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
          </span>
          <span className="tracking-wide">Account Status: Action Required</span>
        </div>

        {/* Lock / Alert Icon Badge */}
        <div className="relative mt-8 mb-6">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/30 to-orange-600/20 blur-xl"></div>
          <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-3xl border border-white/15 bg-gradient-to-b from-white/10 to-white/5 shadow-2xl backdrop-blur-2xl">
            <Lock className="h-10 w-10 sm:h-12 sm:w-12 text-amber-400 drop-shadow-[0_4px_12px_rgba(245,158,11,0.5)]" />
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
          Pending Fee of{" "}
          <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200 bg-clip-text text-transparent underline decoration-amber-500/40 decoration-wavy underline-offset-8">
            GHC 500
          </span>
          .
        </h1>

        <p className="mt-4 text-base sm:text-lg font-medium text-white/70 max-w-lg">
          Not accessible at the moment.
        </p>

        {/* Breakdown Card */}
        <div className="mt-8 w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7 text-left backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <Receipt className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  Notice Details
                </p>
                <p className="text-sm font-bold text-white">Administrative Portal Access</p>
              </div>
            </div>
            <span className="rounded-lg bg-red-500/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-red-300 border border-red-500/20">
              Locked
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/[0.03] p-3.5 border border-white/5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                Outstanding Balance
              </p>
              <p className="mt-1 text-xl font-black text-amber-300">
                GHC 500.00
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.03] p-3.5 border border-white/5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                Current Status
              </p>
              <div className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-white/90">
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                <span>Pending Settlement</span>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-amber-500/[0.06] p-4 border border-amber-500/15">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed text-amber-200/90 font-medium">
                Admin dashboard management controls and authentication have been temporarily paused pending fee clearance. Once settled, portal access will be immediately restored.
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-7 py-3.5 text-sm font-bold text-black shadow-[0_4px_24px_rgba(245,158,11,0.3)] transition hover:opacity-95 hover:shadow-[0_4px_30px_rgba(245,158,11,0.5)] active:scale-[0.98] disabled:opacity-50"
          >
            <RefreshCw
              className={`h-4 w-4 transition-transform duration-500 ${
                isRefreshing ? "animate-spin" : "group-hover:rotate-180"
              }`}
            />
            <span>{isRefreshing ? "Rechecking Status..." : "Recheck Status"}</span>
          </button>

          <Link
            href="/"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10 hover:border-white/25 active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>

      {/* Footer copyright */}
      <footer className="relative z-10 mx-auto w-full max-w-6xl px-6 py-6 text-center text-xs text-white/30 sm:px-8">
        © {new Date().getFullYear()} JCL Royal Group Ltd. All rights reserved.
      </footer>
    </main>
  );
}
