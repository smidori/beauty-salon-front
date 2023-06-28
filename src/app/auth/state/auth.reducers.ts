import { createReducer, on } from '@ngrx/store';
import { logout, setAuthentication, setError, setToken } from './auth.actions';
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
  on(setToken, (state, { token }) => { return {...state, token}}),
  on(setError, (state, { error }) => { return {...state, error}}),
  on(setAuthentication, (state,{isAuthenticated}) => {return {...state, isAuthenticated}}),
  on(logout, (state) => {return {...state,token: "",isAuthenticated: false,}})
  
);