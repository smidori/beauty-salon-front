import { createReducer, on } from "@ngrx/store";
import { User } from "../models/user.interface";
import { setUserList } from "./user.actions";

export interface UserState{
    users:ReadonlyArray<User>;
}

export const initialState: UserState = {
    users: []
}

export const userReducer = createReducer(
    initialState,
    on(setUserList, (state, {users} ) => {return {... state, users}} )
)