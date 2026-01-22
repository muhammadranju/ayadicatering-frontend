import React from "react";
import { CalendarView } from "./Calendar";
import { EventCard } from "./EventCard";
import { Button } from "@/components/ui/button";
import { TimeSelector } from "./TimeSelector";

function CalenderPage() {
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
            <CalendarView />
          </div>

          {/* Event Card Section - Spans 4 cols */}
          <div className="lg:col-span-4 h-full">
            <EventCard />
          </div>
        </div>

        {/* Middle Block Button */}
        <div className="flex justify-center">
          <Button className="w-full md:w-1/3 py-6 rounded-lg text-lg bg-emerald-900  hover:bg-[#233d31] shadow-lg">
            Block
          </Button>
        </div>

        {/* Time Selector */}
        <div className="w-full">
          <TimeSelector />
        </div>

        {/* Bottom Block Button */}
        <div className="flex justify-center pb-8">
          <Button className="w-full md:w-1/3 py-6 rounded-lg text-lg bg-emerald-900  hover:bg-[#233d31] shadow-lg">
            Block
          </Button>
        </div>
      </div>
    </main>
  );
}

export default CalenderPage;
