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
    }),
    getSingleUser: builder.query({
      query: (email) => `/users/${email}`,
      providesTags: ["deletepost"],
    }),
    getUserByUsername: builder.query({
      query: (username) => `/users/username/${username}`,
      providesTags: ["post", "like"],
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
} = userApi;
