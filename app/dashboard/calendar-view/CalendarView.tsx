"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameMonth,
  isToday,
} from "date-fns";
import { useGetAllDeliverySlotsQuery } from "@/lib/redux/features/api/deliverySlots/deliverySlotsApiSlice";

interface CalendarViewProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  // Calculate date range for fetching data (current month)
  const currentDate = new Date();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const startDate = format(monthStart, "yyyy-MM-dd");
  const endDate = format(monthEnd, "yyyy-MM-dd");

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

  // Generate calendar grid for the current month
  const daysInMonth = eachDayOfInterval({
    start: monthStart,
    end: monthEnd,
  });

  // Calculate empty slots at the start of the month to align with day of week
  const startDayIndex = getDay(monthStart);
  const emptySlots = Array.from({ length: startDayIndex });

  // Combine empty slots and actual days
  const calendarGrid = [...emptySlots, ...daysInMonth];

  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <div className="flex gap-2">
          <span className="text-sm text-gray-500">
            {isLoading ? "Loading..." : ""}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-bold text-gray-400 tracking-widest uppercase py-2"
          >
            {day}
          </div>
        ))}

        {calendarGrid.map((date, idx) => {
          // Render empty slot if date is undefined (from emptySlots)
          if (!date) {
            return <div key={`empty-${idx}`} className="aspect-square" />;
          }

          const status = getDateBlockStatus(date as Date);
          const isSelected =
            selectedDate &&
            format(date as Date, "yyyy-MM-dd") ===
              format(selectedDate, "yyyy-MM-dd");
          const isCurrentDay = isToday(date as Date);

          // Base styles for the card
          let containerClasses = "bg-[#F8F9FB] text-gray-700 hover:bg-gray-100";
          let dotColor = null;

          // Status-based styles
          if (status === "blocked") {
            // containerClasses = "bg-red-50 text-red-700"; // Optional: tint blocked days
            dotColor = "bg-red-500";
          } else if (status === "partial") {
            // containerClasses = "bg-orange-50 text-orange-700"; // Optional: tint partial days
            dotColor = "bg-orange-500";
          } else if (isCurrentDay && !isSelected) {
            // Indicate today with a green dot if available and not selected
            dotColor = "bg-green-500";
          }

          // Selection styles (override everything)
          if (isSelected) {
            containerClasses =
              "bg-[#E07A5F] text-white shadow-md transform scale-105";
            dotColor = "bg-white"; // Dot becomes white on selected background
          }

          return (
            <div
              key={idx}
              onClick={() => setSelectedDate(date as Date)}
              className={`
                aspect-square rounded-2xl flex flex-col items-center justify-center relative cursor-pointer transition-all duration-200
                ${containerClasses}
              `}
            >
              <span
                className={`text-lg font-medium ${isSelected ? "text-white" : ""}`}
              >
                {format(date as Date, "d")}
              </span>

              {/* Status Indicator Dot */}
              {dotColor && (
                <div className={`w-1.5 h-1.5 rounded-full mt-2 ${dotColor}`} />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-6 mt-10 pt-6 border-t border-gray-100 justify-end">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            Available
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            Partially Blocked
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            Fully Blocked
          </span>
        </div>
      </div>
    </div>
  );
};
