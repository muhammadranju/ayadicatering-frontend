"use client";

import { useGetSetPackageListQuery } from "@/lib/redux/features/api/set-package/setPackageApiSlice";
import { ArrowRight, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface IPackages {
  _id: string;
  platterName: string;
  platterNameArabic: string;
  description: string;
  descriptionArabic: string;
  image: string;
  items: string[];
  itemsArabic: string[];
  price: number;
  person: number;
}

const PackagesPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [packages, setPackages] = React.useState([]);
  const { data, isLoading, error } = useGetSetPackageListQuery(null);
  useEffect(() => {
    if (data) {
      setPackages(data.data.data);
    }
  }, [data]);

  console.log(packages);
  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-7xl text-black">
            {t("packages.title")}
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-light max-w-7xl mx-auto">
            {t("packages.subtitle")}
          </p>
        </div>

        {/* Card Container - Centered */}
        <div
          className={`gap-8 ${
            packages?.length === 1
              ? "flex justify-center"
              : "flex justify-center flex-wrap md:grid md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {packages?.map((packageItem: IPackages) => (
            <div
              key={packageItem._id}
              className="w-full max-w-[400px] border border-gray-100 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300"
            >
              {/* Image Section */}
              <div className="relative h-64">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}${packageItem.image}`}
                  alt={
                    isArabic
                      ? packageItem.platterNameArabic
                      : packageItem.platterName
                  }
                  width={400}
                  height={400}
                  className="object-cover h-64 w-full"
                />
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-[2px] text-white px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium">
                  <User size={16} strokeWidth={2} />
                  <span>
                    {" "}
                    {packageItem.person} {t("packages.guests")}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl  text-gray-900">
                    {isArabic
                      ? packageItem.platterNameArabic
                      : packageItem.platterName}
                  </h3>
                  <p className="text-gray-500 text-only-[15px] leading-relaxed">
                    {isArabic
                      ? packageItem.descriptionArabic
                      : packageItem.description}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl  text-amber-700 font-normal">
                    {packageItem.price}
                  </span>
                  <span className="text-gray-500 text-sm font-medium uppercase tracking-wide">
                    {t("menu.SARprice")}
                  </span>
                </div>

                {/* Menu Includes */}
                <div className="space-y-3">
                  <span className="text-gray-500 text-sm block">
                    {t("packages.menuIncludes")}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {isArabic
                      ? packageItem.itemsArabic.map((item) => (
                          <span
                            key={item}
                            className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-[4px] text-xs font-medium"
                          >
                            {item}
                          </span>
                        ))
                      : packageItem.items.map((item) => (
                          <span
                            key={item}
                            className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-[4px] text-xs font-medium"
                          >
                            {item}
                          </span>
                        ))}
                  </div>
                </div>

                {/* Button */}
                <Link
                  href="/build-your-menu?mode=package"
                  className="w-full bg-green-500 hover:bg-green-700 text-white py-3.5 rounded-md font-medium transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  {t("packages.selectPackage")}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesPage;
