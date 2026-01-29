"use client";
import React from "react";
import { TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  isDark?: boolean;
  accentColor?: string;
  icon?: React.ReactNode;
  actionNeeded?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  isDark,
  accentColor,
  icon,
  actionNeeded,
}) => {
  return (
    <div
      className={`
        relative flex flex-col justify-between overflow-hidden rounded-md p-6 shadow-sm transition-all hover:shadow-md
        ${isDark ? "bg-[#1A1A1A] text-white" : "bg-white text-gray-900"}
      `}
      style={{
        borderLeft:
          !isDark && accentColor ? `4px solid ${accentColor}` : undefined,
      }}
    >
      <div className="flex items-start justify-between">
        <div
          className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full ${isDark ? "bg-white/10" : "bg-gray-50"}`}
        >
          {icon || (
            <TrendingUp
              size={20}
              className={isDark ? "text-gray-300" : "text-gray-400"}
            />
          )}
        </div>
      </div>

      <div>
        <p
          className={`text-xs uppercase tracking-wider ${isDark ? "text-gray-400" : "text-gray-400"}`}
        >
          {title}
        </p>
        <h3 className="mt-1  text-3xl font-medium">{value}</h3>
      </div>

      {/* Decorative colored left bar for Dark card to match image style */}
      {isDark && (
        <div className="absolute left-0 top-0 h-full w-1.5 bg-[#D48D73]"></div>
      )}
    </div>
  );
};
