"use client";

import React, { useState } from "react";
import { CalendarView } from "./CalendarView";
import { EventCard } from "./EventCard";
import { Button } from "@/components/ui/button";
import { TimeSelector } from "./TimeSelector";
import { format, addDays } from "date-fns";
import toast from "react-hot-toast";
import {
  useBlockFullDateMutation,
  useBlockTimeSlotsMutation,
} from "@/lib/redux/features/api/deliverySlots/deliverySlotsApiSlice";
import { Loader2 } from "lucide-react";

function CalenderPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [blockReason, setBlockReason] = useState("");

  // Mutations
  const [blockFullDate, { isLoading: isBlockingFullDate }] =
    useBlockFullDateMutation();
  const [blockTimeSlots, { isLoading: isBlockingTimeSlots }] =
    useBlockTimeSlotsMutation();

  // Handle block full date
  const handleBlockFullDate = async () => {
    if (!selectedDate) {
      toast.error("Please select a date from the calendar");
      return;
    }

    try {
      await blockFullDate({
        date: format(selectedDate, "yyyy-MM-dd"),
        reason: blockReason || undefined,
      }).unwrap();

      toast.success("Date blocked successfully");
      setBlockReason("");
      setSelectedDate(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to block date");
    }
  };

  // Handle block time slots
  const handleBlockTimeSlots = async () => {
    if (!selectedDate) {
      toast.error("Please select a date from the calendar");
      return;
    }

    if (selectedTimeSlots.length === 0) {
      toast.error("Please select time slots to block");
      return;
    }

    const timeSlotsToBlock = selectedTimeSlots.map((slot) => {
      const [start, end] = slot.split(" - ");
      return {
        startTime: start,
        endTime: end,
        reason: blockReason || undefined,
      };
    });

    try {
      await blockTimeSlots({
        date: format(selectedDate, "yyyy-MM-dd"),
        timeSlots: timeSlotsToBlock,
      }).unwrap();

      toast.success(`${selectedTimeSlots.length} time slots blocked`);
      setSelectedTimeSlots([]);
      setBlockReason("");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to block time slots");
    }
  };

  return (
    <main className="flex-1 p-6 md:p-8 overflow-y-auto">
      <h3 className="text-4xl font-semibold mb-6 border-b border-gray-200">
        Calendar View
      </h3>
      <div className="mx-auto space-y-8">
        {/* Top Grid: Calendar & Event Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Calendar Section - Spans 8 cols */}
          <div className="lg:col-span-8 h-full">
            <CalendarView
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>

          {/* Event Card Section - Spans 4 cols */}
          <div className="lg:col-span-4 h-full">
            <EventCard selectedDate={selectedDate} />
          </div>
        </div>

        {/* Block Reason Input */}
        {selectedDate && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Block Reason (Optional)
            </label>
            <input
              type="text"
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
              placeholder="e.g., Holiday, Staff unavailable"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              {selectedDate
                ? `Selected: ${format(selectedDate, "EEEE, MMMM d, yyyy")}`
                : "No date selected"}
            </p>
          </div>
        )}

        {/* Middle Block Button - Block Full Date */}
        <div className="flex justify-center">
          <Button
            onClick={handleBlockFullDate}
            disabled={isBlockingFullDate || !selectedDate}
            className="w-full md:w-1/3 py-6 rounded-lg text-lg bg-red-600 hover:bg-red-700 shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isBlockingFullDate ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Blocking Date...
              </>
            ) : (
              "Block Full Date"
            )}
          </Button>
        </div>

        {/* Time Selector */}
        <div className="w-full">
          <TimeSelector
            selectedDate={selectedDate}
            selectedTimeSlots={selectedTimeSlots}
            setSelectedTimeSlots={setSelectedTimeSlots}
          />
        </div>

        {/* Bottom Block Button - Block Time Slots */}
        <div className="flex justify-center pb-8">
          <Button
            onClick={handleBlockTimeSlots}
            disabled={
              isBlockingTimeSlots ||
              !selectedDate ||
              selectedTimeSlots.length === 0
            }
            className="w-full md:w-1/3 py-6 rounded-lg text-lg bg-orange-600 hover:bg-orange-700 shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isBlockingTimeSlots ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Blocking Time Slots...
              </>
            ) : (
              `Block ${selectedTimeSlots.length > 0 ? selectedTimeSlots.length : ""} Time Slot${selectedTimeSlots.length !== 1 ? "s" : ""}`
            )}
          </Button>
        </div>
      </div>
    </main>
  );
}

export default CalenderPage;
