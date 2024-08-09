import { createAction, createReducer } from "@reduxjs/toolkit";
import { AuthActionTypes, AuthState, profiles } from "../../types/store-types";

const initialState: AuthState = {
  profiles: {},
  isAuth: false,
  isLoading: false,
};
export const setAuth = createAction<boolean>(AuthActionTypes.SET_AUTH);
export const setProfiles = createAction<profiles>(AuthActionTypes.SET_PROFILES);
export const setLoading = createAction<boolean>(AuthActionTypes.SET_LOADING);

export const defaultAuthToolkitReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(setAuth, (state, action) => {
        state.isAuth = action.payload;
      })
      .addCase(setProfiles, (state, action) => {
        state.profiles = action.payload;
      })
      .addCase(setLoading, (state, action) => {
        state.isLoading = action.payload;
      });
  }
);
