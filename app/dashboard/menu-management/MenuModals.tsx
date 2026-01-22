"use client";
import React from "react";
import { X, Plus } from "lucide-react";
import Image from "next/image";

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "PACKAGE" | "CATEGORY" | "ITEM";
}

export const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  if (!isOpen) return null;

  const getTitle = () => {
    switch (type) {
      case "PACKAGE":
        return "Add New Set Package";
      case "CATEGORY":
        return "Add New Category";
      case "ITEM":
        return "Add New Item";
      default:
        return "";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-xl bg-white p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className=" text-3xl font-bold text-gray-800">{getTitle()}</h2>
        </div>

        {/* Form Content */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Logic for PACKAGE form */}
          {type === "PACKAGE" && (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Platter Name
                </label>
                <input
                  type="text"
                  placeholder="Enter platter name"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
                />
              </div>

              {/* Image Upload Box */}
              <div className="relative flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="mb-2 rounded-full bg-white p-2 shadow-sm">
                    <Plus size={24} className="text-red-400" />
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1760&q=80"
                    alt="Placeholder"
                    fill
                    className="object-cover opacity-50 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Items
                </label>
                <input
                  type="text"
                  placeholder="Enter items name"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Price (Per Person)
                </label>
                <input
                  type="text"
                  placeholder="Enter price"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
                />
              </div>
            </>
          )}

          {/* Logic for CATEGORY form */}
          {type === "CATEGORY" && (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Category Type
                </label>
                <div className="relative">
                  <select className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900">
                    <option>Enter platter name</option>
                    <option>Salads</option>
                    <option>Main Course</option>
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="#9CA3AF"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="Enter platter name"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
                />
              </div>

              {/* Image Upload Box */}
              <div className="relative flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 z-10">
                  <div className="rounded-full bg-white p-1 shadow-sm">
                    <X size={16} className="text-red-500" />
                  </div>
                </div>
                <Image
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1760&q=80"
                  alt="Placeholder"
                  fill
                  className="object-cover opacity-80 rounded-lg"
                />
              </div>
            </>
          )}

          {/* Logic for ITEM form */}
          {type === "ITEM" && (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Item Title
                </label>
                <input
                  type="text"
                  placeholder="Enter item title"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Item Description
                </label>
                <input
                  type="text"
                  placeholder="Enter item description"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
                />
              </div>

              {/* Image Upload Box */}
              <div className="relative flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 z-10">
                  <div className="rounded-full bg-white p-1 shadow-sm">
                    <X size={16} className="text-red-500" />
                  </div>
                </div>
                <Image
                  src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1760&q=80"
                  alt="Placeholder"
                  fill
                  className="object-cover opacity-80 rounded-lg"
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            onClick={onClose}
            className="w-full rounded-md bg-emerald-900 py-3.5 text-base font-medium text-white shadow-sm hover:bg-emerald-900Hover transition-colors"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};
