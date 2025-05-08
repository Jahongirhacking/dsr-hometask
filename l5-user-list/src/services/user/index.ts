// src/services/postsApi.ts
import { api } from "../api";
import { API_KEY } from "../const";
import { IUser } from "./type";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<IUser, void>({
      query: () => ({
        url: "/randomuser",
        headers: {
          "X-Api-Key": API_KEY,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetUserQuery } = userApi;
