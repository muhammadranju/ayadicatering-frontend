"use client";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";

const data = [
  { name: "JAN", value: 3100 },
  { name: "FEB", value: 3800 },
  { name: "MAR", value: 2900 },
  { name: "APR", value: 4200 },
  { name: "MAY", value: 4800 },
  { name: "JUN", value: 3600 },
  { name: "JUL", value: 4500 },
  { name: "AUG", value: 5100 },
  { name: "SEP", value: 4200 },
  { name: "OCT", value: 3800 },
  { name: "NOV", value: 4700 },
  { name: "DEC", value: 5200 },
];

export const RevenueChart: React.FC = () => {
  return (
    <div className="rounded-lg bg-white p-8 shadow-sm">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className=" text-xl font-medium text-gray-900">
            Monthly Revenue
          </h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Booking Trends Over The Year
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90">
          YEARLY <ChevronDown size={14} />
        </button>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d08f69" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#d08f69" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              horizontal={true}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#d08f69"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
