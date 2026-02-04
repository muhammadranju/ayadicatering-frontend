import { TIME_SLOTS } from "@/components/pages/home/buildYourMenu/data";
import {
  useGetAvailableTimeSlotsQuery,
  useGetBlockedDatesQuery,
} from "@/lib/redux/features/api/deliverySlots/deliverySlotsApiSlice";
import { getLastTimeSlotForDate } from "@/lib/utils/orderStorage";
import {
  addDays,
  addHours,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isSameDay,
  isSameMonth,
  parse,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { AlertCircle, Clock } from "lucide-react";
import React, { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface StepDateTimeProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
}

const StepDateTime: React.FC<StepDateTimeProps> = ({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}) => {
  const { t } = useTranslation();

  // Fetch blocked dates for the next 60 days
  const startDate = format(new Date(), "yyyy-MM-dd");
  const endDate = format(addDays(new Date(), 60), "yyyy-MM-dd");

  const { data: blockedDatesData, isLoading: isLoadingBlockedDates } =
    useGetBlockedDatesQuery({
      startDate,
      endDate,
    });

  // Fetch available time slots for selected date
  const { data: availableTimeSlotsData, isLoading: isLoadingTimeSlots } =
    useGetAvailableTimeSlotsQuery(
      {
        date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
      },
      {
        skip: !selectedDate, // Only fetch when date is selected
      },
    );

  const blockedDates = useMemo(
    () => blockedDatesData?.data?.blockedDates || [],
    [blockedDatesData],
  );

  const blockedTimeSlots = useMemo(
    () => availableTimeSlotsData?.data?.blocked || [],
    [availableTimeSlotsData],
  );

  // Check if a date is blocked
  const isDateBlocked = useCallback(
    (date: Date) => {
      const dateStr = format(date, "yyyy-MM-dd");
      return blockedDates.includes(dateStr);
    },
    [blockedDates],
  );

  // Check if date is in the past
  const isDateInPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  // Reset selected time when date changes
  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDate, setSelectedTime]);

  const renderCalendar = () => {
    // Only show current month - no navigation allowed
    const today = new Date();
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    return (
      <div className="p-4 bg-white rounded-lg select-none">
        <div className="flex items-center justify-center mb-8 px-2">
          {/* No month navigation - only current month allowed */}
          <span className=" text-xl text-charcoal font-medium">
            {format(new Date(), "MMMM yyyy")}
          </span>
        </div>
        <div className="grid grid-cols-7 text-center gap-y-6 text-sm text-gray-400 mb-4 font-medium">
          {weekDays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-2">
          {dateRange.map((day, idx) => {
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const today = new Date();
            const isCurrentMonth = isSameMonth(day, today);
            const isBlocked = isDateBlocked(day);
            const isPast = isDateInPast(day);
            const isDisabled = !isCurrentMonth || isBlocked || isPast;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => !isDisabled && handleDateSelect(day)}
                disabled={isDisabled}
                aria-label={format(day, "PPP")}
                aria-pressed={!!isSelected}
                className={`
                  text-center text-sm rounded-full transition-all w-10 h-10 flex items-center justify-center mx-auto
                  ${
                    isDisabled
                      ? "text-gray-300 cursor-not-allowed opacity-50"
                      : "text-charcoal cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                  }
                  ${isBlocked && isCurrentMonth ? "bg-red-50 line-through" : ""}
                  ${
                    isSelected
                      ? "!bg-green-500 font-semibold !text-white shadow-md transform scale-105"
                      : ""
                  }
                `}
              >
                {format(day, "d")}
              </button>
            );
          })}
        </div>

        {/* Loading indicator */}
        {isLoadingBlockedDates && (
          <div className="text-center mt-4 text-xs text-gray-500">
            Loading availability...
          </div>
        )}
      </div>
    );
  };

  const isTimeSlotRestricted = (timeSlot: string) => {
    // 1. Check if blocked by admin
    if (blockedTimeSlots.includes(timeSlot)) {
      return { restricted: true, reason: "Blocked by admin" };
    }

    // 2. Check if available in backend response (if data exists)
    if (
      availableTimeSlotsData?.data?.available &&
      availableTimeSlotsData.data.available.length > 0 &&
      !availableTimeSlotsData.data.available.includes(timeSlot)
    ) {
      // If the slot is not in the available list, it might be booked or restricted by backend
      // We still check the frontend time gap to give a specific "Too soon" message if applicable
    }

    if (!selectedDate) return { restricted: false };

    try {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      const lastTimeSlot = getLastTimeSlotForDate(dateStr);

      if (lastTimeSlot) {
        const lastSlotDate = parse(lastTimeSlot, "hh:mm a", selectedDate);
        const blockedSlotDate = addHours(lastSlotDate, 1);
        const currentSlotDate = parse(timeSlot, "hh:mm a", selectedDate);

        if (
          !isNaN(blockedSlotDate.getTime()) &&
          !isNaN(currentSlotDate.getTime()) &&
          blockedSlotDate.getTime() === currentSlotDate.getTime()
        ) {
          return {
            restricted: true,
            reason: "One-hour gap after previous order",
          };
        }
      }

      const now = new Date();
      const slotDate = parse(timeSlot, "hh:mm a", selectedDate);

      if (!slotDate || isNaN(slotDate.getTime())) return { restricted: false };

      const minAllowedTime = addHours(now, 5);

      if (isAfter(minAllowedTime, slotDate)) {
        return {
          restricted: true,
          reason: "Must be at least 5 hours from now",
        };
      }
    } catch (error) {
      console.error("Error parsing time slot:", error);
    }

    return { restricted: false };
  };

  // Convert available time slots from backend format to display format
  const displayTimeSlots = useMemo(() => {
    // Define allowed hours (9 AM to 8 PM)
    const filterAllowedHours = (slots: string[]) => {
      return slots.filter((slot) => {
        try {
          // Parse just the time part relative to a reference date
          const parsed = parse(slot, "hh:mm a", new Date());
          const hour = parsed.getHours();
          // 9 AM is 9, 8 PM is 20. Allow inclusive range [9, 20]
          return hour >= 9 && hour <= 20;
        } catch {
          return false;
        }
      });
    };

    if (!selectedDate || isLoadingTimeSlots) {
      return filterAllowedHours(TIME_SLOTS); // Show default slots while loading
    }

    // If selected date is blocked
    if (isDateBlocked(selectedDate)) {
      return [];
    }

    // Always show all configured time slots (9 AM - 8 PM), even if backend filters them out.
    // We will handle restrictions in isTimeSlotRestricted.
    return filterAllowedHours(TIME_SLOTS);
  }, [selectedDate, isLoadingTimeSlots, isDateBlocked]);

  return (
    <div className="mx-auto px-6 md:px-12 py-10">
      <h1 className=" text-3xl md:text-5xl text-center mb-4 text-charcoal">
        {t("menu.steps.dateTimeTitle")}
      </h1>
      <p className="text-gray-500 text-center mb-10 font-light">
        {t("menu.steps.dateTimeSubtitle")}
      </p>

      <div className="bg-[#FFF4F2] border border-[#FCD7D7] rounded-md p-4 flex items-center gap-3 text-[#B34545] mb-10">
        <Clock size={20} />
        <span className="text-sm font-medium">
          {t("menu.steps.dateTimeNotice")}
        </span>
      </div>

      <div className="bg-white border border-gray-100 shadow-lg shadow-gray-100/50 rounded-xl p-6 md:p-10 mb-10">
        {renderCalendar()}
      </div>

      <div className="mb-10">
        <h3 className="flex items-center gap-2 font-medium text-lg mb-6 text-charcoal">
          <Clock size={20} className="text-green-500" />{" "}
          {t("menu.steps.deliveryTime")}
        </h3>

        {/* Loading state for time slots */}
        {isLoadingTimeSlots && selectedDate && (
          <div className="text-center py-8 text-gray-500">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mb-2"></div>
            <p className="text-sm">Loading available time slots...</p>
          </div>
        )}

        {/* No slots available message */}
        {!isLoadingTimeSlots &&
          selectedDate &&
          displayTimeSlots.length === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 flex items-start gap-3">
              <AlertCircle
                className="text-yellow-600 flex-shrink-0 mt-0.5"
                size={20}
              />
              <div>
                <p className="text-sm font-semibold text-yellow-800 mb-1">
                  No Available Time Slots
                </p>
                <p className="text-xs text-yellow-700">
                  Sorry, there are no delivery time slots available for{" "}
                  {format(selectedDate, "MMMM d, yyyy")}. Please select a
                  different date.
                </p>
              </div>
            </div>
          )}

        {/* Time slots grid */}
        {!isLoadingTimeSlots && displayTimeSlots.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayTimeSlots.map((slot) => {
              const { restricted, reason } = isTimeSlotRestricted(slot);

              return (
                <button
                  key={slot}
                  disabled={restricted}
                  onClick={() => setSelectedTime(slot)}
                  title={restricted ? reason : undefined}
                  className={`py-4 px-4 rounded-lg text-sm border transition-all duration-200 
                    ${
                      restricted
                        ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed decoration-slice"
                        : selectedTime === slot
                          ? "bg-[#E6FAF2] border-green-500 text-green-500 font-semibold shadow-sm"
                          : "bg-white border-gray-200 text-gray-600 hover:border-green-500/50 hover:bg-gray-50"
                    }`}
                >
                  <div className="flex flex-col items-center">
                    <span>{slot}</span>
                    {restricted && (
                      <span className="text-[10px] mt-1 text-red-400 font-normal">
                        {reason === "Blocked by admin"
                          ? "Unavailable"
                          : "Too soon"}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Show message when no date is selected */}
        {!selectedDate && (
          <div className="text-center py-8 text-gray-400">
            <Clock size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">
              Please select a date to view available time slots
            </p>
          </div>
        )}
      </div>

      {selectedDate && selectedTime && (
        <div className="bg-[#EAF6F2] border border-[#A4D8C4] rounded-lg p-6 flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="w-1 bg-green-500 h-12 rounded-full hidden md:block"></div>
          <div>
            <h4 className="font-medium mb-1 text-charcoal">
              {t("menu.steps.selectedSlot")}
            </h4>
            <div className="flex flex-col md:flex-row gap-1 md:gap-6 text-gray-700 text-sm">
              <p>
                <span className="font-semibold text-green-500">
                  {t("menu.steps.date")}
                </span>{" "}
                {format(selectedDate, "EEEE, MMMM d, yyyy")}
              </p>
              <p>
                <span className="font-semibold text-green-500">
                  {t("menu.steps.time")}
                </span>{" "}
                {selectedTime}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepDateTime;
