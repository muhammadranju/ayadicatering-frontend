import React from "react";
import { Download, User, Calendar, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export const OrderDetails: React.FC = () => {
  return (
    <div className="flex-1 px-6 py-8 lg:px-10">
      {/* Top Actions */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center shadow p-5 rounded-lg bg-white">
        <div className="flex gap-4">
          <Button className="rounded-lg border border-emerald-600 bg-emerald-600/10 hover:bg-emerald-600/20 px-6 py-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
            CONFIRMED
          </Button>
          <Button className="rounded-lg border border-emerald-600 bg-emerald-600/10 hover:bg-emerald-600/20 px-6 py-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
            PAID
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
                CUSTOMER NAME
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                Prince Ahmed Al-Saud
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                EMAIL ADDRESS
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                prince.ahmed@example.sa
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                PHONE NUMBER
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                +966 50 123 4567
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                EVENT LOCATION
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                Private Villa, Diplomatic Quarter, Riyadh
              </p>
            </div>
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
                  2024-12-25
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  EVENT TIME
                </span>
                <span className="text-sm font-medium text-gray-900">
                  8:00 PM
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  NUMBER OF GUESTS
                </span>
                <span className="text-sm font-medium text-gray-900">
                  150 guests
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  MENU PACKAGE
                </span>
                <span className="text-sm font-medium text-gray-900">
                  The Royal Banquet
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  ORDER DATE
                </span>
                <span className="text-sm font-medium text-gray-900">
                  2024-12-10
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
                <span className="text-sm font-medium text-gray-900">
                  Bank Transfer
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  PAYMENT STATUS
                </span>
                <span className="rounded bg-[#E6F4EA] px-3 py-0.5 text-[10px] font-bold text-[#1E8E3E]">
                  Paid
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  SUBTOTAL
                </span>
                <span className="text-sm font-medium text-gray-900">
                  47,250 SAR
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  SERVICE FEE (5%)
                </span>
                <span className="text-sm font-medium text-gray-900">
                  2,362.5 SAR
                </span>
              </div>
              <div className="flex justify-between rounded bg-[#FFF8F6] p-4 mt-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-900 pt-1">
                  TOTAL AMOUNT
                </span>
                <span className=" text-xl font-medium text-[#D48D73]">
                  12,500 SAR
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
