import { api } from "../api/apiSlice";

const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: ({ id, commentData }) => ({
        url: `/comments/${id?.id}`,
        method: "POST",
        body: commentData,
      }),
      //   invalidatesTags: ["like"],
    }),
  }),
});

export const { useCreateCommentMutation } = commentApi;
