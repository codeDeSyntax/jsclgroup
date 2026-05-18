"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { BACKEND_URL } from "@/lib/auth";
import { ArrowRight, Images } from "lucide-react";

interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  displayOrder: number;
}

export default function GalleryClient() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [spans, setSpans] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/dashboard/gallery`);
        if (response.ok) {
          const data = await response.json();
          const imgs: GalleryImage[] = data.data || [];
          setImages(imgs);

          const spansMap: Record<string, number> = {};
          await Promise.all(
            imgs.map(
              (img) =>
                new Promise<void>((resolve) => {
                  const i = new window.Image();
                  i.src = img.imageUrl;
                  i.onload = () => {
                    const ratio = i.naturalHeight / i.naturalWidth;
                    const span = Math.max(4, Math.ceil(ratio * 12));
                    spansMap[img.id] = span;
                    resolve();
                  };
                  i.onerror = () => {
                    spansMap[img.id] = 6;
                    resolve();
                  };
                }),
            ),
          );
          setSpans(spansMap);
        }
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-jcl-white">
      <Header variant="hero" />
      <main className="flex-1">
        <section className="pt-28 pb-16 sm:pt-32 sm:pb-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <Images className="h-6 w-6 text-jcl-primary" />
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-jcl-primary/70">
                Gallery
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-[-0.08em] text-jcl-primary mb-4">
              Our Work in Focus
            </h1>
            <p className="max-w-2xl text-lg text-black/70">
              Explore our collection of completed projects, installations, and
              featured works across infrastructure, real estate, and technology
              solutions.
            </p>
          </div>
        </section>

        {isLoading ? (
          <section className="py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-black/60">Loading gallery...</p>
            </div>
          </section>
        ) : images.length === 0 ? (
          <section className="py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-black/60">No gallery images available yet.</p>
            </div>
          </section>
        ) : (
          <section className="py-12 sm:py-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                style={{ gridAutoRows: "8px" }}
              >
                {images.map((image) => (
                  <div
                    key={image.id}
                    style={{ gridRowEnd: `span ${spans[image.id] || 8}` }}
                  >
                    <button
                      onClick={() => setSelectedImage(image)}
                      className="group relative w-full h-full overflow-hidden rounded-[12px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.16)] transition-all duration-500 cursor-pointer"
                    >
                      <img
                        src={image.imageUrl}
                        alt={image.title}
                        loading="lazy"
                        className="w-full h-auto block max-w-full"
                      />

                      <div className="absolute inset-0 flex items-end">
                        <div className="w-full bg-gradient-to-t from-black/75 via-black/20 to-transparent p-3">
                          <h3 className="font-bold text-white text-sm truncate">
                            {image.title}
                          </h3>
                          {image.description && (
                            <p className="text-xs text-white/80 mt-1 line-clamp-2">
                              {image.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl w-full rounded-[28px] overflow-hidden bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white transition"
                aria-label="Close"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="relative h-96 md:h-[600px] w-full bg-gray-200">
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
                  {selectedImage.title}
                </h2>
                {selectedImage.description && (
                  <p className="text-black/70 text-base md:text-lg leading-relaxed">
                    {selectedImage.description}
                  </p>
                )}

                <div className="mt-6 flex gap-3">
                  <Link href="/contact">
                    <button className="flex items-center gap-2 rounded-full bg-jcl-primary px-6 py-3 text-white font-semibold hover:bg-jcl-primary/90 transition">
                      Get in Touch
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="flex items-center gap-2 rounded-full border border-jcl-primary/20 px-6 py-3 text-jcl-primary font-semibold hover:bg-jcl-primary/5 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
