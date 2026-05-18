import React from "react";
import type { Metadata } from "next";
import type { Viewport } from "next";

import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/hooks/use-cart";

const brandImage =
  "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779121039/Screenshot_2026-05-18_161309_dwu9cc.png";
const brandUrl = "https://jclgroup.com";

export const metadata: Metadata = {
  title: "JCL Group | Electrical & Real Estate",
  description:
    "Leading multi-division company offering electrical gadgets and real estate solutions.",
  generator: "v0.app",
  metadataBase: new URL(brandUrl),
  icons: {
    icon: "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779121165/jcllogo_rj8hvw_jcvnvb.jpg",
    shortcut:
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779121165/jcllogo_rj8hvw_jcvnvb.jpg",
    apple:
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779121165/jcllogo_rj8hvw_jcvnvb.jpg",
  },
  openGraph: {
    title: "JCL Group | Electrical & Real Estate",
    description:
      "Leading multi-division company offering electrical gadgets and real estate solutions.",
    type: "website",
    siteName: "JCL Group",
    url: brandUrl,
    images: [
      {
        url: brandImage,
        width: 1200,
        height: 630,
        alt: "JCL Group - Electrical Gadgets & Real Estate Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JCL Group | Electrical & Real Estate",
    description:
      "Leading multi-division company offering electrical gadgets and real estate solutions.",
    images: [brandImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
  themeColor: "#135ed5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body
        suppressHydrationWarning
        className="font-sans antialiased overflow-x-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(248, 85, 6, 0.08) 0%, rgba(248, 85, 6, 0.03) 30%, transparent 100%)",
        }}
      >
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
