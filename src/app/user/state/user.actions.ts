import { createAction, props } from "@ngrx/store";
import { User } from "../models/user.interface";

export enum UserActions{
    GET_USER_LIST = '[User] Get User list',
    SET_USER_LIST = '[User] Set User list',
    ADD_USER_API = '[User] Add User api',
    ADD_USER_STATE = '[User] Add User state',
    UPDATE_USER_API = '[User] Update User api',
    UPDATE_USER_STATE = '[User] Update User state',
    DELETE_USER_API = '[User] Delete User api',
    DELETE_USER_STATE = '[User] Delete User state',

}

export const getUserList = createAction(
    UserActions.GET_USER_LIST,
);

export const setUserList = createAction(
    UserActions.SET_USER_LIST,
    props<{users:ReadonlyArray<User>}>()
)

export const addUserState = createAction(
    UserActions.ADD_USER_STATE, props<{user: User}>()
);

// export const updateUserState = createAction(
//     UserActions.UPDATE_USER_STATE, props<{user: User}>()
// );

export const updateUserState = createAction(
    UserActions.UPDATE_USER_STATE,
    props<{ user: User }>()
);


export const deleteUserState = createAction(
    UserActions.DELETE_USER_STATE, props<{userId: number}>()
)