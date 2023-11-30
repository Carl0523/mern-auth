import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import { apiSlice } from "../slices/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  //getDefaultMiddleware() is automatically apply unless you specify it
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
