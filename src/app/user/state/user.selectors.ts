import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducers";

export const selectUserState = createFeatureSelector<UserState>('userState')

// export const selectUsers = () => createSelector(
//     selectUserState,
//     (state: UserState) => state.users
// )

export const selectUsers = () => createSelector(
    selectUserState,
    (state: UserState) => state.users
)


// export const selectUser = (id: number) => createSelector(
//     selectUserState,
//     (state: UserState) => state.users.find(d => d.id === id)
// )
export const selectUser = (id: number) => createSelector(
    selectUserState,
    (state: UserState) => {
        console.log('state.users => ', state.users);
        const user = state.users.find(d => {
            //console.log('Tipo de d.id:', typeof d.id);
            //console.log('Tipo de id:', typeof id);            
            return d.id == id;
          });
        console.log("user ==> " + user);
        return user;
    }
);
