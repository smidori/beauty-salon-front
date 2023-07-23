import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.reducers';


export const selectAuthState = createFeatureSelector<AuthState>('authState')

export const selectError = () => createSelector(
    selectAuthState,
    (state: AuthState) => state.error
)

export const selectIsAuthenticated = createSelector(
    selectAuthState,
    (state: AuthState) => state.isAuthenticated
);

export const selectUserDetails = createSelector(
    selectAuthState,
    (state: AuthState) => state.userDetails
);