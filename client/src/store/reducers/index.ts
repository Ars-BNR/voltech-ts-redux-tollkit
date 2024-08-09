import { combineReducers } from "@reduxjs/toolkit";
import { defaultAuthToolkitReducer } from "./defaultAuthToolkitReducer";
import { authReducer } from "./authSlice";

export const rootReducer = combineReducers({
  authDefaultToolkit: defaultAuthToolkitReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
