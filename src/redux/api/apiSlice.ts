"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
  }),
  tagTypes: ["user"],
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
  api;
