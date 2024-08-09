export interface AuthState {
  profiles: profiles;
  isAuth: boolean;
  isLoading: boolean;
}
export interface profiles {
  login?: string;
  id?: number;
  role?: string;
}
export enum AuthActionTypes {
  SET_AUTH = "SET_AUTH",
  SET_PROFILES = "SET_PROFILES",
  SET_LOADING = "SET_LOADING",
}
