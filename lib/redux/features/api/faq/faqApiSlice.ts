import { apiSlice } from "../apiSlice";

export const faqApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFaqList: builder.query({
      query: () => ({
        url: `/faq?sortOrder=asc`,
      }),
      providesTags: ["faq"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
    createFaq: builder.mutation({
      query: (body) => ({
        url: `/faq`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["faq"],
      transformResponse: (response) => response,
    }),
    updateFaq: builder.mutation({
      query: ({ id, data }) => ({
        url: `/faq/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["faq"],
      transformResponse: (response) => response,
    }),
    deleteFaq: builder.mutation({
      query: (id: string) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faq"],
      transformResponse: (response) => response,
    }),
  }),
});

export const {
  useGetFaqListQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApiSlice;
