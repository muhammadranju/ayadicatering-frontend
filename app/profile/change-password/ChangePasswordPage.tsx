"use client";
import React from "react";
import { EyeOff } from "lucide-react";
import BackButton from "@/components/logo/BackButton";

export const ChangePasswordPage: React.FC = () => {
  return (
    <div>
      <BackButton />
      <div className="flex h-[calc(100vh-85px)] items-center justify-center p-6">
        <div className="w-full max-w-[600px] rounded-2xl border border-gray-100 bg-white px-16 py-20 shadow-sm">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-800 ">
            Change Password
          </h2>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your current password"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-sidebar focus:outline-none focus:ring-1 focus:ring-sidebar transition-shadow"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <EyeOff size={18} />
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your new password"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900 transition-shadow"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <EyeOff size={18} />
                </button>
              </div>
            </div>

            <div className="pt-8 flex justify-center">
              <button className="w-56 rounded-lg bg-emerald-900 py-3.5 text-lg font-medium text-white shadow-md transition-colors hover:bg-emerald-900/80">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
