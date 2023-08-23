import { api } from "../api/apiSlice";

const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: ({ commentData }) => ({
        url: `/comments/`,
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: ["comment"],
    }),
  }),
});

export const { useCreateCommentMutation } = commentApi;
