import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JCL Group | Electrical, Real Estate & Travel",
  description:
    "Leading multi-division company offering electrical gadgets, real estate solutions, and premium travel experiences.",
  generator: "v0.app",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: true,
    themeColor: "#135ed5",
  },
  icons: {
    icon: "https://res.cloudinary.com/dqidnnssq/image/upload/v1770810231/jcllogo_rj8hvw.jpg",
    shortcut:
      "https://res.cloudinary.com/dqidnnssq/image/upload/v1770810231/jcllogo_rj8hvw.jpg",
    apple:
      "https://res.cloudinary.com/dqidnnssq/image/upload/v1770810231/jcllogo_rj8hvw.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="font-sans antialiased"
        style={{
          background:
            "linear-gradient(180deg, rgba(248, 85, 6, 0.08) 0%, rgba(248, 85, 6, 0.03) 30%, transparent 100%)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
