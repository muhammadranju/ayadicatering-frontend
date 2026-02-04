"use client";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GalleryImage } from "./GalleryImage";
import { Testimonials } from "./Testimonials";
import CTA_SECTION from "@/components/pages/faq/CTA_SECTION";

export const images = {
  "1": {
    src: "/gallery/1.png",
    alt: "Salad Pouring",
    title: "Salad Pouring",
    desc: "Salad Pouring Description",
  },
  "2": {
    src: "/gallery/2.png",
    alt: "Outdoor Table",
    title: "Outdoor Table",
    desc: "Outdoor Table Description",
  },
  "3": {
    src: "/gallery/3.png",
    alt: "Serving Dish",
    title: "Serving Dish",
    desc: "Serving Dish Description",
  },
  "4": {
    src: "/gallery/4.jpg",
    alt: "Buffet 1",
    title: "Buffet 1",
    desc: "Buffet 1 Description",
  },
  "5": {
    src: "/gallery/5.jpg",
    alt: "Buffet 2",
    title: "Buffet 2",
    desc: "Buffet 2 Description",
  },
  "6": {
    src: "/gallery/6.png",
    alt: "Buffet 3",
    title: "Buffet 3",
    desc: "Buffet 3 Description",
  },
  "7": {
    src: "/gallery/6.1.jpg",
    alt: "Food Box",
    title: "Food Box",
    desc: "Food Box Description",
  },
  "8": {
    src: "/gallery/7.png",
    alt: "Food Dish",
    title: "Food Dish",
    desc: "Food Dish Description",
  },
  "9": {
    src: "/gallery/8.jpg",
    alt: "Holding Plate",
    title: "Holding Plate",
    desc: "Holding Plate Description",
  },
  "10": {
    src: "/gallery/9.jpg",
    alt: "Charcuterie",
    title: "Charcuterie",
    desc: "Charcuterie Description",
  },
  "11": {
    src: "/gallery/10.png", // ← fix if you have 10.jpg instead of .png
    alt: "Dessert Platter",
    title: "Dessert Platter",
    desc: "Dessert Platter Description",
  },
  "12": {
    src: "/gallery/11.jpg",
    alt: "Food Platter",
    title: "Food Platter",
    desc: "Food Platter Description",
  },
  // Add these if you actually have the files
  "13": {
    src: "/gallery/12.jpg",
    alt: "Diplomatic Dinner",
    title: "Diplomatic Dinner",
    desc: "Diplomatic Dinner Description",
  },
  "14": {
    src: "/gallery/13.jpg",
    alt: "Private Estate",
    title: "Private Estate",
    desc: "Private Estate Description",
  },
};

// Convert images object to array for easier navigation
const galleryImages = Object.keys(images).map((key) => ({
  id: key,
  ...images[key as keyof typeof images],
}));

// ── Lightbox Component ──────────────────────────────────────────
const Lightbox = ({
  isOpen,
  initialIndex,
  onClose,
}: {
  isOpen: boolean;
  initialIndex: number;
  onClose: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentImage = galleryImages[currentIndex];

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center backdrop-blur-sm">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2 z-50"
      >
        <X size={32} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
        {currentIndex + 1} / {galleryImages.length}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 text-white/70 hover:text-white transition-colors p-2 z-50 hover:bg-white/10 rounded-full"
      >
        <ChevronLeft size={48} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 text-white/70 hover:text-white transition-colors p-2 z-50 hover:bg-white/10 rounded-full"
      >
        <ChevronRight size={48} />
      </button>

      {/* Image Container */}
      <div className="relative w-full h-full max-w-5xl max-h-[85vh] p-4 flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            layout="fill"
            objectFit="contain"
            className="select-none rounded-lg"
            quality={100}
            priority
          />
        </div>
      </div>

      {/* Caption */}
      <div className="absolute bottom-8 left-0 right-0 text-center text-white px-4">
        <h3 className="text-xl font-semibold mb-2">{currentImage.title}</h3>
        <p className="text-white/80 max-w-2xl mx-auto">{currentImage.desc}</p>
      </div>
    </div>
  );
};

// ── Recent Works ────────────────────────────────────────────────
const RecentWorks: React.FC = () => {
  const { t } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openLightbox = (imageKey: string) => {
    // Find index based on imageKey (which corresponds to id in our array)
    const index = galleryImages.findIndex((img) => img.id === imageKey);
    if (index !== -1) {
      setSelectedImageIndex(index);
      setLightboxOpen(true);
    }
  };

  return (
    <>
      <section className="py-16 md:py-24 bg-[#F2EEE6]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-12 gap-5 md:gap-6 auto-rows-fr">
            {/* Row 1 */}
            <div className="col-span-12 md:col-span-3 row-span-2 min-h-[320px] md:min-h-[420px]">
              <GalleryImage imageKey="1" onClick={() => openLightbox("1")} />
            </div>

            <div className="col-span-12 md:col-span-6 flex flex-col justify-center items-center text-center py-10 md:py-0">
              <h2 className="text-4xl md:text-6xl font-semibold text-gray-900 mb-2">
                {t("gallery.recentTitle")}
              </h2>
              <span className="text-4xl md:text-7xl text-orange-500 font-semibold">
                {t("gallery.recentTitleSpan")}
              </span>
              <p className="text-gray-900 font-medium mt-4 text-sm tracking-wide max-w-xl">
                {t("gallery.recentDesc")}
              </p>
            </div>

            <div className="col-span-12 md:col-span-3 min-h-[260px] md:min-h-[320px]">
              <GalleryImage imageKey="2" onClick={() => openLightbox("2")} />
            </div>

            {/* Row 2 */}
            <div className="col-span-12 md:col-span-3 min-h-[380px] md:min-h-[520px]">
              <GalleryImage imageKey="3" onClick={() => openLightbox("3")} />
            </div>

            <div className="col-span-12 md:col-span-6 grid grid-cols-6 gap-5 md:gap-6">
              <div className="col-span-2 min-h-[160px] md:min-h-[190px]">
                <GalleryImage imageKey="6" onClick={() => openLightbox("6")} />
              </div>
              <div className="col-span-2 min-h-[160px] md:min-h-[190px]">
                <GalleryImage imageKey="5" onClick={() => openLightbox("5")} />
              </div>
              <div className="col-span-2 min-h-[160px] md:min-h-[190px]">
                <GalleryImage imageKey="6" onClick={() => openLightbox("6")} />
              </div>

              <div className="col-span-3 min-h-[260px] md:min-h-[300px]">
                <GalleryImage imageKey="7" onClick={() => openLightbox("7")} />
              </div>
              <div className="col-span-3 min-h-[260px] md:min-h-[300px]">
                <GalleryImage imageKey="8" onClick={() => openLightbox("8")} />
              </div>
            </div>

            <div className="col-span-12 md:col-span-3 min-h-[380px] md:min-h-[480px]">
              <GalleryImage imageKey="9" onClick={() => openLightbox("9")} />
            </div>

            {/* Row 3 */}
            <div className="col-span-12 md:col-span-4 min-h-[360px] md:min-h-[460px]">
              <GalleryImage imageKey="10" onClick={() => openLightbox("10")} />
            </div>

            <div className="col-span-12 md:col-span-3 min-h-[220px] md:min-h-[270px]">
              <GalleryImage imageKey="11" onClick={() => openLightbox("11")} />
            </div>
          </div>
        </div>
      </section>

      <Lightbox
        isOpen={lightboxOpen}
        initialIndex={selectedImageIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <RecentWorks />
      <Testimonials /> {/* ← keep your original or slightly cleaned version */}
      <div className="mt-20">
        <CTA_SECTION />
      </div>
    </div>
  );
}
