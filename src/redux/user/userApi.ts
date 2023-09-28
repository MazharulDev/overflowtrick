"use client";
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
      providesTags: ["updateProfile"],
    }),
    getSingleUser: builder.query({
      query: (email) => `/users/${email}`,
      providesTags: ["deletepost", "updateProfile"],
    }),
    getUserByUsername: builder.query({
      query: (username) => `/users/username/${username}`,
      providesTags: ["post", "like", "updateProfile"],
    }),
    getSearchUser: builder.query({
      query: (text) => `/users?searchTerm=${text}`,
      providesTags: ["post", "like", "updateProfile"],
    }),
    getCommnetNotification: builder.query({
      query: (userId) => ({
        url: `/users/notification/${userId}`,
      }),
      // providesTags: ["post", "like"],
    }),
    updateUser: builder.mutation({
      query: ({ userId, ...data }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["updateProfile"],
    }),
  }),
});

export const {
  usePostUserMutation,
  useGetUserQuery,
  useGetSingleUserQuery,
  useGetUserByUsernameQuery,
  useGetCommnetNotificationQuery,
  useUpdateUserMutation,
  useGetSearchUserQuery,
} = userApi;
