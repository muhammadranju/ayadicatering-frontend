"use client";
import React from "react";
import { User, XCircle, Flag, CheckSquare } from "lucide-react";

interface Notification {
  id: string;
  type: "user" | "error" | "suggestion" | "review" | "request";
  message: string;
  time: string;
  isUnread: boolean;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "user",
    message:
      'User "john@example.com" has successfully upgraded from Free to Pro.',
    time: "2 min ago",
    isUnread: true,
  },
  {
    id: "2",
    type: "error",
    message:
      'User "sadia.user42@gmail.com" attempted to upgrade to Pro but encountered an issue',
    time: "10 mins ago",
    isUnread: true,
  },
  {
    id: "3",
    type: "suggestion",
    message:
      'User "rahim.khan12" submitted a new suggestion: "Please add a savings goal tracker."',
    time: "30 min ago",
    isUnread: false,
  },
  {
    id: "4",
    type: "review",
    message:
      'User "tasnia_98" left a 5-star review on the Play Store: "Very useful app. Helped me track my expenses easily!"',
    time: "2 hours ago",
    isUnread: false,
  },
  {
    id: "5",
    type: "request",
    message: 'User "robin_dev23" has submitted a request to review the app.',
    time: "Yesterday",
    isUnread: false,
  },
];

const getIcon = (type: Notification["type"]) => {
  switch (type) {
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
  return (
    <div className="flex-1 px-6 py-8 lg:px-10">
      <h3 className="text-4xl font-semibold mb-6 border-b border-gray-200">
        Notifications
      </h3>
      <div className="mb-4 flex justify-end">
        <button className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors cursor-pointer">
          Mark all as read
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`
              flex items-start gap-4 border-b border-gray-200 px-8 py-6 last:border-b-0
              ${notification.isUnread ? "bg-orange-50" : "bg-white"}
            `}
          >
            <div className="mt-1 flex-shrink-0">
              {getIcon(notification.type)}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-base text-gray-900 font-medium leading-relaxed">
                {notification.message}
              </p>
              <p className="text-sm text-gray-500">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
