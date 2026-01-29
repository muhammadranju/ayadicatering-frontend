"use client";

import React from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Utensils,
  ArrowRight,
} from "lucide-react";
import { format } from "date-fns";
import { useGetOrdersByDateQuery } from "@/lib/redux/features/api/orders/ordersApiSlice";
import Link from "next/link";
import { EventCardSkeleton } from "@/components/skeletons/EventCardSkeleton";

interface EventCardProps {
  selectedDate: Date | null;
}

export const EventCard: React.FC<EventCardProps> = ({ selectedDate }) => {
  const formattedDate = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : null;

  const { data: ordersData, isLoading } = useGetOrdersByDateQuery(
    formattedDate,
    {
      skip: !formattedDate,
    },
  );

  const orders = ordersData?.data?.data || [];

  if (isLoading) {
    return <EventCardSkeleton />;
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full flex flex-col min-h-[600px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-medium text-gray-900">
          {selectedDate
            ? `Events on ${format(selectedDate, "yyyy-MM-dd")}`
            : "Selected Date"}
        </h3>
      </div>

      {selectedDate ? (
        <div className="flex-1 flex flex-col">
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-gray-500">Loading orders...</div>
            </div>
          ) : orders.length > 0 ? (
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[600px] scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              {orders.map((order: any) => (
                <div
                  key={order._id}
                  className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden group"
                >
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 ${
                      order.status === "confirmed"
                        ? "bg-emerald-500"
                        : order.status === "pending"
                          ? "bg-orange-500"
                          : "bg-blue-500"
                    }`}
                  />

                  <div className="pl-3">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">
                          {order.deliveryDetails?.email?.split("@")[0] ||
                            "Customer"}
                        </h4>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 uppercase tracking-wide ${
                            order.status === "confirmed"
                              ? "bg-emerald-50 text-emerald-700"
                              : order.status === "pending"
                                ? "bg-orange-50 text-orange-700"
                                : "bg-blue-50 text-blue-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1.5 text-gray-600 text-sm font-medium">
                          <Clock size={16} className="text-gray-400" />
                          {order.dateTime?.time || "N/A"}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users size={16} className="text-gray-400" />
                        <span>
                          {order.orderType === "SET_PACKAGE"
                            ? `${order.selectedPackage?.person || 0} guests`
                            : "Custom Menu"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Utensils size={16} className="text-gray-400" />
                        <span className="truncate">
                          {order.orderType === "SET_PACKAGE"
                            ? order.selectedPackage?.platterName
                            : "Build Your Own"}
                        </span>
                      </div>
                      {order.deliveryDetails?.area && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin size={16} className="text-gray-400" />
                          <span className="truncate max-w-[200px]">
                            {order.deliveryDetails.area}
                          </span>
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/dashboard/orders/${order._id}`}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-800 text-white py-4 rounded-lg text-sm font-medium hover:bg-emerald-900 transition-colors mt-2"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
              <Calendar size={40} className="text-gray-300 mb-3" />
              <p className="text-gray-900 font-medium">No orders found</p>
              <p className="text-sm text-gray-500 mt-1">
                There are no scheduled events for this date.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <Calendar size={48} className="mx-auto mb-3 opacity-50" />
            <p className="text-sm">Select a date from the calendar</p>
            <p className="text-xs mt-1">to see scheduled orders and details</p>
          </div>
        </div>
      )}
    </div>
  );
};
