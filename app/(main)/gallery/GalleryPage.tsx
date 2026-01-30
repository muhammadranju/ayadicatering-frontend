"use client";
import CTA_SECTION from "@/components/pages/faq/CTA_SECTION";
import React from "react";
import { useTranslation } from "react-i18next";
import { GalleryImage } from "./GalleryImage";
import { Testimonials } from "./Testimonials";

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

// ── Recent Works ────────────────────────────────────────────────
const RecentWorks: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 bg-[#F2EEE6]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-12 gap-5 md:gap-6 auto-rows-fr">
          {/* Row 1 */}
          <div className="col-span-12 md:col-span-3 row-span-2 min-h-[320px] md:min-h-[420px]">
            <GalleryImage imageKey="1" />
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
            <GalleryImage imageKey="2" />
          </div>

          {/* Row 2 */}
          <div className="col-span-12 md:col-span-3 min-h-[380px] md:min-h-[520px]">
            <GalleryImage imageKey="3" />
          </div>

          <div className="col-span-12 md:col-span-6 grid grid-cols-6 gap-5 md:gap-6">
            <div className="col-span-2 min-h-[160px] md:min-h-[190px]">
              <GalleryImage imageKey="6" />
            </div>
            <div className="col-span-2 min-h-[160px] md:min-h-[190px]">
              <GalleryImage imageKey="5" />
            </div>
            <div className="col-span-2 min-h-[160px] md:min-h-[190px]">
              <GalleryImage imageKey="6" />
            </div>

            <div className="col-span-3 min-h-[260px] md:min-h-[300px]">
              <GalleryImage imageKey="7" />
            </div>
            <div className="col-span-3 min-h-[260px] md:min-h-[300px]">
              <GalleryImage imageKey="8" />
            </div>
          </div>

          <div className="col-span-12 md:col-span-3 min-h-[380px] md:min-h-[480px]">
            <GalleryImage imageKey="9" />
          </div>

          {/* Row 3 */}
          <div className="col-span-12 md:col-span-4 min-h-[360px] md:min-h-[460px]">
            <GalleryImage imageKey="10" />
          </div>

          <div className="col-span-12 md:col-span-3 min-h-[220px] md:min-h-[270px]">
            <GalleryImage imageKey="11" />
          </div>
        </div>
      </div>
    </section>
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
