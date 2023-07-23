import { createReducer, on } from "@ngrx/store";
import { User } from "../models/user.interface";
import { addUserError, addUserState, clearUserError, deleteUserState, setUserList, updateUserState } from "./user.actions";

export interface UserState{
    users: ReadonlyArray<User>;
    error: string | null; 
}

export const initialState: UserState = {
    users: [],
    error: null
}

export const userReducer = createReducer(
    initialState,
    // on(setUserList, (state, {users}) => {return {...state, users}} ),
    on(setUserList, (state, { users }) => { return {...state, users}}),
    on(addUserState, (state, {user}) => {return {...state, users:[...state.users, user], error: null}}),
    // on(updateUserState, (state, {user}) => {
    //     return {...state, users: state.users.map(data => data.id === user.id ? user : data)}
    //   }),

    on(updateUserState, (state, { user }) => ({
    ...state,
    users: state.users.map((data) => (data.id === user.id ? user : data)),
    error: null, // clean the error message in case success
    })),

    // on(deleteUserState, (state, {userId}) => 
    // {return {...state, users: state.users.filter(data => data.id != userId)}
    // }),
    on(deleteUserState, (state, { userId }) => ({
        ...state,
        users: state.users.filter((data) => data.id != userId),
        error: null, // Limpa a mensagem de erro em caso de sucesso
      })),
    //update the state with the message error
    on(addUserError, (state, { error }) => ({ ...state, error })),
    
    on(clearUserError, (state) => ({ ...state, error: null }))

)