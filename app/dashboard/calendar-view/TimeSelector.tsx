"use client";

import React from "react";
import { Clock } from "lucide-react";
import { format } from "date-fns";
import { useGetAllDeliverySlotsQuery } from "@/lib/redux/features/api/deliverySlots/deliverySlotsApiSlice";

const DEFAULT_TIME_SLOTS = [
  { startTime: "09:00", endTime: "10:00" },
  { startTime: "10:00", endTime: "11:00" },
  { startTime: "11:00", endTime: "12:00" },
  { startTime: "12:00", endTime: "13:00" },
  { startTime: "13:00", endTime: "14:00" },
  { startTime: "14:00", endTime: "15:00" },
  { startTime: "15:00", endTime: "16:00" },
  { startTime: "16:00", endTime: "17:00" },
  { startTime: "17:00", endTime: "18:00" },
  { startTime: "18:00", endTime: "19:00" },
  { startTime: "19:00", endTime: "20:00" },
  { startTime: "20:00", endTime: "21:00" },
];

interface TimeSelectorProps {
  selectedDate: Date | null;
  selectedTimeSlots: string[];
  setSelectedTimeSlots: (slots: string[]) => void;
}

export const TimeSelector: React.FC<TimeSelectorProps> = ({
  selectedDate,
  selectedTimeSlots,
  setSelectedTimeSlots,
}) => {
  const { data: deliverySlots } = useGetAllDeliverySlotsQuery({
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(
      new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      "yyyy-MM-dd",
    ),
  });

  // Get time slots for selected date
  const getTimeSlotsForSelectedDate = () => {
    if (!selectedDate) return DEFAULT_TIME_SLOTS;
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    const slotsData = Array.isArray(deliverySlots?.data)
      ? deliverySlots.data
      : [];
    const slot = slotsData.find((s) => s.date === dateStr);
    return slot?.timeSlots || DEFAULT_TIME_SLOTS;
  };

  const timeSlots = getTimeSlotsForSelectedDate();

  const toggleTimeSlot = (slotStr: string) => {
    setSelectedTimeSlots(
      selectedTimeSlots.includes(slotStr)
        ? selectedTimeSlots.filter((s) => s !== slotStr)
        : [...selectedTimeSlots, slotStr],
    );
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-6 text-orange-500">
        <Clock size={20} className="text-orange-500" />
        <h3 className="text-gray-900 font-medium">Delivery Time Slots</h3>
      </div>

      {!selectedDate ? (
        <p className="text-gray-500 text-center py-8">
          Please select a date from the calendar to view time slots
        </p>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-4">
            Selected Date: {format(selectedDate, "EEEE, MMMM d, yyyy")}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {timeSlots.map((slot, idx) => {
              const slotStr = `${slot.startTime} - ${slot.endTime}`;
              const isBlocked = Boolean("isBlocked" in slot && slot.isBlocked);
              const isSelected = selectedTimeSlots.includes(slotStr);

              return (
                <button
                  key={idx}
                  onClick={() => !isBlocked && toggleTimeSlot(slotStr)}
                  disabled={isBlocked}
                  className={`
                    py-3 px-2 rounded border text-sm font-medium transition-all duration-200
                    ${
                      isBlocked
                        ? "border-red-300 bg-red-50 text-red-500 cursor-not-allowed line-through"
                        : isSelected
                          ? "border-orange-600 bg-orange-100 text-orange-700 shadow-sm ring-1 ring-orange-600"
                          : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                    }
                  `}
                >
                  {slotStr}
                  {isBlocked && " (Blocked)"}
                </button>
              );
            })}
          </div>
          {selectedTimeSlots.length > 0 && (
            <p className="text-sm text-gray-600 mt-4">
              {selectedTimeSlots.length} slot(s) selected for blocking
            </p>
          )}
        </>
      )}
    </div>
  );
};
