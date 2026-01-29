"use client";
import { ChevronDown, Search } from "lucide-react";
import React, { useState, useMemo } from "react";
import { OrderCard } from "./OrderCard";
import { useGetAllOrdersQuery } from "@/lib/redux/features/api/orders/ordersApiSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderCardSkeleton } from "@/components/skeletons/OrderCardSkeleton";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Fetch ALL orders from API (limit 1000 to get a large set)
  // We remove 'page' and 'status' params to get raw data for client-side processing
  const { data: ordersData, isLoading } = useGetAllOrdersQuery({
    limit: 1000,
    page: 1,
  });

  const allOrders = ordersData?.data?.data || [];

  // Client-side filtering and sorting
  const filteredAndSortedOrders = useMemo(() => {
    let result = [...allOrders];

    // 1. Filter by Status (Tab)
    // "All" tab logic could be added here if needed, currently strict tabs
    result = result.filter((order: any) => order.status === activeTab);

    // 2. Filter by Search Query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (order: any) =>
          order._id.toLowerCase().includes(query) ||
          order.deliveryDetails?.email?.toLowerCase().includes(query),
      );
    }

    // 3. Sort
    result.sort((a: any, b: any) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      if (sortOption === "newest") {
        return dateB - dateA;
      } else if (sortOption === "oldest") {
        return dateA - dateB;
      }
      return 0;
    });

    return result;
  }, [allOrders, activeTab, searchQuery, sortOption]);

  // Pagination Logic
  const totalItems = filteredAndSortedOrders.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = filteredAndSortedOrders.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery, sortOption]);

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
              placeholder="Search by Order ID or Email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-sidebar focus:outline-none focus:ring-1 focus:ring-sidebar"
            />
          </div>
        </div>

        {/* Tabs and Filters */}
        <div className="mb-6 flex flex-col justify-between gap-4 border-b border-gray-200 sm:flex-row sm:items-center">
          <div className="flex gap-8">
            {["pending", "confirmed", "completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                    relative py-3 text-xs font-bold tracking-widest transition-colors uppercase
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-end gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 mb-5 font-bold tracking-wider">
                Sort by: {sortOption} <ChevronDown size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setSortOption("newest")}
                className="cursor-pointer  text-xs font-bold tracking-wider"
              >
                Newest First
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortOption("oldest")}
                className="cursor-pointer  text-xs font-bold tracking-wider"
              >
                Oldest First
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <OrderCardSkeleton key={i} />
            ))}
          </div>
        ) : paginatedOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
            <p className="text-lg font-medium">No orders found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedOrders.map((order: any) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </>
  );
};

export default App;
