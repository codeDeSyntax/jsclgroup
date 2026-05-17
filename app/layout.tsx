import React from "react";
import type { Metadata } from "next";
import type { Viewport } from "next";

import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/hooks/use-cart";

export const metadata: Metadata = {
  title: "JCL Group | Electrical & Real Estate",
  description:
    "JCL Group offers trusted real estate services and electrical gadgets with reliable support from discovery to delivery.",
  generator: "v0.app",
  icons: {
    icon: "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778940328/jcllogo_s5lnq6.png",
    shortcut:
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778940328/jcllogo_s5lnq6.png",
    apple:
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778940328/jcllogo_s5lnq6.png",
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
    <html
      lang="en"
      suppressHydrationWarning
      className="overflow-x-hidden overflow-y-auto"
    >
      <body
        suppressHydrationWarning
        className="font-sans antialiased overflow-x-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(248, 85, 6, 0.08) 0%, rgba(248, 85, 6, 0.03) 30%, transparent 100%)",
          scrollbarGutter: "stable",
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
