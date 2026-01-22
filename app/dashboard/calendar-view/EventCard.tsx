import React from "react";
import { Clock, Users, Utensils, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EventCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg  text-gray-800">Events on 2024-12-26</h3>
      </div>

      <div className="p-6 flex-1 bg-gray-50/50">
        <div className="flex h-full">
          {/* Vertical colored line */}
          <div className="w-1 bg-brand-orange rounded-full h-[90%] self-center"></div>

          <div className="flex-1 space-y-4 border-l-4 border-orange-500 pl-4">
            <div>
              <h4 className="text-base font-semibold text-gray-900">
                Sarah Al-Otaibi
              </h4>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-600 text-[10px] font-medium tracking-wide ">
                In Progress
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-gray-600">
                <Clock size={16} className="text-gray-400" />
                <span className="text-sm">7:00 PM</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <Users size={16} className="text-gray-400" />
                <span className="text-sm">80 guests</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <Utensils size={16} className="text-gray-400" />
                <span className="text-sm">The Modern Feast</span>
              </div>

              <div className="flex items-start gap-3 text-gray-600">
                <MapPin size={16} className="text-gray-400 mt-0.5" />
                <span className="text-sm leading-snug">
                  Al Faisaliah Hotel Ballroom
                </span>
              </div>
            </div>

            <div className="pt-6">
              <Button className="w-full py-6 rounded-lg text-lg bg-emerald-900  hover:bg-[#233d31] shadow-lg transition-all">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
