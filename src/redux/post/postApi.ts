import { api } from "../api/apiSlice";

const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: ({ data }) => ({
        url: `/posts/create-post`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["post"],
    }),
    getAllPost: builder.query({
      query: () => "/posts",
      providesTags: ["post", "like"],
    }),
    getPostByUsername: builder.query({
      query: (username) => `/posts/${username}`,
      // providesTags: ["post"],
    }),
    deletePostById: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deletepost"],
    }),
    toggleLike: builder.mutation({
      query: ({ postId, userId }) => ({
        url: `/posts/like/${postId}`,
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["like"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostQuery,
  useGetPostByUsernameQuery,
  useDeletePostByIdMutation,
  useToggleLikeMutation,
} = postApi;
