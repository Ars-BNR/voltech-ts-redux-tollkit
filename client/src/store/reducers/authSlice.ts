import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, profiles } from "../../types/store-types";

const initialState: AuthState = {
  profiles: {},
  isAuth: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setProfiles: (state, action: PayloadAction<profiles>) => {
      state.profiles = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});
export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
