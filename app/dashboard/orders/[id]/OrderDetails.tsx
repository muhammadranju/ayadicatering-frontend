"use client";

import React from "react";
import {
  Download,
  User,
  Calendar,
  CreditCard,
  Package,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} from "@/lib/redux/features/api/orders/ordersApiSlice";
import { format } from "date-fns";
import BackButton from "@/components/logo/BackButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { toast } from "sonner";

interface OrderDetailsProps {
  orderId: string;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId }) => {
  const { data: orderData, isLoading } = useGetOrderByIdQuery(orderId);
  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();
  const order = orderData?.data;

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = React.useState(false);
  const [pendingStatus, setPendingStatus] = React.useState<string | null>(null);

  const handleStatusChangeClick = (newStatus: string) => {
    setPendingStatus(newStatus);
    setIsConfirmDialogOpen(true);
  };

  const confirmStatusChange = async () => {
    if (!pendingStatus) return;

    try {
      await updateOrderStatus({
        id: orderId,
        status: pendingStatus,
      }).unwrap();
      toast.success(`Order status updated to ${pendingStatus}`);
      setIsConfirmDialogOpen(false);
      setPendingStatus(null);
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status");
    }
  };

  const statusColors: Record<string, string> = {
    pending: "text-yellow-600 bg-yellow-100 border-yellow-200",
    confirmed: "text-emerald-600 bg-emerald-100 border-emerald-200",
    completed: "text-blue-600 bg-blue-100 border-blue-200",
  };

  if (isLoading) {
    return (
      <div className="flex-1 px-6 py-8 lg:px-10">
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500">Loading order details...</div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex-1 px-6 py-8 lg:px-10">
        <div className="flex justify-center items-center py-12">
          <div className="text-red-500">Order not found</div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPP");
    } catch {
      return dateString;
    }
  };

  const getMenuDetails = () => {
    if (order.orderType === "SET_PACKAGE" && order.selectedPackage) {
      return {
        type: "Package",
        name: order.selectedPackage.platterName,
        guests: order.selectedPackage.person,
        items: order.selectedPackage.items || [],
      };
    }
    return {
      type: "Build Your Own",
      name: "Custom Menu",
      guests: "N/A",
      items: [],
    };
  };

  const menuDetails = getMenuDetails();

  return (
    <div className="flex-1 px-6 py-8 lg:px-10">
      {/* Top Actions */}
      <BackButton />
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center shadow p-5 rounded-lg bg-white">
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`rounded-lg border px-6 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                  statusColors[order.status] ||
                  "border-gray-300 bg-gray-50 text-gray-500"
                }`}
              >
                {order.status}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {(() => {
                const getNextStatuses = (currentStatus: string) => {
                  switch (currentStatus) {
                    case "pending":
                      return ["confirmed"];
                    case "confirmed":
                      return ["completed"];
                    default:
                      return [];
                  }
                };

                const nextStatuses = getNextStatuses(order.status);

                if (nextStatuses.length === 0) {
                  return (
                    <div className="px-2 py-1.5 text-xs text-muted-foreground">
                      No actions available
                    </div>
                  );
                }

                return nextStatuses.map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => handleStatusChangeClick(status)}
                    className="uppercase text-xs font-bold tracking-wider cursor-pointer"
                  >
                    {status}
                  </DropdownMenuItem>
                ));
              })()}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="rounded-lg border border-blue-600 bg-blue-600/10 hover:bg-blue-600/20 px-6 py-2 text-xs font-bold uppercase tracking-wider text-blue-900">
            {order.orderType}
          </Button>
        </div>
        <Button className="flex items-center justify-center px-20 gap-2 rounded-full bg-orange-600 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-orange-600/90">
          <Download size={16} /> EXPORT
        </Button>
      </div>

      <div className="space-y-6">
        {/* Customer Information Card */}
        <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF0EB] text-[#D48D73]">
              <User size={20} />
            </div>
            <h3 className="text-xl font-medium text-gray-900">
              Customer Information
            </h3>
          </div>

          <div className="grid gap-y-6 md:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                EMAIL ADDRESS
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {order.deliveryDetails?.email || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                WHATSAPP
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {order.deliveryDetails?.whatsapp || "N/A"}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                DELIVERY ADDRESS
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {order.deliveryDetails?.street}, {order.deliveryDetails?.area},{" "}
                {order.deliveryDetails?.city}
              </p>
            </div>
            {order.deliveryDetails?.note && (
              <div className="md:col-span-2">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  NOTES
                </p>
                <p className="mt-1 text-sm font-medium text-gray-900">
                  {order.deliveryDetails.note}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Event Details Card */}
          <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF0EB] text-[#D48D73]">
                <Calendar size={20} />
              </div>
              <h3 className=" text-xl font-medium text-gray-900">
                Event Details
              </h3>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between border-b border-gray-50 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  EVENT DATE
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {formatDate(order.dateTime?.date)}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  EVENT TIME
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {order.dateTime?.time || "N/A"}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  NUMBER OF GUESTS
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {menuDetails.guests}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  MENU TYPE
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {menuDetails.type}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  ORDER DATE
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {formatDate(order.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Information Card */}
          <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF0EB] text-[#D48D73]">
                <CreditCard size={20} />
              </div>
              <h3 className=" text-xl font-medium text-gray-900">
                Payment Information
              </h3>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between border-b border-gray-50 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  PAYMENT METHOD
                </span>
                <span className="text-sm font-medium text-gray-900 capitalize">
                  {order.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  BASE PRICE
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {order.pricing?.basePrice?.toFixed(2)} SAR
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  ADDONS
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {order.pricing?.addonsPrice?.toFixed(2)} SAR
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  SUBTOTAL
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {order.pricing?.subtotal?.toFixed(2)} SAR
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  VAT (15%)
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {order.pricing?.vat?.toFixed(2)} SAR
                </span>
              </div>
              <div className="flex justify-between rounded bg-[#FFF8F6] p-4 mt-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-900 pt-1">
                  TOTAL AMOUNT
                </span>
                <span className=" text-xl font-medium text-[#D48D73]">
                  {order.pricing?.total?.toFixed(2)} SAR
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Details - Only show detailed menu for Build Your Own */}
        {order.orderType === "BUILD_YOUR_OWN" && order.menuSelection && (
          <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF0EB] text-[#D48D73]">
                <Package size={20} />
              </div>
              <h3 className="text-xl font-medium text-gray-900">
                Custom Menu Details
              </h3>
            </div>

            <div className="space-y-6">
              {/* Salad */}
              {order.menuSelection.salad && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    SALAD
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {order.menuSelection.salad.platterName}
                  </p>
                </div>
              )}

              {/* Appetizers */}
              {order.menuSelection.appetizers &&
                order.menuSelection.appetizers.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                      APPETIZERS
                    </p>
                    <ul className="space-y-1">
                      {order.menuSelection.appetizers.map(
                        (item: any, index: number) => (
                          <li
                            key={index}
                            className="text-sm font-medium text-gray-900"
                          >
                            • {item.platterName}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}

              {/* Mains */}
              {order.menuSelection.mains &&
                order.menuSelection.mains.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                      MAIN COURSES
                    </p>
                    <ul className="space-y-1">
                      {order.menuSelection.mains.map(
                        (item: any, index: number) => (
                          <li
                            key={index}
                            className="text-sm font-medium text-gray-900"
                          >
                            • {item.platterName}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        )}

        {/* Package Details - Show for SET_PACKAGE orders */}
        {order.orderType === "SET_PACKAGE" && order.selectedPackage && (
          <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF0EB] text-[#D48D73]">
                <Package size={20} />
              </div>
              <h3 className="text-xl font-medium text-gray-900">
                Package Details
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  PACKAGE NAME
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {order.selectedPackage.platterName}
                </p>
              </div>

              {order.selectedPackage.description && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    DESCRIPTION
                  </p>
                  <p className="text-sm text-gray-700">
                    {order.selectedPackage.description}
                  </p>
                </div>
              )}

              {order.selectedPackage.items &&
                order.selectedPackage.items.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                      INCLUDES
                    </p>
                    <ul className="grid grid-cols-2 gap-2">
                      {order.selectedPackage.items.map(
                        (item: string, index: number) => (
                          <li
                            key={index}
                            className="text-sm font-medium text-gray-900 flex items-start"
                          >
                            <span className="text-orange-500 mr-2">•</span>
                            {item}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>

      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Order Status</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to update the order status to{" "}
              <span className="font-bold">{pendingStatus}</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsConfirmDialogOpen(false);
                setPendingStatus(null);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmStatusChange}
              disabled={isUpdating}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Update Status
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
