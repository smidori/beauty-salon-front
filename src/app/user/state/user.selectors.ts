import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducers";

export const selectUserState = createFeatureSelector<UserState>('userState')
export const selectUsers = () => createSelector(
    selectUserState,
    (state: UserState) => state.users
)

export const selectUser = (id: number) => createSelector(
    selectUserState,
    (state: UserState) => state.users.find(d => d.id === d.id)
)
