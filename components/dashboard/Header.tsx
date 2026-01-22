"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Camera, Lock } from "lucide-react";
import Link from "next/link";
import { PiPencilFill } from "react-icons/pi";

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
  return (
    <header className="fixed top-0 left-0 right-0 z-10 px-10 py-4 bg-neutral/80 backdrop-blur-md border-neutral-200/20 w-full">
      <div className="flex items-center justify-end space-x-4">
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard/notifications"
            className="relative text-gray-400 hover:text-gray-600"
          >
            <Bell size={20} />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-orange-500"></span>
          </Link>

          <div className="hidden items-center gap-3 sm:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white hover:ring-4 ring-neutral-200 transition-all">
                    <span className="font-medium">A</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      Admin User
                    </p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
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
