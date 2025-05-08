// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { api } from "../services/api";

export const store = configureStore({
  reducer: {
    userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
