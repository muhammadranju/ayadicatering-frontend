"use client";
import { Button } from "@/components/ui/button";
import {
  Notification,
  useGetNotificationsQuery,
  useMarkAllAsReadMutation,
} from "@/lib/redux/features/api/notifications/notificationsApiSlice";
import { format } from "date-fns";
import { CheckSquare, Flag, ShoppingBag, User, XCircle } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const getIcon = (type: string) => {
  switch (type) {
    case "new_order":
      return <ShoppingBag size={24} className="text-orange-500" />;
    case "user":
      return <User size={24} className="text-gray-600" />;
    case "error":
      return <XCircle size={24} className="text-red-500" />;
    case "suggestion":
    case "request":
      return <Flag size={24} className="text-yellow-400" />;
    case "review":
      return <CheckSquare size={24} className="text-green-500" />;
    default:
      return <User size={24} className="text-gray-600" />;
  }
};

export const NotificationsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const limit = 8;

  const {
    data: notificationResponse,
    isLoading,
    isFetching,
  } = useGetNotificationsQuery({
    page: currentPage,
    limit,
  });

  const notifications = Array.isArray(notificationResponse?.data)
    ? notificationResponse.data
    : [];
  const meta = notificationResponse?.meta || {
    page: 1,
    limit: 10,
    total: 0,
  };

  const [markAllAsRead, { isLoading: isMarking }] = useMarkAllAsReadMutation();

  const unreadCount = notifications.filter(
    (n: Notification) => !n.isRead,
  ).length;

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead().unwrap();
      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
      toast.error("Failed to mark notifications as read");
    }
  };

  const totalPages = Math?.ceil(meta.total / limit);

  return (
    <div className="flex-1 px-6 py-8 lg:px-10">
      <h3 className="text-4xl font-semibold mb-6 border-b border-gray-200">
        Notifications
      </h3>
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Total: {meta.total} notifications
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            disabled={isMarking}
            className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isMarking ? "Marking..." : "Mark all as read"}
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm mb-6">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">
            Loading notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No notifications found
          </div>
        ) : (
          <div className={isFetching ? "opacity-50 pointer-events-none" : ""}>
            {notifications?.map((notification: Notification) => (
              <div
                key={notification._id}
                className={`
                flex items-start gap-4 border-b border-gray-200 px-8 py-6 last:border-b-0
                ${!notification.isRead ? "bg-orange-50" : "bg-white"}
              `}
              >
                <div className="mt-1 flex-shrink-0">
                  {getIcon(notification.type)}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-base text-gray-900 font-medium leading-relaxed">
                    {notification.message}
                  </p>
                  <p className="text-sm text-gray-500">
                    {notification.data?.time
                      ? format(
                          new Date(notification.data.time),
                          "MMM d, yyyy 'at' h:mm a",
                        )
                      : format(
                          new Date(notification.createdAt),
                          "MMM d, yyyy 'at' h:mm a",
                        )}
                  </p>
                  <p className="text-xs text-gray-400">
                    User: {notification.data?.name || "N/A"} | Order ID: #
                    <span className="uppercase">
                      {notification.data?.orderId.slice(-6) || "N/A"}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 py-4">
          <Button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1 || isLoading || isFetching}
            className="px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-gray-300 rounded-full hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || isLoading || isFetching}
            className="px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-gray-300 rounded-full hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};
