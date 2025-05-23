"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://overflowtrick-backend-ochre.vercel.app/api/v1",
  }),
  tagTypes: [
    "post",
    "like",
    "deletepost",
    "comment",
    "deletecomment",
    "updateProfile",
  ],
  endpoints: () => ({}),
});
