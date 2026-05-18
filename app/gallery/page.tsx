import type { Metadata } from "next";

import GalleryClient from "./gallery-client";

const pageTitle = "Gallery | JCL Group";
const pageDescription =
  "Browse JCL Group's latest project, staff, and property gallery in a sleek masonry showcase.";
const previewImage =
  "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779121039/Screenshot_2026-05-18_161309_dwu9cc.png";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    siteName: "JCL Group",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "JCL Group gallery preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [previewImage],
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
