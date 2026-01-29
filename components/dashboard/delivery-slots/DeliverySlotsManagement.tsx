"use client";

import React, { useState } from "react";
import { format, addDays, startOfMonth, endOfMonth } from "date-fns";
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Loader2,
  Ban,
  Unlock,
  CalendarX,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  useGetAllDeliverySlotsQuery,
  useBlockFullDateMutation,
  useBlockTimeSlotsMutation,
  useUnblockDateMutation,
  useBulkBlockDatesMutation,
} from "@/lib/redux/features/api/deliverySlots/deliverySlotsApiSlice";

// Default time slots (9 AM to 9 PM, hourly)
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

const DeliverySlotsManagement = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [blockReason, setBlockReason] = useState("");
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [bulkDates, setBulkDates] = useState<Date[]>([]);

  // Calculate date range for fetching data (current month + next month)
  const startDate = format(startOfMonth(new Date()), "yyyy-MM-dd");
  const endDate = format(endOfMonth(addDays(new Date(), 60)), "yyyy-MM-dd");

  // Fetch delivery slots
  const {
    data: deliverySlots,
    isLoading,
    refetch,
  } = useGetAllDeliverySlotsQuery({
    startDate,
    endDate,
  });

  // Mutations
  const [blockFullDate, { isLoading: isBlockingFullDate }] =
    useBlockFullDateMutation();
  const [blockTimeSlots, { isLoading: isBlockingTimeSlots }] =
    useBlockTimeSlotsMutation();
  const [unblockDate, { isLoading: isUnblocking }] = useUnblockDateMutation();
  const [bulkBlockDates, { isLoading: isBulkBlocking }] =
    useBulkBlockDatesMutation();

  // Get blocked status for a specific date
  const getDateBlockStatus = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const slots = deliverySlots?.data?.data || [];
    const slot = slots.find((s: any) => s.date === dateStr);
    if (slot?.isFullDayBlocked) return "full";
    if (slot?.timeSlots?.some((ts) => ts.isBlocked)) return "partial";
    return "available";
  };

  // Get time slots for selected date
  const getTimeSlotsForSelectedDate = () => {
    if (!selectedDate) return [];
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    const slots = deliverySlots?.data?.data || [];
    const slot = slots.find((s: any) => s.date === dateStr);
    return slot?.timeSlots || DEFAULT_TIME_SLOTS;
  };

  // Handle block full date
  const handleBlockFullDate = async () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    try {
      await blockFullDate({
        date: format(selectedDate, "yyyy-MM-dd"),
        reason: blockReason || undefined,
      }).unwrap();

      toast.success("Date blocked successfully");
      setBlockReason("");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to block date");
    }
  };

  // Handle block time slots
  const handleBlockTimeSlots = async () => {
    if (!selectedDate) {
      toast.error("Please select a date");
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
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to block time slots");
    }
  };

  // Handle unblock date
  const handleUnblockDate = async () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    try {
      await unblockDate({
        date: format(selectedDate, "yyyy-MM-dd"),
      }).unwrap();

      toast.success("Date unblocked successfully");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to unblock date");
    }
  };

  // Handle bulk block
  const handleBulkBlock = async () => {
    if (bulkDates.length === 0) {
      toast.error("Please select dates to block");
      return;
    }

    try {
      await bulkBlockDates({
        dates: bulkDates.map((d) => format(d, "yyyy-MM-dd")),
        reason: blockReason || undefined,
      }).unwrap();

      toast.success(`${bulkDates.length} dates blocked successfully`);
      setBulkDates([]);
      setBlockReason("");
      setIsBulkMode(false);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to bulk block dates");
    }
  };

  // Toggle time slot selection
  const toggleTimeSlot = (slot: string) => {
    setSelectedTimeSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot],
    );
  };

  // Generate calendar dates (next 60 days)
  const calendarDates = Array.from({ length: 60 }, (_, i) =>
    addDays(new Date(), i),
  );

  const timeSlots = getTimeSlotsForSelectedDate();
  const selectedDateStatus = selectedDate
    ? getDateBlockStatus(selectedDate)
    : null;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Delivery Slots Management
        </h1>
        <p className="text-gray-600">
          Block or unblock delivery dates and time slots
        </p>
      </div>

      {/* Bulk Mode Toggle */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => setIsBulkMode(!isBulkMode)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isBulkMode
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {isBulkMode ? "Exit Bulk Mode" : "Bulk Block Mode"}
        </button>
        {isBulkMode && (
          <span className="text-sm text-gray-600">
            {bulkDates.length} dates selected
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-green-500" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">
              {isBulkMode ? "Select Multiple Dates" : "Select Date"}
            </h2>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mb-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
              <span className="text-gray-600">Available</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
              <span className="text-gray-600">Fully Blocked</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-orange-100 border border-orange-300 rounded"></div>
              <span className="text-gray-600">Partially Blocked</span>
            </div>
          </div>

          {/* Calendar Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-gray-400" size={32} />
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-2 max-h-96 overflow-y-auto">
              {calendarDates.map((date, idx) => {
                const status = getDateBlockStatus(date);
                const isSelected = selectedDate
                  ? format(date, "yyyy-MM-dd") ===
                    format(selectedDate, "yyyy-MM-dd")
                  : false;
                const isBulkSelected = bulkDates.some(
                  (d) => format(d, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"),
                );

                let bgColor = "bg-green-50 border-green-200";
                if (status === "full") bgColor = "bg-red-50 border-red-200";
                else if (status === "partial")
                  bgColor = "bg-orange-50 border-orange-200";

                if (isSelected || isBulkSelected) {
                  bgColor = "bg-blue-500 text-white border-blue-600";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (isBulkMode) {
                        setBulkDates((prev) => {
                          const exists = prev.some(
                            (d) =>
                              format(d, "yyyy-MM-dd") ===
                              format(date, "yyyy-MM-dd"),
                          );
                          return exists
                            ? prev.filter(
                                (d) =>
                                  format(d, "yyyy-MM-dd") !==
                                  format(date, "yyyy-MM-dd"),
                              )
                            : [...prev, date];
                        });
                      } else {
                        setSelectedDate(date);
                        setSelectedTimeSlots([]);
                      }
                    }}
                    className={`p-2 rounded-lg border transition-all text-sm font-medium ${bgColor} hover:opacity-80`}
                  >
                    <div className="text-xs opacity-70">
                      {format(date, "MMM")}
                    </div>
                    <div className="font-bold">{format(date, "d")}</div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Actions Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="text-blue-500" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">
              {isBulkMode ? "Bulk Actions" : "Manage Selected Date"}
            </h2>
          </div>

          {isBulkMode ? (
            // Bulk Mode
            <div className="space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-sm text-orange-800">
                  <strong>{bulkDates.length} dates</strong> selected for bulk
                  blocking
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Block Reason (Optional)
                </label>
                <input
                  type="text"
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  placeholder="e.g., Holiday, Staff unavailable"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <button
                onClick={handleBulkBlock}
                disabled={isBulkBlocking || bulkDates.length === 0}
                className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
              >
                {isBulkBlocking ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Blocking...
                  </>
                ) : (
                  <>
                    <CalendarX size={20} />
                    Block {bulkDates.length} Date(s)
                  </>
                )}
              </button>
            </div>
          ) : selectedDate ? (
            // Single Date Mode
            <div className="space-y-4">
              {/* Selected Date Info */}
              <div
                className={`rounded-lg p-4 ${
                  selectedDateStatus === "full"
                    ? "bg-red-50 border border-red-200"
                    : selectedDateStatus === "partial"
                      ? "bg-orange-50 border border-orange-200"
                      : "bg-green-50 border border-green-200"
                }`}
              >
                <p className="text-sm font-semibold mb-1">
                  {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </p>
                <p className="text-xs text-gray-600">
                  Status:{" "}
                  <span className="font-medium">
                    {selectedDateStatus === "full"
                      ? "Fully Blocked"
                      : selectedDateStatus === "partial"
                        ? "Partially Blocked"
                        : "Available"}
                  </span>
                </p>
              </div>

              {/* Block Reason */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Block Reason (Optional)
                </label>
                <input
                  type="text"
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  placeholder="e.g., Holiday, Staff unavailable"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Time Slots Selection */}
              {selectedDateStatus !== "full" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Time Slots to Block
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {timeSlots.map((slot, idx) => {
                      const slotStr = `${slot.startTime} - ${slot.endTime}`;
                      const isBlocked = Boolean(
                        "isBlocked" in slot && slot.isBlocked,
                      );
                      const isSelected = selectedTimeSlots.includes(slotStr);

                      return (
                        <button
                          key={idx}
                          onClick={() => !isBlocked && toggleTimeSlot(slotStr)}
                          disabled={isBlocked}
                          className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                            isBlocked
                              ? "bg-red-100 border-red-300 text-red-700 cursor-not-allowed"
                              : isSelected
                                ? "bg-blue-500 text-white border-blue-600"
                                : "bg-white border-gray-300 hover:border-blue-500"
                          }`}
                        >
                          {slotStr}
                          {isBlocked && " (Blocked)"}
                        </button>
                      );
                    })}
                  </div>
                  {selectedTimeSlots.length > 0 && (
                    <p className="text-xs text-gray-600 mt-2">
                      {selectedTimeSlots.length} slot(s) selected
                    </p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t">
                {selectedDateStatus === "full" ? (
                  <button
                    onClick={handleUnblockDate}
                    disabled={isUnblocking}
                    className="w-full bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                  >
                    {isUnblocking ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Unblocking...
                      </>
                    ) : (
                      <>
                        <Unlock size={20} />
                        Unblock Date
                      </>
                    )}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleBlockTimeSlots}
                      disabled={
                        isBlockingTimeSlots || selectedTimeSlots.length === 0
                      }
                      className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                    >
                      {isBlockingTimeSlots ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Blocking...
                        </>
                      ) : (
                        <>
                          <Ban size={20} />
                          Block Selected Time Slots
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleBlockFullDate}
                      disabled={isBlockingFullDate}
                      className="w-full bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                    >
                      {isBlockingFullDate ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Blocking...
                        </>
                      ) : (
                        <>
                          <CalendarX size={20} />
                          Block Full Date
                        </>
                      )}
                    </button>

                    {selectedDateStatus === "partial" && (
                      <button
                        onClick={handleUnblockDate}
                        disabled={isUnblocking}
                        className="w-full bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                      >
                        {isUnblocking ? (
                          <>
                            <Loader2 className="animate-spin" size={20} />
                            Unblocking...
                          </>
                        ) : (
                          <>
                            <Unlock size={20} />
                            Unblock All Time Slots
                          </>
                        )}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            // No Date Selected
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <AlertCircle size={48} className="mb-4" />
              <p className="text-sm">Select a date to manage delivery slots</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
        <div className="text-sm text-blue-800">
          <p className="font-semibold mb-1">How it works:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>
              <strong>Block Full Date:</strong> Users cannot select this date
              for delivery
            </li>
            <li>
              <strong>Block Time Slots:</strong> Specific time slots will be
              hidden from users
            </li>
            <li>
              <strong>Bulk Mode:</strong> Block multiple dates at once (e.g.,
              all weekends)
            </li>
            <li>
              <strong>Unblock:</strong> Make previously blocked dates/times
              available again
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeliverySlotsManagement;
