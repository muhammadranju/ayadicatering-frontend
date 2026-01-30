"use client";
import { Button } from "@/components/ui/button";
import { useUpdateUserPasswordProfileMutation } from "@/lib/redux/features/api/profile/profileSliceApi";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

export const ChangePasswordPage: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [updateUserPasswordProfile, { isLoading }] =
    useUpdateUserPasswordProfileMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      const result = await updateUserPasswordProfile({
        body: {
          currentPassword,
          newPassword,
          confirmPassword,
        },
      }).unwrap();

      if (result?.success) {
        toast.success("Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error("Failed to change password");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to change password");
    }
  };

  return (
    <div>
      <div className="flex mt-20 items-center justify-center p-6">
        <div className="w-full max-w-[600px] rounded-2xl border border-gray-100 bg-white px-16 py-20 shadow-sm">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-800 ">
            Change Password
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter your current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-sidebar focus:outline-none focus:ring-1 focus:ring-sidebar transition-shadow"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? (
                    <Eye size={18} />
                  ) : (
                    <EyeOff size={18} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900 transition-shadow"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-900 transition-shadow"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <Eye size={18} />
                  ) : (
                    <EyeOff size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-8 flex justify-center">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-56 rounded-lg bg-emerald-900 py-3.5 text-lg font-medium text-white shadow-md transition-colors hover:bg-emerald-900/80"
              >
                {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
