"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotificationBell } from "./NotificationBell";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { Camera, Lock } from "lucide-react";
import Link from "next/link";
import { PiPencilFill } from "react-icons/pi";
import { SpinnerCustom } from "../ui/SpinnerCustom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface MenuItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  withBorder?: boolean;
}

function UserMenuItem({ href, icon, label, withBorder }: MenuItemProps) {
  return (
    <DropdownMenuItem
      asChild
      className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-neutral-50 rounded-none ${
        withBorder ? "border-b" : ""
      }`}
    >
      <Link href={href}>
        {icon}
        <span className="text-neutral-700">{label}</span>
      </Link>
    </DropdownMenuItem>
  );
}

export function Header() {
  const { userProfile, isLoading } = useAuthCheck();
  const user = userProfile?.user?.data;

  return (
    <header className="fixed top-0 left-0 right-0 z-10 px-10 py-4 bg-neutral/80 backdrop-blur-md border-neutral-200/20 w-full">
      <div className="flex items-center justify-end space-x-4">
        <div className="flex items-center gap-6">
          <NotificationBell />

          <div className="hidden items-center gap-3 sm:flex">
            {!isLoading && (
              <div className="text-sm">
                <p className="font-bold">{user?.name}</p>
                <p className="text-neutral-500 text-xs capitalize">
                  {/* {user?.role?.toLowerCase()} */}
                  {user?.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
                </p>
              </div>
            )}
            <DropdownMenu>
              {isLoading ? (
                <>
                  <SpinnerCustom />
                  Loading...
                </>
              ) : (
                <DropdownMenuTrigger asChild>
                  <Avatar className="w-10 h-10 rounded-full hover:ring-4 ring-neutral-200 transition-all cursor-pointer">
                    {/* or rounded-lg for more rounded corners */}
                    <AvatarFallback>
                      <SpinnerCustom />
                    </AvatarFallback>
                    <AvatarImage
                      className="w-full h-full object-cover"
                      src={process.env.NEXT_PUBLIC_BASE_SERVER_URL?.concat(
                        user?.image,
                      )}
                      alt={user?.name || "User avatar"}
                    />
                  </Avatar>
                </DropdownMenuTrigger>
              )}
              <DropdownMenuTrigger asChild>
                {/* <div className="flex items-center gap-3 cursor-pointer">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white hover:ring-4 ring-neutral-200 transition-all">
                    <span className="font-medium">A</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 ">
                      {user?.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
                    </p>
                  </div>
                </div> */}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 p-0 rounded" align="end">
                <UserMenuItem
                  href={"/profile/change-photo"}
                  icon={<Camera className="w-5 h-5 text-neutral-900" />}
                  label="Change Photo"
                  withBorder
                />
                <UserMenuItem
                  href="/profile/change-name"
                  icon={<PiPencilFill className="w-5 h-5 text-neutral-900" />}
                  label="Change Name"
                  withBorder
                />
                <UserMenuItem
                  href="/profile/change-password"
                  icon={<Lock className="w-5 h-5 text-neutral-900" />}
                  label="Change Password"
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile view - Avatar only */}
          <div className="flex sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white hover:ring-4 ring-neutral-200 transition-all cursor-pointer">
                  <span className="font-medium">A</span>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56 p-0 rounded" align="end">
                <UserMenuItem
                  href="/profile/change-photo"
                  icon={<Camera className="w-5 h-5 text-neutral-900" />}
                  label="Change Photo"
                  withBorder
                />
                <UserMenuItem
                  href="/profile/change-name"
                  icon={<PiPencilFill className="w-5 h-5 text-neutral-900" />}
                  label="Change Name"
                  withBorder
                />
                <UserMenuItem
                  href="/profile/change-password"
                  icon={<Lock className="w-5 h-5 text-neutral-900" />}
                  label="Change Password"
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
