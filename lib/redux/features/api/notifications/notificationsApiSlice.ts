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

export interface NotificationResponse {
  data: Notification[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export const notificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<
      NotificationResponse,
      { page?: number; limit?: number } | void
    >({
      query: (params) => {
        const page = params && "page" in params ? params.page : 1;
        const limit = params && "limit" in params ? params.limit : 10;
        return `/notifications?page=${page}&limit=${limit}`;
      },
      providesTags: ["Notification"],
      transformResponse: (response: unknown) => {
        // Default structure
        const result: NotificationResponse = {
          data: [],
          meta: { page: 1, limit: 10, total: 0 },
        };

        // Define possible response structures to avoid 'any'
        type RawResponse =
          | {
              data: {
                data: Notification[];
                meta?: NotificationResponse["meta"];
              };
            }
          | { data: Notification[] }
          | Notification[];

        const r = response as RawResponse;

        // Handle various response structures with proper type narrowing
        if (Array.isArray(r)) {
          // Structure: []
          result.data = r;
          result.meta.total = r.length;
        } else if (Array.isArray(r.data)) {
          // Structure: { data: [] }
          result.data = r.data;
          result.meta.total = r.data.length;
        } else {
          // Structure: { data: { data: [], meta: {} } }
          result.data = r.data.data;
          if (r.data.meta) {
            result.meta = r.data.meta;
          }
        }

        return result;
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
