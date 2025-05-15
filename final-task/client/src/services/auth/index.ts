import { IUserProps } from "../../store/slices/type";
import { baseApi } from "../api";
import { ILoginReq } from "./type";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<IUserProps, ILoginReq>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),

    logout: build.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
