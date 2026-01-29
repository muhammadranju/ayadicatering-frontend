"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, startOfMonth, endOfMonth } from "date-fns";
import { useGetAllDeliverySlotsQuery } from "@/lib/redux/features/api/deliverySlots/deliverySlotsApiSlice";

interface CalendarViewProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  // Calculate date range for fetching data (current month + next month)
  const startDate = format(startOfMonth(new Date()), "yyyy-MM-dd");
  const endDate = format(endOfMonth(addDays(new Date(), 60)), "yyyy-MM-dd");

  // Fetch delivery slots
  const { data: deliverySlots, isLoading } = useGetAllDeliverySlotsQuery({
    startDate,
    endDate,
  });

  // Get blocked status for a specific date
  const getDateBlockStatus = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const slotsData = Array.isArray(deliverySlots?.data)
      ? deliverySlots.data
      : [];
    const slot = slotsData.find((s) => s.date === dateStr);
    if (slot?.isFullDayBlocked) return "blocked";
    if (slot?.timeSlots?.some((ts) => ts.isBlocked)) return "partial";
    return "available";
  };

  // Generate calendar dates (next 60 days)
  const calendarDates = Array.from({ length: 60 }, (_, i) =>
    addDays(new Date(), i),
  );

  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl  text-gray-900">
          {format(new Date(), "MMMM yyyy")}
        </h2>
        <div className="flex gap-2">
          <span className="text-sm text-gray-500">
            {isLoading ? "Loading..." : ""}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-y-6 text-center">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-xs font-bold text-gray-400 tracking-wider mb-2"
          >
            {day}
          </div>
        ))}

        {calendarDates.slice(0, 35).map((date, idx) => {
          const status = getDateBlockStatus(date);
          const isSelected =
            selectedDate &&
            format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

          let bgColor = "bg-white";
          let textColor = "text-gray-700";
          let borderColor = "border-transparent";

          if (status === "blocked") {
            bgColor = "bg-red-100";
            textColor = "text-red-700";
            borderColor = "border-red-300";
          } else if (status === "partial") {
            bgColor = "bg-orange-100";
            textColor = "text-orange-700";
            borderColor = "border-orange-300";
          }

          if (isSelected) {
            bgColor = "bg-brand-orange";
            textColor = "text-white";
            borderColor = "border-orange-600";
          }

          return (
            <div
              key={idx}
              onClick={() => setSelectedDate(date)}
              className="flex flex-col items-center justify-start h-12 relative group cursor-pointer"
            >
              <div
                className={`
                  w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 border ${bgColor} ${textColor} ${borderColor}
                  ${!isSelected ? "hover:bg-gray-50" : "shadow-md"}
                `}
              >
                {format(date, "d")}
              </div>

              {/* Status Indicator Dot */}
              {!isSelected && status !== "available" && (
                <div
                  className={`
                  w-1.5 h-1.5 rounded-full mt-1
                  ${status === "blocked" ? "bg-red-500" : "bg-orange-500"}
                `}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-6 mt-8 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          <span className="text-xs text-gray-500 font-medium">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
          <span className="text-xs text-gray-500 font-medium">
            Partially Blocked
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <span className="text-xs text-gray-500 font-medium">
            Fully Blocked
          </span>
        </div>
      </div>
    </div>
  );
};
