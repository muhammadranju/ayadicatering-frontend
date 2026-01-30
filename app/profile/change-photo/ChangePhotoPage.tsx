"use client";
import { Button } from "@/components/ui/button";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { useUpdateUserPhotoProfileMutation } from "@/lib/redux/features/api/profile/profileSliceApi";
import { Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

export const ChangePhotoPage: React.FC = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { refetch } = useAuthCheck();
  const [updateUserPhotoProfile, { isLoading }] =
    useUpdateUserPhotoProfileMutation();
  const router = useRouter();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select an image file");
    }
  };

  const handleClear = () => {
    setPhoto(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!photo) return;

    const formData = new FormData();
    formData.append("image", photo);

    try {
      await updateUserPhotoProfile(formData).unwrap();
      refetch();
      toast.success("Photo profile updated successfully");
      router.back();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update photo profile");
    }
  };

  return (
    <div>
      <div className="flex mt-20 items-center justify-center p-6">
        <div
          className={`w-full max-w-[600px] rounded-2xl border border-gray-100 bg-white px-16 py-20 shadow-sm flex flex-col items-center transition-colors ${
            isDragOver ? "border-emerald-500 bg-emerald-50" : "border-gray-100"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <h2 className="mb-10 text-center text-3xl font-bold text-gray-800  tracking-wide">
            Change Photo
          </h2>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />

          {preview ? (
            <div className="mb-8 flex flex-col items-center relative">
              <div className="relative w-48 h-48 mb-4">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover rounded-full border-4 border-gray-100"
                />
                <button
                  onClick={handleClear}
                  className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-gray-600 font-medium">{photo?.name}</p>
            </div>
          ) : (
            <>
              <div className="mb-4 flex flex-col items-center justify-center text-gray-800">
                <ImageIcon size={56} strokeWidth={1.5} />
              </div>

              <p className="mb-4 text-lg text-gray-600">
                Drag & drop files here
              </p>

              <p className="mb-6 text-lg text-gray-800">Or</p>

              <Button
                onClick={() => fileInputRef.current?.click()}
                className="mb-8 w-64 rounded-lg bg-emerald-900 py-6 text-lg font-medium text-white shadow-md transition-colors hover:bg-emerald-900/80"
              >
                Upload
              </Button>
            </>
          )}

          <Button
            onClick={handleSubmit}
            disabled={!photo || isLoading}
            className="w-full rounded-lg bg-emerald-900 py-6 text-xl font-medium text-white shadow-md transition-colors hover:bg-emerald-900/80"
          >
            {isLoading ? <ClipLoader color="#ffffff" size={24} /> : "Update"}
          </Button>
        </div>
      </div>
    </div>
  );
};
