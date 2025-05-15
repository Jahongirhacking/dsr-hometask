import { IUserProps } from "../../store/slices/type";
import { baseApi } from "../api";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<IUserProps, void>({
      query: () => "/me",
    }),

    getUsers: build.query<IUserProps[], void>({
      query: () => "/users",
    }),
  }),
});

export const { useLazyGetMeQuery, useGetUsersQuery } = userApi;
