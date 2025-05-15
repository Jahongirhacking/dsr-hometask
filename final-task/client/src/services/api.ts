// src/services/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalStorageNames } from "../utils/storageUtils";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(LocalStorageNames.Token); // Get token
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Todos", "TodoItem"],
  endpoints: () => ({}), // Empty for now; endpoints will be added separately
});
