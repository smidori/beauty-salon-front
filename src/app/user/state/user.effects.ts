import { User } from 'src/app/user/models/user.interface';
import { Injectable } from "@angular/core";
import { UserService } from "../services/user.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { UserActions } from "./user.actions";
import { EMPTY, catchError, map, mergeMap, tap } from "rxjs";

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private userService: UserService,
        private router: Router
    ) { }



    getUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.GET_USER_LIST),
            mergeMap(() => this.userService.getUsers()
                .pipe(
                    map(users => ({ type: UserActions.SET_USER_LIST, users })),
                    catchError(() => EMPTY)
                ))
        )
    }, { dispatch: true }
    );
    addUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.ADD_USER_API),
            mergeMap((data: { type: string, payload: User }) => this.userService.addUser(data.payload)
                .pipe(
                    map(users => ({ type: UserActions.ADD_USER_STATE, user: data.payload })),
                    tap(() => this.router.navigate(["users"])),
                    catchError(() => EMPTY)
                ))
        )
    }, { dispatch: true })

    updateUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.UPDATE_USER_API),
            mergeMap((data: {type: string,payload: User}) =>
            this.userService.updateUser(data.payload.id, data.payload)
            .pipe(
                map(users => ({type: UserActions.UPDATE_USER_STATE, user: data.payload})),
                tap(() => this.router.navigate(["users"])),
                catchError(() => EMPTY)
            ))
        )
    }, {dispatch: true})

    deleteUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.DELETE_USER_API),
            mergeMap((data: {payload: number }) => this.userService.deleteUser(data.payload)
            .pipe(
                map(() => ({type: UserActions.DELETE_USER_STATE, userId: data.payload})),
                catchError(() => EMPTY)
            ))

        )

    })

}