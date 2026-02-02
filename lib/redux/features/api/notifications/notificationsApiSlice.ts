import { apiSlice } from "../apiSlice";

export interface NotificationData {
  orderId: string;
  name: string;
  time: string;
  deliveryTime?: string;
}

export interface Notification {
  _id: string;
  type: string; // "new_order"
  message: string;
  isRead: boolean;
  data: NotificationData;
  createdAt: string;
}

export const notificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<Notification[], void>({
      query: () => "/notifications",
      providesTags: ["Notification"],
      transformResponse: (response: any) => {
        if (Array.isArray(response)) return response;
        if (response?.data?.data && Array.isArray(response.data.data))
          return response.data.data;
        if (response?.data && Array.isArray(response.data))
          return response.data;
        return [];
      },
    }),
    markAllAsRead: builder.mutation<void, void>({
      query: () => ({
        url: "/notifications/mark-as-read",
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const { useGetNotificationsQuery, useMarkAllAsReadMutation } =
  notificationsApiSlice;
