/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { X, Plus, Loader2 } from "lucide-react";
import Image from "next/image";
import {
  useCreateSetPackageMutation,
  useUpdateSetPackageMutation,
} from "@/lib/redux/features/api/set-package/setPackageApiSlice";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/lib/redux/features/api/category/categoryApiSlice";
import {
  useCreateBuildPackageMutation,
  useUpdateBuildPackageMutation,
} from "@/lib/redux/features/api/buildPackage/buildPackageApiSlice";

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "PACKAGE" | "CATEGORY" | "ITEM";
  editingItem?: any;
  categoryId?: string;
  refetch?: any;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  type,
  editingItem,
  categoryId,
  refetch,
}) => {
  const [createSetPackage] = useCreateSetPackageMutation();
  const [updateSetPackage] = useUpdateSetPackageMutation();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [createBuildPackage] = useCreateBuildPackageMutation();
  const [updateBuildPackage] = useUpdateBuildPackageMutation();

  const [formData, setFormData] = useState({
    platterName: "",
    platterNameArabic: "",
    platterDescription: "",
    platterDescriptionArabic: "",
    items: "",
    itemsArabic: "",
    price: "",
    person: "",
    categoryType: "",
    categoryName: "",
    categoryNameArabic: "",
    itemTitle: "",
    itemTitleArabic: "",
    itemDescription: "",
    itemDescriptionArabic: "",
    categoryId: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (editingItem) {
        // Populate form with existing data
        if (type === "PACKAGE") {
          setFormData({
            platterName: editingItem.platterName || "",
            platterNameArabic: editingItem.platterNameArabic || "",
            platterDescription: editingItem.description || "",
            platterDescriptionArabic: editingItem.descriptionArabic || "",
            items: Array.isArray(editingItem.items)
              ? editingItem.items.join(", ")
              : editingItem.items || "",
            itemsArabic: Array.isArray(editingItem.itemsArabic)
              ? editingItem.itemsArabic.join(", ")
              : editingItem.itemsArabic || "",
            price: editingItem.price || "",
            person: editingItem.person || "",
            categoryType: "",
            categoryName: "",
            categoryNameArabic: "",
            itemTitle: "",
            itemTitleArabic: "",
            itemDescription: "",
            itemDescriptionArabic: "",
            categoryId: categoryId || "",
          });
        } else if (type === "CATEGORY") {
          setFormData({
            platterName: "",
            platterNameArabic: "",
            platterDescription: "",
            platterDescriptionArabic: "",
            items: "",
            itemsArabic: "",
            price: "",
            person: "",
            categoryType: editingItem.type || "",
            categoryName: editingItem.name || "",
            categoryNameArabic: editingItem.nameArabic || "",
            itemTitle: "",
            itemTitleArabic: "",
            itemDescription: "",
            itemDescriptionArabic: "",
            categoryId: categoryId || "",
          });
        } else if (type === "ITEM") {
          setFormData({
            platterName: "",
            platterNameArabic: "",
            platterDescription: "",
            platterDescriptionArabic: "",
            items: "",
            itemsArabic: "",
            price: editingItem.price || "",
            person: "",
            categoryType: "",
            categoryName: "",
            categoryNameArabic: "",
            itemTitle: editingItem.name || editingItem.platterName || "",
            itemTitleArabic: editingItem.platterNameArabic || "",
            itemDescription: editingItem.description || "",
            itemDescriptionArabic: editingItem.descriptionArabic || "",
            categoryId: categoryId || "",
          });
        }

        // Set Preview Image
        if (editingItem.image) {
          const imageUrl = editingItem.image.startsWith("http")
            ? editingItem.image
            : `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}${editingItem.image}`;
          setPreview(imageUrl);
        } else {
          setPreview("");
        }
        setFile(null);
      } else {
        // Reset form for create mode
        setFormData({
          platterName: "",
          platterNameArabic: "",
          platterDescription: "",
          platterDescriptionArabic: "",
          items: "",
          itemsArabic: "",
          price: "",
          person: "",
          categoryType: "",
          categoryName: "",
          categoryNameArabic: "",
          itemTitle: "",
          itemTitleArabic: "",
          itemDescription: "",
          itemDescriptionArabic: "",
          categoryId: categoryId || "",
        });
        setFile(null);
        setPreview("");
      }
    }
  }, [isOpen, editingItem, type]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = new FormData();
      if (file) {
        data.append("image", file);
      }

      if (type === "PACKAGE") {
        data.append("platterName", formData.platterName);
        data.append("platterNameArabic", formData.platterNameArabic);
        data.append("description", formData.platterDescription);
        data.append("descriptionArabic", formData.platterDescriptionArabic);

        // Handle items array
        const itemsArray = formData.items.split(",").map((item) => item.trim());
        itemsArray.forEach((item) => data.append("items", item));

        const itemsArabicArray = formData.itemsArabic
          .split(",")
          .map((item) => item.trim());
        itemsArabicArray.forEach((item) => data.append("itemsArabic", item));

        data.append("price", formData.price);
        data.append("person", formData.person);
        data.append("isAvailable", "true");
        data.append("status", "Available");

        if (editingItem) {
          await updateSetPackage({ id: editingItem._id, data }).unwrap();
          if (refetch) refetch();
        } else {
          await createSetPackage(data).unwrap();
          if (refetch) refetch();
        }
      } else if (type === "CATEGORY") {
        data.append("name", formData.categoryName);
        data.append("nameArabic", formData.categoryNameArabic);
        data.append("type", formData.categoryType);

        if (editingItem) {
          await updateCategory({ id: editingItem._id, data }).unwrap();
          if (refetch) refetch();
        } else {
          await createCategory(data).unwrap();
          if (refetch) refetch();
        }
      } else if (type === "ITEM") {
        data.append("name", formData.itemTitle);
        data.append("platterName", formData.itemTitle);
        data.append("platterNameArabic", formData.itemTitleArabic);
        data.append("description", formData.itemDescription);
        data.append("descriptionArabic", formData.itemDescriptionArabic);
        data.append("price", formData.price);
        data.append("isAvailable", "true");
        data.append("categoryId", formData.categoryId);

        if (editingItem) {
          await updateBuildPackage({ id: editingItem._id, data }).unwrap();
          if (refetch) refetch();
        } else {
          await createBuildPackage(data).unwrap();
          if (refetch) refetch();
        }
      }
      onClose();
    } catch (err) {
      console.error("Failed to save:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getTitle = () => {
    const action = editingItem ? "Edit" : "Add New";
    switch (type) {
      case "PACKAGE":
        return `${action} Set Package`;
      case "CATEGORY":
        return `${action} Category`;
      case "ITEM":
        return `${action} Item`;
      default:
        return "";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl rounded-xl bg-white shadow-2xl flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="pt-8 px-8 pb-2 text-center shrink-0">
          <h2 className="text-3xl font-bold text-gray-800">{getTitle()}</h2>
        </div>

        {/* Form Content */}
        <div className="overflow-y-auto px-8 pb-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Logic for PACKAGE form */}
            {type === "PACKAGE" && (
              <>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Platter Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="platterName"
                    value={formData.platterName}
                    required
                    onChange={handleChange}
                    placeholder="Enter platter name"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 text-right">
                    اسم الطبق (Arabic) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="platterNameArabic"
                    value={formData.platterNameArabic}
                    onChange={handleChange}
                    placeholder="أدخل اسم الطبق"
                    dir="rtl"
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Platter Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="platterDescription"
                    value={formData.platterDescription}
                    onChange={handleChange}
                    placeholder="Enter platter description"
                    rows={5}
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 text-right">
                    وصف الطبق (Arabic) <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="platterDescriptionArabic"
                    value={formData.platterDescriptionArabic}
                    onChange={handleChange}
                    placeholder="أدخل وصف الطبق"
                    dir="rtl"
                    rows={5}
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
                  />
                </div>

                {/* Image Upload Box */}
                <label className="relative flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="mb-2 rounded-full bg-white p-2 shadow-sm">
                      <Plus size={24} className="text-red-400" />
                    </div>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                  </div>
                  {preview && (
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-cover opacity-50 rounded-lg"
                    />
                  )}
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Items <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="items"
                    value={formData.items}
                    onChange={handleChange}
                    placeholder="Enter items name (comma separated)"
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 text-right">
                    المكونات (Arabic) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="itemsArabic"
                    value={formData.itemsArabic}
                    onChange={handleChange}
                    placeholder="أدخل المكونات (مفصولة بفواصل)"
                    dir="rtl"
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
                  />
                </div>

                <div className="flex gap-x-4 justify-between">
                  <div className="w-full">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Price (Per Person)
                      <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                      required
                      className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
                    />
                  </div>
                  {/* <div className="w-full">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Per Person <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      name="person"
                      value={formData.person}
                      onChange={handleChange}
                      placeholder="Enter per person"
                      required
                      className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
                    />
                  </div> */}
                </div>
              </>
            )}

            {/* Logic for CATEGORY form */}
            {type === "CATEGORY" && (
              <>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Category Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleChange}
                    placeholder="Enter category name"
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 text-right">
                    اسم الفئة (Arabic) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="categoryNameArabic"
                    value={formData.categoryNameArabic}
                    onChange={handleChange}
                    placeholder="أدخل اسم الفئة"
                    dir="rtl"
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
                  />
                </div>

                {/* Image Upload Box */}
                <label className="relative flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 z-10">
                    <div className="rounded-full bg-white p-1 shadow-sm">
                      <Plus size={16} className="text-red-500" />
                    </div>
                    <p className="mb-2 text-sm text-gray-500 mt-2">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                  </div>
                  {preview && (
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-cover opacity-80 rounded-lg"
                    />
                  )}
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
              </>
            )}

            {/* Logic for ITEM form */}
            {type === "ITEM" && (
              <>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Item Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="itemTitle"
                    value={formData.itemTitle}
                    onChange={handleChange}
                    required
                    placeholder="Enter item title"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 text-right">
                    عنوان العنصر (Arabic){" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="itemTitleArabic"
                    value={formData.itemTitleArabic}
                    onChange={handleChange}
                    placeholder="أدخل عنوان العنصر"
                    dir="rtl"
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Item Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="itemDescription"
                    value={formData.itemDescription}
                    onChange={handleChange}
                    placeholder="Enter item description"
                    rows={4}
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 text-right">
                    وصف العنصر (Arabic) <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="itemDescriptionArabic"
                    value={formData.itemDescriptionArabic}
                    onChange={handleChange}
                    placeholder="أدخل وصف العنصر"
                    required
                    dir="rtl"
                    rows={4}
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
                  />
                </div>

                {/* Image Upload Box */}
                <label className="relative flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 z-10">
                    <div className="rounded-full bg-white p-1 shadow-sm">
                      <Plus size={16} className="text-red-500" />
                    </div>
                    <p className="mb-2 text-sm text-gray-500 mt-2">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                  </div>
                  {preview && (
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-cover opacity-80 rounded-lg"
                    />
                  )}
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Price <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    required
                    onChange={handleChange}
                    placeholder="Enter price"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900"
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center rounded-md bg-emerald-900 py-3.5 text-base font-medium text-white shadow-sm hover:bg-emerald-900Hover transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
