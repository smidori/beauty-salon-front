import { createReducer, on } from '@ngrx/store';
import { clearToken, logout, setAuthentication, setError, setToken, setUserDetails } from './auth.actions';
export interface AuthState {
    userDetails: any;
    token: string;
    error: any;
    isAuthenticated: boolean;
}

export const initialState: AuthState = {
    userDetails: null,
    token: "",
    error: null,
    isAuthenticated: false

}

export const authReducer = createReducer(
  initialState,
  on(setToken, (state, { token }) => { return {...state, token, error: null}}),
  on(setError, (state, { error }) => { return {...state, error}}),
  on(setAuthentication, (state,{isAuthenticated}) => {return {...state, isAuthenticated}}),
  on(logout, (state) => ({ ...state, token: "", userDetails: null, isAuthenticated: false })),
  on(clearToken, () => initialState),
  on(setUserDetails, (state, { userDetails }) => { return { ...state, userDetails }})
  

  
);