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
    deleteCommentById: builder.mutation({
      query: ({ id }) => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deletecomment"],
    }),
  }),
});

export const { useCreateCommentMutation, useDeleteCommentByIdMutation } =
  commentApi;
