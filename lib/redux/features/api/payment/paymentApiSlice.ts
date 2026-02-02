import { apiSlice } from "../apiSlice";

export interface InitiatePaymentRequest {
  amount: number;
  currency?: string;
  description?: string;
  orderId?: string;
  lang?: string;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zip?: string;
  };
}

export interface InitiatePaymentResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: string; // The Redirect URL
}

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    initiatePayment: builder.mutation<
      InitiatePaymentResponse,
      InitiatePaymentRequest
    >({
      query: (data) => ({
        url: "/payments/initiate",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useInitiatePaymentMutation } = paymentApiSlice;
