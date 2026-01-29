import { apiSlice } from "../apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query<
      any,
      {
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: string;
        status?: string;
      }
    >({
      query: ({
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "desc",
        status,
      } = {}) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          sortBy,
          sortOrder,
        });
        if (status) params.append("status", status);

        return {
          url: `/orders?${params.toString()}`,
        };
      },
      providesTags: ["Orders"],
      transformResponse: (response) => response,
    }),

    getOrderById: builder.query({
      query: (id: string) => ({
        url: `/orders/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Orders", id }],
      transformResponse: (response) => response,
    }),

    getOrdersStats: builder.query({
      query: () => ({
        url: `/orders/stats`,
      }),
      providesTags: (result, error, id) => [{ type: "Orders", id }],
      transformResponse: (response) => response,
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Orders", id },
        "Orders",
      ],
      transformResponse: (response) => response,
    }),

    createOrder: builder.mutation({
      query: (orderData) => ({
        url: `/orders`,
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders"],
      transformResponse: (response) => response,
    }),

    getOrdersByDate: builder.query({
      query: (date) => ({
        url: `/orders/count-by-date?date=${date}`,
      }),
      providesTags: ["Orders"],
      transformResponse: (response) => response,
    }),

    getRevenueAnalytics: builder.query({
      query: (year) => ({
        url: `/orders/revenue-analytics?year=${year}`,
      }),
      providesTags: ["Orders"],
      transformResponse: (response) => response,
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useCreateOrderMutation,
  useGetOrdersByDateQuery,
  useGetOrdersStatsQuery,
  useGetRevenueAnalyticsQuery,
} = ordersApiSlice;
