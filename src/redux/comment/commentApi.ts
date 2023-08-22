import { api } from "../api/apiSlice";

const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: ({ postId, commentData }) => ({
        url: `/comments/${postId}`,
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: ["comment"],
    }),
  }),
});

export const { useCreateCommentMutation } = commentApi;
