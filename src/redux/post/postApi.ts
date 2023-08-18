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
      providesTags: ["post"],
    }),
    getPostByUsername: builder.query({
      query: (username) => `/posts/${username}`,
      // providesTags: ["post"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostQuery,
  useGetPostByUsernameQuery,
} = postApi;
