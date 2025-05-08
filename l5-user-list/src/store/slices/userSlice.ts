// src/features/counter/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../services/user/type";
import { userApi } from "../../services/user";

interface userSlice {
  users: IUser[];
}
const initialState: userSlice = {
  users: JSON.parse(localStorage.getItem("users") ?? "[]"),
};

const LOCALSTORAGE_NAME = "users";

const saveUsersToLocalStorage = (users: IUser[]) => {
  localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(users));
};

const counterSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.users = [...state.users, action.payload];
      saveUsersToLocalStorage(state.users);
    },
    deleteUser: (state, action: PayloadAction<IUser["username"]>) => {
      state.users = state.users.filter(
        (user) => user.username !== action.payload
      );
      saveUsersToLocalStorage(state.users);
    },
    changeAddress: (
      state,
      action: PayloadAction<{
        username: IUser["username"];
        address: IUser["address"];
      }>
    ) => {
      state.users = state.users.map((user) =>
        user.username === action.payload.username
          ? { ...user, address: action.payload.address }
          : user
      );
      saveUsersToLocalStorage(state.users);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.getUser.matchFulfilled,
      (state, action) => {
        counterSlice.caseReducers.addUser(state, action);
      }
    );
  },
});

export const { deleteUser, changeAddress } = counterSlice.actions;
export default counterSlice.reducer;
