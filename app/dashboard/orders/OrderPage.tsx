// import React from "react";

// function OrderPage() {
//   return <div>OrderPage</div>;
// }

// export default OrderPage;

"use client";
import { Order } from "@/types/types";
import { ChevronDown, Search } from "lucide-react";
import React, { useState } from "react";
import { OrderCard } from "./OrderCard";

// Mock Data
const orders: Order[] = [
  {
    id: "ORD-2024-001",
    customerName: "Prince Ahmed Al-Saud",
    isVip: true,
    status: "CONFIRMED",
    date: "2024-12-25",
    time: "8:00 PM",
    menu: "The Royal Banquet",
    guests: 150,
    amount: "12,500 SAR",
  },
  {
    id: "ORD-2024-002",
    customerName: "Prince Ahmed Al-Saud",
    isVip: true,
    status: "CONFIRMED",
    date: "2024-12-25",
    time: "8:00 PM",
    menu: "The Royal Banquet",
    guests: 150,
    amount: "12,500 SAR",
  },
  {
    id: "ORD-2024-003",
    customerName: "Prince Ahmed Al-Saud",
    isVip: true,
    status: "CONFIRMED",
    date: "2024-12-25",
    time: "8:00 PM",
    menu: "The Royal Banquet",
    guests: 150,
    amount: "12,500 SAR",
  },
];

const App: React.FC = () => {
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("CONFIRMED");

  return (
    <>
      {/* Orders Page Content */}
      <main className="flex-1 px-6 py-8 lg:px-10">
        <h3 className="text-4xl font-semibold mb-6 border-b border-gray-200">
          Orders
        </h3>
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search here......."
              className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-sidebar focus:outline-none focus:ring-1 focus:ring-sidebar"
            />
          </div>
        </div>

        {/* Tabs and Filters */}
        <div className="mb-6 flex flex-col justify-between gap-4 border-b border-gray-200 sm:flex-row sm:items-center">
          <div className="flex gap-8">
            {["CONFIRMED", "IN PROGRESS", "COMPLETED"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                    relative py-3 text-xs font-bold tracking-widest transition-colors
                    ${
                      activeTab === tab
                        ? "text-sidebar"
                        : "text-gray-400 hover:text-gray-600"
                    }
                  `}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-sidebar"></span>
                )}
              </button>
            ))}
          </div>

          <button className="flex items-center justify-end gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 mb-5">
            Filter by <ChevronDown size={16} />
          </button>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order, index) => (
            <OrderCard key={`${order.id}-${index}`} order={order} />
          ))}
        </div>
      </main>
    </>
  );
};

export default App;
