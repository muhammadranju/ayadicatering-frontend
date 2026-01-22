import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { StatCard } from "@/components/dashboard/StatCard";
import {
  AlertCircle,
  CheckCircle2,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overview - TechAdvantage",
};

const page = () => {
  return (
    <>
      {/* Dashboard Content */}
      <main className="flex-1 p-6 lg:p-10">
        <h3 className="text-4xl font-semibold mb-6 border-b border-gray-200">
          Overview
        </h3>
        {/* Stats Grid */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Total Revenue (Dark) */}
          <StatCard
            title="Total Revenue"
            value="48 SAR"
            trend="+15.2%"
            isDark={true}
            icon={<TrendingUp size={20} className="text-gray-300" />}
          />

          {/* Card 2: Total Orders */}
          <StatCard
            title="Total Orders"
            value="5"
            trend="+8.3%"
            accentColor="#D48D73" // Salmon accent from image
            icon={<ShoppingBag size={20} className="text-[#D48D73]" />}
          />

          {/* Card 3: Confirmed */}
          <StatCard
            title="Confirmed"
            value="2"
            trend="+12.5%"
            accentColor="#224838" // Green accent
            icon={<CheckCircle2 size={20} className="text-[#224838]" />}
          />

          {/* Card 4: Pending (Uses Primary Color requested) */}
          <StatCard
            title="Pending Orders"
            value="1"
            actionNeeded={true}
            accentColor="#F59E0B" // Yellow accent
            icon={<AlertCircle size={20} className="text-[#F59E0B]" />}
          />
        </div>

        {/* Chart Section */}
        <RevenueChart />
      </main>
    </>
  );
};

export default page;
