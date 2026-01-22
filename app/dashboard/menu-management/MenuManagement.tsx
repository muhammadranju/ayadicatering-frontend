"use client";
import React, { useState } from "react";
import { Search, Plus, Edit2, Trash2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { MenuModal } from "./MenuModals";
import { MenuCategory, MenuItem, MenuPackage } from "@/types/types";

// Mock Data
const packages: MenuPackage[] = [
  {
    id: "1",
    name: "Mezze Royale Platter",
    arabicName: "طبق المقبلات الملكي",
    description:
      "Premium selection of hummus, mutable, baba ghanoush, tabouleh, and stuffed grape leaves",
    arabicDescription:
      "تشكيلة فاخرة من الحمص والمتبل وبابا غنوج والتبولة وورق العنب",
    price: 45,
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1760&q=80",
  },
  {
    id: "2",
    name: "Mezze Royale Platter",
    arabicName: "طبق المقبلات الملكي",
    description:
      "Premium selection of hummus, mutable, baba ghanoush, tabouleh, and stuffed grape leaves",
    arabicDescription:
      "تشكيلة فاخرة من الحمص والمتبل وبابا غنوج والتبولة وورق العنب",
    price: 45,
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1364&q=80",
  },
];

const categories: MenuCategory[] = [
  {
    id: "1",
    name: "Category - Salad",
    type: "Salad",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1760&q=80",
  },
  {
    id: "2",
    name: "Category - Classics",
    type: "Classics",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=1760&q=80",
  },
  {
    id: "3",
    name: "Category - Signature Items",
    type: "Signature",
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1760&q=80",
  },
];

const items: MenuItem[] = [
  {
    id: "1",
    name: "Dates & Fig Salad",
    description:
      "Mixed greens with dates, dried figs, and crunchy almonds, with a vinaigrette dressing",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1760&q=80",
  },
  {
    id: "2",
    name: "Watermelon Feta Salad",
    description:
      "Arugula with watermelon and crumbled feta, with a habaq citrus dressing",
    image:
      "https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1760&q=80",
  },
  {
    id: "3",
    name: "Crunchy Chickpea Salad",
    description:
      "Iceberg lettuce topped with crunchy chickpeas, with a tahina-caesar dressing",
    image:
      "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1364&q=80",
  },
  {
    id: "4",
    name: "Thai Beef Salad",
    description:
      "Tender beef slices with fresh asian herbs and spicy lime dressing",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=1364&q=80",
  },
];

export const MenuManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"PACKAGES" | "BUILD_OWN">(
    "PACKAGES",
  );
  const [buildOwnView, setBuildOwnView] = useState<"CATEGORIES" | "ITEMS">(
    "CATEGORIES",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"PACKAGE" | "CATEGORY" | "ITEM">(
    "PACKAGE",
  );

  const handleOpenModal = () => {
    if (activeTab === "PACKAGES") {
      setModalType("PACKAGE");
    } else {
      if (buildOwnView === "CATEGORIES") {
        setModalType("CATEGORY");
      } else {
        setModalType("ITEM");
      }
    }
    setIsModalOpen(true);
  };

  const getAddButtonLabel = () => {
    if (activeTab === "PACKAGES") return "Add Package";
    if (buildOwnView === "CATEGORIES") return "Add Category";
    return "Add Item";
  };

  return (
    <div className="flex-1 px-6 py-8 lg:px-10">
      <h3 className="text-4xl font-semibold mb-6 border-b border-gray-200">
        Menu Management
      </h3>
      {/* Search and Search Box */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search here......."
            className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
          />
        </div>
      </div>

      {/* Tabs and Action Button */}
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-gray-200 sm:flex-row sm:items-end">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("PACKAGES")}
            className={`
              relative pb-4 text-xs font-bold tracking-widest transition-colors uppercase
              ${
                activeTab === "PACKAGES"
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }
            `}
          >
            SET PACKAGES
            {activeTab === "PACKAGES" && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-emerald-900"></span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab("BUILD_OWN");
              setBuildOwnView("CATEGORIES");
            }}
            className={`
              relative pb-4 text-xs font-bold tracking-widest transition-colors uppercase
              ${
                activeTab === "BUILD_OWN"
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }
            `}
          >
            BUILD YOUR OWN
            {activeTab === "BUILD_OWN" && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-emerald-900"></span>
            )}
          </button>
        </div>

        <div className="pb-2">
          <button
            onClick={handleOpenModal}
            className="flex items-center gap-2 rounded-lg bg-emerald-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
          >
            <Plus size={18} />
            {getAddButtonLabel()}
          </button>
        </div>
      </div>

      {/* Back Button for Items View */}
      {activeTab === "BUILD_OWN" && buildOwnView === "ITEMS" && (
        <button
          onClick={() => setBuildOwnView("CATEGORIES")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-emerald-900"
        >
          <ArrowLeft size={16} /> Back to Categories
        </button>
      )}

      {/* Content Area */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* VIEW 1: SET PACKAGES */}
        {activeTab === "PACKAGES" &&
          packages.map((pkg) => (
            <div
              key={pkg.id}
              className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="h-48 w-full overflow-hidden rounded-t-lg relative">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {pkg.name}
                </h3>
                <h4 className="mt-1 text-sm font-medium text-gray-500 text-right font-arabic">
                  {pkg.arabicName}
                </h4>

                <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                  {pkg.description}
                </p>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed text-right font-arabic">
                  {pkg.arabicDescription}
                </p>

                <div className="mt-6 mb-6">
                  <span className="text-lg font-medium text-[#D48D73]">
                    {pkg.price}{" "}
                    <span className="text-sm font-normal text-gray-500">
                      SAR per person
                    </span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <button className="w-full rounded-md bg-emerald-900 py-2.5 text-sm font-medium text-white hover:bg-emerald-800">
                    {pkg.status}
                  </button>
                  <div className="flex gap-2 ml-4">
                    <button className="rounded-full border border-gray-200 p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600">
                      <Edit2 size={16} />
                    </button>
                    <button className="rounded-full border border-red-100 p-2 text-red-400 hover:bg-red-50 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {/* VIEW 2: BUILD YOUR OWN - CATEGORIES */}
        {activeTab === "BUILD_OWN" &&
          buildOwnView === "CATEGORIES" &&
          categories.map((cat) => (
            <div
              key={cat.id}
              className="group cursor-pointer overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md"
              onClick={() => setBuildOwnView("ITEMS")}
            >
              <div className="relative h-64 w-full">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute right-3 top-3 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="rounded-full bg-white p-2 text-gray-600 shadow-md hover:text-emerald-900"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="rounded-full bg-white p-2 text-red-400 shadow-md hover:text-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-medium text-gray-900">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}

        {/* VIEW 3: BUILD YOUR OWN - ITEMS */}
        {activeTab === "BUILD_OWN" &&
          buildOwnView === "ITEMS" &&
          items.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute right-3 top-3 flex gap-2">
                  <button className="rounded-full bg-white p-2 text-gray-600 shadow-md hover:text-emerald-900">
                    <Edit2 size={14} />
                  </button>
                  <button className="rounded-full bg-white p-2 text-red-400 shadow-md hover:text-red-600">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* Reusable Modal */}
      <MenuModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
      />
    </div>
  );
};
