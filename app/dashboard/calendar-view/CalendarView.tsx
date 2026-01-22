"use client";
import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  Utensils,
  MapPin,
} from "lucide-react";

interface CalendarViewProps {
  onViewDetailsClick: () => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  onViewDetailsClick,
}) => {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Generating a grid for Dec 2024
  // Dec 1, 2024 is Sunday
  const calendarDays = [
    { day: 1 },
    { day: 2 },
    { day: 3 },
    { day: 4 },
    { day: 5 },
    { day: 6 },
    { day: 7 },
    { day: 8 },
    { day: 9 },
    { day: 10 },
    { day: 11 },
    { day: 12 },
    { day: 13 },
    { day: 14 },
    { day: 15 },
    { day: 16 },
    { day: 17 },
    { day: 18 },
    { day: 19 },
    { day: 20 },
    { day: 21 },
    { day: 22 },
    { day: 23 },
    { day: 24 },
    { day: 25, status: "confirmed" },
    { day: 26, isSelected: true, status: "inprogress" },
    { day: 27, status: "confirmed" },
    { day: 28, status: "inprogress" },
    { day: 29, status: "inprogress" },
    { day: 30, status: "confirmed" },
    { day: 31, status: "inprogress" },
  ];

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
  ];

  return (
    <div className="flex-1 px-6 py-8 lg:px-10">
      <div className="flex flex-col gap-6 xl:flex-row">
        {/* Left Side: Calendar and Legend */}
        <div className="flex-1">
          <div className="rounded-lg bg-white p-8 shadow-sm">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-medium text-gray-900">
                December 2024
              </h2>
              <div className="flex gap-2">
                <button className="rounded-full p-1 hover:bg-gray-100">
                  <ChevronLeft size={20} />
                </button>
                <button className="rounded-full p-1 hover:bg-gray-100">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Days Header */}
            <div className="mb-4 grid grid-cols-7 text-center">
              {days.map((d) => (
                <div
                  key={d}
                  className="text-xs font-bold uppercase text-gray-400"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 gap-y-4 text-center">
              {calendarDays.map((date, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center"
                >
                  <div
                    className={`
                       flex h-12 w-12 items-center justify-center rounded-lg text-sm font-medium transition-colors
                       ${date.isSelected ? "bg-[#D48D73] text-white shadow-md" : "text-gray-700 hover:bg-gray-50"}
                     `}
                  >
                    {date.day}
                  </div>
                  {/* Status Dots */}
                  <div className="mt-1 h-1.5 w-1.5">
                    {date.status === "confirmed" && (
                      <div className="h-full w-full rounded-full bg-[#1E8E3E]"></div>
                    )}
                    {date.status === "inprogress" && (
                      <div className="h-full w-full rounded-full bg-[#3B82F6]"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-8 flex gap-6 border-t border-gray-100 pt-6">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#1E8E3E]"></div>
                <span className="text-xs text-gray-600">Confirmed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#3B82F6]"></div>
                <span className="text-xs text-gray-600">In Progress</span>
              </div>
            </div>
          </div>

          {/* Top Block Button */}
          <div className="mt-6 flex justify-end">
            <button className="w-full rounded-lg bg-green-500 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-sm hover:bg-sidebarHover sm:w-64">
              Block
            </button>
          </div>

          {/* Delivery Time Section */}
          <div className="mt-8">
            <div className="mb-4 flex items-center gap-2">
              <Clock size={18} className="text-red-500" />
              <h3 className="text-sm font-medium text-gray-900">
                Delivery Time
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  className={`
                     rounded-md border py-3 text-xs font-medium transition-all
                     ${
                       time === "11:00 AM"
                         ? "border-[#224838] bg-[#E8F1EE] text-[#224838]"
                         : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                     }
                   `}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Block Button */}
          <div className="mt-8 flex justify-center">
            <button className="w-full rounded-lg bg-emerald-900 py-3 text-lg font-medium text-white shadow-sm hover:bg-sidebarHover sm:w-80">
              Block
            </button>
          </div>
        </div>

        {/* Right Side: Event Details */}
        <div className="w-full xl:w-96 ">
          <h3 className="mb-4 text-lg text-gray-900">Events on 2024-12-26</h3>

          <div className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm ">
            <h4 className="text-lg font-medium text-gray-900">
              Sarah Al-Otaibi
            </h4>
            <div className="mt-2 inline-block rounded-full bg-[#E0F2FE] px-3 py-0.5 text-[10px] font-semibold text-[#0EA5E9]">
              In Progress
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5 text-gray-400" />
                <span className="text-sm text-gray-600">7:00 PM</span>
              </div>
              <div className="flex items-start gap-3">
                <Users size={16} className="mt-0.5 text-gray-400" />
                <span className="text-sm text-gray-600">80 guests</span>
              </div>
              <div className="flex items-start gap-3">
                <Utensils size={16} className="mt-0.5 text-gray-400" />
                <span className="text-sm text-gray-600">The Modern Feast</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Al Faisaliah Hotel Ballroom
                </span>
              </div>
            </div>

            <button
              onClick={onViewDetailsClick}
              className="mt-6 w-full rounded-lg bg-sidebar py-3 text-sm font-medium text-white hover:bg-sidebarHover"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
