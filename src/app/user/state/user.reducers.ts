import { createReducer, on } from "@ngrx/store";
import { User } from "../models/user.interface";
import { addUserState, deleteUserState, setUserList, updateUserState } from "./user.actions";

export interface UserState{
    users:ReadonlyArray<User>;
}

export const initialState: UserState = {
    users: []
}

export const userReducer = createReducer(
    initialState,
    on(setUserList, (state, {users}) => {return {... state, users}} ),
    on(addUserState, (state, {user}) => {return {...state, users:[...state.users, user]}}),
    on(updateUserState, (state, {user}) => {return {...state, users: state.users.map(
        data => data.id === user.id ? user: data)}
    }),
    on(deleteUserState, (state, {userId}) => 
    {return {...state, users: state.users.filter(data => data.id != userId)}
    }),
)