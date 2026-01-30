"use client";
import { Button } from "@/components/ui/button";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { useUpdateUserNameProfileMutation } from "@/lib/redux/features/api/profile/profileSliceApi";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

export const ChangeNamePage: React.FC = () => {
  const { userProfile, refetch } = useAuthCheck();
  const userName = userProfile?.user?.data?.name || "";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Update local state when userProfile is loaded
  useEffect(() => {
    if (userName) {
      const parts = userName.split(" ");
      setFirstName(parts[0] || "");
      setLastName(parts.slice(1).join(" ") || "");
    }
  }, [userName]);

  const userId = userProfile?.user?.data?._id;
  const [updateUserNameProfile, { isLoading }] =
    useUpdateUserNameProfileMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await updateUserNameProfile({
        userId: userId,
        body: {
          name: `${firstName} ${lastName}`.trim(),
          userId: userId,
        },
      }).unwrap();

      if (result?.success) {
        refetch();
        toast.success("Name updated successfully");
      }
    } catch (error: any) {
      console.log(error);
      toast.error((error.data.message as string) || "Error updating name");
    }
  };

  return (
    <div>
      <div className="flex mt-20 items-center justify-center p-6">
        <div className="w-full max-w-[600px] rounded-2xl border border-gray-100 bg-white px-16 py-20 shadow-sm">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-800 ">
            Change Name
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                First Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-sidebar focus:outline-none focus:ring-1 focus:ring-sidebar transition-shadow"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-sidebar focus:outline-none focus:ring-1 focus:ring-sidebar transition-shadow"
                  required
                />
              </div>
            </div>

            <div className="pt-8 flex justify-center">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-56 rounded-lg bg-emerald-900 py-6 text-lg font-medium text-white shadow-md transition-colors hover:bg-emerald-900/80"
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
