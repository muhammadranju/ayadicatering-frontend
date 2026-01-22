import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarDay } from "@/types/types";

export const CalendarView: React.FC = () => {
  const days: CalendarDay[] = Array.from({ length: 35 }, (_, i) => {
    const day = i - 3; // Offset to start month correctly
    let status: CalendarDay["status"] = null;
    let isSelected = false;
    const isCurrentMonth = true;

    if (day <= 0) return { date: 30 + day, isCurrentMonth: false }; // Prev month
    if (day > 31) return { date: day - 31, isCurrentMonth: false }; // Next month

    // Mock data matching image
    if (day === 25) status = "confirmed";
    if (day === 26) isSelected = true;
    if (day === 29) status = "in-progress";
    if (day === 30) status = "confirmed";
    if (day === 31) status = "in-progress";
    if (day === 25) status = "confirmed";

    return { date: day, status, isSelected, isCurrentMonth };
  });

  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl  text-gray-900">December 2024</h2>
        <div className="flex gap-2">
          <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft size={20} className="text-gray-500" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronRight size={20} className="text-gray-500" />
          </button>
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

        {days.map((day, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-start h-12 relative group cursor-pointer"
          >
            <div
              className={`
                w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200
                ${
                  day.isSelected
                    ? "bg-brand-orange text-white shadow-md"
                    : day.isCurrentMonth
                      ? "text-gray-700 hover:bg-gray-50"
                      : "text-gray-300"
                }
              `}
            >
              {day.date}
            </div>

            {/* Status Dots */}
            {day.status && !day.isSelected && (
              <div
                className={`
                w-1.5 h-1.5 rounded-full mt-1
                ${day.status === "confirmed" ? "bg-green-500" : "bg-blue-500"}
              `}
              />
            )}
            {/* Selected day dot (white) */}
            {day.isSelected && (
              <div className="w-1.5 h-1.5 rounded-full mt-1 bg-white" />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-6 mt-8 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          <span className="text-xs text-gray-500 font-medium">Confirmed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
          <span className="text-xs text-gray-500 font-medium">In Progress</span>
        </div>
      </div>
    </div>
  );
};
