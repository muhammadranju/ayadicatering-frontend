"use client";
import React from "react";
import { Calendar, Clock, Users, Download, Crown } from "lucide-react";
import { Order } from "@/types/types";
import Link from "next/link";

interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <div className="mb-4 rounded-lg border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-medium text-gray-900">
              {order.customerName}
            </h3>
            {order.isVip && (
              <span className="flex items-center gap-1 rounded bg-[#FFF0EB] px-2 py-0.5 text-[10px] font-bold tracking-wide text-[#D48D73]">
                <Crown size={12} fill="currentColor" /> VIP
              </span>
            )}
          </div>
          <p className="mt-1 text-xs uppercase text-gray-400">{order.id}</p>
        </div>

        <span className="rounded bg-[#E6F4EA] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1E8E3E]">
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
          <p className="text-sm font-medium text-gray-900">{order.date}</p>
        </div>

        {/* Time */}
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-400">
            <Clock size={14} /> TIME
          </div>
          <p className="text-sm font-medium text-gray-900">{order.time}</p>
        </div>

        {/* Menu */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
            MENU
          </div>
          <p className="text-sm font-medium text-gray-900">{order.menu}</p>
        </div>

        {/* Guests */}
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-400">
            <Users size={14} /> GUESTS
          </div>
          <p className="text-sm font-medium text-gray-900">{order.guests}</p>
        </div>

        {/* Amount */}
        <div>
          <div className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
            AMOUNT
          </div>
          <p className="text-sm font-semibold text-[#D48D73]">{order.amount}</p>
        </div>
      </div>

      {/* Actions Footer */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href={`/dashboard/orders/${order.id}`}
          className="rounded-full border border-gray-200 bg-white px-6 py-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:bg-gray-50 hover:text-gray-700"
        >
          View
        </Link>

        <button className="flex items-center gap-2 rounded-full bg-[#D48D73] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#c47d63]">
          <Download size={14} /> Export
        </button>

        <button className="rounded-full border border-gray-200 bg-white px-6 py-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:bg-gray-50 hover:text-gray-700">
          Mark Confirmed
        </button>
      </div>
    </div>
  );
};
