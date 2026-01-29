"use client";

import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { useGetOrdersStatsQuery } from "@/lib/redux/features/api/orders/ordersApiSlice";
import { StatsSkeleton } from "@/components/skeletons/StatsSkeleton";
import { ChartSkeleton } from "@/components/skeletons/ChartSkeleton";
import {
  AlertCircle,
  CheckCircle2,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import React from "react";

interface Stats {
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
}

function OverviewPage() {
  const [stats, setStats] = React.useState<Stats | null>({
    totalOrders: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    totalRevenue: 0,
  });
  const { data: ordersStats, isLoading } = useGetOrdersStatsQuery(null);

  React.useEffect(() => {
    if (ordersStats) {
      setStats(ordersStats?.data);
    }
  }, [ordersStats]);

  // Loading state
  if (isLoading) {
    return (
      <main className="flex-1 p-6 lg:p-10">
        <h3 className="text-4xl font-semibold mb-6 border-b border-gray-200">
          Overview
        </h3>
        {/* Stats Grid Skeleton */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatsSkeleton />
          <StatsSkeleton />
          <StatsSkeleton />
          <StatsSkeleton />
        </div>

        {/* Chart Skeleton */}
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <ChartSkeleton />
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-6 lg:p-10">
      <h3 className="text-4xl font-semibold mb-6 border-b border-gray-200">
        Overview
      </h3>
      {/* Stats Grid */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Revenue (Dark) */}
        <StatCard
          title="Total Revenue"
          value={Number(stats?.totalRevenue || 0).toFixed(2)}
          trend="+15.2%"
          isDark={true}
          icon={<TrendingUp size={20} className="text-gray-300" />}
        />

        {/* Card 2: Total Orders */}
        <StatCard
          title="Total Orders"
          value={Number(stats?.totalOrders || 0).toFixed(0)}
          trend="+8.3%"
          accentColor="#D48D73" // Salmon accent from image
          icon={<ShoppingBag size={20} className="text-[#D48D73]" />}
        />

        {/* Card 3: Confirmed */}
        <StatCard
          title="Confirmed"
          value={Number(stats?.confirmedOrders || 0).toFixed(0)}
          trend="+12.5%"
          accentColor="#224838" // Green accent
          icon={<CheckCircle2 size={20} className="text-[#224838]" />}
        />

        {/* Card 4: Pending (Uses Primary Color requested) */}
        <StatCard
          title="Pending Orders"
          value={Number(stats?.pendingOrders || 0).toFixed(0)}
          actionNeeded={true}
          accentColor="#F59E0B" // Yellow accent
          icon={<AlertCircle size={20} className="text-[#F59E0B]" />}
        />
      </div>

      {/* Chart Section */}
      <RevenueChart />
    </main>
  );
}

export default OverviewPage;
