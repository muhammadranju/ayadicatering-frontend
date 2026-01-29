"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useUpdateOrderStatusMutation } from "@/lib/redux/features/api/orders/ordersApiSlice";
import { format } from "date-fns";
import { Calendar, Clock, Users } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

interface OrderCardProps {
  order: any;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [targetStatus, setTargetStatus] = useState<"confirmed" | "completed">(
    "confirmed",
  );

  const handleStatusUpdate = async () => {
    try {
      await updateOrderStatus({
        id: order._id,
        status: targetStatus,
      }).unwrap();
      toast.success(`Order marked as ${targetStatus} successfully`);
      setIsConfirmDialogOpen(false);
    } catch (error) {
      console.error(`Failed to mark as ${targetStatus}:`, error);
      toast.error(`Failed to mark as ${targetStatus}`);
    }
  };

  // Determine menu/package name based on order type
  const getMenuName = () => {
    if (order.orderType === "SET_PACKAGE" && order.selectedPackage) {
      return order.selectedPackage.platterName;
    }
    return "Build Your Own Menu";
  };

  // Get guests count
  const getGuestsCount = () => {
    if (order.orderType === "SET_PACKAGE" && order.selectedPackage) {
      return order.selectedPackage.person;
    }
    return "N/A";
  };

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "yyyy-MM-dd");
    } catch {
      return dateString;
    }
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-200 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-blue-200 text-blue-700";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  return (
    <div className="mb-4 rounded-lg border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-medium text-gray-900">
              {order.deliveryDetails?.email || "Customer"}
            </h3>
          </div>
          <p className="mt-1 text-xs uppercase text-gray-400">
            #{order._id.slice(-6)}
          </p>
        </div>

        <span
          className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xl ${getStatusColor(order.status)}`}
        >
          {order.status}
        </span>
      </div>

      {/* Grid Details Section */}
      <div className="mt-6 grid grid-cols-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
        {/* Date */}
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-400">
            <Calendar size={14} /> DATE
          </div>
          <p className="text-sm font-medium text-gray-900">
            {formatDate(order.dateTime?.date)}
          </p>
        </div>

        {/* Time */}
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-400">
            <Clock size={14} /> TIME
          </div>
          <p className="text-sm font-medium text-gray-900">
            {order.dateTime?.time || "N/A"}
          </p>
        </div>

        {/* Menu */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
            MENU
          </div>
          <p className="text-sm font-medium text-gray-900">{getMenuName()}</p>
        </div>

        {/* Guests */}
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-400">
            <Users size={14} /> GUESTS
          </div>
          <p className="text-sm font-medium text-gray-900">
            {getGuestsCount()}
          </p>
        </div>

        {/* Amount */}
        <div>
          <div className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
            AMOUNT
          </div>
          <p className="text-sm font-semibold text-orange-500">
            {order.pricing?.total?.toFixed(2) || "0.00"} SAR
          </p>
        </div>
      </div>

      {/* Actions Footer */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href={`/dashboard/orders/${order._id}`}
          className="rounded-full border border-gray-200 bg-white px-6 py-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:bg-gray-50 hover:text-gray-700"
        >
          View
        </Link>

        {/* <button className="flex items-center gap-2 rounded-full bg-[#D48D73] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#c47d63]">
          <Download size={14} /> Export
        </button> */}

        {order.status === "pending" && (
          <button
            onClick={() => {
              setTargetStatus("confirmed");
              setIsConfirmDialogOpen(true);
            }}
            className="rounded-full border border-gray-200 bg-green-100 px-6 py-2 text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-green-200 hover:text-gray-700 cursor-pointer"
          >
            Mark Confirmed
          </button>
        )}

        {order.status === "confirmed" && (
          <button
            onClick={() => {
              setTargetStatus("completed");
              setIsConfirmDialogOpen(true);
            }}
            className="rounded-full border border-gray-200 bg-blue-100 px-6 py-2 text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-blue-200 hover:text-gray-700 cursor-pointer"
          >
            Mark Completed
          </button>
        )}

        <AlertDialog
          open={isConfirmDialogOpen}
          onOpenChange={setIsConfirmDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Update Order Status</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to mark this order as{" "}
                <span className="font-bold">{targetStatus}</span>? This action
                will update the order status.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-lg">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleStatusUpdate}
                disabled={isUpdating}
                className={
                  targetStatus === "confirmed"
                    ? "bg-green-600 hover:bg-green-700 rounded-lg"
                    : "bg-blue-600 hover:bg-blue-700 rounded-lg"
                }
              >
                {targetStatus === "confirmed" ? "Confirm" : "Complete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
