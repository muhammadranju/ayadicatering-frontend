"use client";
import React from "react";
import { Image as ImageIcon } from "lucide-react";
import BackButton from "@/components/logo/BackButton";

export const ChangePhoto: React.FC = () => {
  return (
    <div>
      <BackButton />
      <div className="flex h-[calc(100vh-85px)] items-center justify-center p-6">
        <div className="w-full max-w-[600px] rounded-2xl border border-gray-100 bg-white px-16 py-20 shadow-sm flex flex-col items-center">
          <h2 className="mb-10 text-center text-3xl font-bold text-gray-800  tracking-wide">
            Change Photo
          </h2>

          <div className="mb-4 flex flex-col items-center justify-center text-gray-800">
            <ImageIcon size={56} strokeWidth={1.5} />
          </div>

          <p className="mb-4 text-lg text-gray-600">Drag & drop files here</p>

          <p className="mb-6 text-lg text-gray-800">Or</p>

          <button className="mb-8 w-64 rounded-lg bg-emerald-900 py-3 text-lg font-medium text-white shadow-md transition-colors hover:bg-emerald-900/80">
            Upload
          </button>

          <button className="w-full rounded-lg bg-emerald-900 py-3.5 text-xl font-medium text-white shadow-md transition-colors hover:bg-emerald-900/80">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
