import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Role = "patient" | "therapist" | "manager" | null;

interface User {
  id?: string; 
  idNumber?: string;
  firstName: string;
  lastName: string;
  role: Role;
}

interface UserState {
  isLoggedIn: boolean;
  user: User | null;
  firstName: string | null;
  lastName: string | null;
  role: Role;
}

const initialState: UserState = {
  isLoggedIn: false,
  user: null,
  firstName: null,
  lastName: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: User; role: Role; firstName: string; lastName: string  }>
    ) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.firstName = null;
      state.lastName = null;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
