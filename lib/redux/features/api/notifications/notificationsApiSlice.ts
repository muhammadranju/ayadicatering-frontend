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
      transformResponse: (response: unknown) => {
        if (Array.isArray(response)) return response as Notification[];

        const r = response as { data?: unknown };
        if (!r?.data) return [];

        if (Array.isArray(r.data)) return r.data as Notification[];

        const rData = r.data as { data?: unknown };
        if (Array.isArray(rData?.data)) return rData.data as Notification[];

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
