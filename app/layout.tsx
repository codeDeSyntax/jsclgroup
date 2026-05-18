import React from "react";
import type { Metadata } from "next";
import type { Viewport } from "next";

import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import ReduxProvider from "@/components/redux-provider";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/hooks/use-cart";
import { MobileMenuProvider } from "@/contexts/mobile-menu-context";

export const metadata: Metadata = {
  title: "JCL Group | Electrical & Real Estate",
  description:
    "Leading multi-division company offering electrical gadgets and real estate solutions.",
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
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body
        suppressHydrationWarning
        className="font-sans antialiased overflow-x-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(248, 85, 6, 0.08) 0%, rgba(248, 85, 6, 0.03) 30%, transparent 100%)",
        }}
      >
        <ReduxProvider>
          <AuthProvider>
            <MobileMenuProvider>
              <CartProvider>{children}</CartProvider>
            </MobileMenuProvider>
          </AuthProvider>
        </ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
