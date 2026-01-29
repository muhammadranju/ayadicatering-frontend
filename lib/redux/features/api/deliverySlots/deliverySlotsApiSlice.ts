import { apiSlice } from "../apiSlice";
import {
  AvailableTimeSlotsResponse,
  BlockedDatesResponse,
  BlockFullDateRequest,
  BlockTimeSlotsRequest,
  BulkBlockDatesRequest,
  CreateDefaultTimeSlotsRequest,
  DeliverySlotsResponse,
  GetAllDeliverySlotsRequest,
  GetAvailableTimeSlotsRequest,
  GetBlockedDatesRequest,
  SingleDeliverySlotResponse,
  UnblockDateRequest,
  UnblockTimeSlotsRequest,
} from "@/interface/deliverySlots.interface";

export const deliverySlotsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Public endpoints (no auth required)
    getBlockedDates: builder.query<
      BlockedDatesResponse,
      GetBlockedDatesRequest
    >({
      query: ({ startDate, endDate }) => ({
        url: `/delivery-slots/blocked-dates`,
        params: { startDate, endDate },
      }),
      providesTags: ["DeliverySlot"],
    }),

    getAvailableTimeSlots: builder.query<
      AvailableTimeSlotsResponse,
      GetAvailableTimeSlotsRequest
    >({
      query: ({ date }) => ({
        url: `/delivery-slots/available-time-slots`,
        params: { date },
      }),
      providesTags: ["DeliverySlot"],
    }),

    // Admin endpoints (auth required)
    getAllDeliverySlots: builder.query<
      DeliverySlotsResponse,
      GetAllDeliverySlotsRequest
    >({
      query: ({ page = 1, limit = 50, startDate, endDate, isBlocked }) => ({
        url: `/delivery-slots/all`,
        params: {
          page,
          limit,
          startDate,
          endDate,
          isBlocked,
        },
      }),
      providesTags: ["DeliverySlot"],
    }),

    blockFullDate: builder.mutation<
      SingleDeliverySlotResponse,
      BlockFullDateRequest
    >({
      query: (data) => ({
        url: `/delivery-slots/block-date`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DeliverySlot"],
    }),

    blockTimeSlots: builder.mutation<
      SingleDeliverySlotResponse,
      BlockTimeSlotsRequest
    >({
      query: (data) => ({
        url: `/delivery-slots/block-time-slots`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DeliverySlot"],
    }),

    unblockDate: builder.mutation<
      SingleDeliverySlotResponse,
      UnblockDateRequest
    >({
      query: (data) => ({
        url: `/delivery-slots/unblock-date`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DeliverySlot"],
    }),

    unblockTimeSlots: builder.mutation<
      SingleDeliverySlotResponse,
      UnblockTimeSlotsRequest
    >({
      query: (data) => ({
        url: `/delivery-slots/unblock-time-slots`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DeliverySlot"],
    }),

    bulkBlockDates: builder.mutation<
      DeliverySlotsResponse,
      BulkBlockDatesRequest
    >({
      query: (data) => ({
        url: `/delivery-slots/bulk-block`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DeliverySlot"],
    }),

    createDefaultTimeSlots: builder.mutation<
      SingleDeliverySlotResponse,
      CreateDefaultTimeSlotsRequest
    >({
      query: (data) => ({
        url: `/delivery-slots/create-default`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DeliverySlot"],
    }),
  }),
});

export const {
  useGetBlockedDatesQuery,
  useGetAvailableTimeSlotsQuery,
  useGetAllDeliverySlotsQuery,
  useBlockFullDateMutation,
  useBlockTimeSlotsMutation,
  useUnblockDateMutation,
  useUnblockTimeSlotsMutation,
  useBulkBlockDatesMutation,
  useCreateDefaultTimeSlotsMutation,
} = deliverySlotsApiSlice;
