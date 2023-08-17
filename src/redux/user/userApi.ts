import { api } from "../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postUser: builder.mutation({
      query: ({ data }) => ({
        url: `/users/create-user`,
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: () => "/users",
    }),
    getSingleUser: builder.query({
      query: (email) => `/users/${email}`,
    }),
  }),
});

export const { usePostUserMutation, useGetUserQuery, useGetSingleUserQuery } =
  userApi;
