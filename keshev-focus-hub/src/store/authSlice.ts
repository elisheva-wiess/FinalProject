
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Role = "patient" | "therapist" | "manager" | null;

interface UserState {
  isLoggedIn: boolean;
  user: any | null;
  firstName: string | null;
  role: Role;
}

const initialState: UserState = {
  isLoggedIn: false,
  user: null,
  firstName: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: any; role: Role; firstName: string }>
    ) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.firstName = action.payload.firstName;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.firstName = null;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
