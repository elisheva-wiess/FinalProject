
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import specializationsReducer from "./specializationsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    specializations: specializationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
