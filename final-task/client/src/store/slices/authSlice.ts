import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../services/auth";
import { userApi } from "../../services/user";
import {
  getLocalStorage,
  LocalStorageNames,
  setLocalStorage,
} from "../../utils/storageUtils";
import { IUserProps } from "./type";

interface IAuthProps {
  token: string | null;
  user: IUserProps | null;
}

const initialState: IAuthProps = {
  token: getLocalStorage(LocalStorageNames.Token) || null,
  user: null,
};

const authSlice = createSlice({
  name: "auth-slice",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem(LocalStorageNames.Token);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        const token = "Cookie";
        state.user = action.payload;
        state.token = token;
        setLocalStorage(LocalStorageNames.Token, token);
      })
      .addMatcher(
        authApi.endpoints.logout.matchFulfilled,
        authSlice.caseReducers.logout
      )
      .addMatcher(
        authApi.endpoints.logout.matchRejected,
        authSlice.caseReducers.logout
      )
      .addMatcher(userApi.endpoints.getMe.matchFulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
