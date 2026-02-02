"use client";

import { useGetNotificationsQuery } from "@/lib/redux/features/api/notifications/notificationsApiSlice";
import { Bell } from "lucide-react";
import Link from "next/link";
import { Notification } from "@/lib/redux/features/api/notifications/notificationsApiSlice";

export function NotificationBell() {
  const { data: notifications = [] } = useGetNotificationsQuery();

  const unreadCount = notifications.filter(
    (n: Notification) => !n.isRead
  ).length;

  return (
    <Link
      href="/dashboard/notifications"
      className="relative text-gray-400 hover:text-gray-600 outline-none transition-colors"
    >
      <Bell size={20} />
      {unreadCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] text-white animate-in zoom-in duration-300">
          {unreadCount}
        </span>
      )}
    </Link>
  );
}
