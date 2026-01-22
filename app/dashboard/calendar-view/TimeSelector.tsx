import React from "react";
import { Clock } from "lucide-react";
import { TimeSlot } from "@/types/types";

const slots: TimeSlot[] = [
  { id: "1", time: "09:00 AM" },
  { id: "2", time: "10:00 AM" },
  { id: "3", time: "11:00 AM", isSelected: true },
  { id: "4", time: "12:00 PM" },
  { id: "5", time: "01:00 PM" },
  { id: "6", time: "02:00 PM" },
  { id: "7", time: "03:00 PM" },
  { id: "8", time: "04:00 PM" },
  { id: "9", time: "05:00 PM" },
  { id: "10", time: "06:00 PM" },
  { id: "11", time: "07:00 PM" },
  { id: "12", time: "08:00 PM" },
];

export const TimeSelector: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-6 text-orange-500">
        <Clock size={20} className="text-orange-500" />
        <h3 className="text-gray-900 font-medium">Delivery Time</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {slots.map((slot) => (
          <button
            key={slot.id}
            className={`
              py-3 px-2 rounded border text-sm font-medium transition-all duration-200
              ${
                slot.isSelected
                  ? "border-green-600 bg-[#E6F4EA] text-brand-green shadow-sm ring-1 ring-green-600"
                  : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
              }
            `}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
};
