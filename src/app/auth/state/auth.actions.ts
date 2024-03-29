import { Action, createAction, props } from '@ngrx/store';


export enum AuthActions {
    LOGIN = '[AUTH] Login',
    LOGOUT = '[Auth] Logout',
    SET_TOKEN = '[AUTH] Set Token',
    CREATE_USER = '[AUTH] Create User',
    LOGIN_ERROR = '[AUTH] LOGIN_ERROR',
    CLEAR_ERROR = '[AUTH] CLEAR_ERROR',
    SET_IS_AUTHENTICATED = '[AUTH] SET_IS_AUTHENTICATED',
    CLEAR_TOKEN = '[Auth] Clear Token',
    SET_USER_DETAILS = '[AUTH] Set User Details',
    RESET_PWD = '[AUTH] Reset Pwd',
}


export const setToken = createAction(
    AuthActions.SET_TOKEN,
    props<{ token: string }>(),
);


export const setError = createAction(
    AuthActions.LOGIN_ERROR,
    props<{ error: any }>(),
);

export const clearError = createAction(
    AuthActions.CLEAR_ERROR
);

export const setAuthentication = createAction(
    AuthActions.SET_IS_AUTHENTICATED,
    props<{ isAuthenticated: boolean }>()
);

export const logout = createAction(
    AuthActions.LOGOUT
);


export const clearToken = createAction (
    AuthActions.CLEAR_TOKEN
);
    

export const setUserDetails = createAction(
    AuthActions.SET_USER_DETAILS,
    props<{ userDetails: any }>()
  );